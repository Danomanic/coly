/*
 * Coly landing-page map animation.
 *
 * Renders a dot-matrix world map (data baked in map-data.js), glowing
 * datacentre nodes, a faint network mesh between them, and light "packets"
 * of data flowing along the links. Everything is canvas; no dependencies.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('map');
  var ctx = canvas.getContext('2d');
  var DOTS = window.COLY_MAP_DOTS || [];

  // --- datacentre locations (lat, lng) ---
  var CITIES = [
    { id: 'lon', name: 'London',        lat: 51.5074, lng: -0.1278 },
    { id: 'par', name: 'Paris',         lat: 48.8566, lng: 2.3522 },
    { id: 'fra', name: 'Frankfurt',     lat: 50.1109, lng: 8.6821 },
    { id: 'nyc', name: 'New York',      lat: 40.7128, lng: -74.006 },
    { id: 'tor', name: 'Toronto',       lat: 43.6532, lng: -79.3832 },
    { id: 'sfo', name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { id: 'sao', name: 'São Paulo',     lat: -23.5505, lng: -46.6333 },
    { id: 'jnb', name: 'Johannesburg',  lat: -26.2041, lng: 28.0473 },
    { id: 'mum', name: 'Mumbai',        lat: 19.0760, lng: 72.8777 },
    { id: 'sgp', name: 'Singapore',     lat: 1.3521,  lng: 103.8198 },
    { id: 'tok', name: 'Tokyo',         lat: 35.6762, lng: 139.6503 },
    { id: 'syd', name: 'Sydney',        lat: -33.8688, lng: 151.2093 }
  ];

  // Network links (by city id). Curated to avoid lines that wrap the
  // antimeridian the long way across the map.
  var LINK_IDS = [
    ['lon', 'nyc'], ['lon', 'par'], ['lon', 'fra'], ['lon', 'sao'],
    ['lon', 'mum'], ['lon', 'jnb'], ['lon', 'tor'],
    ['nyc', 'sfo'], ['nyc', 'tor'], ['nyc', 'sao'],
    ['par', 'fra'], ['fra', 'mum'], ['fra', 'sgp'],
    ['mum', 'sgp'], ['sgp', 'syd'], ['sgp', 'tok'],
    ['tok', 'syd'], ['tok', 'sfo'], ['sao', 'jnb']
  ];

  var COLORS = ['#7fe9ff', '#38e1ff', '#5ad1ff', '#9b8bff', '#37f0d0'];

  // Precompute u,v (equirectangular, 0..1) for each city.
  CITIES.forEach(function (c) {
    c.u = (c.lng + 180) / 360;
    c.v = (90 - c.lat) / 180;
  });
  var byId = {};
  CITIES.forEach(function (c) { byId[c.id] = c; });
  var LINKS = LINK_IDS.map(function (p) { return [byId[p[0]], byId[p[1]]]; });

  // --- view transform (computed on resize) ---
  var W = 0, H = 0, dpr = 1;
  var originX = 0, originY = 0, sx = 0, sy = 0;
  var dotR = 1.3, nodeR = 3;

  // Offscreen layer for the static map dots (only redrawn on resize).
  var mapLayer = document.createElement('canvas');
  var mapCtx = mapLayer.getContext('2d');

  function projX(u) { return originX + u * sx; }
  function projY(v) { return originY + v * sy; }

  function computeBounds() {
    var uMin = 1, uMax = 0, vMin = 1, vMax = 0;
    for (var i = 0; i < DOTS.length; i++) {
      var u = DOTS[i][0], v = DOTS[i][1];
      if (u < uMin) uMin = u; if (u > uMax) uMax = u;
      if (v < vMin) vMin = v; if (v > vMax) vMax = v;
    }
    return { uMin: uMin, uMax: uMax, vMin: vMin, vMax: vMax };
  }
  var bounds = computeBounds();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fit the dot bounding box into the viewport, keeping equirectangular
    // aspect (1 unit of u spans 2x the screen distance of 1 unit of v).
    var contentU = bounds.uMax - bounds.uMin;
    var contentV = bounds.vMax - bounds.vMin;
    var padX = W * 0.94, padY = H * 0.82;
    var s = Math.min(padX / (contentU * 2), padY / contentV);
    sx = s * 2;
    sy = s;
    originX = (W - contentU * sx) / 2 - bounds.uMin * sx;
    originY = (H - contentV * sy) / 2 - bounds.vMin * sy;

    // Scale feature sizes a little with the map.
    dotR = Math.max(0.9, Math.min(1.7, s * 0.0022));
    nodeR = Math.max(2.4, Math.min(4.2, s * 0.006));

    drawMapLayer();
  }

  function drawMapLayer() {
    mapLayer.width = canvas.width;
    mapLayer.height = canvas.height;
    mapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mapCtx.clearRect(0, 0, W, H);
    mapCtx.fillStyle = 'rgba(90, 140, 175, 0.34)';
    for (var i = 0; i < DOTS.length; i++) {
      var x = projX(DOTS[i][0]);
      var y = projY(DOTS[i][1]);
      mapCtx.beginPath();
      mapCtx.arc(x, y, dotR, 0, Math.PI * 2);
      mapCtx.fill();
    }
  }

  // --- flowing data packets ---
  function makePacket() {
    var link = LINKS[(Math.random() * LINKS.length) | 0];
    return {
      a: link[0],
      b: link[1],
      t: 0,
      speed: 0.0016 + Math.random() * 0.0026,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      lift: 0.16 + Math.random() * 0.12
    };
  }
  var PACKET_COUNT = 16;
  var packets = [];
  for (var p = 0; p < PACKET_COUNT; p++) {
    packets.push(makePacket());
    packets[p].t = Math.random(); // stagger
  }

  // Quadratic bezier point + the control point that bows the arc "upward".
  function control(ax, ay, bx, by, lift) {
    var mx = (ax + bx) / 2, my = (ay + by) / 2;
    var dx = bx - ax, dy = by - ay;
    var len = Math.hypot(dx, dy) || 1;
    // perpendicular, biased toward the top of the screen
    var nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    return { x: mx + nx * len * lift, y: my + ny * len * lift };
  }
  function bezier(ax, ay, cx, cy, bx, by, t) {
    var mt = 1 - t;
    return {
      x: mt * mt * ax + 2 * mt * t * cx + t * t * bx,
      y: mt * mt * ay + 2 * mt * t * cy + t * t * by
    };
  }

  function drawLinks() {
    for (var i = 0; i < LINKS.length; i++) {
      var a = LINKS[i][0], b = LINKS[i][1];
      var ax = projX(a.u), ay = projY(a.v);
      var bx = projX(b.u), by = projY(b.v);
      var c = control(ax, ay, bx, by, 0.18);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(c.x, c.y, bx, by);
      ctx.strokeStyle = 'rgba(56, 225, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawPackets() {
    for (var i = 0; i < packets.length; i++) {
      var pk = packets[i];
      pk.t += pk.speed;
      if (pk.t >= 1) { packets[i] = makePacket(); continue; }

      var ax = projX(pk.a.u), ay = projY(pk.a.v);
      var bx = projX(pk.b.u), by = projY(pk.b.v);
      var c = control(ax, ay, bx, by, pk.lift);

      // Bright arc swept up to the head, fading behind it.
      var trail = 0.14;
      var t0 = Math.max(0, pk.t - trail);
      ctx.beginPath();
      var steps = 14;
      for (var s = 0; s <= steps; s++) {
        var tt = t0 + (pk.t - t0) * (s / steps);
        var pt = bezier(ax, ay, c.x, c.y, bx, by, tt);
        if (s === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = pk.color;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = pk.color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Glowing head.
      var head = bezier(ax, ay, c.x, c.y, bx, by, pk.t);
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = pk.color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function drawNodes(time) {
    for (var i = 0; i < CITIES.length; i++) {
      var c = CITIES[i];
      var x = projX(c.u), y = projY(c.v);

      // expanding pulse ring (phase offset per city)
      var phase = (time / 2600 + i * 0.37) % 1;
      var ringR = nodeR + phase * nodeR * 5;
      ctx.beginPath();
      ctx.arc(x, y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 225, 255, ' + (0.5 * (1 - phase)).toFixed(3) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();

      // core node
      ctx.beginPath();
      ctx.arc(x, y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = '#dffaff';
      ctx.shadowColor = '#38e1ff';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function frame(time) {
    ctx.clearRect(0, 0, W, H);
    // blit static dot map
    ctx.drawImage(mapLayer, 0, 0, W, H);
    drawLinks();
    drawPackets();
    drawNodes(time || 0);
    requestAnimationFrame(frame);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();
  requestAnimationFrame(frame);
})();

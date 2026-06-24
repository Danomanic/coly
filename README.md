# Coly

Landing page for **Coly** — a UK platform for hosting containerised apps (PaaS).

The page is a single, dependency-free static site: a dark dot-matrix map of the
UK & Ireland rendered on a `<canvas>`, glowing datacentre nodes, and animated
"packets" of data flowing between regions. Live at [coly.uk](https://coly.uk).

## Project layout

```
site/                 Static site source (deployed as-is)
  index.html          Markup + copy
  styles.css          Styling / overlay
  main.js             Canvas animation (map dots, nodes, flowing data)
  map-data.js         Generated land-dot coordinates (do not edit)
  coly.png            Logo
  favicon.ico
scripts/
  generate-map.js     Builds map-data.js from Natural Earth land geometry
  build-site.js       Regenerates map data + copies site/ -> build/
  serve.js            Minimal static server for local preview
  data/
    ne_110m_land.json Natural Earth 110m land polygons (source geometry)
```

## Develop

```bash
npm start              # build + serve at http://localhost:4321
npm run build          # generate map data + write build/
npm run generate-map   # regenerate site/map-data.js only
```

There are **no runtime or build dependencies** — everything runs on plain Node
and the browser.

## The map

`scripts/generate-map.js` samples a uniform lat/lng grid over the British Isles
and keeps points that fall on land (point-in-polygon against Natural Earth 110m
geometry), writing them as normalised equirectangular coordinates to
`site/map-data.js`. Tune the look via `STEP` and the `LAT_MIN`/`LAT_MAX` /
`LNG_MIN`/`LNG_MAX` crop box in that script.

Datacentre locations and the network links between them are defined in
`site/main.js` (`CITIES` / `LINK_IDS`).

## Deploy

Deployed as a static site on DigitalOcean App Platform:

- **Build command:** `npm run build`
- **Output directory:** `build`

See [DEPLOYMENT.md](DEPLOYMENT.md) for full setup and custom-domain steps.

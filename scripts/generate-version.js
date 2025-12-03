const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the short git commit hash
  const gitHash = execSync('git rev-parse --short HEAD')
    .toString()
    .trim();

  // Get the commit date
  const gitDate = execSync('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M"')
    .toString()
    .trim();

  // Get the branch name
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

  const versionInfo = {
    hash: gitHash,
    date: gitDate,
    branch: gitBranch,
    version: `${gitHash}`,
    fullVersion: `${gitHash} (${gitDate})`,
  };

  // Write to a JSON file
  const outputPath = path.join(__dirname, '..', 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));

  console.log('✅ Version generated:', versionInfo.version);
} catch (error) {
  console.error('❌ Error generating version:', error.message);

  // Fallback version if git is not available
  const fallbackVersion = {
    hash: 'dev',
    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    branch: 'unknown',
    version: 'dev',
    fullVersion: 'dev',
  };

  const outputPath = path.join(__dirname, '..', 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(fallbackVersion, null, 2));

  console.log('⚠️  Using fallback version');
}

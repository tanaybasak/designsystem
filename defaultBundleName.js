const fs = require('fs');
const path = require('path');
const DIST_DIR = path.join(__dirname, '/dist');

fs.readdirSync(DIST_DIR).forEach(file => {
  if (/(^js.*(js|css)$)/.test(file)) {
    const splittedFile = file.split('.');
    const fileName = `patron-style.${splittedFile[splittedFile.length - 1]}`;
    fs.rename(path.join(DIST_DIR, file), path.join(DIST_DIR, fileName), err => {
      if (err) throw err;
    });
  } else {
    fs.unlink(path.join(DIST_DIR, file), err => {
      if (err) throw err;
    });
  }
});

// Update version
const RELEASES_TYPE = process.argv[2] || 'patch';
fs.readFile(path.join(__dirname, './package.json'), (err, fileData) => {
  if (err) throw err;
  const packageJsonData = JSON.parse(fileData);
  if (Object.prototype.hasOwnProperty.call(packageJsonData, 'version')) {
    const version = packageJsonData.version.split('.');
    const index = ['major', 'minor', 'patch'].indexOf(RELEASES_TYPE);
    version[index] = Number(version[index]);
    version[index] += 1;

    if (index === 0) {
      version[1] = 0;
      version[2] = 0;
    } else if (index === 1) {
      version[2] = 0;
    }

    packageJsonData.version = version.join('.');

    // writing back updated package.json data
    fs.writeFile(
      'package.json',
      JSON.stringify(packageJsonData, null, 2),
      error => {
        if (error) throw error;
      }
    );
  }
});

const fs = require('fs');
const path = require('path');
const DIST_DIR = path.join(__dirname, '/dist');

fs.readdirSync(DIST_DIR).forEach(file => {
    if (/(^patron-style.*(js|css)$)/.test(file)) {
        const splittedFile = file.split('.');
        const fileName = `${splittedFile[0]}.${splittedFile[splittedFile.length - 1]}`;
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
    if (packageJsonData.hasOwnProperty('version')) {
        const version = packageJsonData.version.split('.');
        const index = ['major', 'minor', 'patch'].indexOf(RELEASES_TYPE);
        version[index] = Number(version[index]);
        version[index] += 1;
        packageJsonData.version = version.join('.');

        // writing back updated package.json data
        fs.writeFile('package.json', JSON.stringify(packageJsonData, null, 4), error => {
            if (error) throw error;
        });
    }
});
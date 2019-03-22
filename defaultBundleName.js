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
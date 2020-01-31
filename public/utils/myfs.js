var fs = require('fs');

module.exports = {
    readdir: (path) => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    },
    readdirSync: (path) => {
        return fs.readdirSync(path);
    },
    readFile: (path, code='utf-8') => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, code, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    },
    readFileSync: (path, code='utf-8') => {
        return fs.readFileSync(path, code);
    },
    isDirectory: (path) => {
        return fs.lstatSync(path).isDirectory();
    }
}
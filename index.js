var path = require('path');
var fs = require('fs');
var yaml = require('js-yaml');


function loadFile(src) {
    return fs.readFileSync(src, 'utf8');
}

function loadYaml(src) {
    var obj = null;
    try {
        obj = yaml.safeLoad(loadFile(src));
    } catch (e) { /* do nothing */ }
    return obj;
}

function load (src, cb) {
    var data, err;
    if (path.extname(src) == '.yaml') {
        data = loadYaml(src);
    } else {
        data = require(src);
    }
    if (!cb) {
        return data;
    }
    cb(err, data);
}

module.exports = {
    load: load
};

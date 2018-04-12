const ejs = require('ejs');
const deepmerge = require('deepmerge');

function renderFile(file, data) {
    return ejs.render(file.file, getConfig(file, data), {});
}

function getConfig(file, data) {
    return deepmerge(getConfigValues(file.fields), data);
}

function getConfigValues(fields) {
    let config = {};
    for (let i = 0; i < Object.keys(fields).length; i++) {
        let key = Object.keys(fields)[i];
        let value = fields[key];
        if(value instanceof Array) {
            config[key] = value[0];
        } else if(value instanceof Object){
            config[key] = getConfigValues(value);
        }
    }
    return config;
}

module.exports = {
    getConfig: getConfig,
    renderFile: renderFile
};
const fs = require('fs').promises;

const getJSON = require('./getJSON.js')

async function appendJSON(data, path) {
  const obj = await getJSON(path);
  const newObj = [...obj, data];
  fs.writeFile(path, JSON.stringify(newObj, null, '\t'))
}

module.exports = appendJSON;
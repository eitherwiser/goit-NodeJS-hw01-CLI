const fs = require('fs').promises;

async function writeJSON(data, path) {
  const newObj = [...data];
  fs.writeFile(path, JSON.stringify(newObj, null, '\t'))
}

module.exports = writeJSON;
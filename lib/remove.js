var fs = require('fs')

function remove(path) {
  fs.rmdirSync(path, {
    recursive: true
  })
}

module.exports = remove
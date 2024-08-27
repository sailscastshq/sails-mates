const fs = require('fs')
const path = require('path')

const controllers = {}

function readControllers(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      readControllers(filePath)
    } else if (file.endsWith('.js')) {
      const relativePath = path.relative(__dirname, filePath)
      const routePath = relativePath.replace(/\\/g, '/').replace('.js', '')
      controllers[routePath] = require(`./${routePath}`)
    }
  })
}

readControllers(path.join(__dirname, 'controllers'))

module.exports = controllers

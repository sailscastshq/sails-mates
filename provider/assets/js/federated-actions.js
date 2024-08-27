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
      const relativePath = path.relative(dir, filePath)
      const routePath = relativePath.replace(/\\/g, '/').replace('.js', '')
      const action = require(`../../api/controllers/${routePath}`)
      action._federated = true
      controllers[routePath] = action
    }
  })
}

readControllers(path.join(__dirname, '../api/controllers'))

module.exports = controllers

const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')

module.exports.shipwright = {
  build: {
    tools: {
      rspack: (config, { appendPlugins }) => {
        appendPlugins([
          new ModuleFederationPlugin({
            name: 'federation_consumer',
            remotes: {
              federation_provider:
                'federation_provider@http://localhost:1338/mf-manifest.json',
            },
            shared: ['react', 'react-dom'],
          }),
        ])
      },
    },
    plugins: [pluginReact()],
  },
}

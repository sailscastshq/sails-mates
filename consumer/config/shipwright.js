const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { NodeFederationPlugin } = require('@module-federation/node')
const { dependencies } = require('../package.json')
module.exports.shipwright = {
  build: {
    dev: {
      // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
      assetPrefix: 'http://localhost:1337',
    },
    tools: {
      rspack: (config, { appendPlugins }) => {
        config.publicPath = 'auto'
        appendPlugins([
          new ModuleFederationPlugin({
            name: 'federation_consumer',
            remotes: {
              federation_provider:
                'federation_provider@http://localhost:1338/mf-manifest.json',
            },
            shared: {
              ...dependencies,
              react: {
                singleton: true,
                requiredVersion: dependencies.react,
              },
              'react-dom': {
                singleton: true,
                requiredVersion: dependencies['react-dom'],
              },
            },
          }),
        ])
        if (config.target === 'node') {
          appendPlugins([
            new NodeFederationPlugin({
              name: 'federated_provider',
              remotes: {
                federated_actions:
                  'federated_provider@http://localhost:1338/mf-manifest.json',
              },
            }),
          ])
        }
      },
    },
    plugins: [pluginReact()],
  },
}

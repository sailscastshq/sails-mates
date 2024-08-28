const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { NodeFederationPlugin } = require('@module-federation/node')
const { dependencies } = require('../package.json')

module.exports.shipwright = {
  build: {
    source: {
      entry: {
        federatedActions: './assets/js/federated-actions.js',
      },
    },

    dev: {
      // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
      assetPrefix: 'http://localhost:1338',
    },
    tools: {
      rspack: (config, { appendPlugins }) => {
        if (config.entry.federatedActions) {
          config.target = 'node'
          config.externals = ['fs', 'path']
        }
        config.output.uniqueName = 'federation_provider'
        config.publicPath = 'auto'
        appendPlugins([
          new ModuleFederationPlugin({
            name: 'federation_provider',
            exposes: {
              './counter': './assets/js/components/Counter.jsx',
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
              library: {
                type: 'commonjs-module',
              },
              exposes: {
                './actions': './assets/js/federated-actions.js',
              },
              shared: ['sails'],
            }),
          ])
        }
      },
    },
    plugins: [pluginReact()],
  },
}

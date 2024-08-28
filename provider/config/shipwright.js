const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { NodeFederationPlugin } = require('@module-federation/node')

module.exports.shipwright = {
  build: {
    environments: {
      web: {
        output: {
          target: 'web',
        },
        tools: {
          rspack: (config, { appendPlugins }) => {
            appendPlugins([
              new ModuleFederationPlugin({
                name: 'federation_provider',
                exposes: {
                  './counter': './assets/js/components/Counter.jsx',
                },
                shared: {
                  react: {
                    singleton: true,
                    requiredVersion: dependencies['react'],
                  },
                  'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom'],
                  },
                },
              }),
            ])
          },
        },
      },
      node: {
        source: {
          entry: {
            federatedActions: './assets/js/federated-actions.js',
          },
        },
        output: {
          target: 'node',
        },
        tools: {
          rspack: (config, { appendPlugins }) => {
            config.externals = ['fs', 'path']
            appendPlugins([
              new NodeFederationPlugin({
                name: 'federation_provider',
                library: { type: 'commonjs-module' },
                exposes: {
                  './actions': './assets/js/federated-actions.js',
                },
                shared: ['sails'],
              }),
            ])
          },
        },
      },
    },
  },
  plugins: [pluginReact()],
}

const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')
const { dependencies } = require('../package.json')

module.exports.shipwright = {
  build: {
    dev: {
      // It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
      assetPrefix: 'http://localhost:1338',
    },
    tools: {
      rspack: (config, { appendPlugins }) => {
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
      },
    },
    plugins: [pluginReact()],
  },
}

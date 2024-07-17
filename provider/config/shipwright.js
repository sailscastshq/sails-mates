const { pluginReact } = require('@rsbuild/plugin-react')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack')

module.exports.shipwright = {
  build: {
    tools: {
      rspack: (config, { appendPlugins }) => {
        config.output.uniqueName = 'federation_provider'
        appendPlugins([
          new ModuleFederationPlugin({
            name: 'federation_provider',
            exposes: {
              './counter': './assets/js/components/Counter.jsx',
            },
          }),
        ])
      },
    },
    plugins: [pluginReact()],
  },
}

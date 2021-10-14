const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const marketing = process.env.REACT_APP_MARKETING_URL;
const auth = process.env.REACT_APP_AUTH_URL;
const dashboard = process.env.REACT_APP_DASHBOARD_URL;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${marketing}/remoteEntry.js`,
        auth: `auth@${auth}/remoteEntry.js`,
        dashboard: `dashboard@${dashboard}/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

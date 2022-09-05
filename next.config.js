//https://github.com/vercel/next.js/discussions/12810
module.exports = {
  webpack: (config, options) => {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/sounds/`,
            outputPath: `${isServer ? '../' : ''}static/sounds/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
};

const intercept = require('intercept-stdout');

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout);
}

//babel.config.js
module.exports = function (api) {
  console.log('babel.config.js', api);
  return {
    presets: [
      'module:@react-native/babel-preset',
      '@babel/preset-react'
    ]
  }
};


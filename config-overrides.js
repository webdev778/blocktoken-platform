module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    const rewired = require('react-app-rewired')
    const rewireLess = require('react-app-rewire-less')
    const rewireEslint = require('react-app-rewire-eslint')
    const path = require('path')

    const cssLoader = rewired.getLoader(
      config.module.rules,
      rule => rule.test && String(rule.test) === String(/\.css$/)
    )
    const sassLoader = {
      test: /\.scss$/,
      use: [...(cssLoader.loader || cssLoader.use), 'sass-loader']
    }
    const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
    oneOf.unshift(sassLoader)
  
    config = rewired.injectBabelPlugin('transform-decorators-legacy', config)
    config = rewireLess(config, env)
    config = rewireEslint(config, env)
    config.resolve.modules.push(path.resolve('./src'))
  
    //dev server config
    
    return config
  },
  
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // };

      // Return your customised Webpack Development Server config.
      config.compress = true
      config.disableHostCheck = true 
      return config;
    }
  }
}
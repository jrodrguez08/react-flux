  module.exports = () => {
      const config = {
          port: 8080,
          devBaseUrl: 'http://localhost',
          paths: {
              css: './src/styles/*.scss',
              dist: './dist',
              html: './src/views/*.html',
              js: './src/js/**/*.js',
              mainJS: './src/js/main.js'
          }
      };
      return config;
  };
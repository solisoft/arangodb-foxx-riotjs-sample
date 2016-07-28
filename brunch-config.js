module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/js.js': /^app\/[js|widgets]/,
        'js/vendors.js': /^app\/vendors/,
      }
    },
    stylesheets: {
      joinTo: {
        'css/css.css': /^app\/[css]/,
        'css/vendors.css': /^app\/vendors/,
      }
    },
  },
  plugins: {
    htmlPages: {
      compileAssets: true
    }
  },

  overrides: {
    production: {
      paths: {
        public: 'dist'
      }
    }
    
  }
  
};
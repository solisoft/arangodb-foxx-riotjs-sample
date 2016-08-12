module.exports = {
  npm: {
    globals: {
      $: 'jquery',
      jQuery: 'jquery',
      _: "underscore",
      riot: "riot",
      UIKit: "uikit"
    },
    styles: {
      select2: ['dist/css/select2.css'],
    }
  },
  files: {
    javascripts: {
      joinTo: {
        'js/js.js': /^app\/[js|widgets]/,
        'js/vendors.js': /^(?!app)/,    
      }
    },
    stylesheets: {
      joinTo: {
        'css/css.css': /^app\/[css]/,
        'css/vendors.css': [/^(?!app)/, /^app\/vendors/],
      },
      
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
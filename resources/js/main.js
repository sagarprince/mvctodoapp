'use strict';

/* global require */

require.config({  
  baseUrl: 'resources/js',
  waitSeconds: 0,
  paths: {
      'jquery': 'lib/jquery.min',
      'underscore': 'lib/underscore.min',
      'hammerjs': 'lib/hammer.min',
      'materialize': 'lib/materialize.amd',
      'template7': 'lib/template7',
      
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
        exports: '_'
    },
    'hammerjs': {
        deps: ['jquery'],
        exports: 'Hammer'
    },
    'materialize': {
        deps: ['jquery', 'hammerjs'],
        exports: 'Materialize'
    },
    'template7': {
        exports: 'Template7'
    }
  }
});

require(['jquery', 
    'underscore',
    'hammerjs',
    'materialize',
    'template7',
    'app'
], function($, _, Hammer, Materialize, Template7, app) {
    app.startup();
});
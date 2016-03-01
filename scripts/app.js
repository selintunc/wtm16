'use strict';

(function (document) {
  'use strict';

  var app = document.querySelector('#app');

  // Debug mode
  app.debug = true;

  // Logger for debug mode
  var logger = function logger(text) {
    if (app.debug) {
      console.info(text);
    }
  };

  var webComponentsSupported = 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template');

  if (!webComponentsSupported) {
    logger('Web Components aren\'t supported!');
    var script = document.createElement('script');
    script.async = true;
    script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.head.appendChild(script);
  } else {
    logger('Web Components are supported!');
  }

  app.displayInstalledToast = function () {
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  app.addEventListener('dom-change', function () {
    return console.log('Hello, folks! It is Project Hoverboard by GDG Lviv. Contact Oleh Zasadnyy for more details.');
  });

  window.addEventListener('service-worker-error', function (e) {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      logger(e.detail);
    }
  });

  window.addEventListener('service-worker-installed', function () {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      app.$.infoToast.text = 'Caching complete! This app will work offline.';
      app.$.infoToast.show();
    }
  });

  app.scrollPageToTop = function () {
    return document.querySelector('#paperDrawerPanel [main]').scrollToTop(true);
  };

  app.generateClass = function (value) {
    return value.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  };
  app.getIndexByProperty = function (array, property, value) {
    for (var i = 0, length = array.length; i < length; i++) {
      if (array[i][property].toString() === value.toString()) {
        return i;
      }
    }
  };
  app.randomOrder = function (array) {
    return array.sort(function () {
      return 0.5 - Math.random();
    });
  };
})(document);
//# sourceMappingURL=app.js.map

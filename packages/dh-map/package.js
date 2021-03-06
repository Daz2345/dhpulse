Package.describe({
  summary: 'dunnhumby Map package',
  version: '0.1.0',
  name: 'dh:map'
});

Package.onUse(function (api) {


  var packages = [
    'telescope:core',
    'pauloborges:mapbox@2.1.5',
    'harrison:papa-parse@1.1.0'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client & server

  api.addFiles([
    'lib/custom_fields.js',
    // 'lib/routes.js',
    // 'lib/namespace.js',
    // 'lib/stockalerts.js',
    // 'lib/callbacks.js'
  ], ['client', 'server']);

  // client

  api.addFiles([
    'lib/client/templates/map.html',
    'lib/client/templates/map.js',
    'lib/client/templates/main.js',
    'lib/client/stylesheets/custom.scss',
    'lib/client/stylesheets/_mixins.scss'
  ], ['client']);

});
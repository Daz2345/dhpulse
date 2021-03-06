Package.describe({
  summary: 'dunnhumby api version 2',
  version: '0.1.0',
  name: 'dh:apiv2'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core',
    'simple:rest@1.1.0',
    'simple:rest-accounts-password@1.1.2',
    'simple:rest-json-error-handler@1.0.1',
    'simple:json-routes@2.1.0'
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  // api.addFiles([
  //   'package-tap.i18n'
  // ], ['client', 'server']);

  // client & server

  // api.addFiles([
  //   'lib/custom_fields.js',
  //   'lib/template_modules.js',
  //   'lib/callbacks.js'
  // ], ['client', 'server']);

  // client

  // api.addFiles([
  //   'lib/client/templates/hello.html',
  //   'lib/client/templates/hello.js',
  //   'lib/client/templates/custom_post_title.html',
  //   'lib/client/templates/custom_post_title.js',
  //   'lib/client/stylesheets/custom.scss',
  //   'lib/client/custom_templates.js'
  // ], ['client']);

  // server

  api.addFiles([
    'lib/server/methods.js',
    'lib/server/start.js'    
  ], ['server']);

  // i18n languages (must come last)

  // api.addFiles([
  //   'i18n/en.i18n.json'
  // ], ['client', 'server']);

});

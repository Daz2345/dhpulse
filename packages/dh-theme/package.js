Package.describe({
  summary: 'dunnhumby theme',
  version: '0.1.0',
  name: 'dh:theme'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  var packages = [
    'telescope:core',
    // 'webbroi:telescope-theme-iris@0.3.0',
    'natestrauser:animate-css@3.5.1',    
  ];

  api.use(packages);
  api.imply(packages);

  // ---------------------------------- 2. Files to include ----------------------------------

  // client

  api.addFiles([
    'lib/client/stylesheets/custom.scss'
  ], ['client']);

});

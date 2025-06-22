var path = require('path');
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }),
      // add an alias for "our" imports
      addWebpackAlias({
        '@zeep/assets': path.resolve(__dirname, 'src/assets'),
        '@zeep/components': path.resolve(__dirname, 'src/components'),
        '@zeep/config': path.resolve(__dirname, 'src/config'),
        '@zeep/containers': path.resolve(__dirname, 'src/containers'),
        '@zeep/redux': path.resolve(__dirname, 'src/redux'),
        '@zeep/lib': path.resolve(__dirname, 'src/library'),
        '@zeep/ui': path.resolve(__dirname, 'src/UI'),
        '@zeep/zustand': path.resolve(__dirname, 'src/zustand'),
        '@zeep/modules': path.resolve(__dirname, 'src/modules'),
        '@zeep/settings': path.resolve(__dirname, 'src/settings'),
      })
      
    )(config, env)
  );
};

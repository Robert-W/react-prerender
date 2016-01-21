var reactPrerender = require('../index');
var expect = require('chai').expect;
var path = require('path');

describe('react-prerender', function () {

  it('should be a function', function () {
    expect(reactPrerender).to.be.a('function');
  });

  it('should not throw an error when give proper configuration', function () {
    //- Assemble the necessary options
    var amdDir = path.join(__dirname, '../samples/amd');
    var target = path.join(amdDir, 'index.html');
    var component = 'js/layout/App';
    var mount = 'body';
    var exports = 'App';
    var requirejs = {
      baseUrl: amdDir,
      paths: {
        'js': 'js',
        'vendor': 'vendor',
        'react': 'vendor/react/react.min',
        'react-motion': 'vendor/react-motion/build/react-motion',
        'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill'
      },
      map: {
        moduleRoot: path.join(amdDir, 'js'),
        remapModule: 'js/config',
        ignorePatterns: [/esri\//]
      }
    };

    reactPrerender({
      target: target,
      component: component,
      mount: mount,
      exportName: exports,
      requirejs: requirejs
    });

  });

});

/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;
var utils = require('../lib/utils');

describe('utils - optionsAreValid', function () {

  it('should return true if all required options are provided', function () {
    expect(utils.optionsAreValid({
      mount: 'root',
      target: 'index.html',
      component: 'components/App'
    })).to.be.ok;
  });

  it('should return false if any required options are omitted', function () {
    expect(utils.optionsAreValid({
      mount: 'root',
      target: 'index.html'
    })).to.not.be.ok;
  });

  it('should return false if any required options are the incorrect type', function () {
    expect(utils.optionsAreValid({
      mount: 'root',
      target: {},
      component: function () {}
    })).to.not.be.ok;
  });

});

describe('utils - requirejsOptionsAreValid', function () {

  it('should return true if the user has provided baseUrl and paths of the correct types', function () {
    expect(utils.requirejsOptionsAreValid({
      baseUrl: 'build',
      paths: {
        'js': 'js',
        'components': 'js/components'
      }
    })).to.be.ok;
  });

  it('should return true if the user has provided a build profile that is the correct type', function () {
    expect(utils.requirejsOptionsAreValid({
      buildProfile: 'build.js'
    })).to.be.ok;
  });

  it('should return false if any of the required options are not provided.', function () {
    expect(utils.requirejsOptionsAreValid({
      baseUrl: 'build'
    })).to.not.be.ok;
    expect(utils.requirejsOptionsAreValid({
      paths: { 'js': 'js' }
    })).to.not.be.ok;
    expect(utils.requirejsOptionsAreValid({})).to.not.be.ok;
  });

  it('should return false if any of the required options are not the correct type', function () {
    expect(utils.requirejsOptionsAreValid({
      baseUrl: {}
    })).to.not.be.ok;
    expect(utils.requirejsOptionsAreValid({
      baseUrl: '',
      paths: ''
    })).to.not.be.ok;
    expect(utils.requirejsOptionsAreValid({
      buildProfile: {}
    })).to.not.be.ok;
  });

});

describe('utils - mapOptionsAreValid', function () {

  it('should return true if the user provided the required options to generate a map configuration', function () {
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      remapModule: 'js/config',
      ignorePatterns: /esri\//
    })).to.be.ok;
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      remapModule: 'js/config',
      ignorePatterns: ['dojo/', /esri\//, /(.*\.)?cdn(.*)/g]
    })).to.be.ok;
  });

  it('should return false if the user did not provide the required options', function () {
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      remapModule: 'js/config'
    })).to.not.be.ok;
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      ignorePatterns: /esri\//
    })).to.not.be.ok;
  });

  it('should return false if the user provided any of the required options with the incorrect type', function () {
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      remapModule: ['js/config'],
      ignorePatterns: {}
    })).to.not.be.ok;
    expect(utils.mapOptionsAreValid({
      moduleRoot: 'js',
      remapModule: 'js/config',
      ignorePatterns: [{}]
    })).to.not.be.ok;
  });

});

describe('utils - loadBuildProfile', function () {
  it('should determine from options if I can remap certain dependencies to a dependency free module', function () {
    expect(true).to.be.ok;
  });
  it('should throw an error informing the user of required options to generate the remap', function () {
    expect(true).to.be.ok;
  });
});

describe('utils - generateRemap', function () {
  it('should generate a dictionary of dependencies mapped to the provided file', function () {
    expect(true).to.be.ok;
  });
  it('should only contain paths to files that match the ignore pattern', function () {
    expect(true).to.be.ok;
  });
  it('should return false if no files match the pattern so the remap can be excluded later', function () {
    expect(true).to.be.ok;
  });
  it('should log a warning if no files match the pattern', function () {
    expect(true).to.be.ok;
  });
});

describe('utils - generateMarkup', function () {
  it('should generate a static string that is a valid representation of the component', function () {
    expect(true).to.be.ok;
  });
  it('should throw a descriptive error if the markup can\'t be generated', function () {
    expect(true).to.be.ok;
  });
});

describe('utils - renderIntoFile', function () {
  it('should render the provided markup into the specified html file in the correct location', function () {
    expect(true).to.be.ok;
  });
  it('should throw an error if the provided file does not exist', function () {
    expect(true).to.be.ok;
  });
  it('should throw an error if the provided mount node does not exist', function () {
    expect(true).to.be.ok;
  });
});

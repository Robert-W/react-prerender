/* eslint no-unused-expressions: 0 */
var expect = require('chai').expect;
var utils = require('../lib/utils');
var sinon = require('sinon');
var path = require('path');

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
  it('should load a build profile and return a valid requirejs configuration', function () {
    var profilePath = path.join(__dirname, '../samples/build.js');
    var profile = utils.loadBuildProfile(profilePath);
    expect(profile.baseUrl).to.be.ok;
    expect(profile.paths).to.be.ok;
    expect(profile.baseUrl).to.be.a('string');
    expect(profile.paths).to.be.an('object');
  });

  it('should return an empty object if no profile is found', function () {
    var profile = utils.loadBuildProfile('../samples/some.non.existent.build.js');
    expect(profile.baseUrl).to.not.be.ok;
    expect(profile.paths).to.not.be.ok;
  });

});

describe('utils - generateRemap', function () {

  var amdBaseDir = path.join(__dirname, '../samples/amd/js');
  var expectedMap = { 'esri/map': 'js/config' };

  it('should generate a dictionary of dependencies mapped to the provided file', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', ['esri/']);
    for (var key in map) {
      expect(expectedMap[key]).to.equal(map[key]);
    }
  });

  it('should only contain paths to files that match an ignore string', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', ['esri/']);
    expect(Object.keys(map)).to.have.length(1);
    expect(Object.keys(map)[0]).to.equal('esri/map');
  });

  it('should only contain paths to files that match an ignore regular expression', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', /esri\//);
    expect(Object.keys(map)).to.have.length(1);
    expect(Object.keys(map)[0]).to.equal('esri/map');
  });

  it('should only contain paths to files that match an array of strings', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', ['esri/']);
    expect(Object.keys(map)).to.have.length(1);
    expect(Object.keys(map)[0]).to.equal('esri/map');
  });

  it('should only contain paths to files that match an array of regular expression', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', [/esri\//]);
    expect(Object.keys(map)).to.have.length(1);
    expect(Object.keys(map)[0]).to.equal('esri/map');
  });

  it('should return an empty object if no files match the pattern', function () {
    var map = utils.generateRemap(amdBaseDir, 'js/config', ['somethingNonExistent/']);
    expect(Object.keys(map)).to.have.length(0);
    expect(map).to.be.empty;
  });

  it('should log a warning if no files match the pattern', function () {
    sinon.spy(console, 'warn');
    var map = utils.generateRemap(amdBaseDir, 'js/config', ['somethingNonExistent/']);
    expect(console.warn.called).to.be.true;
    expect(Object.keys(map)).to.have.length(0);
    expect(map).to.be.empty;
  });

});

describe('utils - generateMarkup', function () {

  it('should throw an error if the markup can\'t be generated', function () {
    try {
      utils.generateMarkup({});
    } catch (err) {
      expect(err).to.be.ok;
    }
  });

});

describe('utils - renderIntoFile', function () {

  var htmlFile = path.join(__dirname, '../samples/amd/index.html');
  var badFilePath = path.join(__dirname, '../samples/amd/bad.html');
  var mockComponentOutput = '<div>My Component</div>';

  it('should throw an error if the provided file does not exist', function () {
    try {
      utils.renderIntoFile(badFilePath, 'body', mockComponentOutput);
    } catch (err) {
      expect(err).to.be.ok;
    }
  });
  it('should throw an error if the provided mount node does not exist', function () {
    try {
      utils.renderIntoFile(htmlFile, '#badNode', mockComponentOutput);
    } catch (err) {
      expect(err).to.be.ok;
    }
  });
});

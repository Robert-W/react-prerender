# react-prerender [![Build Status](https://travis-ci.org/Robert-W/react-prerender.svg?branch=master)](https://travis-ci.org/Robert-W/react-prerender)
> Simple node script to prerender react components.  This is designed to be used as a tool in the build process and can run right after Grunt/Gulp or any other build tools you use.

#### Currently only supporting React > 0.14

### Purpose
Any application rendering their UI from javascript should prerender it's UI because of the improved SEO and UX it offers.  This script will attempt to prender your React components in node and inject them into your html. The most difficult part of this process is requiring AMD components in node.  This script aims to help by allowing you to pass in a simple package configuration, so node knows how to find those modules, a list of patterns/modules to ignore, for plugins and hosted modules, props, export names for babel generated AMD modules, and more. Please refer to [Options](#Options) for a full list.

### Usage

#### Gotchas
1. Currently only supporting React > `0.14.0`.
2. Your components render functions cannot use any modules required via requirejs plugins, or cdn/empty modules that are not available at compile time. Modules that are not availble in the project's src will trip up this script when it attempts to require your component unless you tell this plugin to remap those modules. However, if they are used in your render function then this will probably not work or will at best render undefined.
3. Common JS support coming soon.

#### Examples
Below is a full example using almost all of the available options.  The project this configuration is for can be found under `samples/amd`
```javascript
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
```

Here is another example for the same project that leverages a bulid profile instead of providing a baseUrl and paths object.
```javascript
var amdDir = path.join(__dirname, '../samples/amd');
var target = path.join(amdDir, 'index.html');
var component = 'js/layout/App';
var mount = 'body';
var exports = 'App';
var requirejs = {
  buildProfile: path.join(amdDir, '../build.js'),
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
```

### Options

This script exports a single function that takes a single parameter, an options object. Here are all the available options.

#### target
Type: `string`<br>
Default: `none`<br>
Required: Yes

Path to your html file that you are appending your react component into.

#### component
Type: `string`<br>
Default: `none`<br>
Required: Yes

Path to your component. If you are using amd, this is relative to your baseUrl.

#### mount
Type: `string`<br>
Default: `none`<br>
Required: Yes

Simple query string that will be used to locate the dom node to mount the component to. For example, something like `body`, `#root`, or `.react-mount`. Make sure it only matches a single node otherwise the script may inject your component into each match.

#### props
Type: `object`<br>
Default: `{}`<br>
Required: No

Default props for your component.

#### exportName
Type: `string`<br>
Default: `default`<br>
Required: No

If you are using es6 and compiled to AMD, this is the export name of the module if it is not the default export. For example, if your component class looks like this:
```javascript
export class App extends React.Component { ... }
```
Then your exportName would be App.

#### requirejs
Type: `object`<br>
Default: `none`<br>
Required: No

If you are using AMD, you will probably need to include this configuration.  All the options below are part of this object.

#### requirejs.paths
Type: `object`<br>
Default: `none`<br>
Required: No

This is your paths/package configuration with the paths relative to your baseUrl. For Example:

```javascript
{
  'js': 'js',
  'vendor': 'vendor',
  'react': 'vendor/react/react.min',
  'react-motion': 'vendor/react-motion/build/react-motion',
  'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill'
}
```

#### requirejs.baseUrl
Type: `string`<br>
Default: `none`<br>
Required: No

Base Url for your paths/packages object provided above.

#### requirejs.buildProfile
Type: `string`<br>
Default: `none`<br>
Required: No

Full Path to a build profile for requirejs's optimizer (not relative to your baseUrl). This can be an alternative to path's and baseUrl if you have a buildProfile. Just provide the path to it and this will read the path's and baseUrl from there. See `samples/build.js` for an example.

#### Remapping plugins or empty modules.

If you have require calls to modules that are not available until runtime or use plugins, such as `text!template/header.html` then you may need to use the following three options to tell requirejs to ignore those in node.  This will probably be the trickiest part to get right. This is achieved by creating a map object that tells requirejs when those modules are required, require the remapModule instead, which needs to be a module that can resolve all of its dependencies, so no plugins or modules hosted on CDN. If these modules are used in your render function then this plugin will not work for you.

#### requirejs.map.moduleRoot
Type: `string`<br>
Default: `none`<br>
Required: No

Full path to your entry module (not relative to your baseUrl). This plugin will attempt to create a dependency tree starting from here so that it can locate paths it needs to ignore.

#### requirejs.map.remapModule
Type: `string`<br>
Default: `none`<br>
Required: No

Relative path to the component you want to remap your `:empty` modules or plugins to. As stated above, this should not use plugins, cdn modules, or any modules that require these empty modules. Typically I use a config module that has no dependencies except for a possible constants file.

#### requirejs.map.ignorePatterns
Type: `string|regexp|array[string|regexp]`<br>
Default: `none`<br>
Required: No

Patterns to match modules that should be ignored and included in the map. Paths that match this pattern will be remapped to the above remapModule. This options accepts a string, RegExp, an array of strings, or an array of RegExp's.

### Contributing

If you are interested in contributing, please fork the develop branch. That is the branch with the latest changes in it and will be the most up to date.  No code will be merged unless the current tests pass, including linting.  Add documentation if you are adding a new feature and add tests where needed. When you are ready to merge your code, submit a pull request to the develop branch.

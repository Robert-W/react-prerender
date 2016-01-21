# react-prerender [![Build Status](https://travis-ci.org/Robert-W/react-prerender.svg?branch=master)](https://travis-ci.org/Robert-W/react-prerender)
> Simple node script to prerender react components.  This is designed to be used as a tool in the build process and can run right after Grunt/Gulp or any other build tools you use.

## Still Under Development
> prerender and prerenderUtils.js are the old working version, if you need to you can grab those files, install their dependencies, and configure them to use this while this is getting converted to a node module.

### Purpose
Any application rendering their UI from javascript should prerender it's UI because of the improved SEO and UX it offers.  This script will attempt to prender your React components in node and inject them into your html. The most difficult part of this process is requiring AMD components in node.  This script aims to help by allowing you to pass in a simple package configuration, so node knows how to find those modules, a list of patterns/modules to ignore, for plugins and hosted modules, props, export names for babel generated AMD modules, and more. Please refer to [Options](#Options) for a full list.

### Usage

#### Currently only supporting React > 0.14

Coming Soon

### Options

Coming Soon

### Contributing

If you are interested in contributing, please fork the develop branch. That is the branch with the latest changes in it and will be the most up to date.  No code will be merged unless the current tests pass, including linting.  Add documentation if you are adding a new feature and add tests where needed. When you are ready to merge your code, submit a pull request to the develop branch.

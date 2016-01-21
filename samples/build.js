/* eslint-disable */
({
  baseUrl: 'samples/amd',
	paths: {
		// Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
		// libs
    'react': 'vendor/react/react.min',
    'react-motion': 'vendor/react-motion/build/react-motion',
    'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill',
		// Configured Packages
    'js': 'js',
    'vendor': 'vendor'
	},
	name: 'js/main',
	out: 'dist/js/main.js'
})

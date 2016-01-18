/* eslint-disable */
({
  baseUrl: 'build',
	paths: {
		// Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
		// libs
    'alt': 'vendor/alt/dist/alt.min',
		'react': 'vendor/react/react.min',
		'react-dom': 'vendor/react/react-dom.min',
		// Configured Packages
		'js': 'js',
		'vendor': 'vendor',
		'stores': 'js/stores',
    'actions': 'js/actions',
    'components': 'js/components'
	},
	name: 'js/main',
	out: 'dist/js/main.js'
})

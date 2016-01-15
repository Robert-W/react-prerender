# react-prerender
>Simple node script to prerender react components.  This is designed to be used with projects using the AMD module loader.  You can configure paths, empty modules (cdn modules not present at runtime), input file and component, and output file.  You could also modify this to prerender multiple components to multiple files in one script.

### Purpose
Just because your app is not universal does not mean you should not prerender your components.  Static websites can and should prerender their components as well. In fact, any application rendering their UI from JavaScript should prerender because of the improved SEO and UX it offers.  This script can run after your Gulp/Grunt task to prerender your components and inject them into your html.

### Usage
>Note this is currently an internal tool still being developed and is used for all of my react projects.  There are example configurations in place with comments to explain how to configure the application until I have time to make this an npm module with better support and easier configurations.

1. Copy the files or clone the repo
2. `npm install` the files or `chmod 777 install.sh && ./install.sh`
3. Configure prerender.js using the `config` variable near the top of the file.

### Coming Soon
1. Better documentation
2. Easier configuration and use
3. Make this it's own npm module
4. Better error handling and messaging
5. Tests and CI

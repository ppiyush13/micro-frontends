class EntryChunkLoader {
    apply(compiler) {
        //console.log('Welcome');
        compiler.hooks.emit.tapAsync('EntryChunkLoader', (compilation, callback) => {

            const entryNames = Array.from(compilation.entrypoints.keys());
            //console.log(compilation);
            // Create a header string for the generated file:
            var filelist = 'In this build:\n\n';

            const {js, css} = this.htmlWebpackPluginAssets(compilation, entryNames);

            // Loop through all compiled assets,
            // adding a new line item for each filename.
            filelist += js.join('\n');

            // Insert this list into the webpack build as a new file asset:
            compilation.assets['filelist.md'] = {
                source: function () {
                    return filelist;
                },
                size: function () {
                    return filelist.length;
                }
            };

            const stringifyArray = array => {
                const arrayItems = array.map(item => `'${item}'`).join(', ');
                return `[ ${arrayItems} ]`;
            };

            /* const loadSource = compilation.assets['load.js'].source();
            const newSource = loadSource.replace('\'%ENTRY_FILES%\'', stringifyArray(js));
            compilation.assets['js/load.js'] = {
                source: () => newSource,
                size: () => newSource.length,
            }; */

            callback();
        });
    }

    htmlWebpackPluginAssets(compilation, entryNames) {
        const publicPath = '/';
        const assets = {
            // Will contain all js and mjs files
            js: [],
            // Will contain all css files
            css: [],
        };

        // Extract paths to .js, .mjs and .css files from the current compilation
        const entryPointPublicPathMap = {};
        const extensionRegexp = /\.(css|js|mjs)(\?|$)/;
        for (let i = 0; i < entryNames.length; i++) {
            const entryName = entryNames[i];
            const entryPointFiles = compilation.entrypoints.get(entryName).getFiles();
            // Prepend the publicPath and append the hash depending on the
            // webpack.output.publicPath and hashOptions
            // E.g. bundle.js -> /bundle.js?hash
            const entryPointPublicPaths = entryPointFiles
                .map(chunkFile => {
                    return this.urlencodePath(chunkFile);
                });

            entryPointPublicPaths.forEach((entryPointPublicPath) => {
                const extMatch = extensionRegexp.exec(entryPointPublicPath);
                // Skip if the public path is not a .css, .mjs or .js file
                if (!extMatch) {
                    return;
                }
                // Skip if this file is already known
                // (e.g. because of common chunk optimizations)
                if (entryPointPublicPathMap[entryPointPublicPath]) {
                    return;
                }
                entryPointPublicPathMap[entryPointPublicPath] = true;
                // ext will contain .js or .css, because .mjs recognizes as .js
                const ext = extMatch[1] === 'mjs' ? 'js' : extMatch[1];
                assets[ext].push(entryPointPublicPath);
            });
        }
        return assets;
    }

    /**
     * Encode each path component using `encodeURIComponent` as files can contain characters
     * which needs special encoding in URLs like `+ `.
     *
     * @param {string} filePath
     */
    urlencodePath(filePath) {
        return filePath.split('/').map(encodeURIComponent).join('/');
    }
}

//module.exports = EntryChunkLoader;

const HtmlWebpackPlugin = require("html-webpack-plugin");

//console.log(HtmlWebpackPlugin.version);

module.exports = EntryChunkLoader;

//module.exports = 
class EntryChunkLoader2 {
    apply(compiler) {
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            console.log('The compiler is starting a new compilation...')

            // Static Plugin interface |compilation |HOOK NAME | register listener 
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                'MyPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    // Manipulate the content
                    console.log('Data__________________' , data);
                    // Tell webpack to move on
                    cb(null, data);
                    return false;
                }
            )
        });

        compiler.hooks.emit.tapAsync('EntryChunkLoader', (compilation, callback) => {
            console.log(compilation.assets['./index.html']);
            delete compilation.assets['./index.html'];
            /* compilation.assets['index.html'] = {
                source: function () {
                    return filelist;
                },
                size: function () {
                    return filelist.length;
                }
            }; */

            callback();
        });
    }
};

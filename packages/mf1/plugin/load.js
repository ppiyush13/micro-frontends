//import('webpack-hashed-chunkids');
import $script from 'loadjs';

function loadScript() {
    //const scripts = '%ENTRY_FILES%';
    const scripts = ['http://localhost:9001/vendors~main.js', 'http://localhost:9001/main.js'];
    $script(scripts[0], () => {
        $script(scripts[1], () => {
            console.log('done');
            __webpack_modules__
        });
    });
}

export default loadScript;
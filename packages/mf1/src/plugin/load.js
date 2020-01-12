import $script from 'loadjs';

function loadScripts(scripts) {
    return new Promise((resolve, reject) => {
        if(scripts.length) {
            return resolve();
        }
        $script(scripts, () => {
            resolve();
        });
    });
}

function loadApp() {
    return new Promise((resolve, reject) => {
        import(/* webpackChunkName: "App" */'../App').then((module) => {
            resolve(module);
        })
        .catch(ex => {
            reject(ex);
        });
    });
}

function loadScript() {
    return new Promise((resolve, reject) => {
        const scripts = ['http://localhost:9001/vendors.js'];

        loadScripts(scripts)
            .then(() => {
                return loadApp();
            })
            .then((module) => {
                resolve(module);
            })
            .catch(ex => {
                reject(ex);
            });
    });
}

export default loadScript;

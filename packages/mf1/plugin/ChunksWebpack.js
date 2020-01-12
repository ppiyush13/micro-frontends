
class ChunksWebpack {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ChunksWebpack', (compilation, callback) => {

            compilation.chunkGroups.forEach(chunkGroup => {
                // Check if chunkGroup contains chunks
                if (chunkGroup.chunks.length) {
                    console.log(chunkGroup.chunks);
                }
            })

            callback();
        });
    }
}

module.exports = ChunksWebpack;
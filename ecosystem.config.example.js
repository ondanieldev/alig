module.exports = {
    apps: [{
        name: 'alig',
        script: 'dist/index.js',
        exec_mode: 'fork',
        max_memory_restart: '200M'
    }]
}
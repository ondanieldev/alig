module.exports = {
    apps: [{
        name: 'uSocial',
        script: 'dist/index.js',
        exec_mode: 'fork',
        max_memory_restart: '200M'
    }]
}
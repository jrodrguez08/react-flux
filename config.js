module.exports = () => {
    const config = {
        port: 8080,
        devBaseUrl: 'http://localhost',
        paths: {
            css: {
                main: './src/styles/*.scss',
                global: './src/styles/**/*.scss',
                bundle: './dist/css/*.css'
            },
            dist: './dist',
            html: './src/views/*.html',
            js: './src/js/**/*.js',
            mainJS: './src/js/main.js'
        }
    };
    return config;
};
var baseConfig = require('./karma-base.conf');

module.exports = baseConfig({
    vendor: [
        'tests/vendor/bootstrap-5.1.3.bundle.js'
    ],
    src: ['build/dist/bsbox.js', 'build/dist/bsbox.locales.js']
});
require.config({
    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'snap': '../bower_components/Snap.svg/dist/snap.svg'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        }
    },
    deps: ['./bootstrap']
});
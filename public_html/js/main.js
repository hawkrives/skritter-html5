/**
 * This is the main load file which contains all of the RequireJS paths.
 * It also detects if Cordova is present to handle document ready slightly differently.
 * 
 * @author Joshua McFarland
 */
requirejs.config({
    baseUrl: 'js/app/',
    urlArgs: 'cb=' + Math.random(),
    main: 'Application',
    paths: {
        //directories
        component: 'view/component',
        media: '../../media',
        prompt: 'view/prompt',
        template: '../../template',
        //libraries
        async: '../lib/async',
        backbone: '../lib/backbone-1.1.0.min',
        base64: '../lib/base64',
        bootstrap: '../lib/bootstrap-3.0.0.min',
        'createjs.easel': '../lib/createjs.easeljs-0.7.0.min',
        'createjs.preload': '../lib/createjs.preloadjs-0.4.0.min',
        'createjs.sound': '../lib/createjs.soundjs-0.5.0.min',
        'createjs.tween': '../lib/createjs.tweenjs-0.5.0.min',
        'indexeddb.shim': '../lib/indexeddb.shim-0.1.2.min',
        jquery: '../lib/jquery-1.10.2.min',
        'jquery.hammer': '../lib/jquery.hammerjs-1.0.5.min',
        'jquery.indexeddb': '../lib/jquery.indexeddb',
        lodash: '../lib/lodash.compat-2.2.1.min',
        'require.text': '../lib/require.text-2.0.10'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'lodash', 'require.text'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        jquery: {
            exports: '$'
        },
        'jquery.hammer': {
            deps: ['jquery']
        },
        'jquery.indexeddb': {
            deps: ['jquery']
        },
        lodash: {
            exports: '_'
        }
    }
});

requirejs.onError = function (error) {
    console.log('RequireJS Error', error.requireType);
    if (error.requireType === 'timeout') {
        console.log('modules: ' + error.requireModules);
    }
};

requirejs(['Application']);
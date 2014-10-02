define([
    'async',
    'fastclick',
    'handlebars',
    'moment.timezone',
    'raygun',
    'backbone.routefilter',
    'bootstrap.switch',
    'createjs.easel',
    'createjs.tween',
    'jquery.mobile',
    'jquery.ui',
    'modernizr',
    'require.i18n',
    'require.text'
], function(Async, FastClick, Handlebars, Moment) {
    window.async = Async;
    window.fastclick = new FastClick(document.body);
    window.handlebars = Handlebars;
    window.moment = Moment;
    window.raygun = Raygun.noConflict();
});
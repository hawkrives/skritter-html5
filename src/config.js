gelato.addFonts({
    custom: {
        families: ['Kaisho', 'Muli', 'Roboto Slab', 'Simkai'],
        urls: ['fonts.css']
    }
});

gelato.addPaths({
    'bootstrap.datetimepicker': 'libraries/bootstrap.datetimepicker-4.7.14.min',
    'chart': 'libraries/chart-1.0.2.min',
    'createjs.easel': 'libraries/createjs.easel-NEXT.min',
    'createjs.tween': 'libraries/createjs.tween-NEXT.min',
    'd3': 'libraries/d3-3.5.5.min',
    'heatmap': 'libraries/heatmap-3.5.2.min',
    'raygun': 'libraries/raygun-1.18.3.min'
});

gelato.addShim({
    'heatmap': ['d3']
});
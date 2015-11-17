requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet',
        'base':'common/base',
        'plugin':'common/plugin',
        'router':'modules/module_router',
        'controll_common':'controller/controll_common',
        'disqus':'modules/module_disqus',
        'clipboard':'lib/zenorocha/zenorocha.clipboard.min'
    },
    shim:{
        'controll_common':{
            deps:['plugin', 'highlighter'],
            exports:'controll_common'
        }/*,
        'disqus':{
            deps:['//gsuicov.disqus.com/embed.js', '//gsuicov.disqus.com/count.js'],
            exports:'disqus'
        }*/
    }
});



require(['base', 'router', 'controll_common', 'disqus', 'clipboard'], function(Base, Route, Common, Sns, ClipBoard){

    "use strict";

    var common = new Common();
    var sns = new Sns();


    Base.loader('js/json/routejson.json', function(data){
        Route.registerRoutes(JSON.parse(data)).init().loadController();
    });    

    //addCommonEvent
    $(window).scroll(function(e){
        common.scroll($(window).scrollTop());
    });
    $(window).resize(function(e){
        common.resize();
    });
    $(window).trigger('scroll');
});
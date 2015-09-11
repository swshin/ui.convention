requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet.min',
        'idangerSwiper':'lib/idangerous/idangerous_2.5.5',
        'iscroll':'lib/iscroll/iscroll_5.1.1',
        'base':'common/base',
        'plugin':'common/plugin',
        'common':'controller/controll_common',
        'controller':'controller/controller'
    },
    shim:{
        'controller':{
            deps:['plugin', 'highlighter'],
            exports:'controller'
        }
    }
});

require(
    ['controller'],
    function(Templete){
        "use strict";

        var page = new Templete();

        //common Event
        /*$(window).on({
            resize:function(e){
                page.resize();
            },
            scroll:function(){
                page.scroll();
            }
        });

        $(window).trigger('scroll');


        $(document).on('touchend', function(e){
            common.touchend();
        });*/
    }
);
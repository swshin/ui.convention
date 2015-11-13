define(['base', 'clipboard'], function(Base, ClipBoard){
        
	"use strict";

    var Controller = function(){}
    var clipBoard;
    var arrStyle = [];

    Controller.prototype = {
        init:function(){
            console.log('controll_narmal');
        },
        appendTemplete:function(data){
            $('.contents').html(Base.codeMarkDown(data));
            $('pre.html').snippet('html', {style:'ide-codewarrior', clipboard:true});
            $('pre.style').snippet('css', {style:'ide-codewarrior', clipboard:true});
            $('pre.js').snippet('javascript', {style:'ide-codewarrior', clipboard:true});

            clipBoard = new ClipBoard('[data-clipboard-btn]');
            clipBoard.on('success', function(e){
                alert('copied complete');
            });
            
        },
        appendScript:function(data){
            var script = document.createElement('script');
            script.id = 'page-script';
            script.type = 'text/javascript';
            script.innerHTML = data;
            document.body.appendChild(script);
        },
        appendStyle:function(data, name){
            var styleSheet = document.createElement('style');
            styleSheet.id = name;
            styleSheet.type = 'text/css';
            styleSheet.rel = 'stylesheet';
            styleSheet.innerHTML = data;
            document.body.appendChild(styleSheet);

            arrStyle.push(name);
        },
        destroy:function(){
            $('#page-script').remove();

            for(var index in arrStyle){
                $('#' + arrStyle[index]).remove();
            }
            clipBoard.destroy();
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});
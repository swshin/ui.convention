/*
 * Snippet :: jQuery Syntax Highlighter v2.0.0
 * http://steamdev.com/snippet
 *
 * Copyright 2011, SteamDev
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Jan 19, 2011
 */
(function(a) {
    window.log = function() {
        log.history = log.history || [];
        log.history.push(arguments);
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments))
        }
    }
    ;
    a.fn.snippet = function(e, c) {
        if (typeof e == "object") {
            c = e
        }
        if (typeof e == "string") {
            e = e.toLowerCase()
        }
        var d = {
            style: "random",
            showNum: true,
            transparent: false,
            collapse: false,
            menu: true,
            showMsg: "Expand Code",
            hideMsg: "Collapse Code",
            clipboard: "",
            startCollapsed: true,
            startText: false,
            box: "",
            boxColor: "",
            boxFill: ""
        };
        var b = ["acid", "berries-dark", "berries-light", "bipolar", "blacknblue", "bright", "contrast", "darkblue", "darkness", "desert", "dull", "easter", "emacs", "golden", "greenlcd", "ide-anjuta", "ide-codewarrior", "ide-devcpp", "ide-eclipse", "ide-kdev", "ide-msvcpp", "kwrite", "matlab", "navy", "nedit", "neon", "night", "pablo", "peachpuff", "print", "rand01", "the", "typical", "vampire", "vim", "vim-dark", "whatis", "whitengrey", "zellner"];
        if (c) {
            a.extend(d, c)
        }
        return this.each(function() {
            var H = d.style.toLowerCase();
            if (d.style == "random") {
                var D = Math.floor(Math.random() * (b.length));
                H = b[D]
            }
            var u = a(this);
            var y = this.nodeName.toLowerCase();
            if (y == "pre") {
                if (u.data("orgHtml") == undefined || u.data("orgHtml") == null ) {
                    var f = u.html();
                    u.data("orgHtml", f)
                }
                if (!u.parent().hasClass("snippet-wrap")) {
                    if (typeof e != "string") {
                        if (u.attr("class").length > 0) {
                            var t = ' class="' + u.attr("class") + '"'
                        } else {
                            var t = ""
                        }
                        if (u.attr("id").length > 0) {
                            var J = ' id="' + u.attr("id") + '"'
                        } else {
                            var J = ""
                        }
                        var A = "Snippet Error: You must specify a language on inital usage of Snippet. Reference <pre" + t + J + ">";
                        console.log(A);
                        return false
                    }
                    u.addClass("sh_" + e).addClass("snippet-formatted").wrap("<div class='snippet-container' style='" + u.attr("style") + ";'><div class='sh_" + H + " snippet-wrap'></div></div>");
                    u.removeAttr("style");
                    sh_highlightDocument();
                    if (d.showNum) {
                        var v = u.html();
                        v = v.replace(/\n/g, "</li><li>");
                        v = "<ol class='snippet-num'><li>" + v + "</li></ol>";
                        while (v.indexOf("<li></li></ol>") != -1) {
                            v = v.replace("<li></li></ol>", "</ol>")
                        }
                    } else {
                        var v = u.html();
                        v = v.replace(/\n/g, "</li><li>");
                        v = "<ul class='snippet-no-num'><li>" + v + "</li></ul>";
                        while (v.indexOf("<li></li></ul>") != -1) {
                            v = v.replace("<li></li></ul>", "</ul>")
                        }
                    }
                    v = v.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                    u.html(v);
                    while (u.find("li").eq(0).html() == "") {
                        u.find("li").eq(0).remove()
                    }
                    u.find("li").each(function() {
                        if (a(this).html().length < 2) {
                            var i = (a(this).html()).replace(/\s/g, "");
                            if (i == "") {
                                if (a.browser.opera) {
                                    a(this).html("&nbsp;")
                                } else {
                                    a(this).html("<span style='display:none;'>&nbsp;</span>")
                                }
                            }
                        }
                    }
                    );
                    var w = "<pre class='snippet-textonly sh_sourceCode' style='display:none;'>" + u.data("orgHtml") + "</pre>";
                    var r = "<div class='snippet-menu sh_sourceCode' style='display:none;'><pre><a class='snippet-copy' data-clipboard-btn href='#'><i class='fa fa-clipboard'></i></a><a class='snippet-text' href='#'><i class='fa fa-text-width'></i></a><a class='snippet-window' style='display:none;' href='#'>pop-up</a></pre></div>";
                    u.parent().append(w);
                    u.parent().prepend(r);
                    u.parent().hover(function() {
                        a(this).find(".snippet-menu").fadeIn("fast");
                    }
                    , function() {
                        a(this).find(".snippet-menu").fadeOut("fast");
                    });

                    if (d.clipboard != "" && d.clipboard != false) {


                        //zeroClipboard.js 사용에 따른 수정 20151028
                        /*var j = u.parent().find("a.snippet-copy");
                        j.show();
                        j.parents(".snippet-menu").show();
                        var s = u.parents(".snippet-wrap").find(".snippet-textonly").text();
                        ZeroClipboard.setMoviePath(d.clipboard);
                        var G = new ZeroClipboard.Client();
                        G.setText(s);
                        G.glue(j[0], j.parents(".snippet-menu")[0]);
                        G.addEventListener("complete", function(i, o) {
                            if (o.length > 500) {
                                o = o.substr(0, 500) + "...\n\n(" + (o.length - 500) + " characters not shown)";
                            }
                            alert("Copied text to clipboard:\n\n " + o);
                        });
                        j.parents(".snippet-menu").hide();*/

                        var j = u.parent().find("a.snippet-copy");
                        var s = u.parents(".snippet-wrap").find(".snippet-textonly").text();
                        j.attr({
                            'data-clipboard-action':'copy',
                            'data-clipboard-text':s
                        });

                        j.on('click', function(e){
                            e.preventDefault();
                        });

                    } else {
                        u.parent().find("a.snippet-copy").hide();
                    }

                    function is_ie() {
                        if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1) return false;
                        if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) return true;
                        if(navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) return true;
                        return false;
                    }   

                    u.parent().find("a.snippet-text").click(function() {
                        var o = a(this).parents(".snippet-wrap").find(".snippet-formatted");
                        var i = a(this).parents(".snippet-wrap").find(".snippet-textonly");
                        o.toggle();
                        i.toggle();
                        /*if (i.is(":visible")) {
                            a(this).html("html")
                        } else {
                            a(this).html("text")
                        }*/
                        a(this).blur();
                        return false
                    }
                    );
                    u.parent().find("a.snippet-window").click(function() {
                        var i = a(this).parents(".snippet-wrap").find(".snippet-textonly").html();
                        snippetPopup(i);
                        a(this).blur();
                        return false
                    }
                    );
                    if (!d.menu) {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").hide()
                    }
                    if (d.collapse) {
                        var n = u.parent().attr("class");
                        var h = "<div class='snippet-reveal " + n + "'><pre class='sh_sourceCode'><a href='#' class='snippet-toggle'>" + d.showMsg + "</a></pre></div>";
                        var E = "<div class='sh_sourceCode snippet-hide'><pre><a href='#' class='snippet-revealed snippet-toggle'>" + d.hideMsg + "</a></pre></div>";
                        u.parents(".snippet-container").append(h);
                        u.parent().append(E);
                        var z = u.parents(".snippet-container");
                        if (d.startCollapsed) {
                            z.find(".snippet-reveal").show();
                            z.find(".snippet-wrap").eq(0).hide()
                        } else {
                            z.find(".snippet-reveal").hide();
                            z.find(".snippet-wrap").eq(0).show()
                        }
                        z.find("a.snippet-toggle").click(function() {
                            z.find(".snippet-wrap").toggle();
                            return false
                        }
                        )
                    }
                    if (d.transparent) {
                        var k = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-reveal pre").css(k)
                    }
                    if (d.startText) {
                        u.hide();
                        u.next(".snippet-textonly").show();
                        u.parent().find(".snippet-text").html("html")
                    }
                    if (d.box != "") {
                        var m = "<span class='box-sp'>&nbsp;</span>";
                        var C = d.box.split(",");
                        for (var B = 0; B < C.length; B++) {
                            var I = C[B];
                            if (I.indexOf("-") == -1) {
                                I = parseFloat(I) - 1;
                                u.find("li").eq(I).addClass("box").prepend(m)
                            } else {
                                var g = parseFloat(I.split("-")[0]) - 1;
                                var l = parseFloat(I.split("-")[1]) - 1;
                                if (g < l) {
                                    u.find("li").eq(g).addClass("box box-top").prepend(m);
                                    u.find("li").eq(l).addClass("box box-bot").prepend(m);
                                    for (var p = g + 1; p < l; p++) {
                                        u.find("li").eq(p).addClass("box box-mid").prepend(m)
                                    }
                                } else {
                                    if (g == l) {
                                        u.find("li").eq(g).addClass("box").prepend(m)
                                    }
                                }
                            }
                        }
                        if (d.boxColor != "") {
                            u.find("li.box").css("border-color", d.boxColor)
                        }
                        if (d.boxFill != "") {
                            u.find("li.box, li.box-top, li.box-mid, li.box-bot").addClass("box-bg").css("background-color", d.boxFill)
                        }
                        if (a.browser.webkit) {
                            u.find(".snippet-num li.box").css("margin-left", "-3.3em");
                            u.find(".snippet-num li .box-sp").css("width", "21px")
                        }
                    }
                    u.parents(".snippet-container").find("a").addClass("sh_url")
                } else {
                    u.parent().attr("class", "sh_" + H + " snippet-wrap");
                    u.parents(".snippet-container").find(".snippet-reveal").attr("class", "sh_" + H + " snippet-wrap snippet-reveal");
                    u.find("li.box, li.box-top, li.box-mid, li.box-bot").removeAttr("style").removeAttr("class");
                    u.find("li .box-sp").remove();
                    if (d.transparent) {
                        var k = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-hide pre").css(k)
                    } else {
                        var k = {
                            "background-color": "",
                            "box-shadow": "",
                            "-moz-box-shadow": "",
                            "-webkit-box-shadow": ""
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-reveal pre").css(k)
                    }
                    if (d.showNum) {
                        var F = u.find("li").eq(0).parent();
                        if (F.hasClass("snippet-no-num")) {
                            F.wrap("<ol class='snippet-num'></ol>");
                            var q = u.find("li").eq(0);
                            q.unwrap()
                        }
                    } else {
                        var F = u.find("li").eq(0).parent();
                        if (F.hasClass("snippet-num")) {
                            F.wrap("<ul class='snippet-no-num'></ul>");
                            var q = u.find("li").eq(0);
                            q.unwrap()
                        }
                    }
                    if (d.box != "") {
                        var m = "<span class='box-sp'>&nbsp;</span>";
                        var C = d.box.split(",");
                        for (var B = 0; B < C.length; B++) {
                            var I = C[B];
                            if (I.indexOf("-") == -1) {
                                I = parseFloat(I) - 1;
                                u.find("li").eq(I).addClass("box").prepend(m)
                            } else {
                                var g = parseFloat(I.split("-")[0]) - 1;
                                var l = parseFloat(I.split("-")[1]) - 1;
                                if (g < l) {
                                    u.find("li").eq(g).addClass("box box-top").prepend(m);
                                    u.find("li").eq(l).addClass("box box-bot").prepend(m);
                                    for (var p = g + 1; p < l; p++) {
                                        u.find("li").eq(p).addClass("box box-mid").prepend(m)
                                    }
                                } else {
                                    if (g == l) {
                                        u.find("li").eq(g).addClass("box").prepend(m)
                                    }
                                }
                            }
                        }
                        if (d.boxColor != "") {
                            u.find("li.box").css("border-color", d.boxColor)
                        }
                        if (d.boxFill != "") {
                            u.find("li.box").addClass("box-bg").css("background-color", d.boxFill)
                        }
                        if (a.browser.webkit) {
                            u.find(".snippet-num li.box").css("margin-left", "-3.3em");
                            u.find(".snippet-num li .box-sp").css("width", "21px")
                        }
                    }
                    sh_highlightDocument();
                    if (!d.menu) {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").hide()
                    } else {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").show()
                    }
                }
            } else {
                var A = "Snippet Error: Sorry, Snippet only formats '<pre>' elements. '<" + y + ">' elements are currently unsupported.";
                console.log(A);
                return false
            }
        }
        )
    }
}
)(jQuery);
function snippetPopup(a) {
    top.consoleRef = window.open("", "myconsole", "width=600,height=300,left=50,top=50,menubar=0,toolbar=0,location=0,status=0,scrollbars=1,resizable=1");
    top.consoleRef.document.writeln("<html><head><title>Snippet :: Code View :: " + location.href + '</title></head><body bgcolor=white onLoad="self.focus()"><pre>' + a + "</pre></body></html>");
    top.consoleRef.document.close()
}
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function(a) {
        if (typeof (a) == "string") {
            a = document.getElementById(a)
        }
        if (!a.addClass) {
            a.hide = function() {
                this.style.display = "none"
            }
            ;
            a.show = function() {
                this.style.display = ""
            }
            ;
            a.addClass = function(b) {
                this.removeClass(b);
                this.className += " " + b
            }
            ;
            a.removeClass = function(d) {
                var e = this.className.split(/\s+/);
                var b = -1;
                for (var c = 0; c < e.length; c++) {
                    if (e[c] == d) {
                        b = c;
                        c = e.length
                    }
                }
                if (b > -1) {
                    e.splice(b, 1);
                    this.className = e.join(" ")
                }
                return this
            }
            ;
            a.hasClass = function(b) {
                return !!this.className.match(new RegExp("\\s*" + b + "\\s*"))
            }
        }
        return a
    },
    setMoviePath: function(a) {
        this.moviePath = a
    },
    dispatch: function(d, b, c) {
        var a = this.clients[d];
        if (a) {
            a.receiveEvent(b, c)
        }
    },
    register: function(b, a) {
        this.clients[b] = a
    },
    getDOMObjectPosition: function(c, a) {
        var b = {
            left: 0,
            top: 0,
            width: c.width ? c.width : c.offsetWidth,
            height: c.height ? c.height : c.offsetHeight
        };
        while (c && (c != a)) {
            b.left += c.offsetLeft;
            b.top += c.offsetTop;
            c = c.offsetParent
        }
        return b
    },
    Client: function(a) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = "ZeroClipboardMovie_" + this.id;
        ZeroClipboard.register(this.id, this);
        if (a) {
            this.glue(a)
        }
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null ,
    clipText: "",
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null ,
    glue: function(d, b, e) {
        this.domElement = ZeroClipboard.$(d);
        var f = 99;
        if (this.domElement.style.zIndex) {
            f = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof (b) == "string") {
            b = ZeroClipboard.$(b)
        } else {
            if (typeof (b) == "undefined") {
                b = document.getElementsByTagName("body")[0]
            }
        }
        var c = ZeroClipboard.getDOMObjectPosition(this.domElement, b);
        this.div = document.createElement("div");
        this.div.className = "snippet-clipboard";
        var a = this.div.style;
        a.position = "absolute";
        a.left = "" + c.left + "px";
        a.top = "" + c.top + "px";
        a.width = "" + c.width + "px";
        a.height = "" + c.height + "px";
        a.zIndex = f;
        if (typeof (e) == "object") {
            for (addedStyle in e) {
                a[addedStyle] = e[addedStyle]
            }
        }
        b.appendChild(this.div);
        this.div.innerHTML = this.getHTML(c.width, c.height)
    },
    getHTML: function(d, a) {
        var c = "";
        var b = "id=" + this.id + "&width=" + d + "&height=" + a;
        if (navigator.userAgent.match(/MSIE/)) {
            var e = location.href.match(/^https/i) ? "https://" : "http://";
            c += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + e + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + d + '" height="' + a + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + b + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            c += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + d + '" height="' + a + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + b + '" wmode="transparent" />'
        }
        return c
    },
    hide: function() {
        if (this.div) {
            this.div.style.left = "-2000px"
        }
    },
    show: function() {
        this.reposition()
    },
    destroy: function() {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = "";
            var a = document.getElementsByTagName("body")[0];
            try {
                a.removeChild(this.div)
            } catch (b) {}
            this.domElement = null ;
            this.div = null 
        }
    },
    reposition: function(c) {
        if (c) {
            this.domElement = ZeroClipboard.$(c);
            if (!this.domElement) {
                this.hide()
            }
        }
        if (this.domElement && this.div) {
            var b = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var a = this.div.style;
            a.left = "" + b.left + "px";
            a.top = "" + b.top + "px"
        }
    },
    setText: function(a) {
        this.clipText = a;
        if (this.ready) {
            this.movie.setText(a)
        }
    },
    addEventListener: function(a, b) {
        a = a.toString().toLowerCase().replace(/^on/, "");
        if (!this.handlers[a]) {
            this.handlers[a] = []
        }
        this.handlers[a].push(b)
    },
    setHandCursor: function(a) {
        this.handCursorEnabled = a;
        if (this.ready) {
            this.movie.setHandCursor(a)
        }
    },
    setCSSEffects: function(a) {
        this.cssEffects = !!a
    },
    receiveEvent: function(d, f) {
        d = d.toString().toLowerCase().replace(/^on/, "");
        switch (d) {
        case "load":
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var c = this;
                setTimeout(function() {
                    c.receiveEvent("load", null )
                }
                , 1);
                return
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var c = this;
                setTimeout(function() {
                    c.receiveEvent("load", null )
                }
                , 100);
                this.ready = true;
                return
            }
            this.ready = true;
            try {
                this.movie.setText(this.clipText)
            } catch (h) {}
            try {
                this.movie.setHandCursor(this.handCursorEnabled)
            } catch (h) {}
            break;
        case "mouseover":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("hover");
                if (this.recoverActive) {
                    this.domElement.addClass("active")
                }
            }
            break;
        case "mouseout":
            if (this.domElement && this.cssEffects) {
                this.recoverActive = false;
                if (this.domElement.hasClass("active")) {
                    this.domElement.removeClass("active");
                    this.recoverActive = true
                }
                this.domElement.removeClass("hover")
            }
            break;
        case "mousedown":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("active")
            }
            break;
        case "mouseup":
            if (this.domElement && this.cssEffects) {
                this.domElement.removeClass("active");
                this.recoverActive = false
            }
            break
        }
        if (this.handlers[d]) {
            for (var b = 0, a = this.handlers[d].length; b < a; b++) {
                var g = this.handlers[d][b];
                if (typeof (g) == "function") {
                    g(this, f)
                } else {
                    if ((typeof (g) == "object") && (g.length == 2)) {
                        g[0][g[1]](this, f)
                    } else {
                        if (typeof (g) == "string") {
                            window[g](this, f)
                        }
                    }
                }
            }
        }
    }
};

if (!this.sh_languages) {
    this.sh_languages = {}
}
var sh_requests = {};
function sh_isEmailAddress(b) {
    if (/^mailto:/.test(b)) {
        return false
    }
    return b.indexOf("@") !== -1
}
function sh_setHref(e, h, g) {
    var f = g.substring(e[h - 2].pos, e[h - 1].pos);
    if (f.length >= 2 && f.charAt(0) === "<" && f.charAt(f.length - 1) === ">") {
        f = f.substr(1, f.length - 2)
    }
    if (sh_isEmailAddress(f)) {
        f = "mailto:" + f
    }
    e[h - 2].node.href = f
}
function sh_konquerorExec(c) {
    var d = [""];
    d.index = c.length;
    d.input = c;
    return d
}
function sh_highlightString(X, ah) {
    if (/Konqueror/.test(navigator.userAgent)) {
        if (!ah.konquered) {
            for (var T = 0; T < ah.length; T++) {
                for (var R = 0; R < ah[T].length; R++) {
                    var S = ah[T][R][0];
                    if (S.source === "$") {
                        S.exec = sh_konquerorExec
                    }
                }
            }
            ah.konquered = true
        }
    }
    var i = document.createElement("a");
    var ag = document.createElement("span");
    var Y = [];
    var am = 0;
    var ai = [];
    var W = 0;
    var al = null ;
    var ab = function(c, b) {
        var g = c.length;
        if (g === 0) {
            return
        }
        if (!b) {
            var e = ai.length;
            if (e !== 0) {
                var d = ai[e - 1];
                if (!d[3]) {
                    b = d[1]
                }
            }
        }
        if (al !== b) {
            if (al) {
                Y[am++] = {
                    pos: W
                };
                if (al === "sh_url") {
                    sh_setHref(Y, am, X)
                }
            }
            if (b) {
                var f;
                if (b === "sh_url") {
                    f = i.cloneNode(false)
                } else {
                    f = ag.cloneNode(false)
                }
                f.className = b;
                Y[am++] = {
                    node: f,
                    pos: W
                }
            }
        }
        W += g;
        al = b
    }
    ;
    var af = /\r\n|\r|\n/g;
    af.lastIndex = 0;
    var ar = X.length;
    while (W < ar) {
        var ad = W;
        var ak;
        var ac;
        var an = af.exec(X);
        if (an === null ) {
            ak = ar;
            ac = ar
        } else {
            ak = an.index;
            ac = af.lastIndex
        }
        var ao = X.substring(ad, ak);
        var p = [];
        for (; ; ) {
            var Q = W - ad;
            var V;
            var aa = ai.length;
            if (aa === 0) {
                V = 0
            } else {
                V = ai[aa - 1][2]
            }
            var a = ah[V];
            var Z = a.length;
            var aj = p[V];
            if (!aj) {
                aj = p[V] = []
            }
            var U = null ;
            var ae = -1;
            for (var s = 0; s < Z; s++) {
                var ap;
                if (s < aj.length && (aj[s] === null  || Q <= aj[s].index)) {
                    ap = aj[s]
                } else {
                    var at = a[s][0];
                    at.lastIndex = Q;
                    ap = at.exec(ao);
                    aj[s] = ap
                }
                if (ap !== null  && (U === null  || ap.index < U.index)) {
                    U = ap;
                    ae = s;
                    if (ap.index === Q) {
                        break
                    }
                }
            }
            if (U === null ) {
                ab(ao.substring(Q), null );
                break
            } else {
                if (U.index > Q) {
                    ab(ao.substring(Q, U.index), null )
                }
                var aq = a[ae];
                var P = aq[1];
                var au;
                if (P instanceof Array) {
                    for (var r = 0; r < P.length; r++) {
                        au = U[r + 1];
                        ab(au, P[r])
                    }
                } else {
                    au = U[0];
                    ab(au, P)
                }
                switch (aq[2]) {
                case -1:
                    break;
                case -2:
                    ai.pop();
                    break;
                case -3:
                    ai.length = 0;
                    break;
                default:
                    ai.push(aq);
                    break
                }
            }
        }
        if (al) {
            Y[am++] = {
                pos: W
            };
            if (al === "sh_url") {
                sh_setHref(Y, am, X)
            }
            al = null 
        }
        W = ac
    }
    return Y
}
function sh_getClasses(i) {
    var g = [];
    var f = i.className;
    if (f && f.length > 0) {
        var h = f.split(" ");
        for (var j = 0; j < h.length; j++) {
            if (h[j].length > 0) {
                g.push(h[j])
            }
        }
    }
    return g
}
function sh_addClass(h, f) {
    var g = sh_getClasses(h);
    for (var e = 0; e < g.length; e++) {
        if (f.toLowerCase() === g[e].toLowerCase()) {
            return
        }
    }
    g.push(f);
    h.className = g.join(" ")
}
function sh_extractTagsFromNodeList(l, h) {
    var i = l.length;
    for (var k = 0; k < i; k++) {
        var j = l.item(k);
        switch (j.nodeType) {
        case 1:
            if (j.nodeName.toLowerCase() === "br") {
                var g;
                if (/MSIE/.test(navigator.userAgent)) {
                    g = "\r"
                } else {
                    g = "\n"
                }
                h.text.push(g);
                h.pos++
            } else {
                h.tags.push({
                    node: j.cloneNode(false),
                    pos: h.pos
                });
                sh_extractTagsFromNodeList(j.childNodes, h);
                h.tags.push({
                    pos: h.pos
                })
            }
            break;
        case 3:
        case 4:
            h.text.push(j.data);
            h.pos += j.length;
            break
        }
    }
}
function sh_extractTags(f, d) {
    var e = {};
    e.text = [];
    e.tags = d;
    e.pos = 0;
    sh_extractTagsFromNodeList(f.childNodes, e);
    return e.text.join("")
}
function sh_mergeTags(o, m) {
    var r = o.length;
    if (r === 0) {
        return m
    }
    var p = m.length;
    if (p === 0) {
        return o
    }
    var j = [];
    var n = 0;
    var q = 0;
    while (n < r && q < p) {
        var k = o[n];
        var l = m[q];
        if (k.pos <= l.pos) {
            j.push(k);
            n++
        } else {
            j.push(l);
            if (m[q + 1].pos <= k.pos) {
                q++;
                j.push(m[q]);
                q++
            } else {
                j.push({
                    pos: k.pos
                });
                m[q] = {
                    node: l.node.cloneNode(false),
                    pos: k.pos
                }
            }
        }
    }
    while (n < r) {
        j.push(o[n]);
        n++
    }
    while (q < p) {
        j.push(m[q]);
        q++
    }
    return j
}
function sh_insertTags(n, q) {
    var r = document;
    var m = document.createDocumentFragment();
    var t = 0;
    var u = n.length;
    var w = 0;
    var o = q.length;
    var v = m;
    while (w < o || t < u) {
        var p;
        var x;
        if (t < u) {
            p = n[t];
            x = p.pos
        } else {
            x = o
        }
        if (x <= w) {
            if (p.node) {
                var s = p.node;
                v.appendChild(s);
                v = s
            } else {
                v = v.parentNode
            }
            t++
        } else {
            v.appendChild(r.createTextNode(q.substring(w, x)));
            w = x
        }
    }
    return m
}
function sh_highlightElement(m, j) {
    sh_addClass(m, "sh_sourceCode");
    var n = [];
    var l = sh_extractTags(m, n);
    var k = sh_highlightString(l, j);
    var h = sh_mergeTags(n, k);
    var i = sh_insertTags(h, l);
    while (m.hasChildNodes()) {
        m.removeChild(m.firstChild)
    }
    m.appendChild(i)
}
function sh_getXMLHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Msxml2.XMLHTTP")
    } else {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }
    throw "No XMLHttpRequest implementation available"
}
function sh_load(language, element, prefix, suffix) {
    if (language in sh_requests) {
        sh_requests[language].push(element);
        return
    }
    sh_requests[language] = [element];
    var request = sh_getXMLHttpRequest();
    var url = prefix + "sh_" + language + suffix;
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            try {
                if (!request.status || request.status === 200) {
                    eval(request.responseText);
                    var elements = sh_requests[language];
                    for (var i = 0; i < elements.length; i++) {
                        sh_highlightElement(elements[i], sh_languages[language])
                    }
                } else {
                    throw "HTTP error: status " + request.status
                }
            } finally {
                request = null 
            }
        }
    }
    ;
    request.send(null )
}
function sh_highlightDocument(e, g) {
    var b = document.getElementsByTagName("pre");
    for (var d = 0; d < b.length; d++) {
        var c = b.item(d);
        var f = c.className.toLowerCase();
        var a = f.replace(/sh_sourcecode/g, "");
        if (a.indexOf("sh_") != -1) {
            a = a.match(/(\bsh_)\w+\b/g)[0]
        }
        if (f.indexOf("sh_sourcecode") != -1) {
            continue
        }
        if (a.substr(0, 3) === "sh_") {
            var h = a.substring(3);
            if (h in sh_languages) {
                sh_highlightElement(c, sh_languages[h])
            } else {
                if (typeof (e) === "string" && typeof (g) === "string") {
                    sh_load(h, c, e, g)
                } else {
                    console.log('Found <pre> element with class="' + a + '", but no such language exists');
                    continue
                }
            }
            break
        }
    }
}
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.c = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 13], [/'/g, "sh_string", 14], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/$/g, null , -2], [/</g, "sh_string", 11], [/"/g, "sh_string", 12], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.cpp = [[[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 13], [/'/g, "sh_string", 14], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/$/g, null , -2], [/</g, "sh_string", 11], [/"/g, "sh_string", 12], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.csharp = [[[/\b(?:using)\b/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))(?:[FfDdMmUulL]+)?\b/g, "sh_number", -1], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:abstract|event|new|struct|as|explicit|null|switch|base|extern|this|false|operator|throw|break|finally|out|true|fixed|override|try|case|params|typeof|catch|for|private|foreach|protected|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|continue|in|return|virtual|default|interface|sealed|volatile|delegate|internal|do|is|sizeof|while|lock|stackalloc|else|static|enum|namespace|get|partial|set|value|where|yield)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 13], [/'/g, "sh_string", 14], [/\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/$/g, null , -2], [/</g, "sh_string", 11], [/"/g, "sh_string", 12], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.css = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/(?:\.|#)[A-Za-z0-9_]+/g, "sh_selector", -1], [/\{/g, "sh_cbracket", 10, 1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\}/g, "sh_cbracket", -2], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/[A-Za-z0-9_-]+[ \t]*:/g, "sh_property", -1], [/[.%A-Za-z0-9_-]+/g, "sh_value", -1], [/#(?:[A-Za-z0-9_]+)/g, "sh_string", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.flex = [[[/^%\{/g, "sh_preproc", 1, 1], [/^%[sx]/g, "sh_preproc", 16, 1], [/^%option/g, "sh_preproc", 17, 1], [/^%(?:array|pointer|[aceknopr])/g, "sh_preproc", -1], [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_preproc", 19, 1], [/^%%/g, "sh_preproc", 20, 1]], [[/^%\}/g, "sh_preproc", -2], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 2], [/\/\//g, "sh_comment", 8], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 14], [/'/g, "sh_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 3, 1], [/<!DOCTYPE/g, "sh_preproc", 5, 1], [/<!--/g, "sh_comment", 6], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 7, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 7, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 4]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 4]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 6]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 4]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 3, 1], [/<!DOCTYPE/g, "sh_preproc", 5, 1], [/<!--/g, "sh_comment", 6], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 7, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 7, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/$/g, null , -2], [/</g, "sh_string", 12], [/"/g, "sh_string", 13], [/\/\/\//g, "sh_comment", 2], [/\/\//g, "sh_comment", 8], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/$/g, null , -2], [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_function", -1]], [[/$/g, null , -2], [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_keyword", -1], [/"/g, "sh_string", 18], [/=/g, "sh_symbol", -1]], [[/$/g, null , -2], [/"/g, "sh_string", -2]], [[/$/g, null , -2], [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "sh_type", -1], [/"/g, "sh_string", 13], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]], [[/^%%/g, "sh_preproc", 21, 1], [/<[A-Za-z_][A-Za-z0-9_-]*>/g, "sh_function", -1], [/"/g, "sh_string", 13], [/\\./g, "sh_preproc", -1], [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "sh_type", -1], [/\/\*/g, "sh_comment", 22], [/\{/g, "sh_cbracket", 23, 1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]], [[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 2], [/\/\//g, "sh_comment", 8], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 14], [/'/g, "sh_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/\*\//g, "sh_comment", -2], [/\/\*/g, "sh_comment", 22]], [[/\}/g, "sh_cbracket", -2], [/\{/g, "sh_cbracket", 23, 1], [/\$./g, "sh_variable", -1], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 2], [/\/\//g, "sh_comment", 8], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 14], [/'/g, "sh_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.html = [[[/<\?xml/g, "sh_preproc", 1, 1], [/<!DOCTYPE/g, "sh_preproc", 3, 1], [/<!--/g, "sh_comment", 4], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 5, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 5, 1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 4]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.java = [[[/\b(?:import|package)\b/g, "sh_preproc", -1], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 10], [/'/g, "sh_string", 11], [/(\b(?:class|interface))([ \t]+)([$A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1], [/\b(?:abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|false|final|finally|for|goto|if|implements|instanceof|interface|native|new|null|private|protected|public|return|static|strictfp|super|switch|synchronized|throw|throws|true|this|transient|try|volatile|while)\b/g, "sh_keyword", -1], [/\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g, "sh_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.javascript = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "sh_keyword", -1], [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["sh_symbol", "sh_normal", "sh_symbol"], -1], [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["sh_number", "sh_normal", "sh_symbol"], -1], [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["sh_normal", "sh_symbol"], -1], [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "sh_regexp", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 10], [/'/g, "sh_string", 11], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "sh_predef_var", -1], [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "sh_predef_func", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.javascript_dom = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "sh_keyword", -1], [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["sh_symbol", "sh_normal", "sh_symbol"], -1], [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["sh_number", "sh_normal", "sh_symbol"], -1], [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["sh_normal", "sh_symbol"], -1], [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "sh_regexp", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 10], [/'/g, "sh_string", 11], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "sh_predef_var", -1], [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "sh_predef_func", -1], [/\b(?:applicationCache|closed|Components|content|controllers|crypto|defaultStatus|dialogArguments|directories|document|frameElement|frames|fullScreen|globalStorage|history|innerHeight|innerWidth|length|location|locationbar|menubar|name|navigator|opener|outerHeight|outerWidth|pageXOffset|pageYOffset|parent|personalbar|pkcs11|returnValue|screen|availTop|availLeft|availHeight|availWidth|colorDepth|height|left|pixelDepth|top|width|screenX|screenY|scrollbars|scrollMaxX|scrollMaxY|scrollX|scrollY|self|sessionStorage|sidebar|status|statusbar|toolbar|top|window)\b/g, "sh_predef_var", -1], [/\b(?:alert|addEventListener|atob|back|blur|btoa|captureEvents|clearInterval|clearTimeout|close|confirm|dump|escape|find|focus|forward|getAttention|getComputedStyle|getSelection|home|moveBy|moveTo|open|openDialog|postMessage|print|prompt|releaseEvents|removeEventListener|resizeBy|resizeTo|scroll|scrollBy|scrollByLines|scrollByPages|scrollTo|setInterval|setTimeout|showModalDialog|sizeToContent|stop|unescape|updateCommands|onabort|onbeforeunload|onblur|onchange|onclick|onclose|oncontextmenu|ondragdrop|onerror|onfocus|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpaint|onreset|onresize|onscroll|onselect|onsubmit|onunload)\b/g, "sh_predef_func", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null , -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.perl = [[[/\b(?:import)\b/g, "sh_preproc", -1], [/(s)(\{(?:\\\}|[^}])*\}\{(?:\\\}|[^}])*\})([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1], [/(s)(\((?:\\\)|[^)])*\)\((?:\\\)|[^)])*\))([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1], [/(s)(\[(?:\\\]|[^\]])*\]\[(?:\\\]|[^\]])*\])([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1], [/(s)(<.*><.*>)([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1], [/(q(?:q?))(\{(?:\\\}|[^}])*\})/g, ["sh_keyword", "sh_string"], -1], [/(q(?:q?))(\((?:\\\)|[^)])*\))/g, ["sh_keyword", "sh_string"], -1], [/(q(?:q?))(\[(?:\\\]|[^\]])*\])/g, ["sh_keyword", "sh_string"], -1], [/(q(?:q?))(<.*>)/g, ["sh_keyword", "sh_string"], -1], [/(q(?:q?))([^A-Za-z0-9 \t])(.*\2)/g, ["sh_keyword", "sh_string", "sh_string"], -1], [/(s)([^A-Za-z0-9 \t])(.*\2.*\2)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["sh_keyword", "sh_regexp", "sh_regexp", "sh_keyword"], -1], [/(s)([^A-Za-z0-9 \t])(.*\2[ \t]*)([^A-Za-z0-9 \t])(.*\4)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["sh_keyword", "sh_regexp", "sh_regexp", "sh_regexp", "sh_regexp", "sh_keyword"], -1], [/#/g, "sh_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/(?:m|qr)(?=\{)/g, "sh_keyword", 2], [/(?:m|qr)(?=#)/g, "sh_keyword", 4], [/(?:m|qr)(?=\|)/g, "sh_keyword", 6], [/(?:m|qr)(?=@)/g, "sh_keyword", 8], [/(?:m|qr)(?=<)/g, "sh_keyword", 10], [/(?:m|qr)(?=\[)/g, "sh_keyword", 12], [/(?:m|qr)(?=\\)/g, "sh_keyword", 14], [/(?:m|qr)(?=\/)/g, "sh_keyword", 16], [/"/g, "sh_string", 18], [/'/g, "sh_string", 19], [/</g, "sh_string", 20], [/\/[^\n]*\//g, "sh_string", -1], [/\b(?:chomp|chop|chr|crypt|hex|i|index|lc|lcfirst|length|oct|ord|pack|q|qq|reverse|rindex|sprintf|substr|tr|uc|ucfirst|m|s|g|qw|abs|atan2|cos|exp|hex|int|log|oct|rand|sin|sqrt|srand|my|local|our|delete|each|exists|keys|values|pack|read|syscall|sysread|syswrite|unpack|vec|undef|unless|return|length|grep|sort|caller|continue|dump|eval|exit|goto|last|next|redo|sub|wantarray|pop|push|shift|splice|unshift|split|switch|join|defined|foreach|last|chop|chomp|bless|dbmclose|dbmopen|ref|tie|tied|untie|while|next|map|eq|die|cmp|lc|uc|and|do|if|else|elsif|for|use|require|package|import|chdir|chmod|chown|chroot|fcntl|glob|ioctl|link|lstat|mkdir|open|opendir|readlink|rename|rmdir|stat|symlink|umask|unlink|utime|binmode|close|closedir|dbmclose|dbmopen|die|eof|fileno|flock|format|getc|print|printf|read|readdir|rewinddir|seek|seekdir|select|syscall|sysread|sysseek|syswrite|tell|telldir|truncate|warn|write|alarm|exec|fork|getpgrp|getppid|getpriority|kill|pipe|qx|setpgrp|setpriority|sleep|system|times|x|wait|waitpid)\b/g, "sh_keyword", -1], [/^\=(?:head1|head2|item)/g, "sh_comment", 21], [/(?:\$[#]?|@|%)[\/A-Za-z0-9_]+/g, "sh_variable", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null , -2]], [[/\{/g, "sh_regexp", 3]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\\{|\\\}|\}/g, "sh_regexp", -3]], [[/#/g, "sh_regexp", 5]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\#|#/g, "sh_regexp", -3]], [[/\|/g, "sh_regexp", 7]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\\||\|/g, "sh_regexp", -3]], [[/@/g, "sh_regexp", 9]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\@|@/g, "sh_regexp", -3]], [[/</g, "sh_regexp", 11]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\<|\\>|>/g, "sh_regexp", -3]], [[/\[/g, "sh_regexp", 13]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\]|\]/g, "sh_regexp", -3]], [[/\\/g, "sh_regexp", 15]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\\\|\\/g, "sh_regexp", -3]], [[/\//g, "sh_regexp", 17]], [[/[ \t]+#.*/g, "sh_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1], [/\\\/|\//g, "sh_regexp", -3]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|')/g, null , -1], [/'/g, "sh_string", -2]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/\=cut/g, "sh_comment", -2]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.php = [[[/\b(?:include|include_once|require|require_once)\b/g, "sh_preproc", -1], [/\/\//g, "sh_comment", 1], [/#/g, "sh_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 2], [/'/g, "sh_string", 3], [/\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 4], [/\/\//g, "sh_comment", 1], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10], [/(?:\$[#]?|@|%)[A-Za-z0-9_]+/g, "sh_variable", -1], [/<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null , -2]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/\\(?:\\|')/g, null , -1], [/'/g, "sh_string", -2]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 5, 1], [/<!DOCTYPE/g, "sh_preproc", 6, 1], [/<!--/g, "sh_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 7]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 5, 1], [/<!DOCTYPE/g, "sh_preproc", 6, 1], [/<!--/g, "sh_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.python = [[[/\b(?:import|from)\b/g, "sh_preproc", -1], [/#/g, "sh_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/\b(?:and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|global|if|in|is|lambda|not|or|pass|print|raise|return|try|while)\b/g, "sh_keyword", -1], [/^(?:[\s]*'{3})/g, "sh_comment", 2], [/^(?:[\s]*\"{3})/g, "sh_comment", 3], [/^(?:[\s]*'(?:[^\\']|\\.)*'[\s]*|[\s]*\"(?:[^\\\"]|\\.)*\"[\s]*)$/g, "sh_comment", -1], [/(?:[\s]*'{3})/g, "sh_string", 4], [/(?:[\s]*\"{3})/g, "sh_string", 5], [/"/g, "sh_string", 6], [/'/g, "sh_string", 7], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||\{|\}/g, "sh_symbol", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null , -2]], [[/(?:'{3})/g, "sh_comment", -2]], [[/(?:\"{3})/g, "sh_comment", -2]], [[/(?:'{3})/g, "sh_string", -2]], [[/(?:\"{3})/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|')/g, null , -1], [/'/g, "sh_string", -2]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.ruby = [[[/\b(?:require)\b/g, "sh_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 1], [/'/g, "sh_string", 2], [/</g, "sh_string", 3], [/\/[^\n]*\//g, "sh_regexp", -1], [/(%r)(\{(?:\\\}|#\{[A-Za-z0-9]+\}|[^}])*\})/g, ["sh_symbol", "sh_regexp"], -1], [/\b(?:alias|begin|BEGIN|break|case|defined|do|else|elsif|end|END|ensure|for|if|in|include|loop|next|raise|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|false|nil|self|true|__FILE__|__LINE__|and|not|or|def|class|module|catch|fail|load|throw)\b/g, "sh_keyword", -1], [/(?:^\=begin)/g, "sh_comment", 4], [/(?:\$[#]?|@@|@)(?:[A-Za-z0-9_]+|'|\"|\/)/g, "sh_type", -1], [/[A-Za-z0-9]+(?:\?|!)/g, "sh_normal", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/(#)(\{)/g, ["sh_symbol", "sh_cbracket"], -1], [/#/g, "sh_comment", 5], [/\{|\}/g, "sh_cbracket", -1]], [[/$/g, null , -2], [/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/$/g, null , -2], [/\\(?:\\|')/g, null , -1], [/'/g, "sh_string", -2]], [[/$/g, null , -2], [/>/g, "sh_string", -2]], [[/^(?:\=end)/g, "sh_comment", -2]], [[/$/g, null , -2]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.sql = [[[/\b(?:VARCHAR|TINYINT|TEXT|DATE|SMALLINT|MEDIUMINT|INT|BIGINT|FLOAT|DOUBLE|DECIMAL|DATETIME|TIMESTAMP|TIME|YEAR|UNSIGNED|CHAR|TINYBLOB|TINYTEXT|BLOB|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|BOOL|BINARY|VARBINARY)\b/gi, "sh_type", -1], [/\b(?:ALL|ASC|AS|ALTER|AND|ADD|AUTO_INCREMENT|BETWEEN|BINARY|BOTH|BY|BOOLEAN|CHANGE|CHECK|COLUMNS|COLUMN|CROSS|CREATE|DATABASES|DATABASE|DATA|DELAYED|DESCRIBE|DESC|DISTINCT|DELETE|DROP|DEFAULT|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FIELD|FLUSH|FOR|FOREIGN|FUNCTION|FROM|GROUP|GRANT|HAVING|IGNORE|INDEX|INFILE|INSERT|INNER|INTO|IDENTIFIED|IN|IS|IF|JOIN|KEYS|KILL|KEY|LEADING|LIKE|LIMIT|LINES|LOAD|LOCAL|LOCK|LOW_PRIORITY|LEFT|LANGUAGE|MODIFY|NATURAL|NOT|NULL|NEXTVAL|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUTFILE|OR|OUTER|ON|PROCEDURE|PROCEDURAL|PRIMARY|READ|REFERENCES|REGEXP|RENAME|REPLACE|RETURN|REVOKE|RLIKE|RIGHT|SHOW|SONAME|STATUS|STRAIGHT_JOIN|SELECT|SETVAL|SET|TABLES|TERMINATED|TO|TRAILING|TRUNCATE|TABLE|TEMPORARY|TRIGGER|TRUSTED|UNIQUE|UNLOCK|USE|USING|UPDATE|VALUES|VARIABLES|VIEW|WITH|WRITE|WHERE|ZEROFILL|TYPE|XOR)\b/gi, "sh_keyword", -1], [/"/g, "sh_string", 1], [/'/g, "sh_string", 2], [/`/g, "sh_string", 3], [/#/g, "sh_comment", 4], [/\/\/\//g, "sh_comment", 5], [/\/\//g, "sh_comment", 4], [/\/\*\*/g, "sh_comment", 11], [/\/\*/g, "sh_comment", 12], [/--/g, "sh_comment", 4], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/`/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/$/g, null , -2]], [[/$/g, null , -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 6, 1], [/<!DOCTYPE/g, "sh_preproc", 8, 1], [/<!--/g, "sh_comment", 9], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 10, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 10, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 7]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 7]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 9]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 7]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 6, 1], [/<!DOCTYPE/g, "sh_preproc", 8, 1], [/<!--/g, "sh_comment", 9], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 10, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 10, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.url = [[{
    regex: /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
    style: "sh_url"
}, {
    regex: /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
    style: "sh_url"
}]];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.xml = [[[/<\?xml/g, "sh_preproc", 1, 1], [/<!DOCTYPE/g, "sh_preproc", 3, 1], [/<!--/g, "sh_comment", 4], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 5, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/\\(?:\\|")/g, null , -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 4]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]]];

jQuery(document).ready(function($){

    $("#fullpage_layer").fullpageLayer({
        
    });
    
});



(function( $ ) {
    
    var ENABLED = 'fpl-enabled';
    var CONTENT_CLASS = 'fpl-content';
    var SLIDE_NEXT ='fpl-slide-next';
    var SLIDE_PREV ='fpl-slide-prev';
    
 
    $.fn.fullpageLayer = function(options) {
 
        if($('html').hasClass(ENABLED)){ return; } //displayWarnings();
        var $pluginContent = $(this);
        var $pageHeight = 0;
        var $currentLayerIndex = 1;
        var $maxLayerCount = 0;

        
        options = $.extend({
//            menu: false,
//            afterReBuild: null,
        }, options);


        init();
        
        function init()
        {
            console.log("--init--");
            $pluginContent.addClass(CONTENT_CLASS);
            $('html').addClass(ENABLED);



            $pageHeight = $pluginContent.height();
            // console.log($pageHeight);
            $pluginContent.append($("<a>").addClass(SLIDE_NEXT));
            $pluginContent.append($("<a>").addClass(SLIDE_PREV));
            $pluginContent.css({
                height : '101%',
                overflow: 'auto',
                width: '101%',
                position : 'relative'
            });

            $(".layer").css({
                height:'100%'
            });
            $(".layer:first").addClass("active");
            $(".layer").not(":first").addClass("fpl-next").css({
                top: $pluginContent.height()
            });


            $(".layer").each(function(i){
                $(this).css("z-index", i+1);

                $maxLayerCount += 1;
            });

            //scroll
            var called = false;
            $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
                if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
                    //scroll down
                    if(!called){
                        called = true;

                        var t = setTimeout(function () {
                            console.log('Down');
                            next();
                            called = false;
                        }, 200);

                    }
                } else {
                    //scroll up
                    if(!called){
                        called = true;

                        var t = setTimeout(function () {
                            console.log('Up');
                            called = false;
                        }, 200);

                    }
                }

                //prevent page fom scrolling
                return false;
            });

            // $("body,."+CONTENT_CLASS).scroll(function(e) {
            //     e.preventDefault();
                // if(!called){
                //
                //     called = true;
                //     next();
                //     var t = setTimeout(function(){
                //         next();
                //     }, 200);
                //     clearTimeout(t);
                //     // console.log(e);
                //
                // }
                // next();
// console.log("scroll");
//                 return false;
//             });

            $(".fpl-slide-next").on("click", function(i,e){

                // next();
            });
        }
        var $called = false;
        function next(){
            if(!$called) {
                $called = !$called;
                console.log("next");

                var nextLayerIndex = $currentLayerIndex + 1;
                var nextLayer = $(".layer:nth-child(" + nextLayerIndex + ")");
                var currentLayer = $(".layer:nth-child(" + $currentLayerIndex + ")");
                // console.log(nextLayer);

                currentLayer.removeClass("active");

                nextLayer.addClass("active");

                nextLayer.animate({
                    top: '0px'
                }, 700, 'swing', function () {
                    //complete

                    $currentLayerIndex += 1;
                    $called = !$called;
                });

            }
        }
        
 
    };
 
}( jQuery ));
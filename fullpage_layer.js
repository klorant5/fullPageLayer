jQuery(document).ready(function ($) {

    $("#fullpage_layer").fullpageLayer({});

});


(function ($) {

    var ENABLED = 'fpl-enabled';
    var CONTENT_CLASS = 'fpl-content';
    var SLIDE_NEXT = 'fpl-slide-next';
    var SLIDE_PREV = 'fpl-slide-prev';


    $.fn.fullpageLayer = function (options) {

        if ($('html').hasClass(ENABLED)) {
            return;
        } //displayWarnings();
        var $pluginContent = $(this);
        var $pageHeight = 0;
        var $pageWidth = 0;
        var $currentLayerIndex = 1;
        var $maxLayerCount = 0;


        options = $.extend({
//            menu: false,
//            afterReBuild: null,
        }, options);


        init();

        function getActiveLeftMarginOfSlideShow() {
            return $(".layer.active .slideshow").css("margin-left").replace("px", "") * 1;
        }

        function init() {
            console.log("--init--");
            $pluginContent.addClass(CONTENT_CLASS);
            $('html').addClass(ENABLED);


            $pluginContent.append($("<a>").addClass(SLIDE_NEXT));
            $pluginContent.append($("<a>").addClass(SLIDE_PREV));
            $pluginContent.css({
                height: '100%',
                position: 'relative'
            });
            $pageHeight = $pluginContent.height();

            $(".layer").css({
                height: '100%'
            });
            $(".layer:first").addClass("active");
            $(".layer").not(":first").addClass("fpl-next").css({
                top: $pluginContent.height()
            });

            $pageWidth = $("body").width();

            $(".layer").each(function (i) {
                $(this).css("z-index", i + 1);

                $maxLayerCount += 1;
            });

            $(".layer .slide").css({
                height: '100%',
                width: $pageWidth,
                float: 'left'
            });

            $(".slideshow").css("height", $pageHeight + "px");    //???

            $(".layer .slideshow").each(function (i) {
                var $slideshowWidth = $(this).children(".slide").length * $pageWidth;
                console.log('slideshowWidth:', $slideshowWidth);
                $(this).width($slideshowWidth);
            });

            //scroll
            $('body').on('DOMMouseScroll mousewheel', function (event) {
                if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
                    //scroll down
                    var t = setTimeout(function () {
                        next();
                    }, 200);

                } else {
                    //scroll up
                    var t = setTimeout(function () {
                        previous();
                    }, 200);

                }

                //prevent page fom scrolling
                return false;
            });


            $("." + SLIDE_NEXT).on("click", function () {
                console.log("SLIDE NEXT CLICK");

                $(".layer.active .slideshow").animate({
                    'margin-left': (getActiveLeftMarginOfSlideShow() - $pageWidth) + 'px'
                }, 700, 'swing', function () {
                    //complete

                });
            });
            $("." + SLIDE_PREV).on("click", function () {
                console.log("SLIDE PREV CLICK");

                $(".layer.active .slideshow").animate({
                    'margin-left': (getActiveLeftMarginOfSlideShow() + $pageWidth) + 'px'
                }, 700, 'swing', function () {
                    //complete

                });
            });

            toggleSlideShowArrows();
            //init vége
        }

        function toggleSlideShowArrows() {

            if ($(".layer.active .slide").length) {
                $("." + SLIDE_NEXT).show();
                $("." + SLIDE_PREV).show();
            } else {
                $("." + SLIDE_NEXT).hide();
                $("." + SLIDE_PREV).hide();
            }
        }

        var $called = false;

        function next() {
            if (!$called) {
                $called = !$called;
                console.log("next");

                var nextLayerIndex = $currentLayerIndex + 1;
                if (nextLayerIndex <= $maxLayerCount) {
                    console.log("next - CALLED");

                    var nextLayer = $(".layer:nth-child(" + nextLayerIndex + ")");
                    var currentLayer = $(".layer:nth-child(" + $currentLayerIndex + ")");

                    currentLayer.removeClass("active");

                    nextLayer.addClass("active");

                    nextLayer.animate({
                        top: '0px'
                    }, 700, 'swing', function () {
                        //complete

                        $currentLayerIndex += 1;
                        toggleSlideShowArrows();
                        $called = !$called;
                    });

                } else {
                    toggleSlideShowArrows();
                    $called = !$called;
                }
            }
        }

        function previous() {
            if (!$called) {
                $called = !$called;
                console.log("previous");

                var previousLayerIndex = $currentLayerIndex - 1;
                if (previousLayerIndex !== 0) {
                    console.log("previous - CALLED");

                    var activeLayer = $(".layer.active");
                    var previousLayer = $(".layer:nth-child(" + previousLayerIndex + ")");

                    activeLayer.animate({
                        top: $pageHeight + "px"
                    }, 700, 'swing', function () {
                        //complete

                        $currentLayerIndex -= 1;
                        activeLayer.removeClass("active");
                        previousLayer.addClass("active");
                        toggleSlideShowArrows();
                        $called = !$called;
                    });
                } else {
                    toggleSlideShowArrows();
                    $called = !$called;
                }

            }
        }


    };

}(jQuery));
(function ($) {
    ("use strict");

    var animationText = function () {

        if (window.innerWidth < 767) return;

        if ($(".split-text").length > 0) {
            var st = $(".split-text");
            if (st.length === 0) return;
            gsap.registerPlugin(SplitText);
            st.each(function (index, el) {
                const $el = $(el);
                const $target =
                    $el.find("p, a").length > 0 ? $el.find("p, a")[0] : el;
                const hasClass = $el.hasClass.bind($el);
                const pxl_split = new SplitText($target, {
                    type: "words, chars",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });
                let split_type_set = pxl_split.chars;
                gsap.set($target, { perspective: 400 });
                const settings = {
                    scrollTrigger: {
                        trigger: $target,
                        start: "-200 86%",
                        toggleActions: "play none none reverse",
                    },
                    duration: 1,
                    stagger: 0.04,
                    ease: "power3.out",
                };
                if (hasClass("effect-fade")) {
                    settings.opacity = 0;
                }
                if (hasClass("effect-right")) {
                    settings.opacity = 0;
                    settings.x = "50";
                }
                if (hasClass("effect-left")) {
                    settings.opacity = 0;
                    settings.x = "-50";
                }
                if (hasClass("effect-up")) {
                    settings.opacity = 0;
                    settings.y = "80";
                }
                if (hasClass("effect-down")) {
                    settings.opacity = 0;
                    settings.y = "-80";
                }
                if (hasClass("effect-rotate")) {
                    settings.opacity = 0;
                    settings.rotateX = "50deg";
                }
                if (hasClass("effect-scale")) {
                    settings.opacity = 0;
                    settings.scale = "0.5";
                }
                if (
                    hasClass("split-lines-transform") ||
                    hasClass("split-lines-rotation-x")
                ) {
                    pxl_split.split({
                        type: "lines",
                        lineThreshold: 0.5,
                        linesClass: "split-line",
                    });
                    split_type_set = pxl_split.lines;
                    settings.opacity = 0;
                    settings.stagger = 0.5;
                    if (hasClass("split-lines-rotation-x")) {
                        settings.rotationX = -120;
                        settings.transformOrigin = "top center -50";
                    } else {
                        settings.yPercent = 100;
                        settings.autoAlpha = 0;
                    }
                }
                if (hasClass("split-words-scale")) {
                    pxl_split.split({ type: "words" });
                    split_type_set = pxl_split.words;
                    split_type_set.forEach((elw, index) => {
                        gsap.set(
                            elw,
                            {
                                opacity: 0,
                                scale: index % 2 === 0 ? 0 : 2,
                                force3D: true,
                                duration: 0.1,
                                ease: "power3.out",
                                stagger: 0.02,
                            },
                            index * 0.01
                        );
                    });

                    gsap.to(split_type_set, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 86%",
                        },
                        rotateX: "0",
                        scale: 1,
                        opacity: 1,
                    });
                } else {
                    gsap.from(split_type_set, settings);
                }
            });
        }

        if ($('.title-animation').length > 0) {
            $('.title-animation').each(function (index, splitTextLine) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });
                const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" });
                tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
            });
        }

        if ($('.text-animation p').length > 0) {
            $('.text-animation p').each(function (index, splitTextLine) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });
                const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" });
                tl.from(itemSplitted.lines, { duration: 1, delay: 0.5, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
            });
        }

        if ($('.text-animation-top').length > 0) {
            $('.text-animation-top').each(function (index, splitTextLine2) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine2,
                        start: 'top 100%',
                        toggleActions: 'play none play reset'
                    }
                });
                const itemSplitted = new SplitText(splitTextLine2, { type: 'words' }),
                    textNumWords = itemSplitted.words.length;
                gsap.delayedCall(0.05, function () {
                    for (var i = 0; i < textNumWords; i++) {
                        tl.from(itemSplitted.words[i], 1, { force3D: true, scale: Math.random() > 0.5 ? 0 : 2, opacity: 0 }, Math.random());
                    }
                });
            });
        }
    };
    
    var scrollingEffect = function () {

        if (window.innerWidth < 767) return;

        if ($(".scrolling-effect").length > 0) {
            var st = $(".scrolling-effect");
            st.each(function (index, el) {
                var settings = {
                    scrollTrigger: {
                        trigger: el,
                        scrub: 3,
                        toggleActions: "play none none reverse",
                        start: "-50 bottom",
                        end: "bottom bottom",
                        delay: 3,
                    },
                    duration: 0.8,
                    ease: "power3.out",
                };
                if ($(el).hasClass("effectRight")) {
                    settings.opacity = 0;
                    settings.x = "50";
                }
                if ($(el).hasClass("effectLeft")) {
                    settings.opacity = 0;
                    settings.x = "-50";
                }
                if ($(el).hasClass("effectBottom")) {
                    settings.opacity = 0;
                    settings.y = "50";
                }
                if ($(el).hasClass("effectTop")) {
                    settings.opacity = 0;
                    settings.y = "-50";
                }
                if ($(el).hasClass("effectZoomIn")) {
                    settings.opacity = 0;
                    settings.scale = 0.5;
                }
                gsap.from(el, settings);
            });
        }
    };

    var animateImgItem = function () {
        const isSmallScreen = window.matchMedia("(max-width: 991px)").matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay =
                            parseFloat(entry.target.getAttribute("data-delay")) || 0;
                        setTimeout(() => {
                            $(entry.target).addClass("active-animate");
                        }, delay * 1000);
                    }
                });
            },
            {
                threshold: isSmallScreen ? 0.1 : 0.1,
            }
        );

        const elements = $(
            ".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4"
        );
        elements.each(function () {
            observer.observe(this);
        });

        const checkVisible = () => {
            elements.each(function () {
                const sectionOffsetTop = $(this).offset().top;
                const sectionHeight = $(this).outerHeight();
                const scrollPosition = $(window).scrollTop();
                const windowHeight = $(window).height();

                if (
                    scrollPosition + windowHeight * 0.9 > sectionOffsetTop &&
                    scrollPosition < sectionOffsetTop + sectionHeight
                ) {
                    const delay = parseFloat($(this).attr("data-delay")) || 0;
                    setTimeout(() => {
                        $(this).addClass("active-animate");
                    }, delay * 1000);
                }
            });
        };

        $(document).ready(checkVisible);
        $(window).on("scroll", checkVisible);
    };

    // Dom Ready
    $(function () {
        animationText();
        scrollingEffect();
        animateImgItem();
    });
})(jQuery);

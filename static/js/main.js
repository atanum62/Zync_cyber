/**
 *  headerSticky • footer • changeValue • video • infiniteScroll
 *  counter • ajaxContactForm • handleSidebarFilter • parallaxImage
 *  goTop • preloader
 */

(function ($) {
  ("use strict");

  /* ------------------------------------------------
   * GLOBAL: attach CSRF token header to every AJAX
   * ------------------------------------------------ */
  // run once, early
  $.ajaxSetup({
    headers: {
      "X-CSRFToken": document.querySelector("meta[name='csrf-token']").content,
    },
  });

  /* ------------------------------------------------
   * HEADER STICKY
   * ------------------------------------------------ */
  const headerSticky = function () {
    let lastScrollTop = 0;
    const delta = 5;
    let navbarHeight = $(".header-sticky").outerHeight();
    let didScroll = false;

    $(window).on("scroll", () => (didScroll = true));

    setInterval(() => {
      if (!didScroll) return;
      const st = $(window).scrollTop();
      navbarHeight = $(".header-sticky").outerHeight();

      if (st > navbarHeight) {
        if (st > lastScrollTop + delta) {
          $(".header-sticky").css("top", `-${navbarHeight}px`);
        } else if (st < lastScrollTop - delta) {
          $(".header-sticky").css("top", "0").addClass("header-bg");
        }
      } else {
        $(".header-sticky").css("top", "unset").removeClass("header-bg");
      }
      lastScrollTop = st;
      didScroll = false;
    }, 250);
  };

  /* ------------------------------------------------
   * FOOTER MOBILE COLLAPSE
   * ------------------------------------------------ */
  const footer = function () {
    const checkScreenSize = () => {
      if (matchMedia("(max-width: 550px)").matches) {
        $(".tf-collapse-content").hide();
      } else {
        $(".footer-col-block").removeClass("open");
        $(".tf-collapse-content").show();
      }
    };
    checkScreenSize();
    $(window).on("resize", checkScreenSize);

    $(".title-mobile").on("click", function () {
      $(this).parent(".footer-col-block").toggleClass("open");
      $(this).next().slideToggle(250);
    });
  };

  /* ------------------------------------------------
   * CHANGE VALUE  (dropdown demo)
   * ------------------------------------------------ */
  const changeValue = function () {
    if ($(".tf-dropdown-sort").length > 0) {
      $(".select-item").click(function () {
        const $dd = $(this).closest(".tf-dropdown-sort");
        $dd
          .find(".text-sort-value")
          .text($(this).find(".text-value-item").text());
        $dd.find(".select-item.active").removeClass("active");
        $(this).addClass("active");

        const color = $(this).data("value-color");
        $dd.find(".btn-select .current-color").css("background", color);
      });
    }
  };

  /* ------------------------------------------------
   * VIDEO POPUP (magnific‑popup)
   * ------------------------------------------------ */
  const video = () => {
    if ($(".wg-video,.post-format-video").length) {
      $(".popup-youtube, .wg-curve-text-video").magnificPopup({
        type: "iframe",
      });
    }
  };

  /* ------------------------------------------------
   * INFINITE SCROLL  (demo)
   * ------------------------------------------------ */
  const infiniteScroll = () => {
    if ($("body").hasClass("loadmore")) {
      $(".fl-item").slice(0, 8).show();
      if ($(".scroll-loadmore").length) {
        $(window).on("scroll", function () {
          if (
            $(window).scrollTop() >=
            $(document).height() - $(window).height()
          ) {
            setTimeout(() => {
              $(".fl-item:hidden").slice(0, 2).show();
              if (!$(".fl-item:hidden").length) $(".view-more-button").hide();
            });
          }
        });
      }
      $(".btn-loadmore").on("click", function () {
        setTimeout(() => {
          $(".fl-item:hidden").slice(0, 2).show();
          if (!$(".fl-item:hidden").length) $(".view-more-button").hide();
        }, 600);
      });
    }
  };

  /* ------------------------------------------------
   * COUNTER ON SCROLL
   * ------------------------------------------------ */
  const counter = () => {
    if ($(document.body).hasClass("counter-scroll")) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const $el = $(entry.target);
              if (!$el.hasClass("odometer-activated")) {
                $el.addClass("odometer-activated").html($el.data("to"));
              }
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      $(".counter .number").each(function () {
        observer.observe(this);
      });
    }
  };

  /* ------------------------------------------------
   * CONTACT / COMMENT FORM  (AJAX + redirect)
   * ------------------------------------------------ */
  const ajaxContactForm = () => {
    $("#contactform,#commentform").each(function () {
      $(this).validate({
        submitHandler: (form) => {
          const $form = $(form);
          const loader = $("<div>", { class: "loading" }).appendTo(
            ".send-wrap"
          );

          $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: $form.serialize(),
            dataType: "json",

            success: (msg) => {
              console.log("AJAX response:", msg);

              /* 1️⃣  Handle redirect first */
              if (msg.redirect) {
                window.location.href = msg.redirect;
                return;
              }

              /* 2️⃣  legacy status */
              const ok = msg.status === "Success";
              const txt = ok
                ? "Message sent successfully to the site administrator."
                : "Error sending email.";
              showBanner(txt, ok ? "msg-success" : "msg-error");
              if (ok) $form.find(":input").not('[type="submit"]').val("");
            },

            error: () => showBanner("Network / server error.", "msg-error"),
            complete: () => loader.remove(),
          });

          function showBanner(text, cls) {
            $form.find(".flat-alert").remove();
            $form.prepend(
              $("<div>", { class: `flat-alert mb-20 ${cls}`, text }).append(
                '<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>'
              )
            );
          }
        },
      });
    });
  };

  /* ------------------------------------------------
   * SIDEBAR FILTER (mobile)
   * ------------------------------------------------ */
  const handleSidebarFilter = () => {
    $("#filterShop,.sidebar-btn").on("click", () => {
      if ($(window).width() <= 1200)
        $(".sidebar-filter,.overlay-filter").addClass("show");
    });
    $(".close-filter,.overlay-filter").on("click", () => {
      $(".sidebar-filter,.overlay-filter").removeClass("show");
    });
  };

  /* ------------------------------------------------
   * PARALLAX
   * ------------------------------------------------ */
  const parallaxImage = () => {
    if ($(".parallax-img").length) {
      $(".parallax-img").each(function () {
        new SimpleParallax(this, {
          delay: 0.6,
          orientation: "up",
          scale: 1.3,
          transition: "cubic-bezier(0,0,0,1)",
        });
      });
    }
  };

  /* ------------------------------------------------
   * GO‑TOP CIRCLE PROGRESS
   * ------------------------------------------------ */
  const goTop = () => {
    if (!$(".progress-wrap").length) return;

    const path = document.querySelector(".progress-wrap path");
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length;

    const update = () => {
      const scroll = $(window).scrollTop();
      const height = $(document).height() - $(window).height();
      path.style.strokeDashoffset = length - (scroll * length) / height;
    };
    update();
    $(window).on("scroll", update);

    $(window).on("scroll", function () {
      const offset = 200;
      const footerTop = $(".footer-go-top").offset().top;
      const bottomWin = $(this).scrollTop() + $(this).height();
      $(".progress-wrap").toggleClass(
        "active-progress",
        $(this).scrollTop() > offset && bottomWin < footerTop
      );
    });

    $(".progress-wrap").on("click", (e) => {
      e.preventDefault();
      $("html,body").animate({ scrollTop: 0 }, 0);
    });
  };

  /* ------------------------------------------------
   * PRELOADER
   * ------------------------------------------------ */
  const preloader = () => {
    $("#loading").fadeOut("slow", function () {
      $(this).remove();
    });
  };

  /* ------------------------------------------------
   * DOM READY
   * ------------------------------------------------ */
  $(function () {
    headerSticky();
    footer();
    changeValue();
    video();
    infiniteScroll();
    counter();
    ajaxContactForm();
    handleSidebarFilter();
    parallaxImage();
    goTop();
    preloader();
  });
})(jQuery);

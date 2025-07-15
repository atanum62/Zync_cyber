/**
 *  headerSticky • footer • changeValue • video • infiniteScroll
 *  counter • ajaxContactForm • handleSidebarFilter • parallaxImage
 *  goTop • preloader
 */

(function ($) {
  "use strict";

  /* ========== GLOBAL CSRF HEADER ========== */
  $.ajaxSetup({
    headers: {
      "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  });

  /* ========== HEADER STICKY ========== */
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

  /* ========== FOOTER MOBILE COLLAPSE ========== */
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

  /* --------‑‑‑‑‑ other helpers unchanged (changeValue, video, etc.) ‑‑‑‑‑‑-------- */
  /* ───────────────────────────────────────────────────────────────────────────── */

  /* ========== CONTACT FORM (AJAX) ========== */
  const ajaxContactForm = function () {
    $("#contactform,#commentform").each(function () {
      $(this).validate({
        submitHandler: (form) => {
          const $form = $(form);
          const loading = $("<div>", { class: "loading" });
          $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: $form.serialize(),
            dataType: "json",
            beforeSend: () => $form.find(".send-wrap").append(loading),

            success: (msg) => {
              /* 1️⃣ redirect supplied? */
              if (msg.redirect) {
                window.location.href = msg.redirect;
                return;
              }

              /* 2️⃣ legacy {status:"Success"} check */
              const ok = msg.status === "Success";
              const result = ok
                ? "Message sent successfully to the site administrator."
                : "Error sending email.";
              const cls = ok ? "msg-success" : "msg-error";

              /* Replace any previous alert */
              $form.find(".flat-alert").remove();
              $form.prepend(
                $("<div>", {
                  class: `flat-alert mb-20 ${cls}`,
                  text: result,
                }).append(
                  $(
                    '<a class="close mt-0" href="#"><i class="fa fa-close"></i></a>'
                  )
                )
              );

              if (ok) $form.find(":input").not('[type="submit"]').val("");
            },

            complete: () => $form.find(".loading").remove(),
            error: () =>
              alert("Network / server error. Please try again later."),
          });
        },
      });
    });
  };

  /* ========== SIDEBAR FILTER, PARALLAX, GO‑TOP, PRELOADER ... ========== */
  /* (unchanged helper functions omitted for brevity) */

  /* ========== DOM READY ========== */
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

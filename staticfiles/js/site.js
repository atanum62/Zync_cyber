(function ($) {
  "use strict";

  /* ---------- CSRF header for all AJAX ---------- */
  $.ajaxSetup({
    headers: {
      "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
    },
  });

  /* ---------- AJAX contact submit ---------- */
  $("#contactform").on("submit", function (e) {
    e.preventDefault();
    const $form = $(this);
    const $loader = $("<div>", { class: "loading" }).appendTo(".send-wrap");

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize(),
      dataType: "json",
      success: function (msg) {
        console.log("DEBUG response:", msg); // inspect in DevTools
        if (msg.redirect) {
          window.location.href = msg.redirect; // 🔥 navigate
          return;
        }
        alert("Unexpected response from server.");
      },
      error: () => alert("Server / network error."),
      complete: () => $loader.remove(),
    });
  });
})(jQuery);

/* =========================================================
   Fork — Business Management  |  script.js
   - Static project photos in every slot
   - Newsletter sign-up (sends welcome email via backend)
   - Smooth scroll-reveal animations (fade / slide-up, staggered)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- static photos ---------- */
  document.querySelectorAll(".photo-slot").forEach(function (slot) {
    var def = slot.getAttribute("data-default");
    if (def) {
      slot.style.backgroundImage = 'url("' + def + '")';
      slot.classList.add("has-photo");
    }
  });

  /* ---------- newsletter form (welcome email via EmailJS) ---------- */
  var form = document.getElementById("newsletter-form");
  if (form) {
    var input = document.getElementById("newsletter-email");
    var btn = document.getElementById("newsletter-btn");
    var msg = document.getElementById("newsletter-msg");

    var cfg = window.EMAILJS_CONFIG || {};
    var configured =
      window.emailjs &&
      cfg.PUBLIC_KEY && cfg.PUBLIC_KEY.indexOf("YOUR_") !== 0 &&
      cfg.SERVICE_ID && cfg.SERVICE_ID.indexOf("YOUR_") !== 0 &&
      cfg.TEMPLATE_ID && cfg.TEMPLATE_ID.indexOf("YOUR_") !== 0;

    if (configured) {
      try { emailjs.init({ publicKey: cfg.PUBLIC_KEY }); }
      catch (e) { configured = false; }
    }

    function setMsg(text, type) {
      msg.textContent = text;
      msg.className = "foot-msg" + (type ? " " + type : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMsg("Please enter a valid email address.", "err");
        input.focus();
        return;
      }
      if (!configured) {
        setMsg("Email service not set up yet — add your EmailJS keys in js/email-config.js", "err");
        return;
      }

      btn.disabled = true;
      setMsg("Sending…", "");

      // the welcome mail goes to whatever address was typed (template "To Email" = {{email}})
      var params = {
        email: email,
        to_email: email,
        to_name: email.split("@")[0],
        reply_to: email,
        message: "Thanks for subscribing to Fork! You're on the list for product launches, tips, and exclusive offers."
      };

      emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, params)
        .then(function () {
          setMsg("Welcome email sent to " + email + " 🎉", "ok");
          form.reset();
        })
        .catch(function (err) {
          setMsg("Could not send: " + ((err && err.text) || "please try again."), "err");
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  /* ---------- scroll reveal ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  function mark(selector, step) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add("reveal");
      el.dataset.delay = step ? i * step : 0;
    });
  }

  mark(".feature-cards .fcard", 90);
  mark(".eco-head", 0);
  mark(".eco-grid > *", 120);
  mark(".strat-left", 0);
  mark(".strat-right .strat-photo, .strat-right .strat-metric", 120);
  mark(".step-row .step, .step-row .photo-slot", 60);
  mark(".way-card", 90);
  mark(".ways-head", 0);
  mark(".ways-cta .cta-bar", 120);
  mark(".pricing-head", 0);
  mark(".plans .plan", 130);
  mark(".foot-news", 0);
  mark(".foot-main", 0);
  mark(".foot-bottom", 0);

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var el = e.target;
        el.style.transitionDelay = (el.dataset.delay || 0) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
})();

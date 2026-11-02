(function () {
  var nav = document.querySelector('.site-nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 60); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Highlight the nav link for the section in view (homepage only).
  var links = document.querySelectorAll('.site-nav .links a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        if (byId[e.target.id]) byId[e.target.id].classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // Story filters on /blog/.
  var buttons = document.querySelectorAll('.filters button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sport = btn.dataset.sport;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      document.querySelectorAll('.story-list .story').forEach(function (card) {
        card.hidden = !(sport === 'all' || card.dataset.sport === sport);
      });
    });
  });
})();

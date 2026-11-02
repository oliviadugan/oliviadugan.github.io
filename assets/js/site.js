// Sport filter on /blog/.
(function () {
  var buttons = document.querySelectorAll('.filters button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sport = btn.dataset.sport;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      document.querySelectorAll('.story-list .story-item').forEach(function (item) {
        item.hidden = !(sport === 'all' || item.dataset.sport === sport);
      });
    });
  });
})();

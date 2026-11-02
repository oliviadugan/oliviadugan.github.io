(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sport filter on /blog/.
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

  // Scoreboard flip: each letter cycles through random letters, then lands, left to right.
  var board = document.querySelector('.flapboard');
  if (board && !reduce) {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', running = false;
    var flip = function () {
      if (running) return;
      running = true;
      var tiles = board.querySelectorAll('span:not(.gap)'), left = tiles.length;
      tiles.forEach(function (tile, i) {
        var final = tile.dataset.final || (tile.dataset.final = tile.textContent), n = 0, stop = 8 + i * 2;
        var timer = setInterval(function () {
          tile.textContent = n >= stop ? final : letters[Math.floor(Math.random() * letters.length)];
          tile.classList.remove('flip'); void tile.offsetWidth; tile.classList.add('flip');
          if (n++ >= stop) { clearInterval(timer); if (--left === 0) running = false; }
        }, 55);
      });
    };
    flip();
    board.addEventListener('mouseenter', flip);
  }

  // Ticker: repeat the stories until one set is wider than the strip, then double it so the loop is seamless.
  var track = document.querySelector('.ticker-track');
  if (track && !reduce) {
    var originals = Array.prototype.slice.call(track.children), win = track.parentNode;
    var addCopy = function () {
      originals.forEach(function (a) {
        var c = a.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.tabIndex = -1;
        track.appendChild(c);
      });
    };
    var guard = 0;
    while (track.scrollWidth < win.clientWidth && guard++ < 20) addCopy();
    var setWidth = track.scrollWidth, copies = track.children.length / originals.length;
    for (var k = 0; k < copies; k++) addCopy();
    track.style.setProperty('--tick-time', Math.round(setWidth / 60) + 's');
  }

  // Story photo that follows the cursor over a headline (mouse only, posts with an image).
  var items = document.querySelectorAll('.story-item[data-img]');
  if (items.length && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var box = document.createElement('div'), img = document.createElement('img');
    box.className = 'hover-photo';
    img.alt = '';
    box.appendChild(img);
    document.body.appendChild(box);
    var move = function (e) {
      var w = box.offsetWidth, h = box.offsetHeight;
      var x = e.clientX + 24, y = e.clientY - h / 2;
      if (x + w > innerWidth - 12) x = e.clientX - w - 24;
      y = Math.max(12, Math.min(y, innerHeight - h - 12));
      box.style.translate = x + 'px ' + y + 'px';
    };
    items.forEach(function (item) {
      item.addEventListener('mouseenter', function (e) { img.src = item.dataset.img; move(e); box.classList.add('on'); });
      item.addEventListener('mousemove', move);
      item.addEventListener('mouseleave', function () { box.classList.remove('on'); });
    });
    addEventListener('scroll', function () { box.classList.remove('on'); }, { passive: true });
  }
})();

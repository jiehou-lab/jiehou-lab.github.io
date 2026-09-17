/* Hou Lab site — small, dependency-free helpers */
(function () {
  'use strict';

  /* Mobile nav toggle */
  var nav = document.querySelector('.navbar');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  /* Home page carousel */
  var car = document.querySelector('.carousel');
  if (car) {
    var slides = car.querySelectorAll('.slide');
    var i = 0, timer;
    function show(n) {
      slides[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { show(i + 1); }, 6000); }
    car.querySelector('.prev').addEventListener('click', function () { show(i - 1); restart(); });
    car.querySelector('.next').addEventListener('click', function () { show(i + 1); restart(); });
    restart();
  }

  /* Sidenav scroll-spy */
  var links = document.querySelectorAll('.sidenav a[href^="#"]');
  if (links.length) {
    var targets = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) targets.push({ a: a, el: el });
    });
    function spy() {
      var y = window.scrollY + 90, cur = targets[0];
      targets.forEach(function (t) { if (t.el.offsetTop <= y) cur = t; });
      links.forEach(function (a) { a.classList.remove('active'); });
      if (cur) cur.a.classList.add('active');
    }
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* Gallery lightbox */
  var gal = document.querySelector('.gallery');
  if (gal) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = '<button class="close" aria-label="Close">&times;</button><img alt=""><div class="cap"></div>';
    document.body.appendChild(box);
    var img = box.querySelector('img'), cap = box.querySelector('.cap');
    gal.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || !/\.(jpe?g|png|gif|webp)$/i.test(a.getAttribute('href'))) return;
      e.preventDefault();
      img.src = a.getAttribute('href');
      var fc = a.querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : '';
      box.classList.add('show');
    });
    box.addEventListener('click', function () { box.classList.remove('show'); });

    /* "More details" text pop-up */
    var tb = document.createElement('div');
    tb.className = 'textbox';
    tb.innerHTML = '<div class="panel" role="dialog" aria-modal="true"><button class="close" aria-label="Close">&times;</button><h3></h3><div class="body"></div></div>';
    document.body.appendChild(tb);
    gal.addEventListener('click', function (e) {
      var btn = e.target.closest('.more');
      if (!btn) return;
      var fig = btn.closest('figure'), det = fig.querySelector('.details');
      tb.querySelector('h3').innerHTML = btn.getAttribute('data-title') || (fig.querySelector('figcaption') || {}).textContent || '';
      tb.querySelector('.body').innerHTML = det ? det.innerHTML : '';
      tb.classList.add('show');
    });
    tb.addEventListener('click', function (e) { if (e.target === tb || e.target.closest('.close')) tb.classList.remove('show'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { box.classList.remove('show'); tb.classList.remove('show'); } });
  }
})();

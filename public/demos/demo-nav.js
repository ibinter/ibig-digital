(function () {
  /* ── 1. Fix boutons d'action href="#" → scroll vers section contact/réservation ── */
  document.querySelectorAll('a[href="#"], button[onclick=""], input[type="submit"]').forEach(function (el) {
    if (el.tagName === 'A') {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var target =
          document.querySelector('#contact') ||
          document.querySelector('#reservation') ||
          document.querySelector('#rdv') ||
          document.querySelector('#devis') ||
          document.querySelector('#inscription') ||
          document.querySelector('#commande') ||
          document.querySelector('footer');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  /* ── 2. Fix demo bar : liens "Retour" et "Commander" dynamiques via URL ── */
  var demoBar = document.getElementById('demo-bar') || document.querySelector('.demo-bar');
  if (demoBar) {
    var filename = window.location.pathname.split('/').pop().replace('.html', '');
    var dashIdx  = filename.indexOf('-');
    var secteur  = dashIdx > -1 ? filename.slice(0, dashIdx) : filename;
    var tplId    = dashIdx > -1 ? filename.slice(dashIdx + 1) : filename;

    /* Lien retour → /templates/secteur/template-id */
    var retour = demoBar.querySelector('a:first-child');
    if (retour) {
      retour.href = '/templates/' + secteur + '/' + tplId;
      retour.textContent = '← Voir ce template';
    }

    /* Lien commander → /templates/commander?secteur=... */
    var commander = demoBar.querySelector('a:last-child');
    if (commander && commander !== retour) {
      commander.href = '/templates/commander?secteur=' + secteur + '&template=' + tplId;
      commander.textContent = 'Commander ce template →';
    }
  }

  /* ── 3. Formulaires de contact/réservation → feedback visuel ── */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"], button');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = '✓ Message envoyé !';
        btn.style.background = '#16a34a';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2500);
      }
    });
  });
})();

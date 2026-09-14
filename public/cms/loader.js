/**
 * IBIG DIGITAL — CMS Content Loader v1.0
 * À inclure dans chaque site livré juste avant </body>
 *
 * Usage :
 *   <script src="https://ibig-digital.com/cms/loader.js" data-site="ORDER_UUID"></script>
 *
 * Balises HTML éditables via attribut data-cms="section.key" :
 *   <h1 data-cms="hero.title">Titre par défaut</h1>
 *   <p  data-cms="contact.phone">+225 00 00 00 00</p>
 *   <a  data-cms-href="contact.whatsapp" href="#">WhatsApp</a>
 *   <img data-cms-src="hero.bg_image" src="default.jpg" />
 *   <div data-cms-bg="hero.bg_image" style="background-image:url(default.jpg)"></div>
 *   <span data-cms-color="identity.primary_color" style="color:#FF6B00">texte</span>
 */
(function () {
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  })()

  var siteId = script.getAttribute('data-site')
  if (!siteId) { console.warn('[IBIG CMS] data-site manquant.'); return }

  var API = 'https://ibig-digital.com/api/cms/' + siteId + '/content?public=1'

  fetch(API)
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (res) {
      if (!res || !res.content) return

      /* Aplatir le contenu : section.key → valeur */
      var flat = {}
      for (var section in res.content) {
        var data = res.content[section].data || {}
        for (var key in data) {
          flat[section + '.' + key] = data[key]
        }
      }

      /* ── Texte : data-cms="section.key" ── */
      var textEls = document.querySelectorAll('[data-cms]')
      textEls.forEach(function (el) {
        var k = el.getAttribute('data-cms')
        if (flat[k] !== undefined && flat[k] !== '') el.textContent = flat[k]
      })

      /* ── Liens : data-cms-href="section.key" ── */
      var hrefEls = document.querySelectorAll('[data-cms-href]')
      hrefEls.forEach(function (el) {
        var k = el.getAttribute('data-cms-href')
        if (flat[k]) el.setAttribute('href', flat[k])
      })

      /* ── Images : data-cms-src="section.key" ── */
      var srcEls = document.querySelectorAll('[data-cms-src]')
      srcEls.forEach(function (el) {
        var k = el.getAttribute('data-cms-src')
        if (flat[k]) el.setAttribute('src', flat[k])
      })

      /* ── Background image : data-cms-bg="section.key" ── */
      var bgEls = document.querySelectorAll('[data-cms-bg]')
      bgEls.forEach(function (el) {
        var k = el.getAttribute('data-cms-bg')
        if (flat[k]) el.style.backgroundImage = 'url(' + flat[k] + ')'
      })

      /* ── Couleur : data-cms-color="section.key" ── */
      var colorEls = document.querySelectorAll('[data-cms-color]')
      colorEls.forEach(function (el) {
        var k = el.getAttribute('data-cms-color')
        if (flat[k]) el.style.color = flat[k]
      })

      /* ── CSS variable couleur principale ── */
      if (flat['identity.primary_color']) {
        document.documentElement.style.setProperty('--brand-color', flat['identity.primary_color'])
      }
    })
    .catch(function (e) { console.warn('[IBIG CMS] Erreur chargement contenu:', e) })
})()

/* Metalcoop — partial injector (no-build, synchronous).
 *
 * Injects shared <header> and <footer> markup into every page that
 * has a <div data-include="header"></div> / <div data-include="footer">
 * marker. Runs synchronously on parse so the DOM is populated before
 * site.js queries it.
 *
 * The canonical, human-readable source lives in:
 *   partials/header.html
 *   partials/footer.html
 * If you edit those, copy the markup into the template strings below.
 *
 * No-JS fallback: each marker should be paired with a <noscript>
 * sibling carrying minimal text-only navigation, so search engines
 * and JS-disabled clients still get something usable.
 */
(function () {
  'use strict';

  var PARTIALS = {
    header: '\
<header>\
  <div class="container">\
    <nav>\
      <div class="brand">\
        <div>\
          <a href="index.html" aria-label="Ir para o início">\
            <img src="assets/Logo Metalcoop.png" alt="Logo Metalcoop" width="100" height="50">\
          </a>\
        </div>\
      </div>\
      <div class="nav-right">\
        <div class="tabs" role="tablist" aria-label="Navegação principal">\
          <a class="tab" href="index.html">Home</a>\
          <a class="tab" href="empresa.html">A Empresa</a>\
          <a class="tab" href="produtos.html">Produtos</a>\
          <a class="tab" href="clientes.html">Clientes</a>\
          <a class="tab" href="contato.html">Contato</a>\
        </div>\
        <div class="social-icons">\
          <a href="https://www.facebook.com/profile.php?id=61577609887152" target="_blank" rel="noopener" aria-label="Facebook">\
            <img class="social-icon" src="assets/redes/icone_facebook.png" alt="" width="18" height="18">\
          </a>\
          <a href="https://www.instagram.com/metalcoop_salto/" target="_blank" rel="noopener" aria-label="Instagram">\
            <img class="social-icon" src="assets/redes/icone_instagram.png" alt="" width="18" height="18">\
          </a>\
          <a href="https://www.linkedin.com/company/metalcoop-industria/?viewAsMember=true" target="_blank" rel="noopener" aria-label="LinkedIn">\
            <img class="social-icon" src="assets/redes/icone_linkedIn.png" alt="" width="18" height="18">\
          </a>\
        </div>\
      </div>\
    </nav>\
  </div>\
</header>',

    footer: '\
<footer>\
  <div class="container">\
    <div class="footer-grid">\
      <div class="footer-col footer-brand">\
        <div><img src="assets/logo_branco.png" alt="Logo Metalcoop" width="80" height="80"></div>\
        <p class="brand-name"><strong>Metalcoop</strong></p>\
        <p class="copyright">© 2026. Todos os direitos reservados.</p>\
      </div>\
      <div class="footer-col footer-contacts">\
        <h4>Contato</h4>\
        <p><strong>Telefone:</strong><br><a href="tel:+551140289600">+55 11 4028-9600</a></p>\
        <p><strong>Email:</strong><br><a href="mailto:metalcoop@metalcoop.ind.br">metalcoop@metalcoop.ind.br</a></p>\
      </div>\
      <div class="footer-col footer-address">\
        <h4>Endereço</h4>\
        <p>Praça Álvaro Guião, 233<br>B. Estação - Salto - SP</p>\
        <div class="footer-social">\
          <a href="https://www.facebook.com/profile.php?id=61577609887152" target="_blank" rel="noopener" aria-label="Facebook">\
            <img class="social-icon-footer" src="assets/redes/icone_facebook.png" alt="" width="20" height="20">\
          </a>\
          <a href="https://www.instagram.com/metalcoop_salto/" target="_blank" rel="noopener" aria-label="Instagram">\
            <img class="social-icon-footer" src="assets/redes/icone_instagram.png" alt="" width="20" height="20">\
          </a>\
          <a href="https://www.linkedin.com/company/metalcoop-industria/?viewAsMember=true" target="_blank" rel="noopener" aria-label="LinkedIn">\
            <img class="social-icon-footer" src="assets/redes/icone_linkedIn.png" alt="" width="20" height="20">\
          </a>\
        </div>\
      </div>\
    </div>\
  </div>\
</footer>'
  };

  function injectPartials() {
    var nodes = document.querySelectorAll('[data-include]');
    if (!nodes.length) return;

    Array.prototype.forEach.call(nodes, function (node) {
      var name = node.getAttribute('data-include');
      var markup = PARTIALS[name];
      if (!markup) {
        console.warn('[partials] no markup defined for "' + name + '"');
        return;
      }
      var template = document.createElement('template');
      template.innerHTML = markup;
      node.replaceWith(template.content);
    });

    setActiveTab();
  }

  function setActiveTab() {
    var links = document.querySelectorAll('.tabs .tab');
    var path = location.pathname.split('/').pop() || 'index.html';
    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      var active = href === path || (href === 'index.html' && path === '');
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  // Run synchronously now if the marker elements are in the DOM.
  // partials.js is loaded BEFORE site.js (via script tag order), so
  // by the time site.js queries .tabs, the partials are already
  // populated.
  if (document.readyState === 'loading') {
    // Earliest moment we can safely query the DOM where partials live.
    document.addEventListener('DOMContentLoaded', injectPartials, { once: true });
  } else {
    injectPartials();
  }
})();

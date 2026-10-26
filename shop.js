// Fine art print shop. Checkout runs through Shopify (tax and shipping are
// calculated there). Until SHOPIFY is filled in, "Buy" falls back to an email inquiry.
var SHOPIFY = {
  domain: '',          // e.g. 'the-kehoe.myshopify.com'
  storefrontToken: '', // public Storefront API access token
  apiVersion: '2025-01'
};
var INQUIRY_EMAIL = 'aaronkehoe@gmail.com';

// Each print is one Shopify product (by handle) with two options:
// Size (8x10, 11x14, ...) and Frame (Unframed, Framed).
var PRINTS = [
  { handle: 'print-01', title: 'Print No. 01', img: 'assets/photos/01.jpg', alt: 'Hoover Tower and fountain seen through a dark window frame, black and white' },
  { handle: 'print-02', title: 'Print No. 02', img: 'assets/photos/02.jpg' },
  { handle: 'print-03', title: 'Print No. 03', img: 'assets/photos/03.jpg' },
  { handle: 'print-04', title: 'Print No. 04', img: 'assets/photos/04.jpg' },
  { handle: 'print-05', title: 'Print No. 05', img: 'assets/photos/05.jpg' },
  { handle: 'print-06', title: 'Print No. 06', img: 'assets/photos/06.jpg' }
];

var SIZES = [
  { size: '8x10',  framed: 450 },
  { size: '11x14', unframed: 950,  framed: 1200 },
  { size: '16x20', unframed: 1500, framed: 1800 },
  { size: '20x24', unframed: 2250, framed: 2625, edition: 250 },
  { size: '20x30', unframed: 3000, framed: 3500, edition: 75 },
  { size: '30x40', unframed: 4200, framed: 5100, edition: 75 },
  { size: '40x50', unframed: 6000, framed: 7500, edition: 15 }
];

(function () {
  var money = function (n) { return '$' + n.toLocaleString('en-US'); };
  var configured = SHOPIFY.domain && SHOPIFY.storefrontToken;
  var grid = document.getElementById('print-grid');
  var dlg = document.getElementById('print-dialog');
  var state = { print: null, size: null, frame: 'framed', variants: null };

  PRINTS.forEach(function (p, i) {
    var card = document.createElement('button');
    card.className = 'print';
    card.type = 'button';
    card.innerHTML =
      '<span class="print-img tile"><img src="' + p.img + '" alt="' + (p.alt || '') + '" loading="lazy" onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()"></span>' +
      '<span class="print-meta"><span class="print-title">' + p.title + '</span>' +
      '<span class="print-from">View sizes</span></span>';
    card.addEventListener('click', function () { open(i); });
    grid.appendChild(card);
  });

  // Size and price list inside the preview: one row per size, one button per finish
  var sizeWrap = dlg.querySelector('.size-list');
  SIZES.forEach(function (s) {
    var row = document.createElement('div');
    row.className = 'size-row';
    row.innerHTML = '<span class="size-name">' + s.size.replace('x', ' × ') + ' in' +
      '<small>' + (s.edition ? 'Edition of ' + s.edition : 'Open edition') + '</small></span>';
    ['unframed', 'framed'].forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'price-opt';
      b.dataset.size = s.size;
      b.dataset.frame = f;
      if (s[f]) {
        b.innerHTML = '<small>' + (f === 'framed' ? 'Framed' : 'Print') + '</small>' + money(s[f]);
        b.addEventListener('click', function () { state.size = s; state.frame = f; render(); });
      } else {
        b.disabled = true;
        b.innerHTML = '<small>Print</small>Framed only';
      }
      row.appendChild(b);
    });
    sizeWrap.appendChild(row);
  });
  dlg.querySelector('.close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('.buy').addEventListener('click', buy);

  function open(i) {
    state.print = PRINTS[i];
    state.size = SIZES[1];
    state.frame = 'framed';
    state.variants = null;
    var img = dlg.querySelector('.dlg-img');
    img.classList.remove('has-img');
    img.innerHTML = '<img src="' + state.print.img + '" alt="' + (state.print.alt || '') + '" onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()">';
    dlg.querySelector('.dlg-title').textContent = state.print.title;
    render();
    dlg.showModal();
    if (configured) loadVariants(state.print).then(function (v) {
      if (state.print && state.print.handle === v.handle) { state.variants = v.nodes; render(); }
    }).catch(function () {});
  }

  function variantFor() {
    if (!state.variants) return null;
    var want = { Size: state.size.size, Frame: state.frame === 'framed' ? 'Framed' : 'Unframed' };
    return state.variants.filter(function (v) {
      return v.selectedOptions.every(function (o) { return !(o.name in want) || o.value === want[o.name]; });
    })[0] || null;
  }

  function render() {
    var s = state.size;
    if (!s.unframed) state.frame = 'framed';
    sizeWrap.querySelectorAll('.price-opt').forEach(function (b) {
      b.classList.toggle('on', b.dataset.size === s.size && b.dataset.frame === state.frame);
    });
    dlg.querySelector('.dlg-choice').textContent = s.size.replace('x', ' × ') + ' in, ' +
      (state.frame === 'framed' ? 'framed' : 'print only') + (s.edition ? ', edition of ' + s.edition : '');
    dlg.querySelector('.dlg-price').textContent = money(s[state.frame]);
    var buy = dlg.querySelector('.buy');
    var v = variantFor();
    var soldOut = v && !v.availableForSale;
    buy.disabled = !!soldOut;
    buy.textContent = soldOut ? 'Sold out' : configured ? 'Buy now' : 'Inquire to purchase';
  }

  function api(query, variables) {
    return fetch('https://' + SHOPIFY.domain + '/api/' + SHOPIFY.apiVersion + '/graphql.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': SHOPIFY.storefrontToken },
      body: JSON.stringify({ query: query, variables: variables })
    }).then(function (r) { return r.json(); });
  }

  function loadVariants(p) {
    return api('query($h:String!){product(handle:$h){variants(first:50){nodes{id availableForSale selectedOptions{name value}}}}}', { h: p.handle })
      .then(function (r) { return { handle: p.handle, nodes: r.data.product.variants.nodes }; });
  }

  function buy() {
    var label = state.print.title + ', ' + state.size.size + ' ' + (state.frame === 'framed' ? 'framed' : 'unframed');
    var btn = dlg.querySelector('.buy');
    var fallback = function () {
      location.href = 'mailto:' + INQUIRY_EMAIL + '?subject=' + encodeURIComponent('Print inquiry: ' + label);
    };
    if (!configured) return fallback();
    var v = variantFor();
    var go = function (variant) {
      if (!variant) return fallback();
      btn.disabled = true;
      btn.textContent = 'Going to checkout…';
      api('mutation($l:[CartLineInput!]!){cartCreate(input:{lines:$l}){cart{checkoutUrl} userErrors{message}}}',
        { l: [{ merchandiseId: variant.id, quantity: 1 }] })
        .then(function (r) {
          var cart = r.data && r.data.cartCreate && r.data.cartCreate.cart;
          if (cart) location.href = cart.checkoutUrl; else { render(); fallback(); }
        })
        .catch(function () { render(); fallback(); });
    };
    if (v) go(v);
    else loadVariants(state.print).then(function (r) { state.variants = r.nodes; go(variantFor()); }).catch(fallback);
  }
})();

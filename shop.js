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
  { handle: 'print-01', title: 'Fine Art Print - No. 1', img: 'assets/photos/01.jpg', alt: 'Hoover Tower and fountain seen through a dark window frame, black and white' },
  { handle: 'print-02', title: 'Fine Art Print - No. 2', img: 'assets/photos/02.jpg', alt: 'Rocky coastline under a starry night sky, long exposure, black and white' },
  { handle: 'print-03', title: 'Fine Art Print - No. 3', img: 'assets/photos/03.jpg', alt: 'Gloved hand lifting a wafer carrier from cleanroom equipment, black and white' },
  { handle: 'print-04', title: 'Fine Art Print - No. 4', img: 'assets/photos/04.jpg', alt: 'Scientist in a cleanroom suit looking through a microscope, black and white' },
  { handle: 'print-05', title: 'Fine Art Print - No. 5', img: 'assets/photos/05.jpg', alt: 'Group in cleanroom suits walking through a fabrication lab, black and white' },
  { handle: 'print-06', title: 'Fine Art Print - No. 6', img: 'assets/photos/06.jpg', alt: 'Three gloved hands holding up silicon wafers, black and white' },
  { handle: 'print-07', title: 'Fine Art Print - No. 7', img: 'assets/photos/07.jpg', alt: 'Painter at an easel on a rocky shoreline, black and white' },
  { handle: 'print-08', title: 'Fine Art Print - No. 8', img: 'assets/photos/08.jpg', alt: 'Man standing on a stairway beside a large triangular map artwork, black and white' },
  { handle: 'print-09', title: 'Fine Art Print - No. 9', img: 'assets/photos/09.jpg', alt: 'Sunset sky over an empty soccer field with stadium lights' },
  { handle: 'print-10', title: 'Fine Art Print - No. 10', img: 'assets/photos/10.jpg', alt: 'Palm-lined walkway under a pink sunset sky, with a domed tower behind' },
  { handle: 'print-11', title: 'Fine Art Print - No. 11', img: 'assets/photos/11.jpg', alt: 'Cyclist riding past a stone archway with palm trees, black and white' },
  { handle: 'print-12', title: 'Fine Art Print - No. 12', img: 'assets/photos/12.jpg', alt: 'Close-up of honeybees at the entrance of a hive' },
  { handle: 'print-13', title: 'Fine Art Print - No. 13', img: 'assets/photos/13.jpg', alt: 'Tower Bridge framed through a chain-link fence, black and white' },
  { handle: 'print-14', title: 'Fine Art Print - No. 14', img: 'assets/photos/14.jpg', alt: 'Rocky shoreline at dusk under an overcast sky, black and white' },
  { handle: 'print-15', title: 'Fine Art Print - No. 15', img: 'assets/photos/15.jpg', alt: 'White building at dusk beside a shop window strung with lights' },
  { handle: 'print-16', title: 'Fine Art Print - No. 16', img: 'assets/photos/16.jpg', alt: 'Golden Gate Bridge reflected in still water under a blue sky' },
  { handle: 'print-17', title: 'Fine Art Print - No. 17', img: 'assets/photos/17.jpg', alt: 'Twilight over oak-dotted hills above a lake' },
  { handle: 'print-18', title: 'Fine Art Print - No. 18', img: 'assets/photos/18.jpg', alt: 'Tents on a lawn in front of a lit Spanish-style building at dusk' },
  { handle: 'print-19', title: 'Fine Art Print - No. 19', img: 'assets/photos/19.jpg', alt: 'Stars over a rocky shoreline at night, black and white' },
  { handle: 'print-20', title: 'Fine Art Print - No. 20', img: 'assets/photos/20.jpg', alt: 'Reflection in the curved fender of a vintage car, black and white' },
  { handle: 'print-21', title: 'Fine Art Print - No. 21', img: 'assets/photos/21.jpg', alt: 'Coach pointing skyward on a practice field under a blue sky' },
  { handle: 'print-22', title: 'Fine Art Print - No. 22', img: 'assets/photos/22.jpg', alt: 'Close-up of sea foam on a beach with hills beyond, black and white' },
  { handle: 'print-23', title: 'Fine Art Print - No. 23', img: 'assets/photos/23.jpg', alt: 'Oak tree silhouetted by sunrise over a misty field of mustard flowers' }
];

var SIZES = [
  { size: '8x10',  framed: 450 },
  { size: '11x14', unframed: 950,  framed: 1200 },
  { size: '16x20', unframed: 1500, framed: 1700 },
  { size: '20x24', unframed: 2250, framed: 2450, edition: 250 },
  { size: '20x30', unframed: 3000, framed: 3300, edition: 75 },
  { size: '30x40', unframed: 4200, framed: 4600, edition: 75 },
  { size: '40x50', unframed: 6000, framed: 6500, edition: 15 }
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
    card.setAttribute('aria-label', p.title + ': view sizes and prices');
    card.innerHTML =
      '<span class="print-img tile"><img src="' + p.img + '" alt="' + (p.alt || '') + '" loading="lazy" onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()"></span>';
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

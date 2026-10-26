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
  { handle: 'print-14', title: 'Fine Art Print - No. 14', img: 'assets/photos/14.jpg', alt: 'White building at dusk beside a shop window strung with lights' },
  { handle: 'print-15', title: 'Fine Art Print - No. 15', img: 'assets/photos/15.jpg', alt: 'Golden Gate Bridge reflected in still water under a blue sky' },
  { handle: 'print-16', title: 'Fine Art Print - No. 16', img: 'assets/photos/16.jpg', alt: 'Twilight over oak-dotted hills above a lake' },
  { handle: 'print-17', title: 'Fine Art Print - No. 17', img: 'assets/photos/17.jpg', alt: 'Tents on a lawn in front of a lit Spanish-style building at dusk' },
  { handle: 'print-18', title: 'Fine Art Print - No. 18', img: 'assets/photos/18.jpg', alt: 'Stars over a rocky shoreline at night, black and white' },
  { handle: 'print-19', title: 'Fine Art Print - No. 19', img: 'assets/photos/19.jpg', alt: 'Reflection in the curved fender of a vintage car, black and white' },
  { handle: 'print-20', title: 'Fine Art Print - No. 20', img: 'assets/photos/20.jpg', alt: 'Coach pointing skyward on a practice field under a blue sky' },
  { handle: 'print-21', title: 'Fine Art Print - No. 21', img: 'assets/photos/21.jpg', alt: 'Close-up of sea foam on a beach with hills beyond, black and white' },
  { handle: 'print-22', title: 'Fine Art Print - No. 22', img: 'assets/photos/22.jpg', alt: 'Oak tree silhouetted by sunrise over a misty field of mustard flowers' },
  { handle: 'print-23', title: 'Fine Art Print - No. 23', img: 'assets/photos/23.jpg', alt: 'Dorsal fin cutting through sunlit water, black and white' },
  { handle: 'print-24', title: 'Fine Art Print - No. 24', img: 'assets/photos/24.jpg', alt: 'Hoover Tower at night seen from street level, with a cyclist on a wet road, black and white' },
  { handle: 'print-25', title: 'Fine Art Print - No. 25', img: 'assets/photos/25.jpg', alt: 'Railcar wheel and coupling on a track beside grass, black and white' },
  { handle: 'print-26', title: 'Fine Art Print - No. 26', img: 'assets/photos/26.jpg', alt: 'Empty workspace with desks and window light, black and white' },
  { handle: 'print-27', title: 'Fine Art Print - No. 27', img: 'assets/photos/27.jpg', alt: 'Lattice of a large dish antenna seen from below, black and white' },
  { handle: 'print-28', title: 'Fine Art Print - No. 28', img: 'assets/photos/28.jpg', alt: 'Woman working at laboratory equipment, black and white' },
  { handle: 'print-29', title: 'Fine Art Print - No. 29', img: 'assets/photos/29.jpg', alt: 'Sculpture fountain in a sunny arcaded courtyard with students' },
  { handle: 'print-30', title: 'Fine Art Print - No. 30', img: 'assets/photos/30.jpg', alt: 'Smiling beekeeper beside stacked hives above the hills, black and white' },
  { handle: 'print-31', title: 'Fine Art Print - No. 31', img: 'assets/photos/31.jpg', alt: 'Vine-covered wooden workshop doors, black and white' },
  { handle: 'print-32', title: 'Fine Art Print - No. 32', img: 'assets/photos/32.jpg', alt: 'Sunset light through a pointed window into a dark room' },
  { handle: 'print-33', title: 'Fine Art Print - No. 33', img: 'assets/photos/33.jpg', alt: 'Beach seen through cypress branches, black and white' },
  { handle: 'print-34', title: 'Fine Art Print - No. 34', img: 'assets/photos/34.jpg', alt: 'Rocky coastline under a starry twilight sky' },
  { handle: 'print-35', title: 'Fine Art Print - No. 35', img: 'assets/photos/35.jpg', alt: 'Bartender and patrons in a dimly lit bar, black and white' },
  { handle: 'print-36', title: 'Fine Art Print - No. 36', img: 'assets/photos/36.jpg', alt: 'Sandstone arcade with Hoover Tower and parked bicycles, black and white' },
  { handle: 'print-37', title: 'Fine Art Print - No. 37', img: 'assets/photos/37.jpg', alt: 'Couple walking past a lake in silhouette, black and white' },
  { handle: 'print-38', title: 'Fine Art Print - No. 38', img: 'assets/photos/38.jpg', alt: 'Vintage silver sports car parked under trees' },
  { handle: 'print-39', title: 'Fine Art Print - No. 39', img: 'assets/photos/39.jpg', alt: 'Cyclist passing through a stone arcade, black and white' },
  { handle: 'print-40', title: 'Fine Art Print - No. 40', img: 'assets/photos/40.jpg', alt: 'Hoover Tower and a sandstone arcade at dusk' },
  { handle: 'print-41', title: 'Fine Art Print - No. 41', img: 'assets/photos/41.jpg', alt: 'Three men posing on the balcony of a modern building, black and white' },
  { handle: 'print-42', title: 'Fine Art Print - No. 42', img: 'assets/photos/42.jpg', alt: 'Person climbing a curved concrete stairway, black and white' },
  { handle: 'print-43', title: 'Fine Art Print - No. 43', img: 'assets/photos/43.jpg', alt: 'Figure beside curved glass windows in a dark hall, black and white' },
  { handle: 'print-44', title: 'Fine Art Print - No. 44', img: 'assets/photos/44.jpg', alt: 'Two men smiling outdoors on a sunny walkway, black and white' },
  { handle: 'print-45', title: 'Fine Art Print - No. 45', img: 'assets/photos/45.jpg', alt: 'Runners in silhouette passing a puddle under a pink and violet dusk sky' }
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
  var state = { index: 0, print: null, size: null, frame: 'framed', variants: null };

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

  // Show three rows at a time; the rest of the collection scrolls inside the frame
  function fitGrid() {
    var card = grid.querySelector('.print');
    if (!card) return;
    var gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
    grid.style.maxHeight = (card.offsetHeight * 3 + gap * 2) + 'px';
    moreHint();
  }
  function moreHint() {
    grid.classList.toggle('more', grid.scrollTop + grid.clientHeight < grid.scrollHeight - 4);
  }
  fitGrid();
  window.addEventListener('resize', fitGrid);
  window.addEventListener('load', fitGrid);
  grid.addEventListener('scroll', moreHint, { passive: true });

  // Size and price picker inside the preview: one option per size and finish
  var picker = dlg.querySelector('.size-select');
  SIZES.forEach(function (sz, i) {
    ['unframed', 'framed'].forEach(function (f) {
      if (!sz[f]) return;
      var o = document.createElement('option');
      o.value = i + ':' + f;
      o.textContent = sz.size.replace('x', ' × ') + ' in  ·  ' + (f === 'framed' ? 'Framed' : 'Print') + '  ·  ' + money(sz[f]);
      picker.appendChild(o);
    });
  });
  picker.addEventListener('change', function () {
    var v = picker.value.split(':');
    state.size = SIZES[+v[0]];
    state.frame = v[1];
    render();
  });
  dlg.querySelector('.close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('.buy').addEventListener('click', buy);

  // Browse prints without leaving the preview: arrows, arrow keys, or swipe
  var step = function (d) { open((state.index + d + PRINTS.length) % PRINTS.length); };
  dlg.querySelector('.prev').addEventListener('click', function () { step(-1); });
  dlg.querySelector('.next').addEventListener('click', function () { step(1); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });
  var touchX = null;
  var stage = dlg.querySelector('.dlg-img');
  stage.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  });

  function open(i) {
    // Keep the chosen size and finish while browsing; reset only on a fresh open
    if (!dlg.open) { state.size = SIZES[1]; state.frame = 'framed'; }
    state.index = i;
    state.print = PRINTS[i];
    state.variants = null;
    var stage = dlg.querySelector('.dlg-img');
    var old = stage.querySelector('img');
    if (old) old.remove();
    stage.classList.remove('has-img');
    var img = document.createElement('img');
    img.alt = state.print.alt || '';
    img.onload = function () { stage.classList.add('has-img'); };
    img.onerror = function () { img.remove(); };
    img.src = state.print.img;
    stage.insertBefore(img, stage.firstChild);
    dlg.querySelector('.dlg-title').textContent = state.print.title;
    render();
    if (!dlg.open) dlg.showModal();
    // Warm the neighbours so stepping feels instant
    [1, -1].forEach(function (d) { new Image().src = PRINTS[(i + d + PRINTS.length) % PRINTS.length].img; });
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
    picker.value = SIZES.indexOf(s) + ':' + state.frame;
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

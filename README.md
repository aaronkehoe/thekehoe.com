# thekehoe.com

Static site for The Kehoe, hosted on GitHub Pages.

- `index.html`, `styles.css`: the page
- `assets/`: logo, favicon, photos (`assets/photos/01.jpg` to `09.jpg`) and video
- `CNAME`: custom domain for GitHub Pages

## Print shop (Shopify)

`shop.js` holds the print list, sizes and prices. Checkout goes through Shopify, which adds
sales tax, shipping and handling. Until `SHOPIFY.domain` and `SHOPIFY.storefrontToken` are set,
the Buy button opens an email inquiry instead.

In Shopify, create one product per print with the handle used in `PRINTS` (`print-01`, ...)
and two options:
- **Size**: `8x10`, `11x14`, `16x20`, `20x24`, `20x30`, `30x40`, `40x50`
- **Frame**: `Unframed`, `Framed` (8x10 is framed only)

Set inventory on the limited-edition variants so they show "Sold out" when the edition runs out.

/* Placeholder catalogue — replace names, prices and images with real stock.
   `price` is a plain number so it can be formatted, sorted, or filtered into
   budget bands later.

   NOTE: there are only seven photographs in public/collections/, so images
   repeat across entries. Every product needs its own photo before launch. */

export const products = [
  { id: 'p01', name: 'Pink Shibori Linen Saree', price: 1850, category: 'handloom', image: '/collections/1.jpeg', alt: 'Pink and white tie-dyed linen saree with a silver zari border' },
  { id: 'p02', name: 'Peacock Blue Silk Saree', price: 12400, category: 'silk', image: '/collections/2.jpeg', alt: 'Peacock-blue silk saree with a magenta contrast border of gold zari' },
  { id: 'p03', name: 'Orange Gold Brocade Bridal Saree', price: 28500, category: 'bridal', image: '/collections/3.jpeg', alt: 'Bridal saree in orange and gold brocade with a deep purple border' },
  { id: 'p04', name: 'Black Checked Cotton Saree', price: 1299, category: 'printed', image: '/collections/4.jpeg', alt: 'Black and cream chequered cotton saree with a thin gold border' },
  { id: 'p05', name: 'Indigo Shibori Saree', price: 2150, category: 'handloom', image: '/collections/5.jpeg', alt: 'Indigo blue saree with white resist-dyed diamond patterns' },
  { id: 'p06', name: 'Mint Green Cotton Saree', price: 1650, category: 'cotton', image: '/collections/6.jpeg', alt: 'Mint green cotton saree with a fine silver border and printed pallu' },
  { id: 'p07', name: 'Sea Green Tissue Silk Saree', price: 18900, category: 'festive', image: '/collections/7.jpeg', alt: 'Sea-green tissue silk saree with a heavy gold zari pallu' },

  { id: 'p08', name: 'Rose Gold Tissue Saree', price: 9400, category: 'festive', image: '/collections/7.jpeg', alt: 'Tissue silk saree in rose gold with a woven zari pallu' },
  { id: 'p09', name: 'Ivory Handloom Cotton Saree', price: 1450, category: 'cotton', image: '/collections/6.jpeg', alt: 'Ivory handloom cotton saree with a fine contrast border' },
  { id: 'p10', name: 'Maroon Wedding Silk Saree', price: 32000, category: 'bridal', image: '/collections/3.jpeg', alt: 'Maroon wedding silk saree with heavy gold brocade work' },
  { id: 'p11', name: 'Teal Kanchipuram Silk Saree', price: 15600, category: 'silk', image: '/collections/2.jpeg', alt: 'Teal Kanchipuram silk saree with a contrast woven border' },
  { id: 'p12', name: 'Charcoal Checked Saree', price: 1150, category: 'printed', image: '/collections/4.jpeg', alt: 'Charcoal chequered saree with a slim gold border' },

  { id: 'p13', name: 'Coral Tie-Dye Linen Saree', price: 1990, category: 'handloom', image: '/collections/1.jpeg', alt: 'Coral tie-dyed linen saree with a silver border' },
  { id: 'p14', name: 'Midnight Blue Shibori Saree', price: 2400, category: 'handloom', image: '/collections/5.jpeg', alt: 'Midnight blue shibori saree with white resist patterns' },
  { id: 'p15', name: 'Emerald Festive Silk Saree', price: 21500, category: 'festive', image: '/collections/7.jpeg', alt: 'Emerald festive silk saree with a gold zari pallu' },
  { id: 'p16', name: 'Sandal Beige Cotton Saree', price: 1350, category: 'cotton', image: '/collections/6.jpeg', alt: 'Sandal beige cotton saree with a printed border' },
  { id: 'p17', name: 'Magenta Border Silk Saree', price: 13800, category: 'silk', image: '/collections/2.jpeg', alt: 'Silk saree with a broad magenta and gold contrast border' },
  { id: 'p18', name: 'Antique Gold Bridal Saree', price: 36500, category: 'bridal', image: '/collections/3.jpeg', alt: 'Antique gold bridal saree with dense brocade weaving' },

  { id: 'p19', name: 'Slate Checked Daily Saree', price: 999, category: 'printed', image: '/collections/4.jpeg', alt: 'Slate chequered daily wear saree with a plain border' },
  { id: 'p20', name: 'Blush Pink Handloom Saree', price: 2250, category: 'handloom', image: '/collections/1.jpeg', alt: 'Blush pink handloom saree with a silver zari border' },
  { id: 'p21', name: 'Powder Blue Cotton Saree', price: 1550, category: 'cotton', image: '/collections/5.jpeg', alt: 'Powder blue cotton saree with a fine woven border' },
  { id: 'p22', name: 'Copper Zari Festive Saree', price: 16400, category: 'festive', image: '/collections/7.jpeg', alt: 'Copper toned festive saree with zari detailing' },
];

/* Home page shows the first seven; the eighth cell becomes the "see all" tile. */
export const FEATURED_COUNT = 7;

/* Copy is keyed by category rather than written per product — 22 bespoke
   descriptions would be 22 pieces of invented detail to unpick later. Replace
   with real product copy as stock is photographed and written up. */
export const categoryCopy = {
  bridal: {
    label: 'Bridal & Wedding',
    blurb:
      'Woven for the day everything changes. Dense zari work across the body and pallu, with a contrast border made to be seen from the back of the hall.',
    fabric: 'Pure silk with metallic zari',
    length: '6.3 m including blouse piece',
  },
  silk: {
    label: 'Pure Silk',
    blurb:
      'Traditional silk with a contrast border, the weave that most people picture when they picture a saree. Heavy enough to hold a pleat, soft enough to wear all evening.',
    fabric: 'Pure mulberry silk',
    length: '6.3 m including blouse piece',
  },
  festive: {
    label: 'Party & Festive',
    blurb:
      'Made for weddings you are attending rather than starring in. Tissue and light silk that catch the light without weighing you down.',
    fabric: 'Tissue silk blend',
    length: '5.5 m plus blouse piece',
  },
  cotton: {
    label: 'Daily Cotton',
    blurb:
      'Soft, breathable and unfussy. The saree you reach for on a working Tuesday, and the one that gets better after every wash.',
    fabric: 'Handloom cotton',
    length: '5.5 m plus blouse piece',
  },
  printed: {
    label: 'Printed Casuals',
    blurb:
      'Easy prints and checks at a price that does not ask you to think about it. Light on the shoulder and light on the wallet.',
    fabric: 'Cotton blend',
    length: '5.5 m plus blouse piece',
  },
  handloom: {
    label: 'Handloom & Dyed',
    blurb:
      'Resist-dyed by hand in small batches, so no two drapes are quite alike. Slight variation in the pattern is the point, not a flaw.',
    fabric: 'Handloom linen, hand-dyed',
    length: '5.5 m plus blouse piece',
  },
};

const FALLBACK_COPY = categoryCopy.cotton;

export function getCopy(product) {
  return categoryCopy[product?.category] ?? FALLBACK_COPY;
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

/* Same category first, topped up from the rest so the row is never short. */
export function getRelated(product, count = 4) {
  if (!product) return products.slice(0, count);
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, count);
}

export const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
});

import { Product, Review } from '../types/shop';

export const HERO_IMAGE = '/src/assets/images/hero_interior_showcase_1791181009339.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'koto-lounge-chair',
    name: 'Koto Sculptural Lounge Chair',
    subtitle: 'Solid White Oak & Tactile Wool Bouclé',
    category: 'Living',
    priceUSD: 1420,
    originalPriceUSD: 1650,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 6,
    image: '/src/assets/images/product_sculptural_chair_1791181022663.jpg',
    material: 'FSC-Certified Solid European Oak, Italian Wool Bouclé',
    dimensions: 'W 82cm × D 79cm × H 74cm (Seat H 41cm)',
    weight: '24.5 kg',
    designer: 'Studio Ilse & Arvidson, Copenhagen',
    origin: 'Handcrafted in Billund, Denmark',
    leadTime: 'Dispatches in 2–4 business days',
    description: 'The Koto Lounge Chair is a masterwork of reduction. Carved from slow-grown European white oak with soft, organically tapered joinery, its reclined pitch cradles the body with measured posture. Upholstered in dense, tactile wool bouclé with reinforced feather-blend lumbar core.',
    details: [
      'Precision mortise-and-tenon solid wood joinery without visible hardware',
      'High-resilience foam core wrapped in hypoallergenic duck feather down',
      'Hand-finished with plant-based matte UV hardwax oil',
      'Includes brass-capped leveling feet and wool floor glides'
    ],
    variants: [
      {
        name: 'Timber Finish',
        options: [
          { label: 'Natural White Oak', value: 'natural-oak', swatchColor: '#E8DEC8' },
          { label: 'Smoked Charcoal Oak', value: 'smoked-oak', swatchColor: '#3C3734', priceAdjustmentUSD: 80 },
          { label: 'Oiled Walnut', value: 'walnut', swatchColor: '#5C4433', priceAdjustmentUSD: 140 },
        ]
      },
      {
        name: 'Bouclé Tone',
        options: [
          { label: 'Raw Cream', value: 'cream', swatchColor: '#F4EFE6' },
          { label: 'Mineral Gray', value: 'mineral', swatchColor: '#9E9D99' },
          { label: 'Amber Ochre', value: 'amber', swatchColor: '#B68249' },
        ]
      }
    ],
    featured: true
  },
  {
    id: 'kallan-brass-pendant',
    name: 'Kallan Spun Brass Pendant',
    subtitle: 'Brushed Solid Brass & Opal Glass Diffuser',
    category: 'Lighting',
    priceUSD: 480,
    rating: 4.95,
    reviewCount: 52,
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/product_brass_pendant_1791181036009.jpg',
    material: 'Spun Solid Brass, Mouth-Blown Acid-Etched Opal Glass',
    dimensions: 'Ø 38cm × H 26cm (Cord length 300cm)',
    weight: '3.8 kg',
    designer: 'Mikael Bønnelycke',
    origin: 'Engineered in Småland, Sweden',
    leadTime: 'In stock — dispatches within 24 hours',
    description: 'A monolithic pendant light formed from heavy spun solid brass with a hand-brushed circumferential grain. The internal mouth-blown matte opal glass cylinder casts an ultra-soft, 360-degree diffused illumination without glare, ideal above dining islands or reading alcoves.',
    details: [
      'Unlacquered raw brass that matures with a gentle, living patina over time',
      'Mouth-blown three-layer triplex opal glass dome',
      'Dimmable 2700K Warm Architectural LED engine included (95+ CRI)',
      'Black braided textile cord with solid brass ceiling canopy'
    ],
    variants: [
      {
        name: 'Finish',
        options: [
          { label: 'Brushed Raw Brass', value: 'brass', swatchColor: '#CFAC62' },
          { label: 'Blackened Gunmetal', value: 'gunmetal', swatchColor: '#2C2D30', priceAdjustmentUSD: 40 },
          { label: 'Burnished Bronze', value: 'bronze', swatchColor: '#6B4E38', priceAdjustmentUSD: 50 },
        ]
      },
      {
        name: 'Scale',
        options: [
          { label: 'Standard 38cm', value: 'standard' },
          { label: 'Grand 52cm', value: 'grand', priceAdjustmentUSD: 190 },
        ]
      }
    ],
    featured: true
  },
  {
    id: 'kyoto-fluted-vessels',
    name: 'Kyoto Fluted Stoneware Vessels',
    subtitle: 'Set of 3 Wheel-Thrown Matte Vases',
    category: 'Ceramics',
    priceUSD: 290,
    originalPriceUSD: 340,
    rating: 4.88,
    reviewCount: 29,
    inStock: true,
    stockCount: 18,
    image: '/src/assets/images/product_ceramic_vessel_1791181046633.jpg',
    material: 'Shigaraki Coarse Stoneware Clay, Raw Feldspathic Glaze',
    dimensions: 'Tall: H 28cm | Medium: H 20cm | Wide: H 14cm',
    weight: '4.2 kg (Total Set)',
    designer: 'Master Potter Kenji Takahashi',
    origin: 'Wood-fired kilns of Shigaraki, Japan',
    leadTime: 'Dispatches in 24 hours',
    description: 'Handcrafted using regional iron-rich Shigaraki stoneware clay. Each vessel features rhythmic vertical flute carvings achieved on the kick-wheel, dipped in a custom unglazed matte slip glaze that reveals subtle crystalline bloom and mineral variations under changing daylight.',
    details: [
      'Completely watertight with interior clear vitrified glaze seal',
      'Unglazed tactile exterior with subtle natural pumice grit',
      'Set of three curated graduating silhouettes for Ikebana or solo branches',
      'Imprinted with artisan studio chop on base'
    ],
    variants: [
      {
        name: 'Glaze Palette',
        options: [
          { label: 'Oatmeal & Raw Ash', value: 'oatmeal', swatchColor: '#D8D0C5' },
          { label: 'Charcoal Black Slip', value: 'charcoal', swatchColor: '#353331' },
          { label: 'Warm Terracotta Sand', value: 'sand', swatchColor: '#BC9173' },
        ]
      }
    ],
    featured: true
  },
  {
    id: 'solstice-travertine-table',
    name: 'Solstice Travertine Low Table',
    subtitle: 'Honed Roman Travertine & Smoked Oak Base',
    category: 'Living',
    priceUSD: 1850,
    rating: 4.92,
    reviewCount: 24,
    inStock: true,
    stockCount: 3,
    image: '/src/assets/images/hero_interior_showcase_1791181009339.jpg',
    material: 'Cross-Cut Italian Travertine Slab, Solid Smoked Oak',
    dimensions: 'L 120cm × W 70cm × H 32cm',
    weight: '62 kg',
    designer: 'Elena Rossi Studio, Milan',
    origin: 'Tivoli quarrying & artisanal assembly in Verona, Italy',
    leadTime: 'Specialty freight delivery in 5–8 days',
    description: 'A grounding, sculptural centerpiece cut from single Roman travertine slabs with raw edge detailing and a velvety honed surface. Supported by two asymmetrical interlocking smoked oak block plinths, creating an interplay of stone weight and architectural shadow.',
    details: [
      'Micro-sealed with natural breathable stone sealant for wine and coffee resistance',
      'Solid 28mm thick calibrated cross-cut stone top with soft bevel',
      'Solid European smoked oak bases with internal steel alignment pins',
      'Ships in reinforced timber crate with white-glove inside delivery included'
    ],
    variants: [
      {
        name: 'Stone Selection',
        options: [
          { label: 'Classic Cream Travertine', value: 'classic', swatchColor: '#DCD3C1' },
          { label: 'Noce Silver Travertine', value: 'silver', swatchColor: '#9C958C', priceAdjustmentUSD: 220 },
        ]
      }
    ],
    featured: true
  },
  {
    id: 'aura-portable-amber-lamp',
    name: 'Aura Portable Ambient Lamp',
    subtitle: 'Rechargeable Mouth-Blown Amber Glass & Brass Dimmer',
    category: 'Lighting',
    priceUSD: 240,
    rating: 4.85,
    reviewCount: 64,
    inStock: true,
    stockCount: 22,
    image: '/src/assets/images/product_brass_pendant_1791181036009.jpg',
    material: 'Mouth-Blown Tinted Amber Borosilicate Glass, Milled Brass',
    dimensions: 'Ø 15cm × H 22cm',
    weight: '1.2 kg',
    designer: 'Atelier Nord Studio',
    origin: 'Assembled in Aarhus, Denmark',
    leadTime: 'In stock — dispatches same day',
    description: 'Designed for roaming intimacy from bedside to terrace. Features a cast brass top ring touch-switch with 3-stage stepless dimming (10% to 100%). Powered by a high-density 5200mAh USB-C rechargeable battery offering up to 28 hours of candlelight-warm (2200K) illumination.',
    details: [
      'Stepless 0–100% smooth touch dimmer with memory function',
      'Up to 28 hours continuous run time on low setting; 8 hours at max lumen',
      'Magnetic braided USB-C charging dock in matching solid brass included',
      'IP44 splash-resistant for sheltered outdoor dinner settings'
    ],
    variants: [
      {
        name: 'Glass Hue',
        options: [
          { label: 'Warm Smoked Amber', value: 'amber', swatchColor: '#C88B48' },
          { label: 'Frosted Opaline', value: 'opal', swatchColor: '#EBEAE5' },
          { label: 'Smoky Olive Green', value: 'olive', swatchColor: '#58624E' },
        ]
      }
    ],
    featured: false
  },
  {
    id: 'mizu-tea-ceremony-service',
    name: 'Mizu Stoneware Tea Service',
    subtitle: 'Kyusu Teapot & Four Cups with Brass Wire Handle',
    category: 'Ceramics',
    priceUSD: 210,
    originalPriceUSD: 245,
    rating: 4.97,
    reviewCount: 41,
    inStock: true,
    stockCount: 15,
    image: '/src/assets/images/product_ceramic_vessel_1791181046633.jpg',
    material: 'High-Fired Iron-Rich Clay, Hand-Bent Raw Brass Handle',
    dimensions: 'Teapot: 650ml (H 16cm) | Cups: 120ml (H 6cm)',
    weight: '1.8 kg (Set)',
    designer: 'Katsutoshi Sato',
    origin: 'Mashiko, Tochigi Prefecture, Japan',
    leadTime: 'Dispatches in 24 hours',
    description: 'An ode to mindful slowness. The Mizu Teapot incorporates a hand-pierced ceramic clay mesh strainer inside the spout for whole-leaf sencha and herbal infusions. Accompanied by a hand-bent solid brass swing handle and four nestable tasting cups with heat-dispersing double rims.',
    details: [
      'Non-drip spout hand-calibrated by master ceramicist',
      'Unglazed exterior with tactile mineral slip, interior smooth clear glaze',
      'Thermal retention clay keeps tea warm for up to 45 minutes',
      'Packaged in traditional paulownia wooden gift presentation box'
    ],
    variants: [
      {
        name: 'Clay Body',
        options: [
          { label: 'Toasted Sesame / Ash', value: 'sesame', swatchColor: '#B5A998' },
          { label: 'Matte Rust Iron', value: 'iron', swatchColor: '#5B433A' },
        ]
      }
    ],
    featured: false
  },
  {
    id: 'ostra-bronze-incense-burner',
    name: 'Ostra Cast Bronze Incense Burner',
    subtitle: 'Solid Lost-Wax Bronze & White Cedar Ash Vessel',
    category: 'Objects',
    priceUSD: 165,
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    stockCount: 28,
    image: '/src/assets/images/product_brass_pendant_1791181036009.jpg',
    material: 'Lost-Wax Cast Solid Bronze, Japanese Hinoki Cedar Ash',
    dimensions: 'L 18cm × W 6.5cm × H 4cm',
    weight: '0.95 kg',
    designer: 'Tatsuo Mori for ATELIER',
    origin: 'Takaoka casting foundry, Toyama, Japan',
    leadTime: 'Dispatches within 24 hours',
    description: 'Cast in heavy bronze using 400-year-old lost-wax metallurgy in Takaoka. The elongated oval basin holds natural white cedar ash to support both Japanese stick incense and loose botanical aromatics. The lid features laser-cut ventilation slits calibrated for even combustion.',
    details: [
      'Heavy 1kg solid bronze body provides thermal stability on any surface',
      'Includes 60g bag of pure Japanese white cedar ash and brass leveling spatula',
      'Compatible with bamboo core and coreless incense sticks',
      'Develops a deep antique bronze patina over decades of aromatic ritual'
    ],
    variants: [
      {
        name: 'Bronze Finish',
        options: [
          { label: 'Antique Brown Patina', value: 'antique', swatchColor: '#4A3B32' },
          { label: 'Raw Milled Bronze', value: 'raw', swatchColor: '#A08055' },
        ]
      }
    ],
    featured: false
  },
  {
    id: 'strata-linen-throw',
    name: 'Strata Belgian Waffle Throw',
    subtitle: '100% Masters of Linen Certified Stonewashed Flax',
    category: 'Objects',
    priceUSD: 195,
    rating: 4.82,
    reviewCount: 31,
    inStock: true,
    stockCount: 20,
    image: '/src/assets/images/product_sculptural_chair_1791181022663.jpg',
    material: '100% Belgian Organic Flax Linen (380 g/m²)',
    dimensions: '140cm × 220cm',
    weight: '1.4 kg',
    designer: 'Camilla Lindqvist',
    origin: 'Woven in Courtrai, Belgium',
    leadTime: 'In stock — dispatches within 24 hours',
    description: 'Woven on heritage jacquard looms in Flanders from premium long-fiber Belgian flax. The dimensional honeycomb waffle structure traps insulating air pockets in winter while remaining naturally breathable in warm summers. Pre-washed with volcanic pumice for buttery tactile drape.',
    details: [
      'Masters of Linen® and OEKO-TEX Standard 100 certified',
      'Naturally hypoallergenic, antibacterial, and anti-static',
      'Finished with 4cm mitred hemstitch borders',
      'Machine washable at 40°C; softens further with every wash cycle'
    ],
    variants: [
      {
        name: 'Colorway',
        options: [
          { label: 'Unbleached Flax', value: 'flax', swatchColor: '#D3C8B4' },
          { label: 'Washed Slate Gray', value: 'slate', swatchColor: '#6B6E70' },
          { label: 'Deep Moss Green', value: 'moss', swatchColor: '#4C5143' },
        ]
      }
    ],
    featured: false
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'koto-lounge-chair',
    author: 'Soren B.',
    rating: 5,
    date: 'February 14, 2026',
    title: 'An heirloom piece in every sense',
    comment: 'The woodwork is breathtaking. Tapered edges are so smooth to the touch, and the bouclé fabric has unmatched density. It transformed our living room reading corner completely.',
    verified: true,
    location: 'Stockholm, Sweden'
  },
  {
    id: 'rev-2',
    productId: 'koto-lounge-chair',
    author: 'Clara M.',
    rating: 5,
    date: 'January 28, 2026',
    title: 'Surpassed all expectations',
    comment: 'White-glove delivery was flawless. The chair arrived perfectly crated. Posture is surprisingly ergonomic for an architectural statement chair.',
    verified: true,
    location: 'Munich, Germany'
  },
  {
    id: 'rev-3',
    productId: 'kallan-brass-pendant',
    author: 'Julian V.',
    rating: 5,
    date: 'March 02, 2026',
    title: 'Sublime diffused light',
    comment: 'The spun brass has that heavy, genuine weight that modern lighting often lacks. Installed over our 2.8m oak dining table, the opal diffuser eliminates any harsh bulb reflection.',
    verified: true,
    location: 'Copenhagen, Denmark'
  },
  {
    id: 'rev-4',
    productId: 'kyoto-fluted-vessels',
    author: 'Astrid N.',
    rating: 5,
    date: 'February 20, 2026',
    title: 'Quiet artistry',
    comment: 'The fluted texture has the organic warmth of human hands. Beautiful with single dried eucalyptus branches or entirely standalone on our low stone sideboard.',
    verified: true,
    location: 'Oslo, Norway'
  }
];

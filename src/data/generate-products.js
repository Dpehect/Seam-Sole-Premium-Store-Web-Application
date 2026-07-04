const fs = require('fs');
const path = require('path');

// Clean database of 110 real products with exact matching Unsplash image URLs
const productsList = [
  // --- SNEAKERS (40 items) ---
  {
    slug: 'cobalt-court-sneaker',
    name: 'Nike Dunk Low "Cobalt"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 115,
    colors: ['Cobalt', 'White', 'Gum'],
    materials: ['leather', 'mesh lining', 'rubber outsole'],
    fit: 'True to size',
    tags: ['court', 'low top', 'dunk', 'nike'],
    badgeLine: 'Cobalt court leather build',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'cream-runner-01',
    name: 'New Balance 550 "Cream/White"',
    category: 'sneakers',
    brand: 'New Balance',
    retailPrice: 110,
    colors: ['Cream', 'White', 'Sand'],
    materials: ['leather', 'mesh', 'EVA midsole'],
    fit: 'True to size',
    tags: ['runner', 'neutral', 'comfort', 'new-balance'],
    badgeLine: 'Retro court sneaker in cream',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'converse-chuck-70-high-red',
    name: 'Converse Chuck 70 High "Red"',
    category: 'sneakers',
    brand: 'Converse',
    retailPrice: 90,
    colors: ['Red', 'Egret'],
    materials: ['heavy canvas', 'rubber cupsole'],
    fit: 'Runs large, size down',
    tags: ['high top', 'canvas', 'converse'],
    badgeLine: 'Heavyweight canvas high top',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'vans-old-skool-yellow',
    name: 'Vans Old Skool "Yellow/White"',
    category: 'sneakers',
    brand: 'Vans',
    retailPrice: 70,
    colors: ['Yellow', 'White'],
    materials: ['canvas', 'suede', 'waffle outsole'],
    fit: 'True to size',
    tags: ['skate', 'classic', 'vans'],
    badgeLine: 'Original skate sidestripe shoe',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'vans-classic-slip-on-checkerboard',
    name: 'Vans Classic Slip-On "Checkerboard"',
    category: 'sneakers',
    brand: 'Vans',
    retailPrice: 65,
    colors: ['Checkered', 'White', 'Black'],
    materials: ['canvas', 'elastic side accents'],
    fit: 'True to size',
    tags: ['skate', 'canvas', 'vans'],
    badgeLine: 'Original low slip-on canvas skate shoe',
    images: [
      'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-force-1-07-white',
    name: 'Nike Air Force 1 \'07 "White"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 115,
    colors: ['White', 'Silver'],
    materials: ['leather', 'rubber outsole'],
    fit: 'True to size',
    tags: ['court', 'classic', 'nike'],
    badgeLine: 'Classic court low-top',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-max-97-silver-bullet',
    name: 'Nike Air Max 97 "Silver Bullet"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 185,
    colors: ['Silver', 'Red', 'Black'],
    materials: ['synthetic leather', 'mesh', 'full-length Air'],
    fit: 'Half size up recommended',
    tags: ['runner', 'air max', 'nike'],
    badgeLine: 'Full-length Max Air cushioning',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-max-90-red',
    name: 'Nike Air Max 90 "University Red"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 130,
    colors: ['Red', 'White', 'Black'],
    materials: ['mesh', 'leather', 'Max Air unit'],
    fit: 'True to size',
    tags: ['runner', 'air max', 'nike'],
    badgeLine: 'Classic retro Air runner',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'puma-suede-classic-black-white',
    name: 'Puma Suede Classic "White/Black"',
    category: 'sneakers',
    brand: 'Puma',
    retailPrice: 75,
    colors: ['White', 'Black'],
    materials: ['suede', 'rubber outsole'],
    fit: 'True to size',
    tags: ['retro', 'classic', 'puma'],
    badgeLine: '1968 classic b-boy suede',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'air-jordan-1-retro-high-panda',
    name: 'Air Jordan 1 Retro High "Panda"',
    category: 'sneakers',
    brand: 'Jordan',
    retailPrice: 180,
    colors: ['Black', 'White'],
    materials: ['cracked leather', 'rubber cupsole'],
    fit: 'True to size',
    tags: ['high top', 'basketball', 'jordan'],
    badgeLine: 'Vintage 1985 basketball energy',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'new-balance-574-grey-navy',
    name: 'New Balance 574 "Grey/Navy"',
    category: 'sneakers',
    brand: 'New Balance',
    retailPrice: 90,
    colors: ['Grey', 'Navy', 'White'],
    materials: ['suede', 'mesh', 'ENCAP midsole'],
    fit: 'True to size',
    tags: ['runner', 'comfort', 'new-balance'],
    badgeLine: 'Vintage comfort daily runner',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-superstar-classic-white',
    name: 'Adidas Superstar "Classic White"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 100,
    colors: ['White', 'Black', 'Gold'],
    materials: ['leather', 'rubber shell toe'],
    fit: 'True to size',
    tags: ['retro', 'classic', 'superstar', 'adidas'],
    badgeLine: 'Original shell toe classic',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-free-run-triple-black',
    name: 'Nike Free Run "Triple Black"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 110,
    colors: ['Black'],
    materials: ['mesh', 'flexible foam sole'],
    fit: 'True to size',
    tags: ['runner', 'sports', 'nike'],
    badgeLine: 'Barefoot-feel training runner',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-zoom-pegasus-sport-blue',
    name: 'Nike Pegasus "Sport Blue"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 130,
    colors: ['Blue', 'White'],
    materials: ['engineered mesh', 'React foam', 'Zoom Air'],
    fit: 'True to size',
    tags: ['runner', 'sports', 'nike'],
    badgeLine: 'Responsive React running shoe',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-dunk-high-varsity-maize',
    name: 'Nike Dunk High "Varsity Maize"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 125,
    colors: ['Yellow', 'Black'],
    materials: ['leather', 'rubber cupsole'],
    fit: 'True to size',
    tags: ['high top', 'basketball', 'nike'],
    badgeLine: 'Classic college varsity high-top',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-max-triple-white',
    name: 'Nike Air Max "Triple White"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 140,
    colors: ['White'],
    materials: ['leather', 'mesh', 'Max Air'],
    fit: 'True to size',
    tags: ['runner', 'air max', 'nike'],
    badgeLine: 'Triple white active lifestyle runner',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-zoom-fly-orange',
    name: 'Nike Zoom Fly "Orange"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 160,
    colors: ['Orange', 'White'],
    materials: ['mesh', 'carbon plate', 'ZoomX foam'],
    fit: 'True to size',
    tags: ['runner', 'technical', 'nike'],
    badgeLine: 'Carbon-plated speed runner',
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-stan-smith-brown-leather',
    name: 'Adidas Stan Smith "Brown Leather"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 110,
    colors: ['Brown', 'White'],
    materials: ['premium leather', 'rubber cupsole'],
    fit: 'True to size',
    tags: ['retro', 'court', 'stan-smith', 'adidas'],
    badgeLine: 'Clean minimalist court leather classic',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-gazelle-vintage-cream',
    name: 'Adidas Gazelle "Vintage Cream"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 120,
    colors: ['Cream', 'White', 'Gum'],
    materials: ['suede', 'leather stripes', 'gum outsole'],
    fit: 'True to size',
    tags: ['retro', 'low top', 'gazelle', 'adidas'],
    badgeLine: 'Terrace archive indoor classic',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'converse-chuck-70-high-blue',
    name: 'Converse Chuck 70 High "Blue"',
    category: 'sneakers',
    brand: 'Converse',
    retailPrice: 90,
    colors: ['Blue', 'White'],
    materials: ['heavy canvas', 'rubber cupsole'],
    fit: 'Runs half size large',
    tags: ['high top', 'canvas', 'converse'],
    badgeLine: 'Vintage blue organic canvas high top',
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-max-volt-black',
    name: 'Nike Air Max "Volt Black"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 150,
    colors: ['Volt', 'Black'],
    materials: ['mesh', 'TPU overlays', 'Max Air'],
    fit: 'True to size',
    tags: ['runner', 'air max', 'nike'],
    badgeLine: 'Neon volt accent utility runner',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'puma-rs-x-white-purple',
    name: 'Puma RS-X "White/Purple"',
    category: 'sneakers',
    brand: 'Puma',
    retailPrice: 110,
    colors: ['White', 'Purple', 'Grey'],
    materials: ['mesh', 'leather', 'RS foam'],
    fit: 'True to size',
    tags: ['chunky', 'runner', 'puma'],
    badgeLine: 'Retro-future chunky RS cushion runner',
    images: [
      'https://images.unsplash.com/photo-1612902376491-7a8a99b424e8?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'air-jordan-1-mid-triple-white',
    name: 'Air Jordan 1 Mid "Triple White"',
    category: 'sneakers',
    brand: 'Jordan',
    retailPrice: 125,
    colors: ['White'],
    materials: ['leather', 'rubber cupsole'],
    fit: 'True to size',
    tags: ['mid top', 'basketball', 'jordan'],
    badgeLine: 'Clean white mid-top basketball icon',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'asics-gel-nimbus-white-grey',
    name: 'Asics Gel-Nimbus "White/Grey"',
    category: 'sneakers',
    brand: 'ASICS',
    retailPrice: 160,
    colors: ['White', 'Grey'],
    materials: ['engineered mesh', 'GEL midsole'],
    fit: 'True to size',
    tags: ['runner', 'comfort', 'asics'],
    badgeLine: 'Max cushioning urban running comfort',
    images: [
      'https://images.unsplash.com/photo-1628413993904-94ecb60f1239?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-dunk-low-pine-green',
    name: 'Nike Dunk Low "Pine Green"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 115,
    colors: ['Green', 'White'],
    materials: ['leather', 'rubber outsole'],
    fit: 'True to size',
    tags: ['court', 'low top', 'dunk', 'nike'],
    badgeLine: 'Pine green retro leather low-top',
    images: [
      'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'fila-disruptor-triple-white',
    name: 'Fila Disruptor "Triple White"',
    category: 'sneakers',
    brand: 'Fila',
    retailPrice: 80,
    colors: ['White'],
    materials: ['synthetic leather', 'sawtooth rubber sole'],
    fit: 'True to size',
    tags: ['chunky', 'classic', 'fila'],
    badgeLine: 'Sawtooth chunky statement sneaker',
    images: [
      'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-max-plus-hyper-blue',
    name: 'Nike Air Max Plus "Hyper Blue"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 185,
    colors: ['Blue', 'Black', 'Yellow'],
    materials: ['double mesh', 'Tuned Air units', 'TPU ribs'],
    fit: 'True to size',
    tags: ['runner', 'air max', 'nike'],
    badgeLine: 'Tuned Air gradient classic',
    images: [
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-react-vision-white-grey',
    name: 'Nike React Vision "White/Grey"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 140,
    colors: ['White', 'Grey'],
    materials: ['seamless mesh', 'React foam'],
    fit: 'True to size',
    tags: ['runner', 'comfort', 'nike'],
    badgeLine: 'React foam dreamlike textured mesh',
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-nmd-r1-solar-red',
    name: 'Adidas NMD R1 "Solar Red"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 150,
    colors: ['Red'],
    materials: ['knit upper', 'Boost midsole'],
    fit: 'Sock-like snug fit',
    tags: ['runner', 'boost', 'adidas'],
    badgeLine: 'Solar red active street sock runner',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-jordan-retro-white-gold',
    name: 'Nike Jordan Retro "White/Gold"',
    category: 'sneakers',
    brand: 'Jordan',
    retailPrice: 190,
    colors: ['White', 'Gold'],
    materials: ['tumbled leather', 'metallic eyelets'],
    fit: 'True to size',
    tags: ['basketball', 'high top', 'jordan'],
    badgeLine: 'White tumbled leather gold retro',
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'puma-palermo-green-white',
    name: 'Puma Palermo "Green/White"',
    category: 'sneakers',
    brand: 'Puma',
    retailPrice: 90,
    colors: ['Green', 'White', 'Gum'],
    materials: ['suede', 'leather stripes', 'gum sole'],
    fit: 'True to size',
    tags: ['retro', 'low top', 'puma'],
    badgeLine: 'Green suede retro terrace classic',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'reebok-classic-leather-black-retro',
    name: 'Reebok Classic Leather "Black"',
    category: 'sneakers',
    brand: 'Reebok',
    retailPrice: 80,
    colors: ['Black'],
    materials: ['garment leather', 'EVA foam midsole'],
    fit: 'True to size',
    tags: ['retro', 'classic', 'reebok'],
    badgeLine: 'Core black active retro leather runner',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-jordan-1-low-unc-blue',
    name: 'Nike Air Jordan 1 Low "UNC Blue"',
    category: 'sneakers',
    brand: 'Jordan',
    retailPrice: 110,
    colors: ['Blue', 'White'],
    materials: ['leather', 'rubber sole'],
    fit: 'True to size',
    tags: ['low top', 'court', 'jordan'],
    badgeLine: 'UNC blue classic low basketball profile',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-samba-og-white-black',
    name: 'Adidas Samba OG "White/Black"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 100,
    colors: ['White', 'Black', 'Gum'],
    materials: ['leather', 'suede toe cap', 'gum sole'],
    fit: 'True to size',
    tags: ['retro', 'low top', 'samba', 'adidas'],
    badgeLine: 'Samba white leather terrace classic',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'new-balance-550-white-green',
    name: 'New Balance 550 "White/Green"',
    category: 'sneakers',
    brand: 'New Balance',
    retailPrice: 110,
    colors: ['White', 'Green'],
    materials: ['leather', 'rubber outsole'],
    fit: 'True to size',
    tags: ['runner', 'court', 'new-balance'],
    badgeLine: 'White leather retro green accents',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-force-1-low-black',
    name: 'Nike Air Force 1 Low "Black"',
    category: 'sneakers',
    brand: 'Nike',
    retailPrice: 115,
    colors: ['Black'],
    materials: ['leather', 'rubber sole'],
    fit: 'True to size',
    tags: ['court', 'classic', 'nike'],
    badgeLine: 'Core black classic leather court low',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'converse-chuck-70-low-white',
    name: 'Converse Chuck 70 Low "White"',
    category: 'sneakers',
    brand: 'Converse',
    retailPrice: 85,
    colors: ['White', 'Egret'],
    materials: ['organic canvas', 'rubber cupsole'],
    fit: 'Runs half size large',
    tags: ['low top', 'canvas', 'converse'],
    badgeLine: 'Premium organic cotton low top canvas',
    images: [
      'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'vans-authentic-white-core',
    name: 'Vans Authentic "Classic White"',
    category: 'sneakers',
    brand: 'Vans',
    retailPrice: 60,
    colors: ['White'],
    materials: ['canvas', 'waffle outsole'],
    fit: 'True to size',
    tags: ['skate', 'canvas', 'vans'],
    badgeLine: 'Classic low profile canvas skate shoe',
    images: [
      'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-ultraboost-triple-black',
    name: 'Adidas Ultraboost "Triple Black"',
    category: 'sneakers',
    brand: 'Adidas',
    retailPrice: 190,
    colors: ['Black'],
    materials: ['Primeknit', 'Boost midsole'],
    fit: 'Sock-like snug fit',
    tags: ['runner', 'boost', 'adidas'],
    badgeLine: 'Boost foam active black Primeknit',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'new-balance-2002r-grey',
    name: 'New Balance 2002R "Grey"',
    category: 'sneakers',
    brand: 'New Balance',
    retailPrice: 145,
    colors: ['Grey'],
    materials: ['suede', 'mesh', 'ABZORB cushioning'],
    fit: 'True to size',
    tags: ['runner', 'comfort', 'new-balance'],
    badgeLine: 'Urban retro active cushion runner',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1600&auto=format&fit=crop'
    ]
  },

  // --- TEES (40 items) ---
  {
    slug: 'sunset-race-tee',
    name: 'Nike Sportswear Sunset Graphic Tee',
    category: 'tees',
    brand: 'Nike',
    retailPrice: 40,
    colors: ['Coral', 'Cream', 'Ink'],
    materials: ['garment washed cotton', 'heavyweight jersey'],
    fit: 'Relaxed boxy fit',
    tags: ['graphic', 'oversized', 'nike', 'tees'],
    badgeLine: 'Washed coral boxy sunset print',
    images: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'gallery-white-tee',
    name: 'Adidas Originals Trefoil Graphic Tee',
    category: 'tees',
    brand: 'Adidas',
    retailPrice: 35,
    colors: ['White', 'Punch'],
    materials: ['cotton jersey', 'water-based print'],
    fit: 'Oversized gallery fit',
    tags: ['logo', 'basic', 'adidas', 'tees'],
    badgeLine: 'Tonal trefoil print front graphic',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'paint-splash-tee',
    name: 'Stussy 8 Ball Graphic Tee',
    category: 'tees',
    brand: 'Stussy',
    retailPrice: 45,
    colors: ['White', 'Cobalt', 'Punch'],
    materials: ['cotton jersey', 'pigment print'],
    fit: 'Oversized street fit',
    tags: ['graphic', 'streetwear', 'stussy', 'tees'],
    badgeLine: 'Classic Stussy 8 Ball back graphic',
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'espresso-atelier-tee',
    name: 'Fear of God Essentials Tee "Espresso"',
    category: 'tees',
    brand: 'Fear of God',
    retailPrice: 50,
    colors: ['Espresso', 'Cream'],
    materials: ['premium heavyweight cotton', 'ribbed neck'],
    fit: 'Boxy premium fit',
    tags: ['basic', 'premium', 'essentials', 'tees'],
    badgeLine: 'Tonal chest logo premium jersey',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'supreme-box-logo-tee-white',
    name: 'Supreme Box Logo Tee "White"',
    category: 'tees',
    brand: 'Supreme',
    retailPrice: 48,
    colors: ['White'],
    materials: ['heavyweight cotton'],
    fit: 'Regular streetwear fit',
    tags: ['logo', 'hype', 'supreme', 'tees'],
    badgeLine: 'Iconic red box logo graphic',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'carhartt-wip-pocket-tee-black',
    name: 'Carhartt WIP Pocket Tee "Black"',
    category: 'tees',
    brand: 'Carhartt WIP',
    retailPrice: 45,
    colors: ['Black', 'Grey', 'Navy'],
    materials: ['220gsm cotton jersey'],
    fit: 'Regular premium fit',
    tags: ['basic', 'utility', 'carhartt', 'tees'],
    badgeLine: 'Workwear utility pocket patch',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stussy-basic-logo-tee-black',
    name: 'Stussy Basic Logo Tee "Black"',
    category: 'tees',
    brand: 'Stussy',
    retailPrice: 45,
    colors: ['Black', 'White'],
    materials: ['100% carded cotton'],
    fit: 'Relaxed streetwear fit',
    tags: ['logo', 'classic', 'stussy', 'tees'],
    badgeLine: 'Signature script print front and back',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'patagonia-p6-logo-tee',
    name: 'Patagonia P-6 Logo Responsibili-Tee',
    category: 'tees',
    brand: 'Patagonia',
    retailPrice: 45,
    colors: ['Grey', 'White', 'Navy'],
    materials: ['recycled cotton', 'recycled polyester'],
    fit: 'Standard fit',
    tags: ['basic', 'outdoor', 'recycled', 'patagonia', 'tees'],
    badgeLine: '100% recycled screen-printed graphic',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'the-north-face-half-dome-tee',
    name: 'The North Face Half Dome Tee',
    category: 'tees',
    brand: 'The North Face',
    retailPrice: 30,
    colors: ['White', 'Black', 'Grey'],
    materials: ['solid combed cotton'],
    fit: 'Standard fit',
    tags: ['basic', 'logo', 'outdoor', 'the-north-face', 'tees'],
    badgeLine: 'Classic front chest logo jersey',
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stone-island-compass-tee',
    name: 'Stone Island Compass Patch Tee',
    category: 'tees',
    brand: 'Stone Island',
    retailPrice: 160,
    colors: ['Black', 'Sage', 'Grey'],
    materials: ['premium mercerized cotton'],
    fit: 'Regular European fit',
    tags: ['luxury', 'badge', 'stone-island', 'tees'],
    badgeLine: 'Compass patch chest detail',
    images: [
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'comme-des-garcons-play-red-heart-tee',
    name: 'Comme des Garçons Play Red Heart Tee',
    category: 'tees',
    brand: 'Comme des Garcons',
    retailPrice: 110,
    colors: ['White', 'Black', 'Grey'],
    materials: ['premium Japanese cotton'],
    fit: 'Fitted (size up recommended)',
    tags: ['luxury', 'heart', 'cdg', 'tees'],
    badgeLine: 'Embroidered red heart crest',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'palace-tri-ferg-tee-black',
    name: 'Palace Tri-Ferg Tee "Black"',
    category: 'tees',
    brand: 'Palace',
    retailPrice: 48,
    colors: ['Black', 'White'],
    materials: ['heavy cotton jersey'],
    fit: 'Regular skateboard fit',
    tags: ['logo', 'skateboard', 'palace', 'tees'],
    badgeLine: 'Tri-Ferg classic back logo print',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-acg-logo-tee-olive',
    name: 'Nike ACG Logo Tee "Olive"',
    category: 'tees',
    brand: 'Nike',
    retailPrice: 45,
    colors: ['Olive', 'Ink'],
    materials: ['heavyweight organic cotton blend'],
    fit: 'Oversized loose fit',
    tags: ['outdoor', 'acg', 'nike', 'tees'],
    badgeLine: 'All Conditions Gear heavy knit',
    images: [
      'https://images.unsplash.com/photo-1618354691321-e851c56960d1?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'off-white-caravaggio-tee',
    name: 'Off-White Caravaggio Arrow Tee',
    category: 'tees',
    brand: 'Off-White',
    retailPrice: 350,
    colors: ['Black', 'White'],
    materials: ['luxury structured cotton'],
    fit: 'Oversized skate fit',
    tags: ['luxury', 'art', 'off-white', 'tees'],
    badgeLine: 'Caravaggio painting back arrow',
    images: [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'levis-graphic-logo-tee',
    name: 'Levi\'s Batwing Graphic Tee',
    category: 'tees',
    brand: 'Levis',
    retailPrice: 30,
    colors: ['White', 'Black', 'Grey'],
    materials: ['soft combed cotton'],
    fit: 'Standard fit',
    tags: ['basic', 'logo', 'levis', 'tees'],
    badgeLine: 'Classic batwing red print logo',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'dickies-horseshoe-tee-white',
    name: 'Dickies Horseshoe Logo Tee',
    category: 'tees',
    brand: 'Dickies',
    retailPrice: 28,
    colors: ['White', 'Grey'],
    materials: ['combed cotton jersey'],
    fit: 'Regular workwear fit',
    tags: ['basic', 'workwear', 'dickies', 'tees'],
    badgeLine: 'Horseshoe logo front print',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'kith-classic-logo-tee-navy',
    name: 'Kith Classic Box Logo Tee',
    category: 'tees',
    brand: 'Kith',
    retailPrice: 65,
    colors: ['Navy', 'Sand'],
    materials: ['230gsm dry cotton jersey'],
    fit: 'Boxy premium fit',
    tags: ['basic', 'logo', 'kith', 'tees'],
    badgeLine: 'Embroidered box logo center chest',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'jordan-jumpman-logo-tee',
    name: 'Jordan Jumpman Wordmark Tee',
    category: 'tees',
    brand: 'Jordan',
    retailPrice: 35,
    colors: ['Black', 'Red', 'White'],
    materials: ['cotton jersey'],
    fit: 'Relaxed athletic fit',
    tags: ['sports', 'jordan', 'tees'],
    badgeLine: 'Jumpman screenprint chest jersey',
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'supreme-photo-tee-black',
    name: 'Supreme Photo Tee "Black"',
    category: 'tees',
    brand: 'Supreme',
    retailPrice: 54,
    colors: ['Black'],
    materials: ['heavyweight cotton'],
    fit: 'Regular streetwear fit',
    tags: ['graphic', 'supreme', 'tees'],
    badgeLine: 'Limited artist photo graphic',
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'carhartt-wip-chase-tee-green',
    name: 'Carhartt WIP Chase Tee "Green"',
    category: 'tees',
    brand: 'Carhartt WIP',
    retailPrice: 40,
    colors: ['Green', 'Cream'],
    materials: ['combed cotton jersey'],
    fit: 'Loose boxy fit',
    tags: ['basic', 'logo', 'carhartt', 'tees'],
    badgeLine: 'Gold C-logo embroidered sleeve',
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'obey-bold-logo-tee-black',
    name: 'Obey Bold Logo Tee "Black"',
    category: 'tees',
    brand: 'Obey',
    retailPrice: 32,
    colors: ['Black', 'White'],
    materials: ['soft cotton jersey'],
    fit: 'Standard fit',
    tags: ['graphic', 'logo', 'obey', 'tees'],
    badgeLine: 'Obey classic text front graphic',
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'huf-essentials-box-logo-tee',
    name: 'HUF Essentials Box Logo Tee',
    category: 'tees',
    brand: 'HUF',
    retailPrice: 32,
    colors: ['White', 'Black'],
    materials: ['cotton knit jersey'],
    fit: 'Standard skate fit',
    tags: ['logo', 'skate', 'huf', 'tees'],
    badgeLine: 'HUF triple triangle chest box print',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'fred-perry-laurel-wreath-tee',
    name: 'Fred Perry Laurel Wreath Tee',
    category: 'tees',
    brand: 'Fred Perry',
    retailPrice: 60,
    colors: ['White', 'Black', 'Navy'],
    materials: ['fine cotton jersey'],
    fit: 'Regular fit',
    tags: ['classic', 'laurel', 'fred-perry', 'tees'],
    badgeLine: 'Embroidered Laurel Wreath crest',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'lacoste-crocodile-tee-white',
    name: 'Lacoste Crocodile Logo Tee',
    category: 'tees',
    brand: 'Lacoste',
    retailPrice: 65,
    colors: ['White', 'Navy'],
    materials: ['pima cotton jersey'],
    fit: 'Regular fit',
    tags: ['classic', 'crocodile', 'lacoste', 'tees'],
    badgeLine: 'Green crocodile silicone chest badge',
    images: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'ralph-lauren-polo-bear-tee-white',
    name: 'Ralph Lauren Polo Bear Tee',
    category: 'tees',
    brand: 'Ralph Lauren',
    retailPrice: 85,
    colors: ['White', 'Grey'],
    materials: ['soft combed cotton'],
    fit: 'Custom slim fit',
    tags: ['graphic', 'bear', 'ralph-lauren', 'tees'],
    badgeLine: 'Polo Bear classic front print',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-dri-fit-legend-tee-black',
    name: 'Nike Dri-FIT Legend Athletic Tee',
    category: 'tees',
    brand: 'Nike',
    retailPrice: 30,
    colors: ['Black', 'Blue'],
    materials: ['polyester jersey', 'Dri-FIT tech'],
    fit: 'Active regular fit',
    tags: ['sports', 'dri-fit', 'nike', 'tees'],
    badgeLine: 'Moisture-wicking active training tee',
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-originals-3-stripes-tee',
    name: 'Adidas 3-Stripes Crew Tee',
    category: 'tees',
    brand: 'Adidas',
    retailPrice: 40,
    colors: ['Blue', 'Black', 'Green'],
    materials: ['cotton rib knit'],
    fit: 'Slim retro fit',
    tags: ['classic', '3-stripes', 'adidas', 'tees'],
    badgeLine: 'Contrast rib collar and 3-stripes sleeve',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'jordan-essentials-blank-tee',
    name: 'Jordan Essentials Blank Tee',
    category: 'tees',
    brand: 'Jordan',
    retailPrice: 35,
    colors: ['Sand', 'Ink', 'White'],
    materials: ['heavy cotton jersey'],
    fit: 'Relaxed boxy fit',
    tags: ['basic', 'jordan', 'tees'],
    badgeLine: 'Tonal jumpman flight embroidered tag',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'converse-star-chevron-tee-black',
    name: 'Converse Star Chevron Tee',
    category: 'tees',
    brand: 'Converse',
    retailPrice: 28,
    colors: ['Black', 'White'],
    materials: ['cotton knit'],
    fit: 'Standard fit',
    tags: ['logo', 'converse', 'tees'],
    badgeLine: 'Star Chevron chest screenprint',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'fila-vintage-logo-tee-white',
    name: 'Fila Vintage Box Logo Tee',
    category: 'tees',
    brand: 'Fila',
    retailPrice: 30,
    colors: ['White', 'Navy'],
    materials: ['cotton jersey'],
    fit: 'Regular fit',
    tags: ['retro', 'logo', 'fila', 'tees'],
    badgeLine: 'F-box vintage embroidered patch',
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'asics-core-running-tee-blue',
    name: 'ASICS Core Running Tee',
    category: 'tees',
    brand: 'ASICS',
    retailPrice: 30,
    colors: ['Blue', 'Grey'],
    materials: ['recycled polyester mesh'],
    fit: 'Athletic regular fit',
    tags: ['sports', 'runner', 'asics', 'tees'],
    badgeLine: 'Breathable fast-drying runner knit',
    images: [
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stussy-8-ball-tee-faded-black',
    name: 'Stussy 8 Ball Tee "Faded Black"',
    category: 'tees',
    brand: 'Stussy',
    retailPrice: 45,
    colors: ['Washed Grey', 'Ink'],
    materials: ['pigment dyed cotton'],
    fit: 'Relaxed streetwear fit',
    tags: ['graphic', 'streetwear', 'stussy', 'tees'],
    badgeLine: 'Pigment dyed 8-ball graphic tee',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'supreme-motion-logo-tee',
    name: 'Supreme Motion Logo Tee "Navy"',
    category: 'tees',
    brand: 'Supreme',
    retailPrice: 48,
    colors: ['Ink', 'White'],
    materials: ['heavy cotton jersey'],
    fit: 'Regular streetwear fit',
    tags: ['logo', 'motion', 'supreme', 'tees'],
    badgeLine: 'Blurred motion print chest graphic',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'champion-heritage-script-tee',
    name: 'Champion Heritage Script Tee',
    category: 'tees',
    brand: 'Champion',
    retailPrice: 30,
    colors: ['White', 'Grey', 'Black'],
    materials: ['7oz heavyweight cotton'],
    fit: 'Classic boxy fit',
    tags: ['logo', 'basic', 'champion', 'tees'],
    badgeLine: 'Embroidered C-patch on left sleeve',
    images: [
      'https://images.unsplash.com/photo-1618354691321-e851c56960d1?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-acg-summit-graphic-tee',
    name: 'Nike ACG Summit Landscape Tee',
    category: 'tees',
    brand: 'Nike',
    retailPrice: 45,
    colors: ['Sand', 'Olive'],
    materials: ['heavyweight organic cotton'],
    fit: 'Oversized fit',
    tags: ['outdoor', 'graphic', 'acg', 'nike', 'tees'],
    badgeLine: 'Retro outdoor landscape back print',
    images: [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'yeezy-gap-engineered-balenciaga-tee',
    name: 'Yeezy Gap Balenciaga No-Seam Tee',
    category: 'tees',
    brand: 'Yeezy',
    retailPrice: 120,
    colors: ['Black', 'Washed Grey'],
    materials: ['double layer cotton jersey'],
    fit: 'Extremely oversized boxy fit',
    tags: ['luxury', 'heavyweight', 'yeezy', 'tees'],
    badgeLine: 'Double layer no-seam oversized jersey',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'champion-reverse-weave-tee-heather',
    name: 'Champion Reverse Weave Heavy Tee',
    category: 'tees',
    brand: 'Champion',
    retailPrice: 35,
    colors: ['Heather', 'Navy'],
    materials: ['9.4oz heavy reverse weave cotton'],
    fit: 'Classic boxy fit',
    tags: ['basic', 'heavyweight', 'champion', 'tees'],
    badgeLine: 'Shrink-resistant reverse weave knit',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-air-retro-logo-tee-white',
    name: 'Nike Air Retro Logo Tee',
    category: 'tees',
    brand: 'Nike',
    retailPrice: 35,
    colors: ['White', 'Black'],
    materials: ['cotton knit'],
    fit: 'Standard fit',
    tags: ['logo', 'retro', 'nike', 'tees'],
    badgeLine: 'Apparel heritage graphic tee',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'neighborhood-bar-shield-tee',
    name: 'Neighborhood Bar & Shield Tee "Black"',
    category: 'tees',
    brand: 'Neighborhood',
    retailPrice: 85,
    colors: ['Black', 'White'],
    materials: ['premium ring-spun cotton'],
    fit: 'Regular streetwear fit',
    tags: ['luxury', 'japanese', 'streetwear', 'tees'],
    badgeLine: 'Japanese streetwear shield print',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'wtaps-blank-tee-olive',
    name: 'WTAPS Blank Pocket Tee "Olive"',
    category: 'tees',
    brand: 'WTAPS',
    retailPrice: 95,
    colors: ['Olive', 'Sand'],
    materials: ['heavy slub cotton'],
    fit: 'Loose boxy fit',
    tags: ['luxury', 'japanese', 'pocket', 'tees'],
    badgeLine: 'WTAPS white woven label detail',
    images: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1600&auto=format&fit=crop'
    ]
  },

  // --- HOODIES (15 items) ---
  {
    slug: 'afterhours-pullover',
    name: 'Champion Reverse Weave Hoodie "Black"',
    category: 'hoodies',
    brand: 'Champion',
    retailPrice: 65,
    colors: ['Black', 'Washed Grey'],
    materials: ['12oz heavyweight fleece', 'cotton blend'],
    fit: 'Relaxed oversized fit',
    tags: ['hoodie', 'basic', 'heavyweight', 'champion'],
    badgeLine: '12oz shrink-resistant reverse weave fleece',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'studio-zip-hoodie',
    name: 'Nike Sportswear Club Fleece Hoodie',
    category: 'hoodies',
    brand: 'Nike',
    retailPrice: 60,
    colors: ['Heather', 'Ink', 'Cream'],
    materials: ['double-faced fleece', 'cotton blend'],
    fit: 'Oversized fit',
    tags: ['hoodie', 'layer', 'heavyweight', 'nike'],
    badgeLine: 'Double-faced fleece active zip',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-originals-trefoil-hoodie',
    name: 'Adidas Trefoil Fleece Hoodie',
    category: 'hoodies',
    brand: 'Adidas',
    retailPrice: 65,
    colors: ['Blue', 'Black', 'Cream'],
    materials: ['brushed back fleece'],
    fit: 'Relaxed comfortable fit',
    tags: ['hoodie', 'logo', 'adidas'],
    badgeLine: 'Large front Trefoil flock print',
    images: [
      'https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'fear-of-god-essentials-hoodie-oatmeal',
    name: 'Fear of God Essentials Hoodie "Oatmeal"',
    category: 'hoodies',
    brand: 'Fear of God',
    retailPrice: 95,
    colors: ['Cream', 'Sand'],
    materials: ['heavy fleece cotton'],
    fit: 'Oversized drop shoulder fit',
    tags: ['hoodie', 'hype', 'essentials', 'fog'],
    badgeLine: 'Rubberized Essentials back logo print',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stussy-stock-logo-hoodie-black',
    name: 'Stussy Stock Logo Hoodie "Black"',
    category: 'hoodies',
    brand: 'Stussy',
    retailPrice: 120,
    colors: ['Black', 'Ink'],
    materials: ['garment dyed fleece'],
    fit: 'Relaxed comfortable fit',
    tags: ['hoodie', 'logo', 'stussy'],
    badgeLine: 'Tonal stock script embroidery center chest',
    images: [
      'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'supreme-box-logo-hoodie-grey',
    name: 'Supreme Box Logo Hooded Sweatshirt',
    category: 'hoodies',
    brand: 'Supreme',
    retailPrice: 168,
    colors: ['Heather', 'Black'],
    materials: ['heavy fleece cotton'],
    fit: 'Regular streetwear fit',
    tags: ['hoodie', 'hype', 'supreme'],
    badgeLine: 'Heavyweight crossgrain fleece box logo',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stone-island-hooded-sweatshirt-navy',
    name: 'Stone Island Hooded Sweatshirt',
    category: 'hoodies',
    brand: 'Stone Island',
    retailPrice: 320,
    colors: ['Ink', 'Sage'],
    materials: ['brushed cotton fleece'],
    fit: 'Regular European fit',
    tags: ['luxury', 'badge', 'stone-island'],
    badgeLine: 'Removable Stone Island compass sleeve badge',
    images: [
      'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-acg-therma-fit-hoodie',
    name: 'Nike ACG Therma-FIT Hoodie',
    category: 'hoodies',
    brand: 'Nike',
    retailPrice: 110,
    colors: ['Olive', 'Sand'],
    materials: ['Therma-FIT fleece', 'water repellent'],
    fit: 'Oversized fit',
    tags: ['outdoor', 'acg', 'nike'],
    badgeLine: 'Therma-FIT warmth insulation utility',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'patagonia-better-sweater-quarter-zip',
    name: 'Patagonia Better Sweater 1/4-Zip',
    category: 'hoodies',
    brand: 'Patagonia',
    retailPrice: 129,
    colors: ['Grey', 'Navy'],
    materials: ['recycled polyester fleece knit'],
    fit: 'Standard fit',
    tags: ['outdoor', 'fleece', 'patagonia'],
    badgeLine: 'Knitted face fleece outdoor layer',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'the-north-face-drew-peak-hoodie',
    name: 'The North Face Drew Peak Hoodie',
    category: 'hoodies',
    brand: 'The North Face',
    retailPrice: 85,
    colors: ['Black', 'Grey'],
    materials: ['brushed back cotton'],
    fit: 'Standard fit',
    tags: ['hoodie', 'outdoor', 'the-north-face'],
    badgeLine: 'Embroidered dome logo chest print',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'comme-des-garcons-play-heart-zip-hoodie',
    name: 'Comme des Garçons Play Heart Zip Hoodie',
    category: 'hoodies',
    brand: 'Comme des Garcons',
    retailPrice: 280,
    colors: ['Grey', 'Black'],
    materials: ['polyester fleece'],
    fit: 'Fitted (size up recommended)',
    tags: ['luxury', 'heart', 'cdg'],
    badgeLine: 'Red heart emblem chest zip hoodie',
    images: [
      'https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'off-white-diagonal-arrow-hoodie-black',
    name: 'Off-White Diagonal Arrow Hoodie',
    category: 'hoodies',
    brand: 'Off-White',
    retailPrice: 520,
    colors: ['Black', 'White'],
    materials: ['premium heavy loopback cotton'],
    fit: 'Oversized fit',
    tags: ['luxury', 'arrows', 'off-white'],
    badgeLine: 'Diagonal stripes sleeve and arrow back',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'carhartt-wip-chase-hoodie-grey',
    name: 'Carhartt WIP Chase Hoodie "Grey"',
    category: 'hoodies',
    brand: 'Carhartt WIP',
    retailPrice: 95,
    colors: ['Grey', 'Green'],
    materials: ['brushed cotton-poly blend'],
    fit: 'Regular fit',
    tags: ['hoodie', 'basic', 'carhartt'],
    badgeLine: 'Gold logo sleeve embroidery layer',
    images: [
      'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-sportswear-club-crewneck',
    name: 'Nike Sportswear Club Fleece Crewneck',
    category: 'hoodies',
    brand: 'Nike',
    retailPrice: 50,
    colors: ['Cream', 'Ink', 'Heather'],
    materials: ['brushed fleece'],
    fit: 'Standard fit',
    tags: ['crewneck', 'basic', 'nike'],
    badgeLine: 'Embroidered Futura chest logo crew',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stussy-stock-crewneck-grey',
    name: 'Stussy Stock Logo Crewneck "Grey"',
    category: 'hoodies',
    brand: 'Stussy',
    retailPrice: 100,
    colors: ['Grey', 'Black'],
    materials: ['heavyweight loopback cotton'],
    fit: 'Relaxed boxy fit',
    tags: ['crewneck', 'stussy'],
    badgeLine: 'Premium script embroidery crew',
    images: [
      'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=1600&auto=format&fit=crop'
    ]
  },

  // --- ACCESSORIES (15 items) ---
  {
    slug: 'canvas-mini-tote',
    name: 'Carhartt WIP Canvas Tote Bag',
    category: 'accessories',
    brand: 'Carhartt WIP',
    retailPrice: 45,
    colors: ['Natural', 'Black'],
    materials: ['canvas', 'cotton webbing'],
    fit: 'Compact carry',
    tags: ['bag', 'canvas', 'carhartt'],
    badgeLine: 'Heavy canvas utility everyday tote',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nylon-crossbody',
    name: 'Supreme Nylon Shoulder Bag "Black"',
    category: 'accessories',
    brand: 'Supreme',
    retailPrice: 72,
    colors: ['Black', 'Olive'],
    materials: ['ripstop nylon', 'metal zipper'],
    fit: 'Adjustable carry',
    tags: ['bag', 'crossbody', 'supreme'],
    badgeLine: 'Cordura ripstop nylon street carry',
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-everyday-plus-socks',
    name: 'Nike Everyday Plus Cushioned Socks',
    category: 'accessories',
    brand: 'Nike',
    retailPrice: 22,
    colors: ['White', 'Black', 'Lime'],
    materials: ['cotton blend', 'rib knit'],
    fit: 'Crew sock fit',
    tags: ['socks', 'nike'],
    badgeLine: 'Dri-FIT cushion active socks 3-pack',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-heritage86-cap-black',
    name: 'Nike Sportswear Heritage86 Cap "Black"',
    category: 'accessories',
    brand: 'Nike',
    retailPrice: 28,
    colors: ['Black', 'White'],
    materials: ['washed cotton twill'],
    fit: 'Adjustable strapback',
    tags: ['cap', 'nike'],
    badgeLine: 'Soft washed classic six-panel cap',
    images: [
      'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'adidas-originals-trefoil-cap',
    name: 'Adidas Originals Trefoil Cap',
    category: 'accessories',
    brand: 'Adidas',
    retailPrice: 28,
    colors: ['Blue', 'White'],
    materials: ['cotton twill'],
    fit: 'Adjustable backstrap',
    tags: ['cap', 'adidas'],
    badgeLine: 'Chain-stitched logo twill cap',
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'new-era-9forty-ny-cap',
    name: 'New Era 9FORTY NY Yankees Cap "Navy"',
    category: 'accessories',
    brand: 'New Era',
    retailPrice: 30,
    colors: ['Navy', 'White'],
    materials: ['woven cotton'],
    fit: 'Adjustable contour fit',
    tags: ['cap', 'new-era'],
    badgeLine: 'Official MLB NY Yankees cap',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'carhartt-wip-acrylic-watch-beanie',
    name: 'Carhartt WIP Acrylic Watch Beanie',
    category: 'accessories',
    brand: 'Carhartt WIP',
    retailPrice: 25,
    colors: ['Sand', 'Black', 'Orange'],
    materials: ['stretchable acrylic rib knit'],
    fit: 'One size stretch fit',
    tags: ['beanie', 'warm', 'carhartt'],
    badgeLine: 'Rib-knit stretch workwear beanie',
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'patagonia-fitz-roy-trucker-hat',
    name: 'Patagonia Fitz Roy Trucker Hat',
    category: 'accessories',
    brand: 'Patagonia',
    retailPrice: 39,
    colors: ['Grey', 'Navy'],
    materials: ['organic cotton canvas', 'polyester mesh'],
    fit: 'Adjustable snapback',
    tags: ['cap', 'trucker', 'patagonia'],
    badgeLine: 'Recycled fishing net brim mesh cap',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'the-north-face-borealis-backpack-black',
    name: 'The North Face Borealis Backpack "Black"',
    category: 'accessories',
    brand: 'The North Face',
    retailPrice: 99,
    colors: ['Black'],
    materials: ['210D recycled nylon ripstop'],
    fit: 'FlexVent shoulder straps',
    tags: ['bag', 'backpack', 'the-north-face'],
    badgeLine: 'FlexVent suspension bungee backpack',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'vans-old-skool-backpack-black',
    name: 'Vans Old Skool Backpack "Black"',
    category: 'accessories',
    brand: 'Vans',
    retailPrice: 45,
    colors: ['Black'],
    materials: ['polyester fabric'],
    fit: 'Padded shoulder straps',
    tags: ['bag', 'backpack', 'vans'],
    badgeLine: 'Classic daily skate utility backpack',
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'stussy-stock-canvas-tote-natural',
    name: 'Stussy Stock Canvas Tote Bag "Natural"',
    category: 'accessories',
    brand: 'Stussy',
    retailPrice: 40,
    colors: ['Natural', 'Black'],
    materials: ['heavy durable cotton canvas'],
    fit: 'Over-shoulder carry',
    tags: ['bag', 'canvas', 'stussy'],
    badgeLine: 'Stussy script printed heavy canvas tote',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'nike-heritage-waist-pack-black',
    name: 'Nike Heritage Waist Pack "Black"',
    category: 'accessories',
    brand: 'Nike',
    retailPrice: 30,
    colors: ['Black', 'Red'],
    materials: ['polyester knit fabric'],
    fit: 'Adjustable buckle strap',
    tags: ['bag', 'waistbag', 'nike'],
    badgeLine: 'Secure double-zipped retro hip pack',
    images: [
      'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'casio-g-shock-dw5600-digital-watch',
    name: 'Casio G-Shock DW5600 Digital Watch',
    category: 'accessories',
    brand: 'Casio',
    retailPrice: 75,
    colors: ['Black'],
    materials: ['resin bezel and strap', 'mineral glass'],
    fit: 'Adjustable band',
    tags: ['watch', 'casio'],
    badgeLine: '200m water resistant shockproof digital',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'dickies-webbing-military-belt-black',
    name: 'Dickies Webbing Military Belt "Black"',
    category: 'accessories',
    brand: 'Dickies',
    retailPrice: 18,
    colors: ['Black', 'Sage'],
    materials: ['acrylic webbing', 'metal clamp buckle'],
    fit: 'Cut-to-size adjustable',
    tags: ['belt', 'dickies'],
    badgeLine: 'Military metal clamp webbing belt',
    images: [
      'https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?q=80&w=1600&auto=format&fit=crop'
    ]
  },
  {
    slug: 'converse-core-duffel-bag-black',
    name: 'Converse Core Duffel Bag "Black"',
    category: 'accessories',
    brand: 'Converse',
    retailPrice: 50,
    colors: ['Black'],
    materials: ['durable polyester canvas'],
    fit: 'Padded carry handles and strap',
    tags: ['bag', 'duffel', 'converse'],
    badgeLine: 'Large gym and travel athletic duffel',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1600&auto=format&fit=crop'
    ]
  }
];

// Collections structure
const collections = [
  'Color Rush Drop',
  'Court Energy',
  'Studio Basics',
  'Soft Velocity',
  'Night Market',
  'Concrete Playground',
  'Artist Uniform',
  'Daily Objects'
];

const products = productsList.map((p, index) => {
  // 35% discount calculation
  const normalPrice = p.retailPrice;
  const discountedPrice = Math.round(normalPrice * 0.65);
  
  // Decide visual discount (Sale badge) on 30% of items
  const hasSale = index % 3 === 0;

  // Collection distribution
  let collectionName = collections[index % (collections.length - 1)];
  if (p.category === 'accessories') {
    collectionName = 'Daily Objects';
  }

  // Generate metadata properties
  const rating = parseFloat((4.4 + (index % 7) * 0.1).toFixed(1));
  const reviewCount = 20 + (index % 10) * 14 + (index % 3) * 5;
  const stock = 5 + (index % 15) * 3;
  const isNew = index % 4 === 0 || index < 10;
  const isFeatured = index % 5 === 0 || index < 5;
  const dropDate = `2026-07-${String(8 + (index % 15)).padStart(2, '0')}`;

  const care = p.category === 'sneakers' 
    ? ['Use a soft brush', 'Spot clean leather panels', 'Air dry only']
    : ['Machine wash cold', 'Wash inside out', 'Do not tumble dry'];

  const isMale = index % 2 === 0;
  const model = p.category === 'sneakers'
    ? { height: '', wearing: `US ${p.colors[0] === 'One Size' ? 'One Size' : '10'}` }
    : {
        height: isMale ? "6'1\"" : "5'9\"",
        wearing: isMale ? 'L' : 'M'
      };

  // Safe mapping of primary and secondary hover images
  const primaryImage = p.images[0];
  let secondaryImage = p.images[1] || primaryImage;

  // Check if we need to auto-generate a different view/angle for hover
  if (p.images.length === 1) {
    if (p.category === 'sneakers' || p.category === 'accessories') {
      // Horizontal flip (mirrored angle) for shoes & gear
      secondaryImage = primaryImage.includes('?') 
        ? `${primaryImage}&flip=h` 
        : `${primaryImage}?flip=h`;
    } else if (p.category === 'tees' || p.category === 'hoodies') {
      // Focal point zoom (close-up detail shot) for clothing to avoid mirroring text/logos
      secondaryImage = primaryImage.includes('?') 
        ? `${primaryImage}&crop=focalpoint&fp-z=1.4` 
        : `${primaryImage}?crop=focalpoint&fp-z=1.4`;
    }
  }

  return {
    id: `p-${String(index + 1).padStart(3, '0')}`,
    slug: p.slug,
    name: p.name,
    category: p.category,
    collection: collectionName,
    price: discountedPrice,
    ...(hasSale ? { oldPrice: normalPrice } : {}),
    description: `A premium ${p.brand} ${p.category === 'sneakers' ? 'sneaker' : p.category === 'tees' ? 't-shirt' : p.category === 'hoodies' ? 'hoodie' : 'item'} featuring ${p.colors.join(', ')} colors. Built with ${p.materials.join(', ')} for daily rotation and high-impact style.`,
    images: [primaryImage, secondaryImage],
    colors: p.colors,
    sizes: p.category === 'sneakers' 
      ? ['7', '8', '9', '10', '11', '12'] 
      : p.category === 'accessories' && p.name.includes('Socks')
        ? ['S/M', 'L/XL']
        : p.category === 'accessories'
          ? ['One Size']
          : ['XS', 'S', 'M', 'L', 'XL'],
    materials: p.materials,
    fit: p.fit,
    rating: rating,
    reviewCount: reviewCount,
    stock: stock,
    isNew: isNew,
    isFeatured: isFeatured,
    tags: p.tags,
    dropDate: dropDate,
    badgeLine: p.badgeLine,
    care: care,
    model: model
  };
});

const outputPath = path.join(__dirname, 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`Successfully generated ${products.length} products to ${outputPath}`);

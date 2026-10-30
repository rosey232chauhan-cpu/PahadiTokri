import './index.css'
import './App.css'
import pahadiTokriLogo from './assets/pahaditokri-logo.png'

const productCategories = [
  {
    slug: 'fresh-fruits', name: 'Fresh Fruits', description: 'Handpicked seasonal fruits packed with natural sweetness and nutrients.', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80', items: [
      ['Apple', '₹180/kg', 'Crisp and juicy apples rich in fiber and antioxidants.', 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=80'],
      ['Cherry', '₹520/kg', 'Sweet-tart cherries ideal for snacking and desserts.', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80'],
      ['Plum', '₹220/kg', 'Fresh plums with vibrant taste and natural vitamins.', 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=1200&q=80'],
      ['Pear', '₹210/kg', 'Soft and refreshing pears with a delicate sweet flavor.', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=1200&q=80'],
    ],
  },
  {
    slug: 'dried-fruits', name: 'Dried Fruits', description: 'Sun-dried Himalayan goodness with concentrated flavor and energy.', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80', items: [
      ['Almond', '₹890/kg', 'Premium crunchy almonds packed with healthy fats and protein.', 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1200&q=80'],
      ['Raisin', '₹360/kg', 'Naturally sweet raisins ideal for daily snacks and desserts.', 'https://images.unsplash.com/photo-1586444248888-fb23c3fa56d8?auto=format&fit=crop&w=1200&q=80'],
      ['Cashew', '₹980/kg', 'Creamy whole cashews selected from top grade harvest.', 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80'],
      ['Dried Apricot', '₹760/kg', 'Soft sun-dried apricots rich in minerals and natural sweetness.', 'https://images.unsplash.com/photo-1560780551-2c13d9be7a07?auto=format&fit=crop&w=1200&q=80'],
    ],
  },
  {
    slug: 'grains', name: 'Grains', description: 'Wholesome, naturally grown grains sourced from trusted mountain farms.', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80', items: [
      ['Brown Rice', '₹120/kg', 'Nutritious whole grain rice with earthy flavor and texture.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80'],
      ['Quinoa', '₹340/kg', 'Protein-rich super grain for salads, bowls, and healthy meals.', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e1?auto=format&fit=crop&w=1200&q=80'],
      ['Oats', '₹180/kg', 'High-fiber oats for wholesome breakfast and baking recipes.', 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=1200&q=80'],
      ['Barley', '₹140/kg', 'Traditional grain known for digestive and heart health support.', 'https://images.unsplash.com/photo-1631377819268-d716cd61079f?auto=format&fit=crop&w=1200&q=80'],
    ],
  },
  {
    slug: 'seeds', name: 'Seeds', description: 'Nutrient-dense seeds for daily wellness, freshness, and balanced nutrition.', image: 'https://images.unsplash.com/photo-1603048719537-8d3f4f8397d5?auto=format&fit=crop&w=1200&q=80', items: [
      ['Chia Seeds', '₹420/kg', 'Omega-3 rich seeds perfect for smoothies and puddings.', 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80'],
      ['Flax Seeds', '₹260/kg', 'Heart-friendly seeds with fiber and essential fatty acids.', 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=1200&q=80'],
      ['Sunflower Seeds', '₹300/kg', 'Light and crunchy seeds loaded with vitamin E and minerals.', 'https://images.unsplash.com/photo-1505576633757-0ac1084af824?auto=format&fit=crop&w=1200&q=80'],
      ['Pumpkin Seeds', '₹460/kg', 'Protein-rich green seeds ideal for salads and trail mixes.', 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&w=1200&q=80'],
    ],
  },
].map((category) => ({
  ...category,
  items: category.items.map(([name, price, info, image]) => ({
    name,
    price,
    info,
    image,
    sku: `${category.slug}-${name.toLowerCase().replaceAll(' ', '-')}`,
  })),
}))

const showcaseVideos = [
  { title: 'Grapes Picked by Hand', description: 'Watch ripe grapes gathered by hand among the vines.', url: 'https://videos.pexels.com/video-files/9947678/9947678-hd_1920_1080_25fps.mp4', poster: productCategories[0].items[1].image },
  { title: 'Rice Harvest Unloaded to Truck', description: 'See harvested rice transferred into a truck for the journey to market.', url: 'https://videos.pexels.com/video-files/6685751/6685751-hd_1920_1080_25fps.mp4', poster: productCategories[2].image },
  { title: 'Harvest in Motion', description: 'A moving glimpse of farm life and the work behind every harvest.', url: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4', poster: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85' },
  { title: 'From Farm to Market', description: 'Follow fresh produce on its journey from the fields to the table.', url: 'https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4', poster: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85' },
]
const farmMedia = [
  { type: 'photo', label: 'Growing season', title: 'Fields through the growing season', description: 'A look across the green fields where each harvest begins.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85', alt: 'Green agricultural fields across a mountain valley' },
  { type: 'photo', label: 'Fruit harvest', title: 'Seasonal fruit, picked fresh', description: 'Explore the colors and textures of fresh seasonal produce.', image: productCategories[0].items[0].image, alt: 'Freshly harvested apples' },
  { type: 'video', label: 'Fruit picking', title: showcaseVideos[0].title, description: showcaseVideos[0].description, video: showcaseVideos[0].url, poster: productCategories[0].items[1].image },
  { type: 'photo', label: 'Grains', title: 'From grain fields to sorting', description: 'A closer look at wholesome grains before they are prepared for market.', image: productCategories[2].image, alt: 'Golden grain field ready for harvest' },
  { type: 'photo', label: 'Sorting and packing', title: 'Careful selection before packing', description: 'Fresh produce selected and prepared for its journey to market.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85', alt: 'Fresh produce arranged for market' },
  { type: 'video', label: 'Grains to market', title: showcaseVideos[1].title, description: showcaseVideos[1].description, video: showcaseVideos[1].url, poster: productCategories[2].image },
  { type: 'video', label: 'Harvest in motion', title: showcaseVideos[2].title, description: showcaseVideos[2].description, video: showcaseVideos[2].url, poster: showcaseVideos[2].poster },
  { type: 'video', label: 'Farm to market', title: showcaseVideos[3].title, description: showcaseVideos[3].description, video: showcaseVideos[3].url, poster: showcaseVideos[3].poster },
]

const state = {
  cartItems: JSON.parse(localStorage.getItem('pahaditokri_cart') || '[]'),
  orderHistory: JSON.parse(localStorage.getItem('pahaditokri_orders') || '[]'),
  auth: JSON.parse(localStorage.getItem('pahaditokri_auth') || 'null'),
  admin: JSON.parse(localStorage.getItem('pahaditokri_admin') || 'null'),
  adminImages: [],
  adminImagesLoaded: false,
}
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const root = document.querySelector('#root')
const whatsappNumber = '917018777497'
let razorpayScriptPromise
let mediaObserver
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
const parsePrice = (price) => Number(price.replace(/[^0-9.]/g, '')) || 0
const itemWithCartData = (item, categoryName, quantity = 1) => ({ ...item, id: `${categoryName}-${item.name}`, sku: `${categoryName}-${item.name}`.toLowerCase().replaceAll(' ', '-'), categoryName, quantity, priceNumber: parsePrice(item.price) })
let allProducts = productCategories.flatMap((category) => category.items.map((item) => ({ ...item, categorySlug: category.slug, categoryName: category.name })))
const saveState = () => {
  localStorage.setItem('pahaditokri_cart', JSON.stringify(state.cartItems))
  localStorage.setItem('pahaditokri_orders', JSON.stringify(state.orderHistory))
  localStorage.setItem('pahaditokri_auth', JSON.stringify(state.auth))
  localStorage.setItem('pahaditokri_admin', JSON.stringify(state.admin))
}
const cartItemCount = () => state.cartItems.reduce((total, item) => total + item.quantity, 0)
const link = (path, label, className = '') => `<a href="${path}" class="${className}" data-route>${label}</a>`
const whatsappLink = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

function updateCatalogImages(categories) {
  for (const updatedCategory of categories) {
    const category = productCategories.find((entry) => entry.slug === updatedCategory.slug)
    if (!category) continue
    category.image = updatedCategory.image
    for (const updatedItem of updatedCategory.items) {
      const item = category.items.find((entry) => entry.sku === updatedItem.sku)
      if (item) item.image = updatedItem.image
    }
  }
  farmMedia[1].image = productCategories[0].items[0].image
  farmMedia[2].poster = productCategories[0].items[1].image
  farmMedia[3].image = productCategories[2].image
  farmMedia[5].poster = productCategories[2].image
  allProducts = productCategories.flatMap((category) => category.items.map((item) => ({ ...item, categorySlug: category.slug, categoryName: category.name })))
  state.cartItems = state.cartItems.map((cartItem) => ({
    ...cartItem,
    image: allProducts.find((item) => item.sku === cartItem.sku)?.image ?? cartItem.image,
  }))
  saveState()
}

async function loadCatalogImages() {
  const response = await fetch(`${API_BASE_URL}/api/products`)
  if (!response.ok) throw new Error('Product images could not be loaded.')
  const result = await response.json()
  if (Array.isArray(result.categories)) updateCatalogImages(result.categories)
  if (window.location.pathname !== '/admin') render()
}

function productCard(item) {
  const reference = `${item.categorySlug}|${item.name}`
  return `<article class="catalog-product-card" data-product-card data-name="${escapeHtml(item.name.toLowerCase())}" data-category="${item.categorySlug}" data-price="${parsePrice(item.price)}"><div class="catalog-product-image"><img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy"><span class="availability-badge">Check availability</span></div><div class="catalog-product-content"><p class="catalog-product-category">${escapeHtml(item.categoryName)}</p><h3>${escapeHtml(item.name)}</h3><p class="catalog-product-description">${escapeHtml(item.info)}</p><p class="catalog-product-price">${escapeHtml(item.price)}</p><label class="quantity-picker">Quantity<select aria-label="Quantity of ${escapeHtml(item.name)} in kilograms" data-product-quantity><option value="1">1 kg</option><option value="2">2 kg</option><option value="5">5 kg</option></select></label><button class="btn primary catalog-add-button" type="button" data-add="${escapeHtml(reference)}">Add to Cart</button></div></article>`
}

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve()
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = resolve
      script.onerror = () => {
        razorpayScriptPromise = null
        reject(new Error('Unable to load secure checkout. Please try again.'))
      }
      document.head.append(script)
    })
  }
  return razorpayScriptPromise
}

function showToast(message, type = 'success') {
  const container = document.querySelector('#toast-container')
  if (!container) return
  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.setAttribute('role', 'status')
  toast.textContent = message
  container.append(toast)
  requestAnimationFrame(() => toast.classList.add('toast-visible'))
  window.setTimeout(() => {
    toast.classList.remove('toast-visible')
    window.setTimeout(() => toast.remove(), 220)
  }, 2200)
}

function markClicked(element, message) {
  if (!element) return
  element.classList.add('is-clicked')
  window.setTimeout(() => element.classList.remove('is-clicked'), 500)
  showToast(message)
}

function header() {
  const accountLinks = state.admin
    ? `${link('/admin', 'Image Admin')}<span class="account-name">Hi, Admin</span><button type="button" class="header-action" data-admin-logout>Logout</button>`
    : state.auth
      ? `<span class="account-name">Hi, ${escapeHtml(state.auth.user.name)}</span><button type="button" class="header-action" data-logout>Logout</button>`
      : `${link('/login', 'Login')} ${link('/register', 'Register')}`
  return `<header class="site-header"><div class="brand"><img src="${pahadiTokriLogo}" alt="PahadiTokri logo"></div><nav>${link('/', 'Home')} ${link('/about', 'About')} ${link('/farm', 'Farm Stories')} ${link('/products', 'Products')} ${link('/cart', `Cart (${cartItemCount()})`)} ${link('/contact-us', 'Contact Us')} ${accountLinks}</nav></header>`
}

function homePage() {
  const categoryCards = [
    { title: 'Fruits', image: productCategories[0].image, path: '/products/fresh-fruits', note: 'Fresh seasonal picks' },
    { title: 'Grains', image: productCategories[2].image, path: '/products/grains', note: 'Wholesome pantry staples' },
    { title: 'Dry fruits', image: productCategories[1].image, path: '/products/dried-fruits', note: 'Naturally satisfying snacks' },
    { title: 'Pulses', image: productCategories[2].items[0].image, path: '', note: 'Ask us about seasonal availability' },
  ]
  const bestPicks = [allProducts[0], allProducts[4], allProducts[8], allProducts[12]]
  const himachalProduce = [
    { title: 'Shimla apples', image: productCategories[0].items[0].image, note: 'Ask us to confirm that this batch is from Shimla and currently available.' },
    { title: 'Himachali rajma', image: productCategories[2].items[0].image, note: 'Ask us to confirm the source and seasonal availability.' },
    { title: 'Local walnuts', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80', note: 'Ask us about sourcing and seasonal availability.' },
    { title: 'Traditional grains & pulses', image: productCategories[2].image, note: 'Contact us to check what is available this season.' },
    { title: 'Seasonal local produce', image: farmMedia[0].image, note: 'Ask us what is in season and where each batch comes from.' },
  ]
  const himachalCards = himachalProduce.map((item) => `<article class="hill-produce-card"><img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy"><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.note)}</p><a href="${whatsappLink(`Hello PahadiTokri, please share current availability and sourcing details for ${item.title}.`)}" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></div></article>`).join('')
  const comboCards = [
    { title: 'Build a fruit basket', description: 'Choose your favourite seasonal fruit and quantities from the catalogue.', image: productCategories[0].image, path: '/products/fresh-fruits', action: 'Choose fruits' },
    { title: 'Stock up on grains', description: 'Browse grain staples and choose the quantities that suit your home.', image: productCategories[2].image, path: '/products/grains', action: 'Shop grains' },
  ]
  const photoStories = [
    { title: 'A red apple in the orchard', label: 'Orchard moments', image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=1400&q=80', alt: 'A fresh red apple with a green leaf against a leafy orchard background' },
    { title: 'Grown among the hills', label: 'Mountain landscape', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=80', alt: 'Mountain peaks rising above a green valley' },
    { title: 'Fresh from the garden', label: 'Seasonal produce', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1100&q=80', alt: 'Sunlight falling across green leaves and growing plants' },
  ]
  const photoStoryCards = photoStories.map((story, index) => `<article class="photo-story-card${index === 0 ? ' photo-story-featured' : ''}" data-photo-story><img src="${story.image}" alt="${story.alt}" loading="lazy" decoding="async"><span class="photo-story-caption"><small>${story.label}</small><strong>${story.title}</strong></span><span class="photo-motion-badge"><span aria-hidden="true"></span> Living picture</span></article>`).join('')
  return `<div class="home-layout">
    <section class="hero-section hero-video-section"><div class="hero-copy-block"><p class="eyebrow">From the hills to your home</p><h1>Freshness from the Hills, Delivered to Your Home.</h1><p class="hero-copy">Discover seasonal fruits, wholesome grains and everyday goodness from PahadiTokri.</p><p class="hero-assurance">Locally sourced <span aria-hidden="true">•</span> Fresh quality <span aria-hidden="true">•</span> Convenient delivery</p><div class="hero-actions">${link('/products/fresh-fruits', 'Shop Fruits', 'btn primary')}${link('/products/grains', 'Shop Grains', 'btn secondary')}</div><p class="hero-origin">Based in Karal, Kotkhai, Shimla, Himachal Pradesh</p></div><div class="hero-visual"><video class="hero-background-video" muted loop playsinline preload="none" poster="${showcaseVideos[2].poster}" aria-label="Farm harvest in the hills" data-auto-play><source src="${showcaseVideos[2].url}" type="video/mp4"></video><span class="hero-video-caption"><span class="video-live-badge"><span aria-hidden="true"></span> Farm life in motion</span><button type="button" class="hero-video-toggle" data-video-toggle aria-label="Play farm video">Play video</button></span></div></section>
    <section class="section-block video-showcase-section home-video-section"><div class="section-heading"><div><p class="eyebrow">Watch the harvest</p><h2>Farm life, in motion</h2><p class="section-caption">Short glimpses of harvest, growers and the journey from farm to market.</p></div><span class="video-live-badge"><span aria-hidden="true"></span> Moving stories</span></div><div class="video-showcase-grid">${showcaseVideos.map((video) => `<article class="video-card"><div class="video-card-visual"><video muted loop playsinline preload="none" poster="${video.poster}" data-auto-play><source src="${video.url}" type="video/mp4"></video><span class="video-card-play-mark" aria-hidden="true">▶</span></div><div class="video-card-content"><h3>${video.title}</h3><button type="button" class="video-control-btn" data-video-toggle>Play Video</button></div></article>`).join('')}</div></section>
    <section class="section-block photo-stories-section"><div class="section-heading"><div><p class="eyebrow">A little closer to nature</p><h2>Orchard to table</h2><p class="section-caption">A glimpse of the apples, hills and green growing spaces that inspire us.</p></div></div><div class="photo-stories-grid">${photoStoryCards}</div></section>
    <section class="section-block category-section"><div class="section-heading"><div><p class="eyebrow">Find your favourites</p><h2>Shop by Category</h2></div>${link('/products', 'View all products', 'text-link')}</div><div class="home-category-grid">${categoryCards.map((category) => category.path ? `<a class="home-category-card" href="${category.path}" data-route><img src="${category.image}" alt="${category.title}" loading="lazy"><span><strong>${category.title}</strong><small>${category.note}</small></span></a>` : `<a class="home-category-card category-coming-soon" href="${whatsappLink('Hello PahadiTokri, please share your current pulses availability.')}" target="_blank" rel="noopener noreferrer"><img src="${category.image}" alt="${category.title}" loading="lazy"><span><strong>${category.title}</strong><small>${category.note}</small></span></a>`).join('')}</div></section>
    <section class="section-block catalogue-feature"><div class="section-heading"><div><p class="eyebrow">Picked from our current range</p><h2>Best Sellers</h2><p class="section-caption">Featured catalogue picks; not yet ranked by sales.</p></div>${link('/products', 'Shop all products', 'text-link')}</div><div class="home-product-grid">${bestPicks.map(productCard).join('')}</div></section>
    <section class="section-block himachal-section"><div class="himachal-intro"><p class="eyebrow">Our home in the hills</p><h2>From the Hills of Himachal</h2><p>Our business is based in Karal, Kotkhai, Shimla. Product origins and seasonal availability can vary by batch—ask us and we’ll confirm before you order.</p></div><div class="hill-produce-grid">${himachalCards}</div></section>
    <section class="section-block combo-section"><div class="section-heading"><div><p class="eyebrow">Make it your own</p><h2>Combos &amp; Everyday Picks</h2><p class="section-caption">Choose products and quantities from the live catalogue. No bundle discount is applied.</p></div></div><div class="combo-grid">${comboCards.map((combo) => `<article class="combo-card"><img src="${combo.image}" alt="${combo.title}" loading="lazy"><div><h3>${combo.title}</h3><p>${combo.description}</p>${link(combo.path, combo.action, 'btn secondary')}</div></article>`).join('')}</div></section>
    <section class="section-block why-section"><p class="eyebrow">The PahadiTokri promise</p><h2>Why PahadiTokri?</h2><div class="why-grid"><article><span aria-hidden="true">01</span><h3>Fresh quality</h3><p>Thoughtfully selected products from the current catalogue.</p></article><article><span aria-hidden="true">02</span><h3>Local roots</h3><p>We’re based in Kotkhai, Shimla, Himachal Pradesh.</p></article><article><span aria-hidden="true">03</span><h3>Simple ordering</h3><p>Choose your quantity, review the delivery charge, and order online.</p></article></div></section>
    <section class="section-block reviews-section"><p class="eyebrow">Your experience matters</p><h2>Customer Reviews</h2><p>Verified customer feedback will appear here as we collect it. We don’t publish unverified testimonials.</p></section>
    <section class="section-block delivery-section"><div><p class="eyebrow">Before you order</p><h2>Delivery Information</h2><p>Delivery charge: ₹49 per order. Delivery areas and estimated timing are confirmed for your address—message us on WhatsApp before ordering if you’d like to check.</p></div><a class="btn primary" href="${whatsappLink('Hello PahadiTokri, please confirm delivery availability and estimated timing for my area.')}" target="_blank" rel="noopener noreferrer">Check delivery on WhatsApp</a></section>
  </div>`
}

function farmStoriesPage() {
  const cards = farmMedia.map((item) => {
    const visual = item.type === 'video'
      ? `<video muted loop playsinline preload="none" poster="${item.poster}" aria-label="${item.title}" data-auto-play><source src="${item.video}" type="video/mp4"></video>`
      : `<img src="${item.image}" alt="${item.alt}" loading="lazy">`
    const videoAction = item.type === 'video' ? '<button type="button" class="video-control-btn" data-video-toggle>Play Video</button>' : ''
    return `<article class="farm-media-card" data-media-type="${item.type}"><div class="farm-media-visual">${visual}<span class="farm-media-badge">${item.type === 'video' ? 'Video' : 'Photo'}</span></div><div class="farm-media-content"><p class="farm-media-label">${item.label}</p><h2>${item.title}</h2><p>${item.description}</p>${videoAction}</div></article>`
  }).join('')
  return `<div class="farm-layout"><section class="farm-hero"><div><p class="eyebrow">Field notes</p><h1>Farm Stories</h1><p>Follow the journey from growing season to market through photos and videos of harvests, grains, and fresh produce.</p><div class="hero-actions">${link('/products', 'Shop the Harvest', 'btn primary')}</div></div><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85" alt="Green fields in a mountain valley" fetchpriority="high"></section><section class="farm-gallery" aria-label="Farm photos and videos"><div class="farm-gallery-heading"><div><p class="eyebrow">From the fields</p><h2>Harvest to market</h2></div><p id="farm-result-count" aria-live="polite">${farmMedia.length} stories</p></div><div class="farm-filter-list" role="group" aria-label="Filter farm stories"><button type="button" class="farm-filter-btn" data-farm-filter="all" aria-pressed="true">All</button><button type="button" class="farm-filter-btn" data-farm-filter="photo" aria-pressed="false">Photos</button><button type="button" class="farm-filter-btn" data-farm-filter="video" aria-pressed="false">Videos</button></div><div class="farm-media-grid">${cards}</div></section></div>`
}

function aboutPage() {
  const highlights = [
    ['Pure Mountain Produce', 'Naturally grown in clean Himalayan air with no unnecessary chemical exposure.', 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80'],
    ['Traditional Sun-Dried Method', 'We preserve freshness and nutrition through time-tested drying practices.', 'https://images.unsplash.com/photo-1615485925763-86786288908d?auto=format&fit=crop&w=1200&q=80'],
    ['Sustainably Sourced', 'Every harvest supports local growers and responsible farming ecosystems.', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80'],
  ]
  return `<div class="about-layout"><section class="about-hero"><div><p class="eyebrow">From The Pahadi Himalayas</p><h1>About PahadiTokri</h1><p>Welcome to PahadiTokri, where we bring you the purest, freshest, and most authentic flavors of the Pahadi Himalayas - straight from our farms to your home. We specialize in fresh and dried fruits, grains, nuts, and wholesome farm produce, grown naturally in the pristine mountain air.</p><p>No middlemen, no compromises - just farm-fresh goodness, handpicked and sun-dried the traditional way. Our commitment? Pure, chemical-free, and sustainably sourced food that nourishes your body and soul.</p><p>Whether it is nutrient-rich dry fruits, organic grains, or local Himalayan specialties, we ensure every bite carries the unmatched taste and health benefits of the hills. Taste the Himalayas. Eat pure, live healthy.</p></div><img class="about-hero-image" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80" alt="Himalayan mountain farms" loading="lazy"></section><section class="about-highlights">${highlights.map(([title, description, image]) => `<article class="about-highlight-card"><img src="${image}" alt="${title}" loading="lazy"><h3>${title}</h3><p>${description}</p></article>`).join('')}</section></div>`
}

function productsPage() {
  return `<div class="products-layout"><section class="page-card section-block products-hero"><p class="eyebrow">From our current catalogue</p><h1>Shop Products</h1><p>Search the catalogue, filter by category or price, and choose your quantity in kilograms. Stock is not tracked live, so please confirm availability with us before ordering.</p></section><section class="catalogue-controls" aria-label="Search and filter products"><label>Search products<input type="search" id="product-search" placeholder="Try apples or grains" autocomplete="off"></label><label>Category<select id="product-category-filter"><option value="">All categories</option>${productCategories.map((category) => `<option value="${category.slug}">${category.name}</option>`).join('')}</select></label><label>Minimum price<input type="number" id="product-min-price" min="0" inputmode="numeric" placeholder="₹0"></label><label>Maximum price<input type="number" id="product-max-price" min="0" inputmode="numeric" placeholder="No limit"></label></section><p class="catalog-results" id="catalog-results" aria-live="polite">${allProducts.length} products</p><section class="catalog-product-grid" id="catalog-product-grid">${allProducts.map(productCard).join('')}</section><p class="catalog-empty" id="catalog-empty" hidden>No products match those filters. Try changing your search.</p></div>`
}

function categoryPage(slug) {
  const category = productCategories.find((entry) => entry.slug === slug)
  if (!category) return `<section class="page-card section-block"><h1>Category Not Found</h1><p>Please go back to our products page and choose a valid category.</p>${link('/products', 'Back to Products', 'btn primary')}</section>`
  const items = category.items.map((item) => ({ ...item, categorySlug: category.slug, categoryName: category.name }))
  return `<div class="products-layout"><section class="page-card section-block products-hero"><p class="eyebrow">Category Details</p><h1>${category.name}</h1><p>${category.description}</p>${link('/products', 'Browse all products', 'text-link')}</section><section class="catalog-product-grid">${items.map(productCard).join('')}</section></div>`
}

function cartPage() {
  const subtotal = state.cartItems.reduce((total, item) => total + item.priceNumber * item.quantity, 0)
  const shipping = subtotal > 0 ? 49 : 0
  const gst = Math.round(subtotal * 0.05 * 100) / 100
  const total = Math.round((subtotal + shipping + gst) * 100) / 100
  const items = state.cartItems.length ? `<div class="cart-item-list">${state.cartItems.map((item) => `<article class="cart-item-card"><img src="${item.image}" alt="${item.name}" loading="lazy"><div class="cart-item-content"><h3>${item.name}</h3><p>${item.categoryName}</p><p class="item-price">${item.price}</p><div class="qty-controls"><button type="button" aria-label="Remove one kilogram of ${escapeHtml(item.name)}" data-decrease="${item.id}">−</button><span>${item.quantity} kg</span><button type="button" aria-label="Add one kilogram of ${escapeHtml(item.name)}" data-increase="${item.id}">+</button></div></div><button type="button" class="remove-btn" data-remove="${item.id}">Remove</button></article>`).join('')}</div><div class="bill-breakdown"><p><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></p><p><span>Delivery charge</span><span>₹${shipping.toFixed(2)}</span></p><p><span>GST (5%)</span><span>₹${gst.toFixed(2)}</span></p><p class="cart-total"><span>Total</span><span>₹${total.toFixed(2)}</span></p><p class="delivery-estimate">Delivery timing and service area are confirmed for your address.</p></div>` : '<p>Your cart is empty. Add products to place an order.</p>'
  const history = state.orderHistory.length ? `<div class="order-history-list">${state.orderHistory.map((order) => `<article class="order-history-card"><h3>${order.orderId}</h3><p>${order.createdAt}</p><p>Customer: ${escapeHtml(order.customerName)}</p><p>Items: ${order.itemCount}</p><p>Payment: ${order.paymentMethod.toUpperCase()}</p><p class="item-price">Total: ₹${order.total}</p></article>`).join('')}</div>` : '<p>No previous orders yet.</p>'
  return `<div class="products-layout"><section class="page-card section-block"><h1>Your Cart</h1>${items}</section><section class="page-card section-block"><h2>Place Order</h2><p class="checkout-delivery-note">Delivery: ₹49 per order, plus 5% GST. We’ll confirm service area and delivery timing for your address.</p><form class="contact-form" id="order-form"><label for="order-name">Full Name</label><input id="order-name" name="name" autocomplete="name" required><label for="order-phone">Phone Number</label><input id="order-phone" name="phone" type="tel" autocomplete="tel" required><label for="order-address">Delivery Address</label><textarea id="order-address" name="address" rows="4" autocomplete="street-address" required></textarea><fieldset class="payment-options"><legend>Payment Method</legend><label><input type="radio" name="paymentMethod" value="cod" checked>Cash on Delivery</label><label><input type="radio" name="paymentMethod" value="online">Online payment (UPI, cards; subject to availability)</label></fieldset><button type="submit" ${state.cartItems.length ? '' : 'disabled'}>Place Order</button></form><p class="form-success" id="order-success" hidden></p></section><section class="page-card section-block"><h2>Order History</h2>${history}</section></div>`
}

function contactPage() {
  return `<section class="page-card section-block contact-page"><h1>Contact Us</h1><div class="contact-details"><p>Email: <a href="mailto:hello@pahaditokri.com">hello@pahaditokri.com</a></p><p>Phone: <a href="tel:+917018777497">7018777497</a></p><p>WhatsApp: <a class="btn primary whatsapp-link" href="https://wa.me/917018777497?text=Hello%20PahadiTokri%2C%20I%27d%20like%20to%20get%20in%20touch." target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></p><p>Address: Karal, Kotkhai, Shimla, Himachal Pradesh</p></div><form class="contact-form" id="contact-form"><label for="name">Name</label><input id="name" name="name" required><label for="email">Email</label><input id="email" name="email" type="email" required><label for="message">Message</label><textarea id="message" name="message" rows="4" required></textarea><button type="submit">Send Message</button></form><p class="form-success" id="contact-success" hidden>Thank you for contacting PahadiTokri. We will reach out soon.</p></section>`
}

function authPage(mode) {
  const isRegister = mode === 'register'
  return `<section class="page-card section-block auth-page"><p class="eyebrow">PahadiTokri Account</p><h1>${isRegister ? 'Create your account' : 'Welcome back'}</h1><p>${isRegister ? 'Register to keep your details ready for every order.' : 'Login to continue shopping with PahadiTokri.'}</p><form class="contact-form" id="${isRegister ? 'register-form' : 'login-form'}">${isRegister ? '<label for="auth-name">Full Name</label><input id="auth-name" name="name" autocomplete="name" required>' : ''}<label for="auth-email">Email</label><input id="auth-email" name="email" type="email" autocomplete="email" required><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" minlength="8" autocomplete="${isRegister ? 'new-password' : 'current-password'}" required><button type="submit">${isRegister ? 'Register' : 'Login'}</button></form><p class="auth-switch">${isRegister ? `Already have an account? ${link('/login', 'Login')}` : `New to PahadiTokri? ${link('/register', 'Create an account')}`}</p><p class="form-success" id="auth-success" hidden></p></section>`
}

function adminPage() {
  if (!state.admin) {
    return `<section class="page-card section-block auth-page"><p class="eyebrow">Store management</p><h1>Admin login</h1><p>Sign in to manage product and category images.</p><form class="contact-form" id="admin-login-form"><label for="admin-email">Admin email</label><input id="admin-email" name="email" type="email" autocomplete="username" required><label for="admin-password">Password</label><input id="admin-password" name="password" type="password" autocomplete="current-password" required><button type="submit">Sign in</button></form></section>`
  }

  const targets = state.adminImages.map((entry) => `<option value="${escapeHtml(entry.target)}">${escapeHtml(entry.label)}</option>`).join('')
  const imageCards = state.adminImages.map((entry) => `<article class="admin-image-card"><img src="${escapeHtml(entry.image)}" alt="${escapeHtml(entry.label)}" loading="lazy"><div><h3>${escapeHtml(entry.label)}</h3><p>${entry.customized ? 'Custom image' : 'Built-in image'}</p>${entry.customized ? `<button type="button" class="remove-btn" data-admin-image-delete="${escapeHtml(entry.target)}">Remove custom image</button>` : ''}</div></article>`).join('')
  return `<div class="admin-layout"><section class="page-card section-block"><p class="eyebrow">Store management</p><h1>Manage storefront images</h1><p>Upload an image for a product or category. Removing a custom image restores the built-in image.</p><form class="contact-form" id="admin-image-form"><label for="admin-image-target">Image placement</label><select id="admin-image-target" name="target" required>${targets}</select><label for="admin-image-file">Image file (JPEG, PNG, WebP, or GIF; up to 2 MB)</label><input id="admin-image-file" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required><button type="submit" ${state.adminImagesLoaded ? '' : 'disabled'}>Upload image</button></form></section><section class="page-card section-block"><h2>Current images</h2>${state.adminImagesLoaded ? `<div class="admin-image-grid">${imageCards}</div>` : '<p>Loading image list…</p>'}</section></div>`
}

function pageContent(path) {
  if (path === '/') return homePage()
  if (path === '/about') return aboutPage()
  if (path === '/farm') return farmStoriesPage()
  if (path === '/products') return productsPage()
  if (path.startsWith('/products/')) return categoryPage(path.split('/')[2])
  if (path === '/cart') return cartPage()
  if (path === '/contact-us') return contactPage()
  if (path === '/login') return authPage('login')
  if (path === '/register') return authPage('register')
  if (path === '/admin') return adminPage()
  return homePage()
}

function render() {
  mediaObserver?.disconnect()
  root.querySelectorAll('video[data-auto-play]').forEach((video) => video.pause())
  const path = window.location.pathname
  root.innerHTML = `<div class="site-shell">${header()}<main class="site-main">${pageContent(path)}</main><footer class="site-footer"><p>© ${new Date().getFullYear()} PahadiTokri. Freshness Delivered Daily.</p></footer></div><a class="floating-whatsapp" href="${whatsappLink('Hello PahadiTokri, I have a question about an order.')}" target="_blank" rel="noopener noreferrer" aria-label="Contact PahadiTokri on WhatsApp">WhatsApp</a><div id="toast-container" aria-live="polite"></div>`
  const search = document.querySelector('#product-search')
  if (search) applyCatalogFilters()
  mediaObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const card = entry.target
      const video = card.querySelector('video[data-auto-play]')
      const toggle = card.querySelector('[data-video-toggle]')
      if (entry.isIntersecting) {
        card.classList.add('in-view')
        if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          video.play().then(() => {
            card.classList.add('is-playing')
            if (toggle) toggle.textContent = 'Pause Video'
          }).catch(() => {
            card.classList.remove('is-playing')
            if (toggle) toggle.textContent = 'Play Video'
          })
        }
      } else {
        card.classList.remove('is-playing')
        if (video) {
          video.pause()
          if (toggle) toggle.textContent = 'Play Video'
        }
        card.classList.remove('in-view')
      }
    }
  }, { threshold: 0.25 })
  document.querySelectorAll('.hero-section, .section-block, .video-card, .farm-media-card, .photo-story-card, .catalog-product-card').forEach((card) => {
    mediaObserver.observe(card)
  })
  if (path === '/admin' && state.admin && !state.adminImagesLoaded) void loadAdminImages()
}

async function loadAdminImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/images`, {
      headers: { Authorization: `Bearer ${state.admin.token}` },
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Images could not be loaded.')
    state.adminImages = result.images
    state.adminImagesLoaded = true
    if (window.location.pathname === '/admin') render()
  } catch (error) {
    showToast(error.message || 'Images could not be loaded.', 'error')
    if (error.message === 'Admin login is required.') {
      state.admin = null
      state.adminImagesLoaded = false
      saveState()
      if (window.location.pathname === '/admin') render()
    }
  }
}

function findItem(reference) {
  const [slug, itemName] = reference.split('|')
  const category = productCategories.find((entry) => entry.slug === slug)
  return category ? { item: category.items.find((entry) => entry.name === itemName), category } : null
}

function addToCart(reference, replace = false, quantity = 1) {
  const found = findItem(reference)
  if (!found?.item) return
  const selectedQuantity = Math.max(1, Math.min(99, Number(quantity) || 1))
  const newItem = itemWithCartData(found.item, found.category.name, selectedQuantity)
  if (replace) state.cartItems = [newItem]
  else {
    const existing = state.cartItems.find((item) => item.id === newItem.id)
    state.cartItems = existing ? state.cartItems.map((item) => item.id === newItem.id ? { ...item, quantity: Math.min(99, item.quantity + selectedQuantity) } : item) : [...state.cartItems, newItem]
  }
  saveState()
  render()
  if (replace) navigate('/cart')
}

function navigate(path) {
  window.history.pushState({}, '', path)
  render()
}

document.addEventListener('click', (event) => {
  const adminLogout = event.target.closest('[data-admin-logout]')
  if (adminLogout) {
    state.admin = null
    state.adminImages = []
    state.adminImagesLoaded = false
    saveState()
    navigate('/')
    showToast('Admin logged out')
    return
  }
  const logout = event.target.closest('[data-logout]')
  if (logout) {
    state.auth = null
    saveState()
    navigate('/')
    showToast('Logged out')
    return
  }
  const route = event.target.closest('[data-route]')
  if (route) { event.preventDefault(); const label = route.textContent.trim(); navigate(route.getAttribute('href')); showToast(`Opening ${label}`); return }
  const farmFilter = event.target.closest('[data-farm-filter]')
  if (farmFilter) {
    const selectedFilter = farmFilter.dataset.farmFilter
    document.querySelectorAll('[data-farm-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button === farmFilter)))
    const cards = [...document.querySelectorAll('.farm-media-card')]
    cards.forEach((card) => {
      card.hidden = selectedFilter !== 'all' && card.dataset.mediaType !== selectedFilter
      if (card.hidden) card.querySelector('video[data-auto-play]')?.pause()
    })
    const visibleCount = cards.filter((card) => !card.hidden).length
    document.querySelector('#farm-result-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'story' : 'stories'}`
    return
  }
  const add = event.target.closest('[data-add]')
  if (add) {
    const quantity = add.closest('[data-product-card]')?.querySelector('[data-product-quantity]')?.value || 1
    addToCart(add.dataset.add, false, quantity)
    markClicked(add, 'Added to cart')
    return
  }
  const buy = event.target.closest('[data-buy]')
  if (buy) { addToCart(buy.dataset.buy, true); markClicked(buy, 'Opening checkout'); return }
  const increase = event.target.closest('[data-increase]')
  if (increase) { state.cartItems = state.cartItems.map((item) => item.id === increase.dataset.increase ? { ...item, quantity: item.quantity + 1 } : item); saveState(); render(); showToast('Quantity increased'); return }
  const decrease = event.target.closest('[data-decrease]')
  if (decrease) { state.cartItems = state.cartItems.map((item) => item.id === decrease.dataset.decrease ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0); saveState(); render(); showToast('Quantity decreased'); return }
  const remove = event.target.closest('[data-remove]')
  if (remove) { state.cartItems = state.cartItems.filter((item) => item.id !== remove.dataset.remove); saveState(); render(); showToast('Item removed'); return }
  const removeAdminImage = event.target.closest('[data-admin-image-delete]')
  if (removeAdminImage) {
    void removeManagedImage(removeAdminImage.dataset.adminImageDelete)
    return
  }
  const toggle = event.target.closest('[data-video-toggle]')
  if (toggle) {
    const card = toggle.closest('.hero-section, .video-card, .farm-media-card')
    const video = card?.querySelector('video')
    if (!video) return
    if (video.paused) {
      video.play().then(() => {
        card.classList.add('is-playing')
        toggle.textContent = 'Pause Video'
      }).catch(() => showToast('This video could not be played.', 'error'))
      markClicked(toggle, 'Video playing')
    } else {
      video.pause()
      card.classList.remove('is-playing')
      toggle.textContent = 'Play Video'
      markClicked(toggle, 'Video paused')
    }
  }
})

function applyCatalogFilters() {
  const searchTerm = document.querySelector('#product-search')?.value.trim().toLowerCase() || ''
  const category = document.querySelector('#product-category-filter')?.value || ''
  const minimum = Number(document.querySelector('#product-min-price')?.value) || 0
  const maximumInput = document.querySelector('#product-max-price')?.value
  const maximum = maximumInput === '' || maximumInput == null ? Infinity : Number(maximumInput)
  const cards = [...document.querySelectorAll('[data-product-card]')]
  let visibleCount = 0
  cards.forEach((card) => {
    const visible = card.dataset.name.includes(searchTerm)
      && (!category || card.dataset.category === category)
      && Number(card.dataset.price) >= minimum
      && Number(card.dataset.price) <= maximum
    card.hidden = !visible
    if (visible) visibleCount += 1
  })
  const results = document.querySelector('#catalog-results')
  if (results) results.textContent = `${visibleCount} ${visibleCount === 1 ? 'product' : 'products'}`
  const empty = document.querySelector('#catalog-empty')
  if (empty) empty.hidden = visibleCount > 0
}

document.addEventListener('input', (event) => {
  if (event.target.matches('#product-search, #product-min-price, #product-max-price')) applyCatalogFilters()
})

document.addEventListener('change', (event) => {
  if (event.target.matches('#product-category-filter')) applyCatalogFilters()
})

document.addEventListener('submit', async (event) => {
  if (event.target.id === 'admin-login-form') {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Admin login failed.')
      state.admin = result
      state.adminImages = []
      state.adminImagesLoaded = false
      saveState()
      render()
      showToast('Welcome, admin')
    } catch (error) {
      showToast(error.message || 'Admin login failed.', 'error')
    }
    return
  }
  if (event.target.id === 'admin-image-form') {
    event.preventDefault()
    const formData = new FormData(event.target)
    const file = formData.get('image')
    if (!(file instanceof File) || !file.size) {
      showToast('Select an image to upload.', 'error')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('Images must be 2 MB or smaller.', 'error')
      return
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/images?target=${encodeURIComponent(formData.get('target'))}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.admin.token}`,
          'Content-Type': file.type,
        },
        body: file,
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Image could not be uploaded.')
      event.target.reset()
      state.adminImagesLoaded = false
      await loadCatalogImages()
      await loadAdminImages()
      showToast('Image uploaded')
    } catch (error) {
      showToast(error.message || 'Image could not be uploaded.', 'error')
    }
    return
  }
  if (event.target.id === 'register-form' || event.target.id === 'login-form') {
    event.preventDefault()
    const isRegister = event.target.id === 'register-form'
    const formData = Object.fromEntries(new FormData(event.target))
    const response = await fetch(`${API_BASE_URL}/api/auth/${isRegister ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(() => null)
    const result = response ? await response.json().catch(() => ({})) : {}
    if (!response?.ok) {
      showToast(result.error || 'Unable to connect to the account service.', 'error')
      return
    }
    state.auth = result
    saveState()
    navigate('/')
    showToast(isRegister ? 'Account created' : 'Welcome back')
    return
  }
  if (event.target.id === 'contact-form') {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    await fetch(`${API_BASE_URL}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(() => null)
    event.target.reset()
    document.querySelector('#contact-success').hidden = false
    showToast('Message sent')
  }
  if (event.target.id === 'order-form') {
    event.preventDefault()
    if (!state.cartItems.length) return
    const form = event.target
    const submitButton = form.querySelector('button[type="submit"]')
    const formData = Object.fromEntries(new FormData(form))
    submitButton.disabled = true
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name: formData.name, phone: formData.phone, address: formData.address },
          paymentMethod: formData.paymentMethod,
          items: state.cartItems.map((item) => ({ sku: item.sku, quantity: item.quantity })),
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Order could not be placed.')
      if (formData.paymentMethod === 'cod') {
        completeOrder(result.order, formData.paymentMethod)
        return
      }
      await loadRazorpayCheckout()
      if (!result.checkout?.keyId || !result.checkout?.orderId) {
        throw new Error('Online checkout is not configured. Please choose Cash on Delivery.')
      }
      const checkout = new window.Razorpay({
        key: result.checkout.keyId,
        order_id: result.checkout.orderId,
        amount: result.checkout.amount,
        currency: result.checkout.currency,
        name: 'PahadiTokri',
        description: `Order ${result.order.orderId}`,
        image: new URL(pahadiTokriLogo, window.location.href).href,
        prefill: { name: formData.name, contact: formData.phone },
        theme: { color: '#0e7a4d' },
        handler: async (payment) => {
          try {
            const verificationResponse = await fetch(`${API_BASE_URL}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: result.order.orderId,
                razorpayOrderId: payment.razorpay_order_id,
                razorpayPaymentId: payment.razorpay_payment_id,
                razorpaySignature: payment.razorpay_signature,
              }),
            })
            const verification = await verificationResponse.json().catch(() => ({}))
            if (!verificationResponse.ok) throw new Error(verification.error || 'Payment could not be verified.')
            completeOrder(result.order, formData.paymentMethod)
          } catch (error) {
            submitButton.disabled = false
            showToast(error.message || 'Payment verification failed. Your cart is unchanged.', 'error')
          }
        },
        modal: { ondismiss: () => { submitButton.disabled = false } },
      })
      checkout.on('payment.failed', (payment) => {
        submitButton.disabled = false
        showToast(payment.error?.description || 'Payment failed. Please try again.', 'error')
      })
      checkout.open()
    } catch (error) {
      submitButton.disabled = false
      showToast(error.message || 'Unable to place your order. Please try again.', 'error')
      return
    }
  }
})

async function removeManagedImage(target) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/images/${encodeURIComponent(target)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${state.admin.token}` },
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Image could not be removed.')
    state.adminImagesLoaded = false
    await loadCatalogImages()
    await loadAdminImages()
    showToast('Custom image removed')
  } catch (error) {
    showToast(error.message || 'Image could not be removed.', 'error')
  }
}

function completeOrder(order, paymentMethod) {
  const itemCount = cartItemCount()
  state.orderHistory = [{
    orderId: order.orderId,
    customerName: order.customerName,
    paymentMethod,
    total: Number(order.total).toFixed(2),
    itemCount,
    createdAt: new Date().toLocaleString(),
  }, ...state.orderHistory].slice(0, 10)
  state.cartItems = []
  saveState()
  render()
  const success = document.querySelector('#order-success')
  if (success) {
    success.textContent = `Your order has been placed successfully. Order ID: ${order.orderId}. Thank you for shopping with PahadiTokri. To send your order details, `
    const message = [
      `Hello PahadiTokri, I placed order ${order.orderId}.`,
      `Items: ${order.items.map((item) => `${item.name} x ${item.quantity} kg`).join(', ')}`,
      `Total: ₹${Number(order.total).toFixed(2)}`,
      `Payment: ${paymentMethod.toUpperCase()}`,
    ].join('\n')
    const confirmationLink = document.createElement('a')
    confirmationLink.href = whatsappLink(message)
    confirmationLink.target = '_blank'
    confirmationLink.rel = 'noopener noreferrer'
    confirmationLink.textContent = 'confirm on WhatsApp'
    success.append(confirmationLink)
    success.hidden = false
  }
  showToast(paymentMethod === 'cod' ? 'Order placed successfully' : 'Payment successful')
}

window.addEventListener('popstate', render)
render()
loadCatalogImages().catch((error) => console.error(error))

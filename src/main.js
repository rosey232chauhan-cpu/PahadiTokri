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
].map((category) => ({ ...category, items: category.items.map(([name, price, info, image]) => ({ name, price, info, image })) }))

const showcaseVideos = [
  { title: 'Fresh Harvest Journey', description: 'A glimpse of fresh produce moving from farms to your table.', url: 'https://videos.pexels.com/video-files/5948573/5948573-hd_1920_1080_25fps.mp4' },
  { title: 'Healthy Food Lifestyle', description: 'Natural ingredients and healthy daily choices in motion.', url: 'https://videos.pexels.com/video-files/3195650/3195650-hd_1920_1080_25fps.mp4' },
]

const state = {
  cartItems: JSON.parse(localStorage.getItem('pahaditokri_cart') || '[]'),
  orderHistory: JSON.parse(localStorage.getItem('pahaditokri_orders') || '[]'),
  auth: JSON.parse(localStorage.getItem('pahaditokri_auth') || 'null'),
}
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const root = document.querySelector('#root')
let razorpayScriptPromise
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
const parsePrice = (price) => Number(price.replace(/[^0-9.]/g, '')) || 0
const itemWithCartData = (item, categoryName, quantity = 1) => ({ ...item, id: `${categoryName}-${item.name}`, sku: `${categoryName}-${item.name}`.toLowerCase().replaceAll(' ', '-'), categoryName, quantity, priceNumber: parsePrice(item.price) })
const saveState = () => {
  localStorage.setItem('pahaditokri_cart', JSON.stringify(state.cartItems))
  localStorage.setItem('pahaditokri_orders', JSON.stringify(state.orderHistory))
  localStorage.setItem('pahaditokri_auth', JSON.stringify(state.auth))
}
const cartItemCount = () => state.cartItems.reduce((total, item) => total + item.quantity, 0)
const link = (path, label, className = '') => `<a href="${path}" class="${className}" data-route>${label}</a>`

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
  const accountLinks = state.auth ? `<span class="account-name">Hi, ${escapeHtml(state.auth.user.name)}</span><button type="button" class="header-action" data-logout>Logout</button>` : `${link('/login', 'Login')} ${link('/register', 'Register')}`
  return `<header class="site-header"><div class="brand"><img src="${pahadiTokriLogo}" alt="PahadiTokri logo"></div><nav>${link('/', 'Home')} ${link('/about', 'About')} ${link('/products', 'Products')} ${link('/cart', `Cart (${cartItemCount()})`)} ${link('/contact-us', 'Contact Us')} ${accountLinks}</nav></header>`
}

function homePage() {
  const featured = [
    ['Farm Fresh Fruit Box', 'A weekly mix of seasonal fruits sourced from trusted farms.', productCategories[0].items[0].image],
    ['Breakfast Energy Pack', 'Bananas, apples, oranges, and berries for a healthy start.', productCategories[0].items[1].image],
    ['Immunity Booster Basket', 'Vitamin-rich citrus, pomegranate, and kiwi in one bundle.', productCategories[0].items[3].image],
  ]
  return `<div class="home-layout"><section class="hero-section"><div><img class="home-brand-logo" src="${pahadiTokriLogo}" alt="PahadiTokri brand logo"><p class="eyebrow">Fresh Every Morning</p><h1>Organic Fruit Delivery for the Modern Home</h1><p class="hero-copy">PahadiTokri delivers freshly harvested fruits to your doorstep with a clean, reliable, and quality-first experience.</p><div class="hero-actions">${link('/products', 'Explore Products', 'btn primary')}${link('/contact-us', 'Contact Sales', 'btn secondary')}</div></div><div class="hero-visual"><img src="${productCategories[0].image}" alt="Fresh seasonal fruit harvest" fetchpriority="high"></div></section><section class="section-block"><h2>Why Families Choose PahadiTokri</h2><div class="highlight-row">${['100% handpicked produce', 'Direct from local growers', 'Fast same-day dispatch'].map((item) => `<article class="info-chip"><p>${item}</p></article>`).join('')}</div></section><section class="section-block"><h2>Featured Fruit Collections</h2><div class="product-grid">${featured.map(([name, description, image]) => `<article class="product-card"><img src="${image}" alt="${name}" loading="lazy"><div class="product-card-content"><h3>${name}</h3><p>${description}</p></div></article>`).join('')}</div></section><section class="section-block"><h2>PahadiTokri In Motion</h2><div class="video-showcase-grid">${showcaseVideos.map((video) => `<article class="video-card"><video autoplay muted loop playsinline preload="metadata"><source src="${video.url}" type="video/mp4"></video><div class="video-card-content"><h3>${video.title}</h3><p>${video.description}</p><button type="button" class="video-control-btn" data-video-toggle>Pause Video</button></div></article>`).join('')}</div></section></div>`
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
  return `<div class="products-layout"><section class="page-card section-block products-hero"><p class="eyebrow">Curated Categories</p><h1>Our Products</h1><p>Explore premium Himalayan produce categories crafted for taste, nutrition, and everyday healthy living.</p></section><section class="product-category-grid">${productCategories.map((category) => `<a class="product-category-link" href="/products/${category.slug}" data-route><article class="product-category-card"><img src="${category.image}" alt="${category.name}" loading="lazy"><div class="product-category-content"><h3>${category.name}</h3><p>${category.description}</p></div></article></a>`).join('')}</section></div>`
}

function categoryPage(slug) {
  const category = productCategories.find((entry) => entry.slug === slug)
  if (!category) return `<section class="page-card section-block"><h1>Category Not Found</h1><p>Please go back to our products page and choose a valid category.</p>${link('/products', 'Back to Products', 'btn primary')}</section>`
  return `<div class="products-layout"><section class="page-card section-block products-hero"><p class="eyebrow">Category Details</p><h1>${category.name}</h1><p>${category.description}</p></section><section class="category-item-grid">${category.items.map((item) => `<article class="category-item-card"><img src="${item.image}" alt="${item.name}" loading="lazy"><h3>${item.name}</h3><p class="item-price">${item.price}</p><p>${item.info}</p><div class="item-actions"><button type="button" class="btn secondary action-btn" data-add="${category.slug}|${item.name}">Add to Cart</button><button type="button" class="btn primary action-btn" data-buy="${category.slug}|${item.name}">Buy Now</button></div></article>`).join('')}</section></div>`
}

function cartPage() {
  const subtotal = state.cartItems.reduce((total, item) => total + item.priceNumber * item.quantity, 0)
  const shipping = subtotal > 0 ? 49 : 0
  const gst = subtotal * 0.05
  const total = subtotal + shipping + gst
  const items = state.cartItems.length ? `<div class="cart-item-list">${state.cartItems.map((item) => `<article class="cart-item-card"><img src="${item.image}" alt="${item.name}" loading="lazy"><div class="cart-item-content"><h3>${item.name}</h3><p>${item.categoryName}</p><p class="item-price">${item.price}</p><div class="qty-controls"><button type="button" data-decrease="${item.id}">-</button><span>${item.quantity}</span><button type="button" data-increase="${item.id}">+</button></div></div><button type="button" class="remove-btn" data-remove="${item.id}">Remove</button></article>`).join('')}</div><div class="bill-breakdown"><p><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></p><p><span>Shipping</span><span>₹${shipping.toFixed(2)}</span></p><p><span>GST (5%)</span><span>₹${gst.toFixed(2)}</span></p><p class="cart-total"><span>Total</span><span>₹${total.toFixed(2)}</span></p></div>` : '<p>Your cart is empty. Add products to place an order.</p>'
  const history = state.orderHistory.length ? `<div class="order-history-list">${state.orderHistory.map((order) => `<article class="order-history-card"><h3>${order.orderId}</h3><p>${order.createdAt}</p><p>Customer: ${escapeHtml(order.customerName)}</p><p>Items: ${order.itemCount}</p><p>Payment: ${order.paymentMethod.toUpperCase()}</p><p class="item-price">Total: ₹${order.total}</p></article>`).join('')}</div>` : '<p>No previous orders yet.</p>'
  return `<div class="products-layout"><section class="page-card section-block"><h1>Your Cart</h1>${items}</section><section class="page-card section-block"><h2>Place Order</h2><form class="contact-form" id="order-form"><label for="order-name">Full Name</label><input id="order-name" name="name" autocomplete="name" required><label for="order-phone">Phone Number</label><input id="order-phone" name="phone" type="tel" autocomplete="tel" required><label for="order-address">Delivery Address</label><textarea id="order-address" name="address" rows="4" autocomplete="street-address" required></textarea><fieldset class="payment-options"><legend>Payment Method</legend><label><input type="radio" name="paymentMethod" value="cod" checked>Cash on Delivery</label><label><input type="radio" name="paymentMethod" value="online">Online payment (Google Pay, UPI, cards)</label></fieldset><button type="submit" ${state.cartItems.length ? '' : 'disabled'}>Place Order</button></form><p class="form-success" id="order-success" hidden></p></section><section class="page-card section-block"><h2>Order History</h2>${history}</section></div>`
}

function contactPage() {
  return `<section class="page-card section-block contact-page"><h1>Contact Us</h1><div class="contact-details"><p>Email: <a href="mailto:hello@pahaditokri.com">hello@pahaditokri.com</a></p><p>Phone: <a href="tel:+917018777497">7018777497</a></p><p>WhatsApp: <a class="btn primary whatsapp-link" href="https://wa.me/917018777497?text=Hello%20PahadiTokri%2C%20I%27d%20like%20to%20get%20in%20touch." target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></p><p>Address: Karal, Kotkhai, Shimla, Himachal Pradesh</p></div><form class="contact-form" id="contact-form"><label for="name">Name</label><input id="name" name="name" required><label for="email">Email</label><input id="email" name="email" type="email" required><label for="message">Message</label><textarea id="message" name="message" rows="4" required></textarea><button type="submit">Send Message</button></form><p class="form-success" id="contact-success" hidden>Thank you for contacting PahadiTokri. We will reach out soon.</p></section>`
}

function authPage(mode) {
  const isRegister = mode === 'register'
  return `<section class="page-card section-block auth-page"><p class="eyebrow">PahadiTokri Account</p><h1>${isRegister ? 'Create your account' : 'Welcome back'}</h1><p>${isRegister ? 'Register to keep your details ready for every order.' : 'Login to continue shopping with PahadiTokri.'}</p><form class="contact-form" id="${isRegister ? 'register-form' : 'login-form'}">${isRegister ? '<label for="auth-name">Full Name</label><input id="auth-name" name="name" autocomplete="name" required>' : ''}<label for="auth-email">Email</label><input id="auth-email" name="email" type="email" autocomplete="email" required><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" minlength="8" autocomplete="${isRegister ? 'new-password' : 'current-password'}" required><button type="submit">${isRegister ? 'Register' : 'Login'}</button></form><p class="auth-switch">${isRegister ? `Already have an account? ${link('/login', 'Login')}` : `New to PahadiTokri? ${link('/register', 'Create an account')}`}</p><p class="form-success" id="auth-success" hidden></p></section>`
}

function pageContent(path) {
  if (path === '/') return homePage()
  if (path === '/about') return aboutPage()
  if (path === '/products') return productsPage()
  if (path.startsWith('/products/')) return categoryPage(path.split('/')[2])
  if (path === '/cart') return cartPage()
  if (path === '/contact-us') return contactPage()
  if (path === '/login') return authPage('login')
  if (path === '/register') return authPage('register')
  return homePage()
}

function render() {
  const path = window.location.pathname
  root.innerHTML = `<div class="site-shell">${header()}<main class="site-main">${pageContent(path)}</main><footer class="site-footer"><p>© ${new Date().getFullYear()} PahadiTokri. Freshness Delivered Daily.</p></footer></div><div id="toast-container" aria-live="polite"></div>`
  document.querySelectorAll('.video-card').forEach((card) => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { card.classList.add('in-view'); observer.disconnect() } }, { threshold: 0.25 })
    observer.observe(card)
  })
}

function findItem(reference) {
  const [slug, itemName] = reference.split('|')
  const category = productCategories.find((entry) => entry.slug === slug)
  return category ? { item: category.items.find((entry) => entry.name === itemName), category } : null
}

function addToCart(reference, replace = false) {
  const found = findItem(reference)
  if (!found?.item) return
  const newItem = itemWithCartData(found.item, found.category.name)
  if (replace) state.cartItems = [newItem]
  else {
    const existing = state.cartItems.find((item) => item.id === newItem.id)
    state.cartItems = existing ? state.cartItems.map((item) => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item) : [...state.cartItems, newItem]
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
  const add = event.target.closest('[data-add]')
  if (add) { addToCart(add.dataset.add); markClicked(add, 'Added to cart'); return }
  const buy = event.target.closest('[data-buy]')
  if (buy) { addToCart(buy.dataset.buy, true); markClicked(buy, 'Opening checkout'); return }
  const increase = event.target.closest('[data-increase]')
  if (increase) { state.cartItems = state.cartItems.map((item) => item.id === increase.dataset.increase ? { ...item, quantity: item.quantity + 1 } : item); saveState(); render(); showToast('Quantity increased'); return }
  const decrease = event.target.closest('[data-decrease]')
  if (decrease) { state.cartItems = state.cartItems.map((item) => item.id === decrease.dataset.decrease ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0); saveState(); render(); showToast('Quantity decreased'); return }
  const remove = event.target.closest('[data-remove]')
  if (remove) { state.cartItems = state.cartItems.filter((item) => item.id !== remove.dataset.remove); saveState(); render(); showToast('Item removed'); return }
  const toggle = event.target.closest('[data-video-toggle]')
  if (toggle) { const video = toggle.closest('.video-card').querySelector('video'); if (video.paused) { video.play(); toggle.textContent = 'Pause Video'; markClicked(toggle, 'Video playing') } else { video.pause(); toggle.textContent = 'Play Video'; markClicked(toggle, 'Video paused') } }
})

document.addEventListener('submit', async (event) => {
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
    success.textContent = `Your order has been placed successfully. Order ID: ${order.orderId}. Thank you for shopping with PahadiTokri.`
    success.hidden = false
  }
  showToast(paymentMethod === 'cod' ? 'Order placed successfully' : 'Payment successful')
}

window.addEventListener('popstate', render)
render()

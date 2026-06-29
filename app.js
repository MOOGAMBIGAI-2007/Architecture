const products = [
  {
    id: 1,
    name: "Aurora Bottle",
    category: "Wellness",
    price: 42,
    image: "assets/aurora-bottle.svg",
    blurb: "Sculpted for daily routines with a matte finish and soft grip.",
  },
  {
    id: 2,
    name: "Lumen Lamp",
    category: "Home",
    price: 89,
    image: "assets/lumen-lamp.svg",
    blurb: "A warm glow that makes your evening setup feel cinematic.",
  },
  {
    id: 3,
    name: "Echo Chair",
    category: "Furniture",
    price: 129,
    image: "assets/echo-chair.svg",
    blurb: "Comfort-led design with a compact footprint for modern spaces.",
  },
  {
    id: 4,
    name: "Atlas Backpack",
    category: "Travel",
    price: 74,
    image: "assets/atlas-backpack.svg",
    blurb: "Built for movement, with smart compartments and weather-ready fabric.",
  },
];

let cart = [];
let activeFilter = "All";

const app = document.getElementById("app");
const cartCount = document.getElementById("cartCount");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  cartCount.textContent = getCartCount();
}

function navigate(path) {
  window.location.hash = path;
}

function routeFromHash() {
  const hash = window.location.hash.replace("#", "") || "/";
  return hash.startsWith("/") ? hash : `/${hash}`;
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Curated essentials for modern living</p>
        <h1>Design-forward products that simplify every day.</h1>
        <p>Discover a fast, premium storefront built for effortless browsing, quick checkout, and standout presentation.</p>
        <div class="hero-buttons">
          <a class="btn" href="#/shop">Shop collection</a>
          <a class="btn-ghost" href="#/about">Why Northstar</a>
        </div>
      </div>
      <div class="hero-media">
        <img src="assets/aurora-bottle.svg" alt="Featured product" loading="eager" />
      </div>
    </section>

    <section class="stats-grid" aria-label="Highlights">
      <div class="stat">
        <strong>24h</strong>
        <span>Lightning-fast browsing</span>
      </div>
      <div class="stat">
        <strong>4.9/5</strong>
        <span>Rated by early adopters</span>
      </div>
      <div class="stat">
        <strong>100%</strong>
        <span>Responsive across devices</span>
      </div>
    </section>

    <div class="section-title">
      <h2>Featured picks</h2>
      <a class="btn-ghost" href="#/shop">Browse all</a>
    </div>
    <div class="products-grid">
      ${products.slice(0, 3).map(productCard).join("")}
    </div>
  `;
}

function renderShop() {
  const visibleProducts = activeFilter === "All"
    ? products
    : products.filter((product) => product.category === activeFilter);

  app.innerHTML = `
    <section class="panel">
      <div class="filter-bar" role="toolbar" aria-label="Product filters">
        ${["All", ...new Set(products.map((product) => product.category))].map((filter) => `
          <button class="filter-chip ${filter === activeFilter ? "active" : ""}" data-filter="${filter}">
            ${filter}
          </button>
        `).join("")}
      </div>

      <div class="shop-layout">
        <div>
          <div class="products-grid">
            ${visibleProducts.map(productCard).join("")}
          </div>
        </div>

        <aside class="cart-summary panel" aria-label="Shopping cart">
          <h2>Your basket</h2>
          ${cart.length ? cart.map((item) => `
            <div class="cart-item">
              <div>
                <strong>${item.name}</strong>
                <div class="price">${formatCurrency(item.price)} × ${item.qty}</div>
              </div>
              <strong>${formatCurrency(item.price * item.qty)}</strong>
            </div>
          `).join("") : "<p>No items selected yet.</p>"}
          <div class="cart-item">
            <strong>Total</strong>
            <strong>${formatCurrency(cart.reduce((sum, item) => sum + item.price * item.qty, 0))}</strong>
          </div>
          <button class="btn">Proceed to checkout</button>
        </aside>
      </div>
    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    <section class="panel">
      <h2>Built for clarity and speed</h2>
      <p>Northstar Studio combines thoughtful design with a streamlined experience, turning product discovery into a calm, intuitive journey.</p>
      <div class="products-grid">
        <article class="product-card">
          <div class="product-info">
            <h3>Modular architecture</h3>
            <p>Reusable components and route-based views keep the UI maintainable as the catalog grows.</p>
          </div>
        </article>
        <article class="product-card">
          <div class="product-info">
            <h3>Performance-first assets</h3>
            <p>Optimized local SVG illustrations and lightweight interactions keep the experience snappy.</p>
          </div>
        </article>
        <article class="product-card">
          <div class="product-info">
            <h3>Ready for deployment</h3>
            <p>The app is built as a static site, making it easy to launch on Vercel, Netlify, or Render.</p>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderContact() {
  app.innerHTML = `
    <section class="contact-card">
      <div>
        <h2>Let’s talk about your next launch</h2>
        <p>We can help you create a polished storefront, launch a product collection, or transform a static idea into a memorable experience.</p>
        <p>Email: hello@northstarstudio.dev</p>
        <p>Location: Remote • Worldwide</p>
      </div>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea rows="4" placeholder="Tell us what you need"></textarea>
        <button class="btn" type="button">Send inquiry</button>
      </form>
    </section>
  `;
}

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-info">
        <div class="product-meta">
          <span>${product.category}</span>
          <span class="price">${formatCurrency(product.price)}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.blurb}</p>
        <button class="add-btn" data-action="add" data-id="${product.id}">Add to cart</button>
      </div>
    </article>
  `;
}

function renderRoute() {
  const path = routeFromHash();
  const navLinks = document.querySelectorAll("[data-link]");
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${path}`;
    link.classList.toggle("active", isActive);
  });

  if (path === "/shop") {
    renderShop();
  } else if (path === "/about") {
    renderAbout();
  } else if (path === "/contact") {
    renderContact();
  } else {
    renderHome();
  }

  updateCartBadge();
}

function handleAppClick(event) {
  const button = event.target.closest("[data-action='add']");
  if (!button) return;

  const id = Number(button.getAttribute("data-id"));
  const selected = products.find((product) => product.id === id);
  if (!selected) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...selected, qty: 1 });
  }

  updateCartBadge();
  if (routeFromHash() === "/shop") {
    renderShop();
  }
}

app.addEventListener("click", handleAppClick);
window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", renderRoute);

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");
  if (!filterButton) return;
  activeFilter = filterButton.getAttribute("data-filter");
  renderShop();
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("DOMContentLoaded", renderRoute);

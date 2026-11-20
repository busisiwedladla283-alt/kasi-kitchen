"use client";

import React, { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  category: "all" | "kotas" | "traditional" | "grills" | "sides";
  description: string;
  price: number;
  tag: string;
  spice: string;
  prepTime: string;
  serves: string;
  image: string;
  fallbackEmoji: string;
  gradientClass: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "soweto-kota",
    name: "Classic Soweto Kota",
    category: "kotas",
    description:
      "Golden toasted quarter loaf packed with crisp hand-cut slap chips, smoked polony, fried egg, melted gouda cheese, and our signature tangy house sauce.",
    price: 45,
    tag: "Customer Favourite",
    spice: "Mild Zing",
    prepTime: "15 min",
    serves: "Single",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🥪",
    gradientClass: "dish-gradient-gold",
  },
  {
    id: "emperor-kota",
    name: "The King Extravaganza Kota",
    category: "kotas",
    description:
      "Quarter loaf stacked high with Russian sausage, double melted cheddar, crispy bacon strips, beef patty, slap chips, and spiced mango atchar.",
    price: 75,
    tag: "Chef's Signature",
    spice: "Medium Spice",
    prepTime: "18 min",
    serves: "Feeds 1-2",
    image:
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🥪",
    gradientClass: "dish-gradient-ember",
  },
  {
    id: "beef-stew-pap",
    name: "Slow-Braised Pap & Beef Stew",
    category: "traditional",
    description:
      "Tender, melt-in-your-mouth prime beef chunks slow-simmered for 4 hours in aromatic bone broth with carrots and garden herbs. Served with hot fluffy pap.",
    price: 85,
    tag: "Taste of Home",
    spice: "Savory Mild",
    prepTime: "Ready to Serve",
    serves: "Generous Plate",
    image:
      "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🍛",
    gradientClass: "dish-gradient-green",
  },
  {
    id: "mogodu-special",
    name: "Authentic Mala Mogodu",
    category: "traditional",
    description:
      "Traditional beef tripe prepared and cleansed with precision, gently simmered until velvety soft with black pepper and mild chili. Served with steaming pap or dombolo.",
    price: 95,
    tag: "Sunday Heritage",
    spice: "Rich Pepper",
    prepTime: "Ready to Serve",
    serves: "Hearty Portion",
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🍲",
    gradientClass: "dish-gradient-gold",
  },
  {
    id: "shisanyama-platter",
    name: "Flame-Grilled Shisanyama Platter",
    category: "grills",
    description:
      "Marinated chuck steak, coiled farm boerewors, and peri-peri chicken wings grilled over blazing red hardwood coals. Served with warm chakalaka.",
    price: 135,
    tag: "Woodfire Special",
    spice: "Spicy Braai",
    prepTime: "20 min",
    serves: "Feeds 2",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🥩",
    gradientClass: "dish-gradient-ember",
  },
  {
    id: "umleqwa-chicken",
    name: "Hardbody Umleqwa Chicken",
    category: "traditional",
    description:
      "Free-range traditional African country chicken slow-cooked with garden onions, bay leaf, and rich savoury golden broth. Pure comfort.",
    price: 90,
    tag: "Pure Tradition",
    spice: "Herbal Mild",
    prepTime: "Ready to Serve",
    serves: "Hearty Plate",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🍗",
    gradientClass: "dish-gradient-green",
  },
  {
    id: "loaded-fries",
    name: "Loaded Kasi Fries & Cheese",
    category: "sides",
    description:
      "Freshly sliced golden potato chips smothered in warm aged cheddar sauce, spring onions, and a sprinkle of secret braai seasoning.",
    price: 38,
    tag: "Crispy & Cheesy",
    spice: "Mild",
    prepTime: "10 min",
    serves: "Shareable",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🍟",
    gradientClass: "dish-gradient-gold",
  },
  {
    id: "chakalaka-slaw",
    name: "Spicy Chakalaka & Creamy Slaw",
    category: "sides",
    description:
      "Grated carrot, green peppers, baked beans, and curry relish paired with sweet chilled cabbage slaw. The ultimate accompaniment.",
    price: 30,
    tag: "Fresh Everyday",
    spice: "Medium Hot",
    prepTime: "Instant",
    serves: "Side Bowl",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    fallbackEmoji: "🥗",
    gradientClass: "dish-gradient-green",
  },
];

const CATEGORIES = [
  { id: "all", label: "Full Menu", icon: "✨" },
  { id: "kotas", label: "Loaded Kotas", icon: "🥪" },
  { id: "traditional", label: "Traditional & Stews", icon: "🍲" },
  { id: "grills", label: "Flame Grills", icon: "🔥" },
  { id: "sides", label: "Sides & Atchar", icon: "🥗" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    setToastMessage(`Added 1× ${item.name} to order`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const generateWhatsAppLink = () => {
    const orderLines = Object.entries(cart)
      .map(([id, qty]) => {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return item ? `• ${qty}x ${item.name} (R${item.price * qty})` : "";
      })
      .filter(Boolean);

    const message = encodeURIComponent(
      `Sawubona! I would like to place an order from Sister's Kitchen:\n\n${orderLines.join(
        "\n"
      )}\n\nTotal: R${cartTotal}\n\nPlease confirm availability and prep time. Ngiyabonga!`
    );

    return `https://wa.me/27720000000?text=${message}`;
  };

  return (
    <main>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Luxury Announcement Bar */}
      <div className="announcement-bar">
        <span className="announcement-badge">FRESH & HOT</span>
        <span>KASI FLAVOUR REDEFINED • WOODFIRED EMBERS & SLOW COOKED TRADITION</span>
        <span className="announcement-badge">FREE DELIVERY OVER R150</span>
      </div>

      {/* Sticky Glass Header */}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sister's Kitchen">
          <div className="brand-crest">SK</div>
          <div>
            <span className="brand-title">SISTER'S KITCHEN</span>
            <span className="brand-subtitle">HAUTE KASI KITCHEN</span>
          </div>
        </a>

        <nav className="main-nav" aria-label="Main Navigation">
          <a className="nav-link" href="#menu">Our Menu</a>
          <a className="nav-link" href="#story">The Craft</a>
          <a className="nav-link" href="#reviews">Reviews</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <div className="kitchen-status-pill">
            <span className="status-dot-pulse" />
            <span>Open • Prep ~20m</span>
          </div>

          <button
            className="cart-button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="View Order Basket"
          >
            <span>🛍️ Order</span>
            {totalCartCount > 0 && (
              <span className="cart-count-badge">{totalCartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-tag">
            <span>🇿🇦</span>
            <span>AUTHENTIC SOUTH AFRICAN GOURMET</span>
          </div>

          <h1 className="hero-heading">
            Savour the Soul of the <span className="gold-text">Kasi.</span>
          </h1>

          <p className="hero-paragraph">
            From towering loaded Kotas bursting with melted cheddar and secret
            atchar, to 4-hour slow-simmered beef stew and flame-kissed shisanyama.
            Prepared with heart, served with royal pride.
          </p>

          <div className="hero-cta-group">
            <a className="btn-primary" href="#menu">
              <span>Explore The Menu</span>
              <span>↓</span>
            </a>
            <a className="btn-secondary" href="#story">
              <span>Our Culinary Story</span>
              <span>↗</span>
            </a>
          </div>

          <div className="hero-proof">
            <div className="proof-item">
              <span>⭐</span>
              <div>
                <strong>4.9 / 5.0</strong>
                <div>1,400+ Kasi Foodies</div>
              </div>
            </div>
            <div className="proof-item">
              <span>🔥</span>
              <div>
                <strong>Hardwood Braai</strong>
                <div>Fresh Off The Coals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Plate Showcase Centerpiece */}
        <div className="hero-visual-wrapper">
          <div className="hero-glow-sphere" />

          {/* Floating Accents */}
          <div className="floating-hero-pill pill-left">
            <div className="floating-icon icon-fire">🔥</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--forest-900)" }}>
                Flame-Grilled
              </div>
              <div style={{ fontSize: "9px", color: "var(--charcoal-400)" }}>
                Wood embers
              </div>
            </div>
          </div>

          <div className="floating-hero-pill pill-right">
            <div className="floating-icon icon-chef">👑</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--forest-900)" }}>
                Secret Atchar
              </div>
              <div style={{ fontSize: "9px", color: "var(--charcoal-400)" }}>
                House blend
              </div>
            </div>
          </div>

          <div className="hero-plate-card">
            <div className="hero-dish-image-box">
              <span className="hero-ribbon">⭐ SIGNATURE DISH</span>
              <span className="hero-rating-badge">★ 4.9 (420+)</span>
              <img
                src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80"
                alt="The King Extravaganza Kota"
                className="hero-dish-image"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="hero-image-overlay" />
            </div>

            <div className="hero-plate-info">
              <div className="hero-plate-header">
                <h3 className="hero-dish-title">The King Extravaganza Kota</h3>
                <span className="hero-dish-price">R75</span>
              </div>
              <p className="hero-dish-desc">
                Quarter loaf packed with Russian sausage, double cheddar, bacon,
                slap chips, egg, and spicy mango atchar glaze.
              </p>
              <div className="hero-plate-footer">
                <div className="hero-tag-pills">
                  <span className="dish-pill">⏱️ 18 min</span>
                  <span className="dish-pill">🌶️ Medium</span>
                </div>
                <button
                  className="btn-add-hero"
                  onClick={() => addToCart(MENU_ITEMS[1])}
                >
                  <span>+ Quick Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="category-section" id="menu">
        <div className="category-bar-header">
          <div>
            <span className="section-eyebrow">WHAT ARE YOU CRAVING TODAY?</span>
            <h2 className="section-title">Fresh Off The Stove &amp; Grill</h2>
          </div>
        </div>

        <div className="category-pill-container" role="tablist">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? MENU_ITEMS.length
                : MENU_ITEMS.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-filter-btn ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="category-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Food Menu Grid */}
      <section className="menu-section">
        <div className="dishes-grid">
          {filteredItems.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className={`dish-image-wrapper ${dish.gradientClass}`}>
                <div className="dish-badge-row">
                  <span className="dish-special-tag">{dish.tag}</span>
                  <span className="dish-spice-tag">{dish.spice}</span>
                </div>

                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-img"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const fallback = img.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />

                <div
                  className="dish-fallback-illustration"
                  style={{ display: "none" }}
                >
                  <span>{dish.fallbackEmoji}</span>
                </div>
              </div>

              <div className="dish-body">
                <div className="dish-header-row">
                  <h3 className="dish-name">{dish.name}</h3>
                  <span className="dish-cost">R{dish.price}</span>
                </div>

                <p className="dish-description">{dish.description}</p>

                <div className="dish-meta-row">
                  <span>⏱️ {dish.prepTime}</span>
                  <span>•</span>
                  <span>👥 {dish.serves}</span>
                </div>

                <div className="dish-action-row">
                  <span className="portion-info">Generous Portion</span>
                  <button
                    className="btn-add-cart"
                    onClick={() => addToCart(dish)}
                    aria-label={`Add ${dish.name} to order`}
                  >
                    <span>+ Add to Order</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Culinary Craft Story Section */}
      <section className="story-section" id="story">
        <div className="story-grid">
          <div className="story-visual">
            <div className="story-card-mosaic">
              <div className="mosaic-box mosaic-box-gold">
                <span className="mosaic-number">100%</span>
                <span className="mosaic-label">Authentic Township Heritage</span>
              </div>
              <div className="mosaic-box">
                <span className="mosaic-number">4 hrs</span>
                <span className="mosaic-label">Slow-Braised Rich Stews</span>
              </div>
              <div className="mosaic-box">
                <span className="mosaic-number">Daily</span>
                <span className="mosaic-label">Fresh Market Produce</span>
              </div>
              <div className="mosaic-box mosaic-box-gold">
                <span className="mosaic-number">4.9 ★</span>
                <span className="mosaic-label">Over 1,400+ Satisfied Plates</span>
              </div>
            </div>
          </div>

          <div className="story-text-content">
            <span className="section-eyebrow">THE NOKS &amp; BUSI PROMISE</span>
            <h2 className="story-heading">
              Rooted in Family.<br />
              <em style={{ color: "var(--amber-600)", fontStyle: "italic" }}>
                Crafted with Heart.
              </em>
            </h2>
            <p className="story-desc">
              Food is more than nourishment—it is a celebration of who we are.
              At Sister's Kitchen, we take the legendary street tastes of
              Gauteng&apos;s vibrant townships and elevate them with prime cuts,
              slow fire braising, and generous hospitality.
            </p>

            <div className="story-features-list">
              <div className="feature-row">
                <div className="feature-check">✓</div>
                <span>Woodfire braai coals for that deep authentic smoky aroma</span>
              </div>
              <div className="feature-row">
                <div className="feature-check">✓</div>
                <span>Noks&apos; secret atchar recipe aged with fresh bird&apos;s eye chilli</span>
              </div>
              <div className="feature-row">
                <div className="feature-check">✓</div>
                <span>Hearty, wholesome portions made to leave you smiling and full</span>
              </div>
            </div>

            <a className="btn-primary" href="#menu">
              <span>View The Menu</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Customer Love Reviews Section */}
      <section className="category-section" id="reviews" style={{ background: "var(--cream-50)" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
          <span className="section-eyebrow">LOVED ACROSS THE TOWNSHIP</span>
          <h2 className="section-title">What Our People Say</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div className="mosaic-box">
            <div style={{ color: "var(--amber-500)", marginBottom: "10px" }}>★★★★★</div>
            <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--charcoal-800)", lineHeight: 1.7 }}>
              &ldquo;The King Extravaganza Kota is on another level. The bread is
              warm and crisp, and the atchar sauce ties everything together. Best
              in town!&rdquo;
            </p>
            <div style={{ marginTop: "14px", fontWeight: 800, fontSize: "13px", color: "var(--forest-900)" }}>
              — Sipho M., Soweto
            </div>
          </div>

          <div className="mosaic-box">
            <div style={{ color: "var(--amber-500)", marginBottom: "10px" }}>★★★★★</div>
            <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--charcoal-800)", lineHeight: 1.7 }}>
              &ldquo;The beef stew reminds me of Sunday family gatherings at mom's&apos;s
              house. Meat is so tender it falls apart with a fork.&rdquo;
            </p>
            <div style={{ marginTop: "14px", fontWeight: 800, fontSize: "13px", color: "var(--forest-900)" }}>
              — Lerato K., Johannesburg
            </div>
          </div>

          <div className="mosaic-box">
            <div style={{ color: "var(--amber-500)", marginBottom: "10px" }}>★★★★★</div>
            <p style={{ fontSize: "14px", fontStyle: "italic", color: "var(--charcoal-800)", lineHeight: 1.7 }}>
              &ldquo;Fast delivery, piping hot food and super generous portions.
              You can literally taste the love in every bite.&rdquo;
            </p>
            <div style={{ marginTop: "14px", fontWeight: 800, fontSize: "13px", color: "var(--forest-900)" }}>
              — Thabo D., Roodepoort
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Order CTA Banner */}
      <section className="order-vip-banner" id="contact">
        <div className="vip-banner-inner">
          <div>
            <span className="vip-eyebrow">READY FOR A FEAST?</span>
            <h2 className="vip-title">
              Good Food is Just One Message Away.
            </h2>
            <p className="vip-desc">
              Order directly via WhatsApp for fast local pickup or express delivery.
              Hot, freshly prepared, and packed with care.
            </p>
          </div>

          <div className="vip-actions">
            <a
              className="btn-whatsapp-order"
              href={
                totalCartCount > 0
                  ? generateWhatsAppLink()
                  : "https://wa.me/27720000000?text=Sawubona!%20I%20would%20like%20to%20view%20today%27s%20menu%20and%20order."
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              <span>
                {totalCartCount > 0
                  ? `Order Now via WhatsApp (R${cartTotal})`
                  : "Order via WhatsApp"}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <a className="brand" href="#home" style={{ color: "var(--white)" }}>
              <div className="brand-crest">SK</div>
              <div>
                <span className="brand-title" style={{ color: "white" }}>
                  SISTER'S &amp; KITCHEN&apos;S
                </span>
                <span className="brand-subtitle">HAUTE KASI KITCHEN</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              Celebrating the authentic soul and bold flavours of South Africa.
              Crafted fresh daily with the finest ingredients and boundless pride.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#menu">Full Menu</a></li>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Contact &amp; Delivery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Menu Highlights</h4>
            <ul className="footer-links">
              <li><a href="#menu">Classic Kotas</a></li>
              <li><a href="#menu">Beef Stew &amp; Pap</a></li>
              <li><a href="#menu">Mala Mogodu</a></li>
              <li><a href="#menu">Woodfire Braai Platters</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Kitchen Hours</h4>
            <div className="footer-hours-box">
              <div>Monday – Friday: 10:00 – 21:00</div>
              <div>Saturday – Sunday: 09:00 – 22:00</div>
              <div style={{ color: "var(--amber-500)", marginTop: "8px", fontWeight: 700 }}>
                📍 Soweto &amp; Greater Johannesburg
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SISTER'S &amp; KITCHEN&apos;S. All rights reserved. 🇿🇦</span>
          <span>Crafted with love for true food connoisseurs.</span>
        </div>
      </footer>

      {/* Slide-over Cart Drawer Modal */}
      {isDrawerOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <h3 className="cart-drawer-title">Your Order Basket</h3>
              <button
                className="btn-close-drawer"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="cart-drawer-items">
              {totalCartCount === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--charcoal-400)" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍽️</div>
                  <h4 style={{ color: "var(--forest-900)", marginBottom: "8px", fontFamily: "Georgia, serif" }}>
                    Your basket is empty
                  </h4>
                  <p style={{ fontSize: "13px" }}>
                    Explore our menu and add your favourite kasi meals!
                  </p>
                </div>
              ) : (
                Object.entries(cart).map(([id, qty]) => {
                  const item = MENU_ITEMS.find((m) => m.id === id);
                  if (!item) return null;
                  return (
                    <div className="cart-item-row" key={id}>
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">R{item.price * qty}</div>
                      </div>

                      <div className="cart-qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={{ fontSize: "12px", fontWeight: 800 }}>{qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {totalCartCount > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-subtotal-row">
                  <span>Subtotal</span>
                  <span>R{cartTotal}</span>
                </div>
                <div className="cart-subtotal-row">
                  <span>Delivery</span>
                  <span>{cartTotal >= 150 ? "FREE" : "R25"}</span>
                </div>
                <div className="cart-total-row">
                  <span>Estimated Total</span>
                  <span style={{ color: "var(--amber-600)" }}>
                    R{cartTotal >= 150 ? cartTotal : cartTotal + 25}
                  </span>
                </div>

                <a
                  className="btn-whatsapp-order"
                  style={{ width: "100%" }}
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💬 Complete Order on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

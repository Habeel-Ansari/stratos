import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NavLink, Link } from "react-router-dom";
import { categories, contactItems } from "./siteData";

/* ─── Inline brand mark — replaces the 390 kB embedded-bitmap SVG ── */
function LogoIcon({ size = 38 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bolt-g" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%"   stopColor="#ff7043" />
          <stop offset="100%" stopColor="#d32f2f" />
        </linearGradient>
      </defs>
      {/* Lightning bolt path */}
      <polygon
        points="58,4 22,54 46,54 42,96 78,46 54,46"
        fill="url(#bolt-g)"
      />
    </svg>
  );
}

/* ─── SEO ──────────────────────────────────────────────────── */
const OG_IMAGE = "https://www.stratosenergy.sa/og-image.png";

export function usePageMeta({ title, description }) {
  useEffect(() => {
    const siteName = "Stratos Energy";
    const full = title
      ? `${title} | ${siteName}`
      : `${siteName} | Electrical Products Supplier in Saudi Arabia`;
    document.title = full;

    // Helper: create-or-update a <meta> tag
    const setMeta = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };

    // Helper: create-or-update a <link> tag
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Core
    if (description) setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", full);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", window.location.href);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    if (description) setMeta("property", "og:description", description);

    // Twitter / X
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:image", OG_IMAGE);
    if (description) setMeta("name", "twitter:description", description);

    // Canonical
    setLink("canonical", window.location.href);
  }, [title, description]);
}

/* ─── Reveal animation wrapper ────────────────────────────── */
export function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Circuit visualization (hero graphic) ────────────────── */
function CircuitViz() {
  // Grid dot positions
  const dots = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push({ x: col * 48 + 24, y: row * 52 + 24, key: `${row}-${col}` });
    }
  }

  return (
    <div className="circuit-wrap">
      <svg
        className="circuit-svg-el"
        viewBox="0 0 456 452"
        fill="none"
        aria-hidden="true"
      >
        {/* Background dots */}
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={2} className="c-grid-dot" />
        ))}

        {/* Source ring */}
        <circle cx={228} cy={38} r={18} className="c-source-ring" />
        <circle cx={228} cy={38} r={11} className="c-source-ring" />
        <circle cx={228} cy={38} r={5} className="c-node-main" />

        {/* Source to main bus */}
        <line x1={228} y1={56} x2={228} y2={88} className="c-flow c-flow-3" />

        {/* Main bus bar */}
        <line x1={50} y1={88} x2={406} y2={88} className="c-bus" />

        {/* Bus tap nodes */}
        <circle cx={120} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.3s" }} />
        <circle cx={228} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.6s" }} />
        <circle cx={336} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.9s" }} />

        {/* ── Left feeder ── */}
        <line x1={120} y1={88} x2={120} y2={128} className="c-wire" />
        {/* Breaker symbol */}
        <rect x={111} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={114} y1={132} x2={126} y2={146} className="c-breaker-cross" />
        <line x1={120} y1={150} x2={120} y2={200} className="c-flow c-flow-2" />

        {/* ── Center feeder ── */}
        <line x1={228} y1={88} x2={228} y2={128} className="c-wire" />
        <rect x={219} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={222} y1={132} x2={234} y2={146} className="c-breaker-cross" />
        <line x1={228} y1={150} x2={228} y2={220} className="c-flow" />

        {/* ── Right feeder ── */}
        <line x1={336} y1={88} x2={336} y2={128} className="c-wire" />
        <rect x={327} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={330} y1={132} x2={342} y2={146} className="c-breaker-cross" />
        <line x1={336} y1={150} x2={336} y2={200} className="c-flow c-flow-3" />

        {/* ── Left sub-bus ── */}
        <line x1={68} y1={200} x2={172} y2={200} className="c-sub-bus" />
        <circle cx={120} cy={200} r={4} className="c-node-sub" style={{ animationDelay: "0.4s" }} />

        {/* ── Right sub-bus ── */}
        <line x1={284} y1={200} x2={388} y2={200} className="c-sub-bus" />
        <circle cx={336} cy={200} r={4} className="c-node-sub" style={{ animationDelay: "0.8s" }} />

        {/* Left drops */}
        <line x1={90} y1={200} x2={90} y2={310} className="c-flow c-flow-2" />
        <line x1={150} y1={200} x2={150} y2={310} className="c-flow" style={{ animationDelay: "-0.6s" }} />

        {/* Center drop (longer) */}
        <line x1={228} y1={220} x2={228} y2={310} className="c-flow c-flow-3" style={{ animationDelay: "-1s" }} />

        {/* Right drops */}
        <line x1={308} y1={200} x2={308} y2={310} className="c-flow" style={{ animationDelay: "-0.3s" }} />
        <line x1={364} y1={200} x2={364} y2={310} className="c-flow c-flow-2" style={{ animationDelay: "-1.4s" }} />

        {/* ── Load symbols ── */}
        {/* Left loads */}
        <circle cx={90}  cy={324} r={14} className="c-node-load" />
        <circle cx={90}  cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "0.2s" }} />
        <circle cx={150} cy={324} r={14} className="c-node-load" />
        <circle cx={150} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "1.1s" }} />

        {/* Center load (transformer double-circle) */}
        <circle cx={228} cy={318} r={13} className="c-node-load" />
        <circle cx={228} cy={334} r={13} className="c-node-load" style={{ opacity: 0.45 }} />
        <circle cx={228} cy={318} r={5}  className="c-node-main" style={{ animationDelay: "0.55s" }} />

        {/* Right loads */}
        <circle cx={308} cy={324} r={14} className="c-node-load" />
        <circle cx={308} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "0.75s" }} />
        <circle cx={364} cy={324} r={14} className="c-node-load" />
        <circle cx={364} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "1.5s" }} />

        {/* Connecting dotted horizontals (decorative) */}
        <line x1={90} y1={324} x2={150} y2={324} className="c-wire" style={{ opacity: 0.2 }} />
        <line x1={308} y1={324} x2={364} y2={324} className="c-wire" style={{ opacity: 0.2 }} />
      </svg>

      {/* Floating chips on the visual */}
      <motion.div
        className="hero-chip"
        style={{ top: "1.2rem", left: "1.2rem" }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="chip-dot" />
        <div>
          <span className="hero-chip-label">Portfolio</span>
          <span className="hero-chip-value">10+ Categories</span>
        </div>
      </motion.div>

      <motion.div
        className="hero-chip"
        style={{ bottom: "1.2rem", right: "1.2rem" }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="chip-dot chip-dot-blue" />
        <div>
          <span className="hero-chip-label">Coverage</span>
          <span className="hero-chip-value">Saudi Arabia</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Marquee ──────────────────────────────────────────────── */
export function Marquee({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "marquee-track-rev" : ""}`}>
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Site layout ──────────────────────────────────────────── */
export function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="topbar">
        <Link
          className="brand"
          to="/"
          aria-label="Stratos Energy home"
          onClick={() => setMenuOpen(false)}
        >
          <LogoIcon size={38} />
          <span className="brand-name">Stratos<br />Energy</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`} id="site-nav">
          <NavItem to="/about" onClick={() => setMenuOpen(false)}>About</NavItem>
          <NavItem to="/products" onClick={() => setMenuOpen(false)}>Products</NavItem>
          <NavItem to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavItem>
          <Link
            className="btn btn-primary nav-cta"
            to="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Request a Quote
          </Link>
        </nav>

        <Link className="btn btn-primary" to="/contact" onClick={() => setMenuOpen(false)}>
          Request a Quote
        </Link>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div>
          <div className="footer-brand">
            <LogoIcon size={36} />
            <span className="brand-name footer-brand-name">Stratos<br />Energy</span>
          </div>
          <p className="footer-desc">
            Reliable electrical products for industrial, commercial, and infrastructure
            projects across Saudi Arabia.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Stratos Energy Company. All rights reserved.
          </p>
        </div>

        <div className="footer-col">
          <span>Quick links</span>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <span>Connect</span>
          <a href="tel:+966597020427">+966 59 702 0427</a>
          <a href="mailto:info@stratosenergy.sa">info@stratosenergy.sa</a>
          <a href="mailto:sales@stratosenergy.sa">sales@stratosenergy.sa</a>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href="https://wa.me/966597020427"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
      to={to}
      end={to === "/"}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

/* ─── Category grid ────────────────────────────────────────── */
export function CategoryGrid({ compact = false, linkTo = "/contact" }) {
  const reduced = useReducedMotion();

  return (
    <div className={`cat-grid${compact ? " cat-grid-compact" : ""}`}>
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <Reveal key={cat.title} delay={i * 0.04}>
            <motion.article
              className="cat-card"
              whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.25 } }}
            >
              <img
                className="cat-img"
                src={cat.image}
                alt=""
                aria-hidden="true"
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                fetchpriority={i === 0 ? "high" : "auto"}
              />
              <div className="cat-overlay" />
              <div className="cat-body">
                <div className="cat-icon-wrap"><Icon size={16} /></div>
                <h3>{cat.title}</h3>
                {!compact && <p>{cat.text}</p>}
                <Link className="cat-link" to={linkTo}>
                  {linkTo === "/contact" ? "Talk to our team" : "View details"}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.article>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ─── Contact section ──────────────────────────────────────── */
export function ContactSection() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    category: "Cable Solutions", details: "",
  });
  const [status, setStatus] = useState("idle");
  const channelRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  }, []);

  const summary = useMemo(() => [
    "Stratos Energy enquiry",
    `Name: ${form.name}`,
    `Company: ${form.company}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Category: ${form.category}`,
    `Details: ${form.details || "Not provided"}`,
  ].join("\n"), [form]);

  const mailHref = useMemo(() => {
    const sub = encodeURIComponent(`Enquiry from ${form.company || form.name || "website"}`);
    return `mailto:sales@stratosenergy.sa?subject=${sub}&body=${encodeURIComponent(summary)}`;
  }, [summary, form.company, form.name]);

  const waHref = useMemo(
    () => `https://wa.me/966597020427?text=${encodeURIComponent(summary)}`,
    [summary]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(channelRef.current === "email" ? mailHref : waHref, "_blank", "noreferrer");
    setStatus("submitted");
  };

  return (
    <div className="contact-layout">
      {/* Info cards */}
      <div className="contact-info-grid">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              className="c-card"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <div className="c-icon"><Icon size={17} /></div>
              <span className="c-label">{item.label}</span>
              <span className="c-value">{item.value}</span>
            </a>
          );
        })}
      </div>

      {/* Form */}
      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your full name"
              autoComplete="name" required value={form.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" placeholder="Company name"
              autoComplete="organization" required value={form.company} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" inputMode="email"
              placeholder="name@company.com" autoComplete="email" required
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              title="Enter a valid email address"
              value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" placeholder="+966"
              autoComplete="tel" required value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-field full">
            <label htmlFor="category">Product category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {categories.map((c) => <option key={c.title} value={c.title}>{c.title}</option>)}
            </select>
          </div>
          <div className="form-field full">
            <label htmlFor="details">Project details</label>
            <textarea id="details" name="details" rows={5}
              placeholder="Tell us what you need, approximate quantities, and delivery expectations."
              value={form.details} onChange={handleChange} />
          </div>
        </div>

        <p className="form-helper">
          Fill in the form above, then choose how you'd like to send — your details will be pre-filled.
        </p>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => { channelRef.current = "email"; }}
          >
            <Mail size={17} /> Send by Email
          </button>
          <button
            type="submit"
            className="btn btn-ghost"
            onClick={() => { channelRef.current = "whatsapp"; }}
          >
            <MessageCircle size={17} /> Send by WhatsApp
          </button>
        </div>

        {status === "submitted" && (
          <p className="form-success" role="status">
            ✓ Enquiry sent — we'll get back to you shortly.
          </p>
        )}
      </form>
    </div>
  );
}

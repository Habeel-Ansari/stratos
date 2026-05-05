import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  categories,
  contactItems,
  industries,
  metrics,
  principles,
  processSteps,
} from "./siteData";
import {
  CategoryGrid,
  ContactSection,
  Marquee,
  Reveal,
  usePageMeta,
} from "./siteComponents";

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
export function HomePage() {
  usePageMeta({
    title: null,
    description:
      "Stratos Energy supplies trusted electrical materials for industrial, commercial, and infrastructure projects across Saudi Arabia.",
  });

  const reduced = useReducedMotion();
  const industryNames = industries.map((i) => i.title);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: reduced ? {} : { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* ── Hero ── */}
      <section aria-label="Hero">
        <div className="hero-section">
          <motion.div
            className="hero-copy"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              Saudi Arabia electrical supply partner
            </motion.span>

            <motion.h1 className="hero-title" variants={fadeUp}>
              Powering industry with{" "}
              <span className="grad">reliable electrical</span> solutions.
            </motion.h1>

            <motion.p className="hero-body" variants={fadeUp}>
              Stratos Energy supplies trusted electrical materials and engineered product
              solutions for industrial, commercial, utility, and infrastructure projects
              across Saudi Arabia.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <Link className="btn btn-primary" to="/contact">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost" to="/products">
                Explore Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Circuit visual — hidden on mobile via CSS */}
          <motion.div
            className="hero-visual"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <CircuitViz />
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee items={industryNames} />

      {/* ── Why Stratos ── */}
      <section className="section">
        <Reveal className="section-heading">
          <span className="eyebrow">Why Stratos Energy</span>
          <h2>A sharper supply experience for industrial teams.</h2>
          <p>
            Stratos Energy supports project owners, contractors, and industrial buyers
            with a focused portfolio of electrical products built for performance,
            safety, and long-term reliability.
          </p>
        </Reveal>

        <div className="feature-grid">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <FeatureCard
                num={i + 1}
                title={p.title}
                text={p.text}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-band">
        <div className="section section-tight" style={{ padding: 0 }}>
          <div className="stats-grid">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="stat-cell">
                  <div className="stat-value grad">{m.value}</div>
                  <div className="stat-label">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── How we work ── */}
      <section className="section">
        <Reveal className="section-heading">
          <span className="eyebrow">How we work</span>
          <h2>From requirement to reliable supply.</h2>
          <p>
            A practical, direct procurement process designed around your project timeline
            and product needs.
          </p>
        </Reveal>

        <div className="process-grid">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.09}>
              <div className="process-card">
                <div className="process-num">0{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-tight">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-copy">
              <h2>Ready to source your next project?</h2>
              <p>
                Talk to our team for quotations, product guidance, and supply coordination
                across all electrical categories.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/contact">
                Get a Quote <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost" to="/products">
                Browse Products
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* simple icon-free feature card */
function FeatureCard({ title, text }) {
  return (
    <div className="feature-card">
      <div className="feat-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

/* Inline circuit viz imported here too so pages.jsx is self-contained for the hero */
function CircuitViz() {
  const dots = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 10; c++)
    dots.push({ x: c * 48 + 24, y: r * 52 + 24, key: `${r}-${c}` });

  return (
    <div className="circuit-wrap">
      <svg className="circuit-svg-el" viewBox="0 0 456 452" fill="none" aria-hidden="true">
        {dots.map((d) => <circle key={d.key} cx={d.x} cy={d.y} r={2} className="c-grid-dot" />)}

        {/* Source */}
        <circle cx={228} cy={38} r={18} className="c-source-ring" />
        <circle cx={228} cy={38} r={11} className="c-source-ring" />
        <circle cx={228} cy={38} r={5}  className="c-node-main" />

        {/* Source → bus */}
        <line x1={228} y1={56} x2={228} y2={88} className="c-flow c-flow-3" />

        {/* Main bus */}
        <line x1={50} y1={88} x2={406} y2={88} className="c-bus" />
        <circle cx={120} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.3s" }} />
        <circle cx={228} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.6s" }} />
        <circle cx={336} cy={88} r={5} className="c-node-main" style={{ animationDelay: "0.9s" }} />

        {/* Left feeder */}
        <line x1={120} y1={88}  x2={120} y2={128} className="c-wire" />
        <rect x={111} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={114} y1={132} x2={126} y2={146} className="c-breaker-cross" />
        <line x1={120} y1={150} x2={120} y2={200} className="c-flow c-flow-2" />

        {/* Center feeder */}
        <line x1={228} y1={88}  x2={228} y2={128} className="c-wire" />
        <rect x={219} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={222} y1={132} x2={234} y2={146} className="c-breaker-cross" />
        <line x1={228} y1={150} x2={228} y2={220} className="c-flow" />

        {/* Right feeder */}
        <line x1={336} y1={88}  x2={336} y2={128} className="c-wire" />
        <rect x={327} y={128} width={18} height={22} rx={4} className="c-breaker" />
        <line x1={330} y1={132} x2={342} y2={146} className="c-breaker-cross" />
        <line x1={336} y1={150} x2={336} y2={200} className="c-flow c-flow-3" />

        {/* Sub-buses */}
        <line x1={68}  y1={200} x2={172} y2={200} className="c-sub-bus" />
        <circle cx={120} cy={200} r={4} className="c-node-sub" style={{ animationDelay: "0.4s" }} />
        <line x1={284} y1={200} x2={388} y2={200} className="c-sub-bus" />
        <circle cx={336} cy={200} r={4} className="c-node-sub" style={{ animationDelay: "0.8s" }} />

        {/* Drops */}
        <line x1={90}  y1={200} x2={90}  y2={310} className="c-flow c-flow-2" />
        <line x1={150} y1={200} x2={150} y2={310} className="c-flow"   style={{ animationDelay: "-0.6s" }} />
        <line x1={228} y1={220} x2={228} y2={310} className="c-flow c-flow-3" style={{ animationDelay: "-1s" }} />
        <line x1={308} y1={200} x2={308} y2={310} className="c-flow"   style={{ animationDelay: "-0.3s" }} />
        <line x1={364} y1={200} x2={364} y2={310} className="c-flow c-flow-2" style={{ animationDelay: "-1.4s" }} />

        {/* Load symbols */}
        <circle cx={90}  cy={324} r={14} className="c-node-load" />
        <circle cx={90}  cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "0.2s" }} />
        <circle cx={150} cy={324} r={14} className="c-node-load" />
        <circle cx={150} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "1.1s" }} />
        <circle cx={228} cy={318} r={13} className="c-node-load" />
        <circle cx={228} cy={334} r={13} className="c-node-load" style={{ opacity: 0.45 }} />
        <circle cx={228} cy={318} r={5}  className="c-node-main" style={{ animationDelay: "0.55s" }} />
        <circle cx={308} cy={324} r={14} className="c-node-load" />
        <circle cx={308} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "0.75s" }} />
        <circle cx={364} cy={324} r={14} className="c-node-load" />
        <circle cx={364} cy={324} r={5}  className="c-node-sub" style={{ animationDelay: "1.5s" }} />
        <line x1={90}  y1={324} x2={150} y2={324} className="c-wire" style={{ opacity: 0.18 }} />
        <line x1={308} y1={324} x2={364} y2={324} className="c-wire" style={{ opacity: 0.18 }} />
      </svg>

      {/* Chips */}
      <motion.div className="hero-chip" style={{ top: "1.2rem", left: "1.2rem" }}
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="chip-dot" />
        <div>
          <span className="hero-chip-label">Portfolio</span>
          <span className="hero-chip-value">10+ Categories</span>
        </div>
      </motion.div>

      <motion.div className="hero-chip" style={{ bottom: "1.2rem", right: "1.2rem" }}
        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="chip-dot chip-dot-blue" />
        <div>
          <span className="hero-chip-label">Coverage</span>
          <span className="hero-chip-value">Saudi Arabia</span>
        </div>
      </motion.div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────
   PRODUCTS PAGE
───────────────────────────────────────────────────────────── */
export function ProductsPage() {
  usePageMeta({
    title: "Products",
    description:
      "Browse Stratos Energy's full range of electrical products — cables, switchgear, earthing, lighting, and more for industrial and infrastructure use.",
  });

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Our products</span>
          <h1>
            A focused range of electrical materials and{" "}
            <span className="grad">supply solutions.</span>
          </h1>
          <p>
            Stratos Energy offers a broad portfolio of products selected to support safe
            power distribution, installation efficiency, system protection, and project
            durability.
          </p>
          <Link className="btn btn-primary" to="/contact">
            Request product support <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Category grid */}
      <section className="section section-top0">
        <Reveal className="section-heading">
          <span className="eyebrow">Product categories</span>
          <h2>Supply coverage across core electrical, protection, and communication needs.</h2>
          <p>Each category is structured around practical site requirements and dependable industrial use.</p>
        </Reveal>

        <CategoryGrid linkTo="/contact" />
      </section>

      {/* Detail cards */}
      <section className="section section-top0">
        <Reveal className="section-heading">
          <span className="eyebrow">What's inside each category</span>
          <h2>Core supply categories for industrial and infrastructure work.</h2>
        </Reveal>

        <div className="detail-grid">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.title} delay={i * 0.03}>
                <div className="detail-card">
                  <div className="detail-header">
                    <div className="detail-icon"><Icon size={20} /></div>
                    <div>
                      <h3>{cat.title}</h3>
                      <p>{cat.text}</p>
                    </div>
                  </div>
                  <ul className="detail-list">
                    {cat.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-tight">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-copy">
              <h2>Need a specific product or spec?</h2>
              <p>Our team can help you find the right product match for your project requirements.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/contact">
                Contact our team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────────────────────── */
export function AboutPage() {
  usePageMeta({
    title: "About",
    description:
      "Stratos Energy is an electrical products supplier focused on supporting industrial, commercial, and infrastructure projects across Saudi Arabia.",
  });

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">About Stratos Energy</span>
          <h1>
            Built around trust, responsiveness, and{" "}
            <span className="grad">supply confidence.</span>
          </h1>
          <p>
            Stratos Energy is an electrical products supplier focused on supporting
            industrial, commercial, and infrastructure projects across Saudi Arabia.
          </p>
          <Link className="btn btn-primary" to="/contact">
            Talk to our team <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Who we are */}
      <section className="section section-top0">
        <div className="about-split">
          <Reveal className="about-text">
            <span className="eyebrow" style={{ marginBottom: "1.2rem", display: "inline-flex" }}>Who we are</span>
            <h2>Reliable electrical product supply for demanding project environments.</h2>
            <p>
              We help customers source quality products across cable, cable management,
              electrical bulk materials, grounding and lightning protection, switchgear,
              junction boxes, enclosures, lighting, and communication materials.
            </p>
            <p>
              Our approach is built on practical support, dependable sourcing, and a
              strong understanding of project requirements. We work closely with customers
              to provide solutions that promote safe installation, efficient performance,
              and long-term reliability.
            </p>
            <p>
              Whether the requirement is routine procurement or specialized project
              support, our goal is to help clients move forward with confidence.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80"
              alt="Industrial electrical project site with workers and equipment"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </section>

      {/* Product spotlight strip */}
      <Marquee items={[
        "Miniature circuit breakers",
        "Moulded case circuit breakers",
        "Air circuit breakers",
        "Industrial plugs and sockets",
        "Cable transit systems",
        "Grounding busbars",
        "Industrial lighting",
        "Network accessories",
      ]} />

      {/* Mission / Vision */}
      <section className="section">
        <Reveal className="section-heading">
          <span className="eyebrow">Our direction</span>
          <h2>Mission and vision.</h2>
        </Reveal>
        <div className="mv-grid">
          <Reveal delay={0.05}>
            <div className="mv-card">
              <span className="eyebrow">Our mission</span>
              <p>Deliver dependable electrical product solutions for safe, efficient, high-performance projects.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mv-card">
              <span className="eyebrow">Our vision</span>
              <p>Become a trusted name in electrical supply through responsive service and strong customer partnerships.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="section section-top0">
        <Reveal className="section-heading">
          <span className="eyebrow">How we work</span>
          <h2>A practical, efficient procurement process.</h2>
        </Reveal>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.09}>
              <div className="process-card">
                <div className="process-num">0{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="section section-top0">
        <Reveal className="section-heading">
          <span className="eyebrow">Industries we serve</span>
          <h2>Reliable electrical materials for sectors where uptime, safety, and durability matter.</h2>
        </Reveal>
        <div className="industry-grid">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.title} delay={i * 0.04}>
                <div className="ind-card">
                  <div className="ind-icon"><Icon size={17} /></div>
                  <strong>{ind.title}</strong>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-tight">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-copy">
              <h2>Let's work together.</h2>
              <p>Reach our team to discuss your project requirements and how Stratos Energy can support your supply needs.</p>
            </div>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/contact">
                Get in touch <ArrowRight size={16} />
              </Link>
              <Link className="btn btn-ghost" to="/products">
                View products
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────────────────────── */
export function ContactPage() {
  usePageMeta({
    title: "Contact",
    description:
      "Contact Stratos Energy for product enquiries, quotations, and project support across Saudi Arabia.",
  });

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Contact Stratos Energy</span>
          <h1>
            Reach our team for quotations, product enquiries,{" "}
            <span className="grad">and project support.</span>
          </h1>
          <p>
            Tell us about your project, required product category, and delivery needs.
            Our team will get back to you with the right support and supply guidance.
          </p>
        </motion.div>
      </div>

      <section className="section section-top0">
        <Reveal>
          <ContactSection />
        </Reveal>
      </section>
    </>
  );
}


/* ─────────────────────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────────────────────── */
export function NotFoundPage() {
  usePageMeta({ title: "Page not found" });
  return (
    <div className="not-found">
      <h1 className="grad">404</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </div>
  );
}

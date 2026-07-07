import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ── Asset URLs ────────────────────────────────────────────────────────────────
const SEAL_URL   = "/manus-storage/bb_seal_new_0ad7c060.png";
const LABEL_URL  = "/manus-storage/dolce_cefalu_label_652f580a.png";

// ── Config (easy to update) ───────────────────────────────────────────────────
const NEXT_DELIVERY = "Saturday, July 18, 2026";
const CURRENT_PRODUCT = {
  name: "Dolce Cefalù",
  subtitle: "Pistachio Cannoli Pie",
  price: "$35",
  description:
    "A buttery Nilla wafer and pistachio crust cradles a cloud of mascarpone and ricotta cannoli cream — silky, rich, and impossibly light. Finished with dark chocolate chips and a drift of powdered sugar. Every 9-inch pie is hand-assembled in small batches and sealed fresh.",
};

// ── Ornament ──────────────────────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-rule text-sm ${className}`}>
      <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>✦</span>
    </div>
  );
}

// ── Sticky Nav ────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#offering", label: "This Week" },
    { href: "#preorder", label: "Pre-Order" },
    { href: "#how",      label: "How It Works" },
    { href: "#menu",     label: "Menu" },
    { href: "#follow",   label: "Follow Us" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      backgroundColor: "rgba(19,46,42,0.97)",
      borderBottom: "1px solid rgba(201,168,76,0.18)",
      backdropFilter: "blur(8px)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.5rem" }}>
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <img src={SEAL_URL} alt="Barone Boys" style={{ width: "36px", height: "36px", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(201,168,76,0.45))" }} />
          <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.88rem", letterSpacing: "0.14em" }}>BARONE BOYS</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }} className="hidden lg:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.8, textDecoration: "none", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
            >{l.label}</a>
          ))}
          <a href="#preorder" className="btn-gold" style={{ padding: "0.45rem 1.25rem", fontSize: "0.68rem" }}>Order Now</a>
        </div>

        {/* Mobile: always-visible CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="lg:hidden">
          <a href="#preorder" className="btn-gold" style={{ padding: "0.4rem 0.9rem", fontSize: "0.65rem" }}>Order Now</a>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--gold)", fontSize: "1.3rem", cursor: "pointer", padding: "0.25rem" }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ backgroundColor: "var(--teal-dark)", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "1rem 1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>{l.label}</a>
          ))}
          <a href="#preorder" onClick={() => setOpen(false)} className="btn-gold" style={{ textAlign: "center", marginTop: "0.25rem" }}>Order Now</a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: "var(--teal)", minHeight: "88vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 35%, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="container" style={{ textAlign: "center", padding: "5rem 1.5rem 4rem" }}>
        <img
          src={SEAL_URL}
          alt="Barone Boys Wax Seal"
          className="seal-glow fade-up"
          style={{ width: "min(280px, 58vw)", height: "auto", margin: "0 auto 2.5rem", display: "block" }}
        />

        <h1 className="fade-up" style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "clamp(2.2rem, 7vw, 4.2rem)", letterSpacing: "0.2em", marginBottom: "0.6rem", lineHeight: 1.05 }}>
          BARONE BOYS
        </h1>

        <p className="fade-up" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--gold-light)", fontSize: "clamp(1.1rem, 3vw, 1.55rem)", marginBottom: "1.75rem", opacity: 0.9 }}>
          Small-batch. Made with intention.
        </p>

        <GoldRule className="max-w-xs mx-auto mb-6" />

        <p className="fade-up" style={{ color: "rgba(232,201,122,0.7)", fontSize: "clamp(0.88rem, 2vw, 1rem)", maxWidth: "500px", margin: "0 auto 2.75rem", lineHeight: 1.85 }}>
          Handcrafted food made by the Barone boys — rotating, seasonal, and always worth waiting for. One week it's a Sicilian cannoli pie. The next, Texas-style smoked ribs. The through-line is always craft.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#preorder" className="btn-gold">Pre-Order Now</a>
          <a href="#offering" className="btn-outline">This Week's Offering</a>
        </div>
      </div>
    </section>
  );
}

// ── Current Offering ──────────────────────────────────────────────────────────
function CurrentOffering() {
  return (
    <section id="offering" style={{ backgroundColor: "var(--teal-dark)", padding: "5rem 0" }}>
      <div className="pistachio-stripe" />
      <div className="container" style={{ paddingTop: "4rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Now Available</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>
            {CURRENT_PRODUCT.name}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--gold-light)", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", opacity: 0.85 }}>
            {CURRENT_PRODUCT.subtitle}
          </p>

          {/* Delivery badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem", padding: "0.5rem 1.25rem", border: "1px solid rgba(122,158,110,0.45)", borderRadius: "2rem", backgroundColor: "rgba(122,158,110,0.08)" }}>
            <span style={{ color: "var(--pistachio)", fontSize: "0.8rem" }}>📅</span>
            <span style={{ fontFamily: "'Cinzel', serif", color: "var(--pistachio)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
              NEXT DELIVERY: {NEXT_DELIVERY}
            </span>
          </div>

          <GoldRule className="max-w-sm mx-auto mt-5" />
        </div>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3.5rem", alignItems: "center" }}>
          {/* Label */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={LABEL_URL}
              alt="Dolce Cefalù Label"
              style={{
                width: "min(270px, 75vw)", height: "auto",
                filter: "drop-shadow(0 10px 36px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(201,168,76,0.18))",
              }}
            />
          </div>

          {/* Details */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "2rem", fontWeight: 700 }}>{CURRENT_PRODUCT.price}</span>
              <span style={{ color: "rgba(201,168,76,0.55)", fontSize: "0.82rem" }}>/ 9-inch pie</span>
            </div>

            <p style={{ lineHeight: 1.9, marginBottom: "1.5rem", fontSize: "0.97rem" }}>
              {CURRENT_PRODUCT.description}
            </p>

            {/* Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.75rem" }}>
              {[["🫙","Mascarpone & Ricotta"],["🌿","Pistachio Crust"],["🍫","Dark Chocolate Chips"],["🍬","Powdered Sugar Finish"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: "var(--pistachio-lt)", fontSize: "0.83rem" }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>

            {/* Allergen */}
            <div style={{ padding: "0.65rem 0.875rem", borderLeft: "2px solid var(--pistachio)", backgroundColor: "rgba(122,158,110,0.07)", borderRadius: "0 3px 3px 0", marginBottom: "1.75rem" }}>
              <p style={{ color: "rgba(168,196,154,0.8)", fontSize: "0.75rem", fontStyle: "italic", margin: 0 }}>
                Contains: Milk, Wheat, Tree Nuts (Pistachios)
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#preorder" className="btn-gold">Reserve Your Pie</a>
              <span style={{ color: "rgba(201,168,76,0.5)", fontSize: "0.78rem", alignSelf: "center", fontStyle: "italic" }}>Limited per bake</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pistachio-stripe" style={{ marginTop: "4rem" }} />
    </section>
  );
}

// ── Pre-Order Form ────────────────────────────────────────────────────────────
function PreOrderForm() {
  const [form, setForm] = useState({
    customerName: "", email: "", phone: "",
    quantity: 1, fulfillment: "pickup" as "pickup" | "delivery", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submitMutation = trpc.preOrder.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Pre-order received! We'll be in touch soon.");
    },
    onError: (err) => toast.error(err.message || "Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  return (
    <section id="preorder" style={{ backgroundColor: "var(--teal)", padding: "5rem 0" }}>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Reserve Your Batch</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            Pre-Order Dolce Cefalù
          </h2>
          <p style={{ fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto" }}>
            We bake in limited quantities. Place your pre-order before the cutoff and we'll confirm your reservation by email or phone.
          </p>
          <div style={{ marginTop: "1rem", display: "inline-block", padding: "0.4rem 1rem", backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "2rem" }}>
            <span style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
              ⚠ LIMITED QUANTITIES PER BAKE — RESERVE YOURS EARLY
            </span>
          </div>
          <GoldRule className="mt-5" />
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem 2rem", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "6px", backgroundColor: "rgba(201,168,76,0.04)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥧</div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>Order Received!</h3>
            <p style={{ fontSize: "0.92rem", maxWidth: "360px", margin: "0 auto 1.5rem" }}>
              Thanks, {form.customerName}! We'll confirm your order at <strong style={{ color: "var(--gold)" }}>{form.email}</strong> within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-outline">Place Another Order</button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {/* Product (static for now, expandable later) */}
            <div>
              <label className="brand-label">Product</label>
              <div className="brand-input" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                <span>Dolce Cefalù — Pistachio Cannoli Pie</span>
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>$35</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.1rem" }}>
              <div>
                <label className="brand-label">Full Name *</label>
                <input type="text" required className="brand-input" placeholder="Your name"
                  value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
              </div>
              <div>
                <label className="brand-label">Quantity *</label>
                <input type="number" required min={1} max={50} className="brand-input"
                  value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Math.max(1, parseInt(e.target.value) || 1) }))} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.1rem" }}>
              <div>
                <label className="brand-label">Email Address *</label>
                <input type="email" required className="brand-input" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="brand-label">Phone Number</label>
                <input type="tel" className="brand-input" placeholder="(609) 555-0100"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="brand-label">Pickup or Delivery *</label>
              <select required className="brand-input"
                value={form.fulfillment} onChange={e => setForm(f => ({ ...f, fulfillment: e.target.value as "pickup" | "delivery" }))}>
                <option value="pickup">Pickup — Somers Point, NJ</option>
                <option value="delivery">Delivery (local area)</option>
              </select>
            </div>

            <div>
              <label className="brand-label">Notes (Optional)</label>
              <textarea className="brand-input" placeholder="Any special requests, dietary notes, or questions..." rows={3}
                value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                style={{ resize: "vertical" }} />
            </div>

            <button type="submit" className="btn-gold" disabled={submitMutation.isPending} style={{ marginTop: "0.5rem", width: "100%", padding: "0.9rem 2rem", fontSize: "0.82rem" }}>
              {submitMutation.isPending ? "Submitting…" : "Submit Pre-Order"}
            </button>

            <p style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.73rem", textAlign: "center" }}>
              We'll confirm within 24 hours. No payment collected online — we'll arrange that at pickup or delivery.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: "01", title: "We Announce the Bake", body: "Follow us on Instagram or Facebook — or join our notification list — to hear when the next batch is announced. Each bake has a cutoff date." },
    { num: "02", title: "You Pre-Order", body: "Reserve your quantity before the cutoff. We bake in small batches, so spots fill fast. No payment online — we settle at pickup or delivery." },
    { num: "03", title: "Pickup or Delivery", body: "On delivery day, swing by Somers Point or we'll arrange local delivery. Every pie is sealed fresh and ready to go." },
  ];
  return (
    <section id="how" style={{ backgroundColor: "var(--teal-dark)", padding: "5rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>The Process</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "0.06em" }}>How It Works</h2>
          <GoldRule className="max-w-xs mx-auto mt-4" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ textAlign: "center", padding: "2rem 1.5rem", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.02)", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}
            >
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: "2.5rem", color: "rgba(201,168,76,0.2)", fontWeight: 700, lineHeight: 1, marginBottom: "1rem" }}>{s.num}</div>
              <h3 style={{ fontSize: "1rem", letterSpacing: "0.06em", marginBottom: "0.75rem", color: "var(--gold)" }}>{s.title}</h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(232,201,122,0.7)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Rotating Menu Gallery ─────────────────────────────────────────────────────
function RotatingMenu() {
  const items = [
    { name: "Dolce Cefalù", sub: "Pistachio Cannoli Pie", tag: "Italian Dessert", emoji: "🥧", available: true },
    { name: "Texas-Style Smoked Ribs", sub: "Low & slow, dry-rubbed, fall-off-the-bone", tag: "BBQ", emoji: "🍖", available: false },
    { name: "Coming Soon", sub: "Next rotating offering TBA", tag: "Stay tuned", emoji: "✦", available: false },
    { name: "Coming Soon", sub: "Follow us to be first to know", tag: "Stay tuned", emoji: "✦", available: false },
  ];
  return (
    <section id="menu" style={{ backgroundColor: "var(--teal)", padding: "5rem 0" }}>
      <div className="pistachio-stripe" />
      <div className="container" style={{ paddingTop: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>The Barone Boys Kitchen</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            Rotating Menu
          </h2>
          <p style={{ fontSize: "0.92rem", maxWidth: "520px", margin: "0 auto" }}>
            We don't do one thing. We do whatever we love, and we do it well. Italian desserts, Texas BBQ, weekend specials — the menu rotates, the quality doesn't.
          </p>
          <GoldRule className="max-w-sm mx-auto mt-5" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1.5rem" }}>
          {items.map((item, i) => (
            <div key={i} className="menu-card">
              {/* Photo placeholder */}
              <div style={{
                height: "180px",
                backgroundColor: item.available ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem", borderBottom: "1px solid rgba(201,168,76,0.12)",
                position: "relative",
              }}>
                <span>{item.emoji}</span>
                {item.available && (
                  <div style={{ position: "absolute", top: "0.6rem", right: "0.6rem", backgroundColor: "var(--pistachio)", color: "#0f2420", fontSize: "0.62rem", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em", padding: "0.2rem 0.5rem", borderRadius: "2rem" }}>
                    AVAILABLE
                  </div>
                )}
              </div>
              <div style={{ padding: "1.1rem 1.25rem" }}>
                <p style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem", opacity: 0.7 }}>{item.tag}</p>
                <h3 style={{ fontFamily: "'Cinzel', serif", color: item.available ? "var(--gold)" : "rgba(201,168,76,0.45)", fontSize: "0.95rem", letterSpacing: "0.04em", marginBottom: "0.4rem" }}>{item.name}</h3>
                <p style={{ color: "rgba(232,201,122,0.55)", fontSize: "0.8rem", lineHeight: 1.6 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pistachio-stripe" style={{ marginTop: "4rem" }} />
    </section>
  );
}

// ── Mailing List ──────────────────────────────────────────────────────────────
function MailingList() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [already, setAlready] = useState(false);

  const sub = trpc.mailingList.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadySubscribed) { setAlready(true); toast.info("You're already on the list!"); }
      else { setDone(true); toast.success("You're on the list!"); }
    },
    onError: (err) => toast.error(err.message || "Something went wrong."),
  });

  return (
    <section style={{ backgroundColor: "var(--teal-dark)", padding: "4rem 0" }}>
      <div className="container" style={{ maxWidth: "560px", textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Next Batch</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
          Be First to Know
        </h2>
        <p style={{ fontSize: "0.9rem", marginBottom: "1.75rem", lineHeight: 1.8 }}>
          When the next batch is ready, we notify our list first — before any public announcement. One email per drop. No spam.
        </p>

        {done || already ? (
          <div style={{ padding: "1.5rem", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "6px", backgroundColor: "rgba(201,168,76,0.04)" }}>
            <p style={{ color: "var(--gold)", fontFamily: "'Cinzel', serif", fontSize: "0.9rem" }}>
              {already ? "You're already on the list ✓" : "You're on the list! 🎉"}
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(232,201,122,0.6)", marginTop: "0.4rem" }}>
              We'll email you when the next batch drops.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); sub.mutate({ email }); }} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" required className="brand-input" placeholder="your@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex: "1 1 220px", maxWidth: "320px" }} />
            <button type="submit" className="btn-gold" disabled={sub.isPending}>
              {sub.isPending ? "Joining…" : "Notify Me"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Follow Us ─────────────────────────────────────────────────────────────────
function FollowUs() {
  return (
    <section id="follow" style={{ backgroundColor: "var(--teal)", padding: "4.5rem 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Stay Connected</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
          Follow Barone Boys
        </h2>
        <p style={{ fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto 2.25rem" }}>
          Bake announcements, behind-the-scenes, and next-drop previews — all on Instagram and Facebook.
        </p>

        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a           href="#follow" className="btn-gold"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>
          <a           href="#follow" className="btn-outline"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
        </div>

        <p style={{ color: "rgba(201,168,76,0.35)", fontSize: "0.73rem", marginTop: "1.5rem" }}>
          Handles coming soon — follow us to stay updated on bake dates and new offerings.
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: "#0d1f1c", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "2.5rem 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <img src={SEAL_URL} alt="Barone Boys" style={{ width: "52px", height: "auto", margin: "0 auto 1rem", display: "block", opacity: 0.65 }} />
        <p style={{ fontFamily: "'Cinzel', serif", color: "var(--gold)", fontSize: "0.82rem", letterSpacing: "0.16em", marginBottom: "0.4rem", opacity: 0.8 }}>BARONE BOYS</p>
        <p style={{ color: "rgba(201,168,76,0.45)", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Homebase: Somers Point, NJ</p>
        <a href="mailto:sbaronellc@gmail.com" style={{ color: "rgba(201,168,76,0.45)", fontSize: "0.78rem", display: "block", marginBottom: "0.75rem" }}>sbaronellc@gmail.com</a>
        <p style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>
          Food produced under a NJ Cottage Food operation.
        </p>
        <p style={{ color: "rgba(201,168,76,0.25)", fontSize: "0.68rem" }}>
          © {new Date().getFullYear()} Barone Boys. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--teal)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <CurrentOffering />
      <PreOrderForm />
      <HowItWorks />
      <RotatingMenu />
      <MailingList />
      <FollowUs />
      <Footer />
    </div>
  );
}

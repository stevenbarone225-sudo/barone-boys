import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const SEAL_URL = "/manus-storage/bb_seal_1341d861.png";
const LABEL_URL = "/manus-storage/dolce_cefalu_label_652f580a.png";

// ─── Ornament SVG ────────────────────────────────────────────────────────────
function FleurDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-divider text-sm ${className}`}>
      <span style={{ color: "#c9a84c", fontSize: "1.1rem" }}>✦</span>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#product", label: "Our Pie" },
    { href: "#preorder", label: "Pre-Order" },
    { href: "#story", label: "Our Story" },
    { href: "#notify", label: "Stay Notified" },
  ];
  return (
    <nav
      style={{ backgroundColor: "rgba(20,47,43,0.95)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
      className="sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="container flex items-center justify-between py-3">
        <a href="#hero" className="flex items-center gap-2">
          <img src={SEAL_URL} alt="Barone Boys BB" className="w-9 h-9 object-contain" style={{ filter: "drop-shadow(0 2px 6px rgba(201,168,76,0.4))" }} />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.95rem", letterSpacing: "0.12em" }}>BARONE BOYS BB</span>
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none", opacity: 0.85 }}
              className="hover:opacity-100 transition-opacity uppercase">{l.label}</a>
          ))}
          <a href="#preorder" className="btn-gold" style={{ padding: "0.45rem 1.2rem", fontSize: "0.72rem" }}>Order Now</a>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: "#c9a84c", background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ backgroundColor: "#142f2b", borderTop: "1px solid rgba(201,168,76,0.15)" }} className="md:hidden px-6 pb-4 flex flex-col gap-4 pt-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none" }}>{l.label}</a>
          ))}
          <a href="#preorder" onClick={() => setOpen(false)} className="btn-gold" style={{ textAlign: "center", textDecoration: "none" }}>Order Now</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: "#1c4a45", minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Subtle texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
        {/* Wax Seal */}
        <div style={{ marginBottom: "2.5rem" }}>
          <img
            src={SEAL_URL}
            alt="Barone Boys BB Wax Seal"
            className="seal-glow"
            style={{ width: "min(260px, 55vw)", height: "auto", margin: "0 auto", display: "block" }}
          />
        </div>

        {/* Brand name */}
        <h1 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "clamp(2rem, 6vw, 3.8rem)", letterSpacing: "0.18em", marginBottom: "0.5rem", lineHeight: 1.1 }}>
          BARONE BOYS BB
        </h1>

        {/* Tagline */}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#e8c97a", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", marginBottom: "1.5rem", opacity: 0.9 }}>
          Artisan Italian Flavors, Made with Family.
        </p>

        <FleurDivider className="max-w-xs mx-auto mb-6" />

        <p style={{ color: "rgba(232,201,122,0.75)", fontFamily: "'Lato', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Small-batch desserts rooted in Sicilian tradition. Handcrafted with care, shared with love — one pie at a time.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#preorder" className="btn-gold" style={{ textDecoration: "none" }}>Pre-Order Now</a>
          <a href="#product" className="btn-outline-gold" style={{ textDecoration: "none" }}>Discover Dolce Cefalù</a>
        </div>
      </div>
    </section>
  );
}

// ─── Product Showcase ─────────────────────────────────────────────────────────
function ProductShowcase() {
  return (
    <section id="product" style={{ backgroundColor: "#142f2b", padding: "6rem 0" }}>
      <div className="pistachio-stripe" />
      <div className="container" style={{ paddingTop: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Cinzel', serif", color: "#7a9e6e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Now Available
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            Dolce Cefalù
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#e8c97a", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", opacity: 0.85 }}>
            Pistachio Cannoli Pie
          </p>
          <FleurDivider className="max-w-sm mx-auto mt-4" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          {/* Label image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={LABEL_URL}
              alt="Dolce Cefalù — Pistachio Cannoli Pie Label"
              style={{
                width: "min(280px, 80vw)",
                height: "auto",
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(201,168,76,0.2))",
                borderRadius: "50% / 40%",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "1.4rem", marginBottom: "1.25rem" }}>
              Named for Sicily's Jewel
            </h3>
            <p style={{ color: "rgba(232,201,122,0.85)", lineHeight: 1.9, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
              Cefalù — a sun-drenched coastal town perched on the northern shores of Sicily — inspired the name of our signature pie. <em>Dolce Cefalù</em> is a tribute to the sweet, unhurried life of the Italian south: rich, generous, and made to be shared.
            </p>
            <p style={{ color: "rgba(232,201,122,0.85)", lineHeight: 1.9, marginBottom: "1.5rem", fontSize: "0.97rem" }}>
              A buttery Nilla wafer and pistachio crust cradles a cloud of mascarpone and ricotta cannoli cream, finished with a drift of powdered sugar and dark chocolate chips. Every 9-inch pie is hand-assembled in small batches and sealed fresh for delivery or pickup.
            </p>

            {/* Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
              {[
                ["🫙", "Mascarpone & Ricotta"],
                ["🌿", "Pistachio Crust"],
                ["🍫", "Dark Chocolate Chips"],
                ["🍬", "Powdered Sugar Finish"],
              ].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#7a9e6e", fontSize: "0.85rem", fontFamily: "'Lato', sans-serif" }}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "0.75rem 1rem", borderLeft: "3px solid #7a9e6e", backgroundColor: "rgba(122,158,110,0.08)", borderRadius: "0 0.375rem 0.375rem 0", marginBottom: "1.75rem" }}>
              <p style={{ color: "#a8c49a", fontSize: "0.78rem", fontStyle: "italic", margin: 0 }}>
                Contains: Milk, Wheat, Tree Nuts (Pistachios)
              </p>
            </div>

            <a href="#preorder" className="btn-gold" style={{ textDecoration: "none", display: "inline-block" }}>
              Reserve Your Pie
            </a>
          </div>
        </div>
      </div>
      <div className="pistachio-stripe" style={{ marginTop: "4rem" }} />
    </section>
  );
}

// ─── Pre-Order Form ───────────────────────────────────────────────────────────
function PreOrderForm() {
  const [form, setForm] = useState({ customerName: "", email: "", quantity: 1, fulfillment: "pickup" as "pickup" | "delivery", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.preOrder.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Pre-order received! We'll be in touch soon.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(form);
  };

  return (
    <section id="preorder" style={{ backgroundColor: "#1c4a45", padding: "6rem 0" }}>
      <div className="container" style={{ maxWidth: "680px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "'Cinzel', serif", color: "#7a9e6e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Reserve Your Batch
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            Pre-Order Dolce Cefalù
          </h2>
          <p style={{ color: "rgba(232,201,122,0.75)", fontSize: "0.95rem", lineHeight: 1.7 }}>
            We bake in small batches to ensure every pie meets our standard. Place your pre-order below and we'll confirm your reservation by email.
          </p>
          <FleurDivider className="mt-4" />
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem 2rem", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "0.75rem", backgroundColor: "rgba(201,168,76,0.05)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥧</div>
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "1.5rem", marginBottom: "0.75rem" }}>Pre-Order Received!</h3>
            <p style={{ color: "rgba(232,201,122,0.8)", lineHeight: 1.7 }}>
              Thank you for your order. We'll reach out to {form.email} with confirmation details and pickup/delivery information.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-outline-gold" style={{ marginTop: "1.5rem" }}>
              Place Another Order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="brand-input"
                  placeholder="Your name"
                  value={form.customerName}
                  onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="brand-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                  Quantity (Pies) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={50}
                  className="brand-input"
                  value={form.quantity}
                  onChange={e => setForm(f => ({ ...f, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                  Fulfillment *
                </label>
                <select
                  required
                  className="brand-input"
                  value={form.fulfillment}
                  onChange={e => setForm(f => ({ ...f, fulfillment: e.target.value as "pickup" | "delivery" }))}
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.72rem", letterSpacing: "0.12em", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                Notes (Optional)
              </label>
              <textarea
                className="brand-input"
                placeholder="Any special requests or questions..."
                rows={3}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                style={{ resize: "vertical" }}
              />
            </div>

            <button type="submit" className="btn-gold" disabled={submitMutation.isPending} style={{ marginTop: "0.5rem" }}>
              {submitMutation.isPending ? "Submitting…" : "Submit Pre-Order"}
            </button>

            <p style={{ color: "rgba(201,168,76,0.5)", fontSize: "0.75rem", textAlign: "center" }}>
              We'll confirm your order by email within 24 hours.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Brand Story ──────────────────────────────────────────────────────────────
function BrandStory() {
  return (
    <section id="story" style={{ backgroundColor: "#142f2b", padding: "6rem 0" }}>
      <div className="pistachio-stripe" />
      <div className="container" style={{ maxWidth: "800px", paddingTop: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cinzel', serif", color: "#7a9e6e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Our Story
        </p>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
          The Barone Name
        </h2>

        <img
          src={SEAL_URL}
          alt="Barone Boys BB Seal"
          style={{ width: "120px", height: "auto", margin: "0 auto 2rem", display: "block", opacity: 0.85, filter: "drop-shadow(0 4px 16px rgba(201,168,76,0.3))" }}
        />

        <FleurDivider className="mb-6" />

        <div style={{ color: "rgba(232,201,122,0.82)", lineHeight: 1.95, fontSize: "1rem", textAlign: "left" }}>
          <p style={{ marginBottom: "1.25rem" }}>
            The Barone name has meant something in this family for generations. It started with our grandfather's business — <em>Barone Brothers</em> — built on the belief that quality and family are inseparable. That spirit never left us.
          </p>
          <p style={{ marginBottom: "1.25rem" }}>
            <strong style={{ color: "#c9a84c" }}>Barone Boys BB</strong> is our chapter of that story. A family of sons carrying forward the Italian-American tradition of making food that means something — food that takes time, that uses the best ingredients, and that arrives at your table the way it was meant to: with pride.
          </p>
          <p style={{ marginBottom: "1.25rem" }}>
            Our recipes draw from the kitchens of Sicily — from the pistachio groves of Bronte to the cannoli shops of Palermo — interpreted through the lens of a family that grew up Italian-American, where Sunday meant sauce on the stove and dessert was never an afterthought.
          </p>
          <p>
            Every pie we make is a small-batch, handcrafted expression of that heritage. We don't rush it. We don't cut corners. And we seal every one with the family mark — because when you put your name on something, it has to be right.
          </p>
        </div>

        <FleurDivider className="mt-8" />
      </div>
      <div className="pistachio-stripe" style={{ marginTop: "4rem" }} />
    </section>
  );
}

// ─── Mailing List ─────────────────────────────────────────────────────────────
function MailingList() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribeMutation = trpc.mailingList.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadySubscribed) {
        setAlreadySubscribed(true);
        toast.info("You're already on the list — we'll notify you when the next batch drops.");
      } else {
        setDone(true);
        toast.success("You're on the list!");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  return (
    <section id="notify" style={{ backgroundColor: "#1c4a45", padding: "6rem 0" }}>
      <div className="container" style={{ maxWidth: "560px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cinzel', serif", color: "#7a9e6e", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Next Batch
        </p>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", letterSpacing: "0.08em", marginBottom: "1rem" }}>
          Be First to Know
        </h2>
        <p style={{ color: "rgba(232,201,122,0.75)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.97rem" }}>
          We bake in limited batches. When the next batch is ready, we notify our list first — before any public announcement. Enter your email below to secure your spot at the front of the line.
        </p>

        <FleurDivider className="mb-6" />

        {done || alreadySubscribed ? (
          <div style={{ padding: "2rem", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "0.75rem", backgroundColor: "rgba(201,168,76,0.05)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{alreadySubscribed ? "✅" : "🎉"}</div>
            <h3 style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              {alreadySubscribed ? "Already Subscribed" : "You're on the List!"}
            </h3>
            <p style={{ color: "rgba(232,201,122,0.75)", fontSize: "0.9rem" }}>
              {alreadySubscribed
                ? "We already have your email. You'll be notified when the next batch drops."
                : "We'll send you one email when the next batch of Dolce Cefalù is ready to order. No spam — just pies."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              required
              className="brand-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: "1 1 240px", maxWidth: "340px" }}
            />
            <button type="submit" className="btn-gold" disabled={subscribeMutation.isPending} style={{ whiteSpace: "nowrap" }}>
              {subscribeMutation.isPending ? "Joining…" : "Notify Me"}
            </button>
          </form>
        )}

        <p style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.75rem", marginTop: "1.25rem" }}>
          One email per batch drop. No marketing. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f2420", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "2.5rem 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <img src={SEAL_URL} alt="Barone Boys BB" style={{ width: "56px", height: "auto", margin: "0 auto 1rem", display: "block", opacity: 0.7 }} />
        <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "0.5rem", opacity: 0.8 }}>
          BARONE BOYS BB
        </p>
        <p style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
          Artisan Italian-American Desserts
        </p>
        <p style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.7rem" }}>
          © {new Date().getFullYear()} Barone Boys BB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: "#1c4a45", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <ProductShowcase />
      <PreOrderForm />
      <BrandStory />
      <MailingList />
      <Footer />
    </div>
  );
}

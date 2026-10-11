"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FormEvent, ReactNode } from "react";
import Image from "next/image";

const EMAIL = "haniarohail8@gmail.com";
const WHATSAPP = "923168950571";
const WA_TEXT = "Hi%20Hania%2C%20I%20need%20a%20website";

type ToastItem = { id: number; msg: string; type: "success" | "error" | "info" };
type PaletteItem = { id: string; label: string; action: () => void; icon?: string };

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const TRUST = ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "VERCEL", "FIGMA", "NODE.JS", "NETLIFY"];

const STATS = [
  { k: "Projects Shipped", v: 42, s: "+" },
  { k: "Happy Clients", v: 18, s: "+" },
  { k: "Years Experience", v: 3, s: "+" },
];

const SERVICES = [
  {
    icon: "⚡",
    tag: "Starter",
    t: "HTML → Next.js",
    desc: "Perfect for portfolios & landing pages. Convert your old static site into a modern React powerhouse.",
    price: "$150",
    features: ["Responsive design", "Lighthouse 95+", "SEO setup", "3-day delivery"],
    featured: false,
  },
  {
    icon: "🚀",
    tag: "Popular",
    t: "WordPress → Next.js",
    desc: "Headless Next.js migration. Keep your CMS power, get 10x speed. Perfect for business sites.",
    price: "$250",
    features: ["Headless CMS", "All bugs fixed", "Speed 99/100", "7-day delivery"],
    featured: true,
  },
  {
    icon: "💎",
    tag: "Premium",
    t: "Full Portfolio",
    desc: "This exact design. Animations, dark mode, WhatsApp, email, analytics, SEO. Everything included.",
    price: "$400",
    features: ["This design", "Custom animations", "Full SEO + Analytics", "30-day support"],
    featured: false,
  },
];

const PROCESS = [
  { n: "01", t: "Discovery", d: "Quick call to understand your goals, current site, and vision.", icon: "💬" },
  { n: "02", t: "Design", d: "I share Figma mockups. You approve before I code a single line.", icon: "🎨" },
  { n: "03", t: "Build", d: "Next.js 14 + Tailwind. Weekly progress updates. No surprises.", icon: "⚡" },
  { n: "04", t: "Launch", d: "Deploy to Vercel, SEO + analytics, 30-day free support included.", icon: "🚀" },
];

const FAQS = [
  { q: "How long does it take?", a: "Usually 5–7 days for a full portfolio. Simple HTML to Next.js conversion can be done in 3 days." },
  { q: "Do you provide revisions?", a: "Yes — 2 rounds of revisions are included in every package. Additional rounds at $20 each." },
  { q: "What about hosting?", a: "I deploy to Vercel (free) or Netlify. Custom domain setup is included in the Full Portfolio package." },
  { q: "Payment method?", a: "50% upfront via bank transfer / Wise / Payoneer. Rest after you approve the live preview." },
  { q: "Do you keep in touch after delivery?", a: "Absolutely. 30-day free support for bugs. After that, hourly support available." },
];

const TESTIMONIALS = [
  { n: "Ali R.", c: "Karachi, PK", q: "Hania converted my WP site into Next.js. Speed went from 45 to 98!", r: 5, role: "Business Owner" },
  { n: "Sara M.", c: "Lahore, PK", q: "Best portfolio upgrade I've seen. Old site was simple, this is pro-level.", r: 5, role: "Designer" },
  { n: "Michael K.", c: "USA", q: "Fast delivery, replies within an hour. Delivered exactly what was promised.", r: 5, role: "Upwork Client" },
  { n: "Fatima A.", c: "Dubai, UAE", q: "My WordPress site was so slow. Hania rebuilt it in Next.js — clients love it now.", r: 5, role: "Consultant" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("revealed");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SpotlightCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight ${className}`}
      style={dark ? { background: "linear-gradient(135deg, #17171f 0%, #0e0e14 100%)" } : undefined}
    >
      {children}
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setVal(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "!<>-_/[]{}—=+*^?#";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played.current) return;
        played.current = true;
        let frame = 0;
        const total = text.length * 3;
        const id = setInterval(() => {
          const len = Math.floor(frame / 3);
          setDisplay(
            text
              .split("")
              .map((c, i) => (i < len ? c : chars[Math.floor(Math.random() * chars.length)]))
              .join("")
          );
          frame++;
          if (frame > total) {
            clearInterval(id);
            setDisplay(text);
          }
        }, 45);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FF6B6B] via-[#FFA07A] to-[#FF6B6B]"
        style={{ width: `${p}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
}

function Confetti({ active }: { active: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pieces = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: (i * 23.7) % 100,
      delay: (i % 12) * 0.05,
      duration: 1.8 + ((i * 7) % 14) / 10,
      rotate: (i * 47) % 360,
      color: ["#FF6B6B", "#FFA07A", "#FFD6D6", "#FF8E53"][i % 4],
      size: 6 + (i % 7),
      shape: i % 3 === 0 ? "50%" : "2px",
    }))
  ).current;
  if (!mounted || !active) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.shape,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

function ToastStack({ items, dismiss }: { items: ToastItem[]; dismiss: (id: number) => void }) {
  return (
    <div
      aria-live="polite"
      role="status"
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 pointer-events-none w-[min(92vw,380px)]"
    >
      {items.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={`pointer-events-auto cursor-pointer px-4 py-3 rounded-xl shadow-2xl text-sm font-medium animate-fade-up flex items-center gap-2 border backdrop-blur-xl ${
            t.type === "success"
              ? "bg-green-600/90 border-green-400/30 text-white"
              : t.type === "error"
              ? "bg-red-600/90 border-red-400/30 text-white"
              : "bg-zinc-900/90 border-white/10 text-white"
          }`}
        >
          <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-[#FF6B6B]/40 shadow-lg shadow-[#FF6B6B]/5 bg-white dark:bg-zinc-900/60"
                : "border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/30 backdrop-blur"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-semibold text-sm sm:text-base">{f.q}</span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 text-sm ${
                  isOpen
                    ? "rotate-45 bg-[#FF6B6B] text-white border-[#FF6B6B]"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);
  const t = TESTIMONIALS[idx];
  return (
    <div
      className="max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div
          className="glass rounded-3xl p-8 sm:p-10 min-h-[240px] flex flex-col justify-center animate-fade"
          key={idx}
        >
          <div className="flex gap-0.5 text-[#FF6B6B] text-lg mb-4">{"★".repeat(t.r)}</div>
          <p className="text-lg sm:text-xl leading-relaxed font-light">&ldquo;{t.q}&rdquo;</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFA07A] flex items-center justify-center text-white font-bold">
              {t.n[0]}
            </div>
            <div>
              <p className="text-sm font-bold">{t.n}</p>
              <p className="text-xs text-zinc-500">
                {t.role} · {t.c}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-8 bg-[#FF6B6B]" : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommandPalette({
  open,
  onClose,
  onTheme,
  onCopy,
}: {
  open: boolean;
  onClose: () => void;
  onTheme: () => void;
  onCopy: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = [
    ...NAV.map((n) => ({
      id: `nav-${n.href}`,
      label: `Go to ${n.label}`,
      icon: "→",
      action: () => {
        document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    })),
    { id: "theme", label: "Toggle dark mode", icon: "🌓", action: () => { onTheme(); onClose(); } },
    { id: "copy", label: "Copy email address", icon: "📧", action: () => { onCopy(); onClose(); } },
    { id: "mail", label: `Email: ${EMAIL}`, icon: "✉️", action: () => { window.location.href = `mailto:${EMAIL}`; onClose(); } },
    { id: "wa", label: "Chat on WhatsApp", icon: "💬", action: () => { window.open(`https://wa.me/${WHATSAPP}`, "_blank", "noopener"); onClose(); } },
    { id: "v1", label: "View Old Portfolio (V1)", icon: "🔗", action: () => { window.open("https://hanianaz.netlify.app/", "_blank", "noopener"); onClose(); } },
    { id: "v2", label: "View WP Portfolio (V2)", icon: "🔗", action: () => { window.open("https://hanianaz101.netlify.app/", "_blank", "noopener"); onClose(); } },
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[12vh] px-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade" onClick={onClose} />
      <div className="relative w-full max-w-lg glass rounded-2xl shadow-2xl overflow-hidden animate-fade-up">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <span className="text-[#FF6B6B]">⌘</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search commands..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-500"
          />
          <kbd className="text-[10px] px-2 py-1 rounded bg-white/10 text-zinc-400">ESC</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="text-center text-sm text-zinc-500 py-8">No results</li>}
          {filtered.map((it, i) => (
            <li key={it.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={it.action}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  i === active ? "bg-[#FF6B6B] text-white" : "hover:bg-white/5"
                }`}
              >
                <span className="w-5 text-center">{it.icon}</span>
                <span className="flex-1">{it.label}</span>
                {i === active && <span className="text-xs opacity-75">↵</span>}
              </button>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-white/10 text-[10px] text-zinc-500 flex justify-between">
          <span>↑↓ navigate · ↵ select · Esc close</span>
          <span>Ctrl K</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [showTop, setShowTop] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confetti, setConfetti] = useState(false);
  const [greeting, setGreeting] = useState("Welcome");
  const [activeSection, setActiveSection] = useState("home");
  const toastId = useRef(0);
  const lastSubmit = useRef(0);

  const pushToast = useCallback((msg: string, type: ToastItem["type"] = "info") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
    const g = () => {
      const h = new Date().getHours();
      setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    };
    g();
    const id = setInterval(g, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || paletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, paletteOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      pushToast("Email copied!", "success");
    } catch {
      pushToast("Copy failed", "error");
    }
  }, [pushToast]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmit.current < 5000) {
      setError("Please wait a few seconds.");
      return;
    }
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (form.msg.length > 2000) {
      setError("Message too long.");
      return;
    }
    lastSubmit.current = now;
    setSending(true);
    const subject = encodeURIComponent(`New Project from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.msg}`);
    setTimeout(() => {
      try {
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      } catch {}
      setSending(false);
      setSent(true);
      setConfetti(true);
      pushToast("Gmail opened — thanks!", "success");
      setTimeout(() => setConfetti(false), 2600);
    }, 400);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", msg: "" });
    setSent(false);
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-[#FEFCF9] to-[#FFF0F0] dark:from-[#0a0a12] dark:via-[#07070B] dark:to-[#0d0a12]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#FF6B6B]/25 dark:bg-[#FF6B6B]/15 blur-[120px] animate-aurora" />
        <div
          className="absolute top-[30%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#FFA07A]/25 dark:bg-[#FFA07A]/12 blur-[120px] animate-aurora"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-[-15%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#FFD6D6]/40 dark:bg-[#FFD6D6]/8 blur-[120px] animate-aurora"
          style={{ animationDelay: "8s" }}
        />
        <div className="absolute inset-0 noise" />
      </div>

      <ReadingProgress />
      <Confetti active={confetti} />
      <ToastStack items={toasts} dismiss={dismissToast} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onTheme={toggleTheme}
        onCopy={copyEmail}
      />

      <div className="bg-black text-white text-[10px] sm:text-xs py-2.5 text-center tracking-widest px-3 relative z-40">
        <span className="text-[#FF6B6B]">✦</span> AVAILABLE FOR FREELANCE • KARACHI •{" "}
        <a href={`mailto:${EMAIL}`} className="underline text-[#FF6B6B] hover:text-white transition">
          {EMAIL}
        </a>{" "}
        <span className="text-[#FF6B6B]">✦</span>
      </div>

      <nav
        className={`sticky top-0 z-50 border-b border-zinc-200/40 dark:border-white/5 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "glass py-2.5 px-4 sm:px-6 lg:px-12" : "bg-transparent py-4 px-4 sm:px-6 lg:px-12"
        }`}
      >
        <a
          href="#home"
          className={`font-black tracking-tight transition-all duration-300 ${
            scrolled ? "text-lg" : "text-xl"
          }`}
        >
          Hania<span className="text-[#FF6B6B]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV.map((n) => {
            const isActive = activeSection === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative px-3 py-2 rounded-full transition-colors ${
                  isActive ? "text-[#FF6B6B]" : "hover:text-[#FF6B6B]"
                }`}
              >
                {n.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6B6B]" />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="hidden lg:inline-flex items-center gap-2 text-xs border border-zinc-200/60 dark:border-white/10 px-3 py-1.5 rounded-full hover:bg-white/60 dark:hover:bg-white/5 transition text-zinc-500 backdrop-blur"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">⌘K</kbd>
          </button>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-[#FF6B6B] text-white text-xs px-5 py-2.5 rounded-full font-bold hover:bg-[#ff4757] transition shadow-lg shadow-[#FF6B6B]/30"
          >
            Hire Me
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-zinc-200/60 dark:border-white/10 flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/5 transition text-sm backdrop-blur"
          >
            {mounted && dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden w-9 h-9 rounded-full border border-zinc-200/60 dark:border-white/10 flex items-center justify-center backdrop-blur"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] md:hidden transition ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-[82%] max-w-xs glass shadow-2xl p-6 flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-black">
              Hania<span className="text-[#FF6B6B]">.</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close"
              className="w-9 h-9 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`py-3.5 px-3 rounded-xl text-base font-medium transition animate-fade-up ${
                  activeSection === n.href.slice(1) ? "bg-[#FF6B6B]/10 text-[#FF6B6B]" : "hover:bg-white/5"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/10">
            <a
              href={`mailto:${EMAIL}`}
              className="text-center text-sm py-3 rounded-full border border-zinc-200 dark:border-white/10 font-medium"
            >
              ✉️ Email
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm bg-[#25D366] text-white py-3 rounded-full font-bold"
            >
              💬 WhatsApp
            </a>
          </div>
        </aside>
      </div>

      <section className="relative">
        <div id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 lg:pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200/60 dark:border-white/10 rounded-full pl-1 pr-4 py-1 text-xs font-medium">
                  <span className="relative flex w-6 h-6 items-center justify-center">
                    <span className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {greeting} — available for new projects
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black leading-[0.95] tracking-tight mt-6">
                  I turn
                  <br />
                  <Scramble text="SLOW" className="shine-text" />
                  <span className="text-[#FF6B6B]"> </span>
                  sites
                  <br />
                  into{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">fast ones.</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-[#FF6B6B]/25 -z-0 rounded-sm" />
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-7 text-zinc-600 dark:text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed">
                  Karachi-based <strong className="text-zinc-900 dark:text-white">Frontend &amp; Next.js Developer</strong>. I
                  rebuilt my own{" "}
                  <a
                    href="https://hanianaz.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6B6B] hover:underline underline-offset-4 font-medium"
                  >
                    old portfolio
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://hanianaz101.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6B6B] hover:underline underline-offset-4 font-medium"
                  >
                    WordPress site
                  </a>{" "}
                  into this. Now I do the same for clients — HTML/WordPress → Next.js 14 in 7 days.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="group relative bg-zinc-900 dark:bg-white text-white dark:text-black px-7 py-3.5 rounded-full font-bold text-sm hover:scale-[1.03] active:scale-95 transition-transform shadow-2xl shadow-black/20 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start a project <span className="group-hover:translate-x-1 transition">→</span>
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-[#25D366]/10 text-[#1ea952] dark:text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border border-zinc-300/70 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/5 transition"
                  >
                    Copy email
                  </button>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                  {STATS.map((s) => (
                    <div key={s.k}>
                      <div className="text-2xl sm:text-3xl font-black text-[#FF6B6B]">
                        <CountUp to={s.v} suffix={s.s} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-zinc-500 mt-1 font-medium uppercase tracking-wider">
                        {s.k}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={250} className="lg:col-span-5">
              <div className="relative mt-10 lg:mt-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[110%] aspect-square rounded-full border border-dashed border-[#FF6B6B]/20 animate-spin-slow" />
                </div>
                <div className="relative animate-float">
                  <div className="relative rounded-[36px] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl shadow-[#FF6B6B]/20">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                      alt="Hania Naz — Frontend Developer"
                      width={800}
                      height={800}
                      priority
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="h-[380px] sm:h-[480px] lg:h-[540px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div
                    className="absolute -top-3 -right-3 sm:-right-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-3 flex items-center gap-2 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold">Open to work</span>
                  </div>

                  <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-4 max-w-[200px]">
                    <div className="flex gap-0.5 text-[#FF6B6B] text-xs">★★★★★</div>
                    <p className="text-[11px] mt-2 font-medium leading-tight">18+ happy clients worldwide</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-zinc-200/50 dark:border-white/5 overflow-hidden marquee-wrap bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm">
        <div className="flex gap-10 animate-marquee min-w-max marquee-track items-center px-6">
          {[...TRUST, ...TRUST, ...TRUST].map((s, i) => (
            <span
              key={i}
              className="text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              What I <span className="shine-text">build</span>.
            </h2>
            <p className="text-zinc-500 mt-4 text-sm max-w-md mx-auto">
              Transparent pricing. Fixed timelines. No hidden fees.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <SpotlightCard
                className={`group relative h-full p-8 rounded-[28px] border transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                  c.featured
                    ? "border-[#FF6B6B]/40 shadow-2xl shadow-[#FF6B6B]/15 text-white"
                    : "border-zinc-200/60 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md hover:shadow-2xl"
                }`}
                dark={c.featured}
              >
                {c.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B6B] text-white text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full shadow-lg shadow-[#FF6B6B]/40">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{c.icon}</span>
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      c.featured ? "bg-white/10 text-white" : "bg-[#FF6B6B]/10 text-[#FF6B6B]"
                    }`}
                  >
                    {c.tag}
                  </span>
                </div>

                <h3 className="font-bold text-xl tracking-tight">{c.t}</h3>
                <p
                  className={`text-sm mt-3 leading-relaxed ${
                    c.featured ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {c.desc}
                </p>

                <ul className="mt-6 space-y-2">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 text-xs ${
                        c.featured ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className={`text-4xl font-black tracking-tight ${c.featured ? "text-white" : ""}`}>
                    {c.price}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest mt-1 text-zinc-500">
                    starting from
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                      `Hi Hania, I'm interested in the ${c.t} package (${c.price}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 block text-center py-3 rounded-full text-sm font-bold transition ${
                      c.featured
                        ? "bg-[#FF6B6B] text-white hover:bg-[#ff4757]"
                        : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-[#FF6B6B] dark:hover:bg-[#FF6B6B] dark:hover:text-white"
                    }`}
                  >
                    Order on WhatsApp
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { i: "🔒", t: "50% Upfront", s: "Rest after approval" },
              { i: "⚡", t: "5–7 Days", s: "Fast delivery" },
              { i: "🛠️", t: "30-Day Support", s: "Free bug fixes" },
              { i: "✅", t: "Lighthouse 95+", s: "Speed guaranteed" },
            ].map((b) => (
              <div key={b.t} className="glass rounded-2xl p-4 text-center">
                <div className="text-xl mb-2">{b.i}</div>
                <div className="text-xs font-bold">{b.t}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{b.s}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section
        id="work"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-zinc-200/50 dark:border-white/5"
      >
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
              SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Featured <span className="shine-text">projects</span>.
            </h2>
            <p className="text-zinc-500 mt-4 text-sm max-w-md mx-auto">
              Real sites, real results. Click any card to visit.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              t: "HaniaNaz101",
              sub: "Original Portfolio",
              d: "HTML + CSS + Tailwind. My first portfolio — live and love it.",
              link: "https://hanianaz101.netlify.app/",
              tags: ["HTML", "Tailwind", "Netlify"],
              accent: "from-pink-500/20 to-rose-500/10",
            },
            {
              t: "Next.js Rebuild",
              sub: "This Website",
              d: "The site you're on — built with Next.js 14 App Router, Tailwind, and pure love.",
              link: "#",
              tags: ["Next.js 14", "TypeScript", "Vercel"],
              accent: "from-orange-500/20 to-amber-500/10",
            },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 150}>
              <a
                href={p.link}
                target={p.link === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group block relative rounded-[28px] border border-zinc-200/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                <div className={`aspect-[16/10] relative bg-gradient-to-br ${p.accent} overflow-hidden`}>
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl sm:text-7xl font-black tracking-tighter opacity-25 select-none">
                      {p.t.split(" ")[0]}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black tracking-tight">{p.t}</h3>
                      <p className="text-xs text-[#FF6B6B] font-medium mt-1">{p.sub}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center group-hover:bg-[#FF6B6B] group-hover:text-white group-hover:border-[#FF6B6B] transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mt-3 leading-relaxed">{p.d}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-zinc-200/50 dark:border-white/5"
      >
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
              PROCESS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              How I <span className="shine-text">work</span>.
            </h2>
            <p className="text-zinc-500 mt-4 text-sm max-w-md mx-auto">
              Simple 4-step process. Zero surprises, full transparency.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 120}>
              <div className="relative group">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] right-[-40%] h-[1px] bg-gradient-to-r from-[#FF6B6B]/40 to-transparent" />
                )}
                <div className="relative glass rounded-3xl p-6 h-full hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-2xl">
                      {p.icon}
                    </div>
                    <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 select-none">
                      {p.n}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{p.t}</h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-zinc-200/50 dark:border-white/5">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Loved by <span className="shine-text">clients</span>.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <TestimonialCarousel />
        </Reveal>
      </section>

      <section
        id="faq"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 border-t border-zinc-200/50 dark:border-white/5"
      >
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Common <span className="shine-text">questions</span>.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <FaqAccordion />
        </Reveal>
      </section>

      <section id="contact" className="relative px-4 sm:px-6 lg:px-12 py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#FF6B6B] mb-3">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95]">
                Let&apos;s build
                <br />
                something <span className="shine-text">great</span>.
              </h2>
              <p className="text-zinc-500 mt-6 text-sm max-w-md mx-auto">
                I usually reply within 2 hours. Pick whatever is easiest for you.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass rounded-[28px] p-7 sm:p-8 h-full flex flex-col">
                <div className="space-y-4">
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-[#FF6B6B] group-hover:text-white transition">
                      📧
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-zinc-500 font-medium">Email</div>
                      <div className="text-sm font-bold truncate">{EMAIL}</div>
                    </div>
                  </a>
                  <button onClick={copyEmail} className="flex items-center gap-4 group w-full text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-[#FF6B6B] group-hover:text-white transition">
                      📋
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">Copy email to clipboard</div>
                      <div className="text-sm font-bold">One click copy</div>
                    </div>
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition">
                      💬
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">WhatsApp (fastest)</div>
                      <div className="text-sm font-bold">+92 316 895 0571</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-xl shrink-0">
                      📍
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-medium">Based in</div>
                      <div className="text-sm font-bold">Karachi, Pakistan · Worldwide</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200/50 dark:border-white/10">
                  <p className="text-xs text-zinc-500 mb-4">Also find my work on:</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://hanianaz.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition"
                    >
                      Old V1 →
                    </a>
                    <a
                      href="https://hanianaz101.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition"
                    >
                      WP V2 →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="glass rounded-[28px] p-7 sm:p-8">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {error && (
                      <div
                        role="alert"
                        className="bg-red-500/10 text-red-500 text-xs p-3 rounded-xl border border-red-500/20"
                      >
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-2 block">Your name</label>
                      <input
                        required
                        autoComplete="name"
                        maxLength={80}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full bg-white/50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-2 block">Email address</label>
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        maxLength={120}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full bg-white/50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-2 block">Project details</label>
                      <textarea
                        required
                        maxLength={2000}
                        value={form.msg}
                        onChange={(e) => setForm({ ...form, msg: e.target.value })}
                        placeholder="Tell me about your current site and what you need..."
                        className="w-full bg-white/50 dark:bg-white/5 border border-zinc-200/60 dark:border-white/10 px-4 py-3 rounded-xl text-sm h-28 focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-[#FF6B6B] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#ff4757] disabled:opacity-70 disabled:cursor-not-allowed transition shadow-xl shadow-[#FF6B6B]/30 flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Opening Gmail...
                        </>
                      ) : (
                        <>
                          Send message <span>→</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-zinc-500 text-center">
                      Opens your email app · or use WhatsApp above
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-14">
                    <div className="text-6xl mb-5">🎉</div>
                    <h3 className="font-black text-2xl tracking-tight">Message ready!</h3>
                    <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-xs mx-auto">
                      Your email to <b>{EMAIL}</b> is prepared. Hit send in your email app — I&apos;ll reply within 2
                      hours.
                    </p>
                    <button onClick={resetForm} className="text-xs text-[#FF6B6B] font-bold mt-6 hover:underline">
                      ← Send another message
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200/50 dark:border-white/5 px-4 sm:px-6 lg:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-black">
                Hania<span className="text-[#FF6B6B]">.</span>
              </span>
              <span className="text-xs text-zinc-500">© 2026 Hania Rohail</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="hover:text-[#FF6B6B] transition">
                  {n.label}
                </a>
              ))}
            </div>
            <div className="text-[10px] text-zinc-500 text-center md:text-right">
              <div className="flex items-center gap-1.5 justify-center md:justify-end">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-white/10 font-mono">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-white/10 font-mono">K</kbd>
                <span>for commands</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full bg-[#FF6B6B] text-white shadow-xl shadow-[#FF6B6B]/40 hover:bg-[#ff4757] hover:scale-110 active:scale-95 transition flex items-center justify-center animate-fade-up"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        )}
        <a
          href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition flex items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="relative">
            <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1s-.5-.1-.7.1c-.2.3-.8 1-1 1.2-.2.2-.4.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5s.2-.3.3-.5c.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5s-.4 0-.5 0-.5.1-.8.4c-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.4M12.05 21.8h-.005a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 0 1-1.5-5.3c0-5.4 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.9-9.9 9.9m8.4-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .15 5.3.15 11.9c0 2.1.5 4.1 1.6 5.9L.05 24l6.3-1.7c1.7 1 3.7 1.5 5.7 1.5h.005c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4" />
          </svg>
        </a>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10 p-3 flex gap-2">
        <a
          href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white text-center py-3 rounded-full font-bold text-sm active:scale-95 transition"
        >
          💬 WhatsApp
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="flex-1 bg-[#FF6B6B] text-white text-center py-3 rounded-full font-bold text-sm active:scale-95 transition"
        >
          Email →
        </a>
      </div>
    </main>
  );
}
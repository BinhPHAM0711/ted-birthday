"use client";

import { useState, useEffect, useRef, useMemo } from "react";

const REASONS = [
  "Em chịu khó tán anh 🤭",
  "Em là người anh nghĩ đến mỗi sáng ngủ dậy ✨",
  "Em hay dỗi để bắt anh dỗ 🤍",
  "Em chịu dỗ anh khi anh dỗi lại 💫",
  "Em đẹp zai vãi 🌸",
  "Em chịu khó giao tiếp để giải tỏa khúc mắc ♡",
  "Vì em nên anh muốn mình tốt hơn mỗi ngày 💖",
  "Còn nhiều nhiều nhiều lý do lắm (๑'ᵕ'๑)⸝🌟"
];

const MEMORIES = [
  {
    src: "/sakura1.jpg",
    label: "Sakura Season 🌸",
    caption: "Đi date mùa hoa anh đào với anh ₍₍⚞(˶>ᗜ<˶)⚟⁾⁾",
    rotate: "-2deg",
    accent: "#f9a8d4",
  },
  {
    src: "/sakura2.png",
    label: "Sakura Season 🌸",
    caption: "Lần đầu mang em đi date online ha (˶ᵔ ᵕ ᵔ˶)",
    rotate: "1.2deg",
    accent: "#f9a8d4",
  },
  {
    src: "/facetime2.PNG",
    label: "Late Night FaceTime 🌙",
    caption: "Tối bên em 🫶🏻🥹❤️‍🩹",
    rotate: "-1.7deg",
    accent: "#a5b4fc",
  },
  {
    src: "/facetime3.PNG",
    label: "Late Night FaceTime 🌙",
    caption: "Hoặc tối bên anh nè •ᴗ•",
    rotate: "1.5deg",
    accent: "#a5b4fc",
  },
  {
    src: "/facetime1.png",
    label: "Late Night FaceTime 🌙",
    caption: "Mấy tối hành nhau đến 3,4g sáng (,,>﹏<,,)👉👈",
    rotate: "1.5deg",
    accent: "#a5b4fc",
  },
  {
    src: "/ubereat1.png",
    label: "Yêu Anh ❤️",
    caption: "Cơ mà luôn có bằng chằng em yêu anh đó nhé ⸜(｡˃ ᵕ ˂ )⸝♡",
    rotate: "-1deg",
    accent: "#fcd34d",
  },
  {
    src: "/ubereat.png",
    label: "Yêu Anh ❤️",
    caption: "Lo cho anh cả đêm, sáng anh hangover thì có đồ ăn sáng sẵn luôn 🫶🥹(╥ ω ╥)",
    rotate: "1.8deg",
    accent: "#fcd34d",
  },
  {
    src: "/ubereat3.png",
    label: "Yêu Anh ❤️",
    caption: "Thêm bằng chứng yêu anh hehe (つ｡˃ ᵕ ˂)つ ⸝♡",
    rotate: "-1.0deg",
    accent: "#fcd34d",
  },
  {
    src: "/wisteria.png",
    label: "In Full Bloom 🌼",
    caption: "Thêm buổi đi chơi ngắm hoa nữa nè, lần này là hoa tử đằng nhé ᕙ(  •̀ ᗜ •́  )ᕗ",
    rotate: "2deg",
    accent: "#86efac",
  },
  {
    src: "/wisteria2.jpg",
    label: "In Full Bloom 🌼",
    caption: "Đi 1 mình nhưng không bùn ₊𖥔 ℓo͟v͟ꫀ ყoυ! ۪ ׄ໑୧ ׅ𖥔ׄ",
    rotate: "-1.0deg",
    accent: "#86efac",
  },
  {
    src: "/wisteria3.png",
    label: "In Full Bloom 🌼",
    caption: "Chả hiêu sau iu thế ý ׄ💖💗🥰💞",
    rotate: "1.5deg",
    accent: "#86efac",
  },
  {
    src: "/baby1.jpg",
    label: "My Goofball 😂",
    caption: "This man… I love him so much it's embarrassing",
    rotate: "-1.5deg",
    accent: "#f9a8d4",
  },
];

// Seeded pseudo-random so server+client agree — no hydration mismatch
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function makePetals() {
  const emojis = ["🌸", "🌺", "✿", "❀"];
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${seededRand(i * 7) * 100}%`,
    delay: `${seededRand(i * 7 + 1) * 8}s`,
    duration: `${6 + seededRand(i * 7 + 2) * 6}s`,
    size: `${13 + seededRand(i * 7 + 3) * 12}px`,
    emoji: emojis[Math.floor(seededRand(i * 7 + 4) * 4)],
  }));
}

function makeStars() {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${seededRand(i * 13 + 100) * 100}%`,
    top: `${seededRand(i * 13 + 101) * 100}%`,
    delay: `${seededRand(i * 13 + 102) * 4}s`,
    size: `${1 + seededRand(i * 13 + 103) * 2}px`,
    dur: `${2 + seededRand(i * 13 + 104) * 3}s`,
  }));
}

const PETALS = makePetals();
const STARS = makeStars();

export default function BirthdayGiftWebsite() {
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [reasonIdx, setReasonIdx] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const heartCounter = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Only render random-positioned elements after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReasonIdx((i) => (i + 1) % REASONS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const spawnHearts = (clientX: number, clientY: number) => {
    const newHearts = Array.from({ length: 7 }, (_, i) => ({
      id: heartCounter.current++,
      x: clientX + (seededRand(heartCounter.current + i) - 0.5) * 60,
      y: clientY + (seededRand(heartCounter.current + i + 1) - 0.5) * 40,
    }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => setHearts((h) => h.filter((hh) => !newHearts.find((n) => n.id === hh.id))), 1400);
  };

  const handleSurpriseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    spawnHearts(e.clientX, e.clientY);
    setHeartBurst(true);
    setTapCount((c) => c + 1);
    setTimeout(() => setHeartBurst(false), 600);
  };

  const heartEmojis = ["💗","💖","💕","✨","🌸","🩷"];

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden relative select-none"
      style={{ background: "linear-gradient(160deg, #0a0612 0%, #110820 40%, #0d0f1f 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');
        * { box-sizing: border-box; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        @keyframes petalFall {
          0% { transform: translateY(-60px) rotate(0deg) scale(1); opacity: 0.9; }
          80% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.7); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.15; transform:scale(1); }
          50% { opacity:0.9; transform:scale(1.6); }
        }
        @keyframes heartPop {
          0% { transform: translateY(0) scale(0.4); opacity: 1; }
          100% { transform: translateY(-90px) scale(1.3); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 20px rgba(255,140,180,0.2); }
          50% { box-shadow: 0 0 55px rgba(255,140,180,0.5), 0 0 90px rgba(180,100,255,0.2); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes reasonSlide {
          0% { opacity:0; transform:translateY(10px); }
          15%,85% { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(-10px); }
        }
        @keyframes polaroidIn {
          0% { opacity:0; transform: translateY(30px); }
          100% { opacity:1; transform: translateY(0); }
        }
        @keyframes memoryExpand {
          0% { transform: scale(0.88); opacity:0; }
          100% { transform: scale(1); opacity:1; }
        }

        .petal { position:fixed; top:-30px; animation: petalFall linear infinite; pointer-events:none; z-index:5; }
        .star { position:absolute; border-radius:50%; background:white; animation:twinkle ease-in-out infinite; }
        .heart-pop { position:fixed; animation:heartPop 1.4s ease-out forwards; pointer-events:none; font-size:22px; z-index:999; }
        .float-in { animation: floatUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity:0; }
        .pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #f9a8d4, #fff, #e879f9, #f9a8d4);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer 4s linear infinite;
        }
        .reason-text { animation: reasonSlide 3.2s ease-in-out forwards; }
        .polaroid {
          animation: polaroidIn 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards;
          opacity: 0;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .polaroid:active { transform: scale(0.94) !important; }
        .gallery-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 16px 20px 28px;
          scrollbar-width: none;
        }
        .gallery-scroll::-webkit-scrollbar { display: none; }
        .gallery-scroll > * { scroll-snap-align: center; }
        .card-wrap { perspective: 1000px; }
        .card-inner { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); transform-style: preserve-3d; position: relative; }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .card-back-face { transform: rotateY(180deg); position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .memory-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(5,3,14,0.94);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: memoryExpand 0.25s ease-out;
        }
        .memory-overlay-card {
          max-width: 380px; width: 100%;
          background: #170e2a;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,180,210,0.2);
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
        }
      `}</style>

      {/* Fixed floating hearts on tap — client only */}
      {mounted && hearts.map((h, i) => (
        <span key={h.id} className="heart-pop" style={{ left: h.x, top: h.y }}>
          {heartEmojis[i % heartEmojis.length]}
        </span>
      ))}

      {/* Stars — client only to avoid hydration mismatch */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {mounted && STARS.map((s) => (
          <div key={s.id} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }} />
        ))}
      </div>

      {/* Falling Petals — client only */}
      {mounted && PETALS.map((p) => (
        <div key={p.id} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, fontSize: p.size }}>
          {p.emoji}
        </div>
      ))}

      {/* Memory Lightbox */}
      {activeMemory !== null && (
        <div className="memory-overlay" onClick={() => setActiveMemory(null)}>
          <div className="memory-overlay-card" onClick={(e) => e.stopPropagation()}>
            <img
              src={MEMORIES[activeMemory].src}
              alt={MEMORIES[activeMemory].label}
              style={{ width: "100%", maxHeight: 440, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "20px 24px 28px" }}>
              <p className="font-display italic" style={{ fontSize: 23, color: MEMORIES[activeMemory].accent, marginBottom: 8 }}>
                {MEMORIES[activeMemory].label}
              </p>
              <p className="font-body" style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.65 }}>
                {MEMORIES[activeMemory].caption}
              </p>
              <button
                onClick={() => setActiveMemory(null)}
                className="font-body"
                style={{ marginTop: 20, width: "100%", padding: "13px", borderRadius: 50, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)", fontSize: 14, cursor: "pointer" }}
              >
                close ♡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <section className="relative z-20 max-w-[430px] mx-auto pt-8 font-body">

        {/* HERO */}
        <div className="px-5">
          <div
            className={`relative overflow-hidden rounded-[36px] shadow-2xl pulse-glow transition-all duration-1000 ${revealed ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ border: "1px solid rgba(255,180,210,0.15)" }}
          >
            <img src="/background.jpg" alt="Us" className="w-full object-cover object-center rounded-[40px]" style={{ aspectRatio: "2 / 1", maxHeight: "85vh", }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(10,6,18,0.88) 100%)" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-8 px-5">
              <p className="font-display italic text-pink-200 mb-1 float-in" style={{ fontSize: 40, animationDelay: "0.2s", letterSpacing: "0.08em" }}>Happy Birthday</p>
              <p className="font-display italic text-pink-200 mt-1 float-in" style={{ fontSize: 22, animationDelay: "0.6s" }}>Người Yêu Anhh ♡</p>
            </div>
          </div>
        </div>

        {/* REASON TICKER */}
        <div className="px-5 mt-5">
          <div
            className="rounded-[24px] py-5 px-6 text-center float-in"
            style={{ animationDelay: "0.8s", background: "linear-gradient(135deg, rgba(255,150,190,0.08), rgba(180,100,255,0.08))", border: "1px solid rgba(255,180,210,0.12)" }}
          >
            <p className="text-pink-300/60 text-xs uppercase tracking-[0.2em] mb-3 font-body">Why I love you</p>
            <div style={{ minHeight: 50, overflow: "hidden" }}>
              <p key={reasonIdx} className="font-display italic reason-text text-white" style={{ fontSize: 19, lineHeight: 1.5 }}>
                {REASONS[reasonIdx]}
              </p>
            </div>
          </div>
        </div>

        {/* MEMORIES GALLERY */}
        <div className="mt-10 float-in" style={{ animationDelay: "0.9s" }}>
          <div className="px-5 mb-1 flex items-baseline gap-3">
            <h2 className="font-display italic text-pink-200" style={{ fontSize: 28 }}>Our Memories</h2>
            <span className="text-white/30 font-body text-xs">← scroll →</span>
          </div>
          <p className="px-5 font-body text-white/35 text-xs mb-3">tap any photo to relive it ♡</p>

          <div ref={galleryRef} className="gallery-scroll">
            {MEMORIES.map((m, i) => (
              <div
                key={i}
                className="polaroid"
                style={{ animationDelay: `${0.9 + i * 0.1}s`, width: 195 }}
                onClick={() => setActiveMemory(i)}
              >
                <div
                  style={{
                    background: "#1a1030",
                    borderRadius: 16,
                    padding: "10px 10px 18px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 10px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)",
                    transform: `rotate(${m.rotate})`,
                  }}
                >
                  <div style={{ borderRadius: 10, overflow: "hidden", height: 215 }}>
                    <img src={m.src} alt={m.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ marginTop: 11, paddingLeft: 3, paddingRight: 3 }}>
                    <p className="font-display italic" style={{ fontSize: 14, color: m.accent, lineHeight: 1.3, marginBottom: 3 }}>{m.label}</p>
                    <p className="font-body" style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>{m.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-0 mb-1">
            {MEMORIES.map((_, i) => (
              <div
                key={i}
                onClick={() => { galleryRef.current?.scrollTo({ left: i * 213, behavior: "smooth" }); }}
                style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.2)", cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        {/* FLIP CARD */}
        <div className="px-5 mt-7">
          <div
            className="card-wrap float-in transition-all duration-700 ease-in-out"
            style={{
              animationDelay: "1.1s",
              height: cardFlipped ? 500 : 168,
            }}
            onClick={() => setCardFlipped(!cardFlipped)}
          >
            <div
              className={`card-inner rounded-[28px] ${cardFlipped ? "flipped" : ""}`}
              style={{
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)",
                transform: cardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT */}
              <div
                className="card-face rounded-[28px] p-6 flex flex-col items-center justify-center text-center absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,130,180,0.12), rgba(140,90,255,0.12))",
                  border: "1px solid rgba(255,180,210,0.14)",
                  minHeight: 168,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>💌</div>
                <p className="font-display italic text-pink-200" style={{ fontSize: 20 }}>
                  Tap to open a letter
                </p>
                <p className="text-white/35 text-xs mt-2 font-body">just for you ♡</p>
              </div>

              {/* BACK */}
              <div
                className="card-back-face rounded-[28px] p-6 flex flex-col items-center justify-center absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,130,180,0.15), rgba(140,90,255,0.15))",
                  border: "1px solid rgba(255,180,210,0.2)",
                  minHeight: 500,
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <h2 className="font-display text-pink-200 mb-4 text-center" style={{ fontSize: 21 }}>
                  Gửi bé Ted<br/>Nguyễn Hoài Văn sinh ngày 18/05/1999<br/>🫵🏻ـــــــــــــــﮩ٨ـ❤️️
                </h2>
                <p className="font-body text-white/78 leading-8 text-center" style={{ fontSize: 12 }}>
                  Chúc mừng sinh nhật em!<br />
                  I'm so grateful you exist in this world ꫂ❁<br />
                  Today marks 127 days since the first time we met!!<br />
                  Thanks for choosing me, your vacation fling (≖⩊≖)<br />
                  You make me happy, jealous, tear up & loved -`♡´-<br /><br />  
                  Anh chưa bao giờ cảm thấy yêu và được yêu<br />
                  như 4 tháng vừa qua với em! (⸝⸝๑﹏๑⸝⸝)<br />
                  Vậy nên hôm nay chốt luôn nhé ↓↓↓↓<br /><br />
                  <span className="font-display text-pink-300" style={{ fontSize: 24 }}>
                    Làm người yêu anh nhé ♡
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* THREE MINI CARDS */}
        <div className="px-5 mt-5 grid grid-cols-3 gap-3 float-in" style={{ animationDelay: "1.2s" }}>
          {[
            { icon: "♉︎", title: "Taurus", text: "brings down-to-earth simplicity and presence, helping Scorpio feel grounded" },
            { icon: "♏︎", title: "Scorpio", text: "invites Taurus to grow deeper, encouraging emotional evolution" },
            { icon: "💖", title: "Forever", text: "We crave security, loyalty, and deep intimacy. Growing together, always" },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-[20px] p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,180,210,0.1)", transition: "transform 0.15s" }}
              onTouchStart={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(0.94)"; }}
              onTouchEnd={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
            >
              <div style={{ fontSize: 26, marginBottom: 5 }}>{c.icon}</div>
              <p className="font-display italic text-pink-100" style={{ fontSize: 12, marginBottom: 3 }}>{c.title}</p>
              <p className="text-white/45 font-body" style={{ fontSize: 10, lineHeight: 1.5 }}>{c.text}</p>
            </div>
          ))}
        </div>

        {/* SURPRISE BUTTON */}
        <div className="px-5 mt-8 mb-14 text-center float-in relative" style={{ animationDelay: "1.4s" }}>
          <button
            className="relative overflow-hidden rounded-full font-body font-medium text-white"
            onClick={handleSurpriseClick}
            style={{
              padding: "18px 52px",
              fontSize: 13,
              background: heartBurst ? "linear-gradient(135deg, #f472b6, #a855f7)" : "linear-gradient(135deg, #ec4899, #8b5cf6)",
              boxShadow: heartBurst ? "0 0 60px rgba(244,114,182,0.7)" : "0 8px 40px rgba(236,72,153,0.35)",
              transition: "all 0.3s ease",
              transform: heartBurst ? "scale(0.93)" : "scale(1)",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {tapCount === 0
              ? "🎁 Tap for a Surprise"
              : tapCount < 4
              ? `💗 Anh yêu em${" nhiều".repeat(tapCount)}`
              : "💖 Aw Yêu em nhiều NHẤT luôn 🧸ྀི"}
          </button>
          <p className="text-white/22 text-xs mt-3 font-body">
            {tapCount > 0 ? `Xem em tap được bn lần ( •̯́ ₃ •̯̀) : ${tapCount} ${tapCount !== 1 ? "lần" : ""} ♡` : "Tap đi nào, đừng ngại! 🤭"}
          </p>
        </div>

      </section>
    </main>
  );
}

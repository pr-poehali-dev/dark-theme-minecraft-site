import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/02d41f7e-f989-4075-89dd-56e64542b5a2/files/d14ff8b4-304c-4d5a-91d8-c9f7712f2268.jpg";
const STEAMPUNKX_LOGO = "https://cdn.poehali.dev/projects/02d41f7e-f989-4075-89dd-56e64542b5a2/bucket/54fc8589-0096-43e5-b4ca-a452536506ee.png";
const SERVER_IP = "188.127.241.24:32398";

// Steampunk color palette
const C = {
  copper: "#b87333",
  copperLight: "#d4956a",
  brass: "#c9a84c",
  brassLight: "#dfc06e",
  bronze: "#8b6914",
  rust: "#8b3a2a",
  steam: "#a8c4d8",
  parchment: "#e8d5a8",
  ironDark: "#1a1410",
  ironMid: "#2a1f10",
};

const donateItems = [
  {
    name: "Стартер",
    price: "149",
    color: C.steam,
    glowColor: "rgba(168,196,216,0.25)",
    badge: null,
    icon: "🔩",
    perks: [
      "Префикс [Стартер] в чате",
      "5,000 монет на старт",
      "Кит раз в 3 дня",
      "Доступ к /fly в хабе",
      "Цветной ник",
    ],
  },
  {
    name: "Механик",
    price: "349",
    color: C.copper,
    glowColor: "rgba(184,115,51,0.3)",
    badge: "ПОПУЛЯРНОЕ",
    icon: "⚙️",
    perks: [
      "Префикс [⚙ Механик] в чате",
      "20,000 монет на старт",
      "Кит раз в день",
      "/fly на всех серверах",
      "Кастомный ник + цвет",
      "2x опыт во всех режимах",
      "Приоритетный вход",
    ],
  },
  {
    name: "Инженер",
    price: "699",
    color: C.brass,
    glowColor: "rgba(201,168,76,0.35)",
    badge: "ТОП",
    icon: "🔧",
    perks: [
      "Префикс [★ Инженер] в чате",
      "60,000 монет на старт",
      "Кит раз в 12 часов",
      "/fly везде + анимация",
      "Уникальный ник эффект",
      "3x опыт во всех режимах",
      "VIP слот (всегда войдёт)",
      "Личный Discord канал",
      "Кастомные частицы",
    ],
  },
  {
    name: "Лорд Пара",
    price: "1,299",
    color: C.copperLight,
    glowColor: "rgba(212,149,106,0.4)",
    badge: "ЭЛИТА",
    icon: "🎩",
    perks: [
      "Префикс [⚡ ЛОРД] в чате",
      "150,000 монет на старт",
      "Безлимитный кит",
      "Все привилегии Инженера",
      "Уникальный плащ в игре",
      "5x опыт во всех режимах",
      "Бессрочный VIP слот",
      "Роль на сервере Discord",
      "Влияние на обновления",
      "Личная встреча с адм.",
    ],
  },
];

const stats = [
  { value: "3 года", label: "На рынке", icon: "Cog" },
  { value: "99.9%", label: "Аптайм сервера", icon: "Zap" },
];

const mods = [
  {
    name: "WorldEdit",
    desc: "Мощный редактор мира — быстрое строительство и редактирование больших областей",
    icon: "🗺️",
    version: "7.3.0",
    url: "https://modrinth.com/plugin/worldedit",
    color: C.steam,
    glowColor: "rgba(168,196,216,0.25)",
  },
  {
    name: "Prefab",
    desc: "Быстрое размещение готовых структур и построек прямо в игре",
    icon: "🏗️",
    version: "5.1.0",
    url: "https://modrinth.com/mod/prefab",
    color: C.brass,
    glowColor: "rgba(201,168,76,0.25)",
  },
  {
    name: "Gabous Libs",
    desc: "Библиотека зависимостей для корректной работы других модов сборки",
    icon: "📦",
    version: "1.2.4",
    url: "https://modrinth.com/mod/gabous-libs",
    color: C.copper,
    glowColor: "rgba(184,115,51,0.25)",
  },
  {
    name: "Better Days",
    desc: "Настройка длины дня и ночи — больше времени для строительства",
    icon: "🌅",
    version: "2.3.1",
    url: "https://modrinth.com/mod/better-days",
    color: C.copperLight,
    glowColor: "rgba(212,149,106,0.25)",
  },
  {
    name: "Continuity",
    desc: "Связные текстуры блоков — стекло и другие блоки без швов",
    icon: "🪟",
    version: "3.0.0",
    url: "https://modrinth.com/mod/continuity",
    color: C.brassLight,
    glowColor: "rgba(223,192,110,0.25)",
  },
];

// SVG Gear component
function Gear({ size = 60, color = C.copper, speed = "8s", reverse = false, opacity = 0.5, teeth = 8 }: {
  size?: number; color?: string; speed?: string; reverse?: boolean; opacity?: number; teeth?: number;
}) {
  const r = size / 2;
  const inner = r * 0.55;
  const hole = r * 0.22;
  const toothH = r * 0.22;
  const toothW = (2 * Math.PI * r) / (teeth * 2.5);

  // Build gear path
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const a2 = a1 + (0.3 * Math.PI) / teeth;
    const a3 = a1 + (0.7 * Math.PI) / teeth;
    const a4 = a1 + Math.PI / teeth;
    points.push(`${r + inner * Math.cos(a1)},${r + inner * Math.sin(a1)}`);
    points.push(`${r + (inner + toothH) * Math.cos(a2)},${r + (inner + toothH) * Math.sin(a2)}`);
    points.push(`${r + (inner + toothH) * Math.cos(a3)},${r + (inner + toothH) * Math.sin(a3)}`);
    points.push(`${r + inner * Math.cos(a4)},${r + inner * Math.sin(a4)}`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{
        opacity,
        animation: `${reverse ? "gear-spin-reverse" : "gear-spin"} ${speed} linear infinite`,
        filter: `drop-shadow(0 0 4px ${color})`,
      }}>
      <polygon points={points.join(" ")} fill={color} />
      <circle cx={r} cy={r} r={inner * 0.85} fill={C.ironDark} />
      <circle cx={r} cy={r} r={hole} fill={color} opacity={0.7} />
    </svg>
  );
}

// Steam puff component
function SteamPuff({ delay = 0, left = "50%", size = 18 }: { delay?: number; left?: string; size?: number }) {
  return (
    <div className="absolute pointer-events-none" style={{ left, bottom: "100%", width: size, height: size }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute rounded-full animate-steam"
          style={{
            width: size + i * 6,
            height: size + i * 6,
            background: "rgba(200,216,230,0.2)",
            left: `${-i * 3}px`,
            animationDelay: `${delay + i * 0.8}s`,
            animationDuration: `${2.5 + i * 0.5}s`,
          }} />
      ))}
    </div>
  );
}

// Decorative rivet
function Rivet({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="absolute w-3 h-3 rounded-full animate-rivet" style={{
      background: "radial-gradient(circle at 35% 35%, #d4956a, #7a5520)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
      ...style
    }} />
  );
}

// Horizontal pipe decoration
function PipeBar({ color = C.copper }: { color?: string }) {
  return (
    <div className="flex items-center gap-0 w-full my-8">
      <div className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ background: `radial-gradient(circle at 35% 35%, ${color}, #5a3a10)`, boxShadow: `0 0 6px ${color}60` }} />
      <div className="flex-1 h-1.5 rounded-sm"
        style={{ background: `linear-gradient(to right, ${color}80, ${color}, ${color}80)`, boxShadow: `0 0 8px ${color}50` }} />
      <div className="w-2 h-3.5 rounded-sm flex-shrink-0 mx-0.5"
        style={{ background: `linear-gradient(to bottom, ${color}80, ${color}cc)` }} />
      <div className="flex-1 h-1.5 rounded-sm"
        style={{ background: `linear-gradient(to right, ${color}80, ${color}, ${color}80)`, boxShadow: `0 0 8px ${color}50` }} />
      <div className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ background: `radial-gradient(circle at 35% 35%, ${color}, #5a3a10)`, boxShadow: `0 0 6px ${color}60` }} />
    </div>
  );
}

export default function Index() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white font-rubik overflow-x-hidden"
      style={{ background: "#0f0a06" }}>

      {/* === COAL TEXTURE OVERLAY === */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(139,73,20,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.04) 0%, transparent 40%)
        `,
      }} />

      {/* === ANNOUNCEMENT BANNER === */}
      <div className="relative z-50 w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-bold animate-pipe-pulse"
        style={{
          background: "linear-gradient(90deg, #1a0e05, #3a2010, #2a1508, #3a2010, #1a0e05)",
          borderBottom: "2px solid #b87333",
          boxShadow: "0 2px 20px rgba(184,115,51,0.3)",
        }}>
        {/* Rivets on banner */}
        <div className="absolute left-4 w-2.5 h-2.5 rounded-full"
          style={{ background: "radial-gradient(circle at 35% 35%, #d4956a, #7a5520)" }} />
        <div className="absolute right-4 w-2.5 h-2.5 rounded-full"
          style={{ background: "radial-gradient(circle at 35% 35%, #d4956a, #7a5520)" }} />
        <img src={STEAMPUNKX_LOGO} alt="SteampunkX" className="w-7 h-7 rounded object-cover flex-shrink-0"
          style={{ boxShadow: `0 0 8px ${C.copper}80` }} />
        <span style={{ color: C.brass }}>⚙</span>
        <span style={{ color: C.parchment, textShadow: `0 0 10px ${C.brass}60`, letterSpacing: "0.05em" }}>
          Нужна сборка Steampunk [LPS] v18
        </span>
        <span style={{ color: C.brass }}>⚙</span>
        <img src={STEAMPUNKX_LOGO} alt="SteampunkX" className="w-7 h-7 rounded object-cover flex-shrink-0"
          style={{ boxShadow: `0 0 8px ${C.copper}80` }} />
      </div>

      {/* === NAVIGATION === */}
      <nav className="fixed top-[44px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-3"
        style={{
          background: "linear-gradient(to bottom, rgba(15,10,6,0.97), rgba(15,10,6,0.8))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,115,51,0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={STEAMPUNKX_LOGO} alt="SteampunkX" className="w-9 h-9 rounded object-cover flex-shrink-0"
            style={{ boxShadow: `0 0 12px ${C.brass}50`, border: `1px solid ${C.bronze}` }} />
          <span className="font-oswald font-bold text-xl tracking-wider"
            style={{ color: C.parchment }}>
            STEAM<span style={{ color: C.brass }}>PUNK</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: C.copperLight }}>
          {["Сервер", "Галерея", "Моды", "Донат"].map((label, i) => (
            <a key={i}
              href={["#stats", "#screenshots", "#mods", "#donate"][i]}
              className="relative transition-colors duration-200 hover:text-yellow-300"
              style={{ color: "#c8a870" }}>
              {label}
            </a>
          ))}
        </div>

        {/* IP Button */}
        <button onClick={copyIP}
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #2a1a08, #1a1008)",
            border: `1px solid ${C.copper}`,
            color: C.brass,
            boxShadow: `0 0 10px ${C.copper}30`,
          }}>
          <Icon name="Copy" size={14} />
          {copied ? "Скопировано!" : SERVER_IP}
        </button>
      </nav>

      {/* === HERO === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="SteampunkX" className="w-full h-full object-cover"
            style={{ opacity: 0.25, filter: "sepia(60%) saturate(0.8)" }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(15,10,6,0.5) 0%, rgba(15,10,6,0.65) 50%, rgba(15,10,6,1) 100%)"
          }} />
          {/* Vignette */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,2,0.7) 100%)"
          }} />
        </div>

        {/* Floating gears */}
        <div className="absolute top-[15%] left-[5%] hidden lg:block">
          <Gear size={110} color={C.copper} speed="20s" opacity={0.2} teeth={12} />
        </div>
        <div className="absolute top-[25%] left-[8%] hidden lg:block" style={{ marginTop: "-20px", marginLeft: "65px" }}>
          <Gear size={55} color={C.brass} speed="10s" reverse opacity={0.25} teeth={8} />
        </div>
        <div className="absolute top-[10%] right-[6%] hidden lg:block">
          <Gear size={90} color={C.bronze} speed="16s" reverse opacity={0.2} teeth={10} />
        </div>
        <div className="absolute bottom-[20%] right-[4%] hidden lg:block">
          <Gear size={70} color={C.copper} speed="12s" opacity={0.15} teeth={9} />
        </div>

        {/* Floating embers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="absolute rounded-full animate-ember"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: `${Math.random() * 30}%`,
                width: i % 4 === 0 ? "3px" : "2px",
                height: i % 4 === 0 ? "3px" : "2px",
                background: i % 3 === 0 ? C.brass : i % 3 === 1 ? C.copper : C.copperLight,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-semibold mb-8 animate-fade-in"
            style={{
              background: "rgba(184,115,51,0.12)",
              border: `1px solid ${C.copper}60`,
              color: C.brassLight,
              letterSpacing: "0.1em",
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse inline-block"
              style={{ background: C.brass, boxShadow: `0 0 6px ${C.brass}` }} />
            СЕРВЕР ОНЛАЙН
          </div>

          {/* Main title */}
          <h1 className="font-oswald font-black leading-none mb-4 tracking-tight"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
            <span style={{ color: C.parchment, textShadow: `0 0 60px ${C.copper}30` }}>STEAM</span>
            <span style={{
              color: C.brass,
              display: "block",
              textShadow: `0 0 40px ${C.brass}80, 0 0 80px ${C.copper}40`,
            }}>
              PUNK
            </span>
          </h1>

          {/* Subtitle line decoration */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${C.copper})` }} />
            <div className="w-2 h-2 rounded-full" style={{ background: C.brass, boxShadow: `0 0 8px ${C.brass}` }} />
            <span className="text-xs tracking-[0.4em] font-semibold" style={{ color: C.copperLight }}>
              MINECRAFT · 1.20.1
            </span>
            <div className="w-2 h-2 rounded-full" style={{ background: C.brass, boxShadow: `0 0 8px ${C.brass}` }} />
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${C.copper})` }} />
          </div>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#c8a870" }}>
            Эпический Minecraft сервер в мире пара и шестерёнок.
            Присоединяйся и начни своё приключение!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={copyIP}
              className="group flex items-center gap-3 px-8 py-4 rounded text-base font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${C.bronze}, #5a3a10)`,
                border: `1px solid ${C.copper}`,
                color: C.parchment,
                boxShadow: `0 0 25px ${C.copper}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}>
              <Icon name={copied ? "Check" : "Copy"} size={18} />
              {copied ? "IP скопирован!" : "Скопировать IP сервера"}
            </button>
            <a href="#donate"
              className="flex items-center gap-2 px-8 py-4 rounded text-base font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(42,25,8,0.8)",
                border: `1px solid rgba(184,115,51,0.4)`,
                color: C.copperLight,
              }}>
              <Icon name="ShoppingBag" size={18} />
              Донат-магазин
            </a>
          </div>

          <div className="mt-6 text-xs tracking-widest" style={{ color: "#6b4c2a" }}>
            JAVA EDITION · ЛИЦЕНЗИЯ НЕ ТРЕБУЕТСЯ
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
          style={{ color: C.bronze }}>
          <Icon name="ChevronDown" size={20} />
        </div>

        {/* Bottom pipe decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, transparent, ${C.copper}60, ${C.brass}80, ${C.copper}60, transparent)` }} />
      </section>

      {/* === STATS === */}
      <section id="stats" className="py-16 px-6 md:px-12 relative">
        <PipeBar color={C.copper} />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="relative rounded p-6 text-center transition-all duration-300 hover:scale-105 riveted parchment-card"
              style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 15px ${C.copper}10` }}>
              <Rivet style={{ top: 8, left: 8 }} />
              <Rivet style={{ top: 8, right: 8 }} />
              <Rivet style={{ bottom: 8, left: 8 }} />
              <Rivet style={{ bottom: 8, right: 8 }} />
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${C.bronze}40, ${C.ironDark})`, border: `1px solid ${C.copper}50` }}>
                  <Icon name={s.icon} fallback="Star" size={20} style={{ color: C.brass }} />
                </div>
              </div>
              <div className="font-oswald font-bold text-3xl mb-1" style={{ color: C.parchment }}>{s.value}</div>
              <div className="text-sm" style={{ color: C.copperLight }}>{s.label}</div>
            </div>
          ))}
        </div>
        <PipeBar color={C.bronze} />
      </section>

      {/* === SCREENSHOTS / GALLERY === */}
      <section id="screenshots" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.copper})` }} />
              <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: C.copper }}>
                ⚙ Галерея ⚙
              </span>
              <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${C.copper})` }} />
            </div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl"
              style={{ color: C.parchment, textShadow: `0 0 40px ${C.copper}20` }}>
              МИР STEAMPUNK
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#9a7040" }}>
              Посмотри, как выглядит наш сервер — поезда, города и удивительные постройки
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Big screenshot */}
            <div className="relative rounded overflow-hidden group cursor-pointer"
              style={{ border: `1px solid ${C.bronze}60`, boxShadow: `0 4px 30px rgba(0,0,0,0.5)` }}>
              <Rivet style={{ top: 10, left: 10, zIndex: 10 }} />
              <Rivet style={{ top: 10, right: 10, zIndex: 10 }} />
              <img
                src="https://cdn.poehali.dev/files/5759ebd2-ae7c-4673-bdd2-686a70b13f62.png"
                alt="Steampunk мир"
                className="w-full h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "sepia(20%) saturate(0.9)" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to top, rgba(15,10,6,0.9) 0%, transparent 60%)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-semibold text-sm" style={{ color: C.parchment }}>Вид на станцию и железные дороги</p>
              </div>
              {/* Copper frame accent */}
              <div className="absolute inset-0 pointer-events-none rounded"
                style={{ boxShadow: `inset 0 0 0 1px ${C.copper}30` }} />
            </div>

            {/* 2 smaller */}
            <div className="flex flex-col gap-4">
              {[
                { src: "https://cdn.poehali.dev/files/086a139e-0ebc-4487-af6a-47a9f75696b1.png", label: "Закат на станции с эмеральдовым деревом" },
                { src: "https://cdn.poehali.dev/files/d9ce0188-b47a-4a6d-b4c8-57987d6d7eed.png", label: "Туманный город с паровозом" },
              ].map(({ src, label }, idx) => (
                <div key={idx} className="relative rounded overflow-hidden group cursor-pointer"
                  style={{ border: `1px solid ${C.bronze}50`, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                  <Rivet style={{ top: 8, left: 8, zIndex: 10 }} />
                  <Rivet style={{ top: 8, right: 8, zIndex: 10 }} />
                  <img src={src} alt={label}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "sepia(15%) saturate(0.9)" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, rgba(15,10,6,0.9) 0%, transparent 60%)` }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-semibold text-sm" style={{ color: C.parchment }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width bottom */}
          <div className="mt-4 relative rounded overflow-hidden group cursor-pointer"
            style={{ border: `1px solid ${C.bronze}50`, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
            <Rivet style={{ top: 10, left: 10, zIndex: 10 }} />
            <Rivet style={{ top: 10, right: 10, zIndex: 10 }} />
            <Rivet style={{ bottom: 10, left: 10, zIndex: 10 }} />
            <Rivet style={{ bottom: 10, right: 10, zIndex: 10 }} />
            <img
              src="https://cdn.poehali.dev/files/f214e055-0ec4-4340-a214-145ac93121b2.png"
              alt="Зимний город"
              className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "sepia(15%) saturate(0.9)" }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(to top, rgba(15,10,6,0.9) 0%, transparent 60%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="font-semibold text-sm" style={{ color: C.parchment }}>Зимний город с башней и эмеральдовым деревом</p>
            </div>
          </div>
        </div>
      </section>

      {/* === MODS === */}
      <section id="mods" className="py-20 px-6 md:px-12">
        <PipeBar color={C.brass} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.brass})` }} />
              <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: C.brass }}>
                ⚙ Механизмы ⚙
              </span>
              <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${C.brass})` }} />
            </div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl"
              style={{ color: C.parchment }}>
              СКАЧАЙ МОДЫ
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#9a7040" }}>
              Установи эти механизмы для полноценной игры на сервере Steampunk [LPS] v18
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {mods.map((mod, i) => (
              <div key={i} className="relative rounded flex flex-col transition-all duration-300 hover:scale-105 hover:-translate-y-1 parchment-card"
                style={{
                  background: `linear-gradient(160deg, ${mod.color}10, rgba(15,10,6,0.97))`,
                  border: `1px solid ${mod.color}40`,
                  boxShadow: `0 4px 25px ${mod.glowColor}`,
                }}>
                <Rivet style={{ top: 8, left: 8 }} />
                <Rivet style={{ top: 8, right: 8 }} />
                <div className="p-6 flex-1">
                  <div className="w-12 h-12 rounded flex items-center justify-center mb-4 text-2xl"
                    style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}40` }}>
                    {mod.icon}
                  </div>
                  <h3 className="font-oswald font-bold text-xl mb-1" style={{ color: C.parchment }}>{mod.name}</h3>
                  <div className="inline-flex items-center gap-1 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ background: `${mod.color}20`, color: mod.color, border: `1px solid ${mod.color}30` }}>
                      v{mod.version}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#9a7040" }}>{mod.desc}</p>
                </div>
                <div className="px-6 pb-6">
                  <a href={mod.url} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded font-bold text-sm transition-all duration-200 hover:opacity-80"
                    style={{
                      background: `linear-gradient(135deg, ${mod.color}90, ${mod.color}60)`,
                      color: C.ironDark,
                      border: `1px solid ${mod.color}60`,
                    }}>
                    <Icon name="Download" size={14} />
                    Скачать
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: "#6b4c2a" }}>
              <Icon name="Info" size={14} className="inline mr-1" style={{ color: C.brass }} />
              Fabric 1.20.1 · Все моды бесплатны · Установи перед первым входом
            </p>
          </div>
        </div>
        <PipeBar color={C.bronze} />
      </section>

      {/* === DONATE === */}
      <section id="donate" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${C.brassLight})` }} />
              <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: C.brassLight }}>
                ⚙ Патронаж ⚙
              </span>
              <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${C.brassLight})` }} />
            </div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl"
              style={{ color: C.parchment }}>
              ПОДДЕРЖИ СЕРВЕР
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#9a7040" }}>
              Получи уникальные привилегии и помоги нам поддерживать котлы в рабочем состоянии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {donateItems.map((item, i) => (
              <div key={i} className="relative rounded overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(160deg, ${item.color}10, rgba(15,10,6,0.97))`,
                  border: `1px solid ${item.color}40`,
                  boxShadow: item.badge ? `0 0 35px ${item.glowColor}, 0 4px 20px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.4)",
                }}>
                {/* Corner rivets */}
                <Rivet style={{ top: 10, left: 10 }} />
                <Rivet style={{ top: 10, right: 10 }} />
                <Rivet style={{ bottom: 10, left: 10 }} />
                <Rivet style={{ bottom: 10, right: 10 }} />

                {/* Top border accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)` }} />

                {item.badge && (
                  <div className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                      color: C.ironDark,
                      border: `1px solid ${item.color}`,
                      letterSpacing: "0.05em",
                    }}>
                    {item.badge}
                  </div>
                )}

                <div className="p-7 flex-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded flex items-center justify-center mb-5 text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}25, ${C.ironDark})`,
                      border: `1px solid ${item.color}50`,
                      boxShadow: `0 0 15px ${item.color}20`,
                    }}>
                    {item.icon}
                  </div>
                  <h3 className="font-oswald font-bold text-2xl mb-1" style={{ color: C.parchment }}>{item.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="font-oswald font-black text-4xl" style={{ color: item.color, textShadow: `0 0 15px ${item.color}60` }}>
                      {item.price}₽
                    </span>
                    <span className="text-sm mb-1" style={{ color: "#6b4c2a" }}>/навсегда</span>
                  </div>

                  {/* Divider line */}
                  <div className="h-px mb-4" style={{ background: `linear-gradient(to right, transparent, ${item.color}40, transparent)` }} />

                  <ul className="space-y-3">
                    {item.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#c8a870" }}>
                        <Icon name="Check" size={13} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-7 pb-7">
                  {/* Steam pipe accent above button */}
                  <div className="relative mb-3">
                    <SteamPuff delay={i * 0.5} left="20%" size={14} />
                    <SteamPuff delay={i * 0.5 + 1} left="70%" size={10} />
                  </div>
                  <button className="w-full py-3 rounded font-bold text-sm transition-all duration-200 hover:opacity-80 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}cc, ${item.color}80)`,
                      color: C.ironDark,
                      border: `1px solid ${item.color}80`,
                      boxShadow: `0 0 15px ${item.color}30`,
                    }}>
                    Купить {item.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: "#6b4c2a" }}>
              <Icon name="ShieldCheck" size={14} className="inline mr-1" style={{ color: C.copper }} />
              Оплата через ЮMoney, Qiwi, банковские карты · Мгновенная выдача привилегий
            </p>
          </div>
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="py-20 px-6 md:px-12">
        <PipeBar color={C.copper} />
        <div className="max-w-4xl mx-auto rounded p-12 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${C.bronze}18, ${C.ironDark})`,
            border: `1px solid ${C.copper}50`,
            boxShadow: `0 0 60px ${C.copper}15`,
          }}>
          {/* Corner gears */}
          <div className="absolute top-4 left-4 opacity-20">
            <Gear size={50} color={C.brass} speed="12s" opacity={1} teeth={8} />
          </div>
          <div className="absolute top-4 right-4 opacity-20">
            <Gear size={50} color={C.copper} speed="12s" reverse opacity={1} teeth={8} />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20">
            <Gear size={40} color={C.copper} speed="16s" reverse opacity={1} teeth={7} />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <Gear size={40} color={C.brass} speed="16s" opacity={1} teeth={7} />
          </div>

          {/* Rivets on CTA */}
          <Rivet style={{ top: 14, left: 14 }} />
          <Rivet style={{ top: 14, right: 14 }} />
          <Rivet style={{ bottom: 14, left: 14 }} />
          <Rivet style={{ bottom: 14, right: 14 }} />

          {/* Top & bottom border accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(to right, transparent, ${C.brass}, transparent)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(to right, transparent, ${C.brass}, transparent)` }} />

          <div className="relative z-10">
            <div className="text-5xl mb-6 animate-flicker">⛏️</div>
            <h2 className="font-oswald font-black text-4xl md:text-5xl mb-4"
              style={{ color: C.parchment, textShadow: `0 0 30px ${C.copper}30` }}>
              ГОТОВ К ПРИКЛЮЧЕНИЯМ?
            </h2>
            <p className="mb-8 max-w-xl mx-auto" style={{ color: "#9a7040" }}>
              Присоединяйся прямо сейчас — регистрация не нужна.
              Просто зайди на сервер и начни играть!
            </p>
            <button onClick={copyIP}
              className="inline-flex items-center gap-3 px-8 py-4 rounded font-bold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${C.bronze}, #5a3a10)`,
                border: `1px solid ${C.copper}`,
                color: C.parchment,
                boxShadow: `0 0 25px ${C.copper}40`,
              }}>
              <Icon name={copied ? "Check" : "Copy"} size={18} />
              {copied ? "Скопировано!" : `Скопировать IP: ${SERVER_IP}`}
            </button>
            <div className="mt-4 text-xs tracking-widest" style={{ color: "#6b4c2a" }}>
              JAVA EDITION 1.20.1
            </div>
          </div>
        </div>
        <PipeBar color={C.bronze} />
      </section>

      {/* === FOOTER === */}
      <footer className="py-10 px-6 md:px-12 relative"
        style={{ borderTop: `2px solid ${C.bronze}50`, background: "rgba(10,6,2,0.8)" }}>
        {/* Top pipe line */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(to right, transparent, ${C.copper}60, ${C.brass}80, ${C.copper}60, transparent)` }} />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={STEAMPUNKX_LOGO} alt="SteampunkX" className="w-9 h-9 rounded object-cover flex-shrink-0"
                style={{ boxShadow: `0 0 12px ${C.brass}50`, border: `1px solid ${C.bronze}` }} />
            </div>
            <span className="font-oswald font-bold text-lg tracking-wider" style={{ color: C.parchment }}>
              STEAM<span style={{ color: C.brass }}>PUNK</span>
            </span>
          </div>

          {/* Footer gear decoration */}
          <div className="flex items-center gap-2" style={{ color: "#4a3020" }}>
            <span className="text-xs tracking-widest">⚙ ⚙ ⚙</span>
          </div>

          <div className="flex items-center gap-6 text-sm" style={{ color: C.bronze }}>
            {["Правила", "Discord", "VK", "Telegram"].map((link) => (
              <a key={link} href="#"
                className="transition-colors duration-200 hover:text-yellow-400"
                style={{ color: "#8b6030" }}>
                {link}
              </a>
            ))}
          </div>

          <div className="text-xs" style={{ color: "#4a3020" }}>
            © 2024 SteamPunk. Не связан с Mojang Studios.
          </div>
        </div>
      </footer>
    </div>
  );
}
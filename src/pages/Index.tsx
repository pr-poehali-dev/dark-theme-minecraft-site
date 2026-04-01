import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/02d41f7e-f989-4075-89dd-56e64542b5a2/files/d14ff8b4-304c-4d5a-91d8-c9f7712f2268.jpg";
const SERVER_IP = "188.127.241.24:32398";



const donateItems = [
  {
    name: "Стартер",
    price: "149",
    color: "#6b7280",
    glowColor: "rgba(107,114,128,0.3)",
    badge: null,
    perks: [
      "Префикс [Стартер] в чате",
      "5,000 монет на старт",
      "Кит раз в 3 дня",
      "Доступ к /fly в хабе",
      "Цветной ник",
    ],
  },
  {
    name: "Рыцарь",
    price: "349",
    color: "#4ade80",
    glowColor: "rgba(74,222,128,0.3)",
    badge: "ПОПУЛЯРНОЕ",
    perks: [
      "Префикс [⚔ Рыцарь] в чате",
      "20,000 монет на старт",
      "Кит раз в день",
      "/fly на всех серверах",
      "Кастомный ник + цвет",
      "2x опыт во всех режимах",
      "Приоритетный вход",
    ],
  },
  {
    name: "Легенда",
    price: "699",
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.4)",
    badge: "ТОП",
    perks: [
      "Префикс [★ Легенда] в чате",
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
    name: "Бог",
    price: "1,299",
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.4)",
    badge: "ЭЛИТА",
    perks: [
      "Префикс [⚡ БОГ] в чате",
      "150,000 монет на старт",
      "Безлимитный кит",
      "Все привилегии Легенды",
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
  { value: "3 года", label: "На рынке", icon: "Shield" },
  { value: "99.9%", label: "Аптайм сервера", icon: "Zap" },
];

export default function Index() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-white font-rubik overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(8,12,16,0.95), transparent)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)" }}>
            ⛏️
          </div>
          <span className="font-oswald font-bold text-xl tracking-wider text-white">STEAM<span style={{ color: "#4ade80" }}>PUNK</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#stats" className="hover:text-white transition-colors">Сервер</a>
        </div>
        <button onClick={copyIP}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", color: "#4ade80" }}>
          <Icon name="Copy" size={14} />
          {copied ? "Скопировано!" : SERVER_IP}
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="CraftWorld" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,12,16,0.3) 0%, rgba(8,12,16,0.6) 50%, rgba(8,12,16,1) 100%)" }} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#4ade80" : i % 3 === 1 ? "#60a5fa" : "#a78bfa",
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.4 + Math.random() * 0.6,
              }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-in"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Сервер онлайн
          </div>

          <h1 className="font-oswald font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-6 tracking-tight"
            style={{ textShadow: "0 0 80px rgba(74,222,128,0.3)" }}>
            STEAM
            <span style={{ color: "#4ade80", display: "block", textShadow: "0 0 40px rgba(74,222,128,0.8)" }}>
              PUNK
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Эпический Minecraft сервер.
            Присоединяйся и начни своё приключение прямо сейчас.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={copyIP}
              className="group flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4ade80, #16a34a)",
                color: "#052e16",
                boxShadow: "0 0 30px rgba(74,222,128,0.4)",
              }}>
              <Icon name={copied ? "Check" : "Copy"} size={18} />
              {copied ? "IP скопирован!" : "Скопировать IP сервера"}
            </button>
            <a href="#donate"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}>
              <Icon name="ShoppingBag" size={18} />
              Донат-магазин
            </a>
          </div>

          <div className="mt-6 text-gray-500 text-sm">
            Java Edition · 1.16 – 1.21 · Лицензия не требуется
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.15)" }}>
                  <Icon name={s.icon} fallback="Star" size={20} style={{ color: "#4ade80" }} />
                </div>
              </div>
              <div className="font-oswald font-bold text-3xl text-white mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>



      {/* DONATE */}
      <section id="donate" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: "#facc15" }}>Донат-магазин</span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white">
              ПОДДЕРЖИ СЕРВЕР
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Получи уникальные привилегии и помоги нам делать сервер ещё лучше
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {donateItems.map((item, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(160deg, ${item.color}10, rgba(8,12,16,0.95))`,
                  border: `1px solid ${item.color}35`,
                  boxShadow: item.badge ? `0 0 40px ${item.glowColor}` : "none",
                }}>
                {item.badge && (
                  <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: item.color, color: "#0a0f14" }}>
                    {item.badge}
                  </div>
                )}
                <div className="p-7 flex-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                    style={{ background: `${item.color}20` }}>
                    {i === 0 ? "🛡️" : i === 1 ? "⚔️" : i === 2 ? "★" : "⚡"}
                  </div>
                  <h3 className="font-oswald font-bold text-2xl text-white mb-1">{item.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="font-oswald font-black text-4xl" style={{ color: item.color }}>
                      {item.price}₽
                    </span>
                    <span className="text-gray-500 text-sm mb-1">/навсегда</span>
                  </div>
                  <ul className="space-y-3">
                    {item.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <Icon name="Check" size={14} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 pb-7">
                  <button className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90"
                    style={{ background: item.color, color: "#0a0f14" }}>
                    Купить {item.name}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              <Icon name="ShieldCheck" size={14} className="inline mr-1" style={{ color: "#4ade80" }} />
              Оплата через ЮMoney, Qiwi, банковские карты · Мгновенная выдача привилегий
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(96,165,250,0.08))", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(74,222,128,0.08) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <div className="text-5xl mb-6">⛏️</div>
            <h2 className="font-oswald font-black text-4xl md:text-5xl text-white mb-4">
              ГОТОВ К ПРИКЛЮЧЕНИЯМ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Присоединяйся прямо сейчас — регистрация не нужна. Просто зайди на сервер и начни играть!
            </p>
            <button onClick={copyIP}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)", color: "#052e16", boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}>
              <Icon name={copied ? "Check" : "Copy"} size={18} />
              {copied ? "Скопировано!" : `Скопировать IP: ${SERVER_IP}`}
            </button>
            <div className="mt-4 text-gray-500 text-xs">Java 1.16–1.21 · Bedrock Edition поддерживается</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 px-6 md:px-12"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)" }}>
              ⛏️
            </div>
            <span className="font-oswald font-bold text-lg tracking-wider">
              STEAM<span style={{ color: "#4ade80" }}>PUNK</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Правила</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">VK</a>
            <a href="#" className="hover:text-white transition-colors">Telegram</a>
          </div>
          <div className="text-gray-600 text-xs">
            © 2024 SteamPunk. Не связан с Mojang Studios.
          </div>
        </div>
      </footer>
    </div>
  );
}
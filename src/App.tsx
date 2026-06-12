import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Clock, 
  Flame, 
  Ruler, 
  Gauge, 
  Zap, 
  Thermometer, 
  Palette, 
  Smartphone,
  CheckCircle2,
  PhoneCall,
  CalendarCheck,
  Send,
  Layers,
  ArrowRight
} from "lucide-react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom scroll tracking for sticky navbar styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="root-container" className="min-h-screen bg-brand-black text-white font-sans antialiased select-none">
      
      {/* 4px top accent border */}
      <div id="top-accent-bar" className="fixed top-0 left-0 right-0 h-1 bg-brand-red z-50"></div>

      {/* FIXED STRIP CONVENIENCE NAV */}
      <header id="nav-header" className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-red py-3 shadow-lg shadow-black/80" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a 
            id="brand-logo"
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
          >
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-6 bg-brand-red block"></span>
              <span className="w-1 h-3 bg-brand-red block"></span>
            </div>
            <span className="font-condensed text-2xl font-black tracking-wider text-white group-hover:text-brand-red transition-colors duration-200">
              NOWATOR
            </span>
            <span className="text-xs font-mono tracking-widest text-brand-red ml-1 font-bold">PL</span>
          </a>

          {/* Desktop Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {[
              { label: "O firmie", id: "o-firmie" },
              { label: "Godziny", id: "godziny" },
              { label: "Oferty", id: "oferty" },
              { label: "Kontakt", id: "kontakt" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className="font-condensed text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-brand-red transition-all duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Quick dial desktop button */}
            <a 
              href="tel:606502642"
              className="bg-brand-red hover:bg-brand-red-light text-white font-condensed font-bold uppercase tracking-wider px-4 py-2 text-xs transition-colors duration-200 flex items-center gap-2 rounded-none"
            >
              <Phone size={14} />
              606 502 642
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button 
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-red p-1 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-30 bg-brand-black/98 flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 mt-16">
              <span className="font-condensed text-xs tracking-widest text-brand-red font-bold uppercase">NAWIGACJA</span>
              <div className="h-0.5 w-12 bg-brand-red"></div>
              {[
                { label: "O FIRMIE", id: "o-firmie" },
                { label: "GODZINY OTWARCIA", id: "godziny" },
                { label: "AKTUALNE OFERTY", id: "oferty" },
                { label: "SZYBKI KONTAKT", id: "kontakt" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className="font-condensed text-4xl font-black text-white hover:text-brand-red transition-all duration-200 flex items-center gap-4 py-2"
                >
                  <span className="text-zinc-600 font-mono text-sm leading-none font-normal">#</span>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto mb-16 flex flex-col gap-4">
              <div className="h-px bg-zinc-800 w-full"></div>
              <span className="font-condensed text-xs text-zinc-500 tracking-wider">SKONTAKTUJ SIĘ</span>
              <a href="tel:606502642" className="text-2xl font-condensed font-bold text-brand-red flex items-center gap-2">
                <Phone size={20} /> 606 502 642
              </a>
              <a href="mailto:info.nowator@gmail.com" className="text-zinc-400 font-mono text-xs break-all">
                info.nowator@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center bg-brand-black overflow-hidden pt-20"
      >
        {/* Subtle red geometric background letters */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-2 flex items-center justify-center select-none overflow-hidden">
          <span className="text-[55vw] font-condensed font-black text-brand-red/5 leading-none select-none select-none">
            N
          </span>
        </div>

        {/* Dynamic Horizontal bar animated with motion */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-24 left-0 w-full h-[4px] bg-brand-red origin-left z-10"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 z-15">
          {/* Content Left side */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="px-3 py-1 bg-brand-red text-white text-xs font-condensed font-black tracking-widest uppercase">
                STOPNICA
              </span>
              <span className="w-12 h-px bg-zinc-600"></span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Województwo Świętokrzyskie</span>
            </motion.div>

            {/* Giant Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="font-condensed font-black text-white leading-none tracking-tight text-7xl sm:text-8xl md:text-9xl uppercase">
                NOWATOR
              </h1>
              <span className="block font-condensed font-bold text-brand-red text-3xl sm:text-4xl md:text-5xl mt-1 tracking-wide uppercase">
                USŁUGI WIELOBRANŻOWE
              </span>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-zinc-300 text-lg md:text-xl max-w-xl font-normal leading-relaxed mb-8"
            >
              Stopnica i okolice — wykonamy to, czego potrzebujesz. Dostarczamy najwyższej jakości rozwiązania kominkowe, ogrodowe oraz precyzyjne podzespoły mechaniczne z wysyłką w całej Polsce i Europie.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button 
                onClick={() => scrollToSection("oferty")}
                className="bg-brand-red hover:bg-brand-red-light text-white font-condensed font-black text-lg uppercase tracking-wider px-8 py-4 transition-colors duration-200 cursor-pointer rounded-none active:scale-95 flex items-center gap-2 group"
              >
                Zobacz oferty
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a 
                href="tel:606502642"
                className="border border-white hover:border-brand-red hover:text-brand-red text-white font-condensed font-bold text-lg uppercase tracking-wider px-8 py-4 transition-colors duration-200 flex items-center gap-2 rounded-none"
              >
                <PhoneCall size={18} />
                Zadzwoń teraz
              </a>
            </motion.div>

            {/* Bottom contact overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-16 flex flex-wrap gap-y-4 gap-x-12 border-t border-zinc-800/60 pt-6"
            >
              <div className="flex items-center gap-3">
                <Phone className="text-brand-red animate-pulse" size={20} />
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-widest leading-none">TELEFON KONTAKTOWY</span>
                  <a href="tel:606502642" className="text-white hover:text-brand-red font-condensed font-bold text-lg transition-colors">
                    +48 606 502 642
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-brand-red" size={20} />
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-widest leading-none">ADRES E-MAIL</span>
                  <a href="mailto:info.nowator@gmail.com" className="text-white hover:text-brand-red font-mono text-sm transition-colors">
                    info.nowator@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-brand-red" size={20} />
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-widest leading-none font-condensed">SIEDZIBA SPÓŁKI</span>
                  <span className="text-white text-sm">
                    Kościuszki 66, Stopnica
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Large Right watermark effect */}
          <div className="hidden lg:col-span-4 lg:flex flex-col justify-center items-end relative select-none">
            <div className="writing-vertical text-right uppercase leading-none opacity-20">
              <span className="block font-condensed font-black text-8xl md:text-9xl outline-text tracking-widest mb-4 hover:opacity-100 transition-opacity duration-300">
                NOWATOR
              </span>
              <span className="block font-condensed font-black text-8xl md:text-9xl outline-text tracking-widest mb-4 hover:opacity-100 transition-opacity duration-300">
                STOPNICA
              </span>
              <span className="block font-condensed font-black text-8xl md:text-9xl outline-text tracking-widest hover:opacity-100 transition-opacity duration-300">
                USŁUGI
              </span>
            </div>
          </div>
        </div>

        {/* Thick divider at baseline */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-brand-red z-10"></div>
      </section>

      {/* 2. O FIRMIE (ABOUT) SECTION */}
      <section 
        id="o-firmie" 
        className="bg-white text-brand-black py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Stacked Stat Cards with thick red border) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 border-l-8 border-brand-red bg-zinc-50 p-8 md:p-12 shadow-md flex flex-col gap-10"
          >
            {/* Stat Box 1 */}
            <div className="flex flex-col group">
              <span className="font-condensed font-black text-6xl md:text-7xl text-brand-black leading-none group-hover:text-brand-red transition-colors duration-200">
                6 DNI
              </span>
              <span className="font-condensed font-bold text-xs tracking-widest text-brand-red mt-1 uppercase">
                W TYGODNIU DLA CIEBIE
              </span>
              <p className="text-zinc-600 font-sans text-sm mt-2">
                Działamy od poniedziałku do soboty, zapewniając szybką obsługę oraz odbiór towaru.
              </p>
            </div>

            <div className="h-px bg-zinc-200 w-full"></div>

            {/* Stat Box 2 */}
            <div className="flex flex-col group">
              <a href="tel:606502642" className="font-condensed font-black text-5xl md:text-6xl text-brand-black leading-none group-hover:text-brand-red transition-colors duration-200 block">
                1 NUMER
              </a>
              <span className="font-condensed font-bold text-xs tracking-widest text-brand-red mt-1 uppercase">
                KOMÓRKOWY: 606 502 642
              </span>
              <p className="text-zinc-600 font-sans text-sm mt-2">
                Zadzwoń bezpośrednio — u nas nie ma botów ani infolinii. Rozmawiasz z decyzyjnym fachowcem.
              </p>
            </div>

            <div className="h-px bg-zinc-200 w-full"></div>

            {/* Stat Box 3 */}
            <div className="flex flex-col group">
              <span className="font-condensed font-black text-6xl md:text-7xl text-brand-black leading-none group-hover:text-brand-red transition-colors duration-200">
                ∞
              </span>
              <span className="font-condensed font-bold text-xs tracking-widest text-brand-red mt-1 uppercase">
                MOŻLIWOŚCI I ASORTYMENTU
              </span>
              <p className="text-zinc-600 font-sans text-sm mt-2">
                Jako firma wielobranżowa stale rozbudowujemy ofertę dostosowaną do indywidualnych zamówień.
              </p>
            </div>
          </motion.div>

          {/* Right Column (Text Description) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
              KIM JESTEŚMY
            </span>
            <h2 className="font-condensed font-black text-brand-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-6 leading-tight">
              WIELOBRANŻOWA FIRMA <br />Z DOŚWIADCZENIEM
            </h2>
            
            <div className="w-16 h-1 bg-brand-red mb-8"></div>

            <p className="text-zinc-800 text-lg leading-relaxed mb-6">
              <strong>Nowator</strong> to firma wielobranżowa z siedzibą w Stopnicy, oferująca rzetelne usługi i starannie wybrane produkty. Nie ograniczamy się do jednej dziedziny — naszą misją jest wypełnianie nisz rynkowych i dostarczanie rzetelnych towarów najwyższej próby.
            </p>

            <p className="text-zinc-700 text-base leading-relaxed mb-8">
              Od nowoczesnych, ekologicznych kominków elektrycznych i wytrzymałych palenisk ogrodowych, po precyzyjne mechanizmy tnące, noże do rębaków i wałki gniotowników. Zapewniamy kompleksowe wsparcie techniczne, trwałe materiały i wysyłkę na terenie całej Polski oraz wszystkich krajów Unii Europejskiej.
            </p>

            {/* Highlight boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 p-5 bg-zinc-50 flex items-start gap-3">
                <CheckCircle2 className="text-brand-red shrink-0" size={24} />
                <div>
                  <span className="block font-condensed font-bold text-sm text-brand-black uppercase">SZYBKA REALIZACJA</span>
                  <span className="text-xs text-zinc-600">Ekspresowe wysyłki towaru kurierem i spedycją paletową.</span>
                </div>
              </div>

              <div className="border border-zinc-200 p-5 bg-zinc-50 flex items-start gap-3">
                <CheckCircle2 className="text-brand-red shrink-0" size={24} />
                <div>
                  <span className="block font-condensed font-bold text-sm text-brand-black uppercase">STAL NAJWYŻSZEJ PRÓBY</span>
                  <span className="text-xs text-zinc-600">Atestowane blachy i materiały odporne na zużycie termiczne oraz ścieranie.</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Thick divider at section bootom */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-brand-red"></div>
      </section>

      {/* 3. GODZINY OTWARCIA (HOURS) SECTION */}
      <section 
        id="godziny" 
        className="bg-brand-black-mid py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Schedule content */}
          <div className="lg:col-span-7">
            <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
              STATUS PRACY
            </span>
            <h2 className="font-condensed font-black text-white text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-8">
              KIEDY JESTEŚMY DO TWOJEJ DYSPOZYCJI
            </h2>

            <div className="border-t-2 border-brand-red mt-6">
              {[
                { day: "Poniedziałek", hours: "08:00 – 17:00", active: true },
                { day: "Wtorek", hours: "08:00 – 17:00", active: true },
                { day: "Środa", hours: "08:00 – 17:00", active: true },
                { day: "Czwartek", hours: "08:00 – 17:00", active: true },
                { day: "Piątek", hours: "08:00 – 17:00", active: true },
                { day: "Sobota", hours: "09:00 – 14:00", active: true },
                { day: "Niedziela", hours: "ZAMKNIĘTE", active: false }
              ].map((row, idx) => (
                <div 
                  key={row.day}
                  className={`flex items-center justify-between py-4 px-4 transition-colors duration-200 border-b border-zinc-800 ${
                    !row.active 
                      ? "bg-brand-red/10 border-brand-red/30 py-5 text-zinc-400" 
                      : "hover:bg-zinc-800/45"
                  }`}
                >
                  <span className="font-condensed font-bold text-lg uppercase tracking-wide">
                    {row.day}
                  </span>
                  
                  {row.active ? (
                    <span className="font-mono text-brand-red font-bold text-sm tracking-widest bg-zinc-900/80 border border-zinc-800 px-3 py-1">
                      {row.hours}
                    </span>
                  ) : (
                    <span className="line-through text-brand-red font-condensed font-black text-base tracking-widest uppercase">
                      {row.hours}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-ping block"></span>
              * Zamówienia telefoniczne i e-mailowe można składać przez całą dobę. Realizacja w godzinach pracy biura.
            </p>
          </div>

          {/* Column on the right with local presence information */}
          <div className="lg:col-span-5 flex flex-col justify-center items-stretch relative py-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 to-transparent pointer-events-none"></div>
            
            <div className="border border-zinc-800 bg-brand-black-soft/50 p-8 relative flex flex-col justify-between h-72">
              <div>
                <span className="font-condensed font-black text-2xl text-white tracking-widest uppercase block mb-2">
                  DODATKOWE INFORMACJE
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans mt-3">
                  Wszystkie produkty rzemieślnicze (paleniska Diamond, osprzęt rolniczy, rębaki) są wykonywane z dbałością o detale w naszym warsztacie w Stopnicy. Istnieje możliwość odbioru osobistego po wcześniejszym uzgodnieniu telefonicznym.
                </p>
              </div>

              {/* Float badge to represent local commitment */}
              <div className="bg-brand-red border border-white/10 text-white p-5 shadow-lg max-w-sm self-start">
                <span className="block font-condensed font-black text-2xl uppercase leading-none tracking-wide">STOPNICA</span>
                <span className="block text-[10px] font-mono text-zinc-200 tracking-wider mt-1 uppercase">Lokalny lider usług wielobranżowych</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom divider line */}
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-brand-red"></div>
      </section>

      {/* 4. OFERTY (PRODUCTS/LISTINGS) SECTION */}
      <section 
        id="oferty" 
        className="bg-white text-brand-black py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="mb-16">
            <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
              AKTUALNE OFERTY
            </span>
            <h2 className="font-condensed font-black text-brand-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight">
              CO MAMY DLA CIEBIE W OFERCIE
            </h2>
            <div className="w-16 h-1 bg-brand-red mt-4"></div>
          </div>

          <div className="flex flex-col gap-16">
            
            {/* OFFER CARD 1: KOMINEK ELEKTRYCZNY KESSER */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-50 border-l-[8px] border-brand-red shadow-xl shadow-black/5 grid grid-cols-1 lg:grid-cols-12 overflow-hidden hover:brightness-[1.01] transition-all duration-300 rounded-none group"
            >
              {/* Left Column: Image */}
              <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-zinc-900 overflow-hidden">
                <img 
                  src="https://i.ibb.co/20XbV86N/673643612-122128071447155709-2197965578781351707-n.jpg" 
                  alt="Kominek Elektryczny Kesser"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Badge Left-Top */}
                <div className="absolute top-0 left-0 bg-brand-red text-white font-condensed font-black tracking-widest px-4 py-2 uppercase text-sm">
                  SPRZEDAM
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="font-condensed font-extrabold text-zinc-400 text-xs tracking-widest font-mono">KATEGORIA: WYPOSAŻENIE DOMU</span>
                    
                    {/* Price Tag */}
                    <div className="bg-brand-red px-5 py-2 inline-block">
                      <span className="font-condensed font-black text-white text-2xl tracking-wide uppercase">
                        550 ZŁ
                      </span>
                    </div>
                  </div>

                  <h3 className="font-condensed font-black text-brand-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
                    NOWY KOMINEK ELEKTRYCZNY KESSER
                  </h3>

                  <p className="text-zinc-600 text-sm font-sans mb-6">
                    Luksusowy kominek elektryczny marki KESSER z realistycznym odwzorowaniem paleniska. Idealny dodatek do salonu, tworzący przytulną atmosferę bez popiołu, dymu i konieczności montowania skomplikowanych kominów. Sterowanie smartfonem, pilotem lub asystentem głosowym zapewnia bezprecedensowy komfort.
                  </p>

                  {/* Specification grid (2x3) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 bg-zinc-100 p-4 border border-zinc-200">
                    <div className="flex items-center gap-2">
                      <Zap className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Moc:</strong> 900W / 1800W</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Wymiary:</strong> 48×138×18 cm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Max:</strong> 35°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Timer:</strong> 24h program</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Płomienie:</strong> 9 kolorów</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700 font-mono"><strong className="text-brand-black">Smart:</strong> App / Google / Alexa</span>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      "Dwa regulowane poziomy mocy grzewczej: 900W i 1800W oraz wydajny termostat",
                      "Opatentowany, niezwykle realistyczny płomień z paleniska z regulacją 9 barw",
                      "Łatwy montaż ścienny (komplet kołków i wsporników w zestawie)",
                      "Sterowanie manualne za pomocą dotykowego panelu ze szklaną powierzchnią"
                    ].map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 bg-brand-red shrink-0 mt-2"></span>
                        <span className="text-xs text-zinc-700 font-sans">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry button */}
                <div>
                  <a 
                    href="mailto:info.nowator@gmail.com?subject=Zapytanie: Kominek KESSER&body=Dzień dobry,%0D%0Achcę zapytać o dostępność i zakup kominka elektrycznego Kesser w cenie 550 zł."
                    className="inline-flex items-center bg-brand-black hover:bg-brand-red text-white hover:text-white font-condensed font-extrabold uppercase tracking-wider text-sm px-6 py-3 transition-colors duration-200 rounded-none w-full sm:w-auto text-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Zapytaj o produkt
                  </a>
                </div>

              </div>
            </motion.div>

            {/* OFFER CARD 2: PALENISKO DIAMOND */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-50 border-l-[8px] border-brand-red shadow-xl shadow-black/5 grid grid-cols-1 lg:grid-cols-12 overflow-hidden hover:brightness-[1.01] transition-all duration-300 rounded-none group"
            >
              {/* Left Column: Image */}
              <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-zinc-900 overflow-hidden">
                <img 
                  src="https://i.ibb.co/ds05FWPh/672649308-122127912969155709-6132212940311798766-n.jpg" 
                  alt="Solidne palenisko ogrodowe Diamond"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Badge Left-Top */}
                <div className="absolute top-0 left-0 bg-brand-red text-white font-condensed font-black tracking-widest px-4 py-2 uppercase text-sm">
                  SPRZEDAM
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="font-condensed font-extrabold text-zinc-400 text-xs tracking-widest font-mono">KATEGORIA: OGRÓD i REKREACJA</span>
                    
                    {/* Price Tag */}
                    <div className="bg-brand-red px-5 py-2 inline-block">
                      <span className="font-condensed font-black text-white text-2xl tracking-wide uppercase">
                        450 ZŁ
                      </span>
                    </div>
                  </div>

                  <h3 className="font-condensed font-black text-brand-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
                    SOLIDNE PALENISKO OGRODOWE DIAMOND
                  </h3>

                  <p className="text-zinc-600 text-sm font-sans mb-6">
                    Pancerne, designerskie palenisko ogrodowe o unikalnym kształcie diamentu. Wykonane z grubej, atestowanej blachy stalowej o grubości aż 3 mm. Pomalowane obustronnie profesjonalną farbą żaroodporną chroniącą produkt do temperatury 600°C. Idealna ozdoba tarasu i funkcjonalne ognisko na lata.
                  </p>

                  {/* Specification grid (2x3) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 bg-zinc-100 p-4 border border-zinc-200">
                    <div className="flex items-center gap-2">
                      <Ruler className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Wymiary:</strong> 60×60 cm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Stal:</strong> 3 mm atest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Masa:</strong> 17 kg</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Ciepło:</strong> do 600°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Barwa:</strong> czarny mat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-brand-red shrink-0" size={16} />
                      <span className="text-xs text-zinc-700"><strong className="text-brand-black">Wysyłka:</strong> PL + Europa</span>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      "Masywna konstrukcja o wadze 17 kg gwarantuje stabilność na każdym podłożu",
                      "Bardzo gruba stal konstrukcyjna 3 mm - palenisko nie odkształca się pod wpływem żaru",
                      "Głęboka misa chroni ogień przed wiatrem i zapobiega rozwiewaniu popiołu",
                      "Unikalna, nowoczesna konstrukcja o geometrycznych liniach Diamond"
                    ].map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 bg-brand-red shrink-0 mt-2"></span>
                        <span className="text-xs text-zinc-700 font-sans">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry button */}
                <div>
                  <a 
                    href="mailto:info.nowator@gmail.com?subject=Zapytanie: Palenisko Diamond&body=Dzień dobry,%0D%0Achcę zapytać o dostępność i zamawiam palenisko ogrodowe Diamond w cenie 450 zł."
                    className="inline-flex items-center bg-brand-black hover:bg-brand-red text-white hover:text-white font-condensed font-extrabold uppercase tracking-wider text-sm px-6 py-3 transition-colors duration-200 rounded-none w-full sm:w-auto text-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Zapytaj o produkt
                  </a>
                </div>

              </div>
            </motion.div>

            {/* OFFER CARD 3: MECHANIZMY TNĄCE (INDUSTIAL CAROUSEL CARD) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-50 border-l-[8px] border-brand-red shadow-xl shadow-black/5 grid grid-cols-1 lg:grid-cols-12 overflow-hidden hover:brightness-[1.01] transition-all duration-300 rounded-none"
            >
              {/* Left Column: Image with Vanilla JS Carousel */}
              <Carousel />

              {/* Right Column: Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className="font-condensed font-extrabold text-zinc-400 text-xs tracking-widest font-mono">KATEGORIA: PRODUKCJA ROLNO-LEŚNA</span>
                    
                    {/* Variable Price Badge */}
                    <div className="bg-brand-black/90 text-white border border-brand-red px-5 py-2 inline-block">
                      <span className="font-condensed font-black text-brand-red text-xl tracking-wide uppercase">
                        WYCENA INDYWIDUALNA
                      </span>
                    </div>
                  </div>

                  <h3 className="font-condensed font-black text-brand-black text-3xl sm:text-4xl uppercase tracking-tight mb-2">
                    MECHANIZMY TNĄCE, ŚWIDRY I NOŻE — NA ZAMÓWIENIE
                  </h3>
                  
                  <span className="block font-condensed font-bold text-brand-red text-lg uppercase tracking-wider mb-4 leading-none">
                    Podzespoły do maszyn rolniczych i leśnych
                  </span>

                  <p className="text-zinc-600 text-sm font-sans mb-6">
                    Produkujemy oraz dostarczamy najwyższej klasy zamienne elementy robocze do maszyn rolniczych, rozdrabniaczy, gniotowników, łuparek i rębaków leśnych. Realizujemy zamówienia na podstawie dokumentacji lub gotowych wzorów przekazanych przez klienta. Stale dbamy o doskonałe hartowanie stali i odporność na pracę w trudnych warunkach.
                  </p>

                  <h4 className="font-condensed font-extrabold text-sm text-brand-black uppercase tracking-wider mb-3">CONAJCZĘŚCIEJ TWORZYMY:</h4>

                  {/* Bullet Highlights */}
                  <div className="flex flex-col gap-2.5 mb-6">
                    {[
                      { title: "Kompletne mechanizmy tnące", text: "projektowane do precyzyjnych rębaków gałęzi i profesjonalnych rozdrabniaczy leśnych." },
                      { title: "Świdry stożkowe i wiertła", text: "o mocnych zwojach, zróżnicowanej średnicy, przeznaczone do łuparek świdrowych." },
                      { title: "Noże do rębaków z twardej stali", text: "oraz ostrza poddane specjalnej obróbce cieplnej dla maksymalnej żywotności." },
                      { title: "Wałki do gniotowników rolnych", text: "oraz precyzyjnie wyważone osie napędowe i gniotące zgodne ze specyfikacją." }
                    ].map((item, id) => (
                      <div key={id} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-red shrink-0 mt-2"></span>
                        <span className="text-xs text-zinc-700 font-sans">
                          <strong className="text-brand-black">{item.title}</strong> — {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-red/5 border border-brand-red/35 p-4 rounded-none mb-8">
                    <span className="font-condensed font-black text-xs text-brand-red uppercase tracking-wider block">WYSYŁKA I LOGISTYKA:</span>
                    <span className="text-xs text-zinc-700 mt-1 block">
                      🚚 Szybka realizacja na terenie całej Polski i Unii Europejskiej z ubezpieczeniem paczek. Solidne zabezpieczenie na paletach.
                    </span>
                  </div>
                </div>

                {/* Inquiry button */}
                <div>
                  <a 
                    href="mailto:info.nowator@gmail.com?subject=Zapytanie: Mechanizmy tnące i podzespoły&body=Dzień dobry,%0D%0Achcę przesłać zapytanie o wycenę mechanizmów tnących / podzespołów maszyn. Oto szczegóły mojego zamówienia: [proszę podać parametry/wymiary]"
                    className="inline-flex items-center bg-brand-red hover:bg-brand-red-light text-white font-condensed font-extrabold uppercase tracking-wider text-sm px-6 py-3 transition-colors duration-200 rounded-none w-full sm:w-auto text-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Zapytaj o wycenę
                  </a>
                </div>

              </div>
            </motion.div>

          </div>

          <div className="h-1 bg-brand-red w-full mt-20"></div>
        </div>
      </section>

      {/* 5. KONTAKT (CONTACT) SECTION */}
      <section 
        id="kontakt" 
        className="bg-brand-black py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* COLUMN 1: Contact details & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
              SZYBKI KONTAKT
            </span>
            <h2 className="font-condensed font-black text-white text-4xl sm:text-5xl uppercase tracking-tight mb-8">
              ZNAJDZIESZ NAS TUTAJ
            </h2>

            <div className="flex flex-col gap-6 mb-10">
              
              {/* Address info */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-black-soft border border-zinc-800 text-brand-red">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="block font-condensed font-extrabold text-xs text-zinc-500 uppercase tracking-widest leading-none mb-1">SIEDZIBA I ADRES</span>
                  <span className="text-zinc-200 text-base font-medium">
                    Tadeusza Kościuszki 66,<br /> Stopnica 28-130
                  </span>
                </div>
              </div>

              {/* Phone info */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-black-soft border border-zinc-800 text-brand-red animate-pulse">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block font-condensed font-extrabold text-xs text-zinc-500 uppercase tracking-widest leading-none mb-1">DZWON BEZPOŚREDNIO</span>
                  <a href="tel:606502642" className="text-brand-red hover:text-brand-red-light text-2xl sm:text-3xl font-condensed font-black block tracking-wide">
                    606 502 642
                  </a>
                </div>
              </div>

              {/* Email info */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-black-soft border border-zinc-800 text-brand-red">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block font-condensed font-extrabold text-xs text-zinc-500 uppercase tracking-widest leading-none mb-1">E-MAIL DO ZAPYTAŃ</span>
                  <a href="mailto:info.nowator@gmail.com" className="text-zinc-200 hover:text-brand-red text-base font-mono transition-colors break-all">
                    info.nowator@gmail.com
                  </a>
                </div>
              </div>

            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <span className="font-condensed font-bold text-xs text-zinc-500 uppercase tracking-wider">PRODUKCJA WIDEO I PROFILE</span>
              
              {/* Facebook Button (Red Fill) */}
              <a 
                href="https://www.facebook.com/Nowatorstopnica/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="bg-brand-red hover:bg-brand-red-light text-white text-sm font-condensed font-bold uppercase tracking-wider py-3 px-5 flex items-center justify-between transition-colors duration-200 rounded-none group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg bg-white text-brand-red w-6 h-6 inline-flex items-center justify-center font-serif leading-none rounded-none">f</span>
                  <span>FACEBOOK • NOWATOR STOPNICA</span>
                </div>
                <ExternalLink size={16} className="text-white/80 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* YouTube Button (Outline with SVG) */}
              <a 
                href="https://www.youtube.com/@nowatorpolska" 
                target="_blank" 
                rel="noreferrer noopener"
                className="border border-brand-red text-white hover:bg-brand-red/10 text-sm font-condensed font-bold uppercase tracking-wider py-3 px-5 flex items-center justify-between transition-all duration-200 rounded-none group"
              >
                <div className="flex items-center gap-3">
                  {/* YouTube Custom SVG outline */}
                  <svg className="w-6 h-6 fill-brand-red" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.028 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108C24 15.972 24 12 24 12s0-3.972-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YOUTUBE • NOWATOR POLSKA</span>
                </div>
                <ExternalLink size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </motion.div>

          {/* COLUMN 2: Hours summary (Compact) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3 lg:border-l lg:border-zinc-800 lg:pl-10 flex flex-col justify-between"
          >
            <div>
              <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
                GODZINY
              </span>
              <h3 className="font-condensed font-black text-white text-2xl uppercase tracking-tight mb-6">
                DO TWOICH USŁUG
              </h3>

              <div className="flex flex-col gap-4 font-condensed">
                <div className="border-b border-zinc-800 pb-2">
                  <span className="block text-zinc-500 text-xs uppercase">DNI POWSZEDNIE</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-white text-base">PONIEDZIAŁEK — PIĄTEK</span>
                    <span className="text-brand-red font-bold font-mono text-sm bg-zinc-900 border border-zinc-800 px-2.5 py-0.5">08:00 – 17:00</span>
                  </div>
                </div>

                <div className="border-b border-zinc-800 pb-2">
                  <span className="block text-zinc-500 text-xs uppercase">SOBOTA WEEKEND</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-white text-base">SOBOTA ROBOCZA</span>
                    <span className="text-brand-red font-bold font-mono text-sm bg-zinc-900 border border-zinc-800 px-2.5 py-0.5">09:00 – 14:00</span>
                  </div>
                </div>

                <div className="border-b border-zinc-800 pb-2 bg-brand-red/5 p-3 border-l-2 border-brand-red">
                  <span className="block text-brand-red text-xs uppercase font-extrabold">NIEDZIELA I ŚWIĘTA</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-zinc-200 text-base leading-none">NIEDZIELA DZIEŃ WOLNY</span>
                    <span className="text-brand-red font-black text-sm uppercase line-through">ZAMKNIĘTE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust snippet */}
            <div className="bg-zinc-950 p-4 border border-zinc-800 mt-8">
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Biuro i magazyn stacjonarny mieszczą się bezpośrednio przy drodze krajowej w Stopnicy. Dogodny dojazd i obszerny parking dla pojazdów osobowych i ciężarowych.
              </p>
            </div>
          </motion.div>

          {/* COLUMN 3: Google Maps Embed with grayscale + dark inversion filter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <span className="font-condensed text-xs tracking-widest text-brand-red font-black uppercase mb-3 block">
              MAPA DOJAZDU
            </span>
            <h3 className="font-condensed font-black text-white text-2xl uppercase tracking-tight mb-6">
              LOKALIZACJA STACJONARNA
            </h3>

            {/* Frame Map container */}
            <div className="w-full h-[280px] bg-zinc-900 border border-zinc-800 relative shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.0566738976245!2d20.949567158122232!3d50.44004501509096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4717de19fb1daaab%3A0xa8693eca26f32fe6!2sTadeusza%20Ko%C5%9Bciuszki%2066%2C%2028-130%20Stopnica!5e0!3m2!1spl!2spl!4v1781251704089!5m2!1spl!2spl" 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  filter: "grayscale(100%) invert(90%) contrast(110%)" 
                }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Siedziba Nowator Stopnica"
              ></iframe>
            </div>

            <span className="text-zinc-500 font-mono text-[10px] mt-2 block text-right tracking-wider">
              WSPÓŁRZĘDNE: 50.440045, 20.949567 • DROGA DK73
            </span>
          </motion.div>

        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="main-footer" className="bg-[#080808] border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Brand block */}
            <div className="md:col-span-4">
              <div href="#" className="flex items-center gap-2 mb-4">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-6 bg-brand-red block"></span>
                  <span className="w-1 h-3 bg-brand-red block"></span>
                </div>
                <span className="font-condensed text-3xl font-black tracking-wider text-white">NOWATOR</span>
              </div>
              <p className="text-zinc-400 font-condensed text-md uppercase tracking-wider mb-2">
                Usługi Wielobranżowe — Stopnica
              </p>
              <p className="text-zinc-500 text-xs font-sans max-w-sm leading-relaxed">
                Rzetelne kominki, solidne paleniska ogrodowe oraz mechanizmy tnące na indywidualne zamówienie. Ponadprzeciętne zaangażowanie i obsługa na najwyższym poziomie.
              </p>
            </div>

            {/* Center block Links */}
            <div className="md:col-span-4 flex flex-col md:items-center">
              <div className="w-full max-w-[200px]">
                <span className="block font-condensed font-black text-zinc-500 text-xs tracking-widest uppercase mb-4">
                  SZYBKIE LINKI
                </span>
                <nav className="flex flex-col gap-2 font-condensed text-base font-bold uppercase tracking-wider">
                  <a 
                    href="#o-firmie" 
                    onClick={(e) => { e.preventDefault(); scrollToSection("o-firmie"); }}
                    className="text-zinc-300 hover:text-brand-red transition-colors"
                  >
                    O firmie
                  </a>
                  <a 
                    href="#oferty" 
                    onClick={(e) => { e.preventDefault(); scrollToSection("oferty"); }}
                    className="text-zinc-300 hover:text-brand-red transition-colors"
                  >
                    Oferty i Produkty
                  </a>
                  <a 
                    href="https://www.facebook.com/Nowatorstopnica/" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="text-zinc-300 hover:text-brand-red transition-colors flex items-center gap-1.5"
                  >
                    Facebook <ExternalLink size={12} />
                  </a>
                  <a 
                    href="https://www.youtube.com/@nowatorpolska" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="text-zinc-300 hover:text-brand-red transition-colors flex items-center gap-1.5"
                  >
                    YouTube <ExternalLink size={12} />
                  </a>
                </nav>
              </div>
            </div>

            {/* Right block Contact snippet */}
            <div className="md:col-span-4 md:text-right">
              <span className="block font-condensed font-black text-zinc-500 text-xs tracking-widest uppercase mb-4">
                OBSŁUGA I ZAKUPY
              </span>
              <a href="tel:606502642" className="block text-brand-red hover:text-brand-red-light font-condensed font-black text-3xl tracking-wide mb-1 transition-colors">
                606 502 642
              </a>
              <a href="mailto:info.nowator@gmail.com" className="block text-zinc-300 hover:text-brand-red font-mono text-sm mb-4 transition-colors">
                info.nowator@gmail.com
              </a>
              <span className="block text-zinc-500 text-xs font-mono font-bold uppercase">
                STOPNICA 28-130 • T. KOŚCIUSZKI 66
              </span>
            </div>

          </div>

          {/* Bottom Copyright bar */}
          <div className="border-t border-zinc-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-xs font-mono">
              © 2026 Nowator Usługi Wielobranżowe | Stopnica. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex gap-1 items-center font-mono text-[9px] text-zinc-700 tracking-wider">
              <span>DESIGNED BY EXPERT AGENT FOR NOWATOR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping"></span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

/**
 * Image Carousel Component inside Card 3 (Mechanizmy tnące)
 * Handled via pure React state matching full Vanilla JS expectations:
 * - auto-play 4s
 * - pause on hover
 * - prev/next arrows (white on dark)
 * - dot indicators
 */
function Carousel() {
  const images = [
    "https://i.ibb.co/4ZyP42cv/671108730-122126973867155709-519754208804556743-n.jpg",
    "https://i.ibb.co/TBPBmBrH/670836534-122126973909155709-7602311944725929567-n.jpg",
    "https://i.ibb.co/9kHr5jdK/671215814-122126973837155709-7553819107943154702-n.jpg"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Timer setup for automatic sliding
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const setSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <div 
      className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-zinc-900 overflow-hidden group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Images with AnimatePresence */}
      <div className="absolute inset-0 w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt={`Mechanizmy tnące Nowator - zdjęcie ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Top-left Category Badge */}
      <div className="absolute top-0 left-0 bg-brand-red text-white font-condensed font-black tracking-widest px-4 py-2 uppercase text-xs z-10">
        SPRZEDAM / NA ZAMÓWIENIE
      </div>

      {/* Dark gradient overlap */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        aria-label="Poprzednie zdjęcie"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-black/80 hover:bg-brand-red text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-10 rounded-none border border-zinc-800"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={handleNext}
        aria-label="Następne zdjęcie"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-black/80 hover:bg-brand-red text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-10 rounded-none border border-zinc-800"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bullet Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            aria-label={`Przejdź do slajdu ${idx + 1}`}
            className={`w-3.5 h-1.5 transition-all duration-300 rounded-none ${
              idx === currentIndex 
                ? "bg-brand-red w-7" 
                : "bg-white/50 hover:bg-white"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
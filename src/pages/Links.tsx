import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, X, Radio as RadioIcon, Youtube, Clock, ExternalLink } from "lucide-react";

const RADIO_PROGRAMS = [
  {
    name: "Paranormal.plus",
    cover: "https://i.ibb.co/rR9yNcSP/paranormal-plus.png",
    link: "https://share.google/6Cy2SpzzA1ldiRcZI",
    schedule: "Segunda 11h, Quarta 23h",
  },
  {
    name: "Soul Cast Plus",
    cover: "https://i.ibb.co/qYw9jzGK/soulcast-plus.png",
    link: "https://share.google/6KqsdxSlcSPjlNROg",
    schedule: "Domingo 20h, Terça 15:30",
  },
];

type Variant = "dark" | "white" | "green" | "cyan" | "blue" | "primary" | "light-blue";

interface LinkItem {
  id: string;
  label: string;
  url: string;
  variant: Variant;
  icon?: "whatsapp" | "youtube" | "radio";
  onClick?: () => void;
  badge?: string;
  highlight?: boolean;
}

interface Section {
  title?: string;
  links: LinkItem[];
}

const PROFILE = {
  name: "Dr. Mauro Kwitko",
  username: "@maurokwitko",
  avatar: "https://i.ibb.co/MDn6WZRV/DR-MAURO-1.png",
  bio: "Sou Mauro Kwitko, médico homeopata e psicoterapeuta reencarnacionista. Uso a Reencarnação para ajudar as pessoas a se curarem e evoluírem. Criei a Associação Brasileira de Psicoterapia Reencarnacionista, que ensina e divulga esse método. Quero unir a Psicologia, a Psiquiatria e a Reencarnação, e fazer o bem, para isso que estou aqui.",
};

const variantClasses: Record<Variant, string> = {
  dark: "bg-foreground text-background hover:bg-foreground/90 shadow-md",
  white: "bg-white text-primary hover:bg-white/90 shadow-md border border-white/60 backdrop-blur-md",
  green: "bg-[#12cf4f] text-white hover:bg-[#0fb344] shadow-md",
  cyan: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md",
  blue: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
  "light-blue":
    "bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-500 text-white hover:from-sky-400 hover:to-cyan-400 shadow-[0_8px_24px_-8px_rgba(56,189,248,0.6)] ring-1 ring-white/40",
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 absolute right-6" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.049-.536c1.011.583 1.956.91 3.238.911h.003c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.768-5.77-5.768zm3.385 8.169c-.144.406-.838.784-1.157.828-.27.037-.621.058-1.002-.061-.24-.075-.544-.176-.932-.341-1.654-.702-2.723-2.434-2.805-2.544-.081-.11-.667-.887-.667-1.691 0-.804.42-1.198.57-1.361.15-.164.325-.205.433-.205.108 0 .217.001.312.006.1.005.234-.038.366.279.132.318.453 1.102.492 1.181.04.079.066.17.013.276-.052.106-.079.172-.158.263-.079.091-.166.203-.236.273-.081.081-.165.17-.071.332.095.161.421.696.904 1.127.621.554 1.144.726 1.306.807.161.081.256.067.35-.043.094-.11.403-.469.511-.628.108-.16.216-.134.364-.08.148.053.941.444 1.103.525.163.081.27.121.309.189.04.068.04.394-.104.801z" />
    <path d="M12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9z" />
  </svg>
);

const LinkButton = ({ item }: { item: LinkItem }) => {
  const handle = (e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
  };

  const animateProps = item.highlight
    ? {
        animate: { scale: [1, 1.035, 1] },
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <motion.a
      href={item.url}
      target={item.url.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onClick={handle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...animateProps}
      className={`relative flex items-center justify-center w-full py-4 px-8 rounded-full font-semibold uppercase text-center transition-colors overflow-hidden ${variantClasses[item.variant]}`}
    >
      {item.highlight && (
        <motion.span
          aria-hidden
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 -inset-x-2 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent skew-x-[-20deg]"
        />
      )}
      {item.icon === "youtube" && <Youtube className="w-5 h-5 absolute left-6 text-red-500" />}
      {item.icon === "radio" && <RadioIcon className="w-5 h-5 absolute left-6" />}
      {item.icon === "whatsapp" && <WhatsAppIcon />}
      <span className="relative text-[12px] tracking-wide mx-2 line-clamp-1">{item.label}</span>
      {item.badge && (
        <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider animate-pulse ring-2 ring-white">
          {item.badge}
        </span>
      )}
    </motion.a>
  );
};

const RadioModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-secondary/95 backdrop-blur-xl border border-white/40 shadow-2xl p-5"
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:bg-white/80 transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          <div className="text-center mt-1 mb-5">
            <h3 className="text-primary text-lg font-bold uppercase tracking-wider">
              Programas de Rádio
            </h3>
            <div className="mx-auto mt-2 h-0.5 w-12 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {RADIO_PROGRAMS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col rounded-2xl bg-white shadow-md overflow-hidden"
              >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="text-primary font-bold text-sm leading-tight mb-1.5">
                    {p.name}
                  </h4>
                  <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground mb-3">
                    <Clock className="w-3.5 h-3.5 mt-px shrink-0" />
                    <span className="leading-snug">{p.schedule}</span>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
                  >
                    Escutar agora <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Links() {
  const [radioOpen, setRadioOpen] = useState(false);

  useEffect(() => {
    document.title = "Dr. Mauro Kwitko — Links";
  }, []);

  const sections: Section[] = [
    {
      title: "CURSOS E ESTUDOS",
      links: [
        { id: "clube", label: "Clube de Estudos Dr. Mauro", url: "https://www.maurokwitko.com.br/clube-de-estudos", variant: "light-blue", highlight: true },
        { id: "formacao", label: "Curso de Formação: Psicoterapia Reencarnacionista", url: "https://www.maurokwitko.com.br/curso-online", variant: "white" },
      ],
    },
    {
      title: "CONTEÚDO E PRODUTOS",
      links: [
        { id: "ebooks", label: "Meus E-books", url: "https://www.maurokwitko.com.br/livros-e-ebooks", variant: "dark" },
        { id: "livros", label: "Meus Livros Físicos", url: "https://www.maurokwitko.com.br/livros-e-ebooks", variant: "blue" },
        { id: "youtube", label: "Canal Youtube — Dr. Mauro", url: "https://www.youtube.com/@MauroKwitkopsicoterapeuta", variant: "white", icon: "youtube" },
        { id: "radio", label: "Programa Dr. Mauro (Rádio)", url: "#", variant: "white", icon: "radio", onClick: () => setRadioOpen(true), badge: "Novo" },
      ],
    },
    {
      title: "CONTATO",
      links: [
        { id: "wpp", label: "Whatsapp", url: "https://wa.me/555191135137?text=Ol%C3%A1%20Dr.%20Mauro!%20Encontrei%20seu%20contato%20atrav%C3%A9s%20do%20link%20da%20bio%20do%20instagram...", variant: "green", icon: "whatsapp" },
        { id: "site", label: "Meu Site", url: "https://www.maurokwitko.com.br/", variant: "cyan" },
      ],
    },
    {
      title: "GRUPOS ABERTOS DE WHATSAPP (REENCARNACIONISTAS)",
      links: [
        { id: "g1", label: "Psicólogos, Psiquiatras e Psicanalistas", url: "https://chat.whatsapp.com/JN8vs3x9mMh5hBlSVREDfE", variant: "green" },
        { id: "g2", label: "Autismo em Crianças e Reencarnação", url: "https://chat.whatsapp.com/FBOSM7AORaoBB4NbQQ1xH7", variant: "green" },
        { id: "g3", label: "Autismo em Adultos e Reencarnação", url: "https://chat.whatsapp.com/KzUPpLTRuChEn9mXQ46j29", variant: "green" },
        { id: "g4", label: "Fogo Selvagem e Reencarnação", url: "https://chat.whatsapp.com/Kx01vJD7dFSGHr5hR3l1Uj", variant: "green" },
      ],
    },
  ];

  return (
    <div className="min-h-screen mesh-gradient">
      <main className="max-w-[480px] mx-auto px-6 py-10 flex flex-col items-center">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
            />
            <div className="absolute top-2 -right-1 bg-primary p-1 rounded-full border-2 border-white shadow">
              <BadgeCheck className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-primary text-2xl font-bold tracking-tight mb-1">{PROFILE.name}</h1>
          <p className="text-accent text-sm font-medium">{PROFILE.username}</p>
        </motion.div>

        {/* Sections */}
        <div className="w-full flex flex-col">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h2
                  className={`text-muted-foreground text-[12px] font-bold text-center mb-3 uppercase tracking-wider px-4 ${
                    idx === 0 ? "mt-2" : "mt-8"
                  }`}
                >
                  {section.title}
                </h2>
              )}
              <div className="flex flex-col space-y-3">
                {section.links.map((link) => (
                  <LinkButton key={link.id} item={link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-muted-foreground text-[11px] leading-relaxed italic px-4">{PROFILE.bio}</p>
        </footer>
      </main>

      <RadioModal open={radioOpen} onClose={() => setRadioOpen(false)} />
    </div>
  );
}

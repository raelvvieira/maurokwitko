import { motion } from 'framer-motion';
import { Radio as RadioIcon, Clock, ExternalLink } from 'lucide-react';

const programs = [
  {
    name: 'Paranormal.plus',
    cover: 'https://i.ibb.co/rR9yNcSP/paranormal-plus.png',
    link: 'https://share.google/6Cy2SpzzA1ldiRcZI',
    schedule: [
      { day: 'Segunda', time: '11h' },
      { day: 'Quarta', time: '23h' },
    ],
  },
  {
    name: 'Soul Cast Plus',
    cover: 'https://i.ibb.co/qYw9jzGK/soulcast-plus.png',
    link: 'https://share.google/6KqsdxSlcSPjlNROg',
    schedule: [
      { day: 'Domingo', time: '20h' },
      { day: 'Terça', time: '15:30' },
    ],
  },
];

const RadioPublica = () => {
  return (
    <div className="pt-24 md:pt-32 pb-16 max-w-5xl mx-auto px-5 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Programas no ar</span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-3 flex items-center justify-center gap-3">
          <RadioIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" /> Rádio com Dr. Mauro
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          Acompanhe os programas semanais do Dr. Mauro nessas rádios espiritualistas. Os programas anteriores busque no Menu.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program, i) => (
          <motion.div
            key={program.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-3xl overflow-hidden flex flex-col bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm hover:shadow-lg transition-all"
          >
            <img src={program.cover} alt={program.name} className="w-full aspect-video object-cover" />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-3">{program.name}</h2>
              <div className="space-y-2 mb-5">
                {program.schedule.map((s) => (
                  <div key={s.day} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                      {s.day} — <strong className="text-foreground">{s.time}</strong>
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Escutar Agora <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RadioPublica;

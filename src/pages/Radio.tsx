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

const RadioPage = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <RadioIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Programas de Rádio com o Dr. Mauro
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Ouça os programas do Dr. Mauro Kwitko</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program, i) => (
          <motion.div
            key={program.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="glass-card overflow-hidden flex flex-col"
          >
            <img
              src={program.cover}
              alt={program.name}
              className="w-full aspect-video object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-3">{program.name}</h2>
              <div className="space-y-2 mb-5">
                {program.schedule.map((s) => (
                  <div key={s.day} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{s.day} — <strong className="text-foreground">{s.time}</strong></span>
                  </div>
                ))}
              </div>
              <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform"
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

export default RadioPage;

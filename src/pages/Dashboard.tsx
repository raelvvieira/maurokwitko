import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, BookOpen, Trophy, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroSlides = [
  { title: 'Domine React Avançado', subtitle: 'Patterns, Performance e Arquitetura profissional', color: 'from-primary to-accent' },
  { title: 'Novo: Design System', subtitle: 'Aprenda a criar sistemas de design escaláveis', color: 'from-accent to-success' },
  { title: 'Desafio 30 Dias', subtitle: 'Participe e suba no ranking global', color: 'from-primary to-purple-500' },
];

const Dashboard = () => {
  const { courses, profile, ranking } = useApp();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const userRank = ranking.find(r => r.name === 'Você');
  const overallProgress = Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* WhatsApp Group Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 p-6 md:p-8"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-white" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white" />
          <div className="absolute -bottom-6 right-20 w-32 h-32 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">
            🟢 Entre no Grupo do WhatsApp do Clube!
          </h3>
          <p className="text-sm md:text-base text-white/80 mb-5 max-w-xl">
            Participe das discussões, troque experiências com outros membros e aproveite a interação da comunidade. Para entrar, basta clicar no botão abaixo:
          </p>
          <a
            href="https://chat.whatsapp.com/EZm9mXr8Du386Kxl61ZU6K"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-700 font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Entrar no Grupo
          </a>
        </div>
      </motion.div>
      {/* Hero Carousel */}
      <motion.div
        key={slide}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${heroSlides[slide].color} p-6 md:p-8 min-h-[160px] md:min-h-[200px] flex flex-col justify-end`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-xl md:text-3xl font-bold text-primary-foreground mb-2">{heroSlides[slide].title}</h1>
          <p className="text-sm md:text-base text-primary-foreground/80 mb-4">{heroSlides[slide].subtitle}</p>
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/30 transition-colors"
          >
            Explorar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 md:right-6 flex gap-2 z-10">
          <button onClick={() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)} className="p-1.5 rounded-full bg-primary-foreground/20 backdrop-blur text-primary-foreground hover:bg-primary-foreground/30"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setSlide(s => (s + 1) % heroSlides.length)} className="p-1.5 rounded-full bg-primary-foreground/20 backdrop-blur text-primary-foreground hover:bg-primary-foreground/30"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: BookOpen, label: 'Cursos Ativos', value: courses.length.toString(), color: 'text-primary' },
          { icon: Trophy, label: 'Posição Ranking', value: `#${userRank?.position ?? '-'}`, color: 'text-gold' },
          { icon: Flame, label: 'Dias de Streak', value: profile.streak.toString(), color: 'text-destructive' },
          { icon: TrendingUp, label: 'Score Total', value: profile.totalScore.toLocaleString(), color: 'text-success' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex items-center gap-3 md:gap-4"
          >
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress + Ranking preview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 glass-card">
          <h2 className="text-sm font-semibold mb-4">Progresso Geral</h2>
          <div className="flex items-center justify-center gap-8">
            <RadialProgress value={overallProgress} label="Cursos" size={120} />
            <RadialProgress value={userRank ? Math.round((userRank.score / 10000) * 100) : 0} label="Ranking" size={120} color="accent" />
          </div>
        </div>

        <div className="md:col-span-3 glass-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Continue Aprendendo</h2>
            <button onClick={() => navigate('/courses')} className="text-xs text-primary font-medium hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 3).map(course => (
              <button
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{course.title}</p>
                  <p className="text-xs text-muted-foreground">{course.instructor} · {course.completedLessons}/{course.totalLessons} aulas</p>
                </div>
                <div className="w-16 hidden sm:block">
                  <div className="h-1.5 rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground text-right mt-1">{course.progress}%</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

const RadialProgress = ({ value, label, size = 100, color = 'primary' }: { value: number; label: string; size?: number; color?: string }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={`hsl(var(--${color}))`}
          strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center" style={{ marginTop: size / 2 - 16 }}>
        <span className="text-xl font-bold">{value}%</span>
      </div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
    </div>
  );
};

export default Dashboard;

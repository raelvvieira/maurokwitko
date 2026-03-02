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
      {/* Hero Carousel */}
      <motion.div
        key={slide}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${heroSlides[slide].color} p-8 min-h-[200px] flex flex-col justify-end`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">{heroSlides[slide].title}</h1>
          <p className="text-primary-foreground/80 mb-4">{heroSlides[slide].subtitle}</p>
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-foreground/20 backdrop-blur text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/30 transition-colors"
          >
            Explorar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 right-6 flex gap-2 z-10">
          <button onClick={() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)} className="p-1.5 rounded-full bg-primary-foreground/20 backdrop-blur text-primary-foreground hover:bg-primary-foreground/30"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setSlide(s => (s + 1) % heroSlides.length)} className="p-1.5 rounded-full bg-primary-foreground/20 backdrop-blur text-primary-foreground hover:bg-primary-foreground/30"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
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
            className="glass-card flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress + Ranking preview */}
      <div className="grid grid-cols-5 gap-6">
        {/* Progress circles */}
        <div className="col-span-2 glass-card">
          <h2 className="text-sm font-semibold mb-4">Progresso Geral</h2>
          <div className="flex items-center justify-center gap-8">
            <RadialProgress value={overallProgress} label="Cursos" size={120} />
            <RadialProgress value={userRank ? Math.round((userRank.score / 10000) * 100) : 0} label="Ranking" size={120} color="accent" />
          </div>
        </div>

        {/* Continue learning */}
        <div className="col-span-3 glass-card">
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
                <div className="w-16">
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

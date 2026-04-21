import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Users,
  Video,
  BookOpen,
  Music,
  GraduationCap,
  Sparkles,
  Heart,
  Gift,
  Tag,
} from 'lucide-react';
import { useEbooks } from '@/hooks/useSupabaseData';
import Marquee from '@/components/public/Marquee';

const HINOS_COVERS = [
  'https://i.ibb.co/v6fpPVzb/HINOS-DE-PAZ-2.png',
  'https://i.ibb.co/q3GHxr4p/HINOS-DE-AMOR-2.png',
  'https://i.ibb.co/TDs4sdxQ/HINOS-DE-F-2-2.png',
];

const BENEFITS = [
  { icon: Users, title: 'Comunidade ativa', desc: 'Troque ideias com profissionais em busca da reforma íntima.' },
  { icon: MessageCircle, title: 'Grupo VIP no WhatsApp', desc: 'Convivência diária e suporte direto.' },
  { icon: Video, title: 'Lives exclusivas', desc: 'Entrevistas em primeira mão com convidados especiais.' },
  { icon: BookOpen, title: 'Acervo completo', desc: 'E-books, aulas, hinos e curso gravado.' },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Acesse E-books e Futuros Lançamentos',
    desc: 'Biblioteca digital crescente com obras do Dr. Mauro Kwitko, lançamentos chegam primeiro para os membros.',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
  },
  {
    icon: Video,
    title: 'Lives e Aulas Gravadas',
    desc: 'Encontros ao vivo com convidados especiais e biblioteca completa de aulas para rever quando quiser.',
    cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
  },
  {
    icon: GraduationCap,
    title: 'Curso Gravado: A Reforma Íntima',
    desc: 'Acesso integral ao curso "A Psicologia da Reencarnação", com mais de 20 módulos.',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80',
  },
];

const PRICE_INCLUDES = [
  'Comunidade exclusiva',
  'Grupo VIP no WhatsApp',
  'Lives com convidados especiais',
  'Acervo de e-books e aulas',
  'Hinários completos',
  'Curso A Reforma Íntima',
  'Cancele quando quiser',
];

const FAQ = [
  { q: 'O que recebo ao assinar?', a: 'Acesso à comunidade, grupo VIP no WhatsApp, lives ao vivo, acervo de e-books, aulas gravadas, hinos e o curso completo "A Reforma Íntima".' },
  { q: 'Posso cancelar quando quiser?', a: 'Sim. A assinatura é mensal e pode ser cancelada a qualquer momento, sem multas.' },
  { q: 'Como acesso o conteúdo?', a: 'Após a assinatura, você recebe acesso imediato à plataforma e ao grupo de WhatsApp.' },
  { q: 'Quem pode participar?', a: 'O Clube é aberto a psicoterapeutas, médicos, profissionais de saúde e qualquer pessoa em busca de aprofundar a reforma íntima e a espiritualidade.' },
];

const ClubeDeEstudos = () => {
  const { ebooks } = useEbooks();
  const ebookCovers = ebooks.filter((e) => e.cover_url);

  return (
    <div className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Comunidade Exclusiva</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Clube de Estudos <br />
            <span className="italic font-serif text-primary">Dr. Mauro Kwitko</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Faça parte de uma comunidade viva de psicoterapeutas, médicos e demais profissionais da saúde
            que buscam aprofundar a reforma íntima, a espiritualidade e a Psicoterapia Reencarnacionista.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-sm md:text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Assine agora — R$ 29/mês <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <span className="text-xs text-muted-foreground">Cancele quando quiser</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 to-accent/20 rounded-[2rem] blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/40">
            <img
              src="https://i.ibb.co/mCWzv6QL/39854-adfff7a290f852480e5d85a937447885.jpg"
              alt="Dr. Mauro Kwitko"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* FAIXA DE BENEFÍCIOS */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40 shadow-sm text-center"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold">{b.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARD DE BENEFÍCIOS — E-BOOKS GRATUITOS + 20% LIVROS FÍSICOS */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-20">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent ring-1 ring-emerald-500/30 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Todos os e-books do Dr. Mauro, <span className="text-emerald-700 dark:text-emerald-400">totalmente gratuitos</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Como membro do Clube, você baixa e lê todos os e-books publicados pelo Dr. Mauro Kwitko sem pagar nada a mais — e os próximos lançamentos chegam primeiro pra você.
            </p>
          </div>
          <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent ring-1 ring-primary/30 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-primary">20% de desconto</span> em todos os livros físicos
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Membros recebem 20% de desconto na compra de qualquer livro físico publicado pelo Dr. Mauro pela editora BesouroBox.
            </p>
          </div>
        </div>
      </section>

      {/* CONTEÚDOS DO DR. MAURO — carrossel só de e-books, capas */}
      <section className="mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Acervo</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
            Acesse todos os conteúdos do Dr. Mauro
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            E-books, aulas, lives, hinos e curso completo — tudo em um só lugar.
          </p>
        </div>
        {ebookCovers.length > 0 && (
          <Marquee
            items={ebookCovers}
            duration={Math.max(40, ebookCovers.length * 8)}
            renderItem={(e) => (
              <div className="block w-[160px] h-[226px] md:w-[200px] md:h-[283px] rounded-xl overflow-hidden bg-muted shadow-md ring-1 ring-border/40 relative">
                <img src={e.cover_url ?? ''} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
          />
        )}
      </section>

      {/* SEÇÕES DE CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-24 space-y-16">
        {FEATURES.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''}`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-border/40">
              <img src={f.cover} alt={f.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
            </div>
          </motion.div>
        ))}

        {/* Hinários */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Hinários completos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Coletâneas de hinos para meditação, estudo e reflexão — Hinos de Paz, Amor e Fé.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {HINOS_COVERS.map((c) => (
              <div key={c} className="rounded-xl overflow-hidden ring-1 ring-border/40 shadow-md aspect-square">
                <img src={c} alt="Hinário" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* COMUNIDADE — REFORÇO */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mt-24">
        <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 ring-1 ring-border/40 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Mais que conteúdo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Uma comunidade viva</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-base md:text-lg">
            O coração do Clube é a troca entre <strong>psicoterapeutas, médicos e demais profissionais da saúde</strong>
            {' '}que estão buscando aprofundar a reforma íntima, a espiritualidade e a Psicoterapia Reencarnacionista —
            ao lado de pessoas comuns enriquecendo essa caminhada.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mt-6">
            {[
              'Conversar em fóruns internos',
              'Comentar aulas e relatos clínicos',
              'Postar suas próprias experiências',
              'Participar do grupo VIP no WhatsApp',
              'Receber em primeira mão as lives com entrevistados',
              'Trocas com profissionais de diversas áreas',
            ].map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CARD DE PREÇO */}
      <section className="max-w-xl mx-auto px-4 md:px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 md:p-10 bg-background ring-2 ring-primary shadow-2xl text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Acesso Mensal
          </div>
          <h3 className="text-xl font-bold">Acesso ao Clube de Estudos</h3>
          <div className="mt-5 flex items-end justify-center gap-1">
            <span className="text-2xl font-bold text-muted-foreground">R$</span>
            <span className="text-6xl font-bold tracking-tight">29</span>
            <span className="text-base text-muted-foreground mb-2">/mês</span>
          </div>
          <ul className="mt-7 space-y-3 text-left">
            {PRICE_INCLUDES.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-8"
          >
            <Link
              to="/login"
              className="block w-full px-6 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Assinar agora
            </Link>
          </motion.div>
          <p className="text-xs text-muted-foreground mt-3">Cancele quando quiser, sem multa.</p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-24">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Dúvidas</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Perguntas frequentes</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl p-5 bg-gradient-to-br from-background to-secondary/40 border border-border/60 ring-1 ring-border/40"
            >
              <h3 className="font-bold text-base">{f.q}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mt-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Sua caminhada começa aqui</h2>
        <p className="text-muted-foreground mt-4">Junte-se à comunidade do Dr. Mauro Kwitko hoje mesmo.</p>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-7 inline-block"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-base font-bold hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Assine por R$ 29/mês <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ClubeDeEstudos;

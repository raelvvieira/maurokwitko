import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, X } from 'lucide-react';

const courses = [
  { id: '1', title: 'Aula 1 - Introdução ao Estudo', youtubeId: 'dQw4w9WgXcQ', description: 'Apresentação do curso e fundamentos iniciais.' },
  { id: '2', title: 'Aula 2 - Fundamentos Bíblicos', youtubeId: 'dQw4w9WgXcQ', description: 'Base bíblica para o estudo aprofundado.' },
  { id: '3', title: 'Aula 3 - Vida de Oração', youtubeId: 'dQw4w9WgXcQ', description: 'A importância da oração na caminhada cristã.' },
  { id: '4', title: 'Aula 4 - Cura e Libertação', youtubeId: 'dQw4w9WgXcQ', description: 'Princípios de cura interior e libertação.' },
  { id: '5', title: 'Aula 5 - Batalha Espiritual', youtubeId: 'dQw4w9WgXcQ', description: 'Como enfrentar as batalhas espirituais.' },
  { id: '6', title: 'Aula 6 - Discipulado', youtubeId: 'dQw4w9WgXcQ', description: 'Formação de discípulos e liderança.' },
];

const Courses = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Cursos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aulas em vídeo do Dr. Mauro Kwitko</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex flex-col cursor-pointer group"
            onClick={() => setActiveVideo(course.youtubeId)}
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-muted">
              <img
                src={`https://img.youtube.com/vi/${course.youtubeId}/hqdefault.jpg`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
            <h3 className="text-base font-semibold mb-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground flex-1">{course.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-3xl mx-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white hover:text-primary transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;

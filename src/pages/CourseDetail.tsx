import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Circle, ArrowLeft, Download, MessageSquare, FileText } from 'lucide-react';
import { useState } from 'react';

const tabs = ['Visão Geral', 'Recursos', 'Comentários'] as const;

const CourseDetail = () => {
  const { lessons, markLessonComplete } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Visão Geral');
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);

  return (
    <div className="max-w-7xl space-y-4">
      <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar aos Cursos
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* Video area */}
        <div className="col-span-2 space-y-4">
          <div className="glass-card p-0 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </div>
              <p className="absolute bottom-4 left-4 text-sm font-medium">{currentLesson.title}</p>
              <span className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-secondary/80 px-2 py-1 rounded-md">{currentLesson.duration}</span>
            </div>
          </div>

          {!currentLesson.completed && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => markLessonComplete(currentLesson.id)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm hover:shadow-lg transition-shadow"
            >
              ✓ Marcar como Concluída
            </motion.button>
          )}
          {currentLesson.completed && (
            <div className="w-full py-3 rounded-xl bg-success/10 text-success font-semibold text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Aula Concluída
            </div>
          )}

          {/* Tabs */}
          <div className="glass-card">
            <div className="flex gap-1 mb-4 p-1 bg-secondary/50 rounded-xl w-fit">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary-foreground shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Visão Geral' && (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Nesta aula, você vai aprender sobre <strong className="text-foreground">{currentLesson.title}</strong> de forma prática e objetiva.</p>
                <p>Ao final, você será capaz de aplicar esses conceitos em projetos reais, melhorando a qualidade e manutenibilidade do seu código.</p>
              </div>
            )}
            {activeTab === 'Recursos' && (
              <div className="space-y-2">
                {['Slides da Aula.pdf', 'Código Fonte.zip', 'Exercícios.md'].map(f => (
                  <div key={f} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{f}</span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Comentários' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20" />
                    <span className="text-sm font-medium">Marina Santos</span>
                    <span className="text-xs text-muted-foreground">· 2h atrás</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Excelente explicação! Ficou muito claro.</p>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Adicionar comentário..." className="flex-1 px-4 py-2 rounded-xl bg-secondary/40 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lesson list sidebar */}
        <div className="glass-card h-fit max-h-[80vh] overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3">Aulas do Curso</h3>
          <div className="space-y-1">
            {lessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all text-sm ${
                  currentLesson.id === lesson.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                }`}
              >
                {lesson.completed ? (
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

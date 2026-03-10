import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users } from 'lucide-react';

const Courses = () => {
  const { courses } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Meus Cursos</h1>
        <p className="text-sm text-muted-foreground mt-1">Continue de onde parou</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course, i) => (
          <motion.button
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/courses/${course.id}`)}
            className="glass-card text-left group"
          >
            <div className="w-full h-36 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-primary/40 group-hover:scale-110 transition-transform" />
            </div>
            <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2">{course.category}</span>
            <h3 className="text-base font-semibold mb-1">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.totalLessons} aulas</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.completedLessons} concluídas</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${course.progress}%` }} />
            </div>
            <p className="text-xs text-right mt-1 text-muted-foreground">{course.progress}%</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Courses;

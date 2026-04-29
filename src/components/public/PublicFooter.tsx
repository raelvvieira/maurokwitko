import { Instagram, Youtube, Facebook, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-mauro-kwitko.png';
import { getArrayTranslation } from '@/i18n';

const PublicFooter = () => {
  const { t } = useTranslation();
  const schedule = getArrayTranslation<string>(t('footer.schedule', { returnObjects: true }));

  return (
    <footer className="bg-[hsl(210_25%_12%)] text-white/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Dr. Mauro Kwitko"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#home" className="text-white/60 hover:text-white transition-colors">{t('footer.links.home')}</a></li>
              <li><a href="#cursos" className="text-white/60 hover:text-white transition-colors">{t('footer.links.cursos')}</a></li>
              <li><a href="#livros" className="text-white/60 hover:text-white transition-colors">{t('footer.links.livros')}</a></li>
              <li><a href="#hinos" className="text-white/60 hover:text-white transition-colors">{t('footer.links.hinos')}</a></li>
              <li><a href="#artigos" className="text-white/60 hover:text-white transition-colors">{t('footer.links.artigos')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-4">{t('footer.service')}</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              {Array.isArray(schedule) && schedule.map((s) => <li key={s}>{s}</li>)}
              <li className="pt-2">{t('footer.location')}</li>
              <li>{t('footer.online')}</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/90 mb-4">{t('footer.newsletter')}</h4>
            <p className="text-sm text-white/60 mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-success/40"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-success text-success-foreground text-sm font-semibold hover:bg-success/90 transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Dr. Mauro Kwitko. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/maurokwitko/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/channel/UCrAaxlSZUbKoFNrCVgQ3uAw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/maurokwitko" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

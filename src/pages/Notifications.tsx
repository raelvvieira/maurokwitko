import { useNotificationsPaginated } from '@/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const notificationTypes = [
  { value: 'all', label: 'Todos' },
  { value: 'welcome', label: 'Boas-vindas' },
  { value: 'new_lesson', label: 'Nova aula' },
  { value: 'achievement', label: 'Conquista' },
  { value: 'community_highlight', label: 'Destaque' },
  { value: 'live_event', label: 'Evento ao vivo' },
  { value: 'weekly_reflection', label: 'Reflexão' },
  { value: 'ranking_up', label: 'Ranking' },
  { value: 'custom', label: 'Personalizada' },
];

const Notifications = () => {
  const {
    notifications, totalCount, page, setPage, totalPages,
    filterType, setFilterType, filterRead, setFilterRead,
    isLoading, markAsRead,
  } = useNotificationsPaginated();
  const navigate = useNavigate();

  const handleClick = (n: any) => {
    if (!n.read) markAsRead(n.id);
    const url = n.metadata?.url;
    if (url) navigate(url);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Notificações</h1>
        <p className="text-sm text-muted-foreground mt-1">{totalCount} notificações no total</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setPage(0); }}
          className="px-3 py-2 rounded-xl bg-secondary/50 text-sm"
        >
          {notificationTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <select
          value={filterRead}
          onChange={e => { setFilterRead(e.target.value); setPage(0); }}
          className="px-3 py-2 rounded-xl bg-secondary/50 text-sm"
        >
          <option value="all">Todas</option>
          <option value="unread">Não lidas</option>
          <option value="read">Lidas</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="glass-card text-center py-12">
          <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Nenhuma notificação encontrada</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <button
              key={n.id}
              onClick={() => handleClick(n)}
              className={`w-full text-left glass-card flex items-start gap-3 transition-colors hover:ring-1 hover:ring-primary/20 ${
                !n.read ? 'ring-1 ring-primary/10 bg-primary/5' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">
                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: ptBR })}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 rounded-xl hover:bg-secondary/60 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted-foreground">
            {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-xl hover:bg-secondary/60 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;

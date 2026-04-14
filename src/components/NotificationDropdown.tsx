import { Bell, CheckCheck, BookOpen, MessageSquare, Trophy, Users, Star, Radio, Gift, Calendar, ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNotifications, type Notification } from '@/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const typeIcons: Record<string, React.ReactNode> = {
  welcome: <Star className="w-4 h-4 text-yellow-500" />,
  new_lesson: <BookOpen className="w-4 h-4 text-blue-500" />,
  comment_reply: <MessageSquare className="w-4 h-4 text-green-500" />,
  achievement: <Trophy className="w-4 h-4 text-amber-500" />,
  community_highlight: <Users className="w-4 h-4 text-purple-500" />,
  live_event: <Radio className="w-4 h-4 text-red-500" />,
  weekly_reflection: <Star className="w-4 h-4 text-indigo-500" />,
  ranking_up: <Trophy className="w-4 h-4 text-emerald-500" />,
  active_member_discount: <Gift className="w-4 h-4 text-pink-500" />,
  member_anniversary: <Calendar className="w-4 h-4 text-cyan-500" />,
};

function getIcon(type: string) {
  return typeIcons[type] || <Bell className="w-4 h-4 text-muted-foreground" />;
}

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleClick = (n: Notification) => {
    if (!n.read) markAsRead(n.id);
    const url = (n.metadata as any)?.url;
    if (url) navigate(url);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 md:w-96 p-0 max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3 h-3" />
              Marcar todas como lidas
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Nenhuma notificação ainda
            </div>
          ) : (
            notifications.map(n => (
              <button
                key={n.id}
                onClick={() => handleClick(n)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-secondary/40 transition-colors border-b border-border/50 last:border-0 ${
                  !n.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-tight ${!n.read ? 'font-semibold' : 'font-medium'}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">
                    {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                )}
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-4 py-2">
          <button
            onClick={() => navigate('/notificacoes')}
            className="w-full text-xs text-primary hover:underline flex items-center justify-center gap-1"
          >
            Ver todas <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;

import { Outlet } from 'react-router-dom';
import GlassSidebar from './GlassSidebar';
import TopBar from './TopBar';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AppShell = () => {
  const { sidebarCollapsed } = useApp();
  const isMobile = useIsMobile();

  const marginLeft = isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64';

  return (
    <div className="min-h-screen mesh-gradient">
      <GlassSidebar />
      <div className={`${marginLeft} transition-all duration-300`}>
        <TopBar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;

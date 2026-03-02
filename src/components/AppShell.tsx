import { Outlet } from 'react-router-dom';
import GlassSidebar from './GlassSidebar';
import TopBar from './TopBar';
import FloatingPlayer from './FloatingPlayer';

const AppShell = () => {
  return (
    <div className="min-h-screen mesh-gradient">
      <GlassSidebar />
      <div className="ml-64 pb-20">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <FloatingPlayer />
    </div>
  );
};

export default AppShell;

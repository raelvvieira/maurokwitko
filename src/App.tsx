import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import { useAuth } from "./hooks/useAuth";
import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Ranking from "./pages/Ranking";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import Ebooks from "./pages/Ebooks";
import EbookReader from "./pages/EbookReader";
import BlogPost from "./pages/BlogPost";
import Livros from "./pages/Livros";
import RadioPage from "./pages/Radio";
import Materials from "./pages/Materials";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Discounts from "./pages/Discounts";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <AppProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/ebooks/:id" element={<EbookReader />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/radio" element={<RadioPage />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/notificacoes" element={<Notifications />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthGate />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

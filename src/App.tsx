import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Ranking from "./pages/Ranking";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import Biblioteca from "./pages/Biblioteca";
import RadioPage from "./pages/Radio";
import Materials from "./pages/Materials";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Discounts from "./pages/Discounts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/library" element={<Library />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/discounts" element={<Discounts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AnnouncementList from './pages/AnnouncementList';
import PressList from './pages/PressList';
import ArticleDetail from './pages/ArticleDetail';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcements" element={<AnnouncementList />} />
        <Route path="/announcements/:id" element={<ArticleDetail kind="announcement" />} />
        <Route path="/news" element={<PressList />} />
        <Route path="/news/:id" element={<ArticleDetail kind="press" />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

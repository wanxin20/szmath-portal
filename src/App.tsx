import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ArticleListPage from './components/ArticleListPage';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import { SECTIONS } from './sections';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/announcements" element={<ArticleListPage section={SECTIONS.announcement} />} />
        <Route path="/announcements/:id" element={<ArticleDetail kind="announcement" />} />
        <Route path="/news" element={<ArticleListPage section={SECTIONS.press} />} />
        <Route path="/news/:id" element={<ArticleDetail kind="press" />} />
        <Route path="/kepu" element={<ArticleListPage section={SECTIONS.kepu} />} />
        <Route path="/kepu/:id" element={<ArticleDetail kind="kepu" />} />
        <Route path="/keyan" element={<ArticleListPage section={SECTIONS.keyan} />} />
        <Route path="/keyan/:id" element={<ArticleDetail kind="keyan" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

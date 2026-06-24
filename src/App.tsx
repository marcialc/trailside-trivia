import { Routes, Route } from 'react-router-dom';
import ParkListPage from './pages/ParkListPage';
import ParkPage from './pages/ParkPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ParkListPage />} />
      <Route path="/:parkSlug" element={<ParkPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

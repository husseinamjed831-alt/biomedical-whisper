import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Landing from './pages/Landing';
import Theory from './pages/Theory';
import Labs from './pages/Labs';
import Exams from './pages/Exams';
import Joker from './pages/Joker';
import Evaluation from './pages/Evaluation';
import Courses from './pages/Courses';
import Patent from './pages/Patent';
import Donations from './pages/Donations';
import OfficeTools from './pages/OfficeTools';
import Security from './pages/Security';
import SubjectRoom from './pages/SubjectRoom';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/theory" element={<Theory />} />
                <Route path="/subject/:subject" element={<SubjectRoom />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/joker" element={<Joker />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/patent" element={<Patent />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/office" element={<OfficeTools />} />
                <Route path="/security" element={<Security />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
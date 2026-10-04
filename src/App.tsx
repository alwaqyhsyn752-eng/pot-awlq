import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { SplashScene } from './cinematic/SplashScene';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { TeacherIDE } from './components/teacher/TeacherIDE';
import { PortfolioWallet } from './components/portfolio-wallet/PortfolioWallet';
import { ErrorFixer } from './components/error-fixer/ErrorFixer';
import { SkillTreePage } from './components/skill-tree/SkillTreePage';
import { QuizCenter } from './components/quiz/QuizCenter';
import { SettingsPanel } from './components/settings/SettingsPanel';

export default function App() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('pot-intro') === 'done'
  );
  if (!introDone) return <SplashScene onComplete={() => {
    sessionStorage.setItem('pot-intro','done'); setIntroDone(true);
  }} />;
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/teacher" element={<TeacherIDE />} />
      <Route path="/portfolio" element={<PortfolioWallet />} />
      <Route path="/error-fixer" element={<ErrorFixer />} />
      <Route path="/skill-tree" element={<SkillTreePage />} />
      <Route path="/quiz" element={<QuizCenter />} />
      <Route path="/settings" element={<SettingsPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { useState } from 'react';
import Sidebar from './components/chnc/Sidebar';
import Header from './components/chnc/Header';
import CampaignContent from './components/chnc/CampaignContent';
import Planner from './components/chnc/pages/Planner';
import Inbox from './components/chnc/pages/Inbox';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-white">
          {activePage === 'soc-planner' ? (
            <Planner />
          ) : activePage === 'soc-inbox' ? (
            <Inbox />
          ) : (
            <CampaignContent />
          )}
        </main>
      </div>
    </div>
  );
}

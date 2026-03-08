import { useState } from 'react';
import Sidebar from './components/chnc/Sidebar';
import Header from './components/chnc/Header';
import CampaignPipeline from './components/chnc/pages/CampaignPipeline';
import QuickLaunch from './components/chnc/flows/QuickLaunch';
import LeadGenFlow from './components/chnc/flows/LeadGenFlow';
import Planner from './components/chnc/pages/Planner';
import Inbox from './components/chnc/pages/Inbox';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');

  const renderContent = () => {
    switch (activePage) {
      case 'soc-planner':
        return <Planner />;
      case 'soc-inbox':
        return <Inbox />;
      case 'amp-setup':
        return <QuickLaunch />;
      case 'amp-mgmt':
        return <CampaignPipeline onLaunchCampaign={() => setActivePage('amp-setup')} />;
      case 'amp-insight':
        return <LeadGenFlow />;
      default:
        return <CampaignPipeline onLaunchCampaign={() => setActivePage('amp-setup')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

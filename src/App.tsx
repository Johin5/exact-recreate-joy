import { useState } from 'react';
import Sidebar from './components/chnc/Sidebar';
import Header from './components/chnc/Header';
import CampaignContent from './components/chnc/CampaignContent';
import CampaignTemplates from './components/chnc/pages/CampaignTemplates';
import CampaignPipeline from './components/chnc/pages/CampaignPipeline';
import Planner from './components/chnc/pages/Planner';
import Inbox from './components/chnc/pages/Inbox';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');
  const [launchingTemplate, setLaunchingTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setLaunchingTemplate(templateId);
    setActivePage('amp-setup');
  };

  const handleLaunchCampaign = (campaignId: string) => {
    // Navigate to campaign setup with pre-filled data
    setActivePage('amp-setup');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'soc-planner':
        return <Planner />;
      case 'soc-inbox':
        return <Inbox />;
      case 'amp-setup':
        return <CampaignContent />;
      case 'amp-mgmt':
        return <CampaignPipeline onLaunchCampaign={handleLaunchCampaign} />;
      case 'amp-insight':
        return <CampaignTemplates onSelectTemplate={handleSelectTemplate} />;
      default:
        return <CampaignPipeline onLaunchCampaign={handleLaunchCampaign} />;
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

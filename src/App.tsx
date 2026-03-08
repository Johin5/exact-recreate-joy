import { useState } from 'react';
import Sidebar from './components/chnc/Sidebar';
import Header from './components/chnc/Header';
import CampaignContent from './components/chnc/CampaignContent';
import CampaignTemplates from './components/chnc/pages/CampaignTemplates';
import CampaignPipeline from './components/chnc/pages/CampaignPipeline';
import LeadGenFlow from './components/chnc/flows/LeadGenFlow';
import Planner from './components/chnc/pages/Planner';
import Inbox from './components/chnc/pages/Inbox';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');

  const handleSelectTemplate = (templateId: string) => {
    // For now, all templates route to Lead Gen flow; future: route by template type
    setActivePage('lead-gen-flow');
  };

  const handleLaunchCampaign = (campaignId: string) => {
    setActivePage('lead-gen-flow');
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
      case 'lead-gen-flow':
        return <LeadGenFlow />;
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

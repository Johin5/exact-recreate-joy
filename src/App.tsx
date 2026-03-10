import { useState } from 'react';
import Sidebar from './components/chnc/Sidebar';
import Header from './components/chnc/Header';
import CampaignPipeline, { CampaignItem } from './components/chnc/pages/CampaignPipeline';
import CampaignTemplates from './components/chnc/pages/CampaignTemplates';
import QuickLaunch from './components/chnc/flows/QuickLaunch';
import LeadGenFlow from './components/chnc/flows/LeadGenFlow';
import CampaignContent from './components/chnc/CampaignContent';
import AwarenessFlow from './components/chnc/flows/AwarenessFlow';
import Planner from './components/chnc/pages/Planner';
import Inbox from './components/chnc/pages/Inbox';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);

  const handleLaunchCampaign = (campaign: CampaignItem) => {
    setSelectedCampaign(campaign);
    if (campaign.name.toLowerCase().includes('lead')) {
      setActivePage('amp-setup');
    } else {
      setActivePage('amp-insight');
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    // Lead gen template → dedicated flow; others → quick launch
    if (templateId === 'meta-lead-gen') {
      setActivePage('amp-setup');
    } else {
      setActivePage('amp-quick');
    }
  };

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    if (pageId !== 'amp-setup') setSelectedCampaign(null);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'soc-planner':
        return <Planner />;
      case 'soc-inbox':
        return <Inbox />;
      case 'amp-setup':
        return <LeadGenFlow />;
      case 'amp-awareness':
        return <AwarenessFlow />;
      case 'amp-templates':
        return <CampaignTemplates onSelectTemplate={handleSelectTemplate} />;
      case 'amp-quick':
        return <QuickLaunch campaign={selectedCampaign} />;
      case 'amp-mgmt':
        return <CampaignPipeline onLaunchCampaign={handleLaunchCampaign} />;
      case 'amp-insight':
        return <CampaignContent />;
      default:
        return <CampaignPipeline onLaunchCampaign={handleLaunchCampaign} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
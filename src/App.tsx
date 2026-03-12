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
import CampaignManagement, { ManagedCampaign } from './components/chnc/pages/CampaignManagement';
import CampaignDetail from './components/chnc/pages/CampaignDetail';
import ExpressLaunch from './components/chnc/flows/ExpressLaunch';

export default function App() {
  const [activePage, setActivePage] = useState('amp-mgmt');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);
  const [selectedManagedCampaign, setSelectedManagedCampaign] = useState<ManagedCampaign | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleLaunchCampaign = (campaign: CampaignItem) => {
    setSelectedCampaign(campaign);
    if (campaign.name.toLowerCase().includes('lead')) {
      setActivePage('amp-setup');
    } else {
      setActivePage('amp-insight');
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActivePage('amp-express');
  };

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    if (pageId !== 'amp-setup') setSelectedCampaign(null);
    if (pageId !== 'amp-campaign-detail') setSelectedManagedCampaign(null);
  };

  const handleSelectManagedCampaign = (campaign: ManagedCampaign) => {
    setSelectedManagedCampaign(campaign);
    setActivePage('amp-campaign-detail');
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
      case 'amp-campaign-mgmt':
        return <CampaignManagement onSelectCampaign={handleSelectManagedCampaign} />;
      case 'amp-campaign-detail':
        return selectedManagedCampaign ? (
          <CampaignDetail campaign={selectedManagedCampaign} onBack={() => handleNavigate('amp-campaign-mgmt')} />
        ) : (
          <CampaignManagement onSelectCampaign={handleSelectManagedCampaign} />
        );
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

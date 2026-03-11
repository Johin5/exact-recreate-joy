import { Search, MoreHorizontal, ArrowLeft, ArrowRight, ChevronsUpDown, SlidersHorizontal, Download, FlaskConical, BarChart3, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface ManagedCampaign {
  id: string;
  name: string;
  endDate: string;
  onOff: boolean;
  delivery: 'In draft' | 'Active' | 'Completed' | 'Paused';
  bidStrategy: string;
  budget: string;
  budgetType: string;
  attribution: string;
  results: string;
  resultType: string;
  reach: string;
  costPerResult: string;
  costType: string;
  amountSpent: string;
  thumbnail: string;
  platform: 'meta' | 'google';
  objective: string;
}

const campaignsData: ManagedCampaign[] = [
  { id: '1', name: 'Summer Sale - Lead Gen', endDate: '30/07/2024', onOff: false, delivery: 'In draft', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52', thumbnail: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=80&h=80&fit=crop', platform: 'meta', objective: 'Lead Generation' },
  { id: '2', name: 'Brand Awareness Q3', endDate: '30/07/2024', onOff: true, delivery: 'Active', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52', thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&h=80&fit=crop', platform: 'meta', objective: 'Awareness' },
  { id: '3', name: 'Search - Service Keywords', endDate: '30/07/2024', onOff: true, delivery: 'Completed', bidStrategy: 'Maximize clicks', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52', thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=80&h=80&fit=crop', platform: 'google', objective: 'Search' },
  { id: '4', name: 'Retargeting - Website Visitors', endDate: '30/07/2024', onOff: true, delivery: 'Active', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52', thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop', platform: 'meta', objective: 'Sales' },
];

const MetaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
    <path d="M20 70C20 55 28 35 38 35C44 35 48 42 52 52C56 62 60 70 66 70C72 70 78 55 78 40C78 30 74 25 68 25C58 25 48 50 42 60C36 70 32 78 24 78C16 78 10 70 10 55C10 35 18 15 32 15C42 15 48 22 52 32" stroke="#0064E0" strokeWidth="8" strokeLinecap="round"/>
    <path d="M52 52C56 42 60 35 68 35C76 35 82 45 82 60C82 72 78 78 72 78C64 78 58 65 52 52Z" stroke="#0064E0" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function DeliveryBadge({ status }: { status: ManagedCampaign['delivery'] }) {
  const styles: Record<string, string> = {
    'In draft': 'bg-warning-muted text-foreground border border-warning-border',
    'Active': 'bg-success-muted text-foreground border border-success-border',
    'Completed': 'bg-success-muted text-foreground border border-success-border',
    'Paused': 'bg-muted text-muted-foreground border border-border',
  };
  return <span className={`text-xs font-medium px-3 py-1 ${styles[status] || styles['Paused']}`}>{status}</span>;
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onChange(); }} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-brand-dark' : 'bg-muted-foreground/30'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card rounded-full transition-transform shadow-sm ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );
}

interface CampaignManagementProps {
  onSelectCampaign?: (campaign: ManagedCampaign) => void;
}

export default function CampaignManagement({ onSelectCampaign }: CampaignManagementProps) {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const toggleSelect = (id: string) => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleAll = () => setSelectedIds(selectedIds.length === campaigns.length ? [] : campaigns.map(c => c.id));
  const toggleCampaign = (id: string) => setCampaigns(prev => prev.map(c => c.id === id ? { ...c, onOff: !c.onOff } : c));

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col min-h-[calc(100vh-64px)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-sans">
        <span>AmplifyIT</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground uppercase tracking-tight font-saira-condensed">CAMPAIGN MANAGEMENT</h1>
        <div className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card text-sm font-sans">
          <span className="text-muted-foreground">Ad account ID:</span>
          <span className="font-semibold text-foreground">806822950870088</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Tab */}
      <div className="mb-8 border-b-2 border-border">
        <div className="inline-flex items-center gap-2 pb-3 border-b-2 border-brand-dark -mb-[2px]">
          <span className="text-sm font-bold uppercase tracking-wide font-saira-condensed text-foreground">CAMPAIGNS</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground uppercase tracking-tight font-saira-condensed">CAMPAIGNS ({filtered.length})</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-muted-foreground/30 w-56 font-sans" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"><SlidersHorizontal className="w-4 h-4" /> ADVANCE FILTERS</button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"><Download className="w-4 h-4" /> EXPORT</button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"><FlaskConical className="w-4 h-4" /> A/B TEST</button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"><BarChart3 className="w-4 h-4" /> CHARTS</button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"><ChevronsUpDown className="w-4 h-4" /> SORT BY</button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-card border border-border overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" checked={selectedIds.length === campaigns.length && campaigns.length > 0} onChange={toggleAll} className="w-4 h-4 border-border accent-brand-dark" />
              </th>
              {['CAMPAIGN', 'ON/OFF', 'DELIVERY', 'BID STRATEGY', 'BUDGET', 'ATTRIBUTION SETTING', 'RESULTS', 'REACH', 'COST PER RESULT', 'AMOUNT SPENT', 'ACTIONS'].map(label => (
                <th key={label} className="text-left px-4 py-3">
                  <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed whitespace-nowrap">
                    {label} {label !== 'ACTIONS' && <ChevronsUpDown className="w-3 h-3" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(campaign => (
              <tr
                key={campaign.id}
                onClick={() => onSelectCampaign?.(campaign)}
                className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedIds.includes(campaign.id)} onChange={() => toggleSelect(campaign.id)} className="w-4 h-4 border-border accent-brand-dark" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img src={campaign.thumbnail} alt={campaign.name} className="w-12 h-12 object-cover border border-border flex-shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <div className="text-sm font-semibold text-foreground font-sans">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground font-sans">End date {campaign.endDate}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                  <ToggleSwitch checked={campaign.onOff} onChange={() => toggleCampaign(campaign.id)} />
                </td>
                <td className="px-4 py-4"><DeliveryBadge status={campaign.delivery} /></td>
                <td className="px-4 py-4 text-sm text-muted-foreground font-sans whitespace-nowrap">{campaign.bidStrategy}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-foreground font-sans">{campaign.budget}</div>
                  <div className="text-xs text-muted-foreground font-sans">{campaign.budgetType}</div>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground font-sans whitespace-nowrap">{campaign.attribution}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-foreground font-sans">{campaign.results}</div>
                  <div className="text-xs text-muted-foreground font-sans">{campaign.resultType}</div>
                </td>
                <td className="px-4 py-4 text-sm text-foreground font-sans">{campaign.reach}</td>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-foreground font-sans">{campaign.costPerResult}</div>
                  <div className="text-xs text-muted-foreground font-sans">{campaign.costType}</div>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-foreground font-sans">{campaign.amountSpent}</td>
                <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                  <button className="p-1 hover:bg-muted transition-colors"><MoreHorizontal className="w-5 h-5 text-muted-foreground" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <span className="text-sm text-muted-foreground font-sans">Showing 1 - 10 of 60</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed font-sans"><ArrowLeft className="w-4 h-4" /> PREVIOUS</button>
          {[1, 2, 3].map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 text-sm font-medium flex items-center justify-center transition-colors ${currentPage === page ? 'border border-foreground text-foreground font-bold' : 'text-muted-foreground hover:bg-muted'}`}>{page}</button>
          ))}
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-brand-foreground text-sm font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed font-saira-condensed">NEXT <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}

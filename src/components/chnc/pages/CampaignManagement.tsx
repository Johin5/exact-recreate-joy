import { Search, MoreHorizontal, ArrowLeft, ArrowRight, ChevronsUpDown, SlidersHorizontal, Download, FlaskConical, BarChart3, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ManagedCampaign {
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
}

const campaignsData: ManagedCampaign[] = [
  { id: '1', name: 'New traffic campaign with recommended settings', endDate: '30/07/2024', onOff: false, delivery: 'In draft', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52' },
  { id: '2', name: 'New traffic campaign with recommended settings', endDate: '30/07/2024', onOff: true, delivery: 'Active', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52' },
  { id: '3', name: 'New traffic campaign with recommended settings', endDate: '30/07/2024', onOff: true, delivery: 'Completed', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52' },
  { id: '4', name: 'New traffic campaign with recommended settings', endDate: '30/07/2024', onOff: true, delivery: 'Active', bidStrategy: 'Using ad set bid strategy', budget: '₹1200', budgetType: 'Lifetime', attribution: '7 day click', results: '3.566', resultType: 'Link clicks', reach: '21,789', costPerResult: '₹1.87', costType: 'Per link clicks', amountSpent: '₹985.52' },
];

const columns = [
  { key: 'campaign', label: 'CAMPAIGN', sortable: true },
  { key: 'onoff', label: 'ON/OFF', sortable: true },
  { key: 'delivery', label: 'DELIVERY', sortable: true },
  { key: 'bidStrategy', label: 'BID STRATEGY', sortable: true },
  { key: 'budget', label: 'BUDGET', sortable: true },
  { key: 'attribution', label: 'ATTRIBUTION SETTING', sortable: true },
  { key: 'results', label: 'RESULTS', sortable: true },
  { key: 'reach', label: 'REACH', sortable: true },
  { key: 'costPerResult', label: 'COST PER RESULT', sortable: true },
  { key: 'amountSpent', label: 'AMOUNT SPENT', sortable: true },
  { key: 'actions', label: 'ACTIONS', sortable: false },
];

function DeliveryBadge({ status }: { status: ManagedCampaign['delivery'] }) {
  const styles: Record<string, string> = {
    'In draft': 'bg-warning-muted text-foreground border border-warning-border',
    'Active': 'bg-success-muted text-foreground border border-success-border',
    'Completed': 'bg-success-muted text-foreground border border-success-border',
    'Paused': 'bg-muted text-muted-foreground border border-border',
  };
  return <span className={`text-xs font-medium px-3 py-1 rounded-sm ${styles[status] || styles['Paused']}`}>{status}</span>;
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onChange(); }} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-brand-dark' : 'bg-muted-foreground/30'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card rounded-full transition-transform shadow-sm ${checked ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export default function CampaignManagement() {
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
              {columns.map(col => (
                <th key={col.key} className="text-left px-4 py-3">
                  <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed whitespace-nowrap">
                    {col.label} {col.sortable && <ChevronsUpDown className="w-3 h-3" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(campaign => (
              <tr key={campaign.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4">
                  <input type="checkbox" checked={selectedIds.includes(campaign.id)} onChange={() => toggleSelect(campaign.id)} className="w-4 h-4 border-border accent-brand-dark" />
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-foreground font-sans">{campaign.name}</div>
                  <div className="text-xs text-muted-foreground font-sans">End date {campaign.endDate}</div>
                </td>
                <td className="px-4 py-4">
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
                <td className="px-4 py-4">
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

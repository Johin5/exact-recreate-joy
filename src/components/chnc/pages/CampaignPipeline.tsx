import { Search, MoreHorizontal, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, LayoutGrid, List, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export interface CampaignItem {
  id: string;
  name: string;
  approvedDate: string;
  type: string;
  platform: 'meta' | 'google';
  scheduledOn: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  thumbnail: string;
}

const campaigns: CampaignItem[] = [
  { id: '1', name: 'Kolkata MS-Motors', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=80&h=80&fit=crop' },
  { id: '2', name: 'Campaign - Awareness', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&h=80&fit=crop' },
  { id: '3', name: 'Campaign - Traffic', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=80&h=80&fit=crop' },
  { id: '4', name: 'Campaign - Leads', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80&h=80&fit=crop' },
  { id: '5', name: 'Campaign - App promotion', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=80&h=80&fit=crop' },
  { id: '6', name: 'Campaign - Sales', approvedDate: '30/07/2024', type: 'Organic', platform: 'meta', scheduledOn: '02/08/2024 - 28/08/2024', status: 'Published', thumbnail: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=80&h=80&fit=crop' },
];

const MetaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
    <path d="M20 70C20 55 28 35 38 35C44 35 48 42 52 52C56 62 60 70 66 70C72 70 78 55 78 40C78 30 74 25 68 25C58 25 48 50 42 60C36 70 32 78 24 78C16 78 10 70 10 55C10 35 18 15 32 15C42 15 48 22 52 32" stroke="#0064E0" strokeWidth="8" strokeLinecap="round"/>
    <path d="M52 52C56 42 60 35 68 35C76 35 82 45 82 60C82 72 78 78 72 78C64 78 58 65 52 52Z" stroke="#0064E0" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

interface CampaignPipelineProps {
  onLaunchCampaign: (campaign: CampaignItem) => void;
}

export default function CampaignPipeline({ onLaunchCampaign }: CampaignPipelineProps) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const totalCampaigns = 60;
  const totalPages = 3;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedIds(selectedIds.length === campaigns.length ? [] : campaigns.map((c) => c.id));
  };

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto flex flex-col min-h-[calc(100vh-64px)]">
      {/* Tab */}
      <div className="mb-8 border-b-2 border-gray-200">
        <div className="inline-flex items-center gap-2 pb-3 border-b-2 border-[#050B14] -mb-[2px]">
          <span className="text-sm font-bold uppercase tracking-wide font-saira-condensed text-gray-900">APPROVED CAMPAIGNS</span>
          <span className="bg-[#050B14] text-white text-[10px] font-bold px-2 py-0.5 min-w-[24px] text-center">12</span>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 uppercase tracking-tight font-saira-condensed mb-1">APPROVED CAMPAIGNS (12)</h1>
          <p className="text-sm text-gray-400 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 w-64 font-sans"
            />
          </div>
          <div className="flex border border-gray-200">
            <button
              onClick={() => setView('grid')}
              className={`p-2.5 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2.5 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 font-saira-condensed">
            <ChevronsUpDown className="w-4 h-4" /> SORT BY
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-[#F9FAFB]">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === campaigns.length}
                  onChange={toggleAll}
                  className="w-4 h-4 border-gray-300 accent-[#050B14]"
                />
              </th>
              <th className="text-left px-4 py-3">
                <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">
                  CAMPAIGN NAME <ChevronsUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">
                  TYPE <ChevronsUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">
                  PLATFORM <ChevronsUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">
                  SCHEDULED ON <ChevronsUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">
                  STATUS <ChevronsUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-saira-condensed">ACTIONS</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((campaign) => (
              <tr key={campaign.id} onClick={() => onLaunchCampaign(campaign)} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(campaign.id)}
                    onChange={() => toggleSelect(campaign.id)}
                    className="w-4 h-4 border-gray-300 accent-[#050B14]"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.name}
                      className="w-12 h-12 object-cover border border-gray-200 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 font-sans">{campaign.name}</div>
                      <div className="text-xs text-gray-400 font-sans">Approved on {campaign.approvedDate}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 font-sans">{campaign.type}</td>
                <td className="px-4 py-4">
                  <MetaIcon />
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 font-sans">{campaign.scheduledOn}</td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-[#34CC32] font-sans">{campaign.status}</span>
                </td>
                <td className="px-4 py-4">
                  <button className="p-1 hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <span className="text-sm text-gray-400 font-sans">Showing 1 - 10 of {totalCampaigns}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed font-sans"
          >
            <ArrowLeft className="w-4 h-4" /> PREVIOUS
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 text-sm font-medium flex items-center justify-center transition-colors ${
                currentPage === page
                  ? 'border border-gray-900 text-gray-900 font-bold'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#050B14] text-white text-sm font-bold uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed font-saira-condensed"
          >
            NEXT <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

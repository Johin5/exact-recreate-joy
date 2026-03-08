import { Clock, CheckCircle2, AlertCircle, Rocket, Eye, MoreHorizontal, ArrowRight, FileText } from 'lucide-react';
import { useState } from 'react';
import ApprovalModal from '../ui/ApprovalModal';

interface CampaignItem {
  id: string;
  name: string;
  brand: string;
  platform: string;
  status: 'request' | 'creating' | 'review' | 'approved' | 'live';
  budget: string;
  createdAt: string;
  assets: number;
  objective: string;
}

const mockCampaigns: CampaignItem[] = [
  { id: '1', name: '2025 Summer Promo Q2', brand: 'Mahindra', platform: 'Meta', status: 'review', budget: '₹ 50,000', createdAt: '2025-03-01', assets: 4, objective: 'Awareness' },
  { id: '2', name: 'XUV700 Launch - Search', brand: 'Mahindra', platform: 'Google', status: 'approved', budget: '₹ 1,20,000', createdAt: '2025-02-28', assets: 6, objective: 'Performance' },
  { id: '3', name: 'Thar Accessories Retarget', brand: 'Mahindra', platform: 'Meta', status: 'creating', budget: '₹ 30,000', createdAt: '2025-03-03', assets: 2, objective: 'Retargeting' },
  { id: '4', name: 'Scorpio N Lead Gen', brand: 'Mahindra', platform: 'Meta', status: 'request', budget: '₹ 75,000', createdAt: '2025-03-05', assets: 0, objective: 'Lead Gen' },
  { id: '5', name: 'Born Electric EV Launch', brand: 'Mahindra', platform: 'Meta + Google', status: 'live', budget: '₹ 2,00,000', createdAt: '2025-02-20', assets: 8, objective: 'Awareness' },
  { id: '6', name: 'Service Booking - Search', brand: 'Mahindra', platform: 'Google', status: 'live', budget: '₹ 45,000', createdAt: '2025-02-15', assets: 3, objective: 'Conversions' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  request: { label: 'REQUEST', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: <FileText className="w-4 h-4" /> },
  creating: { label: 'CREATING', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: <Clock className="w-4 h-4" /> },
  review: { label: 'IN REVIEW', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200', icon: <Eye className="w-4 h-4" /> },
  approved: { label: 'APPROVED', color: 'text-[#34CC32]', bg: 'bg-green-50 border-green-200', icon: <CheckCircle2 className="w-4 h-4" /> },
  live: { label: 'LIVE', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: <Rocket className="w-4 h-4" /> },
};

const pipelineStages = ['request', 'creating', 'review', 'approved', 'live'] as const;

interface CampaignPipelineProps {
  onLaunchCampaign: (campaignId: string) => void;
}

export default function CampaignPipeline({ onLaunchCampaign }: CampaignPipelineProps) {
  const [view, setView] = useState<'pipeline' | 'table'>('pipeline');
  const [approvalCampaign, setApprovalCampaign] = useState<CampaignItem | null>(null);

  const getStageCount = (status: string) => mockCampaigns.filter((c) => c.status === status).length;

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 uppercase tracking-tight font-saira-condensed mb-2">CAMPAIGN MANAGEMENT</h1>
          <p className="text-sm text-gray-500 font-sans">Track campaigns from request to live. Approve before anything goes live.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-200">
            <button onClick={() => setView('pipeline')} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide font-saira-condensed ${view === 'pipeline' ? 'bg-[#050B14] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Pipeline</button>
            <button onClick={() => setView('table')} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide font-saira-condensed ${view === 'table' ? 'bg-[#050B14] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Table</button>
          </div>
        </div>
      </div>

      {view === 'pipeline' ? (
        <div className="grid grid-cols-5 gap-4">
          {pipelineStages.map((stage) => {
            const config = statusConfig[stage];
            const campaigns = mockCampaigns.filter((c) => c.status === stage);
            return (
              <div key={stage} className="min-h-[500px]">
                <div className={`flex items-center gap-2 mb-4 px-3 py-2 border ${config.bg}`}>
                  <span className={config.color}>{config.icon}</span>
                  <span className={`text-xs font-bold uppercase tracking-wide font-saira-condensed ${config.color}`}>{config.label}</span>
                  <span className="ml-auto text-xs font-bold text-gray-400">{getStageCount(stage)}</span>
                </div>
                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{campaign.platform}</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 font-saira-condensed">{campaign.name}</h4>
                      <p className="text-[10px] text-gray-400 mb-3 font-sans">{campaign.brand} · {campaign.objective}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-700">{campaign.budget}</span>
                        <span className="text-[10px] text-gray-400">{campaign.assets} assets</span>
                      </div>
                      {stage === 'review' && (
                        <button
                          onClick={() => setApprovalCampaign(campaign)}
                          className="w-full mt-3 py-2 bg-[#34CC32] hover:bg-[#2db32c] text-white text-[10px] font-bold uppercase tracking-wide transition-colors font-saira-condensed flex items-center justify-center gap-1"
                        >
                          REVIEW & APPROVE <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {stage === 'approved' && (
                        <button
                          onClick={() => onLaunchCampaign(campaign.id)}
                          className="w-full mt-3 py-2 bg-[#050B14] hover:bg-black text-white text-[10px] font-bold uppercase tracking-wide transition-colors font-saira-condensed flex items-center justify-center gap-1"
                        >
                          LAUNCH <Rocket className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Campaign</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Platform</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Budget</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Assets</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 font-saira-condensed">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCampaigns.map((c) => {
                const config = statusConfig[c.status];
                return (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-gray-900 font-saira-condensed">{c.name}</div>
                      <div className="text-[10px] text-gray-400 font-sans">{c.brand} · {c.objective}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-600 font-sans">{c.platform}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 border ${config.bg} ${config.color}`}>
                        {config.icon} {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-gray-700">{c.budget}</td>
                    <td className="px-4 py-4 text-xs text-gray-500">{c.assets}</td>
                    <td className="px-4 py-4">
                      {c.status === 'review' && (
                        <button onClick={() => setApprovalCampaign(c)} className="text-[10px] font-bold text-[#34CC32] uppercase tracking-wide font-saira-condensed hover:underline">APPROVE</button>
                      )}
                      {c.status === 'approved' && (
                        <button onClick={() => onLaunchCampaign(c.id)} className="text-[10px] font-bold text-[#050B14] uppercase tracking-wide font-saira-condensed hover:underline">LAUNCH</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {approvalCampaign && (
        <ApprovalModal
          campaign={approvalCampaign}
          onClose={() => setApprovalCampaign(null)}
          onApprove={() => { setApprovalCampaign(null); }}
          onReject={() => { setApprovalCampaign(null); }}
        />
      )}
    </div>
  );
}

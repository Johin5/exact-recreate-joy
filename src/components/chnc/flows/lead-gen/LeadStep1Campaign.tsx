import { useState } from 'react';
import { Info, CheckCircle2, MessageSquare, Globe, Phone, FileText, Zap } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';

export default function LeadStep1Campaign() {
  const [conversionLocation, setConversionLocation] = useState('instant_forms');
  const [cboEnabled, setCboEnabled] = useState(true);
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState('500');
  const [bidStrategy, setBidStrategy] = useState('lowest_cost');
  const [campaignName, setCampaignName] = useState('');

  const conversionLocations = [
    { id: 'instant_forms', label: 'Instant Forms', desc: 'Native forms on Meta — pre-fills user info for quick completion', icon: <FileText className="w-5 h-5" /> },
    { id: 'website', label: 'Website', desc: 'Direct to your landing page with Pixel/CAPI tracking', icon: <Globe className="w-5 h-5" /> },
    { id: 'messenger', label: 'Messenger', desc: 'Automated conversations to capture lead info', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'calls', label: 'Calls', desc: 'Encourage direct calls to your business', icon: <Phone className="w-5 h-5" /> },
    { id: 'combo', label: 'Website + Instant Forms', desc: 'Meta optimizes between form & website per user', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">CAMPAIGN SETUP</h2>
        <p className="text-sm text-gray-500 font-sans">Define your lead acquisition strategy and campaign-level settings.</p>
      </div>

      <div className="space-y-8 max-w-5xl">
        {/* Objective Lock */}
        <div className="bg-green-50 border border-green-200 p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#34CC32] flex-shrink-0" />
          <div>
            <span className="text-sm font-semibold text-gray-900">Campaign Objective: </span>
            <span className="text-sm text-gray-600 font-sans">Leads — Collect information from potential customers</span>
          </div>
        </div>

        {/* Campaign Name */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">BASIC INFORMATION</h3>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-900 font-sans">Campaign name</label>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Q2 2025 Lead Gen - Automotive"
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400"
            />
          </div>
        </div>

        {/* Conversion Location */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">CONVERSION LOCATION</h3>
          </div>
          <p className="text-sm text-gray-500 mb-6 font-sans">Choose where potential leads will submit their information.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setConversionLocation(loc.id)}
                className={`border p-4 cursor-pointer transition-all ${
                  conversionLocation === loc.id
                    ? 'border-2 border-black bg-white shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${conversionLocation === loc.id ? 'bg-[#050B14] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {loc.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 font-sans">{loc.label}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{loc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CBO */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">ADVANTAGE+ CAMPAIGN BUDGET</h3>
            </div>
            <Toggle checked={cboEnabled} onChange={setCboEnabled} />
          </div>
          <p className="text-sm text-gray-500 mb-6 font-sans leading-relaxed">
            Meta automatically distributes budget across ad sets to maximize results. Recommended for wide-open targeting.
          </p>

          {cboEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BrandSelect
                label="Budget type"
                options={[
                  { value: 'daily', label: 'Daily budget' },
                  { value: 'lifetime', label: 'Lifetime budget' },
                ]}
                value={budgetType}
                onChange={setBudgetType}
                className="mb-0"
                infoTooltip="true"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-900 font-sans">Budget amount</label>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={`₹ ${budgetAmount}`}
                  onChange={(e) => setBudgetAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans"
                />
              </div>
            </div>
          )}

          <BrandSelect
            label="Bid strategy"
            options={[
              { value: 'lowest_cost', label: 'Lowest cost (recommended)' },
              { value: 'cost_per_result', label: 'Cost per result goal' },
              { value: 'bid_cap', label: 'Bid cap' },
              { value: 'roas_goal', label: 'ROAS goal' },
            ]}
            value={bidStrategy}
            onChange={setBidStrategy}
            className="mb-0"
            infoTooltip="true"
          />
        </div>

        {/* Performance Note */}
        <div className="bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Performance evaluation level</h4>
            <p className="text-xs text-blue-700 font-sans leading-relaxed">
              With CBO enabled, evaluate performance at the <strong>Campaign Level</strong>. Meta optimizes across ad sets for the lowest marginal cost — individual ad set CPAs may vary due to the Breakdown Effect.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

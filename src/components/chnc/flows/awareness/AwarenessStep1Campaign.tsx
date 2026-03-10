import { useState } from 'react';
import { Info, CheckCircle2, Sparkles, Eye, Volume2, TrendingUp } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';

const BRAND_PROFILE = {
  name: 'Mahindra',
  industry: 'Automotive',
  suggestedBudget: '500',
};

const generateCampaignName = () => {
  const now = new Date();
  const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)}`;
  const year = now.getFullYear();
  return `${BRAND_PROFILE.name} ${quarter} ${year} Awareness - ${BRAND_PROFILE.industry}`;
};

export default function AwarenessStep1Campaign() {
  const [campaignName, setCampaignName] = useState(generateCampaignName());
  const [specialCategory, setSpecialCategory] = useState('');
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [cboEnabled, setCboEnabled] = useState(true);
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState(BRAND_PROFILE.suggestedBudget);
  const [bidStrategy, setBidStrategy] = useState('lowest_cost');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-foreground font-saira-condensed">CAMPAIGN SETUP</h2>
        <p className="text-sm text-muted-foreground font-sans">Define your awareness strategy and campaign-level settings.</p>
      </div>

      <div className="space-y-8 max-w-5xl">
        {/* Objective Lock */}
        <div className="bg-success-muted border border-success-border p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0" />
          <div>
            <span className="text-sm font-semibold text-foreground">Campaign Objective: </span>
            <span className="text-sm text-muted-foreground font-sans">Awareness — Reach people most likely to remember your ads</span>
          </div>
        </div>

        {/* Campaign Name */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">BASIC INFORMATION</h3>
            <span className="text-[10px] bg-success-muted text-brand px-2 py-0.5 font-bold border border-success-border flex items-center gap-1"><Sparkles className="w-3 h-3" /> Auto-filled</span>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-foreground font-sans">Campaign name</label>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Q1 2026 Awareness - Automotive"
              className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
            />
          </div>
          <BrandSelect
            label="Special ad categories"
            options={[
              { value: '', label: 'None' },
              { value: 'credit', label: 'Credit' },
              { value: 'employment', label: 'Employment' },
              { value: 'housing', label: 'Housing' },
              { value: 'social_issues', label: 'Social Issues, Elections, or Politics' },
            ]}
            value={specialCategory}
            onChange={setSpecialCategory}
            className="mb-0"
            infoTooltip="true"
          />
        </div>

        {/* A/B Test */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold uppercase font-saira-condensed">A/B TEST</h3>
            <Toggle checked={abTestEnabled} onChange={setAbTestEnabled} />
          </div>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Test versions with different images, text, audiences, or placements to improve ad performance.
          </p>
        </div>

        {/* CBO */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">ADVANTAGE+ CAMPAIGN BUDGET</h3>
            </div>
            <Toggle checked={cboEnabled} onChange={setCboEnabled} />
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-sans leading-relaxed">
            Meta automatically distributes budget across ad sets to maximize reach and awareness results.
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
                  <label className="block text-sm font-medium text-foreground font-sans">Budget amount</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={`₹ ${budgetAmount}`}
                  onChange={(e) => setBudgetAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans"
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
            ]}
            value={bidStrategy}
            onChange={setBidStrategy}
            className="mb-0"
            infoTooltip="true"
          />
        </div>
      </div>
    </>
  );
}

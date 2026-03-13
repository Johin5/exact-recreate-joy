import { ArrowLeft, ChevronDown, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, XCircle, Eye, MousePointerClick, DollarSign, Users, BarChart3, Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import type { ManagedCampaign } from './CampaignManagement';

/* ── Mock AI Insights ── */

const metaInsights = {
  summary: "This campaign's creative fatigue is increasing. The primary image has been shown 4.2x to the same audience segment. CTR has dropped 23% in the last 7 days while CPM increased 15%.",
  recommendations: [
    { type: 'warning' as const, text: 'Creative fatigue detected — refresh ad creative within 3 days to maintain performance' },
    { type: 'success' as const, text: 'Top performing ad set "Mumbai 25-34 Males" driving 62% of conversions at lowest CPA' },
    { type: 'error' as const, text: 'Ad set "Delhi Females 18-24" has spent ₹340 with 0 conversions — consider pausing' },
    { type: 'info' as const, text: 'Audience overlap of 34% detected between ad sets — consider consolidating' },
  ],
  creativePerformance: [
    { name: 'Image - Summer Sale Hero', ctr: '2.8%', ctrTrend: 'down', impressions: '45,230', spend: '₹412', conversions: 18, thumbnail: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=120&fit=crop' },
    { name: 'Video - Product Walkthrough', ctr: '4.1%', ctrTrend: 'up', impressions: '32,100', spend: '₹298', conversions: 24, thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=120&h=120&fit=crop' },
    { name: 'Carousel - Features', ctr: '1.9%', ctrTrend: 'down', impressions: '28,400', spend: '₹275', conversions: 8, thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=120&h=120&fit=crop' },
  ],
};

const googleInsights = {
  summary: "12 irrelevant search terms detected consuming 18% of budget. Negative keyword list needs updating. Quality Score has improved on 3 keywords but declined on 5.",
  recommendations: [
    { type: 'error' as const, text: '12 irrelevant search terms found — add as negative keywords to save ~₹216/week' },
    { type: 'warning' as const, text: '5 keywords have Quality Score below 4 — review ad relevance and landing page' },
    { type: 'success' as const, text: 'Keyword "car service near me" converting at ₹45/lead — increase bid by 20%' },
    { type: 'info' as const, text: 'Search impression share dropped to 42% — budget increase could capture 2x more leads' },
  ],
  searchTerms: [
    { term: 'free car wash near me', clicks: 34, spend: '₹89', conversions: 0, status: 'irrelevant' as const },
    { term: 'car service center mumbai', clicks: 56, spend: '₹124', conversions: 8, status: 'relevant' as const },
    { term: 'how to wash car at home', clicks: 22, spend: '₹67', conversions: 0, status: 'irrelevant' as const },
    { term: 'mahindra service booking', clicks: 89, spend: '₹198', conversions: 14, status: 'relevant' as const },
    { term: 'car repair cost india', clicks: 18, spend: '₹54', conversions: 0, status: 'irrelevant' as const },
    { term: 'best car service center', clicks: 45, spend: '₹112', conversions: 6, status: 'relevant' as const },
    { term: 'car modification shop', clicks: 12, spend: '₹38', conversions: 0, status: 'irrelevant' as const },
    { term: 'second hand car dealer', clicks: 28, spend: '₹76', conversions: 0, status: 'irrelevant' as const },
  ],
};

const kpiCards = [
  { label: 'Impressions', value: '1,05,630', icon: Eye, trend: '+12%', up: true },
  { label: 'Clicks', value: '3,566', icon: MousePointerClick, trend: '+8%', up: true },
  { label: 'Spend', value: '₹985.52', icon: DollarSign, trend: '-3%', up: false },
  { label: 'Reach', value: '21,789', icon: Users, trend: '+15%', up: true },
  { label: 'CTR', value: '3.37%', icon: BarChart3, trend: '-5%', up: false },
];

function InsightIcon({ type }: { type: string }) {
  switch (type) {
    case 'warning': return <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />;
    case 'success': return <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />;
    case 'error': return <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />;
    default: return <Sparkles className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />;
  }
}

interface CampaignDetailProps {
  campaign: ManagedCampaign;
  onBack: () => void;
}

export default function CampaignDetail({ campaign, onBack }: CampaignDetailProps) {
  const [negativeKeywords, setNegativeKeywords] = useState<string[]>([]);
  const isGoogle = campaign.platform === 'google';
  const insights = isGoogle ? googleInsights : metaInsights;

  const toggleNegative = (term: string) => {
    setNegativeKeywords(prev => prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-sans">
        <span className="cursor-pointer hover:text-foreground" onClick={onBack}>Campaign Management</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
        <span className="text-foreground">{campaign.name}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="hover:bg-muted transition-colors p-1"><ArrowLeft className="w-6 h-6 text-foreground/70" /></button>
          <div className="flex items-center gap-3">
            <img src={campaign.thumbnail} alt="" className="w-12 h-12 object-cover border border-border" referrerPolicy="no-referrer" />
            <div>
              <h1 className="text-xl font-bold text-foreground uppercase tracking-tight font-saira-condensed">{campaign.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground font-sans">{campaign.objective}</span>
                <span className="text-xs text-muted-foreground font-sans">•</span>
                <span className="text-xs text-muted-foreground font-sans">{campaign.platform === 'meta' ? 'Meta Ads' : 'Google Ads'}</span>
                <span className="text-xs text-muted-foreground font-sans">•</span>
                <span className={`text-xs font-medium px-2 py-0.5 ${campaign.delivery === 'Active' ? 'bg-success-muted text-foreground border border-success-border' : campaign.delivery === 'In draft' ? 'bg-warning-muted text-foreground border border-warning-border' : 'bg-muted text-muted-foreground border border-border'}`}>{campaign.delivery}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-brand-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors font-saira-condensed">
          <RefreshCw className="w-4 h-4" /> REFRESH INSIGHTS
        </button>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-5 mb-8 w-[1117px] h-[119px]">
        {kpiCards.map(kpi => (
          <div key={kpi.label} className="bg-card border border-border p-[18px] flex flex-col justify-between w-[171px] h-[119px]">
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">{kpi.label}</span>
              <span className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
                <kpi.icon className="w-4 h-4 text-brand-foreground" />
              </span>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <span className="text-3xl font-bold text-foreground font-sans leading-none">{kpi.value}</span>
              <span className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 ${kpi.up ? 'text-brand bg-brand/10' : 'text-destructive bg-destructive/10'}`}>
                {kpi.trend}
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      <div className="bg-card border border-border mb-8">
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <Sparkles className="w-5 h-5 text-brand" />
          <h2 className="text-base font-bold text-foreground uppercase tracking-wide font-saira-condensed">AI INSIGHTS</h2>
          <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 font-semibold font-saira-condensed uppercase">BETA</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-5">{insights.summary}</p>
          <div className="space-y-3">
            {insights.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-surface border border-border">
                <InsightIcon type={rec.type} />
                <span className="text-sm text-foreground font-sans">{rec.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform-specific section */}
      {isGoogle ? (
        /* Google: Search Terms Review */
        <div className="bg-card border border-border">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wide font-saira-condensed">SEARCH TERMS REVIEW</h2>
            {negativeKeywords.length > 0 && (
              <button className="flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-brand-foreground px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors font-saira-condensed">
                ADD {negativeKeywords.length} AS NEGATIVE KEYWORDS
              </button>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="w-12 px-4 py-3" />
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">SEARCH TERM</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">CLICKS</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">SPEND</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">CONVERSIONS</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">AI VERDICT</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-saira-condensed">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {googleInsights.searchTerms.map((term, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    {term.status === 'irrelevant' && (
                      <input type="checkbox" checked={negativeKeywords.includes(term.term)} onChange={() => toggleNegative(term.term)} className="w-4 h-4 accent-brand-dark" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-sans text-foreground">{term.term}</td>
                  <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{term.clicks}</td>
                  <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{term.spend}</td>
                  <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{term.conversions}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 ${term.status === 'irrelevant' ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-success-muted text-foreground border border-success-border'}`}>
                      {term.status === 'irrelevant' ? 'Irrelevant' : 'Relevant'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {term.status === 'irrelevant' ? (
                      <button onClick={() => toggleNegative(term.term)} className="text-xs text-destructive font-semibold hover:underline font-sans">
                        {negativeKeywords.includes(term.term) ? 'Remove' : 'Add negative'}
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-sans">Keep</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Meta: Creative Performance */
        <div className="bg-card border border-border">
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-bold text-foreground uppercase tracking-wide font-saira-condensed">CREATIVE PERFORMANCE</h2>
          </div>
          <div className="divide-y divide-border">
            {metaInsights.creativePerformance.map((creative, i) => (
              <div key={i} className="flex items-center gap-5 p-5 hover:bg-muted/50 transition-colors">
                <img src={creative.thumbnail} alt="" className="w-16 h-16 object-cover border border-border flex-shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground font-sans">{creative.name}</div>
                  <div className="text-xs text-muted-foreground font-sans mt-1">{creative.impressions} impressions</div>
                </div>
                <div className="text-center px-4">
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-sm font-bold text-foreground font-sans">{creative.ctr}</span>
                    {creative.ctrTrend === 'up' ? <TrendingUp className="w-3 h-3 text-brand" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-sans">CTR</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-sm font-bold text-foreground font-sans">{creative.spend}</div>
                  <div className="text-[10px] text-muted-foreground font-sans">Spend</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-sm font-bold text-foreground font-sans">{creative.conversions}</div>
                  <div className="text-[10px] text-muted-foreground font-sans">Conversions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

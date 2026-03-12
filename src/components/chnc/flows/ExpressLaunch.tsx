import { useState } from 'react';
import {
  ChevronDown, ChevronUp, ArrowLeft, Rocket, Check, CheckCircle2,
  Zap, Target, Users, DollarSign, Calendar, MapPin, Image as ImageIcon,
  Sparkles, Eye, AlertTriangle, X, Plus, Globe, Megaphone, MousePointer,
  ShoppingBag, Smartphone
} from 'lucide-react';

export interface TemplateConfig {
  id: string;
  title: string;
  platform: string;
  objective: string;
  budget: string;
  budgetType: string;
  duration: string;
  locations: string[];
  ageRange: string;
  gender: string;
  interests: string[];
  placements: string[];
  bidStrategy: string;
}

const defaultTemplates: Record<string, TemplateConfig> = {
  'meta-awareness': {
    id: 'meta-awareness', title: 'Meta Awareness Campaign', platform: 'meta', objective: 'awareness',
    budget: '3000', budgetType: 'daily', duration: '14', locations: ['Mumbai', 'Delhi', 'Bangalore'],
    ageRange: '18-65', gender: 'All', interests: ['Brand Awareness', 'Social Media'],
    placements: ['Facebook Feed', 'Instagram Feed', 'Instagram Stories', 'Reels'], bidStrategy: 'Lowest cost',
  },
  'google-search': {
    id: 'google-search', title: 'Google Search Campaign', platform: 'google', objective: 'traffic',
    budget: '5000', budgetType: 'daily', duration: '30', locations: ['India'],
    ageRange: '25-55', gender: 'All', interests: ['Search', 'Keywords'],
    placements: ['Search Network', 'Display Network'], bidStrategy: 'Maximize clicks',
  },
  'meta-lead-gen': {
    id: 'meta-lead-gen', title: 'Meta Lead Generation', platform: 'meta', objective: 'leads',
    budget: '2000', budgetType: 'daily', duration: '21', locations: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
    ageRange: '25-55', gender: 'All', interests: ['Automobiles', 'SUV', 'Test Drive', 'Luxury Cars'],
    placements: ['Facebook Feed', 'Instagram Feed', 'Messenger'], bidStrategy: 'Lowest cost per lead',
  },
  'cross-channel-retargeting': {
    id: 'cross-channel-retargeting', title: 'Cross-Channel Retargeting', platform: 'meta', objective: 'sales',
    budget: '4000', budgetType: 'daily', duration: '14', locations: ['Mumbai', 'Delhi'],
    ageRange: '25-45', gender: 'All', interests: ['Retargeting', 'Website Visitors'],
    placements: ['Facebook Feed', 'Instagram Feed', 'Audience Network'], bidStrategy: 'Highest value',
  },
  'ecommerce-shopping': {
    id: 'ecommerce-shopping', title: 'E-commerce Shopping Ads', platform: 'google', objective: 'sales',
    budget: '8000', budgetType: 'daily', duration: '30', locations: ['India'],
    ageRange: '18-55', gender: 'All', interests: ['Shopping', 'E-commerce'],
    placements: ['Google Shopping', 'Search Network'], bidStrategy: 'Target ROAS',
  },
  'multi-platform-launch': {
    id: 'multi-platform-launch', title: 'Multi-Platform Launch', platform: 'meta', objective: 'awareness',
    budget: '10000', budgetType: 'lifetime', duration: '30', locations: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
    ageRange: '18-65', gender: 'All', interests: ['Brand Launch', 'Multi-channel'],
    placements: ['Facebook Feed', 'Instagram Feed', 'YouTube', 'Search Network'], bidStrategy: 'Lowest cost',
  },
  'video-campaign': {
    id: 'video-campaign', title: 'Video View Campaign', platform: 'meta', objective: 'awareness',
    budget: '5000', budgetType: 'daily', duration: '14', locations: ['Mumbai', 'Delhi', 'Bangalore'],
    ageRange: '18-45', gender: 'All', interests: ['Video', 'Entertainment'],
    placements: ['Instagram Reels', 'Facebook Video', 'YouTube'], bidStrategy: 'Lowest cost per view',
  },
  'app-install': {
    id: 'app-install', title: 'App Install Campaign', platform: 'meta', objective: 'app_promotion',
    budget: '6000', budgetType: 'daily', duration: '21', locations: ['India'],
    ageRange: '18-35', gender: 'All', interests: ['Mobile Apps', 'Technology'],
    placements: ['Facebook Feed', 'Instagram Feed', 'Audience Network'], bidStrategy: 'Lowest cost per install',
  },
};

const approvedAssets = [
  { id: '1', name: 'Kolkata MS-Motors', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=300&fit=crop', type: 'Image' },
  { id: '2', name: 'Campaign - Awareness', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=300&fit=crop', type: 'Video' },
  { id: '3', name: 'Campaign - Traffic', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=300&h=300&fit=crop', type: 'Image' },
  { id: '4', name: 'Campaign - Leads', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop', type: 'Image' },
];

const objectiveIcons: Record<string, React.ReactNode> = {
  awareness: <Megaphone className="w-4 h-4" />,
  traffic: <MousePointer className="w-4 h-4" />,
  leads: <Users className="w-4 h-4" />,
  sales: <ShoppingBag className="w-4 h-4" />,
  app_promotion: <Smartphone className="w-4 h-4" />,
  engagement: <Target className="w-4 h-4" />,
};

interface ExpressLaunchProps {
  templateId: string;
  onBack: () => void;
}

export default function ExpressLaunch({ templateId, onBack }: ExpressLaunchProps) {
  const template = defaultTemplates[templateId] || defaultTemplates['meta-awareness'];

  const [campaignName, setCampaignName] = useState(`${template.title} — ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`);
  const [budget, setBudget] = useState(template.budget);
  const [budgetType, setBudgetType] = useState(template.budgetType);
  const [duration, setDuration] = useState(template.duration);
  const [locations, setLocations] = useState(template.locations);
  const [ageRange, setAgeRange] = useState(template.ageRange);
  const [gender, setGender] = useState(template.gender);
  const [interests, setInterests] = useState(template.interests);
  const [bidStrategy, setBidStrategy] = useState(template.bidStrategy);
  const [selectedAssets, setSelectedAssets] = useState<string[]>(['1', '2']);
  const [placements, setPlacements] = useState(template.placements);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    assets: true, budget: true, targeting: false, placements: false,
  });

  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  const toggleSection = (key: string) =>
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleAsset = (id: string) =>
    setSelectedAssets(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const removeTag = (list: string[], setter: (v: string[]) => void, item: string) =>
    setter(list.filter(i => i !== item));

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => { setLaunching(false); setLaunched(true); }, 1500);
  };

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + parseInt(duration));

  const filledCount = [
    campaignName, budget, selectedAssets.length > 0, locations.length > 0, ageRange,
  ].filter(Boolean).length;
  const totalFields = 5;
  const readiness = Math.round((filledCount / totalFields) * 100);

  if (launched) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-10 h-10 text-brand-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground font-saira-condensed uppercase mb-2">CAMPAIGN SUBMITTED</h2>
          <p className="text-sm text-muted-foreground font-sans mb-6">Your express campaign is queued for approval. You'll be notified once it goes live.</p>
          <div className="bg-surface border border-border p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Campaign</span><span className="text-foreground font-medium">{campaignName}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Budget</span><span className="text-foreground font-medium">₹{budget}/{budgetType === 'daily' ? 'day' : 'total'}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Duration</span><span className="text-foreground font-medium">{duration} days</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Assets</span><span className="text-foreground font-medium">{selectedAssets.length} creatives</span></div>
          </div>
          <button onClick={onBack} className="bg-brand-dark text-brand-foreground px-8 py-3 text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-brand-dark-hover transition-colors">
            BACK TO TEMPLATES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium font-sans">
        <span>Amplifyit</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
        <span>Templates</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
        <span className="text-foreground">Express Launch</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="hover:bg-muted transition-colors p-1"><ArrowLeft className="w-6 h-6 text-foreground/70" /></button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground uppercase tracking-tight font-saira-condensed">EXPRESS LAUNCH</h1>
              <span className="text-[10px] bg-warning-muted text-foreground px-2 py-0.5 font-bold border border-warning-border flex items-center gap-1 font-saira-condensed"><Zap className="w-3 h-3" /> FAST TRACK</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-sans">Pre-filled from template — review, tweak, and launch in under 2 minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground font-saira-condensed uppercase block">Readiness</span>
            <span className="text-lg font-bold text-foreground">{readiness}%</span>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-brand transition-all rounded-full" style={{ width: `${readiness}%` }} />
          </div>
        </div>
      </div>

      {/* Smart defaults banner */}
      <div className="bg-success-muted border border-success-border p-4 flex items-start gap-3 mb-8">
        <Sparkles className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-0.5">Smart defaults applied from "{template.title}"</h4>
          <p className="text-xs text-muted-foreground font-sans">Budget, targeting, placements, and bid strategy are pre-configured. Expand any section to customize.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form — 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          {/* Campaign name + objective */}
          <div className="bg-card border border-border p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Campaign name</label>
                <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Objective</label>
                <div className="flex items-center gap-2 bg-surface border border-border p-2.5 text-sm">
                  <div className="w-6 h-6 bg-brand-dark text-brand-foreground flex items-center justify-center">
                    {objectiveIcons[template.objective] || <Target className="w-3 h-3" />}
                  </div>
                  <span className="text-foreground font-medium capitalize">{template.objective.replace('_', ' ')}</span>
                  <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 ml-auto font-saira-condensed">FROM TEMPLATE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assets — collapsible */}
          <CollapsibleSection title="CREATIVES" icon={<ImageIcon className="w-4 h-4" />} expanded={expandedSections.assets} onToggle={() => toggleSection('assets')} badge={`${selectedAssets.length} selected`}>
            <div className="grid grid-cols-4 gap-3">
              {approvedAssets.map(asset => {
                const selected = selectedAssets.includes(asset.id);
                return (
                  <div key={asset.id} onClick={() => toggleAsset(asset.id)} className={`border cursor-pointer transition-all overflow-hidden ${selected ? 'border-2 border-brand' : 'border-border hover:border-muted-foreground/40'}`}>
                    <div className="relative">
                      <img src={asset.image} alt={asset.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                      {selected && <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-brand flex items-center justify-center"><Check className="w-3 h-3 text-brand-foreground" /></div>}
                    </div>
                    <div className="p-2">
                      <h4 className="text-[10px] font-medium text-foreground truncate">{asset.name}</h4>
                      <span className="text-[9px] text-muted-foreground">{asset.type}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>

          {/* Budget & Schedule — collapsible */}
          <CollapsibleSection title="BUDGET & SCHEDULE" icon={<DollarSign className="w-4 h-4" />} expanded={expandedSections.budget} onToggle={() => toggleSection('budget')} badge={`₹${budget}/${budgetType === 'daily' ? 'day' : 'total'} · ${duration} days`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Budget type</label>
                <select value={budgetType} onChange={(e) => setBudgetType(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans">
                  <option value="daily">Daily budget</option>
                  <option value="lifetime">Lifetime budget</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Amount (₹)</label>
                <input type="text" value={budget} onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Duration (days)</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground font-sans">
              <Calendar className="w-3.5 h-3.5" />
              <span>{startDate.toLocaleDateString('en-GB')} — {endDate.toLocaleDateString('en-GB')}</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 ml-1">auto-calculated</span>
            </div>
          </CollapsibleSection>

          {/* Targeting — collapsible */}
          <CollapsibleSection title="TARGETING" icon={<Target className="w-4 h-4" />} expanded={expandedSections.targeting} onToggle={() => toggleSection('targeting')} badge={`${locations.length} locations · ${ageRange} · ${interests.length} interests`}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Locations</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <span key={loc} className="flex items-center gap-1.5 bg-surface border border-border px-2.5 py-1 text-xs text-foreground font-sans">
                      <MapPin className="w-3 h-3 text-muted-foreground" />{loc}
                      <button onClick={() => removeTag(locations, setLocations, loc)} className="hover:text-foreground text-muted-foreground"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <button className="flex items-center gap-1 px-2.5 py-1 border border-dashed border-border text-xs text-muted-foreground hover:bg-muted font-sans"><Plus className="w-3 h-3" /> Add</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Age range</label>
                  <input type="text" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans">
                    <option>All</option><option>Male</option><option>Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map(int => (
                    <span key={int} className="flex items-center gap-1.5 bg-info-muted border border-info-border px-2.5 py-1 text-xs text-info font-sans">
                      {int}
                      <button onClick={() => removeTag(interests, setInterests, int)} className="hover:text-foreground text-info"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <button className="flex items-center gap-1 px-2.5 py-1 border border-dashed border-border text-xs text-muted-foreground hover:bg-muted font-sans"><Plus className="w-3 h-3" /> Add</button>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Placements — collapsible */}
          <CollapsibleSection title="PLACEMENTS & BID" icon={<Globe className="w-4 h-4" />} expanded={expandedSections.placements} onToggle={() => toggleSection('placements')} badge={`${placements.length} placements · ${bidStrategy}`}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Active placements</label>
                <div className="flex flex-wrap gap-2">
                  {placements.map(p => (
                    <span key={p} className="flex items-center gap-1.5 bg-surface border border-border px-2.5 py-1 text-xs text-foreground font-sans">
                      {p}
                      <button onClick={() => removeTag(placements, setPlacements, p)} className="hover:text-foreground text-muted-foreground"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Bid strategy</label>
                <input type="text" value={bidStrategy} onChange={(e) => setBidStrategy(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Sidebar summary — 1 col */}
        <div className="space-y-4">
          <div className="bg-card border border-border p-5 shadow-sm sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-wide text-foreground font-saira-condensed mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" /> LAUNCH SUMMARY
            </h3>
            <div className="space-y-3 text-sm font-sans">
              <SummaryRow label="Platform" value={template.platform === 'meta' ? 'Meta' : 'Google'} />
              <SummaryRow label="Objective" value={template.objective.replace('_', ' ')} />
              <SummaryRow label="Budget" value={`₹${budget}/${budgetType === 'daily' ? 'day' : 'total'}`} />
              <SummaryRow label="Duration" value={`${duration} days`} />
              <SummaryRow label="Locations" value={locations.join(', ')} />
              <SummaryRow label="Audience" value={`${ageRange}, ${gender}`} />
              <SummaryRow label="Creatives" value={`${selectedAssets.length} assets`} />
              <SummaryRow label="Bid" value={bidStrategy} />
            </div>

            <div className="border-t border-border mt-5 pt-5">
              <div className="bg-warning-muted border border-warning-border p-3 flex items-start gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-foreground font-sans">Campaign will be submitted for human approval before going live.</p>
              </div>
              <button
                onClick={handleLaunch}
                disabled={launching || selectedAssets.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wide font-saira-condensed transition-colors ${
                  launching ? 'bg-muted text-muted-foreground cursor-wait' :
                  selectedAssets.length === 0 ? 'bg-muted text-muted-foreground cursor-not-allowed' :
                  'bg-brand hover:bg-brand-hover text-brand-foreground'
                }`}
              >
                {launching ? (
                  <><span className="animate-spin w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full" /> SUBMITTING...</>
                ) : (
                  <><Rocket className="w-4 h-4" /> SUBMIT FOR APPROVAL</>
                )}
              </button>
            </div>
          </div>

          {/* Time saved indicator */}
          <div className="bg-brand-dark text-brand-foreground p-4 text-center">
            <Zap className="w-5 h-5 mx-auto mb-2" />
            <span className="text-xs font-bold uppercase tracking-wide font-saira-condensed block">TIME SAVED</span>
            <span className="text-2xl font-bold">~12 min</span>
            <p className="text-[10px] opacity-70 mt-1">vs. manual 4-step wizard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, expanded, onToggle, badge, children }: {
  title: string; icon: React.ReactNode; expanded: boolean; onToggle: () => void; badge: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{icon}</div>
          <span className="text-xs font-bold uppercase tracking-wide font-saira-condensed text-foreground">{title}</span>
          {!expanded && <span className="text-[10px] text-muted-foreground font-sans ml-2">{badge}</span>}
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand" />
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>
      {expanded && <div className="px-5 pb-5 border-t border-border pt-4">{children}</div>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right capitalize max-w-[60%] truncate">{value}</span>
    </div>
  );
}

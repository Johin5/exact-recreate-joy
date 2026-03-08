import { useState, useEffect } from 'react';
import {
  Check, ArrowRight, Rocket, ChevronDown, ArrowLeft, 
  Target, Users, ShoppingBag, Smartphone, Megaphone, MousePointer,
  MapPin, X, Plus, Info, CheckCircle2, AlertTriangle, Eye,
  Calendar, DollarSign, Globe, Image, FileText, Sparkles
} from 'lucide-react';

// Mock CREATEIT approved assets
const approvedAssets = [
  { id: '1', name: 'Kolkata MS-Motors', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Discover the All-New XUV700', primaryText: 'Experience power, luxury, and cutting-edge technology.', cta: 'Learn More' },
  { id: '2', name: 'Campaign - Awareness', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Video', headline: 'Born Electric — The Future is Here', primaryText: 'Mahindra Born Electric range. Pre-book now.', cta: 'Sign Up' },
  { id: '3', name: 'Campaign - Traffic', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Thar — Built for Adventure', primaryText: 'Go anywhere. Do anything. The all-new Thar awaits.', cta: 'Book Now' },
  { id: '4', name: 'Campaign - Leads', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Scorpio N — Dominate Every Road', primaryText: 'Get a free test drive at your nearest showroom.', cta: 'Get Quote' },
];

const platforms = [
  { id: 'meta', label: 'Meta', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 14.5c-1.3 0-2.48-.56-3.43-1.46-.95.9-2.13 1.46-3.43 1.46-2.54 0-4.5-2.07-4.5-4.5s1.96-4.5 4.5-4.5c1.3 0 2.48.56 3.43 1.46.95-.9 2.13-1.46 3.43-1.46 2.54 0 4.5 2.07 4.5 4.5s-1.96 4.5-4.5 4.5z"/></svg>
  )},
  { id: 'google', label: 'Google', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
  )},
  { id: 'tiktok', label: 'TikTok', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.28 8.28 0 004.76 1.5V7.12a4.83 4.83 0 01-1-.43z"/></svg>
  )},
];

const objectives = [
  { id: 'awareness', label: 'Awareness', desc: 'Maximize reach & impressions', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'traffic', label: 'Traffic', desc: 'Drive website visits', icon: <MousePointer className="w-5 h-5" /> },
  { id: 'leads', label: 'Leads', desc: 'Collect lead information', icon: <Users className="w-5 h-5" /> },
  { id: 'sales', label: 'Sales', desc: 'Drive conversions & purchases', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'app_promotion', label: 'App Promotion', desc: 'Drive app installs', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'engagement', label: 'Engagement', desc: 'Likes, comments, shares', icon: <Target className="w-5 h-5" /> },
];

type Phase = 'select' | 'configure' | 'review';

interface QuickLaunchProps {
  campaign?: {
    id: string;
    name: string;
    platform: 'meta' | 'google';
    thumbnail: string;
    approvedDate: string;
    scheduledOn: string;
  } | null;
}

export default function QuickLaunch({ campaign }: QuickLaunchProps) {
  const deriveObjective = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('lead')) return 'leads';
    if (lower.includes('awareness')) return 'awareness';
    if (lower.includes('traffic')) return 'traffic';
    if (lower.includes('sales')) return 'sales';
    if (lower.includes('app')) return 'app_promotion';
    return '';
  };

  const initialAsset = campaign ? approvedAssets.find(a => a.name === campaign.name)?.id : undefined;
  const initialPlatform = campaign?.platform || '';
  const initialObjective = campaign ? deriveObjective(campaign.name) : '';

  const [phase, setPhase] = useState<Phase>('select');
  const [selectedAssets, setSelectedAssets] = useState<string[]>(initialAsset ? [initialAsset] : []);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedObjective, setSelectedObjective] = useState(initialObjective);

  const [budget, setBudget] = useState('500');
  const [budgetType, setBudgetType] = useState('daily');
  const [startDate, setStartDate] = useState(campaign?.scheduledOn?.split(' - ')[0]?.split('/').reverse().join('-') || '2025-03-15');
  const [endDate, setEndDate] = useState(campaign?.scheduledOn?.split(' - ')[1]?.split('/').reverse().join('-') || '2025-04-15');
  const [locations, setLocations] = useState(['Mumbai', 'Delhi', 'Bangalore', 'Chennai']);
  const [ageRange, setAgeRange] = useState('25-55');
  const [gender, setGender] = useState('All');
  const [interests, setInterests] = useState(['Automobiles', 'SUV', 'Test Drive', 'Luxury Cars']);

  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  const toggleAsset = (id: string) => {
    setSelectedAssets(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const removeTag = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.filter(i => i !== item));
  };

  const canProceedToConfig = selectedAssets.length > 0 && selectedPlatform && selectedObjective;
  const selectedAssetsData = approvedAssets.filter(a => selectedAssets.includes(a.id));
  const platformData = platforms.find(p => p.id === selectedPlatform);
  const objectiveData = objectives.find(o => o.id === selectedObjective);

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => { setLaunching(false); setLaunched(true); }, 2000);
  };

  if (launched) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-brand-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground font-saira-condensed uppercase mb-2">CAMPAIGN SUBMITTED</h2>
          <p className="text-sm text-muted-foreground font-sans mb-6">
            Your campaign has been submitted for approval. You'll be notified once it's reviewed and published.
          </p>
          <div className="bg-surface border border-border p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-saira-condensed">Platform</span>
              <span className="text-sm text-foreground">{platformData?.label}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-saira-condensed">Objective</span>
              <span className="text-sm text-foreground">{objectiveData?.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-saira-condensed">Assets</span>
              <span className="text-sm text-foreground">{selectedAssets.length} creatives</span>
            </div>
          </div>
          <button
            onClick={() => { setLaunched(false); setPhase('select'); setSelectedAssets([]); setSelectedPlatform(''); setSelectedObjective(''); }}
            className="bg-brand-dark text-brand-foreground px-8 py-3 text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-brand-dark-hover transition-colors"
          >
            LAUNCH ANOTHER CAMPAIGN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium font-sans">
        <span>Amplifyit</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
        <span className="text-foreground">Quick Launch</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground uppercase tracking-tight font-saira-condensed">QUICK LAUNCH</h1>
          <p className="text-sm text-muted-foreground font-sans">Select assets → Choose platform & objective → Review & launch</p>
        </div>
        <div className="flex items-center gap-2">
          {(['select', 'configure', 'review'] as Phase[]).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                phase === p ? 'bg-brand-dark text-brand-foreground' :
                (['select', 'configure', 'review'].indexOf(phase) > i) ? 'bg-brand text-brand-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {(['select', 'configure', 'review'].indexOf(phase) > i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 2 && <div className="w-8 h-px bg-border" />}
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 1: Select */}
      {phase === 'select' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground font-saira-condensed mb-1">SELECT APPROVED ASSETS</h2>
            <p className="text-xs text-muted-foreground font-sans mb-4">These assets were approved in CREATEIT and are ready to launch.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {approvedAssets.map((asset) => {
                const selected = selectedAssets.includes(asset.id);
                return (
                  <div
                    key={asset.id}
                    onClick={() => toggleAsset(asset.id)}
                    className={`border cursor-pointer transition-all overflow-hidden ${
                      selected ? 'border-2 border-brand shadow-md' : 'border-border hover:border-muted-foreground/40'
                    }`}
                  >
                    <div className="relative">
                      <img src={asset.image} alt={asset.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-brand flex items-center justify-center">
                          <Check className="w-4 h-4 text-brand-foreground" />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-2 bg-brand-dark/70 text-brand-foreground text-[10px] px-2 py-0.5 font-medium">{asset.type}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-foreground font-sans truncate">{asset.name}</h4>
                      <p className="text-[10px] text-muted-foreground">Approved {asset.approvedDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground font-saira-condensed mb-1">CHOOSE PLATFORM</h2>
            <p className="text-xs text-muted-foreground font-sans mb-4">Where do you want to publish?</p>
            <div className="flex gap-4">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`w-[120px] h-[100px] border flex flex-col items-center justify-center cursor-pointer transition-all relative ${
                    selectedPlatform === p.id ? 'border-2 border-foreground shadow-sm bg-card' : 'border-border hover:border-muted-foreground/40 hover:bg-muted'
                  }`}
                >
                  {selectedPlatform === p.id && (
                    <div className="absolute top-0 left-0"><div className="w-5 h-5 bg-foreground flex items-center justify-center"><Check className="w-3 h-3 text-background" /></div></div>
                  )}
                  <div className="mb-2">{p.icon}</div>
                  <span className={`text-xs font-bold ${selectedPlatform === p.id ? 'text-foreground' : 'text-muted-foreground'}`}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground font-saira-condensed mb-1">SELECT OBJECTIVE</h2>
            <p className="text-xs text-muted-foreground font-sans mb-4">What's the goal of this campaign?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj.id)}
                  className={`border p-4 cursor-pointer transition-all text-center ${
                    selectedObjective === obj.id ? 'border-2 border-foreground shadow-sm bg-card' : 'border-border hover:border-muted-foreground/40 hover:bg-muted'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 flex items-center justify-center ${selectedObjective === obj.id ? 'bg-brand-dark text-brand-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {obj.icon}
                  </div>
                  <h4 className={`text-xs font-bold mb-0.5 ${selectedObjective === obj.id ? 'text-foreground' : 'text-muted-foreground'}`}>{obj.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setPhase('configure')}
              disabled={!canProceedToConfig}
              className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-wide font-saira-condensed transition-colors ${
                canProceedToConfig ? 'bg-brand-dark text-brand-foreground hover:bg-brand-dark-hover' : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              CONTINUE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: Configure */}
      {phase === 'configure' && (
        <div className="space-y-6">
          <button onClick={() => setPhase('select')} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground font-saira-condensed uppercase mb-2">
            <ArrowLeft className="w-4 h-4" /> BACK
          </button>

          <div className="bg-success-muted border border-success-border p-4 flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0" />
            <span className="text-sm font-sans">
              <strong>{selectedAssets.length} assets</strong> selected · Publishing to <strong>{platformData?.label}</strong> · Objective: <strong>{objectiveData?.label}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget & Schedule */}
            <div className="bg-card border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold uppercase font-saira-condensed">BUDGET & SCHEDULE</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Budget type</label>
                  <select value={budgetType} onChange={(e) => setBudgetType(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans">
                    <option value="daily">Daily budget</option>
                    <option value="lifetime">Lifetime budget</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Amount</label>
                  <input type="text" value={`₹ ${budget}`} onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Start date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">End date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans" />
                </div>
              </div>
            </div>

            {/* Audience */}
            <div className="bg-card border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-bold uppercase font-saira-condensed">AUDIENCE</h3>
                <span className="text-[10px] bg-success-muted text-brand px-2 py-0.5 font-bold border border-success-border flex items-center gap-1"><Sparkles className="w-3 h-3" /> Auto-filled</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Age range</label>
                  <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans">
                    <option value="18-65">18 - 65+</option>
                    <option value="18-35">18 - 35</option>
                    <option value="25-45">25 - 45</option>
                    <option value="25-55">25 - 55</option>
                    <option value="35-65">35 - 65+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm p-2.5 focus:ring-1 focus:ring-foreground font-sans">
                    <option value="All">All genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Locations</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {locations.map((loc) => (
                    <span key={loc} className="inline-flex items-center gap-1 bg-muted text-foreground/70 text-xs px-2.5 py-1 font-medium">
                      <MapPin className="w-3 h-3" />{loc}
                      <button onClick={() => removeTag(locations, setLocations, loc)}><X className="w-3 h-3 text-muted-foreground hover:text-destructive" /></button>
                    </span>
                  ))}
                  <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase font-saira-condensed"><Plus className="w-3 h-3 inline" /> Add</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 font-sans">Interests</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {interests.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 bg-info-muted text-info text-xs px-2.5 py-1 font-medium border border-info-border">
                      {item}
                      <button onClick={() => removeTag(interests, setInterests, item)}><X className="w-3 h-3 opacity-60 hover:opacity-100" /></button>
                    </span>
                  ))}
                  <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground uppercase font-saira-condensed"><Plus className="w-3 h-3 inline" /> Add</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setPhase('review')}
              className="flex items-center gap-2 px-8 py-3 bg-brand-dark text-brand-foreground text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-brand-dark-hover transition-colors"
            >
              REVIEW & LAUNCH <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: Review & Launch */}
      {phase === 'review' && (
        <div className="space-y-6">
          <button onClick={() => setPhase('configure')} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground font-saira-condensed uppercase mb-2">
            <ArrowLeft className="w-4 h-4" /> BACK
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">CAMPAIGN SUMMARY</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Platform', content: platformData?.label },
                    { label: 'Objective', content: objectiveData?.label },
                    { label: 'Budget', content: `₹ ${budget}/${budgetType === 'daily' ? 'day' : 'total'}` },
                    { label: 'Schedule', content: startDate },
                  ].map((item) => (
                    <div key={item.label} className="bg-surface p-3 border border-border">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1 font-saira-condensed">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground">{item.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">AUDIENCE</h3>
                <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground font-sans">
                  <span>Age: <strong className="text-foreground">{ageRange}</strong></span>
                  <span>•</span>
                  <span>Gender: <strong className="text-foreground">{gender}</strong></span>
                  <span>•</span>
                  <span>Locations: <strong className="text-foreground">{locations.join(', ')}</strong></span>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {interests.map((i) => (
                    <span key={i} className="text-[10px] bg-info-muted text-info px-2 py-0.5 border border-info-border font-medium">{i}</span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">CREATIVES ({selectedAssetsData.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedAssetsData.map((a) => (
                    <div key={a.id} className="border border-border overflow-hidden">
                      <img src={a.image} alt={a.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                      <div className="p-2">
                        <p className="text-xs font-semibold text-foreground truncate">{a.headline}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{a.primaryText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">PRE-LAUNCH CHECKLIST</h3>
                <div className="space-y-2">
                  {['Assets approved in CREATEIT', 'Platform account connected', 'Budget within allocation', 'Target audience configured', 'Schedule set'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand" />
                      <span className="text-sm text-foreground/70 font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-brand-dark p-6 text-brand-foreground sticky top-20">
                <Rocket className="w-8 h-8 mb-4 text-brand" />
                <h3 className="text-lg font-bold uppercase font-saira-condensed mb-2">READY TO LAUNCH</h3>
                <p className="text-xs text-brand-foreground/50 font-sans leading-relaxed mb-6">
                  Your campaign will be submitted for approval. Nothing goes live without explicit sign-off.
                </p>

                <div className="space-y-3 mb-6 text-xs">
                  {[
                    { label: 'Platform', value: platformData?.label },
                    { label: 'Objective', value: objectiveData?.label },
                    { label: 'Budget', value: `₹ ${budget}/${budgetType === 'daily' ? 'day' : 'total'}` },
                    { label: 'Creatives', value: String(selectedAssets.length) },
                    { label: 'Duration', value: `${startDate} → ${endDate}` },
                  ].map((item, i, arr) => (
                    <div key={item.label} className={`flex justify-between ${i < arr.length - 1 ? 'border-b border-brand-foreground/10 pb-2' : ''}`}>
                      <span className="text-brand-foreground/50">{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-warning/10 border border-warning/30 p-3 flex items-start gap-2 mb-6">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-warning leading-relaxed">Human-in-the-loop: Campaign requires approval before going live.</p>
                </div>

                <button
                  onClick={handleLaunch}
                  disabled={launching}
                  className="w-full py-4 bg-brand hover:bg-brand-hover text-brand-foreground text-sm font-bold uppercase tracking-wide transition-colors font-saira-condensed flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {launching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-foreground/30 border-t-brand-foreground rounded-full animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" /> SUBMIT FOR APPROVAL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
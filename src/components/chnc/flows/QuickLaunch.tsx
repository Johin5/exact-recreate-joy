import { useState } from 'react';
import { 
  Check, ArrowRight, Rocket, ChevronDown, ArrowLeft, 
  Target, Users, ShoppingBag, Smartphone, Megaphone, MousePointer,
  MapPin, X, Plus, Info, CheckCircle2, AlertTriangle, Eye,
  Calendar, DollarSign, Globe, Image, FileText
} from 'lucide-react';

// Mock CREATEIT approved assets
const approvedAssets = [
  { id: '1', name: 'Kolkata MS-Motors', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Discover the All-New XUV700', primaryText: 'Experience power, luxury, and cutting-edge technology.', cta: 'Learn More' },
  { id: '2', name: 'Campaign - Awareness', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Video', headline: 'Born Electric — The Future is Here', primaryText: 'Mahindra Born Electric range. Pre-book now.', cta: 'Sign Up' },
  { id: '3', name: 'Campaign - Traffic', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0571?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Thar — Built for Adventure', primaryText: 'Go anywhere. Do anything. The all-new Thar awaits.', cta: 'Book Now' },
  { id: '4', name: 'Campaign - Leads', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop', approvedDate: '30/07/2024', type: 'Image', headline: 'Scorpio N — Dominate Every Road', primaryText: 'Get a free test drive at your nearest showroom.', cta: 'Get Quote' },
];

const platforms = [
  { id: 'meta', label: 'Meta', color: '#0064E0', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 14.5c-1.3 0-2.48-.56-3.43-1.46-.95.9-2.13 1.46-3.43 1.46-2.54 0-4.5-2.07-4.5-4.5s1.96-4.5 4.5-4.5c1.3 0 2.48.56 3.43 1.46.95-.9 2.13-1.46 3.43-1.46 2.54 0 4.5 2.07 4.5 4.5s-1.96 4.5-4.5 4.5z"/></svg>
  )},
  { id: 'google', label: 'Google', color: '#4285F4', icon: (
    <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
  )},
  { id: 'tiktok', label: 'TikTok', color: '#000000', icon: (
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

export default function QuickLaunch() {
  // Phase
  const [phase, setPhase] = useState<Phase>('select');
  
  // Selections
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedObjective, setSelectedObjective] = useState('');
  
  // Auto-filled config (editable)
  const [budget, setBudget] = useState('500');
  const [budgetType, setBudgetType] = useState('daily');
  const [startDate, setStartDate] = useState('2025-03-15');
  const [endDate, setEndDate] = useState('2025-04-15');
  const [locations, setLocations] = useState(['Mumbai', 'Delhi', 'Bangalore', 'Chennai']);
  const [ageRange, setAgeRange] = useState('25-55');
  const [gender, setGender] = useState('All');
  const [interests, setInterests] = useState(['Automobiles', 'SUV', 'Test Drive', 'Luxury Cars']);
  
  // Review
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
    setTimeout(() => {
      setLaunching(false);
      setLaunched(true);
    }, 2000);
  };

  if (launched) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#34CC32] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-saira-condensed uppercase mb-2">CAMPAIGN SUBMITTED</h2>
          <p className="text-sm text-gray-500 font-sans mb-6">
            Your campaign has been submitted for approval. You'll be notified once it's reviewed and published.
          </p>
          <div className="bg-gray-50 border border-gray-200 p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase font-saira-condensed">Platform</span>
              <span className="text-sm text-gray-900">{platformData?.label}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase font-saira-condensed">Objective</span>
              <span className="text-sm text-gray-900">{objectiveData?.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase font-saira-condensed">Assets</span>
              <span className="text-sm text-gray-900">{selectedAssets.length} creatives</span>
            </div>
          </div>
          <button
            onClick={() => { setLaunched(false); setPhase('select'); setSelectedAssets([]); setSelectedPlatform(''); setSelectedObjective(''); }}
            className="bg-[#050B14] text-white px-8 py-3 text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-black transition-colors"
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
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium font-sans">
        <span>Amplifyit</span>
        <ChevronDown className="w-3 h-3 -rotate-90 text-gray-400" />
        <span className="text-gray-900">Quick Launch</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 uppercase tracking-tight font-saira-condensed">QUICK LAUNCH</h1>
          <p className="text-sm text-gray-400 font-sans">Select assets → Choose platform & objective → Review & launch</p>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-2">
          {(['select', 'configure', 'review'] as Phase[]).map((p, i) => (
            <div key={p} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors ${
                phase === p ? 'bg-[#050B14] text-white' :
                (['select', 'configure', 'review'].indexOf(phase) > i) ? 'bg-[#34CC32] text-white' :
                'bg-gray-200 text-gray-400'
              }`}>
                {(['select', 'configure', 'review'].indexOf(phase) > i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 2 && <div className="w-8 h-px bg-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 1: Select */}
      {phase === 'select' && (
        <div className="space-y-8">
          {/* Assets from CREATEIT */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 font-saira-condensed mb-1">SELECT APPROVED ASSETS</h2>
            <p className="text-xs text-gray-400 font-sans mb-4">These assets were approved in CREATEIT and are ready to launch.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {approvedAssets.map((asset) => {
                const selected = selectedAssets.includes(asset.id);
                return (
                  <div
                    key={asset.id}
                    onClick={() => toggleAsset(asset.id)}
                    className={`border cursor-pointer transition-all overflow-hidden ${
                      selected ? 'border-2 border-[#34CC32] shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="relative">
                      <img src={asset.image} alt={asset.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-[#34CC32] flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 font-medium">{asset.type}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-gray-900 font-sans truncate">{asset.name}</h4>
                      <p className="text-[10px] text-gray-400">Approved {asset.approvedDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 font-saira-condensed mb-1">CHOOSE PLATFORM</h2>
            <p className="text-xs text-gray-400 font-sans mb-4">Where do you want to publish?</p>
            <div className="flex gap-4">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className={`w-[120px] h-[100px] border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    selectedPlatform === p.id ? 'border-2 border-black shadow-sm bg-white' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {selectedPlatform === p.id && (
                    <div className="absolute top-0 left-0"><div className="w-5 h-5 bg-black flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div></div>
                  )}
                  <div className="mb-2" style={{ color: p.color }}>{p.icon}</div>
                  <span className={`text-xs font-bold ${selectedPlatform === p.id ? 'text-black' : 'text-gray-500'}`}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Objective */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 font-saira-condensed mb-1">SELECT OBJECTIVE</h2>
            <p className="text-xs text-gray-400 font-sans mb-4">What's the goal of this campaign?</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj.id)}
                  className={`border p-4 cursor-pointer transition-all text-center ${
                    selectedObjective === obj.id ? 'border-2 border-black shadow-sm bg-white' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 flex items-center justify-center ${selectedObjective === obj.id ? 'bg-[#050B14] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {obj.icon}
                  </div>
                  <h4 className={`text-xs font-bold mb-0.5 ${selectedObjective === obj.id ? 'text-black' : 'text-gray-600'}`}>{obj.label}</h4>
                  <p className="text-[10px] text-gray-400">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setPhase('configure')}
              disabled={!canProceedToConfig}
              className={`flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-wide font-saira-condensed transition-colors ${
                canProceedToConfig ? 'bg-[#050B14] text-white hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              CONTINUE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: Configure (auto-filled, editable) */}
      {phase === 'configure' && (
        <div className="space-y-6">
          <button onClick={() => setPhase('select')} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 font-saira-condensed uppercase mb-2">
            <ArrowLeft className="w-4 h-4" /> BACK
          </button>

          <div className="bg-green-50 border border-green-200 p-4 flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32] flex-shrink-0" />
            <span className="text-sm font-sans">
              <strong>{selectedAssets.length} assets</strong> selected · Publishing to <strong>{platformData?.label}</strong> · Objective: <strong>{objectiveData?.label}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget & Schedule */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-bold uppercase font-saira-condensed">BUDGET & SCHEDULE</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Budget type</label>
                  <select value={budgetType} onChange={(e) => setBudgetType(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans">
                    <option value="daily">Daily budget</option>
                    <option value="lifetime">Lifetime budget</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Amount</label>
                  <input type="text" value={`₹ ${budget}`} onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Start date</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">End date</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans" />
                </div>
              </div>
            </div>

            {/* Audience */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-bold uppercase font-saira-condensed">AUDIENCE</h3>
                <span className="text-[10px] bg-green-50 text-[#34CC32] px-2 py-0.5 font-bold border border-green-200">Auto-filled</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Age range</label>
                  <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans">
                    <option value="18-65">18 - 65+</option>
                    <option value="18-35">18 - 35</option>
                    <option value="25-45">25 - 45</option>
                    <option value="25-55">25 - 55</option>
                    <option value="35-65">35 - 65+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm p-2.5 focus:ring-1 focus:ring-black font-sans">
                    <option value="All">All genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              {/* Locations */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Locations</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {locations.map((loc) => (
                    <span key={loc} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 font-medium">
                      <MapPin className="w-3 h-3" />{loc}
                      <button onClick={() => removeTag(locations, setLocations, loc)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                    </span>
                  ))}
                  <button className="text-[10px] font-bold text-gray-500 hover:text-gray-700 uppercase font-saira-condensed"><Plus className="w-3 h-3 inline" /> Add</button>
                </div>
              </div>
              {/* Interests */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 font-sans">Interests</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {interests.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 font-medium border border-blue-200">
                      {item}
                      <button onClick={() => removeTag(interests, setInterests, item)}><X className="w-3 h-3 text-blue-400 hover:text-red-500" /></button>
                    </span>
                  ))}
                  <button className="text-[10px] font-bold text-gray-500 hover:text-gray-700 uppercase font-saira-condensed"><Plus className="w-3 h-3 inline" /> Add</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setPhase('review')}
              className="flex items-center gap-2 px-8 py-3 bg-[#050B14] text-white text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-black transition-colors"
            >
              REVIEW & LAUNCH <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: Review & Launch */}
      {phase === 'review' && (
        <div className="space-y-6">
          <button onClick={() => setPhase('configure')} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 font-saira-condensed uppercase mb-2">
            <ArrowLeft className="w-4 h-4" /> BACK
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign summary card */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">CAMPAIGN SUMMARY</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 font-saira-condensed">Platform</span>
                    <div className="flex items-center gap-2">
                      <span style={{ color: platformData?.color }}>{platformData?.icon}</span>
                      <span className="text-sm font-semibold">{platformData?.label}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 font-saira-condensed">Objective</span>
                    <span className="text-sm font-semibold">{objectiveData?.label}</span>
                  </div>
                  <div className="bg-gray-50 p-3 border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 font-saira-condensed">Budget</span>
                    <span className="text-sm font-semibold">₹ {budget}/{budgetType === 'daily' ? 'day' : 'total'}</span>
                  </div>
                  <div className="bg-gray-50 p-3 border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1 font-saira-condensed">Schedule</span>
                    <span className="text-sm font-semibold">{startDate}</span>
                  </div>
                </div>
              </div>

              {/* Audience summary */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">AUDIENCE</h3>
                <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600 font-sans">
                  <span>Age: <strong>{ageRange}</strong></span>
                  <span>•</span>
                  <span>Gender: <strong>{gender}</strong></span>
                  <span>•</span>
                  <span>Locations: <strong>{locations.join(', ')}</strong></span>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  {interests.map((i) => (
                    <span key={i} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 border border-blue-200 font-medium">{i}</span>
                  ))}
                </div>
              </div>

              {/* Assets */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">CREATIVES ({selectedAssetsData.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedAssetsData.map((a) => (
                    <div key={a.id} className="border border-gray-200 overflow-hidden">
                      <img src={a.image} alt={a.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                      <div className="p-2">
                        <p className="text-xs font-semibold text-gray-900 truncate">{a.headline}</p>
                        <p className="text-[10px] text-gray-400 truncate">{a.primaryText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase font-saira-condensed mb-4">PRE-LAUNCH CHECKLIST</h3>
                <div className="space-y-2">
                  {['Assets approved in CREATEIT', 'Platform account connected', 'Budget within allocation', 'Target audience configured', 'Schedule set'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#34CC32]" />
                      <span className="text-sm text-gray-700 font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch panel */}
            <div className="lg:col-span-1">
              <div className="bg-[#050B14] p-6 text-white sticky top-20">
                <Rocket className="w-8 h-8 mb-4 text-[#34CC32]" />
                <h3 className="text-lg font-bold uppercase font-saira-condensed mb-2">READY TO LAUNCH</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                  Your campaign will be submitted for approval. Nothing goes live without explicit sign-off.
                </p>

                <div className="space-y-3 mb-6 text-xs">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Platform</span>
                    <span className="font-bold">{platformData?.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Objective</span>
                    <span className="font-bold">{objectiveData?.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Budget</span>
                    <span className="font-bold">₹ {budget}/{budgetType === 'daily' ? 'day' : 'total'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Creatives</span>
                    <span className="font-bold">{selectedAssets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-bold">{startDate} → {endDate}</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3 flex items-start gap-2 mb-6">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-amber-300 leading-relaxed">Human-in-the-loop: Campaign requires approval before going live.</p>
                </div>

                <button
                  onClick={handleLaunch}
                  disabled={launching}
                  className="w-full py-4 bg-[#34CC32] hover:bg-[#2db32c] text-white text-sm font-bold uppercase tracking-wide transition-colors font-saira-condensed flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {launching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

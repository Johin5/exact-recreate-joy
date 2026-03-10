import { useState } from 'react';
import { Info, CheckCircle2, Target, Users, Zap } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';
import LocationTargeting, { LocationData } from '../../ui/LocationTargeting';
import InterestTargeting, { InterestSuggestion } from '../../ui/InterestTargeting';

export default function AwarenessStep2AdSet() {
  const [adSetName, setAdSetName] = useState('');
  const [performanceGoal, setPerformanceGoal] = useState('maximize_reach');
  const [autoPlacement, setAutoPlacement] = useState(true);
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState('200');
  const [startDate, setStartDate] = useState('2026-03-15');
  const [endDate, setEndDate] = useState('2026-04-15');
  const [frequencyCapEnabled, setFrequencyCapEnabled] = useState(true);
  const [freqImpressions, setFreqImpressions] = useState('1');
  const [freqPeriod, setFreqPeriod] = useState('7_days');

  const [ageMin, setAgeMin] = useState('18');
  const [ageMax, setAgeMax] = useState('65');
  const [gender, setGender] = useState('all');
  const [audienceType, setAudienceType] = useState('advantage_plus');

  const [locations, setLocations] = useState<LocationData[]>([
    { id: '1', name: 'Mumbai', lat: 19.076, lon: 72.8777, country: 'India' },
    { id: '2', name: 'Delhi', lat: 28.6139, lon: 77.209, country: 'India' },
  ]);

  const [interests, setInterests] = useState<InterestSuggestion[]>([
    { name: 'Automobiles', size: '235M - 277M', rawSize: 256000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles' },
  ]);

  const [pixelEnabled, setPixelEnabled] = useState(false);
  const [urlParams, setUrlParams] = useState('');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-foreground font-saira-condensed">AD SET SETUP</h2>
        <p className="text-sm text-muted-foreground font-sans">Define reach, audience, placements, and schedule for awareness.</p>
      </div>

      <div className="space-y-8 max-w-5xl">
        {/* Ad Set Name */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">AD SET NAME</h3>
          </div>
          <input
            type="text"
            value={adSetName}
            onChange={(e) => setAdSetName(e.target.value)}
            placeholder="e.g. Awareness - 18-65 - Mumbai+Delhi - Broad"
            className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
          />
        </div>

        {/* Performance Goal */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">PERFORMANCE GOAL</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'maximize_reach', label: 'Maximize Reach', desc: 'Show ads to the most unique people', icon: <Users className="w-5 h-5" /> },
              { id: 'maximize_impressions', label: 'Maximize Impressions', desc: 'Show ads as many times as possible', icon: <Zap className="w-5 h-5" /> },
              { id: 'maximize_ad_recall', label: 'Ad Recall Lift', desc: 'Optimize for people likely to remember', icon: <Target className="w-5 h-5" /> },
            ].map((goal) => (
              <div
                key={goal.id}
                onClick={() => setPerformanceGoal(goal.id)}
                className={`border p-4 cursor-pointer transition-all ${
                  performanceGoal === goal.id
                    ? 'border-2 border-foreground bg-background shadow-sm'
                    : 'border-border hover:border-muted-foreground/40 hover:bg-muted'
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center mb-2 ${performanceGoal === goal.id ? 'bg-brand-dark text-brand-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {goal.icon}
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">{goal.label}</h4>
                <p className="text-xs text-muted-foreground font-sans">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Targeting */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">AUDIENCE</h3>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3 font-sans">Audience type</label>
            <div className="flex gap-4">
              {[
                { id: 'advantage_plus', label: 'Advantage+ Audience', desc: 'Meta finds your ideal audience automatically' },
                { id: 'manual', label: 'Manual Audience', desc: 'Define locations, age, gender, and interests' },
              ].map((type) => (
                <div
                  key={type.id}
                  onClick={() => setAudienceType(type.id)}
                  className={`flex-1 border p-4 cursor-pointer transition-all ${
                    audienceType === type.id ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'
                  }`}
                >
                  <h4 className="text-sm font-semibold text-foreground font-sans">{type.label}</h4>
                  <p className="text-xs text-muted-foreground font-sans">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {audienceType === 'manual' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <BrandSelect label="Min age" options={Array.from({ length: 48 }, (_, i) => ({ value: String(18 + i), label: String(18 + i) }))} value={ageMin} onChange={setAgeMin} className="mb-0" />
                <BrandSelect label="Max age" options={Array.from({ length: 48 }, (_, i) => ({ value: String(18 + i), label: String(18 + i) }))} value={ageMax} onChange={setAgeMax} className="mb-0" />
                <BrandSelect label="Gender" options={[{ value: 'all', label: 'All genders' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={gender} onChange={setGender} className="mb-0" />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-medium text-foreground font-sans">Location Targeting</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <LocationTargeting locations={locations} onChange={setLocations} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-medium text-foreground font-sans">Detailed Targeting (Interests & Behaviors)</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <InterestTargeting selected={interests} onChange={setInterests} />
              </div>
            </>
          )}
        </div>

        {/* Placements */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">PLACEMENTS</h3>
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => setAutoPlacement(true)}
              className={`flex-1 border p-4 cursor-pointer transition-all ${autoPlacement ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'}`}
            >
              <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">Advantage+ Placements</h4>
              <p className="text-xs text-muted-foreground font-sans">Recommended. Meta optimizes delivery across all placements.</p>
            </div>
            <div
              onClick={() => setAutoPlacement(false)}
              className={`flex-1 border p-4 cursor-pointer transition-all ${!autoPlacement ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'}`}
            >
              <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">Manual Placements</h4>
              <p className="text-xs text-muted-foreground font-sans">Choose specific placements across Facebook, Instagram, Messenger, Audience Network.</p>
            </div>
          </div>
        </div>

        {/* Frequency Cap */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">FREQUENCY CAP</h3>
            </div>
            <Toggle checked={frequencyCapEnabled} onChange={setFrequencyCapEnabled} />
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-sans leading-relaxed">
            Limit how often people see your ad to avoid ad fatigue and maximize unique reach.
          </p>
          {frequencyCapEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrandSelect
                label="Impressions per person"
                options={[
                  { value: '1', label: '1 impression' },
                  { value: '2', label: '2 impressions' },
                  { value: '3', label: '3 impressions' },
                  { value: '5', label: '5 impressions' },
                ]}
                value={freqImpressions}
                onChange={setFreqImpressions}
                className="mb-0"
                infoTooltip="true"
              />
              <BrandSelect
                label="Per time period"
                options={[
                  { value: '1_day', label: 'Every 1 day' },
                  { value: '7_days', label: 'Every 7 days' },
                  { value: '14_days', label: 'Every 14 days' },
                  { value: '30_days', label: 'Every 30 days' },
                ]}
                value={freqPeriod}
                onChange={setFreqPeriod}
                className="mb-0"
                infoTooltip="true"
              />
            </div>
          )}
        </div>

        {/* Budget & Schedule */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">BUDGET & SCHEDULE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BrandSelect label="Budget type" options={[{ value: 'daily', label: 'Daily budget' }, { value: 'lifetime', label: 'Lifetime budget' }]} value={budgetType} onChange={setBudgetType} className="mb-0" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-foreground font-sans">Amount</label>
              </div>
              <input type="text" value={`₹ ${budgetAmount}`} onChange={(e) => setBudgetAmount(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">End date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans" />
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">TRACKING</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted border border-border mb-4">
            <div>
              <h4 className="text-sm font-medium text-foreground font-sans">Meta Pixel</h4>
              <p className="text-xs text-muted-foreground font-sans">Optional — track website visits from awareness ads</p>
            </div>
            <Toggle checked={pixelEnabled} onChange={setPixelEnabled} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-foreground font-sans">URL Parameters (optional)</label>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={urlParams}
              onChange={(e) => setUrlParams(e.target.value)}
              placeholder="e.g. utm_source=meta&utm_medium=awareness"
              className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </>
  );
}

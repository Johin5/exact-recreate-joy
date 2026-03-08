import { useState } from 'react';
import { Info, CheckCircle2, Target, Users, AlertTriangle } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';
import LocationTargeting, { LocationData } from '../../ui/LocationTargeting';
import InterestTargeting, { InterestSuggestion } from '../../ui/InterestTargeting';

export default function LeadStep2AdSet() {
  const [adSetName, setAdSetName] = useState('');
  const [optimizationGoal, setOptimizationGoal] = useState('conversion_leads');
  const [autoPlacement, setAutoPlacement] = useState(true);
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState('200');
  const [startDate, setStartDate] = useState('2025-03-15');
  const [endDate, setEndDate] = useState('2025-04-15');
  const [selectedPixel, setSelectedPixel] = useState('pixel_mahindra');
  const [conversionEvent, setConversionEvent] = useState('lead');
  const [capiEnabled, setCapiEnabled] = useState(true);

  const [ageMin, setAgeMin] = useState('25');
  const [ageMax, setAgeMax] = useState('55');
  const [gender, setGender] = useState('all');
  const [audienceType, setAudienceType] = useState('broad');

  const [locations, setLocations] = useState<LocationData[]>([
    { id: '1', name: 'Mumbai', lat: 19.076, lon: 72.8777, country: 'India' },
    { id: '2', name: 'Delhi', lat: 28.6139, lon: 77.209, country: 'India' },
    { id: '3', name: 'Bangalore', lat: 12.9716, lon: 77.5946, country: 'India' },
  ]);

  const [interests, setInterests] = useState<InterestSuggestion[]>([
    { name: 'Automobiles', size: '235M - 277M', rawSize: 256000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles' },
    { name: 'SUV', size: '145M - 171M', rawSize: 158000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles' },
    { name: 'Test drive', size: '12M - 14M', rawSize: 13000000, type: 'Behaviors', path: 'Behaviors › Purchase behavior' },
  ]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-foreground font-saira-condensed">AD SET SETUP</h2>
        <p className="text-sm text-muted-foreground font-sans">Define your audience, placements, optimization, and schedule.</p>
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
            placeholder="e.g. Lead Gen - 25-55 - Mumbai+Delhi - Interest Based"
            className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
          />
        </div>

        {/* Audience Targeting */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">AUDIENCE TARGETING</h3>
          </div>

          {/* Audience type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3 font-sans">Audience type</label>
            <div className="flex gap-4">
              {[
                { id: 'broad', label: 'Broad', desc: 'Let Meta find your audience', icon: <Target className="w-5 h-5" /> },
                { id: 'custom', label: 'Custom Audience', desc: 'From your CRM or pixel data', icon: <Users className="w-5 h-5" /> },
                { id: 'lookalike', label: 'Lookalike', desc: 'People similar to your customers', icon: <Users className="w-5 h-5" /> },
              ].map((type) => (
                <div
                  key={type.id}
                  onClick={() => setAudienceType(type.id)}
                  className={`flex-1 border p-4 cursor-pointer transition-all ${
                    audienceType === type.id ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center mb-2 ${audienceType === type.id ? 'bg-brand-dark text-brand-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {type.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-foreground font-sans">{type.label}</h4>
                  <p className="text-xs text-muted-foreground font-sans">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <BrandSelect label="Min age" options={Array.from({ length: 48 }, (_, i) => ({ value: String(18 + i), label: String(18 + i) }))} value={ageMin} onChange={setAgeMin} className="mb-0" />
            <BrandSelect label="Max age" options={Array.from({ length: 48 }, (_, i) => ({ value: String(18 + i), label: String(18 + i) }))} value={ageMax} onChange={setAgeMax} className="mb-0" />
            <BrandSelect label="Gender" options={[{ value: 'all', label: 'All genders' }, { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={gender} onChange={setGender} className="mb-0" />
          </div>

          {/* Location Targeting */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <label className="block text-sm font-medium text-foreground font-sans">Location Targeting</label>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <LocationTargeting locations={locations} onChange={setLocations} />
          </div>

          {/* Interest Targeting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="block text-sm font-medium text-foreground font-sans">Detailed Targeting (Interests & Behaviors)</label>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <InterestTargeting selected={interests} onChange={setInterests} />
          </div>
        </div>

        {/* Placements */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">PLACEMENTS</h3>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
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
              <p className="text-xs text-muted-foreground font-sans">Choose specific placements across Facebook, Instagram, Messenger.</p>
            </div>
          </div>
          {!autoPlacement && (
            <div className="bg-muted border border-border p-4 text-xs text-muted-foreground font-sans">
              Without CBO, evaluate performance at the <strong>Ad Set Level</strong> when using manual placements.
            </div>
          )}
        </div>

        {/* Optimization */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">OPTIMIZATION FOR AD DELIVERY</h3>
          </div>
          <BrandSelect
            label="Optimize for"
            options={[
              { value: 'conversion_leads', label: 'Conversion Leads (recommended)' },
              { value: 'lead_volume', label: 'Lead volume' },
              { value: 'link_clicks', label: 'Link clicks' },
            ]}
            value={optimizationGoal}
            onChange={setOptimizationGoal}
            className="mb-4"
            infoTooltip="true"
          />
          <div className="bg-warning-muted border border-warning-border p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-warning-foreground font-sans leading-relaxed">
              Instant Forms can yield lower quality leads. Optimize for <strong>Conversion Leads</strong> to focus on qualified leads rather than volume.
            </p>
          </div>
        </div>

        {/* Pixel & Conversion Tracking */}
        <div className="bg-card border border-border p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">PIXEL & CONVERSION TRACKING</h3>
          </div>

          <div className="space-y-6">
            <BrandSelect
              label="Meta Pixel"
              options={[
                { value: 'pixel_mahindra', label: 'Mahindra Auto Pixel (ID: 5849301...)' },
                { value: 'pixel_secondary', label: 'Mahindra Digital Pixel (ID: 7712948...)' },
                { value: 'pixel_test', label: 'Test Environment Pixel (ID: 9938471...)' },
              ]}
              value={selectedPixel}
              onChange={setSelectedPixel}
              className="mb-0"
              infoTooltip="true"
            />

            <BrandSelect
              label="Conversion event"
              options={[
                { value: 'lead', label: 'Lead (recommended)' },
                { value: 'complete_registration', label: 'Complete Registration' },
                { value: 'submit_application', label: 'Submit Application' },
                { value: 'contact', label: 'Contact' },
                { value: 'view_content', label: 'View Content' },
                { value: 'custom', label: 'Custom Conversion' },
              ]}
              value={conversionEvent}
              onChange={setConversionEvent}
              className="mb-0"
              infoTooltip="true"
            />

            <div className="flex items-center justify-between p-4 bg-muted border border-border">
              <div>
                <h4 className="text-sm font-medium text-foreground font-sans">Conversions API (CAPI)</h4>
                <p className="text-xs text-muted-foreground font-sans">Server-side tracking for improved match rates & iOS 14+ accuracy</p>
              </div>
              <Toggle checked={capiEnabled} onChange={setCapiEnabled} />
            </div>

            {!capiEnabled && (
              <div className="bg-warning-muted border border-warning-border p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-warning-foreground font-sans leading-relaxed">
                  Without CAPI, conversion tracking accuracy will be reduced, especially for iOS 14+ users. <strong>Strongly recommended</strong> for lead gen campaigns.
                </p>
              </div>
            )}
          </div>
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
      </div>
    </>
  );
}
import { useState } from 'react';
import { Info, CheckCircle2, Plus, X, MapPin, Users, Target } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';

export default function LeadStep2AdSet() {
  const [adSetName, setAdSetName] = useState('');
  const [optimizationGoal, setOptimizationGoal] = useState('conversion_leads');
  const [autoPlacement, setAutoPlacement] = useState(true);
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState('200');
  const [startDate, setStartDate] = useState('2025-03-15');
  const [endDate, setEndDate] = useState('2025-04-15');

  // Targeting
  const [ageMin, setAgeMin] = useState('25');
  const [ageMax, setAgeMax] = useState('55');
  const [gender, setGender] = useState('all');
  const [locations, setLocations] = useState(['Mumbai', 'Delhi', 'Bangalore']);
  const [interests, setInterests] = useState(['Automobiles', 'SUV', 'Test Drive']);
  const [audienceType, setAudienceType] = useState('broad');

  const removeTag = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">AD SET SETUP</h2>
        <p className="text-sm text-gray-500 font-sans">Define your audience, placements, optimization, and schedule.</p>
      </div>

      <div className="space-y-8 max-w-5xl">
        {/* Ad Set Name */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">AD SET NAME</h3>
          </div>
          <input
            type="text"
            value={adSetName}
            onChange={(e) => setAdSetName(e.target.value)}
            placeholder="e.g. Lead Gen - 25-55 - Mumbai+Delhi - Interest Based"
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400"
          />
        </div>

        {/* Audience Targeting */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">AUDIENCE TARGETING</h3>
          </div>

          {/* Audience type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3 font-sans">Audience type</label>
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
                    audienceType === type.id ? 'border-2 border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center mb-2 ${audienceType === type.id ? 'bg-[#050B14] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {type.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 font-sans">{type.label}</h4>
                  <p className="text-xs text-gray-400 font-sans">{type.desc}</p>
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

          {/* Locations */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <label className="block text-sm font-medium text-gray-900 font-sans">Locations</label>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {locations.map((loc) => (
                <span key={loc} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5">
                  {loc}
                  <button onClick={() => removeTag(locations, setLocations, loc)}><X className="w-3 h-3 text-gray-400 hover:text-gray-600" /></button>
                </span>
              ))}
              <button className="flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-gray-700 font-saira-condensed">
                <Plus className="w-3 h-3" /> ADD
              </button>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-gray-900 font-sans">Detailed targeting (Interests & Behaviors)</label>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {interests.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 border border-blue-200">
                  {item}
                  <button onClick={() => removeTag(interests, setInterests, item)}><X className="w-3 h-3 text-blue-400 hover:text-blue-600" /></button>
                </span>
              ))}
              <button className="flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-gray-700 font-saira-condensed">
                <Plus className="w-3 h-3" /> ADD INTEREST
              </button>
            </div>
            <p className="text-xs text-gray-400 font-sans">Add interests, behaviors, or demographics to narrow your audience.</p>
          </div>
        </div>

        {/* Placements */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">PLACEMENTS</h3>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div
              onClick={() => setAutoPlacement(true)}
              className={`flex-1 border p-4 cursor-pointer transition-all ${autoPlacement ? 'border-2 border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-1 font-sans">Advantage+ Placements</h4>
              <p className="text-xs text-gray-400 font-sans">Recommended. Meta optimizes delivery across all placements.</p>
            </div>
            <div
              onClick={() => setAutoPlacement(false)}
              className={`flex-1 border p-4 cursor-pointer transition-all ${!autoPlacement ? 'border-2 border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-1 font-sans">Manual Placements</h4>
              <p className="text-xs text-gray-400 font-sans">Choose specific placements across Facebook, Instagram, Messenger.</p>
            </div>
          </div>
          {!autoPlacement && (
            <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-500 font-sans">
              Without CBO, evaluate performance at the <strong>Ad Set Level</strong> when using manual placements.
            </div>
          )}
        </div>

        {/* Optimization */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
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
          <div className="bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 font-sans leading-relaxed">
              Instant Forms can yield lower quality leads. Optimize for <strong>Conversion Leads</strong> to focus on qualified leads rather than volume.
            </p>
          </div>
        </div>

        {/* Budget & Schedule */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
            <h3 className="text-base font-semibold uppercase font-saira-condensed">BUDGET & SCHEDULE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BrandSelect label="Budget type" options={[{ value: 'daily', label: 'Daily budget' }, { value: 'lifetime', label: 'Lifetime budget' }]} value={budgetType} onChange={setBudgetType} className="mb-0" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-900 font-sans">Amount</label>
              </div>
              <input type="text" value={`₹ ${budgetAmount}`} onChange={(e) => setBudgetAmount(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">Start date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">End date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Info, CheckCircle2, Calendar, Search, X, MapPin, Plus, ChevronRight, Check, Minus, Locate, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import BrandSelect from '../ui/BrandSelect';
import AdScheduleGrid from '../ui/AdScheduleGrid';
import FacebookPageSelect from '../ui/FacebookPageSelect';
import AgeRangeSelect from '../ui/AgeRangeSelect';
import Toggle from '../ui/Toggle';
import PlacementControls from '../ui/PlacementControls';
import LocationMap from '../ui/LocationMap';
import BulkLocationModal from '../ui/BulkLocationModal';
import L from 'leaflet';

export default function Step3SetupAdSet() {
  const [dynamicCreative, setDynamicCreative] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]);
  const [locationSearch, setLocationSearch] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<Array<{id: string, name: string, lat: number, lon: number, geojson?: any, country?: string}>>([]);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isBulkLocationModalOpen, setIsBulkLocationModalOpen] = useState(false);
  const [runAdsOnSchedule, setRunAdsOnSchedule] = useState(false);
  const [performanceGoal, setPerformanceGoal] = useState('max_reach');
  const [facebookPage, setFacebookPage] = useState('lokal');
  const [costPerResultGoal, setCostPerResultGoal] = useState('0');
  const [frequencyTimes, setFrequencyTimes] = useState('5');
  const [frequencyDays, setFrequencyDays] = useState('8');
  const [budgetType, setBudgetType] = useState('daily');
  const [budgetAmount, setBudgetAmount] = useState('1600');
  const [gender, setGender] = useState('all');
  const [minAge, setMinAge] = useState('33');
  const [maxAge, setMaxAge] = useState('65+');
  const [placementType, setPlacementType] = useState('advantage_plus');
  const [timeZone, setTimeZone] = useState('viewer');

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (locationSearch.length > 2) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationSearch)}&format=json&polygon_geojson=1&addressdetails=1&limit=5`);
          const data = await response.json();
          setLocationSuggestions(data);
          setShowSuggestions(true);
        } catch (error) { console.error("Location search failed", error); }
      } else { setLocationSuggestions([]); setShowSuggestions(false); }
    }, 500);
    return () => clearTimeout(timer);
  }, [locationSearch]);

  const handleSuggestionSelect = (result: any) => {
    const lat = parseFloat(result.lat); const lon = parseFloat(result.lon);
    const name = result.display_name.split(',')[0];
    const country = result.address?.country || 'Other Locations';
    const id = result.place_id || Math.random().toString();
    setMapCenter([lat, lon]); setLocationSearch('');
    let geojson = null;
    if (result.geojson) {
      if (result.geojson.type === 'Polygon') geojson = result.geojson.coordinates[0].map((coord: any) => [coord[1], coord[0]]);
      else if (result.geojson.type === 'MultiPolygon') geojson = result.geojson.coordinates[0][0].map((coord: any) => [coord[1], coord[0]]);
    }
    if (!selectedLocations.some(loc => loc.name === name)) setSelectedLocations([...selectedLocations, { id, name, lat, lon, geojson, country }]);
    setShowSuggestions(false);
  };

  const locationsByCountry = selectedLocations.reduce((acc, loc) => {
    const country = loc.country || 'Other Locations';
    if (!acc[country]) acc[country] = [];
    acc[country].push(loc);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">SETUP AD SET</h2>
        <p className="text-sm text-gray-500 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 bg-white border border-gray-200 p-8 shadow-sm">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">AD SET NAME</h3></div>
            <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-xs font-bold text-gray-900 font-saira-condensed uppercase tracking-wide">Name here</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" placeholder="Enter data here" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-[#34CC32] focus:border-[#34CC32] block p-3 font-normal font-sans placeholder-gray-400" /></div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">AWARENESS</h3></div>
            <BrandSelect label="Performance goal" options={[{ value: 'max_reach', label: 'Maximize reach of ads' }, { value: 'max_impressions', label: 'Maximize number of impressions' }]} value={performanceGoal} onChange={setPerformanceGoal} className="mb-6" infoTooltip="true" />
            <FacebookPageSelect label="Facebook page" value={facebookPage} onChange={setFacebookPage} className="mb-6" />
            <BrandSelect label="Cost per result goal (INR)" options={[{ value: '0', label: '₹ . 00' }]} value={costPerResultGoal} onChange={setCostPerResultGoal} className="mb-6" infoTooltip="true" />
            <div className="flex items-center justify-between mb-4 pt-6 border-t border-gray-100">
              <div><h3 className="text-base font-semibold uppercase font-saira-condensed">Dynamic creative</h3><p className="text-xs text-gray-500 mt-1 font-sans max-w-lg">Provide creative elements and we'll automatically generate combinations optimised for your audience.</p></div>
              <Toggle checked={dynamicCreative} onChange={setDynamicCreative} />
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">BUDGET AND SCHEDULE</h3></div>
            <BrandSelect label="Budget type" options={[{ value: 'daily', label: 'Daily budget' }, { value: 'lifetime', label: 'Lifetime budget' }]} value={budgetType} onChange={setBudgetType} className="mb-6" infoTooltip="true" />
            <BrandSelect label="Amount" options={[{ value: '1600', label: '₹ 1,600.00' }]} value={budgetAmount} onChange={setBudgetAmount} className="mb-6" infoTooltip="true" />
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-900 mb-2 font-saira-condensed uppercase tracking-wide">Start / End date</label>
              <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-4 w-4 text-gray-500" /></div><input type="text" defaultValue="Oct 15, 2024-Oct 28, 2024" className="bg-white border border-gray-200 text-gray-900 text-sm block w-full pl-10 p-3 font-normal font-sans" /></div>
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-6 h-6 text-[#34CC32]" /><h3 className="text-base font-bold uppercase font-sans text-gray-900">AUDIENCE CONTROL</h3></div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2"><label className="block text-xs font-bold text-gray-900 font-sans uppercase tracking-wide">LOCATIONS</label><Info className="w-3.5 h-3.5 text-gray-400" /></div>
              <div className="relative mb-3">
                {selectedLocations.length > 0 && (
                  <div className="border border-gray-300 rounded-sm bg-white mb-3 overflow-hidden">
                    {Object.entries(locationsByCountry).map(([country, locs]: [string, any[]]) => (
                      <div key={country}>
                        <div className="px-4 py-2 font-bold text-xs text-gray-700 border-b border-gray-100 bg-gray-50 uppercase tracking-wider">{country}</div>
                        {locs.map((loc) => (
                          <div key={loc.id} className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                            <div className="bg-[#34CC32] p-1 rounded-full"><Check className="w-3 h-3 text-white" /></div>
                            <span className="text-sm font-medium text-gray-900">{loc.name}</span>
                            <button onClick={() => setSelectedLocations(selectedLocations.filter(l => l.id !== loc.id))} className="ml-auto text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mb-0 h-10">
                  <button className="flex items-center gap-2 bg-white border border-gray-300 px-3 h-full rounded-sm text-sm font-medium hover:bg-gray-50 text-gray-700">Include <ChevronDown className="w-4 h-4 text-gray-500" /></button>
                  <div className="flex-1 relative flex items-center border border-gray-300 rounded-sm bg-white focus-within:border-[#34CC32] focus-within:ring-1 focus-within:ring-[#34CC32]">
                    <Search className="w-5 h-5 text-gray-400 ml-3" />
                    <input className="flex-1 border-none focus:ring-0 text-sm px-3 py-2 outline-none font-sans h-full" placeholder="Search locations" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
                    {showSuggestions && locationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-1 rounded-sm z-50 max-h-60 overflow-y-auto">
                        {locationSuggestions.map((result, index) => (
                          <div key={index} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0" onClick={() => handleSuggestionSelect(result)}>{result.display_name}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-80 border border-gray-300 bg-gray-50 overflow-hidden">
                <LocationMap center={mapCenter} locations={selectedLocations} onMapReady={setMapInstance} />
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
                  <div className="bg-white rounded shadow-sm border border-gray-300 flex flex-col overflow-hidden">
                    <button className="p-2 hover:bg-gray-50 border-b border-gray-200 text-gray-700 w-9 h-9 flex items-center justify-center" onClick={() => mapInstance?.zoomIn()}><Plus className="w-5 h-5" /></button>
                    <button className="p-2 hover:bg-gray-50 text-gray-700 w-9 h-9 flex items-center justify-center" onClick={() => mapInstance?.zoomOut()}><Minus className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
              <div className="mt-4"><button onClick={() => setIsBulkLocationModalOpen(true)} className="text-[#34CC32] text-sm font-bold hover:underline">Add locations in bulk</button></div>
            </div>
            <BrandSelect label="Gender" options={[{ value: 'all', label: 'All' }, { value: 'men', label: 'Men' }, { value: 'women', label: 'Women' }]} value={gender} onChange={setGender} className="mb-6" infoTooltip="true" />
            <AgeRangeSelect minAge={minAge} maxAge={maxAge} onMinChange={setMinAge} onMaxChange={setMaxAge} className="mb-6" />
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">PLACEMENTS</h3></div>
            <BrandSelect label="Select placement type" options={[{ value: 'advantage_plus', label: 'Advantage+ placements (Recommended)' }, { value: 'manual', label: 'Manual placements' }]} value={placementType} onChange={setPlacementType} className="mb-6" infoTooltip="true" />
            {placementType === 'manual' && <PlacementControls />}
          </div>
        </div>
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 font-sans">Audience definition</h3>
            <p className="text-xs text-gray-500 mb-4 font-sans">Your audience is broad. Broad audiences can improve performance.</p>
            <div className="relative h-2 bg-gray-200 rounded-full mb-2 overflow-hidden flex"><div className="w-1/3 bg-red-400 h-full"></div><div className="w-1/3 bg-yellow-400 h-full"></div><div className="w-1/3 bg-[#34CC32] h-full"></div></div>
            <div className="relative h-4 mb-4"><div className="absolute left-[80%] -top-1 w-0.5 h-4 bg-black"></div></div>
            <div className="flex justify-between text-[10px] text-gray-500 font-sans mb-6"><span>Narrow</span><span>Broad</span></div>
            <h4 className="text-xs font-medium text-gray-900 font-sans mb-2">Estimated audience size: 316,500,000 - 372,300,000</h4>
          </div>
          <div className="bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 font-sans">Estimated daily results</h3>
            <div className="mb-4"><span className="text-xs font-medium text-gray-900 font-sans">Reach</span><div className="text-lg font-bold text-gray-900 font-sans mb-2">16K-47K</div><div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-3/4 rounded-full"></div></div></div>
          </div>
        </div>
      </div>
      <BulkLocationModal isOpen={isBulkLocationModalOpen} onClose={() => setIsBulkLocationModalOpen(false)} />
    </>
  );
}

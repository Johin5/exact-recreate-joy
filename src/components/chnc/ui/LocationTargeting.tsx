import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, Plus, Minus, Navigation, MapPin, Globe, ChevronDown } from 'lucide-react';
import LocationMap from './LocationMap';
import L from 'leaflet';

export interface LocationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  geojson?: any;
  country?: string;
}

interface LocationTargetingProps {
  locations: LocationData[];
  onChange: (locations: LocationData[]) => void;
}

export default function LocationTargeting({ locations, onChange }: LocationTargetingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 2) { setSuggestions([]); return; }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&addressdetails=1&polygon_geojson=1`
      );
      const data = await res.json();
      const results: LocationData[] = data.map((item: any) => {
        let geojson: any = undefined;
        if (item.geojson && (item.geojson.type === 'Polygon' || item.geojson.type === 'MultiPolygon')) {
          if (item.geojson.type === 'Polygon') {
            geojson = item.geojson.coordinates[0].map((c: number[]) => [c[1], c[0]]);
          } else if (item.geojson.type === 'MultiPolygon') {
            geojson = item.geojson.coordinates.map((poly: number[][][]) =>
              poly[0].map((c: number[]) => [c[1], c[0]])
            );
          }
        }
        return {
          id: item.place_id?.toString() || Math.random().toString(),
          name: item.display_name?.split(',').slice(0, 2).join(', ') || item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          geojson,
          country: item.address?.country || '',
        };
      });
      setSuggestions(results);
      setShowSuggestions(true);
    } catch {
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchLocations(value), 500);
  };

  const addLocation = (loc: LocationData) => {
    if (!locations.find((l) => l.id === loc.id)) {
      onChange([...locations, loc]);
      setMapCenter([loc.lat, loc.lon]);
      setMapZoom(loc.geojson ? 10 : 12);
    }
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const removeLocation = (id: string) => {
    onChange(locations.filter((l) => l.id !== id));
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setMapCenter([latitude, longitude]);
      setMapZoom(13);
    });
  };

  const handleZoom = (dir: 'in' | 'out') => {
    if (mapRef.current) {
      const z = mapRef.current.getZoom();
      mapRef.current.setZoom(dir === 'in' ? z + 1 : z - 1);
    }
  };

  // Group locations by country
  const grouped = locations.reduce<Record<string, LocationData[]>>((acc, loc) => {
    const key = loc.country || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Search */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search cities, states, countries…"
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block pl-10 pr-4 py-3 font-normal font-sans placeholder-gray-400"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => addLocation(s)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0 transition-colors"
              >
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-sans truncate">{s.name}</p>
                  {s.country && <p className="text-xs text-gray-400 font-sans">{s.country}</p>}
                </div>
                <Plus className="w-4 h-4 text-[#34CC32] flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative border border-gray-200 overflow-hidden" style={{ height: 360 }}>
        <LocationMap
          center={mapCenter}
          zoom={mapZoom}
          locations={locations}
          onMapReady={(map) => { mapRef.current = map; }}
        />

        {/* Map controls */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
          <button onClick={() => handleZoom('in')} className="bg-white border border-gray-200 w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4 text-gray-700" />
          </button>
          <button onClick={() => handleZoom('out')} className="bg-white border border-gray-200 w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <Minus className="w-4 h-4 text-gray-700" />
          </button>
          <button onClick={handleLocateMe} className="bg-white border border-gray-200 w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors mt-1">
            <Navigation className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Location count badge */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm border border-gray-200 px-3 py-1.5 shadow-sm">
          <span className="text-xs font-medium text-gray-700 font-sans">{locations.length} location{locations.length !== 1 ? 's' : ''} selected</span>
        </div>
      </div>

      {/* Selected locations grouped by country */}
      {locations.length > 0 && (
        <div className="space-y-3">
          {Object.entries(grouped).map(([country, locs]) => (
            <div key={country}>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-saira-condensed">{country}</span>
                <span className="text-xs text-gray-400">({locs.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {locs.map((loc) => (
                  <span key={loc.id} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 font-sans">
                    <MapPin className="w-3 h-3 text-[#34CC32]" />
                    {loc.name}
                    <button onClick={() => removeLocation(loc.id)} className="ml-0.5 hover:text-gray-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

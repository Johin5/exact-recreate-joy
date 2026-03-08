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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) { setShowSuggestions(false); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 2) { setSuggestions([]); return; }
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&addressdetails=1&polygon_geojson=1`);
      const data = await res.json();
      const results: LocationData[] = data.map((item: any) => {
        let geojson: any = undefined;
        if (item.geojson && (item.geojson.type === 'Polygon' || item.geojson.type === 'MultiPolygon')) {
          if (item.geojson.type === 'Polygon') geojson = item.geojson.coordinates[0].map((c: number[]) => [c[1], c[0]]);
          else if (item.geojson.type === 'MultiPolygon') geojson = item.geojson.coordinates.map((poly: number[][][]) => poly[0].map((c: number[]) => [c[1], c[0]]));
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
    } catch { setSuggestions([]); }
    finally { setIsSearching(false); }
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
    setSearchQuery(''); setSuggestions([]); setShowSuggestions(false);
  };

  const removeLocation = (id: string) => { onChange(locations.filter((l) => l.id !== id)); };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      setMapZoom(13);
    });
  };

  const handleZoom = (dir: 'in' | 'out') => {
    if (mapRef.current) {
      const z = mapRef.current.getZoom();
      mapRef.current.setZoom(dir === 'in' ? z + 1 : z - 1);
    }
  };

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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search cities, states, countries…"
            className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block pl-10 pr-4 py-3 font-normal font-sans placeholder:text-muted-foreground"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            </div>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border shadow-lg max-h-64 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => addLocation(s)}
                className="w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 border-b border-border/50 last:border-0 transition-colors"
              >
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-sans truncate">{s.name}</p>
                  {s.country && <p className="text-xs text-muted-foreground font-sans">{s.country}</p>}
                </div>
                <Plus className="w-4 h-4 text-brand flex-shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative border border-border overflow-hidden" style={{ height: 360 }}>
        <LocationMap center={mapCenter} zoom={mapZoom} locations={locations} onMapReady={(map) => { mapRef.current = map; }} />

        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1">
          <button onClick={() => handleZoom('in')} className="bg-card border border-border w-8 h-8 flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
            <Plus className="w-4 h-4 text-foreground/70" />
          </button>
          <button onClick={() => handleZoom('out')} className="bg-card border border-border w-8 h-8 flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
            <Minus className="w-4 h-4 text-foreground/70" />
          </button>
          <button onClick={handleLocateMe} className="bg-card border border-border w-8 h-8 flex items-center justify-center shadow-sm hover:bg-muted transition-colors mt-1">
            <Navigation className="w-4 h-4 text-foreground/70" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 z-[1000] bg-card/90 backdrop-blur-sm border border-border px-3 py-1.5 shadow-sm">
          <span className="text-xs font-medium text-foreground/70 font-sans">{locations.length} location{locations.length !== 1 ? 's' : ''} selected</span>
        </div>
      </div>

      {/* Selected locations grouped by country */}
      {locations.length > 0 && (
        <div className="space-y-3">
          {Object.entries(grouped).map(([country, locs]) => (
            <div key={country}>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide font-saira-condensed">{country}</span>
                <span className="text-xs text-muted-foreground">({locs.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {locs.map((loc) => (
                  <span key={loc.id} className="inline-flex items-center gap-1.5 bg-muted text-foreground/70 text-xs font-medium px-3 py-1.5 font-sans">
                    <MapPin className="w-3 h-3 text-brand" />
                    {loc.name}
                    <button onClick={() => removeLocation(loc.id)} className="ml-0.5 hover:text-foreground">
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
import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronRight, ChevronDown, Info, Users, ArrowUpDown } from 'lucide-react';

export interface InterestSuggestion {
  name: string;
  size: string;
  rawSize: number;
  type: 'Interests' | 'Demographics' | 'Behaviors';
  path: string;
  description?: string;
}

const MOCK_INTERESTS: InterestSuggestion[] = [
  { name: 'Automobiles', size: '235M - 277M', rawSize: 256000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles', description: 'People who have expressed an interest in automobiles or car-related content.' },
  { name: 'SUV', size: '145M - 171M', rawSize: 158000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles', description: 'People interested in Sport Utility Vehicles.' },
  { name: 'Luxury cars', size: '89M - 105M', rawSize: 97000000, type: 'Interests', path: 'Interests › Hobbies and activities › Vehicles', description: 'People interested in premium and luxury automotive brands.' },
  { name: 'Electric vehicles', size: '67M - 79M', rawSize: 73000000, type: 'Interests', path: 'Interests › Technology › Green Technology', description: 'People interested in electric cars and EV technology.' },
  { name: 'Test drive', size: '12M - 14M', rawSize: 13000000, type: 'Behaviors', path: 'Behaviors › Purchase behavior', description: 'People who have shown intent to test drive vehicles.' },
  { name: 'Car buyers', size: '98M - 115M', rawSize: 106500000, type: 'Behaviors', path: 'Behaviors › Purchase behavior › Automotive', description: 'People likely to buy a vehicle in the near future.' },
  { name: 'High income', size: '180M - 212M', rawSize: 196000000, type: 'Demographics', path: 'Demographics › Financial › Income', description: 'People in the top 25% income bracket.' },
  { name: 'Business decision makers', size: '55M - 65M', rawSize: 60000000, type: 'Demographics', path: 'Demographics › Work › Job titles', description: 'People with management or executive-level job titles.' },
  { name: 'Online shopping', size: '890M - 1.0B', rawSize: 945000000, type: 'Behaviors', path: 'Behaviors › Digital activities › Online purchases', description: 'People who frequently make online purchases.' },
  { name: 'Travel enthusiasts', size: '320M - 377M', rawSize: 348500000, type: 'Interests', path: 'Interests › Travel › Frequent travelers', description: 'People who travel frequently and engage with travel content.' },
  { name: 'Fitness & wellness', size: '410M - 483M', rawSize: 446500000, type: 'Interests', path: 'Interests › Health › Fitness', description: 'People interested in fitness, gym, and wellness activities.' },
  { name: 'Real estate', size: '178M - 210M', rawSize: 194000000, type: 'Interests', path: 'Interests › Business › Real estate', description: 'People interested in buying, selling, or investing in property.' },
];

const BROWSE_CATEGORIES = [
  { name: 'Demographics', subcategories: [
    { name: 'Financial', items: MOCK_INTERESTS.filter(i => i.type === 'Demographics' && i.path.includes('Financial')) },
    { name: 'Work', items: MOCK_INTERESTS.filter(i => i.type === 'Demographics' && i.path.includes('Work')) },
  ]},
  { name: 'Interests', subcategories: [
    { name: 'Vehicles', items: MOCK_INTERESTS.filter(i => i.type === 'Interests' && i.path.includes('Vehicles')) },
    { name: 'Technology', items: MOCK_INTERESTS.filter(i => i.type === 'Interests' && i.path.includes('Technology')) },
    { name: 'Travel', items: MOCK_INTERESTS.filter(i => i.type === 'Interests' && i.path.includes('Travel')) },
    { name: 'Health', items: MOCK_INTERESTS.filter(i => i.type === 'Interests' && i.path.includes('Health')) },
    { name: 'Business', items: MOCK_INTERESTS.filter(i => i.type === 'Interests' && i.path.includes('Business')) },
  ]},
  { name: 'Behaviors', subcategories: [
    { name: 'Purchase behavior', items: MOCK_INTERESTS.filter(i => i.type === 'Behaviors' && i.path.includes('Purchase')) },
    { name: 'Digital activities', items: MOCK_INTERESTS.filter(i => i.type === 'Behaviors' && i.path.includes('Digital')) },
  ]},
];

interface InterestTargetingProps {
  selected: InterestSuggestion[];
  onChange: (interests: InterestSuggestion[]) => void;
}

export default function InterestTargeting({ selected, onChange }: InterestTargetingProps) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mode, setMode] = useState<'search' | 'browse'>('search');
  const [sortBy, setSortBy] = useState<'relevance' | 'size'>('relevance');
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [hoveredInterest, setHoveredInterest] = useState<InterestSuggestion | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false); setHoveredInterest(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = useMemo(() => {
    let results = MOCK_INTERESTS.filter(
      (i) => i.name.toLowerCase().includes(query.toLowerCase()) && !selected.find((s) => s.name === i.name)
    );
    if (sortBy === 'size') results.sort((a, b) => b.rawSize - a.rawSize);
    return results;
  }, [query, selected, sortBy]);

  const addInterest = (interest: InterestSuggestion) => {
    if (!selected.find((s) => s.name === interest.name)) onChange([...selected, interest]);
  };

  const removeInterest = (name: string) => { onChange(selected.filter((s) => s.name !== name)); };
  const toggleCat = (name: string) => { const next = new Set(expandedCats); next.has(name) ? next.delete(name) : next.add(name); setExpandedCats(next); };
  const toggleSub = (name: string) => { const next = new Set(expandedSubs); next.has(name) ? next.delete(name) : next.add(name); setExpandedSubs(next); };

  const estimatedSize = useMemo(() => {
    if (selected.length === 0) return null;
    const totalRaw = selected.reduce((sum, s) => sum + s.rawSize, 0);
    const est = totalRaw * 0.6;
    if (est >= 1_000_000_000) return `${(est / 1_000_000_000).toFixed(1)}B`;
    if (est >= 1_000_000) return `${(est / 1_000_000).toFixed(1)}M`;
    return `${(est / 1_000).toFixed(0)}K`;
  }, [selected]);

  const typeColor = (type: string) => {
    switch (type) {
      case 'Interests': return 'bg-info-muted text-info border-info-border';
      case 'Demographics': return 'bg-accent text-accent-foreground border-border';
      case 'Behaviors': return 'bg-warning-muted text-warning-foreground border-warning-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="relative">
        <div className="border border-border bg-background p-2 flex flex-wrap gap-2 items-center min-h-[48px]">
          {selected.map((s) => (
            <span key={s.name} className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 border ${typeColor(s.type)}`}>
              {s.name}
              <button onClick={() => removeInterest(s.name)}><X className="w-3 h-3 opacity-60 hover:opacity-100" /></button>
            </span>
          ))}
          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setMode('search'); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              placeholder={selected.length > 0 ? 'Add more…' : 'Search interests, behaviors, demographics…'}
              className="w-full text-sm text-foreground font-sans placeholder:text-muted-foreground outline-none bg-transparent py-1 px-1"
            />
          </div>
        </div>

        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border shadow-lg max-h-80 overflow-hidden flex flex-col">
            <div className="flex border-b border-border">
              <button onClick={() => setMode('search')} className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide font-saira-condensed transition-colors ${mode === 'search' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground/70'}`}>Search</button>
              <button onClick={() => setMode('browse')} className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wide font-saira-condensed transition-colors ${mode === 'browse' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground hover:text-foreground/70'}`}>Browse</button>
              {mode === 'search' && (
                <button onClick={() => setSortBy(sortBy === 'relevance' ? 'size' : 'relevance')} className="px-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground/70 border-l border-border">
                  <ArrowUpDown className="w-3 h-3" />{sortBy === 'relevance' ? 'Relevance' : 'Size'}
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {mode === 'search' ? (
                filtered.length > 0 ? (
                  filtered.map((item) => (
                    <div key={item.name} className="relative" onMouseEnter={() => setHoveredInterest(item)} onMouseLeave={() => setHoveredInterest(null)}>
                      <button onClick={() => addInterest(item)} className="w-full text-left px-4 py-3 hover:bg-muted flex items-center gap-3 border-b border-border/50 last:border-0 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-foreground font-sans font-medium">{item.name}</span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 border ${typeColor(item.type)}`}>{item.type}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-sans mt-0.5">{item.path}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="w-3 h-3" />{item.size}</div>
                        </div>
                      </button>
                      {hoveredInterest?.name === item.name && item.description && (
                        <div className="absolute right-0 top-0 translate-x-full z-[60] w-64 bg-brand-dark text-brand-foreground p-4 shadow-xl ml-2 pointer-events-none">
                          <h4 className="text-sm font-semibold mb-1 font-sans">{item.name}</h4>
                          <p className="text-xs text-brand-foreground/70 mb-2 font-sans leading-relaxed">{item.description}</p>
                          <div className="flex items-center gap-1 text-xs text-brand-foreground/50"><Users className="w-3 h-3" /><span>Audience: {item.size}</span></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-muted-foreground font-sans">
                    {query ? 'No matching interests found.' : 'Start typing to search interests…'}
                  </div>
                )
              ) : (
                BROWSE_CATEGORIES.map((cat) => (
                  <div key={cat.name}>
                    <button onClick={() => toggleCat(cat.name)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted border-b border-border/50 transition-colors">
                      <span className="text-sm font-semibold text-foreground font-sans">{cat.name}</span>
                      {expandedCats.has(cat.name) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    {expandedCats.has(cat.name) && cat.subcategories.map((sub) => (
                      <div key={sub.name} className="bg-muted/50">
                        <button onClick={() => toggleSub(sub.name)} className="w-full flex items-center justify-between px-6 py-2.5 hover:bg-muted border-b border-border/50 transition-colors">
                          <span className="text-xs font-medium text-muted-foreground font-sans">{sub.name}</span>
                          {expandedSubs.has(sub.name) ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                        </button>
                        {expandedSubs.has(sub.name) && sub.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => addInterest(item)}
                            disabled={!!selected.find((s) => s.name === item.name)}
                            className={`w-full text-left px-8 py-2.5 flex items-center justify-between border-b border-border/50 transition-colors ${
                              selected.find((s) => s.name === item.name) ? 'opacity-40 cursor-not-allowed bg-muted' : 'hover:bg-muted'
                            }`}
                          >
                            <span className="text-xs text-foreground/70 font-sans">{item.name}</span>
                            <span className="text-[10px] text-muted-foreground font-sans">{item.size}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {estimatedSize && (
        <div className="bg-muted border border-border p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium text-foreground font-sans">Estimated Audience</span>
          </div>
          <span className="text-sm font-bold text-foreground font-sans">{estimatedSize}</span>
        </div>
      )}

      <p className="text-xs text-muted-foreground font-sans">Add interests, behaviors, or demographics to narrow your audience.</p>
    </div>
  );
}
import { Search, Filter, ArrowRight, Zap, Globe, Target, BarChart3, ShoppingBag, Users, Megaphone, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Template {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  category: string;
  tags: string[];
  estimatedTime: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  { id: 'meta-awareness', title: 'Meta Awareness Campaign', description: 'Launch brand awareness campaigns across Facebook & Instagram with optimized placements and audience targeting.', platforms: ['Meta'], category: 'Awareness', tags: ['Facebook', 'Instagram', 'Brand Awareness'], estimatedTime: '5 min setup', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'google-search', title: 'Google Search Campaign', description: 'Create high-intent search campaigns with keyword targeting, ad extensions, and smart bidding strategies.', platforms: ['Google'], category: 'Performance', tags: ['Search', 'Keywords', 'Conversions'], estimatedTime: '8 min setup', icon: <Target className="w-5 h-5" /> },
  { id: 'meta-lead-gen', title: 'Meta Lead Generation', description: 'Capture leads directly on Facebook & Instagram with pre-filled forms and CRM integration.', platforms: ['Meta'], category: 'Lead Gen', tags: ['Lead Forms', 'CRM Sync', 'Retargeting'], estimatedTime: '6 min setup', icon: <Users className="w-5 h-5" /> },
  { id: 'cross-channel-retargeting', title: 'Cross-Channel Retargeting', description: 'Re-engage website visitors across Meta, Google Display, and YouTube with dynamic creative ads.', platforms: ['Meta', 'Google'], category: 'Retargeting', tags: ['Dynamic Ads', 'Pixel', 'Remarketing'], estimatedTime: '10 min setup', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'ecommerce-shopping', title: 'E-commerce Shopping Ads', description: 'Set up product catalog campaigns on Meta & Google Shopping with automated feed sync.', platforms: ['Meta', 'Google'], category: 'E-commerce', tags: ['Product Catalog', 'Shopping', 'ROAS'], estimatedTime: '12 min setup', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'multi-platform-launch', title: 'Multi-Platform Launch', description: 'Simultaneously launch campaigns across Meta, Google, and programmatic with unified budget allocation.', platforms: ['Meta', 'Google', 'Programmatic'], category: 'Launch', tags: ['Multi-channel', 'Budget Split', 'Unified Reporting'], estimatedTime: '15 min setup', icon: <Globe className="w-5 h-5" /> },
  { id: 'video-campaign', title: 'Video View Campaign', description: 'Maximize video views across YouTube, Instagram Reels, and Facebook with optimized placements.', platforms: ['Meta', 'Google'], category: 'Video', tags: ['YouTube', 'Reels', 'Video Views'], estimatedTime: '7 min setup', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'app-install', title: 'App Install Campaign', description: 'Drive app installs with deep links, creative testing, and optimized bid strategies across platforms.', platforms: ['Meta', 'Google'], category: 'App', tags: ['App Installs', 'Deep Links', 'UAC'], estimatedTime: '8 min setup', icon: <Zap className="w-5 h-5" /> },
];

const categories = ['All', 'Awareness', 'Performance', 'Lead Gen', 'Retargeting', 'E-commerce', 'Launch', 'Video', 'App'];

const platformTokens: Record<string, string> = {
  Meta: 'bg-info-muted text-info border border-info-border',
  Google: 'bg-success-muted text-brand border border-success-border',
  Programmatic: 'bg-accent text-accent-foreground border border-border',
};

interface CampaignTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function CampaignTemplates({ onSelectTemplate }: CampaignTemplatesProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = templates.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-foreground uppercase tracking-tight font-saira-condensed">CAMPAIGN TEMPLATES</h1>
          <span className="text-[10px] bg-success-muted text-brand px-2 py-0.5 font-bold border border-success-border flex items-center gap-1"><Sparkles className="w-3 h-3" /> Smart defaults</span>
        </div>
        <p className="text-sm text-muted-foreground font-sans">Pick a template to quick-launch your campaign. Pre-filled with best practices and auto-populated from your brand assets.</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-foreground font-sans placeholder:text-muted-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium hover:bg-muted font-sans">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors font-saira-condensed ${
              activeCategory === cat ? 'bg-brand-dark text-brand-foreground' : 'bg-muted text-muted-foreground hover:bg-surface-active'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="bg-card border border-border p-6 shadow-sm hover:shadow-md hover:border-muted-foreground/40 transition-all group cursor-pointer"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-brand-dark text-brand-foreground flex items-center justify-center">
                {template.icon}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium font-sans">{template.estimatedTime}</span>
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2 font-saira-condensed uppercase tracking-wide">{template.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 font-sans leading-relaxed">{template.description}</p>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {template.platforms.map((p) => (
                <span key={p} className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wide ${platformTokens[p] || 'bg-muted text-muted-foreground'}`}>{p}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-4">
              {template.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 font-sans">{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity font-saira-condensed">
              USE TEMPLATE <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-sm font-sans">No templates match your search.</p>
        </div>
      )}
    </div>
  );
}
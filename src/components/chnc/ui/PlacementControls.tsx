import { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

interface PlacementItem { id: string; label: string; }
interface PlacementCategory { id: string; label: string; description?: string; items: PlacementItem[]; }

const PLACEMENT_DATA: PlacementCategory[] = [
  { id: 'feeds', label: 'Feeds', description: 'Get high visibility for your business with ads in feeds', items: [
    { id: 'fb_feed', label: 'Facebook Feed' }, { id: 'fb_profile_feed', label: 'Facebook profile feed' },
    { id: 'ig_feed', label: 'Instagram feed' }, { id: 'ig_profile_feed', label: 'Instagram profile feed' },
    { id: 'fb_marketplace', label: 'Facebook Marketplace' }, { id: 'fb_right_column', label: 'Facebook right column' },
    { id: 'ig_explore', label: 'Instagram Explore' }, { id: 'ig_explore_home', label: 'Instagram Explore home' },
    { id: 'fb_business_explore', label: 'Facebook Business Explore' }, { id: 'threads_feed', label: 'Threads feed' },
    { id: 'fb_notifications', label: 'Facebook Notifications' },
  ]},
  { id: 'stories_reels', label: 'Stories, Status, Reels', description: 'Tell a rich, visual story with immersive, fullscreen vertical ads', items: [
    { id: 'ig_stories', label: 'Instagram Stories' }, { id: 'fb_stories', label: 'Facebook Stories' },
    { id: 'messenger_stories', label: 'Messenger Stories' }, { id: 'ig_reels', label: 'Instagram Reels' },
    { id: 'fb_reels', label: 'Facebook Reels' }, { id: 'whatsapp_status', label: 'WhatsApp Status' },
  ]},
  { id: 'instream', label: 'In-stream ads for reels', description: 'Reach people before, during or after they watch a reel', items: [
    { id: 'fb_instream', label: 'Facebook in-stream reels' }, { id: 'ads_on_fb_reels', label: 'Ads on Facebook Reels' },
  ]},
  { id: 'search', label: 'Search results', description: 'Get visibility for your business as people search', items: [
    { id: 'fb_search', label: 'Facebook search results' }, { id: 'ig_search', label: 'Instagram search results' },
  ]},
  { id: 'messages', label: 'Marketing Messages', description: 'Send a marketing message to people on WhatsApp.', items: [
    { id: 'whatsapp_messages', label: 'Marketing messages on WhatsApp' },
  ]},
  { id: 'apps_sites', label: 'Apps and sites', description: 'Expand your reach with ads in external apps and websites', items: [
    { id: 'an_native', label: 'Audience Network native, banner and interstitial' }, { id: 'an_rewarded', label: 'Audience Network rewarded videos' },
  ]},
];

export default function PlacementControls() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['feeds', 'stories_reels', 'instream', 'search', 'messages', 'apps_sites']);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([
    'fb_feed', 'fb_profile_feed', 'ig_feed', 'ig_profile_feed', 'fb_marketplace', 'fb_right_column', 'ig_explore', 'ig_explore_home', 'threads_feed',
    'ig_stories', 'fb_stories', 'messenger_stories', 'ig_reels', 'fb_reels',
    'fb_instream', 'ads_on_fb_reels', 'fb_search', 'ig_search', 'an_native', 'an_rewarded'
  ]);
  const [activeCategory, setActiveCategory] = useState<string>('feeds');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };

  const togglePlacement = (placementId: string) => {
    setSelectedPlacements(prev => prev.includes(placementId) ? prev.filter(id => id !== placementId) : [...prev, placementId]);
  };

  const toggleAllInCategory = (category: PlacementCategory) => {
    const allIds = category.items.map(i => i.id);
    const allSelected = allIds.every(id => selectedPlacements.includes(id));
    if (allSelected) {
      setSelectedPlacements(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      setSelectedPlacements(prev => [...new Set([...prev, ...allIds])]);
    }
  };

  const isCategorySelected = (category: PlacementCategory) => category.items.every(item => selectedPlacements.includes(item.id));
  const isCategoryIndeterminate = (category: PlacementCategory) => {
    const selectedCount = category.items.filter(item => selectedPlacements.includes(item.id)).length;
    return selectedCount > 0 && selectedCount < category.items.length;
  };

  return (
    <div className="border border-gray-200 bg-white rounded-sm overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer">
        <h3 className="font-bold text-gray-900 font-saira-condensed uppercase tracking-wide text-sm">Placement controls</h3>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      <div className="flex flex-col md:flex-row h-[600px]">
        <div className="w-full md:w-1/2 border-r border-gray-200 overflow-y-auto p-2">
          {PLACEMENT_DATA.map(category => {
            const isExpanded = expandedCategories.includes(category.id);
            const isSelected = isCategorySelected(category);
            const isIndeterminate = isCategoryIndeterminate(category);

            return (
              <div key={category.id} className="mb-1">
                <div className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-sm cursor-pointer group" onMouseEnter={() => setActiveCategory(category.id)}>
                  <button onClick={(e) => { e.stopPropagation(); toggleCategory(category.id); }} className="mt-0.5 text-gray-400 hover:text-gray-600">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 font-sans">{category.label}</span>
                      <div
                        className={`w-5 h-5 border rounded-sm flex items-center justify-center cursor-pointer transition-colors
                          ${isSelected || isIndeterminate ? 'bg-[#34CC32] border-[#34CC32]' : 'border-gray-300 bg-white'}
                        `}
                        onClick={(e) => { e.stopPropagation(); toggleAllInCategory(category); }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        {isIndeterminate && <div className="w-3 h-0.5 bg-white"></div>}
                      </div>
                    </div>
                    {isExpanded && category.description && <p className="text-xs text-gray-500 mt-1 font-sans">{category.description}</p>}
                  </div>
                </div>

                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {category.items.map(item => {
                      const isItemSelected = selectedPlacements.includes(item.id);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-sm cursor-pointer" onClick={() => togglePlacement(item.id)}>
                          <span className="text-sm text-gray-700 font-sans">{item.label}</span>
                          <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${isItemSelected ? 'bg-[#34CC32] border-[#34CC32]' : 'border-gray-300 bg-white'}`}>
                            {isItemSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full md:w-1/2 p-6 bg-white flex flex-col items-center">
          <div className="w-full max-w-[280px] mb-6">
            <div className="aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-xl relative">
              <div className="absolute top-0 left-0 right-0 h-6 bg-black/10 z-10 flex justify-between px-3 items-center">
                <div className="w-10 h-1 bg-black/20 rounded"></div>
              </div>
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop" alt="Ad Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-12 left-4 right-4 bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#34CC32] rounded-full"></div>
                  <div>
                    <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                    <div className="h-1.5 w-12 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="h-24 bg-gray-100 rounded mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-base font-bold text-gray-900 mb-2 font-sans">
            {PLACEMENT_DATA.find(c => c.id === activeCategory)?.label || 'Feeds'}
          </h4>
          <p className="text-sm text-gray-500 text-center font-sans max-w-xs">
            We recommend <span className="font-bold">square (1:1)</span> images and <span className="font-bold">vertical (4:5)</span> videos.
          </p>
        </div>
      </div>
    </div>
  );
}

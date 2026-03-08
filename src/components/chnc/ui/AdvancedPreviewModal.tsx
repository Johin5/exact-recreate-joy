import { X, ChevronDown, Share2, AlertTriangle, Monitor, Smartphone, Layout, Search, Bell, MessageCircle, MoreHorizontal, Heart, MessageSquare, ThumbsUp, Globe, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdvancedPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedPreviewModal({ isOpen, onClose }: AdvancedPreviewModalProps) {
  const [activeTab, setActiveTab] = useState('Placements');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['feeds_instream', 'stories_reels_apps', 'right_search']);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const placements = [
    { id: 1, name: 'Facebook Feed', type: 'feed', platform: 'facebook', category: 'feeds_instream' },
    { id: 2, name: 'Instagram feed', type: 'feed', platform: 'instagram', category: 'feeds_instream' },
    { id: 3, name: 'Instagram Stories', type: 'story', platform: 'instagram', category: 'stories_reels_apps' },
    { id: 4, name: 'Facebook Stories', type: 'story', platform: 'facebook', category: 'stories_reels_apps' },
    { id: 5, name: 'Instagram Explore', type: 'feed', platform: 'instagram', category: 'feeds_instream' },
    { id: 6, name: 'Instagram Reels', type: 'reel', platform: 'instagram', category: 'stories_reels_apps' },
    { id: 7, name: 'Facebook Reels', type: 'reel', platform: 'facebook', category: 'stories_reels_apps' },
    { id: 8, name: 'Ads on Facebook Reels', type: 'reel', platform: 'facebook', category: 'feeds_instream' },
    { id: 9, name: 'Threads feed', type: 'feed', platform: 'threads', category: 'feeds_instream' },
    { id: 10, name: 'Facebook in-stream reels', type: 'reel', platform: 'facebook', category: 'feeds_instream' },
    { id: 11, name: 'Facebook right column', type: 'right-column', platform: 'facebook', category: 'right_search' },
    { id: 12, name: 'Facebook search results', type: 'search', platform: 'facebook', category: 'right_search' },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const selectAll = () => {
    if (selectedCategories.length === 3) { setSelectedCategories([]); } else { setSelectedCategories(['feeds_instream', 'stories_reels_apps', 'right_search']); }
  };

  const filteredPlacements = placements.filter(p => selectedCategories.includes(p.category));

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[95vw] h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-sans mb-1">Advanced preview</h2>
            <p className="text-sm text-gray-500 font-sans">You can review how your ad will show up on different placements.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1"><X className="w-6 h-6" /></button>
        </div>

        <div className="px-6 border-b border-gray-200 shrink-0">
          <div className="flex gap-6">
            <button className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'Placements' ? 'border-[#34CC32] text-[#34CC32]' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('Placements')}>
              <div className="flex items-center gap-2"><Layout className="w-4 h-4" />Placements</div>
            </button>
          </div>
        </div>

        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs font-medium border border-orange-100"><AlertTriangle className="w-3 h-3" /> 1</div>
            <button onClick={selectAll} className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors border ${selectedCategories.length === 3 ? 'bg-[#34CC32]/10 text-[#34CC32] border-[#34CC32]/20' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}><Layout className="w-4 h-4" /> All</button>
            <button onClick={() => toggleCategory('feeds_instream')} className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors border whitespace-nowrap ${selectedCategories.includes('feeds_instream') ? 'bg-[#34CC32]/10 text-[#34CC32] border-[#34CC32]/20' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Feeds, In-stream</button>
            <button onClick={() => toggleCategory('stories_reels_apps')} className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors border whitespace-nowrap ${selectedCategories.includes('stories_reels_apps') ? 'bg-[#34CC32]/10 text-[#34CC32] border-[#34CC32]/20' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Stories, Reels</button>
            <button onClick={() => toggleCategory('right_search')} className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors border whitespace-nowrap ${selectedCategories.includes('right_search') ? 'bg-[#34CC32]/10 text-[#34CC32] border-[#34CC32]/20' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Right column, Search</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Ways your ad will be seen</h3>
            <p className="text-xs text-gray-500">We'll show variations of your ad we predict will resonate with different people.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlacements.map((placement) => (
              <div key={placement.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {placement.platform === 'facebook' && <div className="w-4 h-4 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-[10px] font-bold">f</div>}
                    {placement.platform === 'instagram' && <div className="w-4 h-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">i</div>}
                    {placement.platform === 'threads' && <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">@</div>}
                    <span className="text-xs font-medium text-gray-700">{placement.name}</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>

                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                  {(placement.type === 'feed' || placement.type === 'right-column') && (
                    <div className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold truncate ${placement.platform === 'facebook' ? 'text-blue-600' : 'text-gray-900'}`}>Blue Dart</h4>
                        <p className="text-[10px] text-gray-500">Sponsored</p>
                      </div>
                    </div>
                  )}

                  <div className="relative aspect-square bg-gray-100">
                    <img src={`https://picsum.photos/seed/${placement.id}/400/400`} alt="Ad Content" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {(placement.type === 'story' || placement.type === 'reel') && (
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 p-3 flex flex-col justify-between text-white">
                        <div className="flex items-center gap-2"><div className="w-6 h-6 bg-white/20 rounded-full"></div><span className="text-xs font-bold">Blue Dart</span></div>
                        <div><h4 className="text-sm font-bold mb-1">Need startup-ready onboarding?</h4><button className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm w-full">Sign up</button></div>
                      </div>
                    )}
                  </div>

                  {placement.type === 'feed' && placement.platform === 'facebook' && (
                    <div className="p-2 bg-gray-50 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2">Set up your business in minutes</h4>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-white bg-[#34CC32] rounded hover:bg-[#2db82b]">Save</button>
        </div>
      </div>
    </div>
  );
}

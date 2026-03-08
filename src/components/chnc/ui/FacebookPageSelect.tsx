import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search, Check, Info, User } from 'lucide-react';

interface Page {
  id: string;
  name: string;
  avatar?: string;
}

interface BusinessGroup {
  id: string;
  name: string;
  pages: Page[];
}

interface FacebookPageSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MOCK_DATA: BusinessGroup[] = [
  {
    id: 'maac_thane',
    name: 'MAAC THANE',
    pages: [
      { id: 'maac_thane_page', name: 'MAAC Thane Page' }
    ]
  },
  {
    id: 'myyshopp',
    name: 'MyyShopp Ecommerce Technologies',
    pages: [
      { id: 'lokal', name: 'Lokal', avatar: 'https://picsum.photos/seed/lokal/40' },
      { id: 'myyshopp_com', name: 'MyyShopp.com', avatar: 'https://picsum.photos/seed/myyshopp/40' }
    ]
  },
  {
    id: 'malvan_mantra',
    name: 'malvan_mantra',
    pages: [
      { id: 'malvan_mantra_page', name: 'Malvan Mantra Page' }
    ]
  }
];

export default function FacebookPageSelect({
  label,
  value,
  onChange,
  className = ''
}: FacebookPageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['myyshopp']);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedPage = MOCK_DATA.flatMap(g => g.pages).find(p => p.id === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleGroup = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const filteredData = MOCK_DATA.map(group => ({
    ...group,
    pages: group.pages.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.pages.length > 0
  );

  return (
    <div className={`mb-6 ${className}`} ref={containerRef}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-bold text-gray-900 font-saira-condensed uppercase tracking-wide">
            {label}
          </label>
          <Info className="w-3.5 h-3.5 text-gray-400" />
        </div>
      )}

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white border text-gray-900 text-sm flex items-center justify-between p-3 cursor-pointer transition-colors
            ${isOpen ? 'border-[#34CC32] ring-1 ring-[#34CC32]' : 'border-gray-200 hover:border-gray-300'}
          `}
        >
          <div className="flex items-center gap-2">
            {selectedPage ? (
              <>
                <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden shrink-0">
                  {selectedPage.avatar ? (
                    <img src={selectedPage.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3 h-3 m-1 text-gray-500" />
                  )}
                </div>
                <span className="font-sans">{selectedPage.name}</span>
              </>
            ) : (
              <span className="text-gray-400 font-sans">Select a page</span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-xl mt-1 overflow-hidden">
            <div className="p-2 border-b border-gray-100 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Page name or ID"
                className="w-full pl-9 pr-3 py-2 text-sm border-none focus:ring-0 font-sans placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="max-h-80 overflow-y-auto">
              {filteredData.map(group => {
                const isExpanded = expandedGroups.includes(group.id) || searchQuery.length > 0;

                return (
                  <div key={group.id} className="border-b border-gray-50 last:border-0">
                    <div
                      className="px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                      onClick={(e) => toggleGroup(group.id, e)}
                    >
                      <div>
                        <div className="text-xs font-bold text-gray-900 font-saira-condensed uppercase tracking-wide">{group.name}</div>
                        <div className="text-[10px] text-gray-500 font-sans">{group.pages.length} {group.pages.length === 1 ? 'Page' : 'Pages'}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>

                    {isExpanded && (
                      <div className="bg-gray-50/50">
                        {group.pages.map(page => {
                          const isSelected = page.id === value;
                          return (
                            <div
                              key={page.id}
                              className={`flex items-center gap-3 px-3 py-2 pl-4 cursor-pointer hover:bg-gray-100 transition-colors
                                ${isSelected ? 'bg-[#34CC32]/10' : ''}
                              `}
                              onClick={() => {
                                onChange(page.id);
                                setIsOpen(false);
                              }}
                            >
                              <div className="w-5 shrink-0 flex justify-center">
                                {isSelected && <Check className="w-4 h-4 text-[#34CC32]" />}
                              </div>

                              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0">
                                {page.avatar ? (
                                  <img src={page.avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <User className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 font-sans truncate">{page.name}</div>
                                <div className="text-xs text-gray-500 font-sans truncate">ID: {page.id === 'lokal' ? '259439248271190' : '785876791498698'}</div>
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

            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <a href="#" className="text-xs text-[#34CC32] hover:underline font-sans font-medium">
                Can't find a Page? Learn more
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

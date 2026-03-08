import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface AgeRangeSelectProps {
  minAge: string;
  maxAge: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  className?: string;
}

export default function AgeRangeSelect({
  minAge,
  maxAge,
  onMinChange,
  onMaxChange,
  className = ''
}: AgeRangeSelectProps) {
  const [activeDropdown, setActiveDropdown] = useState<'min' | 'max' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minOptions = Array.from({ length: 53 }, (_, i) => (i + 13).toString());
  const maxOptions = [...Array.from({ length: 52 }, (_, i) => (i + 14).toString()), '65+'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`mb-6 ${className}`} ref={containerRef}>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-xs font-bold text-gray-900 font-saira-condensed uppercase tracking-wide">
          Age
        </label>
        <Info className="w-3.5 h-3.5 text-gray-400" />
      </div>

      <div className="flex items-center">
        <div className="relative w-24 mr-2">
          <div
            onClick={() => setActiveDropdown(activeDropdown === 'min' ? null : 'min')}
            className={`w-full bg-white border text-gray-900 text-sm flex items-center justify-between p-3 cursor-pointer transition-colors rounded-sm
              ${activeDropdown === 'min' ? 'border-[#34CC32] ring-1 ring-[#34CC32]' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className="font-sans">{minAge}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeDropdown === 'min' ? 'rotate-180' : ''}`} />
          </div>

          {activeDropdown === 'min' && (
            <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-lg mt-1 max-h-60 overflow-y-auto">
              {minOptions.map((age) => (
                <div
                  key={age}
                  onClick={() => { onMinChange(age); setActiveDropdown(null); }}
                  className={`px-4 py-2 cursor-pointer text-sm font-sans transition-colors
                    ${age === minAge ? 'bg-[#34CC32]/10 text-[#34CC32] font-medium' : 'text-gray-900 hover:bg-gray-50 hover:text-[#34CC32]'}
                  `}
                >
                  {age}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-24">
          <div
            onClick={() => setActiveDropdown(activeDropdown === 'max' ? null : 'max')}
            className={`w-full bg-white border text-gray-900 text-sm flex items-center justify-between p-3 cursor-pointer transition-colors rounded-sm
              ${activeDropdown === 'max' ? 'border-[#34CC32] ring-1 ring-[#34CC32]' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className="font-sans">{maxAge}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeDropdown === 'max' ? 'rotate-180' : ''}`} />
          </div>

          {activeDropdown === 'max' && (
            <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-lg mt-1 max-h-60 overflow-y-auto">
              {maxOptions.map((age) => (
                <div
                  key={age}
                  onClick={() => { onMaxChange(age); setActiveDropdown(null); }}
                  className={`px-4 py-2 cursor-pointer text-sm font-sans transition-colors
                    ${age === maxAge ? 'bg-[#34CC32]/10 text-[#34CC32] font-medium' : 'text-gray-900 hover:bg-gray-50 hover:text-[#34CC32]'}
                  `}
                >
                  {age}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

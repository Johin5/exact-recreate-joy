import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface BrandSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  infoTooltip?: string;
  className?: string;
}

export default function BrandSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  infoTooltip,
  className = ''
}: BrandSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`mb-6 ${className}`} ref={containerRef}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-bold text-gray-900 font-saira-condensed uppercase tracking-wide">
            {label}
          </label>
          {infoTooltip && <Info className="w-3.5 h-3.5 text-gray-400" />}
        </div>
      )}

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white border text-gray-900 text-sm block p-3 pr-10 font-normal font-sans cursor-pointer transition-colors
            ${isOpen ? 'border-[#34CC32] ring-1 ring-[#34CC32]' : 'border-gray-200 hover:border-gray-300'}
          `}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-lg mt-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm font-sans transition-colors
                  ${option.value === value ? 'bg-gray-50 text-[#34CC32] font-medium' : 'text-gray-900 hover:bg-gray-50 hover:text-[#34CC32]'}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

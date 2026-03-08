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
          <label className="block text-xs font-bold text-foreground font-saira-condensed uppercase tracking-wide">
            {label}
          </label>
          {infoTooltip && <Info className="w-3.5 h-3.5 text-muted-foreground" />}
        </div>
      )}

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-background border text-foreground text-sm block p-3 pr-10 font-normal font-sans cursor-pointer transition-colors
            ${isOpen ? 'border-brand ring-1 ring-brand' : 'border-border hover:border-muted-foreground/40'}
          `}
        >
          <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full bg-card border border-border shadow-lg mt-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm font-sans transition-colors
                  ${option.value === value ? 'bg-muted text-brand font-medium' : 'text-foreground hover:bg-muted hover:text-brand'}
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
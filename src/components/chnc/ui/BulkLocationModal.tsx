import { X, ChevronDown, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BulkLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkLocationModal({ isOpen, onClose }: BulkLocationModalProps) {
  const [locationType, setLocationType] = useState('Countries');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState('United States');
  const [defaultRadius, setDefaultRadius] = useState('25 mi');
  const [formatType, setFormatType] = useState('DMA name');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const locationTypes = [
    'Countries', 'Regions or states', 'Cities', 'Postal codes',
    'Addresses', 'DMAs (designated market areas)', 'Comscore Market'
  ];

  const getPlaceholder = () => {
    switch (locationType) {
      case 'Countries': return 'Examples: United States, Singapore, Canada';
      case 'Regions or states': return 'Examples: Washington, New York, New Jersey';
      case 'Cities': return 'Examples: London, United Kingdom; Paris, France';
      case 'Postal codes': return 'Examples: 94015, 94014, 90007';
      case 'Addresses': return 'Examples: 1600 Pennsylvania Ave NW, Washington, DC, United States';
      case 'DMAs (designated market areas)': return 'Examples: Philadelphia; Chattanooga; Cleveland';
      case 'Comscore Market': return 'Examples: Philadelphia; Chattanooga; Cleveland';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 rounded-t-lg shrink-0">
          <h2 className="text-lg font-bold text-gray-900 font-sans">Add locations in bulk</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <h3 className="text-base font-bold text-gray-900 mb-1 font-sans">Add locations</h3>
          <p className="text-sm text-gray-500 mb-6 font-sans">
            Type or paste your locations below. You can put each location on a new line or separate them using commas or semicolons. <a href="#" className="text-[#34CC32] hover:underline">Learn more</a>
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-bold text-gray-900 font-sans w-32 shrink-0">Location type:</label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between min-w-[200px] px-3 py-2 bg-white border border-gray-300 rounded hover:border-gray-400 text-sm font-medium text-gray-900"
                >
                  {locationType}
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full min-w-[240px] mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
                    {locationTypes.map((type) => (
                      <button
                        key={type}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => { setLocationType(type); setIsDropdownOpen(false); }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {locationType === 'Postal codes' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-gray-900 font-sans w-32 shrink-0">Default country:</label>
                <button className="flex items-center justify-between min-w-[200px] px-3 py-2 bg-white border border-gray-300 rounded hover:border-gray-400 text-sm font-medium text-gray-900">
                  {defaultCountry}
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                </button>
              </div>
            )}

            {(locationType === 'Cities' || locationType === 'Addresses') && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-gray-900 font-sans w-32 shrink-0">Default radius:</label>
                <button className="flex items-center justify-between min-w-[120px] px-3 py-2 bg-white border border-gray-300 rounded hover:border-gray-400 text-sm font-medium text-gray-900">
                  {defaultRadius}
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                </button>
              </div>
            )}

            <div className="mt-4">
              <textarea
                className="w-full h-64 p-4 border border-gray-300 rounded text-sm font-sans placeholder-gray-500 focus:border-[#34CC32] focus:ring-1 focus:ring-[#34CC32] outline-none resize-none"
                placeholder={getPlaceholder()}
              />
            </div>

            {locationType === 'Postal codes' && (
              <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <p className="text-sm font-bold text-gray-900 mb-1">Drag and drop files</p>
                <p className="text-sm text-[#34CC32]">Or choose file on your device</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white rounded-b-lg shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-bold text-white bg-[#34CC32] rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Match locations
          </button>
        </div>
      </div>
    </div>
  );
}

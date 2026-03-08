import { Info, ChevronDown, Check, Download } from 'lucide-react';
import { useState } from 'react';
import BrandSelect from '../ui/BrandSelect';

export default function Step1SelectPlatform() {
  const [adAccount, setAdAccount] = useState('806822950870088');
  const [region, setRegion] = useState('south_west');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">SELECT PLATFORM</h2>
        <p className="text-sm text-gray-500 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h3 className="text-base font-medium mb-6 text-gray-900 font-sans">Campaign platform & Brief</h3>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-3 font-sans">Select platform to publish</label>
            <div className="flex gap-4">
              <div className="w-[120px] h-[99px] border border-gray-200 p-2 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all">
                <div className="w-8 h-8 mb-2">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 font-sans">Technology</span>
              </div>
              <div className="w-[120px] h-[99px] border-2 border-black p-2 flex flex-col items-center justify-center cursor-pointer relative bg-white shadow-sm">
                <div className="absolute top-2 left-2 bg-black text-white p-0.5"><Check className="w-2 h-2" /></div>
                <div className="w-8 h-8 mb-2 text-[#0064E0]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 14.5c-1.3 0-2.48-.56-3.43-1.46-.95.9-2.13 1.46-3.43 1.46-2.54 0-4.5-2.07-4.5-4.5s1.96-4.5 4.5-4.5c1.3 0 2.48.56 3.43 1.46.95-.9 2.13-1.46 3.43-1.46 2.54 0 4.5 2.07 4.5 4.5s-1.96 4.5-4.5 4.5z"/>
                  </svg>
                </div>
                <span className="text-xs font-bold text-black font-sans">Meta</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Ad account</label><Info className="w-3.5 h-3.5 text-gray-400" /></div>
            <BrandSelect options={[{ value: '806822950870088', label: 'Ad account ID: 806822950870088' }]} value={adAccount} onChange={setAdAccount} className="mb-0" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">Campaign name</label>
            <input type="text" defaultValue="2025 Promo Q" className="bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block w-full p-3 font-normal font-sans" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">Description</label>
            <textarea rows={5} className="bg-white border border-gray-200 text-gray-500 text-sm focus:ring-1 focus:ring-black focus:border-black block w-full p-3 resize-none leading-relaxed font-normal font-sans" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">Region</label>
            <BrandSelect options={[{ value: 'south_west', label: 'South-West' }]} value={region} onChange={setRegion} className="mb-0" />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-2 font-sans">Schedule</label>
            <input type="text" defaultValue="02/08/2024 - 28/08/2024" className="bg-white border border-gray-200 text-gray-500 text-sm focus:ring-1 focus:ring-black focus:border-black block w-full p-3 font-normal font-sans" />
          </div>
          <div className="bg-[#E5E7EB] p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
            <div className="text-sm text-black font-medium italic leading-relaxed">Budget: (CV) SM - ₹3,000 | (PV) SM - ₹3,000<br/>(SCV) SM - ₹3,000</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-4 shadow-sm h-fit">
          <div className="relative overflow-hidden bg-[#1A1A1A] aspect-square mb-4 group">
            <div className="absolute top-4 left-4 z-20"><span className="bg-gray-200 text-gray-900 text-[10px] font-semibold px-3 py-1.5 uppercase tracking-wide font-saira-condensed">Unpublished</span></div>
            <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" alt="3D Factory Scene" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </div>
          <div className="flex items-center justify-between px-1 pb-2">
            <div><h4 className="font-semibold text-gray-900 text-sm font-saira-condensed">Image025-new</h4><p className="text-[10px] text-gray-500 mt-1">Approved on 30/07/2024</p></div>
            <button className="flex items-center gap-2 bg-[#E5E7EB] hover:bg-gray-300 text-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide transition-colors font-saira-condensed"><Download className="w-3.5 h-3.5" />Download Image</button>
          </div>
        </div>
      </div>
    </>
  );
}

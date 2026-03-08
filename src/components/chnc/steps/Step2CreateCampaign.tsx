import { Info, ChevronDown, Check, CheckCircle2, Plus, AlertCircle, Target, Smartphone, Monitor } from 'lucide-react';
import { useState } from 'react';
import BrandSelect from '../ui/BrandSelect';
import Toggle from '../ui/Toggle';

export default function Step2CreateCampaign() {
  const [advantageBudget, setAdvantageBudget] = useState(true);
  const [iosCampaign, setIosCampaign] = useState(false);
  const [abTest, setAbTest] = useState(true);
  const [category, setCategory] = useState('');
  const [buyingType, setBuyingType] = useState('auction');
  const [duration, setDuration] = useState('daily');
  const [budget, setBudget] = useState('200');
  const [bidStrategy, setBidStrategy] = useState('highest_volume');
  const [testVariable, setTestVariable] = useState('creative');
  const [testDuration, setTestDuration] = useState('4');
  const [findWinner, setFindWinner] = useState('cost_per_result');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">CREATE CAMPAIGN</h2>
        <p className="text-sm text-gray-500 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="bg-white border border-gray-200 p-8 shadow-sm max-w-5xl">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">BASIC INFORMATION</h3></div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Campaign name</label><Info className="w-3.5 h-3.5 text-gray-400" /></div>
            <input type="text" placeholder="Enter data here" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400" />
          </div>
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold uppercase font-saira-condensed">Benefits of declaring special ad categories</h3><button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide font-saira-condensed border border-gray-300 px-3 py-1.5 hover:bg-gray-50"><Plus className="w-3.5 h-3.5" />CATEGORISE YOUR ADS</button></div>
          <p className="text-sm text-gray-500 mb-6 font-sans">Accurately declaring your ad categories helps you run ads which are compliant with our advertising standards.</p>
          <BrandSelect label="Categories" options={[{ value: '', label: 'Select a category' }, { value: 'credit', label: 'Credit' }, { value: 'employment', label: 'Employment' }, { value: 'housing', label: 'Housing' }]} value={category} onChange={setCategory} className="mb-0" infoTooltip="true" />
        </div>
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">CAMPAIGN DETAILS</h3></div>
          <BrandSelect label="Buying type" options={[{ value: 'auction', label: 'Auction' }, { value: 'reservation', label: 'Reservation' }]} value={buyingType} onChange={setBuyingType} className="mb-6" infoTooltip="true" />
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3 font-sans">Campaign objective</label>
            <div className="flex flex-wrap gap-4">
              <div className="border-2 border-black p-4 flex flex-col items-center justify-center cursor-pointer relative w-[120px] h-[99px] bg-white shrink-0"><div className="absolute top-2 left-2 bg-black text-white p-0.5"><Check className="w-2 h-2" /></div><Target className="w-6 h-6 mb-2 text-black" /><span className="text-xs font-bold text-black font-sans">Awareness</span></div>
              {[...Array(5)].map((_, i) => (<div key={i} className="border border-gray-200 p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all w-[120px] h-[99px] shrink-0">{i % 2 === 0 ? <Monitor className="w-6 h-6 mb-2 text-gray-400" /> : <Smartphone className="w-6 h-6 mb-2 text-gray-400" />}<span className="text-xs font-medium text-gray-500 font-sans">Technology</span></div>))}
            </div>
            <div className="flex items-center gap-2 mt-3 text-red-500"><AlertCircle className="w-4 h-4" /><span className="text-xs font-medium font-sans">Select atleast one objective</span></div>
          </div>
          <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Campaign spending limit</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" defaultValue="₹ 8,200.00" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans" /></div>
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">Advantage campaign budget</h3></div><Toggle checked={advantageBudget} onChange={setAdvantageBudget} /></div>
          <p className="text-sm text-gray-500 mb-6 font-sans leading-relaxed">Advantage campaign budget will distribute your budget across currently delivering ad sets to get more results.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BrandSelect label="Duration" options={[{ value: 'daily', label: 'Daily budget' }]} value={duration} onChange={setDuration} className="mb-0" infoTooltip="true" />
            <BrandSelect label="Budget" options={[{ value: '200', label: '₹ 200.00' }]} value={budget} onChange={setBudget} className="mb-0" infoTooltip="true" />
          </div>
          <BrandSelect label="Campaign bid strategy" options={[{ value: 'highest_volume', label: 'Highest volume' }, { value: 'cost_per_result', label: 'Cost per result goal' }, { value: 'bid_cap', label: 'Bid cap' }]} value={bidStrategy} onChange={setBidStrategy} className="mb-0" infoTooltip="true" />
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold uppercase font-saira-condensed">iOS 14+ campaign</h3><Toggle checked={iosCampaign} onChange={setIosCampaign} /></div>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">Create a campaign to help you reach people using iOS 14.5 and later devices.</p>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold uppercase font-saira-condensed">A/B test</h3><Toggle checked={abTest} onChange={setAbTest} /></div>
          <p className="text-sm text-gray-500 mb-6 font-sans leading-relaxed">To help improve ad performance, test versions with different images, text, audiences or placements.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BrandSelect label="What would you like to test?" options={[{ value: 'creative', label: 'Creative' }, { value: 'audience', label: 'Audience' }, { value: 'placement', label: 'Placement' }]} value={testVariable} onChange={setTestVariable} className="mb-0" infoTooltip="true" />
            <BrandSelect label="Test duration" options={[{ value: '4', label: '4 days' }, { value: '7', label: '7 days' }, { value: '14', label: '14 days' }]} value={testDuration} onChange={setTestDuration} className="mb-0" infoTooltip="true" />
          </div>
          <BrandSelect label="What do you want to use to find a winner?" options={[{ value: 'cost_per_result', label: 'Cost per result' }, { value: 'cpc', label: 'CPC (Cost per link click)' }]} value={findWinner} onChange={setFindWinner} className="mb-0" infoTooltip="true" />
        </div>
      </div>
    </>
  );
}

import { Info, ChevronDown, CheckCircle2, Plus, Edit2, MoreHorizontal, Maximize2, ThumbsUp, MessageSquare, Share2, Heart, Bookmark, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import BrandSelect from '../ui/BrandSelect';
import Toggle from '../ui/Toggle';
import AdvancedPreviewModal from '../ui/AdvancedPreviewModal';

export default function Step4SetupAd() {
  const [partnershipAd, setPartnershipAd] = useState(false);
  const [multiAdvertiser, setMultiAdvertiser] = useState(true);
  const [adPreview, setAdPreview] = useState(true);
  const [isAdvancedPreviewOpen, setIsAdvancedPreviewOpen] = useState(false);
  const [instagramAccount, setInstagramAccount] = useState('malvan_mantra');
  const [facebookPage, setFacebookPage] = useState('select_page');
  const [adType, setAdType] = useState('create_ad');
  const [creativeSource, setCreativeSource] = useState('manual');
  const [format, setFormat] = useState('single_image');
  const [optimiseAd, setOptimiseAd] = useState('image_ad');
  const [callToAction, setCallToAction] = useState('select');
  const [placementType, setPlacementType] = useState('app');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">SETUP AD</h2>
        <p className="text-sm text-gray-500 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 bg-white border border-gray-200 p-8 shadow-sm">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">AD NAME</h3></div>
            <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Name here</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" placeholder="Enter data here" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400" /></div>
          </div>
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold font-sans">Partnership ad</h3><Toggle checked={partnershipAd} onChange={setPartnershipAd} /></div>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">Run ads with creators, brands and other businesses.</p>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">IDENTITY</h3></div>
            <BrandSelect label="Instagram account" options={[{ value: 'malvan_mantra', label: 'Malvan Mantra' }]} value={instagramAccount} onChange={setInstagramAccount} className="mb-6" infoTooltip="true" />
            <BrandSelect label="Facebook Page" options={[{ value: 'select_page', label: 'Select page' }]} value={facebookPage} onChange={setFacebookPage} className="mb-6" infoTooltip="true" />
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">AD SETUP</h3></div>
            <BrandSelect label="Ad type" options={[{ value: 'create_ad', label: 'Create ad' }]} value={adType} onChange={setAdType} className="mb-6" infoTooltip="true" />
            <BrandSelect label="Creative source" options={[{ value: 'manual', label: 'Manual' }]} value={creativeSource} onChange={setCreativeSource} className="mb-6" infoTooltip="true" />
            <BrandSelect label="Format" options={[{ value: 'single_image', label: 'Single image or video' }]} value={format} onChange={setFormat} className="mb-6" infoTooltip="true" />
            <div className="mb-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold font-sans">Multi-advertiser ads</h3><Toggle checked={multiAdvertiser} onChange={setMultiAdvertiser} /></div>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">Your ads can appear alongside other ads in the same ad unit.</p>
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">AD CREATIVE</h3></div>
            <BrandSelect label="Select and optimise ad" options={[{ value: 'image_ad', label: 'Image ad' }]} value={optimiseAd} onChange={setOptimiseAd} className="mb-6" infoTooltip="true" />
            <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Primary text</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" placeholder="Tell people what your ad is about" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400 mb-2" /><button className="flex items-center gap-1 text-xs font-bold uppercase font-saira-condensed mt-2"><Plus className="w-3 h-3" /> ADD TEXT OPTION</button></div>
            <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Headline</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" placeholder="Headline here" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400 mb-2" /></div>
            <BrandSelect label="Call to action" options={[{ value: 'select', label: 'Select' }]} value={callToAction} onChange={setCallToAction} className="mb-6" infoTooltip="true" />
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-[#34CC32]" /><h3 className="text-base font-semibold uppercase font-saira-condensed">DESTINATION</h3></div>
            <BrandSelect label="Select placement type" options={[{ value: 'app', label: 'App' }]} value={placementType} onChange={setPlacementType} className="mb-6" infoTooltip="true" />
            <div className="mb-6"><div className="flex items-center gap-2 mb-2"><label className="block text-sm font-medium text-gray-900 font-sans">Deferred deep link</label><Info className="w-3.5 h-3.5 text-gray-400" /></div><input type="text" placeholder="Enter data here" className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400" /></div>
          </div>
        </div>
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-[#F5F5F5] p-6 min-h-[800px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><span className="text-sm font-medium font-sans">Ad preview</span><Toggle checked={adPreview} onChange={setAdPreview} /></div>
              <button onClick={() => setIsAdvancedPreviewOpen(true)} className="flex items-center gap-2 text-xs font-bold uppercase font-saira-condensed border border-gray-300 px-3 py-1.5 bg-white hover:bg-gray-50"><Maximize2 className="w-3.5 h-3.5" />ADVANCE PREVIEW</button>
            </div>
            <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 uppercase tracking-wide">Unpublished</span>
            <div className="space-y-6 mt-4">
              <div className="bg-white p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-black rounded-full"></div><div><h4 className="text-xs font-bold text-blue-600 font-sans">Your brand</h4><p className="text-[10px] text-gray-500 font-sans">Sponsored</p></div></div><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>
                <p className="text-xs text-gray-800 mb-3 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <div className="aspect-square bg-gray-100 mb-3 overflow-hidden relative"><img src="https://picsum.photos/seed/car1/400/400" alt="Ad Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-gray-500">
                  <div className="flex items-center gap-4"><div className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /><span className="text-xs">Like</span></div><div className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /><span className="text-xs">Comment</span></div><div className="flex items-center gap-1"><Share2 className="w-4 h-4" /><span className="text-xs">Share</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvancedPreviewModal isOpen={isAdvancedPreviewOpen} onClose={() => setIsAdvancedPreviewOpen(false)} />
    </>
  );
}

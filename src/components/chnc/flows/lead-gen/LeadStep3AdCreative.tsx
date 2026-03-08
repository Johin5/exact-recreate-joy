import { useState } from 'react';
import { Info, CheckCircle2, Plus, Upload, Image, Film, Layers, ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';

export default function LeadStep3AdCreative() {
  const [adName, setAdName] = useState('');
  const [format, setFormat] = useState('single');
  const [primaryText, setPrimaryText] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [cta, setCta] = useState('sign_up');
  const [mediaUploaded, setMediaUploaded] = useState(false);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-gray-900 font-saira-condensed">AD CREATIVE</h2>
        <p className="text-sm text-gray-500 font-sans">Craft compelling ad creative to capture leads.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start max-w-[1400px]">
        {/* Form */}
        <div className="xl:col-span-2 space-y-8">
          {/* Ad Name */}
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">AD NAME</h3>
            </div>
            <input
              type="text"
              value={adName}
              onChange={(e) => setAdName(e.target.value)}
              placeholder="e.g. Lead Gen - Single Image - Sign Up CTA"
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400"
            />
          </div>

          {/* Format */}
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">AD FORMAT</h3>
            </div>
            <div className="flex gap-4 mb-6">
              {[
                { id: 'single', label: 'Single Image/Video', icon: <Image className="w-5 h-5" /> },
                { id: 'carousel', label: 'Carousel', icon: <Layers className="w-5 h-5" /> },
              ].map((f) => (
                <div
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex-1 border p-4 cursor-pointer transition-all flex items-center gap-3 ${
                    format === f.id ? 'border-2 border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 ${format === f.id ? 'bg-[#050B14] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {f.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 font-sans">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Media Upload */}
            <div className="border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-600 mb-1 font-sans">Upload media or select from approved assets</p>
              <p className="text-xs text-gray-400 font-sans">PNG, JPG, MP4 — Max 30MB</p>
              <button className="mt-4 px-4 py-2 bg-[#050B14] text-white text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-black transition-colors">
                BROWSE FILES
              </button>
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-[#34CC32]" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">AD COPY</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-900 font-sans">Primary text</label>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <textarea
                  rows={3}
                  value={primaryText}
                  onChange={(e) => setPrimaryText(e.target.value)}
                  placeholder="Tell people what your ad is about. This appears above the image/video."
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 resize-none font-normal font-sans placeholder-gray-400"
                />
                <button className="flex items-center gap-1 text-xs font-bold uppercase font-saira-condensed mt-2 text-gray-500 hover:text-gray-700">
                  <Plus className="w-3 h-3" /> ADD TEXT OPTION
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-900 font-sans">Headline</label>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="A concise, impactful statement"
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-900 font-sans">Description (optional)</label>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context below the headline"
                  className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black block p-3 font-normal font-sans placeholder-gray-400"
                />
              </div>

              <BrandSelect
                label="Call to Action"
                options={[
                  { value: 'sign_up', label: 'Sign Up' },
                  { value: 'download', label: 'Download' },
                  { value: 'get_quote', label: 'Get Quote' },
                  { value: 'learn_more', label: 'Learn More' },
                  { value: 'subscribe', label: 'Subscribe' },
                  { value: 'apply_now', label: 'Apply Now' },
                  { value: 'book_now', label: 'Book Now' },
                ]}
                value={cta}
                onChange={setCta}
                className="mb-0"
                infoTooltip="true"
              />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-1">
          <div className="bg-[#F5F5F5] p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium font-sans">Ad preview</span>
              <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 uppercase tracking-wide">Draft</span>
            </div>

            <div className="bg-white p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-600 font-sans">Mahindra</h4>
                    <p className="text-[10px] text-gray-500 font-sans">Sponsored</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-800 mb-3 font-sans leading-relaxed">
                {primaryText || 'Your primary text will appear here...'}
              </p>
              <div className="aspect-square bg-gray-100 mb-3 overflow-hidden flex items-center justify-center">
                {mediaUploaded ? (
                  <img src="" alt="Ad" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-gray-400">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Media preview</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-3 mb-3 border border-gray-200">
                <p className="text-xs text-gray-500 font-sans">{description || 'Description'}</p>
                <p className="text-sm font-bold text-gray-900 font-sans">{headline || 'Headline'}</p>
                <button className="mt-2 px-3 py-1.5 bg-gray-200 text-xs font-bold text-gray-700 uppercase">
                  {cta === 'sign_up' ? 'Sign Up' : cta === 'get_quote' ? 'Get Quote' : cta === 'learn_more' ? 'Learn More' : cta.replace('_', ' ')}
                </button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /><span className="text-xs">Like</span></div>
                  <div className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /><span className="text-xs">Comment</span></div>
                  <div className="flex items-center gap-1"><Share2 className="w-4 h-4" /><span className="text-xs">Share</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Info, CheckCircle2, Plus, Upload, Image, Layers, ThumbsUp, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
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
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-foreground font-saira-condensed">AD CREATIVE</h2>
        <p className="text-sm text-muted-foreground font-sans">Craft compelling ad creative to capture leads.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start max-w-[1400px]">
        {/* Form */}
        <div className="xl:col-span-2 space-y-8">
          {/* Ad Name */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">AD NAME</h3>
            </div>
            <input
              type="text"
              value={adName}
              onChange={(e) => setAdName(e.target.value)}
              placeholder="e.g. Lead Gen - Single Image - Sign Up CTA"
              className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
            />
          </div>

          {/* Format */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-brand" />
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
                    format === f.id ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'
                  }`}
                >
                  <div className={`p-2 ${format === f.id ? 'bg-brand-dark text-brand-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {f.icon}
                  </div>
                  <span className="text-sm font-semibold text-foreground font-sans">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Media Upload */}
            <div className="border-2 border-dashed border-muted-foreground/30 p-8 flex flex-col items-center justify-center hover:border-muted-foreground/50 transition-colors cursor-pointer bg-muted">
              <Upload className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground/70 mb-1 font-sans">Upload media or select from approved assets</p>
              <p className="text-xs text-muted-foreground font-sans">PNG, JPG, MP4 — Max 30MB</p>
              <button className="mt-4 px-4 py-2 bg-brand-dark text-brand-foreground text-xs font-bold uppercase tracking-wide font-saira-condensed hover:bg-brand-dark-hover transition-colors">
                BROWSE FILES
              </button>
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">AD COPY</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-foreground font-sans">Primary text</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <textarea
                  rows={3}
                  value={primaryText}
                  onChange={(e) => setPrimaryText(e.target.value)}
                  placeholder="Tell people what your ad is about. This appears above the image/video."
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 resize-none font-normal font-sans placeholder:text-muted-foreground"
                />
                <button className="flex items-center gap-1 text-xs font-bold uppercase font-saira-condensed mt-2 text-muted-foreground hover:text-foreground">
                  <Plus className="w-3 h-3" /> ADD TEXT OPTION
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-foreground font-sans">Headline</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="A concise, impactful statement"
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-foreground font-sans">Description (optional)</label>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context below the headline"
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
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
          <div className="bg-surface p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium font-sans">Ad preview</span>
              <span className="bg-surface-active text-muted-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wide">Draft</span>
            </div>

            <div className="bg-card p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground text-xs font-bold">M</div>
                  <div>
                    <h4 className="text-xs font-bold text-info font-sans">Mahindra</h4>
                    <p className="text-[10px] text-muted-foreground font-sans">Sponsored</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-foreground/80 mb-3 font-sans leading-relaxed">
                {primaryText || 'Your primary text will appear here...'}
              </p>
              <div className="aspect-square bg-muted mb-3 overflow-hidden flex items-center justify-center">
                {mediaUploaded ? (
                  <img src="" alt="Ad" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">Media preview</p>
                  </div>
                )}
              </div>
              <div className="bg-muted p-3 mb-3 border border-border">
                <p className="text-xs text-muted-foreground font-sans">{description || 'Description'}</p>
                <p className="text-sm font-bold text-foreground font-sans">{headline || 'Headline'}</p>
                <button className="mt-2 px-3 py-1.5 bg-surface-active text-xs font-bold text-foreground/70 uppercase">
                  {cta === 'sign_up' ? 'Sign Up' : cta === 'get_quote' ? 'Get Quote' : cta === 'learn_more' ? 'Learn More' : cta.replace('_', ' ')}
                </button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border text-muted-foreground">
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
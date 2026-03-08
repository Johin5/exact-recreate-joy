import { useState } from 'react';
import { Info, CheckCircle2, Plus, X, Trash2, GripVertical, Shield, ExternalLink } from 'lucide-react';
import BrandSelect from '../../ui/BrandSelect';
import Toggle from '../../ui/Toggle';

interface FormQuestion {
  id: string;
  type: 'prefilled' | 'custom' | 'multiple_choice';
  label: string;
  required: boolean;
}

export default function LeadStep4InstantForm() {
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('more_volume');
  const [smsVerification, setSmsVerification] = useState(false);
  const [privacyUrl, setPrivacyUrl] = useState('');
  const [thankYouHeadline, setThankYouHeadline] = useState('Thank you for your interest!');
  const [thankYouDesc, setThankYouDesc] = useState('We will contact you shortly.');
  const [thankYouAction, setThankYouAction] = useState('visit_website');
  const [thankYouUrl, setThankYouUrl] = useState('');

  const [questions, setQuestions] = useState<FormQuestion[]>([
    { id: '1', type: 'prefilled', label: 'Full Name', required: true },
    { id: '2', type: 'prefilled', label: 'Email', required: true },
    { id: '3', type: 'prefilled', label: 'Phone Number', required: true },
    { id: '4', type: 'prefilled', label: 'City', required: false },
  ]);

  const addQuestion = (type: FormQuestion['type']) => {
    setQuestions([...questions, { id: Date.now().toString(), type, label: '', required: false }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, label: string) => {
    setQuestions(questions.map((q) => q.id === id ? { ...q, label } : q));
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold uppercase tracking-wide mb-1 text-foreground font-saira-condensed">INSTANT FORM BUILDER</h2>
        <p className="text-sm text-muted-foreground font-sans">Configure the lead form users will fill out on Meta platforms.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start max-w-[1400px]">
        {/* Form Builder */}
        <div className="xl:col-span-2 space-y-8">
          {/* Form Name */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">FORM NAME</h3>
            </div>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Q2 Lead Gen - Test Drive Booking"
              className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
            />
          </div>

          {/* Form Type */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">FORM TYPE</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 font-sans">Choose how the form optimizes for lead quality vs. volume.</p>

            <div className="flex gap-4 mb-6">
              <div
                onClick={() => setFormType('more_volume')}
                className={`flex-1 border p-5 cursor-pointer transition-all ${formType === 'more_volume' ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'}`}
              >
                <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">More Volume</h4>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">Quick completion with pre-filled fields. Higher quantity, may have lower quality.</p>
              </div>
              <div
                onClick={() => setFormType('higher_intent')}
                className={`flex-1 border p-5 cursor-pointer transition-all ${formType === 'higher_intent' ? 'border-2 border-foreground shadow-sm' : 'border-border hover:border-muted-foreground/40'}`}
              >
                <h4 className="text-sm font-semibold text-foreground mb-1 font-sans">Higher Intent</h4>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">Adds a review step before submission. Better quality leads, fewer submissions.</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted border border-border">
              <div>
                <h4 className="text-sm font-medium text-foreground font-sans">SMS verification</h4>
                <p className="text-xs text-muted-foreground font-sans">Verify phone numbers to improve lead quality</p>
              </div>
              <Toggle checked={smsVerification} onChange={setSmsVerification} />
            </div>
          </div>

          {/* Questions */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand" />
                <h3 className="text-base font-semibold uppercase font-saira-condensed">FORM QUESTIONS</h3>
              </div>
              <span className="text-xs text-muted-foreground font-sans">{questions.length} questions</span>
            </div>

            <div className="space-y-3 mb-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="flex items-center gap-3 p-3 border border-border bg-muted group hover:bg-background transition-colors">
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
                  <span className="text-xs font-bold text-muted-foreground w-6">{idx + 1}</span>
                  {q.type === 'prefilled' ? (
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-sm text-foreground font-sans">{q.label}</span>
                      <span className="text-[10px] bg-info-muted text-info px-2 py-0.5 font-medium border border-info-border">Pre-filled</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={q.label}
                      onChange={(e) => updateQuestion(q.id, e.target.value)}
                      placeholder="Enter question..."
                      className="flex-1 bg-transparent border-none text-sm text-foreground focus:outline-none font-sans placeholder:text-muted-foreground"
                    />
                  )}
                  {q.required && <span className="text-[10px] text-destructive font-bold">Required</span>}
                  <button onClick={() => removeQuestion(q.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addQuestion('custom')}
                className="flex items-center gap-2 px-4 py-2 border border-border text-xs font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"
              >
                <Plus className="w-3.5 h-3.5" /> CUSTOM QUESTION
              </button>
              <button
                onClick={() => addQuestion('multiple_choice')}
                className="flex items-center gap-2 px-4 py-2 border border-border text-xs font-bold uppercase tracking-wide hover:bg-muted font-saira-condensed"
              >
                <Plus className="w-3.5 h-3.5" /> MULTIPLE CHOICE
              </button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">PRIVACY POLICY</h3>
              <span className="text-[10px] text-destructive font-bold uppercase">Required</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-foreground font-sans">Privacy policy URL</label>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <input
              type="url"
              value={privacyUrl}
              onChange={(e) => setPrivacyUrl(e.target.value)}
              placeholder="https://yourcompany.com/privacy"
              className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
            />
          </div>

          {/* Thank You Screen */}
          <div className="bg-card border border-border p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-brand" />
              <h3 className="text-base font-semibold uppercase font-saira-condensed">THANK YOU SCREEN</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-sans">Headline</label>
                <input
                  type="text"
                  value={thankYouHeadline}
                  onChange={(e) => setThankYouHeadline(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-sans">Description</label>
                <textarea
                  rows={2}
                  value={thankYouDesc}
                  onChange={(e) => setThankYouDesc(e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 resize-none font-normal font-sans"
                />
              </div>
              <BrandSelect
                label="Action button"
                options={[
                  { value: 'visit_website', label: 'Visit website' },
                  { value: 'call_business', label: 'Call business' },
                  { value: 'download', label: 'Download' },
                ]}
                value={thankYouAction}
                onChange={setThankYouAction}
                className="mb-0"
              />
              {thankYouAction === 'visit_website' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 font-sans">Website URL</label>
                  <input
                    type="url"
                    value={thankYouUrl}
                    onChange={(e) => setThankYouUrl(e.target.value)}
                    placeholder="https://yourcompany.com/thank-you"
                    className="w-full bg-background border border-border text-foreground text-sm focus:ring-1 focus:ring-foreground focus:border-foreground block p-3 font-normal font-sans placeholder:text-muted-foreground"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Preview */}
        <div className="xl:col-span-1">
          <div className="bg-surface p-6 sticky top-20">
            <span className="text-sm font-medium font-sans mb-4 block">Form preview</span>
            <div className="bg-card shadow-sm border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-brand-dark p-4 text-center">
                <div className="w-10 h-10 bg-destructive rounded-full mx-auto mb-2 flex items-center justify-center text-destructive-foreground text-sm font-bold">M</div>
                <h4 className="text-brand-foreground text-sm font-semibold font-sans">Mahindra</h4>
              </div>

              {/* Form */}
              <div className="p-4 space-y-4">
                <h3 className="text-base font-semibold text-foreground font-sans">Get a free quote</h3>
                <p className="text-xs text-muted-foreground font-sans">Fill in your details and we'll get back to you.</p>
                
                {questions.map((q) => (
                  <div key={q.id}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1 font-sans">
                      {q.label || 'Question'} {q.required && <span className="text-destructive">*</span>}
                    </label>
                    <div className="w-full h-8 bg-muted border border-border"></div>
                  </div>
                ))}

                <div className="pt-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans mb-3">
                    <Shield className="w-3 h-3" />
                    By submitting, you agree to our privacy policy
                  </div>
                  <button className="w-full py-2.5 bg-info text-info-foreground text-sm font-semibold">Submit</button>
                </div>
              </div>

              {formType === 'higher_intent' && (
                <div className="border-t border-border p-3 bg-warning-muted">
                  <p className="text-[10px] text-warning-foreground font-sans text-center">Higher Intent: Users will review info before submitting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown } from 'lucide-react';
import LeadStep1Campaign from './lead-gen/LeadStep1Campaign';
import LeadStep2AdSet from './lead-gen/LeadStep2AdSet';
import LeadStep3AdCreative from './lead-gen/LeadStep3AdCreative';
import LeadStep4InstantForm from './lead-gen/LeadStep4InstantForm';

const steps = [
  { number: 1, label: 'CAMPAIGN SETUP' },
  { number: 2, label: 'AD SET' },
  { number: 3, label: 'AD CREATIVE' },
  { number: 4, label: 'INSTANT FORM' },
];

export default function LeadGenFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else console.log('Publishing lead gen campaign...');
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepStatus = (stepNumber: number) => {
    if (currentStep > stepNumber) return 'completed';
    if (currentStep === stepNumber) return 'active';
    return 'pending';
  };

  const completionPercent = Math.round((currentStep / 4) * 100);
  const circumference = 2 * Math.PI * 20;
  const dashOffset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="p-8 max-w-[1600px] mx-auto w-full pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium font-sans">
          <span>Amplifyit</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-gray-400" />
          <span>Campaign Setup</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-gray-400" />
          <span className="text-gray-900">Lead Generation</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="hover:bg-gray-100 transition-colors p-1">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 uppercase tracking-tight font-saira-condensed">
                META LEAD GENERATION CAMPAIGN
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-sans">Collect leads via Instant Forms, Website, Messenger, or Calls</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-[#34CC32] hover:bg-[#2db32c] text-white px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors shadow-sm uppercase font-saira-condensed">
              SAVE & EXIT
            </button>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle cx="24" cy="24" r="20" stroke="#34CC32" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
              </svg>
              <span className="absolute text-[10px] font-bold">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center w-full mb-12 relative">
          <div className="flex items-center gap-0 w-full border-b border-gray-200">
            {steps.map((step) => {
              const status = getStepStatus(step.number);
              return (
                <div
                  key={step.number}
                  onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                  className={`flex items-center gap-3 py-4 pr-12 border-b-2 transition-colors relative cursor-pointer ${
                    status === 'active' ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    status === 'completed' ? 'bg-[#34CC32] text-white' :
                    status === 'active' ? 'bg-black text-white' :
                    'bg-gray-300 text-white'
                  }`}>
                    {status === 'completed' ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`text-xs font-medium tracking-wide uppercase font-saira-condensed ${
                    status === 'active' || status === 'completed' ? 'text-black' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && <LeadStep1Campaign />}
        {currentStep === 2 && <LeadStep2AdSet />}
        {currentStep === 3 && <LeadStep3AdCreative />}
        {currentStep === 4 && <LeadStep4InstantForm />}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 px-8 flex items-center justify-between z-30 h-20">
        <div className="flex items-center gap-2 text-[#34CC32] text-sm font-medium">
          <CheckCircle2 className="w-5 h-5" />
          <span>Auto-saved</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`bg-white border border-gray-200 hover:bg-gray-50 text-black px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> PREVIOUS
          </button>
          <button
            onClick={handleNext}
            className={`text-white px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${
              currentStep === 4 ? 'bg-[#34CC32] hover:bg-[#2db32c]' : 'bg-[#050B14] hover:bg-black'
            }`}
          >
            {currentStep === 4 ? 'SUBMIT FOR APPROVAL' : 'NEXT'} {currentStep !== 4 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

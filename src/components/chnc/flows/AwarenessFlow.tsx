import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown } from 'lucide-react';
import AwarenessStep1Campaign from './awareness/AwarenessStep1Campaign';
import AwarenessStep2AdSet from './awareness/AwarenessStep2AdSet';
import AwarenessStep3Ad from './awareness/AwarenessStep3Ad';

const steps = [
  { number: 1, label: 'CAMPAIGN' },
  { number: 2, label: 'AD SET' },
  { number: 3, label: 'AD' },
];

export default function AwarenessFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else console.log('Publishing awareness campaign...');
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepStatus = (stepNumber: number) => {
    if (currentStep > stepNumber) return 'completed';
    if (currentStep === stepNumber) return 'active';
    return 'pending';
  };

  const completionPercent = Math.round((currentStep / totalSteps) * 100);
  const circumference = 2 * Math.PI * 20;
  const dashOffset = circumference - (completionPercent / 100) * circumference;

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="p-8 max-w-[1600px] mx-auto w-full pb-32">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium font-sans">
          <span>Amplifyit</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
          <span>Campaign Setup</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
          <span className="text-foreground">Awareness</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="hover:bg-muted transition-colors p-1">
              <ArrowLeft className="w-6 h-6 text-foreground/70" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground uppercase tracking-tight font-saira-condensed">
                META AWARENESS CAMPAIGN
              </h1>
              <p className="text-xs text-muted-foreground mt-1 font-sans">Maximize reach, impressions, and ad recall for your brand</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-brand hover:bg-brand-hover text-brand-foreground px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors shadow-sm uppercase font-saira-condensed">
              SAVE & EXIT
            </button>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="hsl(var(--border))" strokeWidth="4" fill="none" />
                <circle cx="24" cy="24" r="20" stroke="hsl(var(--brand))" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
              </svg>
              <span className="absolute text-[10px] font-bold">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center w-full mb-12 relative">
          <div className="flex items-center gap-0 w-full border-b border-border">
            {steps.map((step) => {
              const status = getStepStatus(step.number);
              return (
                <div
                  key={step.number}
                  onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                  className={`flex items-center gap-3 py-4 pr-12 border-b-2 transition-colors relative cursor-pointer ${
                    status === 'active' ? 'border-foreground' : 'border-transparent'
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    status === 'completed' ? 'bg-brand text-brand-foreground' :
                    status === 'active' ? 'bg-foreground text-background' :
                    'bg-muted-foreground/40 text-background'
                  }`}>
                    {status === 'completed' ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`text-xs font-medium tracking-wide uppercase font-saira-condensed ${
                    status === 'active' || status === 'completed' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && <AwarenessStep1Campaign />}
        {currentStep === 2 && <AwarenessStep2AdSet />}
        {currentStep === 3 && <AwarenessStep3Ad />}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-64 right-0 bg-background border-t border-border p-4 px-8 flex items-center justify-between z-30 h-20">
        <div className="flex items-center gap-2 text-brand text-sm font-medium">
          <CheckCircle2 className="w-5 h-5" />
          <span>Auto-saved</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`bg-background border border-border hover:bg-muted text-foreground px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> PREVIOUS
          </button>
          <button
            onClick={handleNext}
            className={`text-brand-foreground px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${
              currentStep === totalSteps ? 'bg-brand hover:bg-brand-hover' : 'bg-brand-dark hover:bg-brand-dark-hover'
            }`}
          >
            {currentStep === totalSteps ? 'SUBMIT FOR APPROVAL' : 'NEXT'} {currentStep !== totalSteps && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

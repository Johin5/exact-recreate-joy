import { ArrowLeft, ChevronDown, Check, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Step1SelectPlatform from './steps/Step1SelectPlatform';
import Step2CreateCampaign from './steps/Step2CreateCampaign';
import Step3SetupAdSet from './steps/Step3SetupAdSet';
import Step4SetupAd from './steps/Step4SetupAd';

export default function CampaignContent() {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNext = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); else console.log("Publishing campaign..."); };
  const handlePrevious = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const getStepStatus = (stepNumber: number) => {
    if (currentStep > stepNumber) return 'completed';
    if (currentStep === stepNumber) return 'active';
    return 'pending';
  };

  const getHeaderTitle = () => currentStep === 1 ? 'CAMPAIGN - ENGAGEMENT' : 'CAMPAIGN - AWARENESS';

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="p-8 max-w-[1600px] mx-auto w-full pb-32">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium font-sans">
          <span>Setup campaign</span>
          <ChevronDown className="w-3 h-3 -rotate-90 text-muted-foreground/60" />
          <span className="text-foreground">{currentStep === 1 ? 'Campaign - Engagement' : 'Campaign - Awareness'}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="hover:bg-muted transition-colors p-1"><ArrowLeft className="w-6 h-6 text-foreground/70" /></button>
            <h1 className="text-2xl font-semibold text-foreground uppercase tracking-tight font-saira-condensed">{getHeaderTitle()}</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-brand hover:bg-brand-hover text-brand-foreground px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors shadow-sm uppercase font-saira-condensed">SAVE & EXIT</button>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90"><circle cx="24" cy="24" r="20" stroke="hsl(var(--border))" strokeWidth="4" fill="none" /><circle cx="24" cy="24" r="20" stroke="hsl(var(--brand))" strokeWidth="4" fill="none" strokeDasharray="126" strokeDashoffset={120} /></svg>
              <span className="absolute text-[10px] font-bold">5%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full mb-12 relative">
          <div className="flex items-center gap-0 w-full border-b border-border">
            {[{ number: 1, label: 'STEP01' }, { number: 2, label: 'CREATE CAMPAIGN' }, { number: 3, label: 'SETUP AD SET' }, { number: 4, label: 'SETUP AD' }].map((step) => {
              const status = getStepStatus(step.number);
              return (
                <div key={step.number} className={`flex items-center gap-3 py-4 pr-12 border-b-2 transition-colors relative ${status === 'active' ? 'border-foreground' : 'border-transparent'}`}>
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${status === 'completed' ? 'bg-brand text-brand-foreground' : status === 'active' ? 'bg-foreground text-background' : 'bg-muted-foreground/40 text-background'}`}>
                    {status === 'completed' ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`text-xs font-medium tracking-wide uppercase font-saira-condensed ${status === 'active' || status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {currentStep === 1 && <Step1SelectPlatform />}
        {currentStep === 2 && <Step2CreateCampaign />}
        {currentStep === 3 && <Step3SetupAdSet />}
        {currentStep === 4 && <Step4SetupAd />}
      </div>

      <div className="fixed bottom-0 left-64 right-0 bg-background border-t border-border p-4 px-8 flex items-center justify-between z-30 h-20">
        <div className="flex items-center gap-2 text-brand text-sm font-medium"><CheckCircle2 className="w-5 h-5" /><span>Last saved 14:05 PM</span></div>
        <div className="flex items-center gap-4">
          <button onClick={handlePrevious} disabled={currentStep === 1} className={`bg-background border border-border hover:bg-muted text-foreground px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}><ArrowLeft className="w-4 h-4" /> PREVIOUS</button>
          <button onClick={handleNext} className={`text-brand-foreground px-8 py-3 text-xs font-semibold tracking-widest flex items-center gap-2 transition-colors uppercase font-saira-condensed ${currentStep === 4 ? 'bg-brand hover:bg-brand-hover' : 'bg-brand-dark hover:bg-brand-dark-hover'}`}>{currentStep === 4 ? 'PUBLISH' : 'NEXT'} {currentStep !== 4 && <ArrowRight className="w-4 h-4" />}</button>
        </div>
      </div>
    </div>
  );
}
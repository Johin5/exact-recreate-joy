import { X, CheckCircle2, XCircle, AlertTriangle, Eye, DollarSign, Target, Calendar, Image } from 'lucide-react';

interface ApprovalModalProps {
  campaign: {
    id: string;
    name: string;
    brand: string;
    platform: string;
    budget: string;
    objective: string;
    assets: number;
    createdAt: string;
  };
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalModal({ campaign, onClose, onApprove, onReject }: ApprovalModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 font-saira-condensed uppercase">REVIEW & APPROVE</h2>
              <p className="text-xs text-gray-500 font-sans">Nothing goes live without your approval</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Campaign Summary */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 font-saira-condensed mb-1">{campaign.name}</h3>
            <p className="text-sm text-gray-500 font-sans">{campaign.brand}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 font-saira-condensed">Objective</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{campaign.objective}</span>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 font-saira-condensed">Budget</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{campaign.budget}</span>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 font-saira-condensed">Created</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{campaign.createdAt}</span>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Image className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 font-saira-condensed">Assets</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{campaign.assets} files</span>
            </div>
          </div>

          {/* Platform */}
          <div className="bg-gray-50 p-4 border border-gray-200">
            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 font-saira-condensed block mb-2">Publishing to</span>
            <span className="text-sm font-semibold text-gray-900">{campaign.platform}</span>
          </div>

          {/* Checklist */}
          <div className="border border-gray-200 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-gray-900 font-saira-condensed mb-4">PRE-LAUNCH CHECKLIST</h4>
            <div className="space-y-3">
              {['Brand assets approved', 'Target audience configured', 'Budget within allocation', 'Ad copy reviewed', 'Landing page verified'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#34CC32]" />
                  <span className="text-sm text-gray-700 font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-1">Human-in-the-loop</h4>
              <p className="text-xs text-amber-700 font-sans leading-relaxed">This campaign will not go live until you explicitly approve it. Review all details carefully before proceeding.</p>
            </div>
          </div>

          {/* Add note */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 font-saira-condensed mb-2">Add a note (optional)</label>
            <textarea
              rows={3}
              placeholder="Leave feedback or instructions..."
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-1 focus:ring-black focus:border-black p-3 resize-none font-sans placeholder-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onReject}
            className="flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wide hover:bg-red-50 transition-colors font-saira-condensed"
          >
            <XCircle className="w-4 h-4" /> REJECT
          </button>
          <button
            onClick={onApprove}
            className="flex items-center gap-2 px-8 py-3 bg-[#34CC32] hover:bg-[#2db32c] text-white text-xs font-bold uppercase tracking-wide transition-colors font-saira-condensed shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" /> APPROVE & LAUNCH
          </button>
        </div>
      </div>
    </div>
  );
}

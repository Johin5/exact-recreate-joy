import { useState } from 'react';
import { Search, SlidersHorizontal, Star, Trash2, Mail, Check, AlertCircle, MoreHorizontal, Paperclip, Smile, Send, ThumbsUp, MessageCircle, Share2, ChevronDown, Info, Heart } from 'lucide-react';

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === 'messenger') return <div className="w-4 h-4 bg-[#34CC32] rounded-full flex items-center justify-center border border-white"><svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white"><path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.445 5.508 3.738 7.228-.164.887-.98 3.088-1.005 3.147-.04.095-.008.206.078.266.046.032.1.048.154.048.04 0 .08-.009.117-.027.56-.27 2.65-1.29 3.718-1.84 1.03.284 2.12.436 3.24.436 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2z" /></svg></div>;
  if (platform === 'instagram') return <div className="w-4 h-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center border border-white"><svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="none" /></svg></div>;
  if (platform === 'facebook') return <div className="w-4 h-4 bg-[#34CC32] rounded-full flex items-center justify-center border border-white"><svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>;
  return null;
};

const TABS = [
  { id: 'all', label: 'All messages', count: 9, color: 'bg-[#B91C1C]' },
  { id: 'messenger', label: 'Messenger', count: 7, color: 'bg-[#B91C1C]' },
  { id: 'instagram', label: 'Instagram', count: 2, color: 'bg-[#B91C1C]' },
  { id: 'fb-comments', label: 'Facebook comments', count: '9+', color: 'bg-[#B91C1C]' },
  { id: 'ig-comments', label: 'Instagram comments', count: '9+', color: 'bg-[#B91C1C]' },
];

const CONVERSATIONS = [
  { id: 1, name: 'Robert Pelant', avatar: 'https://picsum.photos/seed/robert/40/40', platform: 'messenger', date: '5/20/24', preview: "You: Hi, thanks for contacting us.", isUnread: false, type: 'message' },
  { id: 2, name: 'Matt Reviews', avatar: 'https://picsum.photos/seed/matt/40/40', platform: 'messenger', date: '4/18/24', preview: 'We help businesses to get more 5-star...', isUnread: true, type: 'message' },
  { id: 4, name: 'K.🥀', avatar: 'https://picsum.photos/seed/k/40/40', platform: 'instagram', date: '6:44 PM', preview: 'Heyy', isUnread: true, type: 'message' },
  { id: 5, name: 'Gayatri Soares', avatar: 'https://picsum.photos/seed/gayatri/40/40', platform: 'instagram', date: '1:59 PM', preview: 'You have an upcoming appointment', tag: 'Priority', isUnread: true, type: 'message' },
];

export default function Inbox() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedId, setSelectedId] = useState<number>(1);

  const getListData = () => {
    if (activeTab === 'all') return CONVERSATIONS;
    if (activeTab === 'messenger') return CONVERSATIONS.filter(c => c.platform === 'messenger');
    if (activeTab === 'instagram') return CONVERSATIONS.filter(c => c.platform === 'instagram');
    return [];
  };

  const listData = getListData();
  const selectedItem = listData.find(item => item.id === selectedId) || listData[0];

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="flex items-center px-4 border-b border-gray-200 bg-white overflow-x-auto shrink-0">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-[#34CC32] text-[#34CC32] bg-[#34CC32]/10' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
            {tab.label}
            {tab.count && <span className={`px-1.5 py-0.5 text-[10px] rounded-full text-white ${tab.color} font-bold`}>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[350px] border-r border-gray-200 flex flex-col bg-white shrink-0">
          <div className="p-3 space-y-3 border-b border-gray-100">
            <div className="flex gap-2">
              <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-[#34CC32] placeholder-gray-400" /></div>
              <button className="px-3 py-2 border border-gray-200 rounded flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><SlidersHorizontal className="w-4 h-4" />Manage</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {listData.map((item) => (
              <div key={item.id} onClick={() => setSelectedId(item.id)} className={`p-4 flex gap-3 cursor-pointer border-l-4 transition-colors hover:bg-gray-50 ${selectedId === item.id ? 'bg-[#34CC32]/10 border-[#34CC32]' : 'border-transparent'}`}>
                <div className="relative shrink-0"><img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" /><div className="absolute -bottom-1 -right-1"><PlatformIcon platform={item.platform} /></div></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5"><h3 className={`text-sm truncate pr-2 ${item.isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>{item.name}</h3><span className="text-[11px] text-gray-500 whitespace-nowrap">{item.date}</span></div>
                  <p className={`text-xs truncate ${item.isUnread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>{item.preview}</p>
                  {(item as any).tag && <span className="inline-block mt-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded font-medium">{(item as any).tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white min-w-0">
          {selectedItem ? (
            <>
              <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden"><img src={selectedItem.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>
                  <div><h2 className="text-base font-bold text-gray-900">{selectedItem.name}</h2><div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700"><span>Assign this conversation</span><ChevronDown className="w-3 h-3" /></div></div>
                </div>
                <div className="flex items-center border border-gray-200 rounded">
                  <button className="p-2 hover:bg-gray-50 text-gray-600 border-r border-gray-200"><AlertCircle className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-gray-50 text-gray-600 border-r border-gray-200"><Trash2 className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-gray-50 text-gray-600 border-r border-gray-200"><Star className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-gray-50 text-gray-600"><Check className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                <div className="text-center text-[10px] text-gray-400 mb-6">5/20/24, 12:13 AM</div>
                <div className="flex gap-3 justify-end mb-2">
                  <div className="flex flex-col items-end max-w-[70%]">
                    <div className="bg-[#34CC32] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed">Hi, thanks for contacting us. We've received your message and appreciate you reaching out.</div>
                    <div className="flex items-center gap-1 mt-1"><span className="text-[10px] text-gray-500">Sent by Automated Response</span><Info className="w-3 h-3 text-gray-400" /></div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">You are no longer able to send messages to this person. <a href="#" className="text-[#34CC32] hover:underline">Learn more.</a></p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500"><p>Select a conversation to view details</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

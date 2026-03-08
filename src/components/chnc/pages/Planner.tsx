import { ChevronLeft, ChevronRight, ChevronDown, Facebook, Instagram, Image as ImageIcon, Play, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Planner() {
  const [view, setView] = useState<'week' | 'month'>('month');

  const weekDays = [
    { day: 'Sun', date: 22, posts: [] as any[] },
    { day: 'Mon', date: 23, posts: [{ id: 1, time: '1:17 PM', type: 'video', platform: 'facebook', thumbnail: 'https://picsum.photos/seed/post1/300/160' }, { id: 2, time: '1:17 PM', type: 'video', platform: 'instagram', thumbnail: 'https://picsum.photos/seed/post2/300/160' }] },
    { day: 'Tue', date: 24, posts: [{ id: 3, time: '11:44 AM', type: 'image', platform: 'facebook', thumbnail: 'https://picsum.photos/seed/post3/300/160' }] },
    { day: 'Wed', date: 25, posts: [] as any[] },
    { day: 'Thu', date: 26, posts: [] as any[] },
    { day: 'Fri', date: 27, isToday: true, posts: [] as any[] },
    { day: 'Sat', date: 28, posts: [] as any[] },
  ];

  const monthDays = Array.from({ length: 28 }, (_, i) => {
    const date = i + 1;
    let events: any[] = [];
    if (date === 3) events.push({ time: '9:00 AM', platform: 'instagram' });
    if (date === 12) events.push({ time: '1:30 PM', platform: 'facebook' });
    if (date === 18) events.push({ time: '11:00 AM', platform: 'instagram' });
    if (date === 23) events.push({ time: '1:17 PM', platform: 'facebook' });
    if (date === 24) events.push({ time: '11:44 AM', platform: 'facebook' });
    if (date === 27) events.push({ time: '4:00 PM', platform: 'instagram' });
    return { date, isToday: date === 27, events };
  });

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-md p-1">
            <button onClick={() => setView('week')} className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${view === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Week</button>
            <button onClick={() => setView('month')} className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${view === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Month</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronLeft className="w-5 h-5" /></button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded border border-gray-300">Today</button>
            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-500"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 font-saira-condensed">{view === 'week' ? 'Feb - Mar 2026' : 'February 2026'}</h2>
        <div className="w-[200px]"></div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="grid grid-cols-7 border-b border-gray-200 shrink-0">
          {view === 'week'
            ? weekDays.map((day) => (<div key={day.day} className="py-3 text-center text-sm font-medium text-gray-500">{day.day} {day.date}</div>))
            : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (<div key={day} className="py-3 text-center text-sm font-medium text-gray-500">{day}</div>))
          }
        </div>

        {view === 'month' && (
          <div className="flex-1 grid grid-cols-7 grid-rows-4">
            {monthDays.map((day) => (
              <div key={day.date} className="border-r border-b border-gray-100 p-2 relative flex flex-col bg-white">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium ${day.isToday ? 'bg-[#34CC32] text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-gray-700'}`}>{day.date}</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
                  {day.events.map((event: any, idx: number) => (
                    <div key={idx} className="bg-[#34CC32]/10 hover:bg-[#34CC32]/20 transition-colors p-1.5 flex items-center justify-between cursor-pointer">
                      <span className="text-[11px] font-bold text-[#00695C]">{event.time}</span>
                      {event.platform === 'facebook' ? <Facebook className="w-3 h-3 text-[#1877F2] fill-[#1877F2]" /> : <Instagram className="w-3 h-3 text-[#E1306C]" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'week' && (
          <div className="flex-1 flex overflow-hidden">
            {weekDays.map((day, index) => (
              <div key={index} className={`flex-1 flex flex-col border-r border-gray-100 min-w-[150px] relative ${day.isToday ? 'bg-[#34CC32]/5' : ''}`}>
                <div className="flex-1 p-3 relative overflow-y-auto">
                  {day.isToday && (<div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#34CC32] -ml-[1px] z-10"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#34CC32]"></div></div>)}
                  <div className="flex flex-col gap-3">
                    {day.posts.map((post: any) => (
                      <div key={post.id} className="bg-[#34CC32]/10 p-3 border border-[#34CC32]/20">
                        <div className="flex items-center gap-2 mb-2 text-[#00695C]"><Calendar className="w-3.5 h-3.5" /><span className="text-xs font-bold font-sans">{post.time}</span></div>
                        <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
                          <img src={post.thumbnail} alt="Post thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-2 left-2">{post.type === 'video' ? <Play className="w-4 h-4 text-white fill-white drop-shadow-md" /> : <ImageIcon className="w-4 h-4 text-white drop-shadow-md" />}</div>
                          <div className="absolute bottom-2 right-2">{post.platform === 'facebook' ? <div className="w-4 h-4 bg-[#1877F2] rounded-full flex items-center justify-center text-white"><Facebook className="w-3 h-3 fill-white" /></div> : <div className="w-4 h-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white"><Instagram className="w-3 h-3" /></div>}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

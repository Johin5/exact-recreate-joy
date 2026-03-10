import {
  LayoutGrid, MapPin, PenTool, Megaphone, Share2, Users, FileText, Bot,
  MessageSquare, Search, FileSpreadsheet, FileCheck, DollarSign, ChevronDown, ChevronRight, LogOut
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutGrid, label: 'INSIGHT', id: 'insight' },
  { icon: MapPin, label: 'LOCATEIT', id: 'locateit', hasSubmenu: true },
  { icon: PenTool, label: 'CREATEIT', id: 'createit', hasSubmenu: true },
  { icon: Megaphone, label: 'AMPLIFYIT', id: 'amplifyit', submenu: [
    { label: 'CAMPAIGN - LEADS', id: 'amp-setup' },
    { label: 'CAMPAIGN - AWARENESS', id: 'amp-awareness' },
    { label: 'CAMPAIGN PIPELINE', id: 'amp-mgmt' },
    { label: 'DETAILED SETUP', id: 'amp-insight' },
  ]},
  { icon: LayoutGrid, label: 'SOCIALISEIT', id: 'socialiseit', submenu: [
    { label: 'INSIGHTIT', id: 'soc-insightit' },
    { label: 'CONTENT', id: 'soc-content' },
    { label: 'CAMPAIGN MANAGE', id: 'soc-campaign-manage' },
    { label: 'LEAD CENTER', id: 'soc-lead-center' },
    { label: 'INBOX', id: 'soc-inbox' },
    { label: 'PLANNER', id: 'soc-planner' },
  ]},
  { icon: Users, label: 'INFLUENCEIT', id: 'influenceit', hasSubmenu: true },
  { icon: FileText, label: 'SCRIPTIT', id: 'scriptit', hasSubmenu: true },
  { icon: Bot, label: 'AIGENIT', id: 'aigenit', hasSubmenu: true },
  { icon: MessageSquare, label: 'MESSAGEIT', id: 'messageit', hasSubmenu: true },
  { icon: Search, label: 'SEARCHIT', id: 'searchit', hasSubmenu: true },
  { icon: FileSpreadsheet, label: 'PROPOSEIT', id: 'proposeit', hasSubmenu: true },
  { icon: FileCheck, label: 'INVOICEIT', id: 'invoiceit', hasSubmenu: true },
  { icon: DollarSign, label: 'PRICEIT', id: 'priceit', hasSubmenu: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const isItemActive = (item: any) => {
    if (item.id === activePage) return true;
    if (item.submenu) return item.submenu.some((sub: any) => sub.id === activePage);
    return false;
  };

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-20 border-r border-sidebar-border scrollbar-thin scrollbar-thumb-sidebar-border">
      <div className="p-6 pb-4">
        <h1 className="text-brand font-archivo font-extrabold text-[47.89px] leading-[21.37px] tracking-[-1.39px]">CHNC</h1>
        <p className="text-sidebar-foreground/60 uppercase mt-6 font-archivo font-semibold text-[5.95px] leading-[5.95px] tracking-[1.81px]">The Opportunity Creators</p>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center justify-between bg-sidebar-accent p-3 border border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-destructive flex items-center justify-center text-destructive-foreground font-bold text-xs">M</div>
            <div className="flex flex-col">
              <span className="text-sidebar-accent-foreground text-sm font-semibold">Mahindra & Mah..</span>
              <span className="text-xs text-sidebar-foreground/60">Automobile Ind</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {menuItems.map((item) => {
          const active = isItemActive(item);
          return (
            <div key={item.id}>
              <div
                onClick={() => !item.submenu && onNavigate(item.id)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors
                  ${active ? 'bg-brand text-sidebar-primary-foreground font-medium' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium tracking-wide font-saira-condensed">{item.label}</span>
                </div>
                {(item.hasSubmenu || item.submenu) && (
                  <ChevronDown className={`w-4 h-4 ${active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/40'}`} />
                )}
              </div>

              {item.submenu && (
                <div className="mt-1 mb-2 ml-4 pl-4 border-l border-sidebar-border space-y-1">
                  {item.submenu.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => onNavigate(sub.id)}
                      className={`px-4 py-2 text-xs cursor-pointer transition-colors font-saira-condensed font-medium
                        ${activePage === sub.id ? 'text-sidebar-accent-foreground bg-sidebar-accent/50' : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'}
                      `}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button className="w-full py-3 border border-sidebar-accent-foreground/20 text-sidebar-accent-foreground text-xs font-medium uppercase tracking-wider hover:bg-sidebar-accent-foreground/5 transition-colors font-saira-condensed">
          Upgrade Now
        </button>
        <div className="flex items-center gap-2 pt-4 border-t border-sidebar-border">
          <div className="w-5 h-5 bg-sidebar-accent-foreground flex items-center justify-center">
            <div className="w-3 h-3 bg-sidebar transform rotate-45"></div>
          </div>
          <span className="text-sidebar-accent-foreground font-bold text-sm">ConvergenSEE</span>
          <span className="text-sidebar-foreground/40 text-xs ml-auto">©2025</span>
        </div>
      </div>
    </div>
  );
}
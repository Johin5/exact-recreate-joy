import { Search, Sun, Bell, HelpCircle, Settings, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="p-2 hover:bg-muted lg:hidden">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-muted-foreground/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-muted-foreground">
          <button className="hover:text-foreground"><Sun className="w-5 h-5" /></button>
          <button className="hover:text-foreground relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive border-2 border-background"></span>
          </button>
          <button className="hover:text-foreground"><HelpCircle className="w-5 h-5" /></button>
          <button className="hover:text-foreground"><Settings className="w-5 h-5" /></button>
        </div>

        <div className="h-8 w-px bg-border mx-2"></div>

        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/sledge/100/100" alt="User" className="w-9 h-9 object-cover border border-border" referrerPolicy="no-referrer" />
          <div className="hidden sm:block text-right">
            <div className="text-sm font-bold text-foreground">Sledge Hammer</div>
            <div className="text-xs text-muted-foreground">sledge@gmail.com</div>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Menu</span>
            <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2"/><circle cx="8" cy="2" r="2"/><circle cx="14" cy="2" r="2"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
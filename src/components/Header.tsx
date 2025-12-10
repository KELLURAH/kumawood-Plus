
import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  MonitorPlay, 
  User as UserIcon, 
  Users, 
  CreditCard, 
  Ticket, 
  Heart, 
  History, 
  Shield, 
  Smartphone, 
  Globe, 
  HelpCircle, 
  AlertTriangle, 
  LogOut,
  Receipt,
  Film,
  Menu,
  Clapperboard,
  X
} from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
  onSearch: (query: string) => void;
  isSearching: boolean;
  onOpenMenu: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSearch, isSearching, onOpenMenu, onLogout }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoviesMenuOpen, setIsMoviesMenuOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const movieCategories = [
    "Ghanaian Movies",
    "African Movies",
    "Ghanaian Series",
    "African Series",
    "Skits & Short Clips",
    "Documentaries",
    "Kids",
    "Events"
  ];

  const menuGroups = [
    {
      label: 'Account',
      items: [
        { icon: UserIcon, label: 'My Profile' },
        { icon: Users, label: 'Manage Profiles' },
        { icon: CreditCard, label: 'Subscription Plan' },
        { icon: Receipt, label: 'Payments & Billing' },
        { icon: Ticket, label: 'Redeem Voucher' },
      ]
    },
    {
      label: 'Library',
      items: [
        { icon: Heart, label: 'Favorites' },
        { icon: History, label: 'Watch History' },
      ]
    },
    {
      label: 'Settings',
      items: [
        { icon: Shield, label: 'Parental Controls' },
        { icon: Smartphone, label: 'Device Management' },
        { icon: Bell, label: 'Notifications' },
        { icon: Globe, label: 'Language & Subtitles' },
      ]
    },
    {
      label: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center' },
        { icon: AlertTriangle, label: 'Report a Problem' },
      ]
    }
  ];

  return (
    <div className="flex items-center justify-between py-4 md:py-6 mb-2 relative z-40 gap-4">
      
      {/* Click Backdrop for closing menus */}
      {(isProfileOpen || isMoviesMenuOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none" 
          onClick={() => {
            setIsProfileOpen(false);
            setIsMoviesMenuOpen(false);
          }} 
        />
      )}

      {/* Left Section: Menu Toggle (Mobile) + Logo (Mobile) + Category Dropdown */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <button 
          onClick={onOpenMenu}
          className="p-2 -ml-2 text-gray-300 hover:text-white md:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Logo */}
        <div className="flex items-center gap-2 md:hidden text-yellow-400 mr-1">
          <Clapperboard size={20} fill="currentColor" />
        </div>

        {/* Category Dropdown */}
        <div className="relative hidden sm:block">
          <div 
            className={`flex items-center gap-2 px-3 py-2 md:px-4 bg-white/5 rounded-full border border-white/5 text-gray-300 hover:text-white cursor-pointer transition-colors ${isMoviesMenuOpen ? 'bg-white/10 text-white border-white/20' : ''}`}
            onClick={() => setIsMoviesMenuOpen(!isMoviesMenuOpen)}
          >
            <span className="text-sm font-medium">Movies</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isMoviesMenuOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Movies Dropdown Menu */}
          <div 
              className={`absolute top-full left-0 mt-3 w-56 bg-[#16181e] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl z-50 transform transition-all duration-200 origin-top-left overflow-hidden ${
                isMoviesMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="p-2 flex flex-col gap-1">
                {movieCategories.map((cat, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    onClick={() => setIsMoviesMenuOpen(false)}
                  >
                    <Film size={14} className="text-gray-500" />
                    {cat}
                  </button>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* Search Bar - Responsive */}
      <div className="flex-1 max-w-2xl md:mx-4 relative group">
        <div className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-blue-400' : 'text-gray-400'}`}>
           {isSearching ? <div className="animate-spin h-3 w-3 md:h-4 md:w-4 border-2 border-blue-400 border-t-transparent rounded-full"/> : <Search size={16} className="md:w-[18px] md:h-[18px]" />}
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#1a1c22] border border-transparent focus:border-white/10 text-gray-300 placeholder-gray-500 text-sm py-2 md:py-3 pl-9 md:pl-12 pr-4 rounded-xl md:rounded-2xl outline-none transition-all focus:bg-[#202229]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-2 text-gray-500">
           <MonitorPlay size={14} />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        
        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 rounded-full hover:bg-white/10 hidden sm:block"
          title="Log Out"
        >
          <LogOut size={20} />
        </button>

        <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10 hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#13151a]"></span>
        </button>

        <div className="relative">
          <div 
            className={`flex items-center gap-2 md:gap-3 bg-white/5 rounded-full p-1 pr-1 md:p-1.5 md:pr-4 border transition-all cursor-pointer ${isProfileOpen ? 'bg-white/10 border-white/20' : 'border-white/5 hover:bg-white/10'}`}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img src={user.avatar} alt={user.name} className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover" />
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
              <p className="text-xs text-yellow-400 font-medium tracking-wide uppercase">{user.status}</p>
            </div>
            <ChevronDown size={14} className={`hidden md:block text-gray-400 ml-1 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Mega Menu Dropdown (Desktop) / Bottom Sheet (Mobile) */}
          <div 
            className={`
              fixed bottom-0 left-0 right-0 md:absolute md:top-full md:bottom-auto md:right-0 md:left-auto 
              md:mt-3 w-full md:w-[340px] 
              bg-[#16181e] border-t md:border border-white/10 
              rounded-t-3xl md:rounded-2xl shadow-2xl backdrop-blur-xl 
              z-50 transform transition-all duration-300 origin-bottom md:origin-top-right overflow-hidden
              ${isProfileOpen 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-full md:translate-y-2 opacity-0 md:opacity-0 md:scale-95 pointer-events-none'
              }
            `}
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
            </div>

            {/* Mobile Header in Sheet */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 md:hidden">
               <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
               <div>
                  <h3 className="text-lg font-bold text-white">{user.name}</h3>
                  <p className="text-xs text-yellow-400 font-medium uppercase">{user.status} Member</p>
               </div>
               <button onClick={() => setIsProfileOpen(false)} className="ml-auto p-2 text-gray-500">
                  <X size={20} />
               </button>
            </div>

            <div className="max-h-[70vh] md:max-h-[80vh] overflow-y-auto no-scrollbar">
              <div className="p-4 grid gap-6">
                {menuGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">{group.label}</h4>
                    <div className="space-y-1">
                      {group.items.map((item, itemIndex) => (
                        <button 
                          key={itemIndex}
                          className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                        >
                          <item.icon size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors md:w-[18px] md:h-[18px]" />
                          <span className="text-base md:text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-xl hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-all group"
                >
                  <LogOut size={20} className="text-gray-500 group-hover:text-red-400 transition-colors md:w-[18px] md:h-[18px]" />
                  <span className="text-base md:text-sm font-medium">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { UserRole } from '../../types';
import { CommandPalette } from '../common/CommandPalette';
import {
  Bell,
  Globe,
  UserCheck,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Plus
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    language,
    setLanguage,
    activeRole,
    setActiveRole,
    activeModule,
    setActiveModule,
    notifications,
    markNotificationRead
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const roleOptions: { key: UserRole; label: string; descEn: string; descAr: string; color: string }[] = [
    { key: 'admin', label: getTranslation(language, 'role_admin'), descEn: 'Full system privileges & configuration', descAr: 'صلاحيات وإشراف كامل على النظام', color: 'bg-rose-500' },
    { key: 'moderator', label: getTranslation(language, 'role_moderator'), descEn: 'Social lead intake & assignment', descAr: 'استقبال عملاء السوشيال وتعيينهم', color: 'bg-blue-500' },
    { key: 'sales', label: getTranslation(language, 'role_sales'), descEn: 'Follow-ups, calls & quotation builder', descAr: 'المتابعة، العروض، وتحويل الحجوزات', color: 'bg-amber-500' },
    { key: 'reservation', label: getTranslation(language, 'role_reservation'), descEn: 'Hotel inventory, contracts & suppliers', descAr: 'إدارة الغرف، العقود والموردين', color: 'bg-teal-500' },
    { key: 'operations', label: getTranslation(language, 'role_operations'), descEn: 'Trip readiness, rooming & manifests', descAr: 'التسكين، المانيفست وجاهزية الرحلات', color: 'bg-purple-500' },
    { key: 'fleet', label: getTranslation(language, 'role_fleet'), descEn: 'Company buses, drivers & costing', descAr: 'الأسطول، السائقين وتكاليف الرحلات', color: 'bg-indigo-500' },
    { key: 'accountant', label: getTranslation(language, 'role_accountant'), descEn: 'Deposits, receivables & P&L', descAr: 'التحصيل، السندات ومجمل الأرباح', color: 'bg-emerald-500' },
    { key: 'manager', label: getTranslation(language, 'role_manager'), descEn: 'High-level executive overview', descAr: 'التقارير والمؤشرات العامة', color: 'bg-slate-700' }
  ];

  const currentRole = roleOptions.find(r => r.key === activeRole) || roleOptions[0];

  return (
    <>
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 flex items-center justify-between z-20 shrink-0 sticky top-0 shadow-xs">
        {/* Zone 1: Sidebar Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Breadcrumb Path */}
          <div className="flex items-center text-xs text-slate-500 gap-1.5 font-medium">
            <span className="text-slate-400 font-semibold tracking-tight">
              {language === 'ar' ? 'Trend Agency' : 'Trend Agency'}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-bold capitalize bg-slate-100 px-2 py-0.5 rounded-md">
              {getTranslation(language, `nav_${activeModule.replace('-', '_')}` as any) || activeModule.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Zone 2: Global Search Trigger */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
              <span className="text-slate-500">
                {language === 'ar' ? 'بحث سريع عن الحجوزات، العملاء، الفنادق...' : 'Quick search bookings, guests, fleet...'}
              </span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
            title={language === 'en' ? 'التحويل للعربية' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <div className={`w-2 h-2 rounded-full ${currentRole.color}`} />
              <span className="hidden sm:inline capitalize">{currentRole.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div
                className={`absolute mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in ${
                  language === 'ar' ? 'left-0' : 'right-0'
                }`}
              >
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {language === 'ar' ? 'محاكاة الأدوار والصلاحيات (8 أدوار)' : 'Role Simulation (8 Profiles)'}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {roleOptions.map(r => (
                    <button
                      key={r.key}
                      onClick={() => {
                        setActiveRole(r.key);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                        activeRole === r.key ? 'bg-amber-50/70 text-amber-950 font-medium' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${r.color}`} />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{r.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {language === 'ar' ? r.descAr : r.descEn}
                        </div>
                      </div>
                      {activeRole === r.key && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifMenu && (
              <div
                className={`absolute mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in ${
                  language === 'ar' ? 'left-0' : 'right-0'
                }`}
              >
                <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'ar' ? 'الإشعارات والتنبيهات' : 'Operational Notifications'}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {language === 'ar' ? `${unreadNotifs} جديد` : `${unreadNotifs} unread`}
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkModule) setActiveModule(n.linkModule);
                        setShowNotifMenu(false);
                      }}
                      className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                        !n.read ? 'bg-amber-50/50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {n.type === 'lead' && <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
                          {n.type === 'payment' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {n.type === 'supplier' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                          {n.type === 'trip' && <Clock className="w-3.5 h-3.5 text-purple-600" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Quick Search / Command Palette */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

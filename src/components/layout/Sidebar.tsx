import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import {
  LayoutDashboard,
  Users,
  Target,
  UserSquare2,
  CalendarCheck,
  FileSpreadsheet,
  Receipt,
  Hotel as HotelIcon,
  FileText,
  CalendarDays,
  Building2,
  ClipboardList,
  BedDouble,
  Users2,
  Bus as BusIcon,
  Navigation,
  UserCheck,
  Calculator,
  Wallet,
  Coins,
  TrendingUp,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Compass,
  ArrowRight
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { activeModule, setActiveModule, language, leads, bookings, tasks, trips } = useApp();

  // Collapsible accordion state for submenus
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    crm: true,
    sales: true,
    reservations: true,
    operations: true,
    transportation: true,
    finance: true
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const pendingLeadsCount = leads.filter(l => l.status === 'New').length;
  const activeBookingsCount = bookings.filter(b => b.status === 'Deposit Paid' || b.status === 'Confirmed').length;
  const pendingTasksCount = tasks.filter(t => t.status === 'Pending').length;

  const handleNavClick = (moduleId: string) => {
    setActiveModule(moduleId);
    if (onClose) onClose();
  };

  const navGroups = [
    {
      key: 'crm',
      title: getTranslation(language, 'nav_crm'),
      icon: Users,
      items: [
        { id: 'leads', label: getTranslation(language, 'nav_leads'), icon: PhoneCall, badge: pendingLeadsCount },
        { id: 'pipeline', label: getTranslation(language, 'nav_pipeline'), icon: Target },
        { id: 'customers', label: getTranslation(language, 'nav_customers'), icon: UserSquare2 },
        { id: 'tasks', label: getTranslation(language, 'nav_followups'), icon: CalendarCheck, badge: pendingTasksCount }
      ]
    },
    {
      key: 'sales',
      title: getTranslation(language, 'nav_sales'),
      icon: Receipt,
      items: [
        { id: 'quotations', label: getTranslation(language, 'nav_quotations'), icon: FileSpreadsheet },
        { id: 'bookings', label: getTranslation(language, 'nav_bookings'), icon: Receipt, badge: activeBookingsCount }
      ]
    },
    {
      key: 'reservations',
      title: getTranslation(language, 'nav_reservations'),
      icon: HotelIcon,
      items: [
        { id: 'hotels', label: getTranslation(language, 'nav_hotels'), icon: HotelIcon },
        { id: 'contracts', label: getTranslation(language, 'nav_contracts'), icon: FileText },
        { id: 'availability', label: getTranslation(language, 'nav_availability'), icon: CalendarDays },
        { id: 'suppliers', label: getTranslation(language, 'nav_suppliers'), icon: Building2 }
      ]
    },
    {
      key: 'operations',
      title: getTranslation(language, 'nav_operations'),
      icon: ClipboardList,
      items: [
        { id: 'operations', label: getTranslation(language, 'nav_operations_board'), icon: ClipboardList },
        { id: 'rooming-lists', label: getTranslation(language, 'nav_rooming_lists'), icon: BedDouble },
        { id: 'passenger-lists', label: getTranslation(language, 'nav_passenger_lists'), icon: Users2 }
      ]
    },
    {
      key: 'transportation',
      title: getTranslation(language, 'nav_transportation'),
      icon: BusIcon,
      items: [
        { id: 'trips', label: getTranslation(language, 'nav_trips'), icon: Navigation, badge: trips.length },
        { id: 'buses', label: getTranslation(language, 'nav_buses'), icon: BusIcon },
        { id: 'drivers', label: getTranslation(language, 'nav_drivers'), icon: UserCheck },
        { id: 'bus-costing', label: getTranslation(language, 'nav_bus_costing'), icon: Calculator }
      ]
    },
    {
      key: 'finance',
      title: getTranslation(language, 'nav_finance'),
      icon: Wallet,
      items: [
        { id: 'payments', label: getTranslation(language, 'nav_payments'), icon: Wallet },
        { id: 'receivables', label: getTranslation(language, 'nav_receivables'), icon: Coins },
        { id: 'profitability', label: getTranslation(language, 'nav_profitability'), icon: TrendingUp }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 ${
          language === 'ar' ? 'right-0' : 'left-0'
        } z-40 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-900 transition-transform duration-200 ease-out shadow-2xl lg:shadow-none ${
          isOpen
            ? 'translate-x-0'
            : language === 'ar'
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-extrabold text-base shadow-md shadow-amber-500/20">
              T
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                <span>{getTranslation(language, 'appName')}</span>
              </div>
              <div className="text-[10px] text-amber-400/90 font-mono tracking-wider font-semibold">
                {language === 'ar' ? 'نظام إدارة السياحة والعمليات' : 'TOURISM CRM & ERP'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3.5 space-y-3.5 text-xs">
          {/* Main Dashboard Link */}
          <div>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                activeModule === 'dashboard'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeModule === 'dashboard' ? 'text-slate-950' : 'text-slate-400'}`} />
              <span className="truncate">{getTranslation(language, 'nav_dashboard')}</span>
            </button>
          </div>

          {/* Grouped Submenus */}
          {navGroups.map(group => {
            const isSectionOpen = openSections[group.key];
            const hasActiveItem = group.items.some(i => i.id === activeModule);

            return (
              <div key={group.key} className="space-y-1">
                <button
                  onClick={() => toggleSection(group.key)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                    hasActiveItem ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <group.icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{group.title}</span>
                  </div>
                  {isSectionOpen ? (
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  )}
                </button>

                {isSectionOpen && (
                  <div className="space-y-0.5 pt-0.5">
                    {group.items.map(item => {
                      const isActive = activeModule === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 text-amber-400 font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-amber-500'
                              : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <item.icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                            <span className="truncate text-xs">{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-800 text-amber-400 font-bold border border-slate-700">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Reports & Audit Trail */}
          <div className="pt-2 border-t border-slate-900 space-y-1">
            <button
              onClick={() => handleNavClick('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer text-xs ${
                activeModule === 'reports'
                  ? 'bg-slate-900 text-amber-400 font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-amber-500'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{getTranslation(language, 'nav_reports')}</span>
            </button>

            <button
              onClick={() => handleNavClick('audit-trail')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer text-xs ${
                activeModule === 'audit-trail'
                  ? 'bg-slate-900 text-amber-400 font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-amber-500'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{getTranslation(language, 'recentActivityTimeline')}</span>
            </button>
          </div>
        </div>

        {/* Footer Fleet Status Card */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-900 text-[11px] space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'ar' ? 'الأسطول: 4 حافلات بالخدمة' : 'Fleet: 4 Buses Active'}</span>
            </div>
            <span className="text-emerald-400 font-mono font-bold">100%</span>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-full" />
          </div>

          <button
            onClick={() => handleNavClick('trips')}
            className="w-full text-center text-slate-400 hover:text-amber-400 text-[10px] font-semibold flex items-center justify-center gap-1 py-0.5 cursor-pointer transition-colors"
          >
            <span>{language === 'ar' ? 'عرض جدول الرحلات الميدانية' : 'View Field Dispatch Trips'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </aside>
    </>
  );
};

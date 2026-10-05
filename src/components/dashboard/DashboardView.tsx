import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateDestination, translateStatus } from '../../utils/i18n';
import {
  Users,
  Clock,
  FileSpreadsheet,
  CheckCircle2,
  CalendarDays,
  AlertCircle,
  Bus as BusIcon,
  TrendingUp,
  DollarSign,
  PhoneCall,
  BedDouble,
  FileCheck,
  Send,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  BarChart2,
  Percent,
  Plus,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    language,
    leads,
    bookings,
    trips,
    tasks,
    buses,
    auditLogs,
    setActiveModule,
    setSelectedBookingId,
    setSelectedTripId,
    setSelectedLeadId,
    toggleTask
  } = useApp();

  // Metrics calculations
  const newLeadsToday = leads.filter(l => l.status === 'New').length;
  const awaitingFollowup = leads.filter(l => l.status === 'Contacted' || l.status === 'Interested' || l.status === 'Follow-up').length;
  const quotationsSent = 6;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Deposit Paid' || b.status === 'Ready for Travel').length;
  const upcomingTripsCount = trips.length;
  
  // Financial totals
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalReceived = bookings.reduce((sum, b) => sum + b.paidAmount, 0);
  const totalOutstanding = bookings.reduce((sum, b) => sum + b.remainingAmount, 0);
  const totalExpenses = bookings.reduce((sum, b) => sum + b.costs.totalCost, 0);
  const grossProfit = totalRevenue - totalExpenses;
  const profitMargin = Math.round((grossProfit / (totalRevenue || 1)) * 100);
  const conversionRate = Math.round((confirmedBookings / (leads.length || 1)) * 100);

  const assignedBusesCount = buses.filter(b => b.status === 'Assigned' || b.status === 'On Trip').length;

  // Source breakdown
  const sourceStats = [
    { name: 'Facebook', count: 4, pct: 40, color: 'bg-blue-600', text: 'text-blue-700' },
    { name: 'Instagram', count: 2, pct: 20, color: 'bg-pink-600', text: 'text-pink-700' },
    { name: 'WhatsApp', count: 1, pct: 10, color: 'bg-emerald-600', text: 'text-emerald-700' },
    { name: 'Messenger', count: 2, pct: 20, color: 'bg-sky-500', text: 'text-sky-700' },
    { name: 'Website', count: 1, pct: 10, color: 'bg-amber-600', text: 'text-amber-700' }
  ];

  // Destination sales
  const destinationStats = [
    { name: 'Hurghada', revenue: 71500, bookings: 3, share: '66%' },
    { name: 'Sharm El Sheikh', revenue: 18500, bookings: 1, share: '17%' },
    { name: 'Aswan & Nile', revenue: 17000, bookings: 1, share: '16%' },
    { name: 'Marsa Alam', revenue: 0, bookings: 0, share: '0%' }
  ];

  // Sales Agent performance
  const agentPerformance = [
    { name: 'Omar Farouk', role: 'Senior Sales', leads: 4, converted: 3, revenue: 71500, target: '92%', avatar: 'OF' },
    { name: 'Karim Adel', role: 'Sales Agent', leads: 3, converted: 1, revenue: 18500, target: '65%', avatar: 'KA' },
    { name: 'Nour Khaled', role: 'Sales Agent', leads: 3, converted: 1, revenue: 17000, target: '70%', avatar: 'NK' }
  ];

  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const tasksProgressPct = Math.round((completedTasksCount / (tasks.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {language === 'ar' ? 'غرفة العمليات المركزية الحية' : 'Live Operations Control Center'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            {language === 'ar' ? 'لوحة القيادة التشغيلية والمبيعات' : 'Executive Operations & Sales Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {language === 'ar'
              ? 'متابعة حركة الحجوزات اللحظية، جاهزية الأسطول الميداني، تحصيل النقدية، وتوزيع عروض الأسعار'
              : 'Real-time telemetry across CRM leads, resort allotments, coach rosters & company gross profit'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveModule('leads')}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{getTranslation(language, 'addLead')}</span>
          </button>

          <button
            onClick={() => setActiveModule('quotations')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>{getTranslation(language, 'createQuotation')}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (11 Required Metrics with Sleek UX) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
        {/* New Leads Today */}
        <div
          onClick={() => setActiveModule('leads')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'newLeadsToday')}</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-2">
            {newLeadsToday}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span>{language === 'ar' ? '+3 اليوم من فيسبوك' : '+3 today from Facebook'}</span>
          </div>
        </div>

        {/* Leads Awaiting Follow-up */}
        <div
          onClick={() => setActiveModule('pipeline')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'leadsAwaitingFollowup')}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-2">
            {awaitingFollowup}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            {language === 'ar' ? '2 متابعة عاجلة اليوم' : '2 urgent today'}
          </div>
        </div>

        {/* Quotations Sent */}
        <div
          onClick={() => setActiveModule('quotations')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'quotationsSent')}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-2">
            {quotationsSent}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">
            {language === 'ar' ? 'متوسط 21,500 ج.م' : 'Avg. 21,500 EGP'}
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div
          onClick={() => setActiveModule('bookings')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'confirmedBookings')}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-2">
            {confirmedBookings}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {language === 'ar' ? 'آخر حجز TR-2044' : 'TR-2044 latest'}
          </div>
        </div>

        {/* Upcoming Trips */}
        <div
          onClick={() => setActiveModule('trips')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'upcomingTrips')}</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-900 mt-2">
            {upcomingTripsCount}
          </div>
          <div className="text-[11px] text-purple-700 font-medium mt-1">
            {language === 'ar' ? 'الإسكندرية ← الغردقة' : 'Alexandria → Hurghada'}
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div
          onClick={() => setActiveModule('payments')}
          className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-rose-400/80 hover:shadow-md hover:shadow-rose-500/5 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold text-slate-600">{getTranslation(language, 'outstandingPayments')}</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-rose-600 mt-2">
            {formatEGP(totalOutstanding, language)}
          </div>
          <div className="text-[11px] text-rose-500 mt-1">
            {language === 'ar' ? 'مستحق قبل موعد السفر' : 'Due before departure'}
          </div>
        </div>
      </div>

      {/* Financial Overview Master Card (Requirements 1 & 19) */}
      <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl shadow-xl border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              {language === 'ar' ? 'الملخص المالي والربحية المباشرة للشهر الحالي' : 'Corporate Tourism Financial Ledger & Monthly P&L'}
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {language === 'ar' ? 'عملة النظام: الجنيه المصري (EGP)' : 'Reporting Currency: Egyptian Pound (EGP)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-5">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {getTranslation(language, 'monthlyRevenue')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-white mt-1">
              {formatEGP(totalRevenue, language)}
            </div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{language === 'ar' ? 'المحصل الفعلي:' : 'Collected Cash:'}</span>
              <span className="font-mono tabular-nums font-bold">{formatEGP(totalReceived, language)}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {getTranslation(language, 'monthlyExpenses')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-slate-200 mt-1">
              {formatEGP(totalExpenses, language)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {language === 'ar' ? 'فنادق، وقود، سائقين، إهلاك الحافلات' : 'Hotels, fuel, drivers, bus allocation'}
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              {getTranslation(language, 'grossProfit')}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400 mt-1">
              +{formatEGP(grossProfit, language)}
            </div>
            <div className="text-xs text-amber-300 mt-1 font-mono font-medium">
              {profitMargin}% {language === 'ar' ? 'هامش ربح إجمالي محقق' : 'Gross Margin on Sales'}
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l rtl:md:border-l-0 rtl:md:border-r border-slate-800/80 pt-4 md:pt-0 md:pl-6 rtl:md:pl-0 rtl:md:pr-6 flex flex-col justify-center">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              {language === 'ar' ? 'جاهزية أسطول الحافلات' : 'Active Fleet Utilization'}
            </div>
            <div className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
              <BusIcon className="w-5 h-5 text-amber-400" />
              <span className="font-mono">{assignedBusesCount} {language === 'ar' ? 'من 4 حافلات' : 'of 4 Coaches'}</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(assignedBusesCount / 4) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Grid: Left 2 Cols (Charts & Tables) + Right 1 Col (Tasks & Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Lead Sources & Destination Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Leads by Source Chart Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'ar' ? 'مصادر العملاء المحتملين (Social Leads)' : 'Inbound Leads by Source'}
                </h3>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {leads.length} {language === 'ar' ? 'إجمالي' : 'Total'}
                </span>
              </div>
              <div className="space-y-3">
                {sourceStats.map(s => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-semibold">{s.name}</span>
                      <span className="text-slate-500 font-mono tabular-nums font-medium">
                        {s.count} {language === 'ar' ? 'ليد' : 'leads'} ({s.pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.color} rounded-full transition-all duration-500`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Agent Conversion */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'ar' ? 'أداء فريق المبيعات' : 'Sales Agent Leaderboard'}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {conversionRate}% {language === 'ar' ? 'تحويل' : 'Conversion'}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {agentPerformance.map(agent => (
                  <div key={agent.name} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xs">
                        {agent.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{agent.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {agent.converted}/{agent.leads} {language === 'ar' ? 'حجوزات مغلقة' : 'closed'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900">
                        {formatEGP(agent.revenue, language)}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium font-mono">
                        Target: {agent.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings by Destination Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {language === 'ar' ? 'المبيعات حسب الوجهة السياحية' : 'Bookings by Destination'}
              </h3>
              <button
                onClick={() => setActiveModule('bookings')}
                className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'ar' ? 'عرض كافة الحجوزات' : 'View all bookings'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-5">{getTranslation(language, 'destination')}</th>
                    <th className="py-3 px-5">{getTranslation(language, 'confirmedBookings')}</th>
                    <th className="py-3 px-5">{getTranslation(language, 'monthlyRevenue')}</th>
                    <th className="py-3 px-5">{language === 'ar' ? 'الحصة السوقية' : 'Market Share'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {destinationStats.map(d => (
                    <tr key={d.name} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-5 font-bold text-slate-900">{translateDestination(language, d.name)}</td>
                      <td className="py-3 px-5 font-mono tabular-nums font-semibold">{d.bookings}</td>
                      <td className="py-3 px-5 font-mono font-bold text-slate-900">
                        {formatEGP(d.revenue, language)}
                      </td>
                      <td className="py-3 px-5 font-mono font-medium text-slate-600">{d.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Trips Live Board */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BusIcon className="w-4 h-4 text-purple-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {getTranslation(language, 'upcomingTrips')}
                </h3>
              </div>
              <button
                onClick={() => setActiveModule('trips')}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'جدول الرحلات الكامل ←' : 'Fleet Schedule →'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {trips.map(trip => (
                <div
                  key={trip.id}
                  onClick={() => {
                    setSelectedTripId(trip.id);
                    setActiveModule('trips');
                  }}
                  className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl hover:border-amber-400/80 hover:bg-amber-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {trip.id}
                      </span>
                      <span className="text-xs font-bold text-purple-950">{trip.route}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                        {translateStatus(language, trip.status)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1.5 flex items-center gap-3 flex-wrap">
                      <span>{language === 'ar' ? 'المغادرة:' : 'Departure:'} {trip.departureDate} ({trip.departureTime})</span>
                      <span>·</span>
                      <span>{language === 'ar' ? 'الحافلة:' : 'Bus:'} <strong className="text-slate-700">{trip.busId}</strong></span>
                      <span>·</span>
                      <span>{language === 'ar' ? 'الكابتن:' : 'Driver:'} <strong className="text-slate-700">{trip.driverName}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-slate-900">
                        {trip.bookedSeats} / {trip.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        {trip.availableSeats} {language === 'ar' ? 'متاح' : 'available'}
                      </div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedTripId(trip.id);
                        setActiveModule('passenger-lists');
                      }}
                      className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 hover:bg-slate-100 shadow-2xs cursor-pointer"
                    >
                      {language === 'ar' ? 'المانيفست' : 'Manifest'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Today's Tasks & Audit Activity Timeline */}
        <div className="space-y-6">
          {/* Today's Tasks Interactive Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {getTranslation(language, 'todaysTasks')}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {completedTasksCount} {language === 'ar' ? 'من' : 'of'} {tasks.length} {language === 'ar' ? 'مكتملة' : 'completed'}
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {tasksProgressPct}%
              </div>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-3.5">
              <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${tasksProgressPct}%` }} />
            </div>

            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 transition-all cursor-pointer ${
                    task.status === 'Completed'
                      ? 'bg-slate-50/70 border-slate-100 text-slate-400'
                      : 'bg-white border-slate-200/80 text-slate-800 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTask(task.id)}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className={`font-semibold ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>{language === 'ar' ? 'المسؤول:' : 'Owner:'} {task.owner}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${
                        task.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {translateStatus(language, task.priority)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {getTranslation(language, 'recentActivityTimeline')}
              </h3>
              <button
                onClick={() => setActiveModule('audit-trail')}
                className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
              >
                {language === 'ar' ? 'السجل الكامل ←' : 'Full Trail →'}
              </button>
            </div>

            <div className={`relative ${language === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} space-y-4 border-slate-200/80`}>
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="relative text-xs group">
                  <div className={`absolute ${language === 'ar' ? '-right-[21px]' : '-left-[21px]'} top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white`} />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    {log.details}
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {language === 'ar' ? 'بواسطة' : 'by'} <strong className="text-slate-600">{log.user}</strong> ({log.role})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

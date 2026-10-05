import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateDestination } from '../../utils/i18n';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  Building,
  Bus,
  Coins,
  FileSpreadsheet,
  Printer
} from 'lucide-react';

export const AccountingView: React.FC = () => {
  const { language, bookings, suppliers, setSelectedBookingId, setActiveModule } = useApp();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalHotelCosts = bookings.reduce((sum, b) => sum + b.costs.hotelCost, 0);
  const totalTransportCosts = bookings.reduce((sum, b) => sum + b.costs.transportCost, 0);
  const totalGuideCosts = bookings.reduce((sum, b) => sum + b.costs.guideCost, 0);
  const totalOtherCosts = bookings.reduce((sum, b) => sum + b.costs.otherExpenses, 0);
  const totalOperatingCosts = totalHotelCosts + totalTransportCosts + totalGuideCosts + totalOtherCosts;
  const grossProfit = totalRevenue - totalOperatingCosts;
  const totalReceivables = bookings.reduce((sum, b) => sum + b.remainingAmount, 0);
  const totalPayables = suppliers.reduce((sum, s) => sum + s.outstandingAmount, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_profitability')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'الحسابات والقوائم المالية، أرباح كل حجز، مستحقات الموردين ومتبقي العملاء'
              : 'Corporate tourism accounting P&L: booking margins, supplier payables & net cash balance'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'طباعة القائمة المالية' : 'Export Financial Statement'}</span>
        </button>
      </div>

      {/* 8 Accounting KPIs Banner (Module 19) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
          </span>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {formatEGP(totalRevenue, language)}
          </div>
          <span className="text-[10px] text-slate-500">
            {language === 'ar' ? `خلال ${bookings.length} حجوزات مسجلة` : `Across ${bookings.length} Bookings`}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'تكاليف الفنادق' : 'Hotel Costs'}
          </span>
          <div className="text-xl font-bold font-mono text-slate-800 mt-1">
            {formatEGP(totalHotelCosts, language)}
          </div>
          <span className="text-[10px] text-slate-500">
            {language === 'ar' ? 'مخصصات مباشرة وشركات بروكر' : 'Direct allotments & brokers'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'تكاليف النقل والحافلات' : 'Transportation Costs'}
          </span>
          <div className="text-xl font-bold font-mono text-purple-700 mt-1">
            {formatEGP(totalTransportCosts, language)}
          </div>
          <span className="text-[10px] text-slate-500">
            {language === 'ar' ? 'أسطول الشركة والوقود والسائقين' : 'Company fleet allocation'}
          </span>
        </div>

        <div className="bg-emerald-50/70 p-3.5 rounded-lg border border-emerald-200 shadow-xs">
          <span className="text-emerald-800 block text-[11px] uppercase font-bold">
            {language === 'ar' ? 'إجمالي الربح المحقق' : 'Gross Profit Realized'}
          </span>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            +{formatEGP(grossProfit, language)}
          </div>
          <span className="text-[10px] text-emerald-800 font-mono font-medium">
            {Math.round((grossProfit / totalRevenue) * 100)}% {language === 'ar' ? 'هامش الربح الإجمالي' : 'Gross Margin'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'مستحقات العملاء (المتبقي)' : 'Customer Receivables'}
          </span>
          <div className="text-xl font-bold font-mono text-rose-600 mt-1">
            {formatEGP(totalReceivables, language)}
          </div>
          <span className="text-[10px] text-rose-500">
            {language === 'ar' ? 'أرصدة مستحقة للتحصيل' : 'Outstanding balances'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'مستحقات الموردين' : 'Supplier Payables'}
          </span>
          <div className="text-xl font-bold font-mono text-slate-800 mt-1">
            {formatEGP(totalPayables, language)}
          </div>
          <span className="text-[10px] text-slate-500">
            {language === 'ar' ? 'بروكر XYZ وسفريات سيناء' : 'XYZ Broker & Sinai B2B'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'إجمالي تكاليف التشغيل' : 'Total Operating Costs'}
          </span>
          <div className="text-xl font-bold font-mono text-slate-800 mt-1">
            {formatEGP(totalOperatingCosts, language)}
          </div>
          <span className="text-[10px] text-slate-500">
            {language === 'ar' ? 'موردين مباشرين وطاقم التشغيل' : 'Direct vendors & crew'}
          </span>
        </div>

        <div className="bg-slate-900 text-white p-3.5 rounded-lg shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase font-semibold">
            {language === 'ar' ? 'صافي نتيجة التشغيل' : 'Net Operating Result'}
          </span>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            +{formatEGP(grossProfit - 8000, language)}
          </div>
          <span className="text-[10px] text-slate-400">
            {language === 'ar' ? 'بعد خصم المصاريف الإدارية' : 'After office overhead'}
          </span>
        </div>
      </div>

      {/* Booking-by-Booking Financial Ledger (Requirement #19) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            {language === 'ar' ? 'بيان ربحية الحجوزات التفصيلي' : 'Booking-Level Profitability Statement'}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            {language === 'ar' ? 'يعرض الحجوزات والرحلات المنطلقة' : 'Showing all bookings and active departures'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'رقم الحجز' : 'Booking ID'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'العميل والوجهة' : 'Customer & Destination'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الإيراد' : 'Revenue'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'تكلفة الفندق' : 'Hotel Cost'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'تكلفة النقل' : 'Transport Cost'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'مرشد ومصروفات' : 'Guide & Misc'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'إجمالي التكلفة' : 'Total Cost'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الربح الإجمالي' : 'Gross Profit'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'ar' ? 'نسبة الهامش %' : 'Margin %'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(b => (
                <tr
                  key={b.id}
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setActiveModule('booking-detail');
                  }}
                  className="hover:bg-slate-50 cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {b.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{b.customerName}</div>
                    <div className="text-[10px] text-slate-500">{b.hotelName} ({translateDestination(language, b.destination)})</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {formatEGP(b.totalPrice, language)}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    {formatEGP(b.costs.hotelCost, language)}
                  </td>
                  <td className="py-3 px-3 font-mono text-purple-700">
                    {formatEGP(b.costs.transportCost, language)}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {formatEGP(b.costs.guideCost + b.costs.otherExpenses, language)}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-rose-700">
                    {formatEGP(b.costs.totalCost, language)}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                    +{formatEGP(b.costs.grossProfit, language)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                    {Math.round((b.costs.grossProfit / b.totalPrice) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

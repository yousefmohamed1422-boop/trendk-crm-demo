import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import {
  Calculator,
  Bus as BusIcon,
  Fuel,
  Coins,
  TrendingUp,
  Receipt,
  FileCheck
} from 'lucide-react';

export const BusCostingView: React.FC = () => {
  const { language, trips, buses } = useApp();
  const [selectedTripId, setSelectedTripId] = useState<string>('TRIP-1008');

  const trip = trips.find(t => t.id === selectedTripId) || trips[0];
  const bus = buses.find(b => b.id === trip.busId);

  // Operational unit economics and route direct costs
  const costing = trip.costing;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_bus_costing')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'حساب تكاليف رحلات الأتوبيس السياحي المملوك: الوقود، السائقين، الكارتات، والصيانة والأرباح الصافية'
              : 'Company-owned bus trip unit economics: fuel, driver per diem, tolls, maintenance allocation & net margin'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">
            {language === 'ar' ? 'اختر الرحلة:' : 'Select Trip:'}
          </span>
          <select
            value={trip.id}
            onChange={e => setSelectedTripId(e.target.value)}
            className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900 cursor-pointer"
          >
            {trips.map(t => (
              <option key={t.id} value={t.id}>{t.id}: {t.route} ({t.busId})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Trip Costing Showcase (Requirement #20) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-amber-400 bg-slate-800 px-2 py-0.5 rounded font-bold">
                {trip.id}
              </span>
              <h2 className="text-base font-bold text-white">
                {trip.route} ({language === 'ar' ? 'محرك تسعير وتكاليف الرحلة' : 'Trip Costing Engine'})
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'ar' ? 'الحافلة: ' : 'Bus: '}
              {trip.busId} ({bus?.brand}) · {language === 'ar' ? 'الكابتن: ' : 'Captain: '}
              {trip.driverName} · {language === 'ar' ? 'السعة: ' : 'Capacity: '}
              {trip.capacity} {language === 'ar' ? 'مقعد' : 'Seats'} ({trip.bookedSeats} {language === 'ar' ? 'محجوز' : 'Booked'})
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">
              {language === 'ar' ? 'صافي أرباح تشغيل الرحلة' : 'Net Trip Operating Profit'}
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400">
              +{formatEGP(costing.netTripProfit, language)}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-6 text-xs">
          {/* Top 3 Economics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                {language === 'ar' ? 'إجمالي إيراد تذاكر الرحلة' : 'Bus Trip Revenue'}
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                {formatEGP(costing.tripRevenue, language)}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {language === 'ar' ? `${trip.bookedSeats} تذكرة مسافر بالتعريفة القياسية` : `${trip.bookedSeats} passenger tickets @ standard seat tariff`}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[11px] font-semibold uppercase">
                {language === 'ar' ? 'إجمالي تكاليف التشغيل المباشرة' : 'Total Operating Direct Cost'}
              </span>
              <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
                {formatEGP(costing.totalTripCost, language)}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {language === 'ar' ? 'مصروفات الرحلة المتغيرة ومخصص الصيانة' : 'Variable trip expenses & maintenance allocation'}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 block text-[11px] font-bold uppercase">
                {language === 'ar' ? 'صافي الربح التشغيلي المحقق' : 'Net Trip Profit Realized'}
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                +{formatEGP(costing.netTripProfit, language)}
              </div>
              <span className="text-[11px] text-emerald-800 font-mono font-medium mt-0.5 block">
                {Math.round((costing.netTripProfit / costing.tripRevenue) * 100)}% {language === 'ar' ? 'هامش صافي الربح على النقل' : 'Net Margin on Transportation'}
              </span>
            </div>
          </div>

          {/* Itemized Trip Expense Ledger (Requirement #20) */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'ar' ? 'بيان مصروفات وتكاليف خط سير الأتوبيس بالتفصيل' : 'Itemized Bus Route Expenses'}
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-white text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">{language === 'ar' ? 'بند مركز التكلفة' : 'Cost Center Item'}</th>
                  <th className="py-2.5 px-4">{language === 'ar' ? 'أساس الحساب والتفاصيل' : 'Calculation Basis / Details'}</th>
                  <th className="py-2.5 px-4">{language === 'ar' ? 'القيمة (ج.م)' : 'Amount (EGP)'}</th>
                  <th className="py-2.5 px-4">{language === 'ar' ? 'النسبة من الإيراد' : '% of Trip Revenue'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'وقود السولار (الإسكندرية ← الغردقة)' : 'Diesel Fuel (Alexandria → Hurghada)'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? '650 كم ذهاب × 2 = 1,300 كم بسعر السولار الرسمي' : '650 KM each way × 2 = 1,300 KM @ Solar price'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.fuelCost, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">25.0%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'بدل سفر سائق أول (الكابتن)' : 'Captain Driver Allowance'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'كابتن محمد علي (بدل رحلة ومبيت)' : 'Captain Mohamed Ali (Trip Per Diem)'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.driverAllowance, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">4.2%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'بدل سفر سائق ثاني (مساعد)' : 'Second Driver Allowance'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'سائق تبديل ليلي للمسافات السريعة الطويلة' : 'Relief night driver for long highway segments'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.secondDriverAllowance, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">3.3%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'رسوم الطرق السريعة والبوابات (الكارتات)' : 'Highway Tolls & Gates (الكارتات)'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'طريق إسكندرية الصحراوي + العين السخنة / الزعفرانة' : 'Alex Desert Road + Ain Sokhna / Zafarana Highway'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.tollsCost, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">2.5%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'رسوم الانتظار والاستراحات' : 'Bus Parking & Rest-Stop Fees'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'استراحات الواحة على الطريق وموقف حافلات الغردقة السياحي' : 'Highway Oasis rest stops & Hurghada tourist bus park'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.parkingCost, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">1.3%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">
                    {language === 'ar' ? 'مخصص صيانة وإهلاك الرحلة' : 'Maintenance Reserve Allocation'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'إهلاك الإطارات والزيوت والفلاتر مخصص لكل رحلة' : 'Tire wear, engine oil & filter allocation per trip'}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{formatEGP(costing.maintenanceAllocation, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-500">2.9%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-2.5 px-4 text-slate-900">
                    {language === 'ar' ? 'إجمالي التكلفة المباشرة للرحلة' : 'Total Direct Trip Cost'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {language === 'ar' ? 'مجموع تكاليف تشغيل الحافلة المباشرة' : 'Sum of direct vehicle operating costs'}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-rose-700">{formatEGP(costing.totalTripCost, language)}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-700">39.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import {
  BarChart3,
  TrendingUp,
  Users,
  Bus,
  Hotel,
  DollarSign,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { language, bookings, leads, buses, trips, hotels, suppliers } = useApp();
  const [selectedReport, setSelectedReport] = useState<string>('lead_source');

  const reportOptions = [
    {
      id: 'lead_source',
      labelEn: 'Lead Source & Conversion Performance',
      labelAr: 'أداء مصادر الليدز ونسب التحويل'
    },
    {
      id: 'sales_agent',
      labelEn: 'Sales Agent Targets & Closed Revenue',
      labelAr: 'مستهدفات مسؤولي المبيعات والإيرادات'
    },
    {
      id: 'hotel_sales',
      labelEn: 'Hotel & Resort Allotment Sales',
      labelAr: 'مبيعات مخصصات الفنادق والمنتجعات'
    },
    {
      id: 'fleet_utilization',
      labelEn: 'Bus Fleet Utilization & Trip Margins',
      labelAr: 'إشغال أسطول الحافلات وأرباح الرحلات'
    },
    {
      id: 'receivables_payables',
      labelEn: 'Cash Flow: Receivables vs. Payables',
      labelAr: 'التدفقات النقدية: المستحقات والمديونيات'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_reports')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'تقارير المبيعات، تحويل الليدز، إشغال الأسطول، وتحليل أرباح الفنادق والرحلات'
              : 'Enterprise analytics: conversion funnels, agent performance, fleet ROI & vendor balances'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'تصدير التقرير التحليلي' : 'Export Analytics Report'}</span>
        </button>
      </div>

      {/* Report Selector Pills */}
      <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-wrap gap-1.5 text-xs">
        {reportOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelectedReport(opt.id)}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer font-medium ${
              selectedReport === opt.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ar' ? opt.labelAr : opt.labelEn}
          </button>
        ))}
      </div>

      {/* Active Report View: Lead Source */}
      {selectedReport === 'lead_source' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            {language === 'ar' ? 'أداء مصادر العملاء المحتملين ونسب الإغلاق للحجوزات' : 'Lead Source Performance & Closed Bookings Conversion'}
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'قناة الوصول' : 'Inbound Channel'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'إجمالي الليدز' : 'Total Inbound Leads'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'استفسارات مؤهلة' : 'Qualified Inquiries'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الحجوزات المغلقة' : 'Bookings Closed'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'نسبة التحويل' : 'Conversion Rate'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الإيرادات المحققة' : 'Generated Revenue'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'إعلانات ومنشورات فيسبوك' : 'Facebook Ads & Posts'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '4 ليدز' : '4 Leads'}</td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '3 مهتمين' : '3 Leads'}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">{language === 'ar' ? '2 حجز' : '2 Bookings'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">50.0%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(45500, language)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'رسائل إنستغرام المباشرة' : 'Instagram Direct'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '2 ليدز' : '2 Leads'}</td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '1 مهتم' : '1 Leads'}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">{language === 'ar' ? '1 حجز' : '1 Bookings'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">50.0%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(18500, language)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'الموقع الإلكتروني ونماذج الاتصال' : 'Website Organic & Forms'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '2 ليدز' : '2 Leads'}</td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '1 مهتم' : '1 Leads'}</td>
                  <td className="py-2.5 px-3 text-slate-500">{language === 'ar' ? '0 حجز' : '0 Bookings'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-500">0.0%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-500">{formatEGP(0, language)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'ترشيحات كبار العملاء VIP' : 'VIP Referrals'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '1 ليد' : '1 Leads'}</td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '1 مهتم' : '1 Leads'}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">{language === 'ar' ? '1 حجز' : '1 Bookings'}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">100.0%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(17000, language)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Report View: Sales Agent */}
      {selectedReport === 'sales_agent' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            {language === 'ar' ? 'تحقيق مستهدفات مسؤولي المبيعات ومعدلات الإغلاق' : 'Sales Team Target Achievement & Lead Handling'}
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'مسؤول المبيعات' : 'Sales Agent'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الليدز المستلمة' : 'Leads Handled'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'عروض الأسعار المرسلة' : 'Quotations Sent'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الحجوزات المغلقة' : 'Bookings Closed'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'إجمالي المبيعات' : 'Gross Sales Realized'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'نسبة الهدف المحقق' : 'Quota Attainment'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'عمر فاروق (أول مبيعات)' : 'Omar Farouk (Senior Sales)'}
                  </td>
                  <td className="py-2.5 px-3">4</td>
                  <td className="py-2.5 px-3">3</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">2 (TR-2044, TR-2040)</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(45500, language)}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">92%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'كريم عادل' : 'Karim Adel'}
                  </td>
                  <td className="py-2.5 px-3">3</td>
                  <td className="py-2.5 px-3">2</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">1 (TR-2029)</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(18500, language)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">65%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    {language === 'ar' ? 'نور خالد' : 'Nour Khaled'}
                  </td>
                  <td className="py-2.5 px-3">3</td>
                  <td className="py-2.5 px-3">1</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">1 (TR-2035)</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(17000, language)}</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">70%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Report View: Hotel Sales */}
      {selectedReport === 'hotel_sales' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            {language === 'ar' ? 'مبيعات مخصصات الغرف الفندقية وهوامش الربح المباشرة' : 'Resort Room Allotment Sales & Direct Margins'}
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الفندق والوجهة' : 'Hotel & Destination'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'نوع التعاقد' : 'Contract Type'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الليالي المباعة' : 'Room Nights Sold'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'إيراد الإقامة' : 'Accommodation Revenue'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'تكلفة الفندق المباشرة' : 'Direct Hotel Cost'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'هامش ربح الفندق' : 'Hotel Profit Margin'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    Coral Resort Hurghada
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {language === 'ar' ? 'عقد مباشر' : 'Direct Contract'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '18 ليلة' : '18 Nights'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(45500, language)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{formatEGP(27300, language)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">+{formatEGP(18200, language)} (40%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    Jaz Mirabel Sharm
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {language === 'ar' ? 'عبر بروكر (SUP-02)' : 'Via Broker (SUP-02)'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '4 ليالي' : '4 Nights'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(18500, language)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{formatEGP(11600, language)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">+{formatEGP(6900, language)} (37%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-900">
                    Mövenpick Resort Aswan
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    {language === 'ar' ? 'عبر بروكر (SUP-01)' : 'Via Broker (SUP-01)'}
                  </td>
                  <td className="py-2.5 px-3">{language === 'ar' ? '4 ليالي' : '4 Nights'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(17000, language)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{formatEGP(14000, language)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">+{formatEGP(3000, language)} (17%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Report View: Fleet */}
      {selectedReport === 'fleet_utilization' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            {language === 'ar' ? 'معدل إشغال أسطول الحافلات وعائد تكاليف الرحلات' : 'Company Bus Fleet Utilization & Trip Costing ROI'}
          </h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'كود الحافلة' : 'Bus ID'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الموديل والسعة' : 'Brand & Seats'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'الرحلات المجدولة' : 'Scheduled Trips'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'إيراد المقاعد' : 'Total Ticket Revenue'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'تكلفة الوقود والطاقم' : 'Fuel & Crew Direct Cost'}</th>
                  <th className="py-2.5 px-3">{language === 'ar' ? 'صافي ربح الأتوبيس' : 'Net Fleet Profit'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-purple-700">BUS-07</td>
                  <td className="py-2.5 px-3 font-sans">
                    Mercedes Travego ({language === 'ar' ? '50 مقعد' : '50 Seats'})
                  </td>
                  <td className="py-2.5 px-3">TRIP-1008 ({language === 'ar' ? 'الإسكندرية ← الغردقة' : 'Alex → Hrg'})</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(24000, language)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{formatEGP(9400, language)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">+{formatEGP(14600, language)} (61%)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-purple-700">BUS-12</td>
                  <td className="py-2.5 px-3 font-sans">
                    Volvo 9700 ({language === 'ar' ? '48 مقعد' : '48 Seats'})
                  </td>
                  <td className="py-2.5 px-3">TRIP-1009 ({language === 'ar' ? 'القاهرة ← شرم الشيخ' : 'Cairo → SSH'})</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{formatEGP(21600, language)}</td>
                  <td className="py-2.5 px-3 text-slate-600">{formatEGP(9000, language)}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">+{formatEGP(12600, language)} (58%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Report View: Receivables vs Payables */}
      {selectedReport === 'receivables_payables' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
            {language === 'ar' ? 'رأس المال العامل: مستحقات العملاء مقابل مديونيات الموردين' : 'Working Capital: Customer Receivables vs. Supplier Payables'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/60 rounded-lg border border-rose-200">
              <span className="text-rose-900 font-bold block mb-1">
                {language === 'ar' ? 'إجمالي مستحقات العملاء غير المحصلة' : 'Customer Receivables Outstanding'}
              </span>
              <div className="text-xl font-bold font-mono text-rose-700">
                {formatEGP(28500, language)}
              </div>
              <p className="text-[11px] text-rose-800 mt-1">
                {language === 'ar'
                  ? 'حجز TR-2044: متبقي 20,000 ج.م (استحقاق 10 أكتوبر) · حجز TR-2035: متبقي 8,500 ج.م (استحقاق 25 أكتوبر)'
                  : 'TR-2044: 20,000 EGP (Due 10 Oct) · TR-2035: 8,500 EGP (Due 25 Oct)'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-900 font-bold block mb-1">
                {language === 'ar' ? 'إجمالي مديونيات الموردين والبروكرز المستحقة' : 'Supplier Payables Outstanding'}
              </span>
              <div className="text-xl font-bold font-mono text-slate-800">
                {formatEGP(39100, language)}
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                {language === 'ar'
                  ? 'بروكر XYZ: 18,400 ج.م · سفريات سيناء B2B: 12,500 ج.م · نايل إكسبريس: 8,200 ج.م'
                  : 'XYZ Broker: 18,400 EGP · Sinai B2B: 12,500 EGP · Nile Express: 8,200 EGP'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

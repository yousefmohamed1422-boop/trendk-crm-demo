import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  getTranslation,
  formatEGP,
  translateDestination,
  translateStatus
} from '../../utils/i18n';
import { Quotation, QuotationComponent, ChildGuest } from '../../types';
import {
  FileSpreadsheet,
  Plus,
  Send,
  CheckCircle,
  Eye,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  Calculator,
  Building,
  Bus,
  ShieldCheck,
  Share2,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const QuotationsView: React.FC = () => {
  const {
    language,
    quotations,
    hotels,
    createQuotation,
    updateQuotationStatus,
    convertQuotationToBooking,
    setSelectedBookingId,
    setActiveModule
  } = useApp();

  const [selectedQuotId, setSelectedQuotId] = useState<string>(quotations[0]?.id || '');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Builder Modal States
  const [customerName, setCustomerName] = useState('Ahmed Mansour');
  const [destination, setDestination] = useState('Hurghada');
  const [travelStartDate, setTravelStartDate] = useState('2026-08-15');
  const [travelEndDate, setTravelEndDate] = useState('2026-08-18');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(2);
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id || 'HT-01');
  const [roomType, setRoomType] = useState('Standard Room');
  const [numberOfRooms, setNumberOfRooms] = useState(2);
  const [numberOfNights, setNumberOfNights] = useState(3);

  // Dynamic pricing components
  const [hotelCost, setHotelCost] = useState(18000);
  const [hotelMarkup, setHotelMarkup] = useState(3600);
  const [transportCost, setTransportCost] = useState(4800);
  const [transportMarkup, setTransportMarkup] = useState(1200);
  const [extraBedCost, setExtraBedCost] = useState(1500);
  const [extraBedMarkup, setExtraBedMarkup] = useState(300);
  const [mealsCost, setMealsCost] = useState(0);
  const [mealsMarkup, setMealsMarkup] = useState(0);
  const [tourCost, setTourCost] = useState(0);
  const [tourMarkup, setTourMarkup] = useState(0);
  const [otherCost, setOtherCost] = useState(500);
  const [otherMarkup, setOtherMarkup] = useState(100);

  // Module 9: Individual Child Age Policy State
  const [childrenList, setChildrenList] = useState<ChildGuest[]>([
    { id: 'ch-1', name: 'Omar Mansour', age: 7, category: 'Child (50%)' },
    { id: 'ch-2', name: 'Layla Mansour', age: 4, category: 'Infant (Free)' }
  ]);

  const selectedQuot = quotations.find(q => q.id === selectedQuotId) || quotations[0];

  const handleChildAgeChange = (id: string, age: number) => {
    setChildrenList(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        let category: 'Infant (Free)' | 'Child (50%)' | 'Adult (100%)' = 'Child (50%)';
        if (age < 6) category = 'Infant (Free)';
        else if (age < 12) category = 'Child (50%)';
        else category = 'Adult (100%)';
        return { ...c, age, category };
      })
    );
  };

  const totalCost = hotelCost + transportCost + extraBedCost + mealsCost + tourCost + otherCost;
  const totalMarkup = hotelMarkup + transportMarkup + extraBedMarkup + mealsMarkup + tourMarkup + otherMarkup;
  const customerPrice = totalCost + totalMarkup;
  const marginPercent = customerPrice > 0 ? Math.round((totalMarkup / customerPrice) * 100) : 0;

  const handleBuildQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const hotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];

    const components: QuotationComponent[] = [
      {
        id: `QC-${Date.now()}-1`,
        type: 'Hotel',
        description: `${hotel.name} - ${roomType} (${numberOfRooms} Rooms × ${numberOfNights} Nights) - Soft All Inclusive`,
        cost: hotelCost,
        markup: hotelMarkup,
        sellingPrice: hotelCost + hotelMarkup,
        quantity: numberOfRooms * numberOfNights,
        unit: 'Room-Nights'
      },
      {
        id: `QC-${Date.now()}-2`,
        type: 'Transportation',
        description: 'Company Luxury Bus Roundtrip Alexandria → Hurghada (BUS-07)',
        cost: transportCost,
        markup: transportMarkup,
        sellingPrice: transportCost + transportMarkup,
        quantity: adults + childrenCount,
        unit: 'Seats'
      },
      {
        id: `QC-${Date.now()}-3`,
        type: 'Extra Bed',
        description: 'Extra Bed for Child (Omar 7y) in Room 102',
        cost: extraBedCost,
        markup: extraBedMarkup,
        sellingPrice: extraBedCost + extraBedMarkup,
        quantity: 1,
        unit: 'Stay'
      },
      {
        id: `QC-${Date.now()}-4`,
        type: 'Meals',
        description: 'All Inclusive concept F&B and pool bar access',
        cost: mealsCost,
        markup: mealsMarkup,
        sellingPrice: mealsCost + mealsMarkup,
        quantity: adults + childrenCount,
        unit: 'Persons'
      },
      {
        id: `QC-${Date.now()}-5`,
        type: 'Tour',
        description: 'Giftun Island Speedboat & Snorkeling (Infant Free, Child 50%)',
        cost: tourCost,
        markup: tourMarkup,
        sellingPrice: tourCost + tourMarkup,
        quantity: 1,
        unit: 'Package'
      },
      {
        id: `QC-${Date.now()}-6`,
        type: 'Other',
        description: 'Local rep concierge service & full travel assistance',
        cost: otherCost,
        markup: otherMarkup,
        sellingPrice: otherCost + otherMarkup,
        quantity: 1,
        unit: 'Package'
      }
    ];

    const created = createQuotation({
      customerName,
      destination,
      travelStartDate,
      travelEndDate,
      adults,
      children: childrenCount,
      childrenDetails: childrenList,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType,
      numberOfRooms,
      numberOfNights,
      components,
      subtotalCost: totalCost,
      markupAmount: totalMarkup,
      customerPrice,
      marginPercent,
      profit: totalMarkup,
      status: 'Draft',
      validUntil: '2026-08-20',
      createdAt: new Date().toISOString().split('T')[0]
    });

    setSelectedQuotId(created.id);
    setIsBuilderOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            {language === 'ar' ? 'معتمد' : 'Approved'}
          </span>
        );
      case 'Sent':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
            {language === 'ar' ? 'مرسل للعميل' : 'Sent'}
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            {language === 'ar' ? 'مرفوض' : 'Rejected'}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
            {language === 'ar' ? 'مسودة' : 'Draft'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{getTranslation(language, 'nav_quotations')}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  {quotations.length} {language === 'ar' ? 'عروض أسعار' : 'Quotes'}
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'محرك تسعير البرامج السياحية وتطبيق سياسة الأطفال واحتساب هوامش الربح وتحويلها لحجوزات'
                  : 'Automated pricing engine with child policy rules, margin calculators, and booking conversion'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'بناء تسعير جديد (Module 9)' : '+ Build Quotation'}</span>
          </button>
        </div>
      </div>

      {/* KPI Financial Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {language === 'ar' ? 'إجمالي قيمة العروض' : 'Total Quotation Pipeline'}
          </span>
          <div className="text-lg font-black font-mono text-slate-900 mt-1">
            {formatEGP(quotations.reduce((acc, q) => acc + q.customerPrice, 0), language)}
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            {quotations.length} {language === 'ar' ? 'عروض صادرة' : 'issued quotes'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {language === 'ar' ? 'الأرباح المتوقعة الصافية' : 'Expected Gross Profit'}
          </span>
          <div className="text-lg font-black font-mono text-emerald-700 mt-1">
            +{formatEGP(quotations.reduce((acc, q) => acc + q.profit, 0), language)}
          </div>
          <span className="text-[10px] text-emerald-600 font-mono mt-0.5 block font-medium">
            {language === 'ar' ? 'متوسط الهامش: 17.5%' : 'Avg Margin: 17.5%'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {language === 'ar' ? 'عروض معتمدة ومحولة لحجز' : 'Approved & Converted'}
          </span>
          <div className="text-lg font-black font-mono text-slate-900 mt-1">
            {quotations.filter(q => q.status === 'Approved').length} / {quotations.length}
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
            {language === 'ar' ? 'معدل إغلاق: 66.7%' : '66.7% Win Rate'}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {language === 'ar' ? 'قواعد سياسة تسعير الطفل' : 'Child Policy Status'}
          </span>
          <div className="text-sm font-bold text-amber-900 mt-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{language === 'ar' ? 'مفعلة وتلقائية 100%' : 'Active & 100% Automated'}</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">
            {language === 'ar' ? 'أقل من 6 مجاني · 6-12 نصف سعر' : 'Under 6 Free · 6-12 Half Price'}
          </span>
        </div>
      </div>

      {/* Quotations Master List Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            {language === 'ar' ? 'عروض الأسعار المسجلة' : 'Registered Quotations'}
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {language === 'ar' ? 'انقر على أي عرض لعرض التفاصيل وتصدير الفاوتشر' : 'Click row to inspect components & export voucher'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">{language === 'ar' ? 'الكود' : 'Quote ID'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'الفندق والوجهة' : 'Hotel & Destination'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'فترة الرحلة' : 'Travel Dates'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'الأفراد' : 'Pax'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'التكلفة الإجمالية' : 'Subtotal Cost'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'السعر للعميل' : 'Customer Price'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'الربح والهامش' : 'Gross Profit'}</th>
                <th className="py-3 px-4">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{language === 'ar' ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotations.map(q => {
                const isSelected = selectedQuot?.id === q.id;

                return (
                  <tr
                    key={q.id}
                    onClick={() => setSelectedQuotId(q.id)}
                    className={`cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-amber-50/70 font-medium'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-amber-800">
                      {q.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {q.customerName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{q.hotelName}</div>
                      <div className="text-[10px] text-slate-400">
                        {translateDestination(language, q.destination)} · {q.roomType}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {q.travelStartDate} → {q.travelEndDate}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                      {q.adults} {language === 'ar' ? 'بالغ' : 'A'} · {q.children} {language === 'ar' ? 'أطفال' : 'C'}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {formatEGP(q.subtotalCost, language)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                      {formatEGP(q.customerPrice, language)}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-700 font-bold">
                      +{formatEGP(q.profit, language)} ({q.marginPercent}%)
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(q.status)}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                      {q.status !== 'Approved' ? (
                        <button
                          onClick={() => {
                            const bk = convertQuotationToBooking(q.id);
                            if (bk) {
                              setSelectedBookingId(bk.id);
                              setActiveModule('booking-detail');
                            }
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          {language === 'ar' ? 'تحويل لحجز مؤكد ←' : 'Convert to Booking →'}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedBookingId(q.convertedBookingId || 'TR-2044');
                            setActiveModule('booking-detail');
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          {language === 'ar' ? `عرض الحجز ${q.convertedBookingId || ''}` : `View ${q.convertedBookingId || 'Booking'}`}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Quotation Detailed Breakdown Card */}
      {selectedQuot && (
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm mt-6">
          {/* Executive Header Banner */}
          <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700 font-bold">
                  {selectedQuot.id}
                </span>
                <h2 className="text-base font-bold text-white tracking-tight">
                  {language === 'ar' ? `عرض سعر العميل: ${selectedQuot.customerName}` : `Quotation for ${selectedQuot.customerName}`}
                </h2>
                {getStatusBadge(selectedQuot.status)}
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <span>{selectedQuot.hotelName} ({selectedQuot.roomType})</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono">{selectedQuot.travelStartDate} {language === 'ar' ? 'إلى' : 'to'} {selectedQuot.travelEndDate}</span>
                <span className="text-slate-600">·</span>
                <span>({selectedQuot.numberOfNights} {language === 'ar' ? 'ليالٍ' : 'Nights'})</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => updateQuotationStatus(selectedQuot.id, 'Sent')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'إرسال للعميل' : 'Send to Customer'}</span>
              </button>

              <button
                onClick={() => setShowPrintModal(true)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'معاينة الفاوتشر الرسمي' : 'Voucher Preview'}</span>
              </button>

              <button
                onClick={() => {
                  const bk = convertQuotationToBooking(selectedQuot.id);
                  if (bk) {
                    setSelectedBookingId(bk.id);
                    setActiveModule('booking-detail');
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'createBooking')}</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Child Policy Details Box */}
            {selectedQuot.childrenDetails && selectedQuot.childrenDetails.length > 0 && (
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs">
                <div className="font-bold text-amber-950 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>
                    {language === 'ar'
                      ? 'قواعد تسعير الأطفال المطبقة آلياً في هذا العرض (Module 9):'
                      : 'Automated Child Pricing Rules Applied (Module 9):'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedQuot.childrenDetails.map(ch => (
                    <div key={ch.id} className="bg-white px-3 py-1.5 rounded-lg border border-amber-200/80 shadow-2xs">
                      <strong className="text-slate-900">{ch.name}</strong> ({ch.age} {language === 'ar' ? 'سنوات' : 'years'}) →{' '}
                      <span className="text-amber-800 font-mono font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
                        {ch.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Components Itemized Table */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>{language === 'ar' ? 'بنود التكلفة وسعر البيع وهوامش الربح' : 'Itemized Cost & Markup Components'}</span>
                <span className="text-[10px] font-mono text-slate-400">#BREAKDOWN</span>
              </h3>
              <div className="border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3.5">{language === 'ar' ? 'البند' : 'Component'}</th>
                      <th className="py-2.5 px-3.5">{language === 'ar' ? 'الوصف والتفاصيل' : 'Description'}</th>
                      <th className="py-2.5 px-3.5">{language === 'ar' ? 'سعر التكلفة' : 'Cost Price'}</th>
                      <th className="py-2.5 px-3.5">{language === 'ar' ? 'سعر البيع' : 'Selling Price'}</th>
                      <th className="py-2.5 px-3.5">{language === 'ar' ? 'صافي هامش الربح' : 'Company Profit'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedQuot.components.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">{c.type}</td>
                        <td className="py-2.5 px-3.5 text-slate-700">{c.description}</td>
                        <td className="py-2.5 px-3.5 font-mono text-slate-600">{formatEGP(c.cost, language)}</td>
                        <td className="py-2.5 px-3.5 font-mono font-bold text-slate-900">{formatEGP(c.sellingPrice, language)}</td>
                        <td className="py-2.5 px-3.5 font-mono text-emerald-700 font-bold">+{formatEGP(c.markup, language)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Summary Banner with Margin Gauge */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-gradient-to-br from-slate-50 to-slate-100/60 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {language === 'ar' ? 'إجمالي التكلفة (Cost)' : 'Subtotal Cost'}
                </span>
                <span className="text-lg font-bold font-mono text-slate-800 mt-1 block">
                  {formatEGP(selectedQuot.subtotalCost, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {language === 'ar' ? 'هامش الربح (Markup)' : 'Total Markup'}
                </span>
                <span className="text-lg font-bold font-mono text-slate-800 mt-1 block">
                  {formatEGP(selectedQuot.markupAmount, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {language === 'ar' ? 'السعر النهائي للعميل' : 'Customer Selling Price'}
                </span>
                <span className="text-xl font-black font-mono text-amber-700 mt-1 block">
                  {formatEGP(selectedQuot.customerPrice, language)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
                  {language === 'ar' ? 'صافي الربح والنسبة' : 'Net Profit Margin'}
                </span>
                <span className="text-xl font-black font-mono text-emerald-600 mt-1 block">
                  +{formatEGP(selectedQuot.profit, language)} ({selectedQuot.marginPercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Voucher Preview Modal */}
      {showPrintModal && selectedQuot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Actions Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {language === 'ar' ? 'معاينة وثيقة عرض السعر الرسمية (Voucher)' : 'Official Proposal & Voucher Preview'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'طباعة PDF' : 'Print'}</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Document Body (Printable Voucher) */}
            <div className="p-8 space-y-6 text-slate-900 font-sans print:p-0">
              {/* Agency Brand Header */}
              <div className="flex justify-between items-start border-b-2 border-amber-500 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-slate-950 font-serif">
                      TREND AGENCY
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                      TRAVEL
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Licensed Tour Operator & Luxury Transport · Egypt
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Alexandria & Cairo · Support: +20 (0)3 555-8899 · contact@trendagency.com
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block">
                    {selectedQuot.id}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Date: {selectedQuot.createdAt}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Valid Until: {selectedQuot.validUntil}
                  </div>
                </div>
              </div>

              {/* Client & Itinerary Card */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Prepared Exclusively For:</span>
                  <div className="font-bold text-sm text-slate-900 mt-0.5">{selectedQuot.customerName}</div>
                  <div className="text-slate-600 mt-1 font-mono">
                    Travelers: {selectedQuot.adults} Adults · {selectedQuot.children} Children
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination & Accommodation:</span>
                  <div className="font-bold text-sm text-slate-900 mt-0.5">
                    {selectedQuot.hotelName} ({selectedQuot.roomType})
                  </div>
                  <div className="text-slate-600 mt-1 font-mono">
                    {selectedQuot.travelStartDate} to {selectedQuot.travelEndDate} ({selectedQuot.numberOfNights} Nights)
                  </div>
                </div>
              </div>

              {/* Inclusions List */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
                  Package Inclusions & Detailed Specifications
                </h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Service</th>
                        <th className="py-2 px-3">Description</th>
                        <th className="py-2 px-3 text-right">Price (EGP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedQuot.components.map(c => (
                        <tr key={c.id}>
                          <td className="py-2 px-3 font-bold text-slate-800">{c.type}</td>
                          <td className="py-2 px-3 text-slate-600">{c.description}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                            {formatEGP(c.sellingPrice, language)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="p-4 bg-slate-950 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-amber-400 text-xs font-bold block uppercase tracking-wider">
                    Total Package Price (All Inclusive):
                  </span>
                  <span className="text-xs text-slate-300">
                    Includes all taxes, service charges, transfers & resort meal plan
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-amber-400">
                  {formatEGP(selectedQuot.customerPrice, language)}
                </div>
              </div>

              {/* Stamp & Verification */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
                <div>
                  <div className="font-bold text-slate-800">Trend Agency Tourism Operations</div>
                  <div>Official Agency Voucher · Authenticated Electronic Document</div>
                </div>
                <div className="w-24 h-16 border-2 border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono">
                  [ AGENCY STAMP ]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quotation Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {language === 'ar' ? 'محرك تسعير البرامج السياحية مع سياسة الأطفال (Module 9)' : 'Professional Quotation Builder with Child Policy'}
                </h3>
              </div>
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBuildQuotation} className="p-6 space-y-4 text-xs">
              {/* Customer & Destination */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'الوجهة السياحية' : 'Destination'}
                  </label>
                  <select
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-medium bg-white"
                  >
                    <option value="Hurghada">{translateDestination(language, 'Hurghada')}</option>
                    <option value="Sharm El Sheikh">{translateDestination(language, 'Sharm El Sheikh')}</option>
                    <option value="Aswan">{translateDestination(language, 'Aswan')}</option>
                    <option value="Luxor">{translateDestination(language, 'Luxor')}</option>
                    <option value="Marsa Alam">{translateDestination(language, 'Marsa Alam')}</option>
                  </select>
                </div>
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'تاريخ الوصول' : 'Check-in'}
                  </label>
                  <input
                    type="date"
                    value={travelStartDate}
                    onChange={e => setTravelStartDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'تاريخ المغادرة' : 'Check-out'}
                  </label>
                  <input
                    type="date"
                    value={travelEndDate}
                    onChange={e => setTravelEndDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'عدد البالغين' : 'Adults'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={e => setAdults(parseInt(e.target.value) || 1)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'عدد الأطفال' : 'Children'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={childrenCount}
                    onChange={e => setChildrenCount(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Module 9: Child Policy Auto Calculator */}
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2.5">
                <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>{language === 'ar' ? 'سياسة تسعير الطفل حسب السن المحدد (Module 9)' : 'Module 9: Individual Child Age & Pricing Policy'}</span>
                </span>
                <div className="space-y-2">
                  {childrenList.map(ch => (
                    <div key={ch.id} className="grid grid-cols-3 gap-2.5 items-center bg-white p-2.5 rounded-lg border border-amber-200 shadow-2xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'اسم الطفل' : 'Child Name'}</span>
                        <input
                          type="text"
                          value={ch.name}
                          onChange={e => {
                            const val = e.target.value;
                            setChildrenList(prev => prev.map(c => c.id === ch.id ? { ...c, name: val } : c));
                          }}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'العمر بالسنوات' : 'Age (Years)'}</span>
                        <input
                          type="number"
                          min="0"
                          max="17"
                          value={ch.age}
                          onChange={e => handleChildAgeChange(ch.id, parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-slate-200 rounded text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'التصنيف المطبق' : 'Policy Category'}</span>
                        <span className="font-mono font-bold text-amber-800 text-xs block py-1">
                          {ch.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotel & Rooms */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'الفندق' : 'Hotel'}
                  </label>
                  <select
                    value={selectedHotelId}
                    onChange={e => setSelectedHotelId(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-medium"
                  >
                    {hotels.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'فئة الغرفة' : 'Room Type'}
                  </label>
                  <select
                    value={roomType}
                    onChange={e => setRoomType(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-medium"
                  >
                    <option value="Standard Room">{language === 'ar' ? 'ستاندرد' : 'Standard Room'}</option>
                    <option value="Sea View Room">{language === 'ar' ? 'مطل على البحر' : 'Sea View Room'}</option>
                    <option value="Deluxe Suite">{language === 'ar' ? 'جناح ديلوكس' : 'Deluxe Suite'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === 'ar' ? 'الغرف × الليالي' : 'Rooms × Nights'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={numberOfRooms}
                      onChange={e => setNumberOfRooms(parseInt(e.target.value) || 1)}
                      className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                    />
                    <input
                      type="number"
                      min="1"
                      value={numberOfNights}
                      onChange={e => setNumberOfNights(parseInt(e.target.value) || 1)}
                      className="w-1/2 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Component Cost & Markup Inputs */}
              <div className="border-t border-slate-200 pt-3">
                <div className="font-bold text-slate-900 mb-2">
                  {language === 'ar' ? 'تفاصيل التكلفة وهوامش الربح للمكونات' : 'Cost & Markup Breakdown'}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'تكلفة الفندق:' : 'Hotel Cost:'}
                    </span>
                    <input
                      type="number"
                      value={hotelCost}
                      onChange={e => setHotelCost(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'هامش ربح الفندق:' : 'Hotel Markup:'}
                    </span>
                    <input
                      type="number"
                      value={hotelMarkup}
                      onChange={e => setHotelMarkup(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'تكلفة النقل (الأتوبيس):' : 'Transport Cost:'}
                    </span>
                    <input
                      type="number"
                      value={transportCost}
                      onChange={e => setTransportCost(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'هامش ربح النقل:' : 'Transport Markup:'}
                    </span>
                    <input
                      type="number"
                      value={transportMarkup}
                      onChange={e => setTransportMarkup(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'تكلفة السرير الإضافي:' : 'Extra Bed Cost:'}
                    </span>
                    <input
                      type="number"
                      value={extraBedCost}
                      onChange={e => setExtraBedCost(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'هامش السرير الإضافي:' : 'Extra Bed Markup:'}
                    </span>
                    <input
                      type="number"
                      value={extraBedMarkup}
                      onChange={e => setExtraBedMarkup(parseInt(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="p-4 bg-slate-950 text-white rounded-xl flex items-center justify-between shadow-md">
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    {language === 'ar' ? 'السعر المحسوب للعميل:' : 'Calculated Customer Price:'}
                  </span>
                  <span className="text-xl font-black font-mono text-amber-400">
                    {formatEGP(customerPrice, language)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">
                    {language === 'ar' ? 'إجمالي صافي الربح (الهامش):' : 'Gross Profit (Margin):'}
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    +{formatEGP(totalMarkup, language)} ({marginPercent}%)
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 cursor-pointer font-semibold"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold cursor-pointer shadow-xs transition-colors"
                >
                  {language === 'ar' ? 'حفظ وإصدار عرض السعر' : 'Save & Issue Quotation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

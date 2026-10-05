import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateStatus, translateDestination } from '../../utils/i18n';
import { OperationsChecklist } from '../../types';
import {
  User,
  Hotel,
  Bus,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  FileSpreadsheet,
  Clock,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Users2,
  BedDouble
} from 'lucide-react';

export const BookingDetailView: React.FC = () => {
  const {
    language,
    selectedBookingId,
    bookings,
    payments,
    hotels,
    trips,
    buses,
    drivers,
    setActiveModule,
    setSelectedCustomerId,
    setSelectedHotelId,
    setSelectedTripId,
    toggleOperationChecklistItem,
    addPayment
  } = useApp();

  const [activeTab, setActiveTab] = useState<'connected' | 'checklist' | 'passengers' | 'rooming' | 'finance'>('connected');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(20000);
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Cash' | 'Card' | 'Wallet'>('Bank Transfer');

  const booking = bookings.find(b => b.id === selectedBookingId) || bookings[0];
  const hotel = hotels.find(h => h.id === booking?.hotelId);
  const trip = trips.find(t => t.id === booking?.tripId);
  const bus = buses.find(b => b.id === booking?.busId);
  const driver = drivers.find(d => d.id === booking?.driverId);
  const bookingPayments = payments.filter(p => p.bookingId === booking?.id);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    addPayment({
      bookingId: booking.id,
      customerName: booking.customerName,
      amount: Number(paymentAmount),
      method: paymentMethod,
      paymentDate: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      receivedBy: 'Heba Accountant',
      reference: `PAY-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      notes: `Final settlement for booking ${booking.id}`,
      type: booking.paidAmount === 0 ? 'Deposit' : 'Final Payment'
    });
    setShowPaymentModal(false);
  };

  const checklistItems: { key: keyof OperationsChecklist; labelEn: string; labelAr: string; descEn: string; descAr: string }[] = [
    {
      key: 'hotelConfirmed',
      labelEn: 'Hotel Confirmed',
      labelAr: 'تأكيد حجز الفندق',
      descEn: 'Direct resort allotment blocked with hotel sales director',
      descAr: 'تم حجز الغرف وتأكيدها من المخصص المباشر مع إدارة مبيعات المنتجع'
    },
    {
      key: 'roomsConfirmed',
      labelEn: 'Rooms Confirmed',
      labelAr: 'تثبيت الغرف المحددة',
      descEn: '2 Standard rooms assigned in booking engine',
      descAr: 'تم تعيين غرفتين قياسيتين وتثبيتهما بنظام الحجوزات'
    },
    {
      key: 'paymentChecked',
      labelEn: 'Payment Checked',
      labelAr: 'فحص واستلام الدفعة',
      descEn: 'Required deposit of 10,000 EGP credited',
      descAr: 'تم قيد واستلام دفعة العربون المطلوبة 10,000 ج.م بحساب الشركة'
    },
    {
      key: 'busAssigned',
      labelEn: 'Bus Assigned',
      labelAr: 'تخصيص الحافلة (الأتوبيس)',
      descEn: 'Company coach BUS-07 locked for Alexandria → Hurghada route',
      descAr: 'تم حجز وتخصيص أتوبيس الشركة BUS-07 لخط سير الإسكندرية إلى الغردقة'
    },
    {
      key: 'driverAssigned',
      labelEn: 'Driver Assigned',
      labelAr: 'تعيين الكابتن السائق',
      descEn: 'Captain Mohamed Ali assigned to departure',
      descAr: 'تم تكليف كابتن الرحلة محمد علي ومساعده بالانطلاق'
    },
    {
      key: 'passengerListCompleted',
      labelEn: 'Passenger List Completed',
      labelAr: 'اكتمال مانيفست الركاب',
      descEn: 'Seats 1, 2, 3, 4 confirmed on bus manifest',
      descAr: 'تم تأكيد وحجز المقاعد 1، 2، 3، 4 على كشف ركاب الأتوبيس'
    },
    {
      key: 'roomingListCompleted',
      labelEn: 'Rooming List Completed',
      labelAr: 'اكتمال كشف تسكين الفندق',
      descEn: 'Room 101 & Room 102 guest names & child ages allocated',
      descAr: 'تم تخصيص الغرفة 101 و102 وتحديد أسماء النزلاء وأعمار الأطفال'
    },
    {
      key: 'voucherSent',
      labelEn: 'Voucher Sent',
      labelAr: 'إرسال فاوتشر الإقامة',
      descEn: 'Hotel check-in voucher emailed & sent via WhatsApp',
      descAr: 'تم إرسال فاوتشر دخول الفندق للعميل عبر الإيميل والواتساب'
    },
    {
      key: 'customerContacted',
      labelEn: 'Customer Contacted',
      labelAr: 'التواصل النهائي مع العميل',
      descEn: 'Pick-up point (Sidi Gaber) and departure time briefed',
      descAr: 'تم الاتصال بالعميل وتأكيد نقطة التجمع بسيدي جابر وتوقيت التحرك'
    },
    {
      key: 'readyForTravel',
      labelEn: 'Ready for Travel (Final)',
      labelAr: 'جاهز للسفر (اعتماد نهائي)',
      descEn: '100% operational sign-off completed',
      descAr: 'تم اعتماد كافة البنود التشغيلية بنسبة 100% وجاهزية الرحلة'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('bookings')}
            className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
          >
            {language === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-bold font-mono text-slate-900">{booking.id}</span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-amber-100 text-amber-900 border border-amber-300">
                {translateStatus(language, booking.status)}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {language === 'ar' ? 'تاريخ الإنشاء: ' : 'Created: '}{booking.createdAt}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {language === 'ar' ? 'العميل: ' : 'Customer: '}
              <strong className="text-slate-800">{booking.customerName}</strong> ({booking.customerPhone}) · {translateDestination(language, booking.destination)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {booking.remainingAmount > 0 && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>
                {language === 'ar'
                  ? `تسجيل دفعة (${formatEGP(booking.remainingAmount, language)} متبقي)`
                  : `Record Payment (${formatEGP(booking.remainingAmount, language)} Due)`}
              </span>
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'طباعة الفاوتشر' : 'Print Voucher'}</span>
          </button>
        </div>
      </div>

      {/* Prominent Relationship Connection Matrix (Requirement #29) */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
              {language === 'ar' ? 'مصفوفة الروابط التشغيلية المترابطة للحجز' : 'Master Operational Relationship Matrix'}
            </span>
          </div>
          <span className="text-slate-400 font-mono">
            {language === 'ar' ? 'نسبة جاهزية التشغيل: ' : 'Booking Progress: '}
            <strong className="text-amber-400">{booking.operationsProgress}%</strong>
          </span>
        </div>

        {/* 6 Connected Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Customer Node */}
          <div
            onClick={() => {
              setSelectedCustomerId('CUST-101');
              setActiveModule('customers');
            }}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <User className="w-3 h-3 text-blue-400" />
              <span>{language === 'ar' ? 'العميل' : 'Customer'}</span>
            </div>
            <div className="font-bold text-white mt-1 truncate">{booking.customerName}</div>
            <div className="text-[10px] text-slate-400 truncate">
              {booking.adultsCount} {language === 'ar' ? 'بالغين' : 'Adults'} · {booking.childrenCount} {language === 'ar' ? 'أطفال' : 'Children'}
            </div>
          </div>

          {/* Hotel Node */}
          <div
            onClick={() => {
              setSelectedHotelId(booking.hotelId);
              setActiveModule('hotels');
            }}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <Hotel className="w-3 h-3 text-emerald-400" />
              <span>{language === 'ar' ? 'الفندق والغرف' : 'Resort & Rooms'}</span>
            </div>
            <div className="font-bold text-white mt-1 truncate">{booking.hotelName}</div>
            <div className="text-[10px] text-slate-400 truncate">
              {booking.numberOfRooms}x {booking.roomType}
            </div>
          </div>

          {/* Quotation Node */}
          <div
            onClick={() => setActiveModule('quotations')}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <FileSpreadsheet className="w-3 h-3 text-indigo-400" />
              <span>{language === 'ar' ? 'عرض الأسعار' : 'Quotation'}</span>
            </div>
            <div className="font-bold text-white mt-1 truncate font-mono">{booking.quotationId}</div>
            <div className="text-[10px] text-slate-400">
              {language === 'ar' ? 'تطبيق سياسة الأطفال' : 'Child Policy Applied'}
            </div>
          </div>

          {/* Transport Trip Node */}
          <div
            onClick={() => {
              setSelectedTripId('TRIP-1008');
              setActiveModule('trips');
            }}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <Bus className="w-3 h-3 text-purple-400" />
              <span>{language === 'ar' ? 'رحلة الأتوبيس' : 'Bus Trip'}</span>
            </div>
            <div className="font-bold text-white mt-1 truncate font-mono">{booking.tripId || 'TRIP-1008'}</div>
            <div className="text-[10px] text-slate-400 truncate">
              {language === 'ar' ? 'الإسكندرية ← الغردقة' : 'Alexandria → Hurghada'}
            </div>
          </div>

          {/* Coach Fleet Node */}
          <div
            onClick={() => setActiveModule('buses')}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <Bus className="w-3 h-3 text-amber-400" />
              <span>{language === 'ar' ? 'الأسطول والسائق' : 'Fleet & Driver'}</span>
            </div>
            <div className="font-bold text-white mt-1 truncate font-mono">{booking.busId} ({driver?.name || (language === 'ar' ? 'محمد علي' : 'Mohamed Ali')})</div>
            <div className="text-[10px] text-slate-400">
              {language === 'ar' ? 'المقاعد: 1، 2، 3، 4' : 'Seats: 1, 2, 3, 4'}
            </div>
          </div>

          {/* Financial Balance Node */}
          <div
            onClick={() => setActiveModule('payments')}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-mono">
              <CreditCard className="w-3 h-3 text-rose-400" />
              <span>{language === 'ar' ? 'الموقف المالي' : 'Financial Status'}</span>
            </div>
            <div className="font-bold text-amber-400 mt-1 font-mono">{formatEGP(booking.totalPrice, language)}</div>
            <div className="text-[10px] text-emerald-400 font-mono">
              {language === 'ar' ? 'سدد: ' : 'Paid: '}{formatEGP(booking.paidAmount, language)}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="border-b border-slate-200 px-4 flex items-center gap-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('connected')}
            className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'connected' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ar' ? 'نظرة عامة وتفاصيل الإقامة' : 'Overview & Stay Details'}
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'checklist' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{language === 'ar' ? `قائمة فحص التشغيل (${booking.operationsProgress}%)` : `Operations Checklist (${booking.operationsProgress}%)`}</span>
          </button>
          <button
            onClick={() => setActiveTab('passengers')}
            className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'passengers' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{language === 'ar' ? 'مقاعد الأتوبيس والمانيفست' : 'Bus Seats & Manifest'}</span>
            <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full">
              {booking.passengers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rooming')}
            className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rooming' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{language === 'ar' ? 'كشف تسكين الفندق' : 'Hotel Rooming List'}</span>
            <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full">
              {booking.roomAssignments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'finance' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ar' ? 'أرباح الحجز والقائمة المالية (P&L)' : 'Profitability & Accounting (P&L)'}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {/* OVERVIEW & STAY DETAILS */}
          {activeTab === 'connected' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Hotel Information */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'الإقامة بالفندق والمنتجع' : 'Hotel & Resort Stay'}
                  </h4>
                  <span className="font-mono text-emerald-700 font-semibold">
                    {language === 'ar' ? 'عقد مباشر' : 'Direct Contract'}
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <div>
                    {language === 'ar' ? 'الفندق: ' : 'Hotel: '}
                    <strong className="text-slate-900">{booking.hotelName}</strong>
                  </div>
                  <div>
                    {language === 'ar' ? 'الغرف: ' : 'Rooms: '}
                    <strong className="text-slate-900">{booking.numberOfRooms}x {booking.roomType}</strong>
                  </div>
                  <div>
                    {language === 'ar' ? 'الوجبات: ' : 'Meal Plan: '}
                    <span className="font-medium text-slate-900">
                      {language === 'ar' ? 'إقامة شاملة ناعمة (Soft All-Inclusive)' : 'All Inclusive (Soft)'}
                    </span>
                  </div>
                  <div>
                    {language === 'ar' ? 'الوصول: ' : 'Check-in: '}
                    <span className="font-mono text-slate-900">{booking.travelStartDate}</span>
                  </div>
                  <div>
                    {language === 'ar' ? 'المغادرة: ' : 'Check-out: '}
                    <span className="font-mono text-slate-900">{booking.travelEndDate}</span> ({language === 'ar' ? '3 ليالي' : '3 Nights'})
                  </div>
                  <div>
                    {language === 'ar' ? 'رقم الفاوتشر: ' : 'Voucher #: '}
                    <span className="font-mono font-bold text-indigo-700">{booking.voucherNumber || 'VCH-HRG-2044'}</span>
                  </div>
                </div>
              </div>

              {/* Transportation Details */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'جدول وتفاصيل النقل' : 'Transportation Schedule'}
                  </h4>
                  <span className="font-mono text-purple-700 font-semibold">{booking.transportationType}</span>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <div>
                    {language === 'ar' ? 'كود الرحلة: ' : 'Trip: '}
                    <strong className="text-slate-900 font-mono">{booking.tripId}</strong> ({language === 'ar' ? 'الإسكندرية ← الغردقة' : 'Alexandria → Hurghada'})
                  </div>
                  <div>
                    {language === 'ar' ? 'الحافلة: ' : 'Assigned Bus: '}
                    <strong className="text-slate-900 font-mono">{booking.busId}</strong> (Mercedes Travego)
                  </div>
                  <div>
                    {language === 'ar' ? 'كابتن الرحلة: ' : 'Captain Driver: '}
                    <span className="font-medium text-slate-900">{driver?.name || (language === 'ar' ? 'محمد علي' : 'Mohamed Ali')}</span> ({driver?.phone || '01001234567'})
                  </div>
                  <div>
                    {language === 'ar' ? 'موعد التحرك: ' : 'Departure: '}
                    <span className="font-mono text-slate-900">
                      {language === 'ar' ? '15 أكتوبر · 11:00 م (محطة سيدي جابر)' : '15 Oct · 11:00 PM (Sidi Gaber)'}
                    </span>
                  </div>
                  <div>
                    {language === 'ar' ? 'المقاعد المخصصة: ' : 'Assigned Seats: '}
                    <strong className="text-purple-700 font-mono">
                      {language === 'ar' ? '1، 2، 3، 4 (الصف الأول)' : '1, 2, 3, 4 (Front Row)'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Passenger Summary & Child Policy */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'المسافرون وسياسة الأطفال' : 'Travelers & Child Policy'}
                  </h4>
                  <span className="font-mono text-slate-500 font-semibold">
                    {booking.adultsCount}A + {booking.childrenCount}C
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-700">
                    <div>
                      {language === 'ar' ? 'البالغين: ' : 'Adults: '}
                      <strong className="text-slate-900">Ahmed Hassan & Sara Hassan</strong>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">
                      {language === 'ar' ? 'تفاصيل الأطفال وحساب التسعير:' : 'Children Details:'}
                    </span>
                    {booking.childrenDetails && booking.childrenDetails.map(ch => (
                      <div key={ch.id} className="flex justify-between py-0.5 text-[11px]">
                        <span>{ch.name} ({ch.age} {language === 'ar' ? 'سنوات' : 'yrs'})</span>
                        <span className="font-mono text-amber-800 font-bold">{ch.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OPERATIONS CHECKLIST (Requirement #17) */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'قائمة التحقق التشغيلية التفاعلية للحجز' : 'Interactive Booking Operations Checklist'}
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {language === 'ar'
                      ? 'اضغط على أي بند لتغيير حالته. استكمال جميع البنود يحول الحجز تلقائياً إلى "جاهز للسفر".'
                      : 'Click any task to toggle status. Completing all items moves booking to "Ready for Travel".'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {booking.operationsProgress}% {language === 'ar' ? 'جاهز' : 'Ready'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklistItems.map(item => {
                  const isChecked = booking.operationsChecklist[item.key];

                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleOperationChecklistItem(booking.id, item.key)}
                      className={`p-3 rounded-lg border text-xs flex items-start gap-3 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOperationChecklistItem(booking.id, item.key)}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 flex items-center justify-between">
                          <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {language === 'ar' ? item.descAr : item.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASSENGER MANIFEST & SEAT ASSIGNMENT (Requirement #16) */}
          {activeTab === 'passengers' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'مانيفست الحافلة المعينة (BUS-07 · 50 مقعد)' : 'Assigned Bus Manifest (BUS-07 · 50 Seats)'}
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    {language === 'ar'
                      ? 'التجمع: محطة سيدي جابر - الإسكندرية الساعة 11:00 مساءً (15 أكتوبر)'
                      : 'Pickup: Sidi Gaber Station - Alexandria at 11:00 PM (15 October)'}
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'رقم المقعد' : 'Seat #'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'اسم الراكب' : 'Passenger Name'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'الفئة' : 'Type'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'الفندق' : 'Hotel Destination'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'نقطة الركوب' : 'Pickup Point'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {booking.passengers.map(p => (
                      <tr key={p.id}>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-700">
                          {language === 'ar' ? `مقعد ${p.seatNumber}` : `Seat ${p.seatNumber}`}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{p.passengerName}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{p.phone}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            p.passengerType === 'Child' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {p.passengerType === 'Child' ? (language === 'ar' ? 'طفل' : 'Child') : (language === 'ar' ? 'بالغ' : 'Adult')}
                            {p.childAge ? (language === 'ar' ? ` (${p.childAge} سنوات)` : ` (${p.childAge} yrs)`) : ''}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-800">{p.hotelName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{language === 'ar' ? 'محطة سيدي جابر - الإسكندرية' : p.pickupPoint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ROOMING LIST (Requirement #18) */}
          {activeTab === 'rooming' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'كشف تسكين غرف الفندق - كورال ريزورت الغردقة' : 'Hotel Rooming List for Coral Resort Hurghada'}
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    {language === 'ar' ? 'توزيع النزلاء الرسمي المعتمد لمكتب الاستقبال' : 'Official guest room assignment submitted to front desk'}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  {language === 'ar' ? 'تصدير كشف التسكين PDF' : 'Export Rooming PDF'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking.roomAssignments.map(rm => (
                  <div key={rm.roomNumber} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="font-bold text-base font-mono text-slate-900">
                          {language === 'ar' ? `غرفة ${rm.roomNumber}` : rm.roomNumber}
                        </span>
                        <div className="text-[11px] text-slate-500">{rm.roomType}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-mono">
                        {rm.guests.length} {language === 'ar' ? 'نزلاء' : 'Guests'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        {language === 'ar' ? 'النزلاء المخصصون:' : 'Assigned Guests:'}
                      </span>
                      {rm.guests.map((g, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                          <span className="font-semibold text-slate-800">{g.name}</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {g.type === 'Child' ? (language === 'ar' ? 'طفل' : 'Child') : (language === 'ar' ? 'بالغ' : 'Adult')}
                            {g.age ? (language === 'ar' ? ` (العمر: ${g.age})` : ` (Age: ${g.age})`) : ''}
                          </span>
                        </div>
                      ))}
                    </div>

                    {rm.specialRequests && (
                      <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                        <strong className="text-slate-800">{language === 'ar' ? 'ملاحظة خاصة للاستقبال:' : 'Special Notes:'}</strong> {rm.specialRequests}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FINANCIAL PROFITABILITY (Requirement #19) */}
          {activeTab === 'finance' && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'بيان أرباح الحجز وقائمة الدخل التشغيلية (P&L)' : 'Booking Profitability & P&L Statement'}
                </h3>
                <p className="text-slate-500 text-[11px]">
                  {language === 'ar'
                    ? 'الإيراد المحقق، توزيع تكلفة الموردين المباشرة، وصافي هامش المساهمة'
                    : 'Realized revenue, direct vendor cost allocation, and net contribution margin'}
                </p>
              </div>

              {/* Profit Waterfall */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">
                    {language === 'ar' ? 'إجمالي إيراد البيع للعميل' : 'Gross Revenue'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {formatEGP(booking.totalPrice, language)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono mt-0.5">
                    {language === 'ar' ? 'المحصل: ' : 'Paid: '}{formatEGP(booking.paidAmount, language)}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">
                    {language === 'ar' ? 'إجمالي تكاليف التشغيل' : 'Total Operating Cost'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-slate-800 mt-1">
                    {formatEGP(booking.costs.totalCost, language)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'ar' ? 'فندق + أتوبيس + مرشد + مصروفات' : 'Hotel + Bus + Guide + Misc'}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-emerald-800 block text-[11px] font-semibold">
                    {language === 'ar' ? 'إجمالي الربح المحقق' : 'Gross Profit Realized'}
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                    +{formatEGP(booking.costs.grossProfit, language)}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-mono font-medium mt-0.5">
                    {Math.round((booking.costs.grossProfit / booking.totalPrice) * 100)}% {language === 'ar' ? 'هامش الربح' : 'Profit Margin'}
                  </div>
                </div>
              </div>

              {/* Cost Itemization */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'بند المصروف' : 'Expense Category'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'المورد / المخصص' : 'Supplier / Resource'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'مبلغ التكلفة' : 'Cost Amount'}</th>
                      <th className="py-2.5 px-3">{language === 'ar' ? 'النسبة من الإيراد' : 'Share of Revenue'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {language === 'ar' ? 'إقامة الفندق والمنتجع' : 'Hotel Accommodation'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">Coral Resort Hurghada (2 Standard Rooms)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{formatEGP(booking.costs.hotelCost, language)}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">60.0%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {language === 'ar' ? 'مخصص نقل الأتوبيس السياحي' : 'Transportation Allocation'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">Company Bus BUS-07 (Trip Costing Allocation)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{formatEGP(booking.costs.transportCost, language)}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">13.3%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {language === 'ar' ? 'مرشد الرحلات البحرية والسنوركلينج' : 'Excursion Guide & Snorkeling'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">Giftun Island Local Marina Rep</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{formatEGP(booking.costs.guideCost, language)}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">1.7%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {language === 'ar' ? 'مصروفات تشغيلية أخرى' : 'Other Operational Expenses'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">Insurance & Concierge Rep Service</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{formatEGP(booking.costs.otherExpenses, language)}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">1.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              {language === 'ar' ? `تسجيل دفعة للحجز ${booking.id}` : `Record Payment for ${booking.id}`}
            </h3>
            <p className="text-slate-500 text-[11px] mb-3">
              {language === 'ar' ? 'العميل: ' : 'Customer: '}{booking.customerName} · {language === 'ar' ? 'الإجمالي: ' : 'Total: '}{formatEGP(booking.totalPrice, language)}
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'مبلغ الدفعة (ج.م) *' : 'Payment Amount (EGP) *'}
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'طريقة الدفع *' : 'Payment Method *'}
                </label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                >
                  <option value="Bank Transfer">{language === 'ar' ? 'تحويل بنكي (CIB / QNB / الأهلي)' : 'Bank Transfer (CIB / QNB / NBE)'}</option>
                  <option value="Cash">{language === 'ar' ? 'نقداً (خزينة الشركة)' : 'Cash (Office Cashier)'}</option>
                  <option value="Card">{language === 'ar' ? 'بطاقة دفع / فيزا' : 'Credit / Debit Card'}</option>
                  <option value="Wallet">{language === 'ar' ? 'محفظة إلكترونية (إنستاباي / فودافون كاش)' : 'Vodafone Cash / Instapay'}</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500"
                >
                  {language === 'ar' ? 'إصدار السند وتحديث الرصيد' : 'Issue Receipt & Update Balance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

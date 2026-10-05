import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import { Customer } from '../../types';
import {
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  Bus,
  CheckCircle2,
  Clock,
  Shield,
  FileCheck,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const CustomersView: React.FC = () => {
  const {
    language,
    customers,
    selectedCustomerId,
    setSelectedCustomerId,
    bookings,
    leads,
    payments,
    setActiveModule,
    setSelectedBookingId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'bookings' | 'payments' | 'trips' | 'documents' | 'activity'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const customerBookings = bookings.filter(b => b.customerName === selectedCustomer?.name || b.customerId === selectedCustomer?.id);
  const customerLeads = leads.filter(l => l.customerName === selectedCustomer?.name);
  const customerPayments = payments.filter(p => p.customerName === selectedCustomer?.name);

  // Realistic operational lifecycle timeline for the selected customer
  const customerTimeline = [
    { titleEn: 'Trip completed & feedback logged', titleAr: 'اكتملت الرحلة وتسجيل تقييم العميل', time: '18 Oct 2026', status: 'upcoming', agentEn: 'Operations', agentAr: 'قسم العمليات' },
    { titleEn: 'Bus BUS-07 & 4 seats assigned (TRIP-1008)', titleAr: 'تخصيص أتوبيس BUS-07 وتسكين 4 مقاعد (TRIP-1008)', time: '05 Oct 2026 · 04:25 PM', status: 'completed', agentEn: 'Fleet Coordinator', agentAr: 'منسق الأسطول' },
    { titleEn: 'Coral Resort Hurghada rooms confirmed', titleAr: 'تأكيد حجز غرف فندق كورال ريزورت الغردقة', time: '05 Oct 2026 · 04:10 PM', status: 'completed', agentEn: 'Reservation Agent', agentAr: 'مسؤول الحجوزات' },
    { titleEn: 'Deposit received: 10,000 EGP via CIB Bank', titleAr: 'استلام العربون: 10,000 ج.م عبر بنك CIB', time: '05 Oct 2026 · 03:15 PM', status: 'completed', agentEn: 'Accountant', agentAr: 'المحاسب المالي' },
    { titleEn: 'Quotation approved & Booking TR-2044 created', titleAr: 'موافقة العميل على العرض وإنشاء الحجز TR-2044', time: '05 Oct 2026 · 02:00 PM', status: 'completed', agentEn: 'Omar Farouk', agentAr: 'عمر فاروق' },
    { titleEn: 'Formal quotation QUOT-901 sent (30,000 EGP)', titleAr: 'إرسال عرض السعر الرسمي QUOT-901 بقيمة 30,000 ج.م', time: '05 Oct 2026 · 12:30 PM', status: 'completed', agentEn: 'Omar Farouk', agentAr: 'عمر فاروق' },
    { titleEn: 'Sales Agent contacted customer via phone', titleAr: 'تواصل مسؤول المبيعات هاتفياً مع العميل', time: '05 Oct 2026 · 11:15 AM', status: 'completed', agentEn: 'Omar Farouk', agentAr: 'عمر فاروق' },
    { titleEn: 'Lead created by Moderator from Facebook campaign', titleAr: 'تسجيل ليد جديد عبر حملة إعلانات فيسبوك', time: '05 Oct 2026 · 10:42 AM', status: 'completed', agentEn: 'Sara Moderator', agentAr: 'سارة - ميديا' }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_customers')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'الملف الموحد للعميل، جواز السفر، جهات الطوارئ، وسجل الرحلات والمدفوعات'
              : 'Unified 360° customer profile, passport data, emergency contact & lifetime value'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Customer Directory List */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs flex flex-col">
          <div className="p-3 border-b border-slate-200">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {filteredCustomers.map(cust => {
              const isSelected = selectedCustomer?.id === cust.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-50/70 border-l-4 border-amber-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{cust.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{cust.phone}</div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {cust.id}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100/80">
                    <span>{cust.totalBookings} Bookings</span>
                    <span className="font-mono font-medium text-slate-800">
                      {formatEGP(cust.totalSpent, language)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 spans): Active Customer Comprehensive Card */}
        {selectedCustomer && (
          <div className="lg:col-span-2 space-y-4">
            {/* Top Identity Card */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{selectedCustomer.name}</h2>
                      <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {selectedCustomer.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                      <span>Nationality: {selectedCustomer.nationality}</span>
                      <span>·</span>
                      <span>Customer Since: {selectedCustomer.createdDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedBookingId('TR-2044');
                      setActiveModule('booking-detail');
                    }}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    View Active Booking →
                  </button>
                </div>
              </div>

              {/* Contact & Passport Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone Number</span>
                  <span className="font-mono font-medium text-slate-900">{selectedCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">WhatsApp</span>
                  <span className="font-mono font-medium text-emerald-700">{selectedCustomer.whatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="text-slate-900 truncate block">{selectedCustomer.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Passport / National ID</span>
                  <span className="font-mono font-semibold text-slate-800 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                    {selectedCustomer.passportNumber}
                  </span>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-3 p-2.5 bg-amber-50/60 rounded-md border border-amber-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span className="font-semibold text-amber-950">
                    {language === 'ar' ? 'جهة اتصال الطوارئ:' : 'Emergency Contact:'}
                  </span>
                  <span className="text-slate-700">
                    {selectedCustomer.emergencyContact.name} ({selectedCustomer.emergencyContact.relation})
                  </span>
                </div>
                <span className="font-mono text-slate-700">{selectedCustomer.emergencyContact.phone}</span>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
              <div className="border-b border-slate-200 px-4 flex items-center gap-4 text-xs font-medium overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-amber-500 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {getTranslation(language, 'tab_overview')}
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'bookings'
                      ? 'border-amber-500 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>{getTranslation(language, 'tab_bookings')}</span>
                  <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full">
                    {customerBookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'payments'
                      ? 'border-amber-500 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>{getTranslation(language, 'tab_payments')}</span>
                  <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full">
                    {customerPayments.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'activity'
                      ? 'border-amber-500 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {getTranslation(language, 'tab_activity')}
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                    activeTab === 'documents'
                      ? 'border-amber-500 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Vouchers & Documents
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px]">Lifetime Spend</span>
                        <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                          {formatEGP(selectedCustomer.totalSpent, language)}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px]">Total Bookings</span>
                        <div className="text-lg font-bold font-mono text-slate-900 mt-1">
                          {selectedCustomer.totalBookings}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[11px]">Customer Status</span>
                        <div className="text-xs font-bold text-amber-700 mt-1">
                          VIP Family Client
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Preferences & Notes</h4>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                        "{selectedCustomer.notes}"
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="space-y-3">
                    {customerBookings.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setSelectedBookingId(b.id);
                          setActiveModule('booking-detail');
                        }}
                        className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold font-mono text-slate-900">{b.id}</span>
                            <span className="font-semibold text-slate-800">{b.hotelName}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                              {b.status}
                            </span>
                          </div>
                          <div className="text-slate-500 mt-1">
                            {b.travelStartDate} → {b.travelEndDate} · {b.destination} · {b.adultsCount} Adults, {b.childrenCount} Children
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold font-mono text-slate-900">
                            {formatEGP(b.totalPrice, language)}
                          </div>
                          <div className="text-[11px] text-emerald-600">
                            Paid: {formatEGP(b.paidAmount, language)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-2">
                    {customerPayments.map(p => (
                      <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                        <div>
                          <div className="font-mono font-bold text-slate-900">{p.id} · {p.bookingId}</div>
                          <div className="text-slate-500 mt-0.5">{p.paymentDate} via {p.method} ({p.reference})</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-emerald-700 text-sm">
                            +{formatEGP(p.amount, language)}
                          </div>
                          <div className="text-[10px] text-slate-400">{p.receivedBy}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className={`relative ${language === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'} space-y-4 border-slate-200`}>
                    {customerTimeline.map((item, idx) => (
                      <div key={idx} className="relative text-xs">
                        <div className={`absolute ${language === 'ar' ? '-right-[21px]' : '-left-[21px]'} top-1 w-2.5 h-2.5 rounded-full ${
                          item.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'
                        } border-2 border-white`} />
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{language === 'ar' ? item.titleAr : item.titleEn}</span>
                          <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {language === 'ar' ? 'بواسطة' : 'by'} {language === 'ar' ? item.agentAr : item.agentEn}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-4 h-4 text-indigo-600" />
                        <div>
                          <div className="font-semibold text-slate-900">Hotel Voucher - VCH-HRG-2044</div>
                          <div className="text-slate-400 text-[11px]">Coral Resort Hurghada (2 Standard Rooms)</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBookingId('TR-2044');
                          setActiveModule('booking-detail');
                        }}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100"
                      >
                        Print Voucher
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Bus className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-semibold text-slate-900">Bus Boarding Pass - Seats 1, 2, 3, 4</div>
                          <div className="text-slate-400 text-[11px]">Alexandria → Hurghada (BUS-07 Mercedes)</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBookingId('TR-2044');
                          setActiveModule('passenger-lists');
                        }}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100"
                      >
                        Seat Map
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

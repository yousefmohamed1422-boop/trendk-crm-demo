import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateDestination, translateStatus } from '../../utils/i18n';
import { Hotel } from '../../types';
import {
  Hotel as HotelIcon,
  Star,
  MapPin,
  FileText,
  CalendarDays,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Plus,
  Users,
  CheckCircle2,
  Waves,
  Coffee,
  Sparkles,
  BedDouble
} from 'lucide-react';

export const HotelsView: React.FC = () => {
  const {
    language,
    hotels,
    contracts,
    selectedHotelId,
    setSelectedHotelId,
    setActiveModule,
    bookings
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'childPolicy' | 'contracts'>('overview');

  const selectedHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];
  const hotelContracts = contracts.filter(c => c.hotelId === selectedHotel?.id);
  const hotelBookings = bookings.filter(b => b.hotelId === selectedHotel?.id);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm">
              <HotelIcon className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{getTranslation(language, 'nav_hotels')}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  {hotels.length} {language === 'ar' ? 'فنادق ومنتجعات' : 'Resorts'}
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'إدارة عقود الفنادق المباشرة، فئات الغرف، وسعر الأطفال والمخصصات اليومية'
                  : 'Direct resort allotments, room inventory, child policy rules & supplier contracts'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('availability')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>{language === 'ar' ? 'فحص إتاحة الغرف والمخزون ←' : 'Check Room Availability →'}</span>
          </button>
          <button
            onClick={() => setActiveModule('contracts')}
            className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'العقود المباشرة' : 'Direct Contracts'}
          </button>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(hotel => {
          const isSelected = selectedHotel?.id === hotel.id;

          return (
            <div
              key={hotel.id}
              onClick={() => setSelectedHotelId(hotel.id)}
              className={`group bg-white rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-400/25 shadow-sm bg-amber-50/15'
                  : 'border-slate-200 hover:border-slate-300 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {hotel.contractType === 'Direct'
                        ? (language === 'ar' ? 'عقد مخصصات مباشر' : 'DIRECT CONTRACT')
                        : (language === 'ar' ? 'مورد وسيط' : 'VIA SUPPLIER')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      {hotel.id}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{hotel.city}, {translateDestination(language, hotel.destination)}</span>
                  </div>
                </div>

                <div className="flex items-center text-amber-500 shrink-0 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/60">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Amenity tags */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[10px] text-slate-600">
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded flex items-center gap-1">
                  <Waves className="w-2.5 h-2.5 text-blue-500" />
                  {language === 'ar' ? 'شاطئ خاص' : 'Private Beach'}
                </span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded flex items-center gap-1">
                  <Coffee className="w-2.5 h-2.5 text-amber-600" />
                  {language === 'ar' ? 'شامل كلياً' : 'All-Inclusive'}
                </span>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                  {language === 'ar' ? 'سياسة طفل مجاناً' : 'Child Free'}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'فئات الغرف' : 'Room Categories'}</span>
                  <span className="font-bold text-slate-800">{hotel.roomTypes.length} {language === 'ar' ? 'فئات غرف' : 'Room Types'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'مسؤول الحجوزات' : 'Contact Person'}</span>
                  <span className="font-semibold text-slate-800 truncate block">{hotel.contactPerson.split('(')[0]}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {translateStatus(language, hotel.status)}
                </span>
                <span className="text-slate-600 font-mono text-[11px]">
                  {hotel.phone}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Hotel Deep Dive Tabs */}
      {selectedHotel && (
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm mt-6">
          <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">{selectedHotel.name}</h2>
                <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-bold">
                  {selectedHotel.id}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {selectedHotel.contractType === 'Direct' ? (language === 'ar' ? 'عقد مخصصات مباشر' : 'Direct Allotment') : (language === 'ar' ? 'مورد وسيط' : 'Supplier Broker')}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <span>{selectedHotel.address}</span>
                <span className="text-slate-600">·</span>
                <span>{selectedHotel.contactPerson}</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono">{selectedHotel.phone}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${selectedHotel.phone}`}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'اتصال بالفندق' : 'Call Hotel'}</span>
              </a>

              <button
                onClick={() => setActiveModule('availability')}
                className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
              >
                {language === 'ar' ? 'عرض جدول إتاحة الغرف ←' : 'View Room Inventory Grid →'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 px-6 flex items-center gap-8 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'overview' ? 'border-amber-500 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {getTranslation(language, 'tab_overview')}
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'rooms' ? 'border-amber-500 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BedDouble className="w-3.5 h-3.5 text-slate-500" />
              <span>{getTranslation(language, 'tab_rooms')}</span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                {selectedHotel.roomTypes.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('childPolicy')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'childPolicy' ? 'border-amber-500 text-amber-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{getTranslation(language, 'tab_childPolicy')} (0–5 / 6–11 / 12+)</span>
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'contracts' ? 'border-amber-500 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{getTranslation(language, 'tab_contracts')}</span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                {hotelContracts.length}
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>{language === 'ar' ? 'بيانات وهوية الفندق' : 'Hotel Identity'}</span>
                    <span className="text-[10px] font-mono text-slate-400">#RESORT</span>
                  </h4>
                  <div className="text-slate-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'المدينة:' : 'City:'}</span>
                      <span className="font-bold text-slate-900">{selectedHotel.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'الوجهة:' : 'Destination:'}</span>
                      <span className="font-bold text-slate-900">{translateDestination(language, selectedHotel.destination)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'تصنيف النجوم:' : 'Stars Rating:'}</span>
                      <span className="font-bold text-amber-600">{selectedHotel.stars} {language === 'ar' ? 'نجوم فاخر' : 'Stars Luxury'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'نموذج التعاقد:' : 'Contract Model:'}</span>
                      <span className="font-bold text-slate-900">
                        {selectedHotel.contractType === 'Direct' ? (language === 'ar' ? 'عقد مباشر' : 'Direct') : (language === 'ar' ? 'عبر مورد' : 'Broker')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center justify-between">
                    <span>{language === 'ar' ? 'الاتصال التجاري وإدارة الحجوزات' : 'Commercial Contacts'}</span>
                    <span className="text-[10px] font-mono text-slate-400">#CONTACTS</span>
                  </h4>
                  <div className="text-slate-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'المسؤول:' : 'Contact:'}</span>
                      <span className="font-bold text-slate-900">{selectedHotel.contactPerson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'الهاتف المباشر:' : 'Phone:'}</span>
                      <span className="font-mono font-bold text-slate-900">{selectedHotel.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{language === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</span>
                      <span className="font-mono text-slate-900">{selectedHotel.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    {language === 'ar' ? 'الحجوزات الحالية في هذا الفندق' : 'Bookings at this Hotel'}
                  </h4>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                    {hotelBookings.length} {language === 'ar' ? 'حجوزات نشطة' : 'Active'}
                  </div>
                  <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'منها حجز TR-2044 (أحمد حسن)' : 'Including TR-2044 (Ahmed Hassan)'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-3 px-4">{language === 'ar' ? 'فئة الغرفة' : 'Room Type'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'سعر التكلفة التعاقدي / ليلة' : 'Base Cost / Night'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'سعر البيع القياسي' : 'Standard Selling Rate'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'هامش الربح المستهدف' : 'Target Margin'}</th>
                      <th className="py-3 px-4">{language === 'ar' ? 'المخصص اليومي (Allotment)' : 'Direct Allotment'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedHotel.roomTypes.map(rt => (
                      <tr key={rt.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-slate-900">{rt.name}</td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-700">
                          {formatEGP(rt.baseCost, language)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {formatEGP(rt.sellingRate, language)}
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-700 font-bold">
                          +{formatEGP(rt.sellingRate - rt.baseCost, language)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {rt.allotment} {language === 'ar' ? 'غرفة / ليلة' : 'Rooms / Night'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'childPolicy' && (
              <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200 space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <h4 className="font-bold text-amber-950 uppercase tracking-wider text-sm">
                    {language === 'ar'
                      ? `قواعد تسعير الأطفال المطبقة آلياً لـ ${selectedHotel.name}`
                      : `Automated Child Pricing Policy for ${selectedHotel.name}`}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                    <span className="font-bold text-slate-900 text-xs block">
                      {language === 'ar' ? 'الرضع والأطفال (0–5 سنوات)' : 'Infant (0–5 Years)'}
                    </span>
                    <span className="text-xl font-black font-mono text-emerald-600 block mt-1">
                      {language === 'ar' ? 'مجاناً 100%' : 'FREE (0%)'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === 'ar'
                        ? 'بدون أي رسوم إضافية عند مشاركة غرفة الوالدين.'
                        : 'No extra charge when sharing bed or crib with 2 paying adults.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                    <span className="font-bold text-slate-900 text-xs block">
                      {language === 'ar' ? 'الأطفال (6–11 سنة)' : 'Child (6–11 Years)'}
                    </span>
                    <span className="text-xl font-black font-mono text-amber-600 block mt-1">
                      {language === 'ar' ? '50% من سعر الفرد' : '50% OF ADULT'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === 'ar'
                        ? 'يتم احتساب نصف سعر الإقامة مع توفير سرير إضافي حسب الطلب.'
                        : 'Half price applicable. Extra bed supplied upon request.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs">
                    <span className="font-bold text-slate-900 text-xs block">
                      {language === 'ar' ? 'اليافعين والبالغين (12+ سنة)' : 'Teen / Adult (12+ Years)'}
                    </span>
                    <span className="text-xl font-black font-mono text-slate-900 block mt-1">
                      {language === 'ar' ? '100% سعر كامل' : '100% ADULT RATE'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === 'ar'
                        ? 'يطبق السعر الكامل للبالغ شامل خطة الوجبات المحددة.'
                        : 'Standard adult rate applies for accommodation and meal plan.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-amber-200/80 text-slate-700 mt-2">
                  <div className="font-bold text-slate-900 mb-1">
                    {language === 'ar' ? 'نص البند التعاقدي الرسمي:' : 'Contractual Policy Text:'}
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {language === 'ar' ? selectedHotel.childPolicy.rulesTextAr : selectedHotel.childPolicy.rulesTextEn}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contracts' && (
              <div className="space-y-3">
                {hotelContracts.map(c => (
                  <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center shadow-2xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {c.id}
                        </span>
                        <span className="font-bold text-slate-800">{c.roomType}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {c.mealPlan}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-1.5 font-mono">
                        Valid: {c.startDate} → {c.endDate} · Allotment: {c.allotment} Rooms · Release: {c.releasePeriodDays} Days
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black font-mono text-slate-900 text-sm">
                        {formatEGP(c.roomRate, language)} / {language === 'ar' ? 'ليلة' : 'Night'}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Extra Bed: {formatEGP(c.extraBedRate, language)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

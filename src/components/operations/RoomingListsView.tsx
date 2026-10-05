import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, translateDestination } from '../../utils/i18n';
import { RoomAssignment } from '../../types';
import {
  BedDouble,
  Hotel,
  Printer,
  FileCheck,
  Search,
  Users,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const RoomingListsView: React.FC = () => {
  const { language, bookings, hotels, selectedBookingId, setSelectedBookingId, setActiveModule } = useApp();

  const [selectedHotelFilter, setSelectedHotelFilter] = useState('HOTEL-01');

  const selectedBooking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_rooming_lists')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'توليد كشوف تسكين الغرف الرسمية وتوزيع النزلاء والأطفال لكل فندق ومنتجع'
              : 'Official hotel guest room allocation schedules, bed configurations & child ages'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'طباعة وتصدير كشف التسكين' : 'Print / Export Hotel Rooming List'}</span>
        </button>
      </div>

      {/* Select Booking Strip */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">
            {language === 'ar' ? 'اختر الحجز:' : 'Select Booking:'}
          </span>
          <select
            value={selectedBooking.id}
            onChange={e => setSelectedBookingId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 font-mono font-bold text-slate-900 cursor-pointer"
          >
            {bookings.map(b => (
              <option key={b.id} value={b.id}>
                {b.id}: {b.customerName} - {b.hotelName} ({b.numberOfRooms} {language === 'ar' ? 'غرف' : 'Rooms'})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-600 font-mono">
          {language === 'ar' ? 'تسجيل الدخول: ' : 'Check-in: '}
          <strong>{selectedBooking.travelStartDate}</strong> · {language === 'ar' ? 'تسجيل المغادرة: ' : 'Check-out: '}
          <strong>{selectedBooking.travelEndDate}</strong>
        </div>
      </div>

      {/* Official Rooming List Document View */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              {language === 'ar' ? 'فاوتشر التسكين الفندقي الرسمي وكشف الغرف' : 'Official Tourism Voucher & Rooming Manifest'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {selectedBooking.hotelName} - {translateDestination(language, selectedBooking.destination)}
            </h2>
            <div className="text-xs text-slate-500 mt-1">
              {language === 'ar' ? 'مرجع الحجز: ' : 'Booking Ref: '}
              <strong className="font-mono text-slate-900">{selectedBooking.id}</strong> · {language === 'ar' ? 'العميل الرئيسي: ' : 'Client: '}
              <strong>{selectedBooking.customerName}</strong>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400 block text-[11px]">
              {language === 'ar' ? 'نظام الوجبات والإقامة' : 'Meal Plan & Inclusions'}
            </span>
            <span className="font-bold text-slate-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
              {language === 'ar' ? 'إقامة شاملة ناعمة (Soft All-Inclusive)' : 'All Inclusive Soft Concept'}
            </span>
          </div>
        </div>

        {/* Room Allocations Grid (Requirement #18) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedBooking.roomAssignments.map((rm, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-purple-700" />
                  <span className="font-bold font-mono text-base text-slate-900">
                    {language === 'ar' ? `غرفة ${rm.roomNumber}` : rm.roomNumber}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {rm.roomType}
                </span>
              </div>

              {/* Guest Manifest */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  {language === 'ar' ? 'النزلاء المخصصون والأعمار:' : 'Assigned Guests & Ages:'}
                </span>
                {rm.guests.map((guest, gIdx) => (
                  <div
                    key={gIdx}
                    className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">{guest.name}</span>
                      <div className="text-[10px] text-slate-400">
                        {guest.type === 'Child'
                          ? (language === 'ar' ? `طفل (العمر: ${guest.age || 7} سنوات)` : `Child (Age: ${guest.age || 7} Years)`)
                          : (language === 'ar' ? 'بالغ (نزيل رئيسي)' : 'Adult (Primary Guest)')}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      guest.type === 'Child' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {guest.type === 'Child' ? (language === 'ar' ? 'طفل' : 'Child') : (language === 'ar' ? 'بالغ' : 'Adult')}
                    </span>
                  </div>
                ))}
              </div>

              {rm.specialRequests && (
                <div className="p-2 bg-amber-50/60 rounded border border-amber-200/60 text-[11px] text-amber-950">
                  <strong>{language === 'ar' ? 'ملاحظة خاصة لاستقبال الفندق:' : 'Hotel Front Desk Request:'}</strong> {rm.specialRequests}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Notes for Hotel Front Desk */}
        <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 space-y-1">
          <div className="font-bold text-slate-800">
            {language === 'ar' ? 'تعليمات وإرشادات خاصة لمكتب استقبال الفندق:' : 'Special Reception Instructions:'}
          </div>
          <div>
            {language === 'ar'
              ? '1. يبدأ تسجيل الوصول الساعة 02:00 ظهراً. تقديم مشروب الترحيب بصالة الاستقبال.'
              : '1. Check-in time starts at 02:00 PM. Welcome drinks to be served at the lobby lounge.'}
          </div>
          <div>
            {language === 'ar'
              ? '2. تجهيز سرير إضافي مسبقاً في الغرفة 102 قبل وصول النزلاء على أتوبيس الإسكندرية.'
              : '2. Rollaway extra bed to be pre-set in Room 102 prior to guest arrival from Alexandria bus.'}
          </div>
          <div>
            {language === 'ar'
              ? '3. تعليمات الفوترة: جميع أسعار الغرف ونظام الوجبات مسجلة على حساب الشركة الرئيسي المباشر. المصاريف الشخصية على العميل.'
              : '3. Billing instructions: All room rates & meal plan billed directly to company master account. Extras on client account.'}
          </div>
        </div>
      </div>
    </div>
  );
};

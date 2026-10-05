import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateDestination, translateStatus } from '../../utils/i18n';
import { SupplierRequestStatus, SupplierAvailabilityRequest } from '../../types';
import {
  CalendarDays,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Plus,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AvailabilityView: React.FC = () => {
  const {
    language,
    roomInventory,
    supplierRequests,
    hotels,
    suppliers,
    updateHotelAvailability,
    addSupplierRequest,
    updateSupplierRequestStatus,
    setActiveModule,
    setSelectedHotelId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'typeA' | 'typeB'>('typeA');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedHotelFilter, setSelectedHotelFilter] = useState('HOTEL-01');

  // Supplier Request Modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [reqForm, setReqForm] = useState({
    hotelName: 'Coral Resort Hurghada (Overflow)',
    destination: 'Hurghada',
    supplierId: 'SUP-01',
    supplierName: 'XYZ Tourism & Hotel Brokers',
    checkIn: '2026-10-15',
    checkOut: '2026-10-18',
    roomsCount: 2,
    adultsCount: 4,
    childrenCount: 2,
    roomType: 'Standard Room'
  });

  const handleCreateSupplierRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find(s => s.id === reqForm.supplierId);
    addSupplierRequest({
      hotelName: reqForm.hotelName,
      destination: reqForm.destination,
      supplierId: reqForm.supplierId,
      supplierName: sup ? sup.name : reqForm.supplierName,
      checkIn: reqForm.checkIn,
      checkOut: reqForm.checkOut,
      roomsCount: Number(reqForm.roomsCount),
      adultsCount: Number(reqForm.adultsCount),
      childrenCount: Number(reqForm.childrenCount),
      roomType: reqForm.roomType,
      status: 'Sent',
      supplierQuote: 4800,
      validUntil: '6:00 PM Today',
      notes: 'Requested urgent response for October break group.'
    });
    setIsRequestModalOpen(false);
  };

  // Filter inventory for Type A
  const filteredInventory = roomInventory.filter(
    inv => inv.hotelId === selectedHotelFilter && inv.date === selectedDate
  );

  const getStatusBadge = (status: SupplierRequestStatus) => {
    const map: Record<SupplierRequestStatus, string> = {
      Draft: 'bg-slate-100 text-slate-700 border-slate-300',
      Sent: 'bg-blue-50 text-blue-700 border-blue-200',
      'Waiting Supplier': 'bg-amber-50 text-amber-800 border-amber-200',
      Available: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      'Not Available': 'bg-rose-50 text-rose-700 border-rose-200',
      Expired: 'bg-slate-100 text-slate-500 border-slate-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${map[status] || 'bg-slate-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_availability')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'نموذجان للإتاحة: (أ) مخزون التعاقد المباشر · (ب) طلبات الإتاحة عبر الموردين والبروكرز'
              : 'Dual workflow: Type A (Direct Contract Inventory) & Type B (Supplier Availability Requests)'}
          </p>
        </div>

        {/* Workflow Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('typeA')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'typeA'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'النوع (أ): غرف التعاقد المباشر' : 'TYPE A: Direct Hotel Allotment'}
          </button>
          <button
            onClick={() => setActiveTab('typeB')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'typeB'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'النوع (ب): إتاحة عبر مورد / وسيط' : 'TYPE B: Hotel via Supplier / Broker'}
          </button>
        </div>
      </div>

      {/* ================= TYPE A: DIRECT HOTEL ALLOTMENT ================= */}
      {activeTab === 'typeA' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-slate-700">{language === 'ar' ? 'الفندق:' : 'Hotel:'}</span>
                <select
                  value={selectedHotelFilter}
                  onChange={e => setSelectedHotelFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-medium cursor-pointer"
                >
                  <option value="HOTEL-01">Coral Resort Hurghada ({language === 'ar' ? 'عقد مباشر' : 'Direct Contract'})</option>
                  <option value="HOTEL-02">Steigenberger Ras Soma ({language === 'ar' ? 'عقد مباشر' : 'Direct Contract'})</option>
                  <option value="HOTEL-03">Sunrise Royal Makadi ({language === 'ar' ? 'عقد مباشر' : 'Direct Contract'})</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-slate-700">{language === 'ar' ? 'التاريخ:' : 'Date:'}</span>
                <select
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-mono font-medium cursor-pointer"
                >
                  <option value="2026-10-15">15 October 2026</option>
                  <option value="2026-10-16">16 October 2026</option>
                  <option value="2026-10-17">17 October 2026</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              {language === 'ar' ? 'خصم فوري من المخزون عند تأكيد الحجز' : 'Live Contract Inventory: Automatic Deductions'}
            </div>
          </div>

          {/* Direct Inventory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInventory.map(item => {
              const occupancyPct = Math.round((item.bookedRooms / item.totalRooms) * 100);

              return (
                <div
                  key={item.roomTypeId}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {item.date}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mt-0.5">
                        {item.roomTypeName}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-emerald-600">
                        {item.availableRooms}
                      </span>
                      <span className="text-xs text-slate-500 block">{language === 'ar' ? 'متاح للحجز' : 'Available'}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                      <span>{language === 'ar' ? 'محجوز:' : 'Booked:'} {item.bookedRooms} / {item.totalRooms}</span>
                      <span>{occupancyPct}% {language === 'ar' ? 'نسبة الإشغال' : 'Occupied'}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          occupancyPct > 80 ? 'bg-rose-500' : occupancyPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Direct Action buttons to test dynamic allotment deduction */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      {language === 'ar' ? 'تجربة الخصم اللحظي من الغرف:' : 'Test Live Room Allotment:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateHotelAvailability(item.hotelId, item.date, item.roomTypeId, 1)}
                        disabled={item.availableRooms <= 0}
                        className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
                      >
                        {language === 'ar' ? '+ حجز غرفة (-1 متاح)' : '+ Book 1 Room (-1 Avail)'}
                      </button>
                      <button
                        onClick={() => updateHotelAvailability(item.hotelId, item.date, item.roomTypeId, -1)}
                        disabled={item.bookedRooms <= 0}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium hover:bg-slate-200 cursor-pointer"
                      >
                        {language === 'ar' ? 'إلغاء حجز' : 'Release'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Allotment Summary */}
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950 block">
                {language === 'ar' ? 'ملخص إتاحة الغرف والتعاقد المباشر:' : 'Direct Contract Allotment Summary for Coral Resort Hurghada:'}
              </span>
              <p className="text-emerald-900 mt-0.5 leading-relaxed">
                {language === 'ar'
                  ? 'الغرف القياسية (Standard): الإجمالي 20، المحجوز 13، المتاح 7. الغرف المطلة على البحر (Sea View): الإجمالي 10، المحجوز 7، المتاح 3. الحجز يخصم تلقائياً من الإتاحة.'
                  : 'Standard Rooms: Total 20, Booked 13, 7 Available. Sea View Rooms: Total 10, Booked 7, 3 Available. New bookings automatically reduce available room inventory in real-time.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TYPE B: HOTEL THROUGH SUPPLIER / BROKER ================= */}
      {activeTab === 'typeB' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              {language === 'ar'
                ? 'عند امتلاء مخصص الفندق المباشر، يتم طلب إتاحة خاصة من بروكر الفنادق أو الشركات السياحية الشريكة.'
                : 'When direct contracted allotment is full, request rooms from hotel brokers or partner tour operators.'}
            </div>

            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="px-3.5 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{getTranslation(language, 'btn_new_req')}</span>
            </button>
          </div>

          {/* Supplier Requests Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'رقم الطلب' : 'Request ID'}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'الفندق والوجهة' : 'Hotel & Destination'}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'المورد / البروكر' : 'Broker / Supplier'}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'التواريخ' : 'Dates'}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'الغرف والأفراد' : 'Rooms & Pax'}</th>
                    <th className="py-2.5 px-3">{getTranslation(language, 'status')}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'تسعير المورد' : 'Supplier Quote'}</th>
                    <th className="py-2.5 px-3">{language === 'ar' ? 'الصلاحية' : 'Validity'}</th>
                    <th className="py-2.5 px-3 text-right">{getTranslation(language, 'actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                        {req.id}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">{req.hotelName}</div>
                        <div className="text-[10px] text-slate-400">{translateDestination(language, req.destination)}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-800">
                        {req.supplierName}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                        {req.checkIn} → {req.checkOut}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {req.roomsCount} {language === 'ar' ? 'غرف' : 'Rooms'} · {req.adultsCount}A / {req.childrenCount}C
                      </td>
                      <td className="py-2.5 px-3">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        {req.supplierQuote ? formatEGP(req.supplierQuote, language) : '-'}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-amber-800 text-[11px] font-semibold">
                        {req.validUntil}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {req.status === 'Sent' || req.status === 'Waiting Supplier' ? (
                          <button
                            onClick={() => updateSupplierRequestStatus(req.id, 'Available')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-medium"
                          >
                            {language === 'ar' ? 'تأكيد الإتاحة' : 'Accept Available'}
                          </button>
                        ) : req.status === 'Available' ? (
                          <button
                            onClick={() => setActiveModule('quotations')}
                            className="px-2 py-1 bg-amber-500 text-slate-950 rounded text-[11px] font-bold hover:bg-amber-400 cursor-pointer"
                          >
                            {language === 'ar' ? 'إنشاء تسعير ←' : 'Use in Quote →'}
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px] font-mono">
                            {translateStatus(language, req.status)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* New Supplier Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              Request Room Availability from Supplier / Broker
            </h3>
            <form onSubmit={handleCreateSupplierRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Hotel Name *</label>
                <input
                  type="text"
                  required
                  value={reqForm.hotelName}
                  onChange={e => setReqForm({ ...reqForm, hotelName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Supplier / Broker *</label>
                <select
                  value={reqForm.supplierId}
                  onChange={e => setReqForm({ ...reqForm, supplierId: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={reqForm.checkIn}
                    onChange={e => setReqForm({ ...reqForm, checkIn: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={reqForm.checkOut}
                    onChange={e => setReqForm({ ...reqForm, checkOut: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Rooms Count</label>
                  <input
                    type="number"
                    min="1"
                    value={reqForm.roomsCount}
                    onChange={e => setReqForm({ ...reqForm, roomsCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={reqForm.adultsCount}
                    onChange={e => setReqForm({ ...reqForm, adultsCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Children</label>
                  <input
                    type="number"
                    min="0"
                    value={reqForm.childrenCount}
                    onChange={e => setReqForm({ ...reqForm, childrenCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-semibold hover:bg-slate-800"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

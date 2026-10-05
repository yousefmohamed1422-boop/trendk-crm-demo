import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, translateDestination } from '../../utils/i18n';
import { Booking, OperationsChecklist } from '../../types';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Bus,
  Hotel,
  User,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const OperationsBoardView: React.FC = () => {
  const {
    language,
    bookings,
    toggleOperationChecklistItem,
    setSelectedBookingId,
    setActiveModule
  } = useApp();

  const checklistKeys: { key: keyof OperationsChecklist; labelEn: string; labelAr: string }[] = [
    { key: 'hotelConfirmed', labelEn: 'Hotel Confirmed', labelAr: 'تأكيد الفندق' },
    { key: 'roomsConfirmed', labelEn: 'Rooms Confirmed', labelAr: 'حجز الغرف' },
    { key: 'paymentChecked', labelEn: 'Payment Checked', labelAr: 'فحص الدفعة' },
    { key: 'busAssigned', labelEn: 'Bus Assigned', labelAr: 'تعيين الأتوبيس' },
    { key: 'driverAssigned', labelEn: 'Driver Assigned', labelAr: 'تعيين السائق' },
    { key: 'passengerListCompleted', labelEn: 'Pax List', labelAr: 'كشف الركاب' },
    { key: 'roomingListCompleted', labelEn: 'Rooming List', labelAr: 'قائمة التسكين' },
    { key: 'voucherSent', labelEn: 'Voucher Sent', labelAr: 'إرسال الفاوتشر' },
    { key: 'customerContacted', labelEn: 'Contacted', labelAr: 'التواصل بالعميل' },
    { key: 'readyForTravel', labelEn: 'Ready for Travel', labelAr: 'جاهز للسفر' }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_operations_board')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'متابعة بنود تشغيل وجاهزية الرحلات لكل حجز، فحص الفندق، الأتوبيس، وقوائم التسكين'
              : 'End-to-end operational dispatching checklist and readiness tracking matrix'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('rooming-lists')}
            className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            {language === 'ar' ? 'قوائم تسكين الفنادق ←' : 'Hotel Rooming Lists →'}
          </button>
        </div>
      </div>

      {/* Operations Matrix Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'رقم الحجز' : 'Booking ID'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'العميل والوجهة' : 'Customer & Destination'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'نسبة الجاهزية %' : 'Readiness %'}</th>
                {checklistKeys.map(k => (
                  <th key={k.key} className="py-2.5 px-2 text-center text-[10px] whitespace-nowrap">
                    {language === 'ar' ? k.labelAr : k.labelEn}
                  </th>
                ))}
                <th className="py-2.5 px-3 text-right">{language === 'ar' ? 'التفاصيل' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(bk => (
                <tr key={bk.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    <button
                      onClick={() => {
                        setSelectedBookingId(bk.id);
                        setActiveModule('booking-detail');
                      }}
                      className="hover:underline cursor-pointer"
                    >
                      {bk.id}
                    </button>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{bk.customerName}</div>
                    <div className="text-[10px] text-slate-400">{bk.hotelName} ({translateDestination(language, bk.destination)})</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {bk.operationsProgress}%
                      </span>
                      <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            bk.operationsProgress === 100
                              ? 'bg-emerald-500'
                              : bk.operationsProgress >= 70
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${bk.operationsProgress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Checklist Columns */}
                  {checklistKeys.map(item => {
                    const isChecked = bk.operationsChecklist[item.key];
                    return (
                      <td
                        key={item.key}
                        onClick={() => toggleOperationChecklistItem(bk.id, item.key)}
                        className="py-3 px-2 text-center cursor-pointer hover:bg-slate-100"
                        title={language === 'ar' ? `تغيير حالة: ${item.labelAr}` : `Toggle ${item.labelEn}`}
                      >
                        {isChecked ? (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300 text-xs">
                            ·
                          </span>
                        )}
                      </td>
                    );
                  })}

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedBookingId(bk.id);
                        setActiveModule('booking-detail');
                      }}
                      className="text-xs text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                    >
                      {language === 'ar' ? 'عرض الملف ←' : 'Open →'}
                    </button>
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

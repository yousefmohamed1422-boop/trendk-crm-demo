import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translatePaymentMethod } from '../../utils/i18n';
import { PaymentRecord, PaymentMethod } from '../../types';
import {
  Wallet,
  Plus,
  CreditCard,
  Building,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Search,
  Printer
} from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const { language, payments, bookings, addPayment, setActiveModule, setSelectedBookingId } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingForPay, setSelectedBookingForPay] = useState('TR-2044');
  const [amount, setAmount] = useState(20000);
  const [method, setMethod] = useState<PaymentMethod>('Bank Transfer');
  const [reference, setReference] = useState('CIB-TX-998822');
  const [notes, setNotes] = useState('Remaining balance settlement prior to trip departure');

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalReceivables = bookings.reduce((sum, b) => sum + b.remainingAmount, 0);

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const bk = bookings.find(b => b.id === selectedBookingForPay);
    addPayment({
      bookingId: selectedBookingForPay,
      customerName: bk ? bk.customerName : 'Ahmed Hassan',
      amount: Number(amount),
      method,
      paymentDate: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      receivedBy: 'Heba Accountant',
      reference,
      notes,
      type: 'Final Payment'
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_payments')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'سندات القبض، جداول سداد العربون والمتبقي، وتنبيهات التحصيل قبل موعد السفر'
              : 'Customer receipts, deposit schedules, balance collections & overdue payment alerts'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{getTranslation(language, 'addPayment')}</span>
        </button>
      </div>

      {/* Financial KPIs Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
            {language === 'ar' ? 'إجمالي النقدية المحصلة' : 'Total Cash Collected'}
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {formatEGP(totalCollected, language)}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            {language === 'ar' ? `خلال ${payments.length} عمليات دفع ومقبوضات` : `Across ${payments.length} transactions`}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">
            {language === 'ar' ? 'مستحقات العملاء غير المحصلة' : 'Outstanding Receivables'}
          </span>
          <div className="text-2xl font-bold font-mono text-rose-600 mt-1">
            {formatEGP(totalReceivables, language)}
          </div>
          <span className="text-[11px] text-rose-500 font-medium mt-0.5 block">
            {language === 'ar' ? 'حجز TR-2044 متبقي عليه 20,000 ج.م' : 'TR-2044 has 20,000 EGP due'}
          </span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span className="font-bold text-amber-950 text-xs">
              {language === 'ar' ? 'تنبيه تحصيل عاجل: حجز TR-2044' : 'Urgent Payment Alert: TR-2044'}
            </span>
          </div>
          <div className="text-xs text-amber-900 mt-1 leading-relaxed">
            {language === 'ar'
              ? 'العميل أحمد حسن: متبقي عليه 20,000 ج.م يجب تحصيلها قبل انطلاق الرحلة في 10 أكتوبر.'
              : 'Ahmed Hassan remaining balance: 20,000 EGP due before departure on 10 October.'}
          </div>
        </div>
      </div>

      {/* Payment Schedule Table (Requirement #12) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            {language === 'ar' ? 'جداول سداد الحجوزات ونسب التحصيل' : 'Booking Payment Schedules & Collection Progress'}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            {language === 'ar' ? 'حالة العربون والدفعة النهائية' : 'Deposit & Final Installment Status'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'رقم الحجز' : 'Booking ID'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'إجمالي الحجز' : 'Booking Total'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'حالة العربون' : 'Deposit Status'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المبلغ المتبقي' : 'Remaining Balance'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'تاريخ الاستحقاق' : 'Collection Due Date'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'ar' ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(bk => (
                <tr key={bk.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {bk.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {bk.customerName}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {formatEGP(bk.totalPrice, language)}
                  </td>
                  <td className="py-2.5 px-3">
                    {bk.paidAmount > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {formatEGP(bk.paidAmount, language)} {language === 'ar' ? 'مدفوع' : 'PAID'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-50 text-rose-800 font-bold border border-rose-200">
                        {language === 'ar' ? 'غير مسدد' : 'UNPAID'}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {bk.remainingAmount > 0 ? (
                      <span className="text-rose-600 font-bold">
                        {formatEGP(bk.remainingAmount, language)}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">
                        {language === 'ar' ? 'مسدد بالكامل' : 'Fully Settled'}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {bk.remainingAmount > 0 ? '10 October 2026' : (language === 'ar' ? 'مكتمل' : 'Completed')}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {bk.remainingAmount > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedBookingForPay(bk.id);
                          setAmount(bk.remainingAmount);
                          setIsModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-500 cursor-pointer"
                      >
                        {language === 'ar' ? 'تحصيل المتبقي' : 'Receive Balance'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedBookingId(bk.id);
                          setActiveModule('booking-detail');
                        }}
                        className="px-2 py-1 text-slate-500 hover:text-slate-900 text-xs cursor-pointer"
                      >
                        {language === 'ar' ? 'عرض السند' : 'View Receipt'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipts Ledger Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            {language === 'ar' ? 'جميع سندات القبض ومعاملات الدفع' : 'All Receipts & Payment Transactions'}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            {payments.length} {language === 'ar' ? 'سندات' : 'Records'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'رقم السند' : 'Receipt ID'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الحجز' : 'Booking'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'طريقة الدفع' : 'Method'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المرجع البنكي' : 'Reference / Tx'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المستلم' : 'Received By'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {p.id}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-amber-800">
                    {p.bookingId}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {p.customerName}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                    {formatEGP(p.amount, language)}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                      {translatePaymentMethod(language, p.method)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {p.reference}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                    {p.paymentDate}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {p.receivedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              {language === 'ar' ? 'تسجيل دفعة عميل / إصدار سند قبض' : 'Record Customer Payment / Issue Receipt'}
            </h3>
            <form onSubmit={handleRecord} className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'اختر الحجز *' : 'Select Booking *'}
                </label>
                <select
                  value={selectedBookingForPay}
                  onChange={e => setSelectedBookingForPay(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono font-bold"
                >
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} - {b.customerName} ({language === 'ar' ? 'المتبقي: ' : 'Due: '}{formatEGP(b.remainingAmount, language)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'المبلغ المراد تحصيله (ج.م) *' : 'Amount to Collect (EGP) *'}
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={e => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
                </label>
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                >
                  <option value="Bank Transfer">{language === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</option>
                  <option value="Cash">{language === 'ar' ? 'نقداً (الخزينة)' : 'Cash (Front Desk)'}</option>
                  <option value="Card">{language === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}</option>
                  <option value="Wallet">{language === 'ar' ? 'محفظة إلكترونية (إنستاباي / فودافون كاش)' : 'Wallet (Vodafone Cash / Instapay)'}</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'المرجع البنكي / كود المعاملة' : 'Bank Reference / Tx ID'}
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                  placeholder="e.g. CIB-TX-998822"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-bold hover:bg-slate-800"
                >
                  {language === 'ar' ? 'حفظ السند وتحديث الرصيد' : 'Save & Update Balance'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import { Booking, BookingStatus } from '../../types';
import {
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Bus,
  Hotel,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const BookingsView: React.FC = () => {
  const {
    language,
    bookings,
    selectedBookingId,
    setSelectedBookingId,
    setActiveModule,
    setSelectedCustomerId,
    setSelectedHotelId,
    setSelectedTripId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    const map: Record<BookingStatus, string> = {
      Pending: 'bg-slate-100 text-slate-700 border-slate-300',
      'Deposit Paid': 'bg-amber-50 text-amber-900 border-amber-300',
      Confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
      'Ready for Travel': 'bg-emerald-50 text-emerald-800 border-emerald-300',
      'In Progress': 'bg-purple-50 text-purple-800 border-purple-200',
      Completed: 'bg-slate-100 text-slate-600 border-slate-200',
      Cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
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
            {getTranslation(language, 'nav_bookings')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'إدارة الحجوزات المؤكدة، ربط العميل بالفندق والأتوبيس وتتبع جاهزية العمليات'
              : 'End-to-end booking registry visually linking customer, hotel, coach fleet & checklist'}
          </p>
        </div>

        <button
          onClick={() => setActiveModule('quotations')}
          className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
        >
          + New Booking from Quotation
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={getTranslation(language, 'search')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="All">All Bookings ({bookings.length})</option>
            <option value="Pending">Pending</option>
            <option value="Deposit Paid">Deposit Paid</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Ready for Travel">Ready for Travel</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Hotel & Room</th>
                <th className="py-2.5 px-3">Travel Dates</th>
                <th className="py-2.5 px-3">Transport</th>
                <th className="py-2.5 px-3">Financials (Total / Paid / Remaining)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Operations</th>
                <th className="py-2.5 px-3 text-right">View Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map(b => (
                <tr
                  key={b.id}
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setActiveModule('booking-detail');
                  }}
                  className={`cursor-pointer transition-colors ${
                    selectedBookingId === b.id ? 'bg-amber-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {b.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{b.customerName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{b.customerPhone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">{b.hotelName}</div>
                    <div className="text-[10px] text-slate-500">{b.numberOfRooms}x {b.roomType}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    <div>{b.travelStartDate}</div>
                    <div className="text-[10px] text-slate-400">to {b.travelEndDate}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 text-purple-800 border border-purple-200">
                      {b.busId || b.transportationType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-slate-900">
                      {formatEGP(b.totalPrice, language)}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-700">
                      Paid: {formatEGP(b.paidAmount, language)}
                    </div>
                    {b.remainingAmount > 0 ? (
                      <div className="text-[10px] font-mono text-rose-600 font-semibold">
                        Due: {formatEGP(b.remainingAmount, language)}
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-emerald-600 font-semibold">
                        Fully Paid ✓
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(b.status)}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.operationsProgress === 100
                              ? 'bg-emerald-500'
                              : b.operationsProgress >= 70
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${b.operationsProgress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-700">
                        {b.operationsProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center justify-end gap-1">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
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

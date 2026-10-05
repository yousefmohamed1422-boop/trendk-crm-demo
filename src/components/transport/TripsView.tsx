import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateStatus } from '../../utils/i18n';
import { Trip, TripStatus } from '../../types';
import {
  Navigation,
  Bus as BusIcon,
  UserCheck,
  Clock,
  Calendar,
  Users2,
  DollarSign,
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react';

export const TripsView: React.FC = () => {
  const {
    language,
    trips,
    buses,
    drivers,
    selectedTripId,
    setSelectedTripId,
    setActiveModule,
    assignTripBusAndDriver
  } = useApp();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBusToAssign, setSelectedBusToAssign] = useState('BUS-07');
  const [selectedDriverToAssign, setSelectedDriverToAssign] = useState('DRV-01');

  const selectedTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;
    assignTripBusAndDriver(selectedTrip.id, selectedBusToAssign, selectedDriverToAssign);
    setIsAssignModalOpen(false);
  };

  const getStatusBadge = (status: TripStatus) => {
    const map: Record<TripStatus, string> = {
      Planning: 'bg-slate-100 text-slate-700 border-slate-300',
      Open: 'bg-blue-50 text-blue-800 border-blue-200',
      Ready: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      Departed: 'bg-purple-50 text-purple-800 border-purple-200',
      Arrived: 'bg-amber-50 text-amber-800 border-amber-200',
      Completed: 'bg-slate-100 text-slate-600 border-slate-200',
      Cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${map[status] || 'bg-slate-100'}`}>
        {translateStatus(language, status)}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_trips')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'جدولة رحلات الأتوبيسات السياحية، تعيين السائق والمقاعد وتتبع سعة الحجز'
              : 'Coach departures schedule, bus & driver rosters, route manifests & seat occupancy'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('passenger-lists')}
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            {language === 'ar' ? 'مخطط المقاعد والمانيفست ←' : 'Seat Map & Manifest →'}
          </button>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'رقم الرحلة' : 'Trip ID'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'خط السير' : 'Route'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'موعد المغادرة' : 'Departure Date & Time'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'تاريخ العودة' : 'Return Date'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الحافلة المعينة' : 'Assigned Bus'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'كابتن الرحلة' : 'Captain Driver'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'إشغال المقاعد' : 'Seat Occupancy'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map(trip => (
                <tr
                  key={trip.id}
                  onClick={() => setSelectedTripId(trip.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedTrip?.id === trip.id ? 'bg-amber-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {trip.id}
                  </td>
                  <td className="py-3 px-3 font-semibold text-purple-950">
                    {trip.route}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-800">
                    {trip.departureDate} ({trip.departureTime})
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {trip.returnDate}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-900">{trip.busId}</span>
                    <div className="text-[10px] text-slate-400 font-mono">{trip.busPlate}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {trip.driverName}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-slate-900">
                      {trip.bookedSeats} / {trip.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">
                      {trip.availableSeats} {language === 'ar' ? 'مقعد شاغر' : 'available'}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(trip.status)}
                  </td>
                  <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedTripId(trip.id);
                        setIsAssignModalOpen(true);
                      }}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      {language === 'ar' ? 'تعيين حافلة / سائق' : 'Assign Bus/Driver'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Trip Showcase Card */}
      {selectedTrip && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs mt-6">
          <div className="p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded font-bold">
                  {selectedTrip.id}
                </span>
                <h2 className="text-base font-bold text-white">
                  {selectedTrip.route}
                </h2>
                {getStatusBadge(selectedTrip.status)}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar'
                  ? `التحرك: ${selectedTrip.departureDate} الساعة ${selectedTrip.departureTime} من (${selectedTrip.originCity}) · العودة: ${selectedTrip.returnDate}`
                  : `Departure: ${selectedTrip.departureDate} at ${selectedTrip.departureTime} (${selectedTrip.originCity}) · Return: ${selectedTrip.returnDate}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedTripId(selectedTrip.id);
                  setActiveModule('passenger-lists');
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>
                  {language === 'ar' ? `مخطط المقاعد والمانيفست (${selectedTrip.bookedSeats} راكب)` : `Seat Layout & Manifest (${selectedTrip.bookedSeats} Pax)`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                {language === 'ar' ? 'الحافلة والمواصفات' : 'Bus & Equipment'}
              </h4>
              <div className="space-y-1 text-slate-700">
                <div>
                  {language === 'ar' ? 'كود الحافلة: ' : 'Bus ID: '}
                  <strong className="text-slate-900 font-mono">{selectedTrip.busId}</strong>
                </div>
                <div>
                  {language === 'ar' ? 'رقم اللوحة: ' : 'Plate: '}
                  <span className="font-mono text-slate-900">{selectedTrip.busPlate}</span>
                </div>
                <div>
                  {language === 'ar' ? 'الموديل: ' : 'Model: '}
                  <span>Mercedes-Benz Travego (2023)</span>
                </div>
                <div>
                  {language === 'ar' ? 'السعة الكلية: ' : 'Total Capacity: '}
                  <span className="font-mono font-bold text-slate-900">{selectedTrip.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                {language === 'ar' ? 'كابتن الرحلة وطاقم الضيافة' : 'Captain & Crew'}
              </h4>
              <div className="space-y-1 text-slate-700">
                <div>
                  {language === 'ar' ? 'السائق الأول: ' : 'First Driver: '}
                  <strong className="text-slate-900">{selectedTrip.driverName}</strong>
                </div>
                <div>
                  {language === 'ar' ? 'هاتف السائق: ' : 'Driver Phone: '}
                  <span className="font-mono text-slate-900">01001234567</span>
                </div>
                <div>
                  {language === 'ar' ? 'السائق الثاني: ' : 'Second Driver: '}
                  <span>{language === 'ar' ? 'حسام زكي (تبديل ليلي)' : 'Hossam Zaki (Night relief)'}</span>
                </div>
                <div>
                  {language === 'ar' ? 'مشرف الرحلة: ' : 'Tour Escort: '}
                  <span>{language === 'ar' ? 'وليد سمير' : 'Walid Samir'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                {language === 'ar' ? 'اقتصاديات تشغيل الرحلة' : 'Trip Operating Economics'}
              </h4>
              <div className="space-y-1 text-slate-700 font-mono">
                <div>
                  {language === 'ar' ? 'إيراد تذاكر الرحلة: ' : 'Trip Revenue: '}
                  <strong className="text-slate-900">{formatEGP(selectedTrip.costing.tripRevenue, language)}</strong>
                </div>
                <div>
                  {language === 'ar' ? 'التكلفة المباشرة: ' : 'Direct Trip Cost: '}
                  <span className="text-rose-700">{formatEGP(selectedTrip.costing.totalTripCost, language)}</span>
                </div>
                <div className="pt-1 border-t border-slate-200 flex justify-between font-bold">
                  <span>{language === 'ar' ? 'صافي ربح الرحلة:' : 'Net Trip Profit:'}</span>
                  <span className="text-emerald-700">+{formatEGP(selectedTrip.costing.netTripProfit, language)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Bus & Driver Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              {language === 'ar'
                ? `تعيين حافلة الشركة والسائق للرحلة ${selectedTrip?.id}`
                : `Assign Company Bus & Driver to ${selectedTrip?.id}`}
            </h3>
            <form onSubmit={handleAssignSubmit} className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'اختر الحافلة *' : 'Select Bus *'}
                </label>
                <select
                  value={selectedBusToAssign}
                  onChange={e => setSelectedBusToAssign(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono font-bold"
                >
                  {buses.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} - {b.brand} ({b.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}) [{translateStatus(language, b.status)}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'اختر السائق (الكابتن) *' : 'Select Driver *'}
                </label>
                <select
                  value={selectedDriverToAssign}
                  onChange={e => setSelectedDriverToAssign(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                >
                  {drivers.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-bold hover:bg-slate-800"
                >
                  {language === 'ar' ? 'تثبيت التعيين للرحلة' : 'Assign to Trip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

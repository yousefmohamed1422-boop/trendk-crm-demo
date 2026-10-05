import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, translateStatus } from '../../utils/i18n';
import { Driver } from '../../types';
import {
  UserCheck,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Bus as BusIcon,
  ShieldCheck
} from 'lucide-react';

export const DriversView: React.FC = () => {
  const { language, drivers, buses, trips, setActiveModule, setSelectedTripId } = useApp();
  const [selectedDriverId, setSelectedDriverId] = useState<string>('DRV-01');

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];
  const driverTrips = trips.filter(t => t.driverId === selectedDriver?.id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_drivers')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'سائقي أسطول الأتوبيسات، رخص القيادة المهنية، والرحلات المسندة'
              : 'Certified commercial coach drivers, professional license validity & trip rosters'}
          </p>
        </div>

        <button
          onClick={() => setActiveModule('trips')}
          className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
        >
          {language === 'ar' ? 'عرض جدول رحلات الأتوبيس ←' : 'View Bus Trips Schedule →'}
        </button>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {drivers.map(drv => {
          const isSelected = selectedDriver?.id === drv.id;

          return (
            <div
              key={drv.id}
              onClick={() => setSelectedDriverId(drv.id)}
              className={`bg-white rounded-lg border p-4 transition-all cursor-pointer shadow-xs ${
                isSelected ? 'border-amber-500 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{drv.name}</h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{drv.phone}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  {translateStatus(language, drv.status)}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">
                    {language === 'ar' ? 'الحافلة المخصصة' : 'Assigned Coach'}
                  </span>
                  <span className="font-mono font-bold text-purple-700">{drv.assignedBusId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">
                    {language === 'ar' ? 'الرحلات المكتملة' : 'Trips Completed'}
                  </span>
                  <span className="font-mono font-semibold text-slate-800">{drv.tripsCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Driver Profile */}
      {selectedDriver && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs mt-6">
          <div className="p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-base">
                {selectedDriver.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">{selectedDriver.name}</h2>
                  <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded">
                    {selectedDriver.id}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {translateStatus(language, selectedDriver.status)}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {language === 'ar' ? 'الهاتف: ' : 'Phone: '}
                  {selectedDriver.phone} · {language === 'ar' ? 'الحافلة المعينة: ' : 'Assigned Bus: '}
                  {selectedDriver.assignedBusId} (Mercedes Travego)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">
                {language === 'ar' ? 'تقييم السائق' : 'Driver Rating'}
              </span>
              <div className="flex items-center gap-1 text-amber-400 justify-end mt-0.5">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold font-mono text-white text-base">{selectedDriver.rating} / 5.0</span>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ar' ? 'رخصة قيادة مهنية' : 'Professional License'}
                </span>
                <span className="font-bold text-slate-900 mt-1 block">{selectedDriver.licenseNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ar' ? 'تاريخ انتهاء الرخصة' : 'License Expiry Date'}
                </span>
                <span className="font-mono font-bold text-emerald-700 mt-1 block">
                  {selectedDriver.licenseExpiry} ({language === 'ar' ? 'سارية' : 'Valid'})
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ar' ? 'الحافلة المسندة' : 'Assigned Bus'}
                </span>
                <span className="font-bold text-purple-700 mt-1 block font-mono">{selectedDriver.assignedBusId}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                {language === 'ar'
                  ? `الرحلات القادمة المجدولة للكابتن ${selectedDriver.name}`
                  : `Upcoming Trips for Captain ${selectedDriver.name}`}
              </h4>
              {driverTrips.length === 0 ? (
                <div className="py-6 text-center text-slate-400 italic">
                  {language === 'ar' ? 'لا توجد رحلات مجدولة حالياً' : 'No trips assigned'}
                </div>
              ) : (
                <div className="space-y-2">
                  {driverTrips.map(t => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTripId(t.id);
                        setActiveModule('trips');
                      }}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                    >
                      <div>
                        <div className="font-bold text-slate-900 font-mono">{t.id} · {t.route}</div>
                        <div className="text-slate-500 text-[11px]">
                          {language === 'ar' ? 'المغادرة: ' : 'Departure: '}
                          {t.departureDate} ({t.departureTime}) · {language === 'ar' ? 'العودة: ' : 'Return: '}
                          {t.returnDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-purple-700">{t.busId}</span>
                        <div className="text-[11px] text-emerald-700">
                          {t.bookedSeats} / {t.capacity} {language === 'ar' ? 'محجوز' : 'Booked'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

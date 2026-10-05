import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP, translateStatus } from '../../utils/i18n';
import { Bus, BusStatus } from '../../types';
import {
  Bus as BusIcon,
  Wrench,
  Calendar,
  DollarSign,
  FileCheck,
  UserCheck,
  AlertCircle,
  Plus
} from 'lucide-react';

export const FleetView: React.FC = () => {
  const { language, buses, drivers, trips, setActiveModule } = useApp();
  const [selectedBusId, setSelectedBusId] = useState<string>('BUS-07');
  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'fixedCosts' | 'maintenance'>('overview');

  const selectedBus = buses.find(b => b.id === selectedBusId) || buses[0];
  const busTrips = trips.filter(t => t.busId === selectedBus?.id);

  const getStatusBadge = (status: BusStatus) => {
    const map: Record<BusStatus, string> = {
      Available: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      Assigned: 'bg-blue-50 text-blue-800 border-blue-200',
      'On Trip': 'bg-purple-50 text-purple-800 border-purple-200',
      Maintenance: 'bg-amber-50 text-amber-800 border-amber-200',
      Unavailable: 'bg-rose-50 text-rose-800 border-rose-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${map[status] || 'bg-slate-100'}`}>
        {translateStatus(language, status)}
      </span>
    );
  };

  const totalFixedMonthly =
    selectedBus.fixedMonthlyCosts.insurance +
    selectedBus.fixedMonthlyCosts.licensing +
    selectedBus.fixedMonthlyCosts.maintenance +
    selectedBus.fixedMonthlyCosts.depreciation +
    selectedBus.fixedMonthlyCosts.tiresSpareParts;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_buses')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'أسطول الأتوبيسات السياحية المملوكة للشركة، الصيانة الدورية وتوزيع التكاليف الثابتة'
              : 'Company-owned tourist bus fleet, maintenance records & asset fixed cost allocation'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('bus-costing')}
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            {language === 'ar' ? 'محرك تكلفة الرحلة ←' : 'Trip Costing Engine →'}
          </button>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {buses.map(bus => {
          const isSelected = selectedBus?.id === bus.id;

          return (
            <div
              key={bus.id}
              onClick={() => setSelectedBusId(bus.id)}
              className={`bg-white rounded-lg border p-4 transition-all cursor-pointer shadow-xs ${
                isSelected ? 'border-amber-500 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-bold text-sm text-slate-900">{bus.id}</span>
                  <div className="text-xs font-semibold text-slate-800 mt-0.5">{bus.brand}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{bus.plateNumber}</div>
                </div>
                {getStatusBadge(bus.status)}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'ar' ? 'السعة' : 'Capacity'}
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {bus.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'ar' ? 'الكابتن المعين' : 'Captain Driver'}
                  </span>
                  <span className="font-medium text-slate-800 truncate block">
                    {bus.driverName || (language === 'ar' ? 'غير محدد' : 'Unassigned')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Bus Profile */}
      {selectedBus && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs mt-6">
          <div className="p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-amber-400 bg-slate-800 px-2 py-0.5 rounded font-bold">
                  {selectedBus.id}
                </span>
                <h2 className="text-base font-bold text-white">
                  {selectedBus.brand} ({selectedBus.year})
                </h2>
                {getStatusBadge(selectedBus.status)}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar' ? 'اللوحة: ' : 'Plate: '}
                {selectedBus.plateNumber} · {language === 'ar' ? 'السعة: ' : 'Capacity: '}
                {selectedBus.capacity} {language === 'ar' ? 'مقعد سياحي مريح' : 'Reclining Seats'} · {language === 'ar' ? 'العداد: ' : 'Mileage: '}
                {selectedBus.mileageKm.toLocaleString()} {language === 'ar' ? 'كم' : 'KM'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">
                {language === 'ar' ? 'التكلفة الثابتة المخصصة للرحلة' : 'Allocated Fixed Cost / Trip'}
              </span>
              <span className="text-xl font-bold font-mono text-amber-400">
                {formatEGP(selectedBus.allocatedFixedCostPerTrip, language)}
              </span>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="border-b border-slate-200 px-5 flex items-center gap-6 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'overview' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'ar' ? 'المواصفات العامة' : 'Overview & Specifications'}
            </button>
            <button
              onClick={() => setActiveTab('fixedCosts')}
              className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'fixedCosts' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'ar' ? 'التكاليف الثابتة والإهلاك للأصل' : 'Asset Fixed Costs & Depreciation'}
            </button>
            <button
              onClick={() => setActiveTab('trips')}
              className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap ${
                activeTab === 'trips' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{language === 'ar' ? 'الرحلات المجدولة' : 'Scheduled Trips'}</span>
              <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full">{busTrips.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`py-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
                activeTab === 'maintenance' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'ar' ? 'سجل الصيانة' : 'Maintenance History'}
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'بيانات الحافلة' : 'Bus Details'}
                  </h4>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      {language === 'ar' ? 'الموديل: ' : 'Brand: '}
                      <strong className="text-slate-900">{selectedBus.brand}</strong>
                    </div>
                    <div>
                      {language === 'ar' ? 'سنة الصنع: ' : 'Model Year: '}
                      <span className="font-mono text-slate-900">{selectedBus.year}</span>
                    </div>
                    <div>
                      {language === 'ar' ? 'النوع: ' : 'Type: '}
                      <span>{selectedBus.busType}</span>
                    </div>
                    <div>
                      {language === 'ar' ? 'توزيع المقاعد: ' : 'Seating Layout: '}
                      <span className="font-mono text-purple-700 font-bold">
                        {selectedBus.capacity} {language === 'ar' ? 'مقعد سياحي فاخر' : 'Luxury Seats'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'السائق وخط السير' : 'Assigned Driver & Route'}
                  </h4>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      {language === 'ar' ? 'الكابتن: ' : 'Captain: '}
                      <strong className="text-slate-900">{selectedBus.driverName || (language === 'ar' ? 'محمد علي' : 'Mohamed Ali')}</strong>
                    </div>
                    <div>
                      {language === 'ar' ? 'خط السير الافتراضي: ' : 'Default Route: '}
                      <span>{selectedBus.assignedRoute || (language === 'ar' ? 'الإسكندرية ← الغردقة' : 'Alexandria → Hurghada')}</span>
                    </div>
                    <div>
                      {language === 'ar' ? 'الرحلة الحالية: ' : 'Current Assignment: '}
                      <span className="font-mono text-purple-700 font-bold">TRIP-1008 (15 Oct)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    {language === 'ar' ? 'الحالة التشغيلية والفنية' : 'Operational Health'}
                  </h4>
                  <div className="space-y-1 text-slate-700">
                    <div>
                      {language === 'ar' ? 'العداد: ' : 'Mileage: '}
                      <span className="font-mono text-slate-900 font-semibold">{selectedBus.mileageKm.toLocaleString()} {language === 'ar' ? 'كم' : 'KM'}</span>
                    </div>
                    <div>
                      {language === 'ar' ? 'آخر صيانة: ' : 'Last Maintenance: '}
                      <span className="font-mono text-slate-900">{selectedBus.lastMaintenanceDate}</span>
                    </div>
                    <div>
                      {language === 'ar' ? 'الصيانة القادمة: ' : 'Next Service: '}
                      <span className="font-mono text-emerald-700 font-medium">
                        {language === 'ar' ? 'خلال 12,000 كم' : 'In 12,000 KM'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BUS ASSET COSTS (Module 21) */}
            {activeTab === 'fixedCosts' && (
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'التكاليف الثابتة الشهرية وتوزيعها على الرحلات' : 'Monthly Fixed Costs & Trip Allocation Breakdown'}
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {language === 'ar'
                      ? 'مثال: تأمين 10,000 · إهلاك 40,000 · صيانة دورية 15,000 · ترخيص 3,000 = إجمالي 68,000 ج.م شهرياً. بقسمتها على 20 رحلة/شهر، نصيب الرحلة = 3,400 ج.م.'
                      : 'Example: Insurance 10,000 · Depreciation 40,000 · Maintenance 15,000 · Licensing 3,000 = Total Fixed Costs 68,000 EGP. With 20 trips/month, allocated fixed cost per trip = 3,400 EGP.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">
                      {language === 'ar' ? 'التأمين / شهرياً' : 'Insurance / Month'}
                    </span>
                    <span className="font-bold font-mono text-slate-900 text-sm mt-1 block">
                      {formatEGP(selectedBus.fixedMonthlyCosts.insurance, language)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">
                      {language === 'ar' ? 'التراخيص / شهرياً' : 'Licensing / Month'}
                    </span>
                    <span className="font-bold font-mono text-slate-900 text-sm mt-1 block">
                      {formatEGP(selectedBus.fixedMonthlyCosts.licensing, language)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">
                      {language === 'ar' ? 'الصيانة الثابتة' : 'Maintenance / Month'}
                    </span>
                    <span className="font-bold font-mono text-slate-900 text-sm mt-1 block">
                      {formatEGP(selectedBus.fixedMonthlyCosts.maintenance, language)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">
                      {language === 'ar' ? 'إهلاك الأصل' : 'Asset Depreciation'}
                    </span>
                    <span className="font-bold font-mono text-slate-900 text-sm mt-1 block">
                      {formatEGP(selectedBus.fixedMonthlyCosts.depreciation, language)}
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-amber-800 block text-[10px] font-bold">
                      {language === 'ar' ? 'إجمالي الثابت / شهرياً' : 'Total Fixed / Month'}
                    </span>
                    <span className="font-bold font-mono text-amber-950 text-sm mt-1 block">
                      {formatEGP(totalFixedMonthly, language)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[11px]">
                      {language === 'ar' ? 'الرحلات الشهرية المخططة:' : 'Monthly Trips Planned:'}
                    </span>
                    <span className="font-bold text-sm text-white">
                      {selectedBus.totalMonthlyTripsAverage} {language === 'ar' ? 'رحلة' : 'Trips'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">
                      {language === 'ar' ? 'التكلفة الثابتة المخصصة للرحلة الواحدة:' : 'Allocated Fixed Cost per Trip:'}
                    </span>
                    <span className="text-xl font-bold font-mono text-amber-400">
                      {formatEGP(selectedBus.allocatedFixedCostPerTrip, language)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div className="space-y-3">
                {busTrips.map(t => (
                  <div key={t.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-slate-900">{t.id}</span>
                        <span className="font-semibold text-slate-800">{t.route}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          {translateStatus(language, t.status)}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-1">
                        {language === 'ar' ? 'المغادرة: ' : 'Departure: '}
                        {t.departureDate} ({t.departureTime}) · {language === 'ar' ? 'العودة: ' : 'Return: '}
                        {t.returnDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900">
                        {t.bookedSeats} / {t.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}
                      </div>
                      <div className="text-emerald-700 text-[11px] font-medium">
                        {t.availableSeats} {language === 'ar' ? 'متاح' : 'Available'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between">
                  <div>
                    <span className="font-bold text-slate-900">
                      {language === 'ar' ? 'صيانة كبرى 140,000 كم وتغيير طقم إطارات ميشلان' : '140,000 KM Major Overhaul & Michelin Tire Replacement'}
                    </span>
                    <div className="text-slate-500 text-[11px]">
                      {language === 'ar' ? 'تيل فرامل، زيت فتيس، فحص كمبروسر التكييف المركزي' : 'Brake pads, transmission fluid, AC compressor inspection'}
                    </div>
                  </div>
                  <div className="text-right font-mono text-slate-700">
                    <div>28 Sep 2026</div>
                    <div className="font-bold">18,500 {language === 'ar' ? 'ج.م' : 'EGP'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

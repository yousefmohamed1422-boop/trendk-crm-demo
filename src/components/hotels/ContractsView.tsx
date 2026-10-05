import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import { HotelContract } from '../../types';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  AlertCircle,
  Building
} from 'lucide-react';

export const ContractsView: React.FC = () => {
  const { language, contracts, hotels, setActiveModule, setSelectedHotelId } = useApp();
  const [selectedHotelFilter, setSelectedHotelFilter] = useState<string>('All');

  const filteredContracts = contracts.filter(c =>
    selectedHotelFilter === 'All' || c.hotelId === selectedHotelFilter
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_contracts')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'عقود الفنادق المباشرة، الأسعار التعاقدية، فترات الإلغاء، ومخصصات الغرف'
              : 'Directly contracted resort agreements, allotment releases & cancellation policies'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('availability')}
            className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            {language === 'ar' ? 'فحص الإتاحة المباشرة ←' : 'Check Live Availability →'}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">{language === 'ar' ? 'تصفية حسب الفندق:' : 'Filter by Hotel:'}</span>
          <select
            value={selectedHotelFilter}
            onChange={e => setSelectedHotelFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-700 cursor-pointer focus:outline-none"
          >
            <option value="All">{language === 'ar' ? 'جميع الفنادق المتعاقد معها' : 'All Directly Contracted Hotels'}</option>
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        <span className="text-xs font-mono text-slate-500">
          {filteredContracts.length} {language === 'ar' ? 'عقود نشطة' : 'Active Contracts'}
        </span>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'كود العقد' : 'Contract ID'}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'hotel')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'room')}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الوجبات' : 'Meal Plan'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'سعر الغرفة' : 'Room Rate'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'سعر الفرد' : 'Adult Rate'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'سعر الطفل' : 'Child Rate'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'سرير إضافي' : 'Extra Bed'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المخصص' : 'Allotment'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'فترة الإفراج' : 'Release'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'صلاحية العقد' : 'Valid Dates'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map(contract => (
                <tr
                  key={contract.id}
                  className="hover:bg-slate-50 cursor-pointer"
                  onClick={() => {
                    setSelectedHotelId(contract.hotelId);
                    setActiveModule('hotels');
                  }}
                >
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                    {contract.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {contract.hotelName}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {contract.roomType}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {contract.mealPlan}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    {formatEGP(contract.roomRate, language)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {formatEGP(contract.adultRate, language)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-700 font-medium">
                    {formatEGP(contract.childRate, language)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {formatEGP(contract.extraBedRate, language)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                    {contract.allotment} {language === 'ar' ? 'غرف' : 'Rooms'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {contract.releasePeriodDays} {language === 'ar' ? 'أيام' : 'Days'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {contract.startDate} → {contract.endDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Terms & Cancellation Policy Notice */}
      <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-xs space-y-2">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          Direct Allotment Cancellation Rules & Penalties
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
          <div className="bg-white p-3 rounded border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-0.5">Coral Resort Hurghada</span>
            <span>Free cancellation up to 72 hours prior to check-in. 1 night penalty inside 72h. Release period: 3 days.</span>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <span className="font-semibold text-slate-900 block mb-0.5">Steigenberger Ras Soma</span>
            <span>Free cancellation up to 7 days before arrival. Non-refundable inside 7 days during peak national holidays.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

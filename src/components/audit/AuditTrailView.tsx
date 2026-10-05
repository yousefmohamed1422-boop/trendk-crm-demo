import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { AuditLogEntry } from '../../types';
import {
  Sparkles,
  Search,
  Filter,
  Clock,
  User,
  ShieldCheck,
  FileSpreadsheet,
  Receipt,
  Bus,
  Hotel
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { language, auditLogs, setSelectedBookingId, setSelectedLeadId, setActiveModule } = useApp();
  const [filterEntity, setFilterEntity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesEntity = filterEntity === 'All' || log.entityType === filterEntity;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEntity && matchesSearch;
  });

  const getEntityName = (type: AuditLogEntry['entityType']) => {
    if (language !== 'ar') return type;
    switch (type) {
      case 'Lead': return 'عميل محتمل';
      case 'Quotation': return 'عرض أسعار';
      case 'Booking': return 'حجز';
      case 'Payment': return 'دفعة / سند';
      case 'Trip': return 'رحلة تشغيلية';
      case 'Hotel': return 'فندق';
      default: return type;
    }
  };

  const getEntityIcon = (type: AuditLogEntry['entityType']) => {
    switch (type) {
      case 'Lead':
        return <User className="w-3.5 h-3.5 text-blue-600" />;
      case 'Quotation':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Booking':
        return <Receipt className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Payment':
        return <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />;
      case 'Trip':
        return <Bus className="w-3.5 h-3.5 text-purple-600" />;
      case 'Hotel':
        return <Hotel className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'recentActivityTimeline')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'سجل التدقيق الرقمي غير القابل للتعديل، تتبع جميع العمليات وتغييرات الحالة'
              : 'Enterprise immutable compliance audit trail & operational change log'}
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'ar' ? 'بحث في سجل التدقيق بالمستخدم، الإجراء أو الكود...' : 'Search audit trail by user, action or ID...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs text-slate-800 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">{language === 'ar' ? 'تصفية الكيان:' : 'Filter Entity:'}</span>
          <select
            value={filterEntity}
            onChange={e => setFilterEntity(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-700 cursor-pointer"
          >
            <option value="All">{language === 'ar' ? 'جميع الكيانات' : 'All Entities'}</option>
            <option value="Lead">{language === 'ar' ? 'الليدز (العملاء المحتملين)' : 'Lead'}</option>
            <option value="Quotation">{language === 'ar' ? 'عروض الأسعار' : 'Quotation'}</option>
            <option value="Booking">{language === 'ar' ? 'الحجوزات' : 'Booking'}</option>
            <option value="Payment">{language === 'ar' ? 'المدفوعات والسندات' : 'Payment'}</option>
            <option value="Trip">{language === 'ar' ? 'الرحلات والحافلات' : 'Trip'}</option>
          </select>
        </div>
      </div>

      {/* Audit Log Timeline Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{language === 'ar' ? 'التوقيت' : 'Timestamp'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'النوع' : 'Entity'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الإجراء المنفذ' : 'Action Performed'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'التفاصيل التشغيلية' : 'Operational Details'}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'المستخدم المنفذ' : 'Actor / User'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'ar' ? 'المرجع' : 'Reference'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      {getEntityIcon(log.entityType)}
                      <span>{getEntityName(log.entityType)}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed max-w-md">
                    {log.details}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-medium text-slate-900">{log.user}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{log.role}</div>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium text-amber-800">
                    <button
                      onClick={() => {
                        if (log.entityType === 'Booking') {
                          setSelectedBookingId(log.entityId);
                          setActiveModule('booking-detail');
                        } else if (log.entityType === 'Lead') {
                          setSelectedLeadId(log.entityId);
                          setActiveModule('pipeline');
                        }
                      }}
                      className="hover:underline cursor-pointer"
                    >
                      {log.entityId}
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

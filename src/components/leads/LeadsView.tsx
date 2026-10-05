import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, translateStatus, translateLeadSource, translateDestination } from '../../utils/i18n';
import { Lead, LeadSource, LeadStatus } from '../../types';
import {
  Plus,
  Search,
  Filter,
  Phone,
  MessageSquare,
  UserPlus,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Calendar,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

export const LeadsView: React.FC = () => {
  const {
    language,
    leads,
    addLead,
    assignSalesAgentToLead,
    updateLeadStatus,
    setSelectedLeadId,
    setActiveModule
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsapp: '',
    source: 'Facebook' as LeadSource,
    campaign: 'Autumn Offers 2026',
    destination: 'Hurghada',
    travelDate: '2026-10-15',
    adults: 2,
    children: 2,
    notes: '',
    assignedSalesAgent: 'Omar Farouk',
    moderator: 'Sara Moderator'
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) return;

    addLead({
      customerName: formData.customerName,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      source: formData.source,
      campaign: formData.campaign,
      destination: formData.destination,
      travelDate: formData.travelDate,
      adults: Number(formData.adults),
      children: Number(formData.children),
      childrenDetails: [
        { id: 'CH-1', name: 'Child 1', age: 7, category: 'Child (50%)' },
        { id: 'CH-2', name: 'Child 2', age: 4, category: 'Infant (Free)' }
      ],
      moderator: formData.moderator,
      assignedSalesAgent: formData.assignedSalesAgent,
      status: 'New',
      notes: formData.notes
    });

    setIsAddModalOpen(false);
    setFormData({
      customerName: '',
      phone: '',
      whatsapp: '',
      source: 'Facebook',
      campaign: 'Autumn Offers 2026',
      destination: 'Hurghada',
      travelDate: '2026-10-15',
      adults: 2,
      children: 2,
      notes: '',
      assignedSalesAgent: 'Omar Farouk',
      moderator: 'Sara Moderator'
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusBadge = (status: LeadStatus) => {
    const map: Record<LeadStatus, string> = {
      New: 'bg-blue-50 text-blue-700 border-blue-200',
      Contacted: 'bg-slate-100 text-slate-700 border-slate-300',
      Interested: 'bg-amber-50 text-amber-800 border-amber-200',
      'Quotation Sent': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Follow-up': 'bg-purple-50 text-purple-700 border-purple-200',
      Confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      Lost: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${map[status] || 'bg-slate-100 text-slate-700'}`}>
        {translateStatus(language, status)}
      </span>
    );
  };

  const getSourceIcon = (source: LeadSource) => {
    switch (source) {
      case 'Facebook':
        return <span className="text-blue-600 font-bold text-[11px]">FB</span>;
      case 'Instagram':
        return <span className="text-pink-600 font-bold text-[11px]">IG</span>;
      case 'WhatsApp':
        return <span className="text-emerald-600 font-bold text-[11px]">WA</span>;
      case 'Messenger':
        return <span className="text-sky-500 font-bold text-[11px]">MSG</span>;
      case 'Website':
        return <span className="text-amber-600 font-bold text-[11px]">WEB</span>;
      default:
        return <span className="text-slate-500 font-bold text-[11px]">REF</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_leads')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'إدارة عملاء منصات التواصل، تعيين المبيعات، ومتابعة الاهتمام'
              : 'Multi-channel social media lead intake, moderator queue & sales dispatching'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{getTranslation(language, 'addLead')}</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder={getTranslation(language, 'search')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="text-[11px] text-slate-400">{language === 'ar' ? 'الحالة:' : 'Status:'}</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">{language === 'ar' ? `جميع الحالات (${leads.length})` : `All Statuses (${leads.length})`}</option>
              <option value="New">{language === 'ar' ? 'جديد' : 'New'}</option>
              <option value="Contacted">{language === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
              <option value="Interested">{language === 'ar' ? 'مهتم' : 'Interested'}</option>
              <option value="Quotation Sent">{language === 'ar' ? 'أُرسل عرض سعر' : 'Quotation Sent'}</option>
              <option value="Follow-up">{language === 'ar' ? 'متابعة لاحقة' : 'Follow-up'}</option>
              <option value="Confirmed">{language === 'ar' ? 'مؤكد' : 'Confirmed'}</option>
              <option value="Lost">{language === 'ar' ? 'مفقود' : 'Lost'}</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="text-[11px] text-slate-400">{language === 'ar' ? 'المصدر:' : 'Source:'}</span>
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value="All">{language === 'ar' ? 'جميع المصادر' : 'All Sources'}</option>
              <option value="Facebook">{language === 'ar' ? 'فيسبوك' : 'Facebook'}</option>
              <option value="Instagram">{language === 'ar' ? 'إنستغرام' : 'Instagram'}</option>
              <option value="WhatsApp">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</option>
              <option value="Messenger">{language === 'ar' ? 'ماسنجر' : 'Messenger'}</option>
              <option value="Website">{language === 'ar' ? 'الموقع' : 'Website'}</option>
              <option value="Referral">{language === 'ar' ? 'ترشيح مباشر' : 'Referral'}</option>
            </select>
          </div>

          <button
            onClick={() => setActiveModule('pipeline')}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'ar' ? 'مراحل البيع Kanban ←' : 'Kanban Pipeline →'}</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">{getTranslation(language, 'id')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'customer')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'phone')} / WA</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'source')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'destination')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'travelDate')}</th>
                <th className="py-2.5 px-3">{language === 'ar' ? 'الأفراد (بالغ/طفل)' : 'Pax (A/C)'}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'moderator')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'salesAgent')}</th>
                <th className="py-2.5 px-3">{getTranslation(language, 'status')}</th>
                <th className="py-2.5 px-3 text-right">{getTranslation(language, 'actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setActiveModule('pipeline');
                  }}
                >
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                    {lead.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-900">{lead.customerName}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                      {lead.campaign}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-600">
                    <div>{lead.phone}</div>
                    <div className="text-[10px] text-emerald-600 font-medium">WA: {lead.whatsapp}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5">
                      {getSourceIcon(lead.source)}
                      <span className="text-slate-700">{lead.source}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {lead.destination}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-600">
                    {lead.travelDate}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700">
                    {lead.adults}A · {lead.children}C
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    <div>{lead.moderator}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{lead.createdTime}</div>
                  </td>
                  <td
                    className="py-2.5 px-3"
                    onClick={e => e.stopPropagation()}
                  >
                    <select
                      value={lead.assignedSalesAgent}
                      onChange={e => assignSalesAgentToLead(lead.id, e.target.value)}
                      className="text-xs bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-800 font-medium cursor-pointer"
                    >
                      <option value="Omar Farouk">Omar Farouk</option>
                      <option value="Karim Adel">Karim Adel</option>
                      <option value="Nour Khaled">Nour Khaled</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="py-2.5 px-3 text-right" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedLeadId(lead.id);
                        setActiveModule('pipeline');
                      }}
                      className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                    >
                      Pipeline →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  {language === 'ar' ? 'تسجيل ليد سوشيال ميديا جديد' : 'New Social Media Inbound Lead'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'اسم العميل *' : 'Customer Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: أحمد حسن' : 'e.g. Ahmed Hassan'}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01012345678"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder={language === 'ar' ? 'نفس رقم الهاتف' : 'Same as phone'}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'مصدر العميل' : 'Lead Source'}
                  </label>
                  <select
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value as LeadSource })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Facebook">{language === 'ar' ? 'فيسبوك' : 'Facebook'}</option>
                    <option value="Instagram">{language === 'ar' ? 'إنستغرام' : 'Instagram'}</option>
                    <option value="Messenger">{language === 'ar' ? 'ماسنجر' : 'Messenger'}</option>
                    <option value="WhatsApp">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</option>
                    <option value="Website">{language === 'ar' ? 'الموقع' : 'Website'}</option>
                    <option value="Referral">{language === 'ar' ? 'ترشيح مباشر' : 'Referral'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'اسم الحملة الإعلانية' : 'Campaign / Ad Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.campaign}
                    onChange={e => setFormData({ ...formData, campaign: e.target.value })}
                    placeholder="Autumn Offers 2026"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'الوجهة السياحية' : 'Destination'}
                  </label>
                  <select
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Hurghada">{translateDestination(language, 'Hurghada')}</option>
                    <option value="Sharm El Sheikh">{translateDestination(language, 'Sharm El Sheikh')}</option>
                    <option value="Marsa Alam">{translateDestination(language, 'Marsa Alam')}</option>
                    <option value="Luxor">{translateDestination(language, 'Luxor')}</option>
                    <option value="Aswan">{translateDestination(language, 'Aswan')}</option>
                    <option value="Dahab">{translateDestination(language, 'Dahab')}</option>
                    <option value="North Coast">{translateDestination(language, 'North Coast')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'تاريخ السفر المتوقع' : 'Expected Travel Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'عدد البالغين' : 'Adults Count'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={e => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'عدد الأطفال' : 'Children Count'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={e => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'تعيين لمسؤول مبيعات' : 'Assign Sales Agent'}
                  </label>
                  <select
                    value={formData.assignedSalesAgent}
                    onChange={e => setFormData({ ...formData, assignedSalesAgent: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Omar Farouk">Omar Farouk (Senior Sales)</option>
                    <option value="Karim Adel">Karim Adel</option>
                    <option value="Nour Khaled">Nour Khaled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'مسؤول الميديا' : 'Intake Moderator'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.moderator}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'الملاحظات والمتطلبات' : 'Notes & Requirements'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: العميل علق على إعلان الفيسبوك يسأل عن رحلة 4 أيام لكورال ريزورت مع طفلين.' : 'e.g. Customer commented on post asking for 4-day trip to Coral Resort with 2 kids.'}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-md focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  {getTranslation(language, 'cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'حفظ وتعيين الليد' : 'Save & Assign Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

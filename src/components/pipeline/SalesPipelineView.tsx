import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  getTranslation,
  translateStatus,
  translateLeadSource,
  translateDestination,
  formatEGP
} from '../../utils/i18n';
import { Lead, LeadStatus } from '../../types';
import {
  Phone,
  PhoneCall,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Send,
  Plus,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SalesPipelineView: React.FC = () => {
  const {
    language,
    leads,
    selectedLeadId,
    setSelectedLeadId,
    updateLeadStatus,
    addCallToLead,
    addNoteToLead,
    setActiveModule,
    quotations
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'whatsapp' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');
  const [callSummary, setCallSummary] = useState('');
  const [callDuration, setCallDuration] = useState('3m 15s');
  const [showCallModal, setShowCallModal] = useState(false);
  const [waMessage, setWaMessage] = useState('');

  const stageOrder: LeadStatus[] = [
    'New',
    'Contacted',
    'Interested',
    'Quotation Sent',
    'Follow-up',
    'Confirmed',
    'Lost'
  ];

  const columns: { status: LeadStatus; color: string; borderAccent: string; bgTone: string }[] = [
    { status: 'New', color: 'text-blue-700', borderAccent: 'border-t-blue-500', bgTone: 'bg-blue-50/50' },
    { status: 'Contacted', color: 'text-slate-700', borderAccent: 'border-t-slate-400', bgTone: 'bg-slate-50/50' },
    { status: 'Interested', color: 'text-amber-700', borderAccent: 'border-t-amber-500', bgTone: 'bg-amber-50/50' },
    { status: 'Quotation Sent', color: 'text-indigo-700', borderAccent: 'border-t-indigo-500', bgTone: 'bg-indigo-50/50' },
    { status: 'Follow-up', color: 'text-purple-700', borderAccent: 'border-t-purple-500', bgTone: 'bg-purple-50/50' },
    { status: 'Confirmed', color: 'text-emerald-700', borderAccent: 'border-t-emerald-500', bgTone: 'bg-emerald-50/50' },
    { status: 'Lost', color: 'text-rose-700', borderAccent: 'border-t-rose-500', bgTone: 'bg-rose-50/50' }
  ];

  const selectedLead = leads.find(l => l.id === selectedLeadId) || leads[0];
  const relatedQuotations = quotations.filter(q => q.customerName === selectedLead?.customerName);

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !callSummary) return;
    addCallToLead(selectedLead.id, callSummary, callDuration);
    setCallSummary('');
    setShowCallModal(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote) return;
    addNoteToLead(selectedLead.id, newNote);
    setNewNote('');
  };

  // Helper to calculate total stage value based on matching quotations or default estimation
  const getStageTotalEstimate = (status: LeadStatus) => {
    const colLeads = leads.filter(l => l.status === status);
    return colLeads.reduce((acc, lead) => {
      const q = quotations.find(q => q.customerName === lead.customerName);
      return acc + (q ? q.customerPrice : (lead.adults * 5000 + lead.children * 2500));
    }, 0);
  };

  const getNextStage = (curr: LeadStatus): LeadStatus | null => {
    const idx = stageOrder.indexOf(curr);
    if (idx >= 0 && idx < stageOrder.length - 2) {
      return stageOrder[idx + 1];
    }
    return null;
  };

  const getPrevStage = (curr: LeadStatus): LeadStatus | null => {
    const idx = stageOrder.indexOf(curr);
    if (idx > 0 && curr !== 'Lost') {
      return stageOrder[idx - 1];
    }
    return null;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header with Title & Quick Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-sm">
              CRM
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{getTranslation(language, 'nav_pipeline')}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  {leads.length} {language === 'ar' ? 'ليد نشط' : 'Active Leads'}
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'متابعة مسار المبيعات التفاعلي وتحويل الاهتمام إلى عروض وحجوزات مؤكدة'
                  : 'Interactive CRM sales stage pipeline: track stages, call logs, quotations & closures'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('leads')}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{language === 'ar' ? '📋 جدول الليدات' : '📋 Leads Table'}</span>
          </button>
          <button
            onClick={() => setActiveModule('quotations')}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إنشاء تسعير جديد' : 'New Quotation'}</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-3.5 overflow-x-auto pb-4 items-start min-h-[530px] scrollbar-thin">
        {columns.map(col => {
          const colLeads = leads.filter(l => l.status === col.status);
          const totalVal = getStageTotalEstimate(col.status);

          return (
            <div
              key={col.status}
              className={`w-72 shrink-0 bg-slate-100/80 rounded-xl p-3 border-t-4 ${col.borderAccent} border border-slate-200/90 shadow-xs flex flex-col max-h-[750px] transition-colors`}
            >
              {/* Column Header with Counts & Stage Value */}
              <div className="px-1 pb-2.5 border-b border-slate-200/80 mb-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">
                      {translateStatus(language, col.status)}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white text-slate-700 font-bold border border-slate-200 shadow-2xs">
                    {colLeads.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>{language === 'ar' ? 'القيمة المتوقعة:' : 'Est. Pipeline:'}</span>
                  <span className="font-semibold text-slate-700">{formatEGP(totalVal, language)}</span>
                </div>
              </div>

              {/* Cards scroll list */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-0.5">
                {colLeads.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs italic bg-white/40 rounded-lg border border-dashed border-slate-200">
                    {language === 'ar' ? 'لا توجد ليدات في هذه المرحلة' : 'No leads in this stage'}
                  </div>
                ) : (
                  colLeads.map(lead => {
                    const isSelected = selectedLead?.id === lead.id;
                    const nextSt = getNextStage(lead.status);
                    const prevSt = getPrevStage(lead.status);

                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLeadId(lead.id)}
                        className={`group bg-white p-3 rounded-lg border transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-md ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-400/25 shadow-sm bg-amber-50/20'
                            : 'border-slate-200 hover:border-slate-300 hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Top row: Name & Lead Source */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {lead.customerName.charAt(0)}
                            </div>
                            <span className="font-bold text-xs text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                              {lead.customerName}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                            {translateLeadSource(language, lead.source)}
                          </span>
                        </div>

                        {/* Destination & Travelers */}
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-600">
                          <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                          <span className="font-semibold text-slate-800">{translateDestination(language, lead.destination)}</span>
                          <span className="text-slate-300">·</span>
                          <span className="font-mono text-slate-500">
                            {lead.adults} {language === 'ar' ? 'بالغ' : 'A'} / {lead.children} {language === 'ar' ? 'طفل' : 'C'}
                          </span>
                        </div>

                        {/* Travel date & Sales Agent */}
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {lead.travelDate}
                          </span>
                          <span className="text-slate-600 truncate max-w-[90px] font-sans">
                            {lead.assignedSalesAgent}
                          </span>
                        </div>

                        {/* Next Follow-up alert if present */}
                        {lead.nextFollowUp && (
                          <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <span className="text-amber-800 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {language === 'ar' ? 'متابعة:' : 'Follow-up:'}
                            </span>
                            <span className="text-amber-950 font-mono font-semibold bg-amber-100/70 px-1.5 py-0.5 rounded">
                              {lead.nextFollowUp}
                            </span>
                          </div>
                        )}

                        {/* Micro Quick-Action Bar on Hover */}
                        <div
                          className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedLeadId(lead.id);
                                setShowCallModal(true);
                              }}
                              title={language === 'ar' ? 'تسجيل مكالمة' : 'Log call'}
                              className="p-1 rounded text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedLeadId(lead.id);
                                setActiveTab('whatsapp');
                              }}
                              title={language === 'ar' ? 'محادثة واتساب' : 'WhatsApp'}
                              className="p-1 rounded text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Quick Stage Steppers */}
                          <div className="flex items-center gap-1">
                            {prevSt && (
                              <button
                                onClick={() => updateLeadStatus(lead.id, prevSt)}
                                title={language === 'ar' ? `رجوع إلى ${translateStatus(language, prevSt)}` : `Move back to ${prevSt}`}
                                className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-mono transition-colors"
                              >
                                ←
                              </button>
                            )}
                            {nextSt && (
                              <button
                                onClick={() => updateLeadStatus(lead.id, nextSt)}
                                title={language === 'ar' ? `ترقية إلى ${translateStatus(language, nextSt)}` : `Advance to ${nextSt}`}
                                className="px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-800 text-[10px] font-mono font-bold transition-colors"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Lead Detailed Inspection Drawer / Card */}
      {selectedLead && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden mt-6">
          {/* Lead Header with Luxury Gradient Banner */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-lg shadow-md">
                {selectedLead.customerName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {selectedLead.customerName}
                  </h2>
                  <span className="text-xs font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded border border-slate-700">
                    {selectedLead.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {translateStatus(language, selectedLead.status)}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {translateLeadSource(language, selectedLead.source)}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-amber-400" />
                    {selectedLead.phone}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {translateDestination(language, selectedLead.destination)}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {selectedLead.travelDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions in Lead Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowCallModal(true)}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'callNow')}</span>
              </button>

              <button
                onClick={() => updateLeadStatus(selectedLead.id, 'Interested')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-700"
              >
                {getTranslation(language, 'btn_mark_interested')}
              </button>

              <button
                onClick={() => setActiveModule('quotations')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'createQuotation')}</span>
              </button>

              {selectedLead.status !== 'Confirmed' ? (
                <button
                  onClick={() => {
                    updateLeadStatus(selectedLead.id, 'Confirmed');
                    setActiveModule('bookings');
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{getTranslation(language, 'btn_confirm_booking')}</span>
                </button>
              ) : null}

              <button
                onClick={() => updateLeadStatus(selectedLead.id, 'Lost')}
                className="px-2.5 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-rose-900/50"
              >
                {getTranslation(language, 'btn_mark_lost')}
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Step Tracker Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[620px] gap-2">
              {stageOrder.slice(0, 6).map((st, i) => {
                const isPassed = stageOrder.indexOf(selectedLead.status) >= i;
                const isCurrent = selectedLead.status === st;

                return (
                  <button
                    key={st}
                    onClick={() => updateLeadStatus(selectedLead.id, st)}
                    className={`flex items-center gap-2 text-xs font-medium transition-all px-2.5 py-1 rounded-md cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                        : isPassed
                        ? 'text-slate-800 hover:bg-slate-200/60'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isCurrent
                          ? 'bg-slate-950 text-amber-400'
                          : isPassed
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>{translateStatus(language, st)}</span>
                    {i < 5 && <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-1 rtl:rotate-180" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Tabs Header */}
          <div className="border-b border-slate-200 px-6 flex items-center gap-8 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'border-amber-500 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {getTranslation(language, 'tab_overview')}
            </button>
            <button
              onClick={() => setActiveTab('calls')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'calls'
                  ? 'border-amber-500 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{getTranslation(language, 'tab_calls')}</span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                {selectedLead.callHistory.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'border-emerald-500 text-emerald-800 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getTranslation(language, 'tab_whatsapp')}</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'border-amber-500 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{getTranslation(language, 'tab_notes')}</span>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                {selectedLead.notesHistory.length}
              </span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Requirements Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3 shadow-2xs">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>{language === 'ar' ? 'متطلبات وتفاصيل الرحلة' : 'Travel Requirements'}</span>
                    <span className="text-[10px] font-mono text-slate-400">#TR-SPEC</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[11px]">{getTranslation(language, 'destination')}</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {translateDestination(language, selectedLead.destination)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{getTranslation(language, 'travelDate')}</span>
                      <span className="font-mono font-semibold text-slate-900">{selectedLead.travelDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'عدد المسافرين' : 'Party Size'}</span>
                      <span className="font-semibold text-slate-900">
                        {selectedLead.adults} {language === 'ar' ? 'بالغ' : 'Adults'} · {selectedLead.children} {language === 'ar' ? 'أطفال' : 'Children'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'مصدر الليد' : 'Source'}</span>
                      <span className="font-semibold text-slate-900">{translateLeadSource(language, selectedLead.source)}</span>
                    </div>
                  </div>

                  {selectedLead.childrenDetails && selectedLead.childrenDetails.length > 0 && (
                    <div className="pt-2.5 border-t border-slate-200">
                      <span className="text-slate-700 font-bold block mb-1 text-[11px]">
                        {language === 'ar' ? 'تفاصيل الأطفال (سياسة تسعير الطفل):' : 'Children Breakdown (Child Policy):'}
                      </span>
                      <div className="space-y-1">
                        {selectedLead.childrenDetails.map(ch => (
                          <div key={ch.id} className="flex justify-between items-center text-[11px] py-1 px-2 bg-white rounded border border-slate-200">
                            <span className="text-slate-800 font-medium">
                              {ch.name} ({ch.age} {language === 'ar' ? 'سنوات' : 'years'})
                            </span>
                            <span className="font-mono text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                              {ch.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2.5 border-t border-slate-200">
                    <span className="text-slate-400 block text-[11px]">{language === 'ar' ? 'ملاحظات العميل الأولية:' : 'Intake Notes:'}</span>
                    <p className="text-slate-700 mt-1 italic leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                      "{selectedLead.notes}"
                    </p>
                  </div>
                </div>

                {/* Assigned Sales Team & Follow-up */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3 shadow-2xs">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>{language === 'ar' ? 'فريق المبيعات وحالة المتابعة' : 'Sales Team & Follow-up'}</span>
                    <span className="text-[10px] font-mono text-slate-400">#ASSIGNMENT</span>
                  </h4>
                  <div className="space-y-2.5 text-slate-600">
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'مسؤول المبيعات المتابع' : 'Assigned Sales Agent'}</span>
                      <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5 text-amber-600" />
                        {selectedLead.assignedSalesAgent}
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'مودريتور الاستقبال' : 'Intake Moderator'}</span>
                      <span className="text-slate-800 font-medium">{selectedLead.moderator}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'تاريخ الإنشاء' : 'Created Date'}</span>
                        <span className="font-mono text-slate-800 text-[11px]">{selectedLead.createdDate}</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">{language === 'ar' ? 'المتابعة القادمة' : 'Next Follow-up'}</span>
                        <span className="font-mono text-amber-800 font-bold text-[11px]">
                          {selectedLead.nextFollowUp || (language === 'ar' ? 'لا توجد' : 'None')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveModule('availability')}
                      className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>
                        {language === 'ar'
                          ? `فحص إتاحة فنادق ${translateDestination(language, selectedLead.destination)} ←`
                          : `Check Hotel Availability for ${selectedLead.destination} →`}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Connected Quotations Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      {language === 'ar' ? 'عروض الأسعار المرتبطة' : 'Quotation History'}
                    </h4>
                    <button
                      onClick={() => setActiveModule('quotations')}
                      className="text-amber-700 hover:text-amber-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'عرض جديد' : 'New Quote'}</span>
                    </button>
                  </div>

                  {relatedQuotations.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 italic bg-white rounded-lg border border-slate-200">
                      {language === 'ar'
                        ? 'لم يتم إنشاء تسعير لهذا الليد بعد. اضغط "عرض جديد" لاحتساب التكلفة مع سياسة الأطفال.'
                        : 'No quotations built yet. Click "+ New Quote" to price packages with child policy.'}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {relatedQuotations.map(q => (
                        <div key={q.id} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900 text-xs">{q.id}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              {q.status}
                            </span>
                          </div>
                          <div className="text-slate-800 font-semibold">{q.hotelName}</div>
                          <div className="flex justify-between items-center font-mono text-xs pt-1.5 border-t border-slate-100">
                            <span className="text-slate-500 text-[11px]">{language === 'ar' ? 'السعر للعميل:' : 'Price:'}</span>
                            <span className="font-bold text-amber-800 text-sm">
                              {formatEGP(q.customerPrice, language)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'calls' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'سجل المكالمات الهاتفية والمتابعات' : 'Call Logs & Summaries'}
                  </h4>
                  <button
                    onClick={() => setShowCallModal(true)}
                    className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? '+ تسجيل مكالمة جديدة' : '+ Log New Call'}</span>
                  </button>
                </div>

                {selectedLead.callHistory.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs italic bg-slate-50 rounded-xl border border-slate-200">
                    {language === 'ar'
                      ? 'لا توجد مكالمات مسجلة حتى الآن. اضغط على "+ تسجيل مكالمة جديدة" للتوثيق.'
                      : 'No phone calls logged yet. Click "+ Log New Call" above to record outcomes.'}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedLead.callHistory.map(call => (
                      <div key={call.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div className="flex justify-between items-center text-slate-500 font-mono text-[11px] pb-1.5 border-b border-slate-200">
                          <span className="font-bold text-slate-900">
                            {language === 'ar' ? `الموظف: ${call.agent}` : `Agent: ${call.agent}`}
                          </span>
                          <span className="flex items-center gap-2">
                            <span>{call.timestamp}</span>
                            <span>·</span>
                            <span className="text-amber-800 font-semibold">{call.duration}</span>
                          </span>
                        </div>
                        <p className="mt-2 text-slate-800 leading-relaxed font-sans">
                          {call.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="max-w-lg mx-auto bg-slate-100/90 rounded-2xl border border-slate-300 p-4 space-y-3.5 shadow-sm">
                <div className="bg-emerald-700 text-white p-3 rounded-xl flex items-center justify-between text-xs shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">{selectedLead.customerName}</div>
                      <div className="text-[10px] text-emerald-200 font-mono">{selectedLead.whatsapp}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-800 px-2.5 py-1 rounded-full text-emerald-200 font-mono font-semibold">
                    Live WhatsApp Web
                  </span>
                </div>

                {/* Simulated Chat bubbles */}
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-60 overflow-y-auto text-xs">
                  <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-2xs max-w-[85%] self-start border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono mb-1">10:42 AM · {selectedLead.customerName}</div>
                    <div className="text-slate-800 leading-relaxed">
                      السلام عليكم، شفت عرض {translateDestination(language, selectedLead.destination)}. حابب أعرف التفاصيل لأسرة فردين وطفلين، شامل الانتقالات.
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-xl rounded-tr-none shadow-2xs max-w-[85%] ml-auto border border-emerald-100">
                    <div className="text-[10px] text-emerald-700 font-mono mb-1">11:25 AM · {selectedLead.assignedSalesAgent}</div>
                    <div className="text-slate-800 leading-relaxed">
                      أهلاً بحضرتك يا فندم! جهزنا لحضرتك عرض خاص شامل الإقامة الفندقية + مقاعد خاصة في أتوبيس الشركة السياحي مع تطبيق سياسة الأطفال المجانية ونصف السعر.
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={waMessage}
                    onChange={e => setWaMessage(e.target.value)}
                    placeholder={language === 'ar' ? 'اكتب رسالة واتساب للعميل...' : 'Type simulated WhatsApp message...'}
                    className="flex-1 text-xs px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 shadow-2xs"
                  />
                  <button
                    onClick={() => {
                      if (!waMessage) return;
                      addNoteToLead(selectedLead.id, `WhatsApp message: "${waMessage}"`);
                      setWaMessage('');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إرسال' : 'Send'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder={language === 'ar' ? 'إضافة ملاحظة متابعة أو متطلب تشغيلي...' : 'Add operational or follow-up note...'}
                    className="flex-1 text-xs px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer shadow-xs"
                  >
                    {language === 'ar' ? 'إضافة الملاحظة' : 'Add Note'}
                  </button>
                </form>

                <div className="space-y-2.5">
                  {selectedLead.notesHistory.map(note => (
                    <div key={note.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between items-center text-slate-400 font-mono text-[11px] pb-1 border-b border-slate-200">
                        <span className="font-bold text-slate-800">{note.author}</span>
                        <span>{note.timestamp}</span>
                      </div>
                      <p className="mt-2 text-slate-800 leading-relaxed font-sans">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Call Log Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'ar' ? `تسجيل مكالمة مع ${selectedLead.customerName}` : `Log Phone Call with ${selectedLead.customerName}`}
              </h3>
            </div>

            <form onSubmit={handleLogCall} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'مدة المكالمة' : 'Call Duration'}
                </label>
                <input
                  type="text"
                  value={callDuration}
                  onChange={e => setCallDuration(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'ar' ? 'ملخص ومخرجات المكالمة *' : 'Call Summary & Outcomes *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={callSummary}
                  onChange={e => setCallSummary(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: تم الاتصال بالعميل ومناقشة تفاصيل الحجز، وطلب إرسال عرض رسمي عبر الواتساب.' : 'e.g. Spoke with customer. Discussed package options and agreed to send formal quote via WhatsApp.'}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCallModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
                >
                  {language === 'ar' ? 'حفظ المكالمة' : 'Save Call Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

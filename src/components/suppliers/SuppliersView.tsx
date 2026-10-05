import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, formatEGP } from '../../utils/i18n';
import { Supplier } from '../../types';
import {
  Building2,
  Phone,
  Mail,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Plus
} from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { language, suppliers, supplierRequests, setActiveModule } = useApp();
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('SUP-01');

  const selectedSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];
  const relatedRequests = supplierRequests.filter(r => r.supplierId === selectedSupplier?.id);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_suppliers')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'إدارة بروكرز الفنادق، شركات السياحة الشريكة، النقل الخارجي، والمستحقات المالية'
              : 'Hotel brokers, B2B tour operators, external coach partners & payable balances'}
          </p>
        </div>

        <button
          onClick={() => setActiveModule('availability')}
          className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
        >
          Check Supplier Availability →
        </button>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suppliers.map(sup => {
          const isSelected = selectedSupplier?.id === sup.id;

          return (
            <div
              key={sup.id}
              onClick={() => setSelectedSupplierId(sup.id)}
              className={`bg-white rounded-lg border p-4 transition-all cursor-pointer shadow-xs ${
                isSelected ? 'border-amber-500 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {sup.type}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                    {sup.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Contact: {sup.contactPerson}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Outstanding Payable</span>
                  <span className="font-mono font-bold text-rose-600">
                    {formatEGP(sup.outstandingAmount, language)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Bookings</span>
                  <span className="font-mono font-bold text-slate-800">
                    {sup.bookingsCount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Supplier Deep Dive */}
      {selectedSupplier && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs mt-6">
          <div className="p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{selectedSupplier.name}</h2>
                <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded">
                  {selectedSupplier.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedSupplier.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Contact: {selectedSupplier.contactPerson} · Phone: {selectedSupplier.phone} · WhatsApp: {selectedSupplier.whatsapp}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current Balance Payable</span>
              <span className="text-xl font-bold font-mono text-rose-400">
                {formatEGP(selectedSupplier.outstandingAmount, language)}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Services Provided
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.services.map((srv, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Availability Requests Sent to {selectedSupplier.name}
              </h4>
              {relatedRequests.length === 0 ? (
                <div className="py-6 text-center text-slate-400 italic">
                  No requests sent to this supplier yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {relatedRequests.map(req => (
                    <div key={req.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">{req.hotelName} ({req.roomType})</div>
                        <div className="text-slate-500 text-[11px]">{req.checkIn} → {req.checkOut} · {req.roomsCount} Rooms · {req.adultsCount}A / {req.childrenCount}C</div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold font-mono text-emerald-700">{formatEGP(req.supplierQuote || 0, language)}</span>
                        <div className="text-[10px] text-amber-700 font-mono">{req.validUntil}</div>
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

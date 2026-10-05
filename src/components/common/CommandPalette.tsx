import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation, translateDestination, translateStatus, formatEGP } from '../../utils/i18n';
import {
  Search,
  User,
  Receipt,
  FileSpreadsheet,
  Hotel,
  Bus,
  ArrowRight,
  X,
  Sparkles,
  Phone,
  MapPin,
  CornerDownLeft
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const {
    language,
    customers,
    bookings,
    leads,
    hotels,
    trips,
    setActiveModule,
    setSelectedCustomerId,
    setSelectedBookingId,
    setSelectedLeadId,
    setSelectedHotelId,
    setSelectedTripId
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCustomers = customers.filter(
    c => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.id.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredBookings = bookings.filter(
    b => !q || b.id.toLowerCase().includes(q) || b.customerName.toLowerCase().includes(q) || b.destination.toLowerCase().includes(q) || b.hotelName.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredLeads = leads.filter(
    l => !q || l.id.toLowerCase().includes(q) || l.customerName.toLowerCase().includes(q) || l.destination.toLowerCase().includes(q) || l.phone.includes(q)
  ).slice(0, 3);

  const filteredHotels = hotels.filter(
    h => !q || h.name.toLowerCase().includes(q) || h.destination.toLowerCase().includes(q) || h.id.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredTrips = trips.filter(
    t => !q || t.id.toLowerCase().includes(q) || t.route.toLowerCase().includes(q) || t.busId.toLowerCase().includes(q)
  ).slice(0, 3);

  const totalResults =
    filteredCustomers.length +
    filteredBookings.length +
    filteredLeads.length +
    filteredHotels.length +
    filteredTrips.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 sm:px-6">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-200 animate-in fade-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث سريعاً عن حجز، عميل، فندق، ليد، أو رحلة حافلة...'
                : 'Search bookings, customers, leads, hotels, or bus routes...'
            }
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs divide-y divide-slate-100">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="text-sm font-medium text-slate-600">
                {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching results found'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ar' ? 'جرّب البحث باسم العميل أو كود الحجز أو الوجهة' : 'Try searching by customer name, booking ID, or destination'}
              </p>
            </div>
          ) : (
            <>
              {/* Bookings Section */}
              {filteredBookings.length > 0 && (
                <div className="pt-2 first:pt-0">
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{language === 'ar' ? 'الحجوزات والعمليات' : 'Bookings'}</span>
                    <span className="font-mono text-[10px] text-slate-400">{filteredBookings.length}</span>
                  </div>
                  <div className="space-y-1">
                    {filteredBookings.map(b => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setSelectedBookingId(b.id);
                          setActiveModule('booking-detail');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50/60 hover:border-amber-200 border border-transparent transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            <Receipt className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              <span>{b.customerName}</span>
                              <span className="font-mono text-[11px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                {b.id}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {b.hotelName} · {translateDestination(language, b.destination)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <span className="font-mono font-bold text-slate-900">
                            {formatEGP(b.totalPrice, language)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers Section */}
              {filteredCustomers.length > 0 && (
                <div className="pt-2">
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{language === 'ar' ? 'العملاء' : 'Customers'}</span>
                    <span className="font-mono text-[10px] text-slate-400">{filteredCustomers.length}</span>
                  </div>
                  <div className="space-y-1">
                    {filteredCustomers.map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCustomerId(c.id);
                          setActiveModule('customers');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{c.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {c.phone} · {c.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-mono">
                            {c.totalBookings} {language === 'ar' ? 'حجوزات' : 'bookings'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Leads Section */}
              {filteredLeads.length > 0 && (
                <div className="pt-2">
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{language === 'ar' ? 'الليدز ومسار المبيعات' : 'Sales Leads'}</span>
                    <span className="font-mono text-[10px] text-slate-400">{filteredLeads.length}</span>
                  </div>
                  <div className="space-y-1">
                    {filteredLeads.map(l => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setSelectedLeadId(l.id);
                          setActiveModule('pipeline');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              <span>{l.customerName}</span>
                              <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                                {l.source}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {translateDestination(language, l.destination)} · {l.adults}A + {l.children}C
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-semibold text-slate-700">
                            {translateStatus(language, l.status)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hotels Section */}
              {filteredHotels.length > 0 && (
                <div className="pt-2">
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{language === 'ar' ? 'الفنادق والمنتجعات' : 'Hotels & Resorts'}</span>
                    <span className="font-mono text-[10px] text-slate-400">{filteredHotels.length}</span>
                  </div>
                  <div className="space-y-1">
                    {filteredHotels.map(h => (
                      <button
                        key={h.id}
                        onClick={() => {
                          setSelectedHotelId(h.id);
                          setActiveModule('hotels');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                            <Hotel className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{h.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {translateDestination(language, h.destination)} · {h.stars} {language === 'ar' ? 'نجوم' : 'Stars'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-emerald-700 font-medium">
                            {h.contractType === 'Direct' ? (language === 'ar' ? 'عقد مباشر' : 'Direct') : (language === 'ar' ? 'بروكر' : 'Broker')}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bus Trips Section */}
              {filteredTrips.length > 0 && (
                <div className="pt-2">
                  <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{language === 'ar' ? 'رحلات الأتوبيسات والأسطول' : 'Bus Departures'}</span>
                    <span className="font-mono text-[10px] text-slate-400">{filteredTrips.length}</span>
                  </div>
                  <div className="space-y-1">
                    {filteredTrips.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTripId(t.id);
                          setActiveModule('trips');
                          onClose();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                            <Bus className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              <span>{t.route}</span>
                              <span className="font-mono text-[11px] text-purple-800 bg-purple-50 px-1.5 py-0.2 rounded">
                                {t.id}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {t.departureDate} at {t.departureTime} · {t.busId}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-600">
                            {t.bookedSeats}/{t.capacity} {language === 'ar' ? 'مقعد' : 'Seats'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              {language === 'ar' ? 'اضغط للفتح المباشر' : 'Press to navigate'}
            </span>
            <span className="text-slate-300">·</span>
            <span>
              {language === 'ar' ? 'اختصار: Ctrl + K' : 'Shortcut: ⌘K or Ctrl+K'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

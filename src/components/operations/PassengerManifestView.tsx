import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { PassengerManifestItem } from '../../types';
import {
  Users2,
  Bus as BusIcon,
  Search,
  Printer,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  Armchair,
  Filter,
  UserCheck,
  Building,
  Navigation
} from 'lucide-react';

export const PassengerManifestView: React.FC = () => {
  const { language, trips, bookings, selectedTripId, setSelectedTripId, setActiveModule, setSelectedBookingId } = useApp();

  const selectedTrip = trips.find(t => t.id === selectedTripId) || trips[0];
  const [selectedSeat, setSelectedSeat] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Adult' | 'Child'>('All');

  // Manifest passengers
  const manifestPassengers: PassengerManifestItem[] = [
    {
      id: 'PM-01',
      seatNumber: 1,
      passengerName: 'Ahmed Hassan',
      phone: '01012345678',
      bookingId: 'TR-2044',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Adult'
    },
    {
      id: 'PM-02',
      seatNumber: 2,
      passengerName: 'Sara Hassan (Spouse)',
      phone: '01012345678',
      bookingId: 'TR-2044',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Adult'
    },
    {
      id: 'PM-03',
      seatNumber: 3,
      passengerName: 'Omar Hassan (Son)',
      phone: '01012345678',
      bookingId: 'TR-2044',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Child',
      childAge: 7
    },
    {
      id: 'PM-04',
      seatNumber: 4,
      passengerName: 'Mariam Hassan (Daughter)',
      phone: '01012345678',
      bookingId: 'TR-2044',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Child',
      childAge: 4
    },
    {
      id: 'PM-05',
      seatNumber: 5,
      passengerName: 'Mahmoud El-Sayed',
      phone: '01088774433',
      bookingId: 'TR-2040',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Adult'
    },
    {
      id: 'PM-06',
      seatNumber: 6,
      passengerName: 'Dina El-Sayed',
      phone: '01088774433',
      bookingId: 'TR-2040',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Adult'
    },
    {
      id: 'PM-07',
      seatNumber: 7,
      passengerName: 'Nour El-Sayed',
      phone: '01088774433',
      bookingId: 'TR-2040',
      hotelName: 'Coral Resort Hurghada',
      pickupPoint: 'Sidi Gaber Station - Alexandria',
      passengerType: 'Child',
      childAge: 9
    }
  ];

  const passengerAtSeat = (seatNum: number) => manifestPassengers.find(p => p.seatNumber === seatNum);
  const activePassenger = selectedSeat ? passengerAtSeat(selectedSeat) : null;

  const filteredPassengers = manifestPassengers.filter(p => {
    const matchesSearch =
      p.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hotelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || p.passengerType === filterType;
    return matchesSearch && matchesType;
  });

  const occupiedSeatsCount = manifestPassengers.length;
  const totalCapacity = 50;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-700 flex items-center justify-center font-bold text-sm">
              <BusIcon className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{getTranslation(language, 'nav_passenger_lists')}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                  {occupiedSeatsCount} / {totalCapacity} {language === 'ar' ? 'مقعد محجوز' : 'Seats Booked'}
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'مخطط مقاعد الأتوبيس السياحي التفاعلي وكشف الركاب ونقاط التجمع والفنادق'
                  : 'Interactive 50-seat coach visual layout, seat allocation & passenger manifest list'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ar' ? 'طباعة كشف الركاب (المانيفست)' : 'Print Manifest'}</span>
          </button>
        </div>
      </div>

      {/* Trip Selector Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-purple-600" />
            {language === 'ar' ? 'الرحلة المختارة:' : 'Select Trip:'}
          </span>
          <select
            value={selectedTrip.id}
            onChange={e => setSelectedTripId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 font-bold cursor-pointer text-xs focus:outline-none focus:border-purple-500"
          >
            {trips.map(t => (
              <option key={t.id} value={t.id}>
                {t.id}: {t.route} ({t.departureDate} at {t.departureTime}) - {t.busId}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-600 font-mono flex items-center gap-4 flex-wrap">
          <div>
            <span className="text-slate-400">{language === 'ar' ? 'الحافلة: ' : 'Coach: '}</span>
            <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {selectedTrip.busId}
            </strong>
          </div>
          <div>
            <span className="text-slate-400">{language === 'ar' ? 'الكابتن: ' : 'Captain: '}</span>
            <strong className="text-slate-900">{selectedTrip.driverName}</strong>
          </div>
          <div>
            <span className="text-slate-400">{language === 'ar' ? 'نقطة الانطلاق: ' : 'Pickup: '}</span>
            <strong className="text-amber-800">
              {language === 'ar' ? 'محطة سيدي جابر - الإسكندرية' : 'Sidi Gaber Station'}
            </strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Coach Layout + Passenger Details & Manifest Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Bus Seat Map */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col">
          {/* Bus Front Cap / Header */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-3 rounded-t-xl flex items-center justify-between text-xs mb-3 shadow-sm">
            <div className="flex items-center gap-2 font-bold">
              <BusIcon className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? `حافلة VIP مرسيدس 500 (${selectedTrip.busId})` : `VIP Coach 500 (${selectedTrip.busId})`}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              {language === 'ar' ? 'باب الصعود الأمامي' : 'Front Entrance'}
            </span>
          </div>

          {/* Bus Driver Cab Frame */}
          <div className="p-2.5 bg-slate-100 rounded-lg border border-slate-200 flex justify-between items-center text-[11px] mb-3 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                👨‍✈️
              </div>
              <span className="text-slate-700 font-semibold">
                {selectedTrip.driverName}
              </span>
            </div>
            <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-[10px] font-bold">
              {language === 'ar' ? 'كابينة القيادة' : 'Driver Cab'}
            </span>
          </div>

          {/* 50 Seats Matrix (4 seats per row: A, B -- Aisle -- C, D) */}
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 bg-slate-50/60 p-2 rounded-xl border border-slate-200/80">
            {Array.from({ length: 12 }).map((_, rowIndex) => {
              const seatA = rowIndex * 4 + 1;
              const seatB = rowIndex * 4 + 2;
              const seatC = rowIndex * 4 + 3;
              const seatD = rowIndex * 4 + 4;

              const renderSeat = (seatNum: number) => {
                const pass = passengerAtSeat(seatNum);
                const isSelected = selectedSeat === seatNum;
                const isOccupied = !!pass;
                const isChild = pass?.passengerType === 'Child';

                return (
                  <button
                    key={seatNum}
                    onClick={() => setSelectedSeat(seatNum)}
                    className={`h-9 w-9 rounded-lg border text-center flex flex-col items-center justify-center text-[10px] font-mono transition-all duration-150 cursor-pointer shadow-2xs ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-600 ring-2 ring-amber-400/50 scale-105 z-10'
                        : isOccupied
                        ? isChild
                          ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold hover:bg-amber-200'
                          : 'bg-purple-100 text-purple-950 border-purple-300 font-bold hover:bg-purple-200'
                        : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                    title={pass ? `${pass.passengerName} (${pass.passengerType})` : `Seat ${seatNum} Available`}
                  >
                    <span className="font-bold">{seatNum}</span>
                    <span className="text-[8px] font-medium leading-none mt-0.5">
                      {isOccupied ? (isChild ? (language === 'ar' ? 'طفل' : 'CH') : (language === 'ar' ? 'بالغ' : 'AD')) : (language === 'ar' ? 'حر' : 'AV')}
                    </span>
                  </button>
                );
              };

              return (
                <div key={rowIndex} className="flex items-center justify-between px-1">
                  <div className="flex gap-1.5">
                    {renderSeat(seatA)}
                    {renderSeat(seatB)}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono font-semibold">
                    {rowIndex + 1}
                  </span>

                  <div className="flex gap-1.5">
                    {renderSeat(seatC)}
                    {renderSeat(seatD)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seat Map Legend */}
          <div className="mt-3.5 pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-[10px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-100 border border-purple-300 block shrink-0" />
              <span>{language === 'ar' ? 'راكب بالغ' : 'Adult Pax'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 block shrink-0" />
              <span>{language === 'ar' ? 'راكب طفل' : 'Child Pax'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-white border border-slate-300 block shrink-0" />
              <span>{language === 'ar' ? 'شاغر' : 'Available'}</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Selected Seat Quick Info & Manifest Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected Seat Quick Inspection Card */}
          {activePassenger ? (
            <div className="bg-amber-50/70 rounded-xl border border-amber-200/90 p-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-2xs">
                    #{activePassenger.seatNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        {activePassenger.passengerName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        activePassenger.passengerType === 'Child' ? 'bg-amber-200 text-amber-900' : 'bg-purple-100 text-purple-900'
                      }`}>
                        {activePassenger.passengerType === 'Child'
                          ? (language === 'ar' ? `طفل (${activePassenger.childAge} سنوات)` : `Child (${activePassenger.childAge}y)`)
                          : (language === 'ar' ? 'بالغ' : 'Adult')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                      <span className="font-mono">{activePassenger.phone}</span>
                      <span>·</span>
                      <button
                        onClick={() => {
                          setSelectedBookingId(activePassenger.bookingId);
                          setActiveModule('booking-detail');
                        }}
                        className="font-mono text-amber-800 font-bold hover:underline cursor-pointer"
                      >
                        {activePassenger.bookingId}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activePassenger.phone}`}
                    className="px-3 py-1.5 bg-white border border-amber-300 text-slate-800 rounded-lg text-xs font-semibold hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>{language === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                  <button
                    onClick={() => {
                      setSelectedBookingId(activePassenger.bookingId);
                      setActiveModule('booking-detail');
                    }}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>{language === 'ar' ? 'ملف الحجز كامل ←' : 'View Full Booking →'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{activePassenger.hotelName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{activePassenger.pickupPoint}</span>
                </div>
              </div>
            </div>
          ) : selectedSeat ? (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-slate-500 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">
                  {language === 'ar' ? `المقعد رقم ${selectedSeat} متاح وغير محجوز` : `Seat #${selectedSeat} is currently available`}
                </span>
                <span>{language === 'ar' ? 'يمكن تخصيصه لأي حجز جديد مباشرة' : 'Can be allocated directly to new reservations'}</span>
              </div>
              <button
                onClick={() => setActiveModule('bookings')}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                {language === 'ar' ? 'تخصيص لحجز ←' : 'Allocate to Booking →'}
              </button>
            </div>
          ) : null}

          {/* Passenger Manifest Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 rtl:right-2.5 rtl:left-auto" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'بحث بالاسم، الهاتف، أو الحجز...' : 'Search by name, phone, booking...'}
                    className="text-xs pl-8 pr-3 py-1.5 rtl:pr-8 rtl:pl-3 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 w-56"
                  />
                </div>

                <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-[11px]">
                  <button
                    onClick={() => setFilterType('All')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${filterType === 'All' ? 'bg-white font-bold shadow-2xs text-slate-900' : 'text-slate-500'}`}
                  >
                    {language === 'ar' ? 'الكل' : 'All'}
                  </button>
                  <button
                    onClick={() => setFilterType('Adult')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${filterType === 'Adult' ? 'bg-white font-bold shadow-2xs text-slate-900' : 'text-slate-500'}`}
                  >
                    {language === 'ar' ? 'بالغين' : 'Adults'}
                  </button>
                  <button
                    onClick={() => setFilterType('Child')}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${filterType === 'Child' ? 'bg-white font-bold shadow-2xs text-slate-900' : 'text-slate-500'}`}
                  >
                    {language === 'ar' ? 'أطفال' : 'Children'}
                  </button>
                </div>
              </div>

              <span className="text-xs font-mono text-purple-700 font-bold">
                {language === 'ar' ? 'تجمع الإسكندرية: محطة سيدي جابر' : 'Alexandria Pickup: Sidi Gaber Station'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'المقعد' : 'Seat'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'اسم الراكب' : 'Passenger Name'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'الهاتف' : 'Phone'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'رقم الحجز' : 'Booking ID'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'فندق الإقامة' : 'Hotel Destination'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'الفئة' : 'Type'}</th>
                    <th className="py-2.5 px-3.5">{language === 'ar' ? 'نقطة الركوب' : 'Pickup Location'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPassengers.map(p => (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedSeat(p.seatNumber)}
                      className={`cursor-pointer transition-colors ${
                        selectedSeat === p.seatNumber ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3.5 font-mono font-bold text-purple-700">
                        {language === 'ar' ? `مقعد ${p.seatNumber}` : `Seat ${p.seatNumber}`}
                      </td>
                      <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                        {p.passengerName}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-slate-600">
                        {p.phone}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono font-medium text-amber-800">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedBookingId(p.bookingId);
                            setActiveModule('booking-detail');
                          }}
                          className="hover:underline cursor-pointer"
                        >
                          {p.bookingId}
                        </button>
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-800 font-medium">
                        {p.hotelName}
                      </td>
                      <td className="py-2.5 px-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          p.passengerType === 'Child' ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {p.passengerType === 'Child' ? (language === 'ar' ? 'طفل' : 'Child') : (language === 'ar' ? 'بالغ' : 'Adult')}
                          {p.childAge ? (language === 'ar' ? ` (${p.childAge}y)` : ` (${p.childAge}y)`) : ''}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-600">
                        {language === 'ar' ? 'محطة سيدي جابر - الإسكندرية' : p.pickupPoint}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

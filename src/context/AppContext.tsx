import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  Lead,
  Customer,
  Hotel,
  HotelContract,
  RoomInventoryDate,
  SupplierAvailabilityRequest,
  Supplier,
  Quotation,
  Booking,
  PaymentRecord,
  Bus,
  Driver,
  Trip,
  TaskItem,
  NotificationItem,
  AuditLogEntry,
  OperationsChecklist
} from '../types';
import {
  initialCustomers,
  initialHotels,
  initialContracts,
  initialRoomInventory,
  initialSuppliers,
  initialSupplierRequests,
  initialBuses,
  initialDrivers,
  initialTrips,
  initialQuotations,
  initialBookings,
  initialLeads,
  initialPayments,
  initialTasks,
  initialNotifications,
  initialAuditLogs
} from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeModule: string;
  setActiveModule: (mod: string) => void;
  
  // Selection
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  selectedHotelId: string | null;
  setSelectedHotelId: (id: string | null) => void;
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;

  // Data
  leads: Lead[];
  customers: Customer[];
  hotels: Hotel[];
  contracts: HotelContract[];
  roomInventory: RoomInventoryDate[];
  supplierRequests: SupplierAvailabilityRequest[];
  suppliers: Supplier[];
  quotations: Quotation[];
  bookings: Booking[];
  buses: Bus[];
  drivers: Driver[];
  trips: Trip[];
  payments: PaymentRecord[];
  tasks: TaskItem[];
  notifications: NotificationItem[];
  auditLogs: AuditLogEntry[];

  resetAllData: () => void;

  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'createdTime' | 'createdDate' | 'callHistory' | 'notesHistory'>) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  assignSalesAgentToLead: (leadId: string, agentName: string) => void;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  addCallToLead: (leadId: string, summary: string, duration: string) => void;
  addNoteToLead: (leadId: string, noteText: string) => void;
  
  createQuotation: (data: Partial<Quotation>) => Quotation;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;
  convertQuotationToBooking: (quotationId: string) => Booking | null;

  addPayment: (data: Omit<PaymentRecord, 'id'>) => PaymentRecord;
  toggleOperationChecklistItem: (bookingId: string, itemKey: keyof OperationsChecklist) => void;
  updateHotelAvailability: (hotelId: string, date: string, roomTypeId: string, bookedDelta: number) => void;
  
  addSupplierRequest: (data: Omit<SupplierAvailabilityRequest, 'id' | 'createdAt'>) => SupplierAvailabilityRequest;
  updateSupplierRequestStatus: (id: string, status: SupplierAvailabilityRequest['status']) => void;

  assignTripBusAndDriver: (tripId: string, busId: string, driverId: string) => void;
  toggleTask: (taskId: string) => void;
  addTask: (data: Omit<TaskItem, 'id'>) => TaskItem;
  markNotificationRead: (notifId: string) => void;
  addAuditLog: (action: string, entityType: AuditLogEntry['entityType'], entityId: string, details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('TR-2044');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>('LEAD-001');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>('CUST-101');
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>('HOTEL-01');
  const [selectedTripId, setSelectedTripId] = useState<string | null>('TRIP-1008');

  // Entities
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [contracts, setContracts] = useState<HotelContract[]>(initialContracts);
  const [roomInventory, setRoomInventory] = useState<RoomInventoryDate[]>(initialRoomInventory);
  const [supplierRequests, setSupplierRequests] = useState<SupplierAvailabilityRequest[]>(initialSupplierRequests);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);

  // Sync RTL / LTR on html document element
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const addAuditLog = (action: string, entityType: AuditLogEntry['entityType'], entityId: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action,
      user: activeRole.toUpperCase(),
      role: activeRole,
      entityType,
      entityId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdTime' | 'createdDate' | 'callHistory' | 'notesHistory'>): Lead => {
    const newId = `LEAD-${(leads.length + 1).toString().padStart(3, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdDate: new Date().toISOString().split('T')[0],
      callHistory: [],
      notesHistory: [
        {
          id: `NOTE-${Date.now()}`,
          timestamp: 'Just now',
          author: `${activeRole}`,
          text: `Lead created from ${leadData.source}. Requirements: ${leadData.destination}, ${leadData.adults} Adults, ${leadData.children} Children.`
        }
      ]
    };
    setLeads(prev => [newLead, ...prev]);
    addAuditLog('Lead Created', 'Lead', newId, `New lead from ${leadData.source} for ${leadData.customerName}`);
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const assignSalesAgentToLead = (leadId: string, agentName: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          assignedSalesAgent: agentName,
          status: l.status === 'New' ? 'Contacted' : l.status,
          notesHistory: [
            ...l.notesHistory,
            {
              id: `NOTE-${Date.now()}`,
              timestamp: 'Just now',
              author: activeRole,
              text: `Assigned lead to Sales Agent: ${agentName}`
            }
          ]
        };
      }
      return l;
    }));
    addAuditLog('Lead Assigned', 'Lead', leadId, `Assigned to ${agentName}`);
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status,
          notesHistory: [
            ...l.notesHistory,
            {
              id: `NOTE-${Date.now()}`,
              timestamp: 'Just now',
              author: activeRole,
              text: `Status updated to: ${status}`
            }
          ]
        };
      }
      return l;
    }));
    addAuditLog('Status Changed', 'Lead', leadId, `Lead status moved to ${status}`);
  };

  const addCallToLead = (leadId: string, summary: string, duration: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          status: l.status === 'New' ? 'Contacted' : l.status,
          callHistory: [
            {
              id: `CALL-${Date.now()}`,
              timestamp: 'Just now',
              agent: activeRole,
              summary,
              duration
            },
            ...l.callHistory
          ]
        };
      }
      return l;
    }));
    addAuditLog('Call Logged', 'Lead', leadId, `Call summary: ${summary} (${duration})`);
  };

  const addNoteToLead = (leadId: string, noteText: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          notesHistory: [
            ...l.notesHistory,
            {
              id: `NOTE-${Date.now()}`,
              timestamp: 'Just now',
              author: activeRole,
              text: noteText
            }
          ]
        };
      }
      return l;
    }));
  };

  const createQuotation = (data: Partial<Quotation>): Quotation => {
    const newId = `QUOT-${(quotations.length + 901).toString()}`;
    const newQuot: Quotation = {
      id: newId,
      customerId: data.customerId || 'CUST-101',
      customerName: data.customerName || 'Ahmed Hassan',
      destination: data.destination || 'Hurghada',
      travelStartDate: data.travelStartDate || '2026-10-15',
      travelEndDate: data.travelEndDate || '2026-10-18',
      adults: data.adults || 2,
      children: data.children || 2,
      childrenDetails: data.childrenDetails || [
        { id: 'CH-1', name: 'Omar Hassan', age: 7, category: 'Child (50%)' },
        { id: 'CH-2', name: 'Mariam Hassan', age: 4, category: 'Infant (Free)' }
      ],
      hotelId: data.hotelId || 'HOTEL-01',
      hotelName: data.hotelName || 'Coral Resort Hurghada',
      roomType: data.roomType || 'Standard Room',
      numberOfRooms: data.numberOfRooms || 2,
      numberOfNights: data.numberOfNights || 3,
      components: data.components || [],
      subtotalCost: data.subtotalCost || 22600,
      markupAmount: data.markupAmount || 7400,
      customerPrice: data.customerPrice || 30000,
      marginPercent: data.marginPercent || 24.6,
      profit: data.profit || 7400,
      status: 'Sent',
      createdAt: 'Just now',
      validUntil: '5 days',
      notes: data.notes || 'Custom quotation built with hotel allotment and company bus.'
    };
    setQuotations(prev => [newQuot, ...prev]);
    addAuditLog('Quotation Created', 'Quotation', newId, `Quotation of ${newQuot.customerPrice} EGP created for ${newQuot.customerName}`);
    return newQuot;
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    addAuditLog('Quotation Status', 'Quotation', id, `Status updated to ${status}`);
  };

  const convertQuotationToBooking = (quotationId: string): Booking | null => {
    const quot = quotations.find(q => q.id === quotationId);
    if (!quot) return null;

    const newBookingId = `TR-${2045 + bookings.length}`;
    const newBooking: Booking = {
      id: newBookingId,
      quotationId: quot.id,
      customerId: quot.customerId,
      customerName: quot.customerName,
      customerPhone: '01012345678',
      destination: quot.destination,
      travelStartDate: quot.travelStartDate,
      travelEndDate: quot.travelEndDate,
      adultsCount: quot.adults,
      childrenCount: quot.children,
      childrenDetails: quot.childrenDetails,
      hotelId: quot.hotelId,
      hotelName: quot.hotelName,
      roomType: quot.roomType,
      numberOfRooms: quot.numberOfRooms,
      transportationType: 'Company Bus',
      tripId: 'TRIP-1008',
      busId: 'BUS-07',
      driverId: 'DRV-01',
      driverName: 'Mohamed Ali',
      totalPrice: quot.customerPrice,
      paidAmount: 0,
      remainingAmount: quot.customerPrice,
      status: 'Pending',
      assignedAgent: 'Omar Farouk',
      createdAt: 'Just now',
      operationsProgress: 20,
      operationsChecklist: {
        hotelConfirmed: true,
        roomsConfirmed: true,
        paymentChecked: false,
        busAssigned: false,
        driverAssigned: false,
        passengerListCompleted: false,
        roomingListCompleted: false,
        voucherSent: false,
        customerContacted: true,
        readyForTravel: false
      },
      costs: {
        hotelCost: quot.subtotalCost * 0.7,
        transportCost: 4000,
        guideCost: 500,
        otherExpenses: 500,
        totalCost: quot.subtotalCost,
        grossProfit: quot.profit
      },
      passengers: [],
      roomAssignments: []
    };

    setBookings(prev => [newBooking, ...prev]);
    updateQuotationStatus(quotationId, 'Approved');
    addAuditLog('Booking Created', 'Booking', newBookingId, `Converted from quotation ${quotationId}`);
    return newBooking;
  };

  const addPayment = (paymentData: Omit<PaymentRecord, 'id'>): PaymentRecord => {
    const newId = `PAY-${805 + payments.length}`;
    const newRecord: PaymentRecord = {
      ...paymentData,
      id: newId
    };
    setPayments(prev => [newRecord, ...prev]);

    // Update booking paid and remaining amounts
    setBookings(prev => prev.map(b => {
      if (b.id === paymentData.bookingId) {
        const newPaid = b.paidAmount + paymentData.amount;
        const newRemaining = Math.max(0, b.totalPrice - newPaid);
        const newStatus = newRemaining === 0 ? 'Confirmed' : 'Deposit Paid';
        return {
          ...b,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          status: newStatus,
          operationsChecklist: {
            ...b.operationsChecklist,
            paymentChecked: true
          }
        };
      }
      return b;
    }));

    addAuditLog('Payment Received', 'Payment', newId, `${paymentData.amount} EGP via ${paymentData.method} for ${paymentData.bookingId}`);
    return newRecord;
  };

  const toggleOperationChecklistItem = (bookingId: string, itemKey: keyof OperationsChecklist) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedChecklist = {
          ...b.operationsChecklist,
          [itemKey]: !b.operationsChecklist[itemKey]
        };
        const totalItems = Object.keys(updatedChecklist).length;
        const completedItems = Object.values(updatedChecklist).filter(Boolean).length;
        const progress = Math.round((completedItems / totalItems) * 100);
        const newStatus = progress === 100 ? 'Ready for Travel' : b.status;

        return {
          ...b,
          operationsChecklist: updatedChecklist,
          operationsProgress: progress,
          status: newStatus
        };
      }
      return b;
    }));
  };

  const updateHotelAvailability = (hotelId: string, date: string, roomTypeId: string, bookedDelta: number) => {
    setRoomInventory(prev => prev.map(inv => {
      if (inv.hotelId === hotelId && inv.date === date && inv.roomTypeId === roomTypeId) {
        const newBooked = inv.bookedRooms + bookedDelta;
        return {
          ...inv,
          bookedRooms: newBooked,
          availableRooms: Math.max(0, inv.totalRooms - newBooked)
        };
      }
      return inv;
    }));
  };

  const addSupplierRequest = (data: Omit<SupplierAvailabilityRequest, 'id' | 'createdAt'>): SupplierAvailabilityRequest => {
    const newId = `SAR-${303 + supplierRequests.length}`;
    const newReq: SupplierAvailabilityRequest = {
      ...data,
      id: newId,
      createdAt: 'Just now'
    };
    setSupplierRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const updateSupplierRequestStatus = (id: string, status: SupplierAvailabilityRequest['status']) => {
    setSupplierRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const assignTripBusAndDriver = (tripId: string, busId: string, driverId: string) => {
    const bus = buses.find(b => b.id === busId);
    const driver = drivers.find(d => d.id === driverId);
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          busId,
          busPlate: bus ? bus.plateNumber : t.busPlate,
          driverId,
          driverName: driver ? driver.name : t.driverName
        };
      }
      return t;
    }));
    addAuditLog('Bus/Driver Assigned', 'Trip', tripId, `Assigned bus ${busId} and driver ${driver?.name}`);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: t.status === 'Completed' ? 'Pending' : 'Completed'
        };
      }
      return t;
    }));
  };

  const addTask = (data: Omit<TaskItem, 'id'>): TaskItem => {
    const newId = `TSK-${106 + tasks.length}`;
    const newTask: TaskItem = { ...data, id: newId };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const resetAllData = () => {
    setCustomers(initialCustomers);
    setHotels(initialHotels);
    setContracts(initialContracts);
    setRoomInventory(initialRoomInventory);
    setSupplierRequests(initialSupplierRequests);
    setSuppliers(initialSuppliers);
    setQuotations(initialQuotations);
    setBookings(initialBookings);
    setBuses(initialBuses);
    setDrivers(initialDrivers);
    setTrips(initialTrips);
    setLeads(initialLeads);
    setPayments(initialPayments);
    setTasks(initialTasks);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
    setSelectedBookingId('TR-2044');
    setSelectedLeadId('LEAD-001');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeRole,
        setActiveRole,
        activeModule,
        setActiveModule,
        selectedBookingId,
        setSelectedBookingId,
        selectedLeadId,
        setSelectedLeadId,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedHotelId,
        setSelectedHotelId,
        selectedTripId,
        setSelectedTripId,
        leads,
        customers,
        hotels,
        contracts,
        roomInventory,
        supplierRequests,
        suppliers,
        quotations,
        bookings,
        buses,
        drivers,
        trips,
        payments,
        tasks,
        notifications,
        auditLogs,
        resetAllData,
        addLead,
        updateLead,
        assignSalesAgentToLead,
        updateLeadStatus,
        addCallToLead,
        addNoteToLead,
        createQuotation,
        updateQuotationStatus,
        convertQuotationToBooking,
        addPayment,
        toggleOperationChecklistItem,
        updateHotelAvailability,
        addSupplierRequest,
        updateSupplierRequestStatus,
        assignTripBusAndDriver,
        toggleTask,
        addTask,
        markNotificationRead,
        addAuditLog
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

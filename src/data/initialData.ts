import {
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
  AuditLogEntry
} from '../types';

export const initialCustomers: Customer[] = [
  {
    id: 'CUST-101',
    name: 'Ahmed Hassan',
    phone: '01012345678',
    whatsapp: '01012345678',
    email: 'ahmed.hassan@example.com',
    passportNumber: 'A28941092',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Mahmoud Hassan',
      relation: 'Brother',
      phone: '01099887766'
    },
    totalBookings: 2,
    totalSpent: 48000,
    createdDate: '2026-09-12',
    notes: 'VIP family client. Prefers pool & sea view rooms, quiet floors.'
  },
  {
    id: 'CUST-102',
    name: 'Sara Mansour',
    phone: '01223456789',
    whatsapp: '01223456789',
    email: 'sara.mansour@gmail.com',
    passportNumber: 'A19482011',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Youssef Mansour',
      relation: 'Father',
      phone: '01234455667'
    },
    totalBookings: 1,
    totalSpent: 18500,
    createdDate: '2026-09-20',
    notes: 'Travels with university friends. Enjoys diving packages.'
  },
  {
    id: 'CUST-103',
    name: 'Tamer Zaki',
    phone: '01145678901',
    whatsapp: '01145678901',
    email: 'tamer.zaki@yahoo.com',
    passportNumber: 'A88491023',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Nadia Zaki',
      relation: 'Spouse',
      phone: '01188776655'
    },
    totalBookings: 3,
    totalSpent: 72000,
    createdDate: '2026-08-05',
    notes: 'Regular Luxor & Aswan cruiser.'
  },
  {
    id: 'CUST-104',
    name: 'Rania Fathy',
    phone: '01033221144',
    whatsapp: '01033221144',
    email: 'rania.fathy@outlook.com',
    passportNumber: 'A67123984',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Hassan Fathy',
      relation: 'Husband',
      phone: '01055443322'
    },
    totalBookings: 1,
    totalSpent: 26000,
    createdDate: '2026-09-28',
    notes: 'Requires ground floor room due to elderly parent.'
  },
  {
    id: 'CUST-105',
    name: 'Youssef Nabil',
    phone: '01555667788',
    whatsapp: '01555667788',
    email: 'youssef.nabil@techcorp.eg',
    passportNumber: 'A90123456',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Mona Nabil',
      relation: 'Sister',
      phone: '01511223344'
    },
    totalBookings: 1,
    totalSpent: 14000,
    createdDate: '2026-10-01',
    notes: 'Corporate incentive inquiry.'
  },
  {
    id: 'CUST-106',
    name: 'Mahmoud El-Sayed',
    phone: '01088774433',
    whatsapp: '01088774433',
    email: 'mahmoud.elsayed@gmail.com',
    passportNumber: 'A55198273',
    nationality: 'Egyptian',
    emergencyContact: {
      name: 'Kareem El-Sayed',
      relation: 'Brother',
      phone: '01011224455'
    },
    totalBookings: 2,
    totalSpent: 51000,
    createdDate: '2026-08-18',
    notes: 'Likes front-row seats on the bus.'
  }
];

export const initialHotels: Hotel[] = [
  {
    id: 'HOTEL-01',
    name: 'Coral Resort Hurghada',
    city: 'Hurghada',
    destination: 'Hurghada',
    contractType: 'Direct',
    stars: 5,
    contactPerson: 'Maged Kamel (Sales Director)',
    phone: '+20 65 344 8800',
    email: 'sales@coralresort-hurghada.com',
    address: 'El Memsha Promenade, Hurghada, Red Sea',
    status: 'Active',
    childPolicy: {
      infantMaxAge: 5,
      childMaxAge: 11,
      childRateMultiplier: 0.5,
      adultRateMultiplier: 1.0,
      rulesTextEn: '0–5 years: Free of charge. 6–11 years: 50% of adult rate. 12+ years: Charged as adult rate.',
      rulesTextAr: 'من 0 حتى 5 سنوات: مجاناً تماماً. من 6 حتى 11 سنة: 50% من سعر البالغ. 12 سنة فأكثر: سعر بالغ كامل.'
    },
    roomTypes: [
      { id: 'RT-01', name: 'Standard Room', baseCost: 2400, sellingRate: 2900, allotment: 20, bookedCount: 13 },
      { id: 'RT-02', name: 'Sea View Room', baseCost: 3100, sellingRate: 3750, allotment: 10, bookedCount: 7 },
      { id: 'RT-03', name: 'Family Suite', baseCost: 4600, sellingRate: 5500, allotment: 6, bookedCount: 4 }
    ]
  },
  {
    id: 'HOTEL-02',
    name: 'Steigenberger Resort Ras Soma',
    city: 'Safaga / Hurghada',
    destination: 'Hurghada',
    contractType: 'Direct',
    stars: 5,
    contactPerson: 'Hany Shaker',
    phone: '+20 65 326 0900',
    email: 'reservations@steigenberger-rassoma.com',
    address: 'Ras Abu Soma Bay, Red Sea',
    status: 'Active',
    childPolicy: {
      infantMaxAge: 5,
      childMaxAge: 11,
      childRateMultiplier: 0.5,
      adultRateMultiplier: 1.0,
      rulesTextEn: 'First child under 12 free with 2 adults. Second child 6-11 years at 50%.',
      rulesTextAr: 'الطفل الأول تحت 12 سنة مجاناً مع فردين بالغين. الطفل الثاني 6-11 سنة بنصف السعر.'
    },
    roomTypes: [
      { id: 'RT-04', name: 'Deluxe Garden Room', baseCost: 3800, sellingRate: 4600, allotment: 15, bookedCount: 8 },
      { id: 'RT-05', name: 'Executive Beach Front', baseCost: 5200, sellingRate: 6300, allotment: 8, bookedCount: 5 }
    ]
  },
  {
    id: 'HOTEL-03',
    name: 'Sunrise Royal Makadi Resort',
    city: 'Makadi Bay',
    destination: 'Hurghada',
    contractType: 'Direct',
    stars: 5,
    contactPerson: 'Dina Samir',
    phone: '+20 65 359 0390',
    email: 'dina.samir@sunrise-resorts.com',
    address: 'Makadi Bay, South Hurghada',
    status: 'Active',
    childPolicy: {
      infantMaxAge: 5,
      childMaxAge: 11,
      childRateMultiplier: 0.5,
      adultRateMultiplier: 1.0,
      rulesTextEn: '0-5 Free, 6-11 50%, extra bed included for children over 6 upon availability.',
      rulesTextAr: 'من 0-5 مجاناً، 6-11 نصف سعر شامل سرير إضافي عند الإمكانية.'
    },
    roomTypes: [
      { id: 'RT-06', name: 'Aqua Park Standard', baseCost: 2800, sellingRate: 3400, allotment: 18, bookedCount: 11 },
      { id: 'RT-07', name: 'Family Bunk Bed Room', baseCost: 3900, sellingRate: 4700, allotment: 10, bookedCount: 6 }
    ]
  },
  {
    id: 'HOTEL-04',
    name: 'Mövenpick Resort Aswan',
    city: 'Aswan',
    destination: 'Aswan',
    contractType: 'Supplier',
    stars: 5,
    contactPerson: 'Fouad Gamal (via Broker XYZ)',
    phone: '+20 97 230 3455',
    email: 'res.aswan@movenpick.com',
    address: 'Elephantine Island, Aswan',
    supplierId: 'SUP-01',
    status: 'Active',
    childPolicy: {
      infantMaxAge: 4,
      childMaxAge: 11,
      childRateMultiplier: 0.5,
      adultRateMultiplier: 1.0,
      rulesTextEn: 'Island boat transfer included for all children. 0-4 free, 5-11 50%.',
      rulesTextAr: 'شامل لنش الجزيرة للأطفال. من 0-4 مجاناً، من 5-11 نصف سعر.'
    },
    roomTypes: [
      { id: 'RT-08', name: 'Nile View Classic', baseCost: 3500, sellingRate: 4200, allotment: 8, bookedCount: 5 }
    ]
  },
  {
    id: 'HOTEL-05',
    name: 'Jaz Mirabel Beach',
    city: 'Sharm El Sheikh',
    destination: 'Sharm El Sheikh',
    contractType: 'Supplier',
    stars: 5,
    contactPerson: 'Karim Zohdy (Sinai Brokers)',
    phone: '+20 69 371 0341',
    email: 'b2b@jazmirabel.com',
    address: 'Nabq Bay, Sharm El Sheikh',
    supplierId: 'SUP-02',
    status: 'Active',
    childPolicy: {
      infantMaxAge: 5,
      childMaxAge: 11,
      childRateMultiplier: 0.5,
      adultRateMultiplier: 1.0,
      rulesTextEn: 'All Inclusive concept applied for child supplements.',
      rulesTextAr: 'نظام الإقامة الشاملة مطبق على تسعير الأطفال.'
    },
    roomTypes: [
      { id: 'RT-09', name: 'Superior Pool View', baseCost: 2900, sellingRate: 3500, allotment: 12, bookedCount: 7 }
    ]
  }
];

export const initialContracts: HotelContract[] = [
  {
    id: 'CONT-2026-01',
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    startDate: '2026-05-01',
    endDate: '2026-11-30',
    roomType: 'Standard Room',
    roomRate: 2400,
    adultRate: 1200,
    childRate: 600,
    extraBedRate: 400,
    mealPlan: 'All Inclusive',
    allotment: 20,
    releasePeriodDays: 3,
    cancellationPolicy: 'Free cancellation up to 72 hours prior to check-in. 1 night penalty inside 72h.',
    status: 'Active'
  },
  {
    id: 'CONT-2026-02',
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    startDate: '2026-05-01',
    endDate: '2026-11-30',
    roomType: 'Sea View Room',
    roomRate: 3100,
    adultRate: 1550,
    childRate: 775,
    extraBedRate: 500,
    mealPlan: 'All Inclusive',
    allotment: 10,
    releasePeriodDays: 5,
    cancellationPolicy: 'Free cancellation up to 5 days before arrival.',
    status: 'Active'
  },
  {
    id: 'CONT-2026-03',
    hotelId: 'HOTEL-02',
    hotelName: 'Steigenberger Resort Ras Soma',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    roomType: 'Deluxe Garden Room',
    roomRate: 3800,
    adultRate: 1900,
    childRate: 950,
    extraBedRate: 600,
    mealPlan: 'Ultra All Inclusive',
    allotment: 15,
    releasePeriodDays: 7,
    cancellationPolicy: 'Free cancellation up to 7 days before arrival.',
    status: 'Active'
  },
  {
    id: 'CONT-2026-04',
    hotelId: 'HOTEL-03',
    hotelName: 'Sunrise Royal Makadi Resort',
    startDate: '2026-04-01',
    endDate: '2026-10-31',
    roomType: 'Aqua Park Standard',
    roomRate: 2800,
    adultRate: 1400,
    childRate: 700,
    extraBedRate: 450,
    mealPlan: 'All Inclusive',
    allotment: 18,
    releasePeriodDays: 4,
    cancellationPolicy: 'Free cancellation up to 4 days before arrival.',
    status: 'Active'
  }
];

export const initialRoomInventory: RoomInventoryDate[] = [
  {
    date: '2026-10-15',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-01',
    roomTypeName: 'Standard Room',
    totalRooms: 20,
    bookedRooms: 13,
    availableRooms: 7
  },
  {
    date: '2026-10-15',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-02',
    roomTypeName: 'Sea View Room',
    totalRooms: 10,
    bookedRooms: 7,
    availableRooms: 3
  },
  {
    date: '2026-10-16',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-01',
    roomTypeName: 'Standard Room',
    totalRooms: 20,
    bookedRooms: 14,
    availableRooms: 6
  },
  {
    date: '2026-10-16',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-02',
    roomTypeName: 'Sea View Room',
    totalRooms: 10,
    bookedRooms: 8,
    availableRooms: 2
  },
  {
    date: '2026-10-17',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-01',
    roomTypeName: 'Standard Room',
    totalRooms: 20,
    bookedRooms: 12,
    availableRooms: 8
  },
  {
    date: '2026-10-17',
    hotelId: 'HOTEL-01',
    roomTypeId: 'RT-02',
    roomTypeName: 'Sea View Room',
    totalRooms: 10,
    bookedRooms: 6,
    availableRooms: 4
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: 'SUP-01',
    name: 'XYZ Tourism & Hotel Brokers',
    type: 'Hotel Broker',
    contactPerson: 'Khaled Soliman',
    phone: '+20 2 2275 8899',
    whatsapp: '01004455661',
    email: 'b2b@xyztourism.com',
    services: ['Red Sea Room Allotment', 'Luxor Nile Cruisers', 'Last-minute Blocks'],
    outstandingAmount: 18400,
    bookingsCount: 14,
    rating: 4.8
  },
  {
    id: 'SUP-02',
    name: 'Sinai B2B Travel Services',
    type: 'Tourism Company',
    contactPerson: 'Walid Mansi',
    phone: '+20 69 366 1200',
    whatsapp: '01229988771',
    email: 'partners@sinaib2b.com',
    services: ['Sharm & Dahab Excursions', 'Safari Quad Biking', 'Ras Mohamed Boats'],
    outstandingAmount: 12500,
    bookingsCount: 9,
    rating: 4.6
  },
  {
    id: 'SUP-03',
    name: 'Nile Express Logistics',
    type: 'External Transportation',
    contactPerson: 'Adel Fawzy',
    phone: '+20 2 3344 7788',
    whatsapp: '01112233990',
    email: 'charters@nileexpress.com',
    services: ['Overflow Coach Rental', 'HiAce Minivans', 'Limousine Transfers'],
    outstandingAmount: 8200,
    bookingsCount: 6,
    rating: 4.5
  }
];

export const initialSupplierRequests: SupplierAvailabilityRequest[] = [
  {
    id: 'SAR-301',
    hotelName: 'Coral Resort Hurghada (Overflow)',
    destination: 'Hurghada',
    supplierId: 'SUP-01',
    supplierName: 'XYZ Tourism & Hotel Brokers',
    checkIn: '2026-10-15',
    checkOut: '2026-10-18',
    roomsCount: 2,
    adultsCount: 4,
    childrenCount: 2,
    roomType: 'Standard Room',
    status: 'Available',
    supplierQuote: 4800,
    validUntil: '6:00 PM Today',
    notes: 'Direct allotment confirmed for 3 nights. Voucher code XYZ-9988.',
    createdAt: '2026-10-05 09:30'
  },
  {
    id: 'SAR-302',
    hotelName: 'Jaz Mirabel Beach Sharm',
    destination: 'Sharm El Sheikh',
    supplierId: 'SUP-02',
    supplierName: 'Sinai B2B Travel Services',
    checkIn: '2026-10-22',
    checkOut: '2026-10-25',
    roomsCount: 3,
    adultsCount: 6,
    childrenCount: 0,
    roomType: 'Superior Pool View',
    status: 'Waiting Supplier',
    validUntil: 'Pending Response',
    notes: 'Requested confirmation of side-by-side rooms.',
    createdAt: '2026-10-05 10:45'
  }
];

export const initialBuses: Bus[] = [
  {
    id: 'BUS-07',
    plateNumber: 'ط ر ج ٥٨١٩ (TRG-5819)',
    busType: 'High-Deck Luxury Coach',
    brand: 'Mercedes-Benz Travego',
    capacity: 50,
    year: 2023,
    driverId: 'DRV-01',
    driverName: 'Mohamed Ali',
    status: 'Assigned',
    currentTripId: 'TRIP-1008',
    mileageKm: 142800,
    fixedMonthlyCosts: {
      insurance: 10000,
      licensing: 3000,
      maintenance: 15000,
      depreciation: 40000,
      tiresSpareParts: 6000
    },
    totalMonthlyTripsAverage: 20,
    allocatedFixedCostPerTrip: 3400,
    assignedRoute: 'Alexandria → Hurghada',
    lastMaintenanceDate: '2026-09-28'
  },
  {
    id: 'BUS-12',
    plateNumber: 'س ف ق ٤١٩٢ (SFQ-4192)',
    busType: 'Long-Haul Luxury Coach',
    brand: 'Volvo 9700',
    capacity: 48,
    year: 2022,
    driverId: 'DRV-02',
    driverName: 'Ahmed Said',
    status: 'Available',
    mileageKm: 185400,
    fixedMonthlyCosts: {
      insurance: 9500,
      licensing: 3000,
      maintenance: 14000,
      depreciation: 38000,
      tiresSpareParts: 5500
    },
    totalMonthlyTripsAverage: 20,
    allocatedFixedCostPerTrip: 3500,
    assignedRoute: 'Cairo → Sharm El Sheikh',
    lastMaintenanceDate: '2026-09-25'
  },
  {
    id: 'BUS-15',
    plateNumber: 'ب ر هـ ٧٦٣٤ (BRH-7634)',
    busType: 'Tourism Coach',
    brand: 'Mercedes MCV 600',
    capacity: 50,
    year: 2024,
    driverId: 'DRV-03',
    driverName: 'Tarek Mahmoud',
    status: 'Available',
    mileageKm: 62100,
    fixedMonthlyCosts: {
      insurance: 12000,
      licensing: 3200,
      maintenance: 12000,
      depreciation: 45000,
      tiresSpareParts: 5000
    },
    totalMonthlyTripsAverage: 22,
    allocatedFixedCostPerTrip: 3500,
    assignedRoute: 'Cairo → Marsa Alam',
    lastMaintenanceDate: '2026-10-02'
  },
  {
    id: 'BUS-04',
    plateNumber: 'م ن ل ٩٢١٥ (MNL-9215)',
    busType: 'Executive Minibus',
    brand: 'Toyota Coaster',
    capacity: 22,
    year: 2023,
    driverId: 'DRV-04',
    driverName: 'Ibrahim Hassan',
    status: 'Available',
    mileageKm: 89000,
    fixedMonthlyCosts: {
      insurance: 5000,
      licensing: 1800,
      maintenance: 6000,
      depreciation: 18000,
      tiresSpareParts: 2200
    },
    totalMonthlyTripsAverage: 18,
    allocatedFixedCostPerTrip: 1800,
    assignedRoute: 'Cairo City Tours & Transfers',
    lastMaintenanceDate: '2026-09-18'
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'DRV-01',
    name: 'Mohamed Ali',
    phone: '01001234567',
    licenseNumber: 'EGY-LIC-77412 (First Degree)',
    licenseExpiry: '2028-06-15',
    assignedBusId: 'BUS-07',
    status: 'Available',
    tripsCount: 142,
    rating: 4.9
  },
  {
    id: 'DRV-02',
    name: 'Ahmed Said',
    phone: '01119876543',
    licenseNumber: 'EGY-LIC-65123 (First Degree)',
    licenseExpiry: '2027-11-20',
    assignedBusId: 'BUS-12',
    status: 'Available',
    tripsCount: 118,
    rating: 4.8
  },
  {
    id: 'DRV-03',
    name: 'Tarek Mahmoud',
    phone: '01224567812',
    licenseNumber: 'EGY-LIC-88931 (First Degree)',
    licenseExpiry: '2029-01-10',
    assignedBusId: 'BUS-15',
    status: 'Available',
    tripsCount: 96,
    rating: 4.7
  },
  {
    id: 'DRV-04',
    name: 'Ibrahim Hassan',
    phone: '01098761234',
    licenseNumber: 'EGY-LIC-54129 (First Degree)',
    licenseExpiry: '2027-04-18',
    assignedBusId: 'BUS-04',
    status: 'Available',
    tripsCount: 160,
    rating: 4.9
  }
];

export const initialTrips: Trip[] = [
  {
    id: 'TRIP-1008',
    route: 'Alexandria → Hurghada',
    originCity: 'Alexandria (Sidi Gaber)',
    destinationCity: 'Hurghada',
    departureDate: '2026-10-15',
    departureTime: '11:00 PM',
    returnDate: '2026-10-18',
    busId: 'BUS-07',
    busPlate: 'ط ر ج ٥٨١٩ (TRG-5819)',
    driverId: 'DRV-01',
    driverName: 'Mohamed Ali',
    capacity: 50,
    bookedSeats: 38,
    availableSeats: 12,
    status: 'Ready',
    costing: {
      tripRevenue: 24000,
      fuelCost: 6000,
      driverAllowance: 1000,
      secondDriverAllowance: 800,
      tollsCost: 600,
      parkingCost: 300,
      maintenanceAllocation: 700,
      allocatedBusFixedCost: 3400,
      totalTripCost: 9400,
      netTripProfit: 14600
    },
    passengerManifest: [
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
      }
    ]
  },
  {
    id: 'TRIP-1009',
    route: 'Cairo → Sharm El Sheikh',
    originCity: 'Cairo (Ramses & Heliopolis)',
    destinationCity: 'Sharm El Sheikh',
    departureDate: '2026-10-18',
    departureTime: '01:00 AM',
    returnDate: '2026-10-21',
    busId: 'BUS-12',
    busPlate: 'س ف ق ٤١٩٢',
    driverId: 'DRV-02',
    driverName: 'Ahmed Said',
    capacity: 48,
    bookedSeats: 26,
    availableSeats: 22,
    status: 'Open',
    costing: {
      tripRevenue: 21600,
      fuelCost: 5500,
      driverAllowance: 1000,
      secondDriverAllowance: 800,
      tollsCost: 750,
      parkingCost: 250,
      maintenanceAllocation: 700,
      allocatedBusFixedCost: 3500,
      totalTripCost: 9000,
      netTripProfit: 12600
    },
    passengerManifest: []
  },
  {
    id: 'TRIP-1010',
    route: 'Cairo → Marsa Alam',
    originCity: 'Cairo (Al-Abbaseya)',
    destinationCity: 'Marsa Alam',
    departureDate: '2026-10-25',
    departureTime: '10:00 PM',
    returnDate: '2026-10-29',
    busId: 'BUS-15',
    busPlate: 'ب ر هـ ٧٦٣٤',
    driverId: 'DRV-03',
    driverName: 'Tarek Mahmoud',
    capacity: 50,
    bookedSeats: 18,
    availableSeats: 32,
    status: 'Planning',
    costing: {
      tripRevenue: 28000,
      fuelCost: 7800,
      driverAllowance: 1200,
      secondDriverAllowance: 1000,
      tollsCost: 800,
      parkingCost: 300,
      maintenanceAllocation: 800,
      allocatedBusFixedCost: 3500,
      totalTripCost: 11900,
      netTripProfit: 16100
    },
    passengerManifest: []
  }
];

export const initialQuotations: Quotation[] = [
  {
    id: 'QUOT-901',
    leadId: 'LEAD-001',
    customerId: 'CUST-101',
    customerName: 'Ahmed Hassan',
    destination: 'Hurghada',
    travelStartDate: '2026-10-15',
    travelEndDate: '2026-10-18',
    adults: 2,
    children: 2,
    childrenDetails: [
      { id: 'CH-1', name: 'Omar Hassan', age: 7, category: 'Child (50%)' },
      { id: 'CH-2', name: 'Mariam Hassan', age: 4, category: 'Infant (Free)' }
    ],
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    roomType: 'Standard Room',
    numberOfRooms: 2,
    numberOfNights: 3,
    components: [
      {
        id: 'QC-1',
        type: 'Hotel',
        description: 'Coral Resort - 2 Standard Rooms × 3 Nights (All Inclusive)',
        cost: 14400,
        markup: 2800,
        sellingPrice: 17200,
        quantity: 6,
        unit: 'Room Nights'
      },
      {
        id: 'QC-2',
        type: 'Transportation',
        description: 'Roundtrip Bus Alexandria → Hurghada (Company Bus BUS-07, 4 seats reserved)',
        cost: 2400,
        markup: 800,
        sellingPrice: 3200,
        quantity: 4,
        unit: 'Seats'
      },
      {
        id: 'QC-3',
        type: 'Meals',
        description: 'Full All-Inclusive F&B Supplement + Beach Club Pass',
        cost: 1200,
        markup: 600,
        sellingPrice: 1800,
        quantity: 4,
        unit: 'Persons'
      },
      {
        id: 'QC-4',
        type: 'Tour',
        description: 'Giftun Island Speedboat & Snorkeling Excursion (Child 4y Free, 7y 50%)',
        cost: 2000,
        markup: 800,
        sellingPrice: 2800,
        quantity: 1,
        unit: 'Family Package'
      },
      {
        id: 'QC-5',
        type: 'Extra Bed',
        description: 'Rollaway extra bed in Room 102 for Child Omar (7 years)',
        cost: 600,
        markup: 400,
        sellingPrice: 1000,
        quantity: 1,
        unit: 'Stay'
      },
      {
        id: 'QC-6',
        type: 'Other',
        description: 'Tourism Insurance & Local Hurghada Rep Concierge',
        cost: 2000,
        markup: 2000,
        sellingPrice: 4000,
        quantity: 1,
        unit: 'Package'
      }
    ],
    subtotalCost: 22600,
    markupAmount: 7400,
    customerPrice: 30000,
    marginPercent: 24.6,
    profit: 7400,
    status: 'Approved',
    createdAt: '2026-10-05 12:30',
    validUntil: '2026-10-10',
    notes: 'Quotation created following FB chat with customer. 30,000 EGP agreed upon. Ready to convert.',
    convertedBookingId: 'TR-2044'
  },
  {
    id: 'QUOT-902',
    leadId: 'LEAD-002',
    customerId: 'CUST-102',
    customerName: 'Sara Mansour',
    destination: 'Sharm El Sheikh',
    travelStartDate: '2026-10-20',
    travelEndDate: '2026-10-24',
    adults: 3,
    children: 0,
    childrenDetails: [],
    hotelId: 'HOTEL-05',
    hotelName: 'Jaz Mirabel Beach',
    roomType: 'Superior Pool View',
    numberOfRooms: 1,
    numberOfNights: 4,
    components: [
      {
        id: 'QC-21',
        type: 'Hotel',
        description: '1 Triple Room x 4 Nights (All Inclusive)',
        cost: 11600,
        markup: 2400,
        sellingPrice: 14000,
        quantity: 4,
        unit: 'Room Nights'
      },
      {
        id: 'QC-22',
        type: 'Transportation',
        description: 'Cairo - Sharm return coach',
        cost: 1800,
        markup: 600,
        sellingPrice: 2400,
        quantity: 3,
        unit: 'Seats'
      }
    ],
    subtotalCost: 13400,
    markupAmount: 3000,
    customerPrice: 16400,
    marginPercent: 18.2,
    profit: 3000,
    status: 'Sent',
    createdAt: '2026-10-04 15:20',
    validUntil: '2026-10-08',
    notes: 'Awaiting customer response on WhatsApp.'
  },
  {
    id: 'QUOT-903',
    leadId: 'LEAD-003',
    customerId: 'CUST-103',
    customerName: 'Tamer Zaki',
    destination: 'Aswan',
    travelStartDate: '2026-11-05',
    travelEndDate: '2026-11-09',
    adults: 2,
    children: 0,
    childrenDetails: [],
    hotelId: 'HOTEL-04',
    hotelName: 'Mövenpick Resort Aswan',
    roomType: 'Nile View Classic',
    numberOfRooms: 1,
    numberOfNights: 4,
    components: [
      {
        id: 'QC-31',
        type: 'Hotel',
        description: 'Nile View room with breakfast',
        cost: 14000,
        markup: 3000,
        sellingPrice: 17000,
        quantity: 4,
        unit: 'Nights'
      }
    ],
    subtotalCost: 14000,
    markupAmount: 3000,
    customerPrice: 17000,
    marginPercent: 17.6,
    profit: 3000,
    status: 'Approved',
    createdAt: '2026-10-03 11:10',
    validUntil: '2026-10-12',
    notes: 'High season booking.'
  },
  {
    id: 'QUOT-904',
    leadId: 'LEAD-004',
    customerId: 'CUST-104',
    customerName: 'Rania Fathy',
    destination: 'Hurghada',
    travelStartDate: '2026-10-25',
    travelEndDate: '2026-10-28',
    adults: 2,
    children: 1,
    childrenDetails: [{ id: 'CH-4', name: 'Ziad Hassan', age: 8, category: 'Child (50%)' }],
    hotelId: 'HOTEL-03',
    hotelName: 'Sunrise Royal Makadi',
    roomType: 'Aqua Park Standard',
    numberOfRooms: 1,
    numberOfNights: 3,
    components: [
      {
        id: 'QC-41',
        type: 'Hotel',
        description: 'Aqua Park Standard x 3 Nights',
        cost: 8400,
        markup: 2000,
        sellingPrice: 10400,
        quantity: 3,
        unit: 'Nights'
      }
    ],
    subtotalCost: 8400,
    markupAmount: 2000,
    customerPrice: 10400,
    marginPercent: 19.2,
    profit: 2000,
    status: 'Draft',
    createdAt: '2026-10-05 08:30',
    validUntil: '2026-10-11',
    notes: 'Drafting alternative dates for October break.'
  },
  {
    id: 'QUOT-905',
    leadId: 'LEAD-005',
    customerId: 'CUST-105',
    customerName: 'Youssef Nabil',
    destination: 'Hurghada',
    travelStartDate: '2026-11-12',
    travelEndDate: '2026-11-15',
    adults: 4,
    children: 0,
    childrenDetails: [],
    hotelId: 'HOTEL-02',
    hotelName: 'Steigenberger Resort Ras Soma',
    roomType: 'Deluxe Garden Room',
    numberOfRooms: 2,
    numberOfNights: 3,
    components: [
      {
        id: 'QC-51',
        type: 'Hotel',
        description: '2 Deluxe Rooms x 3 Nights Ultra AI',
        cost: 22800,
        markup: 4200,
        sellingPrice: 27000,
        quantity: 6,
        unit: 'Room Nights'
      }
    ],
    subtotalCost: 22800,
    markupAmount: 4200,
    customerPrice: 27000,
    marginPercent: 15.5,
    profit: 4200,
    status: 'Draft',
    createdAt: '2026-10-05 10:15',
    validUntil: '2026-10-15',
    notes: 'Corporate leisure group inquiry.'
  },
  {
    id: 'QUOT-906',
    leadId: 'LEAD-006',
    customerId: 'CUST-106',
    customerName: 'Mahmoud El-Sayed',
    destination: 'Hurghada',
    travelStartDate: '2026-10-15',
    travelEndDate: '2026-10-18',
    adults: 2,
    children: 1,
    childrenDetails: [{ id: 'CH-6', name: 'Nour El-Sayed', age: 9, category: 'Child (50%)' }],
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    roomType: 'Sea View Room',
    numberOfRooms: 1,
    numberOfNights: 3,
    components: [
      {
        id: 'QC-61',
        type: 'Hotel',
        description: 'Sea View Room 3 Nights',
        cost: 9300,
        markup: 2200,
        sellingPrice: 11500,
        quantity: 3,
        unit: 'Room Nights'
      }
    ],
    subtotalCost: 9300,
    markupAmount: 2200,
    customerPrice: 11500,
    marginPercent: 19.1,
    profit: 2200,
    status: 'Approved',
    createdAt: '2026-10-02 14:00',
    validUntil: '2026-10-09',
    notes: 'Confirmed and paid deposit.'
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'TR-2044',
    quotationId: 'QUOT-901',
    customerId: 'CUST-101',
    customerName: 'Ahmed Hassan',
    customerPhone: '01012345678',
    destination: 'Hurghada',
    travelStartDate: '2026-10-15',
    travelEndDate: '2026-10-18',
    adultsCount: 2,
    childrenCount: 2,
    childrenDetails: [
      { id: 'CH-1', name: 'Omar Hassan', age: 7, category: 'Child (50%)' },
      { id: 'CH-2', name: 'Mariam Hassan', age: 4, category: 'Infant (Free)' }
    ],
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    roomType: 'Standard Room',
    numberOfRooms: 2,
    transportationType: 'Company Bus',
    tripId: 'TRIP-1008',
    busId: 'BUS-07',
    driverId: 'DRV-01',
    driverName: 'Mohamed Ali',
    totalPrice: 30000,
    paidAmount: 10000,
    remainingAmount: 20000,
    status: 'Deposit Paid',
    assignedAgent: 'Omar Farouk',
    voucherNumber: 'VCH-HRG-2044',
    createdAt: '2026-10-05 13:40',
    operationsProgress: 75,
    operationsChecklist: {
      hotelConfirmed: true,
      roomsConfirmed: true,
      paymentChecked: true,
      busAssigned: true,
      driverAssigned: true,
      passengerListCompleted: true,
      roomingListCompleted: true,
      voucherSent: false,
      customerContacted: true,
      readyForTravel: false
    },
    costs: {
      hotelCost: 18000,
      transportCost: 4000,
      guideCost: 500,
      otherExpenses: 500,
      totalCost: 23000,
      grossProfit: 7000
    },
    passengers: [
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
        passengerName: 'Sara Hassan',
        phone: '01012345678',
        bookingId: 'TR-2044',
        hotelName: 'Coral Resort Hurghada',
        pickupPoint: 'Sidi Gaber Station - Alexandria',
        passengerType: 'Adult'
      },
      {
        id: 'PM-03',
        seatNumber: 3,
        passengerName: 'Omar Hassan',
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
        passengerName: 'Mariam Hassan',
        phone: '01012345678',
        bookingId: 'TR-2044',
        hotelName: 'Coral Resort Hurghada',
        pickupPoint: 'Sidi Gaber Station - Alexandria',
        passengerType: 'Child',
        childAge: 4
      }
    ],
    roomAssignments: [
      {
        roomNumber: 'Room 101',
        roomType: 'Standard King',
        guests: [
          { name: 'Ahmed Hassan', type: 'Adult' },
          { name: 'Sara Hassan', type: 'Adult' }
        ],
        specialRequests: 'Connected room to 102, high floor requested.'
      },
      {
        roomNumber: 'Room 102',
        roomType: 'Standard Twin with Extra Bed',
        guests: [
          { name: 'Omar Hassan', type: 'Child', age: 7 },
          { name: 'Mariam Hassan', type: 'Child', age: 4 }
        ],
        specialRequests: 'Extra bed requested for Omar (7y), crib for infant Mariam (4y).'
      }
    ]
  },
  {
    id: 'TR-2040',
    quotationId: 'QUOT-906',
    customerId: 'CUST-106',
    customerName: 'Mahmoud El-Sayed',
    customerPhone: '01088774433',
    destination: 'Hurghada',
    travelStartDate: '2026-10-15',
    travelEndDate: '2026-10-18',
    adultsCount: 2,
    childrenCount: 1,
    childrenDetails: [{ id: 'CH-6', name: 'Nour El-Sayed', age: 9, category: 'Child (50%)' }],
    hotelId: 'HOTEL-01',
    hotelName: 'Coral Resort Hurghada',
    roomType: 'Sea View Room',
    numberOfRooms: 1,
    transportationType: 'Company Bus',
    tripId: 'TRIP-1008',
    busId: 'BUS-07',
    driverId: 'DRV-01',
    driverName: 'Mohamed Ali',
    totalPrice: 15500,
    paidAmount: 15500,
    remainingAmount: 0,
    status: 'Ready for Travel',
    assignedAgent: 'Omar Farouk',
    voucherNumber: 'VCH-HRG-2040',
    createdAt: '2026-10-02 15:10',
    operationsProgress: 100,
    operationsChecklist: {
      hotelConfirmed: true,
      roomsConfirmed: true,
      paymentChecked: true,
      busAssigned: true,
      driverAssigned: true,
      passengerListCompleted: true,
      roomingListCompleted: true,
      voucherSent: true,
      customerContacted: true,
      readyForTravel: true
    },
    costs: {
      hotelCost: 9300,
      transportCost: 2000,
      guideCost: 400,
      otherExpenses: 300,
      totalCost: 12000,
      grossProfit: 3500
    },
    passengers: [],
    roomAssignments: []
  },
  {
    id: 'TR-2035',
    quotationId: 'QUOT-903',
    customerId: 'CUST-103',
    customerName: 'Tamer Zaki',
    customerPhone: '01145678901',
    destination: 'Aswan',
    travelStartDate: '2026-11-05',
    travelEndDate: '2026-11-09',
    adultsCount: 2,
    childrenCount: 0,
    childrenDetails: [],
    hotelId: 'HOTEL-04',
    hotelName: 'Mövenpick Resort Aswan',
    roomType: 'Nile View Classic',
    numberOfRooms: 1,
    transportationType: 'Self',
    totalPrice: 17000,
    paidAmount: 8500,
    remainingAmount: 8500,
    status: 'Deposit Paid',
    assignedAgent: 'Nour Khaled',
    voucherNumber: 'VCH-ASW-2035',
    createdAt: '2026-10-03 14:00',
    operationsProgress: 50,
    operationsChecklist: {
      hotelConfirmed: true,
      roomsConfirmed: true,
      paymentChecked: true,
      busAssigned: false,
      driverAssigned: false,
      passengerListCompleted: false,
      roomingListCompleted: true,
      voucherSent: false,
      customerContacted: true,
      readyForTravel: false
    },
    costs: {
      hotelCost: 14000,
      transportCost: 0,
      guideCost: 500,
      otherExpenses: 200,
      totalCost: 14700,
      grossProfit: 2300
    },
    passengers: [],
    roomAssignments: []
  },
  {
    id: 'TR-2029',
    quotationId: 'QUOT-902',
    customerId: 'CUST-102',
    customerName: 'Sara Mansour',
    customerPhone: '01223456789',
    destination: 'Sharm El Sheikh',
    travelStartDate: '2026-09-20',
    travelEndDate: '2026-09-24',
    adultsCount: 3,
    childrenCount: 0,
    childrenDetails: [],
    hotelId: 'HOTEL-05',
    hotelName: 'Jaz Mirabel Beach',
    roomType: 'Superior Pool View',
    numberOfRooms: 1,
    transportationType: 'Company Bus',
    totalPrice: 18500,
    paidAmount: 18500,
    remainingAmount: 0,
    status: 'Completed',
    assignedAgent: 'Karim Adel',
    voucherNumber: 'VCH-SSH-2029',
    createdAt: '2026-09-15 11:00',
    operationsProgress: 100,
    operationsChecklist: {
      hotelConfirmed: true,
      roomsConfirmed: true,
      paymentChecked: true,
      busAssigned: true,
      driverAssigned: true,
      passengerListCompleted: true,
      roomingListCompleted: true,
      voucherSent: true,
      customerContacted: true,
      readyForTravel: true
    },
    costs: {
      hotelCost: 11600,
      transportCost: 2400,
      guideCost: 400,
      otherExpenses: 400,
      totalCost: 14800,
      grossProfit: 3700
    },
    passengers: [],
    roomAssignments: []
  },
  {
    id: 'TR-2020',
    quotationId: 'QUOT-904',
    customerId: 'CUST-104',
    customerName: 'Rania Fathy',
    customerPhone: '01033221144',
    destination: 'Hurghada',
    travelStartDate: '2026-09-28',
    travelEndDate: '2026-10-01',
    adultsCount: 2,
    childrenCount: 1,
    childrenDetails: [],
    hotelId: 'HOTEL-03',
    hotelName: 'Sunrise Royal Makadi',
    roomType: 'Aqua Park Standard',
    numberOfRooms: 1,
    transportationType: 'Company Bus',
    totalPrice: 26000,
    paidAmount: 26000,
    remainingAmount: 0,
    status: 'Completed',
    assignedAgent: 'Omar Farouk',
    voucherNumber: 'VCH-HRG-2020',
    createdAt: '2026-09-22 10:15',
    operationsProgress: 100,
    operationsChecklist: {
      hotelConfirmed: true,
      roomsConfirmed: true,
      paymentChecked: true,
      busAssigned: true,
      driverAssigned: true,
      passengerListCompleted: true,
      roomingListCompleted: true,
      voucherSent: true,
      customerContacted: true,
      readyForTravel: true
    },
    costs: {
      hotelCost: 18500,
      transportCost: 2800,
      guideCost: 500,
      otherExpenses: 400,
      totalCost: 22200,
      grossProfit: 3800
    },
    passengers: [],
    roomAssignments: []
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'LEAD-001',
    customerName: 'Ahmed Hassan',
    phone: '01012345678',
    whatsapp: '01012345678',
    source: 'Facebook',
    campaign: 'Hurghada Autumn Break Promo',
    destination: 'Hurghada',
    travelDate: '2026-10-15',
    returnDate: '2026-10-18',
    adults: 2,
    children: 2,
    childrenDetails: [
      { id: 'CH-1', name: 'Omar Hassan', age: 7, category: 'Child (50%)' },
      { id: 'CH-2', name: 'Mariam Hassan', age: 4, category: 'Infant (Free)' }
    ],
    moderator: 'Sara Moderator',
    createdTime: '10:42 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Omar Farouk',
    status: 'Interested',
    notes: 'Customer commented on Facebook post asking for 4-day trip to Coral Resort with 2 kids. Needs bus pickup from Alexandria.',
    nextFollowUp: '2026-10-05 14:00',
    estimatedBudget: 30000,
    linkedQuotationId: 'QUOT-901',
    linkedBookingId: 'TR-2044',
    callHistory: [
      {
        id: 'CALL-1',
        timestamp: '2026-10-05 11:15 AM',
        agent: 'Omar Farouk',
        summary: 'Called customer. Clarified children ages (7 and 4). Confirmed Coral Resort preference and transportation with company bus.',
        duration: '4m 32s'
      }
    ],
    notesHistory: [
      {
        id: 'NOTE-1',
        timestamp: '2026-10-05 10:46 AM',
        author: 'Sara Moderator',
        text: 'Lead created from Facebook Messenger inbox. Assigned to Omar Farouk for prompt follow-up.'
      },
      {
        id: 'NOTE-2',
        timestamp: '2026-10-05 11:20 AM',
        author: 'Omar Farouk',
        text: 'Spoke with Mr. Ahmed. He is very interested in the All Inclusive package at Coral Resort. Preparing formal quotation now.'
      }
    ]
  },
  {
    id: 'LEAD-002',
    customerName: 'Sara Mansour',
    phone: '01223456789',
    whatsapp: '01223456789',
    source: 'Instagram',
    campaign: 'Sharm Diving & Beach',
    destination: 'Sharm El Sheikh',
    travelDate: '2026-10-20',
    adults: 3,
    children: 0,
    moderator: 'Sara Moderator',
    createdTime: '11:10 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Karim Adel',
    status: 'Quotation Sent',
    notes: 'Looking for Jaz Mirabel Sharm triple room. Quotation sent via WhatsApp.',
    nextFollowUp: '2026-10-06 12:00',
    estimatedBudget: 17000,
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-003',
    customerName: 'Mohamed Reda',
    phone: '01099881122',
    whatsapp: '01099881122',
    source: 'Messenger',
    campaign: 'Marsa Alam Eco Luxury',
    destination: 'Marsa Alam',
    travelDate: '2026-10-25',
    adults: 2,
    children: 0,
    moderator: 'Sara Moderator',
    createdTime: '09:15 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Nour Khaled',
    status: 'New',
    notes: 'Direct DM requesting romantic package with beach dinner.',
    nextFollowUp: '2026-10-05 15:30',
    estimatedBudget: 22000,
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-004',
    customerName: 'Heba Mostafa',
    phone: '01123499887',
    whatsapp: '01123499887',
    source: 'WhatsApp',
    campaign: 'Dahab Relax & Snorkel',
    destination: 'Dahab',
    travelDate: '2026-10-28',
    adults: 4,
    children: 1,
    moderator: 'Omar Moderator',
    createdTime: '01:20 PM',
    createdDate: '2026-10-04',
    assignedSalesAgent: 'Karim Adel',
    status: 'Contacted',
    notes: 'Inquired about Laguna Beach Club in Dahab and minivan charter.',
    nextFollowUp: '2026-10-06 10:00',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-005',
    customerName: 'Khaled El-Banna',
    phone: '01511229988',
    whatsapp: '01511229988',
    source: 'Website',
    campaign: 'Direct Organic Web Booking Inquiry',
    destination: 'Luxor',
    travelDate: '2026-11-01',
    adults: 2,
    children: 0,
    moderator: 'System Bot',
    createdTime: '03:40 PM',
    createdDate: '2026-10-04',
    assignedSalesAgent: 'Nour Khaled',
    status: 'Follow-up',
    notes: 'Comparing 4-star vs 5-star packages on Nile banks.',
    nextFollowUp: '2026-10-05 17:00',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-006',
    customerName: 'Eng. Sherif Fawzy',
    phone: '01007788991',
    whatsapp: '01007788991',
    source: 'Referral',
    campaign: 'Customer Referral (VIP)',
    destination: 'Hurghada',
    travelDate: '2026-10-15',
    adults: 2,
    children: 1,
    moderator: 'General Manager',
    createdTime: '08:00 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Omar Farouk',
    status: 'Confirmed',
    notes: 'Referred by Dr. Hazem. Booking Coral Resort standard sea view.',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-007',
    customerName: 'Amr El-Gohary',
    phone: '01211223344',
    whatsapp: '01211223344',
    source: 'Facebook',
    campaign: 'North Coast Weekend Flash',
    destination: 'North Coast',
    travelDate: '2026-10-12',
    adults: 5,
    children: 2,
    moderator: 'Sara Moderator',
    createdTime: '02:00 PM',
    createdDate: '2026-10-04',
    assignedSalesAgent: 'Karim Adel',
    status: 'Lost',
    notes: 'Client decided to postpone trip due to children school exams.',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-008',
    customerName: 'Mona Abdel-Aziz',
    phone: '01066554433',
    whatsapp: '01066554433',
    source: 'Instagram',
    campaign: 'Aswan Winter Warmth',
    destination: 'Aswan',
    travelDate: '2026-11-15',
    adults: 2,
    children: 0,
    moderator: 'Sara Moderator',
    createdTime: '04:15 PM',
    createdDate: '2026-10-04',
    assignedSalesAgent: 'Nour Khaled',
    status: 'Contacted',
    notes: 'Interested in Mövenpick Island resort. Checking train vs flight options.',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-009',
    customerName: 'Dr. Sameh Nassar',
    phone: '01199887766',
    whatsapp: '01199887766',
    source: 'Messenger',
    campaign: 'Hurghada Family Special',
    destination: 'Hurghada',
    travelDate: '2026-10-15',
    adults: 3,
    children: 2,
    moderator: 'Sara Moderator',
    createdTime: '09:50 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Omar Farouk',
    status: 'Interested',
    notes: 'Needs 2 connecting rooms at Steigenberger Ras Soma. Wants bus seats.',
    callHistory: [],
    notesHistory: []
  },
  {
    id: 'LEAD-010',
    customerName: 'Yasmine Badawy',
    phone: '01599882233',
    whatsapp: '01599882233',
    source: 'Website',
    campaign: 'Autumn Sunshine Offers',
    destination: 'Sharm El Sheikh',
    travelDate: '2026-10-22',
    adults: 2,
    children: 1,
    moderator: 'System Bot',
    createdTime: '11:45 AM',
    createdDate: '2026-10-05',
    assignedSalesAgent: 'Karim Adel',
    status: 'New',
    notes: 'Submitted quote request through website form. Awaiting callback.',
    callHistory: [],
    notesHistory: []
  }
];

export const initialPayments: PaymentRecord[] = [
  {
    id: 'PAY-801',
    bookingId: 'TR-2044',
    customerName: 'Ahmed Hassan',
    amount: 10000,
    method: 'Bank Transfer',
    paymentDate: '2026-10-05 13:15',
    receivedBy: 'Heba Accountant (CIB Bank)',
    reference: 'CIB-TX-9941829',
    notes: 'Deposit 10,000 EGP received for booking TR-2044. Remaining 20,000 EGP due by 10 October.',
    type: 'Deposit'
  },
  {
    id: 'PAY-802',
    bookingId: 'TR-2040',
    customerName: 'Mahmoud El-Sayed',
    amount: 15500,
    method: 'Wallet',
    paymentDate: '2026-10-02 16:30',
    receivedBy: 'Heba Accountant (Vodafone Cash)',
    reference: 'VF-CASH-771239',
    notes: 'Full payment received in advance for Hurghada trip.',
    type: 'Final Payment'
  },
  {
    id: 'PAY-803',
    bookingId: 'TR-2035',
    customerName: 'Tamer Zaki',
    amount: 8500,
    method: 'Card',
    paymentDate: '2026-10-03 14:20',
    receivedBy: 'Online Gateway (Paymob)',
    reference: 'PMOB-881923',
    notes: '50% deposit received for Mövenpick Aswan stay.',
    type: 'Deposit'
  },
  {
    id: 'PAY-804',
    bookingId: 'TR-2029',
    customerName: 'Sara Mansour',
    amount: 18500,
    method: 'Cash',
    paymentDate: '2026-09-16 12:00',
    receivedBy: 'Front Desk Cashier',
    reference: 'RCP-00921',
    notes: 'Full payment received at company office.',
    type: 'Final Payment'
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'TSK-101',
    title: 'Call Ahmed Hassan & confirm deposit receipt',
    type: 'Call Customer',
    relatedCustomerName: 'Ahmed Hassan',
    relatedBookingId: 'TR-2044',
    owner: 'Omar Farouk',
    dueDate: '2026-10-05',
    dueTime: '02:00 PM',
    priority: 'High',
    status: 'Completed'
  },
  {
    id: 'TSK-102',
    title: 'Send hotel voucher & rooming list to Coral Resort Hurghada',
    type: 'Confirm Hotel',
    relatedCustomerName: 'Ahmed Hassan',
    relatedBookingId: 'TR-2044',
    owner: 'Reservation Agent',
    dueDate: '2026-10-05',
    dueTime: '04:30 PM',
    priority: 'Urgent',
    status: 'Pending'
  },
  {
    id: 'TSK-103',
    title: 'Collect remaining payment (20,000 EGP) before 10 October',
    type: 'Collect Payment',
    relatedCustomerName: 'Ahmed Hassan',
    relatedBookingId: 'TR-2044',
    owner: 'Heba Accountant',
    dueDate: '2026-10-10',
    priority: 'High',
    status: 'Pending'
  },
  {
    id: 'TSK-104',
    title: 'Verify BUS-07 pre-trip safety checklist with driver Mohamed Ali',
    type: 'Assign Bus',
    relatedCustomerName: 'All TRIP-1008 Passengers',
    relatedBookingId: 'TR-2044',
    owner: 'Fleet Coordinator',
    dueDate: '2026-10-14',
    priority: 'Medium',
    status: 'Pending'
  },
  {
    id: 'TSK-105',
    title: 'Follow up with XYZ Broker regarding overflow rooms in Hurghada',
    type: 'Check Supplier',
    relatedCustomerName: 'Various Leads',
    owner: 'Reservation Agent',
    dueDate: '2026-10-05',
    dueTime: '06:00 PM',
    priority: 'Urgent',
    status: 'Pending'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'New Lead Assigned to You',
    message: 'Sara Moderator assigned Ahmed Hassan (Hurghada / 4 pax) to Omar Farouk.',
    type: 'lead',
    timestamp: '10:46 AM',
    read: false,
    linkModule: 'leads',
    linkId: 'LEAD-001'
  },
  {
    id: 'NOTIF-02',
    title: 'Deposit Received - 10,000 EGP',
    message: 'Ahmed Hassan transferred 10,000 EGP for booking TR-2044 via CIB Bank.',
    type: 'payment',
    timestamp: '01:15 PM',
    read: false,
    linkModule: 'payments',
    linkId: 'PAY-801'
  },
  {
    id: 'NOTIF-03',
    title: 'Supplier Availability Expiring at 6:00 PM',
    message: 'XYZ Tourism quote for Coral Resort (4,800 EGP/room) expires in a few hours.',
    type: 'supplier',
    timestamp: '02:00 PM',
    read: false,
    linkModule: 'availability'
  },
  {
    id: 'NOTIF-04',
    title: 'Hotel Rooms Running Low: Coral Resort',
    message: 'Sea View room allotment down to 3 rooms for 15 October.',
    type: 'hotel',
    timestamp: '08:30 AM',
    read: true,
    linkModule: 'availability'
  },
  {
    id: 'NOTIF-05',
    title: 'Trip Departure Notice',
    message: 'TRIP-1008 (Alexandria → Hurghada) departs in 10 days. 38/50 seats confirmed.',
    type: 'trip',
    timestamp: 'Yesterday',
    read: true,
    linkModule: 'trips',
    linkId: 'TRIP-1008'
  }
];

export const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-01',
    timestamp: '2026-10-05 10:42 AM',
    action: 'Lead Created',
    user: 'Sara Moderator',
    role: 'Moderator',
    entityType: 'Lead',
    entityId: 'LEAD-001',
    details: 'New Facebook lead created for customer Ahmed Hassan (Hurghada, 2 Adults, 2 Children).'
  },
  {
    id: 'AUD-02',
    timestamp: '2026-10-05 10:46 AM',
    action: 'Lead Assigned',
    user: 'Sara Moderator',
    role: 'Moderator',
    entityType: 'Lead',
    entityId: 'LEAD-001',
    details: 'Assigned lead LEAD-001 to Sales Agent Omar Farouk.'
  },
  {
    id: 'AUD-03',
    timestamp: '2026-10-05 11:15 AM',
    action: 'Customer Contacted',
    user: 'Omar Farouk',
    role: 'Sales Agent',
    entityType: 'Lead',
    entityId: 'LEAD-001',
    details: 'Phone call logged (4m 32s). Travel requirements confirmed; status changed to Interested.'
  },
  {
    id: 'AUD-04',
    timestamp: '2026-10-05 12:30 PM',
    action: 'Quotation Created',
    user: 'Omar Farouk',
    role: 'Sales Agent',
    entityType: 'Quotation',
    entityId: 'QUOT-901',
    details: 'Quotation built with Coral Resort Hurghada (2 rooms x 3 nights) + Company Bus + Child policy applied. Total: 30,000 EGP.'
  },
  {
    id: 'AUD-05',
    timestamp: '2026-10-05 02:00 PM',
    action: 'Quotation Approved',
    user: 'Omar Farouk',
    role: 'Sales Agent',
    entityType: 'Quotation',
    entityId: 'QUOT-901',
    details: 'Customer Ahmed Hassan approved quotation. Converted to Booking TR-2044.'
  },
  {
    id: 'AUD-06',
    timestamp: '2026-10-05 03:15 PM',
    action: 'Deposit Received',
    user: 'Heba Accountant',
    role: 'Accountant',
    entityType: 'Payment',
    entityId: 'PAY-801',
    details: 'Received 10,000 EGP deposit via CIB Bank. Remaining: 20,000 EGP.'
  },
  {
    id: 'AUD-07',
    timestamp: '2026-10-05 04:10 PM',
    action: 'Hotel Confirmed',
    user: 'Reservation Agent',
    role: 'Reservation Agent',
    entityType: 'Booking',
    entityId: 'TR-2044',
    details: 'Coral Resort confirmed 2 Standard Rooms for check-in 15 Oct to 18 Oct.'
  },
  {
    id: 'AUD-08',
    timestamp: '2026-10-05 04:25 PM',
    action: 'Bus & Driver Assigned',
    user: 'Fleet Coordinator',
    role: 'Fleet Coordinator',
    entityType: 'Trip',
    entityId: 'TRIP-1008',
    details: 'BUS-07 and driver Mohamed Ali assigned to Alexandria → Hurghada route. Seats 1, 2, 3, 4 assigned to Hassan family.'
  }
];

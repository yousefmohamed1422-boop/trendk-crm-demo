export type UserRole = 
  | 'admin'
  | 'moderator'
  | 'sales'
  | 'reservation'
  | 'operations'
  | 'accountant'
  | 'fleet'
  | 'manager';

export type Language = 'en' | 'ar';

export type LeadSource = 
  | 'Facebook'
  | 'Instagram'
  | 'Messenger'
  | 'WhatsApp'
  | 'Website'
  | 'Referral';

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Interested'
  | 'Quotation Sent'
  | 'Follow-up'
  | 'Confirmed'
  | 'Lost';

export type QuotationStatus = 
  | 'Draft'
  | 'Sent'
  | 'Approved'
  | 'Rejected'
  | 'Expired';

export type BookingStatus = 
  | 'Pending'
  | 'Deposit Paid'
  | 'Confirmed'
  | 'Ready for Travel'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type SupplierType = 
  | 'Hotel Broker'
  | 'Tourism Company'
  | 'External Transportation'
  | 'Tour Operator';

export type SupplierRequestStatus = 
  | 'Draft'
  | 'Sent'
  | 'Waiting Supplier'
  | 'Available'
  | 'Not Available'
  | 'Expired';

export type BusStatus = 
  | 'Available'
  | 'Assigned'
  | 'On Trip'
  | 'Maintenance'
  | 'Unavailable';

export type TripStatus = 
  | 'Planning'
  | 'Open'
  | 'Ready'
  | 'Departed'
  | 'Arrived'
  | 'Completed'
  | 'Cancelled';

export type PaymentMethod = 
  | 'Cash'
  | 'Bank Transfer'
  | 'Card'
  | 'Wallet';

export type TaskType = 
  | 'Call Customer'
  | 'Follow-up'
  | 'Confirm Hotel'
  | 'Collect Payment'
  | 'Check Supplier'
  | 'Assign Bus'
  | 'Send Voucher';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ChildGuest {
  id: string;
  name: string;
  age: number;
  category: 'Infant (Free)' | 'Child (50%)' | 'Adult (100%)';
}

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  source: LeadSource;
  campaign: string;
  destination: string;
  travelDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  childrenDetails?: ChildGuest[];
  moderator: string;
  createdTime: string;
  createdDate: string;
  assignedSalesAgent: string;
  status: LeadStatus;
  notes: string;
  nextFollowUp?: string;
  estimatedBudget?: number;
  linkedQuotationId?: string;
  linkedBookingId?: string;
  callHistory: {
    id: string;
    timestamp: string;
    agent: string;
    summary: string;
    duration: string;
  }[];
  notesHistory: {
    id: string;
    timestamp: string;
    author: string;
    text: string;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  passportNumber: string;
  nationality: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  totalBookings: number;
  totalSpent: number;
  createdDate: string;
  notes: string;
}

export interface RoomTypeRate {
  id: string;
  name: string;
  baseCost: number;
  sellingRate: number;
  allotment: number;
  bookedCount: number;
}

export interface HotelChildPolicy {
  infantMaxAge: number; // e.g. 5 -> 0-5 free
  childMaxAge: number;  // e.g. 11 -> 6-11 50%
  childRateMultiplier: number; // 0.5
  adultRateMultiplier: number; // 1.0
  rulesTextEn: string;
  rulesTextAr: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  destination: string;
  contractType: 'Direct' | 'Supplier';
  stars: number;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'Active' | 'Paused';
  roomTypes: RoomTypeRate[];
  childPolicy: HotelChildPolicy;
  supplierId?: string;
  address: string;
}

export interface HotelContract {
  id: string;
  hotelId: string;
  hotelName: string;
  startDate: string;
  endDate: string;
  roomType: string;
  roomRate: number;
  adultRate: number;
  childRate: number;
  extraBedRate: number;
  mealPlan: 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive' | 'Ultra All Inclusive';
  allotment: number;
  releasePeriodDays: number;
  cancellationPolicy: string;
  status: 'Active' | 'Expired';
}

export interface RoomInventoryDate {
  date: string;
  hotelId: string;
  roomTypeId: string;
  roomTypeName: string;
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
}

export interface SupplierAvailabilityRequest {
  id: string;
  hotelName: string;
  destination: string;
  supplierId: string;
  supplierName: string;
  checkIn: string;
  checkOut: string;
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  roomType: string;
  status: SupplierRequestStatus;
  supplierQuote?: number;
  validUntil?: string;
  notes?: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  type: SupplierType;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  services: string[];
  outstandingAmount: number;
  bookingsCount: number;
  rating: number;
}

export interface QuotationComponent {
  id: string;
  type: 'Hotel' | 'Transportation' | 'Extra Bed' | 'Meals' | 'Tour' | 'Other';
  description: string;
  cost: number;
  markup: number;
  sellingPrice: number;
  quantity: number;
  unit: string;
}

export interface Quotation {
  id: string;
  leadId?: string;
  customerId: string;
  customerName: string;
  destination: string;
  travelStartDate: string;
  travelEndDate: string;
  adults: number;
  children: number;
  childrenDetails: ChildGuest[];
  hotelId: string;
  hotelName: string;
  roomType: string;
  numberOfRooms: number;
  numberOfNights: number;
  components: QuotationComponent[];
  subtotalCost: number;
  markupAmount: number;
  customerPrice: number;
  marginPercent: number;
  profit: number;
  status: QuotationStatus;
  createdAt: string;
  validUntil: string;
  notes: string;
  convertedBookingId?: string;
}

export interface OperationsChecklist {
  hotelConfirmed: boolean;
  roomsConfirmed: boolean;
  paymentChecked: boolean;
  busAssigned: boolean;
  driverAssigned: boolean;
  passengerListCompleted: boolean;
  roomingListCompleted: boolean;
  voucherSent: boolean;
  customerContacted: boolean;
  readyForTravel: boolean;
}

export interface PassengerManifestItem {
  id: string;
  seatNumber: number;
  passengerName: string;
  phone: string;
  bookingId: string;
  hotelName: string;
  pickupPoint: string;
  passengerType: 'Adult' | 'Child';
  childAge?: number;
  nationalIdOrPassport?: string;
  notes?: string;
}

export interface RoomAssignment {
  roomNumber: string;
  roomType: string;
  guests: {
    name: string;
    type: 'Adult' | 'Child';
    age?: number;
  }[];
  specialRequests?: string;
}

export interface Booking {
  id: string; // e.g. TR-2044
  quotationId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  destination: string;
  travelStartDate: string;
  travelEndDate: string;
  adultsCount: number;
  childrenCount: number;
  childrenDetails: ChildGuest[];
  hotelId: string;
  hotelName: string;
  roomType: string;
  numberOfRooms: number;
  transportationType: 'Company Bus' | 'External' | 'Self';
  tripId?: string;
  busId?: string;
  driverId?: string;
  driverName?: string;
  totalPrice: number;
  paidAmount: number;
  remainingAmount: number;
  status: BookingStatus;
  operationsChecklist: OperationsChecklist;
  operationsProgress: number; // 0 - 100
  passengers: PassengerManifestItem[];
  roomAssignments: RoomAssignment[];
  costs: {
    hotelCost: number;
    transportCost: number;
    guideCost: number;
    otherExpenses: number;
    totalCost: number;
    grossProfit: number;
  };
  createdAt: string;
  assignedAgent: string;
  voucherNumber?: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  paymentDate: string;
  receivedBy: string;
  reference: string;
  notes: string;
  type: 'Deposit' | 'Installment' | 'Final Payment' | 'Refund';
}

export interface BusFixedCosts {
  insurance: number;
  licensing: number;
  maintenance: number;
  depreciation: number;
  tiresSpareParts: number;
}

export interface Bus {
  id: string; // e.g. BUS-07
  plateNumber: string;
  busType: string;
  brand: string;
  capacity: number;
  year: number;
  driverId?: string;
  driverName?: string;
  status: BusStatus;
  currentTripId?: string;
  mileageKm: number;
  fixedMonthlyCosts: BusFixedCosts;
  totalMonthlyTripsAverage: number;
  allocatedFixedCostPerTrip: number;
  assignedRoute?: string;
  lastMaintenanceDate: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  assignedBusId?: string;
  status: 'Available' | 'On Trip' | 'On Leave';
  tripsCount: number;
  rating: number;
}

export interface TripBusCosting {
  tripRevenue: number;
  fuelCost: number;
  driverAllowance: number;
  secondDriverAllowance: number;
  tollsCost: number;
  parkingCost: number;
  maintenanceAllocation: number;
  allocatedBusFixedCost: number;
  totalTripCost: number;
  netTripProfit: number;
}

export interface Trip {
  id: string; // e.g. TRIP-1008
  route: string; // Alexandria -> Hurghada
  originCity: string;
  destinationCity: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  busId: string;
  busPlate: string;
  driverId: string;
  driverName: string;
  capacity: number;
  bookedSeats: number;
  availableSeats: number;
  status: TripStatus;
  passengerManifest: PassengerManifestItem[];
  costing: TripBusCosting;
}

export interface TaskItem {
  id: string;
  title: string;
  type: TaskType;
  relatedCustomerName: string;
  relatedBookingId?: string;
  relatedLeadId?: string;
  owner: string;
  dueDate: string;
  dueTime?: string;
  priority: TaskPriority;
  status: 'Pending' | 'Completed' | 'Overdue';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'followup' | 'supplier' | 'payment' | 'hotel' | 'bus' | 'trip';
  timestamp: string;
  read: boolean;
  linkModule?: string;
  linkId?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: string;
  entityType: 'Lead' | 'Quotation' | 'Booking' | 'Payment' | 'Trip' | 'Hotel';
  entityId: string;
  details: string;
}

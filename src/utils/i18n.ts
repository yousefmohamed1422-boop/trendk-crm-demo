import { Language, UserRole } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & App
    appName: 'Trend Agency',
    appTagline: 'Tourism CRM & Operations ERP',
    currency: 'EGP',
    role: 'Role',
    language: 'Language',
    activeUser: 'Logged in as',
    
    // Roles
    role_admin: 'Admin',
    role_moderator: 'Moderator / Social Agent',
    role_sales: 'Sales Agent',
    role_reservation: 'Reservation Agent',
    role_operations: 'Operations Agent',
    role_accountant: 'Accountant',
    role_fleet: 'Fleet Coordinator',
    role_manager: 'General Manager',

    // Navigation Modules
    nav_dashboard: 'Dashboard',
    nav_crm: 'CRM',
    nav_leads: 'Social Media Leads',
    nav_pipeline: 'Sales Pipeline',
    nav_customers: 'Customers',
    nav_followups: 'Follow-ups & Tasks',
    nav_sales: 'Sales',
    nav_quotations: 'Quotations',
    nav_bookings: 'Bookings',
    nav_reservations: 'Reservations',
    nav_hotels: 'Hotels & Resorts',
    nav_contracts: 'Hotel Contracts',
    nav_availability: 'Room Availability',
    nav_suppliers: 'Suppliers & Brokers',
    nav_operations: 'Operations',
    nav_operations_board: 'Operations Board',
    nav_rooming_lists: 'Hotel Rooming Lists',
    nav_passenger_lists: 'Passenger Manifest',
    nav_transportation: 'Transportation',
    nav_trips: 'Bus Trips',
    nav_buses: 'Company Fleet',
    nav_drivers: 'Drivers',
    nav_bus_costing: 'Trip & Bus Costing',
    nav_finance: 'Finance & Accounts',
    nav_payments: 'Payments & Receipts',
    nav_expenses: 'Operating Costs',
    nav_receivables: 'Receivables & Alerts',
    nav_payables: 'Supplier Payables',
    nav_profitability: 'Profitability Analysis',
    nav_reports: 'Reports & Analytics',
    nav_settings: 'Administration',

    // Actions & Buttons
    addLead: '+ Add Lead',
    createQuotation: 'Create Quotation',
    createBooking: 'Convert to Booking',
    addPayment: 'Record Payment',
    addTrip: 'Schedule Trip',
    checkAvailability: 'Check Availability',
    filterAll: 'All',
    search: 'Search records...',
    exportList: 'Export PDF / Print',
    save: 'Save Changes',
    cancel: 'Cancel',
    confirm: 'Confirm',
    viewDetails: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
    callNow: 'Simulate Call',
    sendWhatsApp: 'Send WhatsApp',
    addNote: 'Add Note',
    scheduleFollowUp: 'Schedule Follow-up',
    assignAgent: 'Assign Sales Agent',
    quickAssign: 'Assign',
    markLost: 'Mark Lost',
    confirmBooking: 'Confirm Booking',
    close: 'Close',
    refresh: 'Refresh',

    // Statuses
    status_new: 'New',
    status_contacted: 'Contacted',
    status_interested: 'Interested',
    status_quotation_sent: 'Quotation Sent',
    status_followup: 'Follow-up',
    status_confirmed: 'Confirmed',
    status_lost: 'Lost',
    status_pending: 'Pending',
    status_deposit_paid: 'Deposit Paid',
    status_ready: 'Ready for Travel',
    status_in_progress: 'In Progress',
    status_completed: 'Completed',
    status_cancelled: 'Cancelled',
    status_available: 'Available',
    status_assigned: 'Assigned',
    status_on_trip: 'On Trip',
    status_maintenance: 'Maintenance',

    // Dashboard
    newLeadsToday: 'New Leads Today',
    leadsAwaitingFollowup: 'Awaiting Follow-up',
    quotationsSent: 'Quotations Sent',
    confirmedBookings: 'Confirmed Bookings',
    upcomingTrips: 'Upcoming Bus Trips',
    outstandingPayments: 'Outstanding Receivables',
    hotelAvailabilityAlerts: 'Availability Alerts',
    busesCurrentlyAssigned: 'Buses Assigned',
    monthlyRevenue: 'Monthly Revenue',
    monthlyExpenses: 'Operating Expenses',
    grossProfit: 'Gross Profit',
    todaysTasks: "Today's Operational Tasks",
    recentActivityTimeline: 'Recent Activity & Audit Trail',

    // Table Headers
    id: 'ID',
    customer: 'Customer',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    source: 'Source',
    campaign: 'Campaign',
    destination: 'Destination',
    travelDate: 'Travel Date',
    travelers: 'Travelers',
    adults: 'Adults',
    children: 'Children',
    moderator: 'Moderator',
    salesAgent: 'Sales Agent',
    status: 'Status',
    actions: 'Actions',
    total: 'Total',
    paid: 'Paid',
    remaining: 'Remaining',
    hotel: 'Hotel & Resort',
    bus: 'Assigned Bus',
    driver: 'Driver',
    progress: 'Operations',
    room: 'Room Type',
    nights: 'Nights',
    rate: 'Rate',

    // Extra module titles & tabs
    tab_overview: 'Overview & Requirements',
    tab_calls: 'Call History',
    tab_whatsapp: 'WhatsApp Activity',
    tab_notes: 'Timeline Notes',
    tab_bookings: 'Bookings',
    tab_payments: 'Payments',
    tab_activity: 'Operational Timeline',
    tab_documents: 'Vouchers & Documents',
    tab_rooms: 'Room Types & Rates',
    tab_childPolicy: 'Child Policy Rules',
    tab_contracts: 'Direct Contracts',
    tab_fixedCosts: 'Fixed Asset Costs',
    tab_trips: 'Scheduled Trips',
    tab_maintenance: 'Maintenance History',
    tab_checklist: 'Operations Checklist',
    tab_passengers: 'Bus Seats & Manifest',
    tab_rooming: 'Hotel Rooming List',
    tab_finance: 'Profitability & P&L',

    // Buttons & Labels
    btn_new_lead: '+ Add Lead',
    btn_create_quotation: 'Create Quotation',
    btn_convert_booking: 'Convert to Booking',
    btn_record_payment: 'Record Payment',
    btn_print_voucher: 'Print Voucher',
    btn_export_pdf: 'Export PDF',
    btn_mark_interested: 'Mark Interested',
    btn_mark_lost: 'Mark Lost',
    btn_confirm_booking: 'Confirm Booking',
    btn_simulate_call: 'Simulate Call',
    btn_save_call: 'Save Call Log',
    btn_add_note: 'Add Note',
    btn_seat_map: 'Seat Map & Manifest',
    btn_check_availability: 'Check Availability',
    btn_new_req: '+ New Availability Request',
    btn_create_task: '+ Create Task',
    btn_open_details: 'View Details',
    all_statuses: 'All Statuses',
    all_sources: 'All Sources',
    all_hotels: 'All Hotels',
    all_types: 'All Types',
  },
  ar: {
    // Brand & App
    appName: 'تريند إيجنسي (Trend Agency)',
    appTagline: 'نظام إدارة حجوزات وعمليات وأسطول السياحة المتكامل',
    currency: 'ج.م',
    role: 'الدور الوظيفي',
    language: 'اللغة',
    activeUser: 'المستخدم الحالي',

    // Roles
    role_admin: 'المدير العام (Admin)',
    role_moderator: 'مسؤول الميديا (Moderator)',
    role_sales: 'مسؤول المبيعات (Sales)',
    role_reservation: 'مسؤول الحجوزات والفنادق',
    role_operations: 'مسؤول العمليات والرحلات',
    role_accountant: 'المحاسب المالي',
    role_fleet: 'منسق الأسطول والنقل',
    role_manager: 'مدير العمليات والتشغيل',

    // Navigation Modules
    nav_dashboard: 'لوحة التحكم والمؤشرات',
    nav_crm: 'إدارة العملاء والمبيعات (CRM)',
    nav_leads: 'عملاء السوشيال ميديا',
    nav_pipeline: 'مراحل البيع (Kanban)',
    nav_customers: 'سجل العملاء',
    nav_followups: 'المتابعات والمهام اليومية',
    nav_sales: 'المبيعات والعروض',
    nav_quotations: 'عروض الأسعار',
    nav_bookings: 'الحجوزات المؤكدة',
    nav_reservations: 'إدارة الفنادق والغرف',
    nav_hotels: 'قائمة الفنادق والمنتجعات',
    nav_contracts: 'عقود الفنادق المباشرة',
    nav_availability: 'مخزون وإتاحة الغرف',
    nav_suppliers: 'الموردين والبروكرز',
    nav_operations: 'التشغيل والعمليات',
    nav_operations_board: 'لوحة جاهزية العمليات',
    nav_rooming_lists: 'قوائم تسكين الغرف (Rooming)',
    nav_passenger_lists: 'مانيفست الركاب وتوزيع المقاعد',
    nav_transportation: 'الأسطول والنقل',
    nav_trips: 'رحلات الأتوبيسات',
    nav_buses: 'أسطول الشركة المملوك',
    nav_drivers: 'سائقي الأسطول',
    nav_bus_costing: 'تكاليف وتشغيل الرحلات',
    nav_finance: 'الحسابات والمالية',
    nav_payments: 'المدفوعات والإيصالات',
    nav_expenses: 'المصروفات التشغيلية',
    nav_receivables: 'المستحقات والتنبيهات',
    nav_payables: 'مستحقات الموردين',
    nav_profitability: 'أرباح الحجوزات والرحلات',
    nav_reports: 'التقارير والإحصاءات',
    nav_settings: 'إعدادات النظام والمستخدمين',

    // Actions & Buttons
    addLead: '+ إضافة ليد جديد',
    createQuotation: 'إنشاء عرض سعر',
    createBooking: 'تحويل إلى حجز',
    addPayment: 'تسجيل دفعة / سند قبض',
    addTrip: 'جدولة رحلة جديدة',
    checkAvailability: 'طلب فحص إتاحة',
    filterAll: 'الكل',
    search: 'بحث في السجلات...',
    exportList: 'طباعة وتصدير PDF',
    save: 'حفظ التعديلات',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    viewDetails: 'عرض التفاصيل',
    edit: 'تعديل',
    delete: 'حذف',
    callNow: 'محاكاة اتصال هاتفي',
    sendWhatsApp: 'مراسلة واتساب',
    addNote: 'إضافة ملاحظة',
    scheduleFollowUp: 'جدولة موعد متابعة',
    assignAgent: 'إسناد لمسؤول مبيعات',
    quickAssign: 'إسناد',
    markLost: 'تسجيل كـ خاسر (Lost)',
    confirmBooking: 'تأكيد الحجز النهائي',
    close: 'إغلاق',
    refresh: 'تحديث البيانات',

    // Statuses
    status_new: 'جديد',
    status_contacted: 'تم التواصل',
    status_interested: 'مهتم',
    status_quotation_sent: 'أُرسل عرض سعر',
    status_followup: 'متابعة لاحقة',
    status_confirmed: 'مؤكد',
    status_lost: 'مفقود',
    status_pending: 'قيد الانتظار',
    status_deposit_paid: 'تم سداد العربون',
    status_ready: 'جاهز للسفر',
    status_in_progress: 'الرحلة جارية',
    status_completed: 'مكتملة ومقفلة',
    status_cancelled: 'ملغي',
    status_available: 'متاح للتشغيل',
    status_assigned: 'معين لرحلة',
    status_on_trip: 'على الطريق',
    status_maintenance: 'في الصيانة',

    // Dashboard
    newLeadsToday: 'عملاء محتملين جدد اليوم',
    leadsAwaitingFollowup: 'بانتظار المتابعة العاجلة',
    quotationsSent: 'عروض أسعار مرسلة',
    confirmedBookings: 'حجوزات مؤكدة',
    upcomingTrips: 'رحلات الأتوبيسات القادمة',
    outstandingPayments: 'المتبقي لتحصيله (مديونيات)',
    hotelAvailabilityAlerts: 'تنبيهات إتاحة الغرف',
    busesCurrentlyAssigned: 'أتوبيسات في الخدمة اليوم',
    monthlyRevenue: 'إيرادات الشهر الإجمالية',
    monthlyExpenses: 'تكاليف ومصروفات التشغيل',
    grossProfit: 'مجمل الأرباح الصافية',
    todaysTasks: 'مهام التشغيل لليوم',
    recentActivityTimeline: 'سجل العمليات والتدقيق (Audit Trail)',

    // Table Headers
    id: 'كود السجل',
    customer: 'اسم العميل',
    phone: 'رقم الهاتف',
    whatsapp: 'واتساب',
    source: 'مصدر الليد',
    campaign: 'الحملة الإعلانية',
    destination: 'الوجهة السياحية',
    travelDate: 'تاريخ السفر',
    travelers: 'الأفراد',
    adults: 'بالغين',
    children: 'أطفال',
    moderator: 'مسؤول الميديا',
    salesAgent: 'مسؤول البيع',
    status: 'الحالة',
    actions: 'الإجراءات',
    total: 'الإجمالي',
    paid: 'المدفوع',
    remaining: 'المتبقي',
    hotel: 'الفندق والمنتجع',
    bus: 'الأتوبيس المعين',
    driver: 'السائق',
    progress: 'نسبة الجاهزية',
    room: 'نوع الغرفة',
    nights: 'الليالي',
    rate: 'السعر',

    // Extra module titles & tabs
    tab_overview: 'نظرة عامة ومتطلبات السفر',
    tab_calls: 'سجل المكالمات الهاتفية',
    tab_whatsapp: 'محادثات الواتساب',
    tab_notes: 'ملاحظات المتابعة',
    tab_bookings: 'الحجوزات المرتبطة',
    tab_payments: 'المدفوعات وسندات القبض',
    tab_activity: 'مسار العمليات الزمني',
    tab_documents: 'الفوتشرات والمستندات',
    tab_rooms: 'فئات الغرف والأسعار التعاقدية',
    tab_childPolicy: 'سياسة تسعير الأطفال',
    tab_contracts: 'عقود الفنادق المباشرة',
    tab_fixedCosts: 'التكاليف الثابتة وإهلاك الأصول',
    tab_trips: 'الرحلات المجدولة',
    tab_maintenance: 'سجل صيانة الأتوبيس',
    tab_checklist: 'قائمة جاهزية العمليات',
    tab_passengers: 'مقاعد الأتوبيس والمانيفست',
    tab_rooming: 'كشف تسكين الغرف (Rooming)',
    tab_finance: 'أرباح الرحلة والقوائم المالية',

    // Buttons & Labels
    btn_new_lead: '+ إضافة عميل جديد',
    btn_create_quotation: 'إنشاء عرض سعر',
    btn_convert_booking: 'تحويل إلى حجز مؤكد',
    btn_record_payment: 'تسجيل دفعة نقدية',
    btn_print_voucher: 'طباعة الفوتشر الرسمي',
    btn_export_pdf: 'تصدير PDF',
    btn_mark_interested: 'تحديد كـ مهتم',
    btn_mark_lost: 'تحديد كـ خاسر (Lost)',
    btn_confirm_booking: 'تأكيد الحجز النهائي',
    btn_simulate_call: 'محاكاة اتصال هاتفي',
    btn_save_call: 'حفظ ملخص المكالمة',
    btn_add_note: 'إضافة ملاحظة',
    btn_seat_map: 'مخطط المقاعد والمانيفست',
    btn_check_availability: 'فحص إتاحة الغرف',
    btn_new_req: '+ طلب إتاحة من مورد',
    btn_create_task: '+ إنشاء مهمة جديدة',
    btn_open_details: 'عرض التفاصيل',
    all_statuses: 'جميع الحالات',
    all_sources: 'جميع المصادر',
    all_hotels: 'جميع الفنادق والمنتجعات',
    all_types: 'جميع الأنواع',
  }
};

export function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

export function formatEGP(amount: number, lang: Language = 'en'): string {
  const formatted = amount.toLocaleString('en-US');
  return lang === 'ar' ? `${formatted} ج.م` : `${formatted} EGP`;
}

export function translateStatus(lang: Language, status: string): string {
  if (lang === 'en') return status;
  const statusMap: Record<string, string> = {
    New: 'جديد',
    Contacted: 'تم التواصل',
    Interested: 'مهتم',
    'Quotation Sent': 'أُرسل عرض سعر',
    'Follow-up': 'متابعة لاحقة',
    Confirmed: 'مؤكد',
    Lost: 'مفقود / خاسر',
    Pending: 'قيد الانتظار',
    'Deposit Paid': 'تم سداد العربون',
    'Ready for Travel': 'جاهز للسفر',
    'In Progress': 'الرحلة جارية',
    Completed: 'مكتملة ومقفلة',
    Cancelled: 'ملغي',
    Available: 'متاح للتشغيل',
    Assigned: 'معين لرحلة',
    'On Trip': 'على الطريق',
    Maintenance: 'في الصيانة',
    Unavailable: 'غير متاح',
    Planning: 'قيد التخطيط',
    Open: 'مفتوح للحجز',
    Ready: 'جاهز للانطلاق',
    Departed: 'انطلق على الطريق',
    Arrived: 'وصل للوجهة',
    Draft: 'مسودة',
    Sent: 'تم الإرسال',
    'Waiting Supplier': 'بانتظار رد المورد',
    'Not Available': 'غير متوفر',
    Expired: 'منتهي الصلاحية',
    Approved: 'معتمد وموافق عليه',
    Rejected: 'مرفوض',
    Urgent: 'عاجل جداً',
    High: 'مرتفع',
    Medium: 'متوسط',
    Low: 'منخفض',
    Active: 'نشط',
    Direct: 'عقد مباشر'
  };
  return statusMap[status] || status;
}

export function translateLeadSource(lang: Language, source: string): string {
  if (lang === 'en') return source;
  const map: Record<string, string> = {
    Facebook: 'فيسبوك',
    Instagram: 'إنستغرام',
    Messenger: 'ماسنجر',
    WhatsApp: 'واتساب',
    Website: 'الموقع الإلكتروني',
    Referral: 'ترشيح مباشر (VIP)'
  };
  return map[source] || source;
}

export function translatePaymentMethod(lang: Language, method: string): string {
  if (lang === 'en') return method;
  const map: Record<string, string> = {
    'Bank Transfer': 'تحويل بنكي (CIB/QNB)',
    Cash: 'نقداً بالخزينة',
    Card: 'بطاقة ائتمانية / دفع إلكتروني',
    Wallet: 'محفظة إلكترونية (فودافون كاش / إنستاباي)'
  };
  return map[method] || method;
}

export function translateDestination(lang: Language, dest: string): string {
  if (lang === 'en') return dest;
  const map: Record<string, string> = {
    Hurghada: 'الغردقة',
    'Sharm El Sheikh': 'شرم الشيخ',
    'Marsa Alam': 'مرسى علم',
    Luxor: 'الأقصر',
    Aswan: 'أسوان',
    Dahab: 'دهب',
    'North Coast': 'الساحل الشمالي',
    'Aswan & Nile': 'أسوان والنيل'
  };
  return map[dest] || dest;
}

export function translateChecklistKey(lang: Language, key: string): { label: string; desc: string } {
  const dictEn: Record<string, { label: string; desc: string }> = {
    hotelConfirmed: { label: 'Hotel Confirmed', desc: 'Direct resort allotment blocked with hotel sales director' },
    roomsConfirmed: { label: 'Rooms Confirmed', desc: 'Required rooms assigned in booking engine' },
    paymentChecked: { label: 'Payment Checked', desc: 'Required deposit / payment credited in bank account' },
    busAssigned: { label: 'Bus Assigned', desc: 'Company coach locked for roundtrip route' },
    driverAssigned: { label: 'Driver Assigned', desc: 'Professional commercial captain assigned to departure' },
    passengerListCompleted: { label: 'Passenger List Completed', desc: 'Bus seats confirmed on manifest' },
    roomingListCompleted: { label: 'Rooming List Completed', desc: 'Guest names & child ages allocated to room vouchers' },
    voucherSent: { label: 'Voucher Sent', desc: 'Hotel check-in voucher emailed & sent via WhatsApp' },
    customerContacted: { label: 'Customer Contacted', desc: 'Pick-up point and departure briefing completed' },
    readyForTravel: { label: 'Ready for Travel', desc: '100% operational sign-off completed' }
  };

  const dictAr: Record<string, { label: string; desc: string }> = {
    hotelConfirmed: { label: 'تأكيد حجز الفندق', desc: 'تثبيت مخصص الغرف والاتفاق المباشر مع إدارة الفندق' },
    roomsConfirmed: { label: 'تخصيص وتأكيد الغرف', desc: 'تخصيص أرقام وفئات الغرف في سيستم الفندق' },
    paymentChecked: { label: 'فحص وتأكيد سداد الدفعة', desc: 'التحقق من إيداع العربون أو الدفعة المستحقة في الحساب' },
    busAssigned: { label: 'تعيين أتوبيس الرحلة', desc: 'تخصيص أتوبيس الشركة لخط سير الرحلة ذهاب وعودة' },
    driverAssigned: { label: 'تعيين السائق الأساسي', desc: 'تكليف السائق المعتمد بمواعيد التحرك ونقاط التجمع' },
    passengerListCompleted: { label: 'اكتمال مانيفست الركاب', desc: 'تسكين المقاعد وتأكيد بيانات المسافرين في المانيفست' },
    roomingListCompleted: { label: 'اكتمال كشف التسكين (Rooming)', desc: 'توزيع أسماء النزلاء وأعمار الأطفال على الغرف' },
    voucherSent: { label: 'إرسال فوتشر الحجز', desc: 'تسليم الفوتشر الرسمي وتفاصيل الإقامة للعميل عبر واتساب' },
    customerContacted: { label: 'التواصل مع العميل', desc: 'تأكيد نقطة التجمع (سيدي جابر / رمسيس) وميعاد التحرك' },
    readyForTravel: { label: 'جاهز للسفر (100%)', desc: 'اعتماد كافة الإجراءات التشغيلية وجاهزية الرحلة للانطلاق' }
  };

  if (lang === 'ar') {
    return dictAr[key] || { label: key, desc: '' };
  }
  return dictEn[key] || { label: key, desc: '' };
}

export function translateSupplierType(lang: Language, type: string): string {
  if (lang === 'en') return type;
  const map: Record<string, string> = {
    'Hotel Broker': 'وسيط فنادق (بروكر)',
    'Tourism Company': 'شركة سياحة شريكة',
    'External Transportation': 'شركة نقل سياحي خارجي',
    'Tour Operator': 'منظم رحلات وتور أوبريتور'
  };
  return map[type] || type;
}

export function translateTaskType(lang: Language, type: string): string {
  if (lang === 'en') return type;
  const map: Record<string, string> = {
    'Call Customer': 'اتصال هاتفي بالعميل',
    'Confirm Hotel': 'تأكيد حجز الفندق',
    'Collect Payment': 'تحصيل دفعة مالية',
    'Confirm Bus': 'تأكيد الأتوبيس والسائق',
    'Send Voucher': 'إرسال الفوتشر والتأكيد'
  };
  return map[type] || type;
}

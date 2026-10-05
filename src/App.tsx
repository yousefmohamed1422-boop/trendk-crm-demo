/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { DashboardView } from './components/dashboard/DashboardView';
import { LeadsView } from './components/leads/LeadsView';
import { SalesPipelineView } from './components/pipeline/SalesPipelineView';
import { CustomersView } from './components/customers/CustomersView';
import { QuotationsView } from './components/quotations/QuotationsView';
import { BookingsView } from './components/bookings/BookingsView';
import { BookingDetailView } from './components/bookings/BookingDetailView';
import { HotelsView } from './components/hotels/HotelsView';
import { ContractsView } from './components/hotels/ContractsView';
import { AvailabilityView } from './components/hotels/AvailabilityView';
import { SuppliersView } from './components/suppliers/SuppliersView';
import { OperationsBoardView } from './components/operations/OperationsBoardView';
import { RoomingListsView } from './components/operations/RoomingListsView';
import { PassengerManifestView } from './components/operations/PassengerManifestView';
import { TripsView } from './components/transport/TripsView';
import { FleetView } from './components/transport/FleetView';
import { DriversView } from './components/transport/DriversView';
import { BusCostingView } from './components/transport/BusCostingView';
import { PaymentsView } from './components/payments/PaymentsView';
import { AccountingView } from './components/accounting/AccountingView';
import { TasksView } from './components/tasks/TasksView';
import { ReportsView } from './components/reports/ReportsView';
import { AuditTrailView } from './components/audit/AuditTrailView';

const AppContent: React.FC = () => {
  const { activeModule, language } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'leads':
        return <LeadsView />;
      case 'pipeline':
        return <SalesPipelineView />;
      case 'customers':
        return <CustomersView />;
      case 'quotations':
        return <QuotationsView />;
      case 'bookings':
        return <BookingsView />;
      case 'booking-detail':
        return <BookingDetailView />;
      case 'hotels':
        return <HotelsView />;
      case 'contracts':
        return <ContractsView />;
      case 'availability':
        return <AvailabilityView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'operations':
        return <OperationsBoardView />;
      case 'rooming-lists':
        return <RoomingListsView />;
      case 'passenger-lists':
        return <PassengerManifestView />;
      case 'trips':
        return <TripsView />;
      case 'buses':
        return <FleetView />;
      case 'drivers':
        return <DriversView />;
      case 'bus-costing':
        return <BusCostingView />;
      case 'payments':
      case 'receivables':
        return <PaymentsView />;
      case 'profitability':
      case 'expenses':
      case 'payables':
        return <AccountingView />;
      case 'tasks':
        return <TasksView />;
      case 'reports':
        return <ReportsView />;
      case 'audit-trail':
        return <AuditTrailView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation with grouped submenus */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header with Top Bar Contract (3 zones) */}
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Main Viewport */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

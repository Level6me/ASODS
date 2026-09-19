import React, { useState } from 'react';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { ThemeProvider } from './context/ThemeContext';
import { SecurityHeader } from './components/security/SecurityHeader';
import { FloatingDock } from './components/security/FloatingDock';
import { MetricsOverview } from './components/security/MetricsOverview';
import { ThreatChart } from './components/security/ThreatChart';
import { SecurityEventTable } from './components/security/SecurityEventTable';
import { FirewallRulesView } from './components/security/FirewallRulesView';
import { DefenseConfigView } from './components/security/DefenseConfigView';
import { DesignSystemShowcase } from './components/security/DesignSystemShowcase';
import { IpDetailDrawer } from './components/security/IpDetailDrawer';
import { ConfirmModal } from './components/security/ConfirmModal';
import { Toast } from './components/ui/Toast';

const DashboardContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const { summary, toasts, removeToast } = useSecurity();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary transition-colors pb-24">
      {/* 1. App Shell Top Navigation */}
      <SecurityHeader
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-6 space-y-6">
        {currentTab === 'overview' && (
          <>
            {/* Top Metrics Row */}
            <MetricsOverview />

            {/* Realtime Threat Activity Chart */}
            <ThreatChart />

            {/* Security Events High-Density Table */}
            <SecurityEventTable externalFilter={globalSearch} />
          </>
        )}

        {currentTab === 'threats' && (
          <div className="space-y-6">
            <ThreatChart />
            <SecurityEventTable externalFilter={globalSearch} />
          </div>
        )}

        {currentTab === 'firewall' && <FirewallRulesView />}

        {currentTab === 'settings' && <DefenseConfigView />}

        {currentTab === 'design-system' && <DesignSystemShowcase />}
      </main>

      {/* 3. Floating Glass Dock Navigation */}
      <FloatingDock
        activeTab={currentTab}
        onChangeTab={setCurrentTab}
        threatCount={summary.activeThreats}
      />

      {/* 4. Global Modals & Drawers */}
      <IpDetailDrawer />
      <ConfirmModal />

      {/* 5. Global Floating Glass Toasts */}
      <div className="fixed bottom-22 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-md px-4">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            id={t.id}
            type={t.type}
            message={t.message}
            subMessage={t.subMessage}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <SecurityProvider>
        <DashboardContent />
      </SecurityProvider>
    </ThemeProvider>
  );
}

export default App;

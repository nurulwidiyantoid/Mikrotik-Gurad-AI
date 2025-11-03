
import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SettingsModal from './components/SettingsModal';
import { useMikrotikApi } from './hooks/useMikrotikApi';

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const api = useMikrotikApi();

  // On initial load, if not configured, open settings
  useState(() => {
    if (!api.isConfigured) {
      setIsSettingsOpen(true);
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} connectionStatus={api.connectionStatus} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard 
          isConnected={api.connectionStatus === 'connected'} 
          onConfigureClick={() => setIsSettingsOpen(true)}
        />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MikroTik AI Guardian. All rights reserved.</p>
      </footer>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        api={api}
      />
    </div>
  );
};

export default App;

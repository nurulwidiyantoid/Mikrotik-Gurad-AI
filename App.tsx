
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { useMikrotikApi } from './hooks/useMikrotikApi';
import ConnectionNotification from './components/ConnectionNotification';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const api = useMikrotikApi();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Open settings modal on first load if not configured
  useEffect(() => {
    // A short delay to allow the app to load before showing the modal
    const timer = setTimeout(() => {
      if (!api.isConfigured) {
        setIsSettingsOpen(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [api.isConfigured]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header 
        connectionStatus={api.connectionStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <ConnectionNotification status={api.connectionStatus} error={api.error} />
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard 
          isConnected={api.connectionStatus === 'connected'}
          reportConnectionLost={api.reportConnectionLost}
        />
      </main>
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        api={api}
      />
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MikroTik AI Guardian. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

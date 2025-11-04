
import React from 'react';
import { NetworkIcon, CogIcon } from './icons';
import { ConnectionStatus } from '../hooks/useMikrotikApi';

interface HeaderProps {
    connectionStatus: ConnectionStatus;
    onOpenSettings: () => void;
}

const StatusIndicator: React.FC<{ status: ConnectionStatus }> = ({ status }) => {
    const statusConfig = {
        connected: { text: 'Connected', color: 'bg-secondary' },
        disconnected: { text: 'Disconnected', color: 'bg-danger' },
        connecting: { text: 'Connecting...', color: 'bg-warning' },
        error: { text: 'Error', color: 'bg-danger' },
    };
    const { text, color } = statusConfig[status];

    return (
        <div className="flex items-center space-x-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color} ${status === 'connecting' ? 'animate-pulse' : ''}`}></span>
            <span className="text-sm text-gray-300 font-medium">{text}</span>
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ connectionStatus, onOpenSettings }) => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <NetworkIcon className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-white">MikroTik AI Guardian</h1>
          </div>
          <div className="flex items-center space-x-4">
            <StatusIndicator status={connectionStatus} />
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label="Open Settings"
            >
              <CogIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

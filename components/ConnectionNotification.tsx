
import React from 'react';
import { ConnectionStatus } from '../hooks/useMikrotikApi';
import { ExclamationTriangleIcon, StatusOnlineIcon } from './icons';

interface ConnectionNotificationProps {
    status: ConnectionStatus;
    error: string | null;
}

const ConnectionNotification: React.FC<ConnectionNotificationProps> = ({ status, error }) => {
    const isVisible = status === 'error' || (status === 'connecting' && error);

    const config = {
        bgColor: status === 'error' ? 'bg-danger/80' : 'bg-warning/80',
        borderColor: status === 'error' ? 'border-danger' : 'border-warning',
        icon: status === 'error' 
            ? <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            : <StatusOnlineIcon className="h-6 w-6 text-white animate-spin" />,
        message: error || (status === 'error' ? 'Connection Failed' : 'Reconnecting...'),
    };
    
    return (
        <div 
            className={`fixed top-16 left-1/2 -translate-x-1/2 w-auto max-w-md z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-4' : 'opacity-0 -translate-y-full'}`}
            role="alert"
            aria-live="assertive"
        >
            <div className={`flex items-center gap-4 p-3 rounded-lg shadow-2xl border ${config.bgColor} ${config.borderColor} backdrop-blur-sm text-white`}>
                <div className="flex-shrink-0">
                    {config.icon}
                </div>
                <div className="text-sm font-semibold">
                    {config.message}
                </div>
            </div>
        </div>
    );
};

export default ConnectionNotification;

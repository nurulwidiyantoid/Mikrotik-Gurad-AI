
import { useState, useEffect, useCallback } from 'react';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface UseMikrotikApi {
    credentials: { host: string; user: string; pass: string; };
    connectionStatus: ConnectionStatus;
    isConfigured: boolean;
    error: string | null;
    saveCredentials: (host: string, user: string, pass: string) => void;
    testConnection: (host: string, user: string, pass: string) => void;
    disconnect: () => void;
}

const MOCK_API_CREDENTIALS = {
    host: '103.172.204.153:8728',
    user: 'apiuser',
    pass: 'bismillah123' // Assuming empty password for default mock
};

export const useMikrotikApi = (): UseMikrotikApi => {
    const [credentials, setCredentials] = useState({ host: '', user: '', pass: '' });
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
    const [error, setError] = useState<string | null>(null);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);

    useEffect(() => {
        try {
            const savedCreds = localStorage.getItem('mikrotik-api-creds');
            if (savedCreds) {
                const parsedCreds = JSON.parse(savedCreds);
                setCredentials(parsedCreds);
                setIsConfigured(true);
                // Auto-test connection on load if configured
                testConnection(parsedCreds.host, parsedCreds.user, parsedCreds.pass);
            } else {
                setIsConfigured(false);
                setConnectionStatus('disconnected');
            }
        } catch (e) {
            console.error("Failed to load credentials from localStorage", e);
            setIsConfigured(false);
        }
    }, []);

    const saveCredentials = useCallback((host: string, user: string, pass: string) => {
        const newCreds = { host, user, pass };
        setCredentials(newCreds);
        setIsConfigured(!!host && !!user);
        try {
            localStorage.setItem('mikrotik-api-creds', JSON.stringify(newCreds));
            // After saving new credentials, try to connect
            testConnection(host, user, pass);
        } catch (e) {
            console.error("Failed to save credentials to localStorage", e);
        }
    }, []);

    const testConnection = useCallback((host: string, user: string, pass: string) => {
        setConnectionStatus('connecting');
        setError(null);

        // --- MOCK API CALL ---
        // In a real application, this would be a call to a backend service
        // that attempts to connect to the MikroTik router.
        setTimeout(() => {
            if (!host || !user) {
                setError("Host and Username cannot be empty.");
                setConnectionStatus('error');
                return;
            }

            if (host === MOCK_API_CREDENTIALS.host && user === MOCK_API_CREDENTIALS.user && pass === MOCK_API_CREDENTIALS.pass) {
                setConnectionStatus('connected');
            } else {
                setError("Authentication failed. Please check your credentials.");
                setConnectionStatus('error');
            }
        }, 1000);
    }, []);
    
    const disconnect = useCallback(() => {
        try {
            localStorage.removeItem('mikrotik-api-creds');
        } catch (e) {
            console.error("Failed to remove credentials from localStorage", e);
        }
        setCredentials({ host: '', user: '', pass: '' });
        setConnectionStatus('disconnected');
        setError(null);
        setIsConfigured(false);
    }, []);

    return {
        credentials,
        connectionStatus,
        isConfigured,
        error,
        saveCredentials,
        testConnection,
        disconnect
    };
};

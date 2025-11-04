
import { useState, useEffect, useCallback, useRef } from 'react';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface Credentials {
    host: string;
    user: string;
    pass: string;
}

const defaultCredentials: Credentials = {
    host: '',
    user: '',
    pass: ''
};

export interface UseMikrotikApi {
    connectionStatus: ConnectionStatus;
    isConfigured: boolean;
    error: string | null;
    credentials: Credentials;
    saveCredentials: (host: string, user: string, pass: string) => void;
    testConnection: (host: string, user: string, pass: string) => Promise<boolean>;
    reportConnectionLost: () => void;
}

const getStoredCredentials = (): Credentials => {
    try {
        const stored = localStorage.getItem('mikrotikApiCredentials');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.host && parsed.user) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Failed to parse credentials from localStorage", e);
    }
    return defaultCredentials;
};

export const useMikrotikApi = (): UseMikrotikApi => {
    const [credentials, setCredentials] = useState<Credentials>(getStoredCredentials);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
    const [error, setError] = useState<string | null>(null);
    const [retryAttempt, setRetryAttempt] = useState(0);
    const retryTimerRef = useRef<number | null>(null);

    const isConfigured = !!(credentials.host && credentials.user);

    const clearRetryTimer = () => {
        if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
            retryTimerRef.current = null;
        }
    };

    const connect = useCallback((creds: Credentials, isTest: boolean = false): Promise<boolean> => {
        setConnectionStatus('connecting');
        setError(null);
        clearRetryTimer();

        // --- MOCK API CALL ---
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                if (creds.host && creds.user) { // Password can be blank for some setups
                    console.log(`Attempting to connect to ${creds.host}...`);
                    setConnectionStatus('connected');
                    if (!isTest) setRetryAttempt(0);
                    resolve(true);
                } else {
                    const errorMsg = "Host and username are required.";
                    setError(errorMsg);
                    setConnectionStatus('error');
                    resolve(false);
                }
            }, 1000);
        });
    }, []);
    
    useEffect(() => {
        if (retryAttempt > 0) {
            const delay = Math.min(1000 * 2 ** (retryAttempt - 1), 30000); // Exponential backoff up to 30s
            setError(`Connection lost. Retrying in ${delay / 1000}s...`);
            
            retryTimerRef.current = window.setTimeout(async () => {
                const success = await connect(credentials);
                if (!success) {
                    setRetryAttempt(prev => prev + 1);
                }
            }, delay);
        }

        return clearRetryTimer;
    }, [retryAttempt, credentials, connect]);
    
    useEffect(() => {
        // Auto-connect on initial load if credentials exist
        if (isConfigured) {
            connect(credentials);
        } else {
            setConnectionStatus('disconnected');
            setError("API credentials are not configured.");
        }
    }, []); // Run only on initial mount

    const saveCredentials = useCallback((host: string, user: string, pass: string) => {
        const newCredentials = { host, user, pass };
        try {
            localStorage.setItem('mikrotikApiCredentials', JSON.stringify(newCredentials));
        } catch(e) {
            console.error("Failed to save credentials to localStorage", e);
        }
        setCredentials(newCredentials);
        setRetryAttempt(0); // Reset retry on new credentials
        connect(newCredentials);
    }, [connect]);

    const testConnection = useCallback(async (host: string, user: string, pass: string): Promise<boolean> => {
        setRetryAttempt(0);
        clearRetryTimer();
        return connect({host, user, pass}, true);
    }, [connect]);

    const reportConnectionLost = useCallback(() => {
        if (connectionStatus !== 'connected') return; // Only report if was previously connected
        
        setConnectionStatus('error');
        if (retryAttempt === 0) {
            setRetryAttempt(1); // Start the retry cycle
        }
    }, [connectionStatus, retryAttempt]);


    return {
        connectionStatus,
        isConfigured,
        error,
        credentials,
        saveCredentials,
        testConnection,
        reportConnectionLost,
    };
};


import React, { useState, useEffect } from 'react';
import { UseMikrotikApi } from '../hooks/useMikrotikApi';
import { CogIcon, XMarkIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  api: UseMikrotikApi;
}

const InputField: React.FC<{label: string; id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string;}> = 
  ({ label, id, type = 'text', value, onChange, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-900/70 border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/80"
      />
    </div>
);

const GuideSection: React.FC = () => (
    <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-white/10">
        <h4 className="font-semibold text-primary mb-2">How to Enable API Access on Your Router</h4>
        <ol className="list-decimal list-inside text-sm text-gray-400 space-y-1">
            <li>Login to your MikroTik router (WinBox or WebFig).</li>
            <li>Go to <code className="bg-gray-900 px-1 rounded text-gray-300">IP &gt; Services</code>.</li>
            <li>Enable the <code className="bg-gray-900 px-1 rounded text-gray-300">api</code> service (port 8728) or <code className="bg-gray-900 px-1 rounded text-gray-300">api-ssl</code> (port 8729).</li>
            <li>Go to <code className="bg-gray-900 px-1 rounded text-gray-300">System &gt; Users</code>.</li>
            <li>Create a dedicated user for this app (e.g., 'guardian').</li>
            <li>Assign the user to a group with at least 'read' and 'api' permissions.</li>
        </ol>
    </div>
);


const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, api }) => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null);

  useEffect(() => {
    if (isOpen) {
        setHost(api.credentials.host);
        setUser(api.credentials.user);
        setPass(api.credentials.pass);
        setTestResult(null); // Reset test result when opening
    }
  }, [isOpen, api.credentials]);

  const handleSave = () => {
    api.saveCredentials(host, user, pass);
    onClose();
  };

  const handleTestConnection = async () => {
    setTestResult(null);
    const success = await api.testConnection(host, user, pass);
    setTestResult(success ? 'success' : 'fail');
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start sm:items-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-white/10 w-full max-w-lg relative" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close settings">
            <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CogIcon className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold text-white">API Configuration</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">Enter the connection details for your MikroTik router.</p>

            <div className="space-y-4">
              <InputField label="Router Host/IP Address" id="host" value={host} onChange={e => setHost(e.target.value)} placeholder="e.g., 192.168.88.1" />
              <InputField label="API Username" id="user" value={user} onChange={e => setUser(e.target.value)} placeholder="e.g., guardian" />
              <InputField label="API Password" id="pass" type="password" value={pass} onChange={e => setPass(e.target.value)} />
            </div>

            {testResult === 'fail' && api.error && (
                <div className="mt-4 text-sm text-danger bg-danger/10 p-3 rounded-md border border-danger/20">{api.error}</div>
            )}
            {testResult === 'success' && (
                <div className="mt-4 text-sm text-secondary bg-secondary/10 p-3 rounded-md border border-secondary/20">Connection successful!</div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleTestConnection}
                    disabled={api.connectionStatus === 'connecting'}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary disabled:opacity-50 transition-colors"
                >
                    {api.connectionStatus === 'connecting' && testResult !== 'success' ? 'Testing...' : 'Test Connection'}
                </button>
                <button
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary transition-colors"
                >
                    Save & Close
                </button>
            </div>
            <GuideSection />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

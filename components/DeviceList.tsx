import React, { useState } from 'react';
import { MikroTikDevice, InterfaceTraffic, DeviceService, LogEntry } from '../types';
import Card from './Card';
import { ServerStackIcon, ChevronDownIcon } from './icons';

interface DeviceListProps {
    devices: MikroTikDevice[];
}

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
    const getColor = () => {
        if (value > 85) return 'bg-danger';
        if (value > 60) return 'bg-warning';
        return 'bg-secondary';
    };

    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full transition-all duration-500 ${getColor()}`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
};

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 p-3 rounded-md">
        <h4 className="text-sm font-semibold text-primary mb-2">{title}</h4>
        {children}
    </div>
);

const MiniLog: React.FC<{ logs: LogEntry[] }> = ({ logs }) => {
    const levelClasses = {
      info: 'text-blue-400',
      warning: 'text-yellow-400',
      critical: 'text-red-500',
    };
    return (
        <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {logs.slice().reverse().map((log, index) => (
                <div key={index} className="text-xs font-mono leading-tight truncate">
                    <span className="text-gray-500 mr-1">{log.timestamp}</span>
                    <span className={`font-bold mr-1 ${levelClasses[log.level]}`}>[{log.level.charAt(0)}]</span>
                    <span className="text-gray-400">{log.message}</span>
                </div>
            ))}
        </div>
    );
};


const DeviceRow: React.FC<{ device: MikroTikDevice; isExpanded: boolean; onToggle: () => void; }> = ({ device, isExpanded, onToggle }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300">
            <div 
                className="p-3 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
                onClick={onToggle}
                role="button"
                aria-expanded={isExpanded}
                aria-controls={`device-details-${device.id}`}
            >
                <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1">
                    <span className={`h-3 w-3 rounded-full flex-shrink-0 ${device.status === 'online' ? 'bg-secondary' : 'bg-danger'}`}></span>
                    <div>
                        <p className="font-semibold text-white">{device.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{device.ipAddress}</p>
                    </div>
                </div>

                <div className="w-full sm:w-auto sm:flex-1 flex items-center gap-4">
                    <div className="w-1/2 sm:w-full">
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                            <span>CPU</span>
                            <span>{device.cpuLoad}%</span>
                        </div>
                        <ProgressBar value={device.cpuLoad || 0} />
                    </div>
                    <div className="w-1/2 sm:w-full">
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                            <span>Mem</span>
                            <span>{device.memoryUsage}%</span>
                        </div>
                        <ProgressBar value={device.memoryUsage || 0} />
                    </div>
                </div>

                <div className="text-sm text-gray-300 w-auto sm:w-32 sm:text-right">
                   {device.uptime}
                </div>
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Placeholder for future implementation
                        console.log(`Initiating connection to ${device.name} (${device.id})`);
                        alert(`Simulating direct connection to ${device.name}...`);
                    }}
                    disabled={device.status === 'offline'}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary/80 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Connect to ${device.name}`}
                    title={`Connect to ${device.name}`}
                >
                    Connect
                </button>

                <div className="w-6 text-gray-400">
                   <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </div>

            <div 
                id={`device-details-${device.id}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="px-3 pb-3 pt-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <DetailSection title="Interface Statistics">
                        <div className="text-xs text-gray-400 space-y-1">
                            {device.interfaces?.map(iface => (
                                <div key={iface.name} className="flex justify-between">
                                    <span className="font-semibold">{iface.name}</span>
                                    <span>DL: {iface.rx}Mbps / UL: {iface.tx}Mbps</span>
                                </div>
                            ))}
                        </div>
                    </DetailSection>
                    <DetailSection title="Running Services">
                        <div className="text-xs text-gray-400 space-y-1">
                            {device.services?.map(service => (
                                <div key={service.name} className="flex items-center justify-between">
                                    <span>{service.name} (:{service.port})</span>
                                    <span className={`px-2 py-0.5 rounded-full text-white text-[10px] ${service.status === 'running' ? 'bg-secondary/50' : 'bg-danger/50'}`}>{service.status}</span>
                                </div>
                            ))}
                        </div>
                    </DetailSection>
                     <DetailSection title="Device Logs">
                        {device.logs && device.logs.length > 0 ? <MiniLog logs={device.logs} /> : <p className="text-xs text-gray-500">No logs available.</p>}
                    </DetailSection>
                </div>
            </div>
        </div>
    );
};

type StatusFilter = 'all' | 'online' | 'offline';

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
    const [expandedDeviceId, setExpandedDeviceId] = useState<string | null>(null);
    const [filter, setFilter] = useState<StatusFilter>('all');

    const handleToggle = (deviceId: string) => {
        setExpandedDeviceId(currentId => (currentId === deviceId ? null : deviceId));
    };
    
    const filteredDevices = devices.filter(device => {
        if (filter === 'online') return device.status === 'online';
        if (filter === 'offline') return device.status === 'offline';
        return true;
    });

    const FilterButton: React.FC<{ status: StatusFilter; label: string; }> = ({ status, label }) => {
        const isActive = filter === status;
        return (
            <button
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
                {label}
            </button>
        );
    };

    return (
        <Card className="p-4">
            <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                    <ServerStackIcon className="h-6 w-6 mr-2 text-primary" />
                    Monitored Devices
                </h3>
                <div className="flex items-center bg-gray-700/50 rounded-lg p-1 space-x-1">
                    <FilterButton status="all" label="All" />
                    <FilterButton status="online" label="Online" />
                    <FilterButton status="offline" label="Offline" />
                </div>
            </div>
            <div className="space-y-3">
                {filteredDevices.map((device) => (
                   <DeviceRow 
                     key={device.id}
                     device={device}
                     isExpanded={expandedDeviceId === device.id}
                     onToggle={() => handleToggle(device.id)}
                   />
                ))}
            </div>
        </Card>
    );
};

export default DeviceList;
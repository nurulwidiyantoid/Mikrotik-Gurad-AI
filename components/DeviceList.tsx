import React, { useState } from 'react';
import { MikroTikDevice, LogEntry, DeviceService } from '../types';
import Card from './Card';
import { ServerStackIcon, ChevronDownIcon, TerminalIcon, CheckCircleIcon, XCircleIcon } from './icons';

interface DeviceListProps {
    devices: MikroTikDevice[];
}

const ProgressBar: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const getColor = () => {
        if (value > 85) return 'bg-danger';
        if (value > 60) return 'bg-warning';
        return 'bg-secondary';
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>{label}</span>
                <span>{value.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${getColor()}`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

const MiniLog: React.FC<{ logs: LogEntry[] }> = ({ logs }) => {
    const levelClasses = {
      info: 'text-blue-400',
      warning: 'text-yellow-400',
      critical: 'text-red-500',
    };
    return (
        <div className="space-y-1 max-h-36 overflow-y-auto pr-2">
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

const ServiceStatus: React.FC<{ service: DeviceService }> = ({ service }) => {
    const isRunning = service.status === 'running';
    return (
        <div className="flex items-center justify-between hover:bg-gray-700/50 -mx-1 px-1 rounded">
            <div>
                <span className="font-semibold">{service.name}</span>
                <span className="text-gray-500"> (:{service.port})</span>
            </div>
            {isRunning ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
            ) : (
                <XCircleIcon className="h-4 w-4 text-danger" />
            )}
        </div>
    );
};


const DeviceRow: React.FC<{ device: MikroTikDevice; isExpanded: boolean; onToggle: () => void; }> = ({ device, isExpanded, onToggle }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 border border-transparent hover:border-primary/30">
            <div 
                className="grid grid-cols-12 items-center p-3 gap-4 cursor-pointer"
                onClick={onToggle}
                role="button"
                aria-expanded={isExpanded}
                aria-controls={`device-details-${device.id}`}
            >
                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                    <span className={`h-3.5 w-3.5 rounded-full flex-shrink-0 ${device.status === 'online' ? 'bg-secondary' : 'bg-danger'} ${device.status === 'online' ? 'animate-pulse-slow' : ''}`}></span>
                    <div>
                        <p className="font-semibold text-white">{device.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{device.ipAddress}</p>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                    <ProgressBar label="CPU" value={device.cpuLoad || 0} />
                    <ProgressBar label="Mem" value={device.memoryUsage || 0} />
                </div>
                
                <div className="col-span-6 md:col-span-2 text-sm text-gray-300 text-left md:text-center">
                    <span>{device.uptime}</span>
                </div>

                <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Initiating connection to ${device.name} (${device.id})`);
                            alert(`Simulating direct connection to ${device.name}...`);
                        }}
                        disabled={device.status === 'offline'}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary/80 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                        aria-label={`Connect to ${device.name}`}
                        title={`Connect to ${device.name}`}
                    >
                        <TerminalIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Connect</span>
                    </button>

                    <div className="w-8 text-gray-400 text-center">
                       <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </div>

            <div 
                id={`device-details-${device.id}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-3 pb-3 pt-1 grid grid-cols-1 lg:grid-cols-3 gap-3 bg-black/20 border-t border-white/5">
                    <Card className="p-3 !scale-100 hover:!scale-100">
                        <h4 className="text-sm font-semibold text-primary mb-2">Interface Statistics</h4>
                        <div className="text-xs text-gray-400 space-y-1">
                            {device.interfaces && device.interfaces.length > 0 ? (
                                device.interfaces.map(iface => (
                                    <div key={iface.name} className="flex justify-between hover:bg-gray-700/50 -mx-1 px-1 rounded">
                                        <span className="font-semibold">{iface.name}</span>
                                        <span>DL: {iface.rx}Mbps / UL: {iface.tx}Mbps</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic">No interface data available.</p>
                            )}
                        </div>
                    </Card>
                     <Card className="p-3 !scale-100 hover:!scale-100">
                        <h4 className="text-sm font-semibold text-primary mb-2">Running Services</h4>
                        <div className="text-xs text-gray-400 space-y-1">
                            {device.services && device.services.length > 0 ? (
                                device.services.map(service => (
                                    <ServiceStatus key={service.name} service={service} />
                                ))
                             ) : (
                                <p className="text-xs text-gray-500 italic">No running services found.</p>
                             )}
                        </div>
                    </Card>
                     <Card className="p-3 !scale-100 hover:!scale-100">
                        <h4 className="text-sm font-semibold text-primary mb-2">Device Logs</h4>
                        {device.logs && device.logs.length > 0 ? <MiniLog logs={device.logs} /> : <p className="text-xs text-gray-500">No logs available.</p>}
                    </Card>
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

    const FilterButton: React.FC<{ status: StatusFilter; label: string; count: number }> = ({ status, label, count }) => {
        const isActive = filter === status;
        return (
            <button
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
                {label} ({count})
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
                    <FilterButton status="all" label="All" count={devices.length} />
                    <FilterButton status="online" label="Online" count={devices.filter(d => d.status === 'online').length} />
                    <FilterButton status="offline" label="Offline" count={devices.filter(d => d.status === 'offline').length} />
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
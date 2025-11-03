
export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
}

export interface InterfaceTraffic {
  name: string;
  rx: number;
  tx: number;
}

export interface HistoricalDataPoint {
  time: string;
  rx: number;
  tx: number;
}

export interface MikrotikData {
  identity: string;
  uptime: string;
  cpuLoad: number;
  memoryUsage: number;
  totalMemory: number;
  diskUsage: number;
  totalDisk: number;
  activeUsers: number;
  logEntries: LogEntry[];
  traffic: InterfaceTraffic[];
}

export interface DeviceService {
    name: string;
    port: number;
    status: 'running' | 'stopped';
}

export interface MikroTikDevice {
  id: string;
  name: string;
  ipAddress: string;
  status: 'online' | 'offline';
  cpuLoad: number;
  memoryUsage: number;
  uptime: string;
  interfaces?: InterfaceTraffic[];
  services?: DeviceService[];
  logs?: LogEntry[];
}

export interface AiAnalysisResult {
  summary: string;
  recommendations: string[];
  preventiveActions: {
    action: string;
    risk: 'Low' | 'Medium' | 'High';
  }[];
}
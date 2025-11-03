
import { MikrotikData, LogEntry, HistoricalDataPoint, MikroTikDevice, DeviceService, InterfaceTraffic } from '../types';

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max));

const generateLog = (deviceName?: string): LogEntry => {
    const levels: Array<'info' | 'warning' | 'critical'> = ['info', 'info', 'info', 'info', 'warning', 'critical'];
    const messages = {
        info: [`user admin logged in to ${deviceName || 'router'}`, 'ether1 link down', 'ether1 link up', 'System rebooted'],
        warning: ['firewall rule matched: drop shady traffic', 'high CPU usage detected', 'potential port scan from 1.2.3.4'],
        critical: ['login failure for user root', 'router configuration changed', 'system failed to update'],
    };
    const level = levels[getRandomInt(0, levels.length)];
    return {
        timestamp: new Date().toLocaleTimeString(),
        level,
        message: messages[level][getRandomInt(0, messages[level].length)],
    };
};

let previousLogs: LogEntry[] = Array.from({ length: 5 }, () => generateLog('MikroTik-HQ-Router'));

const generateData = (): MikrotikData => {
    const newLog = generateLog('MikroTik-HQ-Router');
    previousLogs.push(newLog);
    if (previousLogs.length > 20) {
        previousLogs.shift();
    }

    return {
        identity: 'MikroTik-HQ-Router',
        uptime: `${getRandomInt(1, 30)}d ${getRandomInt(0, 23)}h ${getRandomInt(0, 59)}m`,
        cpuLoad: parseFloat(getRandom(5, 85).toFixed(1)),
        memoryUsage: parseFloat(getRandom(25, 90).toFixed(1)),
        totalMemory: 2, // GB
        diskUsage: parseFloat(getRandom(10, 60).toFixed(1)),
        totalDisk: 0.5, // GB
        activeUsers: getRandomInt(5, 50),
        logEntries: [...previousLogs],
        traffic: [
            { name: 'ether1-WAN', rx: getRandomInt(50, 500), tx: getRandomInt(10, 100) },
            { name: 'ether2-LAN', rx: getRandomInt(100, 800), tx: getRandomInt(200, 900) },
            { name: 'wlan1-WiFi', rx: getRandomInt(50, 300), tx: getRandomInt(80, 400) },
            { name: 'VPN-Office', rx: getRandomInt(5, 50), tx: getRandomInt(5, 50) },
        ],
    };
};

const mockDevices: Omit<MikroTikDevice, 'cpuLoad' | 'memoryUsage' | 'uptime'>[] = [
    { id: 'dev1', name: 'HQ-Router-01', ipAddress: '192.168.88.1', status: 'online' },
    { id: 'dev2', name: 'Branch-Office-VPN', ipAddress: '10.10.5.1', status: 'online' },
    { id: 'dev3', name: 'Warehouse-AP-Controller', ipAddress: '192.168.100.1', status: 'offline' },
    { id: 'dev4', name: 'Backup-Gateway', ipAddress: '192.168.88.2', status: 'online' },
];

const generateDeviceDetails = (device: Omit<MikroTikDevice, 'cpuLoad' | 'memoryUsage' | 'uptime'>): Partial<MikroTikDevice> => {
    if (device.status === 'offline') {
        return {
            cpuLoad: 0,
            memoryUsage: 0,
            uptime: '0d 0h 0m',
            interfaces: [],
            services: [],
            logs: [
                { timestamp: new Date().toLocaleTimeString(), level: 'critical', message: 'Device is offline' }
            ]
        };
    }

    const interfaces: InterfaceTraffic[] = [
        { name: 'ether1', rx: getRandomInt(50, 500), tx: getRandomInt(10, 100) },
        { name: 'ether2', rx: getRandomInt(100, 800), tx: getRandomInt(200, 900) },
        { name: 'wlan1', rx: getRandomInt(50, 300), tx: getRandomInt(80, 400) },
    ];

    const allServices: DeviceService[] = [
        { name: 'www', port: 80, status: 'running' },
        { name: 'ssh', port: 22, status: 'running' },
        { name: 'api', port: 8728, status: Math.random() > 0.5 ? 'running' : 'stopped' },
        { name: 'winbox', port: 8291, status: 'running' },
        { name: 'dns', port: 53, status: 'running' },
    ];
    
    const services = allServices.filter(() => Math.random() > 0.3);

    return {
        cpuLoad: parseFloat(getRandom(5, 95).toFixed(1)),
        memoryUsage: parseFloat(getRandom(20, 90).toFixed(1)),
        uptime: `${getRandomInt(1, 45)}d ${getRandomInt(0, 23)}h ${getRandomInt(0, 59)}m`,
        status: Math.random() > 0.95 ? 'offline' : 'online',
        interfaces,
        services,
        logs: Array.from({ length: getRandomInt(3, 8) }, () => generateLog(device.name))
    }
};

const generateDeviceListData = (): MikroTikDevice[] => {
    return mockDevices.map(device => {
        return {
            ...device,
            ...generateDeviceDetails(device),
        } as MikroTikDevice;
    });
};


const generateHistoricalData = (period: '24h' | '7d'): HistoricalDataPoint[] => {
    const data: HistoricalDataPoint[] = [];
    const now = new Date();

    if (period === '24h') {
        for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            const hour = time.getHours();
            // Simulate daily traffic pattern (lower at night, peak during day/evening)
            const peakFactor = Math.sin((hour - 8) * (Math.PI / 16)) * 0.4 + 0.6; // Peak around 4 PM
            data.push({
                time: `${String(hour).padStart(2, '0')}:00`,
                rx: Math.round(getRandom(200, 450) * peakFactor),
                tx: Math.round(getRandom(50, 100) * peakFactor),
            });
        }
    } else if (period === '7d') {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const dayOfWeek = date.getDay();
            // Simulate weekly traffic (higher on weekends)
            const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.25 : 1.0;
            data.push({
                time: days[dayOfWeek],
                rx: Math.round(getRandom(150, 400) * weekendFactor),
                tx: Math.round(getRandom(40, 90) * weekendFactor),
            });
        }
    }
    return data;
};

export const mockMikrotikService = {
  fetchData: (): Promise<MikrotikData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateData());
      }, getRandomInt(200, 800));
    });
  },
  fetchDeviceList: (): Promise<MikroTikDevice[]> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(generateDeviceListData());
          }, getRandomInt(150, 600));
      });
  },
  fetchHistoricalData: (period: '24h' | '7d'): Promise<HistoricalDataPoint[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateHistoricalData(period));
      }, getRandomInt(300, 900));
    });
  },
};

import React, { useState, useEffect } from 'react';
import { MikrotikData, AiAnalysisResult, HistoricalDataPoint, MikroTikDevice } from '../types';
import { mockMikrotikService } from '../services/mikrotikService';
import { analyzeMikrotikData } from '../services/geminiService';
import MetricCard from './MetricCard';
import TrafficChart from './TrafficChart';
import LogViewer from './LogViewer';
import AiAnalysis from './AiAnalysis';
import HistoricalTrafficChart from './HistoricalTrafficChart';
import DeviceList from './DeviceList';
import { CpuIcon, MemoryIcon, UsersIcon, StorageIcon, StatusOnlineIcon, ClockIcon, CogIcon } from './icons';

interface DashboardProps {
  isConnected: boolean;
  onConfigureClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isConnected, onConfigureClick }) => {
  const [data, setData] = useState<MikrotikData | null>(null);
  const [devices, setDevices] = useState<MikroTikDevice[]>([]);
  const [historicalData24h, setHistoricalData24h] = useState<HistoricalDataPoint[]>([]);
  const [historicalData7d, setHistoricalData7d] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    if (!isConnected) return;
    try {
      if (!data) setLoading(true); // Only show initial loading spinner
      const [mainData, deviceList] = await Promise.all([
        mockMikrotikService.fetchData(),
        mockMikrotikService.fetchDeviceList()
      ]);
      setData(mainData);
      setDevices(deviceList);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch MikroTik data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistorical = async () => {
    if (!isConnected) return;
    try {
        const [data24h, data7d] = await Promise.all([
            mockMikrotikService.fetchHistoricalData('24h'),
            mockMikrotikService.fetchHistoricalData('7d')
        ]);
        setHistoricalData24h(data24h);
        setHistoricalData7d(data7d);
    } catch (err) {
        console.error('Failed to fetch historical data:', err);
    }
  };

  useEffect(() => {
    // FIX: Changed NodeJS.Timeout to number for browser compatibility.
    let interval: number | undefined;
    if (isConnected) {
      fetchData();
      fetchHistorical();
      interval = window.setInterval(fetchData, 30000);
    } else {
      // Clear data when disconnected
      setData(null);
      setDevices([]);
      setHistoricalData24h([]);
      setHistoricalData7d([]);
      setLoading(true); // Reset loading state
    }
    
    return () => {
      if(interval) clearInterval(interval);
    };
  }, [isConnected]);

  const handleAiAnalysis = async () => {
    if (!data) return;
    setIsAnalyzing(true);
    setAiResult(null);
    try {
      const result = await analyzeMikrotikData(data);
      setAiResult(result);
    } catch (err) {
      console.error("AI analysis failed:", err);
      setAiResult({
        summary: "Analysis Failed",
        recommendations: ["Could not connect to the AI service. Please check your API key and network connection."],
        preventiveActions: [],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-center bg-gray-800 rounded-lg border-2 border-dashed border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-2">Not Connected to a Router</h2>
        <p className="text-gray-400 mb-6 max-w-md">Please configure your MikroTik API credentials to start monitoring your device.</p>
        <button
          onClick={onConfigureClick}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary"
        >
          <CogIcon className="h-5 w-5 mr-2" />
          Go to Settings
        </button>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <StatusOnlineIcon className="h-12 w-12 text-primary animate-pulse" />
        <span className="ml-4 text-xl">Connecting to Router...</span>
      </div>
    );
  }

  if (error && !data) {
    return <div className="text-center text-danger text-xl p-8">{error}</div>;
  }
  
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">{data.identity}</h2>
        {lastUpdated && <p className="text-sm text-gray-400">Last updated: {lastUpdated.toLocaleTimeString()}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <MetricCard title="CPU Load" value={`${data.cpuLoad}%`} icon={<CpuIcon />} status={data.cpuLoad > 80 ? 'danger' : data.cpuLoad > 50 ? 'warning' : 'success'} />
        <MetricCard title="Memory" value={`${data.memoryUsage}%`} subtitle={`${(data.totalMemory * (data.memoryUsage / 100)).toFixed(1)} / ${data.totalMemory} GB`} icon={<MemoryIcon />} status={data.memoryUsage > 85 ? 'danger' : data.memoryUsage > 60 ? 'warning' : 'success'} />
        <MetricCard title="Disk" value={`${data.diskUsage}%`} subtitle={`${(data.totalDisk * (data.diskUsage / 100)).toFixed(1)} / ${data.totalDisk} GB`} icon={<StorageIcon />} status={data.diskUsage > 90 ? 'danger' : data.diskUsage > 75 ? 'warning' : 'success'} />
        <MetricCard title="Active Users" value={data.activeUsers.toString()} icon={<UsersIcon />} />
        <MetricCard title="Uptime" value={data.uptime} icon={<ClockIcon />} />
        <MetricCard title="Status" value="Online" icon={<StatusOnlineIcon />} status="success" />
      </div>

      <DeviceList devices={devices} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart traffic={data.traffic} />
        </div>
        <div>
          <LogViewer logs={data.logEntries} />
        </div>
      </div>
      
      {historicalData24h.length > 0 && historicalData7d.length > 0 && (
        <HistoricalTrafficChart data24h={historicalData24h} data7d={historicalData7d} />
      )}
      
      <AiAnalysis 
        onAnalyze={handleAiAnalysis}
        isAnalyzing={isAnalyzing}
        result={aiResult}
      />
    </div>
  );
};

export default Dashboard;

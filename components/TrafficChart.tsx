import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { InterfaceTraffic } from '../types';
import { ExclamationTriangleIcon } from './icons';

interface TrafficChartProps {
  traffic: InterfaceTraffic[];
}

const TrafficChart: React.FC<TrafficChartProps> = ({ traffic }) => {
  const [liveData, setLiveData] = useState<InterfaceTraffic[]>(traffic);
  const [rxThreshold, setRxThreshold] = useState(450);
  const [txThreshold, setTxThreshold] = useState(350);
  const [isRxBreached, setIsRxBreached] = useState(false);
  const [isTxBreached, setIsTxBreached] = useState(false);

  useEffect(() => {
    let rxBreachedInInterval = false;
    let txBreachedInInterval = false;

    // Check initial data
    traffic.forEach(item => {
      if (item.rx > rxThreshold) rxBreachedInInterval = true;
      if (item.tx > txThreshold) txBreachedInInterval = true;
    });
    setIsRxBreached(rxBreachedInInterval);
    setIsTxBreached(txBreachedInInterval);
    
    setLiveData(traffic);

    const interval = setInterval(() => {
      rxBreachedInInterval = false;
      txBreachedInInterval = false;
      
      const updatedData = traffic.map(originalItem => {
        const fluctuationPercent = 0.2;
        const rxFluctuation = (Math.random() - 0.5) * 2 * (originalItem.rx * fluctuationPercent);
        const txFluctuation = (Math.random() - 0.5) * 2 * (originalItem.tx * fluctuationPercent);
        
        const newRx = Math.max(0, Math.round(originalItem.rx + rxFluctuation));
        const newTx = Math.max(0, Math.round(originalItem.tx + txFluctuation));

        if (newRx > rxThreshold) rxBreachedInInterval = true;
        if (newTx > txThreshold) txBreachedInInterval = true;

        return { ...originalItem, rx: newRx, tx: newTx };
      });

      setLiveData(updatedData);
      setIsRxBreached(rxBreachedInInterval);
      setIsTxBreached(txBreachedInInterval);
    }, 2000);

    return () => clearInterval(interval);
  }, [traffic, rxThreshold, txThreshold]);

  const formatYAxis = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)} Gbps`;
    return `${value} Mbps`;
  };
  
  const isBreached = isRxBreached || isTxBreached;
  const cardClassName = `p-4 h-96 flex flex-col transition-all duration-300 ${isBreached ? 'border-danger animate-pulse-border' : 'border-gray-700'}`;

  return (
    <Card className={cardClassName}>
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <h3 className="flex items-center text-lg font-semibold text-white">
          Live Traffic
          {isBreached && <ExclamationTriangleIcon className="h-5 w-5 ml-2 text-danger animate-pulse" />}
        </h3>
        <div className="flex items-center space-x-2 text-sm">
            <label htmlFor="rx-threshold" className="text-gray-400 font-medium">DL Threshold:</label>
            <input
                id="rx-threshold"
                type="number"
                value={rxThreshold}
                onChange={(e) => setRxThreshold(Number(e.target.value))}
                className="w-16 bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
            <span className="text-gray-500">Mbps</span>
            <label htmlFor="tx-threshold" className="text-gray-400 font-medium ml-2">UL Threshold:</label>
            <input
                id="tx-threshold"
                type="number"
                value={txThreshold}
                onChange={(e) => setTxThreshold(Number(e.target.value))}
                className="w-16 bg-gray-900 border border-gray-600 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
             <span className="text-gray-500">Mbps</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={liveData} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #363636' }}
            labelStyle={{ color: '#FFFFFF' }}
            formatter={(value: number) => [`${value} Mbps`, '']}
          />
          <Legend wrapperStyle={{ bottom: 0 }} />
          <Line type="monotone" dataKey="rx" name="Download" stroke={isRxBreached ? '#FF4757' : '#00A8FF'} strokeWidth={isRxBreached ? 3 : 2} dot={{ r: 4 }} activeDot={{ r: 8 }} animationDuration={1000} />
          <Line type="monotone" dataKey="tx" name="Upload" stroke={isTxBreached ? '#FF4757' : '#00C7B1'} strokeWidth={isTxBreached ? 3 : 2} dot={{ r: 4 }} activeDot={{ r: 8 }} animationDuration={1000} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrafficChart;
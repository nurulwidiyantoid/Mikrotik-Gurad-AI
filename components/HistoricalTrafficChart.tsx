
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { HistoricalDataPoint } from '../types';
import { ChartBarSquareIcon } from './icons';

interface HistoricalTrafficChartProps {
  data24h: HistoricalDataPoint[];
  data7d: HistoricalDataPoint[];
}

type Period = '24h' | '7d';

const HistoricalTrafficChart: React.FC<HistoricalTrafficChartProps> = ({ data24h, data7d }) => {
  const [period, setPeriod] = useState<Period>('24h');

  const data = period === '24h' ? data24h : data7d;
  const yAxisLabel = period === '24h' ? 'Mbps' : 'Avg Mbps';

  const formatYAxis = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)} Gbps`;
    return `${value} ${yAxisLabel}`;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          return (
              <div className="bg-gray-800/80 backdrop-blur-sm p-3 border border-gray-600 rounded-lg shadow-lg">
                  <p className="label text-sm text-gray-300">{`${period === '24h' ? 'Time' : 'Day'}: ${label}`}</p>
                  <p className="intro" style={{ color: '#00A8FF' }}>{`Download : ${payload[0].value} ${yAxisLabel}`}</p>
                  <p className="intro" style={{ color: '#00C7B1' }}>{`Upload : ${payload[1].value} ${yAxisLabel}`}</p>
              </div>
          );
      }
      return null;
  };

  return (
    <Card className="p-4 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
            <ChartBarSquareIcon className="h-6 w-6 mr-2 text-primary"/>
            Historical Traffic
        </h3>
        <div className="flex items-center bg-gray-700/50 rounded-lg p-1">
          <button
            onClick={() => setPeriod('24h')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${period === '24h' ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setPeriod('7d')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${period === '7d' ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            7 Days
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <defs>
              <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A8FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00A8FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C7B1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00C7B1" stopOpacity={0}/>
              </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF', fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="rx" name="Download" stroke="#00A8FF" fillOpacity={1} fill="url(#colorRx)" strokeWidth={2} />
          <Area type="monotone" dataKey="tx" name="Upload" stroke="#00C7B1" fillOpacity={1} fill="url(#colorTx)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default HistoricalTrafficChart;

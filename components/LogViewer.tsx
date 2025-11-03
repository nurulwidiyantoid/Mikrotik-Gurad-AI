
import React from 'react';
import { LogEntry } from '../types';
import Card from './Card';

interface LogViewerProps {
  logs: LogEntry[];
}

const levelClasses = {
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  critical: 'text-red-500',
};

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-700 text-white">System Logs</h3>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {logs.slice().reverse().map((log, index) => (
          <div key={index} className="text-sm font-mono leading-tight">
            <span className="text-gray-500 mr-2">{log.timestamp}</span>
            <span className={`font-bold mr-2 ${levelClasses[log.level]}`}>[{log.level.toUpperCase()}]</span>
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LogViewer;

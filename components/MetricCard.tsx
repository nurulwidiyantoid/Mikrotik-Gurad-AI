
import React from 'react';
import Card from './Card';

type Status = 'success' | 'warning' | 'danger';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  status?: Status;
}

const statusClasses: Record<Status, string> = {
  success: 'text-secondary',
  warning: 'text-warning',
  danger: 'text-danger',
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, status }) => {
  return (
    <Card className="flex flex-col justify-between p-4">
      <div className="flex items-center justify-between text-gray-400">
        <span className="text-sm font-medium">{title}</span>
        <div className={`h-6 w-6 ${status ? statusClasses[status] : 'text-primary'}`}>{icon}</div>
      </div>
      <div>
        <h3 className={`text-3xl font-bold ${status ? statusClasses[status] : 'text-white'}`}>{value}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </Card>
  );
};

export default MetricCard;

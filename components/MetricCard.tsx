
import React from 'react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  unit?: string;
  isStatus?: boolean;
}

const RadialProgress: React.FC<{ value: number }> = ({ value }) => {
    const size = 56;
    const strokeWidth = 5;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    const getColor = () => {
        if (value > 85) return 'text-danger';
        if (value > 60) return 'text-warning';
        return 'text-primary';
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="absolute inset-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                />
                <circle
                    className={`transition-all duration-500 ${getColor()}`}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center font-bold text-sm ${getColor()}`}>
                {`${Math.round(value)}%`}
            </div>
        </div>
    );
};


const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, unit, isStatus = false }) => {
    const isNumeric = typeof value === 'number';

    return (
        <Card className="flex flex-col justify-between p-4 min-h-[120px]">
            <div className="flex items-start justify-between text-gray-400">
                <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 text-primary">{icon}</div>
                    <span className="text-sm font-semibold text-gray-300">{title}</span>
                </div>
            </div>
            
            {isStatus ? (
                 <div className="text-right">
                    <h3 className="text-2xl font-bold text-white">{value}</h3>
                 </div>
            ) : isNumeric ? (
                <div className="flex items-end justify-between mt-2">
                    <div>
                        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                    </div>
                    <RadialProgress value={value} />
                </div>
            ) : (
                <div className="text-right">
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
            )}
        </Card>
    );
};

export default MetricCard;
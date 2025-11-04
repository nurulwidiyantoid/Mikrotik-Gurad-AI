
import React from 'react';
import Card from './Card';
import { AiAnalysisResult } from '../types';
import { BrainCircuitIcon, ChevronRightIcon, ShieldAlertIcon, ZapIcon, LightbulbIcon, SparklesIcon } from './icons';

interface AiAnalysisProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  result: AiAnalysisResult | null;
}

const RiskBadge: React.FC<{ risk: 'Low' | 'Medium' | 'High' }> = ({ risk }) => {
    const riskClasses = {
        Low: 'bg-green-500/20 text-green-400 border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        High: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${riskClasses[risk]}`}>{risk}</span>;
};

const AnalysisResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <div className={`bg-gray-800/50 p-4 rounded-lg border border-gray-700 h-full ${className}`}>
        <h4 className="flex items-center font-semibold text-lg">{icon} {title}</h4>
        <div className="mt-3 text-sm text-gray-300">
            {children}
        </div>
    </div>
);

const AiAnalysis: React.FC<AiAnalysisProps> = ({ onAnalyze, isAnalyzing, result }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold text-white">AI Guardian Analysis</h3>
        </div>
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
             <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Run AI Analysis
            </>
          )}
        </button>
      </div>
      
      {isAnalyzing && !result && (
        <div className="mt-6 text-center text-gray-400 animate-pulse-bg rounded-lg p-8 bg-gray-800/50 border border-primary/20">
            <p className="font-semibold text-lg">The AI Guardian is examining your router's data...</p>
            <p className="text-sm mt-2">Checking for performance bottlenecks, security vulnerabilities, and anomalies.</p>
        </div>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <AnalysisResultCard 
            title="Executive Summary" 
            icon={<SparklesIcon className="h-5 w-5 mr-2 text-primary" />}
            className="lg:col-span-3"
          >
            <p>{result.summary}</p>
          </AnalysisResultCard>

          <AnalysisResultCard 
            title="Recommendations" 
            icon={<LightbulbIcon className="h-5 w-5 mr-2 text-secondary" />}
            className="lg:col-span-2"
          >
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRightIcon className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5 mr-2" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </AnalysisResultCard>
          
          <AnalysisResultCard 
            title="Preventive Actions" 
            icon={<ShieldAlertIcon className="h-5 w-5 mr-2 text-warning" />}
          >
            <ul className="space-y-3">
              {result.preventiveActions.map((act, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-start">
                      <ZapIcon className="h-4 w-4 text-warning flex-shrink-0 mt-0.5 mr-2" />
                      <span>{act.action}</span>
                    </div>
                  <RiskBadge risk={act.risk} />
                </li>
              ))}
            </ul>
          </AnalysisResultCard>
        </div>
      )}
      {!isAnalyzing && !result && (
        <div className="mt-6 text-center text-gray-500 bg-gray-800/30 p-8 rounded-lg">
          <p>Click "Run AI Analysis" to get proactive insights and recommendations for your network.</p>
        </div>
      )}
    </Card>
  );
};

export default AiAnalysis;
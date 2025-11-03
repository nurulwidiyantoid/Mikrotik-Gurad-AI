
import React from 'react';

export const CpuIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M10 12h4v4h-4v-4zm-2 2h-2v-4h2v4z" />
  </svg>
);

export const MemoryIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18h14V3H5zm2 2h10v14H7V5zm2 2v2h6V7H9zm0 4v2h6v-2H9zm0 4v2h6v-2H9z" />
  </svg>
);

export const UsersIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const StorageIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

export const NetworkIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a4.5 4.5 0 01-1.258-.236l-3.235-1.04a2.25 2.25 0 01-1.425-2.733l.422-1.303a2.25 2.25 0 012.733-1.425l3.235 1.04a4.5 4.5 0 011.258.236m0 0a4.5 4.5 0 011.258.236l3.235 1.04a2.25 2.25 0 011.425 2.733l-.422 1.303a2.25 2.25 0 01-2.733 1.425l-3.235-1.04a4.5 4.5 0 01-1.258-.236m0 0a4.5 4.5 0 00-1.258-.236l-3.235-1.04a2.25 2.25 0 00-2.733 1.425l-.422 1.303a2.25 2.25 0 001.425 2.733l3.235 1.04a4.5 4.5 0 001.258.236m-1.258-.236a4.5 4.5 0 016.331 6.331" />
  </svg>
);

export const BrainCircuitIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-4.32 19.14"/><path d="M12 2a10 10 0 0 1 4.32 19.14"/>
    <path d="M8 12a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2z"/>
    <path d="M16 12a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2z"/>
    <path d="M12 7a1 1 0 0 0-1-1V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1z"/>
    <path d="M12 17a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1z"/>
    <path d="M8.5 7.5a4.5 4.5 0 0 1 7 0"/><path d="M8.5 16.5a4.5 4.5 0 0 0 7 0"/>
  </svg>
);

export const ClockIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StatusOnlineIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const LightbulbIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 0 0-3 3v2.25M12 12.75a3 3 0 0 1 3 3v2.25m-3-3a3 3 0 0 0-3-3m3 3a3 3 0 0 1 3-3m-9.75 3.75H4.5m4.5 0H6.375m3.375 0h1.875m-3.375 0c.264 0 .523.018.78.053m0 0c.26.035.52.053.78.053m0 0h1.875m-1.875 0c-.26 0-.52-.018-.78-.053m-2.625 0c-.257-.035-.517-.053-.78-.053m0 0H6.375m0 0H4.5m14.25-3.75h1.875m-1.875 0h-1.875m3.75 0c-.264 0-.523-.018-.78-.053m0 0c-.26-.035-.52-.053-.78-.053m0 0h-1.875m1.875 0c.26 0 .52.018.78.053m2.625 0c.257.035.517.053.78.053m0 0h1.875m-1.875 0h-1.875m-3.75 0h-1.875m9 3.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const ShieldAlertIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m6-3-6 6-6-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-5.13-2.3-8.25-5.918-8.25-10.5C3.75 6.31 7.418 3 12 3s8.25 3.31 8.25 8.25c0 4.582-3.12 8.2-8.25 10.5Z" />
    </svg>
);

export const ZapIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 10.5l-2.846.813a4.5 4.5 0 0 1-3.09 3.09L11.5 15.25l-.813 2.846a4.5 4.5 0 0 1 3.09 3.09L15.75 22.5l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L22.5 17.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09Z" />
  </svg>
);

export const ChartBarSquareIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V5.25A2.25 2.25 0 0 0 18 3H6A2.25 2.25 0 0 0 3.75 5.25v12.75A2.25 2.25 0 0 0 6 20.25Z" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);

export const ServerStackIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

export const CogIcon: React.FC<{className?: string}> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.008 1.11-1.226a11.97 11.97 0 0 1 2.59 0c.55.218 1.02.684 1.11 1.226.09.542-.056 1.12-.34 1.606a11.97 11.97 0 0 1-2.59 0c-.284-.486-.43-1.064-.34-1.606ZM12 6.848a11.97 11.97 0 0 0-2.59 0c-.284-.486-.43-1.064-.34-1.606a1.99 1.99 0 0 1 1.11-1.226 11.97 11.97 0 0 1 2.59 0 1.99 1.99 0 0 1 1.11 1.226c.09.542-.056 1.12-.34 1.606a11.97 11.97 0 0 0-2.59 0Zm0 13.202a11.97 11.97 0 0 1-2.59 0c-.55-.218-1.02-.684-1.11-1.226-.09-.542.056-1.12.34-1.606a11.97 11.97 0 0 1 2.59 0c.284.486.43 1.064.34 1.606.09.542-.56 1.008-1.11 1.226Zm.34-1.606a11.97 11.97 0 0 0-2.59 0c-.284.486-.43 1.064-.34 1.606a1.99 1.99 0 0 0 1.11 1.226 11.97 11.97 0 0 0 2.59 0 1.99 1.99 0 0 0 1.11-1.226c-.09-.542.056-1.12.34-1.606a11.97 11.97 0 0 0-2.59 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 3.167a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm0 13.166a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" />
    </svg>
);

export const XMarkIcon: React.FC<{className?: string}> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

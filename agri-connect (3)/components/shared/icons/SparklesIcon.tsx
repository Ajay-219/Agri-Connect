import React from 'react';

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 11.414l-2.293-2.293a1 1 0 010-1.414L11 5z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5l2.293 2.293a1 1 0 010 1.414L11 11.414l-2.293-2.293a1 1 0 010-1.414L11 5zM19 13l-2.293-2.293a1 1 0 00-1.414 0L13 13.414l2.293 2.293a1 1 0 001.414 0L19 13z"></path>
    </svg>
);
import React from 'react';

interface SpinnerProps {
  text?: string;
  subtext?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  text = "Loading", 
  subtext = "Please wait..." 
}) => {
  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full animate-in fade-in zoom-in duration-500">
      
      {/* Loading Animation Ring */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 border-[6px] border-white/5 rounded-full" />
        <div className="absolute inset-0 border-[6px] border-indigo-500 rounded-full border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800">{text}</h2>
        <p className="text-sm text-zinc-600 text-center max-w-[250px] leading-relaxed">
          {subtext}
        </p>
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
        <div 
          className="h-full bg-indigo-500 rounded-full w-full origin-left" 
          style={{ animation: "progress-fill 2.5s ease-out forwards" }} 
        />
      </div>
      <style>{`
        @keyframes progress-fill {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;

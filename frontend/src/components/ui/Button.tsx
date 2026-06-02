import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  loading = false, 
  loadingText = "Loading...", 
  className = "", 
  disabled, 
  ...props 
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`font-semibold text-base py-4 px-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 bg-zinc-200 text-black enabled:hover:bg-zinc-300 disabled:cursor-not-allowed border border-black disabled:border-white/5 flex items-center justify-center gap-3 w-full ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-zinc-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

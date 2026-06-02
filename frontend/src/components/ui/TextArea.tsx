import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  loading?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ label, loading = false, id, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-600 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          disabled={loading || props.disabled}
          className={`w-full bg-zinc-300 border border-zinc-600 p-5 text-zinc-800 placeholder-zinc-600 focus:outline-none transition-all duration-300 min-h-[180px] disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <div className="w-8 h-8 border-4 border-black/10 border-t-black/60 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;

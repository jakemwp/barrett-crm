import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          className={cn(
            "input",
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-xs text-error-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
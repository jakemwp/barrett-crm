import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
}

function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-gray-500', className)}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
import React from "react";
import classNames from "classnames";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  className,
  children,
  variant = "default",
  padding = "md",
  shadow = true,
  hoverEffect = false,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-white dark:bg-gray-800",
    bordered: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  return (
    <div
      className={classNames(
        "rounded-lg overflow-hidden transition-all",
        variantClasses[variant],
        paddingClasses[padding],
        shadow && "shadow-md dark:shadow-gray-900/20",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  className,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={classNames("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={classNames("text-lg font-semibold text-gray-900 dark:text-white", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={classNames("", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={classNames("mt-4 flex items-center pt-3", className)}
      {...props}
    >
      {children}
    </div>
  );
} 
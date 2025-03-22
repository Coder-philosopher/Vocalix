import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import classNames from "classnames";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ 
  className,
  label,
  showValue = false,
  valueFormatter = (value) => `${value}`,
  ...props
}, ref) => {
  const value = props.value || props.defaultValue || [0];
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
          {showValue && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {valueFormatter(value[0])}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={classNames(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-blue-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-blue-600/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500/50 dark:bg-gray-800"
        />
      </SliderPrimitive.Root>
    </div>
  );
});

Slider.displayName = "Slider"; 

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: "sm" | "md" | "lg"
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "md", ...props }, ref) => {
  const sizeStyles = {
    sm: {
      root: "h-[20px] w-[36px]",
      thumb: "h-4 w-4 data-[state=checked]:translate-x-4",
    },
    md: {
      root: "h-[24px] w-[44px]",
      thumb: "h-5 w-5 data-[state=checked]:translate-x-5",
    },
    lg: {
      root: "h-[30px] w-[56px]",
      thumb: "h-7 w-7 data-[state=checked]:translate-x-[26px]",
    },
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        sizeStyles[size].root,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
          sizeStyles[size].thumb
        )}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

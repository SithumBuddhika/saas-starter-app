// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }

import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-11 w-full min-w-0 rounded-xl px-4 py-2",
          "text-base md:text-sm",
          "bg-white/5 border border-white/10 backdrop-blur",
          "placeholder:text-muted-foreground/80",
          "shadow-[0_0_0_1px_rgba(255,255,255,.06)]",
          "transition-all duration-200 outline-none",
          // emerald/blue focus glow
          "focus-visible:border-emerald-400/50",
          "focus-visible:ring-2 focus-visible:ring-emerald-400/30",
          "focus-visible:shadow-[0_0_0_4px_rgba(16,185,129,.12),0_0_0_1px_rgba(59,130,246,.10)]",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          // file input support
          "file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // invalid
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Input };

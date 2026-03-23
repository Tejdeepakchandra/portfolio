import { cn } from "../../lib/utils"

function Toast({ className, ...props }) {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export { Toast }

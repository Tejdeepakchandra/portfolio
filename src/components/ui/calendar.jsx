import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

const Calendar = React.forwardRef(({ className, showOutsideDays = true, ...props }, ref) => (
  <div ref={ref} className={cn("p-3", className)} {...props} />
))
Calendar.displayName = "Calendar"

export { Calendar }

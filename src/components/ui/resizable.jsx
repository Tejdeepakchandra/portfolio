import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "../../lib/utils"

const Resizable = ResizablePrimitive.PanelGroup

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center select-none bg-border after:absolute after:inset-y-10 after:left-1/2 after:w-1 after:-translate-x-1/2 after:translate-y-0 after:bg-border hover:after:bg-border data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-px data-[panel-group-direction=vertical]:after:inset-x-10 data-[panel-group-direction=vertical]:after:inset-y-auto",
      withHandle && "w-4 px-1.5 data-[panel-group-direction=vertical]:h-4 data-[panel-group-direction=vertical]:py-1.5",
      className
    )}
    {...props}
  />
)
ResizableHandle.displayName = "ResizableHandle"

export { Resizable, ResizablePanel, ResizableHandle }

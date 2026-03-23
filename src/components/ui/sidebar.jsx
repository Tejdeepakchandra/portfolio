import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cva } from "class-variance-authority"
import { ChevronRight, MenuIcon, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "4rem"

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarContext = React.createContext(null)

const SidebarProvider = ({ defaultOpen = true, open: openProp, onOpenChange, className, children, ...props }) => {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp !== undefined ? openProp : openState

  const toggleSidebar = React.useCallback(() => {
    const newState = !open
    setOpenState(newState)
    onOpenChange?.(newState)

    document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [open, onOpenChange])

  const value = React.useMemo(
    () => ({
      open,
      setOpen: setOpenState,
      toggleSidebar,
      isMobile: false,
      isLoading: false,
    }),
    [open, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn("flex h-screen w-full", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { open, isMobile, state } = useSidebar()

  const isDesktop = !isMobile
  const isCollapsed = open === false

  return (
    <ResizablePrimitive.Panel
      ref={ref}
      onCollapse={() => {
        useSidebar().setOpen(false)
      }}
      onExpand={() => {
        useSidebar().setOpen(true)
      }}
      collapsible={collapsible}
      className={cn(
        "group relative flex flex-col bg-background text-foreground transition-all duration-300",
        isCollapsed ? "w-14" : `w-[${SIDEBAR_WIDTH}]`,
        className
      )}
      {...props}
    >
      {children}
    </ResizablePrimitive.Panel>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <MenuIcon className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} data-sidebar="rail" aria-label="Toggle Sidebar" tabIndex={-1} className={cn("group/rail absolute inset-y-0 z-20 hidden w-1 bg-transparent p-0 transition-all ease-linear hover:bg-border active:bg-border lg:flex", className)} {...props} />
))
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => (
  <main ref={ref} className={cn("relative flex-1 overflow-auto bg-background", className)} {...props} />
))
SidebarInset.displayName = "SidebarInset"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 px-4 py-2", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 border-t px-4 py-2", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn("mx-2 my-2 border-border", className)} {...props} />
))
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 overflow-auto px-2 py-4", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("overflow-hidden px-2 py-6", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground/70 group-data-[collapsible=icon]:hidden", className)} {...props} />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef(({ asChild = false, isActive = false, size = "default", className, ...props }, ref) => {
  const Comp = asChild ? "a" : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "peer/menu-button relative flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm outline-none transition-[width,height] hover:bg-accent focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 active:bg-accent aria-current='page':bg-accent aria-current='page':font-semibold",
        size === "sm" && "h-7 text-xs",
        size === "default" && "h-9",
        size === "lg" && "h-12 text-base group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? "a" : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1/2 flex aspect-square w-5 -translate-y-1/2 items-center justify-center rounded-md p-0 text-muted-foreground outline-none transition-all hover:bg-accent hover:text-foreground focus-visible:ring-2 peer-hover/menu-button:text-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-foreground",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[size=lg]/menu-button:right-2",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn("absolute right-1 flex items-center rounded-md px-1 text-xs font-medium text-foreground pointer-events-none", className)}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn("border-l border-border px-2 py-0.5 group-data-[collapsible=icon]:hidden", className)}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => (
  <li ref={ref} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? "a" : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "relative flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm outline-none transition-[width,height,padding] hover:bg-accent focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-current='page':bg-accent aria-current='page':font-semibold",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
}

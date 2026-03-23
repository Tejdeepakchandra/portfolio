import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "vertical" ? "y" : "x",
      },
      plugins
    )

    React.useEffect(() => {
      setApi?.(api)
    }, [api, setApi])

    return (
      <CarouselContext.Provider value={{ carouselRef, api, orientation }}>
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex", orientation === "vertical" ? "-my-4 flex-col" : "-ml-4 flex-row", className)} {...props} />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "vertical" ? "pt-4" : "pl-4", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollPrev, scrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      disabled={!canScrollPrev}
      onClick={() => scrollPrev()}
      variant={variant}
      size={size}
      className={cn("absolute left-12 top-1/2 z-50 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { canScrollNext, scrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      disabled={!canScrollNext}
      onClick={() => scrollNext()}
      variant={variant}
      size={size}
      className={cn("absolute right-12 top-1/2 z-50 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }

import React, { useState, useRef } from "react";

interface CarouselItem {
  id: string;
  url: string;
  title: string;
}

const ITEMS: CarouselItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
    title: "Modern Villa",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1920&auto=format&fit=crop",
    title: "Minimalist Interior",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop",
    title: "Luxury Patio",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop",
    title: "Concrete Facade",
  },
];

// Helper for infinite looping
const wrap = (val: number, max: number) => ((val % max) + max) % max;

export default function CarouselFour() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Drag State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<0 | 1 | -1>(0); // -1 = Left, 1 = Right, 0 = Idle
  const dragStartRef = useRef<number | null>(null);

  const totalItems = ITEMS.length;
  const nextIndex = wrap(currentIndex + 1, totalItems);
  const prevIndex = wrap(currentIndex - 1, totalItems);

  // --- Interaction Handlers ---
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent interaction if an animation is currently running
    if (exitDirection !== 0) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartRef.current === null) return;

    const currentX = e.clientX;
    setDragOffset(currentX - dragStartRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
    dragStartRef.current = null;

    // 30% of screen width required to trigger a slide change
    const threshold = window.innerWidth * 0.3;

    if (dragOffset < -threshold) {
      // Swiped Left -> Go to Next
      setExitDirection(-1);
      triggerSlideChange(1); // increment index
    } else if (dragOffset > threshold) {
      // Swiped Right -> Go to Prev
      setExitDirection(1);
      triggerSlideChange(-1); // decrement index
    } else {
      // Snap back to center
      setDragOffset(0);
    }
  };

  const triggerSlideChange = (indexShift: number) => {
    // Wait for the CSS exit animation to finish (300ms) before updating React state
    setTimeout(() => {
      setCurrentIndex((prev) => wrap(prev + indexShift, totalItems));
      setDragOffset(0);
      setExitDirection(0); // Unlock interactions
    }, 300);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-neutral-950 text-white select-none">
      {/* Tracker HUD */}
      <div className="absolute top-10 z-50 flex w-full justify-between px-10 font-mono text-sm uppercase tracking-widest text-neutral-400 drop-shadow-md">
        <span>Prev: {prevIndex + 1}</span>
        <span className="text-white">
          Active: {currentIndex + 1} / {totalItems}
        </span>
        <span>Next: {nextIndex + 1}</span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-10 left-1/2 z-50 h-1 w-64 -translate-x-1/2 overflow-hidden rounded-full bg-white/20 backdrop-blur-md">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / totalItems) * 100}%` }}
        />
      </div>

      {/* Card Stack */}
      <div className="absolute inset-0 perspective-1000">
        {ITEMS.map((item, index) => {
          const offset = wrap(index - currentIndex, totalItems);
          const isTop = offset === 0;
          const isNext = offset === 1;

          if (offset > 2 && offset !== totalItems - 1) return null;

          // --- Physics & Math ---

          // Calculate how far the top card is dragged as a percentage (0 to 1)
          const dragProgress = isTop
            ? Math.min(Math.abs(dragOffset) / (window.innerWidth * 0.3), 1)
            : 0;

          console.log(dragProgress);

          // 1. Calculate X Position: Normal drag + Exit animation push
          const exitX = isTop ? exitDirection * window.innerWidth : 0;
          const currentX = isTop ? dragOffset + exitX : 0;

          // 2. Calculate Rotation: Slight tilt based on drag distance
          //   const rotation = isTop ? dragOffset * 0.03 : 0;

          // 3. Calculate Scale & Y: The next card grows as the top card is dragged away
          //   let currentScale = 1 - offset * 0.05;
          //   let currentY = offset * 40;

          if (isNext) {
            // currentScale = 1 - 0.05 + 0.05 * dragProgress;
            // currentY = 40 - 40 * dragProgress;
          }

          return (
            <div
              key={item.id}
              // touch-none prevents browser pull-to-refresh on mobile
              className={`absolute inset-0 origin-center will-change-transform touch-none ${
                isTop && exitDirection === 0
                  ? "cursor-grab active:cursor-grabbing"
                  : "pointer-events-none"
              }`}
              style={{
                zIndex: totalItems - offset,
                // opacity: offset === 0 ? 1 : 0.5 + dragProgress * 0.5,
                transform: `translateX(${currentX}px) translateY(${0}px) scale(${1}) rotate(${0}deg)`,
                // Disable transition while actively dragging for 1:1 finger tracking, enable it for snapping/exiting
                transition:
                  isDragging && isTop
                    ? "none"
                    : "transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease-out",
              }}
              aria-hidden={!isTop}
              // Attach pointer events ONLY to the top card
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerUp : undefined}
              onPointerLeave={isTop ? handlePointerUp : undefined}
            >
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover pointer-events-none select-none brightness-75"
                draggable="false"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-24 left-10 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white">
                  {item.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

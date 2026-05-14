import { useRef, useState } from "react";

interface CarouselItem {
  id: string;
  url: string;
  title: string;
}

const ITEMS: CarouselItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=60&w=1920&auto=format&fit=crop",
    title: "Modern Villa",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=60&w=1920&auto=format&fit=crop",
    title: "Minimalist Interior",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=60&w=1920&auto=format&fit=crop",
    title: "Luxury Patio",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=60&w=1920&auto=format&fit=crop",
    title: "Concrete Facade",
  },
];

const GSAPCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute size-full inset-0"
          // Attach pointer events ONLY to the top card
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsDragging(true);
          }}
          onPointerMove={(e) => {
            if (!isDragging) return;
            e.currentTarget.style.transform = `translateX(${e.clientX}px)`;
            console.log(e.clientX);
          }}
          //   onPointerUp={}
          //   onPointerCancel={}
          //   onPointerLeave={}
        >
          <div className=" size-full">
            <img
              src={item.url}
              alt={item.title}
              className="object-cover size-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default GSAPCarousel;

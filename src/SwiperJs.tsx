// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// import required modules
import { EffectCreative } from "swiper/modules";

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

const clipPaths = [
  {
    clipPath: "polygon(90% 0, 100% 0, 100% 100%, 100% 100%)",
    animationDuration: "11s",
    className: "right-0",
  },
  {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 85% 100%)",
    animationDuration: "10s",
    className: "right-0",
  },
  {
    clipPath: "polygon(0% 0%, 15% 0%, 0% 100%, 0% 100%)",
    animationDuration: "10.5s",
    className: "left-0",
  },
  {
    clipPath: "polygon(0 0, 0 0, 10% 100%, 0% 100%)",
    animationDuration: "9.5s",
    className: "left-0",
  },
];

export default function App() {
  return (
    <section className="flex flex-col gap-40">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, 0],
          },
          next: {
            translate: ["100%", 0, 1],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper h-screen w-full"
        loop
      >
        {ITEMS.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive, isPrev }) => (
              <div className="size-full slide__item">
                <img
                  src={item.url}
                  alt=""
                  className={`size-full object-cover scale-115 ${isActive || isPrev ? "main_img_scale" : ""}`}
                  style={{
                    clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0% 100%)",
                  }}
                />

                <h2
                  className={` absolute top-1/2 left-1/2 text-6xl transform-[translate(-40%,-100%)_scale(1.2)] lg:text-7xl w-max font-extrabold text-white text-shadow-xs uppercase transition-transform duration-800 ${
                    isActive ? "heading_animate" : ""
                  }`}
                >
                  {item.title}
                </h2>

                {clipPaths.map((data, j) => (
                  <div
                    className={`size-full side__img absolute top-0 overflow-clip ${data.className}`}
                    style={{
                      clipPath: data.clipPath,
                    }}
                    key={data.clipPath + j}
                  >
                    <img
                      src={item.url}
                      className={`${isActive || isPrev ? "scale__img" : ""} size-full origin-bottom-left object-cover scale-125 duration-500`}
                      style={{
                        animationDuration: data.animationDuration,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-50%", 0, 0],
          },
          next: {
            shadow: true,
            translate: ["100%", 0, 1],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper h-screen w-full"
        loop
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
    </section>
  );
}

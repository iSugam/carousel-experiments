import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

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

const clipPaths = [
  {
    clipPath: "polygon(90% 0, 100% 0, 100% 100%, 100% 100%)",
    className: "left-0",
  },
  {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 85% 100%)",
    className: "left-0",
  },
  {
    clipPath: "polygon(0% 0%, 15% 0%, 0% 100%, 0% 100%)",
    className: "left-0",
  },
  {
    clipPath: "polygon(0 0, 0 0, 10% 100%, 0% 100%)",
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
        modules={[EffectCreative, Autoplay]}
        className="mySwiper h-screen w-full"
        speed={1100}
        loop
        autoplay={{
          delay: 4000,
        }}
      >
        {ITEMS.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive, isPrev }) => (
              <div className="slide__item size-full relative z-100">
                <div className="noisy absolute inset-0 size-full z-99"></div>

                <img
                  src={item.url}
                  alt=""
                  className={`size-full object-cover scale-115 will-change-transform ${isActive || isPrev ? "main_img_scale" : ""}`}
                  style={{
                    clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0% 100%)",
                  }}
                />

                <h2
                  className={` absolute top-1/2 left-1/2 text-4xl sm:text-5xl will-change-transform md:text-6xl transform-[translate(-50%,-50%)_scale(1)] lg:text-7xl text-center lg:text-left lg:w-max font-extrabold text-white text-shadow-xs uppercase transition-transform duration-800 ${
                    isActive || isPrev ? "heading_animate" : ""
                  }`}
                >
                  {item.title}
                </h2>

                {clipPaths.map((data, j) => (
                  <div
                    className={`side__img ${isActive || isPrev ? `side__img__${j + 1}` : ""} will-change-transform
                     size-full absolute top-0 left-0 overflow-clip`}
                    style={{
                      clipPath: data.clipPath,
                    }}
                    key={data.clipPath}
                  >
                    <img
                      src={item.url}
                      className={`${isActive || isPrev ? "scale__img" : ""} size-full object-cover`}
                    />
                  </div>
                ))}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

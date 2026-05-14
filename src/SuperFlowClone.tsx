import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface SlideData {
  id: string;
  img: string;
  title?: string;
}

interface SwiperSlideElement extends HTMLElement {
  progress: number;
}

const slideData: SlideData[] = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=60&w=1920&auto=format&fit=crop",
    title: "Modern Villa",
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=60&w=1920&auto=format&fit=crop",
    title: "Minimalist Interior",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=60&w=1920&auto=format&fit=crop",
    title: "Luxury Patio",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=60&w=1920&auto=format&fit=crop",
    title: "Concrete Facade",
  },
];

const fragments = [
  {
    id: "frag-top",
    clipPath: "polygon(70% 0, 100% 0, 100% 100%, 100% 100%)",
    xOffset: 0,
    yOffset: -80,
    rotate: -4,
  },
  {
    id: "frag-right",
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 65% 100%)",
    xOffset: 80,
    yOffset: 0,
    rotate: 4,
  },
  {
    id: "frag-bottom",
    clipPath: "polygon(0% 0%, 35% 0%, 0% 100%, 0% 100%)",
    xOffset: 0,
    yOffset: 80,
    rotate: 4,
  },
  {
    id: "frag-left",
    clipPath: "polygon(0 0, 0 0, 30% 100%, 0% 100%)",
    xOffset: -80,
    yOffset: 0,
    rotate: -4,
  },
];

export default function SuperFlowClone() {
  const handleProgress = (swiper: SwiperType) => {
    swiper.slides.forEach((slide) => {
      const swiperSlide = slide as SwiperSlideElement;
      const slideProgress = swiperSlide.progress;
      const absProgress = Math.abs(slideProgress);
      console.log(slideProgress);

      const innerScrub = swiperSlide.querySelector(
        ".inner-scrub",
      ) as HTMLElement;
      if (innerScrub) {
        const scrubX = slideProgress * 25;
        innerScrub.style.transform = `translateX(${scrubX}%)`;
      }

      // 2. The Fracture Effect
      const frags = swiperSlide.querySelectorAll(
        ".slide-fragment",
      ) as NodeListOf<HTMLElement>;
      frags.forEach((frag, i) => {
        const config = fragments[i];
        const x = slideProgress * config.xOffset;
        const y = absProgress * config.yOffset;
        const rotate = slideProgress * config.rotate;
        const scale = 1 - absProgress * 0.15;

        frag.style.transform = `translateX(${x}px)`;
      });
    });
  };

  const handleSetTransition = (swiper: SwiperType, duration: number) => {
    swiper.slides.forEach((slide) => {
      const innerScrub = slide.querySelector(".inner-scrub") as HTMLElement;
      if (innerScrub) innerScrub.style.transitionDuration = `${duration}ms`;

      const frags = slide.querySelectorAll(
        ".slide-fragment",
      ) as NodeListOf<HTMLElement>;
      frags.forEach((frag) => {
        frag.style.transitionDuration = `${duration}ms`;
      });
    });
  };

  return (
    <div className="relative w-full mx-auto h-screen bg-neutral-950 overflow-hidden">
      <Swiper
        loop={true}
        grabCursor={true}
        slidesPerView={1}
        watchSlidesProgress={true}
        speed={1000}
        onProgress={handleProgress}
        onSetTransition={handleSetTransition}
        className="w-full h-full"
        modules={[Autoplay]}
        autoplay={{
          delay: 4500,
        }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id} className="overflow-hidden slide__item">
            {({ isActive, isPrev }) => (
              <div
                className="relative w-full h-full"
                inert={!isActive ? true : undefined}
              >
                <div className="noisy absolute inset-0 size-full z-99"></div>

                <img
                  src={slide.img}
                  alt=""
                  className={`absolute inset-0 size-full object-cover  ${isActive || isPrev ? "main_img_scale" : ""}`}
                />

                <h2
                  className={` absolute top-1/2 left-1/2 text-4xl sm:text-5xl will-change-transform md:text-6xl transform-[translate(-50%,-50%)_scale(1)] lg:text-7xl text-center lg:text-left lg:w-max font-extrabold text-white text-shadow-xs uppercase transition-transform duration-800 ${
                    isActive || isPrev ? "heading_animate" : ""
                  }`}
                >
                  {slide.title}
                </h2>

                {/* The new wrapper that creates the overlapping parallax scrub */}
                <div className="inner-scrub absolute inset-0 w-full h-full will-change-transform ease-out">
                  {fragments.map((frag, j) => (
                    <div
                      key={frag.id}
                      className={`slide-fragment side__img size-full absolute inset-0  will-change-transform ease-out origin-center ${
                        isActive || isPrev ? `side__img__${j + 1}` : ""
                      }`}
                    >
                      <div
                        className={`size-full bg-cover bg-center scale-[1.1] ${isActive || isPrev ? "scale__img" : ""}`}
                        style={{
                          backgroundImage: `url(${slide.img})`,
                          clipPath: frag.clipPath,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

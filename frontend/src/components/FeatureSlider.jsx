import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedSlider({ items, renderItem }) {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    ref.current?.addEventListener("scroll", checkScroll);
    return () => ref.current?.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative group">
      {/* Left Fade + Button */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
          <div className="w-16 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 hidden md:flex w-10 h-10 items-center justify-center
              rounded-full bg-white/80 backdrop-blur shadow-md
              hover:scale-110 hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slider */}
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-4 scrollbar-hide"
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="min-w-[280px] max-w-[280px] snap-start
              transition-transform duration-300 group-hover:scale-[0.98]"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Right Fade + Button */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-end">
          <div className="w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 hidden md:flex w-10 h-10 items-center justify-center
              rounded-full bg-white/80 backdrop-blur shadow-md
              hover:scale-110 hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

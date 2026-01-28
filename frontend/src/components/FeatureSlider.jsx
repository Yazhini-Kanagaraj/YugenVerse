import { useRef } from "react";

export default function FeaturedSlider({ items, renderItem }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 items-center justify-center"
      >
        ◀
      </button>

      {/* Slider */}
      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 pb-4"
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="min-w-[280px] max-w-[280px] snap-start"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 items-center justify-center"
      >
        ▶
      </button>
    </div>
  );
}

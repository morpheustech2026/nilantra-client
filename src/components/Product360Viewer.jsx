import { useState, useRef } from "react";

function Product360Viewer({ images }) {
  const [index, setIndex] = useState(0);
  const lastX = useRef(0);

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;

    const delta = e.clientX - lastX.current;

    if (Math.abs(delta) > 8) {
      setIndex((i) =>
        delta > 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length
      );
      lastX.current = e.clientX;
    }
  };

  return (
    <div
      className="relative h-[320px] cursor-grab select-none"
      onMouseDown={(e) => (lastX.current = e.clientX)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={images[index]}
        alt="360 view"
        className="absolute inset-0 w-full h-full object-contain"
      />

      <span className="absolute bottom-4 right-4 text-xs text-white/60">
        Drag to rotate
      </span>
    </div>
  );
}

export default Product360Viewer;

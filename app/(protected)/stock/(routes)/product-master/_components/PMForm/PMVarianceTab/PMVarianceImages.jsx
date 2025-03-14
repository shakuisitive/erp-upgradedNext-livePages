import React, { useRef } from "react";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

const PMVarianceImages = ({ images }) => {
  const filteredImages = images.filter((image) => image !== null);
  const scrollContainerRef = useRef(null);
  // console.log("filtered image", filteredImages);
  const handlePrev = () => {
    scrollContainerRef.current.scrollLeft -= 200;
  };

  const handleNext = () => {
    scrollContainerRef.current.scrollLeft += 200;
  };

  return (
    <div className="relative w-[95%] overflow-hidden border pl-[35px] pr-[35px] h-[142px] border-customgreen rounded-[6px] m-[25px]">
      <div className="absolute left-[2px] top-1/2 -translate-y-1/2">
        <button className="text-[24px] text-gray-400" onClick={handlePrev}>
          <RiArrowLeftDoubleFill />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-[12px] p-[12px] pt-[14px] overflow-x-auto"
      >
        {filteredImages.length === 0 ? (
          <p className="text-gray-500 justify-center items-center"></p>
        ) : (
          filteredImages.map((image, index) => (
            <div key={`image-${index}`} className="relative">
              <img
                // src={
                //   image?.startsWith("data:image/png;base64,")
                //     ? image
                //     : `data:image/png;base64,${image}`
                // }
                src={image}
                alt={`Preview ${index}`}
                className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md"
              />
            </div>
          ))
        )}
      </div>

      <div className="absolute right-[2px] top-1/2 -translate-y-1/2">
        <button className="text-[24px] text-gray-400" onClick={handleNext}>
          <RiArrowRightDoubleFill />
        </button>
      </div>
    </div>
  );
};

export default PMVarianceImages;

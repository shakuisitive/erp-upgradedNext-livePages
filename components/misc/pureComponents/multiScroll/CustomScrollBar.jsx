"use client"
import React, { useState, useRef, useEffect } from "react";
function CustomScrollBar(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [toggleScrollBar, setToggleScrollBar] = useState(true);
  const isDragging = useRef(null);
  useEffect(() => {
    const hasRef = props?.refsArray.some((item) => item.current?.scrollWidth > item.current?.clientWidth);
    setToggleScrollBar(hasRef);
   

    // if (
    //   props?.refsArray[0]?.current?.scrollWidth >
    //   props?.refsArray[0]?.current?.clientWidth
    // ) {
    //   setToggleScrollBar(true);
    // } else {
    //   setToggleScrollBar(false);
    // }
   
  }, [props.change]);

  const handleThumbDragStart = (event) => {
    isDragging.current = true;
    event.preventDefault();
  };

  const handleThumbDrag = (event) => {
    if (!isDragging.current) return;

    const trackWidth = trackRef.current?.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current?.clientWidth;
    const newScrollPosition = Math.min(
      Math.max(
        0,
        event.clientX -
          trackRef.current?.getBoundingClientRect().left -
          thumbWidth / 3
      ),
      trackWidth - thumbWidth
    );

    setScrollPosition(newScrollPosition);

    props.refsArray.forEach((element) => {
      if(element?.current != null){
        element.current.scrollLeft = element?.current
        ? (newScrollPosition / (trackWidth - thumbWidth)) *
          (element.current?.scrollWidth - element.current?.clientWidth)
        : null;
      }
     
    });
  };

  const handleThumbDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <>
      <div
        className="w-full h-full flex flex-col"
        onMouseMove={handleThumbDrag}
        onMouseUp={handleThumbDragEnd}
      >
        {props.children}

        {toggleScrollBar && (
          <div
            className="track absolute h-[16px] bg-white rounded bottom-0 left-0 right-0"
            ref={trackRef}
          >
            <div
              className="thumb h-[15px] bg-gray-300 w-[900px] absolute bottom-0 left-0 cursor-pointer"
              ref={thumbRef}
              style={{ left: `${scrollPosition}px` }}
              onMouseDown={handleThumbDragStart}
              onMouseMove={handleThumbDrag}
              onMouseUpCapture={handleThumbDragEnd}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CustomScrollBar;

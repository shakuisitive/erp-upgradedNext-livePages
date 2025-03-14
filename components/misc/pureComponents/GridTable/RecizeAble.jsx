import React, { useState, useRef , useEffect} from "react";

const ResizableDiv = ({ children, index, widthHandle, defWid ,}) => {
  const [width, setWidth] = useState(defWid); // Initial width
  const [display, setDisplay] = useState("null");
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setDisplay("running");
    event.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth =
        e.clientX - containerRef.current.getBoundingClientRect().left;
    //   setWidth(newWidth);
      widthHandle(newWidth, index);
    }
  };

  const handleMouseUp = () => {
    // setIsResizing(false);
    // setDisplay("running stop");
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  useEffect(()=>{
    setWidth(defWid)
  },[defWid])

  return (
    <div
      className={`resizable-container group `}
      ref={containerRef}
      style={{ width: `${width}px` }}
    >
     
      <div>{children}</div>
      {/* <div>{display}</div> */}

      <div className="resizer hidden group-hover:block" onMouseDown={handleMouseDown} />
    </div>
  );
};

export default ResizableDiv;

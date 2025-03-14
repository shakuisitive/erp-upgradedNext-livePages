import React, { useState, useRef, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { RiAddCircleFill, RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';

const FileUpload = ({onUpload}) => {
  const [files, setFiles] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (onUpload && files.length > 0) {
      onUpload(files);
    }
  }, [files, onUpload]);


  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles([...files, ...fileList]);
  };

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handlePrev = () => {
    scrollContainerRef.current.scrollLeft -= 200; 
  };

  const handleNext = () => {
    scrollContainerRef.current.scrollLeft += 200; 
  };

  return (
    <div className="relative w-[50%] tablet:w-[70%] desktop:w-[50%] overflow-hidden border pl-[150px] pr-[30px]  h-[142px] border-customgreen rounded-[6px] m-[25px]">
      <div className='absolute left-[30px] top-1/2 -translate-y-1/2'>
        <label htmlFor="file-upload" className="block cursor-pointer">
          <div className="">
            <input id="file-upload" type="file" onChange={handleFileChange} multiple className="hidden" />
            <div className="flex items-center justify-center w-[112px] h-[112px] border-2 border-sky-400 rounded-md cursor-pointer">
              <RiAddCircleFill className='text-[25px] text-gray-400' />
            </div>
          </div>
        </label>
      </div>
      <div className="absolute left-[2px] top-1/2 -translate-y-1/2">
        <button className='text-[24px] text-gray-400' onClick={handlePrev}>
          <RiArrowLeftDoubleFill />
        </button>
      </div>
      <div className="flex items-center gap-[12px] p-[12px] pt-[14px] overflow-x-auto">
        {/* Fixed first item */}
        {files.length > 0 && (
          <div className="relative">
            <img
              src={URL.createObjectURL(files[0])}
              alt={`Preview ${files[0].name}`}
              className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md cursor-pointer"
            />
            <button
              onClick={() => handleDelete(0)}
              className="absolute top-2 right-2 p-1 rounded-md text-white hover:bg-customGray focus:outline-none focus:ring"
            >
              <RxCross1 className='text-[12px] text-gray-400 hover:text-red-400' />
            </button>
          </div>
          )}
        {/* Scrollable items */}
        <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto">
          {files.slice(1).map((file, index) => (
            <div key={index} className="relative ">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${file.name}`}
                className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md cursor-pointer"
              />
              <button
                onClick={() => handleDelete(index + 1)}
                className="absolute top-2 right-2  p-1 rounded-md text-white hover:bg-customGray focus:outline-none focus:ring ">
                <RxCross1 className='text-[12px] text-gray-400 hover:text-red-400' />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-[2px] top-1/2 -translate-y-1/2">
        <button className='text-[24px] text-gray-400' onClick={handleNext}>
          <RiArrowRightDoubleFill />
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

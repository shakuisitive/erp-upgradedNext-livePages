import React from "react";
import { IoIosMore, IoMdAdd } from "react-icons/io";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdAccessTime } from "react-icons/md";
import { PiImagesLight } from "react-icons/pi";
import FileTabDropdown from "./FileTabDropdown";
// import  PDFViewer from "./PdfViewer"

const GridViewCardFileTab = ({ filename,content,type, date }) => {
  return (
    <div className=" overflow-hidden">
      <div className="h-fit overflow-hidden w-[200px] bg-gray-100 mt-4 rounded-[4px] text-customblack p-1">
        <div className="relative overflow-hidden">
          {
            type.startsWith('image/')?(
              <img
              src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} alt={filename}  
               className="bg-white mx-auto h-[84px] w-full rounded-[4px] border border-gray-300"
             />
            ):type==='application/pdf'?(
              <embed
            scroll='no'
            
              src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} alt={filename}  
              className="bg-white overflow-hidden mx-auto h-[84px] w-full rounded-[4px] border border-gray-300"
              />
            ):type.startsWith('video/') ? (
              <video controls={false}   autoPlay className="custom-video-controls bg-white overflow-hidden mx-auto h-[84px] w-full rounded-[4px] border border-gray-300">
                  <source src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} type={type} />
                  
              </video>
          ) : (
              <p>{filename} - Unsupported item type</p>
          )
          }
         

          <button class="absolute top-0 right-0">
            <FileTabDropdown />
          </button>
          <div class="absolute bottom-0 left-0 flex gap-1">
            <button class="bg-white p-1 border border-gray-300 rounded-[4px]">
              <BiMessageRoundedAdd class="text-[20px]" />
            </button>
            <button class="bg-white text-[14px] p-1 border border-gray-300 rounded-[4px] opacity-55">
              V1
            </button>
          </div>
        </div>
      </div>
      <div class="flex w-[200px] bg-white">
        <div class="flex flex-col w-full">
          <div class="relative flex justify-between items-center">
            <p class="text-[14px] font-semibold mr-1 leading-[26px] text-customblack">{filename}</p>
            <div class="right-0">
              <MdAccessTime className="text-customblack" />
            </div>
          </div>
          <div className="flex items-center ">
            <div className="hover:bg-gray-200 flex rounded-[4px]">
              <div className="mr-1">
                <PiImagesLight className="text-gray-400" />
              </div>
              <p className="text-[12px] text-gray-400 ">Files gallery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridViewCardFileTab;

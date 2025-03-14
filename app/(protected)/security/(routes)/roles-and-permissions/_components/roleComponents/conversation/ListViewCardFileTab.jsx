import React from 'react'
import { BiMessageRoundedAdd } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { PiImagesLight } from "react-icons/pi";
import FileTabDropdown from "./FileTabDropdown"
  

const ListViewCardFileTab = ({ filename,content,type, date}) => {
 
  return (
     <div className="h-fit w-full mt-4 rounded-[4px] text-customblack border border-gray-300 justify-around">
            <div className="flex items-center p-[6px]">
                <div className="mr-2">
                {
            type.startsWith('image/')?(
              <img
              src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} alt={filename}  
               className="bg-white mx-auto h-[84px] w-[94px] rounded-[4px] border border-gray-300"
             />
            ):type==='application/pdf'?(
              <embed
            scroll='no'
            
              src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} alt={filename}  
              className="bg-white overflow-hidden mx-auto h-[84px] w-[94px] rounded-[4px] border border-gray-300"
              />
            ):type.startsWith('video/') ? (
              <video controls={false}   autoPlay className="custom-video-controls bg-white overflow-hidden mx-auto h-[84px] w-[94px] rounded-[4px] border border-gray-300">
                  <source src={URL.createObjectURL(new Blob([new Uint8Array(content)], { type: type }))} type={type} />
                  
              </video>
          ) : (
              <p>{filename} - Unsupported item type</p>
          )
          }
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-[14px] font-semibold mr-1 leading-[26px] text-customblack">{filename}</p>
                        <button className="">
                            {/* <IoIosMore /> */}
                            <FileTabDropdown/>
                        </button>
                    </div>
                    <div className="flex items-center mb-1 ">
                        <div className='hover:bg-gray-200 flex rounded-[4px]'>
                            <div className="mr-1">
                            <PiImagesLight className="text-gray-400" />
                        </div>
                        <p className="text-[12px] text-gray-400 ">Files gallery</p>
                        </div>
                        
                    </div>
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center mb-1">
                            <div className="mr-1">
                                <FaUserCircle className="text-[20px]"/>
                            </div>
                            <p className="text-[14px] ">{date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="mr-1 p-2 border border-gray-300 rounded-[4px]">
                                <BiMessageRoundedAdd className="text-[20px]"/>
                            </button>
                            <button className="text-[14px] p-2 border border-gray-300 rounded-[4px] opacity-55">
                                V1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ListViewCardFileTab

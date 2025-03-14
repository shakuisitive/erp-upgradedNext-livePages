'use client'
import React,{useState,useRef} from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowDown, GoDownload } from "react-icons/go";
import { IoIosMore, IoMdAdd } from "react-icons/io";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import { PiImagesLight } from "react-icons/pi";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import ListViewCardFileTab from '../../../app/(protected)/stock/(routes)/purchase/_components/ListViewCardFileTab'
import GridViewCardFileTab from '../../../app/(protected)/stock/(routes)/purchase/_components/GridViewCardFileTab'
import { MdOutlineGridView } from "react-icons/md";

const File = () => {
 
const [showListView, setShowListView] = useState(false);
const [showGridView, setShowGridView] = useState(false);
  const hiddenFileInput = useRef(null);

  const listView = [
    { filename: "File1", date: "Mar 12, 2024", mainImage: "image1.jpg"  },
    { filename: "File2", date: "Mar 13, 2024", mainImage: "image2.jpg" },
    { filename: "File3", date: "Mar 14, 2024", mainImage: "image3.jpg" }
];
 const GridView = [
   { filename: "File1", date: "Mar 12, 2024", mainImage: "image1.jpg"  },
    { filename: "File2", date: "Mar 13, 2024", mainImage: "image2.jpg" },
    { filename: "File3", date: "Mar 14, 2024", mainImage: "image3.jpg" },
    { filename: "File4", date: "Mar 13, 2024", mainImage: "image4.jpg" },
    { filename: "File5", date: "Mar 14, 2024", mainImage: "image5.jpg" },
    
];

    const handleListViewClick = () => {
        setShowListView(!showListView);
        setShowGridView(false)
    };
    const handleGridViewClick = () => {
        setShowGridView(!showGridView);
        setShowListView(false)
    };

 const handleFileUpload = (e) => {
  const file = e.target.files[0];
  console.log('Uploaded file:', file);
};


  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="bg-white  h-[85vh] pt-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
            <div>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button
        className="flex items-center py-1 px-2 text-customblack text-[14px] border border-gray-400 rounded-[4px] hover:bg-customGray"
        onClick={handleClick}
      >
        <IoMdAdd className="mr-1 text-[20px]" />
        Add file
      </button>
    </div>
          {/* <button className="flex items-center py-1 px-2 text-customblack text-[14px] border border-gray-400 rounded-[4px] hover:bg-customGray">
            <IoMdAdd className="mr-1 text-[20px]" />
            Add file
          </button> */}
          <div className="relative flex items-center">
            <input
              type="text"
              className="bg-white rounded-[4px] border border-gray-400 focus:border-customblue focus:outline-none hover:border-customblack px-2 py-1"
              placeholder="Search for files"
            />
            <button className="absolute right-0 mr-2">
              <IoSearch className="text-[22px] p-[2px] hover:bg-gray-300 rounded-[4px] text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex ">
          <button className="p-[2px] border text-customblack border-blue-700 hover:bg-blue-100 rounded-s-[2px]" onClick={handleGridViewClick}>
            <MdOutlineGridView className="text-[20px]"/>
          </button>
          <button className= "text-customblack border border-blue-700 p-[3px] hover:bg-blue-100 rounded-e-[2px]" onClick={handleListViewClick}>
            <TfiViewList className="font-semibold"/>
          </button>
          <button className="ml-4">
            <GoDownload className="text-[18px] "/>
          </button>
        </div>
      </div>
      {/* list view card ui */}
        {showListView && (
                <div>
                    {listView.map((item, index) => (
                        <ListViewCardFileTab key={index} filename={item.filename} date={item.date} img ={item.mainImage} />
                    ))}
                </div>
            )}

        {/* grid view card */}
        {showGridView && (
            <div className="flex flex-wrap gap-5">
            {GridView.map((item, index) => (
                <GridViewCardFileTab key={index} filename={item.filename} img ={item.mainImage} />
            ))}
        </div>
        )}
        
    </div>
  );
}

export default File
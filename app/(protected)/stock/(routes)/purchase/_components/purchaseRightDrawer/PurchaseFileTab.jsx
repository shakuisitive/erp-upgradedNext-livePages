'use client'
import React,{useState,useRef} from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowDown, GoDownload } from "react-icons/go";
import { IoIosMore, IoMdAdd } from "react-icons/io";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import { PiImagesLight } from "react-icons/pi";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import ListViewCardFileTab from './ListViewCardFileTab'
import GridViewCardFileTab from './GridViewCardFileTab'
import { MdOutlineGridView } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {addFile} from "../../redux/Purchase.slice"
import { BsPlus } from "react-icons/bs";


const PurchaseFileTab = ({data}) => {
  let po_number=data?.PO_NUMBER
const [showListView, setShowListView] = useState(false);
const [showGridView, setShowGridView] = useState(true);
const [isGridView, setIsGridView] = useState(true); 
const [isDragging, setIsDragging] = useState(false);
  const hiddenFileInput = useRef(null);

  const listView = useSelector(state=>state.PurchaseSlices.files).filter(item=>item.po_number==po_number);
 const GridView = useSelector(state=>state.PurchaseSlices.files).filter(item=>item.po_number==po_number);

    const handleListViewClick = () => {
        setShowListView(true);
        setShowGridView(false)
    };
    const handleGridViewClick = () => {
        setShowGridView(true);
        setShowListView(false)
    };
    const dispatch = useDispatch();
    const files=useSelector(state=>state.PurchaseSlices.files)
    const onChoosenFile = (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
          const newFile = {
              id: Math.random().toString(36).substr(2, 9), // generate unique id
              po_number:po_number,
              date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              name: file.name,
              type: file.type,
              content: reader.result, // Store binary content
          };
          dispatch(addFile(newFile));
      };
      reader.readAsArrayBuffer(file); // Read file as binary data
  }

 const handleFileUpload = (e) => {
  const file = e.target.files[0];
        if (file) {
            onChoosenFile(file);
        }
};
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  // const toggleView = () => {
  //   setIsGridView(prevState => !prevState);
  // };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Handle dropped files here
    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
  };
  return (
    <div className="bg-white h-[100%] pt-[20px]">
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
       onClick={ handleClick}
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
          <button className={`p-[4px] border text-customblack border-customblue hover:bg-blue-100 rounded-s-[4px] ${showGridView ? 'bg-blue-100' : ''}`} onClick={handleGridViewClick}>
            <MdOutlineGridView className="text-[20px]  " />
          </button>
          <button onClick={handleListViewClick} className={`p-[4px] border text-customblack border-customblue hover:bg-blue-100 rounded-e-[4px] ${showListView ? 'bg-blue-100' : ''}`} >
            <TfiViewList className="font-semibold" />
          </button>
          <button className="ml-4">
            <GoDownload className="text-[20px] "/>
          </button>
        </div>
      </div>
      {/* list view card ui */}
        {showListView && (
                <div>
                    {listView.map((item, index) => (
                        <ListViewCardFileTab key={index} filename={item.name} date={item.date} content={item.content} type={item.type}/>
                    ))}
                </div>
            )}

    
        {showGridView && (
            <div className="flex flex-wrap gap-5">
            {GridView.map((item, index) => (
                <GridViewCardFileTab key={index} filename={item.name} date={item.date}  content={item.content} type={item.type}  />
            ))}
        </div>
        )}
    <div
  className={`absolute rounded-lg mt-4 top-52 right-5  left-5 bottom-5 ${isDragging ? 'border-dashed border-2 border-gray-500' : ''}`}
  onDragOver={handleDragOver}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
>
  <div className="mx-auto max-w-lg">
    {isDragging ? (
      <p></p>
    ) : (
      <p></p>
    )}
  </div>
</div>

    <div className="pt-[20px] border-dashed border-2 rounded-lg h-svh  mt-4 border-black hidden"></div>

<div className=' p-4 max-w-sm mx-auto mt-20 items-center h-screen justify-content:center'>
 {/* </div> */}
                  <div className='pl-16 item-center text-center'>
                    <div className='justify-center items-center pl-26  '>
                    <img className='h-100 w-100' src='https://cdn.monday.com/images/files-gallery/empty-state.svg'alt='pulse-page-e'/>
                   
                    </div>
                  </div>
                  <div>
                    <h1 className=' text-[26px] text-right text-black pl-16 mt-6 justify-content:center text-lg text-nowrap font-bold'>Drag & drop
                  <span className="font-medium "> or </span>
                          add files here</h1>
                    <p className='text-nowrap mt-2 text-black text-sm font-semiblod' style={{marginLeft:-35}} >
 Upload, comment and review all files in this item to easily collaborate in context                          {/* <span  className=' p-10 justify-content: center'>  or upload files to share with your team members</span> */}
                    </p>
                    
                    <button
                  
                    className="bg-blue-600 hover:bg-blue-700 text-white font-sans py-2 px-4 rounded text-base	mt-6"style={{marginLeft:170}}
                    onClick={handleDragLeave}>
                      Add File
                      
                    <BsPlus className="text-[25px] float-start mr-1 font-mono text-center" 
                     />
                    </button>
                       
                  </div>
                 </div>
        {/* {isGridView ? (
          <div className="flex flex-wrap gap-5">
            {GridView.map((item, index) => (
              <GridViewCardFileTab key={index} filename={item.filename} img ={item.mainImage} />
            ))}
          </div>
        ) : (
          <div>
                    {listView.map((item, index) => (
                        <ListViewCardFileTab key={index} filename={item.filename} date={item.date} img ={item.mainImage} />
                    ))}
                </div>
        )} */}
        
    </div>
  );
};

export default PurchaseFileTab;

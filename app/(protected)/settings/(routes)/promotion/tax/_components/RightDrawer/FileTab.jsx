"use client";
import React, { useState, useRef } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoArrowDown, GoDownload } from "react-icons/go";
import { IoIosMore, IoMdAdd } from "react-icons/io";
import { IoAddSharp, IoSearch } from "react-icons/io5";
import { PiImagesLight } from "react-icons/pi";
import { TfiViewGrid, TfiViewList } from "react-icons/tfi";
import ListViewCardFileTab from "../../../../../../settings/_components/RightDrawer/ListViewFileTab";
import GridViewCardFileTab from "../../../../../../settings/_components/RightDrawer/GridViewFileTab";
import { MdOutlineGridView } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../../redux/taxSlice";

const PurchaseFileTab = ({ data }) => {
  let po_number = data?.PAYTER_ID;
  const [showListView, setShowListView] = useState(false);
  const [showGridView, setShowGridView] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const hiddenFileInput = useRef(null);

  const listView = useSelector((state) => state.paymentTerm.files).filter(
    (item) => item.po_number == po_number
  );
  const GridView = useSelector((state) => state.paymentTerm.files).filter(
    (item) => item.po_number == po_number
  );

  const handleListViewClick = () => {
    setShowListView(true);
    setShowGridView(false);
  };
  const handleGridViewClick = () => {
    setShowGridView(true);
    setShowListView(false);
  };
  const dispatch = useDispatch();
  const files = useSelector((state) => state.PurchaseSlices.files);
  const onChoosenFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newFile = {
        id: Math.random().toString(36).substr(2, 9), // generate unique id
        po_number: po_number,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        name: file.name,
        type: file.type,
        content: reader.result, // Store binary content
      };
      dispatch(addFile(newFile));
    };
    reader.readAsArrayBuffer(file); // Read file as binary data
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChoosenFile(file);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const toggleView = () => {
    setIsGridView((prevState) => !prevState);
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
              style={{ display: "none" }}
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
          <button
            className={`p-[4px] border text-customblack border-customblue hover:bg-blue-100 rounded-s-[4px] ${
              showGridView ? "bg-blue-100" : ""
            }`}
            onClick={handleGridViewClick}
          >
            <MdOutlineGridView className="text-[20px]  " />
          </button>
          <button
            onClick={handleListViewClick}
            className={`p-[4px] border text-customblack border-customblue hover:bg-blue-100 rounded-e-[4px] ${
              showListView ? "bg-blue-100" : ""
            }`}
          >
            <TfiViewList className="font-semibold" />
          </button>
          <button className="ml-4">
            <GoDownload className="text-[20px] " />
          </button>
        </div>
      </div>
      {/* list view card ui */}
      {showListView && (
        <div>
          {listView.map((item, index) => (
            <ListViewCardFileTab
              key={index}
              filename={item.name}
              date={item.date}
              content={item.content}
              type={item.type}
            />
          ))}
        </div>
      )}

      {showGridView && (
        <div className="flex flex-wrap gap-5">
          {GridView.map((item, index) => (
            <GridViewCardFileTab
              key={index}
              filename={item.name}
              date={item.date}
              content={item.content}
              type={item.type}
            />
          ))}
        </div>
      )}
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

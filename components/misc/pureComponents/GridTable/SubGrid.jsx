"use client";
import React, { useEffect, useState, useRef } from "react";
import ModalOpen from "./ModalOpen";
import StatusCell from "./GridStatusCell";
import { TfiMoreAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import GridDateCell from "./GridDateCell";

const SubGrid = ({
  dropDown,
  Subdata,
  head,
  setHead,
  addButton,
  obj,
  id,
  isSubChecked,
  handleSubCheckboxChange,
  tableColor,
  GriddFooterAdd,
  GridTitle,
}) => {
  // console.log("check get details for body", obj);

  const inputRef = useRef(null);

  const [cells, setCells] = useState(0);

  const [row, setRow] = useState();
  const [headTwo, setHeadTwo] = useState();
  const [inputValues, setInputValues] = useState({});
  const [totalWid, setTotalWid] = useState(0);
  const [activeEdit, setActiveEdit] = useState();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [rowList, setRowList] = useState(0);

  const focusFooter = useSelector((state) => state.PurchaseSlices.focusFooter);

  // console.log("cells sub", cells);
  useEffect(() => {
    setRowList(row?.length);
    // setRowData(row);
  }, [row]);
  useEffect(() => {
    setCells(head?.length);

    setHeadTwo(head);
    const newTotalWid = head?.reduce((acc, data) => {
      // Check if data.Wid is a valid number
      const widValue = Number(data.Wid);
      if (!isNaN(widValue)) {
        return acc + widValue;
      }
      return acc;
    }, 0);

    setTotalWid(newTotalWid);
  }, [dropDown]);
  useEffect(() => {
    setRow(Subdata);
  }, [Subdata]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Do something when Enter key is pressed
      const valuesCopy = { ...inputValues };

      // Push the copy into the 'row' array
      setRow((prevRow) => [...prevRow, valuesCopy]);
      // console.log('Enter key pressed!');
      // console.log('Input value:', row);
    }
  };

  // Function to handle changes in input values
  const handleInputChange = (name, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const dragItem = useRef();

  const handleDragStart = (index) => {
    if (index != 0) {
      setDraggedIndex(index);
      dragItem.current = index;
    }
  };

  const handleDragOver = (index) => {
    if (index != 0) {
      if (draggedIndex !== null) {
        const items = [...head];
        const draggedItem = items[draggedIndex];
        items.splice(draggedIndex, 1);
        items.splice(index, 0, draggedItem);
        setHead(items);
        setDraggedIndex(index);
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    dragItem.current = null;
  };

  return (
    <div className="rounded-lg borde w-full  ">
      <div className={`w-full ${cells == 0 ? "hidden" : "block"} overflow-aut`}>
        <div
          style={{
            minWidth: `${totalWid}px`,
            display: "flex",
            justifyContent: "start",
          }}
          className={` rounded-tl-lg  border-y  `}
        >
          {/* <div className="flex bg-white left-[64px] sticky ">
            <div style={{backgroundColor:`${tableColor}`}} className="p-[2px]    "></div>
            <div className="border border-l-0 flex justify-center items-center px-[6px] ">
              <input
                onChange={() => handleSubCheckboxChange(-1, "all")}
                type="checkbox"
              />
            </div>
          </div> */}
          {head?.map((data, i) => (
            <div
            key={i}
              className={` flex ${
                data.title == "" && i == 0
                  ? "overflow-hidde"
                  : i == 0
                  ? "size-full"
                  : ""
              } ${
                data.hidden == true && i != 0
                  ? "overflow-hidden"
                  : i != 0
                  ? "size-full"
                  : ""
              }  h-auto ${i == 0 && "left-[64px] sticky "}   `}
            >
              {i == 0 && (
                <div
                  style={{ backgroundColor: `${tableColor}` }}
                  className={`p-[2px] h-full   `}
                ></div>
              )}
              {i == 0 && (
                <div className="border border-l-0 flex justify-center items-center px-[6px] ">
                  <input
                    onChange={() => handleSubCheckboxChange(-1, "all")}
                    type="checkbox"
                  />
                </div>
              )}
              <div
                style={{ minWidth: `${data.Wid}px` }}
                key={i}
                className={` group border-x  overflow-hidden py-2 text-[14px] text-gray-500 text-center flex justify-center px-2  items-center  size-full h-auto ${
                  i == 0 && " left-[93px] sticky bg-white "
                }  `}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={() => handleDragOver(i)}
                onDragEnd={handleDragEnd}
              >
                {data.title}
              </div>
            </div>
          ))}
        </div>

        <div className="">
          {/* <div
            style={{
              minWidth: `${totalWid}px`,
              display: "flex",
              justifyContent: "start",
            }}
            className={`  group hover:bg-gray-50 hover:shadow-lg bg-green-400  `}
          >
            {head?.map((data, i) => {
              return (
                <div
                  key={i}
                  className={` flex size-full ${
                    i == 0 && " left-[64px] sticky bg-white"
                  }  `}
                >
                  <div className="flex bg-white ">
                    {i == 0 && (
                      <div style={{backgroundColor:`${tableColor}`}} className="p-[2px] h-ful group-hover:bg-green-400   transition-colors "></div>
                    )}
                    {i == 0 && (
                      <div className="border border-l-0 flex justify-center items-center px-[6px] ">
                        <input type="checkbox" />
                      </div>
                    )}
                  </div>

                  <div
                    style={{ minWidth: `${data.Wid}px` }}
                    className={` flex size-full border px-2   `}
                  >
                    {cells == i + 1 ? (
                      <input
                        onKeyPress={handleKeyPress}
                        key={data.title}
                        type="text"
                        name={data.title}
                        value={inputValues[data.title] || ""}
                        onChange={(e) =>
                          handleInputChange(data.title, e.target.value)
                        }
                        className="w-full pl-2 py-1 text-[14px] "
                        placeholder={`${data.title}...`}
                      />
                    ) : (
                      <input
                        key={data.title}
                        type="text"
                        name={data.title}
                        value={inputValues[data.title] || ""}
                        onChange={(e) =>
                          handleInputChange(data.title, e.target.value)
                        }
                        className="w-full pl-2 py-1 text-[14px]  "
                        placeholder={`${data.title}...`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div> */}
          {row?.map((rowData, rowI) => {
            const overLapVal = rowList - rowI;
            return (
              <div
                key={rowI}
                className="w-full  border-x border-l-0 hover:bg-gray-50 hover:shadow-lg "
              >
                <div
                  style={{
                    minWidth: `${totalWid}px`,
                    display: "flex",
                    justifyContent: "start",
                  }}
                  className={` `}
                >
                  {head?.map((header, headerIndex) => {
                    const editActive = () => {
                      if (header.edit == true) {
                        const data = { title: header.slector, rowIndex: rowI };

                        setActiveEdit(data);
                      }
                    };
                    if (
                      rowI == activeEdit?.rowIndex &&
                      activeEdit?.title == header.slector
                    ) {
                      console.log("subgrid")
                    }

                    return (
                      <div
                        key={headerIndex}
                        style={{
                          zIndex: headerIndex === 0 ? overLapVal : undefined,
                        }}
                        className={` flex size-full h-auto ${
                          headerIndex == 0 && " left-[64px] sticky bg-white "
                        } `}
                      >
                        {headerIndex == 0 && (
                          <div
                            style={{ backgroundColor: `${tableColor}` }}
                            className="p-[2px] h-full   "
                          ></div>
                        )}
                        {headerIndex == 0 && (
                          <div className="border border-l-0 flex justify-center items-center px-[6px] ">
                            <input
                              onChange={() =>
                                handleSubCheckboxChange(rowI, rowData)
                              }
                              checked={
                                isSubChecked && isSubChecked(rowI, rowData)
                              }
                              type="checkbox"
                              className="cursor-pointer"
                            />
                          </div>
                        )}

                        {header.status ? (
                          <div
                            style={{ minWidth: `${header.Wid}px` }}
                            className="flex w-full h-full border"
                          >
                            <StatusCell StatusData={rowData[header.slector]} />
                          </div>
                        ) : header.date ? (
                          <div
                            style={{ minWidth: `${header.Wid}px` }}
                            className="flex w-full  h-full border border-t-0 border-l-0 border-[#d0d4e4]"
                          >
                            <GridDateCell data={rowData[header.slector]} />
                          </div>
                        ) : header.customComp && headerIndex != 0 ? (
                          <div
                            onDoubleClick={editActive}
                            style={{ minWidth: `${header.Wid}px` }}
                            className="flex w-full  h-full border"
                          >
                            {" "}
                            {header.slector === activeEdit?.title &&
                            rowI === activeEdit?.rowIndex ? (
                              <input
                                placeholder={rowData[header.slector]}
                                className="w-full text-gray-500 text-[14px] "
                                type="text"
                              />
                            ) : (
                              <header.customComp
                                data={rowData[header.slector]}
                                rowData={rowData}
                                id={id}
                                obj={obj}
                                index={rowI}
                              />
                            )}{" "}
                          </div>
                        ) : (
                          <div
                            onDoubleClick={editActive}
                            style={{ minWidth: `${header.Wid}px` }}
                            className={` px-2 justify-center  w-full flex  text-gray-500 h-full border py-1 `}
                          >
                            {header.slector === activeEdit?.title &&
                            rowI === activeEdit?.rowIndex ? (
                              <input
                                placeholder={rowData[header.slector]}
                                className="w-full text-gray-500 text-[14px]"
                                type="text"
                              />
                            ) : header.customComp && headerIndex == 0 ? (
                              <div className="flex w-full h-full ">
                                {" "}
                                <header.customComp
                                  data={rowData[header.slector]}
                                  rowData={rowData}
                                  index={rowI}
                                  id={id}
                                  obj={obj}
                                  child={true}
                                />{" "}
                              </div>
                            ) : (
                              <p className="text-[14px] py-1 line-clamp-1 ">
                                {rowData[header.slector]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* add product */}

        <div
          style={{
            minWidth: `${totalWid}px`,
            display: "flex",
            justifyContent: "start",
          }}
          className={`  bg-white border   ${
            addButton == true ? "block" : "hidden"
          } border-r border-r-[#d0d4e4]   w-full    `}
        >
          <div className=" sticky left-[64px]   flex z-[60]  ">
            {/* <div
                  className={` ${
                    addButton == true ? "flex" : "hidden"
                  }  px-[10px]   justify-center bg-green-400  items-center `}
                >
                  <span className="bg-transparent p-1 rounded-md">
                    <TfiMoreAlt className="text-[14px] text-transparent" />
                  </span>
                </div> */}
            <div
              className={`w-full ${
                addButton == true ? "flex" : "hidden"
              } rounded-bl-md  border border-[#d0d4e4]  border-b-0  group ${
                focusFooter.set == true && focusFooter.checkTitle == GridTitle
                  ? "bg-[#cce5ff]"
                  : ""
              }   `}
            >
              <div className={` w-[305px] flex`}>
                <div
                  style={{ backgroundColor: `${tableColor}` }}
                  className={`p-[2px] h-full ${
                    focusFooter.set == true &&
                    focusFooter.checkTitle == GridTitle
                      ? ""
                      : "opacity-50 "
                  }   `}
                ></div>

                <div
                  className="border   border-[#d0d4e4] border-l-0 border-y-0 flex justify-center 
                     items-center px-[6px] "
                >
                  <input type="checkbox" />
                </div>

                <div
                  // style={{ minWidth: `${data.Wid}px` }}
                  // key={i}
                  className={` group   py-[1px] text-[14px]   text-customblack leading-[20px] text- 
                       center  flex justify-center  items-center  size-full h-auto `}
                >
                  {/* {i == 0 ? <div className='border-r-2 flex justify-center items-center px-[6px] h-full'><input type="checkbox" /></div> : ""} */}

                  {addButton ? (
                    <div className="text-customblack  leading-[20px] w-full px-2">
                      {GriddFooterAdd ? (
                        <GriddFooterAdd title={GridTitle} id={id} />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* add product */}

        <div
          style={{
            minWidth: `${totalWid}px`,
            display: "flex",
            justifyContent: "start",
          }}
          className={`     bg-white   `}
        >
          <div
            className={`w-full h-[40px] rounded-bl-xl rounded-br-xl border border-[#d0d4e4] border-b-0 border-t-0  
             ${
               addButton == false ? "" : " border-t-0"
             }  border-l-0 flex bg-white`}
          >
            {head?.map((data, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    data.title == "" && i == 0
                      ? "overflow-hidde"
                      : i == 0
                      ? "size-full"
                      : ""
                  } ${
                    data.hidden == true && i != 0
                      ? "overflow-hidden"
                      : i != 0
                      ? "size-full"
                      : ""
                  }  border-t border-t-[#d0d4e4]  flex`}
                >
                  {i == 0 && (
                    <div className={`p-[2px] h-full   bg-transparent `}></div>
                  )}
                  {i == 0 && (
                    <div
                      className="border border-white text-white border-l-0 flex justify-center items- 
                     center  pl-[6px] pr-[9px] "
                    >
                      p
                    </div>
                  )}
                  <div
                    style={{ minWidth: `${data.Wid}px` }}
                    key={i}
                    className={` group ${
                      i != 0 && "border border-[#d0d4e4] border-t-0 border-r-0"
                    } ${i == 1 && "rounded-bl-lg"} ${
                      data.slector == "TOTAL_COST" ||
                      data.slector == "PO_CURRENT_STATUS" ||
                      data.date
                        ? "border-x border-x-[#d0d4e4]"
                        : ""
                    } ${data.b ? "border-l-0  border-x-[#d0d4e4]" : ""}  ${
                      data.title == "" || data.hidden == true
                        ? "hidden"
                        : "flex "
                    } text-[14px]   text-customblack leading-[20px] text-center  justify-center  items- 
                     center  size-full h-auto `}
                  >
                    {data.tottal && data.TComp ? (
                      <div className=" border-x border-x-[#d0d4e4] size-full">
                        <data.TComp />
                      </div>
                    ) : data.tottal ? (
                      <p className="w-full py-1 ">$ 0.00</p>
                    ) : (
                      ""
                    )}
                    {data.Status ? (
                      <div className="w-full  ">
                        <div className="flex cursor-pointer p-2">
                          <div className="w-[30%] bg-yellow-400 text-yellow-400 ">
                            -
                          </div>
                          <div className="w-[20%] bg-orange-400 text-orange-400">
                            -
                          </div>

                          <div className="w-2/4 bg-green-400 text-green-400">
                            -
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {data.date ? (
                      <div className="w-full p-2">
                        <div
                          className="bg-blue-400 text-white text-[13px] max-w-[170px] m-auto py-[1px] 
                         leading-[22px] w-full flex justify-center items-center rounded-full"
                        >
                          <p>2 jan</p>
                          <p className="px-[2px]">-</p>

                          <p>15 jan</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubGrid;

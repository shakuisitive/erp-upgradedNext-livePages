"use client";
import React, { useEffect, useState, useRef } from "react";
import SubGrid from "./SubGrid";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import GridFilter from "./GridFilter";
import StatusCell from "./GridStatusCell";
import GridDateCell from "./GridDateCell";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ModalOpen from "./ModalOpen";
import GridFilterNum from "./GridFilterNum";
import GridCheckFilter from "./GridCheckFilter";
import { TiArrowUnsorted } from "react-icons/ti";
import GridDateFilter from "./GridDateFilter";
import TooltipStatus from "../../../../app/(protected)/stock/(routes)/purchase/_components/PurchaseTooltipTemp";
import Tooltip from "../tooltip/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { IoIosMore } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";
import ResizableDiv from "./RecizeAble";

const GridTest = ({
  head,
  row,
  subHead,
  setHead,
  setSubHead,
  GridTitle,
  GridColor,
  GridColaps,
  colaps,
  setColaps,
  colapsfunc,
  addButton,
  GriddFooterAdd,
  SubGriddFooterAdd,
  selectedRow,
  isChecked,
  handleCheckboxChange,
  MoreOpt,
  moreOptShow = false,
  setEdite,
  hActive,
  setHActive,
  tableHRef,
  subActiveKey,
  subInActiveVal,
  subGridOpen,
  subRow,
  subAddButton,
  idKey,
  handleSubCheckboxChange,
  isSubChecked,
  Pagination,
  checkBoxShow = true,

  countName = "Product",
}) => {
  const [dropDown, setDropDown] = useState();
  const [cells, setCells] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [totalWid, setTotalWid] = useState(0);
  const [activeEdit, setActiveEdit] = useState();
  const [rowList, setRowList] = useState(0);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [rowData, setRowData] = useState();

  const [tableColor, setTableColor] = useState();
  const [footerTottal, setFooterTottal] = useState([]);
  // const [hActive,setHActive] = useState({})
  const inputRef = useRef(null);
  const focusFooter = useSelector((state) => state.PurchaseSlices.focusFooter);
  // console.log('action check subRow' , subRow);
  useEffect(() => {
    setCells(head.length);

    const newTotalWid = head.reduce((acc, data) => {
      // Check if data.Wid is a valid number
      const widValue = Number(data.Wid ? data.Wid : 100);
      if (!isNaN(widValue)) {
        return acc + widValue;
      }
      return acc;
    }, 0);

    setTotalWid(newTotalWid);
  }, [head]);

  useEffect(() => {
    if (subRow?.length == 0) {
      setDropDown(-1);
    }
  }, [subRow]);

  useEffect(() => {
    setRowList(row?.length);
    setRowData(row);
  }, [row]);

  useEffect(() => {
    setTableColor(GridColor);
  }, [GridColor]);

  useEffect(() => {
    setColaps(GridColaps);
  }, [GridColaps]);

  // drag drop

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

  const setSort = () => {
    setRowData([...rowData].reverse());
  };

  const getTotttalField = () => {
    head.map((data) => {
      if (data.tottal) {
        setFooterTottal([
          ...footerTottal,
          { tottalName: data.tottal, tottalCount: 0 },
        ]);
      }
    });
  };

  useEffect(() => {
    getTotttalField();
  }, [head]);

  const getRowTottal = () => {
    row?.map((rowData) => {
      head.map((headData) => {
        const findeFooter = footerTottal.find(
          (item) => item.tottalName == rowData[headData.slector]
        );
      });
    });
  };

  useEffect(() => {
    getRowTottal();
  }, [row, footerTottal]);

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //   }
  // };

  const PaginationComp = Pagination?.Comp;

  const widthHandle = (widP, indexP) => {
    //  let itemH = [...head];
    // console.log('handlecheckwidGrid' , widP , indexP , itemH[indexP]?.Wid );

    //    itemH[indexP].Wid = widP
    //    setHead(itemH)

    let itemH = [...head]; // Assuming head is an array of objects

    // console.log('handlecheckwidGrid', widP, indexP, itemH[indexP]?.Wid);

    // Create a new object with the updated Wid property
    const updatedItem = { ...itemH[indexP], Wid: widP };

    // Replace the existing object in the array with the new object
    itemH[indexP] = updatedItem;

    setHead(itemH);
  };

  // console.log('check page in comp' , Pagination?.Comp);
  return (
    <div className=" w-full   ">
      {/* title by Ali Ahmad */}
      <div
        onClick={colapsfunc}
        style={{ color: `${tableColor}` }}
        className={`flex w-full  cursor-pointer items-center p-2 pl-[50px]   group`}
      >
        <div className="flex sticky left-12 items-center  ">
          <div>
            <MdOutlineKeyboardArrowDown className=" text-[20px] mr-1" />
          </div>
          <p className=" font-medium poppins  text-[18px]">{GridTitle}</p>
          <div>
            <p className="text-[14px]  text-gray-400 ml-2 block ">
              {rowList} {countName}
            </p>
          </div>
        </div>
      </div>

      <div className=" rounded-lg  h-fit min-w-full w-fit  pr-[6px]">
        <div className={`w-full ${cells == 0 ? "hidden" : "block"} h-fit  `}>
          {/* head by Ali Ahmad */}

          <div
            style={{
              minWidth: `${totalWid}px`,
              display: "flex",
              justifyContent: "start",
              // position: "sticky",
            }}
            className={` rounded-tl-lg   border-b-[#d0d4e4] top-0  bg-white `}
          >
            <div className={` px-[10px] flex justify-center items-center `}>
              <span className="bg-transparent p-1 rounded-md">
                <TfiMoreAlt className="text-[14px] text-transparent" />
              </span>
            </div>
            {head?.map((data, i) => {
              const setHeaderActive = (i, title, slec) => {
                // console.log("kia ho rha hai", i, title, slec);
                setHActive({ indexH: i, titleH: title, slecH: slec });
              };
              return (
                <div
                  key={i}
                  className={` flex ${
                    data?.title == "" && i == 0
                      ? "overflow-hidde"
                      : i == 0
                      ? "size-full"
                      : ""
                  } ${
                    data?.hidden == true && i != 0
                      ? "overflow-hidden"
                      : i != 0 && data?.resize != true
                      ? "size-full"
                      : ""
                  }  h-auto  ${i == 0 && "  bg-white sticky left-[42px]"} `}
                >
                  {/* {i == 0 && (
                    <div
                      className={` px-[10px] flex justify-center items-center `}
                    >
                      <span className="bg-transparent p-1 rounded-md">
                        <TfiMoreAlt className="text-[14px] text-transparent" />
                      </span>
                    </div>
                  )} */}
                  {i == 0 && (
                    <div
                      style={{ backgroundColor: `${tableColor}` }}
                      className={`p-[2px] h-full sticky left-[42px]`}
                    ></div>
                  )}
                  {i == 0 && (
                    <div
                      className={`border border-[#d0d4e4] border-l-0 left-[42px] ${
                        checkBoxShow == true ? "flex" : "hidden"
                      } flex justify-center sticky items-center px-[6px] `}
                    >
                      <input
                        onChange={() => handleCheckboxChange(-1, "all")}
                        type="checkbox"
                        className="cursor-pointer"
                      />
                    </div>
                  )}
                  {data.resize == true ? (
                    <ResizableDiv
                      index={i}
                      widthHandle={widthHandle}
                      defWid={data.Wid}
                    >
                      <div
                        style={{ minWidth: `${data.Wid ? data.Wid : "100"}px` }}
                        key={i}
                        className={` group border-r border-y border-y-[#d0d4e4] border-r-[#d0d4e4]  py-1 ${
                          data.title == "" ? "hidden" : ""
                        } ${
                          data.hidden == true && i != 0 ? "hidden" : ""
                        } text-[14px]  text-customblack leading-[20px] text-center  flex justify-center  items-center  size-full h-auto `}
                        draggable
                        onDragStart={() => handleDragStart(i)}
                        onDragOver={() => handleDragOver(i)}
                        onDragEnd={handleDragEnd}
                        onDoubleClick={() =>
                          setHeaderActive(i, data.title, data.slector)
                        }
                      >
                        {hActive?.indexH == i &&
                        hActive?.titleH == data.title ? (
                          <div className="w-full">
                            <input
                              onKeyPress={(e) =>
                                setEdite(e, i, data.title, data.slector)
                              }
                              className="w-full pl-3 outline-none"
                              placeholder="Title"
                              type="text"
                            />
                          </div>
                        ) : (
                          <div className="flex w-full items-center">
                            <p className="w-full py-1 "> {data.title}</p>
                            {data.filter && data.filter == "textFilter" ? (
                              <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                                <span className="hidden group-hover:block  duration-300">
                                  <GridFilter />
                                </span>
                              </span>
                            ) : data.filter && data.filter == "NumberFilter" ? (
                              <span className="hidden group-hover:block">
                                <GridFilterNum />
                              </span>
                            ) : (
                              ""
                            )}
                            {data.filter && data.filter == "checkFilter" ? (
                              <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                                <span className="hidden group-hover:block  duration-300">
                                  <GridCheckFilter
                                    options={data?.checkFilterOptions}
                                  />
                                </span>
                              </span>
                            ) : (
                              ""
                            )}

                            {data.date ? (
                              <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                                <span className="hidden group-hover:block  duration-300">
                                  <GridDateFilter />
                                </span>
                              </span>
                            ) : (
                              ""
                            )}

                            <div className="w-[0px] group-hover:w-[40px] transition-all -translate-x-3 group-hover:translate-x-0 duration-300 group-hover:px-1">
                              <div className=" hidden group-hover:block   ">
                                <TiArrowUnsorted onClick={setSort} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ResizableDiv>
                  ) : (
                    <div
                      style={{ minWidth: `${data.Wid ? data.Wid : "100"}px` }}
                      key={i}
                      className={` group border-r border-y border-y-[#d0d4e4] border-r-[#d0d4e4]  py-1 ${
                        data.title == "" ? "hidden" : ""
                      } ${
                        data.hidden == true && i != 0 ? "hidden" : ""
                      } text-[14px]  text-customblack leading-[20px] text-center  flex justify-center  items-center  size-full h-auto `}
                      draggable
                      onDragStart={() => handleDragStart(i)}
                      onDragOver={() => handleDragOver(i)}
                      onDragEnd={handleDragEnd}
                      onDoubleClick={() =>
                        setHeaderActive(i, data.title, data.slector)
                      }
                    >
                      {hActive?.indexH == i && hActive?.titleH == data.title ? (
                        <div className="w-full">
                          <input
                            onKeyPress={(e) =>
                              setEdite(e, i, data.title, data.slector)
                            }
                            className="w-full pl-3 outline-none"
                            placeholder="Title"
                            type="text"
                          />
                        </div>
                      ) : (
                        <div className="flex w-full items-center">
                          <p className="w-full py-[6px] "> {data.title}</p>
                          {data.filter && data.filter == "textFilter" ? (
                            <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                              <span className="hidden group-hover:block  duration-300">
                                <GridFilter />
                              </span>
                            </span>
                          ) : data.filter && data.filter == "NumberFilter" ? (
                            <span className="hidden group-hover:block">
                              <GridFilterNum />
                            </span>
                          ) : (
                            ""
                          )}
                          {data.filter && data.filter == "checkFilter" ? (
                            <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                              <span className="hidden group-hover:block  duration-300">
                                <GridCheckFilter
                                  options={data?.checkFilterOptions}
                                />
                              </span>
                            </span>
                          ) : (
                            ""
                          )}

                          {data.date ? (
                            <span className=" w-[0px] group-hover:w-[40px] transition-all -translate-x-8 group-hover:translate-x-0 duration-300  ">
                              <span className="hidden group-hover:block  duration-300">
                                <GridDateFilter />
                              </span>
                            </span>
                          ) : (
                            ""
                          )}

                          <div className="w-[0px] group-hover:w-[40px] transition-all -translate-x-3 group-hover:translate-x-0 duration-300 group-hover:px-1">
                            <div className=" hidden group-hover:block   ">
                              <TiArrowUnsorted onClick={setSort} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* table by Ali Ahmad */}
          <div

          // className={` ${colaps ? "   hidden" : "  block "}  `}
          >
            {rowData?.map((rowData, rowI) => {
              const subLentgh = rowData?.childrenData?.length;
              const overLapVal = rowList - rowI;
              const findSubOrder = subRow?.find(
                (data) => data.id == rowData[idKey]
              );

              return (
                <div
                  key={rowI}
                  className={`w-full group hover:bg-gray-50 hover:shadow-lg   ${
                    colaps && rowI > 2 ? "   hidden" : "  block "
                  }  `}
                >
                  <div
                    style={{
                      minWidth: `${totalWid}px`,
                      display: "flex",
                      justifyContent: "start",
                    }}
                    className={` `}
                  >
                    <div className=" bg-white left-0 ">
                      {MoreOpt ? (
                        <div className="  pt-2">
                          <MoreOpt index={rowI} rowData={rowData} />
                        </div>
                      ) : !MoreOpt ? (
                        <div
                          className={` px-[10px] bg-white flex justify-center items-center `}
                        >
                          <span
                            onClick={() => selectedRow(rowI, rowData)}
                            className="hover:bg-[#dcdfec] bg-transparent p-1 cursor-pointer  rounded-md"
                          >
                            <TfiMoreAlt
                              className={`text-[14px] text-transparent  ${
                                moreOptShow == true &&
                                "group-hover:text-customblack"
                              } `}
                            />
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {head.map((header, headerIndex) => {
                      const editActive = () => {
                        if (header.edit == true) {
                          const data = {
                            title: header.slector,
                            rowIndex: rowI,
                          };
                          setActiveEdit(data);
                          // inputRef?.current?.select();
                        }
                      };
                      const handleKeyPress = (event) => {
                        if (event.key === "Enter") {
                          setActiveEdit("");
                        }
                      };

                      if (
                        rowI == activeEdit?.rowIndex &&
                        activeEdit?.slector == header.slector
                      ) {
                        // console.log(
                        //   "good ho gia",
                        //   header.title,
                        //   rowI,
                        //   activeEdit?.rowIndex
                        // );
                      }

                      return (
                        <div
                          style={
                            {
                              // zIndex: headerIndex === 0 ? overLapVal : undefined,
                            }
                          }
                          key={headerIndex}
                          className={` flex ${
                            header.title == "" && headerIndex == 0
                              ? ""
                              : headerIndex == 0
                              ? "size-full"
                              : ""
                          }  ${
                            header.hidden == true && headerIndex != 0
                              ? "overflow-hidden hidden"
                              : headerIndex != 0 && header.resize != true
                              ? "size-full"
                              : ""
                          }   h-auto ${
                            headerIndex == 0 &&
                            "sticky left-[42px] bg-white z-10  "
                          }  `}
                        >
                          {/* {MoreOpt && headerIndex == 0 ? (
                            <div className="bg-white  pt-2">
                              <MoreOpt index={rowI} rowData={rowData} />
                            </div>
                          ) : (
                            headerIndex == 0 && (
                              <div
                                className={` px-[10px] bg-white flex justify-center items-center `}
                              >
                                <span
                                  onClick={() => selectedRow(rowI, rowData)}
                                  className="hover:bg-[#dcdfec] bg-transparent p-1 cursor-pointer  rounded-md"
                                >
                                  <TfiMoreAlt className="text-[14px] text-transparent group-hover:text-customblack" />
                                </span>
                              </div>
                            )
                          )} */}
                          {headerIndex == 0 && (
                            <div
                              style={{ backgroundColor: `${tableColor}` }}
                              className={`p-[2px] h-full    `}
                            ></div>
                          )}
                          {headerIndex == 0 && (
                            <div
                              className={` border border-[#d0d4e4] cursor-pointer border-l-0 border-t-0  ${
                                checkBoxShow == true ? "flex" : "hidden"
                              } justify-center items-center px-[6px] `}
                            >
                              <input
                                onChange={() =>
                                  handleCheckboxChange(rowI, rowData)
                                }
                                checked={isChecked(rowI, rowData)}
                                type="checkbox"
                                className="cursor-pointer"
                              />
                            </div>
                          )}
                          {/* {headerIndex === 0 && (
                            <div
                              className={`border border-[#d0d4e4] cursor-pointer border-l-0 border-t-0 ${
                                checkBoxShow ? "flex" : "hidden"
                              } justify-center items-center px-[6px] h-full`} // Ensure it occupies full height
                              style={{ minHeight: "40px" }} // Set a minimum height to keep space consistent
                            >
                              <input
                                onChange={() =>
                                  handleCheckboxChange(rowI, rowData)
                                }
                                checked={isChecked(rowI, rowData)}
                                type="checkbox"
                                className="cursor-pointer"
                              />
                            </div>
                          )} */}

                          {header.Status ? (
                            <div
                              style={{
                                minWidth: `${
                                  header?.Wid ? header?.Wid : "100"
                                }px`,
                              }}
                              className="flex w-full  h-full border border-t-0 border-l-0 border-[#d0d4e4]"
                            >
                              <header.Status
                                data={rowData[header.slector]}
                                index={rowI}
                                rowData={rowData}
                              />
                            </div>
                          ) : header.date ? (
                            <div
                              style={{
                                minWidth: `${
                                  header?.Wid ? header?.Wid : "100"
                                }px`,
                              }}
                              className="flex w-full  h-full border border-t-0 border-l-0 border-[#d0d4e4]"
                            >
                              <GridDateCell data={rowData[header.slector]} />
                            </div>
                          ) : header.customComp && headerIndex != 0 ? (
                            <div
                              onDoubleClick={editActive}
                              style={{
                                minWidth: `${
                                  header?.Wid ? header?.Wid : "100"
                                }px`,
                              }}
                              className="flex w-full  h-full border border-t-0 border-l-0 border-[#d0d4e4]"
                            >
                              {" "}
                              {header.slector === activeEdit?.title &&
                              rowI === activeEdit?.rowIndex ? (
                                <input
                                  ref={inputRef}
                                  placeholder={rowData[header.slector]}
                                  className="w-full text-customblack leading-[23px] text-[14px] "
                                  type="text"
                                  // onDoubleClick={(rowData[header.slector]) => rowData[header.slector].target.Select()}
                                  onDoubleClick={() =>
                                    inputRef.current &&
                                    inputRef.current.select()
                                  }
                                  defaultValue={rowData[header.slector]}
                                />
                              ) : (
                                <header.customComp
                                  data={rowData[header.slector]}
                                  index={rowI}
                                  rowData={rowData}
                                  onHandleClick={header.onHandleClick}
                                />
                              )}{" "}
                            </div>
                          ) : (
                            <div
                              onDoubleClick={editActive}
                              style={{
                                minWidth: `${
                                  header?.Wid ? header?.Wid : "100"
                                }px`,
                              }}
                              className={` ${
                                headerIndex != 0
                                  ? "px-2 justify-center "
                                  : "overflow-hidden"
                              } ${
                                header.title == "" && headerIndex == 0
                                  ? "hidden"
                                  : "flex"
                              } ${
                                header.hidden == true && headerIndex != 0
                                  ? "hidden"
                                  : "flex"
                              }  size-full   items-center  text-customblack leading-[23px] h-full border border-t-0 border-l-0 border-[#d0d4e4] group `}
                            >
                              {/* {headerIndex == 0 && rowData.childrenData ? */}
                              <div
                                className={` ${
                                  headerIndex == 0 ? "flex" : "hidden"
                                }`}
                              >
                                <div
                                  className={` ${
                                    headerIndex == 0 &&
                                    rowData?.[subActiveKey] &&
                                    rowData?.[subActiveKey] != subInActiveVal
                                      ? "group-hover:visible"
                                      : ""
                                  } invisible  text-gray-400`}
                                >
                                  {" "}
                                  {dropDown == rowI ? (
                                    <RiArrowDropUpLine
                                      onClick={() => {
                                        setDropDown(-1);
                                        subGridOpen(rowData, "close");
                                      }}
                                      className="text-[25px]"
                                    />
                                  ) : (
                                    <RiArrowDropDownLine
                                      onClick={() => {
                                        setDropDown(rowI);
                                        subGridOpen(rowData, "open");
                                      }}
                                      className="text-[25px]"
                                    />
                                  )}
                                </div>
                              </div>
                              {/* // : ""} */}
                              {header.slector === activeEdit?.title &&
                              rowI === activeEdit?.rowIndex ? (
                                <input
                                  onDoubleClick={(data) => {
                                    data.target.select();
                                    data.target.focus();
                                  }}
                                  placeholder={rowData[header.slector]}
                                  onKeyPress={handleKeyPress}
                                  className="w-full text-customblack leading-[23px] text-[14px] "
                                  type="text"
                                />
                              ) : // <input
                              //   onDoubleClick={(e) => e.target.select()} // Use e to select text
                              //   placeholder={rowData[header.slector]}
                              //   onChange={(e) =>
                              //     setInputValue(e.target.value)
                              //   } // Update state on input change
                              //   onKeyPress={(e) => {
                              //     if (e.key === "Enter") {
                              //       setActiveEdit(""); // Clear active edit state on Enter
                              //     }
                              //   }}
                              //   className="w-full text-customblack leading-[23px] text-[14px]"
                              //   type="text"
                              // />
                              headerIndex == 0 ? (
                                <div className="flex w-full h-full ">
                                  {" "}
                                  <ModalOpen
                                    data={rowData[header.slector]}
                                    rowIndex={rowData}
                                    Modall={header?.Modal}
                                    Drawer={header?.Drawer}
                                    child={
                                      header?.child ? header?.child : false
                                    }
                                    length={rowData[subActiveKey]}
                                  />{" "}
                                </div>
                              ) : rowData[header.slector]?.length > 20 ? (
                                <Tooltip content={rowData[header.slector]}>
                                  <div className="">
                                    <p className="text-[14px] line-clamp-1 py-1">
                                      {`${rowData[header.slector].slice(
                                        0,
                                        20
                                      )}...`}
                                    </p>
                                  </div>
                                </Tooltip>
                              ) : (
                                <div className="">
                                  <p className="text-[14px] line-clamp-1 py-1">
                                    {rowData[header.slector]}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {subHead && (
                    <div
                      className={`ml- pl-   bg-white w-full  ${
                        dropDown == rowI ? "flex" : "hidden"
                      }`}
                    >
                      <div className="pl-11  border-l border-l-white left-0 sticky z-[1] bg-white ">
                        {" "}
                      </div>

                      <div></div>
                      <div className=" flex  w-full   pl-">
                        <div
                          style={{ borderLeft: `solid ${tableColor} 1px ` }}
                          className={`pl-1 border-l left-[44px] z-[2] sticky `}
                        ></div>
                        <div className="overflow-hidden  z-[1] pl-5 bg-white left-[46px] sticky"></div>
                        <div className="py-5  w-full ">
                          <SubGrid
                            dropDown={dropDown}
                            Subdata={findSubOrder?.product}
                            id={findSubOrder?.id}
                            obj={findSubOrder}
                            addButton={subAddButton}
                            setHead={setSubHead}
                            head={subHead}
                            handleSubCheckboxChange={handleSubCheckboxChange}
                            isSubChecked={isSubChecked}
                            tableColor={tableColor}
                            GriddFooterAdd={SubGriddFooterAdd}
                            GridTitle={GridTitle}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 z-20 ">
            {/* add product */}

            <div
              style={{
                minWidth: `${totalWid}px`,
                display: "flex",
                justifyContent: "start",
              }}
              className={`  bg-white  ${
                addButton == true ? "block" : "hidden"
              } border-r border-r-[#d0d4e4]   w-full    `}
            >
              <div className=" sticky left-0  flex  ">
                <div
                  className={` ${
                    addButton == true ? "flex" : "hidden"
                  }  px-[10px]   justify-center   items-center `}
                >
                  <span className="bg-transparent p-1 rounded-md">
                    <TfiMoreAlt className="text-[14px] text-transparent" />
                  </span>
                </div>
                <div
                  className={`w-full ${
                    addButton == true ? "flex" : "hidden"
                  } rounded-bl-md  border border-[#d0d4e4]  border-b-0  group ${
                    focusFooter.set == true &&
                    focusFooter.checkTitle == GridTitle
                      ? "bg-[#cce5ff]"
                      : ""
                  }   `}
                >
                  <div className={` w-auto flex`}>
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
                      className={`border  border-[#d0d4e4] border-l-0 border-y-0 ${
                        checkBoxShow == true ? "flex" : "hidden"
                      } flex justify-center items-center px-[6px] `}
                    >
                      <input type="checkbox" />
                    </div>
                    {/* style={{ minWidth: `${head[0]?.Wid}px` }} */}
                    <div
                      style={{ minWidth: `${(head[0]?.Wid || 0) - 2}px` }}
                      // key={i}
                      className={` group   py-[4px] text-[14px]   text-customblack leading-[20px] text-center  flex justify-center  items-center  size-full h-auto `}
                    >
                      {/* {i == 0 ? <div className='border-r-2 flex justify-center items-center px-[6px] h-full'><input type="checkbox" /></div> : ""} */}

                      {addButton ? (
                        <div className="text-customblack  leading-[20px] w-full px-1">
                          {GriddFooterAdd ? (
                            <GriddFooterAdd title={GridTitle} />
                          ) : Pagination ? (
                            <PaginationComp
                              pageCount={Pagination?.pageCount}
                              handlePagination={Pagination?.func}
                              totalRow={Pagination?.totalRow}
                              title={GridTitle}
                            />
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
                className={`w-full rounded-bl-xl rounded-br-xl border border-[#d0d4e4] border-b-0 border-t-0 ${
                  addButton == false ? "" : " border-t-0"
                }  border-l-0 flex  `}
              >
                <div
                  className={` px-[10px] bg-transparent bg-white sticky left-0 flex justify-center items-center `}
                >
                  <span className="bg-transparent  p-1 rounded-md">
                    <TfiMoreAlt className="text-[14px] text-transparent" />
                  </span>
                </div>
                {head?.map((data, i) => {
                  // console.log("log footer slecter", data.slector);

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
                          : i != 0 && data.resize != true
                          ? "size-full"
                          : ""
                      } ${
                        i == 0 && "bg-white sticky left-[42px] "
                      } border-t border-t-[#d0d4e4]  flex`}
                    >
                      {i == 0 && (
                        <div
                          className={`p-[2px] h-full  bg-transparent  `}
                        ></div>
                      )}
                      {i == 0 && (
                        <div
                          className={`border border-white text-white border-l-0  justify-center items-center pl-[6px] pr-[9px] ${
                            checkBoxShow == true ? "flex" : "hidden"
                          } `}
                        >
                          p
                        </div>
                      )}
                      <div
                        style={{ minWidth: `${data.Wid ? data.Wid : "100"}px` }}
                        key={i}
                        className={` group ${
                          i != 0 &&
                          "border border-[#d0d4e4] border-t-0 border-r-0"
                        } ${i == 1 && "rounded-bl-lg"} ${
                          data.slector == "TOTAL_COST" ||
                          data.slector == "PO_CURRENT_STATUS" ||
                          data.date
                            ? "border-x border-x-[#d0d4e4]"
                            : ""
                        } ${data.b ? "border-l  border-x-[#d0d4e4]" : ""}  ${
                          data.title == "" || data.hidden == true
                            ? "hidden"
                            : "flex "
                        } text-[14px]   text-customblack leading-[20px] text-center  justify-center  items-center w-full h-[40px]`}
                      >
                        {/* {i == 0 ? <div className='border-r-2 flex justify-center items-center px-[6px] h-full'><input type="checkbox" /></div> : ""} */}
                        {data.tottal && data.TComp ? (
                          <div className="size-full">
                            <data.TComp />
                          </div>
                        ) : data.tottal ? (
                          <p className="w-full py-1 ">$ 0.00</p>
                        ) : (
                          ""
                        )}
                        {data.Status ? (
                          <div className=" w-full h-[40px] text-center  justify-center items-center  ">
                            <div className="flex cursor-pointer p-2 ">
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
                          <div className="w-full px-3">
                            <div className="bg-blue-400 my-1  text-white text-[13px] max-w-[170px] m-auto py-[1px] leading-[22px] w-full flex justify-center items-center rounded-full">
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
      </div>
    </div>
  );
};

export default GridTest;

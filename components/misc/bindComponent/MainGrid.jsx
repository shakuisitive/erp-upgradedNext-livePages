import React, { useState, useRef, useEffect } from "react";
import GridTable from "../pureComponents/GridTable/GridTable";
import useApiFetch from "../../../customHook/useApiFetch";
import FilterTabs from "./FilterTabs";
import { FiFilter } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import GridPagination from "../../Ui/gridPagination/GridPagination";
import CustomScrollBar from "../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import { PlusIcon } from "@heroicons/react/20/solid";
import PaginationGridButton from "../pureComponents/buttons/PaginationGridButton";

const MainGrid = ({
  gridArr,
  setGridArr,
  handleApi,
  defColmn,
  setDefColmn,
  filterTabs,
  refresh,
  setRefresh,
  toolBar = true,
  refArray,
  scroll,
  collapse,
}) => {
  const dragItem = useRef();
  const activeGridRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [active, setActive] = useState(true);
  let [error, sendRequest] = useApiFetch();
  let [apiData, setApiData] = useState();
  let [hideColumnDef, setHideColumnDef] = useState();
  const [resetSearch, setResetSearch] = useState(false);
  const [isOpenF, setIsOpenF] = useState(false);
  const [paginationTo, setPaginationTo] = useState(25);
  const [checkNum, setCheckNum] = useState(25);
  const [scrollChange, setScrollChange] = useState(1);
  const [hActive, setHActive] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [label, setLabel] = useState();
  useEffect(() => {
    if (defColmn?.length > 0 && !hideColumnDef) {
      setHideColumnDef(defColmn);
    }
  }, [defColmn]);

  useEffect(() => {
    setApiData(handleApi);
  }, [handleApi]);
  // console.log("totalrow", gridArr);

  useEffect(() => {
    if (refresh == true) {
      setApiData(handleApi);
      if (apiData?.length > 0) {
        apiData.map((data) => {
          sendRequest(data.api, "POST", data.payload, data.func, data.token);
        });
      }
      setRefresh(false);
    }
  }, [refresh]);

  // useEffect(() => {
  //   if(gridArr?.length > 0){
  //   const container = activeGridRef.current;

  //   const handleOverflowChange = (entries) => {
  //     setScrollChange((pre) => pre + 1);
  //   };
  //   const resizeObserver = new ResizeObserver(handleOverflowChange);
  //   resizeObserver.observe(container);

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }
  // }, [gridArr]);

  const handleDragStart = (index) => {
    setActive(false);
    setDraggedIndex(index);
    dragItem.current = index;
  };

  const handleDragOver = (index) => {
    if (draggedIndex !== null) {
      const items = [...gridArr];
      const draggedItem = items[draggedIndex];
      items.splice(draggedIndex, 1);
      items.splice(index, 0, draggedItem);
      setGridArr(items);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    dragItem.current = null;
    setActive(true);
  };

  useEffect(() => {
    if (apiData?.length > 0) {
      apiData.map((data) => {
        sendRequest(data.api, "POST", data.payload, data.func, data.token);
      });
    }
  }, [apiData]);

  //   useEffect(() => {
  //     if(gridArr?.length > 0){
  //       activeGridRef.current = Array(gridArr?.length)
  //       .fill()
  //       .map((_, index) => activeGridRef.current[index] || useRef(null));
  //     }

  // }, [gridArr]);

  const handleSearch = (e) => {
    // Map over apiData and update the SEARCH property
    const filter = apiData?.map((data) => {
      // Create a new object with updated SEARCH property
      return {
        ...data,
        payload: {
          ...data.payload,
          data: {
            ...data.payload.data,
            SEARCH: e, // Assuming e is the new search value
          },
        },
      };
    });

    setApiData(filter);
  };
  const options = [
    { label: "Show 25", value: 25 },
    { label: "Show 50", value: 50 },
    { label: "Show 100", value: 100 },
    { label: "Show 500", value: 500 },
  ];

  const handleOptionClick = (value) => {
    if (value !== selectedValue) {
      setSelectedValue(value);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (selectedValue !== null) {
      console.log("Updating data row change with:", selectedValue);
      setDataRowChange(selectedValue);
    }
  }, [selectedValue]);

  const setDataRowChange = (value) => {
    const filter = apiData?.map((data) => {
      return {
        ...data,
        payload: {
          ...data.payload,
          data: {
            ...data.payload.data,
            RNUM_TO: value,
          },
        },
      };
    });

    setApiData(filter);
    setPaginationTo(value);
    setLabel(value);
  };

  const handleFilterM = (e) => {
    // dispatch(gridFilter(e))
    setIsOpenF(false);
    filterTabs?.filter?.handleFilter(e);
    // console.log('filter state in filter ====e' , e);
  };
  const handleHidden = (e) => {
    // console.log('check GridTitle hide' , hideColumnDef , e);

    setDefColmn(e);
  };
  const tabs = {
    actionBtn: {
      option: filterTabs?.actionBtn?.option,
      label: filterTabs?.actionBtn?.label,
      icon: filterTabs?.actionBtn?.icon,
      onClick: filterTabs?.actionBtn?.onClick,
    },

    search: {
      handleSearch: handleSearch,
      resetSearch: resetSearch,
      setResetSearch: setResetSearch,
      searchShow: filterTabs?.search?.searchShow,
    },
    sort: {},
    filter: {
      popup: {
        icon: FiFilter,
        wid: "970px",
        lable: "Filter",
      },
      setIsOpen: setIsOpenF,
      handleFilter: handleFilterM,
      FilterComp: filterTabs?.filter?.FilterComp,
    },
    hide: {
      popup: {
        icon: BiHide,
        wid: "360px",
        lable: "Hide",
      },
      Value: defColmn,
      handleHidden: handleHidden,
      defaultVal: hideColumnDef,
    },
    navigator: {},
  };

  const handlePagination = (num, numT, title) => {
    if (!apiData || !Array.isArray(apiData)) {
      // console.error('apiData is not defined or not an array');
      return; // Exit the function if apiData is not defined or not an array
    }

    const filter = apiData.filter((data) => data.title === title);

    const filterEdite = filter?.map((data) => {
      return {
        ...data,
        payload: {
          ...data.payload,
          data: {
            ...data.payload.data,
            RNUM_TO: numT,
            RNUM_FROM: num,
          },
        },
      };
    });

    if (filterEdite) {
      if (numT == checkNum) {
        // console.log('check filter edit match ' );
      } else {
        // console.log('check filter edit ' , filterEdite , num , numT , title);
        sendRequest(
          filterEdite[0]?.api,
          "POST",
          filterEdite[0]?.payload,
          filterEdite[0]?.func,
          filterEdite[0]?.token
        );
        setCheckNum(numT);
      }
    }
  };

  const setEdite = (e, i, title, selector) => {
    if (e.key === "Enter" && e.target.value !== "hidden") {
      // // console.log('check key press header', i, title, selector);
      const updatedHead = [...defColmn]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], title: e.target.value }; // Update the specific item's title
      updatedHead[i] = { ...updatedHead[i], def: true };
      setDefColmn(updatedHead); // Update the local state
      // let hData = {
      //   index: i,
      //   hData: e.target.value,
      //   cat: true,
      // };
      // dispatch(setHeadReduxT(hData));
      // setHActive({}); // Assuming this sets the active state
    } else if (e.key === "Enter" && e.target.value === "hidden") {
      const updatedHead = [...head]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], hidden: true }; // Update the specific item's hidden property
      setDefColmn(updatedHead); // Update the local state
      // setHActive({}); // Assuming this sets the active state
      // dispatch(setHeadRedux(updatedHead)); // Dispatch action to update Redux state
    }
  };

  const addGroup = () => {
    let gridArrShadow = [...gridArr];
    // gridArrShadow
  };
  return (
    <div>
      <div
        className={`w-full pl-10 pt-3 pb-1 ${toolBar == false && "hidden"} `}
      >
        <FilterTabs
          tabs={tabs}
          filterTool={filterTabs?.filterTool}
          searchShow={filterTabs?.search?.searchShow}
          filterShow={filterTabs?.filterShow}
          hideShow={filterTabs?.hideShow}
          sortShow={filterTabs?.sortShow}
          navigatorShow={filterTabs?.navigatorShow}
        />
      </div>
      <CustomScrollBar change={scroll} refsArray={refArray}>
        {/* <div ref={activeGridRef} > */}
        {gridArr?.map((data, index) => {
          return (
            <div
              ref={data.ref}
              // key={data?.pvId || index} 
              // ref={activeGridRef}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
              className={
                data?.paginationList?.fixHight == "def"
                  ? ` my-2 overflow-y-auto overflow-x-hidden   mr- h-fit max-h-[450px] `
                  : data?.paginationList?.fixHight &&
                    data?.paginationList?.fixHight != "def"
                  ? ` my-2 overflow-y-auto overflow-x-hidden   mr- h-fit max-h-[${data?.paginationList?.fixHight}px] `
                  : "  overflow-x-hidden   mt-1 h-fit mr- "
              }
            >
              <GridTable
                head={data?.colmnList?.colmn}
                row={data?.data?.Griddata}
                setHead={data?.colmnList?.setColmn}
                setSubHead={data?.subColumnList?.setSubColmn}
                subRow={data?.data?.subGridData}
                subHead={data?.subColumnList?.subComln}
                GridTitle={data?.title?.GridTitle}
                GridColor={data?.title?.GridColor}
                GridColaps={data?.colapsList?.GridColaps}
                colaps={data?.colapsList?.colaps}
                setColaps={data?.colapsList?.setColaps}
                colapsfunc={data?.colapsList?.colapsfunc}
                addButton={data?.footerComp?.addFooterComp}
                subAddButton={data?.footerComp?.addFooterSubComp}
                GriddFooterAdd={data?.footerComp?.GriddFooterAdd}
                // Pagination = {data?.Pagination}
                Pagination={
                  data?.paginationList?.pagination == true && {
                    Comp: GridPagination,
                    pageCount: paginationTo,
                    func: handlePagination,
                    totalRow: data?.paginationList?.totalRow,
                  }
                }
                SubGriddFooterAdd={data?.footerComp?.SubGriddFooterAdd}
                selectedRow={data?.checkBox?.selectedRow}
                // MoreOption={data?.MoreOption}
                isChecked={data?.checkBox?.checked}
                handleCheckboxChange={data?.checkBox?.handleCheckboxChange}
                handleSubCheckboxChange={
                  data?.checkBox?.handleSubCheckboxChange
                }
                isSubChecked={data?.checkBox?.isSubChecked}
                MoreOpt={data?.MoreOption}
                // setEdite={data?.setEdite}
                setEdite={data?.setEdite ? data?.setEdite : setEdite}
                setHActive={
                  data?.subGridActive?.setHActive
                    ? data?.subGridActive?.setHActive
                    : setHActive
                }
                hActive={
                  data?.subGridActive?.hActive
                    ? data?.subGridActive?.hActive
                    : hActive
                }
                // tableHRef={tableHRef}

                subActiveKey={data?.subGridActive?.subActiveKey}
                subInActiveVal={0}
                subGridOpen={data?.subGridActive?.subGridOpen}
                idKey={data?.subGridActive?.idKey}
                checkBoxShow={data?.checkBox?.checkBoxShow}
                moreOptShow={data?.moreOptShow}
              />
            </div>
          );
        })}
        {/* </div> */}
      </CustomScrollBar>
      <PaginationGridButton
        label={label}
        handleClick={() => collapse()}
        options={options.map((option) => ({
          label: option.label,
          onClick: () => handleOptionClick(option.value),
        }))}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* <div className="flex items-center">
        <div className="flex items-center border w-[250px] py-2 px-3 ml-16 rounded-md cursor-pointer ">
          <IoIosAdd className="text-customblack text-[30px]" />
          <select onChange={setDataRowChange} className="w-full outline-none">
            <option value="25">Show 25</option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
            <option value="500">Show 500</option>
          </select>
          <IoIosArrowDown className="text-customblack text-[25px]" />
        </div>
        
      </div> */}
    </div>
  );
};

export default MainGrid;

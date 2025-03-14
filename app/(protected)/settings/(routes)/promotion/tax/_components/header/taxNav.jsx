"use client";
import { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd, IoIosArrowDown, IoIosArrowUp, IoIosPulse, IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setEditHead, setHeadReduxT,setSearchData ,setIsHitApi,OpenNewModalForm,setRefresh} from "../../redux/taxSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import useDebounce from "../../../../../../../../customHook/useDebounce";

function TabsNav() {
  const [showNav, setShowNav] = useState(true);
  const [currTab, setCurrTab] = useState("main-tab");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenF, setIsOpenF] = useState(false);
  const [test , setTest] = useState(false)
  const [testT , setTestT] = useState(true)
  const [fHead , setFHead] = useState([])
  const [filterState , setFilterState] = useState()
  const [poFInput ,  setPoFInput] = useState()
  const [ spFInput,setSpFInput] = useState()
  const [skuListS , setSkuListS ] = useState()
  const [skuFInput , setSkuFInput] = useState()
  const [ poListS , setPoListS] = useState()
  const [ stListS ,setStListS] = useState()
  const [ stFInput , setStFInput] = useState()
  const [spListS , setSpListS] = useState()
  const [statusArr , setStatusArr] = useState([{option:'Completed'},{option:'Ready for Receiving'}])

const [foc , setFoc] = useState(false)
  const taxHead = useSelector((state) => state.tax.taxHead);
  const defHead = useSelector((state) => state.tax.defHead);
  const skuList = useSelector((state) => state.tax.skuList);
  const taxMainGrid = useSelector((state) => state.tax.taxMainGrid);
  const username=useSelector(state=>state.tax.username);
  
  console.log(taxHead);
  console.log(taxMainGrid)
  
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderList
  );
//   console.log('check head redux' , taxHead);
const dropdownRef = useRef(null)
  const handleRefocusDropdown = () => {
    if( dropdownRef.current){
        dropdownRef.current.focus();
        // alert("parent side focus dropdown pressed")
    }   
    };


const dispatch = useDispatch()

  useEffect(() => {
    toggleSearch ? searchRef.current.focus() : searchRef.current.blur();
  }, [toggleSearch]);

  function handleClickOutside(event) {
    console.log(searchContainerRef.current);
    if (
      searchContainerRef.current &
      !searchContainerRef.current.contains(event.target)
    ) {
      setToggleSearch(false); // Close the dropdown
    //   console.log("I am called");
    }
  }

  useEffect(() => {
    if (toggleSearch) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleSearch]);

  function handleClearSearch() {
    setSearch("");
    searchRef.current.focus();
  }

  function currTabHandler(tab) {
    setCurrTab(tab);
  }
  const setFilter = (e) => {
    const fil = taxHead.filter((data) => data.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFHead(fil);
    console.log('check out filter', e.target.value, fil);
  };

  const setFilterSku = (e) => {
    setSkuFInput(e.target.value)
    const fil = skuList.filter((data) => data.PAR_CODE.toLowerCase().includes(e.target.value.toLowerCase()));
    setSkuListS(fil);
    // console.log('check out filter', e.target.value, fil);
  };
  const setFilterPo = (e) =>{
    setPoFInput(e.target.value)
    const fil = taxMainGrid.filter((data) => data.PO_NUMBER.toLowerCase().includes(e.target.value.toLowerCase()));
    setPoListS(fil);
    console.log('check out filter', e.target.value, fil);
  }

  const setFilterSt = (e) =>{
    setStFInput(e.target.value)
    const fil = statusArr.filter((data) => data.option.toLowerCase().includes(e.target.value.toLowerCase()));
    setStListS(fil);
    // console.log('check out filter', e.target.value, fil);
  }

  const setFilterSp = (e) =>{
    setSpFInput(e.target.value)
    const fil = checkUpdatelist.filter((data) => data.SUPPLIER.toLowerCase().includes(e.target.value.toLowerCase()));
    setSpListS(fil);
    // console.log('check out filter', e.target.value, fil);
  }

  useEffect(()=>{
    setFHead(taxHead)
  }, [taxHead])


  const EditHead = (i) =>{
dispatch(setEditHead(i))
  }

  const setTitleR = (index , titleP) =>{
const check = taxHead.findIndex((data)=> data.title == titleP)
dispatch(setHeadReduxT({index : check , cat : false}))
console.log('check index in tabs' , check);
  }


  const handleOnFocus = () =>{

  }

  const handleOnBlur = () =>{

  }
  // useEffect(() => {
  //   if (skuList.length > 0) {
  //     // Check if arr is not empty
  //     const sortedArr = [...skuList]; // Create a copy of arr
  //     sortedArr.sort((a, b) => {
  //       if (a.PAR_CODE === filterState?.sku) return -1; // 
  //       if (b.PAR_CODE === filterState?.sku) return 1; // 
  //       return 0; // Maintain order for other elements
  //     });
  //     setSkuListS(sortedArr); // Update the state with the sorted array
  //   }
  // }, [skuList, filterState ]);

  useEffect(() => {
    if (taxMainGrid.length > 0) {
      // Check if arr is not empty
      const sortedArr = [...taxMainGrid]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.PO_NUMBER === filterState?.Po) return -1; // 
        if (b.PO_NUMBER === filterState?.Po) return 1; // 
        return 0; // Maintain order for other elements
      });
      setPoListS(sortedArr); // Update the state with the sorted array
    }
  }, [taxMainGrid, filterState ]);


  useEffect(() => {
    if (statusArr.length > 0) {
      // Check if arr is not empty
      const sortedArr = [...statusArr]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.option === filterState?.St) return -1; // 
        if (b.option === filterState?.St) return 1; // 
        return 0; // Maintain order for other elements
      });
      setStListS(sortedArr); // Update the state with the sorted array
    }
  }, [statusArr, filterState ]);

  useEffect(() => {
    if (checkUpdatelist.length > 0) {
      // Check if arr is not empty
      const sortedArr = [...checkUpdatelist]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.VEN_ID === filterState?.Sp) return -1; // 
        if (b.VEN_ID === filterState?.Sp) return 1; // 
        return 0; // Maintain order for other elements
      });
      setSpListS(sortedArr); // Update the state with the sorted array
    }
  }, [checkUpdatelist, filterState ]);

  console.log('check filter value' , filterState);

  const setChange = (data , cat) => {
if(cat == 'sku'){
  const newState = { ...filterState, sku: data };
    setFilterState(newState)
    setSkuFInput()
}else if (cat == 'Po'){
  const newState = { ...filterState, Po: data };
    setFilterState(newState)
    // setSkuFInput()
}else if(cat == 'St'){
const newState = {...filterState , St : data}
setFilterState(newState)

}else if(cat == 'Sp'){
  const newState = {...filterState , Sp : data}
  setFilterState(newState)
}
  
  };

  const setChangeP = (e) => {
    const newState = { ...filterState, PoNumber: e.PAR_CODE };
    setFilterState(newState)
   
  };

  const filterStart =() =>{
    if(filterState){
      dispatch(gridFilter(filterState))
   setIsOpenF(false)

console.log('filter state hai bhai');
    }else{
console.log('filter state nhi  hai bhai');

    }
  }

//--------search------- 

let isHitApi=useSelector((state) => state.tax.isHitApi);
let refresh=useSelector((state) => state.tax.Refresh);

const debounce=useDebounce(search,1000);
let [error, sendRequest] = useApiFetch();

let searchURL=`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetTaxesList`;
const accessToken =typeof localStorage !== "undefined"? localStorage.getItem("tokenSession"): null;
let searchPayload={
  data: {
    SEARCH: search,
    ORDER: "",
    RNUM_FROM: 1,
    RNUM_TO: 25,
    ACTIVE_FLAG: "Y"
  },
  action: "Administration",
  method: "GetTaxesList",
  type: "rpc",
  tid: "144"
}
let getSearchData=(data)=>{
  
  if(isHitApi){
    dispatch(setSearchData(data))
    dispatch(setRefresh(!refresh))
  }else{
    console.log("da else part dy")
  }
  
  
  
}

useEffect(()=>{
 if(isHitApi) sendRequest(searchURL,'POST',searchPayload,getSearchData,accessToken)
},[debounce])

const changeHandler=(e) =>{
  
  dispatch(setIsHitApi(true))

  setSearch(e.target.value)
  if(e.target.value===''){
    dispatch(setRefresh(!refresh))
    dispatch(setIsHitApi(false))
  }
}


//end search
const newClickHandler=()=>{
  dispatch(OpenNewModalForm());
}


  return (
    <div className="w-full mx-auto mt-2 mb-2  text-[14px] text-customblack font-normal">
      <div className="flex items-center ">
        <div onClick={newClickHandler} className="bg-[#0073ea] mr-3 ml-2 flex pl-3 w-[130px] justify-between rounded-md ">
           <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
            <span><IoIosAdd className="text-[20px] text-white" /></span>
            <span className="font-medium ">New</span>
           </div>
           <div className="text-white flex items-center px-2 ">
            <IoIosArrowDown className="text-[18px] "/>
           </div>
        </div>
     
        {/* 2nd  */}
        <div className="flex text-[14px] gap-[30px] ">
          <div className=" flex gap-2">
            <div
              ref={searchContainerRef}
              className={` ${
                toggleSearch ? "!border-[#0073ea] " : "hover:bg-customHover"
              }   border cursor-pointer rounded-[4px]  relative border-transparent lg:flex  p-1 items-center gap-2`}
            >
              <div
                className={`${
                  toggleSearch
                    ? "w-[240px] px-2 relative text-customblack flex items-center justify-between  after:absolute after:right-[0px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-grayBlack"
                    : "w-0 p-0 m-0 absolute"
                } transition-all duration-200`}
              >
                <input
                  type="text"
                  className={` ${
                    toggleSearch
                      ? "h-full w-full focus:outline-none text-[14px] text-customblack"
                      : "hidden"
                  } `}
                  value={search}
                  onChange={changeHandler}
                  ref={searchRef}
                  placeholder="Search this board"
                />

                <div
                  onClick={handleClearSearch}
                  className={`${
                    toggleSearch
                      ? `flex hover:border-gray-200 ${
                          search ? "" : "invisible"
                        } border cursor-pointer  border-transparent items-center h-fit`
                      : "hidden"
                  } `}
                >
                  <RxCross2
                    className={`${
                      toggleSearch ? " text-[18px] text-customIcon" : "hidden"
                    }`}
                  />
                </div>
              </div>
              <div
                onClick={() => setToggleSearch((pre) => !pre)}
                className=" text-customblack text-[14px] transition-all flex duration-1000 items-center gap-2 cursor-pointer"
              >
                <IoIosSearch className="text-[18px] text-customIcon" />
                {toggleSearch ? "" : "Search"}
              </div>
            </div>


            <div className=" border cursor-pointer text-14px text-customblack hover:bg-customHover rounded-[4px] border-transparent items-center gap-2 p-1 flex">
              <BiSortAlt2 className="text-[18px] text-customIcon" />
              Sort
            </div>
            <div   className="  relative border cursor-pointer text-14px hover:bg-customHover text-customblack rounded-[4px]  border-transparent flex gap-2 items-center p-1">
              <div onClick={()=>setIsOpenF(!isOpenF)} className="flex gap-2">
              <FiFilter className="text-[18px] text-customIcon" />
              Filter
              </div>

              {/* {isOpenF && (
                <div className=" absolute -left-[10px] top-8  max-h-[400px] overflow-auto mt-2 w-[360px] bg-white border  rounded-lg shadow-lg z-50 p-5  ">
              <div className="flex justify-between items-center ">
                <p className=" font-medium leading-[22px] text-[#323338] text-[16px] ">Filter Orders</p>
                <button className=" border border-[#d0d4e4] text-customblack py-1 px-3 rounded-md " >Apply Filter</button>
              </div>
              <p className="text-gray-400 text-[14px] mb-5 mt-5 ">Filter</p>
          
<div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-5 px-3 rounded-lg border ">
<Dropdown  options={skuList} optionKey1="PAR_CODE" optionKey2="PAR_ID" onSelectedOptionChanged ={setChange} placeholder="select sku" inputClassName="focus:outline-none w-[270px] hover:bg-transparent  py-2 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "" isDisabled={false }
        onClearInputValue={false} onHandleFocus={handleOnFocus} onDefaultInput = '' onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
        <IoIosArrowDown/>
</div>

<div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-5 px-3 rounded-lg border ">
<Dropdown  options={statusArr} optionKey1="option" optionKey2="option" onSelectedOptionChanged ={setChange} placeholder="select Status" inputClassName="focus:outline-none w-[270px] hover:bg-transparent  py-2 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "" isDisabled={false }
        onClearInputValue={false} onHandleFocus={handleOnFocus} onDefaultInput = '' onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
        <IoIosArrowDown/>
</div>

<div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-5 px-3 rounded-lg border ">
<Dropdown  options={taxMainGrid} optionKey1="PO_NUMBER" optionKey2="PO_NUMBER" onSelectedOptionChanged ={setChangeP} placeholder="select Po Number" inputClassName="focus:outline-none w-[270px] hover:bg-transparent  py-2 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "" isDisabled={false }
        onClearInputValue={false} onHandleFocus={handleOnFocus} onDefaultInput = '' onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
        <IoIosArrowDown/>
</div>


<div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-5 px-3 rounded-lg border ">
<Dropdown  options={checkUpdatelist} optionKey1="SUPPLIER" optionKey2="VEN_ID" onSelectedOptionChanged ={setChange} placeholder="select Supplier" inputClassName="focus:outline-none w-[270px] hover:bg-transparent  py-2 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "" isDisabled={false }
        onClearInputValue={false} onHandleFocus={handleOnFocus} onDefaultInput = '' onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
        <IoIosArrowDown/>
</div>
                
                </div>
              )} */}
                  {false && (
                <div className=" absolute -left-[10px] top-8  max-h-[400px] overflow-auto mt-2 w-[800px] bg-white border  rounded-lg shadow-lg z-50 p-5  ">
              <div className="flex justify-between items-center ">
                <div className="flex">
                <p className=" font-medium leading-[22px] text-[#323338] text-[16px] mr-3 ">Quick filter</p>
                <p  className=" font-light leading-[22px] text-gray-400 text-[14px] ">Showning of all 24 Orders</p>
                </div>
                <button onClick={filterStart} className={` border border-[#d0d4e4]  ${filterState ? "text-customblack" : "text-[#d0d4e4]"} py-1 px-3 rounded-md `} >Apply Filter</button>
              </div>
              <p className="text-gray-400 text-[14px] mb-5 mt-5 ">Filter</p>
          
<div className="flex">
<div>
  <p className="text-[#677968] text-[14px]">Sku</p>
  <input onChange={setFilterSku} className="outline-none my-3 " value={skuFInput} placeholder="Search Sku" type="text"  />
  <div className="max-h-[300px] h-[200px] overflow-auto ">
  {
    skuListS.map((dataS)=>{
      return(
        <div onClick={()=>setChange(dataS.PAR_CODE , 'sku')} className={`py-2 px-3 my-1  hover:bg-[#eeeeee] ${filterState?.sku ==  dataS.PAR_CODE ? "bg-[#eeeeee]" : "bg-[#F5F6F8]" } text-[14px] text-customblack`}>{dataS.PAR_CODE}</div>
      )
    })
  }
  </div>
  
</div>
<div className=" pl-5 ">
  <p className="text-[#677968] text-[14px]">Po Number</p>
  <input onChange={setFilterPo} className="outline-none my-3 " value={poFInput} placeholder="Search Po number" type="text"  />
  <div className="max-h-[300px] h-[200px] overflow-auto ">
  {
    poListS.map((dataP)=>{
      return(
        <div onClick={()=>setChange(dataP.PO_NUMBER , 'Po')} className={`py-2 px-3 my-1 ${filterState?.Po ==  dataP.PO_NUMBER ? "bg-[#eeeeee]" : "bg-[#F5F6F8]" } hover:bg-[#eeeeee] text-[14px] text-customblack`}>{dataP.PO_NUMBER}</div>
      )
    })
  }
  </div>

  
  
</div>

<div className=" pl-5 ">
  <p className="text-[#677968] text-[14px]">Status</p>
  <input onChange={setFilterSt}   className="outline-none my-3 " placeholder="Search Status" type="text" value={stFInput}  />
  <div className="max-h-[300px] h-[200px] overflow-auto ">
  {
    stListS.map((dataP)=>{
      return(
        <div onClick={()=>setChange(dataP.option , 'St')} className={`py-2 px-3 my-1 ${filterState?.St ==  dataP.option ? "bg-[#eeeeee]" : "bg-[#F5F6F8]" } hover:bg-[#eeeeee] text-[14px] line-clamp-1 text-customblack`}>{dataP.option}</div>
      )
    })
  }
  </div>

  
  
</div>


<div className=" pl-5 ">
  <p className="text-[#677968] text-[14px]">Suplier</p>
  <input onChange={setFilterSp} className="outline-none my-3 " value={spFInput} placeholder="Search Status" type="text"  />
  <div className="max-h-[300px] h-[200px] overflow-auto ">
  {
    spListS.map((dataP)=>{
      return(
        <div onClick={()=>setChange(dataP.VEN_ID , 'Sp')} className={`py-2 px-3 my-1  ${filterState?.Sp ==  dataP.VEN_ID ? "bg-[#eeeeee]" : "bg-[#F5F6F8]" } hover:bg-[#eeeeee] text-[14px] line-clamp-1 text-customblack`}>{dataP.SUPPLIER}</div>
      )
    })
  }
  </div>

  
  
</div>
</div>
                
                </div>
              )}
            </div>

            <div
             
              className="  relative border  cursor-pointer text-14px hover:bg-customHover text-customblack rounded-[4px]  border-transparent flex  items-center p-1"
            >
                <div  onClick={() => setIsOpen(!isOpen)} className="flex gap-2 ">
                <BiHide className="text-[18px] text-customIcon" />
              Hide
                </div>
             
              {isOpen && (
                <div className=" absolute -left-[10px] top-8  max-h-[400px] overflow-auto mt-2 w-[360px] bg-white border  rounded-lg shadow-lg z-50 p-5  ">
              <div className="flex justify-between items-center ">
                <p className=" font-medium leading-[22px] text-[#323338] text-[16px] ">Display columns</p>
                <button className=" border border-[#d0d4e4] text-[#d0d4e4] py-1 px-3 rounded-md " >Save to this view</button>
              </div>
              <div className={`w-full flex border ${foc == true ? 'border-[#007f9b]' : "border-[#323338]"}  text-[#323338] mt-5 py-2 px-3 rounded-md items-center`}>
                <input onChange={setFilter} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} placeholder="Find columns text-[14px] to show/hide" className="outline-none grow" type="text" />
                <IoIosSearch/>
              </div>
              <div className="mt-5">
                <p className="text-gray-400 text-[14px] mb-5">Item columns</p>
                {
                    fHead?.map((data , i)=>{
return(
    <div className="flex justify-between my-2">
        <div className="flex">
        <input onClick={()=>EditHead(i )}  className="cursor-pointer accent-[#007f9b] " checked={data.hidden == true ? true : false } type="checkbox" />
    <p className="text-[14px] text-customblack ml-3 ">{data.title}</p>
        </div>
    <span
    //  onClick={()=>dispatch(setHeadReduxT({index : i , cat : false}))}
    onClick={()=>setTitleR(i , data.title)}
      className={` ${data.def == true ? "block" : "hidden"} text-[12px]  text-gray-400 hover:bg-customHover px-2 py-[2px] rounded-sm `}>default</span>
    </div>
)
                    })
                }

               
              </div>

                
                </div>
              )}
            </div>

            <div className="flex items-center">
              <div className="border cursor-pointer hover:bg-customHover rounded-[4px]  border-transparent h-fit flex items-center p-1">
                <IoIosArrowDown className="text-[18px] text-customIcon" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="border cursor-pointer hover:bg-customHover rounded-[4px]  border-transparent flex items-center h-fit p-1">
                <IoIosArrowUp className="text-[18px] text-customIcon" />
              </div>
            </div>
         
          </div>
          <div className="flex items-center gap-2">
       

        
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabsNav;

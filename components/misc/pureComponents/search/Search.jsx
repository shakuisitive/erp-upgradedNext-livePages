import React , {useRef , useState , useEffect} from 'react'
import { SlRefresh } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import {  IoIosSearch } from "react-icons/io";
import useDebounce from "../../../../customHook/useDebounce";

const Search = ({handleSearch , resetSearch , setResetSearch}) => {
  const [search, setSearch] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

    const searchContainerRef = useRef(null);
    const searchRef = useRef(null);
    const debounce=useDebounce(search,1000);

    function handleClickOutside(event) {
        // console.log(searchContainerRef.current);
        if (
          searchContainerRef.current &
          !searchContainerRef.current.contains(event.target)
        ) {
          setToggleSearch(false); // Close the dropdown
        //   // console.log("I am called");
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

      const changeHandler=(e) =>{
  
        // dispatch(setIsHitApi(true))
        
        setSearch(e.target.value)
        if(e.target.value===''){
        //   dispatch(setIsHitApi(false))
        }
      }

      useEffect(()=>{
        // console.log('debouncing chulling' , search);
        //  dispatch(getSearchVal(search))
handleSearch(debounce)
        console.log('check search changing ' , search , debounce);
       },[debounce])

       useEffect(()=>{
        if(resetSearch == true){
            setResetSearch(false)
            setSearch('')
        }
       } , [resetSearch])

  return (
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
        onChange={changeHandler}
        value={search}
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
  )
}

export default Search

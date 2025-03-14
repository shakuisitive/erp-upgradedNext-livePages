import React , {useState , useEffect} from 'react'
import { IoIosSearch } from "react-icons/io";

const GridTabHide = ({Value , handleHidden , defaultVal}) => {
    const [foc , setFoc] = useState(false)
  const [fHead , setFHead] = useState([])
  const [head , setHead] = useState([])
//   console.log('check hidden head' , head);

    const setFilter = (e) => {
        const fil = Value.filter((data) => data.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setFHead(fil);
        // console.log('check out filter', e.target.value, fil);
      };
      useEffect(()=>{
        setFHead(Value)
        setHead(Value)
      }, [Value])

      const EditHead = (i) => {
        const newHead = [...head]; // Create a copy of the state array
        newHead[i] = { ...newHead[i], hidden: !newHead[i].hidden }; // Update the specific item's 'hidden' property
        setHead(newHead); // Update the state with the new array
        // handleHidden(head)
      }

      useEffect(()=>{
        if (head != Value && head.length > 0){
            handleHidden(head)

        }
      } , [head])

const handleTitle = (index , cat) =>{
    // if (cat == true) {
    //     head[check].def = true;
    //     head[check].title = hData;
    //   } else if (cat == false) {
    //     head[check].def = false;
    //     head[check].title =
    //     defaultVal[check].title;
    //   }


    if (cat == false) {
            head[check].def = false;
            head[check].title =
            defaultVal[check].title;
          }
}

const setTitleR = (index , titleP) =>{
    const check = Value.findIndex((data)=> data.title == titleP)
    
      
        const newHead = [...head]; // Create a copy of the state array
        newHead[check] = { ...newHead[check], title: defaultVal[check].title , def : false };
        setHead(newHead);
    console.log('check hidden head check' , check);
      }
  return (
    <div>
    <div className="flex justify-between items-center ">
      <p className=" font-medium leading-[22px] text-[#323338] text-[16px] ">Display columns</p>
      <button className=" border border-[#d0d4e4] text-[#d0d4e4] py-1 px-3 rounded-md " >Save to this view</button>
    </div>
    <div className={`w-full flex border ${foc == true ? 'border-[#007f9b]' : "border-[#323338]"}  text-[#323338] mt-5 py-2 px-3 rounded-md items-center`}>
      <input
       onChange={setFilter} 
       onFocus={()=>setFoc(true)}
        onBlur={()=>setFoc(false)}
         placeholder="Find columns text-[14px] to show/hide" className="outline-none grow" type="text" />
      <IoIosSearch/>
    </div>
    <div className="mt-5">
      <p className="text-gray-400 text-[14px] mb-5">Item columns</p>
      {
          fHead?.map((data , i)=>{
return(
<div className="flex justify-between my-2">
<div className="flex">
<input 
onClick={()=>EditHead(i )}
  className="cursor-pointer accent-[#007f9b] " checked={data?.hidden == true ? true : false } type="checkbox" />
<p className="text-[14px] text-customblack ml-3 ">{data?.title}</p>
</div>
<span
//  onClick={()=>dispatch(setHeadReduxT({index : i , cat : false}))}
onClick={()=>setTitleR(i , data.title)}
className={` ${data?.def == true ? "block" : "hidden"} text-[12px]  text-gray-400 hover:bg-customHover px-2 py-[2px] rounded-sm `}>default</span>
</div>
)
          })
      }

     
    </div>

    </div>
  )
}

export default GridTabHide

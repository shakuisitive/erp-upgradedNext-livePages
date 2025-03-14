import React , {useState} from 'react'
import { BiHide } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi'
import FilterTabs from './FilterTabs'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
const OrderDetailsForm = ({filterTabs , OrderNumber , OrderDate ,  Form , FormTabs , tabsShow = true }) => {
    const [resetSearch , setResetSearch] = useState(false)
    const [isOpenF, setIsOpenF] = useState(false);
     const [defColmn , setDefColm] = useState()
     let [hideColumnDef , setHideColumnDef] = useState()
     const [isHeader, setIsHeader] = useState(0);
     const [activeTab, setActiveTab] = useState(0);

     const handleTabClick = (tabIndex) => {
         setActiveTab(tabIndex);
        //  if (handleTabs){
        //    handleTabs(tabIndex)
        //  }
 
       };

    const handleSearch = () =>{

    }

    const handleFilterM = () => {

}    
const  handleHidden = (e)  =>{
setDefColmn(e)
       }
 

  const tabs = {


      actionBtn :{
          option: filterTabs?.actionBtn?.option,
          label : filterTabs?.actionBtn?.label , 
          icon : filterTabs?.actionBtn?.icon , 
          onClick : filterTabs?.actionBtn?.onClick
      } , 
      
      
      search : {
        handleSearch : handleSearch , 
        resetSearch : resetSearch ,
        setResetSearch : setResetSearch
      } , 
      sort : {
       
      } , 
      filter : {
        popup : {
          icon : FiFilter , 
          wid : '1200px' , 
          lable : 'Filter'
  
        } , 
        setIsOpen : setIsOpenF , 
        handleFilter : handleFilterM
  
      } , 
      hide : {
        popup : {
          icon : BiHide , 
          wid : '360px' , 
          lable : 'Hide'
  
        } , 
        Value: defColmn , 
        handleHidden : handleHidden , 
        defaultVal : hideColumnDef 
  
      } , 
      navigator : {
       
      } , 
   
    }
  return (
    <div className='flex flex-col  h-full' >
     
      <div className="flex h-fit  justify-between gap-2 px-2 my-2 mx-1 bg-white py-2 mb-2 rounded-t-md">
            <div className='grow' >
            <FilterTabs
             tabs={tabs}
             searchShow={false} 
             filterShow={false}
             hideShow={false}
            //  hideShow={true}
             sortShow={false}
             navigatorShow = {false}
            //  filterTool={false}
             /> 
            </div>
            <div className='grow'></div>
            <div className="flex w-[17%]  min-w-fit justify-end items-center">
        <p className="text-grayBlack text-[16px] leading-[28px] font-normal mr-4">Fields with a red asterisk (<span className="text-red-600">*</span>) are mandatory</p>
        
      </div>
      <div className="flex-none mr-[45px] ml-[20px] my-1">
                <h2 className="text-customblack text-[24px] leading-[24px] font-normal ">
                  {OrderNumber}
                </h2>
                <p className="text-[#6b7280] text-[14px] leading-[24px] font-normal text-right">
                  {OrderDate}
                </p>
              </div>
        </div>
        <div className='bg-white grow mx-2' >


<div className={`border-b border-gray-200  mx-[27px] ${tabsShow == false ? 'hidden' : ''}`}>
        <div className="flex gap-1  font-normal mt-5 ml-5">
          {FormTabs.map((tab, index , ) => (
            <React.Fragment key={index}>
              <div
                className={`${
                  activeTab === index
                    ? "border-b-customblue border-b-[2px] pb-[3px]"
                    : ""
                } ${tabsShow == false ? 'hidden' : ''}`}
              >
                <button
                  className={`flex items-center ${
                    activeTab === index
                      ? "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                      : "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
        </div>





            {
                FormTabs[activeTab].content.map((data , index)=>{
return(
    <div>
    <div className="ml-[50px] flex justify-between ">
              <button
                className="poppins flex gap-2  text-[16px] py-4 text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(isHeader == index ? null : index)}
              >
                {isHeader == index ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                {data.label}
              </button>
              <div className={` items-center pr-4 text-customIcon ${isHeader != index ? "flex" : "hidden"}`}>
                {
                  data.MinForm?.map((data)=>{
        return(
          <span className='mx-3'>{data}</span>
        )
                  })
                }
              </div>
            </div>
            {isHeader == index && (
              <div className="ml-10 ">
            
                {data.Form}
              </div>
            )}
            </div>
)
                })
            }
            {/* <div>
    <div className="ml-[50px] flex justify-between ">
              <button
                className="poppins flex gap-2  text-[16px] py-4 text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
              <div className={` items-center pr-4 text-customIcon ${isHeader == false ? "flex" : "hidden"}`}>
                {
                  MinForm?.map((data)=>{
        return(
          <span className='mx-3'>{data}</span>
        )
                  })
                }
              </div>
            </div>
            {isHeader && (
              <div className="ml-10 ">
            
                {Form}
              </div>
            )}
            </div> */}
        </div>
    </div>
  )
}

export default OrderDetailsForm

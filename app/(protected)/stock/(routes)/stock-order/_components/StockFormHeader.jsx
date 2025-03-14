import React,{use, useState} from 'react'
import { BiHide, BiSortAlt2 } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'
import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoIosSearch } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import TopModal from './TopModal';
import { cleanCheckItems } from '../redux/stockSlice';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
function StockFormHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  let checkedItems = useSelector(state=>state.stockSlices.checkedItems)
  if(checkedItems.length==0){
    checkedItems = true;
  }else{
    checkedItems =false;
  }

  const handleOpenModal = () => {

    setIsModalOpen(true);
    // dispatch(openForm(index))
  };
  const handleCloseModal = () => {
    dispatch(cleanCheckItems())
    setIsModalOpen(false);
  };



  return (
    <div className='flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md'>
    <div className='  flex w-[35%] py-2 '>
      <button className = {`bg-cyan-700 rounded-md py-1 px-2 text-white ${checkedItems&&"invisible"}`} onClick={handleOpenModal}>Transfer</button>
      <TopModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              heading="Transfer Inventory"
            />
      <div className='flex ml-4'>
        {/* <div className='bg-green-400 flex mr-2 p-[2px] h-full'>

        </div> */}
        {/* <select className='border-b border-b-gray-300 shadow-sm outline-none' name="whereHouse" id="whereHouse">
          <option value="volvo">FD - Fraser Direct</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}
      </div>
    </div>
    <div className=' flex w-[48%]   justify-end '>
      <div className='flex '>
        <div className='flex gap-4'>
          <div className='flex items-center gap-2'>

            <IoIosSearch className='text-[18px]' />
            Search
          </div>
          <div className='flex items-center gap-2'>
            <BsPersonCircle className='text-[18px]' />
            Person
          </div>
          <div className='flex items-center gap-2'>
            <FiFilter className='text-[18px]' />
            Filter
          </div>
          <div className='flex items-center gap-2'>
            <BiSortAlt2 className='text-[18px]' />
            Sort
          </div>
          <div className='flex items-center gap-2'>
            <BiHide className='text-[18px]' />
            Hide
          </div>
          <div className='flex items-center gap-2'>
            <IoIosMore className='text-[18px]' />
          </div>
        </div>
      </div>


    </div>
    <div className='flex w-[17%]  justify-end gap-2'>
      <div className='flex items-center'>
        <div className='border h-fit flex items-center p-1'>

          <IoIosArrowDown className='text-[18px]' />

        </div>
      </div>
      <div className='flex items-center'>
        <div className='border flex items-center h-fit p-1'>

          <IoIosArrowUp className='text-[18px]' />

        </div>
      </div>
      <div className='flex items-center p-1'>

        <FiFilter className='text-[18px]' />

      </div>
      <div className='flex items-center p-1'>

        <IoSettingsOutline className='text-[18px]' />

      </div>
    </div>
  </div>
  )
}

export default StockFormHeader
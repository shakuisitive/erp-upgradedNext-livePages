import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateQty } from "../../redux/physicalCountSlice";

const PhysicalCountQTY = ({rowData, index}) => {

  const physicalCountForm = useSelector((state) => state.physicalCount.physicalCountForm[0]);
    const focRef = useRef(null);
    const dispatch = useDispatch();

    const onChange = (e) => {
        const data = {
            id: rowData.PHYCOUDET_ID,
            qty: e.target.value,
            ind: index,
        }
        dispatch(UpdateQty(data))
    }

  return (
    <div className={`w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center `}>
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={onChange}
        value={rowData.COUNT_QTY}
        disabled={
          physicalCountForm.PC_STATUS == "NEW"
            ? false
            : physicalCountForm.PC_STATUS  == "Initiated"
            ? false
            : true
        }
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
      />
    </div>
  )
}

export default PhysicalCountQTY

import React, { useState } from "react";
import { setNewsplit } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import { FaRegSquarePlus } from "react-icons/fa6";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";

const SplitPurchaseSplit = ({ data, rowData, index }) => {
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const arr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );
  //console.log('rowdatat split', rowData)
  const availableQuantity = useSelector(
    (state) => state.PurchaseSlices.availableQuantity
  );
  const available = arr.reduce((acc, curr) => acc + curr.QUANTITY, 0);
  const splitRowQuantity = useSelector(
    (state) => state.PurchaseSlices.splitRowQuantity
  );

  const dispatch = useDispatch();

  const addSplit = () => {
    let find = false;
    arr?.map((item, ind) => {
      if (item.QUANTITY == 0 && ind == index) {
        find = false;
      } else {
        find = true;
      }
    });
    if (available >= splitRowQuantity) {
      setEMessage("Available Quantity must be equal to order Quantity");
      setIsErrorMessage(true);
    } else {
      if (find) {
        const dataa = {
          par_id: rowData.PAR_ID,
          puorder: rowData.PURORD_ID,
          purID: rowData.PURORDDET_ID,
          cost: rowData.COST,
        };

        if (availableQuantity != 0) {
          dispatch(setNewsplit(dataa));
        } else {
          setEMessage("no available quantity");
          setIsErrorMessage(true);
        }
      } else {
        setEMessage("Allocated quantity must be greater than 0");
        setIsErrorMessage(true);
      }
    }
  };
  // console.log('split row data' , rowData);
  return (
    <div className=" w-full flex items-center justify-center ">
      <FaRegSquarePlus
        onClick={addSplit}
        className="text-grayBlack text-[25px] hover:text-[#579BFC]"
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default SplitPurchaseSplit;

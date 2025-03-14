import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegSquarePlus } from "react-icons/fa6";
import Modal from "../../../../../../../../../components/misc/pureComponents/modal/Modal";
import { setNewSplit } from "../../../../redux/stockSlice";

const StockSplit = ({ data, rowData, index }) => {
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const dispatch = useDispatch();

  const stockOrderDetailData = useSelector(
    (state) => state.stockSlices.stockOrderDetailData
  );
  const stockOrderDetailDataId = useSelector(
    (state) => state.stockSlices.stockOrderDetailDataId
  );
  const availableQuantity = useSelector(
    (state) => state.stockSlices.availableQuantity
  );
  const product  = stockOrderDetailData.filter((item) => item.INVSTODET_ID == stockOrderDetailDataId || item.INVSTODET_ID == "")
  const available = product.reduce((acc, curr) => acc + curr.QUANTITY, 0);
  const splitRowQuantity = useSelector(
    (state) => state.stockSlices.splitRowQuantity
  );

  const addSplit = () => {
    let find = false;
    stockOrderDetailData?.map((item, ind) => {
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
        if (availableQuantity != 0) {
          dispatch(setNewSplit(product[0]));
        } else {
          setEMessage("no available quantity");
          setIsErrorMessage(true);
        }
      } else {
        setEMessage("Stock quantity must be greater than 0");
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

export default StockSplit;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateRow, UpdateSubRow, readyGridPayLoad } from "../../redux/physicalCountSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { PhysicalCount } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const RowLocSelect = ({ data, rowData, index, id }) => {
  const dispatch = useDispatch();
  
  const rowOptions = useSelector(
    (state) => state.physicalCount.LocationRowOptions
  );
  const [selectedOption, setSelectedOption] = useState(data);
  const [isSend, setIsSend] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const payload = useSelector((state) => state.physicalCount.subPayload);
  const physicalCountForm = useSelector((state) => state.physicalCount.physicalCountForm[0]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;


  const getDetail = (data) => {
    if(data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  }

  const getForm = (data) => {
    if(data.CODE == "SUCCESS") {
      sendRequest(
        PhysicalCount.PostPhysicalCountDetail,
        "POST",
        payload.detailPayload,
        getDetail,
        token
      );
    }
  }

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        PhysicalCount.PostPhysicalCount,
        "POST",
        payload.formPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const binData = {
      PId: rowData.PHYCOU_ID,
      bin: e.target.value,
      RId: rowData.PHYCOUDET_ID,
    };
    dispatch(UpdateSubRow(binData));
    dispatch(readyGridPayLoad({ id: id }));
    setIsSend(true)
  };

  return (
    <div className="w-full">
      <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption} // Set the value of the select element
          onChange={handleSelectChange} // Handle change event
          disabled={
            physicalCountForm.PC_STATUS == "NEW"
              ? false
              : physicalCountForm.PC_STATUS  == "Initiated"
              ? false
              : true
          }
        >
          {rowOptions.map(
            (sec, ind) =>
              sec !== "FC" && (
                <option key={ind} value={sec}>
                  {sec}
                </option>
              )
          )}
        </select>
      </form>
    </div>
  );
};

export default RowLocSelect;

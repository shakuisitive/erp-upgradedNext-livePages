import React, { useState, useRef, useEffect } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { setInputData, setRefreshing } from "../../../_redux/varianceSlice";
import { getKeyByCondition } from "../../../../../_components/Functions/customeFunctions";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
const EditVariance = ({ data, rowData, index }) => {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  let key = getKeyByCondition(rowData, data);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    PV_TYPE_ID: rowData?.PV_TYPE_ID,
    CODE: rowData?.CODE,
    NAME: rowData?.NAME,
    DESCRIPTION: rowData?.DESCRIPTION,
    NOTES: rowData?.NOTES,
    ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
  });

  let handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(setInputData(formData));
    // console.log("redux state", inputData, "localState", formData);
  }, [formData, dispatch]);

  let submitData = {
    PV_TYPE_ID: formData?.PV_TYPE_ID,
    CODE: formData?.CODE,
    NAME: formData?.NAME,
    DESCRIPTION: formData?.DESCRIPTION,
    NOTES: formData?.NOTES,
    ACTIVE_FLAG: formData?.ACTIVE_FLAG,
  };

  //console.log(submitData)

  let newdata = {
    data: submitData,
    action: "Administration",
    method: "PostProductVarianceType",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  let getAllTask = (data) => {
    dispatch(setRefreshing(true));
    // console.log(data);
  };

  let onBlurHandler = () => {
    sendRequest(
      Administration.PostProductVarianceType,
      "POST",
      newdata,
      getAllTask,
      token
    );
    // if (rowData[key] !== formData[key]) {

    // }
  };
  //console.log(formData);

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          name={key}
          value={formData[key]}
          //   onKeyDown={handleArrowKey}
          onChange={handleChange}
          onBlur={onBlurHandler}
          //   ref={(ref) => {
          //     inputRefs.current[index] = ref;
          //   }}
        />
      }
    </div>
  );
};

export default EditVariance;

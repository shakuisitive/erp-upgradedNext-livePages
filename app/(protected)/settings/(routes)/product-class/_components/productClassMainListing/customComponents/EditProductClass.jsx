import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/productClassSlice";

const EditProductClass = ({ data, rowData }) => {
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      PROD_CLASS_ID: rowData?.PROD_CLASS_ID,
      CODE: rowData?.CODE,
      NAME: rowData?.NAME || "",
      DESCRIPTION: desc,
      NOTES: rowData?.NOTES,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
    },
    action: "InventoryWeb",
    method: "PostProductType",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostPartCat = (data) => {
    if (data.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
  };
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const onBlurHandler = () => {
    if (desc !== rowData?.DESCRIPTION) {
      sendRequest(
        Administration.PostProductClass,
        "POST",
        payload,
        handlePostPartCat,
        token
      );
    }
  };
  useEffect(() => {
    setDesc(data);
  }, [data, rowData]);

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          value={desc}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditProductClass;

// import React, { useState, useRef, useEffect } from "react";
// import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useDispatch, useSelector } from "react-redux";
// import { setInputData, setRefreshing } from "../../../_redux/productClassSlice";
// import { getKeyByCondition } from "../../../../../_components/Functions/customeFunctions";
// import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
// const EditProductClass = ({ data, rowData, index }) => {
//   const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;
//   let key = getKeyByCondition(rowData, data);
//   let [error, sendRequest] = useApiFetch();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     PROD_CLASS_ID: rowData?.PROD_CLASS_ID,
//     CODE: rowData?.CODE,
//     NAME: rowData?.NAME || "",
//     DESCRIPTION: rowData?.DESCRIPTION,
//     NOTES: rowData?.NOTES,
//     ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
//   });

//   let handleChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value);

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     dispatch(setInputData(formData));
//     // console.log("redux state", inputData, "localState", formData);
//   }, [formData, dispatch]);

//   let submitData = {
//     PROD_CLASS_ID: formData?.PROD_CLASS_ID,
//     CODE: formData?.CODE,
//     NAME: formData?.NAME,
//     DESCRIPTION: formData?.DESCRIPTION,
//     NOTES: formData?.NOTES,
//     ACTIVE_FLAG: formData?.ACTIVE_FLAG,
//   };

//   //console.log(submitData)

//   let newdata = {
//     data: submitData,
//     action: "Administration",
//     method: "PostProductType",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   let getAllTask = (data) => {
//     dispatch(setRefreshing(true));
//     // console.log(data);
//   };

//   let onBlurHandler = () => {
//     if (rowData[key] !== formData[key]) {
//       sendRequest(
//         Administration.PostProductType,
//         "POST",
//         newdata,
//         getAllTask,
//         token
//       );
//     }
//   };
//   //console.log(formData);

//   return (
//     <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
//       {
//         <input
//           type="text"
//           className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
//           name={key}
//           value={formData[key]}
//           //   onKeyDown={handleArrowKey}
//           onChange={handleChange}
//           onBlur={onBlurHandler}
//           //   ref={(ref) => {
//           //     inputRefs.current[index] = ref;
//           //   }}
//         />
//       }
//     </div>
//   );
// };

// export default EditProductClass;

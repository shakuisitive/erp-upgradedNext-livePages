import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/productTypeSlice";

const EditProductType = ({ data, rowData }) => {
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      PROD_TYPE_ID: rowData?.PROD_TYPE_ID,
      CODE: rowData?.CODE,
      NAME: rowData?.NAME,
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
        Administration.PostProductType,
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

export default EditProductType;

// import React, { useEffect, useState } from "react";
// import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useDispatch, useSelector } from "react-redux";
// import { setInputData, setRefreshing } from "../../../_redux/productTypeSlice";
// import { getKeyByCondition } from "../../../../../_components/Functions/customeFunctions";
// import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";

// const EditProductType = ({ data, rowData, index }) => {
//   const inputData = useSelector((state) => state.productTypeSlice.inputData);

//   const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;

//   // Get the correct key for editing
//   let key = getKeyByCondition(rowData, data);

//   // Hook to handle API requests
//   let [error, sendRequest] = useApiFetch();
//   const dispatch = useDispatch();

//   // Initialize form data with rowData
//   const [formData, setFormData] = useState({
//     PROD_TYPE_ID: rowData?.PROD_TYPE_ID || "",
//     CODE: rowData?.CODE || "",
//     NAME: rowData?.NAME || "",
//     DESCRIPTION: rowData?.DESCRIPTION || "",
//     NOTES: rowData?.NOTES || "",
//     ACTIVE_FLAG: rowData?.ACTIVE_FLAG || "",
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Data to submit
//   const submitData = {
//     PROD_TYPE_ID: formData?.PROD_TYPE_ID,
//     CODE: formData?.CODE,
//     NAME: formData?.NAME,
//     DESCRIPTION: formData?.DESCRIPTION,
//     NOTES: formData?.NOTES,
//     ACTIVE_FLAG: formData?.ACTIVE_FLAG,
//   };

//   // Data for the API request
//   const newdata = {
//     data: submitData,
//     action: "Administration",
//     method: "PostProductType",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };
//   const handlePostProduct = (data) => {
//     if (data?.CODE === "SUCCESS") {
//       // dispatch(setRefreshing(true));
//     }
//   };
//   // Handle blur event to send the updated data
//   const onBlurHandler = () => {
//     if (rowData[key] !== formData[key]) {
//       sendRequest(
//         Administration.PostProductType,
//         "POST",
//         newdata,
//         handlePostProduct,
//         token
//       );
//     }
//   };
//   useEffect(() => {
//     if (inputData) {
//       let updatedData = {};

//       // Loop through formData keys and assign rowData values
//       Object.keys(formData).forEach((key) => {
//         if (rowData[key] !== undefined) {
//           updatedData[key] = rowData[key];
//         }
//       });
//       dispatch(setInputData(updatedData));
//       setFormData((prev) => ({ ...prev, ...updatedData }));
//       // Reset refreshing after data is set
//     }
//   }, [rowData, dispatch]);
//   return (
//     <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
//       <input
//         type="text"
//         className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
//         name={key}
//         value={formData[key]}
//         onChange={handleChange}
//         onBlur={onBlurHandler}
//       />
//     </div>
//   );
// };

// export default EditProductType;

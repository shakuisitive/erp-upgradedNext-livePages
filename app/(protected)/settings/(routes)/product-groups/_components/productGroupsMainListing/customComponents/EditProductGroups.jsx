import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/productGroupsSlice";

const EditProductGroups = ({ data, rowData }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      PARGRO_ID: rowData?.PARGRO_ID,
      CODE: rowData?.CODE,
      NAME: rowData?.NAME,
      DESCRIPTION: input,
      NOTES: rowData?.NOTES,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
    },
    action: "InventoryWeb",
    method: "PostPartGroups",
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
    setInput(e.target.value);
  };
  const onBlurHandler = () => {
    if (input !== rowData?.DESCRIPTION) {
      sendRequest(
        Administration.PostPartGroups,
        "POST",
        payload,
        handlePostPartCat,
        token
      );
    }
  };
  useEffect(() => {
    setInput(data);
  }, [data, rowData]);

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          value={input}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditProductGroups;

// import React, { useState, useRef, useEffect } from "react";
// import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setInputData,
//   setRefreshing,
// } from "../../../_redux/productGroupsSlice";
// import { getKeyByCondition } from "../../../../../_components/Functions/customeFunctions";
// import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
// const EditProductGroups = ({ data, rowData, index }) => {
//   const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;
//   let key = getKeyByCondition(rowData, data);
//   console.log("key", key);
//   let [error, sendRequest] = useApiFetch();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     PARGRO_ID: rowData?.PARGRO_ID,
//     CODE: rowData?.CODE,
//     NAME: rowData?.NAME,
//     DESCRIPTION: rowData?.DESCRIPTION,
//     NOTES: rowData?.NOTES,
//     ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
//   });

//   let handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     dispatch(setInputData(formData));
//   }, [formData, dispatch]);

//   let submitData = {
//     PARGRO_ID: formData?.PARGRO_ID,
//     CODE: formData?.CODE,
//     NAME: formData?.NAME,
//     DESCRIPTION: formData?.DESCRIPTION,
//     NOTES: formData?.NOTES,
//     ACTIVE_FLAG: formData?.ACTIVE_FLAG,
//   };

//   let newdata = {
//     data: submitData,
//     action: "Administration",
//     method: "PostPartGroups",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   let getAllTask = (data) => {
//     dispatch(setRefreshing(true));
//   };

//   let onBlurHandler = () => {
//     if (rowData[key] !== formData[key]) {
//       // console.log("key Payload", newdata);
//       // console.log("key Payload rowdata", rowData[key]);
//       // console.log("key Payload formdata", formData[key]);

//       sendRequest(
//         Administration.PostPartGroups,
//         "POST",
//         newdata,
//         getAllTask,
//         token
//       );
//     }
//   };

//   return (
//     <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
//       {
//         <input
//           type="text"
//           className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
//           name={key}
//           value={formData[key]}
//           onChange={handleChange}
//           onBlur={onBlurHandler}
//         />
//       }
//     </div>
//   );
// };

// export default EditProductGroups;

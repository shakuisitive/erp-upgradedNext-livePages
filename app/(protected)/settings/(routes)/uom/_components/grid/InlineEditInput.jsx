import React, { useState, useRef, useEffect } from "react";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  updateforRefresh,
  setRefreshing,
  addRef,
  setValidCode,
  setNextIndex,
  setRefresh,
  setInputData,
} from "../../redux/uomSlice";
import { getKeyByCondition } from "../../../../../../../app/(protected)/settings/_components/Functions/customeFunctions";
import { useDispatch, useSelector } from "react-redux";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const InlineEditInput = ({ data, rowData, index }) => {
  let arr = useSelector((state) => state.uom.refArray);
  let focus = useSelector((state) => state.uom.nextFocus);
  let username = useSelector((state) => state.uom.username);
  let userID = useSelector((state) => state.uom.user_ID);
  let token = useSelector((state) => state.user.tokenSession);
  let refresh = useSelector((state) => state.uom.refresh);
  let inputData = useSelector((state) => state.uom.inputData);
  let key = getKeyByCondition(rowData, data);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostUOM";

  const [focusedInput, setFocusedInput] = useState(null);
  const [disable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    UOM_ID: rowData.UOM_ID,
    CODE: rowData.CODE,
    DESCRIPTION: rowData.DESCRIPTION,
    ACTIVE_FLAG: rowData.ACTIVE_FLAG,

    USE_ID: userID,
    CUS_ID: rowData.CUS_ID,
  });

  let handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(setInputData(formData));
    console.log("redux state", inputData, "localState", formData);
  }, [formData, dispatch]);

  let submitData = {
    UOM_ID: formData.UOM_ID,
    CODE: formData.CODE,
    DESCRIPTION: formData.DESCRIPTION,
    ACTIVE_FLAG: formData.ACTIVE_FLAG.toUpperCase(),
    USE_ID: formData.USE_ID,
    CUS_ID: formData?.CUS_ID || null,
  };

  //console.log(submitData)

  let newdata = {
    data: submitData,
    action: "Administration",
    method: "PostUOM",
    username: username,
    type: "rpc",
    tid: "144",
  };

  let getAllTask = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
    // console.log(data);
    // dispatch(setRefresh(!refresh));
  };

  const inputRefs = useRef([]);
  const [click, setClick] = useState(0);
  const [current, setCurrent] = useState();
  window.addEventListener("keydown", function (event) {
    // Access information about the key pressed
    const keyPressed = event.key;

    const keyCode = event.keyCode;

    if (keyPressed === "Control") {
      setFocusedInput(0);
      dispatch(setNextIndex(0));
    }
  });

  const handleArrowKey = (e) => {
    const maxColumns = 3;
    const maxRows = Math.floor(arr.length / maxColumns);
    let currentIndex = focus;
    let nextIndex;

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      e.preventDefault();

      nextIndex = currentIndex - 1;
    } else if (e.key === "ArrowRight" && currentIndex < arr.length - 1) {
      e.preventDefault();
      nextIndex = currentIndex + 1;
    } else if (e.key === "ArrowUp" && currentIndex >= maxColumns) {
      nextIndex = currentIndex - maxColumns;
    } else if (
      e.key === "ArrowDown" &&
      currentIndex < arr.length - maxColumns
    ) {
      nextIndex = currentIndex + maxColumns;
    } else if (e.key === "Enter") {
      if (rowData[key] !== formData[key]) {
        sendRequest(url, "POST", newdata, getAllTask, token);
        nextIndex = currentIndex + 1;
      } else {
        console.log("enter Next part");
      }
    } else {
      return;
    }

    setFocusedInput(nextIndex);
    dispatch(setNextIndex(nextIndex));
  };

  // useEffect(() => {
  //   arr[focus]?.focus();
  // }, [focus]);

  useEffect(() => {
    dispatch(addRef(inputRefs.current[index]));
  }, [index]);

  let onBlurHandler = () => {
    if (rowData[key] !== formData[key]) {
      sendRequest(url, "POST", newdata, getAllTask, token);
    }
  };

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          name={key}
          value={formData[key]}
          // onKeyDown={handleArrowKey}
          onChange={handleChange}
          onBlur={onBlurHandler}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
        />
      }
    </div>
  );
};
export default InlineEditInput;

// const InlineEditInput = ({ data, rowData }) => {
//   const [desc, setDesc] = useState("");
//   const dispatch = useDispatch();
//   let [error, sendRequest] = useApiFetch();

//   const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;
//   const payload = {
//     data: {
//       UOM_ID: rowData.UOM_ID,
//       CUS_ID: rowData?.CUS_ID || "",
//       CODE: rowData?.CODE,
//       DESCRIPTION: rowData?.DESCRIPTION,
//       ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
//     },
//     action: "Administration",
//     method: "PostUOM",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };
//   const handlePostPartCat = (data) => {
//     if (data.CODE === "SUCCESS") {
//       dispatch(setRefreshing(true));
//     }
//   };
//   const handleChange = (e) => {
//     setDesc(e.target.value);
//   };
//   const onBlurHandler = () => {
//     sendRequest(
//       Administration.PostUOM,
//       "POST",
//       payload,
//       handlePostPartCat,
//       token
//     );
//   };
//   useEffect(() => {
//     setDesc(data);
//   }, [data, rowData]);
//   return (
//     <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
//       {
//         <input
//           type="text"
//           className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
//           //   name={key}
//           value={desc}
//           //   onKeyDown={handleArrowKey}
//           onChange={handleChange}
//           onBlur={onBlurHandler}
//         />
//       }
//     </div>
//   );
// };
// export default InlineEditInput;

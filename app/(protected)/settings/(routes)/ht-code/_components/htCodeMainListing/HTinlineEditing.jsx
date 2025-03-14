
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
} from "../../_redux/htCodeSlice";
import { getKeyByCondition } from "../../../../../../../app/(protected)/settings/_components/Functions/customeFunctions";
import { useDispatch, useSelector } from "react-redux";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const HTinlineEditing = ({ data, rowData, index }) => {
  let arr = useSelector((state) => state. htCodeSlice.refArray);
  let focus = useSelector((state) => state.htCodeSlice.nextFocus);
  let username = useSelector((state) => state.htCodeSlice.username);
  let userID = useSelector((state) => state.htCodeSlice.user_ID);
  let token = useSelector((state) => state.user.tokenSession);
  let refresh = useSelector((state) => state.htCodeSlice.refresh);
  let inputData = useSelector((state) => state.htCodeSlice.inputData);
  let key = getKeyByCondition(rowData, data);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostHarmonizedTarrifCode";

  const [focusedInput, setFocusedInput] = useState(null);
  const [disable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    HT_CODE_ID: rowData. HT_CODE_ID,
    CODE: rowData.CODE,
    DESCRIPTION: rowData.DESCRIPTION,
    ACTIVE_FLAG: rowData.ACTIVE_FLAG,
    TRANSPORATION_FEE: rowData.TRANSPORATION_FEE,
    OVERHEADS: rowData .OVERHEADS,
    DUTY_LC_CODE: rowData.DUTY_LC_CODE,
    FOREX:rowData .FOREX,
    USE_ID:rowData.USE_ID,
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
// htId,
  let submitData = {
    USE_ID: formData.USE_ID,
    CUS_ID: formData?.CUS_ID || null,
    HT_CODE_ID:formData.HT_CODE_ID,
    CODE: formData.CODE,
    NAME: formData.NAME,
    DESCRIPTION: formData.DESCRIPTION,
    DUTY_LC_CODE: formData.DUTY_LC_CODE,
    FOREX:formData.FOREX,
    TRANSPORATION_FEE: formData.TRANSPORATION_FEE || "",
    OVERHEADS: formData.OVERHEADS,
    NOTES:formData.NOTES,
    ACTIVE_FLAG:formData.ACTIVE_FLAG.toUpperCase(),
  };

  //console.log(submitData)

  let newdata = {
    data: submitData,
    action: "Administration",
    method: "PostHarmonizedTarrifCode",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  let getAllTask = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
   
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
export default HTinlineEditing;
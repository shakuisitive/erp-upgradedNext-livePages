// import React, { useEffect, useState } from "react";
// // import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
// import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// import { useDispatch, useSelector } from "react-redux";
// import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import ChartleftForm from "./header/LeftForm";
// import ChartrightForm from "./header/RightForm";
// import { Inventory } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
// import { closeEditModal, setRefreshing } from "../../../_redux/chartSlice";
// import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
// import { setName } from "../../../_redux/chartSlice";

// const ChartForm = () => {
//   const [isHeader, setIsHeader] = useState(true);
//   const [eMessage, setEMessage] = useState("");
//   const [isEMessage, setIsErrorMessage] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [chartID, setChartID] = useState("");
//   const [accountID, setAccountid] = useState();
//   const [name, setName] = useState("");
//   // const name = useSelector((state) => state.ChartSlice.name);
//   const [code, setCode] = useState("");
//   const [glGroup, setGlgroup] = useState("");
//   const [glGroupType, setGlgroupType] = useState("");
//   const [purposed, setPurposed] = useState();
//   const [current, setCurrent] = useState();
//   const [active, setActive] = useState(true);
//   const [desc, setDesc] = useState("");
//   const [approvalFlag, setApprovalFlag] = useState(true);

//   let [error, sendRequest] = useApiFetch();
//   const dispatch = useDispatch();
//   const chartFormData = useSelector((state) => state.ChartSlice.formIndex);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

//   const ACTIVE =
//     chartFormData?.ACTIVE_FLAG === "Y"
//       ? true
//       : chartFormData?.ACTIVE_FLAG === "N"
//       ? false
//       : true;
//   const payload = {
//     // BUDGET_DESCRIPTION:rowData.BUDGET_DESCRIPTION,
//     GLACC_ID: "",
//     ACCOUNT_NUMBER: accountID,
//     CODE: code,
//     ACCOUNT_NAME: name,
//     CURRENT_BUDGET: current, // Ensure it's a float
//     DESCRIPTION: desc,
//     GLACCGRO_ID: glGroup,
//     GLACC_CAT_ID: "",

//     PROPOSED_BUDGET: purposed, // Ensure it's a float

//     ACTIVE_FLAG: acti/ve ? "Y" : "N",
//   };
//   const payloadChart = {
//     data: payload,
//     action: "InventoryWeb",
//     method: "PostGlAccounts",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   const handleChartaccount = (data) => {
//     const payloadBudget = {
//       data: {
//         BUDGET_ID: "",
//         GLACC_ID: data.Result,
//         PROPOSED_BUDGET: purposed,
//         CURRENT_BUDGET: current,
//         USED_ID: null,
//         CUR_ID: "",
//         APPROVAL_FLAGE: approvalFlag,
//         DISTRIBUTE_MONTHLY_EQUAL: "",
//         DESCRIPTION: desc,
//         ACTIVE_FLAG: "Y",
//       },
//       action: "InventoryWeb",
//       method: "PostGlBudget",
//       username: "admin",
//       type: "rpc",
//       tid: "144",
//     };

//     console.log(data, "s");

//     if (data?.CODE === "SUCCESS") {
//       // console.log(payloadBudget, "pay");

//       // if (data.Result) {
//       sendRequest(
//         Inventory.PostGlBudget,
//         "POST",
//         payloadBudget,
//         // handleChartBudget,
//         handleChartaccount,
//         token
//       );
//       // }
//     }
//     if (data?.CODE === "SUCCESS") {
//       // alert("alertpost");
//       dispatch(setRefreshing(true));

//       dispatch(closeEditModal());
//       console.log(closeModal(), "close");
//     }
//   };

//   const handleApply = () => {
//     // console.log("payload", payloadCustomer);
//     // if (
//     //payload?.CODE != "" &&
//     //// payload?.CODE != undefined &&
//     // payload?.ACCOUNT_NAME != "" &&
//     // payload?.ACCOUNT_NAME != undefined &&
//     // payload?.CURRENT_BUDGET != "" &&
//     // payload?.CURRENT_BUDGET != "" &&
//     // payload?.GLACCGRO_ID != "" &&
//     // payload?.GLACCGRO_ID != "" &&
//     // payload?.DESCRIPTION != "" &&
//     // payload?.DESCRIPTION != undefined &&
//     // // payload?.GLACC_CAT_ID != "" &&
//     // // payload?.GLACC_CAT_ID != undefined &&
//     // // payload?.GLACC_ID != "" &&
//     // // payload?.GLACC_ID != undefined &&
//     // payload?.PROPOSED_BUDGET != "" &&
//     // payload?.PROPOSED_BUDGET != undefined // Ensure PROPOSED_BUDGET is a valid number
//     // )
//     // {
//     sendRequest(
//       Inventory.PostGlAccounts,
//       "POST",
//       payloadChart,
//       handleChartaccount,
//       token
//     );
//     // } else {
//     //   setEMessage("Please Fill all Mandatory(*) Fields");
//     //   setIsErrorMessage(true);
//     //   setIsError(true);
//     // }
//   };
//   function toCamelCase(str) {
//     return str?.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
//       return match.toUpperCase();
//     });
//   }
//   useEffect(() => {
//     if (chartFormData) {
//       setAccountid(chartFormData?.ACCOUNT_NUMBER);
//       setCode(chartFormData?.CODE);
//       setName(chartFormData?.ACCOUNT_NAME);
//       setGlgroup(chartFormData?.GLACCGRO_ID);
//       setGlgroupType(chartFormData?.GLACC_CAT_ID);
//       setCurrent(chartFormData?.CURRENT_BUDGET);
//       setPurposed(chartFormData?.PROPOSED_BUDGET);
//       setDesc(chartFormData?.DESCRIPTION);
//       setActive(ACTIVE);
//       // setApprovalFlag(approvalFlag);
//     }
//     // console.log(chartFormData, "chardata");
//     // console.log(data, "data");
//   }, [chartFormData]);

//   return (
//     <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
//       <div
//         className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
//           rounded-md bg-white  "
//       >
//         <div className="py-2 ml-[50px]">
//           <DropdownMenu label="Apply" handleClick={handleApply} />
//         </div>

//         <div className="py-1 w-full bg-gray-100"></div>
//         <div className="h-[98%] overflow-x-auto">
//           <div>
//             <div className="ml-[50px] my-4">
//               <button
//                 className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
//                 onClick={() => setIsHeader(!isHeader)}
//               >
//                 {isHeader ? (
//                   <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
//                 ) : (
//                   <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
//                 )}
//                 Header
//               </button>
//             </div>
//             {isHeader && (
//               <div className="ml-10 ">
//                 <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
//                   <div className="w-full lg:w-1/2 ">
//                     <ChartleftForm
//                       accountID={accountID}
//                       setAccountid={setAccountid}
//                       name={name}
//                       setName={setName}
//                       // {name}
//                       code={code}
//                       setCode={setCode}
//                       glGroup={glGroup}
//                       setGlgroup={setGlgroup}
//                       glGroupType={glGroupType}
//                       setGlgroupType={setGlgroupType}
//                     />
//                   </div>
//                   <div className="w-full lg:w-1/2 ">
//                     <ChartrightForm
//                       active={active}
//                       setActive={setActive}
//                       purposed={purposed}
//                       setPurposed={setPurposed}
//                       current={current}
//                       setCurrent={setCurrent}
//                       desc={desc}
//                       setDesc={setDesc}
//                       approvalFlag={approvalFlag}
//                       setApprovalFlag={setApprovalFlag}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {isEMessage && (
//           <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChartForm;

import React, { useEffect, useState } from "react";
// import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import ChartleftForm from "./header/LeftForm";
import ChartrightForm from "./header/RightForm";
import { Inventory } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeEditModal, setRefreshing } from "../../../_redux/chartSlice";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";

const ChartForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [chartID, setChartID] = useState("");
  const [accountID, setAccountid] = useState();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [glGroup, setGlgroup] = useState("");
  const [glGroupType, setGlgroupType] = useState("");
  const [purposed, setPurposed] = useState(77);
  const [current, setCurrent] = useState(70);
  const [active, setActive] = useState(true);
  const [desc, setDesc] = useState("");
  const [approvalFlag, setApprovalFlag] = useState("");

  const [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const chartFormData = useSelector((state) => state.ChartSlice.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const ACTIVE =
    chartFormData?.ACTIVE_FLAG === "Y"
      ? true
      : chartFormData?.ACTIVE_FLAG === "N"
      ? false
      : true;

  const payload = {
    GLACC_ID: "", // Empty for now, adjust as needed;
    ACCOUNT_NUMBER: accountID,
    CODE: code,
    ACCOUNT_NAME: name,
    CURRENT_BUDGET: current, // Ensure it's a float
    DESCRIPTION: desc,
    GLACCGRO_ID: glGroup,
    GLACC_CAT_ID: "", // Empty for now, adjust as needed
    PROPOSED_BUDGET: purposed, // Ensure it's a float
    ACTIVE_FLAG: active ? "Y" : "N",
  };

  console.log(payload,"pay");
  
  const payloadChart = {
    data: payload,
    action: "InventoryWeb",
    method: "PostGlAccounts",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  // Function to handle chart account creation
  const handleChartAccount = (data) => {
    const payloadBudget = {
      data: {
        BUDGET_ID: null,
        GLACC_ID: data.Result,
        PROPOSED_BUDGET: purposed,
        CURRENT_BUDGET: current,
        USED_ID: null,
        CUR_ID: null,
        APPROVAL_FLAGE: approvalFlag,
        DISTRIBUTE_MONTHLY_EQUAL: "",
        DESCRIPTION: desc,
        ACTIVE_FLAG: "Y",
      },
      action: "InventoryWeb",
      method: "PostGlBudget",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Inventory.PostGlBudget,
        "POST",
        payloadBudget,
        handleBudgetResponse,
        token
      );
    }
  };

  const handleBudgetResponse = (response) => {
    if (response?.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
      dispatch(closeEditModal());
    } else {
      setEMessage("Something went wrong with creating the budget.");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };

  const handleApply = () => {
    // if (
    //   payload?.ACCOUNT_NAME &&
    //   payload?.CURRENT_BUDGET &&
    //   payload?.DESCRIPTION &&
    //   payload?.PROPOSED_BUDGET
    // ) {
      sendRequest(
        Inventory.PostGlAccounts,
        "POST",
        payloadChart,
        handleChartAccount,
        token
      );
    // } else {
    //   setEMessage("Please fill all mandatory (*) fields.");
    //   setIsErrorMessage(true);
    //   setIsError(true);
    // }
  };

  function toCamelCase(str) {
    return str?.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  useEffect(() => {
    if (chartFormData) {
      setAccountid(chartFormData?.ACCOUNT_NUMBER);
      setCode(chartFormData?.CODE);
      setName(chartFormData?.ACCOUNT_NAME);
      setGlgroup(chartFormData?.GLACCGRO_ID);
      setGlgroupType(chartFormData?.GLACC_CAT_ID);
      setCurrent(chartFormData?.CURRENT_BUDGET);
      setPurposed(chartFormData?.PROPOSED_BUDGET);
      setDesc(chartFormData?.DESCRIPTION);
      setActive(ACTIVE);
    }
  }, [chartFormData]);

  return (
    <div className="h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div className="flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%] rounded-md bg-white">
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
            <div className="ml-[50px] my-4">
              <button
                className="poppins flex gap-2 text-[16px] text-[#4ade80] leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10">
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4">
                  <div className="w-full lg:w-1/2">
                    <ChartleftForm
                      accountID={accountID}
                      setAccountid={setAccountid}
                      name={name}
                      setName={setName}
                      code={code}
                      setCode={setCode}
                      glGroup={glGroup}
                      setGlgroup={setGlgroup}
                      glGroupType={glGroupType}
                      setGlgroupType={setGlgroupType}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <ChartrightForm
                      active={active}
                      setActive={setActive}
                      purposed={purposed}
                      setPurposed={setPurposed}
                      current={current}
                      setCurrent={setCurrent}
                      desc={desc}
                      setDesc={setDesc}
                      approvalFlag={approvalFlag}
                      setApprovalFlag={setApprovalFlag}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
};

export default ChartForm;

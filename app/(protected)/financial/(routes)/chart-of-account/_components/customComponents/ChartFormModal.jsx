import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setFormIndex, setChartFormData } from "../../_redux/chartSlice";

const ChartFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const paylaodChartFormModal = {
    data: {
      GLACC_ID: index?.GLACC_ID,
      OFFSET: "",
    },
    action: "InventoryWeb",
    method: "PostGlAccounts",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
console.log(index);

  const handleGetChartDet = (data) => {
    if (data?.CODE === "SUCCESS") {



      // sendRequest(
      //   Inventory.PostGlAccounts,
      //   "POST",
      //   payloadChart,
      //   handleChartAccount,
      //   token
      // );

     
      dispatch(setChartFormData(data?.Result));
      dispatch(setRefreshing(true));

      dispatch(closeEditModal());
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);

    dispatch(setFormIndex(index));

    // for form
    sendRequest(
      ItemMaster.GetGlAccounts,
      "POST",
      paylaodChartFormModal,
      handleGetChartDet,
      token
    );
  };
  return (
    <div className="ml-2">
      <div
        onClick={handleOpenModal}
        className=" hidden items-center mr-2  group-hover:flex cursor-pointer "
      >
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default ChartFormModal;
// "use client";
// import React, { useState } from "react";
// import { GrExpand } from "react-icons/gr";
// import {
//   Administration,
//   Inventory,
//   ItemMaster,
// } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
// import { useDispatch } from "react-redux";
// import useApiFetch from "../../../../../../../customHook/useApiFetch";
// import {
//   setFormIndex,
//   setChartFormData,
//   setRefreshing,
//   closeEditModal,
// } from "../../_redux/chartSlice";

// const ChartFormModal = ({ index }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false); // You can keep it for modal open state if required

//   // Ensure localStorage works only in the client-side environment
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

//   // Your custom hook for API fetching
//   let [error, sendRequest] = useApiFetch();
//   const dispatch = useDispatch();

//   // Corrected variable name (payload instead of paylaod)
//   const payloadChartFormModal = {
//     data: {
//       GLACC_ID: index?.GLACC_ID, // Make sure index is passed with the correct structure
//     },

//     action: "InventoryWeb",
//     method: "PostGlAccounts",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };
//   console.log(index, "index");

//   // API response handler
//   const handleGetChartDet = (data) => {
//     if (data?.CODE === "SUCCESS") {
//       dispatch(setChartFormData(data?.Result)); // Ensure you have setChartFormData in your redux slice
//       dispatch(setRefreshing(true)); // Make sure setRefreshing exists in your redux slice

//       // You may want to define closeEditModal in the redux slice or replace it with actual logic
//       // dispatch(closeEditModal()); // Ensure this action is imported correctly
//     } else {
//       console.error("Error fetching chart details:", data?.MESSAGE); // Handle error if the API response is not successful
//     }
//   };

//   // Handle opening modal and triggering API request
//   const handleOpenModal = () => {
//     setIsModalOpen(true); // If you need to open the modal here, uncomment and use

//     dispatch(setFormIndex(index));

//     // Send API request
//     sendRequest(
//       ItemMaster.GetGlAccounts, // Ensure this is correct
//       "POST",
//       payloadChartFormModal,
//       handleGetChartDet,
//       token
//     );
//   };

//   return (
//     <div className="ml-2">
//       {/* Ensure the hover works by managing group hover classes */}
//       <div
//         onClick={handleOpenModal}
//         className="items-center mr-2 group-hover:flex cursor-pointer"
//       >
//         <GrExpand className="mr-2" />
//         Open
//       </div>

//       {/* Optionally, you can add the modal rendering here */}
//       {isModalOpen && (
//         <div className="modal">
//           {" "}
//           {/* Replace with your modal implementation */}
//           {/* Modal Content */}
//           <div className="modal-body">
//             {/* Modal Content goes here */}
//             <p>Form content for GLACC_ID: {index?.GLACC_ID}</p>
//             {/* Add close modal functionality */}
//             <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartFormModal;

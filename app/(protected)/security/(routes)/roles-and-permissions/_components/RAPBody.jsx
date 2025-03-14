"use client";

import React, { useEffect, useRef, useState } from "react";
import TabsNav from "./GTabs";
import CustomScrollBar from "../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import Owner from "./roleComponents/Owner";
import RLable from "./roleComponents/RLable";
import RCheck from "./roleComponents/RCheck";
import RDate from "./roleComponents/RDate";
import { closePermissionModal, setHeadRedux, setMainRoleList } from "../redux/Role.slice";
import AddNewRole from "./roleComponents/AddNewRole";
import RoleConversionModal from "./roleComponents/conversation/RoleConversationModal";
import PermissionsDrawer from './permissionsComponents/PermissionsDrawer';
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import PermissionsPage from './permissionsComponents/PermissionsPage';

const RAPBody = () => {
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const [scrollChange, setScrollChange] = useState(1);
  const [data, setData] = useState();
  const [compRow, setCompRow] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [hActive, setHActive] = useState({});
  const [isPerModalOpen, setIsPerModalOpen] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const roleHead = useSelector((state) => state.RoleSlice.RoleHead);
  const GridFilterState = useSelector(
    (state) => state.RoleSlice.GridFilterState
  );
  const openPermissionModal = useSelector(
    (state) => state.RoleSlice.openPermissionModal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (openPermissionModal == true) {
      setIsPerModalOpen(true);
    } else {
      setIsPerModalOpen(false);
    }

    // console.log('check modall in purchase' , openPermissionModal , isPerModalOpen );
  }, [openPermissionModal]);

  const handleCloseModal = () => {
    setIsPerModalOpen(false);
    dispatch(closePermissionModal());
  };

  const tabs = [
    {
      icon: <GoHome />,
      label: "Main Table",
      content: <PermissionsPage />,
    },
    {
      label: "Activity",
    },
  ];

  const [payload, setPayload] = useState({
    data: {
      ACTIVE_FLAG: "Y",
    },
    action: "Security",
    method: "GetAuthGroups",
    username: "admin",
    type: "rpc",
    tid: "144",
  });

  let [head, setHead] = useState([
    {
      title: "Deal",
      slector: "NAME",
      Wid: 265,
      filter: "textFilter",
      Modal: RoleConversionModal,
      Drawer: PermissionsDrawer,
      hidden: false,
      def: false,
    },
    {
      title: "Lable",
      slector: "",
      Wid: 265,
      customComp: RLable,
      hidden: false,
      def: false,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: Owner,
      hidden: false,
      def: false,
    },
    {
      title: "View",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "Update",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "All",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "Update Date",
      slector: "",
      Wid: 100,
      customComp: RDate,
      hidden: false,
      def: false,
    },
    {
      title: "Create Date",
      slector: "",
      Wid: 100,
      customComp: RDate,
      hidden: false,
      def: false,
    },
  ]);

  let [headTwo, setHeadTwo] = useState([
    {
      title: "Deal",
      slector: "NAME",
      Wid: 265,
      filter: "textFilter",
      Modal: RoleConversionModal,
      Drawer: PermissionsDrawer,
      More: MoreOption,
      hidden: false,
      def: false,
    },
    {
      title: "Lable",
      slector: "",
      Wid: 265,
      customComp: RLable,
      hidden: false,
      def: false,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: Owner,
      hidden: false,
      def: false,
    },
    {
      title: "View",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "Update",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "All",
      slector: "",
      Wid: 100,
      customComp: RCheck,
      hidden: false,
      def: false,
    },
    {
      title: "Update Date",
      slector: "",
      Wid: 100,
      customComp: RDate,
      hidden: false,
      def: false,
    },
    {
      title: "Create Date",
      slector: "",
      Wid: 100,
      customComp: RDate,
      hidden: false,
      def: false,
    },
  ]);

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}security/GetAuthGroups`;

  useEffect(() => {
    dispatch(setHeadRedux(headTwo));
  }, []);

  useEffect(() => {
    const newData = {
      ...payload.data,
      NAME: GridFilterState.Rn ? GridFilterState.Rn : "",
    };
    // Create a new payload object with the updated data
    const newPayload = { ...payload, data: newData };
    // Update the state with the new payload object
    setPayload(newPayload);
  }, [GridFilterState]);

  useEffect(() => {
    if (roleHead != head) {
      setHead(roleHead);
    }
  }, [roleHead]);

  useEffect(() => {
    const container = activeGridRef.current;

    const handleOverflowChange = (entries) => {
      setScrollChange((pre) => pre + 1);
    };
    const resizeObserver = new ResizeObserver(handleOverflowChange);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    data?.Result?.forEach((comp) => {
      if (comp?.ACTIVE_FLAG == "N") {
        setCompRow((prev) => [...prev, comp]);
      }
    });
  }, [data]);

  function getAllTask(data) {
    setData(data);
    dispatch(setMainRoleList(data.Result));
    setErrorMessage(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);

  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      setColaps(false);
      setColapsComp(true);
    } else {
      setColaps(!colaps);
    }
  };
  const colapsfuncComp = () => {
    if (!colaps && colapsComp) {
      setColaps(true);
      setColapsComp(false);
    } else {
      setColapsComp(!colapsComp);
    }
  };

  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };

  const setEdite = (e, i, title, selector) => {
    if (e.key === "Enter" && e.target.value !== "hidden") {
      // console.log('check key press header', i, title, selector);
      const updatedHead = [...head]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], title: e.target.value }; // Update the specific item's title
      updatedHead[i] = { ...updatedHead[i], def: true };
      setHead(updatedHead); // Update the local state
      let hData = {
        index: i,
        hData: e.target.value,
        cat: true,
      };
      dispatch(setHeadReduxT(hData));
      setHActive({}); // Assuming this sets the active state
    } else if (e.key === "Enter" && e.target.value === "hidden") {
      const updatedHead = [...head]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], hidden: true }; // Update the specific item's hidden property
      setHead(updatedHead); // Update the local state
      setHActive({}); // Assuming this sets the active state
      dispatch(setHeadRedux(updatedHead)); // Dispatch action to update Redux state
    }
  };

  return (
    <div className=" w-full  h-fit flex flex-col overflow-auto pb-5 ">
      <div className="w-full pl-10 pt-3 pb-1 ">
        <TabsNav />
      </div>
      <CustomScrollBar
        change={scrollChange}
        refsArray={[activeGridRef, completedGridRef]}
      >
        <div
          ref={activeGridRef}
          className={` overflow-x-hidden  mt-1 h-fit mr-5 `}
        >
          <GridTable
            head={head}
            row={data?.Result}
            setHead={setHead}
            // setSubHead={setSubHead}
            // subHead={subHead}
            GridTitle="Active"
            GridColor="green-400"
            GridColaps={false}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfunc}
            addButton={true}
            GriddFooterAdd={AddNewRole}
            selectedRow={selectedRow}
            MoreOption={MoreOption}
            isChecked={checked}
            handleCheckboxChange={handleCheckboxChange}
            MoreOpt={MoreOption}
            setEdite={setEdite}
            setHActive={setHActive}
            hActive={hActive}
          />
        </div>
      </CustomScrollBar>
      <NewCustomModal
        isOpen={isPerModalOpen}
        onClose={handleCloseModal}
        tabs={tabs}
        heading="Permission"
        //  CustomComponent={PurchaseNewTooltip}
        // tooltipContent="initiated"
        // btnText = "New"
      />
    </div>
  );
};

export default RAPBody;

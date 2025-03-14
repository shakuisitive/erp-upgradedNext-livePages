"use client";
import React, { useState, useEffect, useRef } from "react";
import SupplierFormModal from "./customComponents/VendorFormModal";
import { GoHome } from "react-icons/go";
import RightDrawer from "./customComponents/VendorRightDrawer";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { IoIosAdd } from "react-icons/io";
import VendorForm from "../vendorForm/VendorForm";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import VendorStatus from "./customComponents/VendorStatus";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, setNewModal } from "../../redux/supplierSlice";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";

const VendorBody = () => {
  //localState

  //redux state
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  // const [compRowI, setCompRowI] = useState([]);
  const [compRow, setCompRow] = useState([]);

  const [exportListData, setExportListData] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let [subData, setSubData] = useState([]);

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [scrollChange, setScrollChange] = useState(1);

  let [error, sendRequest] = useApiFetch();

  //--------------------select and pop up

  let [isOpen, setIsOpen] = useState(true);
  const [accessToken, setAccessToken] = useState();

  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  //useSelectors
  const venEditModal = useSelector((state) => state.supplierSlice.venEditModal);
  const newFormModal = useSelector((state) => state.supplierSlice.newFormModal);
  const venFormIndex = useSelector((state) => state.supplierSlice.formIndex);
  const venID = venFormIndex?.VEN_ID;

  // Payloads
  const payloadVendorList = {
    data: {
      SEARCH: "",
      ORDER: "VEN_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      OFFSET: "+05::00",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetSupplierList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  useEffect(() => {
    let apiData = {
      vendorApi: [
        {
          api: Administration.GetSupplierList,
          payload: payloadVendorList,
          func: getAllTask,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);

  // Refs
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const containerRef = useRef(null);

  // Functions
  const handleCloseModal = () => {
    dispatch(closeModal());
    // setIsModalOpen(false);
    setRefresh(true);
  };
  let handleApply = () => {};
  const selectedRow = (index, data) => {};
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
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  function getAllTask(data) {
    // setData(data.Result);
    setData(data?.Result);
    if (data) {
      const dataActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "Y";
      });
      const dataInActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "N";
      });
      setCompRowA(dataActive);
      setCompRow(dataInActive);
      setExportListData(data?.Result);
      setLoading(false);
    }
  }
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
  const handleFilter = () => {};

  const option = [
    {
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        // setIsModalOpen(true);
      },
    },
  ];

  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        // setIsModalOpen(true);
        dispatch(setNewModal());
      },
    },

    filter: {
      handleFilter: handleFilter,
      FilterComp: () => {},
    },
    // search: {
    //   searchShow: true,
    // },
  };

  const onRefreshHandle = () => {
    setRefresh(true);
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  const exportProps = {
    fileName: "",
    fileExtension: "xls",
    data: exportListData,
  };

  // Arrays
  const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <VendorForm />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={venID} />,
    },
  ];
  const [head, setHead] = useState([
    {
      title: "CODE",
      slector: "SUPPLIER_CODE",
      Wid: 270,
      filter: "textFilter",
      Modal: RightDrawer,
      Drawer: SupplierFormModal,
    },
    {
      title: "Name",
      Wid: 150,
      slector: "ADDRESS_2",
    },

    {
      title: "Phone",
      Wid: 200,
      slector: "PHONE_1",
    },
    {
      title: "Address",
      Wid: 200,
      slector: "ADDRESS_1",
    },
    {
      title: "Description",
      Wid: 200,
      slector: "SUPPLIER_DESCRIPTION",
    },
    {
      title: "Status",
      slector: "ACTIVE_FLAG",
      Wid: 150,
      Status: VendorStatus,
    },
  ]);

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Details",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.vendorApi,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  const [subHead, setSubHead] = useState([
    { title: "SubItem", slector: "SubItem", Wid: 250 },
  ]);

  // useEffects

  useEffect(() => {
    if (checkedItems.length > 0) {
      // console.log('kuch data log hoa hai');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  useEffect(() => {
    data?.forEach((comp) => {
      //console.log('check========', comp.ACTIVE_FLAG );
      if (comp?.ACTIVE_FLAG == "N" && compRow?.PAYTER_ID !== comp?.PAYTER_ID) {
        setCompRow((prev) => [...prev, comp]);
        //console.log('comp Row', compRow);
      }
    });
  }, [data, refresh]);

  useEffect(() => {
    if (compRowA.length > 0) {
      const container = containerRef?.current;
      const handleOverflowChange = (entries) => {
        setScrollChange((pre) => pre + 1);
      };
      const resizeObserver = new ResizeObserver(handleOverflowChange);
      resizeObserver?.observe(container);

      return () => {
        resizeObserver?.disconnect();
      };
    }
  }, [compRowA]);

  useEffect(() => {
    const gridArr = [
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },
        subColumnList: {
          subComln: subHead,
          setSubColmn: setSubHead,
        },
        title: {
          GridTitle: "Active",
          GridColor: "#4ade80",
        },
        data: {
          Griddata: compRowA,

          subGridData: subData,
        },
        colapsList: {
          GridColaps: true,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: false,
          addFooterSubComp: false,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {},

        ref: activeGridRef,
        fixHight: false,
      },
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },
        subColumnList: {
          subComln: subHead,
          setSubColmn: setSubHead,
        },
        title: {
          GridTitle: "InActive",
          GridColor: "#FF0000",
        },
        data: {
          Griddata: compRow,

          subGridData: subData,
        },
        colapsList: {
          GridColaps: false,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {},

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [compRowA, compRow, colaps, colapsComp, subData, head]);

  return (
    <div className=" w-full  h-full flex flex-col ">
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, completedGridRef]}
          scroll={scrollChange}
        />
      </div>

      <NewCustomModal
        isOpen={venID ? venEditModal : newFormModal}
        onClose={handleCloseModal}
        tabs={tabs}
        heading="Vendor"
      />
    </div>
  );
};

export default VendorBody;

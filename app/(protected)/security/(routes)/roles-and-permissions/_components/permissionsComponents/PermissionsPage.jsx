import React, { useEffect, useRef, useState } from "react";
import PHeader from "./PHeader";
import CustomScrollBar from "./../../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import GridTable from "./../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useDispatch, useSelector } from "react-redux";
import {
  setHeadRedux,
  setHeadReduxT,
  setMainPerList,
} from "../../redux/Permission.slice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import RLable from "../roleComponents/RLable";
import RCheck from "../roleComponents/RCheck";
import RDate from "../roleComponents/RDate";
import PermissionGridTable from "./PermissionGridTable";

const PermissionsPage = () => {
  const [scrollChange, setScrollChange] = useState(1);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [hActive, setHActive] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [compRow, setCompRow] = useState([]);
  const [data, setData] = useState();
  let [error, sendRequest] = useApiFetch();
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const dispatch = useDispatch();

  const perHead = useSelector((state) => state.PermissionSlice.PerHead);
  const RoleId = useSelector((state) => state.RoleSlice.RoleId);
  console.log(RoleId)
  let [head, setHead] = useState([
    {
      title: "Module",
      slector: "MENU_LABEL",
      Wid: 265,
      filter: "textFilter",
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
      title: "Module",
      slector: "MENU_LABEL",
      Wid: 265,
      filter: "textFilter",
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
  const [payload, setPayload] = useState({
    data: {
      AUTGRO_ID: RoleId.toString(),
    },
    action: "Security",
    method: "GetAuthGroupMenuPrivileges",
    username: "admin",
    type: "rpc",
    tid: "144",
  });
  function getAllTask(data) {
    setData(data);
    dispatch(setMainPerList(data.Result));
    setErrorMessage(error);
  }
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}security/GetAuthGroupMenuPrivileges`;
  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  useEffect(() => {
    data?.Result?.forEach((comp) => {
      if (comp?.MASMEN_ID_PARENT == null) {
        setCompRow((prev) => [...prev, comp]);
      }
    });
  }, [data]);
  useEffect(() => {
    dispatch(setHeadRedux(headTwo));
  }, []);
  useEffect(() => {
    if (perHead != head) {
      setHead(perHead);
    }
  }, [perHead]);
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
  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      setColaps(false);
      setColapsComp(true);
    } else {
      setColaps(!colaps);
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
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white"
      >
        <PHeader />
        <div className="py-1 w-full bg-gray-100"></div>
        <div className="flex">
          <div className=" w-full  h-fit flex flex-col overflow-auto pb-5 ">
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
                  row={compRow}
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
                  // GriddFooterAdd={AddNewRole}
                  selectedRow={selectedRow}
                  // MoreOption={MoreOption}
                  isChecked={checked}
                  handleCheckboxChange={handleCheckboxChange}
                  // MoreOpt={MoreOption}
                  setEdite={setEdite}
                  setHActive={setHActive}
                  hActive={hActive}
                />
              </div>
            </CustomScrollBar>

            {/* <div>
            <div className="flex items-center border w-[250px] py-2 px-3 ml-16 rounded-md cursor-pointer ">
              <IoIosAdd className="text-customblack text-[30px]" />
              <select
                onChange={setDataRowChange}
                className="w-full outline-none"
              >
                <option value="25">Show 25</option>
                <option value="50">Show 50</option>
                <option value="100">Show 100</option>
                <option value="500">Show 500</option>
              </select>
              <IoIosArrowDown className="text-customblack text-[25px]" />
            </div>
          </div> */}
          </div>
          <div className="w-[20%] mr-3 mt-2">
            <div className="flex justify-between mb-3">
                <span>Module</span>
                <span>Purchase</span>
            </div>
            <PermissionGridTable/>
            <PermissionGridTable/>
            <PermissionGridTable/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;

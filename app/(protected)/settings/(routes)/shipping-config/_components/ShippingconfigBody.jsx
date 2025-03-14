"use client";
import React from 'react'
import { GrHomeRounded } from 'react-icons/gr';
import { useState, useRef, useEffect } from 'react';
import { Administration } from '../../../../../../components/misc/pureComponents/constants/apiConstant';
import Loading from '../../../../../../components/misc/loader/loading';
import MainTabsGrid from '../../../../../../components/misc/bindComponent/MainTabsGrid';
import { GoHome } from 'react-icons/go';
import ActivityLog from '../../../../../../components/misc/globalComponents/activitylog/ActivityLog';
import RightDrawer from '../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer';
import { useDispatch,useSelector } from 'react-redux';
import { closeDrawer,setInputData,setFormIndex,setRefreshing } from '../_redux/ShipingConfigSlice';
import ShippingConRightDrawer from "./customcomponents/ShippingConRightDrawer";
import ShippingConfigActivityLog from "./customcomponents/ShippingConfigActivityLog";
import ShippConStatus from "./customcomponents/ShippingConStatus";
import EditShippingConName from "./customcomponents/InlineEditingConName";
import EditShippingDaysFrom from "./customcomponents/InlineEditingShipFrom";
import EditShippingDayUpto from "./customcomponents/InlineEditingShipUpto";
import EditchargeType from "./customcomponents/InlineEditingCargetype";
import EditShippingCode from "./customcomponents/InlineEditingCode"

 

function ShippingconfigBody() {

    const [loading, setLoading] = useState(false);
    const [compRowA, setCompRowA] = useState([]);
    // const InactiveGridRef = useRef(null);
    const [refresh, setRefresh] = useState()
    const [gridArr, setGridArr] = useState()
    const [accessToken, setAccessToken] = useState();
    const [scrollChange, setScrollChange] = useState(1)
    const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
    const [activeData, setActiveData] = useState();
    const [inactiveData, setInactiveData] = useState();
    let [aPIProp, setAPIProp] = useState([]);
    let [gridArrP, setGridArrP] = useState();
    let [subData, setSubData] = useState([]);
    const [data, setData] = useState();
   
   
    const [checkedItems, setCheckedItems] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
   

    //useSelectors
  const refreshing = useSelector((state) => state.shippingConfigSlice.refreshing);
  const formIndex = useSelector((state)=> state.shippingConfigSlice.formIndex)
  const activityDrawer = useSelector ((state)=> state.shippingConfigSlice.activityDrawer) ;
    //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();



   //Arrays
   const Drawertabs = [
    {
      label: "Activity",
      icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
      content: <ActivityLog payloadid={formIndex?.SHIP_CARIER_ID} />,
    },
  ];


    //grid data
    const [head, setHead] = useState([
        {
            title: "Code",
            slector: "CODE",
            Wid: 270,
            customComp:EditShippingCode,
           Modal:ShippingConRightDrawer,
           Drawer: ShippingConfigActivityLog,
        

        },
        {
            title: "Name",
            slector: "DESCRIPTION",
            Wid: 270,
            Status: "",
            filter: "checkFilter",
            // checkFilterOptions: ["NEW"],
            customComp:EditShippingConName
        },

        {
            title: "Ship Days From",
            slector: "SHIPPING_TIME",
            Wid: 150,
            Status: "",
            filter: "checkFilter",
            customComp:EditShippingDaysFrom
           
            // checkFilterOptions: ["NEW"],
        },

        {
            title: "Ship Days Upto",
            slector: "SHIPPING_DAYS",
            Wid: 150,
            Status: "",
            filter: "checkFilter",
            checkFilterOptions: ["NEW"],
            customComp:EditShippingDayUpto
        },
        {
            title: "Charge Type",
            slector: "CHARGE_TYPE",
            Wid: 150,
            Status: "",
            filter: "checkFilter",
            checkFilterOptions: ["NEW"],
            customComp: EditchargeType
        },
        {
            title: "Status",
            slector: "",
            Wid: 150,
            Status: ShippConStatus,
            // filter: "checkFilter",
          //  checkFilterOptions: ["NEW"],
          
        },
    ])

    const filterTabs = {
        actionBtn: {
          // option: option,
          // label: "New",
          // icon: IoIosAdd,
          // onClick: () => {
          //   // dispatch(setNewPromoModal());
          // },
        },
    
        filter: {
          handleFilter: () => {},
          // FilterComp: PromotionFilter,
        },
        // navigatorShow :  false ,
        sortShow: false,
        // hideShow : false ,
    
        filterShow: false,
        //  search :{
        //   searchShow : false
        //  }
        //  filterTool : false
      };
    
      const tabsmains = [
        {
          icon: <GoHome />,
          label: "Details",
          Gridcontent: {
            gridArr: gridArrP,
            setGridArr: setGridArrP,
            handleApi: aPIProp.PromotionApiData,
            defColmn: head,
            setDefColmn: setHead,
            filterTabs: filterTabs,
            refresh: refresh,
            setRefresh: setRefresh,
            // toolBar : false
          },
        },
      ];


    const ModalTabs = [
        {
            icon: <GoHome />,
            label: "Details",
        },
    ];



    

    //functions;
    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
      };


      const handleGetPartDetList = (data) => {
        setData(data.Result?.Results);
        const dataInActive = data?.Result?.Results?.filter((item) => {
          return item.ACTIVE_FLAG === "N";
        });
        const dataActive = data?.Result?.Results.filter((item) => {
          return item.ACTIVE_FLAG === "Y";
        });
    
        setActiveData(dataActive);
        setInactiveData(dataInActive);
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
        data: data,
      };
    

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



  //useEffect
  useEffect(() => {
    setRefresh(true);
    if (refreshing) {
      dispatch(setInputData(activeData));
    }
    // dispatch(setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);  


  // for token
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);


    // useEffect(() => {
    //     if (compRowA.length > 0) {
    //         const container = containerRef?.current;
    //         const handleOverflowChange = (entries) => {
    //             setScrollChange((pre) => pre + 1);
    //         };
    //         const resizeObserver = new ResizeObserver(handleOverflowChange);
    //         resizeObserver?.observe(container);

    //         return () => {
    //             resizeObserver?.disconnect();
    //         };
    //     }
    // }, [compRowA]);


   // for grid Array
  useEffect(() => {
    const gridArr = [
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },

        title: {
          GridTitle: "Active",
          GridColor: "#4ade80",
        },
        data: {
          Griddata: activeData,
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
          //   GriddFooterAdd: NewProdCategory,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },

        ref: activeGridRef,
        fixHight: false,
      },
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },

        title: {
          GridTitle: "Inactive",
          GridColor: "#F87171",
        },
        data: {
          Griddata: inactiveData,
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

        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [inactiveData, activeData, colaps, colapsComp, head]);

//Payloads
const payload = {
    data: {
   
    RNUM_FROM:1,
      RNUM_TO:25,
      SEARCH: "",
      ORDER: "DESC",
      ACTIVE_FLAG: "",
     
    },
    action: "AdministrationWeb",
    method: "GetAdmShipCarrierDetailList",
    username: "sales",
    type: "rpc",
    tid: "144",
  };





  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: Administration.GetAdmShipCarrierDetailList,
          method:"POST",
          payload: payload,
          func: handleGetPartDetList,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
    console.log(apiData,"apidata");
    
  }, [accessToken]);
  // for multi scrollbar
  useEffect(() => {
    if (data?.length > 0) {
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
  }, [data]);






    return (


        <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
            {loading == true && <Loading />}
            <div ref={containerRef}>
                <MainTabsGrid
                    tabs={tabsmains}
                    addButton={true}
                    onRefresh={onRefresh}
                    exportProps={exportProps}
                    refArray={[activeGridRef, InactiveGridRef]}
                // scroll={scrollChange}
                // GriddFooterAdd={ TaxAdd}


                />
            </div>
            <RightDrawer
        isOpen={activityDrawer}
        onClose={handleCloseDrawer}
        heading={formIndex?.CODE}
        tabs={Drawertabs}
      />
        </div>

    )
}

export default ShippingconfigBody
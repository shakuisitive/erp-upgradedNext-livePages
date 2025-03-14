"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewModal, closeEditModal } from "../_redux/PeriodSlice";
import Loading from "../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import { Administration, Inventory } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import { GoHome } from "react-icons/go";
import { closeDrawer } from "../_redux/PeriodSlice";
// import PeriodYear from "./customComponents/PeriodYear";
// import PeriodStartDate from "./customComponents/PeriodStartDate";
// import PeriodEndDate from "./customComponents/PeriodEndDate";
// import PeriodCloseDate from "./customComponents/PeriodCloseDate"
import PeriodActivity from "./customComponents/PeriodActivity";
// import MonthDays from "./customComponents/PeriodMonthDays";
// import YearDays from "./customComponents/PeriodYearDays";
// import PeriodDescription from "./customComponents/PeriodDescription";
import PeriodRightDrawer from "./customComponents/PeriodRightDrawer";
import Owner from "../../../../settings/(routes)/tax/_components/grid/Owner";
import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import PeriodForm from "./PeriodForm/PeriodForm"

const PeriodBody = () => {
    //states
    const [scrollChange, setScrollChange] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState();
    let [aPIProp, setAPIProp] = useState([]);
    let [gridArrP, setGridArrP] = useState();
    const [data, setData] = useState([]);
    const [inactiveData, setInactiveData] = useState();
    const [activeData, setActiveData] = useState();
    const [colaps, setColaps] = useState(false);
    const [colapsComp, setColapsComp] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const refreshes = useSelector((state) => state.periodSlice.refreshing);


    //useSelectors
    const activityDrawer = useSelector(
        (state) => state.prodCategorySlice.activityDrawer
    );
    const formIndex = useSelector((state) => state.periodSlice.formIndex);
    const newFormModal = useSelector((state) => state.periodSlice.newFormModal);
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
            content: <ActivityLog />,
        },
    ];

    const [head, setHead] = useState([
        {
            title: "Year",
            slector: "NAME",
            Wid: 200,
            filter: "textFilter",
            customComp: PeriodActivity,
            Modal: PeriodRightDrawer,
            Drawer: PeriodActivity,
        },
        // {
        //     title: "Owner",
        //     slector: "",
        //     Wid: 100,
        //     customComp: Owner,
        //     hidden: false,
        //     def: false,
        //     edit: false,
        // },
        {
            title: "Start Date",
            slector: "FY_START_DATE",
            // customComp: PeriodStartDate,
            Wid: 150,
        },
        {
            title: "End Date",
            slector: "FY_END_DATE",
            // customComp: PeriodEndDate,
            Wid: 150,
        },
        {
            title: "Closing Date",
            slector: "FY_CLOSING_DATE",
            // customComp: PeriodCloseDate,
            Wid: 150,
        },
        {
            title: "Working Days In Month",
            slector: "WORKING_DAYS",
            // customComp: MonthDays,
            Wid: 150,
        },
        {
            title: "Working Days In Year",
            slector: "WORKING_DAYS",
            // customComp: YearDays,
            Wid: 150,
        }, {
            title: "Description",
            slector: "DESCRIPTION",
            // customComp: PeriodDescription,
            Wid: 200,
        },
    ]);
    const handleCloseModal = () => {
        // setIsModalOpen(false);
        dispatch(closeEditModal());
    };
    const option = [{}];

    const tabs = [
        {
            icon: <GoHome />,
            label: "Details",
            content: <PeriodForm />,
        },
        // {
        //   label: "Activity",
        //   content: <ActivityLog />,
        // },
    ];

    const filterTabs = {
        actionBtn: {
            option: option,
            label: "New",
            icon: IoIosAdd,
            onClick: () => {
                dispatch(setNewModal());
            },
        },

        filter: {
            handleFilter: () => { },
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
    //Payloads
    const payload = {
        data: {
            RNUM_FROM: "1",
            RNUM_TO: "100",
            SEARCH: "",
            ORDER: "",
            ACTIVE_FLAG: "Y",
            FY_ID: "",
        },
        action: "Administration",
        method: "GetFiscalYearList",
        username: "SALES",
        type: "rpc",
        tid: "144",
    };

    //functions
    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
    };
    const handleGetPartDetList = (data) => {
        // dispatch(onDataLoad(data.Result));
        setData(data.Result);
        const dataInActive = data?.Result?.filter((item) => {
            return item.ACTIVE_FLAG === "y";
        });
        const dataActive = data?.Result?.filter((item) => {
            return item.ACTIVE_FLAG == "Y";
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
    const handleCheckboxChange = (rowI, rowData) => {
        if (rowData == "all" && checkedAll == false) {
            setCheckedAll(true);
            const arr = data?.Result.map((SData, i) => {
                let obj = { rowI: i, rowData: SData };

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
    const selectedRow = (index, data) => { };
    const checked = (rowI, rowData) => {
        return checkedItems.some(
            (item) => item.rowI === rowI && item.rowData === rowData
        );
    };

    // for token
    useEffect(() => {
        const Token =
            typeof localStorage !== "undefined"
                ? localStorage.getItem("tokenSession")
                : null;
        setAccessToken(Token);
    }, []);

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
                    addFooterComp: true,
                    addFooterSubComp: false,
                    GriddFooterAdd: PeriodYear,
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
    // for api
    useEffect(() => {
        let apiData = {
            PromotionApiData: [
                {
                    api: Administration.GetFiscalYearList,
                    payload: payload,
                    func: handleGetPartDetList,
                    token: accessToken,
                    title: "Active",
                },
            ],
        };
        setAPIProp(apiData);
    }, [accessToken, refreshes]);

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
                    onRefresh={onRefresh}
                    exportProps={exportProps}
                    refArray={[activeGridRef, InactiveGridRef]}
                    scroll={scrollChange}
                    addButton={true}
                    GriddFooterAdd={PeriodYear}
                />
            </div>
            <NewCustomModal
                isOpen={formIndex?.HT_CODE_ID ? editFormModal : newFormModal}
                onClose={handleCloseModal}
                tabs={tabs}
                heading="Period Form"
            />
        </div>
    );
};

export default PeriodBody;

"use client";
import Card from "../dashboard/_components/dashboardUiComp/cards/Card";
import Catagory from "../dashboard/_components/dashboardUiComp/catagories/Catagory";
import Navbar from "../dashboard/_components/dashboardUiComp/pagesNavbar/Navbar";
import LeftNavbarContent from "../dashboard/_components/dashboardUiComp/leftNavbarContent/LeftNavbarContent";
import ProductList from "../dashboard/_components/dashboardUiComp/productList/ProductList";
import RightSideContent from "../dashboard/_components/dashboardUiComp/rightSideContent/RightSideContent";
import Header from "./_components/header/Header";
import useApiFetch from "../../../customHook/useApiFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Administration,
  DashboardApi,
  Purchase,
  Sales,
} from "../../../components/misc/pureComponents/constants/apiConstant";
import {
  setDashboardPurgroTotal,
  setPurchaseList,
  setSalesList,
  setSalesReturnList,
} from "./redux/dashboardSlice";

export default function Dashboard() {
  const [error, sendRequest] = useApiFetch();

  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const payloadDashboardPurgro = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      OFFSET: "",
      ACTIVE_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetPurchaseGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPurchaseOList = {
    data: {
      SEARCH: "",
      VOID_FLAG: "N",
      FINZ_FLAG: "N",
      OFFSET: "+04:00",
      ORDER: "PO_NUMBER DESC",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      ACTIVE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrderList",
    type: "rpc",
    tid: "144",
  };
  const payloadSalesOList = {
    data: {
      FINZ_FLAG: "N",
      LOC_ID: "",
      OFFSET: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      SEARCH: "",
      VOID_FLAG: "N",
    },
    method: "GetSaleOrder",
    tid: "144",
    type: "rpc",
    action: "InventoryWeb",
  };
  const payloadSalesORetList = {
    data: {
      FINZ_FLAG: "N",
      LOC_ID: "",
      OFFSET: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      SEARCH: "",
      VOID_FLAG: "N",
    },
    method: "GetSaleOrderReturnList",
    tid: "144",
    type: "rpc",
    action: "InventoryWeb",
  };
  const handleDashPurgro = (data) => {
    dispatch(setDashboardPurgroTotal(data.Result));
  };
  const handlePurchaseList = (data) => {
    dispatch(setPurchaseList(data.Result.Results));
  };
  const handleSalesList = (data) => {
    dispatch(setSalesList(data.Result.Results));
  };
  const handleSalesReturnList = (data) => {
    dispatch(setSalesReturnList(data.Result.Results));
  };
  useEffect(() => {
    if (token) {
      sendRequest(
        Administration.GetPurchaseGroupList,
        "POST",
        payloadDashboardPurgro,
        handleDashPurgro,
        token
      );
      sendRequest(
        Purchase.GetPurchaseOrderList,
        "POST",
        payloadPurchaseOList,
        handlePurchaseList,
        token
      );
      sendRequest(
        Sales.GetSaleOrderList,
        "POST",
        payloadSalesOList,
        handleSalesList,
        token
      );
      sendRequest(
        Sales.GetSaleOrderReturnList,
        "POST",
        payloadSalesORetList,
        handleSalesReturnList,
        token
      );
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-col">
        <header className="shrink-0 bg-White">{/* <Header /> */}</header>

        {/* 3 column wrapper */}
        <div className="w-full  grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}

          <div className="flex-1 xl:flex">
            <div
              className="border-b border-gray-200 pl-6 py-6 xl:w-64 xl:shrink-0 xl:border- 
                b-0 xl:border-r "
            >
              {/* Left column area */}
              <LeftNavbarContent />
            </div>

            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/* Main area */}
              <Card />
              <div className="px-0 ">
                <Catagory />
                <ProductList />
              </div>
            </div>
          </div>

          <div
            className="shrink-0 border-t border-gray-200 lg:min-w-[280px]  lg:max-w-[300px] py-6   
            lg:border-t-0 "
          >
            {/* Right column area */}
            <RightSideContent />
          </div>
        </div>
      </div>
    </>
  );
}

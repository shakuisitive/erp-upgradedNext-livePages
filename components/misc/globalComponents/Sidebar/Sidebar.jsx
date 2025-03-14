"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RiExchangeDollarLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  mouseEvnt,
  stockPageEvnt,
  salesPageEvnt,
  AdministrationPageEvnt,
  SecurityPageEvnt,
  FinancialPageEvent,
} from "../../../../redux/slidebar/slidebar.slice";
import Colaps from "./Colaps";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdAllInbox,
  MdSecurity,
  MdOutlineLogout,
} from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsAlexa, BsMenuButtonFill } from "react-icons/bs";
import Loading from "../../loader/loading";
import { clearUser } from "../../../../redux/user/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const route = usePathname();
  const [sideBarWidth, setSideBarWidth] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const stockList = useSelector((state) => state.mouseEvnt.stockPage);
  const salesList = useSelector((state) => state.mouseEvnt.salesPage);
  const stockListState = useSelector((state) => state.mouseEvnt.stocklistState);
  const salesListState = useSelector((state) => state.mouseEvnt.saleslistState);
  const AdministrationlistState = useSelector(
    (state) => state.mouseEvnt.AdministrationlistState
  );
  const securitylistState = useSelector(
    (state) => state.mouseEvnt.securitylistState
  );
  const SecurityList = useSelector((state) => state.mouseEvnt.SecurityPage);
  const AdminList = useSelector((state) => state.mouseEvnt.AdministrationPage);
  const slectedSection = useSelector((state) => state.mouseEvnt.slectedSection);
  const FinancialList = useSelector((state) => state.mouseEvnt.FinancialPage);
  const FinancialListState =useSelector(
  (state) => state.mouseEvnt.FinancialListState
  
  )


  const toggleCollapse = (page) => {
    if (page === "stock") {
      if (stockListState == true) {
        dispatch(stockPageEvnt(false));
      } else {
        dispatch(stockPageEvnt(true));
      }
    }
    if (page == "sales") {
      if (salesListState == true) {
        dispatch(salesPageEvnt(false));
      } else {
        dispatch(salesPageEvnt(true));
      }
    }
    if (page === "settings") {
      if (AdministrationlistState == true) {
        dispatch(AdministrationPageEvnt(false));
      } else {
        dispatch(AdministrationPageEvnt(true));
      }
    }
    if (page == "Security") {
      if (securitylistState == true) {
        dispatch(SecurityPageEvnt(false));
      } else {
        dispatch(SecurityPageEvnt(true));
      }
    }
    if (page == "Financial") {
      if (FinancialListState == true) {
        dispatch(FinancialPageEvent(false));
      } else {
        dispatch(FinancialPageEvent(true));
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenSession");
    if (token) {
      setHasToken(true);
      setLoading(false);
    } else if (route !== "/login") {
      window.location.href = "/login";
    }
  }, [route]);

  const handleSignout = () => {
    dispatch(clearUser());
    window.location.href = "/login";
  };

  const showsidebar = route !== "/login";
  // const mouseLeave = () => {
  //   dispatch(mouseEvnt(false));
  // };
  return (
    <div className={`${showsidebar ? "" : "hidden"}`}>
      {loading && <Loading />}
      <div className="z-10 bg-[#E1EFF2] lg:flex md:flex sm:flex hidden">
        <div
          // onMouseLeave={mouseLeave}
          className={`h-[100vh] pt-[10vh] bg-white   top-0 left-0 bottom-0    `}
        >
          <div
            className={`${
              sideBarWidth ? "w-[250px]" : "w-[10px]"
            } h-[80vh] overflow-y-auto overflow-x-hidden rounded-t-lg bg-white transition-all duration-700`}
          >
            <div className="w-full p-5">
              <div>
                <div className="flex cursor-pointer min-w-[210px]">
                  <div className="group flex items-center w-full text-gray-500 hover:bg-indigo-100 rounded-md py-1 px-2">
                    <LuLayoutDashboard className="text-[20px] mr-2 group-hover:text-indigo-500" />
                    <Link
                      href="/dashboard"
                      className="font-bold text-[14px] group-hover:text-indigo-500"
                    >
                      Dashboard
                    </Link>
                  </div>
                </div>
                <div className="my-[25px]">
                  <p className="font-bold h-[25px] text-gray-300">Pages</p>
                </div>
                <div>
                  <div
                    onClick={() => toggleCollapse("stock")}
                    className="mb-[15px] text-gray-500 flex ml-2"
                  >
                    <MdAllInbox
                      className={`text-[25px] mr-2 group-hover:text-indigo-500 ${
                        slectedSection.section === "Stock"
                          ? "text-indigo-500"
                          : ""
                      }`}
                    />
                    <div className="w-full">
                      <Colaps
                        ListState={stockListState}
                        toggleCollapse={toggleCollapse}
                        List={stockList}
                        title={"Stock"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => toggleCollapse("sales")}
                    className="mb-[25px] text-gray-500 flex ml-2"
                  >
                    <BsAlexa
                      className={`text-[25px] mr-2 group-hover:text-indigo-500 ${
                        slectedSection.section === "Sales"
                          ? "text-indigo-500"
                          : ""
                      }`}
                    />
                    <div className="w-full">
                      <Colaps
                        ListState={salesListState}
                        toggleCollapse={toggleCollapse}
                        List={salesList}
                        title={"Sales"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => toggleCollapse("settings")}
                    className="mb-[25px] text-gray-500 flex ml-2"
                  >
                    <BsMenuButtonFill
                      className={`text-[25px] mr-2 group-hover:text-indigo-500 ${
                        slectedSection.section === "Settings"
                          ? "text-indigo-500"
                          : ""
                      }`}
                    />
                    <div className="w-full">
                      <Colaps
                        ListState={AdministrationlistState}
                        toggleCollapse={toggleCollapse}
                        List={AdminList}
                        title={"Settings"}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    onClick={() => toggleCollapse("Security")}
                    className="mb-[25px] text-gray-500 flex ml-2"
                  >
                    <MdSecurity
                      className={`text-[25px] mr-2 group-hover:text-indigo-500 ${
                        slectedSection.section === "Security"
                          ? "text-indigo-500"
                          : ""
                      }`}
                    />
                    <div className="w-full">
                      <Colaps
                        ListState={securitylistState}
                        toggleCollapse={toggleCollapse}
                        List={SecurityList}
                        title={"Security"}
                      />
                    </div>
                  </div>
                </div>
      {/* ff */}
      <div>
                  <div
                    onClick={() => toggleCollapse("Financial")}
                    className="mb-[25px] text-gray-500 flex ml-2"
                  >
                    <RiExchangeDollarLine
                      className={`text-[25px] mr-2 group-hover:text-indigo-500 ${
                        slectedSection.section === "Financial"
                          ? "text-indigo-500"
                          : ""
                      }`}
                    />
                    <div className="w-full">
                      <Colaps
                        ListState={FinancialListState}
                        toggleCollapse={toggleCollapse}
                        List={FinancialList}
                        title={"Financial"}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div
            className={`flex justify-center h-[8vh] bg-white ${
              sideBarWidth ? "w-[250px]" : "w-[0px]"
            } overflow-hidden transition-all duration-700`}
          >
            <div
              className="flex justify-center items-center h-[50px] bg-indigo-100 w-[80%] rounded-lg py-2 px-3 text-indigo-500 font-semibold cursor-pointer"
              onClick={handleSignout}
            >
              <MdOutlineLogout className="text-[20px]" />
              <p>Sign out</p>
            </div>
          </div>
        </div>
        <div className="-translate-x-3 mt-[13vh] h-fit w-[10px]">
          <span>
            {sideBarWidth ? (
              <MdNavigateBefore
                onClick={() => setSideBarWidth(false)}
                className="text-[22px] rounded-full border hover:bg-indigo-100 bg-gray-50 hover:text-indigo-500 cursor-pointer border-gray-300 text-gray-500"
              />
            ) : (
              <MdNavigateNext
                onClick={() => setSideBarWidth(true)}
                className="text-[22px] rounded-full border hover:bg-indigo-100 bg-gray-50 hover:text-indigo-500 cursor-pointer border-gray-300 text-gray-500"
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

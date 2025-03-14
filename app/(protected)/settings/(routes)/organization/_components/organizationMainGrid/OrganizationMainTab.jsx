import React, { useEffect, useState } from "react";

import Tabs from "../../../../../../../components/misc/pureComponents/tabs/Tabs";
import { GoHome } from "react-icons/go";
import PMMainGrid from "./productmastermaingrid/OrganizationBody";
import MainTabs from "../../../../../../../components/misc/bindComponent/MainTabs";
import CommonApiFetch from "../../../../../../../components/misc/pureComponents/ApiFetch/CommonApiFetch";
import { useSelector } from "react-redux";

const PMMainTab = () => {
  const tabsC = [
    {
      icon: <GoHome />,
      label: "Main Tab",
      content: <PMMainGrid />,
    },
    {
      label: "Special",
      content: <div>this is Special</div>,
    },
    {
      label: "Kits",
      content: <div>this is Kits</div>,
    },
    {
      label: "Non Stock",
      content: <div>this is Non stock</div>,
    },
    {
      label: "Bolton",
      content: <div>this is Bolton</div>,
    },
    {
      label: "Inactive",
      content: <div>this is Inactive</div>,
    },
  ];

  const exportProps = {
    fileName: "",
    fileExtension: "xls",
  };

  const [apiFetch, setApiFetch] = useState(false);
  const getVendor = useSelector((state) => state.commonSlices.getVendor);

  useEffect(() => {
    if (getVendor.length === 0) {
      setApiFetch(true);
      // console.log(" if get warehouse", getVendor);
    } else {
      setApiFetch(false);
      // console.log("else get warehouse", getVendor);
    }
  }, [getVendor]);

  const onRefresh = () => {};
  return (
    <div>
      {apiFetch && <CommonApiFetch />}
      {/* <Tabs tabs={tabsC} exportProps={exportProps} onRefresh={onRefresh} /> */}
      {/* <MainTabs mainTabs={tabsC} onRefresh={onRefresh} exportProps={exportProps}/> */}
    </div>
  );
};

export default PMMainTab;

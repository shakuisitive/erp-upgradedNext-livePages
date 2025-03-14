import React, { useEffect } from "react";
import { useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import AddDistribution from "./AddDistribution";
import DistributionFormModal from "./DistributionFormModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DistributionLeft from "./Header/DistributionLeft";
import DistributionRight from "./Header/DistributionRight";
import { useDispatch, useSelector } from "react-redux";
import {
  setClearEditDistForm,
  setCustBranchList,
  setDistributionEditForm,
  setNewDistribution,
} from "../../../_redux/customerSlice";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import { setEditDetForm } from "../../../../../../stock/(routes)/product-master/redux/pmSlice";

const CustomerDistribution = () => {
  const [country, setCountry] = useState("CA");
  const [countryName, setCountryName] = useState("Canada");
  const [couID, setCouID] = useState("");
  const [province, setProvince] = useState("");

  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [active, setActive] = useState(true);

  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [locationID, setLocationID] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [cusBraID, setCusBraID] = useState("");
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [isHeader, setIsHeader] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const distributionFormIndex = useSelector(
    (state) => state.customerSlice.distributionFormIndex
  );
  const formIndex = useSelector((state) => state.customerSlice.formIndex);
  const custBranchList = useSelector(
    (state) => state.customerSlice.custBranchList
  );
  const newDistribution = useSelector(
    (state) => state.customerSlice.newDistribution
  );
  const distributionEditForm = useSelector(
    (state) => state.customerSlice.distributionEditForm
  );
  const ACTIVE =
    distributionEditForm?.ACTIVE_FLAG === "Y"
      ? true
      : distributionEditForm?.ACTIVE_FLAG === "N"
      ? false
      : true;

  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    {
      title: "Name",
      slector: "NAME",
      //   customComp: DateandTime,
      Wid: 150,
      Drawer: DistributionFormModal,
    },

    {
      title: "Location ID",
      slector: "LOCATION_NUMBER",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Email",
      slector: "EMAIL",
      //   customComp: User,
      Wid: 120,
    },
    {
      title: "Shipping Address",
      slector: "ADDRESS",
      //   customComp: User,
      Wid: 120,
    },
    {
      title: "City",
      slector: "CITY",
      //   customComp: User,
      Wid: 120,
    },
    {
      title: "Province",
      slector: "PROVINCE",
      //   customComp: User,
      Wid: 120,
    },
    {
      title: "Status",
      slector: "ACTIVE_FLAG",
      //   customComp: User,
      Wid: 120,
    },
  ]);
  const colapsfunc = () => {
    setColaps(!colaps);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && !checkedAll) {
      setCheckedAll(true);
      const data = row.Result.map((SData, i) => {
        return { rowI: i, rowData: SData };
      });
      setCheckedItems(data);
    } else if (rowData == "all" && checkedAll) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI || item.rowData !== rowData
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  const payload = {
    CUSBRA_ID: cusBraID,
    CUS_ID: formIndex?.CUS_ID,
    NAME: name,
    ACTIVE_FLAG: active ? "Y" : "N",
    CODE: code,
    ADDRESS: address1,
    CITY: city,
    COU_ID: "",
    PROSTA_ID: province,
    POSTAL_CODE: postal,
    EMAIL: email1,
    PHONE: phone1,
    ORDER_APPROVAL_REQUIRED_FLAG: "N",
    QUOTE_APPROVAL_REQUIRED_FLAG: "N",
    USE_ID: "2694",
    EMAIL_2: email2,
    PHONE_2: phone2,
    ADDRESS_2: address2,
  };
  const payloadCustomer = {
    data: payload,
    action: "Administration",
    method: "PostCustomerBranch",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const paylaodCustBranch = {
    data: {
      CUS_ID: formIndex?.CUS_ID.toString(),
    },
    action: "Administration",
    method: "GetCustomerBranch",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setCustBranchList(data.Result));
    }
  };

  const handleCustomer = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setNewDistribution(false));
      dispatch(setClearEditDistForm());
      sendRequest(
        Administration.GetCustomerBranchList,
        "POST",
        paylaodCustBranch,
        handleGetCustDet,
        token
      );
      // dispatch(closeModal());
    }
  };
  const handleApply = () => {
    // console.log("payload", payloadCustomer);
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.ADDRESS != "" &&
      payload?.ADDRESS != undefined &&
      payload?.EMAIL != "" &&
      payload?.EMAIL != undefined &&
      payload?.PHONE != "" &&
      payload?.PHONE != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined &&
      payload?.PROSTA_ID != "" &&
      payload?.PROSTA_ID != undefined
    ) {
      sendRequest(
        Administration.PostCustomerBranch,
        "POST",
        payloadCustomer,
        handleCustomer,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };
  useEffect(() => {
    if (distributionEditForm) {
      setCusBraID(distributionEditForm?.CUSBRA_ID);
      setCode(distributionEditForm?.CODE);
      setName(distributionEditForm?.NAME);
      setEmail1(distributionEditForm?.EMAIL);
      setEmail2(distributionEditForm?.EMAIL_2);
      setCity(distributionEditForm?.CITY);
      if (distributionEditForm?.Country == "CANADA") {
        setCouID(83.0);
        setProvince(distributionEditForm?.PROSTA_ID);
        setCountry(distributionEditForm?.Country);
      }
      if (distributionEditForm?.Country == "USA") {
        setCouID(84.0);
        setProvince(distributionEditForm?.PROSTA_ID);
        setCountry(distributionEditForm?.Country);
      }
      setPhone1(distributionEditForm?.PHONE);
      setPhone2(distributionEditForm?.PHONE_2);
      setPostal(distributionEditForm?.POSTAL_CODE);
      setAddress1(distributionEditForm?.ADDRESS);
      setAddress2(distributionEditForm?.ADDRESS_2);
      setActive(ACTIVE);
    }
  }, [distributionEditForm]);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className=" overflow-x-auto">
          <div>
            <div className="ml-[50px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {newDistribution ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {newDistribution && (
              <div className="ml-10 ">
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <DistributionLeft
                      city={city}
                      setCity={setCity}
                      phone1={phone1}
                      setPhone1={setPhone1}
                      email1={email1}
                      setEmail1={setEmail1}
                      postal={postal}
                      setPostal={setPostal}
                      locationID={locationID}
                      setLocationID={setLocationID}
                      address1={address1}
                      setAddress1={setAddress1}
                      address2={address2}
                      setAddress2={setAddress2}
                      name={name}
                      setName={setName}
                      code={code}
                      setCode={setCode}
                      isError={isError}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <DistributionRight
                      country={country}
                      setCountry={setCountry}
                      countryName={countryName}
                      setCountryName={setCountryName}
                      province={province}
                      setProvince={setProvince}
                      postal={postal}
                      setPostal={setPostal}
                      address1={address1}
                      setAddress1={setAddress1}
                      address2={address2}
                      setAddress2={setAddress2}
                      couID={couID}
                      setCouID={setCouID}
                      active={active}
                      setActive={setActive}
                      phone2={phone2}
                      setPhone2={setPhone2}
                      email2={email2}
                      setEmail2={setEmail2}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <GridTable
          head={head}
          row={custBranchList}
          setHead={setHead}
          GridTitle="Distribution"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddDistribution}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          handleCheckboxChange={handleCheckboxChange}
        />
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
};

export default CustomerDistribution;

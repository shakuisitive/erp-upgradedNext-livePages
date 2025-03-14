import React, { useEffect } from "react";
import { useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import ShipToRight from "./Header/ShipToRight";
import AddShipTo from "./AddShipTo";
import ShipToLeft from "./Header/ShipToLeft";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  setClearEditShipToForm,
  setNewShipTo,
  setShipToList,
} from "../../../_redux/customerSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import ShipToFormModal from "./ShipToFormModal";
const CustomerShipTo = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [isHeader, setIsHeader] = useState(false);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [active, setActive] = useState(true);
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("CA");
  const [countryName, setCountryName] = useState("Canada");
  const [couID, setCouID] = useState("");
  const [province, setProvince] = useState("");
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cusShipToID, setCusShipToID] = useState("");
  const formIndex = useSelector((state) => state.customerSlice.formIndex);
  const shipToList = useSelector((state) => state.customerSlice.shipToList);
  const newShipTo = useSelector((state) => state.customerSlice.newShipTo);
  const shipToEditForm = useSelector(
    (state) => state.customerSlice.shipToEditForm
  );
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const ACTIVE =
    shipToEditForm?.ACTIVE_FLAG === "Y"
      ? true
      : shipToEditForm?.ACTIVE_FLAG === "N"
      ? false
      : true;

  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    {
      title: "Name",
      slector: "FIRST_NAME",
      Wid: 150,
      Drawer: ShipToFormModal,
    },

    {
      title: "Address",
      slector: "ADDRESS_1",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Postal",
      slector: "POSTAL_CODE",
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
    CUS_DRPSHP_ID: cusShipToID,
    CUS_ID: formIndex?.CUS_ID,
    ADDRESS_1: address1,
    ADDRESS_2: address2,
    PROSTA_ID: province,
    CITY: city,
    POSTAL_CODE: postal,
    ACTIVE_FLAG: active ? "Y" : "N",
    FIRST_NAME: firstName,
    LAST_NAME: lastName,
    PHONE: phone,
    // CUSBRA_ID: "",
  };
  const payloadCustomer = {
    data: payload,
    action: "Administration",
    method: "PostCustomerDropShipAddress",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const paylaodCustBranch = {
    data: {
      CUS_ID: formIndex?.CUS_ID.toString(),
    },
    action: "Administration",
    method: "GetCustomerDropShipAddressList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setShipToList(data.Result));
    }
  };

  const handleCustomer = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setNewShipTo(false));
      dispatch(setClearEditShipToForm());
      sendRequest(
        Administration.GetCustomerDropShipAddressList,
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
      payload?.FIRST_NAME != "" &&
      payload?.FIRST_NAME != undefined &&
      payload?.ADDRESS_1 != "" &&
      payload?.ADDRESS_1 != undefined &&
      payload?.LAST_NAME != "" &&
      payload?.LAST_NAME != undefined &&
      payload?.PHONE != "" &&
      payload?.PHONE != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined
    ) {
      sendRequest(
        Administration.PostCustomerDropShipAddress,
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
  // const [filterProvinceList, setFilterProvinceList] = useState([]);
  // const provinceList = useSelector((state) => state.customerSlice.province);

  // useEffect(() => {
  //   const filteredProvinces = provinceList.filter(
  //     (province) => province.COUNTRY_NAME === country
  //   );
  //   setFilterProvinceList(filteredProvinces);
  // }, [country]);

  // const getProstaIdForProvince = (provinceName, filterProvinceList) => {

  //   const province = filterProvinceList.find(
  //     (item) => item.PROVIENCE_NAME === provinceName
  //   );

  //   return province ? province.PROSTA_ID : null;
  // };

  // const prostaId = getProstaIdForProvince(provinceName, filterProvinceList);

  useEffect(() => {
    if (shipToEditForm) {
      setCusShipToID(shipToEditForm?.CUS_DRPSHP_ID);
      setFirstName(shipToEditForm?.FIRST_NAME);
      setLastName(shipToEditForm?.LAST_NAME);
      setCity(shipToEditForm?.CITY);
      if (shipToEditForm?.COUNTRY === "CANADA") {
        setCouID(83.0);
        // setProvince(shipToEditForm?.PROVINCE);
        setCountry(shipToEditForm?.COUNTRY);
      }
      if (shipToEditForm?.COUNTRY === "USA") {
        setCouID(84.0);
        // setProvince(shipToEditForm?.PROVINCE);
        setCountry(shipToEditForm?.COUNTRY);
      }
      setPhone(shipToEditForm?.PHONE);

      setPostal(shipToEditForm?.POSTAL_CODE);
      setAddress1(shipToEditForm?.ADDRESS_1);
      setAddress2(shipToEditForm?.ADDRESS_2);
      setActive(ACTIVE);
    }
  }, [shipToEditForm]);

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
                {newShipTo ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {newShipTo && (
              <div className="ml-10 ">
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <ShipToLeft
                      city={city}
                      setCity={setCity}
                      address1={address1}
                      setAddress1={setAddress1}
                      address2={address2}
                      setAddress2={setAddress2}
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      isError={isError}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <ShipToRight
                      country={country}
                      setCountry={setCountry}
                      countryName={countryName}
                      setCountryName={setCountryName}
                      province={province}
                      setProvince={setProvince}
                      couID={couID}
                      setCouID={setCouID}
                      active={active}
                      setActive={setActive}
                      postal={postal}
                      setPostal={setPostal}
                      isError={isError}
                      phone={phone}
                      setPhone={setPhone}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <GridTable
          head={head}
          row={shipToList}
          setHead={setHead}
          GridTitle="Ship To"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddShipTo}
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

export default CustomerShipTo;

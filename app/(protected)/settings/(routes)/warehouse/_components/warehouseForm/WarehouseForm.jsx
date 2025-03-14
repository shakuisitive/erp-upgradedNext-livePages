import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import WarehouseLeft from "./Header/WarehouseLeft";
import WarehouseRight from "./Header/WarehouseRight";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeModal } from "../../_redux/warehouseSlice";

const WarehouseForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [warId, setWarId] = useState("");

  const [warCode, setWarCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [notes, setNotes] = useState("");
  const [desc, setDesc] = useState("");
  const [postal, setPostal] = useState("");

  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("CA");
  const [countryName, setCountryName] = useState("Canada");

  const [active, setActive] = useState(true);

  let [error, sendRequest] = useApiFetch();
  const warEditDetForm = useSelector(
    (state) => state.warehouseSlice.warEditDetForm
  );
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();

  const ACTIVE =
    warEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : warEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const payload = {
    WAR_ID: warId,
    CODE: warCode,
    DESCRIPTION: desc,
    ADDRESS_1: address1,
    CITY: city,
    COUNTRY: countryName,
    POSTAL_CODE: postal,
    LOC_ID: branch,
    WAREHOUSE_CODE: branchName,
    NOTES: notes,
    PROVINCE: province,
    ACTIVE_FLAG: active ? "Y" : "N",
  };
  const payloadPostWarehouse = {
    data: payload,
    action: "Administration",
    method: "PostInventoryWarehouse",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostWarehouse = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    // console.log("payload", payloadPostWarehouse);
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.ADDRESS_1 != "" &&
      payload?.ADDRESS_1 != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.DESCRIPTION != "" &&
      payload?.DESCRIPTION != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined &&
      payload?.PROVINCE != "" &&
      payload?.PROVINCE != undefined &&
      payload?.LOC_ID != "" &&
      payload?.LOC_ID != undefined
    ) {
      sendRequest(
        Administration.PostInventoryWarehouse,
        "POST",
        payloadPostWarehouse,
        handlePostWarehouse,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };
  function toCamelCase(str) {
    return str?.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }
  const provinceLower = toCamelCase(warEditDetForm?.PROVINCE);
  useEffect(() => {
    if (warEditDetForm) {
      setWarId(warEditDetForm?.WAR_ID);
      setWarCode(warEditDetForm?.CODE);
      setAddress1(warEditDetForm?.ADDRESS_1);
      setCity(warEditDetForm?.CITY);
      setCountryName(warEditDetForm?.COUNTRY);
      if (warEditDetForm?.COUNTRY === "Canada") {
        setCountry("CA");
      }
      if (warEditDetForm?.COUNTRY === "United States") {
        setCountry("US");
      }
      setProvince(provinceLower);
      setNotes(warEditDetForm?.NOTES);
      setPostal(warEditDetForm?.POSTAL_CODE);
      setDesc(warEditDetForm?.DESCRIPTION);
      setBranch(warEditDetForm?.LOC_ID);
      setActive(ACTIVE);
    }
  }, [warEditDetForm]);

  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex  rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
            <div className="ml-[50px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex  px-4 mr-2 gap-4  ">
                  <div className="w-1/2 ">
                    <WarehouseLeft
                      isError={isError}
                      setIsError={setIsError}
                      warCode={warCode}
                      setWarCode={setWarCode}
                      address1={address1}
                      setAddress1={setAddress1}
                      desc={desc}
                      setDesc={setDesc}
                      postal={postal}
                      setPostal={setPostal}
                      notes={notes}
                      setNotes={setNotes}
                    />
                  </div>
                  <div className="w-1/2 ">
                    <WarehouseRight
                      isError={isError}
                      setIsError={setIsError}
                      active={active}
                      setActive={setActive}
                      branch={branch}
                      setBranch={setBranch}
                      branchName={branchName}
                      setBranchName={setBranchName}
                      city={city}
                      setCity={setCity}
                      country={country}
                      setCountry={setCountry}
                      countryName={countryName}
                      setCountryName={setCountryName}
                      province={province}
                      setProvince={setProvince}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default WarehouseForm;

import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import VendorRightForm from "./Header/VendorRightForm";
import VendorLeftForm from "./Header/VendorLeftForm";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/supplierSlice";

const VendorForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [venId, setVenId] = useState("");

  const [venCode, setVenCode] = useState("");
  const [venName, setVenName] = useState("");
  const [venEmail1, setVenEmail1] = useState("");
  const [venAddress1, setVenAddress1] = useState("");
  const [venPhone, setVenPhone] = useState("");
  const [venNotes, setVenNotes] = useState("");
  const [venDesc, setVenDesc] = useState("");
  const [venCity, setVenCity] = useState("");
  const [venPostal, setVenPostal] = useState("");
  const [venProvince, setVenProvince] = useState("");
  const [venCountry, setVenCountry] = useState("CA");
  const [venCountryName, setVenCountryName] = useState("Canada");

  const [venActive, setVenActive] = useState(true);
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const venEditDetForm = useSelector(
    (state) => state.supplierSlice.venEditDetForm
  );
  const ACTIVE =
    venEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : venEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const payload = {
    VEN_ID: venId,
    CODE: venCode,
    DESCRIPTION: venDesc,
    CITY: venCity,
    NAME: venName,
    COUNTRY: venCountryName,
    ADDRESS_1: venAddress1,
    ADDRESS_2: venName,
    POSTAL_CODE: venPostal,
    PHONE_1: venPhone,
    PHONE_2: "",
    FAX_1: "",
    PROVINCE: venProvince,
    EMAIL: venEmail1,
    NOTES: venNotes,
    PREFERRED_FLAG: "N",
    ACTIVE_FLAG: venActive ? "Y" : "N",
    LONGITUDE: "",
    LATITUDE: "",
    VENDOR_FLAG: "N",
    SUPPLIER_FLAG: "N",
  };
  const payloadPostSupplier = {
    data: payload,
    action: "Administration",
    method: "PostSuppliers",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostSupplier = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.ADDRESS_1 != "" &&
      payload?.ADDRESS_1 != undefined &&
      payload?.EMAIL != "" &&
      payload?.EMAIL != undefined &&
      payload?.PHONE_1 != "" &&
      payload?.PHONE_1 != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.COUNTRY != "" &&
      payload?.COUNTRY != undefined &&
      payload?.PROVINCE != "" &&
      payload?.PROVINCE != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined
    ) {
      sendRequest(
        Administration.PostSuppliers,
        "POST",
        payloadPostSupplier,
        handlePostSupplier,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (venEditDetForm) {
      setVenId(venEditDetForm?.VEN_ID);
      setVenCode(venEditDetForm?.SUPPLIER_CODE);
      setVenName(venEditDetForm?.ADDRESS_2);
      setVenEmail1(venEditDetForm?.EMAIL);

      setVenCity(venEditDetForm?.CITY);
      // setVenCountry(venEditDetForm?.CITY);
      setVenCountryName(venEditDetForm?.COUNTRY);
      if (venEditDetForm?.COUNTRY == "Canada") {
        setVenCountry("CA");
      }
      if (venEditDetForm?.COUNTRY == "United States") {
        setVenCountry("US");
      }
      setVenPhone(venEditDetForm?.PHONE_1);
      setVenNotes(venEditDetForm?.NOTES);
      setVenPostal(venEditDetForm?.POSTAL_CODE);
      setVenAddress1(venEditDetForm?.ADDRESS_1);
      setVenProvince(venEditDetForm?.PROVINCE);
      setVenDesc(venEditDetForm?.SUPPLIER_DESCRIPTION);
      setVenActive(ACTIVE);
    }
  }, [venEditDetForm]);
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
                    <VendorLeftForm
                      venCode={venCode}
                      setVenCode={setVenCode}
                      venName={venName}
                      setVenName={setVenName}
                      venEmail1={venEmail1}
                      setVenEmail1={setVenEmail1}
                      venAddress1={venAddress1}
                      setVenAddress1={setVenAddress1}
                      venPhone={venPhone}
                      setVenPhone={setVenPhone}
                      venCity={venCity}
                      setVenCity={setVenCity}
                      venCountry={venCountry}
                      setVenCountry={setVenCountry}
                      venCountryName={venCountryName}
                      setVenCountryName={setVenCountryName}
                      venProvince={venProvince}
                      setVenProvince={setVenProvince}
                      venNotes={venNotes}
                      setVenNotes={setVenNotes}
                      venDesc={venDesc}
                      setVenDesc={setVenDesc}
                      venPostal={venPostal}
                      setVenPostal={setVenPostal}
                      isError={isError}
                      setIsError={setIsError}
                    />
                  </div>
                  <div className="w-1/2 ">
                    <VendorRightForm
                      venActive={venActive}
                      setVenActive={setVenActive}
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

export default VendorForm;

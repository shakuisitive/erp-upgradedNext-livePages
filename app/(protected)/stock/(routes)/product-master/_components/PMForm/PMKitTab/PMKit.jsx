import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import KitLeft from "./Header/KitLeft";
import KitRight from "./Header/KitRight";
import KitFileUpload from "./components/KitFileUpload";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import PMKitGrid from "./pmKitGrid/PMKitGrid";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  clearKitSubGrid,
  closeKitModal,
  closeModal,
  setEditKitCust,
  setEditKitForm,
  setKitSubGrid,
  setNewKitClose,
} from "../../../redux/pmSlice";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import InputModal from "../../../../../../../../components/misc/pureComponents/modal/InputModal";
import VerifyModal from "../../../../../../../../components/misc/pureComponents/modal/VerifyModal";
import { PayloadKitList } from "../../pmPayloadConstant";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";

const PMKit = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kitId, setKitId] = useState("");
  const [kitCode, setKitCode] = useState("");
  const [code, setCode] = useState("");
  const [kitName, setKitName] = useState("");
  const [kitBarcode, setKitBarcode] = useState("");
  const [kitDesc, setKitDesc] = useState("");
  const [kitWarId, setKitWarId] = useState("");
  const [kitOHQty, setKitOHQty] = useState("");
  const [kitAVLQty, setKitAVLQty] = useState("");
  const [kitDateTo, setKitDateTo] = useState("");
  const [kitDateFrom, setKitDateFrom] = useState("");
  const [kitCustomer, setKitCustomer] = useState("");
  const [kitCustomerType, setKitCustomerType] = useState("both");
  const [kitAllCustomer, setKitAllCustomer] = useState("yes");
  const [kitActive, setKitActive] = useState(true);
  const [kitDimensionL, setKitDimensionL] = useState("");
  const [kitDimensionW, setKitDimensionW] = useState("");
  const [kitDimensionH, setKitDimensionH] = useState("");
  const [kitWeight, setKitWeight] = useState("");
  const [kitShipWeight, setKitShipWeight] = useState("");
  const [kitUoW, setKitUoW] = useState("");
  const [kitShipWeightU, setKitShipWeightU] = useState("");
  const [kitAsgnCustName, setKitAsgnCustName] = useState("");
  const [kitAsgnCustId, setKitAsgnCustId] = useState("");
  const [kitCost, setKitCost] = useState("");
  const [kitPrice, setKitPrice] = useState(0);
  const [eMessage, setEMessage] = useState(0);
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [isError, setIsError] = useState(false);
  const [type, setType] = useState("");
  const [kid, setKId] = useState(null);
  const [isFetch, setIsFetch] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isDecemble, setIsDecemble] = useState(false);
  const [isDecembleY, setIsDecembleY] = useState(false);

  const currentDate = new Date();

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  //useSelectors
  const editKitForm = useSelector((state) => state.pmSlices.editKitForm);

  const kitSubGrid = useSelector((state) => state.pmSlices.kitSubGrid);
  const avlQty = useSelector((state) => state.pmSlices.avlQty);
  const qtyUsed = useSelector((state) => state.pmSlices.qtyUsed);

  const totalCost =
    kitSubGrid && kitSubGrid.length > 0
      ? kitSubGrid.reduce((acc, item) => {
          if (item.STANDARD_COST && item.QUANTITY) {
            return acc + item.STANDARD_COST * item.QUANTITY;
          } else {
            console.error(
              `Invalid data found in kitSubGrid: ${JSON.stringify(item)}`
            );
            return acc;
          }
        }, 0)
      : 0;
  const totalPrice =
    kitSubGrid && kitSubGrid.length > 0
      ? kitSubGrid.reduce((acc, item) => {
          if (item.PRICE && item.QUANTITY) {
            return acc + item.PRICE * item.QUANTITY;
          } else {
            console.error(
              `Invalid data found in kitSubGrid: ${JSON.stringify(item)}`
            );
            return acc;
          }
        }, 0)
      : 0;
  const ALL_MASS_CUSTOMERS_FLAG =
    editKitForm?.ALL_MASS_CUSTOMERS_FLAG === "Y"
      ? "mass"
      : editKitForm?.ALL_MASS_CUSTOMERS_FLAG === "N"
      ? "prepay"
      : "both";
  const ALL_CUSTOMERS_FLAG =
    editKitForm?.ALL_CUSTOMERS_FLAG === "Y"
      ? "yes"
      : editKitForm?.ALL_CUSTOMERS_FLAG === "N"
      ? "no"
      : "yes";
  const ACTIVE =
    editKitForm?.ACTIVE_FLAG === "Y"
      ? true
      : editKitForm?.ACTIVE_FLAG === "N"
      ? false
      : true;

  const payload = {
    KIT_ID: kitId,
    NAME: kitName,
    CODE: kitCode,
    BARCODE: kitBarcode,
    DESCRIPTION: kitDesc,
    DimensionH: kitDimensionH,
    DimensionL: kitDimensionL,
    DimensionW: kitDimensionW,
    WEIGHT: kitWeight,
    UOW_ID: kitUoW,
    SHIPPING_WEIGHT: kitShipWeight,
    SHIPPING_WEIGHT_UNIT: kitShipWeightU,
    WAR_ID: Number(kitWarId),
    DO_NOT_EXPIRE_FLAG: "N",
    OH_QTY: kitOHQty,
    AVL_QTY: kitAVLQty,
    COST: kitCost,
    PRICE: Number(kitPrice),
    ACTIVE_FLAG: kitActive ? "Y" : "N",
    KIT_DATE: currentDate,
    START_DATE: kitDateFrom,
    END_DATE: kitDateTo,
    NOTES: null,
    ALL_MASS_CUSTOMERS_FLAG:
      kitCustomerType === "mass"
        ? "Y"
        : kitCustomerType === "prepay"
        ? "N"
        : null,
    ALL_CUSTOMERS_FLAG:
      kitAllCustomer === "yes" ? "Y" : kitAllCustomer === "no" ? "N" : "Y",
    CUS_ID: kitAsgnCustId,
    DISMANTLE_FLAG: isDecembleY ? "Y" : "N",
    FileNames: selectedFiles || [],
    USE_ID: "2694",
  };

  const payloadPostKit = {
    data: payload,
    action: "ItemMaster",
    method: "PostKit",
    username: "testuser",
    type: "rpc",
    tid: "144",
  };
  const payloadGetKitDet = {
    data: {
      KIT_ID: kid,
    },
    action: "ItemMaster",
    method: "GetKitDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadGetKit = {
    data: {
      KIT_ID: kid,
    },
    action: "ItemMaster",
    method: "GetKit",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const GetKit = (data) => {
    if (data?.CODE == "SUCCESS" && type == "save") {
      dispatch(setEditKitForm(data.Result.Results));
      dispatch(setEditKitCust(data.Result.Table1));
      setType("saveAndClose");
    }
  };
  const GetKitDet = (data) => {
    dispatch(setKitSubGrid(data.Result.Results));
  };

  useEffect(() => {
    if (type == "save" || type == "saveAndClose") {
      sendRequest(ItemMaster.GetKit, "POST", payloadGetKit, GetKit, token);
      sendRequest(
        ItemMaster.GetKitDetails,
        "POST",
        payloadGetKitDet,
        GetKitDet,
        token
      );
    }
  }, [kid, isFetch]);

  const handlePostKitDet = (data) => {
    if (data?.CODE == "SUCCESS" && type == "saveAndClose") {
      dispatch(setNewKitClose());
      dispatch(closeKitModal());
      dispatch(clearKitSubGrid());
    }
  };
  const getTempFileData = (data) => {
    setSelectedFiles(data?.FileNames);
  };
  const handleFileChange = (files) => {
    setFiles(files);
  };
  let urls = [];

  useEffect(() => {
    const payload = new FormData();

    payload.append("AttachNumber", "1");
    payload.append("DistType", "KIT");
    payload.append("SeqNumber", "001");
    payload.append("SourceOraSeq", "");
    payload.append("AttachID", "");
    payload.append("GenericJson", "");
    payload.append("Description", "Test");
    payload.append("PAR_ID", "");
    payload.append("USERNAME", "admin");

    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
      payload.append(`inventoryFile`, files[i]);
    }

    fetch(ItemMaster.PostTempFiles, {
      method: "POST",
      body: payload,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        getTempFileData(data);
      });
  }, [files]);

  const handlePostKit = (data) => {
    const kit_id = data.Result;

    const payloadPostKitDetail = {
      data: kitSubGrid.map((item) => ({
        KITDET_ID: item.KITDET_ID ? item.KITDET_ID : "",
        KIT_ID: kit_id.toString(),
        QUANTITY: item.QUANTITY,
        PAR_ID: item.PAR_ID,
        // WAR_ID: kitWarId,
        DESCRIPTION: item.DESCRIPTION,
        PRICE: item.PRICE,
        ACTIVE_FLAG: "Y",
        PURGRO_ID: item.PURGRO_ID,
        QTY_USED: qtyUsed,
        INVPARLOT_ID: item.ASSIGNED_LOT_IDS,
      })),
      action: "InventoryWeb",
      method: "PostKitDetail",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    if (data?.CODE == "SUCCESS") {
      setKId(data?.Result);
      setIsFetch(true);
      sendRequest(
        ItemMaster.PostKitDetail,
        "POST",
        payloadPostKitDetail,
        handlePostKitDet,
        token
      );
    }
  };

  const handleApply = (type) => {
    setType(type);
    setIsOpen(false);
    const hasNullLotFields = kitSubGrid?.some(
      (item) => item.QUANTITY === null && item.QUANTITY <= 0
    );
    const hasNullAvlandOH = kitSubGrid?.some(
      (item) =>
        (item.AVL_QTY_LOT === null || item.AVL_QTY_LOT <= 0) &&
        (item.OH_QTY_LOT === null || item.OH_QTY_LOT <= 0)
    );

    const hasNoQuantity = kitSubGrid?.some(
      (item) =>
        item.flag !== "Y" &&
        (item.PURCHASE_GROUP === null || item.PURCHASE_GROUP === "") &&
        (item.QUANTITY === null || item.QUANTITY === "")
    );
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.WAR_ID != "" &&
      payload?.WAR_ID != undefined &&
      payload?.OH_QTY != "" &&
      payload?.OH_QTY != undefined &&
      payload?.START_DATE != "" &&
      payload?.START_DATE != undefined &&
      payload?.END_DATE != "" &&
      payload?.END_DATE != undefined &&
      payload?.PRICE != undefined
    ) {
      if (kitSubGrid?.length > 0) {
        if (!hasNoQuantity) {
          if (!hasNullLotFields) {
            if (!hasNullAvlandOH) {
              sendRequest(
                ItemMaster.PostKit,
                "POST",
                payloadPostKit,
                handlePostKit,
                token
              );
            } else {
              setEMessage(
                "Avl qty and OH qty must b not empty or greater than 0"
              );
              setIsErrorMessage(true);
            }
          } else {
            setEMessage("Quantity must b not empty or greater than 0");
            setIsErrorMessage(true);
          }
        } else {
          setEMessage("Please Fill all Fields");
          setIsErrorMessage(true);
        }
      } else {
        setEMessage("Cannot proceed without product");
        setIsErrorMessage(true);
      }
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (editKitForm) {
      setKitId(editKitForm?.KIT_ID);
      setKitCode(editKitForm?.CODE);
      setKitName(editKitForm?.NAME);
      setKitBarcode(editKitForm?.BARCODE);
      setKitDesc(editKitForm?.DESCRIPTION);
      setKitWarId(editKitForm?.WAR_ID);
      setKitDimensionL(editKitForm?.DimensionL);
      setKitDimensionW(editKitForm?.DimensionW);
      setKitDimensionH(editKitForm?.DimensionH);
      setKitWeight(editKitForm?.WEIGHT);
      setKitShipWeight(editKitForm?.SHIPPING_WEIGHT);
      setKitShipWeightU(editKitForm?.SHIPPING_WEIGHT_UNIT);
      setKitOHQty(editKitForm?.OH_QTY);
      setKitAVLQty(editKitForm?.OH_QTY);
      setKitDateFrom(editKitForm?.START_DATE);
      setKitDateTo(editKitForm?.END_DATE);
      setKitCustomerType(ALL_MASS_CUSTOMERS_FLAG);
      setKitAllCustomer(ALL_CUSTOMERS_FLAG);
      setKitActive(ACTIVE);
      setKitUoW(editKitForm?.UOW_ID);
      if (editKitForm?.ASSIGNED_CUS_IDS) {
        setKitAsgnCustId(editKitForm?.ASSIGNED_CUS_IDS);
      }

      setKitAsgnCustName(editKitForm?.ASSIGNED_CUSTOMERS);
      setSelectedFiles(editKitForm?.FileNames);
      setKitPrice(editKitForm?.PRICE);
      setKitCost(editKitForm?.COST);
    }
  }, [editKitForm]);

  useEffect(() => {
    if (kitSubGrid) {
      setKitCost(totalCost);
      setKitPrice(totalPrice);
    }
  }, [kitSubGrid]);

  const overridePayload = {
    data: {
      ADMIN_PASSWORD: code,
    },
    action: "Administration",
    method: "GetAdminAccess",
    username: "admin",
  };

  const handleVerifyCodeResData = (data) => {
    if (data?.CODE == "SUCCESS") {
      setVerifiedCode(data?.Result[0]);
    }
  };

  const handleVerifyCode = () => {
    if (code == "12123") {
      sendRequest(
        Administration.GetAdminAccess,
        "POST",
        overridePayload,
        handleVerifyCodeResData,
        token
      );
      setIsModalOpen(false);
      setCode("");
    } else {
      setIsError(true);
    }
  };

  const handleOverRideModelOpen = () => {
    if (editKitForm != null) {
      setIsModalOpen(true);
      setIsOpen(false);
    } else {
      setEMessage("Cannot make override of new kit");
      setIsErrorMessage(true);
      setIsOpen(false);
    }
  };
  const handleDecembleModelOpen = () => {
    if (editKitForm != null) {
      setIsDecemble(true);
      setIsDecembleY(true);
      setIsOpen(false);
    } else {
      setEMessage("Cannot decemble new kit");
      setIsErrorMessage(true);
      setIsOpen(false);
    }
  };

  const handleOnClose = () => {
    setIsDecemble(false);
    setIsDecembleY(false);
  };

  const handlePostKitDecemble = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setNewKitClose());
      dispatch(closeKitModal());
      dispatch(clearKitSubGrid());
      setIsDecembleY(false);
      setIsDecemble(false);
    }
  };

  const handleDecembleOrder = () => {
    if (isDecembleY) {
      sendRequest(
        ItemMaster.PostKit,
        "POST",
        payloadPostKit,
        handlePostKitDecemble,
        token
      );
    }
  };

  const options = [
    {
      label: "Save",
      onClick: () => handleApply("save"),
    },
    {
      label: "Override",
      onClick: handleOverRideModelOpen,
    },
    {
      label: "Disassemble Kit",
      onClick: handleDecembleModelOpen,
    },
  ];

  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };
  console.log("editKitForm: ", editKitForm);
  useKeyPress(["x"], onKeyPress);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[40px]">
          <DropdownMenu
            label="Apply"
            handleClick={handleApply}
            options={editKitForm == null ? [] : options}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-y-auto">
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
              <div className="ml-10">
                <div className="flex px-4 mr-2 gap-4 ">
                  <div className="w-1/2 ">
                    <KitLeft
                      kitCode={kitCode}
                      setKitCode={setKitCode}
                      kitName={kitName}
                      setKitName={setKitName}
                      kitDesc={kitDesc}
                      setKitDesc={setKitDesc}
                      kitBarcode={kitBarcode}
                      setKitBarcode={setKitBarcode}
                      kitOHQty={kitOHQty}
                      setKitOHQty={setKitOHQty}
                      kitWarId={kitWarId}
                      setKitWarId={setKitWarId}
                      kitCost={kitCost}
                      kitPrice={kitPrice}
                      isError={isError}
                      verifiedCode={verifiedCode}
                      setKitPrice={setKitPrice}
                    />
                  </div>
                  <div className="w-1/2">
                    <KitRight
                      kitDimensionH={kitDimensionH}
                      setKitDimensionH={setKitDimensionH}
                      kitDimensionL={kitDimensionL}
                      setKitDimensionL={setKitDimensionL}
                      kitDimensionW={kitDimensionW}
                      setKitDimensionW={setKitDimensionW}
                      kitWeight={kitWeight}
                      setKitWeight={setKitWeight}
                      kitShipWeight={kitShipWeight}
                      setKitShipWeight={setKitShipWeight}
                      kitDateTo={kitDateTo}
                      setKitDateTo={setKitDateTo}
                      kitDateFrom={kitDateFrom}
                      setKitDateFrom={setKitDateFrom}
                      kitCustomer={kitCustomer}
                      setKitCustomer={setKitCustomer}
                      kitCustomerType={kitCustomerType}
                      setKitCustomerType={setKitCustomerType}
                      kitAllCustomer={kitAllCustomer}
                      setKitAllCustomer={setKitAllCustomer}
                      kitActive={kitActive}
                      setKitActive={setKitActive}
                      kitAsgnCustName={kitAsgnCustName}
                      setKitAsgnCustName={setKitAsgnCustName}
                      kitAsgnCustId={kitAsgnCustId}
                      setKitAsgnCustId={setKitAsgnCustId}
                      kitUoW={kitUoW}
                      setKitUoW={setKitUoW}
                      setKitShipWeightU={setKitShipWeightU}
                      kitShipWeightU={kitShipWeightU}
                      isError={isError}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full   bg-white  p-2 pl-0 ">
            <PMKitGrid />
          </div>

          <div className="w-auto  ml-[32px]  p-2 pl-0 ">
            <KitFileUpload onUpload={handleFileChange} />
          </div>
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
      {isModalOpen && (
        <InputModal
          onClose={() => setIsModalOpen(false)}
          code={code}
          setCode={setCode}
          isError={isError}
          action={handleVerifyCode}
        />
      )}
      {isDecemble && (
        <VerifyModal
          onClose={handleOnClose}
          cancle={"Cancle"}
          verify={"Continue"}
          msg={
            "The allocated quantity of SKUs will be released, and the Kit will no longer be available for sales. Are you sure you want to disassemble the kit?"
          }
          action={handleDecembleOrder}
        />
      )}
    </div>
  );
};

export default PMKit;

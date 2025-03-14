import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PMDetailLeft from "./Header/PMDetailLeft";
import PMDetailRight from "./Header/PMDetailRight";
import FileUpload from "./FileUpload";
import PMVarianceImages from "../PMVarianceTab/PMVarianceImages";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import DuplicateForm from "../../PMForm/duplicateFormDrawer/DuplicateForm";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import ReportForm from "../reportDrawer/ReportForm";
import {
  closeModal,
  postParID,
  setCostDrawer,
  setDuplicateDrawer,
  setLandCost,
  setListsPrice,
  setRefresh,
  updateFormData,
} from "../../../redux/pmSlice";
import InputModal from "../../../../../../../../components/misc/pureComponents/modal/InputModal";
import PdfModal from "../../../../../../../../components/misc/pureComponents/modal/PdfModal";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import PMCostDrawer from "./Header/PMCostDrawer";

const PMDetail = () => {
  const [partNumber, setPartNumber] = useState("");
  const [mfgPartNumber, setMfgPartNumber] = useState("");
  const [partName, setPartName] = useState("");
  const [description, setDescription] = useState("");
  const [partCase, setPartCase] = useState("");
  const [warID, setWarId] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [partESN, setPartESN] = useState("");
  const [manageStockFlag, setManageStockFlag] = useState(true);
  const [shopSupplyFlag, setShopSupplyFlag] = useState(false);
  const [allowBackOFlag, setAllowBackOFlag] = useState(false);
  const [dimensionL, setDimensionL] = useState("");
  const [dimensionW, setDimensionW] = useState("");
  const [dimensionH, setDimensionH] = useState("");
  const [caseDimL, setCaseDimL] = useState("");
  const [caseDimW, setCaseDimW] = useState("");
  const [caseDimH, setCaseDimH] = useState("");
  const [uow, setUoW] = useState("");
  const [uowBW, setUoWBW] = useState("");
  const [boxWeight, setBoxWeight] = useState("");
  const [uowSW, setUoWSW] = useState("");
  const [shippingW, setShippingW] = useState("");
  const [uom, setUoM] = useState("");
  const [conUom, setConUom] = useState("");
  const [active, setActive] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const [clearance, setClearance] = useState(false);
  const [parId, setParId] = useState(null);
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [oHQty, setOhQty] = useState(null);
  const [weight, setWeight] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  let [files, setFiles] = useState([]);
  const [group, setGroup] = useState("");
  const [productType, setProductType] = useState("");
  const [productClass, setProductClass] = useState("");
  const [subGroup, setSubGroup] = useState("");
  const [caseSWeight, setCaseSWeight] = useState(null);
  const [caseSWeightId, setCaseSWeightId] = useState("");
  const [countryOrigin, setCountryOrigin] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);
  const landCost = useSelector((state) => state.pmSlices.landCost);
  const listPrice = useSelector((state) => state.pmSlices.listPrice);
  // const isDrawer = useSelector((state) => state.pmSlices.duplicateDrawer);
  const [cost, setCost] = useState(landCost);
  // console.log(isDrawer);
  const editFormVariance = useSelector(
    (state) => state.pmSlices.editFormVariance
  );
  const varianceImages = editFormVariance.map((item) => item.IMAGE_MAIN);
  // const imageBaseURL =
  //   process.env.NEXT_PUBLIC_REACT_APP_CDN_PATH + "nasdev/ATTACHMENTS/PART/";
  const duplicateLotData = useSelector(
    (state) => state.pmSlices.duplicateLotData
  );

  const getWeight = (status) => {
    switch (status) {
      case 19:
        return "G";
      case 83:
        return "KG";
      case 263426:
        return "MG";
      case 196937:
        return "POUND";
      default:
        return "";
    }
  };

  const payload = {
    PAR_ID: parId,
    CODE: partNumber,
    NAME: partName,
    SKU_MANUFACTURE: mfgPartNumber,
    BARCODE_NUMBER: barcode,
    DESCRIPTION: description,
    UOM_ID: uom,
    PARGRO_ID: group,
    MARGRO_ID: "",
    MARKUP_BASED_ON: "STD",
    PRICE: listPrice,
    STANDARD_COST: landCost,
    LAST_PURCHASE_COST: "",
    ENABLE_ITEM_LEVEL_CHARGE: "N",
    ITEM_LEVEL_CHARGE: "",
    NOTES: "",
    FUEL_FLAG: "N",
    STOCK_ITEM_FLAG: manageStockFlag ? "Y" : "N",
    GLACC_ID_ASSET: "",
    GLACC_ID_REVENUE: "",
    GLACC_ID_COGS: "",
    ACTIVE_FLAG: active ? "Y" : "N",
    USE_ID: "2694",
    VMRSYS_ID: "",
    VMRASS_ID: "",
    VMRCOM_ID: "",
    CONVERSION_TO_STOCKING_UOM: conUom,
    WARRANTY: "",
    PAR_ID_SUPERCEDES: "",
    UOM_ID_REORDERING: uom,
    ALLOW_NEGATIVE_FLAG: "N",
    ITEM_LEVEL_CHRG_EXP_DATE: "",
    REFERENCE_NUMBER: "",
    SHOSUP_FLAG: shopSupplyFlag ? "Y" : "N",
    ALLOW_FRACTION_QTY: "N",
    ALLOW_NEG_RO_COMP_FLAG: "N",
    DimensionL: dimensionL,
    DimensionH: dimensionH,
    DimensionW: dimensionW,
    Weight: weight,
    ALLOW_TAX_FLAG: "Y",
    PARWAR_ID: warID,
    UOW_ID: uow,
    UPC_MANUFACTURE: partCase,
    AVAILABLE_TO_ALL_CHANNELS: "N",
    PRICE_MANUAL_INSERT: "N",
    PARCATGR_ID: "",
    SHIPPING_WEIGHT_UNIT: uowSW,
    // SHIPPING_WEIGHT_UNIT: getWeight(uowSW),
    SHIPPING_WEIGHT: shippingW,
    BOLTON_FLAG: "N",
    NON_STOCK_ITEM_FLAG: "N",
    VEN_ID: "",
    FileNames: selectedFiles || [],
    BUYERPARTNUMBER: "",
    COU_ID_ORIGIN: "",
    ELETCRONIC_SERIAL_NUMBER: partESN,
    WEB_SALE_ITEM_FLAG: "N",
    FINAL_SALE_ITME_FLAG: "N",
    CLEARANCE_ITEM_FLAG: clearance ? "Y" : "N",
    RESTRICTED_ITEM_FLAG: restricted ? "Y" : "N",
    CASE_DIMENSION_L: caseDimL,
    CASE_DIMENSION_H: caseDimH,
    CASE_DIMENSION_W: caseDimW,
    CASE_WEIGHT: boxWeight,
    CASE_UOW_ID: uowBW,
    CASE_SHIPP_WEIGHT: caseSWeight,
    CASE_SHIPP_UOW_ID: caseSWeightId,
    SHOW_NEW_START_DATE: "",
    SHOW_NEW_END_DATE: "",
    PROFIT_MARGIN_PERCENTAGE: "",
    PARBRA_ID: editDetForm?.PARBRA_ID,
    PARASSIGNCAT_ID: editDetForm?.ASSIGNED_CATEGORIES_ID,
  };

  const payloadPostPartDet = {
    data: payload,
    action: "ItemMaster",
    method: "PostPartDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (editDetForm) {
      setParId(editDetForm?.PAR_ID);
      setPartNumber(editDetForm?.PAR_CODE);
      setDescription(editDetForm?.PART_DESCRIPTION);
      setPartCase(editDetForm?.UPC_MANUFACTURE);
      setMfgPartNumber(editDetForm?.SKU_MANUFACTURE);
      setPartName(editDetForm?.NAME);
      setWarId(editDetForm?.PAR_WAR_ID);
      setUnitCost(editDetForm?.STANDARD_COST);
      dispatch(setLandCost(editDetForm?.STANDARD_COST));
      // setCost(editDetForm?.STANDARD_COST);
      setBarcode(editDetForm?.BARCODE_NUMBER);
      setPartESN(editDetForm?.ELETCRONIC_SERIAL_NUMBER);
      // setPrice(editDetForm?.PRICE);
      dispatch(setListsPrice(editDetForm?.PRICE));
      setUoM(editDetForm?.UOM_ID);
      setUoW(editDetForm?.UOW_ID);
      setConUom(editDetForm?.CONVERSION_INTO_STOCKING_UOM);
      setDimensionH(editDetForm?.DimensionH);
      setDimensionW(editDetForm?.DimensionW);
      setDimensionL(editDetForm?.DimensionL);
      setCaseDimH(editDetForm?.CASE_DIMENSION_H);
      setCaseDimW(editDetForm?.CASE_DIMENSION_W);
      setCaseDimL(editDetForm?.CASE_DIMENSION_L);
      setActive(editDetForm?.ACTIVE_FLAG);
      setSelectedFiles(editDetForm?.FileNames);
      setClearance(editDetForm?.CLEARANCE_ITEM_FLAG);
      setRestricted(editDetForm?.RESTRICTED_ITEM_FLAG);
      setShopSupplyFlag(editDetForm?.SHOPSUPPLY_FLAG);
      setManageStockFlag(editDetForm?.STOCK_ITEM_FLAG);
      setOhQty(editDetForm?.OH_QUANTITY);
      setWeight(editDetForm?.Weight);
      setGroup(editDetForm?.PARGRO_ID);
      setShippingW(editDetForm?.SHIPPING_WEIGHT);
      setCaseSWeight(editDetForm?.CASE_SHIPP_WEIGHT);
      setCaseSWeightId(editDetForm?.CASE_SHIPP_UOW_ID);
      setUoWBW(editDetForm?.CASE_UOW_ID);
      setBoxWeight(editDetForm?.CASE_WEIGHT);
      setUoWSW(editDetForm?.SHIPPING_WEIGHT_UNIT);
      setCountryOrigin(editDetForm?.COU_ID_ORIGIN);
    }
  }, [editDetForm]);

  const getTempFileData = (data) => {
    setSelectedFiles(data?.FileNames);
  };
  // console.log("selected file: ", selectedFiles);
  const handleFileChange = (files) => {
    setFiles(files);
  };

  let urls = [];
  // console.log("url file", urls);
  useEffect(() => {
    const payload = new FormData();
    // let SourceOraSeqv = "";

    payload.append("AttachNumber", "1");
    payload.append("DistType", "Part");
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
  // console.log("file: ", files);
  const postPartDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
      dispatch(setCostDrawer(true));
      dispatch(setRefresh());
    }
  };

  const handleApply = () => {
    if (
      partNumber != "" &&
      partNumber != undefined &&
      partName != "" &&
      partName != undefined &&
      mfgPartNumber != "" &&
      mfgPartNumber != undefined &&
      description != "" &&
      (listPrice != 0) & (listPrice > 0) &&
      listPrice != undefined &&
      landCost != 0 &&
      landCost > 0 &&
      landCost != undefined &&
      barcode != "" &&
      barcode != undefined &&
      listPrice >= landCost
    ) {
      sendRequest(
        ItemMaster.PostPartDetails,
        "POST",
        payloadPostPartDet,
        postPartDet,
        token
      );
    } else {
      setIsError(true);
    }
  };
  const onKeyPress = (event) => {
    if (event.key == "c") {
      event.preventDefault();
      handleApply();
    }
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["c", "x"], onKeyPress);

  const handleCloseDrawer = () => {
    // dispatch(setDuplicateDrawer(false));
    setIsDrawer(false);
  };

  const tabs = [
    {
      label: "Duplicate",
      content: (
        <DuplicateForm
          setEMessage={setEMessage}
          onClose={handleCloseDrawer}
          setIsErrorMessage={setIsErrorMessage}
        />
      ),
    },
  ];

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

  const handleOverRideMOpen = () => {
    if (editDetForm != null) {
      setIsModalOpen(true);
      setIsOpen(false);
    } else {
      setEMessage("You cannot override new part");
      setIsErrorMessage(true);
      setIsOpen(false);
    }
  };
  const handleDuplicateFormOpen = () => {
    if (editDetForm != null) {
      if (duplicateLotData?.length > 0) {
        // dispatch(setDuplicateDrawer(true));
        setIsDrawer(true);
        setIsOpen(false);
      } else {
        setEMessage("Cannot make duplicate of this part");
        setIsErrorMessage(true);
        setIsOpen(false);
      }
    } else {
      setEMessage("Cannot make duplicate of new part");
      setIsErrorMessage(true);
      setIsOpen(false);
    }
  };

  const options = [
    {
      label: "Override",
      onClick: handleOverRideMOpen,
    },
    {
      label: "Duplicate",
      onClick: handleDuplicateFormOpen,
    },
  ];
  const Newoptions = [];
  // console.log("editdetform", editDetForm);
  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu
            label="Apply"
            handleClick={handleApply}
            options={editDetForm == null ? [] : options}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>

        <div className="py-[5px] w-full bg-gray-100"></div>
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
                <div className="flex flex-col lg:flex-row  px-4 mr-2 gap-4  ">
                  <div className="w-[45%] ">
                    <PMDetailLeft
                      partName={partName}
                      setPartName={setPartName}
                      partNumber={partNumber}
                      setPartNumber={setPartNumber}
                      mfgPartNumber={mfgPartNumber}
                      setMfgPartNumber={setMfgPartNumber}
                      description={description}
                      setDescription={setDescription}
                      partCase={partCase}
                      setPartCase={setPartCase}
                      warID={warID}
                      setWarId={setWarId}
                      cost={cost}
                      setCost={setCost}
                      price={price}
                      setPrice={setPrice}
                      barcode={barcode}
                      setBarcode={setBarcode}
                      partESN={partESN}
                      setPartESN={setPartESN}
                      isError={isError}
                      verifiedCode={verifiedCode}
                      countryOrigin={countryOrigin}
                      setCountryOrigin={setCountryOrigin}
                    />
                  </div>
                  <div className="w-[55%]  ">
                    <PMDetailRight
                      dimensionH={dimensionH}
                      setDimensionH={setDimensionH}
                      dimensionL={dimensionL}
                      setDimensionL={setDimensionL}
                      dimensionW={dimensionW}
                      setDimensionW={setDimensionW}
                      uow={uow}
                      setUoW={setUoW}
                      setUoWBW={setUoWBW}
                      setUoWSW={setUoWSW}
                      uowBW={uowBW}
                      uowSW={uowSW}
                      uom={uom}
                      conUom={conUom}
                      setConUom={setConUom}
                      setUoM={setUoM}
                      active={active}
                      setActive={setActive}
                      clearance={clearance}
                      setClearance={setClearance}
                      restricted={restricted}
                      setRestricted={setRestricted}
                      manageStockFlag={manageStockFlag}
                      setManageStockFlag={setManageStockFlag}
                      setAllowBackOFlag={setAllowBackOFlag}
                      allowBackOFlag={allowBackOFlag}
                      setShopSupplyFlag={setShopSupplyFlag}
                      shopSupplyFlag={shopSupplyFlag}
                      oHQty={oHQty}
                      setOhQty={setOhQty}
                      weight={weight}
                      setWeight={setWeight}
                      group={group}
                      setGroup={setGroup}
                      productType={productType}
                      setProductType={setProductType}
                      productClass={productClass}
                      setProductClass={setProductClass}
                      subGroup={subGroup}
                      setSubGroup={setSubGroup}
                      caseSWeight={caseSWeight}
                      setCaseSWeight={setCaseSWeight}
                      caseSWeightId={caseSWeightId}
                      setCaseSWeightId={setCaseSWeightId}
                      shippingW={shippingW}
                      setShippingW={setShippingW}
                      boxWeight={boxWeight}
                      setBoxWeight={setBoxWeight}
                      caseDimH={caseDimH}
                      setCaseDimH={setCaseDimH}
                      caseDimW={caseDimW}
                      setCaseDimW={setCaseDimW}
                      caseDimL={caseDimL}
                      setCaseDimL={setCaseDimL}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex w-full">
            <div className="w-1/2 p-2 ml-[32px]">
              <FileUpload onUpload={handleFileChange} />
            </div>

            <div className="w-1/2 p-2">
              <PMVarianceImages images={varianceImages} />
            </div>
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
      <RightDrawer
        isOpen={isDrawer}
        // setIsDrawer={setIsDrawer}
        onClose={handleCloseDrawer}
        heading={`Duplicate Form`}
        tabs={tabs}
      />
      <PMCostDrawer unitCost={unitCost} setUnitCost={setUnitCost} />
    </div>
  );
};

export default PMDetail;

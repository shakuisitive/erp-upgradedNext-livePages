import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceivingFormHeader from "./ReceivingFormHeader";
import ReceivingQtyInput from "./ReceivingQtyInput";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  setUpdatedReceving,
  setUpdatedReceivingDetail,
  subGridset,
  setReceivingDetails,
  setWarId,
  setSubGridCellTData,
  setIsCheckedFItem,
  removeSameIndex,
} from "../../redux/receivingSlices";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
import MoreOption from "../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import ReceivingLeftForm from "./header/ReceivingLeftForm";
import ReceivingRightForm from "./header/ReceivingRightForm";
import ReceivingSelectedModal from "../ReceivingSelectedModal";
import Loading from "../../../../../../../components/misc/loader/loading";
import ReceivingOrderQTotal from "../receivingCellComp/ReceivingOrderQTotal";
import ReceivingBOTotal from "../receivingCellComp/ReceivingBOTotal";
import ReceivingOHTotal from "../receivingCellComp/ReceivingOHTotal";
import ReceivingCaseQTotal from "../receivingCellComp/ReceivingCaseQTotal";
import ReceivingQTotal from "../receivingCellComp/ReceivingQTotal";

const ReceivingForm = ({ setPdf, pdf, setPdfModal, pdfModal }) => {
  const formIndex = useSelector((state) => state.receivingSlices.formIndex);
  const rowData = useSelector((state) => state.receivingSlices.subGridState);
  const dispatch = useDispatch();
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(null);
  const [commentvalue, setCommentValue] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ponumber, setPoNumber] = useState("");
  const [podate, setPoDate] = useState("");
  const [colaps, setColaps] = useState(false);
  const [isHeader, setIsHeader] = useState(true);
  const [item, setItem] = useState("Working on it");
  const [data, setData] = useState();
  let [isOpen, setIsOpen] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [isOpenS, setIsOpenS] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const [head, setHead] = useState([
    { title: "Lot", slector: "LOT_NUMBER", Wid: 250 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 150, date: true },
    { title: "SKU", slector: "SKU_MANUFACTURE", Wid: 150 },
    { title: "Description", slector: "DESCRIPTION", Wid: 250 },
    {
      title: "OhQty",
      slector: "QTY_ONHAND",
      Wid: 150,
      tottal: true,
      TComp: ReceivingOHTotal,
    },
    {
      title: "OrderQty",
      slector: "QTY_ORDERED",
      Wid: 150,
      tottal: true,
      TComp: ReceivingOrderQTotal,
    },
    // { title: 'CaseReceived',slector:'', Wid: 100 },
    { title: "CaseUOM", slector: "REORDERING_UOM", Wid: 150 },
    {
      title: "CaseQty",
      slector: "QTY_ORDERED",
      Wid: 150,
      tottal: true,
      TComp: ReceivingCaseQTotal,
    },
    {
      title: "QtyReceieved",
      slector: "QUANTITY",
      Wid: 120,
      customComp: ReceivingQtyInput,
      tottal: true,
      TComp: ReceivingQTotal,
    },
    {
      title: "BO",
      slector: "BO_QUANTITY",
      Wid: 150,
      tottal: true,
      TComp: ReceivingBOTotal,
    },
  ]);

  const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;
  const payload = {
    data: {
      INVREC_ID: `${formIndex?.INVREC_ID}`,
      OFFSET: "+5:00",
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
  };

  // token
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  function getAllTask(data) {
    dispatch(subGridset(data.Result.Table1));
    dispatch(setReceivingDetails(data?.Result.Results[0]));
    dispatch(setWarId(data?.Result?.Table2[0]));
    setData(data.Result.Results[0]);
    setRef(data?.Result.Results[0]?.RECIEVING_REFERENCE_NUMBER);
    setCommentValue(data?.Result.Results[0]?.RECIEVING_NOTES);
    setPhone(data?.Result.Results[0]?.SUPPLIER_PHONE);
    setEmail(data?.Result.Results[0]?.SUPPLIER_EMAIL);
    setPoDate(
      data?.Result?.Results[0]?.REC_DATE
        ? moment(data?.REC_DATE).format("DD-MM-YYYY")
        : "24-Jan-2024"
    );
    setPoNumber(data?.Result.Results[0]?.RECEIVING_NUMBER);
    const PostReceivingPayload = data?.Result.Results.map((items) => {
      const {
        FINAL_DATE,
        FINZ_USE_ID,
        INVREC_ID,
        PREPARED_DATE,
        PURORD_ID,
        RECEIVING_DATE,
        RECEIVING_NUMBER,
        RELEASED_FLAG,
        SUPPLIER_INVOICE_NUMBER,
        SUP_INVOICE_DATE,
        SUP_INVOICE_DUE_DATE,
        TERMS_CONDITION,
        USE_ID_PREPARED_BY,
        USE_ID_RELEASED_BY,
        VEN_ID,
        VOID_FLAG,
        VOID_NOTES,
        WAR_ID,
        REFERENCE_NUMBER,
        NOTES,
      } = items;
      return {
        FINAL_DATE,
        FINZ_USE_ID: "2694",
        INVREC_ID,
        PREPARED_DATE,
        PURORD_ID,
        RECEIVING_DATE,
        RECEIVING_NUMBER,
        RELEASED_FLAG: RELEASED_FLAG == "N" ? "Y" : RELEASED_FLAG,
        SUPPLIER_INVOICE_NUMBER: "",
        SUP_INVOICE_DATE,
        SUP_INVOICE_DUE_DATE,
        TERMS_CONDITION,
        USE_ID_PREPARED_BY: "2694",
        USE_ID_RELEASED_BY: "2694",
        VEN_ID,
        VOID_FLAG: "N",
        VOID_NOTES,
        WAR_ID,
        REFERENCE_NUMBER: data?.Result.Results[0]?.RECIEVING_REFERENCE_NUMBER,
        NOTES: data?.Result.Results[0]?.RECIEVING_NOTES || "",
      };
    });

    const PostReceivingDetailPayload = data?.Result.Table1.map((items) => {
      const {
        BACK_ORDER_FLAG,
        BIN,
        CONVERT_QTY,
        COST,
        DELETED_FLAG,
        DESCRIPTION,
        INVPARLOT_ID,
        INVRECDET_ID,
        INVREC_ID,
        PAR_ID,
        PURORDDET_ID,
        QUANTITY,
        QUARANTINE_FLAG,
        RACK,
        READY_FOR_RESTOCK_FLAG,
        SHELF,
        USE_ID,
        WAR_ID,
        BO_QUANTITY,
        WORORD_ID,
      } = items;
      return {
        BACK_ORDER_FLAG: BACK_ORDER_FLAG == "N" ? "Y" : BACK_ORDER_FLAG,
        BIN: null,
        CONVERT_QTY: data?.Result.Table1[0].QTY_CONVERSION,
        COST,
        DELETED_FLAG: "N",
        DESCRIPTION,
        INVPARLOT_ID,
        INVRECDET_ID,
        INVREC_ID: data?.Result?.Results[0].INVREC_ID,
        PAR_ID,
        PURORDDET_ID: null,
        QUANTITY,
        QUARANTINE_FLAG,
        RACK: null,
        READY_FOR_RESTOCK_FLAG,
        SHELF: null,
        USE_ID: "2694", // this is temporarily hardcoded
        WAR_ID,
        BO_QUANTITY,
        WORORD_ID: null,
      };
    });

    dispatch(setUpdatedReceving(PostReceivingPayload));
    dispatch(setUpdatedReceivingDetail(PostReceivingDetailPayload));
    setLoading(data);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);

  const closeModallSlected = () => {};

  const handleCheckboxChange = (rowI, rowDataa) => {
    if (rowDataa == "all" && checkedAll == false) {
      setCheckedAll(true);

      const arr = rowData.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        return obj;
      });

      setCheckedItems(arr);
    } else if (rowDataa == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
      // dispatch(setIsCheckedFItem([]))
    } else {
      if (checked(rowI, rowDataa)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowDataa
          )
        );
        dispatch(removeSameIndex(rowI));
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData: rowDataa }]);
        dispatch(setIsCheckedFItem(rowI));
      }
    }
  };

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    if (
      checkedItems.length > 0 &&
      FormStatus == "NEW" &&
      FormStatus == "IN PROCESS"
    ) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }, [FormStatus]);

  const [filteredData, setFilteredData] = useState([]);

  const allFieldsFilledDetail = rowData.every((item) => {
    return (
      item.READY_FOR_RESTOCK_FLAG == "Y" &&
      item.BACK_ORDER_FLAG == "Y" &&
      item?.RESTOCK_FLAG == "Y"
    );
  });
  // console.log(
  //   "filterd item form allFieldsFilledDetail: ",
  //   allFieldsFilledDetail
  // );
  // console.log("filterd item form rowData: ", rowData);

  useEffect(() => {
    const filteredItems = rowData.filter(
      (item) =>
        (item.READY_FOR_RESTOCK_FLAG === "N" &&
          item.BACK_ORDER_FLAG === "N" &&
          item?.RESTOCK_FLAG === "N") ||
        (item.READY_FOR_RESTOCK_FLAG === "N" &&
          item.BACK_ORDER_FLAG === "Y" &&
          item?.RESTOCK_FLAG === "N")
    );

    if (FormStatus == "READY FOR RELEASE") {
      setFilteredData([]);
    } else {
      setFilteredData(filteredItems);
      // console.log("filterd item form: ", filteredItems);
    }
  }, [rowData, FormStatus]);

  useEffect(() => {
    let OhT = 0;
    let Oqty = 0;
    let CaseQty = 0;
    let QtyR = 0;
    let BOt = 0;

    if (filteredData.length > 0) {
      filteredData.forEach((data) => {
        OhT += data?.QTY_ONHAND || 0;
        Oqty += data?.QTY_ORDERED || 0;
        CaseQty += data?.QTY_ORDERED || 0;
        QtyR += data?.QUANTITY || 0;
        BOt += data?.BO_QUANTITY || 0;
      });
    } else if (rowData) {
      rowData.forEach((data) => {
        OhT += data?.QTY_ONHAND || 0;
        Oqty += data?.QTY_ORDERED || 0;
        CaseQty += data?.QTY_ORDERED || 0;
        QtyR += data?.QUANTITY || 0;
        BOt += data?.BO_QUANTITY || 0;
      });
    }

    const dataCost = {
      OhT: OhT,
      Oqty: Oqty,
      CaseQty: CaseQty,
      QtyR: QtyR,
      BOt: BOt,
    };

    dispatch(setSubGridCellTData(dataCost));
  }, [filteredData, rowData, dispatch]);

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <div className=" h-[98%] mt-[4px] gap-2 flex rounded-lg">
          <div
            className="  flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white "
          >
            <ReceivingFormHeader
              supplier={data?.SUPPLIER ?? ""}
              setPdf={setPdf}
              pdf={pdf}
              setPdfModal={setPdfModal}
              pdfModal={pdfModal}
            />
            <div className="py-1 w-full bg-gray-100"></div>

            <div className="h-[98%] overflow-auto ">
              <div>
                <div className="ml-[60px] my-4">
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
                    <div className="flex px-4 mr-2 gap-4  ">
                      <div className="w-1/2">
                        <ReceivingLeftForm />
                      </div>
                      <div className="w-1/2">
                        <ReceivingRightForm />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full overflow-x-auto bg-white grow  p-2 ">
                <GridTable
                  row={allFieldsFilledDetail ? rowData : filteredData}
                  // row={allFieldsFilledDetail ? filteredData : rowData}
                  head={head}
                  setHead={setHead}
                  GridTitle="Items"
                  GridColor={"#4ade80"}
                  colaps={colaps}
                  setColaps={setColaps}
                  colapsfunc={colapsfuncComp}
                  addButton={false}
                  selectedRow={selectedRow}
                  MoreOpt={MoreOption}
                  MoreOption={MoreOption}
                  isChecked={checked}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </div>
            <ReceivingSelectedModal
              isOpen={isOpen}
              checkedItems={checkedItems?.length}
              closeModal={closeModallSlected}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReceivingForm;

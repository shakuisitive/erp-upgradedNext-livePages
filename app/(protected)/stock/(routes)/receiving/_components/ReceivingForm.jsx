import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import ReceivingFormHeader from "./ReceivingForm/ReceivingFormHeader";
import ReceivingQtyInput from "./ReceivingForm/ReceivingQtyInput";
// import GridTable from "../../../../../../components/misc/GridTable/GridTable";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import InputTextEut from "../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import TextArea from "../../../../../../components/misc/pureComponents/textinput/TextArea";
import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import {setUpdatedReceving,setUpdatedReceivingDetail, updateRefNumber, updateNotes, subGridset, setReceivingDetails} from '../redux/receivingSlices'
import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import ReceivingTooltip from "./ReceivingForm/ReceivingTooltip";
import moment from "moment";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
const ReceivingForm = () => {
  const formIndex = useSelector((state) => state.receivingSlices.formIndex);
  const rowData = useSelector(state => state.receivingSlices.subGridState);
  const dispatch = useDispatch()
 const [ref, setRef] = useState('');
  const [commentvalue, setCommentValue] = useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [ponumber,setPoNumber]=useState('');
  const [podate,setPoDate]=useState('');
 const [colaps , setColaps] = useState(false)

// console.log("po number checking",ponumber)
// console.log("po number checking",setPoNumber)


  // console.log("This is my form index", formIndex.INVREC_ID);
  const [item, setItem] = useState("Working on it");
  const [itemPriority, setItemPriority] = useState("High");

  const getSlect = (e) => {
    setItem(e.target.value);
  };
  const [data, setData] = useState();
  const [postreceiving, setPostReceiving] = useState();
  const [postreceivingdetail, setPostReceivingDetail] = useState();

  const [checkedItems , setCheckedItems] = useState([])
  const [checkedAll , setCheckedAll] = useState(false)

  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    { title: "Lot", slector: "LOT_NUMBER", Wid: 250 ,More:MoreOption  },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 150, date: true },
    { title: "SKU", slector: "SKU_MANUFACTURE", Wid: 150 },
    { title: "Description", slector: "DESCRIPTION", Wid: 250 },
    { title: "OhQty", slector: "QTY_ONHAND", Wid: 150 },
    { title: "OrderQty", slector: "QTY_ORDERED", Wid: 150 },
    // { title: 'CaseReceived',slector:'', Wid: 100 },
    { title: "CaseUOM", slector: "REORDERING_UOM", Wid: 150 },
    { title: "CaseQty", slector: "QTY_ORDERED", Wid: 150 },
    {
      title: "QtyReceieved",
      slector: "QUANTITY",
      Wid: 120,
      customComp: ReceivingQtyInput,
    },
    { title: "BO", slector: "BO_QUANTITY", Wid: 150 },
  ]);


  let [error, sendRequest] = useApiFetch();

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;
  // for input fields post api
  const PostReceivingUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecieving`;
  // for grid post api
  const PostReceivingDetailUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingDetail`;
  // getReceiving Payload
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


//funtions
const handleRefChange = (e) => {
  // const ref = {
  //   refNumber : e.target.value
  // }
  dispatch(updateRefNumber(e.target.value));
  setRef(e.target.value);
};

const handleCommentChange = (e) => {
  setCommentValue(e.target.value);
  dispatch(updateNotes(e.target.value));
};
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePoNumberChange = (e) => {
    setPoNumber(e.target.value);
  };
  const handlePoDateChange = (e) => {
    setPoDate(e.target.value);
  };

  console.log(data, 'check receiving')
  function getAllTask(data) {
    dispatch(subGridset(data.Result.Table1))
    dispatch(setReceivingDetails(data?.Result.Results[0]))
    setData(data.Result.Results[0]);
    setRef(data?.Result.Results[0]?.RECIEVING_REFERENCE_NUMBER)
    setCommentValue(data?.Result.Results[0]?.RECIEVING_NOTES)
    setPhone(data?.Result.Results[0]?.SUPPLIER_PHONE)
    setEmail(data?.Result.Results[0]?.SUPPLIER_EMAIL)
    setPoDate(data?.Result?.Results[0]?.PO_DATE
                  ? moment(data?.PO_DATE).format("MMM Do")
                  : "January 24")
    setPoNumber(data?.Result.Results[0]?.PO_NUMBER)
    console.log("checking get api not redux",data)
 // PostReceivingPayload input felds
  const PostReceivingPayload = data?.Result.Results.map((items)=>{
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
    }=items

   return {
    FINAL_DATE,
      FINZ_USE_ID:"2694",
      INVREC_ID,
      PREPARED_DATE,
      PURORD_ID,
      RECEIVING_DATE,
      RECEIVING_NUMBER,
      RELEASED_FLAG,
      SUPPLIER_INVOICE_NUMBER:"",
      SUP_INVOICE_DATE,
      SUP_INVOICE_DUE_DATE,
      TERMS_CONDITION,
      USE_ID_PREPARED_BY:"2694",
      USE_ID_RELEASED_BY:"2694",
      VEN_ID,
      VOID_FLAG:"N",
      VOID_NOTES,
      WAR_ID,
      REFERENCE_NUMBER: data?.Result.Results[0]?.RECIEVING_REFERENCE_NUMBER,
      NOTES: data?.Result.Results[0]?.RECIEVING_NOTES,
   }
  });
  // postReceivingDetail grid data
  const PostReceivingDetailPayload = data?.Result.Table1.map((items)=>{
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
        WORORD_ID,
      } = items
      return{
        BACK_ORDER_FLAG,
        BIN:null,
        CONVERT_QTY:data?.Result.Table1[0].QTY_CONVERSION,
        COST,
        DELETED_FLAG:"N",
        DESCRIPTION,
        INVPARLOT_ID,
        INVRECDET_ID,
        INVREC_ID:data?.Result?.Results[0].INVREC_ID,
        PAR_ID,
        PURORDDET_ID:null,
        QUANTITY,
        QUARANTINE_FLAG,
        RACK:null,
        READY_FOR_RESTOCK_FLAG,
        SHELF:null,
        USE_ID:"2694", // this is temporarily hardcoded 
        WAR_ID,
        WORORD_ID:null,
      }
  });
     //dispatching payload
    //  console.log("checking dispatch");
  dispatch(setUpdatedReceving(PostReceivingPayload))
  dispatch(setUpdatedReceivingDetail(PostReceivingDetailPayload))
  }


  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  },[]);


  // Define validation schema using Yup
  // const validationSchema = Yup.object().shape({
  //   PO_NUMBER: Yup.string().required("PO # is required"),
  //   PO_DATE: Yup.date().required("PO Date is required"),
  //   SUPPLIER_PHONE: Yup.string().required("Phone # is required"),
  //   SUPPLIER_EMAIL: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   SUPPLIER: Yup.string().required("Supplier is required"),
  //   SUPPLIER_INVOICE_NUMBER: Yup.string().required("Invoice is required"),
  //   RECEIVING_REFERENCE_NUMBER: Yup.string().required("Ref is required"),
  //   RECEIVING_NOTES: Yup.string(),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     RECEIVING_NUMBER: "",
  //     REC_DATE: "",
  //     PO_NUMBER: "",
  //     PO_DATE: "",
  //     SUPPLIER_PHONE: "",
  //     SUPPLIER_EMAIL: "",
  //     SUPPLIER: "",
  //     SUPPLIER_INVOICE_NUMBER: "",
  //     RECEIVING_REFERENCE_NUMBER: "",
  //     RECEIVING_NOTES: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {},
  // });
  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };



  const colapsfuncComp =()=>{
    
  }
  const selectedRow = (index , data) =>{
    // console.log('check slected row Data and index' , index , data);
      }

      const checked = (rowI , rowData) =>{

        return checkedItems.some(item => item.rowI === rowI && item.rowData === rowData);
          }

  return (
    <div className=" h-[98%] mt-[4px] gap-2   flex rounded-lg">
      
        <div className="   flex flex-col  border lgdesktop:w-[75%]   desktop:w-[70%] laptop:w-[60%] tablet:w-[50%] rounded-md bg-white">
          <ReceivingFormHeader
            supplier={data?.SUPPLIER ?? ""}
          />
            <div className='py-1 w-full bg-gray-100'></div>
            <div className="w-full  bg-white grow overflow-auto  p-2 ">
              <GridTable
                // row={data?.Result.Table1}
                row={rowData}
                head={head}
                setHead={setHead}
                GridColor={'#4ade80'}
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
        <div className="px-4 border lgdesktop:w-[25%]  bg-white desktop:w-[30%] laptop:w-[40%] tablet:w-[50%]  rounded-md shadow-md shadow-gray-200 py-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Tooltip content="Edit">
                <MdEdit className="text-[25px] border  bg-purple-200 rounded-lg cursor-pointer p-1 text-purple-500 hover:text-white hover:bg-purple-500" />
              </Tooltip>
              <Tooltip content="Perview">
                <FaRegEye
                  className="text-[25px] rounded-lg border cursor-pointer p-1 bg-sky-100 
              text-sky-500 hover:text-white hover:bg-sky-400"
                />
              </Tooltip>
              <Tooltip content="Export">
                <HiOutlineDocumentArrowDown className="text-[25px] cursor-pointer rounded-lg border p-1 bg-indigo-100 text-indigo-500 hover:text-white hover:bg-indigo-400" />
              </Tooltip>
            </div>
            <div className="">
              <p className="H text-gray-800   text-[20px]">
                {data?.RECEIVING_NUMBER ?? "REC0985673"}
              </p>
              <p className="H text-gray-500  text-right ">
                {" "}
                {data?.REC_DATE
                  ? moment(data?.REC_DATE).format("MM/DD/YYYY")
                  : "January 24"}
              </p>
            </div>
          </div>
          <div className="w-full mt-4 ">
            <div className="w-full bg-indigo-400 text-white flex justify-center items-center font-semibold py-2 rounded-full">
              <ReceivingTooltip content="RE-STOCK">
                <p>RE-STOCK</p>
              </ReceivingTooltip>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full bg-orange-500 text-white flex justify-center items-center font-semibold rounded-full py-2">
              <ReceivingTooltip content="High">
                <p>High</p>
              </ReceivingTooltip>
            </div>
          </div>
          {/* input fields  */}
          {/* <form onSubmit={formik.handleSubmit} className=""> */}
            <InputTextEut
              placeHolder="PO #"
              isDisabled={false}
              value={ponumber}
              onChange={handlePoNumberChange}
              // initialValue={data?.Result.Results[0]?.PO_NUMBER ?? ""}
              // {...formik.getFieldProps("PO_NUMBER")}
            />
            {/* {formik.touched.PO_NUMBER && formik.errors.PO_NUMBER ? (
              <div className="text-red-500">{formik.errors.PO_NUMBER}</div>
            ) : null} */}

            <InputTextEut
              placeHolder="PO Date"
              isDisabled={true}
              value={podate}
              onChange={handlePoDateChange}

              // initialValue={data?.Result.Results[0]?.PO_DATE ?? ""}
              // {...formik.getFieldProps("PO_DATE")}
            />
            {/* {formik.touched.PO_DATE && formik.errors.PO_DATE ? (
              <div className="text-red-500">{formik.errors.PO_DATE}</div>
            ) : null} */}

            <InputTextEut
              placeHolder="Phone #"
              value={phone}
              isDisabled={true}
              onChange={handlePhoneChange}

              // initialValue={data?.Result.Results[0]?.SUPPLIER_PHONE ?? ""}
              // {...formik.getFieldProps("SUPPLIER_PHONE")}
            />
            {/* {formik.touched.SUPPLIER_PHONE && formik.errors.SUPPLIER_PHONE ? (
              <div className="text-red-500">{formik.errors.SUPPLIER_PHONE}</div>
            ) : null} */}

            <InputTextEut
              placeHolder="Email"
              isDisabled={true}
              value={email}
              onChange={handleEmailChange}
             
              // initialValue={data?.Result.Results[0]?.SUPPLIER_EMAIL ?? ""}
              // {...formik.getFieldProps("SUPPLIER_EMAIL")}
            />
            {/* {formik.touched.SUPPLIER_EMAIL && formik.errors.SUPPLIER_EMAIL ? (
              <div className="text-red-500">{formik.errors.SUPPLIER_EMAIL}</div>
            ) : null} */}

            <InputTextEut
              placeHolder="Ref"
              value={ref}
              onChange={handleRefChange}
              // initialValue={
              //   data?.Result.Results[0]?.RECEIVING_REFERENCE_NUMBER ?? ""
              // }
              // {...formik.getFieldProps("RECEIVING_REFERENCE_NUMBER ")}
            />
            {/* {formik.touched.RECEIVING_REFERENCE_NUMBER &&
            formik.errors.RECEIVING_REFERENCE_NUMBER ? (
              <div className="text-red-500">
                {formik.errors.RECEIVING_REFERENCE_NUMBER}
              </div>
            ) : null} */}

            <TextArea
              placeHolder="Comments"
              value={commentvalue}
              onChange={handleCommentChange}
              // initialValue={data?.Result.Results[0]?.RECEIVING_NOTES ?? ""}
              // {...formik.getFieldProps("RECEIVING_NOTES")}
            />
            {/* {formik.touched.RECEIVING_NOTES && formik.errors.RECEIVING_NOTES ? (
              <div className="text-red-500">{formik.errors.RECEIVING_NOTES}</div>
            ) : null} */}
          {/* </form> */}
        </div>

    </div>
  );
};

export default ReceivingForm;

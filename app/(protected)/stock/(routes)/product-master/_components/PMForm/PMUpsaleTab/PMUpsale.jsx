import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useDispatch, useSelector } from "react-redux";
import AddUpSale from "./customComponents/AddUpSale";
import EditUpSale from "./customComponents/EditUpSale";
// import EditCustomer from "./customComponents/EditCustomer";
// import EditCode from "./customComponents/EditCode";
// import CustMoreOption from "./customComponents/CustMoreOption";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";

import { closeModal, setGetUpsale } from "../../../redux/pmSlice";

const PMUpsale = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);
  const getUpsale = useSelector((state) => state.pmSlices.getUpsale);
  const [getRelatedData, setGetRelatedData] = useState([]);
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const payload = {
    data: {
      PAR_ID: editDetForm?.PAR_ID,
    },
    action: "Administration",
    method: "PostRelatedProduct",
    username: "SALES",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (editDetForm?.PAR_ID) {
      sendRequest(
        ItemMaster.GetRelatedProductList,
        "POST",
        payload,
        (data) => {
          dispatch(setGetUpsale(data?.Result));
        },
        token
      );
    }
  }, [editDetForm]);
  useEffect(() => {
    setGetRelatedData(getUpsale);
  }, [getUpsale]);
  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "SKU",
      slector: "CODE",
      customComp: EditUpSale,
      Wid: 150,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      //   customComp: EditCode,
      Wid: 120,
    },
    {
      title: "Cost",
      slector: "STANDARD_COST",
      //   customComp: EditCode,
      Wid: 120,
    },
    {
      title: "Price",
      slector: "PRICE",
      //   customComp: EditCode,
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
  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["x"], onKeyPress);
  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-1 w-full bg-gray-100"></div>
        <GridTable
          head={head}
          row={getRelatedData}
          setHead={setHead}
          GridTitle="UpSale"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddUpSale}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          //   MoreOption={CustMoreOption}
          //   MoreOpt={CustMoreOption}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default PMUpsale;

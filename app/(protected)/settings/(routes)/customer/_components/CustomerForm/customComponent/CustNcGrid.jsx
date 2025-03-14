import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useSelector } from "react-redux";
import CustListPrice from "./CustListPrice";
import CustPartPriceGridPagination from "./CustPartPriceGridPagination";
import Loading from "../../../../../../../../components/misc/loader/loading";

const CustNcGrid = () => {
  const [row, setRow] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [loading, setLoading] = useState(true);
  const partPriceOverrideList = useSelector(
    (state) => state.customerSlice.partPriceOverrideList
  );
  const filteredNC = partPriceOverrideList.filter(
    (item) => item.BOLTON_FLAG === "N"
  );
  useEffect(() => {
    setLoading(false);
  }, [filteredNC]);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "SKU",
      slector: "SKU",

      Wid: 150,
    },

    {
      title: "Details",
      slector: "SKU_DESCRIPTION",

      Wid: 120,
    },
    {
      title: "MSRP",
      slector: "MSRP",

      Wid: 120,
    },
    {
      title: "List Price",
      slector: "LIST_PRICE",
      customComp: CustListPrice,
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
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between bg-white mb-2 rounded-t-md">
      {loading == true && <Loading />}
      <div>
        <GridTable
          head={head}
          row={filteredNC}
          setHead={setHead}
          GridColor="#4ade80"
          GridColaps={true}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          GriddFooterAdd={CustPartPriceGridPagination}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default CustNcGrid;

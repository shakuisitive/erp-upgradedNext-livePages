import React, { useEffect, useState } from "react";
import Loading from "../../../../../../../../components/misc/loader/loading";
import { useSelector } from "react-redux";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import BranchWarehouseStatus from "./BranchWarehouseStatus";
const BranchWarehouse = () => {
  const [row, setRow] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [loading, setLoading] = useState(true);
  const warehouseList = useSelector((state) => state.branchSlice.warehouse);
  useEffect(() => {
    setLoading(false);
  }, [warehouseList]);

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Warehouse",
      slector: "WAREHOUSE_CODE",

      Wid: 150,
    },

    {
      title: "Description",
      slector: "DESCRIPTION",

      Wid: 120,
    },
    {
      title: "Address",
      slector: "ADDRESS_1",

      Wid: 120,
    },
    {
      title: "City",
      slector: "CITY",
      //   customComp: CustListPrice,
      Wid: 120,
    },
    {
      title: "City",
      slector: "CITY",
      Wid: 120,
    },
    {
      title: "Status",
      slector: "Status",
      Status: BranchWarehouseStatus,
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
          row={warehouseList}
          setHead={setHead}
          GridColor="#4ade80"
          GridColaps={true}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={false}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default BranchWarehouse;

import React from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { closeModal } from "../../../_redux/chartSlice";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import { Inventory } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import Loading from "../../../../../../../../components/misc/loader/loading";
export default function ChartBudget() {
  // const [name, setName] = useState([]);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let [aPIProp, setAPIProp] = useState([]);

  const chartAcountOverride = useSelector(
    (state) => state.ChartSlice.chartAcountOverride
  );
  // const custList = chartAcountOverride.filter((item) => item.CUS_ID !== null);

  // const [row, setRow] = useState([]);
  const accessToken = useSelector((state) => state.ChartSlice.tokenSession);
  const accountIDss = useSelector((state) => state.ChartSlice.accountIDss);
  const names = useSelector((state) => state.ChartSlice.names);
  const purposedBudget = useSelector(
    (state) => state.ChartSlice.purposedBudget
  );
  const currentBudget = useSelector((state) => state.ChartSlice.currentBudget);
  let divisiblepurposed = purposedBudget / 12;
  let divisibleCurrent = currentBudget / 12;
  let remaining = purposedBudget - currentBudget;
  let divisibleRemaining = remaining / 12;
  let EqaulyRemaining = divisibleRemaining + divisiblepurposed;

  const [isChecked, setIsChecked] = useState(false);
  const [row, setRow] = useState([]);

  // Updating the row data based on checkbox state
  useEffect(() => {
    const updatedRow = row.map((item) => {
      return {
        ...item,
        purposed: isChecked ? EqaulyRemaining : divisiblepurposed, // Toggle between the two values
      };
    });
    setRow(updatedRow); // Update the state with the new row data
  }, [isChecked]); // Runs when isChecked state changes

  const handleChangeCheckbox = () => {
    // Toggle the checkbox state
    setIsChecked(!isChecked);
  };

  const chartBudgetList = useSelector(
    (state) => state.ChartSlice.chartBudgetList
  );
  useEffect(() => {
    setLoading(false);
  }, [chartBudgetList]);

  useEffect(() => {
    const a = [
      {
        month: "january",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "February",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "March",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "April",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "May",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "June",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "July",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "August",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "September",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "October",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "November",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
      {
        month: "December",
        purposed: divisiblepurposed,
        current: divisibleCurrent,
        actual: divisibleCurrent,
      },
    ];
    setRow(a);
  }, []);

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    {
      title: "Period",
      slector: "month",
      wid: 150,
      // customComp:
    },
    {
      title: "Proposed",
      slector: "purposed",
      // customComp: EditCode,
      Wid: 120,
    },
    {
      title: "Curent",
      slector: "current",
      // customComp: EditCode,
      Wid: 120,
    },
    {
      title: "Actual",
      slector: "current",
      // customComp: EditCode,
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
  const handleGetPartDetList = (data) => {
    setData(data.Result || data.Results);
    const dataToUse = data?.Result || data?.Results;
    const dataInActive = dataToUse?.filter((item) => {
      return item.ACTIVE_FLAG === "N";
    });

    const dataActive = dataToUse.filter((item) => {
      return item.ACTIVE_FLAG == "Y";
    });

    setActiveData(dataActive);
    setInactiveData(dataInActive);
  };
  useKeyPress(["x"], onKeyPress);
  //Payloads
  const payload = {
    data: {
      BUDGET_ID: "",
      GLACC_ID: "1252088",
      PROPOSED_BUDGET: "148700",
      CURRENT_BUDGET: "1200",
      USED_ID: null,
      CUR_ID: "120187391",
      APPROVAL_FLAGE: "N",
      DISTRIBUTE_MONTHLY_EQUAL: "N",
      DESCRIPTION: "DESC12345",
      ACTIVE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "PostGlBudget",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: Inventory.PostGlBudget,
          payload: payload,
          func: handleGetPartDetList,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);
  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        {" "}
        <div className="flex flex-row justify-evenly text-gray-500">
          <div className="flex flex-col gap-y-5 m-10">
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">GL Account</p>
              <p>{accountIDss}</p>
            </div>
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">Name</p>
              <p>{names}</p>
            </div>
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">Proposed Budget</p>
              <p>{purposedBudget}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5 m-10">
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">Current Budget</p>
              <p>{currentBudget}</p>
            </div>
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">Actual</p>
              <p>{currentBudget}</p>
            </div>
            <div className="flex flex-row gap-14 mx-10 justify-between">
              <p className="font-semibold">Remaining</p>
              <p>{remaining}</p>
            </div>
          </div>
        </div>
        <div className="py-1 w-full bg-gray-100"></div>
        <div className=" flex justify-between items-center mx-10">
          <h2 className="font-bold text-[19px] my-[10px]">Budget</h2>
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChangeCheckbox}
              className="text-[20px] w-[25px]"
            />
            Distribute Remaining ammount equaly
          </div>
        </div>
        <GridTable
          head={head}
          row={row}
          // setRow{setRow},
          setHead={setHead}
          // GridTitle="Customer Part"s
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          // GriddFooterAdd={AddCustomer}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          // MoreOption={CustMoreOption}
          // MoreOpt={CustMoreOption}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
}

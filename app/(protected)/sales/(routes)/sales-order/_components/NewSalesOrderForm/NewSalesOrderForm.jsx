import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SalesOrderFormLeft from "./Header/SalesOrderFormLeft";
import SalesOrderFormRight from "./Header/SalesOrderFormRight";
import NewSalesOrderGrid from "./Header/NewSalesOrderGrid";
import NewSalesOrderKitGrid from "./Header/NewSalesOrderKitGrid";
import CustomScrollBar from "../../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import NewSalesOrderTotal from "./NewSalesOrderTotal";

const NewSalesOrderForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [isKit, setIsKit] = useState(false);
  const activeGridRef = useRef(null);
  const compGridRef = useRef(null);
  const [scrollChange, setScrollChange] = useState(1);

  const handleNew = () => {};

  useEffect(() => {
    const activeGridContainer = activeGridRef.current;
    const compGridContainer = compGridRef.current;

    if (!activeGridContainer || !compGridContainer) return;

    const handleOverflowChange = (entries) => {
      setScrollChange((prev) => prev + 1);
    };

    const resizeObserver = new ResizeObserver(handleOverflowChange);

    resizeObserver.observe(activeGridContainer);
    resizeObserver.observe(compGridContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md  bg-white p-2  "
      >
        <div className="py-2 ml-[40px]">
          <DropdownMenu label="Apply" handleClick={handleNew} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className=" bg-white  h-[98%] overflow-auto  ">
          <div className="">
            <div className="ml-[58px] my-4">
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
                    <SalesOrderFormLeft />
                  </div>
                  <div className="w-1/2">
                    <SalesOrderFormRight />
                  </div>
                </div>
              </div>
            )}
          </div>
          <CustomScrollBar
            change={scrollChange}
            refsArray={[activeGridRef, compGridRef]}
          >
            <div
              ref={activeGridRef}
              className={` overflow-x-hidden mt-1 h-fit `}
            >
              <NewSalesOrderGrid />
            </div>
            <div
              ref={compGridRef}
              className={`  my-2 overflow-y-auto overflow-x-hidden  h-fit max-h-[450px]   `}
            >
              {!isKit && (
                <div className="ml-[58px] my-4">
                  <button
                    className="poppins flex gap-2 text-[14px] text-white rounded-md leading-[27px] font-medium items-center p-2 bg-[#4ade80]"
                    onClick={() => setIsKit(!isKit)}
                  >
                    Add Kit
                  </button>
                </div>
              )}

              {isKit && <NewSalesOrderKitGrid />}
            </div>
          </CustomScrollBar>
        </div>
        <div className="flex justify-end mt-4 ml-10">
          <div className="w-[15%]">
            <NewSalesOrderTotal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSalesOrderForm;

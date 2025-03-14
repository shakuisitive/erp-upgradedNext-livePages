import React, { useEffect, useState } from "react";
import FilterTabs from "./FilterTabs";

import { FiFilter } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import GridTable from "../pureComponents/GridTable/GridTable";
import PdfModal from "../pureComponents/modal/PdfModal";
import CustomScrollBar from "../pureComponents/multiScroll/CustomScrollBar";
import { setSubGridLCostTotal } from "../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";
const OrderDetails = ({
  gridArr,
  pdfModal,
  setPdfModal,
  pdf,
  setPdf,
  refArray,
  scroll,
  defColmn,
  setDefColmn,
  filterTabs,
  OrderNumber,
  OrderDate,
  Form,
  MinForm,
}) => {
  const [resetSearch, setResetSearch] = useState(false);
  const [isOpenF, setIsOpenF] = useState(false);

  let [hideColumnDef, setHideColumnDef] = useState();
  const dispatch = useDispatch();

  const handleSearch = () => {};

  const handleFilterM = () => {};
  const handleHidden = (e) => {
    setDefColmn(e);
  };

  const tabs = {
    actionBtn: {
      option: filterTabs?.actionBtn?.option,
      label: filterTabs?.actionBtn?.label,
      icon: filterTabs?.actionBtn?.icon,
      onClick: filterTabs?.actionBtn?.onClick,
    },

    search: {
      handleSearch: handleSearch,
      resetSearch: resetSearch,
      setResetSearch: setResetSearch,
    },
    sort: {},
    filter: {
      popup: {
        icon: FiFilter,
        wid: "1200px",
        lable: "Filter",
      },
      setIsOpen: setIsOpenF,
      handleFilter: handleFilterM,
    },
    hide: {
      popup: {
        icon: BiHide,
        wid: "360px",
        lable: "Hide",
      },
      Value: defColmn,
      handleHidden: handleHidden,
      defaultVal: hideColumnDef,
    },
    navigator: {},
  };

  useEffect(() => {
    let LCst = 0;
    let NetCT = 0;
    let TDis = 0;
    let CostT = 0;
    let OhQnt = 0;
    let OqT = 0;
    let CaseV = 0;
    let Len = gridArr?.data?.Griddata.length;

    if (gridArr?.data?.Griddata) {
      gridArr?.data?.Griddata.forEach((data) => {
        LCst += data?.LAST_COST || 0;
        CostT += data?.COST || 0;
        NetCT += data?.NET_COST || 0;
        TDis += data?.DISCOUNT || 0;
        OhQnt += data?.QTY_ONHAND || 0;
        OqT += data?.QUANTITY || 0;
        CaseV += data?.QUANTITY / data?.CONVERSION_INTO_STOCKING_UOM;
      });
    }
   
    
    const AvDis = TDis / (Len || 1);

    const dataCost = {
      LCost: LCst,
      NetCT: NetCT,
      AvDis: AvDis,
      CostT: CostT,
      OhQnt: OhQnt,
      OqT: OqT,
      CaseV: CaseV,
    };
    dispatch(setSubGridLCostTotal(dataCost));
  }, [ gridArr?.data?.Griddata ,dispatch]);


  return (
    <div className="flex flex-col  h-full">
      <div className="flex h-fit  justify-between gap-2 px-2 my-2 mx-1 bg-white py-2 mb-2 rounded-t-md">
        <div className="grow">
          <FilterTabs
            tabs={tabs}
            //  searchShow={false}
            filterShow={false}
            hideShow={filterTabs?.hideShow}
            //  hideShow={true}
            sortShow={false}
            navigatorShow={false}
            //  filterTool={false}
          />
        </div>
        <div className="grow"></div>
        <div className="flex w-[17%]  min-w-fit justify-end items-center">
          <p className="text-grayBlack text-[16px] leading-[28px] font-normal mr-4">
            Fields with a red asterisk (<span className="text-red-600">*</span>)
            are mandatory
          </p>
        </div>
        <div className="flex-none mr-[45px] ml-[20px] my-1">
          <h2 className="text-customblack text-[24px] leading-[24px] font-normal ">
            {OrderNumber}
          </h2>
          <p className="text-[#6b7280] text-[14px] leading-[24px] font-normal text-right">
            {OrderDate}
          </p>
        </div>
      </div>

      <div className="bg-white flex flex-col grow mx-2">
        <div
          style={{ backgroundColor: gridArr?.title?.GridColor }}
          className="w-full  pt-[3px]"
        ></div>

        <div>
          <CustomScrollBar change={scroll} refsArray={refArray}>
            <div
              ref={gridArr?.ref}
              className="w-full  grow overflow-x-hidden bg-white   p-2 pl-0 "
            >
              <GridTable
                head={gridArr?.colmnList?.colmn}
                row={gridArr?.data?.Griddata}
                setHead={gridArr?.colmnList?.setColmn}
                setSubHead={gridArr?.subColumnList?.setSubColmn}
                GridTitle={gridArr?.title?.GridTitle}
                GridColor={gridArr?.title?.GridColor}
                GridColaps={gridArr?.colapsList?.GridColaps}
                colaps={gridArr?.colapsList?.colaps}
                setColaps={gridArr?.colapsList?.setColaps}
                colapsfunc={gridArr?.colapsList?.colapsfunc}
                addButton={gridArr?.footerComp?.addFooterComp}
                GriddFooterAdd={gridArr?.footerComp?.GriddFooterAdd}
                selectedRow={gridArr?.checkBox?.selectedRow}
                MoreOption={gridArr?.MoreOption}
                isChecked={gridArr?.checkBox?.checked}
                handleCheckboxChange={gridArr?.checkBox?.handleCheckboxChange}
                MoreOpt={gridArr?.MoreOption}
                setEdite={gridArr?.setEdite}
                setHActive={gridArr?.subGridActive?.setHActive}
                hActive={gridArr?.hActive}
                checkBoxShow={false}
              />
            </div>
          </CustomScrollBar>
        </div>
      </div>
      {pdfModal && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )}
    </div>
  );
};

export default OrderDetails;

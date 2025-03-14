"use client";
import Refresh from "../../../../../components/misc/pureComponents/refresh/refresh";
import Export from "../../../../../components/misc/pureComponents/export/Export";
import Tabs from "../../../../../components/misc/pureComponents/tabs/Tabs";
import ArrowNavigator from "../../../../../components/misc/pureComponents/arrowNavigator/ArrowNavigator";
// import { useHookDispatch } from "../../../../../customHook/useHookDispatch";
// import { tabChangeHandle } from "../../redux/Sales.actions";

const SalesMainTab = (props) => {
//   const dispatch = useDispatch();
    // const dispatch = useHookDispatch();

  const handleTabChange = (tab) => {
    // alert
    // dispatch(tabChangeHandle(tab, props?.screen));
  };

  return (
    <div className="w-full mx-auto  border-b-[1px] border-gray-300 text-[14px] text-customblack font-normal">
      <div className="flex items-center justify-between">
        <Tabs tab={props?.tabs ?? []} onChange={handleTabChange} />
        {/* 2nd  */}
        <div className="flex gap-[30px]">
          <Refresh />
          <div className="flex items-center gap-2">
            <div className="h-[30px] w-[180px] flex justify-center items-center">
              <Export />
            </div>

            <ArrowNavigator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesMainTab;

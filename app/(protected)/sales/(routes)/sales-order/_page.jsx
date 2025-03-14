import dynamic from "next/dynamic";
import { GoHome } from "react-icons/go";

const SalesHeader = dynamic(
  () => import("../../_components/salesHeader/SalesHeader"),
  {
    ssr: false,
  }
);

const SalesOrderBody = dynamic(
  () => import("./_components/salesOrderMainListing/SalesOrderBody"),
  {
    ssr: false,
  }
);
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);

export default function Purchase() {
  return (
    <div>
      <MainHeader heading="Sales Order" ptext="Dummy text" />

      <div className="overflow-auto w-full">
        <SalesOrderBody />
      </div>
    </div>
  );
}

import dynamic from "next/dynamic";

const PurchaseBody2 = dynamic(() => import("./_components/PurchaseBody2"), {
  ssr: false,
});

const PurchaseMHeader = dynamic(
  () => import("./_components/purchaseTopNav/PurchaseMHeader"),
  {
    ssr: false,
  }
);

export default function Purchase() {
  return (
    <div className="h-[93vh] pb-5 flex flex-col">
      <div className="h-fit">
        <PurchaseMHeader
          heading="Purchase Order"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>

      <div className="overflow-auto w-full">
        <PurchaseBody2 />
      </div>
    </div>
  );
}

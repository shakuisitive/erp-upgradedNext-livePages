import React, { useEffect, useState } from "react";
import PMVarianceHeader from "./Header/PMVarianceHeader";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, setEditFormVariance } from "../../../redux/pmSlice";
import PMVarianceColor from "./Header/PMVarianceColor";
import PMVarianceSize from "./Header/PMVarianceSize";
import PMVarianceMaterial from "./Header/PMVarianceMaterial";
import PMVarianceFlavor from "./Header/PMVarianceFlavor";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";

const PMVariance = () => {
  const [pvId, setPvId] = useState();

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  // const [flavors, setFlavors] = useState([
  //   {
  //     pvId: "",
  //     name: "",
  //     image: "File",
  //     imagePreview: "",
  //     mainImage: "File",
  //     mainImagePreview: "",
  //     price: "",
  //     ACTIVE_FLAG: "Y",
  //   },
  // ]);
  const [flavors, setFlavors] = useState([]);

  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const parId = formIndex?.PAR_ID;

  const preparePayload = (items, code) => {
    return items.map((item) => ({
      // PV_ID: item.pvId || "",
      // CODE: code,
      // NAME: item.name,
      // DESCRIPTION: "",
      // NOTES: "",
      // ACTIVE_FLAG: item.ACTIVE_FLAG || "Y",
      // PAR_ID: parId,
      // IMAGE: item.imagePreview,
      // PRICE: item.price,

      ACTIVE_FLAG: item.ACTIVE_FLAG || "Y",
      CODE: code,
      DESCRIPTION: item.default,
      IMAGE: item.imagePreview,
      IMAGE_MAIN: item.mainImagePreview,
      NAME: item.name,
      NOTES: item.color,
      PAR_ID: parId,
      PRICE: item.price,
      PV_ID: item.pvId || "",
      PV_TYPE_ID: "",
    }));
  };

  const flavorPayload = preparePayload(flavors, "flavor");
  const colorPayload = preparePayload(colors, "color");
  const sizePayload = preparePayload(sizes, "size");
  const materialPayload = preparePayload(materials, "material");

  const FPayload = {
    data: [
      ...flavorPayload,
      ...colorPayload,
      ...sizePayload,
      ...materialPayload,
    ],
    action: "Administration",
    method: "PostProductVariance",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handlePostVariance = (data) => {
    if (data.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };

  const handleVariance = () => {
    // console.log("payload: ", FPayload);
    sendRequest(
      Administration.PostProductVariance,
      "POST",
      FPayload,
      handlePostVariance,
      token
    );
  };
  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["x"], onKeyPress);
  return (
    <div className="h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className="flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
      rounded-md bg-white "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleVariance} />
        </div>
        <div className="py-1 w-full bg-gray-100"></div>

        <div className="h-[98%] overflow-x-auto">
          <div className="flex flex-col">
            <PMVarianceFlavor setFlavors={setFlavors} />
            <PMVarianceColor setColors={setColors} />
            <PMVarianceSize setSizes={setSizes} />
            <PMVarianceMaterial setMaterials={setMaterials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMVariance;

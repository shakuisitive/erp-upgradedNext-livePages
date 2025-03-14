import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import ProdCatagoryLeftForm from "./prodCatagoryLeftForm";
import ProdCatagoryRightForm from "./ProdCatagoryRightForm";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Inventory } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshing, closeEditModal } from "../../_redux/prodCategorySlice";

const ProdCatagoryForm = ({codes}) => {
    const [isHeader, setIsHeader] = useState(true);
    const [isError, setIsError] = useState(false);

    const [codeValue, setcodeValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [parentCatagory, setParentCatagory] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [formId, setFormId] = useState("");

    const [img , setImg] = useState("");

    const [brandActive, setBrandActive] = useState(true);
    const [featherActive, setFeatherActive] = useState(false);
    let [error, sendRequest] = useApiFetch();

    const token =
        typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
    const dispatch = useDispatch();
    const ProdCatagoryFormData = useSelector(
        (state) => state.prodCategorySlice.ProdCatagoryFormData
    );

    const ACTIVE =
        ProdCatagoryFormData?.ACTIVE_FLAG === "Y"
            ? true
            : ProdCatagoryFormData?.ACTIVE_FLAG === "N"
                ? false
                : true;

    const payload = {
        CODE: codeValue,
        DESCRIPTION: descriptionValue,
        NAME: nameValue,
        IMAGE: img ? img : "",
        PARCAT_ID: formId ? formId : "",
        USE_ID: "3031",
        ACTIVE_FLAG: brandActive ? "Y" : "N",
        CHILD_LEVEL: null,
        FEATURE_FLAG: featherActive ? "Y" : "N",
        PARCAT_ID_PARENT: parentCatagory,
    };
    const catagoryPostPayload = {
        data: payload,
        action: "InventoryWeb",
        method: "PostPartCategory",
        username: "SALES",
        type: "rpc",
        tid: "144",
    };
    const handlePostSupplier = (data) => {
        dispatch(setRefreshing(true));

        if (data?.CODE === "SUCCESS") {
            dispatch(closeEditModal());
            setFormId("");
        }
    };

    const handleApply = () => {
        // if (
        //     payload?.CODE != "" &&
        //     payload?.CODE != undefined &&
        //     payload?.NAME != "" &&
        //     payload?.NAME != undefined &&
        //     payload?.DESCRIPTION != "" &&
        //     payload?.DESCRIPTION != undefined
        // ) {
            // console.log("RUN >");
            console.log("Image Posted >", img)

            sendRequest(
                Inventory.PostPartCategory,
                "POST",
                catagoryPostPayload,
                handlePostSupplier,
                token
            );
        // } else {
        //     console.log("DON'T RUN >");
        //     setEMessage("Please Fill all Mandatory(*) Fields");
        //     setIsErrorMessage(true);
        //     setIsError(true);
        // }
    };

    useEffect(() => {
        if (ProdCatagoryFormData) {
            setcodeValue(ProdCatagoryFormData?.CODE);
            setNameValue(ProdCatagoryFormData?.NAME);
            setDescriptionValue(ProdCatagoryFormData?.DESCRIPTION);
            setImg(ProdCatagoryFormData?.IMAGE);
            setFormId(ProdCatagoryFormData?.PARCAT_ID);
        }
    }, [ProdCatagoryFormData]);

    // console.log('Edit form data>', formId);

    return (
        <div className="h-[98%] mt-[4px] gap-2 flex rounded-lg">
            <div
                className=" flex flex-col relative  border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
            >
                <div className="py-2 ml-[50px]">
                    <DropdownMenu label="Apply" handleClick={handleApply} />
                </div>

                <div className="py-1 w-full bg-gray-100"></div>
                <div className="h-[98%] overflow-x-auto">
                    <div>
                        <div className="ml-[50px] my-4">
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
                                <div className="flex  px-4 mr-2 gap-4  ">
                                    <div className="w-1/2 ">
                                        <ProdCatagoryLeftForm
                                            codeValue={codeValue}
                                            setcodeValue={setcodeValue}
                                            nameValue={nameValue}
                                            setNameValue={setNameValue}
                                            parentCatagory={parentCatagory}
                                            setParentCatagory={setParentCatagory}
                                            descriptionValue={descriptionValue}
                                            setDescriptionValue={setDescriptionValue}
                                            isError={isError}
                                            setIsError={setIsError}
                                            codes={codes}
                                        />
                                    </div>
                                    <div className="w-1/2 ">
                                        <ProdCatagoryRightForm
                                            brandActive={brandActive}
                                            setBrandActive={setBrandActive}
                                            featherActive={featherActive}
                                            setFeatherActive={setFeatherActive}
                                            image={img}
                                            setImage={setImg}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdCatagoryForm;

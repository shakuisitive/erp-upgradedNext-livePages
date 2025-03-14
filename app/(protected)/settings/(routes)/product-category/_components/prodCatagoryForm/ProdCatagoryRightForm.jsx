import React, { useState } from "react";
import ToggleSwitch from "../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import { ItemMaster } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useSelector } from "react-redux";

const ProdCatagoryRightForm = ({ brandActive, setBrandActive, featherActive, setFeatherActive, image, setImage }) => {
    const [selectedImage, setSelectedImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const formIndex = useSelector((state) => state.prodCategorySlice.formIndex);
    const token = typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

    const baseImageUrl = "http://eutsol.ca:2021/nasdev/images/products/part/";
    const imageUrl = image ? `${baseImageUrl}${image}` : null;

    // Function to handle image change
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            await uploadImage(file);
        }
    };

    const uploadImage = async (file) => {
        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append("AttachNumber", 1);
        formData.append("DistType", "Part");
        formData.append("SeqNumber", "001");
        formData.append("SourceOraSeq", "");
        formData.append("AttachID", "");
        formData.append("GenericJson", "");
        formData.append("Description", "Test");
        formData.append("PAR_ID", "");
        formData.append("USERNAME", "admin");
        formData.append("DEFAULT_FLAG", "N");
        formData.append("inventoryFile", file);

        try {
            const response = await fetch(ItemMaster.PostAttachmentFile, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setImage(data?.FileName);
            } else {
                setUploadError(data.Message || "Failed to upload image");
            }
        } catch (error) {
            setUploadError(error.message || "An error occurred during upload");
        } finally {
            setUploading(false);
        }
    };

    // Handle delete image
    const handleDelete = async () => {
        const deleteAttachmentPayload = {
            data: {
                SOURCEORASEQ: formIndex?.PARCAT_ID,
                ATTACH_NAME: image,
            },
            action: "InventoryWeb",
            method: "DeleteAttachment",
            username: "SALES",
            type: "rpc",
            tid: "144",
        };

        try {
            const response = await fetch(ItemMaster.DeleteAttachment, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deleteAttachmentPayload),
            });

            const data = await response.json();

            if (response.ok) {
                setImage("");
                setUploadError(null);
                setSelectedImage("");
            } else {
                setUploadError(data.Message || "Failed to delete image");
            }
        } catch (error) {
            setUploadError(error.message || "An error occurred during deletion");
        }
    };

    return (
        <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-10 tablet:w-full">
            <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
                <div></div>
                <div className="flex items-center justify-between flex-wrap">
                    <div className="grid grid-cols-[130px_auto]">
                        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                            Active
                        </label>
                        <ToggleSwitch
                            id="active"
                            checked={brandActive}
                            onChange={(e) => setBrandActive(e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
                <div></div>
                <div className="flex items-center justify-between flex-wrap">
                    <div className="grid grid-cols-[130px_auto]">
                        <label className="p-[8px] font-[500] text-[14px]" htmlFor="feather-catagory">
                            Feather Catagory
                        </label>
                        <ToggleSwitch
                            id="catagory"
                            checked={featherActive}
                            onChange={(e) => setFeatherActive(e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[130px_auto] items-center mb-[12px]">
                <label className="text-[14px] font-semibold text-gray-700" htmlFor="image-upload">
                    Upload Logo
                </label>
                <div className="d-flex align-items-center">
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                        Select Logo
                    </label>
                </div>
            </div>

            {/* Show the selected image */}
            {(selectedImage || image) && (
                <div className="mt-4">
                    <h4 className="font-semibold text-[14px]">Brand Logo:</h4>
                    <div className="relative w-32 h-32">
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : imageUrl}
                            alt="Selected Logo"
                            className="w-full h-full object-cover rounded"
                        />
                        <button
                            onClick={handleDelete}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                            title="Remove Image"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Show the upload status */}
            {uploading && <p>Uploading...</p>}
            {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
    );
};

export default ProdCatagoryRightForm;

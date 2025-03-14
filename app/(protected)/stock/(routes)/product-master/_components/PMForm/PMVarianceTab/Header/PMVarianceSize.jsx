import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import PMSizeImage from "./sizeImageUpload/PMSizeImage";
import PMSizeMainImage from "./sizeImageUpload/PMSizeMainImage";
import { useSelector } from "react-redux";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const PMVarianceSize = ({ setSizes }) => {
  const [isHeader, setIsHeader] = useState(true);
  const [thumbPath, setThumbPath] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFlavors, setActiveFlavors] = useState([]);
  const [inactiveFlavors, setInactiveFlavors] = useState([]);

  const variances = useSelector((state) => state.pmSlices.editFormVariance);
  const imageBaseURL =
    process.env.NEXT_PUBLIC_REACT_APP_CDN_PATH + "nasdev/ATTACHMENTS/PART/";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  useEffect(() => {
    const flavors = variances
      .filter((item) => item?.CODE === "size")
      .map((item) => ({
        pvId: item?.PV_ID,
        name: item?.NAME,

        imagePreview: item?.IMAGE,

        mainImagePreview: item?.IMAGE_MAIN,
        price: item?.PRICE,
        active: item?.ACTIVE_FLAG,
      }));
    setSizes(flavors);
    setActiveFlavors(flavors.filter((item) => item.active === "Y"));
    setInactiveFlavors(flavors.filter((item) => item.active === "N"));
  }, [variances]);

  useEffect(() => {
    setSizes([...activeFlavors, ...inactiveFlavors]);
  }, [activeFlavors, inactiveFlavors]);

  const handleImageClick = (imagePreview) => {
    setSelectedImage(imagePreview);
  };

  const handleAddRow = () => {
    setActiveFlavors([
      ...activeFlavors,
      {
        pvId: "",
        name: "",

        imagePreview: "",

        mainImagePreview: "",
        price: "",
        ACTIVE_FLAG: "Y",
      },
    ]);
  };

  const handleDeleteRow = (Index) => {
    const deletedFlavor = activeFlavors.find((_, index) => index === Index);
    setInactiveFlavors([
      ...inactiveFlavors,
      { ...deletedFlavor, ACTIVE_FLAG: "N" },
    ]);
    setActiveFlavors(activeFlavors.filter((_, index) => index !== Index));
  };

  const handleNameChange = (type, e, index) => {
    const value = e?.target?.value;

    setActiveFlavors((prevRows) =>
      prevRows.map((item, ind) => {
        if (ind === index) {
          if (type === "name") {
            return { ...item, name: value };
          }
          if (type === "price") {
            return { ...item, price: value };
          }
        }
        return item;
      })
    );
  };
  const handleFileChange = (payload) => {
    fetch(ItemMaster.PostAttachmentFile, {
      method: "POST",
      body: payload.data,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((res) => {
        if (res?.FileName) {
          let actFlavors = [];
          if (payload.type === "imagePreview") {
            actFlavors = activeFlavors.map((item, index) =>
              index === payload.index
                ? {
                    ...item,
                    imagePreview: res?.FileName,
                    // console.log("filename",res?.File)
                  }
                : item
            );
          }

          setActiveFlavors(actFlavors);
        } else {
          console.log(res);
        }
      });
  };
  const handleMainImage = (payload) => {
    fetch(ItemMaster.PostAttachmentFile, {
      method: "POST",
      body: payload.data,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((res) => {
        if (res?.FileName) {
          let actFlavors = [];
          if (payload.type === "mainImagePreview") {
            actFlavors = activeFlavors.map((item, index) =>
              index === payload.index
                ? {
                    ...item,
                    mainImagePreview: res?.FileName,
                    // console.log("filename",res?.File)
                  }
                : item
            );
          }

          setActiveFlavors(actFlavors);
        } else {
          console.log(res);
        }
      });
  };
  return (
    <div>
      <div className="mb-8">
        <div className="ml-[35px] my-4">
          <button
            className="poppins flex gap-2 text-[16px] leading-[27px] font-medium items-center"
            style={{ color: "#4ade80" }}
            onClick={() => setIsHeader(!isHeader)}
          >
            {isHeader ? (
              <IoIosArrowUp
                className="text-[15px] leading-[27px] font-medium"
                style={{ color: "#4ade80" }}
              />
            ) : (
              <IoIosArrowDown
                className="text-[15px] leading-[27px] font-medium"
                style={{ color: "#4ade80" }}
              />
            )}
            Size
          </button>
        </div>
        {isHeader && (
          <div className="w-fit h-full mx-10 bg-[#E1EFF2] rounded-[6px] border-customgreen border py-20 px-20">
            <div className="grid grid-cols-[1240px_auto]">
              <div className="">
                <div className="grid grid-cols-[346px_150px_142px_150px_142px_190px] mb-4">
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Size
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Image
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Preview
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Image
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Preview
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Price
                  </label>
                </div>

                {activeFlavors.map((row, index) => (
                  <div
                    key={`size-${index}`}
                    className="grid grid-cols-[340px_135px_142px_135px_142px_175px_auto] gap-2 items-center mb-6"
                  >
                    <UseInput
                      type="text"
                      placeholder="Size Name"
                      value={row.name}
                      onChange={(e) => handleNameChange("name", e, index)}
                    />

                    <PMSizeMainImage
                      name="Part"
                      onUpload={handleMainImage}
                      index={index}
                      type="mainImagePreview"
                      filePath={
                        thumbPath
                          ? thumbPath
                          : "https://via.placeholder.com/1000x200"
                      }
                    />

                    <div className="h-[40px] w-[80px] border border-customblack items-center p-1 ml-3">
                      {row.mainImagePreview && (
                        <img
                          src={imageBaseURL + row?.mainImagePreview}
                          alt="Preview"
                          className="w-full h-full cursor-pointer"
                          onClick={() =>
                            handleImageClick(
                              imageBaseURL + row?.mainImagePreview
                            )
                          }
                        />
                      )}
                    </div>
                    <PMSizeImage
                      name="Part"
                      onUpload={handleFileChange}
                      index={index}
                      type="imagePreview"
                      filePath={
                        thumbPath
                          ? thumbPath
                          : "https://via.placeholder.com/1000x200"
                      }
                    />

                    <div className="h-[40px] w-[80px] border border-customblack items-center p-1 ml-3">
                      {row.imagePreview && (
                        <img
                          src={imageBaseURL + row?.imagePreview}
                          alt="Preview"
                          className="w-full h-full cursor-pointer"
                          onClick={() =>
                            handleImageClick(imageBaseURL + row?.imagePreview)
                          }
                        />
                      )}
                    </div>

                    <UseInput
                      type="number"
                      placeholder="Price"
                      value={row.price}
                      onChange={(e) => handleNameChange("price", e, index)}
                    />

                    <button
                      className="ml-4"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <MdDelete className="text-[18px] text-customblack hover:text-red-400" />
                    </button>
                  </div>
                ))}

                <div className="flex-col mt-2 text-customblack">
                  <span onClick={handleAddRow} className="hover:text-blue-400">
                    + Add
                  </span>
                </div>
              </div>
              <div className="">
                <div className="h-[16rem] w-[16rem] mt-[30px] bg-white flex items-center justify-center p-2 relative border border-customgreen ">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-500 text-center">Preview</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PMVarianceSize;

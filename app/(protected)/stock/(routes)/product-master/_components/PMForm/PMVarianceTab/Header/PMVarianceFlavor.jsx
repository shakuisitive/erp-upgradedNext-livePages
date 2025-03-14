import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { GrAttachment } from "react-icons/gr";
import { useSelector } from "react-redux";
import PMVarianceImageUpload from "../PMVarianceImageUpload";
import PMVarianceMainImage from "../PMVarianceMainImage";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import CheckBox from "../../../../../../../../../components/misc/pureComponents/textinput/checkbox/CheckBox";

// import PMVarianceImageUploader from "../PMVarianceImageUpload";
const PMVarianceFlavor = ({ setFlavors, initialFlavors }) => {
  const [isHeader, setIsHeader] = useState(true);
  const [thumbPath, setThumbPath] = useState([]);
  const [flavorImagePreview, setFlavorImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFlavors, setActiveFlavors] = useState([]);
  const [inactiveFlavors, setInactiveFlavors] = useState([]);
  const [files, setFiles] = useState([]);
  const imageBaseURL =
    process.env.NEXT_PUBLIC_REACT_APP_CDN_PATH + "nasdev/ATTACHMENTS/PART/";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const variances = useSelector((state) => state.pmSlices.editFormVariance);
  useEffect(() => {
    const flavors = variances
      .filter((item) => item?.CODE === "flavor")
      .map((item) => ({
        pvId: item?.PV_ID,
        name: item?.NAME,
        imagePreview: item?.IMAGE,
        mainImagePreview: item?.IMAGE_MAIN,
        price: item?.PRICE,
        active: item?.ACTIVE_FLAG,
        default: item?.DESCRIPTION,
        color: item?.NOTES,
      }));
    setFlavors(flavors);
  console.log("active Flavor: ", flavors);

    setActiveFlavors(flavors.filter((item) => item.active === "Y"));
    setInactiveFlavors(flavors.filter((item) => item.active === "N"));
  }, [variances]);

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

  useEffect(() => {
    setFlavors([...activeFlavors, ...inactiveFlavors]);
  }, [activeFlavors, inactiveFlavors]);

  const handleImageClick = (imagePreview) => {
    setSelectedImage(imagePreview);
  };
// console.log("active flavors: ",activeFlavors)
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
        notes: "#000000",
        default: "",
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
    const checked = e?.target?.checked;

    if (type === "default") {
      setActiveFlavors(
        activeFlavors.map((item, fIndex) =>
          index === fIndex
            ? { ...item, default: item.default === "Y" ? "N" : e }
            : { ...item, default: "N" }
        )
      );
    }
    if (type === "name") {
      setActiveFlavors(
        activeFlavors.map((item, fIndex) =>
          index === fIndex ? { ...item, name: value } : item
        )
      );
    }

    if (type === "color") {
      setActiveFlavors(
        activeFlavors.map((item, fIndex) =>
          index === fIndex ? { ...item, color: value } : item
        )
      );
    }

    if (type === "price") {
      setActiveFlavors(
        activeFlavors.map((item, fIndex) =>
          index === fIndex ? { ...item, price: value } : item
        )
      );
    }
    // setActiveFlavors((prevRows) =>
    //   prevRows.map((item, ind) => {
    //     if (ind === index) {
    //       if (type === "name") {
    //         return { ...item, name: value };
    //       }
    //       if (type === "price") {
    //         return { ...item, price: value };
    //       }
    //       // if (type === "default") {
    //       //   // If it's the selected item, toggle default to "Y" or "N"
    //       //   if (ind === index) {
    //       //     return { ...item, default: e=== "Y" ? "Y" : "N" }; // Update the clicked item
    //       //   } else {
    //       //     return { ...item, default: "N" }; // Set default to "N" for all other items
    //       //   }
    //       // }

    //       // if (type === "default") {
    //       //   return index === ind
    //       //   ? { ...item, default: item.default === "Y" ? "N" : e }
    //       //   : { ...item, default: "N" };
    //       // }
    //     }
    //     return item;
    //   })
    // );
  };
  // console.log("payload: ", activeFlavors);

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
            Flavor
          </button>
        </div>
        {isHeader && (
          <div className="w-fit h-full mx-10 bg-[#E1EFF2] rounded-[6px] border-customgreen border py-20 px-20">
            <div className="grid grid-cols-[1420px_auto]">
              <div className="">
                <div className="grid grid-cols-[85px_346px_150px_142px_150px_142px_135px_165px] mb-4">
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Default
                  </label>
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    Flavor
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
                    Color Variant
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
                    key={`flavor-${index}`}
                    className="grid grid-cols-[85px_340px_135px_142px_135px_142px_120px_175px_auto] gap-2 items-center mb-6"
                  >
                    <input
                  type="checkbox"
                  checked={row?.default === "Y" ? true : false}
                  onChange={() =>
                    handleNameChange( "default", "Y", index )
                  }
                />
                    {/* <div className="pl-2 pt-2">
                      
                      
                      <CheckBox checked={row.default === "Y"}
                        
                       
                  onChange={() =>
                    handleNameChange("default", "Y", index)
                  }/>
                    </div> */}

                    <UseInput
                      type="text"
                      placeholder="Flavor Name"
                      value={row.name}
                      onChange={(e) => handleNameChange("name", e, index)}
                    />
                    <PMVarianceImageUpload
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
                          alt="Main Preview"
                          className="w-full h-full cursor-pointer"
                          onClick={() =>
                            handleImageClick(
                              imageBaseURL + row?.mainImagePreview
                            )
                          }
                        />
                      )}
                    </div>
                    {/* <PMVarianceImageUpload
                      name="Part"
                      onUpload={handleMainImage}
                      index={index}
                      type="imagePreview"
                      filePath={
                        thumbPath
                          ? thumbPath
                          : "https://via.placeholder.com/1000x200"
                      }
                    /> */}
                    <PMVarianceMainImage
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
                    <div className="flex justify-center items-center line-clamp-1 pr-2 w-full h-full  text-[14px] ">
                      <input
                        type="color"
                        value={row?.color}
                        // onChange={handleChange}
                        onChange={(e) => handleNameChange("color", e, index)}

                        // onBlur={handleOnBlur}
                        className=" w-full h-[40px] cursor-pointer"
                      />
                    </div>
                    {/* <UseInput
                      type="text"
                      placeholder="Flavor Name"
                      value={row.name}
                      onChange={(e) => handleNameChange("name", e, index)}
                    /> */}
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

export default PMVarianceFlavor;

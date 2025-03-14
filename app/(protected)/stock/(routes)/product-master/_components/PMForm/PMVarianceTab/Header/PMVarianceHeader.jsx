import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { GrAttachment } from "react-icons/gr";

const PMVarianceHeader = ({
  HTitle,
  HTitleflavor,
  onUpdatedRow,
  flavor,
  setFlavor,
}) => {
  const [isHeader, setIsHeader] = useState(true);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  //   const [flavor, setflavor] = useState([
  //     { name: "", image: null, imagePreview: "", price: "" },
  //   ]);
  const hiddenFileInput = useRef(null);

  const handleImageClick = (imagePreview) => {
    setSelectedImage(imagePreview);
  };

  const handleAddRow = () => {
    setFlavor([
      ...flavor,
      { name: "", image: null, imagePreview: "", price: "" },
    ]);
    if (onUpdatedRow) {
      onUpdatedRow(flavor);
    }
  };

  const handleDeleteRow = (index) => {
    setFlavor((prevRows) => prevRows.filter((_, ind) => ind !== index));
    if (onUpdatedRow) {
      onUpdatedRow(flavor);
    }
  };

  const handleNameChange = (type, e, index) => {
    const value = e?.target?.value;
    const file = e?.target?.files?.[0];

    setFlavor((prevRows) =>
      prevRows.map((item, ind) => {
        if (ind === index) {
          if (type === "name") {
            return { ...item, name: value };
          }
          if (type === "price") {
            return { ...item, price: value };
          }
          if (type === "image" && file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFlavor((prevRows) =>
                prevRows.map((item, ind) =>
                  ind === index
                    ? {
                        ...item,
                        imagePreview: reader.result,
                        image: file,
                      }
                    : item
                )
              );
            };
            reader.readAsDataURL(file);
          }
        }
        return item;
      })
    );
  };
  console.log("checking rows flavor ", flavor);

  return (
    <div>
      <div className="mb-8">
        <div className="ml-[35px] my-4">
          <button
            className="poppins flex gap-2 text-[16px] leading-[27px] font-medium items-center"
            style={{ flavor: HTitleflavor || "#4ade80" }}
            onClick={() => setIsHeader(!isHeader)}
          >
            {isHeader ? (
              <IoIosArrowUp
                className="text-[15px] leading-[27px] font-medium"
                style={{ color: HTitleflavor || "#4ade80" }}
              />
            ) : (
              <IoIosArrowDown
                className="text-[15px] leading-[27px] font-medium"
                style={{ color: HTitleflavor || "#4ade80" }}
              />
            )}
            flavor
          </button>
        </div>
        {isHeader && (
          <div className="w-fit h-full mx-10 bg-[#E1EFF2] rounded-[6px] border-customgreen border py-20 px-20">
            <div className="grid grid-cols-[1000px_auto]">
              <div className="">
                <div className="grid grid-cols-[346px_150px_142px_190px] mb-4">
                  <label
                    className="p-[8px] font-[500] text-[18px]"
                    htmlFor="code"
                  >
                    flavor
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

                {flavor.map((row, index) => (
                  <div
                    // key={`${index}`}
                    className="grid grid-cols-[340px_135px_142px_175px_auto] gap-2 items-center mb-6"
                  >
                    <UseInput
                      type="text"
                      placeholder="flavor Name"
                      value={row.name}
                      onChange={(e) => handleNameChange("name", e, index)}
                    />

                    <div className="flex bg-white px-2 py-2 items-center gap-2">
                      <GrAttachment className="text-[18px] text-customblack" />
                      <label
                        htmlFor={`flavor-image-${index}`}
                        className="filesLabel items-center cursor-pointer text-[14px] text-customblack"
                      >
                        Add File
                      </label>
                      <input
                        type="file"
                        id={`flavor-image-${index}`}
                        name={`flavor-image-${index}`}
                        style={{ display: "none" }}
                        onChange={(e) => handleNameChange("image", e, index)}
                      />
                    </div>

                    <div className="h-[40px] w-[80px] border border-customblack items-center p-1 ml-3">
                      {row.imagePreview && (
                        <img
                          src={row.imagePreview}
                          alt="Preview"
                          className="w-full h-full cursor-pointer"
                          onClick={() => handleImageClick(row.imagePreview)}
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

export default PMVarianceHeader;

// import { useEffect, useRef, useState } from "react";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
// import { GrAttachment } from "react-icons/gr";

// const PMVarianceHeader = ({
//   HTitle,
//   HTitleflavor,
//   onUpdatedRow,
//   flavor,
//   setFlavor,
// }) => {
//   const [isHeader, setIsHeader] = useState(true);
//   const [currentRowId, setCurrentRowId] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   // const [rows, setRows] = useState(initialRow);
//   const hiddenFileInput = useRef(null);

//   // useEffect(() => {
//   //   setRows(rows);

//   //   // if (onUpdatedRow) {
//   //   // }
//   // }, [rows]);
//   const handleImageClick = (imagePreview) => {
//     setSelectedImage(imagePreview);
//   };

//   const handleAddRow = () => {
//     setFlavor([
//       ...flavor,
//       { name: "", image: null, imagePreview: "", price: "" },
//     ]);
//     if (onUpdatedRow) {
//       onUpdatedRow(flavor);
//     }
//   };

//   const handleDeleteRow = (index) => {
//     setFlavor((prevRows) => prevRows.filter((_, ind) => ind !== index));
//     if (onUpdatedRow) {
//       onUpdatedRow(flavor);
//     }
//   };

//   const handleNameChange = (type, e, index) => {
//     const value = e?.target?.value;
//     const file = e?.target?.files?.[0];

//     setFlavor((prevRows) =>
//       prevRows.map((item, ind) => {
//         if (ind === index) {
//           if (type === "name") {
//             return { ...item, name: value };
//           }
//           if (type === "price") {
//             return { ...item, price: value };
//           }
//           if (type === "image" && file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               setFlavor((prevRows) =>
//                 prevRows.map((item, ind) =>
//                   ind === index
//                     ? {
//                         ...item,
//                         imagePreview: reader.result,
//                         image: file,
//                       }
//                     : item
//                 )
//               );
//             };
//             reader.readAsDataURL(file);
//           }
//         }
//         return item;
//       })
//     );
//   };
//   console.log("checking rows flavor ", flavor);
//   // const handleNameChange = (type, e, index) => {
//   //   const value = e?.target?.value;
//   //   const files = e?.target?.files?.[0];

//   //   setRows((prevRows) =>
//   //     prevRows.map((item, ind) => {
//   //       if (ind === index) {
//   //         if (type === "name") {
//   //           return { ...item, name: value };
//   //         }
//   //         if (type === "price") {
//   //           return { ...item, price: value };
//   //         }
//   //         // if (type === "image" && files) {
//   //         //   const reader = new FileReader();
//   //         //   reader.onloadend = () => {
//   //         //     setRows((prevRows) =>
//   //         //       prevRows.map((item, ind) =>
//   //         //         ind === index
//   //         //           ? {
//   //         //               ...item,
//   //         //               imagePreview: reader.result,
//   //         //               image: files,
//   //         //             }
//   //         //           : item
//   //         //       )
//   //         //     );
//   //         //   };
//   //         //   reader.readAsDataURL(files);
//   //         // }
//   //         if (type === "image") {
//   //           const file = e.target.files[0];
//   //           if (file) {
//   //             const reader = new FileReader();
//   //             reader.onloadend = () => {
//   //               setRows(
//   //                 rows.map((item) =>
//   //                   ind === index
//   //                     ? { ...item, image: file, imagePreview: reader?.result }
//   //                     : item
//   //                 )
//   //               );
//   //             };
//   //             reader.readAsDataURL(file);
//   //           }
//   //         }
//   //       }
//   //       return item;
//   //     })
//   //   );
//   // };

//   return (
//     <div>
//       <div className="mb-8">
//         <div className="ml-[35px] my-4">
//           <button
//             className="poppins flex gap-2 text-[16px] leading-[27px] font-medium items-center"
//             style={{ color: HTitleColor || "#4ade80" }}
//             onClick={() => setIsHeader(!isHeader)}
//           >
//             {isHeader ? (
//               <IoIosArrowUp
//                 className="text-[15px] leading-[27px] font-medium"
//                 style={{ color: HTitleColor || "#4ade80" }}
//               />
//             ) : (
//               <IoIosArrowDown
//                 className="text-[15px] leading-[27px] font-medium"
//                 style={{ color: HTitleColor || "#4ade80" }}
//               />
//             )}
//             Flavor
//           </button>
//         </div>
//         {isHeader && (
//           <div className="w-fit h-full mx-10 bg-[#E1EFF2] rounded-[6px] border-customgreen border py-20 px-20">
//             <div className="grid grid-cols-[1000px_auto]">
//               <div className="">
//                 <div className="grid grid-cols-[346px_150px_142px_190px] mb-4">
//                   <label
//                     className="p-[8px] font-[500] text-[18px]"
//                     htmlFor="code"
//                   >
//                     Flavor
//                   </label>
//                   <label
//                     className="p-[8px] font-[500] text-[18px]"
//                     htmlFor="code"
//                   >
//                     Image
//                   </label>
//                   <label
//                     className="p-[8px] font-[500] text-[18px]"
//                     htmlFor="code"
//                   >
//                     Preview
//                   </label>
//                   <label
//                     className="p-[8px] font-[500] text-[18px]"
//                     htmlFor="code"
//                   >
//                     Price
//                   </label>
//                 </div>
//                 {flavor.map((row, index) => (
//                   <div
//                     // key={index}
//                     className="grid grid-cols-[340px_135px_142px_175px_auto] gap-2 items-center mb-6"
//                   >
//                     <UseInput
//                       type="text"
//                       placeholder="Flavor Name"
//                       value={row.name}
//                       onChange={(e) => handleNameChange("name", e, index)}
//                     />

//                     <div className="flex bg-white px-2 py-2 items-center gap-2">
//                       <GrAttachment className="text-[18px] text-customblack" />
//                       <label
//                         htmlFor={`image${index}`}
//                         className="filesLabel items-center cursor-pointer text-[14px] text-customblack"
//                       >
//                         Add File
//                       </label>
//                       <input
//                         type="file"
//                         id={`image${index}`}
//                         name={`image${index}`}
//                         style={{ display: "none" }}
//                         onChange={(e) => handleNameChange("image", e, index)}
//                       />
//                     </div>

//                     <div className="h-[40px] w-[80px] border border-customblack items-center p-1 ml-3">
//                       {row.imagePreview && (
//                         <img
//                           src={row.imagePreview}
//                           alt="Preview"
//                           className="w-full h-full  cursor-pointer"
//                           onClick={() => handleImageClick(row.imagePreview)}
//                         />
//                       )}
//                     </div>

//                     <UseInput
//                       type="number"
//                       placeholder="Price"
//                       value={row.price}
//                       onChange={(e) => handleNameChange("price", e, index)}
//                     />

//                     <button
//                       className="ml-4"
//                       onClick={() => handleDeleteRow(index)}
//                     >
//                       <MdDelete className="text-[18px] text-customblack hover:text-red-400" />
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex-col mt-2 text-customblack">
//                   <span onClick={handleAddRow} className="hover:text-blue-400">
//                     + Add
//                   </span>
//                 </div>
//               </div>
//               <div className="">
//                 <div className="h-[16rem] w-[16rem] mt-[30px] bg-white flex items-center justify-center p-2 relative border border-customgreen ">
//                   {selectedImage ? (
//                     <img
//                       src={selectedImage}
//                       alt="Selected Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <p className="text-gray-500 text-center">Preview</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PMVarianceHeader;

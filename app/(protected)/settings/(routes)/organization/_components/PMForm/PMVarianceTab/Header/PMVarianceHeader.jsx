import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";


const PMVarianceHeader = ({ HTitle,HTitleColor, onUpdatedRow }) => {
    // console.log("HTcolor,",HTitleColor)
  const [isHeader, setIsHeader] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rows, setRows] = useState([
    { id: 1, name: "", imagePreview: null, price: "" },
  ]);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
      if (onUpdatedRow) {
        onUpdatedRow(rows);
      }
  }, [rows, onUpdatedRow]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedRows = [...rows];
        updatedRows[updatedRows.length - 1].imagePreview = reader.result;
        setRows(updatedRows);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleImageClick = (imagePreview) => {
    setSelectedImage(imagePreview);
  };
  const handleAddRow = () => {
    const nextId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows([...rows, { id: nextId, name: "", imagePreview: null, price: "" }]);
    if (onUpdatedRow) {
      onUpdatedRow(rows);
    }
  };

  const handleDeleteRow = (id,row) => {
    setRows(rows?.filter((row) => row.id !== id));
    if (onUpdatedRow) {
      onUpdatedRow(row);
    }
  };

 const handleNameChange = (event, id) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, name: event.target.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handlePriceChange = (event, id) => {
     
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, price: event.target.value };
      }
      return row;
    }
    );
    setRows(updatedRows);
  };
  return (
    <div>
      <div className="mb-8">
        <div className="ml-[35px] my-4">
          <button
            className="poppins flex gap-2 text-[16px]  leading-[27px] font-medium items-center"
            style={{ color: `${HTitleColor ? `#${HTitleColor}` : '#4ade80'}` }}
            onClick={() => setIsHeader(!isHeader)}
          >
            {isHeader ? (
              <IoIosArrowUp className="text-[15px] leading-[27px] font-medium" style={{ color: `${HTitleColor ? `#${HTitleColor}` : '#4ade80'}` }} />
            ) : (
              <IoIosArrowDown className="text-[15px] leading-[27px] font-medium" style={{ color: `${HTitleColor ? `#${HTitleColor}` : '#4ade80'}` }} />
            )}
            {HTitle}
          </button>
        </div>
        {isHeader && (
          <div className="w-[90%] h-full mx-10 bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-20">
            <div className="flex gap-20 ">
              <div className=" w-[70%] ">
                <div className="flex gap-[70px]">
                  <div className=" text-customblack justify-between mb-2 lgdesktop:w-[45%] w-[42%] flex">
                    <p className="">{HTitle}</p>
                    <p className="">Image</p>
                  </div>
                  <div className=" text-customblack items-start gap-[15px] mb-2 lgdesktop:w-[45%] w-[42%] flex">
                    <p className="">Preview</p>
                    <p className="">Price</p>
                  </div>
                </div>

                {rows.map((row) => (
                  <div key={row.id} className="flex gap-2 mb-2">
                    <div className="flex gap-2 w-full">
                      <UseInput
                        type="text"
                        placeholder="Strawberry"
                        id=""
                        value={row.name}
                        onChange={(event) => handleNameChange(event, row.id)}
                      />
                      <div className="">
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          className="flex gap-2 w-[112px] items-center bg-white p-[8px]"
                          onClick={handleClick}
                        >
                          <GrAttachment />
                          <p>Add File</p>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-6 w-full">
                      <div className="h-[40px] w-[40px] border border-customblack items-center p-2 ml-3">
                        {row.imagePreview && (
                          <img
                            src={row.imagePreview}
                            alt="Preview"
                            className="max-w-full max-h-full"
                            onClick={() => handleImageClick(row.imagePreview)}
                          />
                        )}
                      </div>
                      <UseInput
                        type="number"
                        placeholder="Price"
                        id=""
                        value={row.price}
                        onChange={(event) => handlePriceChange(event, row.id)}
                      />
                      <button onClick={() => handleDeleteRow(row.id)}>
                        <MdDelete className="text-[18px] text-customblack hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex-col mt-2 text-customblack">
                  <span onClick={handleAddRow} className="hover:text-blue-400">
                    + Add
                  </span>
                </div>
              </div>
              <div className=" w-[20%]">
                <div className="h-[16rem] w-[16rem] bg-white items-center p-6 relative">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected Preview"
                      className="max-w-full max-h-full"
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

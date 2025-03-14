'use client'

import { React, useState } from 'react'
import Image from 'next/image';
import styles from "./styles.module.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const Barcode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Option 1');

  const [selectedValue2, setSelectedValue2] = useState('');
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2)
  }
  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
  };

  const onColsRowsChange = (value) => {
    const getColsRows = value.match(/\d+/g);
    const getColsResult = parseFloat(getColsRows[0]);
    const getRowsResult = parseFloat(getColsRows[1]);
    setRows(getRowsResult);
    setCols(getColsResult);

    setSelectedValue2(value);
    setIsOpen2(false);
  };
  const values = [
    { cols: 3, row: 1 },
    { cols: 3, row: 14 },
    { cols: 4, row: 14 },
    { cols: 4, row: 16 },
    { cols: 5, row: 14 },
    { cols: 5, row: 16 },
    { cols: 5, row: 18 },
  ];
  return (
    <div>
      <div className="printContent">

        <div className="row">

        </div>
      </div>
      <div id="mainLabelPage" className="mainBarcodePage flex justify-around">

        <div className="leftSection">

          <div className="mainContent">
            <div className="my-16 flex items-center">
              <label className="barcodeLabel font-bold H">
                Select Sku
              </label>
              &nbsp; &nbsp;
              <div className={`relative ${isOpen ? 'z-1' : ''}`}>
                <div className="mainInputClass group w-full flex justify-between items-center hover:bg-gray-200 px-2 py-1 hover:border hover:border-gray-200 rounded-lg" onClick={toggleDropdown}>
                  <div>
                    <input
                      type="text"
                      className="text-[14px] text-black group-hover:bg-gray-200"
                      placeholder='Select Skus'
                      readOnly
                      value={selectedOption}
                    />
                  </div>
                  <div>
                    {isOpen ? <RiArrowDropUpLine className='text-lg' /> : <RiArrowDropDownLine className='text-lg' />}
                  </div>
                </div>
                {isOpen && (
                  <div className="p-1 my-1 w-full bg-white border rounded absolute z-10">
                    <a href="#" onClick={() => handleOptionClick('Option 1')} className={`block m-1 px-4 py-1 text-[14px] text-black ${selectedOption === 'Option 1' ? 'hover:border hover:rounded hover:border-green-300  hover:bg-green-300 hover:text-black' : 'hover:border hover:rounded hover:border-gray-300  hover:bg-gray-300 hover:text-black'}`}>Option 1</a>
                    <a href="#" onClick={() => handleOptionClick('Option 2')} className={`block m-1 px-4 py-1 text-[14px] text-black ${selectedOption === 'Option 2' ? 'hover:border hover:rounded hover:border-green-300  hover:bg-green-300 hover:text-black' : 'hover:border hover:rounded hover:border-gray-300  hover:bg-gray-300 hover:text-black'}`}>Option 2</a>
                    <a href="#" onClick={() => handleOptionClick('Option 3')} className={`block m-1 px-4 py-1 text-[14px] text-black ${selectedOption === 'Option 3' ? 'hover:border hover:rounded hover:border-green-300  hover:bg-green-300 hover:text-black' : 'hover:border hover:rounded hover:border-gray-300  hover:bg-gray-300 hover:text-black'}`}>Option 3</a>
                  </div>
                )}
              </div>
            </div>

            {/* <DropDownInput options = {values}/> */}

            <div className="my-16">
              <div>
                <label className="barcodeLabel font-bold H">
                  Paper Size
                </label>
                &nbsp; &nbsp;
                <input className="barcodeInputs space-x-4 text-[14px] text-black group-hover:bg-gray-200" value="Letter Size (8.5 in X 11 in)" />
              </div>
            </div>
          </div>
          <div className="mainContent">
            <div className="my-16 flex items-center">
              <label className="barcodeLabel font-bold H">
                Barcode
              </label>
              &nbsp; &nbsp;

              <div className={`relative ${isOpen2 ? 'z-1' : ''}`}>
                <div className="mainInputClass group w-full flex justify-between items-center hover:bg-gray-200 px-2 py-1 hover:border hover:border-gray-200 rounded-lg cursor-pointer" onClick={toggleDropdown2}>
                  <div>
                    <input
                      type="text"
                      className="text-[14px] text-black group-hover:bg-gray-200"
                      placeholder='Select Dimension'
                      readOnly
                      value={selectedValue2}
                    />
                  </div>
                  <div>
                    {isOpen2 ? <RiArrowDropUpLine className='text-lg' /> : <RiArrowDropDownLine className='text-lg' />}
                  </div>
                </div>
                {isOpen2 && (
                  <div className="p-1 my-1 w-full bg-white border rounded absolute z-10">
                    {values.map((value, index) => (
                      <div  className={`cursor-pointer ${selectedValue2 === `Col ${value.cols} X Row ${value.row}` ? 'hover:border hover:rounded hover:border-green-300  hover:bg-green-300 hover:text-black' : 'hover:border hover:rounded hover:border-gray-300  hover:bg-gray-300 hover:text-black'}`} key={index} onClick={() => onColsRowsChange(`Col ${value.cols} X Row ${value.row}`)}>
                        {`Col ${value.cols} X Row ${value.row}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mainContent">
              <div className="barcodeLabel"></div>

              <div className="my-16">
                <button type="button" className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Print Label</button>
              </div>
            </div>
          </div>
        </div>

        <div className="midSection">
          <div className="mainContent" >
            <div className="ml-48 my-16">
              <Image src="/media/barcodes/skuBarcode.png" alt="sku_Barcode" width="200" height="200" />

              {cols == 3 && rows == 1 ?
                <div className={styles.mainPreview1}>
                    <div className={styles.preview1}></div>
                    <div className={styles.preview2}></div>
                    <div className={styles.preview3}></div>
                </div> 
                :cols == 3 && rows == 14 ?
                <div className={styles.mainPreview2}>
                <div className={styles.preview4}></div>
                <div className={styles.preview5}></div>
                <div className={styles.preview6}></div>
                <div className={styles.preview7}></div>
                <div className={styles.preview8}></div>
                <div className={styles.preview9}></div>
            </div> :
                 null}
            </div>
          </div>
          {/* <div className="labelSection ">
            {cols == 5 ?

              <div className="gridContainer" >
                {
                  [...Array(np)].map((e, i) => {
                    return <div style={{ height: previewHeightChild }} className="previewPedding">
                      <div className="perview">
                        <span>a</span>
                      </div>
                    </div>
                  })
                }
              </div>

              :
              <div className="container">
                <div className="row">

                </div>
              </div>
            }
          </div> */}

        </div>

        <div className="mainContent rightSection"></div>


      </div>
    </div>

  )
}


export default Barcode;

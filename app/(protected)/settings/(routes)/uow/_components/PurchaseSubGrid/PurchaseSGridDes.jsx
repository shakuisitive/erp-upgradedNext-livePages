const PurchaseSGridDes = ({ data, index, rowData, id, obj }) => {
 
  return (
    <div className='flex justify-center items-center  w-full text-[14px] text-customblack'>
        {rowData.PART_DESCRIPTION}
    </div>
  );
};

export default PurchaseSGridDes;

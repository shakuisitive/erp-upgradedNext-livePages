const PurchaseSGridDes = ({ data, index, rowData, id, obj }) => {
 
  return (
    <div className='flex justify-center items-center line-clamp-1  w-full text-[14px] text-customblack'>
      <p className="line-clamp-1">{rowData.PART_DESCRIPTION}</p>  
    </div>
  );
};

export default PurchaseSGridDes;

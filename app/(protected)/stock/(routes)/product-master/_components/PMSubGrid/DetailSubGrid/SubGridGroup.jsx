import React from 'react'

const SubGridGroup = ({rowData}) => {
    const style = {
        backgroundColor: rowData?.PURCHASE_GROUP_COLOR || 'transparent',
      };
  return (

   <div
      className={`
        ' w-full flex items-center justify-center text-center'
        `
      }
      style={style}
    >
      {/* <Tooltip content={data}> */}
      <p className="py-1 text-[14px] text-white">
        {rowData?.PURCHASE_GROUP}
      </p>
      {/* </Tooltip> */}
    </div>
  )
}

export default SubGridGroup
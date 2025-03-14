"use client"
import React , {useState} from 'react'
import DateTimePicker from '../textinput/DatePicker'
import moment from 'moment';

const Tooltip = ({ content, children }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(
        new Date().toISOString().slice(0, 16) // Initial value: current date and time
      );
    
      const handleDateTimeChange = (e) => {
        setSelectedDateTime(e.target.value);
        
      };
    //console.log("this is log", isTooltipVisible);
    return (
      <div className="group ">
        {isTooltipVisible && (
          <div className="absolute z-10 bg-white  w-fit p-4 rounded-md text-sm shadow-lg mt-8">
            {/* <div>{content}</div> */}
            <div className='w-60'><DateTimePicker onChange={handleDateTimeChange } value={selectedDateTime}/></div>
          </div>
        )}
        <div
          className="inline-block cursor-pointer"
          onDoubleClick={() => setTooltipVisible(!isTooltipVisible)}
        //   onMouseLeave={() => setTooltipVisible(false)}
        >
          {children}
        </div>
      </div>
    );
  };

const GridDateCell = ({data}) => {
  // const date = moment(data).format("YYYY MMM Do ");  
  const date = moment(data).format("MM/DD/yyyy ");  
  return (
    <div className='flex justify-center items-center size-full text-[13px]  text-customblack leading-[37px]'>
         <Tooltip content="Add your comment">
        <div>{date == "Invalid date" ? "" : date}</div>
        </Tooltip>
    </div>
  )
}

export default GridDateCell
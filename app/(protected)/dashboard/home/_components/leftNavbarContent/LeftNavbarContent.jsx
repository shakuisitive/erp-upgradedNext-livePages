const data = [
  {
    title: "Operation Apex",
    date: "20 Jan, 2024",
    letter: "A",
  },
  {
    title: "Project Nebula",
    date: "17 Feb, 2024",
    letter: "B",
  },
  {
    title: "Task Infinity",
    date: "18 Mar, 2024",
    letter: "C",
  },
  {
    title: "Quantum",
    date: "28 Feb, 2024",
    letter: "D",
  },
  {
    title: "Phoenix",
    date: "30 May, 2024",
    letter: "E",
  },
  {
    title: "Task Infinity",
    date: "10 Jun, 2024",
    letter: "F",
  },
  {
    title: "Unity Herber",
    date: "10 Aug, 2024",
    letter: "G",
  },
  {
    title: "Nexus",
    date: "25 Sep, 2024",
    letter: "H",
  },
];
const LeftNavbarContent = () => {
  return (
    <div className=" flex flex-col items-center  lgdesktop:gap-[8px] 2xl:gap-[6px] xl:gap-1 lg:gap-[2px] gap-0 lg:py-[11px] md:py-[9px] lg:px-[2px]  xl:py-[13px] xl:px-[3px]">
      {data?.map((item, index) => (
        <div
          className="flex hover:bg-sky-200 cursor-pointer items-center rounded-[8px] xl:w-[80%] lg:h-[45px]   lgdesktop:h-[75px] 2xl:h-[67px]  xl:h-[50px] md:h-[40px] w-[100%] p-[5px] md:gap-3 lg:gap-2 xl:gap-4  "
          key={index}
        >
          <span className="xl:w-[15%] lg:w-[17%] 2xl: w-[15%] h-[90%] md:text-[12px] lg:text-[16px] xl:text-[18px]  2xl:text-[20px] lgdesktop:text-[22px] rounded-md flex items-center bg-sky-500 text-white justify-center">
            {item?.letter}
          </span>
          <div className="flex flex-col  h-full justify-around">
            <p className="m-0 font-semibold md:text-[12px] lg:text-[16px] xl:text-[18px]  2xl:text-[20px] lgdesktop:text-[22px] text-gray-700">{item?.title}</p>
            <div className="text-xs md:text-[8px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] lgdesktop:text-[18px] text-gray-400">
              {item?.date}
            </div>
          </div> 
        </div>
      ))}
    </div>
  );
};

export default LeftNavbarContent;

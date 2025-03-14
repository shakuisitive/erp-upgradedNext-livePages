import { TbTrafficConeOff } from "react-icons/tb";
function DangerAlert() {
    return (
        <div>
                <div className='text-center py-6'>
                <TbTrafficConeOff className="text-red-400 mx-auto text-7xl" />
                    <h2 className='text-red-400 font-bold uppercase py-6 text-3xl'> Failed!</h2>
                    <p className=' text-xs text-center py-6'>Oh No! Failed to submit your data.</p>
                </div>
            </div>
    )
}
export default DangerAlert;
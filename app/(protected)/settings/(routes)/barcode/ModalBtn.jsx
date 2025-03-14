'use client'
import React, { useState } from 'react';
// import BySku from './_components/BySku';
// import ByLot from './_components/ByLot';
// import ByLocation from './_components/ByLocation'
// import ModalWithTabs from '../../components/misc/modal/Modal';
// import SaveButton from '../../components/misc/buttons/SaveButton';

import SaveButton from '../../../../../components/misc/pureComponents/buttons/SaveButton'; 
// import ModalWithTabs from '../../../../../components/misc/modal/Modal';


function ModalBtn (){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    // const tabs = [
    //     { label: <div className='text-sm text-[#7f8089]'>By Sku</div>, content: <div><BySku /></div> },
    //     { label: <div className='text-sm text-[#7f8089]'>By Lot</div>, content: <div><ByLot/></div> },
    //     { label: <div className='text-sm text-[#7f8089]'>By Location</div>, content: <div><ByLocation/></div> },
    // ];

    const modalbuttons = [
        {
            buttonComponent: <SaveButton label="Save" />,

        },
        //   {
        //     buttonComponent: <CancelButton label="Cancel Button" />,

        //   },
        //   {
        //     buttonComponent: <EmailButton label="Send Email" />,
        //   },
    ];
    return (
        <div>
                 {/* <button onClick={handleOpenModal} className="mainBarcodeContent text-blue-500 hover:underline">
                Open Modal
            </button>

            <ModalWithTabs
                heading={<h1 className='H text-xl font-bold mainBarcodeContent'>Barcode Label</h1>}
                // tagline="Barcode Tagline."
                tabs={tabs}
                isOpen={isModalOpen}
                onOpenModal={handleOpenModal}
                onCloseModal={handleCloseModal}
                modalbuttons={modalbuttons}
            /> */}
        </div>
    )
}
export default ModalBtn;
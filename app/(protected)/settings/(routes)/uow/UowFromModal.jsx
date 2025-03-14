const OrganizationModalDetails = () => {
    return (
        <div className="w-full mx-auto py-20">
            <div className="w-[1280px] mx-auto">
                <div className="flex items-center justify-between gap-32">
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Code</label>
                            <input type="text" id="code" className="bg-transparent focus:outline-none focus:unset w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="name">Name</label>
                            <input type="text" id="name" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="registration">Registration #</label>
                            <input type="text" id="registration" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="email">Email</label>
                            <input type="email" id="email" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="phone">Phone</label>
                            <input type="text" id="phone" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="fax">Fax</label>
                            <input type="text" id="fax" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="managerName">Manager Name</label>
                            <input type="text" id="managerName" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="managerTitle">Manager Title</label>
                            <input type="text" id="managerTitle" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="active">Logo</label>
                            <input type="text" id="active" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="active">Active</label>
                            <input type="text" id="active" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="address">Address</label>
                            <input type="text" id="address" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="city">City</label>
                            <input type="text" id="city" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="postalCode">Postal/Zip Code</label>
                            <input type="text" id="postalCode" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="province">Province</label>
                            <select name="province" id="province" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]">
                                <option value="ONTARIO">ONTARIO</option>
                                <option value="ALBERTA">ALBERTA</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="country">Country</label>
                            <select name="country" id="country" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]">
                                <option value="Canada">Canada</option>
                                <option value="United States">United States</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="managerEmail">Manager Email</label>
                            <input type="text" id="managerEmail" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="p-[8px] font-[500] text-[14px]" htmlFor="managerPhone">Manager Phone</label>
                            <input type="text" id="managerPhone" className="bg-transparent focus:outline-none w-[300px] border-b py-[8px] pl-[12px] pr-[36px]" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <label className="p-[8px] font-[500] text-[14px]" htmlFor="notes">Notes</label>
                    <textarea id="notes" className="bg-transparent focus:outline-none w-full border-b p-[8px] " />
                </div>
            </div>

        </div>
    );
};

export default OrganizationModalDetails;

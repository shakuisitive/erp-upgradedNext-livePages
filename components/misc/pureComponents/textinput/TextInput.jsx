import React from 'react';

const TextInput = ({ label, placeholder, type = 'text', ...rest }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm text-gray-800 mb-2">{label}</label>}
            <input
                type={type}
               className="border rounded-md px-3 py-2 w-80 border-gray-200 hover:border-gray-400 focus:border-blue-200 focus:outline-none"
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};

export default TextInput;

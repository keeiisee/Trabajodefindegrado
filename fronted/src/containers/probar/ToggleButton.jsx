import React, { useState } from 'react';

const ToggleButton = ({ label, initialState, onToggle, disabled }) => {
    const [isToggled, setIsToggled] = useState(initialState);

    const handleClick = () => {
        if (!disabled) {
            setIsToggled(!isToggled);
            onToggle(!isToggled);
        }
    };

    return (
        <div className="flex items-center">
            <span className="mr-2 text-gray-700">{label}</span>
            <button
                type="button"
                className={`relative rounded-full w-12 h-6 transition-colors duration-200 ease-linear ${isToggled ? 'bg-green-500' : 'bg-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleClick}
                disabled={disabled}
            >
                <span
                    className={`absolute top-0.5 left-0.5 inline-block w-5 h-5 transform transition-transform duration-200 ease-linear bg-white rounded-full shadow-md ${isToggled ? 'translate-x-6' : ''
                        }`}
                />
            </button>
        </div>
    );
};

export default ToggleButton;
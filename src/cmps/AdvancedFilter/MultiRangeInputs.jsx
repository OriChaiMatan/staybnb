import React from "react";

export default function MultiRangeInputs({ min, max, onRangeChange }) {

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value.replace(/,/g, ""), 10) || 0;
        onRangeChange({ min: newMin, max });
    };

    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value.replace(/,/g, ""), 10) || 0;
        onRangeChange({ min, max: newMax });
    };

    return (
        <div className="multi-range-inputs">
            <div className="input-wrapper">
                <span className="currency-symbol">₪</span>
                <input
                    className="input"
                    value={min.toLocaleString()}
                    onChange={handleMinChange}
                />
            </div>
            <div className="dash"></div>
            <div className="input-wrapper">
                <span className="currency-symbol">₪</span>
                <input
                    className="input"
                    value={max.toLocaleString()}
                    onChange={handleMaxChange}
                />
            </div>
        </div>
    );
}

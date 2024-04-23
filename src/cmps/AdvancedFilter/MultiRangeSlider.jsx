import React, { useEffect } from "react";
import { useFormikContext } from "formik";

const minDistance = 30;

export function MultiRangeSlider({ min, max, priceBounds, setPriceBounds }) {
    const { values, setFieldValue } = useFormikContext();
    const minVal = values.price_min;
    const maxVal = values.price_max;

    const handleMinChange = (e) => {
        const newValue = Math.min(Number(e.target.value), maxVal - minDistance);
        setFieldValue("price_min", newValue);

        if (newValue > maxVal - minDistance) {
            setFieldValue("price_max", newValue + minDistance);
        }

        setPriceBounds(prevBounds => ({ ...prevBounds, min: newValue }))
    };

    const handleMaxChange = (e) => {
        const newValue = Math.max(Number(e.target.value), minVal + minDistance);
        setFieldValue("price_max", newValue);

        if (newValue < minVal + minDistance) {
            setFieldValue("price_min", newValue - minDistance);
        }

        setPriceBounds(prevBounds => ({ ...prevBounds, max: newValue }))

    };

    const trackWidth = max - min;
    const adjustedLeft = Math.max(0, ((minVal - min) / trackWidth) * 100);
    const adjustedWidth = Math.min(
        100 - adjustedLeft,
        ((maxVal - minVal) / trackWidth) * 100
    );

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={handleMinChange}
                className="thumb"
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={handleMaxChange}
                className="thumb"
            />
            <div className="slider">
                <div className="slider__track" />
                <div
                    className="slider__highlight"
                    style={{
                        left: `${adjustedLeft}%`,
                        width: `${adjustedWidth}%`,
                    }}
                />
            </div>
        </div>
    );
}

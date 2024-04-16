import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import { MultiRangeSlider } from "./MultiRangeSlider";
import MultiRangeInputs from "./MultiRangeInputs";
import { stayService } from "../../services/stay.service";

export function PriceRange() {
    const { setFieldValue, values } = useFormikContext();
    const initialMinPrice = stayService.minPricesStays();
    const initialMaxPrice = stayService.maxPricesStays();
    const stayPrices = stayService.getAllPrices();

    const [priceHistogram, setPriceHistogram] = useState([]);
    const [priceBounds] = useState({
        min: initialMinPrice,
        max: initialMaxPrice,
    });

    useEffect(() => {
        const histogram = calculatePriceHistogram(initialMinPrice, initialMaxPrice);
        setPriceHistogram(histogram);
    }, []);

    const calculatePriceHistogram = (minPrice, maxPrice) => {
        const numSteps = 50;
        const stepSize = (maxPrice - minPrice) / numSteps;
        let priceSteps = [];
        for (let i = 0; i < numSteps; i++) {
            const start = minPrice + i * stepSize;
            const end = minPrice + (i + 1) * stepSize;
            const count = stayPrices.filter(
                (price) =>
                    price >= start &&
                    (price < end || (i === numSteps - 1 && price === end))
            ).length;
            priceSteps.push({ range: `${start}-${end}`, count });
        }
        return priceSteps;
    };

    const handleRangeChange = (newRange) => {
        setFieldValue("price_min", newRange.min);
        setFieldValue("price_max", newRange.max);
    };
    const maxCount = Math.max(...priceHistogram.map((item) => item.count));
    const maxHeight = 10;

    return (
        <div className="price-range">
            <div className="histogram">
                {priceHistogram.map((item, index) => {
                    const barHeight =
                        item.count > 0 ? (item.count / maxCount) * maxHeight : 0;

                    const [rangeStart] = item.range.split("-").map(Number);

                    const isInSelectedRange =
                        rangeStart >= values.price_min && rangeStart <= values.price_max;

                    return (
                        <div
                            key={index}
                            className="bar"
                            style={{
                                height: `${barHeight}px`,
                                backgroundColor: isInSelectedRange
                                    ? "rgb(34, 34, 34)"
                                    : "rgb(221, 221, 221)",
                            }}
                        ></div>
                    );
                })}
            </div>
            <MultiRangeSlider min={priceBounds.min} max={priceBounds.max} />
            <MultiRangeInputs
                min={values.price_min}
                max={values.price_max}
                onRangeChange={handleRangeChange}
            />
        </div>
    );
}

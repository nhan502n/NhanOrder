"use client";
import { useState } from "react";

export default function PriceRange() {
  const [rangeValue, setRangeValue] = useState<number>(100); // Giá trị mặc định là 100

  return (
    <div className="single-widget range">
      <h3>Price Range</h3>
      <input
        type="range"
        className="form-range"
        name="range"
        step="1"
        min="100"
        max="10000"
        value={rangeValue}
        onChange={(e) => setRangeValue(Number(e.target.value))} // Ép kiểu thành số
      />
      <div className="range-inner">
        <label>$</label>
        <input
          type="number"
          id="rangePrimary"
          value={rangeValue}
          onChange={(e) => setRangeValue(Number(e.target.value))} // Ép kiểu thành số
        />
      </div>
    </div>
  );
}

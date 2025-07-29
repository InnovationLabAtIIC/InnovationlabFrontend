'use client'

import React, { useState } from "react";

type GridSectionDividerProps = {
    colors: ("b" | "g")[][];
};

export default function GridSectionDivider() {
    const initialColors: ("b" | "g")[][] = [
        Array(24).fill("b").map((v, i) => (i === 9 || i === 18 ? "g" : "b")),
        Array(24).fill("b").map((v, i) => [1, 5, 8, 9, 13, 16, 18, 22].includes(i) ? "g" : "b"),
        Array(24).fill("b").map((v, i) => [1,2,4,5,7,8,9,11,12,13,15,16,17,18,19,21,22].includes(i) ? "g" : "b"),
    ];

    const [colors, setColors] = useState<("b" | "g")[][]>(initialColors);

    const handleCellClick = (rowIdx: number, colIdx: number) => {
        setColors(prevColors => {
            const newColors = prevColors.map((row, r) =>
                row.map((cell, c) =>
                    r === rowIdx && c === colIdx ? (cell === "b" ? "g" : "b") : cell
                )
            );
            return newColors;
        });
    };

    return (
        <div className="w-full">
            {initialColors.map((row, rowIdx) => (
                <div key={rowIdx} className="flex w-full items-center">
                    {row.map((cell, colIdx) => (
                        <div
                            key={colIdx}
                            className={`aspect-square flex-1 flex items-center justify-center ${cell === "b" ? "bg-black" : "bg-gray-800"}`}
                            style={{ maxWidth: "4rem" }}
                            onClick={() => handleCellClick(rowIdx, colIdx)}
                        >
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

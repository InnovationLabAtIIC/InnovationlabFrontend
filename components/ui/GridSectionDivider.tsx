'use client'

import React, { useState } from "react";

type GridSectionDividerProps = {
    initialColors?: ("b" | "g")[][];
    colorMap?: { b: string; g: string };
    flipDirection?: boolean;
};

export default function GridSectionDivider({
    initialColors = [
        Array(24).fill("b").map((v, i) => (i === 9 || i === 18 ? "g" : "b")),
        Array(24).fill("b").map((v, i) => [1, 5, 8, 9, 13, 16, 18, 22].includes(i) ? "g" : "b"),
        Array(24).fill("b").map((v, i) => [1,2,4,5,7,8,9,11,12,13,15,16,17,18,19,21,22].includes(i) ? "g" : "b"),
    ],
    colorMap = { b: "bg-black", g: "bg-gray-800" },
    flipDirection = false,
}: GridSectionDividerProps) {
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

    const rows = flipDirection ? [...colors].reverse() : colors;

    return (
        <div className="w-full">
            {rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex w-full items-center">
                    {(flipDirection ? [...row].reverse() : row).map((cell, colIdx) => (
                        <div
                            key={colIdx}
                            className={`aspect-square flex-1 flex items-center justify-center ${colorMap[cell]}`}
                            style={{ maxWidth: "4rem" }}
                            onClick={() => handleCellClick(
                                flipDirection ? colors.length - 1 - rowIdx : rowIdx,
                                flipDirection ? row.length - 1 - colIdx : colIdx
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}


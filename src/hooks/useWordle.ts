import { useEffect, useState } from "react";

function useWordle(data: string[]) {
    const [grid, setGrid] = useState<Array<string[]>>(
        Array(6)
            .fill(null)
            .map(() => Array(5).fill("")),
    );
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [result, setResult] = useState<"won" | "lost" | "">("");
    const [currentConfig, setCurrentConfig] = useState<{
        row: number;
        cell: number;
    }>({
        row: 0,
        cell: 0,
    });

    useEffect(() => {
        setSelectedWord(data.at(Math.floor(Math.random() * data.length)) || "");
    }, []);

    useEffect(() => {
        if (currentConfig.row === 0 || selectedWord === "") return;
        console.log("Selected word: ", selectedWord);

        if (grid[currentConfig.row - 1].join("") === selectedWord)
            setResult("won");
        else if (currentConfig.row === 6) setResult("lost");
    }, [currentConfig.row]);

    const registerLetter = (letter: string) => {
        if (
            currentConfig.row === 6 ||
            currentConfig.cell === 5 ||
            result !== ""
        )
            return;

        setGrid((prev) => {
            const newGrid = structuredClone(prev);

            newGrid[currentConfig.row][currentConfig.cell] = letter;

            return newGrid;
        });
        setCurrentConfig((prev) => ({ ...prev, cell: prev.cell + 1 }));
    };

    const handleEnter = () => {
        if (
            currentConfig.cell !== 5 ||
            currentConfig.row === 6 ||
            result !== ""
        )
            return;
        setCurrentConfig((prev) => ({ cell: 0, row: prev.row + 1 }));
    };

    const handleBackspace = () => {
        if (currentConfig.cell === 0 || result !== "") return;

        setGrid((prev) => {
            const newGrid = structuredClone(prev);

            newGrid[currentConfig.row][currentConfig.cell - 1] = "";

            return newGrid;
        });
        setCurrentConfig((prev) => ({ ...prev, cell: prev.cell - 1 }));
    };

    return {
        grid,
        result,
        selectedWord,
        currentConfig,
        registerLetter,
        handleBackspace,
        handleEnter,
    };
}

export default useWordle;

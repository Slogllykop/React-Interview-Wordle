import { useEffect } from "react";
import useKeyPress from "../hooks/useKeyPress";
import useWordle from "../hooks/useWordle";
import Cell from "./Cell";

interface PropsType {
    data: string[] | undefined;
}

const Game: React.FC<PropsType> = ({ data }) => {
    const { key: pressed_key, time: keyPressUpdater } = useKeyPress();
    const {
        grid,
        registerLetter,
        handleBackspace,
        handleEnter,
        currentConfig,
        selectedWord,
        result,
    } = useWordle(data as string[]);

    useEffect(() => {
        switch (pressed_key) {
            case "Enter":
                handleEnter();
                break;
            case "Backspace":
                handleBackspace();
                break;
            default:
                if (
                    pressed_key !== "" &&
                    pressed_key.length === 1 &&
                    pressed_key.toLowerCase() !== pressed_key.toUpperCase()
                )
                    registerLetter(pressed_key.toUpperCase());
        }
    }, [keyPressUpdater]);

    return (
        <main className="flex flex-col gap-4">
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="flex gap-4">
                        {row.map((cell, cellIndex) => {
                            return (
                                <Cell
                                    key={String(rowIndex) + cellIndex}
                                    row={rowIndex}
                                    cell={cellIndex}
                                    letter={cell}
                                    config={currentConfig}
                                    selectedWord={selectedWord}
                                />
                            );
                        })}
                    </div>
                );
            })}

            {result !== "" && (
                <div className="mt-5 text-center text-4xl font-bold">
                    You {result}
                </div>
            )}
        </main>
    );
};

export default Game;

type PropsType = {
    config: { row: number; cell: number };
    letter: string;
    row: number;
    cell: number;
    selectedWord: string;
};

const Cell: React.FC<PropsType> = ({
    config,
    letter,
    row,
    cell,
    selectedWord,
}) => {
    function getColor() {
        if (config.row <= row) return "transparent";

        if (selectedWord.charAt(cell) === letter) return "green";
        else if (!selectedWord.includes(letter)) return "neutral";
        return "yellow";
    }

    return (
        <div
            className={`grid size-20 place-items-center border-2 border-black text-xl font-bold uppercase bg-${getColor()}-700`}
        >
            {letter}
        </div>
    );
};

export default Cell;

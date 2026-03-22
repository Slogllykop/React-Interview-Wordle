import Game from "./components/Game";
import { WORDLE_WORDS_URL } from "./constants";
import useNetwork from "./hooks/useNetwork";

function App() {
    const { data, isLoading, error } = useNetwork<string[]>(WORDLE_WORDS_URL);

    if (isLoading) return <>Loading...</>;
    else if (error) return <>{error.message}</>;
    return (
        <section className="grid min-h-dvh w-full place-items-center">
            <div className="bg-neutral-700 bg-yellow-700 bg-green-700 sr-only"></div>
            <Game data={data} />
        </section>
    );
}

export default App;

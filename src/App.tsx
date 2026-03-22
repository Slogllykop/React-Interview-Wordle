import Game from "./components/Game";
import { WORDLE_WORDS_URL } from "./constants";
import useNetwork from "./hooks/useNetwork";

function App() {
    const { data, isLoading, error } = useNetwork<string[]>(WORDLE_WORDS_URL);

    if (isLoading) return <>Loading...</>;
    else if (error) return <>{error.message}</>;
    return (
        <section className="grid min-h-dvh w-full place-items-center">
            <div className="sr-only" aria-hidden="true">
                <div className="bg-neutral-700" />
                <div className="bg-yellow-700" />
                <div className="bg-green-700" />
            </div>
            <Game data={data} />
        </section>
    );
}

export default App;

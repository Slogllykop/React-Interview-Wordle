import { useEffect, useState } from "react";

function useKeyPress() {
    const [keyData, setKeyData] = useState<{ key: string; time: number }>({
        key: "",
        time: 0,
    });

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            setKeyData({
                key: e.key,
                time: Date.now(),
            });
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return keyData;
}

export default useKeyPress;

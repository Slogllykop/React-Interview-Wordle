import { useEffect, useState } from "react";
import axios, { AxiosError, type AxiosResponse } from "axios";

function useNetwork<T>(API_URL: string) {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        async function fetcher() {
            try {
                const res: AxiosResponse<T> = await axios.get(API_URL);
                setData(res.data);
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setIsLoading(false);
            }
        }

        fetcher();
    }, []);

    return { data, isLoading, error };
}

export default useNetwork;

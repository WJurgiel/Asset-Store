import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetchAssets = (endpoint: string) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(endpoint)
            .then((response) => {
                setAssets(response.data);
            })
            .catch((err) => {
                setError(err.message || 'Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint]);

    return {assets, loading, error};
};

import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetchAssets = (endpoint: string) => {
    const [assets, setAssets] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(endpoint)
            .then((response) => {
                setAssets(response.data.assets);
                setTotalCount(response.data.totalCount);
            })
            .catch((err) => {
                setError(err.message || 'Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint]);

    return {assets, totalCount, loading, error};
};

import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetchSingleAsset = (endpoint: string) => {
    const [asset, setAsset] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(endpoint)
            .then((response) => {
                setAsset(response.data);
            })
            .catch((err) => {
                setError(err.message || 'Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [endpoint]);

    return {asset, loading, error};
};

import {useState} from 'react';
import axios from 'axios';

export const useSearchAssets = () => {
    const [suggestions, setSuggestions] = useState<{ ID: number; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const searchAssets = async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/assets/search?query=${query}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    return {suggestions, searchAssets, loading};
};

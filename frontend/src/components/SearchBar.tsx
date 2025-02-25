import {useEffect, useState} from "react";
import {useSearchAssets} from "../hooks/useSearchAssets.ts";
import {useNavigate} from "react-router-dom";
import {Autocomplete} from "@mantine/core";

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const {suggestions, searchAssets, loading} = useSearchAssets();
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchAssets(query);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [query, searchAssets]);

    return (
        <Autocomplete
            placeholder="Search..."
            value={query}
            onChange={setQuery}
            data={suggestions.map(({name}) => name)}
            onOptionSubmit={(value) => {
                const selectedAsset = suggestions.find((asset) => asset.name === value);
                if (selectedAsset) {
                    navigate(`/product/${selectedAsset.ID}`);
                    console.log(selectedAsset.ID);
                }
            }}
            loading={loading}
            styles={{
                input: {
                    backgroundColor: '#914A74',
                    color: '#fff',
                    paddingRight: '40px',
                },
            }}
            style={{flex: 1}}
        />
    );
};
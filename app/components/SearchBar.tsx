// src/components/SearchBar.tsx
import React from 'react';
import '../page.css';

const SearchBar = () => (
    <input
        type="text"
        className="search-placeholder"
        placeholder="🔍 Search Twitter"
    />
);

export default SearchBar;
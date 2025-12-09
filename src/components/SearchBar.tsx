import { useState, type Dispatch, type SetStateAction } from 'react';
import { Search, Menu, X } from 'lucide-react';
import '../assets/styles/SearchBar.css';

function SearchBar({setListView}: {setListView :  Dispatch<SetStateAction<never[]>>}) {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sân thể thao..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button 
              onClick={handleClear}
              className="clear-button"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="menu-button" aria-label="Menu">
          <Menu className="menu-icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
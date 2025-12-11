import { useState } from "react";
import { X } from "lucide-react";
import "../assets/styles/SearchBar.css";

interface SearchBarProps {
  searchText?: string;
  setSearchText?: (text: string) => void;
}

function SearchBar({
  searchText: externalSearchText,
  setSearchText: externalSetSearchText,
}: SearchBarProps = {}) {
  const [internalSearchText, setInternalSearchText] = useState("");
  const searchText =
    externalSearchText !== undefined ? externalSearchText : internalSearchText;
  const setSearchText = externalSetSearchText || setInternalSearchText;

  const handleClear = () => {
    setSearchText("");
  };

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <label className="search-label">Tìm kiếm</label>
        <div className="search-input-wrapper">
          <svg
            className="search-shuttlecock-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L15 8L12 14L9 8L12 2Z"
              fill="white"
              stroke="#22c55e"
              strokeWidth="1"
            />
            <circle cx="12" cy="8" r="2" fill="#22c55e" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm..."
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
      </div>
    </div>
  );
}

export default SearchBar;

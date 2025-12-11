// SearchBar.tsx
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Search, Menu, X, Loader2, Sparkles } from 'lucide-react';
import '../assets/styles/SearchBar.css';
import type { Venue } from '../models/Venue';
import { getVenuesById } from '../utils/getVenues';
import { ThinkingSearch } from '../utils/ThinkingSearch';

function SearchBar({ setListView }: { setListView: Dispatch<SetStateAction<Venue[]>> }) {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
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
    setSearchText('');
    setListView([])
  };

  const handleSubmit = async () => {
    if (!searchText.trim()) return;
    
    setIsSearching(true);
    try {
      const listVenueId = await ThinkingSearch(searchText);
      const listVenue: Venue[] = [];
      
      for (const id of listVenueId) {
        const venue = getVenuesById(id);
        if (venue) {
          listVenue.push(venue);
        }
      }
      
      setListView(listVenue);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSubmit();
    }
    setSearchText("");
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-header">
          <h1 className="search-title">
            <Sparkles className="sparkle-icon" size={28} />
            Tìm sân thể thao
          </h1>
          
        </div>

        <div className="search-box">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Thingking Search"
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSearching}
            />
            <Search className="search-icon-left" size={20} />
            {searchText && (
              <button
                onClick={handleClear}
                className={`clear-btn ${searchText ? 'show' : ''}`}
                aria-label="Xóa"
              >
                <X />
              </button>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="search-btn"
            disabled={isSearching || !searchText.trim()}
            aria-label="Tìm kiếm"
          >
            {isSearching ? (
              <>
                <Loader2 className="loader-icon" />
                Đang tìm...
              </>
            ) : (
              <>
                <Search />
                Tìm kiếm
              </>
            )}
          </button>
        </div>

        {isSearching && (
          <div className="search-status">
            <div className="status-dots">
              <div className="status-dot"></div>
              <div className="status-dot"></div>
              <div className="status-dot"></div>
            </div>
            <span>Đang tìm kiếm sân phù hợp cho bạn...</span>
          </div>
        )}
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

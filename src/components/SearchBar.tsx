import { useState, type Dispatch, type SetStateAction } from "react";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import "../assets/styles/SearchBar.css";
import type { Venue } from "../models/Venue";
import { getVenuesById } from "../utils/getVenues";
import { ThinkingSearch } from "../utils/ThinkingSearch";

interface SearchBarProps {
  searchText?: string;
  setSearchText?: (text: string) => void;
  setListView?: Dispatch<SetStateAction<Venue[]>>;
}

function SearchBar({
  searchText: externalSearchText,
  setSearchText: externalSetSearchText,
  setListView,
}: SearchBarProps = {}) {
  const [internalSearchText, setInternalSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchText =
    externalSearchText !== undefined ? externalSearchText : internalSearchText;
  const setSearchText = externalSetSearchText || setInternalSearchText;

  const handleClear = () => {
    setSearchText("");
    if (setListView) {
      setListView([]);
    }
  };

  const handleSubmit = async () => {
    if (!searchText.trim()) return;

    setIsSearching(true);
    try {
      if (setListView) {
        const listVenueId = await ThinkingSearch(searchText);
        const listVenue: Venue[] = [];

        for (const id of listVenueId) {
          const venue = await getVenuesById(id);
          if (venue) {
            listVenue.push(venue);
          }
        }

        setListView(listVenue);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSearching) {
      handleSubmit();
    }
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
              placeholder="Thinking Search"
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
                className={`clear-btn ${searchText ? "show" : ""}`}
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
      </div>
    </div>
  );
}

export default SearchBar;

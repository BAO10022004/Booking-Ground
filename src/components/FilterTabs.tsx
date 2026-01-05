import "../assets/styles/FilterTabs.css";
import { useState } from "react";
import { Heart, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FilterTabsProps {
  selectedCategory?: string;
  setSelectedCategory?: (category: string | undefined) => void;
  showFavoritesOnly?: boolean;
  setShowFavoritesOnly?: (show: boolean) => void;
}

function FilterTabs({
  selectedCategory,
  setSelectedCategory,
  showFavoritesOnly,
  setShowFavoritesOnly,
}: FilterTabsProps = {}) {
  const navigate = useNavigate();
  const [favoriteActive, setFavoriteActive] = useState(showFavoritesOnly || false);

  const handleFavoriteClick = () => {
    const newState = !favoriteActive;
    setFavoriteActive(newState);
    if (setShowFavoritesOnly) {
      setShowFavoritesOnly(newState);
    }
  };

  const handleMapClick = () => {
    navigate("/home");
    const event = new CustomEvent("switchToMapTab");
    window.dispatchEvent(event);
  };

  const handleBookedClick = () => {
    navigate("/home");
    const event = new CustomEvent("switchToAccountTab");
    window.dispatchEvent(event);
  };

  return (
    <div className="filter-tabs">
      <div className="filter-tabs-container">
        <button
          className={`filter-icon-btn ${favoriteActive ? "active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Sân yêu thích"
          title="Sân yêu thích"
        >
          <Heart size={20} />
        </button>

        <button
          className="filter-icon-btn"
          onClick={handleMapClick}
          aria-label="Bản đồ"
          title="Bản đồ"
        >
          <MapPin size={20} />
        </button>

        <button
          className="filter-icon-btn"
          onClick={handleBookedClick}
          aria-label="Sân đã đặt"
          title="Sân đã đặt"
        >
          <Calendar size={20} />
        </button>
      </div>
    </div>
  );
}

export default FilterTabs;

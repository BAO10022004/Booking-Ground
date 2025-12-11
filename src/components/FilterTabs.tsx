import "../assets/styles/FilterTabs.css";
import { useState } from "react";
import { Heart, Building2, User, MapPin, Check } from "lucide-react";

function FilterTabs() {
  const [bookedChecked, setBookedChecked] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);

  return (
    <div className="filter-tabs">
      <div className="filter-tabs-container">
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={bookedChecked}
            onChange={(e) => setBookedChecked(e.target.checked)}
          />
          <span className="checkbox-custom">
            {bookedChecked && <Check size={14} />}
          </span>
          <span className="checkbox-label">Sân đã đặt</span>
        </label>

        <button
          className={`filter-icon-btn ${favoriteActive ? "active" : ""}`}
          onClick={() => setFavoriteActive(!favoriteActive)}
        >
          <Heart size={20} />
        </button>

        <button className="filter-icon-btn">
          <Building2 size={20} />
        </button>

        <button className="filter-icon-btn">
          <User size={20} />
        </button>

        <button className="filter-icon-btn">
          <MapPin size={20} />
        </button>
      </div>
    </div>
  );
}

export default FilterTabs;

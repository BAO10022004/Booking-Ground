import { Heart, Share2, Star, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/VenueGridView.css";
import { useVenues, useRatings, useAuth } from "../hooks";
import { getTimePeriodVenue } from "../utils/helpers";
import BookingTypeModal from "../pages/BookingTypeModal";
import VenueDetailModal from "./VenueDetailModal";
import type { Venue } from "../models/Venue";

interface VenueGridViewProps {
  search?: string;
  categoryId?: string;
  city?: string;
  district?: string;
  listView?: Venue[];
}

function VenueGridView({
  search,
  categoryId,
  city,
  district,
  listView,
}: VenueGridViewProps = {}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { venues: sportsVenues, loading } = useVenues(
    listView && listView.length > 0
      ? undefined
      : {
          search,
          category_id: categoryId,
          city,
          district,
        }
  );
  const { getAverageRating } = useRatings();
  const [favorites, setFavorites] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venue, setVenue] = useState<any | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const displayVenues =
    listView && listView.length > 0 ? listView : sportsVenues;

  const toggleFavorite = (id: unknown) => {
    if (!isAuthenticated) {
      navigate("/player/login");
      return;
    }
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <main className="home-page">
        <div className="venue-grid">
          <div>Đang tải...</div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="home-page">
        <div className="venue-grid">
          {displayVenues.map((venue) => (
            <div
              key={venue.venueId || venue.id}
              className="venue-card"
              onClick={() => {
                setSelectedVenueId(venue.venueId || venue.id);
                setIsDetailModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="venue-image-container">
                <img
                  src={venue.image || venue.images?.[0]?.image_url}
                  alt={venue.name}
                  className="venue-image"
                />

                {(() => {
                  const rating = getAverageRating(venue.venueId || venue.id);
                  return rating !== null ? (
                    <div className="venue-rating">
                      <Star className="rating-star" />
                      <span className="rating-text">{rating}</span>
                    </div>
                  ) : null;
                })()}
                <div className="venue-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(venue.venueId || venue.id);
                    }}
                    className="action-button"
                    aria-label="Yêu thích"
                  >
                    <Heart
                      className={`action-icon ${
                        favorites.has(venue.venueId || venue.id)
                          ? "favorite"
                          : ""
                      }`}
                    />
                  </button>
                  <button
                    className="action-button"
                    aria-label="Chia sẻ"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 className="action-icon" />
                  </button>
                </div>
              </div>

              <div className="venue-info">
                <h3 className="venue-name">{venue.name}</h3>
                <div className="venue-location">
                  <MapPin className="location-icon" />
                  <span className="location-text">
                    {venue.district} | {venue.address}
                  </span>
                </div>
                <div className="venue-footer">
                  <div className="venue-time">
                    <Clock className="time-icon" />
                    <span>{getTimePeriodVenue(venue)}</span>
                  </div>
                  <button
                    className="book-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVenue(venue);
                      setIsModalOpen(true);
                    }}
                  >
                    ĐẶT LỊCH
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BookingTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        venue={venue}
      />
      <VenueDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedVenueId(null);
        }}
        venueId={selectedVenueId}
        onBookClick={() => {
          setIsDetailModalOpen(false);
          const selectedVenue = displayVenues.find(
            (v) => (v.venueId || v.id) === selectedVenueId
          );
          if (selectedVenue) {
            setVenue(selectedVenue);
            setIsModalOpen(true);
          }
        }}
      />
    </>
  );
}

export default VenueGridView;

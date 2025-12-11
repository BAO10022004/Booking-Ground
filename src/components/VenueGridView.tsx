import { Heart, Share2, Star, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/VenueGridView.css";
import { useVenues, useRatings, useAuth } from "../hooks";
import { getTimePeriodVenue } from "../utils/helpers";
import BookingTypeModal from "../pages/BookingTypeModal";

function VenueGridView() {
  const [sportsVenues, setSportsVenues] = useState<any[]>([]);
import VenueDetailModal from "./VenueDetailModal";

interface VenueGridViewProps {
  search?: string;
  categoryId?: string;
  city?: string;
  district?: string;
}

function VenueGridView({
  search,
  categoryId,
  city,
  district,
}: VenueGridViewProps = {}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { venues: sportsVenues, loading } = useVenues({
    search,
    category_id: categoryId,
    city,
    district,
  });
  const { getAverageRating } = useRatings();
  const [favorites, setFavorites] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venue, setVenue] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venues = await getGrounds();
        setSportsVenues(venues);
      } catch (error) {
        console.error("Error loading venues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

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
          {sportsVenues.map((venue) => (
            <div
              key={venue.venueId}
              className="venue-card"
              onClick={() => {
                setSelectedVenueId(venue.venueId);
                setIsDetailModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="venue-image-container">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="venue-image"
                />

                {(() => {
                  const rating = getAverageRating(venue.venueId);
                  return rating !== null ? (
                    <div className="venue-rating">
                      <Star className="rating-star" />
                      <span className="rating-text">{rating}</span>
                    </div>
                  ) : null;
                })()}
                <div className="venue-actions">
                  <button
                    onClick={() => toggleFavorite(venue.venueId)}
                    className="action-button"
                    aria-label="Yêu thích"
                  >
                    <Heart
                      className={`action-icon ${
                        favorites.has(venue.venueId) ? "favorite" : ""
                      }`}
                    />
                  </button>
                  <button className="action-button" aria-label="Chia sẻ">
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
          const selectedVenue = sportsVenues.find(
            (v) => v.venueId === selectedVenueId
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

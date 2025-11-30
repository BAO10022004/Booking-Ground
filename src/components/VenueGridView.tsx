import { Heart, Share2, Star, MapPin, Clock } from 'lucide-react';
import getGrounds from '../utils/get_ground';
import { useState } from 'react';
import '../assets/styles/VenueGridView.css';
import { useNavigate } from 'react-router-dom'; 
import GetRating from '../utils/getRating';
import GetTimePeriodVenue from '../utils/getTimeVenue';
function VenueGridView() {
  const sportsVenues = getGrounds();
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  const toggleFavorite = (id: unknown) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };
  
  return (
    <>
      <main className="home-page">
        <div className="venue-grid">
          {sportsVenues.map((venue) => (
            <div key={venue.venueId} className="venue-card">
              <div className="venue-image-container">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="venue-image"
                />
                
                {GetRating(venue) && (
                  <div className="venue-rating">
                    <Star className="rating-star" />
                    <span className="rating-text">{GetRating(venue)}</span>
                  </div>
                )}
                <div className="venue-actions">
                  <button 
                    onClick={() => toggleFavorite(venue.venueId)}
                    className="action-button"
                    aria-label="Yêu thích"
                  >
                    <Heart 
                      className={`action-icon ${favorites.has(venue.venueId) ? 'favorite' : ''}`}
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
                  <span className="location-text">{venue.district} | {venue.address}</span>
                </div>
                <div className="venue-footer">
                  <div className="venue-time">
                    <Clock className="time-icon" />
                   <span>{GetTimePeriodVenue(venue)}</span>
                  </div>
                  <button 
                    className="book-button" 
                    onClick={() => navigate('/booking',  { state: { venue } })}
                  >
                    ĐẶT LỊCH
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal nằm ngoài main để hiển thị đúng */}
      {/* <BookingTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
}

export default VenueGridView;
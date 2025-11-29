import { Heart, Share2, Star, MapPin, Clock } from 'lucide-react';
import getGrounds from '../utils/get_ground';
import { useState } from 'react';
import '../assets/styles/VenueGridView.css';

function VenueGridView() {
  const sportsVenues = getGrounds();
  const [favorites, setFavorites] = useState(new Set());
  
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
    <main className="home-page">
      <div className="venue-grid">
        {sportsVenues.map((venue) => (
          <div key={venue.id} className="venue-card">
            <div className="venue-image-container">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="venue-image"
              />
              <div className="venue-tags">
                {venue.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className={`venue-tag ${
                      tag === 'Đơn ngay' ? 'tag-immediate' :
                      tag === 'Đơn tháng' ? 'tag-monthly' :
                      'tag-event'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {venue.rating && (
                <div className="venue-rating">
                  <Star className="rating-star" />
                  <span className="rating-text">{venue.rating}</span>
                </div>
              )}
              <div className="venue-actions">
                <button 
                  onClick={() => toggleFavorite(venue.id)}
                  className="action-button"
                  aria-label="Yêu thích"
                >
                  <Heart 
                    className={`action-icon ${favorites.has(venue.id) ? 'favorite' : ''}`}
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
                <span className="location-text">{venue.distance} | {venue.address}</span>
              </div>
              <div className="venue-footer">
                <div className="venue-time">
                  <Clock className="time-icon" />
                  <span>{venue.time}</span>
                </div>
                <button className="book-button">
                  ĐẶT LỊCH
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default VenueGridView;
import {Venue} from '../models/Venue';
import { useState } from 'react';
import {  MapPin} from 'lucide-react';


function VenueInfoSection({ venue }: { venue: Venue }) {
    const [showVenueInfo, setShowVenueInfo] = useState(true);
    return (
        <div className="info-card">
          <button 
            className="info-card-header"
            onClick={() => setShowVenueInfo(!showVenueInfo)}
          >
            <div className="info-card-header-left">
              <MapPin size={20} />
              <span>Thông tin sân</span>
            </div>
            <span className={`toggle-icon ${showVenueInfo ? 'open' : ''}`}>▼</span>
          </button>
          
          {showVenueInfo && (
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label">Tên CLB:</span>
                <span className="info-value">{venue?.name }</span>
              </div>
              <div className="info-row">
                <span className="info-label">Địa chỉ:</span>
                <span className="info-value">
                  {venue?.address }
                </span>
              </div>
            </div>
          )}
        </div>

    )
}
export default VenueInfoSection;
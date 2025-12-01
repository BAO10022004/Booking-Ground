import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Account from '../models/account';
import '../assets/styles/CustomerInfoSection.css';
// Danh sách mã vùng phổ biến
const countryCodes = [
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
];

function CustomerInfoSection({
  account,
  customerName,
  setCustomerName,
  setPhoneNumber,
  notes,
  setNotes,
  phoneNumber
}: {
  account: Account | null;
  customerName: string;
  setCustomerName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  phoneNumber: string;
}) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countryCodes.filter(
    country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery) ||
      country.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <div className="form-section">

      <div className="form-group">
        <label className="form-label">TÊN CỦA BẠN</label>
        <input
          type="text"
          className="form-input"
          placeholder={account?.fullName || "Nhập tên của bạn"}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">SỐ ĐIỆN THOẠI</label>
        <div className="phone-input-wrapper">
          <div className="country-code-selector">
            <button
              type="button"
              className={`country-code ${showDropdown ? 'open' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="country-code-text">
                <span className="country-flag">{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
              </span>
              <ChevronDown
                size={18}
                className={`chevron-icon ${showDropdown ? 'open' : ''}`}
              />
            </button>

            {showDropdown && (
              <>
                <div
                  className="dropdown-overlay"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="country-dropdown">
                  <div className="dropdown-search">
                    <input
                      type="text"
                      placeholder="Tìm kiếm quốc gia..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="dropdown-list">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        className={`dropdown-item ${
                          selectedCountry.code === country.code ? 'selected' : ''
                        }`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="dropdown-item-flag">{country.flag}</span>
                        <div className="dropdown-item-info">
                          <span className="dropdown-item-name">{country.name}</span>
                          <span className="dropdown-item-code">{country.code}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <input
            type="tel"
            className="form-input phone-input"
            placeholder={account?.phoneNumber || "Nhập số điện thoại"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">GHI CHÚ CHO CHỦ SÂN</label>
        <textarea
          className="form-textarea"
          placeholder="Nhập ghi chú"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
export default CustomerInfoSection;
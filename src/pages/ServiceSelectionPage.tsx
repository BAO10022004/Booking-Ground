import React, { useState } from 'react';
import '../assets/styles/ServiceSelectionPage.css';
import { useNavigate } from 'react-router-dom';
interface ServiceItem {
  serviceListDetailID: string;
  name: string;
  wholesale: string;
  unitWholesale: string;
  retail: string;
  unitRetail: string;
  serviceListID: string;
  image?: string;
}

interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

const ServiceSelectionPage: React.FC = () => {
    const nav = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Nước giải khát');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  // Sample data
  const serviceData: ServiceCategory[] = [
    {
      category: 'Nước giải khát',
      items: [
        {
          serviceListDetailID: 'sld-001-001',
          name: '7UP (Chai)',
          wholesale: '10.000 đ',
          unitWholesale: '1 Chai',
          retail: '10.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-002',
          name: 'Aquafina (Chai)',
          wholesale: '7.000 đ',
          unitWholesale: '1 Chai',
          retail: '7.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-003',
          name: 'AQUAFINA (Chai)',
          wholesale: '18.000 đ',
          unitWholesale: '1 Chai',
          retail: '18.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-004',
          name: 'Pepsi (Chai)',
          wholesale: '10.000 đ',
          unitWholesale: '1 Chai',
          retail: '10.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-005',
          name: 'POCARI (Chai)',
          wholesale: '18.000 đ',
          unitWholesale: '1 Chai',
          retail: '18.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-006',
          name: 'Revive trắng (Chai)',
          wholesale: '10.000 đ',
          unitWholesale: '1 Chai',
          retail: '10.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        },
        {
          serviceListDetailID: 'sld-001-007',
          name: 'Trà ô long (Chai)',
          wholesale: '10.000 đ',
          unitWholesale: '1 Chai',
          retail: '10.000 đ',
          unitRetail: '1 Chai',
          serviceListID: 'sl-v-132sg-001-001'
        }
      ]
    },
    {
      category: 'Chưa phân loại',
      items: [
        {
          serviceListDetailID: 'sld-002-001',
          name: 'THUÊ MÁY BẮN BÓNG (Giờ)',
          wholesale: '100.000 đ',
          unitWholesale: '1 Giờ',
          retail: '100.000 đ',
          unitRetail: '1 Giờ',
          serviceListID: 'sl-v-132sg-001-002'
        },
        {
          serviceListDetailID: 'sld-002-002',
          name: 'THUÊ VỢT (LƯỢT)',
          wholesale: '10.000 đ',
          unitWholesale: '1 LƯỢT',
          retail: '10.000 đ',
          unitRetail: '1 LƯỢT',
          serviceListID: 'sl-v-132sg-001-002'
        },
        {
          serviceListDetailID: 'sld-002-003',
          name: 'THUÊ XE VÀ BÓNG TẬP (LƯỢT)',
          wholesale: '30.000 đ',
          unitWholesale: '1 LƯỢT',
          retail: '30.000 đ',
          unitRetail: '1 LƯỢT',
          serviceListID: 'sl-v-132sg-001-002'
        }
      ]
    }
  ];

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const filteredData = serviceData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const currentCategoryData = filteredData.find(cat => cat.category === activeCategory);

  return (
    <div className="service-selection-page">
      <header className="service-header">
        <button className="back-button" onClick={()=> nav(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="service-title">Dịch vụ dành cho bạn</h1>
      </header>

      <div className="service-content">
        <div className="search-container">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="2"/>
            <path d="M14 14L18 18" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Nhập tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {serviceData.map(category => (
            <button
              key={category.category}
              className={`category-tab ${activeCategory === category.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="service-section">
          <h2 className="section-title">{activeCategory}</h2>
          
          <div className="service-grid">
            {currentCategoryData?.items.map(item => (
              <div key={item.serviceListDetailID} className="service-item">
                <div className="service-image">
                  <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                    <rect x="8" y="10" width="24" height="45" rx="3" fill="#E8E8E8"/>
                    <ellipse cx="20" cy="8" rx="6" ry="3" fill="#D0D0D0"/>
                    <rect x="10" y="8" width="20" height="2" fill="#D0D0D0"/>
                  </svg>
                </div>
                
                <div className="service-details">
                  <h3 className="service-name">{item.name}</h3>
                  <div className="service-price">
                    <span className="price">{item.retail}</span>
                    <span className="unit">/ {item.unitRetail}</span>
                  </div>
                </div>

                {selectedItems[item.serviceListDetailID] ? (
                  <div className="quantity-control">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.serviceListDetailID, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{selectedItems[item.serviceListDetailID]}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.serviceListDetailID, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    className="add-button"
                    onClick={() => handleQuantityChange(item.serviceListDetailID, 1)}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" fill="#00A550"/>
                      <path d="M10 6V14M6 10H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionPage;
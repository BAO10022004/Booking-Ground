import React, { useState, useEffect } from "react";
import "../assets/styles/ServiceSelectionPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useVenueServices } from "../hooks/useVenueDetails";

interface ServiceItem {
  serviceListDetailID: string;
  id: string;
  name: string;
  wholesale: string;
  unit_wholesale: string;
  retail: string;
  unit_retail: string;
  serviceListID: string;
  image?: string;
}

interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

const ServiceSelectionPage: React.FC = () => {
  const nav = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();
  const { services, loading: servicesLoading } = useVenueServices(venueId);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );

  // Transform services from API to ServiceCategory format
  const serviceData: ServiceCategory[] = services
    .map((serviceList) => ({
      category: serviceList.name || "Chưa phân loại",
      items: (serviceList.details || []).map((detail) => ({
        serviceListDetailID: detail.id,
        id: detail.id,
        name: detail.name,
        wholesale: detail.wholesale || "-",
        unit_wholesale: detail.unit_wholesale || "-",
        retail: detail.retail || "-",
        unit_retail: detail.unit_retail || "-",
        serviceListID: serviceList.id,
      })),
    }))
    .filter((cat) => cat.items.length > 0);

  useEffect(() => {
    if (serviceData.length > 0 && !activeCategory) {
      setActiveCategory(serviceData[0].category);
    }
  }, [services]);

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems((prev) => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const filteredData = serviceData
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const currentCategoryData = filteredData.find(
    (cat) => cat.category === activeCategory
  );

  if (servicesLoading) {
    return (
      <div className="service-selection-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Đang tải dịch vụ...
        </div>
      </div>
    );
  }

  if (!venueId) {
    return (
      <div className="service-selection-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Không tìm thấy thông tin sân
        </div>
        <button onClick={() => nav(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className="service-selection-page">
      <header className="service-header">
        <button className="back-button" onClick={() => nav(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="service-title">Dịch vụ dành cho bạn</h1>
      </header>

      <div className="service-content">
        <div className="search-container">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="2" />
            <path
              d="M14 14L18 18"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Nhập tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {serviceData.length > 0 ? (
          <>
            <div className="category-tabs">
              {serviceData.map((category) => (
                <button
                  key={category.category}
                  className={`category-tab ${
                    activeCategory === category.category ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.category)}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div className="service-section">
              <h2 className="section-title">{activeCategory}</h2>

              <div className="service-grid">
                {currentCategoryData?.items.map((item) => (
                  <div
                    key={item.id || item.serviceListDetailID}
                    className="service-item"
                  >
                    <div className="service-image">
                      <svg
                        width="40"
                        height="60"
                        viewBox="0 0 40 60"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="10"
                          width="24"
                          height="45"
                          rx="3"
                          fill="#E8E8E8"
                        />
                        <ellipse cx="20" cy="8" rx="6" ry="3" fill="#D0D0D0" />
                        <rect
                          x="10"
                          y="8"
                          width="20"
                          height="2"
                          fill="#D0D0D0"
                        />
                      </svg>
                    </div>

                    <div className="service-details">
                      <h3 className="service-name">{item.name}</h3>
                      <div className="service-price">
                        <span className="price">{item.retail}</span>
                        <span className="unit">/ {item.unit_retail}</span>
                      </div>
                    </div>

                    {selectedItems[item.id || item.serviceListDetailID] ? (
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(
                              item.id || item.serviceListDetailID,
                              -1
                            )
                          }
                        >
                          −
                        </button>
                        <span className="qty-value">
                          {selectedItems[item.id || item.serviceListDetailID]}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleQuantityChange(
                              item.id || item.serviceListDetailID,
                              1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-button"
                        onClick={() =>
                          handleQuantityChange(
                            item.id || item.serviceListDetailID,
                            1
                          )
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <circle cx="10" cy="10" r="9" fill="#00A550" />
                          <path
                            d="M10 6V14M6 10H14"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <p>Chưa có dịch vụ nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelectionPage;

import '../assets/styles/FilterTabs.css';
import { useState } from 'react';



function FilterTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: '🏠', label: 'Bán đồ' },
    { icon: '✅', label: 'Sân đã đặt' },
    { icon: '❤️', label: 'Yêu thích' }
  ];

  return (
    <div className="filter-tabs">
      <div className="filter-tabs-container">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`filter-tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;
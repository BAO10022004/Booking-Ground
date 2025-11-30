import { useState } from 'react'
import '../assets/styles/App.css'

// import component
import BottomNav from '../components/BottomNavigation';
import AccountPage from '../pages/AccountPage';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import VenueGridView from '../components/VenueGridView';
function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="app-container">  
      {activeTab === 'home' ? (
        <>
          <Header />
          <SearchBar />
          <FilterTabs />
          <VenueGridView />
        </>
      ) : activeTab === 'account' ? (
        <AccountPage />
      ) : (
        <main className="venue-grid">
          <h2>Trang {activeTab} đang được phát triển</h2>
        </main>
      )}
      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default HomePage;
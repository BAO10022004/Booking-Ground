import { useState } from 'react'
import '../assets/styles/App.css'

// import component
import BottomNav from '../components/BottomNavigation';
import AccountPage from '../pages/AccountPage';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import VenueGridView from '../components/VenueGridView';
import PromotionSlider from './PromotionSlider';
import { Venue } from '../models/Venue';
function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [listView, setListView] = useState<Venue[]>([]);

  return (
    <div className="app-container">  
      {activeTab === 'home' ? (
        <>
          <Header />
          <SearchBar setListView={setListView}/>
          {/* <FilterTabs /> */}
          <VenueGridView listView={listView}/>
        </>
      ) : activeTab === 'account' ? (
        <AccountPage />
      ) :  activeTab === 'promotion'?
        <PromotionSlider/>
    :<></>}
      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default HomePage;
import { useState } from 'react'
import './assets/styles/App.css'

// import component
import HomePage from './pages/HomePage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BottomNav from './components/BottomNavigation';
import FilterTabs from './components/FilterTabs';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="app-container">
      <Header />
      <SearchBar />
      <FilterTabs />
      
      {activeTab === 'home' ? (
        <HomePage />
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

export default App;
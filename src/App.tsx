import { useState } from 'react'
import './assets/styles/App.css'

// import component
import HomePage from './pages/HomePage';
import BottomNav from './components/BottomNavigation';
import AccountPage from './pages/AccountPage';
function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="app-container">
     
      
      {activeTab === 'home' ? (

        <HomePage />
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

export default App;
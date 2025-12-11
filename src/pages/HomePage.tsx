import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/App.css";
import { useAuth } from "../hooks";

import BottomNav from "../components/BottomNavigation";
import AccountPage from "../pages/AccountPage";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterTabs from "../components/FilterTabs";
import VenueGridView from "../components/VenueGridView";
import PromotionSlider from "./PromotionSlider";
import MapPage from "./MapPage";
function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (activeTab === "account" && !loading && !isAuthenticated) {
      navigate("/player/login");
      setActiveTab("home");
    }
  }, [activeTab, isAuthenticated, loading, navigate]);

  return (
    <div className="app-container">
      {activeTab === "home" ? (
        <>
          <Header />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <FilterTabs
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <VenueGridView search={searchText} categoryId={selectedCategory} />
        </>
      ) : activeTab === "map" ? (
        <MapPage />
      ) : activeTab === "account" ? (
        <AccountPage />
      ) : activeTab === "promotion" ? (
        <PromotionSlider />
      ) : (
        <></>
      )}
      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default HomePage;

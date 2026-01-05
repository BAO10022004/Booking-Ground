import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/App.css";
import BottomNav from "../components/BottomNavigation";
import AccountPage from "../pages/AccountPage";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterTabs from "../components/FilterTabs";
import VenueGridView from "../components/VenueGridView";
import PromotionSlider from "./PromotionSlider";
import MapPage from "./MapPage";
import { useAuth } from "../hooks";
import type { Venue } from "../models/Venue";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [listView, setListView] = useState<Venue[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    if (activeTab === "account" && !loading && !isAuthenticated) {
      navigate("/player/login");
      setActiveTab("home");
    }
  }, [activeTab, isAuthenticated, loading, navigate]);

  useEffect(() => {
    const handleSwitchToMapTab = () => {
      setActiveTab("map");
    };
    const handleSwitchToAccountTab = () => {
      setActiveTab("account");
    };

    window.addEventListener("switchToMapTab", handleSwitchToMapTab);
    window.addEventListener("switchToAccountTab", handleSwitchToAccountTab);

    return () => {
      window.removeEventListener("switchToMapTab", handleSwitchToMapTab);
      window.removeEventListener(
        "switchToAccountTab",
        handleSwitchToAccountTab
      );
    };
  }, []);

  return (
    <div className="app-container">
      {activeTab === "home" ? (
        <>
          <Header />
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            setListView={setListView}
          />
          <FilterTabs
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
          />
          <VenueGridView
            search={searchText}
            categoryId={selectedCategory}
            listView={listView}
            showFavoritesOnly={showFavoritesOnly}
          />
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
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default HomePage;

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import VenueGridView from '../components/VenueGridView';

function HomePage() {
  return (
    <>
      <Header />
      <SearchBar />
      <FilterTabs />
      <VenueGridView />
    </>
  );
}

export default HomePage;

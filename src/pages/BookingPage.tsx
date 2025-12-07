import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingEventPage from './BookingEventPage';

function BookingPage() {
  const navigate = useNavigate();
  const { venueId } = useParams<{
    venueId: string;
  }>();

  // Validate params
  useEffect(() => {
    if (!venueId ) {
      console.error('Missing venueId or categoryId in URL');
      // Redirect về trang chủ hoặc venue list
      navigate('/');
    }
  }, [venueId, navigate]);

  // Show loading nếu không có params
  if (!venueId ) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        <div>Đang tải...</div>
      </div>
    );
  }
  return (
    <BookingEventPage 
      venueId={venueId} 
    />
  );
}

export default BookingPage;
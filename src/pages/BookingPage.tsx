import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingEventPage from './BookingEventPage';

/**
 * BookingPage - Wrapper component để lấy URL params và truyền vào BookingEventPage
 * URL format: /booking/:venueId/:categoryId
 * Example: /booking/v-132sg-001/1
 */
function BookingPage() {
  const navigate = useNavigate();
  
  // ✅ SỬA: Dùng useParams thay vì useSearchParams
  // Vì route của bạn là /booking/:venueId/:categoryId
  const { venueId, categoryId } = useParams<{
    venueId: string;
    categoryId: string;
  }>();

  // Validate params
  useEffect(() => {
    if (!venueId || !categoryId) {
      console.error('Missing venueId or categoryId in URL');
      // Redirect về trang chủ hoặc venue list
      navigate('/');
    }
  }, [venueId, categoryId, navigate]);

  // Show loading nếu không có params
  if (!venueId || !categoryId) {
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

  console.log('📍 URL Params:', { venueId, categoryId });

  return (
    <BookingEventPage 
      venueId={venueId} 
      categoryId={categoryId}
    />
  );
}

export default BookingPage;
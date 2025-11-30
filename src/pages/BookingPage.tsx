import React, { useState } from 'react';
import BookingEventPage from './BookingEventPage';
import Venue from '../models/Venue';
import { useLocation } from 'react-router-dom';
function BookingPage() {
    const location = useLocation();
    const venue = location.state; 
    return <BookingEventPage venue={venue} />;
}


export default BookingPage;
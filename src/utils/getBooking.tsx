import Booking from "../models/booking";

const bookings: Booking[] = [];

function addBooking(booking: Booking) {
    bookings.push(booking);
}

function getBookingsById(bookingId: string): Booking[] {
    const filteredBookings = bookings.filter(b => b.bookingId === bookingId);
    return filteredBookings;
}
export default { addBooking, getBookingsById };


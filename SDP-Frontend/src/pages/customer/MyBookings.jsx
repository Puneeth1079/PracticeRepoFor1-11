import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    // 👇 THIS useEffect HOOK IS THE ONLY PART THAT CHANGES
    useEffect(() => {
        if (user) {
            const fetchBookings = async () => {
                try {
                    const response = await api.get(`/customer/viewmybookings/${user.id}`);
                    setBookings(response.data);
                } catch (error) {
                    console.error("Failed to fetch bookings:", error);
                }
            };
            fetchBookings();
        }
    }, []); // 👈 The dependency array is now empty

    const handleCancelBooking = async (booking) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            const updatedBooking = { ...booking, status: 'Cancelled' };
            try {
                await api.post('/customer/updatebooking', updatedBooking);
                alert("Booking cancelled successfully.");
                // Re-fetch the bookings to show the updated status immediately
                const response = await api.get(`/customer/viewmybookings/${user.id}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Failed to cancel booking:", error);
                alert("Could not cancel the booking.");
            }
        }
    };

    return (
        <div className="management-container">
            <h1>My Bookings</h1>
            {bookings.length > 0 ? (
                <table className="management-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Hotel Name</th>
                            <th>Room Number</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.room.manager.hotelName}</td>
                                <td>{booking.room.roomNumber}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status !== 'Cancelled' && (
                                        <button onClick={() => handleCancelBooking(booking)} className="delete-button">
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have no bookings yet.</p>
            )}
        </div>
    );
}
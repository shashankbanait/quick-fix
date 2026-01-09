import React, { useState, useEffect } from 'react';
import { bookingsService, ratingsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingForm, setRatingForm] = useState({ bookingId: null, rating: 5, comment: '' });
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingsService.getMyBookings();
      setBookings(res.data.bookings);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingsService.updateStatus(bookingId, newStatus);
      fetchBookings();
      alert('Booking updated successfully');
    } catch (err) {
      alert('Failed to update booking');
      console.error(err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsService.cancel(bookingId);
        fetchBookings();
        alert('Booking cancelled');
      } catch (err) {
        alert('Failed to cancel booking');
        console.error(err);
      }
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await ratingsService.create({
        bookingId: ratingForm.bookingId,
        rating: parseInt(ratingForm.rating),
        comment: ratingForm.comment,
      });
      setShowRatingForm(false);
      setRatingForm({ bookingId: null, rating: 5, comment: '' });
      fetchBookings();
      alert('Rating submitted successfully');
    } catch (err) {
      alert('Failed to submit rating');
      console.error(err);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1>My Bookings</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings yet</div>
      ) : (
        <div>
          {bookings.map((booking) => (
            <div key={booking._id} className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">{booking.serviceId?.serviceName}</h3>
                  <p style={{ color: '#7f8c8d' }}>
                    {user?.id === booking.providerId._id ? 'Customer: ' : 'Provider: '}
                    {user?.id === booking.providerId._id
                      ? booking.customerId?.name
                      : booking.providerId?.name}
                  </p>
                </div>
                <div>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      backgroundColor:
                        booking.status === 'completed'
                          ? '#d4edda'
                          : booking.status === 'cancelled'
                          ? '#f8d7da'
                          : '#d1ecf1',
                      color:
                        booking.status === 'completed'
                          ? '#155724'
                          : booking.status === 'cancelled'
                          ? '#721c24'
                          : '#0c5460',
                    }}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Time:</strong> {booking.bookingTime}
                </div>
                <div>
                  <strong>Location:</strong> {booking.location}
                </div>
                <div>
                  <strong>Estimated Cost:</strong> ${booking.estimatedCost}
                </div>
                <div>
                  <strong>Payment Status:</strong> {booking.paymentStatus}
                </div>
              </div>

              {booking.description && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Details:</strong> {booking.description}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {user?.id === booking.providerId._id && booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                      className="btn btn-success"
                      style={{ flex: '0 1 auto' }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                      className="btn btn-danger"
                      style={{ flex: '0 1 auto' }}
                    >
                      Decline
                    </button>
                  </>
                )}

                {booking.status === 'confirmed' && user?.id === booking.providerId._id && (
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'completed')}
                    className="btn btn-success"
                    style={{ flex: '0 1 auto' }}
                  >
                    Mark Complete
                  </button>
                )}

                {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="btn btn-danger"
                    style={{ flex: '0 1 auto' }}
                  >
                    Cancel
                  </button>
                )}

                {booking.status === 'completed' && user?.id === booking.customerId._id && (
                  <button
                    onClick={() => {
                      setRatingForm({ bookingId: booking._id, rating: 5, comment: '' });
                      setShowRatingForm(true);
                    }}
                    className="btn btn-primary"
                    style={{ flex: '0 1 auto' }}
                  >
                    Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showRatingForm && (
        <div className="card" style={{ marginTop: '2rem', maxWidth: '500px' }}>
          <h3>Leave a Review</h3>
          <form onSubmit={handleRatingSubmit}>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={ratingForm.rating}
                onChange={(e) =>
                  setRatingForm({ ...ratingForm, rating: e.target.value })
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={ratingForm.comment}
                onChange={(e) =>
                  setRatingForm({ ...ratingForm, comment: e.target.value })
                }
                placeholder="Share your experience..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRatingForm(false);
                  setRatingForm({ bookingId: null, rating: 5, comment: '' });
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Bookings;

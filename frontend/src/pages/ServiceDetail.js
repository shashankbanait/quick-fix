import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesService, ratingsService, bookingsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [service, setService] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    bookingDate: '',
    bookingTime: '',
    location: '',
    description: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [serviceRes, ratingsRes] = await Promise.all([
          servicesService.getById(id),
          ratingsService.getServiceRatings(id),
        ]);
        setService(serviceRes.data.service);
        setRatings(ratingsRes.data.ratings);
      } catch (err) {
        setError('Failed to load service details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to book a service');
      return;
    }

    try {
      await bookingsService.create({
        serviceId: id,
        ...bookingForm,
      });
      alert('Booking created successfully!');
      setShowBookingForm(false);
      setBookingForm({
        bookingDate: '',
        bookingTime: '',
        location: '',
        description: '',
      });
    } catch (err) {
      alert('Failed to create booking');
      console.error(err);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!service) return <div className="alert alert-error">Service not found</div>;

  return (
    <div className="container">
      <Link to="/services">← Back to Services</Link>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <div>
            <h1 className="card-title">{service.serviceName}</h1>
            <p style={{ color: '#7f8c8d' }}>By {service.providerId?.name}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="service-price">${service.basePrice}</div>
            <div className="service-rating">
              <span className="stars">★★★★★</span>
              <span>
                {service.rating.toFixed(1)} ({service.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <p style={{ marginBottom: '1rem' }}>{service.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <strong>Experience:</strong> {service.experience} years
          </div>
          <div>
            <strong>Service Area:</strong> {service.serviceArea}
          </div>
          {service.certifications && service.certifications.length > 0 && (
            <div>
              <strong>Certifications:</strong> {service.certifications.join(', ')}
            </div>
          )}
          <div>
            <strong>Status:</strong> {service.isAvailable ? 'Available' : 'Not Available'}
          </div>
        </div>

        {isAuthenticated && user?.userType === 'customer' && (
          <div>
            {!showBookingForm ? (
              <button onClick={() => setShowBookingForm(true)} className="btn btn-primary">
                Book This Service
              </button>
            ) : (
              <form onSubmit={handleBooking}>
                <h3>Book Service</h3>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingForm.bookingDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="bookingTime"
                    value={bookingForm.bookingTime}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Location</label>
                  <input
                    type="text"
                    name="location"
                    value={bookingForm.location}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Additional Details</label>
                  <textarea
                    name="description"
                    value={bookingForm.description}
                    onChange={handleBookingChange}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Reviews ({ratings.length})</h2>
        {ratings.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          ratings.map((rating) => (
            <div key={rating._id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{rating.customerId?.name}</strong>
                <span className="stars">{'★'.repeat(rating.rating)}</span>
              </div>
              <p>{rating.comment}</p>
              <small style={{ color: '#7f8c8d' }}>
                {new Date(rating.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;

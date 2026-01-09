import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesService } from '../services/api';
import '../styles/Navbar.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    serviceName: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesService.getAll(filters);
      setServices(res.data.services);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      serviceName: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };

  const serviceTypes = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Home Cleaning'];

  return (
    <div className="container">
      <h1>Browse Services</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Filters</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              placeholder="Search services..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>Service Type</label>
            <select
              name="serviceName"
              value={filters.serviceName}
              onChange={handleFilterChange}
            >
              <option value="">All Services</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Minimum price"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Maximum price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <button onClick={handleReset} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Reset Filters
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="spinner"></div>
      ) : services.length === 0 ? (
        <div className="alert alert-info">No services found matching your criteria</div>
      ) : (
        <>
          <p style={{ marginBottom: '1rem' }}>Found {services.length} services</p>
          <div className="grid">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <div className="service-card-body">
                  <h3 className="service-name">{service.serviceName}</h3>
                  <p className="service-provider">By {service.providerId?.name}</p>
                  <p className="service-description">{service.description.substring(0, 100)}...</p>
                  <div className="service-price">${service.basePrice}</div>
                  <div className="service-rating">
                    <span className="stars">★★★★★</span>
                    <span>
                      {service.rating.toFixed(1)} ({service.totalReviews})
                    </span>
                  </div>
                  <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <strong>Experience:</strong> {service.experience} years
                  </div>
                  <div className="service-actions">
                    <Link to={`/services/${service._id}`} className="view-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Services;

import React, { useState, useEffect } from 'react';
import { servicesService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    basePrice: '',
    experience: '',
    serviceArea: '',
    certifications: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesService.getByProvider(user?.id);
      setServices(res.data.services);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servicesService.create({
        ...formData,
        basePrice: Number(formData.basePrice),
        experience: Number(formData.experience),
        certifications: formData.certifications
          .split(',')
          .map((c) => c.trim())
          .filter((c) => c),
      });
      alert('Service created successfully!');
      setShowForm(false);
      setFormData({
        serviceName: '',
        description: '',
        basePrice: '',
        experience: '',
        serviceArea: '',
        certifications: '',
      });
      fetchServices();
    } catch (err) {
      alert('Failed to create service');
      console.error(err);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesService.delete(serviceId);
        alert('Service deleted successfully');
        fetchServices();
      } catch (err) {
        alert('Failed to delete service');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1>Service Provider Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ marginBottom: '2rem' }}>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Add New Service
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="card">
            <h3>Create New Service</h3>

            <div className="form-group">
              <label>Service Type</label>
              <select
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Home Cleaning">Home Cleaning</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Base Price ($)</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Service Area</label>
              <input
                type="text"
                name="serviceArea"
                value={formData.serviceArea}
                onChange={handleChange}
                placeholder="e.g., Downtown, North Side"
                required
              />
            </div>

            <div className="form-group">
              <label>Certifications (comma-separated)</label>
              <input
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="e.g., Licensed, Insured, EPA Certified"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                Create Service
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <h2>My Services</h2>
      {services.length === 0 ? (
        <div className="alert alert-info">No services yet</div>
      ) : (
        <div className="grid">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="service-card-body">
                <h3 className="service-name">{service.serviceName}</h3>
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
                <div style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <strong>Area:</strong> {service.serviceArea}
                </div>
                <div style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <strong>Status:</strong> {service.isAvailable ? 'Available' : 'Not Available'}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

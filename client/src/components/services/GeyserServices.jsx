/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
import getServicesByCategory from '../../api/service';

function GeyserServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = 'geyser';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesByCategory(name);
        console.log('Geyser Services:', data);
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching geyser services:', err);
        setError('Failed to load geyser services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading geyser services...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ServicesCard services={services} name={name} category={name} />
    </div>
  );
}

export default GeyserServices;

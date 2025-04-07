/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
import getServicesByCategory from '../../api/service';

function GardnerServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = 'gardener';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesByCategory(name);
        console.log('Gardner Services:', data);
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gardner services:', err);
        setError('Failed to load gardner services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading gardner services...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ServicesCard services={services} name={name} category={name} />
    </div>
  );
}

export default GardnerServices;

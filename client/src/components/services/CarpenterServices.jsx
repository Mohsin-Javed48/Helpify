/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
import getServicesByCategory from '../../api/service';

function CarpenterServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = 'carpenter';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesByCategory(name);
        console.log('Carpenter Services:', data);
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching carpenter services:', err);
        setError('Failed to load carpenter services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading carpenter services...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ServicesCard services={services} name={name} category={name} />
    </div>
  );
}

export default CarpenterServices;

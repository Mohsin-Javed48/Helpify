/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
import getServicesByCategory from '../../api/service';

function HandymanServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = 'handyman';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesByCategory(name);
        console.log('Handyman Services:', data);
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching handyman services:', err);
        setError('Failed to load handyman services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading handyman services...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ServicesCard services={services} name={name} category={name} />
    </div>
  );
}

export default HandymanServices;

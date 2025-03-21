/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
import getServicesByCategory from '../../api/service';

function PlumberServices() {
  const [services, setServices] = useState([]); // Manage services state
  const [error, setError] = useState(null); // Manage error state if any

  useEffect(() => {
    // Fetch plumber services
    getServicesByCategory('plumber')
      .then((data) => {
        if (data.message) {
          setServices([]); // No services found
        } else {
          setServices(data);
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching plumber services:', error);
        // setLoading(false);
      });
  }, []);
  const name = 'Plumber';
  console.log(services);

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  return (
    <div>
      {/* Render ServicesCard only when services are fetched */}
      {services.length > 0 ? (
        <ServicesCard services={services} name={name} />
      ) : (
        <p>Loading services...</p> // Loading indicator
      )}
    </div>
  );
}

export default PlumberServices;

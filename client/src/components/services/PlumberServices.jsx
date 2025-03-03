/** @format */

import React, { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';
// import getAllServices from '../../api/service';

function PlumberServices() {
  const [services, setServices] = useState([]); // Manage services state
  const [error, setError] = useState(null); // Manage error state if any

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  return (
    <div>
      {/* Render ServicesCard only when services are fetched
      {services.length > 0 ? (
        <ServicesCard services={services} name={name} />
      ) : (
        <p>Loading services...</p> // Loading indicator
      )} */}
      <h1>hello</h1>
    </div>
  );
}

export default PlumberServices;

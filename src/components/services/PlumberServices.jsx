/** @format */

import { useSelector } from "react-redux";
import ServicesCard from "./ServicesCard";

function PlumberServices() {
  const services = useSelector((state) => state.plumber.services);
  const name = "Plumber";
  return (
    <div>
      <ServicesCard services={services} name={name} />
    </div>
  );
}

export default PlumberServices;

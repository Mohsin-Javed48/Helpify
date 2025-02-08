/** @format */

import { useSelector } from "react-redux";
import ServicesCard from "./ServicesCard";

function PainterServices() {
  const services = useSelector((state) => state.painter.services);
  const name = "Painter";
  return (
    <div>
      <ServicesCard services={services} name={name} />
    </div>
  );
}

export default PainterServices;

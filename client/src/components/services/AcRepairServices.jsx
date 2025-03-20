/** @format */

import { useSelector } from "react-redux";
import ServicesCard from "./ServicesCard";

function AcRepairServices() {
  const services = useSelector((state) => state.acRepair.services);
  const name = "AcRepair";
  return (
    <div>
      <ServicesCard services={services} name={name} />
    </div>
  );
}

export default AcRepairServices;

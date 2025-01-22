import DateTimeSelector from "./DateTimeSelector";
import InformationForm from "./InformationForm";
import ServiceItems from "./ServiceItems";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <>
      <div className="flex flex-col relative">
        {/* Cross button */}

        <div
          onClick={() => navigate("/services")}
          className="cursor-pointer absolute top-0 right-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="76"
            height="68"
            viewBox="0 0 76 68"
            fill="none"
            className="w-[50px] h-[45px] sm:w-[55px] sm:h-[50px] md:w-[65px] md:h-[55px] lg:w-[70px] lg:h-[60px] xl:w-[76px] xl:h-[68px]"
          >
            <path d="M0 0H76V68H0V0Z" fill="black" />
            <path
              d="M48.5667 42.2142L37.9667 34.2485L27.3667 42.2142L25 40.4385L35.6167 32.4853L25 24.5321L27.3667 22.7563L37.9667 30.7221L48.5667 22.7689L50.9167 24.5321L40.3167 32.4853L50.9167 40.4385L48.5667 42.2142Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Order Information */}

        <div className="relative mt-[55px] container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="col-span-2">
            <DateTimeSelector />
            <ServiceItems />
            <InformationForm />
          </div>

          <OrderSummary />
        </div>
      </div>
    </>
  );
}

export default OrderPage;

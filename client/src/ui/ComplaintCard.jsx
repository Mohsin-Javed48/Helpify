const ComplaintCard = ({ customerName, customerId, complaintText }) => {
  return (
    <div className="w-full max-w-[1072px] bg-[#2A75D7] rounded-[17px] p-4 sm:p-6 text-[#FFF] ">
      {/* Customer Details */}
      <h3 className="text-[#333] text-[24px] font-inter font-medium">
        From {customerName}
      </h3>
      <p className="text-[#333] text-[20px] font-inter font-medium">
        Customer Id: {customerId}
      </p>

      {/* Complaint Text */}
      <p className="text-[#DBDBDB] text-[16px] sm:text-[20px] font-inter font-medium mt-2 mb-6">
        {complaintText}
      </p>
    </div>
  );
};

export default ComplaintCard;

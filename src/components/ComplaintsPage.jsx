import ComplaintCard from '../ui/ComplaintCard.jsx';

function ComplaintsPage() {
  return (
    <>
      {/*Complaints Page*/}
      <div className="px-4 sm:px-6  py-4 w-full min-h-[100vh] bg-[#161928]">
        {/* Page Title */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-poppins font-semibold text-[#ADB3CC] tracking-[-0.64px] mt-2 mb-6">
          Complaints
        </h2>

        {/*Complaint Cards*/}
        <div className="flex flex-col gap-5 p-4">
          <ComplaintCard
            customerName="Mohsin Javed"
            customerId="298232"
            complaintText="I booked a plumbing service through Helpify on January 2, 2025, scheduled for 3:00 PM - 5:00 PM. However, the service provider did not arrive at the scheduled time. I tried reaching out to them through the in-built chat feature, but I received no response. This has caused significant inconvenience as the plumbing issue remains unresolved."
          />
          <ComplaintCard
            customerName="Mohsin Javed"
            customerId="298232"
            complaintText="I booked a plumbing service through Helpify on January 2, 2025, scheduled for 3:00 PM - 5:00 PM. However, the service provider did not arrive at the scheduled time. I tried reaching out to them through the in-built chat feature, but I received no response. This has caused significant inconvenience as the plumbing issue remains unresolved."
          />
        </div>
      </div>
    </>
  );
}

export default ComplaintsPage;

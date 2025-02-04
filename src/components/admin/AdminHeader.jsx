const ProfileImage = '/ProfileImage.png';

function AdminHeader() {
  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 w-full h-auto z-10">
        {/*Search bar*/}
        <div className="relative inline-flex items-start gap-2 md:gap-[275px] px-[12px] py-[11px] bg-[#1D2032] rounded-lg">
          {/* Search Input (Hidden on Small Screens) */}

          <input
            type="text"
            placeholder="Search..."
            className="w-full xs:w-[250px] sm:w-[300px] md:w-[350px] lg:w-[373px] text-[#50556A] placeholder-[#50556A] bg-[#1D2032] text-sm font-normal outline-none mr-4"
          />
          {/*Search Icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className="absolute right-3 text-[#50556A]"
          >
            <circle
              cx="6.84442"
              cy="6.84394"
              r="5.99237"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.0122 11.3232L13.3616 13.6665"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/*Profile Section*/}

        <div className="flex items-center gap-3">
          {/*Profile Image*/}
          <div className="relative w-[35px] h-[35px] sm:w-[41px] sm:h-[41px]">
            <img
              className="w-full h-full rounded-full bg-lightgray bg-cover bg-no-repeat"
              src={ProfileImage}
              alt="Profile"
            />
            {/* Status Indicator */}
            {/* Status Indicator SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              className="absolute bottom-0 right-0 rounded-full"
            >
              <circle cx="4" cy="4" r="4" fill="#05EF63" />
            </svg>
          </div>

          {/*Content*/}
          {/* Profile Text (Hidden on Extra Small Screens) */}
          <div className="hidden sm:flex flex-col">
            <p className="text-[#55597D] text-[10px] font-inter font-normal uppercase">
              Welcome
            </p>
            <p className="text-[#ADB3CC] text-[14px] sm:text-[16px] font-poppins font-semibold">
              Mohsin Javed
            </p>
          </div>

          {/* Down Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-2"
          >
            <path
              d="M8 12.5C7.6 12.5 7.2 12.3 6.9 12L2.3 6.9C1.8 6.3 2.2 5.3 3 5.3H13C13.8 5.3 14.2 6.3 13.7 6.9L9.1 12C8.8 12.3 8.4 12.5 8 12.5Z"
              fill="#ADB3CC"
            />
          </svg>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;

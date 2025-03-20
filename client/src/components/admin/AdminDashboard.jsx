function AdminDashboard() {
  return (
    <>
      {/*DashBoard*/}
      <div className="px-4 sm:px-6  py-4 w-full min-h-[100vh] bg-[#161928]">
        {/* Page Title */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-poppins font-semibold text-[#ADB3CC] tracking-[-0.64px] mt-2">
          Dashboard
        </h2>
        <h2 className="text-[18px] sm:text-[20px] font-inter font-semibold text-[#ADB3CC] tracking-[-0.4px] mt-6 mb-8 sm:mb-12">
          Site Performance
        </h2>

        {/* Performance Metrics */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-5">
          {/* Visitors Box */}
          <div className="w-full sm:w-[318px] flex-shrink-0 rounded-[12px] bg-[#0329E8] p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              {/* Title */}
              <p className="text-[18px] sm:text-[20px] font-poppins text-[#DDEFFA]">
                Visitors
              </p>

              {/*3 User Icon SVG*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="20"
                viewBox="0 0 26 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.9274 0.0107422C9.9459 0.0107422 7.55108 2.40556 7.55108 5.38703C7.55108 8.36938 9.9457 10.7644 12.9274 10.7644C15.909 10.7644 18.3037 8.36938 18.3037 5.38703C18.3037 2.40556 15.9088 0.0107422 12.9274 0.0107422ZM12.9274 1.76074C14.9423 1.76074 16.5537 3.37206 16.5537 5.38703C16.5537 7.40294 14.9425 9.0144 12.9274 9.0144C10.9123 9.0144 9.30108 7.40294 9.30108 5.38703C9.30108 3.37206 10.9124 1.76074 12.9274 1.76074ZM6.33831 1.1096C6.82156 1.1096 7.21331 1.50135 7.21331 1.9846C7.21331 2.46785 6.82156 2.8596 6.33831 2.8596C4.95188 2.8596 3.82745 3.98354 3.82745 5.36939C3.82745 6.75524 4.95188 7.87918 6.33831 7.87918C6.82156 7.87918 7.21331 8.27093 7.21331 8.75418C7.21331 9.23743 6.82156 9.62918 6.33831 9.62918C3.98555 9.62918 2.07745 7.72191 2.07745 5.36939C2.07745 3.01687 3.98555 1.1096 6.33831 1.1096ZM23.7882 5.36939C23.7882 3.01687 21.8801 1.1096 19.5273 1.1096C19.0441 1.1096 18.6523 1.50135 18.6523 1.9846C18.6523 2.46785 19.0441 2.8596 19.5273 2.8596C20.9138 2.8596 22.0382 3.98354 22.0382 5.36939C22.0382 6.75524 20.9138 7.87918 19.5273 7.87918C19.0441 7.87918 18.6523 8.27093 18.6523 8.75418C18.6523 9.23743 19.0441 9.62918 19.5273 9.62918C21.8801 9.62918 23.7882 7.72191 23.7882 5.36939ZM22.9118 11.8145C22.3516 11.688 21.7529 11.6016 21.1441 11.5596C20.662 11.5264 20.2442 11.8902 20.211 12.3723C20.1777 12.8544 20.5416 13.2722 21.0237 13.3055C21.5447 13.3414 22.0552 13.4151 22.5516 13.5268C23.3235 13.6783 23.8268 13.9294 23.9517 14.1911C24.0457 14.3887 24.0457 14.621 23.9508 14.821C23.8276 15.0801 23.3285 15.3299 22.5675 15.4864C22.0941 15.5838 21.7893 16.0464 21.8866 16.5197C21.984 16.9931 22.4466 17.2979 22.9199 17.2006C24.1778 16.9419 25.0993 16.4807 25.5316 15.5718C25.8521 14.8961 25.8521 14.1125 25.5316 13.4385C25.0963 12.5262 24.159 12.0586 22.9118 11.8145ZM5.65466 12.3723C5.62141 11.8902 5.20364 11.5264 4.72153 11.5596C4.11278 11.6016 3.51408 11.688 2.92984 11.8195L2.68899 11.8705C1.58343 12.1231 0.739989 12.5873 0.335141 13.4384C0.0133112 14.1118 0.0133112 14.8968 0.33548 15.5725C0.765893 16.4804 1.6873 16.9418 2.94572 17.2006C3.41906 17.2979 3.88169 16.9931 3.97902 16.5197C4.07636 16.0464 3.77154 15.5838 3.2982 15.4864C2.53743 15.33 2.03883 15.0803 1.91595 14.8211C1.82021 14.6203 1.82021 14.3894 1.91477 14.1916C2.03959 13.9292 2.54238 13.6782 3.29007 13.5319L3.67883 13.4523C4.06638 13.3806 4.45123 13.3324 4.84194 13.3055C5.32404 13.2722 5.68791 12.8544 5.65466 12.3723ZM5.02826 16.049C5.02826 13.2654 7.90752 12.2865 12.9274 12.2865L13.283 12.2881C18.0931 12.3333 20.8265 13.3145 20.8265 16.0286C20.8265 18.679 18.2137 19.6938 13.6297 19.7844L12.9274 19.7911C7.89601 19.7911 5.02826 18.8294 5.02826 16.049ZM19.0765 16.0286C19.0765 14.733 16.9992 14.0365 12.9274 14.0365C8.85955 14.0365 6.77826 14.7441 6.77826 16.049C6.77826 17.3447 8.85491 18.0411 12.9274 18.0411C16.994 18.0411 19.0765 17.3329 19.0765 16.0286Z"
                  fill="#DDEFFA"
                />
              </svg>
            </div>
            <div>
              {/* Number */}
              <p className="text-[36px] sm:text-[42px] md:text-[58px] font-inter font-semibold text-[#DDEFFA]">
                92,680
              </p>
            </div>
          </div>

          {/* Orders Completed Box */}
          <div className="w-full sm:w-[318px] flex-shrink-0 rounded-[12px] bg-[#1A1E30] p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              {/* Title */}
              <p className="text-[18px] sm:text-[20px] font-poppins text-[#DDEFFA]">
                Orders Completed
              </p>

              {/*Show Icon SVG*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3363 0.672614L12.0023 0.666992C7.17127 0.666992 2.81748 4.07725 0.404411 9.65713C0.309654 9.87624 0.309654 10.1244 0.404411 10.3435L0.571622 10.7199C2.95412 15.9423 7.07136 19.1754 11.6638 19.328L11.9977 19.3337C16.8288 19.3337 21.1825 15.9234 23.5956 10.3435C23.6916 10.1216 23.6903 9.87012 23.5921 9.64921L23.4297 9.28357C21.0414 4.05139 16.9224 0.825035 12.3363 0.672614ZM12.0105 2.40465L12.2893 2.41065L12.6008 2.42685C16.3309 2.69097 19.7613 5.45678 21.8338 9.99928L21.823 10.0273C19.6985 14.6675 16.1498 17.4498 12.302 17.5894L12.0047 17.5939L11.7048 17.5899L11.3941 17.5737C7.77984 17.3177 4.44745 14.7071 2.36235 10.42L2.16501 9.99928L2.34768 9.61088C4.54638 5.069 8.14007 2.40564 12.0105 2.40465ZM11.9994 5.46603C9.47895 5.46603 7.43659 7.49565 7.43659 10.0006C7.43659 12.5045 9.47918 14.5339 11.9994 14.5339C14.5198 14.5339 16.5634 12.5044 16.5634 10.0006C16.5634 7.49578 14.52 5.46603 11.9994 5.46603ZM11.9994 7.20473C13.5536 7.20473 14.8134 8.45612 14.8134 10.0006C14.8134 11.544 13.5535 12.7952 11.9994 12.7952C10.4457 12.7952 9.18659 11.5443 9.18659 10.0006C9.18659 8.45582 10.4455 7.20473 11.9994 7.20473Z"
                  fill="#ADB3CC"
                />
              </svg>
            </div>
            <div>
              {/* Number */}
              <p className="text-[36px] sm:text-[42px] md:text-[58px] font-inter font-semibold text-[#17B1EA]">
                580.5K
              </p>
            </div>
          </div>

          {/* Canceled Orders Box */}
          <div className="w-full sm:w-[318px] flex-shrink-0 rounded-[12px] bg-[#1A1E30] p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              {/* Title */}
              <p className="text-[18px] sm:text-[20px] font-poppins text-[#DDEFFA]">
                Canceled Orders
              </p>

              {/*Chart Icon SVG*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.0853 0.333008H6.91473C2.96517 0.333008 0.333334 3.15623 0.333334 7.20837V16.791C0.333334 20.8469 2.95824 23.6663 6.91473 23.6663H17.0853C21.0418 23.6663 23.6667 20.8469 23.6667 16.791V7.20837C23.6667 3.15243 21.0418 0.333008 17.0853 0.333008ZM6.91473 1.96091H17.0853C20.1157 1.96091 22.0388 4.02653 22.0388 7.20837V16.791C22.0388 19.9728 20.1157 22.0384 17.0853 22.0384H6.91473C3.88434 22.0384 1.96124 19.9728 1.96124 16.791V7.20837C1.96124 4.03075 3.89077 1.96091 6.91473 1.96091ZM12.8479 6.3751C12.794 5.97781 12.4534 5.67159 12.0413 5.67159C11.5918 5.67159 11.2274 6.03601 11.2274 6.48555V17.4932L11.2348 17.6036C11.2887 18.0009 11.6293 18.3071 12.0413 18.3071C12.4909 18.3071 12.8553 17.9427 12.8553 17.4932V6.48555L12.8479 6.3751ZM7.78327 9.9376C7.72937 9.5403 7.38882 9.23409 6.97674 9.23409C6.52721 9.23409 6.16279 9.59851 6.16279 10.048V17.4931L6.17022 17.6036C6.22412 18.0009 6.56467 18.3071 6.97674 18.3071C7.42628 18.3071 7.7907 17.9427 7.7907 17.4931V10.048L7.78327 9.9376ZM17.0233 13.1683C17.4353 13.1683 17.7759 13.4745 17.8298 13.8718L17.8372 13.9823V17.4932C17.8372 17.9427 17.4728 18.3071 17.0233 18.3071C16.6112 18.3071 16.2706 18.0009 16.2167 17.6036L16.2093 17.4932V13.9823C16.2093 13.5327 16.5737 13.1683 17.0233 13.1683Z"
                  fill="#ADB3CC"
                />
              </svg>
            </div>
            <div>
              {/* Number */}
              <p className="text-[36px] sm:text-[42px] md:text-[58px] font-inter font-semibold text-[#17B1EA]">
                15.43%
              </p>
            </div>
          </div>
        </div>

        {/*Revenue*/}
        <h2 className="text-[18px] sm:text-[20px] font-inter font-semibold text-[#ADB3CC] tracking-[-0.4px] mt-10 mb-6 sm:mb-10">
          Revenue
        </h2>

        {/*Revenue And Profit*/}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-5">
          {/*Total Revenue Box*/}
          <div className="w-full sm:w-[318px] flex-shrink-0 rounded-[12px] bg-[#1A1E30] p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              {/* Title */}
              <p className="text-[18px] sm:text-[20px] font-poppins text-[#ADB3CC]">
                Total Revenue
              </p>

              {/*Add User Icon SVG*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.52363 15.7402C5.03897 15.7402 1.2088 16.4181 1.2088 19.1341C1.2088 21.8489 5.01447 22.5524 9.52363 22.5524C14.0083 22.5524 17.8385 21.8734 17.8385 19.1586C17.8385 16.4437 14.0328 15.7402 9.52363 15.7402Z"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.52361 11.8667C12.4823 11.8667 14.8529 9.49484 14.8529 6.53734C14.8529 3.57867 12.4823 1.20801 9.52361 1.20801C6.56611 1.20801 4.19427 3.57867 4.19427 6.53734C4.19427 9.49484 6.56611 11.8667 9.52361 11.8667Z"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.4048 8.11328V12.7916"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.7917 10.4525H18.02"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="pl-2">
              {/* Number */}
              <p className="text-[36px] sm:text-[42px] md:text-[58px] font-inter font-semibold text-[#ADB3CC]">
                17805
              </p>
              {/* Growth Indicator */}
              <p className="text-[14px] sm:text-[16px] font-inter text-[#00DE73]">
                +1,500 (4.17%)
              </p>
            </div>
          </div>

          {/*Profit Box*/}
          <div className="w-full sm:w-[318px] flex-shrink-0 rounded-[12px] bg-[#1A1E30] p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              {/* Title */}
              <p className="text-[18px] sm:text-[20px] font-poppins text-[#ADB3CC]">
                Profit
              </p>

              {/*Activity Icon SVG*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M6.45233 16.2448L9.94432 11.7063L13.9275 14.8352L17.3448 10.4248"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="21.328"
                  cy="3.89979"
                  r="2.24256"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.4119 2.63965H6.93287C3.41952 2.63965 1.24103 5.12783 1.24103 8.64117V18.0706C1.24103 21.584 3.3768 24.0615 6.93287 24.0615H16.971C20.4844 24.0615 22.6628 21.584 22.6628 18.0706V9.85857"
                  stroke="#ADB3CC"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="pl-2">
              {/* Number */}
              <p className="text-[36px] sm:text-[42px] md:text-[58px] font-inter font-semibold text-[#ADB3CC]">
                1864
              </p>
              {/* Growth Indicator */}
              <p className="text-[14px] sm:text-[16px] font-inter text-[#00DE73]">
                +530 (8.38%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

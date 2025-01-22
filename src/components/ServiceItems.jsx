import ItemImg from "../images/ItemImg.png";
import ServiceProviderIcon from "../images/ServiceProviderIcon.png";

function ServiceItems() {
  return (
    <div className="rounded-lg">
      <h2 className="text-black font-wixmadefor text-[16px] sm:text-[18px] md:text-[22px]  lg:text-[26px] font-semibold leading-normal tracking-[-0.26px]">
        Items:
      </h2>
      <div className="border px-[20px] sm:px-[16px] pb-[82px]">
        <h1 className="mb-[40px] text-black font-wixmadefor text-[16px] sm:text-[18px] md:text-[22px]  lg:text-[26px] font-semibold leading-normal tracking-[-0.26px]">
          Plumber:
        </h1>
        <div className="flex flex-col gap-[22px]">
          <div className="flex gap-[22px] sm:gap-[24px] md:gap-[26px] lg:gap-[28px] w-[250px] sm:w-[383px] md:w-[403px] lg:w-[423px] pt-[23px] pb-[44px] pl-[20px]  border border-[#8B8B8B] rounded-[30px]">
            <img
              src={ItemImg}
              alt=""
              className="w-[84px] h-[84px] sm:w-[97px] sm:h-[97px] md:w-[107px] md:h-[107px] lg:w-[117px] lg:h-[117px]"
            />
            <div>
              <h2 className="text-black font-wixmadefor text-[12px] sm:text-[15px] md:text-[18px] lg:text-[21px] font-semibold leading-[26px] tracking-[-0.21px]">
                Mixer Tap Installation
              </h2>
              <h2 className="text-[#AAA0A0] font-wixmadefor text-[12px] sm:text-[15px] md:text-[18px] lg:text-[21px] font-semibold leading-[26px] tracking-[-0.21px]">
                --Per piece
              </h2>
              <p className="text-black text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-normal leading-normal">
                Rs: 300
              </p>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end gap-[18px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
            <div className="flex flex-col">
              <div
                style={{ fontFamily: "Segoe UI" }}
                className="cursor-pointer bg-[#FA0C57] py-[16px] sm:py-3 pl-[24px] pr-[10px] rounded-[100px] flex items-center gap-[14px] sm:gap-[16px] md:gap-[18px] lg:gap-[20px]"
              >
                <button className="text-[#fff] text-[12px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-normal leading-normal">
                  Emergency
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  className="w-[32px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[40px] md:h-[40px] lg:w-[42px] lg:h-[42px]"
                >
                  <circle cx="21" cy="21" r="21" fill="white" />
                </svg>
              </div>
              <h1 className="text-center text-[#AAA0A0] font-wixmadefor text-[10px] sm:text-[11px] md:text-[14px] lg:text-[17px] font-semibold leading-[16px] sm:leading-[26px] tracking-[-0.17px]">
                20% increase in total cost <br />
                within 1hr service
              </h1>
            </div>

            <div style={{ fontFamily: "Segoe UI" }}>
              <button className="bg-[#1EE100] py-[18px] sm:py-[15px] px-[22px] sm:px-[26px] md:px-[28px] lg:px-[30px] rounded-[7px] text-[#fff] text-[12px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-normal leading-normal">
                Search Provider
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[19px] items-center justify-center bg-[#D8D8D8] px-[12px] py-[45px]">
            <div
              className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
              style={{
                background:
                  "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
              }}
            >
              <img
                src={ServiceProviderIcon}
                alt=""
                className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
              />
              <div className="flex flex-col gap-[15px]">
                <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px]  font-semibold leading-normal">
                  <h2>Mohsin Javed</h2>
                  <h2>Designation: Electrician</h2>
                  <h2>Orders: 350 Completed</h2>
                  <h2>Contact: 03091948615</h2>
                  <h2>Experience: 2 years</h2>
                </div>

                <button
                  style={{
                    background:
                      "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                  }}
                  className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                >
                  800...
                </button>
              </div>
            </div>
            <div
              className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
              style={{
                background:
                  "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
              }}
            >
              <img
                src={ServiceProviderIcon}
                alt=""
                className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
              />
              <div className="flex flex-col gap-[15px]">
                <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] font-semibold leading-normal">
                  <h2>Mohsin Javed</h2>
                  <h2>Designation: Electrician</h2>
                  <h2>Orders: 350 Completed</h2>
                  <h2>Contact: 03091948615</h2>
                  <h2>Experience: 2 years</h2>
                </div>

                <button
                  style={{
                    background:
                      "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                  }}
                  className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                >
                  800...
                </button>
              </div>
            </div>
            <div
              className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
              style={{
                background:
                  "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
              }}
            >
              <img
                src={ServiceProviderIcon}
                alt=""
                className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
              />
              <div className="flex flex-col gap-[15px]">
                <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] font-semibold leading-normal">
                  <h2>Mohsin Javed</h2>
                  <h2>Designation: Electrician</h2>
                  <h2>Orders: 350 Completed</h2>
                  <h2>Contact: 03091948615</h2>
                  <h2>Experience: 2 years</h2>
                </div>

                <button
                  style={{
                    background:
                      "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                  }}
                  className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                >
                  800...
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="font-wixmadefor text-[8px] sm:text-[10px] md:text-[13px] lg:text-[16px] font-semibold leading-normal bg-[#250101] rounded-[5px] text-[white] py-[10px] px-[40px]">
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceItems;

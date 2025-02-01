import AdminHeader from '../components/AdminHeader.jsx';

const orders = [
  {
    id: 1,
    orders: 'Afeef Wadood',
    serviceProviderId: 290908,
    date: 'November 25, 2022',
    status: 'Active',
    email: 'owencass@gmail.com',
  },
  {
    id: 2,
    orders: 'Darwin Nunez',
    serviceProviderId: 780970,
    date: 'November 25, 2022',
    status: 'Completed',
    email: 'nunezcass@gmail.com',
  },
  {
    id: 3,
    orders: 'Firmino Anderson',
    serviceProviderId: 878798,
    date: 'November 26, 2022',
    status: 'Pending',
    email: 'firminocass@gmail.com',
  },
  {
    id: 4,
    orders: 'Joe Henderson',
    serviceProviderId: 898799,
    date: 'November 26, 2022',
    status: 'Completed',
    email: 'hendersoncass@gmail.com',
  },
  {
    id: 5,
    orders: 'Arnold Po',
    serviceProviderId: 786879,
    date: 'November 27, 2022',
    status: 'Active',
    email: 'arnoldpocass@gmail.com',
  },
];

function AdminOrdersPage() {
  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/*Orders*/}
      <div className="px-4 sm:px-6  py-4 w-full h-auto bg-[#161928]">
        {/* Page Title */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-poppins font-semibold text-[#ADB3CC] tracking-[-0.64px] mt-2">
          Orders
        </h2>
        {/* Table */}
        <div className="overflow-x-auto mt-7 mb-7">
          <table className="min-w-full rounded-lg text-left border-collapse">
            <thead className="bg-[#1D2134] hidden md:table-header-group">
              <tr className="text-[#ADB3CC] text-xs sm:text-sm md:text-base font-medium font-inter tracking-[0.48]">
                <th className="py-3 px-4 sm:py-4 sm:px-6">Id</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">Orders</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">
                  Service Provider ID
                </th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">Date</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">STATUS</th>
                <th className="py-3 px-4 sm:py-4 sm:px-6">EMAIL</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="text-[#ADB3CC] text-xs sm:text-sm md:text-base font-medium font-inter tracking-[0.18] border-b border-[#2E3348] md:table-row block w-full mb-4 md:mb-0"
                >
                  {/* Id*/}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Id:{' '}
                    </span>
                    {order.id}
                  </td>

                  {/* Name */}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Orders:{' '}
                    </span>
                    {order.orders}
                  </td>

                  {/* Service Provider Id */}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Service Provider ID:{' '}
                    </span>
                    {order.serviceProviderId}
                  </td>

                  {/* Date*/}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Date:{' '}
                    </span>
                    {order.date}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Status:{' '}
                    </span>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-[4px] ${
                        order.status === 'Pending'
                          ? 'bg-[rgba(255,56,56,0.10)] text-[#FF3838]'
                          : 'bg-[rgba(0,222,115,0.10)] text-[#00DE73]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="py-3 px-4 md:table-cell block">
                    <span className="md:hidden font-semibold text-[#ADB3CC]">
                      Email:{' '}
                    </span>
                    {order.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminOrdersPage;

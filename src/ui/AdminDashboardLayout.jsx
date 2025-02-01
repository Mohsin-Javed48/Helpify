import AdminHeader from '../components/AdminHeader';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

function AdminDashboardLayout() {
  return (
    <>
      <div className="flex bg-[#171B2D] min-h-[100vh]">
        <AdminSidebar />
        <div className="flex-1 p-4 bg-[#161928]">
          <AdminHeader />
          <div className="space-y-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardLayout;

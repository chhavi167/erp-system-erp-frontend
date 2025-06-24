
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Link } from '@tanstack/react-router';


export default function PrivateLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if no token
    if (!token) {
      navigate({ to: "/" });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-indigo-950 text-white p-4 sticky top-0">
        <h2 className="text-3xl font-bold m-4" >ERP Menu</h2>
        <nav className="space-y-2">
          <Link to="/app/dashboard" className="flex items-center p-2  rounded-lg  hover:bg-gray-100  group">
            <svg className="w-5 h-5 text-indigo-400 hover:text-black" fill="currentColor" viewBox="0 0 22 21"><path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" /><path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" /></svg>
            <span className="ms-3 text-xl  text-gray-200 hover:text-indigo-950">Dashboard</span>
          </Link>
          <Link to="/app/employees" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
            <svg className="w-5 h-5 text-indigo-400 hover:text-black" fill="currentColor" viewBox="0 0 20 18"><path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/></svg>
            <span className="flex-1 ms-3 whitespace-nowrap text-xl text-gray-300 hover:text-indigo-950 ">Employees</span>
          </Link>
          <Link to="/app/inventory" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 18 20"><path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/></svg>
            <span className="flex-1 ms-3 whitespace-nowrap text-xl text-gray-200 hover:text-indigo-950">Inventory</span>
          </Link>
          <Link to="/app/finance" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 18"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm4.5 14H5.5a1.5 1.5 0 1 1 0-3h9a1.5 1.5 0 1 1 0 3Zm2.5-4H3a1.5 1.5 0 1 1 0-3h14a1.5 1.5 0 1 1 0 3Z"/></svg>
            <span className="flex-1 ms-3 whitespace-nowrap text-xl text-gray-200 hover:text-indigo-950">Finance</span>
          </Link>
          <Link to="/app/projects" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 18"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm4.5 14H5.5a1.5 1.5 0 1 1 0-3h9a1.5 1.5 0 1 1 0 3Zm2.5-4H3a1.5 1.5 0 1 1 0-3h14a1.5 1.5 0 1 1 0 3Z"/></svg>
            <span className="flex-1 ms-3 whitespace-nowrap text-xl text-gray-200 hover:text-indigo-950">Projects</span>
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 p-4 shadow flex justify-between items-center min-w-300">
          <div><h2 className="text-xl font-bold text-gray-900 max-w-200">Welcome</h2></div>
         
          <div className="flex items-center gap-4 justify-between">
         
           
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
           
           
          </div>
        </header>
        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



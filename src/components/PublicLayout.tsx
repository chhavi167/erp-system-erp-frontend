
import { Outlet } from "@tanstack/react-router";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <Outlet />
    </div>
  );
}

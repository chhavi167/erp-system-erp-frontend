
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useEffect } from "react";

const backend_url = "https://erp-system-erp-backend.onrender.com";
const fetchSummary = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backend_url}/api/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch dashboard data");
  }

  return res.json(); 
};

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchSummary,
  });

  useEffect(() => {
    if (isError) toast.error((error as Error).message);
  }, [isError, error]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-400 text-center">Dashboard Overview</h2>

      {isLoading ? (
        <p className="text-gray-500">Loading summary...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-50 text-center">
          <Card className=" border-4 bg-gradient-to-t from-pink-300 via-pink-400 to-pink-500 ">
            <CardHeader>
              <CardTitle className="text-xl">Total Projects</CardTitle>
            
            </CardHeader>
            <CardContent >
              <p className=  " text-5xl font-bold text-pink-800">{data.totalProjects || "—"}</p>
            </CardContent>
          </Card>
          <Card className=" border-4 bg-gradient-to-t from-blue-300 via-indigo-400 to-indigo-500 ">
            <CardHeader>
              <CardTitle className="text-xl">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-blue-800">{data.totalEmployees}</p>
            </CardContent>
          </Card>

          <Card className=" border-4 bg-gradient-to-t from-green-300 via-green-400 to-green-500">
            <CardHeader>
              <CardTitle className="text-xl">Total Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-green-800">{data.totalDepartments || "—"}</p>
            </CardContent>
          </Card>

          
        </div>
      )}
    </div>
  );
}

import React from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button"; 

type Department = {
  id: number;
  name: string;
};

type Employee = {
    id: number;
    name: string;
    email: string;
    contact: string;
    designation: string;
    address: string;
    joiningDate: string;
    departmentId: number;
    photoUrl?: string; 
  };
  



interface Props {
  viewed: Employee | null;
  departments: Department[];
  onClose: () => void;
}

const EmployeeView: React.FC<Props> = ({ viewed, departments, onClose }) => {
  if (!viewed) return null;

  const departmentName = departments.find(
    (d) => d.id === viewed.departmentId
  )?.name;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[450px] relative min-w-100">
        <div className="text-center text-2xl">
          <img
            src={viewed.photoUrl || "https://via.placeholder.com/100"}
            alt={viewed.name}
            className="mx-auto mb-3 w-24 h-24 rounded-full border-2 border-indigo-400 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-800">{viewed.name}</h2>
          <p className="text-gray-500">{viewed.designation}</p>
        </div>

        <div className="mt-5 space-y-2 text-sm text-gray-700">
          <p><strong>Email:</strong> {viewed.email}</p>
          <p><strong>Contact:</strong> {viewed.contact}</p>
          <p><strong>Address:</strong> {viewed.address}</p>
          <p><strong>Joining Date:</strong> {dayjs(viewed.joiningDate).format("DD MMM YYYY")}</p>
          <p><strong>Department:</strong> {departmentName || "N/A"}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-indigo-500 text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;

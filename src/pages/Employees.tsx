
import {  useMemo, useState } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable ,getFilteredRowModel} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import EmployeeView from "./EmployeeView";

type Employee = {
  id: number;
  name: string;
  email: string;
  contact: string;
  designation: string;
  address: string;
  joiningDate: string;
  photoUrl?: string;
  departmentId: number;
};

type Department = {
  id: number;
  name: string;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Request failed");
  }
  return res.json();
};

const fetchEmployees = async (): Promise<Employee[]> =>
  fetchWithAuth("http://localhost:3000/api/employees");

const fetchDepartments = async (): Promise<Department[]> =>
  fetchWithAuth("http://localhost:3000/api/departments");

const addEmployee = async (employee: Employee) =>
  fetchWithAuth("http://localhost:3000/api/employees", {
    method: "POST",
    body: JSON.stringify(employee),
  });

const updateEmployee = async (employee: Employee) =>
  fetchWithAuth(`http://localhost:3000/api/employees/${employee.id}`, {
    method: "PUT",
    body: JSON.stringify(employee),
  });

const deleteEmployee = async (id: number) =>
  fetchWithAuth(`http://localhost:3000/api/employees/${id}`, {
    method: "DELETE",
  });

export default function EmployeePage() {
  const queryClient = useQueryClient();
  const [viewed, setViewed] = useState<Employee | null>(null);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
    const addMutation = useMutation({
        mutationFn: addEmployee,
        onSuccess: () => {
          toast("Employee added");
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
      });
  

  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      toast.success("Employee updated!");
      queryClient.invalidateQueries({queryKey :["employees"]});
    },
    onError: () => toast.error("Failed to update employee"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success("Employee deleted!");
      queryClient.invalidateQueries({queryKey :["employees"]});
    },
    onError: () => toast.error("Failed to delete employee"),
  });

  const columns = useMemo<ColumnDef<Employee>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "contact", header: "Contact" },
    { accessorKey: "designation", header: "Designation" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <div className="flex gap-2">
            <Button className="bg-pink-600" variant="outline" onClick={() => setViewed(emp)}>View</Button>
            <Button  className="bg-blue-500" variant="outline" onClick={() => setSelected(emp)}>Edit</Button>
            <Button className="bg-green-700" variant="destructive" onClick={() => deleteMutation.mutate(emp.id)}>Delete</Button>
          </div>
        );
      }
    }
  ], [deleteMutation]);

  const table = useReactTable({
    data: employees,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employees</h2>
        <Button className="bg-lime-700" onClick={() => setSelected({
          id: 0,
          name: "",
          email: "",
          contact: "",
          designation: "",
          address: "",
          joiningDate: "",
          photoUrl: "",
          departmentId: 0,
        })}>+ Add Employee</Button>
      </div>

      <input
        className="border px-3 py-2 w-64 rounded"
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border">
            <thead className="bg-blue-400">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="border px-3 py-2 text-left cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-pink-100 hover:text-black">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border px-3 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-3">
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
          </div>
        </div>
      )}


      {viewed && (
  <EmployeeView
    viewed={viewed}
    departments={departments}
    onClose={() => setViewed(null)}
  />
)}

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              
              if(selected.id === 0) addMutation.mutate(selected)
                else updateMutation.mutate(selected);
               
              setSelected(null);
            }}
            className="bg-blue-400 p-6 rounded shadow w-96 space-y-3 min-w-200"
          >
            <h3 className="text-xl font-bold">
              {selected.id === 0 ? "Add" : "Edit"} Employee
            </h3>

            <input value={selected.name} placeholder="Name" onChange={(e) => setSelected({ ...selected, name: e.target.value })} className="w-full border px-3 py-2 rounded" required />
            <input value={selected.email} placeholder="Email" onChange={(e) => setSelected({ ...selected, email: e.target.value })} className="w-full border px-3 py-2 rounded" required />
            <input value={selected.contact} placeholder="Contact" onChange={(e) => setSelected({ ...selected, contact: e.target.value })} className="w-full border px-3 py-2 rounded" required />
            <input value={selected.designation} placeholder="Designation" onChange={(e) => setSelected({ ...selected, designation: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input value={selected.address} placeholder="Address" onChange={(e) => setSelected({ ...selected, address: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input type="date" value={selected.joiningDate} onChange={(e) => setSelected({ ...selected, joiningDate: e.target.value })} className="w-full border px-3 py-2 rounded" />
            <input value={selected.photoUrl} placeholder="Photo URL" onChange={(e) => setSelected({ ...selected, photoUrl: e.target.value })} className="w-full border px-3 py-2 rounded" />

            <select value={selected.departmentId} onChange={(e) => setSelected({ ...selected, departmentId: parseInt(e.target.value) })} className="w-full border px-3 py-2 rounded" required>
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <div className="flex justify-between">
              <Button className="bg-slate-800" type="button" variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
              <Button  className="bg-slate-800" type="submit">{selected.id === 0 ? "Add" : "Update"}</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export type Employee = {
    id: number;
    name: string;
    departmentId: number;
    email: string;
    contact: string;
    designation: string;
    address: string;
    joiningDate: string; 
    photoUrl?: string;
  };
  
  export type Department = {
    id: number;
    name: string;
  };
  
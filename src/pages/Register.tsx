
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    contact: "",
    department: ""
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registration successful");
      navigate({ to: "/" }); // redirect to login
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-600 min-w-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div>
                <Label>Full Name</Label>
                <Input name="fullName" value={form.fullName} onChange={handleChange} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div>
                <Label>Contact</Label>
                <Input name="contact" value={form.contact} onChange={handleChange} required />
              </div>
              <div>
                <Label>Department</Label>
                <Input name="department" value={form.department} onChange={handleChange} required />
              </div>
            </div>
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full bg-green-800 text-white">
                {mutation.isPending ? "Registering..." : "Register"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

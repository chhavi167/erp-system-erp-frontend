import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter , CardAction
} from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("auth", "true"); 
      localStorage.setItem("token", data.token);
      
      navigate({ to: '/app/dashboard' });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };





  return (
    <div className="min-w-screen min-h-screen  bg-green-950 flex justify-baseline flex-col items-center gap-9 ">
       <div></div><h1>Welcome to The ERP</h1>
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" className='bg-gray-400 text-black' 
              onClick={() =>{ navigate({ to: "/register" })
              }}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value = {email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password"   value = {password}
                  onChange={(e) => setPassword(e.target.value)}required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 ">
          <Button type="submit" className="w-full bg-blue-500" onClick={handleLogin}>
          {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
      </div>
      
  );
}





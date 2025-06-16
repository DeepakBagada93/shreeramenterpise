import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Lock, Mail } from "lucide-react";

// Mock components for forms, replace with actual form logic
const LoginForm = () => (
  <form className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="login-email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id="login-email" type="email" placeholder="you@example.com" className="pl-10" required />
      </div>
    </div>
    <div className="space-y-1">
      <Label htmlFor="login-password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id="login-password" type="password" placeholder="••••••••" className="pl-10" required />
      </div>
    </div>
    <Button type="submit" className="w-full">Login</Button>
    <p className="text-sm text-center text-muted-foreground">
      Forgot your password? <a href="#" className="underline hover:text-primary">Reset here</a>.
    </p>
  </form>
);

const SignupForm = () => (
  <form className="space-y-4">
    <div className="space-y-1">
      <Label htmlFor="signup-name">Full Name</Label>
      <div className="relative">
        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id="signup-name" placeholder="John Doe" className="pl-10" required />
      </div>
    </div>
    <div className="space-y-1">
      <Label htmlFor="signup-email">Email</Label>
       <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id="signup-email" type="email" placeholder="you@example.com" className="pl-10" required />
      </div>
    </div>
    <div className="space-y-1">
      <Label htmlFor="signup-password">Password</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input id="signup-password" type="password" placeholder="Create a strong password" className="pl-10" required />
      </div>
    </div>
    <Button type="submit" className="w-full">Create Account</Button>
     <p className="text-xs text-center text-muted-foreground">
      By signing up, you agree to our Terms and Privacy Policy.
    </p>
  </form>
);

// Placeholder for logged-in user content
const AccountDashboard = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View your past orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">You have no recent orders.</p>
        {/* Map through orders here */}
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Saved Items (Wishlist)</CardTitle>
        <CardDescription>Your favorite items, all in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Your wishlist is empty.</p>
        {/* Map through wishlist items here */}
      </CardContent>
    </Card>
     <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Manage your personal information and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Edit Profile</Button>
        <Button variant="destructive" className="ml-2">Logout</Button>
      </CardContent>
    </Card>
  </div>
);


export default function AccountPage() {
  // Mock authentication state
  const isAuthenticated = false; // Set to true to see dashboard view

  if (isAuthenticated) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 font-headline">My Account</h1>
        <AccountDashboard />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <UserCircle className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
              <CardDescription>Login to access your account and continue shopping.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <UserCircle className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
              <CardDescription>Join us to enjoy personalized shopping, saved items, and faster checkout.</CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

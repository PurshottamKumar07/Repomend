import Navbar from "@/components/ui/navbar";

export const metadata = {
  title: "Login — Repomend",
  description: "Sign in to Repomend to sync your saved repos and preferences.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login Page</h1>
          <p className="text-muted-foreground">
            This page is currently under construction.
          </p>
          <div className="mt-4">
            <p className="text-muted-foreground">Expected features:</p>
            <ul className="list-disc pl-5 mt-2">
              <li className="text-muted-foreground">Email/password login</li>
              <li className="text-muted-foreground">GitHub OAuth</li>
              <li className="text-muted-foreground">Remember me</li>
              <li className="text-muted-foreground">Forgot password</li>
              <li className="text-muted-foreground">Sign up link</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

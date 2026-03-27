import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/saved" className="text-sm font-medium hover:text-primary">
            Saved
          </Link>
          <Link href="/history" className="text-sm font-medium hover:text-primary">
            History
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
        </div>

      </div>
    </nav>
  )
}
// [CHANGED] Complete navbar redesign — glassmorphism, gradient logo, sticky, better CTA
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Code2, Compass, BookmarkCheck, History } from "lucide-react"

export default function Navbar() {
  return (
    // [CHANGED] Sticky + glassmorphism + subtle bottom border glow
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">

        {/* [CHANGED] Logo — gradient text + code icon */}
        <Link href="/" className="flex items-center gap-2 group">
          <Code2 className="size-5 text-primary transition-transform group-hover:rotate-12" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Repomend</span>
        </Link>

        {/* [CHANGED] Nav links — with icons, pill hover effect */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Compass className="size-3.5" />
            Discover
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <BookmarkCheck className="size-3.5" />
            Saved
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <History className="size-3.5" />
            History
          </Link>
        </div>

        {/* [CHANGED] Auth buttons — outline login + gradient sign up */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Login</Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          >
            Sign Up
          </Button>
        </div>

      </div>
    </nav>
  )
}
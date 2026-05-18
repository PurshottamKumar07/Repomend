// [CHANGED] Page now delegates layout to Container which handles topic picker vs feed
import Navbar from "@/components/ui/navbar"
import Container from "@/components/ui/container"

export const metadata = {
  title: "Repomend — Discover GitHub Repos",
  description: "Swipe through curated GitHub repositories and find your next favorite project.",
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <Container />
    </div>
  )
}

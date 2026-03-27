import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/navbar"
import Container from "@/components/ui/container"

export default function Page() {
  return (
    <div className="flex min-h-svh p-2 flex-col m-2">
      <Navbar />
      <div className="flex justify-center mt-10 text-font-mono text-xl mr-10">Welcome to Repomend User</div>
      <div className="flex justify-between flex-row max-w-full flex-col justify-center  leading-loose p-6 mt-5">
        <Container />
        <div className="font-mono text-xs text-muted-foreground">
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"

export default function Feed(){
    return (
        <div className="rounded-lg h-full overflow-y-auto scrollbar-thin">
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                {/* use links for project title */}
                <a href="#" className="no-underline"><h3>Project Title</h3></a>
                <h3>Name: <p>Purshottam Kumar</p></h3>
                <></>
                <h3>Topics : </h3><p> Python , Javascript , React , Nodejs , Expressjs , MongoDB , HTML , CSS , TailwindCSS , Git , Github , REST API , JWT Authentication , Password Hashing , </p>
                <h3>Description: </h3><p>Lorem ipsum dolor </p> </div>
        </div>
    ) 
}
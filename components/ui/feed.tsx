import { Button } from "@/components/ui/button"

export type Project = {
    id: number;
    title: string;
    author: string;
    topics: string;
    description: string;
};

interface FeedProps {
    project: Project;
    onLike: () => void;
    onDislike: () => void;
}

export default function Feed({ project, onLike, onDislike }: FeedProps){
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent click events if clicking on a link
        if ((e.target as HTMLElement).closest('a')) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            onDislike();
        } else {
            onLike();
        }
    };

    return (
        <div 
            className="rounded-lg h-full w-full overflow-y-auto scrollbar-thin cursor-pointer relative"
            onClick={handleClick}
        >
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none pointer-events-none pb-10">
                <a href="#" className="no-underline pointer-events-auto"><h3>{project.title}</h3></a>
                <h3>Name: </h3><p className=" bg-black rounded-lg mr-14 p-1">{project.author}</p>
                <></>
                <h3>Topics : </h3><p className=" bg-black rounded-lg mr-14 p-1">{project.topics}</p>
                <h3>Description: </h3><p className=" bg-black rounded-lg mr-14 p-1">{project.description}</p>
            </div>
            {/* Visual hint overlays for left/right */}
            <div className="absolute top-0 bottom-0 left-0 w-1/2 hover:bg-white/5 opacity-0 hover:opacity-100 transition-colors pointer-events-none rounded-l-lg border-r border-transparent hover:border-white/10" />
            <div className="absolute top-0 bottom-0 right-0 w-1/2 hover:bg-white/5 opacity-0 hover:opacity-100 transition-colors pointer-events-none rounded-r-lg border-l border-transparent hover:border-white/10" />
        </div>
    ) 
}
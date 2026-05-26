import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, GitFork, ExternalLink, X, Heart } from "lucide-react"

export type Project = {
    id: number;
    title: string;
    author: string;
    topics: string;
    description: string;
    stars: string;
    forks: string;
    link: string;
};

interface FeedProps {
    project: Project;
    onLike: () => void;
    onDislike: () => void;
}

// [CHANGED] Complete feed card redesign
export default function Feed({ project, onLike, onDislike }: FeedProps){
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('a')) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) { onDislike(); } else { onLike(); }
    };

    // [ADDED] Parse topics into array for pill rendering
    const topicsList = project.topics
        ? project.topics.split(",").map(t => t.trim()).filter(Boolean)
        : [];

    return (
        <div className="rounded-xl h-full w-full overflow-y-auto scrollbar-thin cursor-pointer relative animate-fade-in-up" onClick={handleClick}>
            {/* [CHANGED] Structured card content */}
            <div className="p-5 pb-16 pointer-events-none space-y-4">
                {/* [ADDED] Header with external link */}
                <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold leading-tight text-foreground">{project.title}</h2>
                    <a href={project.link || (project.author ? `https://github.com/${project.author}/${project.title}` : `https://github.com/${project.title}`)} target="_blank" rel="noopener noreferrer"
                       className="pointer-events-auto shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <ExternalLink className="size-4" />
                    </a>
                </div>
                {/* [ADDED] Author */}
                {project.author && (
                    <p className="text-sm text-muted-foreground">by <span className="font-medium text-foreground/80">{project.author}</span></p>
                )}
                {/* [ADDED] Stats badges */}
                <div className="flex items-center gap-3">
                    <Badge variant="warning" className="gap-1"><Star className="size-3" />{project.stars ?? "—"}</Badge>
                    <Badge variant="info" className="gap-1"><GitFork className="size-3" />{project.forks ?? "—"}</Badge>
                </div>
                <Separator className="opacity-50" />
                {/* [ADDED] Topic pills */}
                {topicsList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {topicsList.map((topic, i) => (<Badge key={i} variant="secondary" className="text-xs">{topic}</Badge>))}
                    </div>
                )}
                {/* [CHANGED] Clean description */}
                {project.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                )}
            </div>
            {/* [CHANGED] Swipe overlays with colored gradients + icons */}
            <div className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 rounded-l-xl bg-gradient-to-r from-rose-500/10 to-transparent pointer-events-none">
                <X className="size-8 text-rose-400/60" />
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 rounded-r-xl bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none">
                <Heart className="size-8 text-emerald-400/60" />
            </div>
        </div>
    ) 
}
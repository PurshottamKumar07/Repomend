"use client";
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import Feed, { Project } from "./feed"

const INITIAL_PROJECTs: Project[] = [
    {
        id: 1,
        title: "Project Alpha",
        author: "Purshottam",
        topics: "Python , Javascript , React , Nodejs",
        description: "Lorem ipsum dolor praesentium aliquid consequatur velit hic."
    },
    {
        id: 2,
        title: "Repomend Platform",
        author: "Jane Doe",
        topics: "Next.js , Tailwind CSS , MongoDB",
        description: "A fast semantic recommendation platform."
    },
    {
        id: 3,
        title: "UI Component Library",
        author: "Alex Smith",
        topics: "React , Framer Motion",
        description: "Beautiful animated components for React web apps."
    },
    {
        id: 4,
        title: "E-Commerce Dashboard",
        author: "Sarah Jones",
        topics: "Vue.js , Vuex , Tailwind CSS",
        description: "Interactive analytics dashboard for online merchants."
    },
    {
        id: 5,
        title: "Crypto Tracker app",
        author: "Michael Brown",
        topics: "React Native , Redux , Chart.js",
        description: "Real-time cryptocurrency price tracking mobile application."
    },
    {
        id: 6,
        title: "Fitness Companion app",
        author: "Emily Clark",
        topics: "Flutter , Dart , Firebase",
        description: "Personalized workout and diet tracking platform."
    },
    {
        id: 7,
        title: "Code Snippet Manager",
        author: "David Wilson",
        topics: "Electron , React , SQLite",
        description: "Desktop app to store, organize, and share code snippets."
    },
    {
        id: 8,
        title: "AI Image Generator",
        author: "Sophia Lee",
        topics: "Python , PyTorch , FastApi , React",
        description: "Create stunning artwork from text prompts using deep learning."
    },
    {
        id: 9,
        title: "Task Management Tool",
        author: "James Taylor",
        topics: "Angular , TypeScript , Node.js",
        description: "Collaborative project management and task tracking solution."
    },
    {
        id: 10,
        title: "Weather Forecast API",
        author: "Olivia Martinez",
        topics: "Go , PostgreSQL , Docker",
        description: "High-performance REST API for global weather data."
    }
];

export default function Container({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTs);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState<Project[]>([]);
    const [disliked, setDisliked] = useState<Project[]>([]);
    const [history, setHistory] = useState<{action: 'like' | 'dislike', project: Project}[]>([]);
    const [viewingProject, setViewingProject] = useState<Project | null>(null);

    const currentProject = projects[currentIndex] || null;
    const projectToDisplay = viewingProject || currentProject;

    const handleLike = () => {
        if (viewingProject) {
            if (disliked.some(p => p.id === viewingProject.id)) {
                setDisliked(disliked.filter(p => p.id !== viewingProject.id));
                setLiked([...liked, viewingProject]);
                setHistory([...history, { action: 'like', project: viewingProject }]);
            }
            setViewingProject(null);
            return;
        }

        if (!currentProject) return;
        setLiked([...liked, currentProject]);
        setHistory([...history, { action: 'like', project: currentProject }]);
        setCurrentIndex(currentIndex + 1);
    };

    const handleDislike = () => {
        if (viewingProject) {
            if (liked.some(p => p.id === viewingProject.id)) {
                setLiked(liked.filter(p => p.id !== viewingProject.id));
                setDisliked([...disliked, viewingProject]);
                setHistory([...history, { action: 'dislike', project: viewingProject }]);
            }
            setViewingProject(null);
            return;
        }

        if (!currentProject) return;
        setDisliked([...disliked, currentProject]);
        setHistory([...history, { action: 'dislike', project: currentProject }]);
        setCurrentIndex(currentIndex + 1);
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const lastAction = history[history.length - 1];
        setHistory(history.slice(0, -1));
        
        if (lastAction.action === 'like') {
            setLiked(liked.filter(p => p.id !== lastAction.project.id));
        } else {
            setDisliked(disliked.filter(p => p.id !== lastAction.project.id));
        }
        
        setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="w-full flex justify-between flex-row max-w-full flex-col lg:flex-row text-base gap-10 leading-loose p-6 mt-5">
            <div className="w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-red-900 p-6 flex flex-col rounded-lg">
                <div className="flex justify-center text-xl font-mono ml-4 font-bold">Disliked</div>
                <div className={cn("w-full h-full flex flex-col items-center justify-start overflow-y-auto bg-black text-white rounded-lg shadow-md p-4 gap-2", className)}>
                    {disliked.length === 0 && <span className="opacity-50 mt-10">Empty</span>}
                    {disliked.slice(-5).reverse().map(p => (
                        <div key={p.id} onClick={() => setViewingProject(p)} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 w-full p-2 rounded text-sm text-center truncate cursor-pointer transition-colors">{p.title}</div>
                    ))}
                </div>
            </div>
            
            <div className="w-full h-72 sm:h-80 lg:w-1/2 lg:h-96 xl:w-[50%] bg-gray-900 rounded-lg p-6 relative flex flex-col">
                <div className={cn("w-full h-full flex items-start justify-start rounded-lg shadow-md overflow-hidden", className)}>
                    {projectToDisplay ? (
                        <Feed project={projectToDisplay} onLike={handleLike} onDislike={handleDislike} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono">
                            No more projects to review!
                        </div>
                    )}
                </div>
                
                {viewingProject ? (
                    <button 
                        onClick={() => setViewingProject(null)}
                        className="absolute bottom-4 right-4 bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-lg z-10"
                    >
                        Back to Queue
                    </button>
                ) : history.length > 0 && (
                    <button 
                        onClick={handleUndo}
                        className="absolute bottom-4 right-4 bg-gray-700 hover:bg-gray-600 border border-gray-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-lg z-10"
                    >
                        Undo
                    </button>
                )}
            </div>

            <div className="w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-green-900 p-6 flex flex-col rounded-lg">
                <div className="flex justify-center text-xl font-mono ml-4 font-bold"> Liked</div>
                <div className={cn("w-full h-full flex flex-col items-center justify-start overflow-y-auto bg-black text-white rounded-lg shadow-md p-4 gap-2", className)}>
                    {liked.length === 0 && <span className="opacity-50 mt-10">Empty</span>}
                    {liked.slice(-5).reverse().map(p => (
                        <div key={p.id} onClick={() => setViewingProject(p)} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 w-full p-2 rounded text-sm text-center truncate cursor-pointer transition-colors">{p.title}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
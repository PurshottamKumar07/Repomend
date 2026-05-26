"use client";
// [CHANGED] Complete container redesign — glassmorphism panels, gradient borders, animations
import React, { useState, useEffect, useCallback, useRef } from "react"
import {
    getStoredPreferences,
    setStoredPreferences,
    REPOMEND_RESET_EVENT,
} from "@/lib/preferences"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Feed, { Project } from "./feed"
import TopicPicker from "./topic-picker"
import { ThumbsDown, ThumbsUp, RotateCcw, ArrowLeft, ArrowRight, RefreshCw, Loader2 } from "lucide-react"

function appendUniqueProject(list: Project[], project: Project): Project[] {
    if (list.some((p) => p.id === project.id)) return list;
    return [...list, project];
}

function getRecentUniqueProjects(list: Project[], count = 8): Project[] {
    const seen = new Set<number>();
    const recent: Project[] = [];
    for (let i = list.length - 1; i >= 0 && recent.length < count; i--) {
        const project = list[i];
        if (seen.has(project.id)) continue;
        seen.add(project.id);
        recent.push(project);
    }
    return recent;
}

export default function Container({ className }: React.HTMLAttributes<HTMLDivElement>) {
    // [ADDED] Topic selection state — null means user hasn't chosen yet
    const [preferences, setPreferences] = useState<Record<string, number> | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState<Project[]>([]);
    const [disliked, setDisliked] = useState<Project[]>([]);
    const [history, setHistory] = useState<{ action: 'like' | 'dislike', project: Project }[]>([]);
    const [viewingProject, setViewingProject] = useState<Project | null>(null);

    // [ADDED] Handle topic selection completion
    const handleTopicComplete = useCallback((prefs: Record<string, number>) => {
        setPreferences(prefs);
        setStoredPreferences(prefs);
    }, []);
    // Helper: adjust topic scores based on like (+15) or dislike (-5).
    const updateTopicScores = (proj: Project, delta: number) => {
        if (!preferences) return;
        // Ensure topics is an array of strings
        const topicsArray: string[] = Array.isArray(proj.topics)
            ? proj.topics
            : typeof proj.topics === "string"
                ? proj.topics.split(',').map(t => t.trim())
                : [];
        const newPrefs = { ...preferences };
        topicsArray.forEach(topic => {
            const current = newPrefs[topic] ?? 0;
            const updated = current + delta;
            newPrefs[topic] = updated < 0 ? 0 : updated; // enforce minimum 0
        });
        setPreferences(newPrefs);
        setStoredPreferences(newPrefs);
    };

    const didInitialFetch = useRef(false);

    useEffect(() => {
        const saved = getStoredPreferences();
        if (saved) setPreferences(saved);
    }, []);

    useEffect(() => {
        const handleReset = () => {
            setPreferences(null);
            setProjects([]);
            setLiked([]);
            setDisliked([]);
            setHistory([]);
            setViewingProject(null);
            setCurrentIndex(0);
            setLoading(false);
            didInitialFetch.current = false;
        };

        window.addEventListener(REPOMEND_RESET_EVENT, handleReset);
        return () => window.removeEventListener(REPOMEND_RESET_EVENT, handleReset);
    }, []);

    const fetchProjects = useCallback(async () => {
        const prefs = getStoredPreferences();
        if (!prefs) return;

        try {
            setLoading(true);
            await fetch("/api/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences: prefs }),
            });

            const response = await fetch("/api/projects?limit=10");
            const data = await response.json();
            if (Array.isArray(data)) {
                const mappedProjects: Project[] = data.map((item: {
                    id: number;
                    title: string;
                    description?: string;
                    stars?: number | string;
                    forks?: number | string;
                    language?: string;
                    author?: string;
                    link?: string;
                }) => {
                    const linkUrl = item.link ?? "";
                    const extractedAuthor = linkUrl ? linkUrl.split("/")[3] : "";
                    return {
                        id: item.id,
                        title: item.title,
                        author: item.author || extractedAuthor || "",
                        description: item.description ?? "",
                        stars: String(item.stars ?? ""),
                        forks: String(item.forks ?? ""),
                        topics: item.language ?? "",
                        link: item.link,
                    };
                });
                setProjects(mappedProjects);
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (preferences === null) return;
        if (didInitialFetch.current) return;
        didInitialFetch.current = true;
        fetchProjects();
    }, [preferences, fetchProjects]);

    const currentProject = projects[currentIndex] || null;
    const projectToDisplay = viewingProject || currentProject;

    const handleLike = () => {
        if (viewingProject) {
            updateTopicScores(viewingProject, 15);

            if (disliked.some(p => p.id === viewingProject.id)) {
                setDisliked(disliked.filter(p => p.id !== viewingProject.id));
                setLiked(appendUniqueProject(liked, viewingProject));
                setHistory([...history, { action: 'like', project: viewingProject }]);
            }

            setViewingProject(null);
            return;
        }

        if (!currentProject) return;

        updateTopicScores(currentProject, 15);

        setLiked(appendUniqueProject(liked, currentProject));
        setHistory([...history, { action: 'like', project: currentProject }]);
        setCurrentIndex(currentIndex + 1);
    };
    const handleDislike = () => {
        if (viewingProject) {
            // Reduce topics of disliked project (-5, floor at 0)
            updateTopicScores(viewingProject, -5);
            if (liked.some(p => p.id === viewingProject.id)) {
                setLiked(liked.filter(p => p.id !== viewingProject.id));
                setDisliked(appendUniqueProject(disliked, viewingProject));
                setHistory([...history, { action: 'dislike', project: viewingProject }]);
            }
            setViewingProject(null);
            return;
        }
        if (!currentProject) return;
        // Reduce topics of disliked project (-5, floor at 0)
        updateTopicScores(currentProject, -5);
        setDisliked(appendUniqueProject(disliked, currentProject));
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

    // [ADDED] Progress indicator
    const progress = projects.length > 0 ? Math.round((currentIndex / projects.length) * 100) : 0;

    // [ADDED] Show topic picker if user hasn't selected preferences yet
    if (preferences === null) {
        return <TopicPicker onComplete={handleTopicComplete} />;
    }

    return (
        <>
            {/* [ADDED] Instruction banner — only shows in feed mode */}
            <div className="w-full border-b border-border/30 bg-muted/30">
                <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 px-6 py-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center rounded-md bg-rose-500/10 p-1.5">
                            <ArrowLeft className="size-3.5 text-rose-400" />
                        </span>
                        <span>Click left to <strong className="text-rose-400">skip</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center rounded-md bg-blue-500/10 p-1.5">
                            <RotateCcw className="size-3.5 text-blue-400" />
                        </span>
                        <span>Click undo to <strong className="text-blue-400">go back</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center rounded-md bg-emerald-500/10 p-1.5">
                            <ArrowRight className="size-3.5 text-emerald-400" />
                        </span>
                        <span>Click right to <strong className="text-emerald-400">save</strong></span>
                    </div>
                </div>
            </div>

            {/* [CHANGED] Main content area with better spacing */}
            <main className="flex-1 px-4 py-6 lg:px-8">
                <div className="w-full flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

                    <Card className="w-full lg:w-72 xl:w-80 border-rose-500/20 bg-card/50 backdrop-blur-sm shrink-0">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center justify-between text-base">
                                <span className="flex items-center gap-2">
                                    <ThumbsDown className="size-4 text-rose-400" />
                                    <span className="text-rose-400">Skipped</span>
                                </span>
                                {/* [ADDED] Count badge */}
                                <Badge variant="destructive" className="text-xs">{disliked.length}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                            <div className={cn("flex flex-col gap-1.5 max-h-64 lg:max-h-80 overflow-y-auto scrollbar-thin pr-1", className)}>
                                {disliked.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-8 opacity-60">Nothing skipped yet</p>
                                )}
                                {/* [CHANGED] Better item cards with hover scale */}
                                {getRecentUniqueProjects(disliked).map((p) => (
                                    <button
                                        type="button"
                                        key={`skipped-${p.id}`}
                                        onClick={() => setViewingProject(p)}
                                        className="w-full text-left rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 text-sm truncate transition-all hover:bg-secondary hover:scale-[1.02] hover:border-rose-500/30"
                                    >
                                        {p.title}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* [CHANGED] Center card — main project display with floating animation + gradient border */}
                    <div className="flex-1 min-w-0 flex flex-col gap-3">
                        {/* [ADDED] Progress bar */}
                        {!loading && projects.length > 0 && (
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span>{currentIndex}/{projects.length}</span>
                            </div>
                        )}

                        <Card className="flex-1 min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem] border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden">
                            <CardContent className="h-full p-0">
                                <div className={cn("w-full h-full", className)}>
                                    {loading ? (
                                        // [CHANGED] Better loading state with spinner
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                                            <Loader2 className="size-6 animate-spin text-primary" />
                                            <p className="text-sm font-medium animate-pulse">Discovering repos...</p>
                                        </div>
                                    ) : projectToDisplay ? (
                                        <Feed project={projectToDisplay} onLike={handleLike} onDislike={handleDislike} />
                                    ) : (
                                        // [CHANGED] Better empty state with refresh button
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                            <p className="text-lg font-medium">All caught up! 🎉</p>
                                            <p className="text-sm">You&apos;ve reviewed all available projects.</p>
                                            <Button variant="outline" onClick={() => { setCurrentIndex(0); fetchProjects(); }} className="gap-2">
                                                <RefreshCw className="size-4" />
                                                Load More
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>

                            {/* [CHANGED] Action buttons — pill-shaped with icons, shadcn Button */}
                            <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                                {viewingProject ? (
                                    <Button size="sm" variant="outline" onClick={() => setViewingProject(null)} className="gap-1.5 shadow-lg">
                                        <ArrowLeft className="size-3.5" />
                                        Back
                                    </Button>
                                ) : history.length > 0 && (
                                    <Button size="sm" variant="outline" onClick={handleUndo} className="gap-1.5 shadow-lg">
                                        <RotateCcw className="size-3.5" />
                                        Undo
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* [CHANGED] Liked panel — shadcn Card with emerald glow border */}
                    <Card className="w-full lg:w-72 xl:w-80 border-emerald-500/20 bg-card/50 backdrop-blur-sm shrink-0">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center justify-between text-base">
                                <span className="flex items-center gap-2">
                                    <ThumbsUp className="size-4 text-emerald-400" />
                                    <span className="text-emerald-400">Saved</span>
                                </span>
                                <Badge variant="success" className="text-xs">{liked.length}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                            <div className={cn("flex flex-col gap-1.5 max-h-64 lg:max-h-80 overflow-y-auto scrollbar-thin pr-1", className)}>
                                {liked.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-8 opacity-60">Nothing saved yet</p>
                                )}
                                {getRecentUniqueProjects(liked).map((p) => (
                                    <button
                                        type="button"
                                        key={`saved-${p.id}`}
                                        onClick={() => setViewingProject(p)}
                                        className="w-full text-left rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 text-sm truncate transition-all hover:bg-secondary hover:scale-[1.02] hover:border-emerald-500/30"
                                    >
                                        {p.title}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}
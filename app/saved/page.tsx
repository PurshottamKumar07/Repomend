"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Star,
  GitFork,
  ExternalLink,
  BookmarkCheck,
  Trash2,
  RefreshCw,
  Loader2,
  Compass,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Navbar from "@/components/ui/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Must match the key used in container.tsx
const LIKED_STORAGE_KEY = "repomend_liked";
const PAGE_SIZE = 12;

type SavedProject = {
  id: number;
  title: string;
  author: string;
  topics: string;
  description: string;
  stars: string;
  forks: string;
  link: string;
};

export default function SavedPage() {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  /* ── Fetch saved projects from backend ────────────────────────── */
  const fetchFromBackend = useCallback(
    async (pageNum: number) => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/liked?page=${pageNum}&limit=${PAGE_SIZE}`);

        if (!res.ok) {
          setProjects([]);
          setTotalPages(1);
          return;
        }

        const json = await res.json();

        // Normalise — backend may return { data: [...], hasMore, totalPages } or just an array
        const data: SavedProject[] = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
            ? json.data
            : [];

        setProjects(data);

        // Derive total pages from backend response if available
        if (typeof json.totalPages === "number") {
          setTotalPages(json.totalPages);
        } else if (typeof json.total === "number") {
          setTotalPages(Math.max(1, Math.ceil(json.total / PAGE_SIZE)));
        } else if (typeof json.hasMore === "boolean") {
          // Fallback: if backend only tells us hasMore, estimate pages
          setTotalPages((prev) =>
            json.hasMore ? Math.max(prev, pageNum + 1) : pageNum,
          );
        } else {
          // If data fills a page, assume there could be more
          setTotalPages((prev) =>
            data.length >= PAGE_SIZE ? Math.max(prev, pageNum + 1) : pageNum,
          );
        }

        setPage(pageNum);
      } catch {
        setProjects([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /* ── Initial load from backend ────────────────────────────────── */
  useEffect(() => {
    fetchFromBackend(1);
  }, [fetchFromBackend]);

  /* ── Reload: pull from localStorage → display → sync to backend ─ */
  const handleReload = async () => {
    setIsSyncing(true);
    try {
      const stored = localStorage.getItem(LIKED_STORAGE_KEY);
      const likedProjects: SavedProject[] = stored ? JSON.parse(stored) : [];

      // Sync to backend, then re-fetch page 1 to get fresh server state
      if (likedProjects.length > 0) {
        await fetch("/api/liked", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projects: likedProjects }),
        }).catch(() => {
          /* silent */
        });
      }

      // Re-fetch from backend to get consistent paginated data
      await fetchFromBackend(1);
    } catch {
      setProjects([]);
    } finally {
      setIsSyncing(false);
    }
  };

  /* ── Page navigation ─────────────────────────────────────────── */
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    fetchFromBackend(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** Build an array of page numbers to display (with -1 as ellipsis). */
  const getPageNumbers = (): number[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [1];

    if (page > 3) pages.push(-1); // left ellipsis

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push(-1); // right ellipsis

    pages.push(totalPages);
    return pages;
  };

  /* ── Delete a saved project ───────────────────────────────────── */
  const handleDelete = (id: number) => {
    // Optimistic UI update
    setProjects((prev) => prev.filter((p) => p.id !== id));

    // Remove from localStorage so it stays in sync
    try {
      const stored = localStorage.getItem(LIKED_STORAGE_KEY);
      if (stored) {
        const arr: SavedProject[] = JSON.parse(stored);
        localStorage.setItem(
          LIKED_STORAGE_KEY,
          JSON.stringify(arr.filter((p) => p.id !== id)),
        );
      }
    } catch {
      /* ignore */
    }

    // Remove from backend so it doesn't reappear on reload
    fetch("/api/liked", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {
      /* silent — project is already removed from UI */
    });
  };

  /* ── Helpers ──────────────────────────────────────────────────── */
  const fmt = (val: string | number) => {
    const n = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(n)) return "—";
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
  };

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* ─── Header ──────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <BookmarkCheck className="size-5 text-emerald-400" />
                <span className="text-emerald-400">Saved Repositories</span>
                {projects.length > 0 && (
                  <Badge variant="success" className="ml-2 text-xs">
                    {projects.length}
                  </Badge>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Repositories you&apos;ve bookmarked for later.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReload}
              disabled={isSyncing}
              className="gap-1.5"
            >
              {isSyncing ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <RefreshCw className="size-3.5" />
              )}
              Reload
            </Button>
          </div>

          {/* ─── Loading skeleton ─────────────────────────────── */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-24">
              <Loader2 className="size-6 animate-spin text-emerald-400" />
              <p className="animate-pulse text-sm text-muted-foreground">
                Loading saved repos…
              </p>
            </div>
          )}

          {/* ─── Empty state ─────────────────────────────────── */}
          {!isLoading && projects.length === 0 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
                <div className="rounded-full bg-emerald-500/10 p-4">
                  <BookmarkCheck className="size-8 text-emerald-400/60" />
                </div>
                <div className="space-y-1.5 text-center">
                  <p className="text-lg font-medium text-foreground/80">
                    No saved repositories yet
                  </p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Like some repos in the feed and click{" "}
                    <strong className="text-foreground/70">Reload</strong> to
                    display them here, or they&apos;ll load automatically once
                    synced to the backend.
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReload}
                    disabled={isSyncing}
                    className="gap-1.5"
                  >
                    {isSyncing ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="size-3.5" />
                    )}
                    Reload
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-500"
                    render={<Link href="/" />}
                  >
                    <Compass className="size-3.5" />
                    Explore Feed
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ─── Project grid ────────────────────────────────── */}
          {!isLoading && projects.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((repo, idx) => (
                  <Card
                    key={repo.id}
                    className="group relative border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-card/70"
                    style={{
                      animation: `fade-in-up 0.4s ease-out ${Math.min(idx, 11) * 50}ms both`,
                    }}
                  >
                    {/* ── Delete button (top‑right) ── */}
                    <button
                      type="button"
                      onClick={() => handleDelete(repo.id)}
                      className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      title="Remove from saved"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    <CardHeader className="pb-2 pr-10">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-base">
                          <span className="text-foreground/90">
                            {repo.title}
                          </span>
                          {repo.author && (
                            <p className="mt-0.5 text-sm font-normal text-muted-foreground">
                              {repo.author}
                            </p>
                          )}
                        </CardTitle>
                        <a
                          href={
                            repo.link ||
                            `https://github.com/${repo.author}/${repo.title}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {repo.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="warning" className="gap-1">
                          <Star className="size-3" />
                          {fmt(repo.stars)}
                        </Badge>
                        <Badge variant="info" className="gap-1">
                          <GitFork className="size-3" />
                          {fmt(repo.forks)}
                        </Badge>
                        {repo.topics && (
                          <Badge variant="secondary">{repo.topics}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* ── Pagination Controls ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-6">
                  {/* First page */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(1)}
                    disabled={page === 1}
                    className="size-9"
                    title="First page"
                  >
                    <ChevronsLeft className="size-4" />
                  </Button>

                  {/* Previous */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="size-9"
                    title="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>

                  {/* Page numbers */}
                  {getPageNumbers().map((p, idx) =>
                    p === -1 ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1 text-muted-foreground select-none"
                      >
                        …
                      </span>
                    ) : (
                      <Button
                        key={p}
                        variant={p === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => goToPage(p)}
                        className={cn(
                          "size-9 text-sm font-medium",
                          p === page &&
                            "bg-emerald-600 text-white hover:bg-emerald-500 border-emerald-600",
                        )}
                      >
                        {p}
                      </Button>
                    ),
                  )}

                  {/* Next */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="size-9"
                    title="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </Button>

                  {/* Last page */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(totalPages)}
                    disabled={page === totalPages}
                    className="size-9"
                    title="Last page"
                  >
                    <ChevronsRight className="size-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

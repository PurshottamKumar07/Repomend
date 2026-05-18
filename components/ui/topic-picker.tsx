"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ChevronRight,
  Check,
  Zap,
  Globe,
  Cpu,
  Database,
  Palette,
  Shield,
  Gamepad2,
  Brain,
  Smartphone,
  Cloud,
  Terminal,
  BarChart3,
  Blocks,
  Bot,
  Rocket,
  Loader2,
} from "lucide-react";

// Topic categories with icons and curated topics
const TOPIC_CATEGORIES = [
  {
    name: "AI & Machine Learning",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
    textColor: "text-violet-400",
    topics: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "LLMs",
      "Transformers",
      "Reinforcement Learning",
      "Generative AI",
    ],
  },
  {
    name: "Web Development",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    topics: [
      "React",
      "Next.js",
      "Vue",
      "Svelte",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "TailwindCSS",
    ],
  },
  {
    name: "Systems & Infrastructure",
    icon: Cpu,
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-400",
    topics: [
      "Rust",
      "Go",
      "C++",
      "Linux",
      "Networking",
      "Compilers",
      "Operating Systems",
      "Embedded",
    ],
  },
  {
    name: "Data & Databases",
    icon: Database,
    color: "from-emerald-500 to-green-500",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    topics: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Data Engineering",
      "ETL",
      "Apache Spark",
      "Elasticsearch",
      "SQL",
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    color: "from-sky-500 to-blue-600",
    borderColor: "border-sky-500/30",
    bgColor: "bg-sky-500/10",
    textColor: "text-sky-400",
    topics: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "CI/CD",
      "GitHub Actions",
      "Serverless",
      "Monitoring",
    ],
  },
  {
    name: "Security & Privacy",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    borderColor: "border-red-500/30",
    bgColor: "bg-red-500/10",
    textColor: "text-red-400",
    topics: [
      "Cybersecurity",
      "Cryptography",
      "Pentesting",
      "OWASP",
      "Zero Trust",
      "Authentication",
      "Reverse Engineering",
      "Malware Analysis",
    ],
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    color: "from-pink-500 to-fuchsia-500",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-400",
    topics: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "iOS",
      "Android",
      "Expo",
      "Cross-Platform",
    ],
  },
  {
    name: "Design & Frontend",
    icon: Palette,
    color: "from-fuchsia-500 to-pink-500",
    borderColor: "border-fuchsia-500/30",
    bgColor: "bg-fuchsia-500/10",
    textColor: "text-fuchsia-400",
    topics: [
      "UI/UX",
      "Figma",
      "Design Systems",
      "Animations",
      "CSS",
      "Accessibility",
      "3D Graphics",
      "WebGL",
    ],
  },
  {
    name: "Blockchain & Web3",
    icon: Blocks,
    color: "from-yellow-500 to-amber-500",
    borderColor: "border-yellow-500/30",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-400",
    topics: [
      "Solidity",
      "Ethereum",
      "Smart Contracts",
      "DeFi",
      "NFTs",
      "Web3.js",
      "Layer 2",
      "Consensus",
    ],
  },
  {
    name: "Data Science & Analytics",
    icon: BarChart3,
    color: "from-teal-500 to-cyan-500",
    borderColor: "border-teal-500/30",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-400",
    topics: [
      "Python",
      "Pandas",
      "Jupyter",
      "Visualization",
      "Statistics",
      "R",
      "Matplotlib",
      "Scikit-learn",
    ],
  },
  {
    name: "Game Development",
    icon: Gamepad2,
    color: "from-indigo-500 to-violet-500",
    borderColor: "border-indigo-500/30",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-400",
    topics: [
      "Unity",
      "Unreal Engine",
      "Godot",
      "Game Physics",
      "Procedural Generation",
      "Pixel Art",
      "Multiplayer",
      "Shaders",
    ],
  },
  {
    name: "Automation & Bots",
    icon: Bot,
    color: "from-lime-500 to-green-500",
    borderColor: "border-lime-500/30",
    bgColor: "bg-lime-500/10",
    textColor: "text-lime-400",
    topics: [
      "Web Scraping",
      "Discord Bots",
      "Task Automation",
      "CLI Tools",
      "Selenium",
      "Puppeteer",
      "Cron Jobs",
      "APIs",
    ],
  },
];

interface TopicPickerProps {
  onComplete: (preferences: Record<string, number>) => void;
}

export default function TopicPicker({ onComplete }: TopicPickerProps) {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(TOPIC_CATEGORIES.map((c) => c.name)),
  );

  // Restore any previously saved selections from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("userTopicPreferences");
      if (saved) {
        const parsed: Record<string, number> = JSON.parse(saved);
        setSelectedTopics(new Set(Object.keys(parsed)));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggleTopic = useCallback((topic: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  }, []);

  const toggleCategory = useCallback((categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  }, []);

  const selectAllInCategory = useCallback(
    (topics: string[]) => {
      setSelectedTopics((prev) => {
        const next = new Set(prev);
        const allSelected = topics.every((t) => next.has(t));
        if (allSelected) {
          topics.forEach((t) => next.delete(t));
        } else {
          topics.forEach((t) => next.add(t));
        }
        return next;
      });
    },
    [],
  );

  const handleContinue = useCallback(async () => {
    // Build the dictionary with score 100 for each selected topic
    const preferences: Record<string, number> = {};
    selectedTopics.forEach((topic) => {
      preferences[topic] = 100;
    });
    
    // Persist selections to localStorage
    try {
      localStorage.setItem("userTopicPreferences", JSON.stringify(preferences));
    } catch {
      // ignore storage errors
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      // POST preferences directly to the backend at localhost:8000
      const res = await fetch("http://localhost:8000/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error ${res.status}: ${text}`);
      }
      // On success, clear persisted selections so the picker starts fresh next time
      localStorage.removeItem("userTopicPreferences");
      setSelectedTopics(new Set());
    } catch (err) {
      console.error("Failed to send preferences to backend:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to save preferences.",
      );
    } finally {
      setSubmitting(false);
      onComplete(preferences);
    }
  }, [selectedTopics, onComplete]);

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 size-64 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-0 size-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-10 text-center lg:py-14">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            Personalize Your Feed
          </div>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight lg:text-4xl">
            What topics interest you?
          </h1>
          <p className="max-w-lg text-base text-muted-foreground">
            Pick the topics you care about and we&apos;ll curate your repo
            recommendations. You can always change these later.
          </p>

          {/* Selection counter */}
          <div className="flex items-center gap-3 pt-2">
            <Badge
              variant="outline"
              className={`gap-1.5 px-3 py-1.5 text-sm transition-all ${
                selectedTopics.size > 0
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Zap className="size-3.5" />
              {selectedTopics.size} selected
            </Badge>
            {selectedTopics.size < 3 && (
              <span className="text-xs text-muted-foreground">
                Pick at least 3 to continue
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div className="container mx-auto flex-1 px-4 py-8 lg:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const allSelected = category.topics.every((t) =>
              selectedTopics.has(t),
            );
            const someSelected = category.topics.some((t) =>
              selectedTopics.has(t),
            );
            const selectedCount = category.topics.filter((t) =>
              selectedTopics.has(t),
            ).length;

            return (
              <div
                key={category.name}
                className={`group rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                  someSelected
                    ? `${category.borderColor} shadow-md`
                    : "border-border/40 hover:border-border/80"
                }`}
              >
                {/* Category header */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleCategory(category.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCategory(category.name);
                    }
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5"
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} shadow-lg`}
                  >
                    <Icon className="size-4.5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                    {selectedCount > 0 && (
                      <span className={`text-xs ${category.textColor}`}>
                        {selectedCount} picked
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectAllInCategory(category.topics);
                    }}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                      allSelected
                        ? `${category.bgColor} ${category.textColor}`
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {allSelected ? "Deselect all" : "Select all"}
                  </button>
                </div>

                {/* Topic pills */}
                {expandedCategories.has(category.name) && (
                  <div className="flex flex-wrap gap-2 px-4 pb-4">
                    {category.topics.map((topic) => {
                      const isSelected = selectedTopics.has(topic);
                      return (
                        <button
                          key={topic}
                          onClick={() => toggleTopic(topic)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? `${category.borderColor} ${category.bgColor} ${category.textColor} shadow-sm`
                              : "border-border/50 bg-secondary/50 text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          {isSelected && (
                            <Check className="size-3 animate-fade-in-up" />
                          )}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 border-t border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {selectedTopics.size > 0 && (
              <div className="hidden flex-wrap gap-1.5 sm:flex">
                {Array.from(selectedTopics)
                  .slice(0, 5)
                  .map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                {selectedTopics.size > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{selectedTopics.size - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => onComplete({})}
              className="text-muted-foreground"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selectedTopics.size < 3 || submitting}
              className="gap-2 bg-gradient-to-r from-blue-600 to-violet-600 px-6 text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-violet-500 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

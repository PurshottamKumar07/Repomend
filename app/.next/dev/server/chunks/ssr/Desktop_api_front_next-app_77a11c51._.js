module.exports = [
"[project]/Desktop/api/front/next-app/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Desktop/api/front/next-app/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/@base-ui/react/esm/button/Button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
            ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
            destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
            lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
            icon: "size-8",
            "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
            "icon-lg": "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f40$base$2d$ui$2f$react$2f$esm$2f$button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/api/front/next-app/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/api/front/next-app/components/ui/feed.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Feed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Feed({ project, onLike, onDislike }) {
    const handleClick = (e)=>{
        // Prevent click events if clicking on a link
        if (e.target.closest('a')) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            onDislike();
        } else {
            onLike();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg h-full w-full overflow-y-auto scrollbar-thin cursor-pointer relative",
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prose prose-sm md:prose-base dark:prose-invert max-w-none pointer-events-none pb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "no-underline pointer-events-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: project.title
                        }, void 0, false, {
                            fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                            lineNumber: 37,
                            columnNumber: 74
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Name: "
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: " bg-black rounded-lg mr-14 p-1",
                        children: project.author
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 38,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Topics : "
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: " bg-black rounded-lg mr-14 p-1",
                        children: project.topics
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 40,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Description: "
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: " bg-black rounded-lg mr-14 p-1",
                        children: project.description
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                        lineNumber: 41,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 bottom-0 left-0 w-1/2 hover:bg-white/5 opacity-0 hover:opacity-100 transition-colors pointer-events-none rounded-l-lg border-r border-transparent hover:border-white/10"
            }, void 0, false, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 bottom-0 right-0 w-1/2 hover:bg-white/5 opacity-0 hover:opacity-100 transition-colors pointer-events-none rounded-r-lg border-l border-transparent hover:border-white/10"
            }, void 0, false, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/api/front/next-app/components/ui/feed.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/api/front/next-app/components/ui/container.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$components$2f$ui$2f$feed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/api/front/next-app/components/ui/feed.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const INITIAL_PROJECTs = [
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
function Container({ className }) {
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_PROJECTs);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [disliked, setDisliked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [viewingProject, setViewingProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const currentProject = projects[currentIndex] || null;
    const projectToDisplay = viewingProject || currentProject;
    const handleLike = ()=>{
        if (viewingProject) {
            if (disliked.some((p)=>p.id === viewingProject.id)) {
                setDisliked(disliked.filter((p)=>p.id !== viewingProject.id));
                setLiked([
                    ...liked,
                    viewingProject
                ]);
                setHistory([
                    ...history,
                    {
                        action: 'like',
                        project: viewingProject
                    }
                ]);
            }
            setViewingProject(null);
            return;
        }
        if (!currentProject) return;
        setLiked([
            ...liked,
            currentProject
        ]);
        setHistory([
            ...history,
            {
                action: 'like',
                project: currentProject
            }
        ]);
        setCurrentIndex(currentIndex + 1);
    };
    const handleDislike = ()=>{
        if (viewingProject) {
            if (liked.some((p)=>p.id === viewingProject.id)) {
                setLiked(liked.filter((p)=>p.id !== viewingProject.id));
                setDisliked([
                    ...disliked,
                    viewingProject
                ]);
                setHistory([
                    ...history,
                    {
                        action: 'dislike',
                        project: viewingProject
                    }
                ]);
            }
            setViewingProject(null);
            return;
        }
        if (!currentProject) return;
        setDisliked([
            ...disliked,
            currentProject
        ]);
        setHistory([
            ...history,
            {
                action: 'dislike',
                project: currentProject
            }
        ]);
        setCurrentIndex(currentIndex + 1);
    };
    const handleUndo = ()=>{
        if (history.length === 0) return;
        const lastAction = history[history.length - 1];
        setHistory(history.slice(0, -1));
        if (lastAction.action === 'like') {
            setLiked(liked.filter((p)=>p.id !== lastAction.project.id));
        } else {
            setDisliked(disliked.filter((p)=>p.id !== lastAction.project.id));
        }
        setCurrentIndex(currentIndex - 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex justify-between flex-row max-w-full flex-col lg:flex-row text-base gap-10 leading-loose p-6 mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-red-900 p-6 flex flex-col rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center text-xl font-mono ml-4 font-bold",
                        children: "Disliked"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full h-full flex flex-col items-center justify-start overflow-y-auto bg-black text-white rounded-lg shadow-md p-4 gap-2", className),
                        children: [
                            disliked.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "opacity-50 mt-10",
                                children: "Empty"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                                lineNumber: 143,
                                columnNumber: 47
                            }, this),
                            disliked.slice(-5).reverse().map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setViewingProject(p),
                                    className: "bg-gray-800 hover:bg-gray-700 border border-gray-700 w-full p-2 rounded text-sm text-center truncate cursor-pointer transition-colors",
                                    children: p.title
                                }, p.id, false, {
                                    fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                                    lineNumber: 145,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-72 sm:h-80 lg:w-1/2 lg:h-96 xl:w-[50%] bg-gray-900 rounded-lg p-6 relative flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full h-full flex items-start justify-start rounded-lg shadow-md overflow-hidden", className),
                        children: projectToDisplay ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$components$2f$ui$2f$feed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            project: projectToDisplay,
                            onLike: handleLike,
                            onDislike: handleDislike
                        }, void 0, false, {
                            fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                            lineNumber: 153,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-full flex items-center justify-center text-gray-400 font-mono",
                            children: "No more projects to review!"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                            lineNumber: 155,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, this),
                    viewingProject ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setViewingProject(null),
                        className: "absolute bottom-4 right-4 bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-lg z-10",
                        children: "Back to Queue"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 162,
                        columnNumber: 21
                    }, this) : history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleUndo,
                        className: "absolute bottom-4 right-4 bg-gray-700 hover:bg-gray-600 border border-gray-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-lg z-10",
                        children: "Undo"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 169,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-green-900 p-6 flex flex-col rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center text-xl font-mono ml-4 font-bold",
                        children: " Liked"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full h-full flex flex-col items-center justify-start overflow-y-auto bg-black text-white rounded-lg shadow-md p-4 gap-2", className),
                        children: [
                            liked.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "opacity-50 mt-10",
                                children: "Empty"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                                lineNumber: 181,
                                columnNumber: 44
                            }, this),
                            liked.slice(-5).reverse().map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$api$2f$front$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setViewingProject(p),
                                    className: "bg-gray-800 hover:bg-gray-700 border border-gray-700 w-full p-2 rounded text-sm text-center truncate cursor-pointer transition-colors",
                                    children: p.title
                                }, p.id, false, {
                                    fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                        lineNumber: 180,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
                lineNumber: 178,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/api/front/next-app/components/ui/container.tsx",
        lineNumber: 139,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_api_front_next-app_77a11c51._.js.map
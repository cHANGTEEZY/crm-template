module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/components/_common/scroll-to-top.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
const STORAGE_PREFIX = "scroll-position:";
const RESTORE_FRAMES = 12;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
function navigationType() {
    const entry = performance.getEntriesByType("navigation")[0];
    return entry?.type;
}
function readPosition(path) {
    try {
        const stored = sessionStorage.getItem(STORAGE_PREFIX + path);
        const value = stored === null ? NaN : Number(stored);
        return Number.isFinite(value) ? value : null;
    } catch  {
        return null;
    }
}
function savePosition(path) {
    try {
        sessionStorage.setItem(STORAGE_PREFIX + path, String(Math.round(window.scrollY)));
    } catch  {}
}
function scrollInstantly(scroll) {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    root.getClientRects();
    scroll();
    root.style.scrollBehavior = previous;
}
function ScrollToTop() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const committed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const traversalTarget = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const onPopState = ()=>{
            const target = window.location.pathname;
            traversalTarget.current = target === committed.current ? null : target;
        };
        const save = ()=>savePosition(window.location.pathname);
        const onVisibilityChange = ()=>{
            if (document.visibilityState === "hidden") save();
        };
        window.addEventListener("popstate", onPopState);
        window.addEventListener("pagehide", save);
        document.addEventListener("visibilitychange", onVisibilityChange);
        return ()=>{
            window.removeEventListener("popstate", onPopState);
            window.removeEventListener("pagehide", save);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useLayoutEffect(()=>{
        const path = window.location.pathname;
        const initial = committed.current === null;
        const changed = committed.current !== path;
        committed.current = path;
        if (changed) {
            const type = initial ? navigationType() : undefined;
            const traversal = traversalTarget.current === path || type === "back_forward";
            if (traversal) {
                traversalTarget.current = null;
                const top = readPosition(path) ?? 0;
                let attempts = 0;
                const restore = ()=>{
                    if (committed.current !== path) return;
                    scrollInstantly(()=>window.scrollTo(0, top));
                    const reachable = document.documentElement.scrollHeight - window.innerHeight >= top;
                    if (!reachable && attempts < RESTORE_FRAMES) {
                        attempts += 1;
                        window.requestAnimationFrame(restore);
                    }
                };
                restore();
            } else if (window.location.hash) {
                const target = initial ? document.getElementById(window.location.hash.slice(1)) : null;
                if (target) scrollInstantly(()=>target.scrollIntoView());
            } else {
                scrollInstantly(()=>window.scrollTo(0, 0));
            }
        }
        return ()=>savePosition(path);
    }, [
        pathname
    ]);
    return null;
}
const __TURBOPACK__default__export__ = ScrollToTop;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f5-9sl._.js.map
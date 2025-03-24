"use strict";
import { LoadHeader } from "./header.js";
export class Router {
    routes = {};
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        // popstate fires when the user clicks the forward/ back  button in the browser
        window.addEventListener("popstate", () => {
            console.log("[INFO] Navigating to...");
            this.loadRoute(location.pathname);
        });
    }
    navigate(path) {
        location.pathname = path;
    }
    async loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        // Add /github.io/ prefix to the path for routing
        const fullPath = '/github.io' + path;
        if (!this.routes[fullPath]) {
            console.warn(`[WARNING] Route not found: ${fullPath}, redirecting to 404`);
            location.pathname = "/github.io/404";
        }
        return fetch(this.routes[fullPath])
            .then((response) => {
            if (!response.ok)
                throw new Error(`Failed to load ${this.routes[fullPath]}`);
            return response.text();
        })
            .then((html) => {
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.innerHTML = html;
            }
            // Ensure the for example the header is "reloaded" in "every" page change
            LoadHeader().then(() => {
                document.dispatchEvent(new CustomEvent("routeLoaded", { detail: fullPath }));
            });
        })
            .catch((error) => console.error("[ERROR] Error loading page:", error));
    }
}
//# sourceMappingURL=router.js.map
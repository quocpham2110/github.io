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
        // get the path only: index.html => index
        const basePath = path || "";
        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404`);
            location.pathname = "/404";
        }
        return fetch(this.routes[basePath])
            .then((response) => {
            if (!response.ok)
                throw new Error(`Failed to load ${this.routes[basePath]}`);
            return response.text();
        })
            .then((html) => {
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.innerHTML = html;
            }
            // Ensure the for example the header is "reloaded" in "every" page change
            LoadHeader().then(() => {
                document.dispatchEvent(new CustomEvent("routeLoaded", { detail: basePath }));
            });
        })
            .catch((error) => console.error("[ERROR] Error loading page:", error));
    }
}
//# sourceMappingURL=router.js.map
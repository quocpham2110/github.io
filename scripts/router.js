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
            this.loadRoute(location.hash.slice(1));
        });
    }
    navigate(path) {
        location.hash = path;
    }
    async loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        const basePath = path.split("#")[0];
        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404`);
            location.hash = "/404";
        }
        await fetch(this.routes[basePath])
            .then(response => {
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
            .catch(error => console.error("[ERROR] Error loading page:", error));
    }
}
//# sourceMappingURL=router.js.map
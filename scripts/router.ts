"use strict";

import {LoadHeader} from "./header.js";

// Define a dictionary for route mappings
export type RouterMap = { [key: string]: string };

export class Router {

    private readonly routes: RouterMap = {};

    constructor(routes: RouterMap) {
        this.routes = routes;
        this.init();
    }

    init(): void {

        // popstate fires when the user clicks the forward/ back  button in the browser
        window.addEventListener("popstate", (): void => {
            console.log("[INFO] Navigating to...");
            this.loadRoute(location.pathname);
        });

    }

    navigate(path: string): void {
        location.pathname = path;
    }

    async loadRoute(path: string): Promise<void> {
        console.log(`[INFO] Loading route: ${path}`);

        // Add /github.io/ prefix to the path for routing
        const fullPath = '/github.io' + path;

        if (!this.routes[fullPath]) {
            console.warn(`[WARNING] Route not found: ${fullPath}, redirecting to 404`);
            location.pathname = "/github.io/404";
        }

        return fetch(this.routes[fullPath])
            .then((response: Response): Promise<string> => {
                if (!response.ok) throw new Error(`Failed to load ${this.routes[fullPath]}`);
                return response.text();
            })
            .then((html: string): void => {
                const mainElement: HTMLElement | null = document.querySelector("main")

                if (mainElement) {
                    mainElement.innerHTML = html;
                }

                // Ensure the for example the header is "reloaded" in "every" page change
                LoadHeader().then((): void => {
                    document.dispatchEvent(new CustomEvent("routeLoaded", {detail: fullPath}));
                });

            })
            .catch((error: Error) => console.error("[ERROR] Error loading page:", error));
    }
}

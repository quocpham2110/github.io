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
        // window.addEventListener("DOMContentLoaded", () => {
        //     const path = location.hash.slice(1) || "/";
        //     console.log("[INFO] Inital Page Load: ", path);
        //     this.loadRoute(path);
        // })
        
        // popstate fires when the user clicks the forward/ back  button in the browser
        window.addEventListener("popstate", () => {
            console.log("[INFO] Navigating to...");
            this.loadRoute(location.hash.slice(1));
        });

    }

    navigate(path: string): void {
        location.hash = path;
    }

    async loadRoute(path: string): Promise<void> {
        console.log(`[INFO] Loading route: ${path}`);

        const basePath = path.split("#")[0];

        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404`);
            location.hash = "/404";
        }

        await fetch(this.routes[basePath])
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${this.routes[basePath]}`);
                return response.text();
            })
            .then((html: string): void => {
                const mainElement: HTMLElement | null = document.querySelector("main")

                if (mainElement) {
                    mainElement.innerHTML = html;
                }

                // Ensure the for example the header is "reloaded" in "every" page change
                LoadHeader().then(() => {
                    document.dispatchEvent(new CustomEvent("routeLoaded", {detail: basePath}));
                });

            })
            .catch(error => console.error("[ERROR] Error loading page:", error));
    }
}
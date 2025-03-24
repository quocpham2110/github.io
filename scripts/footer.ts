"use strict";

export function LoadFooter(): Promise<void> {
    return fetch('./views/components/footer.html')
        .then(res => res.text())
        .then((html: string): void => {
            const footerElement = document.querySelector('footer') as HTMLElement;
            if (footerElement) {
                footerElement.innerHTML = html;
            }
        })
        .catch(err => console.log("[ERROR] Failed to load footer", err));
}

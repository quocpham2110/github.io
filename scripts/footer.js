"use strict";
export function LoadFooter() {
    return fetch('./views/components/footer.html')
        .then(res => res.text())
        .then((html) => {
        const footerElement = document.querySelector('footer');
        if (footerElement) {
            footerElement.innerHTML = html;
        }
    })
        .catch(err => console.log("[ERROR] Failed to load footer", err));
}
//# sourceMappingURL=footer.js.map
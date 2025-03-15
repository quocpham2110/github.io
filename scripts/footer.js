"use strict";

export function LoadFooter() {
    return fetch('./views/components/footer.html')
        .then(res => res.text())
        .then(html => {
            document.querySelector('footer').innerHTML = html;
        })
        .catch(err => console.log("[ERROR] Failed to load footer", err));
}

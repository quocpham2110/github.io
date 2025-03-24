"use strict";

export async function LoadFooter() {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;
    
    const response = await fetch('./views/components/footer.html');
    const data = await response.text();
    footerElement.innerHTML = data;
}

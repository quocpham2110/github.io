'use strict';
import { AuthGuard } from './authguard.js';
/**
 * Using AJAX to load the header for every page
 */
export async function LoadHeader() {
    const headerElement = document.querySelector('header');
    if (!headerElement)
        return;
    const response = await fetch('./views/components/header.html');
    const data = await response.text();
    headerElement.innerHTML = data;
    DynamicNavbar();
    CheckLogin();
    await AuthGuard();
}
/**
 * Check login status
 */
function CheckLogin() {
    console.log('Check user login status');
    const authenticatedUser = sessionStorage.getItem('user');
    // Check if the current page is restricted, show the link in the navbar if the user logged in or vice versa
    const restrictedLinks = ['statistics', 'event-planning'];
    const navbarLinks = document.querySelectorAll('.navbar .nav-link');
    if (authenticatedUser) {
        navbarLinks.forEach((link) => {
            if (restrictedLinks.includes(link.href.split('/').pop() || '')) {
                link.classList.add('d-block');
            }
        });
        const loginNav = document.getElementById('loginNav');
        loginNav.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Logout`;
        loginNav.href = '/github.io/login';
        // Add a welcome message to the navbar
        const welcomeMessage = document.createElement('p');
        welcomeMessage.classList.add('welcome-message', 'mb-0');
        welcomeMessage.textContent = `Welcome, ${JSON.parse(authenticatedUser).DisplayName}!`;
        document.querySelector('.navbar .container-fluid')?.insertBefore(welcomeMessage, loginNav);
        loginNav.addEventListener('click', function (event) {
            event.preventDefault();
            sessionStorage.removeItem('user');
            location.href = '/github.io/login';
        });
    }
    else {
        navbarLinks.forEach((link) => {
            if (restrictedLinks.includes(link.href.split('/').pop() || '')) {
                link.classList.add('d-none');
            }
        });
        // Remove the welcome message from the navbar
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }
    }
}
/**
     * Add some link for new content.
     * Active the link for the current page
     */
function DynamicNavbar() {
    // Dynamic Navbar
    // Add a "Donate" link to navbar
    const navbarNav = document.querySelector('.navbar-nav');
    navbarNav.innerHTML += `<li class="nav-item">
								<a class="nav-link" aria-current="page" href="/github.io/donate">
									<i class="fa-solid fa-hand-holding-dollar me-1"></i></i>Donate
								</a>
							</li>`;
    // Change the "Opportunities" link text to "Volunteer Now"
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const opportunitiesNavLink = [...navLinks,].find((link) => link.innerText === 'Opportunities');
    if (opportunitiesNavLink) {
        opportunitiesNavLink.innerHTML = opportunitiesNavLink.innerHTML.replace('Opportunities', 'Volunteer Now');
    }
    // Active the navbar element for current page
    [...navLinks].forEach((link) => {
        if (document.title.includes(link.innerText)) {
            link.classList.add('active');
        }
        else if (document.title.includes('Opportunities') &&
            link.innerText === 'Volunteer Now') {
            link.classList.add('active');
        }
        else {
            link.classList.remove('active');
        }
    });
}
//# sourceMappingURL=header.js.map
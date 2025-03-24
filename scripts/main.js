/**
 * Name: Quoc Pham
 * Student ID: 100944362
 * Date: March 17, 2025
 */
'use strict';
import { Router } from './router.js';
import { UserDetails } from './userDetails.js';
import { Contact } from './contact.js';
import { LoadHeader } from './header.js';
import { LoadFooter } from './footer.js';
const pageTitle = {
    '/github.io/': 'Home Page',
    '/github.io/home': 'Home Page',
    '/github.io/about': 'About Page',
    '/github.io/contact': 'Contact Us Page',
    '/github.io/donate': 'Donate Page',
    '/github.io/events': 'Events Page',
    '/github.io/gallery': 'Gallery Page',
    '/github.io/login': 'Login Page',
    '/github.io/news': 'News Page',
    '/github.io/opportunities': 'Opportunities Page',
    '/github.io/privacy-policy': 'Privacy Policy Page',
    '/github.io/terms-service': 'Terms of Service Page',
    '/github.io/404': 'Page Not Found',
    '/github.io/statistics': 'Statistics Page',
    '/github.io/event-planning': 'Event Planning Page',
};
const routes = {
    '/github.io/': '/github.io/views/content/home.html',
    '/github.io/home': '/github.io/views/content/home.html',
    '/github.io/about': '/github.io/views/content/about.html',
    '/github.io/contact': '/github.io/views/content/contact.html',
    '/github.io/donate': '/github.io/views/content/donate.html',
    '/github.io/events': '/github.io/views/content/events.html',
    '/github.io/gallery': '/github.io/views/content/gallery.html',
    '/github.io/login': '/github.io/views/content/login.html',
    '/github.io/news': '/github.io/views/content/news.html',
    '/github.io/opportunities': '/github.io/views/content/opportunities.html',
    '/github.io/privacy-policy': '/github.io/views/content/privacy-policy.html',
    '/github.io/terms-service': '/github.io/views/content/terms-service.html',
    '/github.io/404': '/github.io/views/content/404.html',
    '/github.io/statistics': '/github.io/views/content/statistics.html',
    '/github.io/event-planning': '/github.io/views/content/event-planning.html',
};
const router = new Router(routes);
//IIFE - Immediately Invoked Functional Expression
(function () {
    function EventPlanningPage() {
        console.log('EventPlanningPage');
        // Load the upcoming events list
        updateUpcomingEventsList();
        // Handle event form submission
        const eventFormElement = document.getElementById('eventForm');
        eventFormElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const title = document.getElementById('eventTitle');
            const type = document.getElementById('eventType');
            const dateAndTime = document.getElementById('dateAndTime');
            const eventLocation = document.getElementById('location');
            const description = document.getElementById('eventDescription');
            const eventId = new Date().getTime();
            // Collect form data
            const eventDetail = {
                id: eventId,
                title: title.value,
                type: type.value,
                dateAndTime: dateAndTime.value,
                location: eventLocation.value,
                description: description.value,
                status: false,
            };
            localStorage.setItem(`event_${eventId}`, JSON.stringify(eventDetail));
            // Update the upcoming events list
            updateUpcomingEventsList();
        });
    }
    // Function to show upcoming events list
    function updateUpcomingEventsList() {
        const tbody = document.getElementById('upcomingEventsList');
        if (!tbody)
            return;
        tbody.innerHTML = '';
        const upcomingEvents = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) || '';
            if (key.startsWith('event_')) {
                const eventData = localStorage.getItem(key);
                if (eventData) {
                    upcomingEvents.push(JSON.parse(eventData));
                }
            }
        }
        const typeConvert = {
            'cleanup': 'Cleanup',
            'workshop': 'Workshop',
            'fundraiser': 'Fundraiser',
        };
        upcomingEvents.forEach((event) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.title}</td>
                <td>${event.dateAndTime}</td>
                <td>${typeConvert[event.type]}</td>
                <td>${event.location}</td>
                <td>
                    <span class="badge bg-${event.status ? 'success' : 'secondary'}">${event.status ? 'Active' : 'Inactive'}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary change-status-button me-2">Change Status</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
            const changeStatusButton = row.querySelector('.change-status-button');
            changeStatusButton.addEventListener('click', function () {
                const newStatus = !event.status;
                localStorage.setItem(`event_${event.id}`, JSON.stringify({ ...event, status: newStatus }));
                updateUpcomingEventsList();
            });
            const deleteButton = row.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                localStorage.removeItem(`event_${event.id}`);
                updateUpcomingEventsList();
            });
        });
    }
    // Get statistics data from statistics.json in data folder
    async function GetStatisticsData() {
        try {
            const response = await fetch('/github.io/data/statistics.json');
            return await response.json();
        }
        catch (error) {
            console.error('[ERROR] Cannot load statistics data:', error);
        }
    }
    function StatisticsPage() {
        console.log('StatisticsPage');
        // Fetch and display statistics data
        GetStatisticsData().then((statisticsData) => {
            if (!statisticsData) {
                console.error('[ERROR] Failed to load statistics data');
                return;
            }
            // Overview cards
            const totalMembersElement = document.getElementById('totalMembers');
            const activeEventsElement = document.getElementById('activeEvents');
            const totalDonationsElement = document.getElementById('totalDonations');
            const volunteerHoursElement = document.getElementById('volunteerHours');
            if (totalMembersElement) {
                totalMembersElement.textContent = statisticsData.totalMembers.toString();
            }
            if (activeEventsElement) {
                activeEventsElement.textContent = statisticsData.activeEvents.toString();
            }
            if (totalDonationsElement) {
                totalDonationsElement.textContent = `$${statisticsData.totalDonations.toLocaleString()}`; // show the comma after 3 digits
            }
            if (volunteerHoursElement) {
                volunteerHoursElement.textContent =
                    statisticsData.volunteerHours.data
                        .reduce((a, b) => a + b, 0) // sum up the data
                        .toLocaleString(); // show the comma after 3 digits
            }
            // Membership Chart
            const membershipChartElement = document.getElementById('membershipChart');
            if (membershipChartElement) {
                const membershipChart = new Chart(membershipChartElement, {
                    type: 'line',
                    data: {
                        labels: statisticsData.membershipGrowth.labels,
                        datasets: [
                            {
                                label: 'Membership Growth',
                                data: statisticsData.membershipGrowth.data,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    },
                });
            }
            // Event Chart
            const eventChartElement = document.getElementById('eventChart');
            if (eventChartElement) {
                const eventChart = new Chart(eventChartElement, {
                    type: 'bar',
                    data: {
                        labels: statisticsData.eventParticipation.labels,
                        datasets: [
                            {
                                label: 'Participants',
                                data: statisticsData.eventParticipation.data,
                                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    },
                });
            }
            // Donation Chart
            const donationChartElement = document.getElementById('donationChart');
            if (donationChartElement) {
                const donationChart = new Chart(donationChartElement, {
                    type: 'pie',
                    data: {
                        labels: statisticsData.donationDistribution.labels,
                        datasets: [
                            {
                                data: statisticsData.donationDistribution.data,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    },
                });
            }
            // Volunteer Chart
            const volunteerChartElement = document.getElementById('volunteerChart');
            if (volunteerChartElement) {
                const volunteerChart = new Chart(volunteerChartElement, {
                    type: 'bar',
                    data: {
                        labels: statisticsData.volunteerHours.labels,
                        datasets: [
                            {
                                label: 'Hours',
                                data: statisticsData.volunteerHours.data,
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    },
                });
            }
        }).catch(error => {
            console.error('Error loading statistics:', error);
        });
    }
    // Listen for session expired event to redirect to login page
    window.addEventListener('sessionExpired', () => {
        console.warn('[WARN] Redirecting to login page due to inactively');
        router.navigate('/github.io/login');
    });
    /**
     * Using async/await to load the user list
     * @returns {Promise<any>}
     */
    async function GetUserList() {
        const response = await fetch('/github.io/data/users.json');
        try {
            return await response.json();
        }
        catch (error) {
            console.error('Cannot load data', error);
        }
    }
    function LoginPage() {
        const authenticatedUser = sessionStorage.getItem('user') || '';
        if (authenticatedUser) {
            router.navigate("/github.io/");
        }
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const loginButton = document.getElementById('loginButton');
        const messageArea = document.getElementById('messageArea');
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            GetUserList()
                .then((users) => {
                const authenticatedUser = users?.find((user) => user.Username === username.value &&
                    user.Password === password.value);
                if (authenticatedUser) {
                    sessionStorage.setItem('user', JSON.stringify({
                        DisplayName: authenticatedUser.DisplayName,
                        EmailAddress: authenticatedUser.EmailAddress,
                        Username: authenticatedUser.Username,
                    }));
                    messageArea.classList.add('d-none');
                    messageArea.classList.remove('d-block');
                    // router.navigate('/github.io/opportunities');
                    history.go(-1); // go back to the previous page after login successfully
                }
                else {
                    messageArea.classList.remove('d-none');
                    messageArea.classList.add('d-block', 'alert-danger');
                    messageArea.innerText = 'Username or Password is incorrect';
                }
            })
                .catch((error) => {
                console.error('Failed to load data', error);
            });
        });
    }
    /**
     * Show the image into the modal which popped up if click the image in the gallery
     * @param data
     * @param id
     */
    function galleryLightBox(data, id) {
        const item = data?.find((item) => item.id === +id);
        if (item) {
            const image = document.querySelector('#lightbox img');
            const title = document.querySelector('#lightbox p');
            image.src = item.imgSrc;
            image.alt = item.title;
            title.innerText = item.title;
        }
    }
    /**
     * Load a JSON file includes gallery details
     */
    async function LoadGallery() {
        const response = await fetch('/github.io/data/gallery.json');
        try {
            return await response.json();
        }
        catch (error) {
            console.log('Cannot load Gallery', error);
        }
    }
    function GalleryPage() {
        console.log('GalleryPage');
        const gallery = document.querySelector('#gallery');
        LoadGallery()
            .then((data) => {
            data?.forEach((item) => {
                const galleryItem = `
                    <div class="col-xl-4 col-md-6 col-12">
                        <img data-id=${item.id} style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        class="w-100 h-100 object-fit-cover" src=${item.imgSrc} alt="${item.title}">
                    </div>
                `;
                gallery.innerHTML += galleryItem;
            });
            const galleries = document.querySelectorAll('#gallery img');
            galleries.forEach((img) => {
                img.addEventListener('click', () => {
                    const id = img?.dataset?.id || '';
                    galleryLightBox(data, id);
                });
            });
        })
            .catch((err) => {
            console.error('Cannot load the gallery', err);
        });
    }
    /**
     * Create the layout for an article that get the detail from API
     * @param news
     * @returns {string}
     */
    function NewsCard(news) {
        return `
            <div class="card col-sm-5 py-2">
                <img src=${news.image} class="card-img-top" alt="article image">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.description}</p>
                <div class="text-center">
                    <a href=${news.url} class="btn btn-primary" target="_blank">View more</a>
                </div>                
              </div>
            </div>
        `;
    }
    /**
     * Using external API to load news
     */
    async function GetNewsUsingApi(search = '') {
        const url = 'https://api.mediastack.com/v1/news?access_key=bcb8605a288beccc48d76f40cf67a887';
        const articlesElement = document.querySelector('#articles');
        const noNewsMessage = document.createElement('p');
        noNewsMessage.innerText = 'There is no news!';
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                articlesElement.innerHTML = '';
                noNewsMessage.innerText = data.error.message;
                articlesElement.appendChild(noNewsMessage);
            }
            else {
                if (data.data.length > 0) {
                    const filteredArticles = search.trim()
                        ? data.data.filter((article) => article.title
                            ?.toLowerCase()
                            .includes(search.trim().toLowerCase()) ||
                            article.description
                                ?.toLowerCase()
                                .includes(search.trim().toLowerCase()))
                        : data.data;
                    if (filteredArticles.length > 0) {
                        articlesElement.innerHTML = '';
                        filteredArticles.forEach((article) => {
                            const news = NewsCard(article);
                            if (article.image) {
                                articlesElement.innerHTML += news;
                            }
                        });
                    }
                    else {
                        articlesElement.innerHTML = '';
                        articlesElement.appendChild(noNewsMessage);
                    }
                }
                else {
                    articlesElement.innerHTML = '';
                    articlesElement.appendChild(noNewsMessage);
                }
            }
        }
        catch (error) {
            console.log('The request failed with error ' + error);
        }
    }
    function NewsPage() {
        console.log('NewsPage');
        if (document.title.includes('News')) {
            document.querySelector('.navbar-collapse').innerHTML += `
                    <form class="d-flex mx-5 position-relative" role="search">
                        <input id="searchInput" class="form-control me-2" type="search" placeholder="Search">
                        <button id="searchButton" class="btn btn-outline-success position-absolute start-100" type="button">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
            `;
            const search = document.querySelector('#searchInput');
            const searchBtn = document.querySelector('#searchButton');
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('#articles').innerHTML = `
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                `;
                GetNewsUsingApi(search.value);
            });
        }
        GetNewsUsingApi();
    }
    function HomePage() {
        console.log('HomePage');
        const getInvolvedBtn = document.getElementById('getInvolvedButton');
        getInvolvedBtn.addEventListener('click', function () {
            router.navigate('/github.io/opportunities');
        });
    }
    /**
     * Get the list of events using AJAX
     */
    async function GetEventsData() {
        try {
            const response = await fetch('/github.io/data/events.json');
            return await response.json();
        }
        catch (error) {
            console.error('[ERROR] Cannot load events data:', error);
        }
    }
    function OpportunitiesPage() {
        console.log('OpportunitiesPage');
        // Create a volunteer wrapper which includes all volunteer card
        const main = document.querySelector('main');
        const volunteerWrapper = document.createElement('section');
        volunteerWrapper.classList.add('row', 'gap-2', 'justify-content-center');
        main.appendChild(volunteerWrapper);
        const volunteerList = GetEventsData();
        volunteerList.then((data) => {
            // Create a bootstrap card and added into volunteer wrapper
            data.forEach((item) => {
                const card = `
                    <div class="card col-11 col-md-5 col-lg-3">
                      <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${new Date(item.dateTime).toUTCString()}</h6>
                        <div class="text-center my-2">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpModal">Sign Up</button>
                        </div>
                        <p class="card-text">${item.description}</p>
                      </div>
                    </div>`;
                volunteerWrapper.innerHTML += card;
            });
            const fullName = document.querySelector('#fullName');
            const emailAddress = document.querySelector('#fullName');
            const preferredRole = document.querySelector('#fullName');
            // Handle the sign-up form
            const submitButtonModal = document.querySelector('#submitButtonModal');
            submitButtonModal.addEventListener('click', () => {
                try {
                    const userDetails = new UserDetails(fullName.value, emailAddress.value, preferredRole.value);
                    if (userDetails) {
                        const modalContent = document.querySelector('.modal-content');
                        const successfulMessage = `<div class="alert alert-success mx-3" role="alert">
                                                      You have successfully signed up.
                                                   </div>`;
                        modalContent.innerHTML += successfulMessage;
                    }
                }
                catch (e) {
                    alert(e);
                }
            });
        });
    }
    function EventsPage() {
        console.log('EventsPage');
        // Show the calendar the first time
        let currentDate = { m: new Date().getMonth(), y: new Date().getFullYear() };
        const monthMapping = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const chosenMonth = document.getElementById('month');
        const calendarBody = document.getElementById('calendarBody');
        const category = document.querySelector('#category');
        showCalendarBody();
        const nextMonthButton = document.getElementById('nextMonthButton');
        nextMonthButton.addEventListener('click', () => {
            if (currentDate.m === 11) {
                currentDate.y++;
                currentDate.m = 0;
            }
            else {
                currentDate.m++;
            }
            showCalendarBody();
        });
        const prevMonthButton = document.getElementById('prevMonthButton');
        prevMonthButton.addEventListener('click', () => {
            if (currentDate.m === 0) {
                currentDate.y--;
                currentDate.m = 11;
            }
            else {
                currentDate.m--;
            }
            showCalendarBody();
        });
        const thisMonthButton = document.getElementById('thisMonthButton');
        thisMonthButton.addEventListener('click', () => {
            currentDate = { m: new Date().getMonth(), y: new Date().getFullYear() };
            showCalendarBody();
        });
        /**
         * Create the calendar body by generating each date in a month as a single cell in the table
         */
        async function showCalendarBody() {
            chosenMonth.innerText = `${monthMapping[currentDate.m]} / ${currentDate.y}`;
            const year = currentDate.y;
            const month = currentDate.m;
            const firstDate = new Date(year, month, 1);
            const lastDate = new Date(year, month + 1, 0);
            const startDay = firstDate.getDay();
            const totalDays = lastDate.getDate();
            let days = [];
            let currentDay = 1;
            for (let i = 0; i < 6; i++) {
                // Maximum 6 rows for demonstrating days in a month
                let row = [];
                for (let cell = 0; cell < 7; cell++) {
                    if (i === 0 && cell < startDay) {
                        row.push(`<td></td>`);
                    }
                    else if (currentDay <= totalDays) {
                        row.push(`<td data-date="${new Date(year, month, currentDay).toDateString()}" class="text-center" style="height: 120px">${currentDay}</td>`);
                        currentDay++;
                    }
                    else {
                        row.push('<td></td>');
                    }
                }
                days.push(`<tr>${row.join('')}</tr>`);
                if (currentDay > totalDays)
                    break;
            }
            calendarBody.innerHTML = `${days.join('')}`;
            // Show Events on calendar
            const volunteerList = await GetEventsData();
            let filteredVolunteerList;
            if (['cleanup', 'workshop', 'fundraiser'].includes(category.value)) {
                filteredVolunteerList = volunteerList.filter((item) => item.category === category.value);
            }
            else {
                filteredVolunteerList = volunteerList;
            }
            const cells = document.querySelectorAll('td');
            filteredVolunteerList.forEach((item) => {
                const cell = [...cells].find((cell) => cell.dataset.date === new Date(item.dateTime).toDateString());
                if (cell) {
                    cell.innerHTML += `<span class="d-block badge text-bg-warning">${item.title}</span>`;
                }
            });
        }
        // Handle the filter category event
        category.addEventListener('change', () => {
            showCalendarBody();
        });
    }
    function ContactPage() {
        console.log('ContactPage');
        const sendButton = document.querySelector('#sendButton');
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('messageModal');
            const modalTitle = modal.querySelector('.modal-title');
            const modalBody = modal.querySelector('.modal-body');
            try {
                const fullName = document.querySelector('#fullName');
                const emailAddress = document.querySelector('#fullName');
                const subject = document.querySelector('#fullName');
                const message = document.querySelector('#fullName');
                const contact = new Contact(fullName.value, emailAddress.value, subject.value, message.value);
                if (contact) {
                    modalTitle.innerText = 'Thank you';
                    let timer = 5;
                    function countdown() {
                        if (timer > 0) {
                            setTimeout(countdown, 1000);
                            modalBody.innerHTML = `<div class="alert alert-success" role="alert">
                                               You have submitted the form successfully
                                           </div>
                                           <p>
                                               Wait for <span class="text-danger">${timer}</span> seconds back to <strong>Home page</strong>.
                                           </p>`;
                            timer--;
                        }
                        else {
                            router.navigate('/github.io/');
                        }
                    }
                    countdown();
                }
            }
            catch (error) {
                modalTitle.innerText = 'Error';
                modalBody.innerHTML = `<div class="alert alert-danger" role="alert">${error?.message}</div>`;
            }
        });
    }
    function AboutPage() {
        console.log('AboutPage');
    }
    function handlePageLogic(path) {
        // Remove the /github.io/ prefix for page title lookup
        const pathWithoutPrefix = path.replace('/github.io', '');
        document.title = pageTitle[path] || 'Untitled Page';
        switch (pathWithoutPrefix) {
            case '/':
                HomePage();
                break;
            case '/home':
                HomePage();
                break;
            case '/opportunities':
                OpportunitiesPage();
                break;
            case '/events':
                EventsPage();
                break;
            case '/contact':
                ContactPage();
                break;
            case '/about':
                AboutPage();
                break;
            case '/news':
                NewsPage();
                break;
            case '/gallery':
                GalleryPage();
                break;
            case '/login':
                LoginPage();
                break;
            case '/statistics':
                StatisticsPage();
                break;
            case '/event-planning':
                EventPlanningPage();
                break;
        }
    }
    async function Start() {
        console.log('Starting...');
        await LoadHeader();
        await LoadFooter();
        const currentPath = location.pathname;
        console.log('[INFO] current path: ', currentPath);
        // Remove /github.io/ prefix from currentPath for routing
        const pathWithoutPrefix = currentPath.replace('/github.io', '');
        await router.loadRoute(pathWithoutPrefix);
        handlePageLogic(pathWithoutPrefix);
        // Create "Back to Top" button
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
        // Add bootstrap classes for button
        backToTopButton.classList.add(...'btn btn-success rounded-pill position-fixed'.split(' '));
        // Add style for button through style property
        const styles = {
            width: '50px',
            height: '50px',
            bottom: '40px',
            right: '20px',
            display: 'none',
        };
        Object.keys(styles).forEach((key) => {
            backToTopButton.style.setProperty(key, styles[key]);
        });
        document.body.appendChild(backToTopButton);
        // Handle scroll top behavior when click button
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
        // Display button when the page scroll down "a distance" 50px
        window.addEventListener('scroll', function () {
            if (document.documentElement.scrollTop > 50) {
                backToTopButton.style.display = 'block';
            }
            else {
                backToTopButton.style.display = 'none';
            }
        });
    }
    window.addEventListener('load', Start);
})();
//# sourceMappingURL=main.js.map
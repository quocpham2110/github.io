/**
 * Name: Quoc Pham
 * Student ID: 100944362
 * Date: Jan 25, 2025
 */

"use strict";

//IIFE - Immediately Invoked Functional Expression

(function () {

    /**
     * Check login status
     */
    function CheckLogin() {
        console.log("Check user login status");
        const authenticatedUser = sessionStorage.getItem("user");

        if (authenticatedUser) {
            const loginNav = document.getElementById("loginNav");
            loginNav.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Logout`
            loginNav.href = "#";

            loginNav.addEventListener("click", function (event) {
                event.preventDefault();
                sessionStorage.removeItem("user");
                location.href = "login.html";
            })
        }
    }

    /**
     * Using async/await to load the user list
     * @returns {Promise<any>}
     */
    async function GetUserList() {
        const response = await fetch("data/users.json");
        try {
            return await response.json();
        } catch (error) {
            console.error("Cannot load data", error);
        }
    }

    function LoginPage() {
        const authenticatedUser = sessionStorage.getItem("user");
        if (authenticatedUser) {
            location.href = "opportunities.html";
        }

        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const loginButton = document.getElementById("loginButton");
        const messageArea = document.getElementById("messageArea");

        loginButton.addEventListener("click", (e) => {
            e.preventDefault();
            GetUserList().then((users) => {
                const authenticatedUser = users.find((user) => user.Username === username.value && user.Password === password.value);
                if (authenticatedUser) {
                    sessionStorage.setItem("user", JSON.stringify({
                        DisplayName: authenticatedUser.DisplayName,
                        EmailAddress: authenticatedUser.EmailAddress,
                        Username: authenticatedUser.Username,
                    }));

                    messageArea.classList.add("d-none");
                    messageArea.classList.remove("d-block");
                    location.href = "opportunities.html";
                } else {
                    messageArea.classList.remove("d-none");
                    messageArea.classList.add("d-block", "alert-danger");
                    messageArea.innerText = "Username or Password is incorrect";
                }
            }).catch((error) => {
                console.error("Failed to load data", error);
            })
        });
    }

    /**
     * Show the image into the modal which popped up if click the image in the gallery
     * @param data
     * @param id
     */
    function galleryLightBox(data, id) {
        const item = data.find(item => item.id === +id);
        if (item) {
            const image = document.querySelector('#lightbox img');
            const title = document.querySelector('#lightbox p');
            image.src = item.imgSrc;
            image.alt = item.title
            title.innerText = item.title;
        }
    }

    /**
     * Load a JSON file includes gallery details
     */
    async function LoadGallery() {
        const response = await fetch('data/gallery.json')
        try {
            return await response.json()
        } catch (error) {
            console.log("Cannot load Gallery", error)
        }
    }

    function GalleryPage() {
        console.log("GalleryPage")
        const gallery = document.querySelector('#gallery');

        LoadGallery().then((data) => {
            data.forEach((item) => {
                const galleryItem = `
                    <div class="col-xl-4 col-md-6 col-12">
                        <img data-id=${item.id} style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#lightbox"
                        class="w-100 h-100 object-fit-cover" src=${item.imgSrc} alt="${item.title}">
                    </div>
                `
                gallery.innerHTML += galleryItem
            })
            document.querySelectorAll('#gallery img').forEach(img => {
                img.addEventListener('click', () => {
                    galleryLightBox(data, img.dataset.id)
                })
            })
        }).catch((err) => {
            console.error("Cannot load the gallery", err)
        })
    }

    /**
     * Create the layout for an article that get the detail from API
     * @param news
     * @returns {string}
     */
    function NewsCard(news) {
        return `
            <div class="card col-sm-5 py-2">
              <img src=${news.urlToImage} class="card-img-top" alt="article image">
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
    async function GetNewsUsingApi(search = "") {
        const url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' +
            'apiKey=5c729f64155847d984d72c917742190c';

        const articlesElement = document.querySelector('#articles');
        const noNewsMessage = document.createElement('p');
        noNewsMessage.innerText = "There is no news!";

        try {
            const response = await fetch(url);
            const data = await response.json();

            switch (data.status) {
                case "ok": {
                    if (data.totalResults > 0) {
                        const filteredArticles = search.trim() ? data.articles.filter(article =>
                            article.title?.toLowerCase().includes(search.trim().toLowerCase()) ||
                            article.description?.toLowerCase().includes(search.trim().toLowerCase())
                        ) : data.articles

                        if (filteredArticles.length > 0) {
                            articlesElement.innerHTML = ""
                            filteredArticles.forEach((article) => {
                                const news = NewsCard(article);
                                if (article.description) {
                                    articlesElement.innerHTML += news;
                                }
                            })
                        } else {
                            articlesElement.innerHTML = ""
                            articlesElement.appendChild(noNewsMessage);
                        }
                    } else {
                        articlesElement.innerHTML = ""
                        articlesElement.appendChild(noNewsMessage);
                    }
                }
                    break;

                case "error": {
                    alert(data.message);
                }
                    break;

                default: {
                    articlesElement.innerHTML = ""
                    articlesElement.appendChild(noNewsMessage);
                }
            }
        } catch (error) {
            console.log("The request failed with error " + error);
        }
    }

    function NewsPage() {
        console.log("NewsPage");

        GetNewsUsingApi()
    }

    /**
     * Add some link for new pages.
     * Active the link for the current page
     */
    function DynamicNavbar() {
        // Dynamic Navbar
        // Add a "Donate" link to navbar
        const navbarNav = document.querySelector(".navbar-nav");
        navbarNav.innerHTML += `<li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="donate.html">
                                        <i class="fa-solid fa-hand-holding-dollar me-1"></i></i>Donate
                                    </a>
                                </li>`;
        // Change the "Opportunities" link text to "Volunteer Now"
        const navLinks = document.querySelectorAll(".navbar .nav-link");
        const opportunitiesNavLink = [...navLinks].find(link => link.innerText === "Opportunities");
        if (opportunitiesNavLink) {
            opportunitiesNavLink.innerHTML = opportunitiesNavLink.innerHTML.replace("Opportunities", "Volunteer Now");
        }

        // Active the navbar element for current page
        [...navLinks].forEach((link) => {
            if (document.title.includes(link.innerText)) {
                link.classList.add("active");
            } else if (document.title.includes("Opportunities") && link.innerText === "Volunteer Now") {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        })

        if (document.title.includes("News")) {
            document.querySelector(".navbar-collapse").innerHTML += `
                            <form class="d-flex mx-5 position-relative" role="search">
                                <input id="searchInput" class="form-control me-2" type="search" placeholder="Search">
                                <button id="searchButton" class="btn btn-outline-success position-absolute start-100" type="button">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
            `
            const search = document.querySelector('#searchInput');
            const searchBtn = document.querySelector("#searchButton");
            searchBtn.addEventListener("click", (e) => {
                e.preventDefault();
                GetNewsUsingApi(search.value);
            })
        }
    }

    /**
     * Using AJAX to load the header for every page
     */
    function LoadHeader() {
        fetch('header.html')
            .then((response) => response.text())
            .then(data => {
                document.querySelector('header').innerHTML = data;
                DynamicNavbar();
                CheckLogin();
            })
            .catch(error => console.log("Cannot load the header", error));
    }

    /**
     * Get the list of events using AJAX
     */
    async function GetEventsList() {
        console.log("GetEventsList Content");

        const response = await fetch("data/events.json");
        return await response.json();
    }

    function HomePage() {
        console.log("HomePage");

        const getInvolvedBtn = document.getElementById("getInvolvedButton");
        getInvolvedBtn.addEventListener("click", function () {
            location.href = "opportunities.html";
        })
    }

    function OpportunitiesPage() {
        console.log("OpportunitiesPage");

        // Create a volunteer wrapper which includes all volunteer card
        const main = document.querySelector("main");
        const volunteerWrapper = document.createElement("section");
        volunteerWrapper.classList.add("row", "gap-2", "justify-content-center");
        main.appendChild(volunteerWrapper);

        const volunteerList = GetEventsList();

        volunteerList.then(data => {
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
                    </div>`
                volunteerWrapper.innerHTML += card
            })

            // Handle the sign-up form
            const submitButtonModal = document.querySelector("#submitButtonModal");
            submitButtonModal.addEventListener("click", () => {
                try {
                    const userDetails = new UserDetails(fullName.value, emailAddress.value, preferredRole.value);
                    if (userDetails) {
                        const modalContent = document.querySelector(".modal-content");
                        const successfulMessage = `<div class="alert alert-success mx-3" role="alert">
                                                      You have successfully signed up.
                                                   </div>`
                        modalContent.innerHTML += (successfulMessage);
                    }
                } catch (e) {
                    alert(e)
                }
            })
        })
    }

    function EventsPage() {
        console.log("EventsPage");

        // Show the calendar the first time
        let currentDate = {m: new Date().getMonth(), y: new Date().getFullYear()};
        const monthMappping = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const chosenMonth = document.getElementById("month");
        const calendarBody = document.getElementById("calendarBody");
        const category = document.querySelector("#category");
        showCalendarBody();

        const nextMonthButton = document.getElementById("nextMonthButton");
        nextMonthButton.addEventListener("click", () => {
            if (currentDate.m === 11) {
                currentDate.y++;
                currentDate.m = 0
            } else {
                currentDate.m++;
            }
            showCalendarBody();
        })
        const prevMonthButton = document.getElementById("prevMonthButton");
        prevMonthButton.addEventListener("click", () => {
            if (currentDate.m === 0) {
                currentDate.y--;
                currentDate.m = 11;
            } else {
                currentDate.m--
            }
            showCalendarBody();
        })
        const thisMonthButton = document.getElementById("thisMonthButton");
        thisMonthButton.addEventListener("click", () => {
            currentDate = {m: new Date().getMonth(), y: new Date().getFullYear()};
            showCalendarBody();
        })

        /**
         * Create the calendar body by generating each date in a month as a single cell in the table
         */
        async function showCalendarBody() {
            chosenMonth.innerText = `${monthMappping[currentDate.m]} / ${currentDate.y}`;

            const year = currentDate.y;
            const month = currentDate.m;
            const firstDate = new Date(year, month, 1);
            const lastDate = new Date(year, month + 1, 0);
            const startDay = firstDate.getDay();
            const totalDays = lastDate.getDate();

            let days = [];
            let currentDay = 1;

            for (let i = 0; i < 6; i++) { // Maximum 6 rows for demonstrating days in a month
                let row = [];
                for (let cell = 0; cell < 7; cell++) {
                    if (i === 0 && cell < startDay) {
                        row.push(`<td></td>`);
                    } else if (currentDay <= totalDays) {
                        row.push(`<td data-date="${new Date(year, month, currentDay).toDateString()}" class="text-center" style="height: 120px">${currentDay}</td>`);
                        currentDay++;
                    } else {
                        row.push('<td></td>');
                    }
                }
                days.push(`<tr>${row.join('')}</tr>`);
                if (currentDay > totalDays) break;
            }
            calendarBody.innerHTML = `${days.join('')}`;

            // Show Events on calendar
            const volunteerList = await GetEventsList();
            let filteredVolunteerList;
            if (["cleanup", "workshop", "fundraiser"].includes(category.value)) {
                filteredVolunteerList = volunteerList.filter((item) => item.category === category.value);
            } else {
                filteredVolunteerList = volunteerList
            }

            const cells = document.querySelectorAll("td");
            filteredVolunteerList.forEach((item) => {
                const cell = [...cells].find(cell => cell.dataset.date === new Date(item.dateTime).toDateString());
                if (cell) {
                    cell.innerHTML += `<span class="d-block badge text-bg-warning">${item.title}</span>`;
                }
            })
        }

        // Handle the filter category event
        category.addEventListener("change", () => {
            showCalendarBody();
        })
    }

    function ContactPage() {
        console.log("ContactPage");

        const sendButton = document.querySelector("#sendButton");
        sendButton.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = document.getElementById("messageModal");
            const modalTitle = modal.querySelector(".modal-title");
            const modalBody = modal.querySelector(".modal-body");
            try {
                const contact = new Contact(fullName.value, emailAddress.value, subject.value, message.value);
                if (contact) {
                    modalTitle.innerText = "Thank you";
                    let timer = 5;

                    function countdown() {
                        if (timer > 0) {
                            setTimeout(countdown, 1000);
                            modalBody.innerHTML = `<div class="alert alert-success" role="alert">
                                               You have submitted the form successfully
                                           </div>
                                           <p>
                                               Wait for <span class="text-danger">${timer}</span> seconds back to <strong>Home page</strong>.
                                           </p>`
                            timer--;
                        } else {
                            location.href = "index.html";
                        }
                    }

                    countdown();
                }
            } catch (error) {
                modalTitle.innerText = "Error";
                modalBody.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
            }
        })
    }

    function AboutPage() {
        console.log("AboutPage");
    }


    function Start() {
        console.log("Starting...");
        LoadHeader();

        switch (document.title) {
            case "Home Page":
                HomePage();
                break;
            case "Opportunities Page":
                OpportunitiesPage();
                break;
            case "Events Page":
                EventsPage();
                break;
            case "Contact Us Page":
                ContactPage();
                break;
            case "About Page":
                AboutPage();
                break;
            case "News Page":
                NewsPage();
                break;
            case "Gallery Page":
                GalleryPage();
                break;
            case "Login Page":
                LoginPage();
                break;
        }

        // Create a sticky footer for every pages
        const footer = document.createElement("footer");
        footer.innerHTML = `
        <footer class="py-4 mt-4 border-top">
            <div class="container d-flex flex-wrap justify-content-between align-items-center ">
                <div class="col-md-6 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary">Volunteer Connect</span>
                </div>
                <ul class="nav col-md-6 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-body-secondary" href="privacy-policy.html">Privacy Policy</a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="terms-service.html">Terms of Service</a></li>
                </ul>
            </div>
        </footer>`;
        document.body.appendChild(footer);

        // Create "Back to Top" button
        const backToTopButton = document.createElement("button");
        backToTopButton.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
        // Add bootstrap classes for button
        backToTopButton.classList.add(..."btn btn-success rounded-pill position-fixed".split(" "));
        // Add style for button through style property
        Object.entries({
            width: "50px",
            height: "50px",
            bottom: "40px",
            right: "20px",
            display: "none"
        }).forEach(([key, value]) => {
            backToTopButton.style[key] = value;
        })
        document.body.appendChild(backToTopButton);

        // Handle scroll top behavior when click button
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })

        // Display button when the page scroll down "a distance" 50px
        window.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 50) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        })

    }

    window.addEventListener("load", Start);
})();
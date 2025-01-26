/**
 * Name: Quoc Pham
 * Student ID: 100944362
 * Date: Jan 25, 2025
 */

"use strict";

//IIFE - Immediately Invoked Functional Expression

(function () {
    const volunteerList = [
        {
            title: "Community Clean-Up Drive",
            description: "Join us for a neighborhood clean-up to help beautify local parks and streets. Volunteers will pick up litter and sort recyclables. Supplies will be provided.",
            dateTime: new Date('February 15, 2025 09:00:00'),
            category: "cleanup",
        },
        {
            title: "Soup Kitchen Assistance",
            description: "Help prepare and serve meals to those in need at the local community kitchen. No prior cooking experience is necessary.",
            dateTime: new Date('February 20, 2025 16:00:00'),
            category: "cleanup",
        },
        {
            title: "Animal Shelter Care",
            description: "Spend time caring for animals by feeding, walking dogs, and helping maintain clean shelter facilities. Great for animal lovers!",
            dateTime: new Date('February 25, 2025 10:00:00'),
            category: "cleanup",
        },
        {
            title: "Library Reading Program",
            description: "Volunteer to read to children at the public library. Inspire a love of reading and storytelling in young minds.",
            dateTime: new Date('February 27, 2025 15:00:00'),
            category: "workshop",

        },
        {
            title: "Senior Center Activity Day",
            description: "Assist with games, crafts, and social activities for seniors at the community center. Bring joy and companionship to their day.",
            dateTime: new Date('March 3, 2025 14:00:00'),
            category: "workshop",
        },
        {
            title: "Tree Planting Event",
            description: "Join an environmental initiative to plant trees and contribute to reforestation efforts in the city park.",
            dateTime: new Date('March 10, 2025 08:00:00'),
            category: "fundraiser",
        },
        {
            title: "Food Bank Sorting",
            description: "Help sort and package food donations at the local food bank to distribute to families in need.",
            dateTime: new Date('March 15, 2025 13:00:00'),
            category: "workshop",
        },
        {
            title: "Youth Mentorship Program",
            description: "Spend time mentoring teenagers by sharing skills, career advice, or helping with homework. A great way to give back to the next generation.",
            dateTime: new Date('March 20, 2025 17:00:00'),
            category: "workshop",
        },
        {
            title: "Beach Clean-Up Day",
            description: "Join the effort to remove trash and debris from the local beach to protect marine life and ensure a clean environment.",
            dateTime: new Date('March 25, 2025 07:30:00'),
            category: "cleanup",
        },
        {
            title: "Charity Run Assistance",
            description: "Help organize and assist participants in a 5K charity run. Tasks include handing out water, managing registration, and cheering on runners.",
            dateTime: new Date('March 30, 2025 06:00:00'),
            category: "fundraiser",
        }
    ]

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

        // Create a bootstrap card and added into volunteer wrapper
        volunteerList.forEach((item) => {
            const card = `
            <div class="card col-11 col-md-5 col-lg-3">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${item.dateTime.toUTCString()}</h6>
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
        function showCalendarBody() {
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
            let filteredVolunteerList;
            if (["cleanup", "workshop", "fundraiser"].includes(category.value)) {
                filteredVolunteerList = volunteerList.filter((item) => item.category === category.value);
            } else {
                filteredVolunteerList = volunteerList
            }

            const cells = document.querySelectorAll("td");
            filteredVolunteerList.forEach((item) => {
                const cell = [...cells].find(cell => cell.dataset.date === item.dateTime.toDateString());
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
                                               Wait for ${timer} seconds back to Home page.
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
                modalBody.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
            }
        })
    }

    function AboutPage() {
        console.log("AboutPage");
    }


    function Start() {
        console.log("Starting...");

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
        }

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

        // Active the navbar element for current page
        [...navLinks].forEach((link) => {
            if (document.title.includes(link.innerText)) {
                link.classList.add("active");
            }
        })

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
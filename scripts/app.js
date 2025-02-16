"use strict";

//IIFE - Immediately Invoked Functional Expression
(function () {

    function CheckLogin() {
        console.log("Check user login status");
        const authenticatedUser = sessionStorage.getItem("user");

        if (authenticatedUser) {
            console.log("authenticatedUser login status ", authenticatedUser);
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

    function updateActiveNewLink() {
        const title = document.title;
        const navLinks = [...document.querySelectorAll('.nav-link')];
        navLinks.forEach((link) => {
            const linkContent = link.textContent;
            if (linkContent.includes(title)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        })
    }

    /**
     * Dynamically load the header from the header.html into the current page
     */
    function LoadHeader() {
        console.log("Loading header");

        fetch("header.html")
            .then(response => response.text())
            .then(data => {
                const headerElement = document.querySelector("header");
                headerElement.innerHTML = data;
                updateActiveNewLink()
                CheckLogin();
            })
            .catch(error => console.log("Can't load header\n", error));
    }

    function DisplayLoginPage() {
        console.log("Calling DisplayLoginPage()...");

        const messageArea = document.querySelector("#messageArea");
        const loginButton = document.querySelector("#loginButton");
        const cancelButton = document.querySelector("#cancelButton");

        // messageArea
        messageArea.style.display = "none";

        loginButton.addEventListener("click", async (e) => {
            // e.preventDefault();

            const username = document.querySelector("#username").value.trim();
            const password = document.querySelector("#password").value;

            try {
                const res = await fetch("data/users.json")
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                const jsonData = await res.json();
                const users = jsonData.users;
                const foundUser = users.find(user => user.Username === username && user.Password === password);

                if (foundUser) {
                    sessionStorage.setItem("user", JSON.stringify({
                        DisplayName: foundUser.DisplayName,
                        EmailAddress: foundUser.EmailAddress,
                        Username: foundUser.Username,
                    }));

                    messageArea.classList.remove("alert", "alert-danger");
                    messageArea.style.display = "none";
                    location.href = "contact-list.html";
                } else {
                    messageArea.classList.add("alert", "alert-danger");
                    messageArea.style.display = "block";
                    messageArea.textContent = "Your username or password is incorrect. Please try again.";

                    document.querySelector("#username").focus();
                }
            } catch (e) {
                console.log("Error: ", e);
            }
        })

        cancelButton.addEventListener("click", () => {
            document.querySelector("#loginForm").reset();
            location.href = "index.html";
        })
    }

    function DisplayRegisterPage() {
        console.log("Calling DisplayRegisterPage()...");


    }

    function handleCancelClick() {
        location.href = "contact-list.html";
    }

    function handleEditClick(key) {
        if (!ValidateForm()) {
            alert("Form contains errors. Please correct them before submitting")
        } else {
            const fullName = document.getElementById("fullName").value;
            const contactNumber = document.getElementById("contactNumber").value;
            const emailAddress = document.getElementById("emailAddress").value;
            const subscribeCheckbox = document.getElementById("subscribeCheckbox");

            if (subscribeCheckbox.checked) {
                EditContact(fullName, contactNumber, emailAddress, key);
                location.href = "contact-list.html";
            } else {
                alert("You should check to subscribe box")
            }
        }
    }

    function handleAddClick(e) {
        e.preventDefault();

        if (!ValidateForm()) {
            alert("Form contains errors. Please correct them before submitting")
        } else {
            const fullName = document.getElementById("fullName").value;
            const contactNumber = document.getElementById("contactNumber").value;
            const emailAddress = document.getElementById("emailAddress").value;
            const subscribeCheckbox = document.getElementById("subscribeCheckbox");

            if (subscribeCheckbox.checked) {
                AddContact(fullName, contactNumber, emailAddress);
                location.href = "contact-list.html";
            } else {
                alert("You should check to subscribe box")
            }
        }
    }

    /**
     * Check any field has error message
     * @returns {boolean}
     */
    function ValidateForm() {
        const errors = Object.keys(VALIDATION_RULES).map(fieldId => {
            const errorField = document.getElementById(`${fieldId}-error`);
            return Boolean(errorField.textContent);
        })
        return errors.every(el => el === false);
    }

    /**
     *
     */
    function attachValidationListeners() {
        console.info("[INFO] Attaching validation listeners...");

        // Iterate over each field defined in VALIDATION_RULES
        Object.keys(VALIDATION_RULES).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}-error`);

            if (!field || !errorElement) {
                console.warn(`[WARNING] Field '${fieldId}' not found. Skipping listener attachment`);
            } else {
                field.addEventListener("input", () => {
                    if (VALIDATION_RULES[fieldId].regex.test(field.value.trim())) {
                        errorElement.textContent = ""
                        errorElement.style.display = "none";
                    } else {
                        errorElement.textContent = VALIDATION_RULES[fieldId].errorMessage;
                        errorElement.style.display = "block";
                    }
                });
            }
        })
    }

    /**
     * Centralized validation rules for form input fields
     * @type {{fullName: {regex: RegExp, errorMessage: string}, contactNumber: {regex: RegExp, errorMessage: string},
     * emailAddress: {regex: RegExp, errorMessage: string}}}
     */
    const VALIDATION_RULES = {
        fullName: {
            regex: /^[A-Za-z\s]+$/,
            errorMessage: "Full name must contain only letters and spaces"
        },
        contactNumber: {
            regex: /^\d{3}-\d{3}-\d{4}$/,
            errorMessage: "Contact number must be a 10-digit number in the format ###-###-####"
        },
        emailAddress: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Email address must be a valid email address in the format example@example.com"
        }
    }

    async function DisplayWeather() {
        const apiKey = "e551797c7355ef138f923cc44b150eaa";
        const city = "Oshawa";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch Weather data from openweather.org.");
            }
            const data = await response.json();
            console.log("Weather API response\n", data);

            const weatherDataElement = document.querySelector("#weather-data");
            weatherDataElement.innerHTML = `<strong>City:</strong> ${data.name} <br>
                                            <strong>Temperature:</strong> ${data.main.temp} <br>
                                            <strong>Weather:</strong> ${data.weather[0].description}`
        } catch (e) {
            console.error(e);
            document.getElementById("weather-data").textContent = "Unable to contact weather data at this time";
        }
    }

    function DisplayHomePage() {
        console.log("Calling DisplayHomePage()...");

        let AboutUsButton = document.getElementById("AboutUsBtn");
        // arrow notation
        AboutUsButton.addEventListener("click", () => {
            location.href = "about.html";
        })

        // Add Call to openweather.org
        DisplayWeather();

        // Add content to the main element in index.html
        document.querySelector("main").insertAdjacentHTML(
            "beforeend",
            `<p id="MainParagraph" class="mt-5">This is the first paragraph</p>`
        )

        // Add an article element with paragraph to the body in index.html
        document.body.insertAdjacentHTML(
            "beforeend",
            `<article class="container">
                      <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>
                  </article>`
        )
    }

    function DisplayAboutPage() {
        console.log("Calling DisplayAboutPage()...");
    }

    function DisplayProductsPage() {
        console.log("Calling DisplayProductsPage()...");
    }

    function DisplayServicesPage() {
        console.log("Calling DisplayServicesPage()...");
    }

    function DisplayContactPage() {
        console.log("Calling DisplayContactPage()...");
        attachValidationListeners();

        const sendButton = document.getElementById("sendButton");
        sendButton.addEventListener("click", handleAddClick);
    }

    function DisplayContactListPage() {
        console.log("Calling DisplayContactListPage()...");

        const addButton = document.querySelector("#addButton");
        addButton.classList.remove("btn-primary");
        addButton.classList.add("btn-success");
        addButton.addEventListener("click", function () {
            location.href = "edit.html#add";
        })

        if (localStorage.length > 0) {
            const contactList = document.getElementById("contactList");
            let data = "";

            const keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys) {
                if (key.startsWith("contact_")) {
                    let contactData = localStorage.getItem(key);
                    try {
                        console.log(contactData);
                        const contact = new core.Contact();
                        contact.deserialize(contactData);

                        data += `<tr>
                                    <th scope="row" class="text-center">${index}</th>
                                    <td>${contact.fullName}</td>
                                    <td>${contact.contactNumber}</td>
                                    <td>${contact.emailAddress}</td>
                                    <td class="text-center">
                                        <button value=${key} class="btn btn-primary btn-sm edit">
                                            <i class="fas fa-edit fa-sm me-1"></i>Edit
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <button value=${key} class="btn btn-danger btn-sm delete">
                                            <i class="fa-solid fa-trash me-1"></i>Delete
                                        </button>
                                    </td>
                                </tr>`
                        index++

                        contactList.innerHTML = data;


                    } catch (error) {
                        console.log("Error deserializing contact data");
                    }
                } else {
                    console.log("Not a contact data");
                }
            }

            for (const key of keys) {
                const editButton = document.querySelector(`.edit[value="${key}"]`)
                editButton.addEventListener("click", () => {
                    location.href = `edit.html#${key}`
                })

                const deleteButton = document.querySelector(`.delete[value="${key}"]`)
                deleteButton.addEventListener("click", () => {
                    const answer = confirm("Do you really want to delete?")
                    if (answer) {
                        console.log(key)
                        localStorage.removeItem(key);
                        alert("Contact deleted successfully")
                        location.reload();
                    }
                })
            }
        }
    }

    function DisplayEditPage() {
        console.log("Calling DisplayEditPage()...");
        attachValidationListeners();

        const page = location.hash.substring(1);
        const cancelButton = document.getElementById("cancelButton");
        const editButton = document.getElementById("editButton");

        switch (page) {
            case "add": {
                document.querySelector("h1").innerText = "Add Contact";
                editButton.innerHTML = `<i class="fa-solid fa-user-plus me-1"></i>Add`;
                editButton.classList.remove("btn-primary");
                editButton.classList.add("btn-success");

                editButton.addEventListener("click", handleAddClick)
                cancelButton.addEventListener("click", handleCancelClick)
            }
                break;
            default: {
                const data = localStorage.getItem(page);
                if (data) {
                    const contact = new core.Contact();
                    contact.deserialize(data);
                    fullName.value = contact.fullName;
                    contactNumber.value = contact.contactNumber;
                    emailAddress.value = contact.emailAddress;
                    subscribeCheckbox.checked = true;

                    editButton.addEventListener("click", (e) => {
                        e.preventDefault();
                        handleEditClick(page)
                    })
                    cancelButton.addEventListener("click", handleCancelClick)
                }
            }
                break;
        }
    }

    function AddContact(fullName, contactNumber, emailAddress) {
        const contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = `contact_${Date.now()}`;
            localStorage.setItem(key, contact.serialize());
            alert("Contact has been added");
        }
    }

    function EditContact(fullName, contactNumber, emailAddress, key) {
        const contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            localStorage.setItem(key, contact.serialize());
            alert("Contact has been edited");
        }
    }

    function Start() {
        console.log("Starting...");
        LoadHeader();

        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            default:
                console.error("No matching case for the page title");
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM fully loaded");
        Start();
    });
})();
"use strict";

//IIFE - Immediately Invoked Functional Expression

(function () {
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage()...");

        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
            location.href = "about.html";
        })

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");

        let FirstString = "This is";
        let SecondString = `${FirstString} the Main paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;

        let DocumentBody = document.body;
        DocumentBody.appendChild(Article);

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
    }


    function Start() {
        console.log("Starting...");

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
        }
    }

    window.addEventListener("load", Start);
})();
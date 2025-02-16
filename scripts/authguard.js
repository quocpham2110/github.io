"use strict";

(function (){
    if (!sessionStorage.getItem("user")) {
        console.log("[ERROR] login not found");
        location.href="login.html";
    } else {
        console.log("[INFO] authenticated");
    }
})()
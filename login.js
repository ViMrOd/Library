const express = require('express');

class User {
    constructor() {
        // Member Variables
        this.username_;
        this.password_;
        this.admin_;
    }

    setUsername(newUsername) { this.username_ = newUsername; }
    getUsername() { return this.username_; }
}

let user = new User();

//localStorage.setItem('loggedInUser', JSON.stringify(user.getUsername()));




document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    let inputUsername = document.querySelector('#inputUsername').value;
    let inputPassname = document.querySelector('#inputPassword').value;


    console.log(inputUsername);



}




/*
document.querySelector('form').onsubmit = (e) => {
        e.preventDefault();


        let inputUser = document.querySelector('#txtUsername').value;
        let inputPass = document.querySelector('#txtPassword').value;


        
        let username = "admin";    // Need to use database to input these values
        let password = "admin";    // Need to use database to input these values


        if (inputUser != username || inputPass != password) {
            //document.querySelector('#messageFail').innerHTML = "Username and Password do not match.<br>Please try again.";
            //document.querySelector('#frmLogin').classList.add("fail");
            //document.querySelector('.message').classList.remove("fail");
            alert("Sorry, your login was incorrect.\n\nPlease double-check your login info.")

        }
        if (inputUser == username && inputPass == password) {
            document.querySelector('#messageSucc').innerHTML = "Login Sucessful!<br>You are now logged in.";
            document.querySelector('#frmLogin').classList.add("success");
            document.querySelector('.message').classList.remove("success");
            loggedInUser["username"] = inputUser;
            // Check to see if admin
            // loggedInUser["isAdmin"] = ...
        }

    }
*/
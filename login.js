import loggedInUser from "./globals.js"

document.querySelector('form').onsubmit = (e) => {
        e.preventDefault();

        let username = "admin";    // Need to use database to input these values
        let password = "admin";    // Need to use database to input these values


        let inputUser = document.querySelector('#txtUsername').value;
        let inputPass = document.querySelector('#txtPassword').value;

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



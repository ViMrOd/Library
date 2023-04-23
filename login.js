import { loggedInUser } from "./globals";

let inputUsername;
let inputPassname;

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    inputUsername = document.querySelector('#inputUsername').value;
    inputPassname = document.querySelector('#inputPassword').value;

    loggedInUser.username = inputUsername;


    console.log('username: ' + loggedInUser.username);

    var searchInput = inputUsername;


            $.ajax({
                url: 'http://localhost:3000/customer/' + inputUsername,
                type: 'GET',
                dataType: 'json',
                success: function(data) {

                    var password = '';
                    console.log(data);

                    if (data && data.length > 0) {
                        var customer = data[0];
                        username += customer.customer_id;
                        password += customer.password;

                    } else {



                    }

                },
                error: function() {
                    alert("Sorry, we ran into an error.\n\nPlease double-check your login info.")
                }
            });

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
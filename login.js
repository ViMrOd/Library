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




$(document).ready(function() {
    $('#submit').on('click', function() {
        var inputUsername = $('#inputUsername').val();
        var inputPassword = $('#inputPassword').val();

        $.ajax({
            url: 'http://localhost:3000/customer/' + inputUsername + '/' + inputPassword,
            type: 'GET',
            dataType: 'json',
            success:

            function(data) {
                var customerInfoHtml = '';
                console.log(data);
                if (data && data.length > 0) {
                    var customer = data[0];

            
s                        } else {
                    customerInfoHtml += '<p>No customer found with that ID.</p>';
                }

                $('#customerInfo').html(customerInfoHtml);
            },

            error: function() {

                $('#customerInfo').html('<p>Error searching for customer.</p>');
                
            }
        });
    });
});




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
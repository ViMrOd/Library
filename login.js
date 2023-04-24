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
    $('#frmLogin').on('submit', function(e) {
        e.preventDefault();
        var inputUsername = $('#inputUsername').val();
        var inputPassword = $('#inputPassword').val();
        $.ajax({
            url: 'http://localhost:3000/login/' + inputUsername + '/' + inputPassword,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("hello world");
            },
            error: function() {
                $('#customerInfo').html('<p>Error searching for customer.</p>');
            }
        });
    });
});

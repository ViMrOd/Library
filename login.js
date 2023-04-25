$(document).ready(function() {
    $('#frmLogin').on('submit', function(e) {
        e.preventDefault();
        var inputUsername = $('#inputUsername').val();
        var inputPassword = $('#inputPassword').val();
        $.ajax({
            url: 'http://localhost:3000/login/' + inputUsername + '/' + inputPassword,
            type: 'GET',
            dataType: 'json',
            success: function(user) {
                if(user) {
                    if(inputUsername == user.username && inputPassword == user.password) {
                        localStorage.setItem('loggedInUser', JSON.stringify(user));

                        document.querySelector('#messageSucc').innerHTML = "Login Sucessful!<br>You are now logged in.";
                        document.querySelector('#frmLogin').classList.add("success");
                        document.querySelector('.message').classList.remove("success");
                
                    } else {
                        alert("Sorry, your login was incorrect.\n\nPlease double-check your login info.")
                
                    }
                
                }
            },
            error: function(textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#customerInfo').html('<p>Error searching for customer.</p>');
            }
        });
    });
});

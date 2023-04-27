const navList = document.querySelector("nav > ul");
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

function appendCheckouts(checkouts) {
    const ul = document.querySelector('.checkouts-list');
    ul.innerHTML = "";
    checkouts.forEach(checkout => {
        const li = document.createElement('li');

        const bookTitle = document.createElement('p');
        bookTitle.textContent = `Title: ${checkout.title}`;
        li.appendChild(bookTitle);

        const checkoutDate = document.createElement('p');
        checkoutDate.textContent = `Checkout Date: ${checkout.checkout_date}`;
        li.appendChild(checkoutDate);

        const returnDate = document.createElement('p');
        returnDate.textContent = `Return Date: ${checkout.return_date}`;
        li.appendChild(returnDate);

        const fine = document.createElement('p');
        fine.textContent = `Fine: $${checkout.fine}`;
        li.appendChild(fine);

        const returnButton = document.createElement("button");
        returnButton.classList.add(".return-button");
        returnButton.textContent = "Return";

        returnButton.addEventListener("click", (e)=> {
            e.preventDefault();
            $.ajax({
                url: `http://localhost:3000/user/${loggedInUser.user_id}/checkouts/${checkout.book_id}`,
                type: 'PUT',
                error: function(textStatus, errorThrown) {
                    console.error('Error:', textStatus, errorThrown);
                }
            });
            document.querySelector(".checkouts-menu").classList.add("visible-block")
        });
        li.appendChild(returnButton);

        ul.appendChild(li);
    });
}

$(document).ready(function() {
    if (loggedInUser) {
        document.querySelector('.login-item').remove();
        if (loggedInUser.is_admin) {
            const adminListItem = document.createElement("li");
            const adminLink = document.createElement("a");
            adminLink.textContent = "Admin Portal";
            adminLink.setAttribute("href", "admin.html");
            adminListItem.appendChild(adminLink);
            navList.appendChild(adminListItem);
        }
        const signOutListItem = document.createElement("li");
        const signOutLink = document.createElement("a");
        signOutLink.textContent = "Sign Out";
        signOutLink.setAttribute("href", "/");
        signOutLink.addEventListener("click", ()=> {
            localStorage.clear();
        });
        signOutListItem.appendChild(signOutLink);
        navList.appendChild(signOutListItem);

        const checkoutsListItem = document.createElement("li");
        const checkoutsLink = document.createElement("a");
        checkoutsLink.setAttribute("href", "#");
        checkoutsLink.textContent = "View Checkouts";
        checkoutsLink.addEventListener("click", ()=> {
            $.ajax({
                url: `http://localhost:3000/user/${loggedInUser.user_id}/checkouts`,
                type: 'GET',
                dataType: 'json',
                success: function(checkouts) {
                    appendCheckouts(checkouts);
                },
                error: function(textStatus, errorThrown) {
                    console.error('Error:', textStatus, errorThrown);
                }
            });
            document.querySelector(".checkouts-menu").classList.add("visible-block")
        });

        checkoutsListItem.appendChild(checkoutsLink);
        navList.appendChild(checkoutsListItem);
        const checkedOutItem = document.createElement("li");
        checkedOutItem.classList.add("checked-out-item");

        document.querySelector(".close-checkouts-menu-button").addEventListener("click", ()=> {
            document.querySelector(".checkouts-menu").classList.remove("visible-block")
        });
    }
});

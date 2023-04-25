const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

function checkOut(book) {
    $.ajax({
        url: 'http://localhost:3000/checkout/' + book.book_id + "/" + loggedInUser.user_id,
        type: 'GET',
        dataType: 'json',
        success: function(status) {
            alert(status);
        },
        error: function(textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function addBook(book) {
    const bookGrid = document.querySelector(".book-grid");
    const bookItem = document.createElement("li");
    bookItem.classList.add("book-grid-item");

    const bookContent = document.createElement("div");
    bookContent.classList.add("book-content");

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", `images/${book.title.toLowerCase().replaceAll(" ","_")}.png`);
    bookContent.appendChild(bookImage);

    const bookLinkTitle = document.createElement("a");
    bookLinkTitle.textContent = book.title;
    bookContent.appendChild(bookLinkTitle);

    const buttonContainer = document.createElement("div");
    bookContent.appendChild(buttonContainer);

    const infoButton = document.createElement("button");
    infoButton.textContent = "More Info"
    infoButton.addEventListener("click", (e)=> {
        e.preventDefault();
        updateAndDisplayInfoMenu(book);
    });
    buttonContainer.appendChild(infoButton);

    if (loggedInUser) {
        const checkoutButton = document.createElement("button");
        checkoutButton.classList.add("checkout-button");
        checkoutButton.textContent = "Checkout"
        checkoutButton.addEventListener("click", (e)=> {
            e.preventDefault();
            checkOut(book);
        });
        buttonContainer.appendChild(checkoutButton);
    }

    bookItem.appendChild(bookContent);
    bookGrid.appendChild(bookItem);
}

function updateAndDisplayInfoMenu(book) {
    document.querySelector(".info-menu").classList.add("visible");
    document.querySelector(".info-image").setAttribute("src",
        `images/${book.title.toLowerCase().replaceAll(" ", "_")}.png`);
    document.querySelector(".info-title").textContent = book.title;
    document.querySelector(".info-subtitle").textContent = book.subtitle;
    document.querySelector(".info-author").textContent = book.author;
    document.querySelector(".info-publisher").textContent = book.publisher;
    document.querySelector(".info-branch").textContent = book.branch_name;
}

function updateAndDisplayBooks(books) {
    const bookGrid = document.querySelector(".book-grid");
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }
    books.forEach(book => {
        addBook(book);
    });
}

$(document).ready(function() {
    $('.filters').on('change', function() {
        let selectedBranch = $(this).val();
        $.ajax({
            url: 'http://localhost:3000/books/' + selectedBranch,
            type: 'GET',
            dataType: 'json',
            success: function(books) {
                updateAndDisplayBooks(books);
            },
            error: function(textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            }
        });
    });

    $.ajax({
        url: 'http://localhost:3000/books',
        type: 'GET',
        dataType: 'json',
        success: function(books) {
            document.querySelector(".close-info-menu-button").addEventListener("click",
                ()=> document.querySelector(".info-menu").classList.remove("visible"));
            updateAndDisplayBooks(books);
        },
        error: function(textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });


});




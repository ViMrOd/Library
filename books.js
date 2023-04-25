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

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout"
    const infoButton = document.createElement("button");
    infoButton.textContent = "More Info"
    infoButton.addEventListener("click", ()=> updateAndDisplayInfoMenu(book));
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(checkoutButton);
    buttonContainer.appendChild(infoButton);
    bookContent.appendChild(buttonContainer);

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




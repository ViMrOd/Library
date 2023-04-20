import loggedInUser from "./globals.js"

// Can use it now

const bookGrid = document.querySelector(".book-grid");

function addBook(title, src) {
    const bookItem = document.createElement("li");
    bookItem.classList.add("book-grid-item");

    const bookContent = document.createElement("div");
    bookContent.classList.add("book-content");

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", `images/${src}`);
    bookContent.appendChild(bookImage);

    const bookLinkTitle = document.createElement("a");
    bookLinkTitle.textContent = title;
    bookContent.appendChild(bookLinkTitle);

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout"
    const infoButton = document.createElement("button");
    infoButton.textContent = "More Info"
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(checkoutButton);
    buttonContainer.appendChild(infoButton);
    bookContent.appendChild(buttonContainer);

    bookItem.appendChild(bookContent);
    bookGrid.appendChild(bookItem);
}


addBook("Works on My Machine", "book1.png");
addBook("Works on My Machine", "book2.png");
addBook("Works on My Machine", "book3.jpg");
addBook("Works on My Machine", "book4.jpg");

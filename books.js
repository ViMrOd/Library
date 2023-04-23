const db = require('better-sqlite3')('library.db');

// Can use it now

const bookGrid = document.querySelector(".book-grid");

function updateAndDisplayInfoMenu(src, title, author, yearPublished, publisher, isbn) {
    document.querySelector(".info-menu").classList.add("visible");
    document.querySelector(".info-image").setAttribute("src", `images/${src}.png`);
    document.querySelector(".info-title").textContent = title;
    document.querySelector(".info-author").textContent = author;
    document.querySelector(".year-published").textContent = yearPublished;
    document.querySelector(".publisher").textContent = publisher;
    document.querySelector(".isbn").textContent = isbn;
}

document.querySelector(".close-info-menu-button").addEventListener("click",
    ()=> document.querySelector(".info-menu").classList.remove("visible"));

function addBook(title, src) {
    const bookItem = document.createElement("li");
    bookItem.classList.add("book-grid-item");

    const bookContent = document.createElement("div");
const { logginedInUser } = require("./globals.js");
    bookContent.classList.add("book-content");

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", `images/${src}.png`);
    bookContent.appendChild(bookImage);

    const bookLinkTitle = document.createElement("a");
    bookLinkTitle.textContent = title;
    bookContent.appendChild(bookLinkTitle);

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout"
    const infoButton = document.createElement("button");
    infoButton.textContent = "More Info"
    infoButton.addEventListener("click",
        ()=> updateAndDisplayInfoMenu(src, title, "test", "test", "test","test"));
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(checkoutButton);
    buttonContainer.appendChild(infoButton);
    bookContent.appendChild(buttonContainer);

    bookItem.appendChild(bookContent);
    bookGrid.appendChild(bookItem);
}

const books = db.all("select ");

addBook("Works on My Machine", "book1");
addBook("Works on My Machine", "book2");
addBook("Works on My Machine", "book3");
addBook("Works on My Machine", "book4");

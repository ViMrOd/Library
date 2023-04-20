import loggedInUser from "./globals.js"

// Can use it now

const bookGrid = document.querySelector(".book-grid");

const bookItem = document.createElement("li");
bookItem.classList.add("book-grid-item");

const bookContent = document.createElement("div");
bookContent.classList.add("book-content");

const bookImage = document.createElement("img");
bookImage.setAttribute("src", "images/book1.png");
bookContent.appendChild(bookImage);

const bookLinkTitle = document.createElement("a");
bookLinkTitle.textContent = "Book title";
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

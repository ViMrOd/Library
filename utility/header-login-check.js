const navList = document.querySelector("nav > ul");
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser && loggedInUser.is_admin) {
    const navListItem = document.createElement("li");
    const adminLink = document.createElement("a");
    adminLink.textContent = "Admin Portal";
    adminLink.setAttribute("href", "admin.html");
    navList.appendChild(adminLink);
}

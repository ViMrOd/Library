const navList = document.querySelector("nav > ul");
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    document.querySelector('a[href="login.html"]').remove();
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
}

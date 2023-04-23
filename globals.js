class User {
    constructor() {
        // Member Variables
        this.username_ = "";
        this.password_;
        this.admin_;
    }

    setUsername(newUsername) { this.username_ = newUsername; }
    getUsername() { return this.username_; }
}

let user = new User();

localStorage.setItem('loggedInUser', JSON.stringify(user.getUsername()));
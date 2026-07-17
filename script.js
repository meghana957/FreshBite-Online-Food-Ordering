// ================= RESPONSIVE NAVBAR =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ================= SEARCH FUNCTION =================

const searchBox = document.getElementById("searchBox");
const menuCards = document.querySelectorAll(".menu-card");

searchBox.addEventListener("keyup", function () {

    let searchValue = searchBox.value.toLowerCase();

    menuCards.forEach(function (card) {

        let foodName = card.innerText.toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// ================= SHOPPING CART =================

const cartButtons = document.querySelectorAll(".cart-btn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");

let total = 0;
let count = 0;

let cart = {};

// ================= ADD TO CART =================

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (cart[name]) {

            cart[name].quantity++;

        } else {

            cart[name] = {
                price: price,
                quantity: 1
            };

        }

        updateCart();

    });

});

// ================= UPDATE CART =================

function updateCart() {

    cartItems.innerHTML = "";

    total = 0;
    count = 0;

    for (let item in cart) {

        const quantity = cart[item].quantity;
        const price = cart[item].price;

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item} × ${quantity}</span>
            <span>₹${price * quantity}</span>
            <button class="remove-btn" onclick="removeItem('${item}')">
                ❌
            </button>
        `;

        cartItems.appendChild(li);

        total += price * quantity;
        count += quantity;

    }

    totalPrice.textContent = total;
    cartCount.textContent = count;

}
// ================= REMOVE ITEM =================

function removeItem(item) {

    const confirmDelete = confirm(
        "Do you want to remove " + item + " from the cart?"
    );

    if (confirmDelete) {

        delete cart[item];

        updateCart();

    }

}

// ================= CHECKOUT =================

const checkoutBtn = document.getElementById("checkoutBtn");
const addressModal = document.getElementById("addressModal");
const closeAddress = document.getElementById("closeAddress");

checkoutBtn.addEventListener("click", () => {

    if (total === 0) {

        alert("Your cart is empty!");
        return;

    }

    addressModal.style.display = "flex";

});

// ================= CLOSE ADDRESS POPUP =================

closeAddress.addEventListener("click", () => {

    addressModal.style.display = "none";

});

// Close popup when clicking outside

window.addEventListener("click", (e) => {

    if (e.target === addressModal) {

        addressModal.style.display = "none";

    }

});

// ================= PLACE ORDER =================

const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", () => {

    const customerName =
        document.getElementById("customerName").value.trim();

    const phoneNumber =
        document.getElementById("phoneNumber").value.trim();

    const deliveryAddress =
        document.getElementById("deliveryAddress").value.trim();

    if (
        customerName === "" ||
        phoneNumber === "" ||
        deliveryAddress === ""
    ) {

        alert("Please fill all the delivery details.");
        return;

    }

    alert("🎉 Order placed successfully!\nThank you for choosing FreshBite.");

    addressModal.style.display = "none";

    cartItems.innerHTML = "";

    cart = {};

    total = 0;
    count = 0;

    cartCount.textContent = count;
    totalPrice.textContent = total;

    document.getElementById("customerName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("deliveryAddress").value = "";

});
// ================= LOGIN POPUP =================

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Close login popup when clicking outside

window.addEventListener("click", (e) => {

    if (e.target === loginModal) {

        loginModal.style.display = "none";

    }

});

// ================= LOGIN / LOGOUT =================

const loginSubmit = document.getElementById("loginSubmit");
const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

loginSubmit.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        alert("Please enter both username and password.");
        return;

    }

    alert("Welcome, " + username + "! Login Successful.");

    loginModal.style.display = "none";

    loginBtn.style.display = "none";

    welcomeUser.innerHTML = "👋 " + username;
    welcomeUser.style.display = "inline";

    logoutBtn.style.display = "inline-block";

    // Save username in Local Storage

    localStorage.setItem("username", username);

    // Clear input fields

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

});

// ================= LOGOUT =================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("username");

    welcomeUser.style.display = "none";

    logoutBtn.style.display = "none";

    loginBtn.style.display = "inline-block";

    alert("Logged out successfully!");

});

// ================= AUTO LOGIN =================

window.addEventListener("load", () => {

    const savedUser = localStorage.getItem("username");

    if (savedUser) {

        loginBtn.style.display = "none";

        welcomeUser.innerHTML = "👋 " + savedUser;

        welcomeUser.style.display = "inline";

        logoutBtn.style.display = "inline-block";

    }

});

// ================= END OF SCRIPT =================
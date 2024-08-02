let cart = [];

// Function to add a book to the cart
function addToCart(bookName, bookPrice) {
    const book = { name: bookName, price: bookPrice };
    cart.push(book);
    updateCartDisplay();
    alert(`${bookName} has been added to your cart!`);
}

// Function to remove a book from the cart
function removeFromCart() {
    const bookSelect = document.getElementById('bookSelect');
    const selectedBook = bookSelect.value;
    cart = cart.filter(book => book.name !== selectedBook);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const bookSelect = document.getElementById('bookSelect');
    cartItems.innerHTML = '';
    bookSelect.innerHTML = ''; // Clear the select options

    let total = 0;
    cart.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.name} - ₹${book.price.toFixed(2)}`;
        cartItems.appendChild(li);
        
        // Populate the select options for removing books
        const option = document.createElement('option');
        option.value = book.name;
        option.textContent = `${book.name} - ₹${book.price.toFixed(2)}`;
        bookSelect.appendChild(option);

        total += book.price;
    });

    cartTotal.textContent = `₹${total.toFixed(2)}`;
    document.querySelector('header .cart span').textContent = `₹${total.toFixed(2)}`;

    // Show or hide the "Add New Books" button and remove section based on cart status
    const addNewBooksButton = document.getElementById('addNewBooksButton');
    addNewBooksButton.style.display = cart.length === 0 ? 'block' : 'none';
    document.getElementById('removeSection').style.display = cart.length > 0 ? 'block' : 'none';
}

// Function to toggle modals
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Close the modals when the user clicks anywhere outside of them
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Scroll to the books section when clicking the Books link
function scrollToSection(sectionClass) {
    document.querySelector(`.${sectionClass}`).scrollIntoView({ behavior: 'smooth' });
}

// Handle Contact Form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank You! We will respond to you soon.');
    // Optionally, reset the form here
    this.reset();
});

// Show the Learn More modal
function showLearnMore() {
    toggleModal('learnMoreModal');
}

// Replace with your Vercel backend URL
const BASE_URL = 'https://my-backend-k8xzomm3t-roshanb435s-projects.vercel.app/';

// Handle Login Form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login Successful!');
            // Optionally, redirect or handle login logic
        } else {
            alert(`Login failed: ${result.message}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
    this.reset();
});

// Handle Sign Up Form submission
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch(`${BASE_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, contact, address, email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Sign Up Successful!');
            // Optionally, redirect or handle sign-up logic
        } else {
            alert(`Sign-up failed: ${result.message}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
    this.reset();
});

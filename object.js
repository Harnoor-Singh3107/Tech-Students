// const cart = {};

// function updateCartUI() {
//   const cartItemsContainer = document.getElementById("cart-items");
//   const cartTotalElement = document.getElementById("cart-total");
//   cartItemsContainer.innerHTML = ""; // Clear existing items
//   let total = 0;

//   Object.keys(cart).forEach(itemName => {
//     const cartItem = cart[itemName];
//     total += cartItem.price * cartItem.quantity;

//     const cartItemDiv = document.createElement("div");
//     cartItemDiv.classList.add("cart-item");

//     cartItemDiv.innerHTML = `
//       <span>${itemName} (₹${cartItem.price})</span>
//       <div class="quantity-controls">
//         <button onclick="updateQuantity('${itemName}', -1)">-</button>
//         <span>${cartItem.quantity}</span>
//         <button onclick="updateQuantity('${itemName}', 1)">+</button>
//       </div>
//       <span>₹${cartItem.price * cartItem.quantity}</span>
//     `;
//     cartItemsContainer.appendChild(cartItemDiv);
//   });

//   cartTotalElement.textContent = total;
// }

// function updateQuantity(itemName, change) {
//   if (cart[itemName]) {
//     cart[itemName].quantity += change;
//     if (cart[itemName].quantity <= 0) {
//       delete cart[itemName];
//     }
//     updateCartUI();
//   }
// }

// document.querySelectorAll(".add-to-cart").forEach(button => {
//   button.addEventListener("click", () => {
//     const menuItem = button.closest(".menu-item-card");
//     const itemName = menuItem.getAttribute("data-name");
//     const itemPrice = parseInt(menuItem.getAttribute("data-price"));

//     if (!cart[itemName]) {
//       cart[itemName] = { price: itemPrice, quantity: 1 };
//     } else {
//       cart[itemName].quantity += 1;
//     }

//     updateCartUI();
//   });
// });


let cart = [];

// Get DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const proceedButton = document.getElementById('proceed-button');

// Function to update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous items

    // Loop through cart array and display items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <div>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <span>Qty: ${item.quantity}</span>
                <button onclick="increaseQuantity('${item.name}')">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCart();
}

// Function to increase quantity
function increaseQuantity(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Function to decrease quantity
function decreaseQuantity(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Add event listener to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        addToCart(itemName, itemPrice);
    });
});

// Proceed to checkout button
proceedButton.addEventListener('click', () => {
    alert('Proceeding to Checkout');
});

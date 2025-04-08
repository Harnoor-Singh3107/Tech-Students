let cart = [
    { name: 'Grilled Chicken', price: 299, quantity: 2 },
    { name: 'Butter Chicken', price: 350, quantity: 1 },
    { name: 'Cheesecake', price: 200, quantity: 1 }
];

// Get DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const deliveryFeeElement = document.getElementById('delivery-fee');
const totalElement = document.getElementById('total');
const deliveryTimeElement = document.getElementById('delivery-time');
const proceedToPaymentButton = document.getElementById('proceed-to-payment');
const paymentModal = document.getElementById('payment-modal');
const closePaymentModalButton = document.getElementById('close-payment-modal');
const paymentForm = document.getElementById('payment-form');
const qrCodeContainer = document.getElementById('qr-code');

// Function to update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let subtotal = 0;
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
        subtotal += item.price * item.quantity;
    });

    subtotalElement.textContent = subtotal.toFixed(2);
    let total = subtotal + parseFloat(deliveryFeeElement.textContent);
    totalElement.textContent = total.toFixed(2);
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

// Show the payment modal
proceedToPaymentButton.addEventListener('click', () => {
    paymentModal.style.display = 'flex';
    generateQRCode();
});

// Close the payment modal
closePaymentModalButton.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

// Handle payment form submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment Successful! Your order is being processed.');
    // Clear cart after successful payment
    cart = [];
    updateCart();
    paymentModal.style.display = 'none';
});

// Function to generate QR Code for payment
function generateQRCode() {
    const paymentLink = "https://example.com/pay-now"; // Replace this with your actual payment link
    QRCode.toCanvas(qrCodeContainer, paymentLink, function (error) {
        if (error) console.error(error);
        console.log('QR Code generated!');
    });
}

// Initial update of the cart
updateCart();

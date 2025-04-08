document.addEventListener('DOMContentLoaded', function () {
    let cart = [];
    
    const cartButton = document.getElementById('cart-button');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });

    function addToCart(id, name, price) {
        const existingItemIndex = cart.findIndex(item => item.id === id);
        
        if (existingItemIndex === -1) {
            cart.push({ id, name, price, quantity: 1 });
        } else {
            cart[existingItemIndex].quantity += 1;
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        cartCount.textContent = totalQuantity;
        cartTotal.textContent = totalPrice.toFixed(2);
        cartTotalPrice.textContent = totalPrice.toFixed(2);

        updateCartPopup();
    }

    function updateCartPopup() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <p>${item.name} x ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;

            const removeButton = cartItem.querySelector('.remove-item');
            removeButton.addEventListener('click', function () {
                removeItemFromCart(item.id);
            });

            cartItemsContainer.appendChild(cartItem);
        });
    }

    function removeItemFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }

        updateCartDisplay();
    }

    cartButton.addEventListener('click', function () {
        cartPopup.style.display = 'block';
    });

    closeCartButton.addEventListener('click', function () {
        cartPopup.style.display = 'none';
    });

    checkoutButton.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty! Please add items before proceeding to checkout.');
        } else {
            alert('Proceeding to checkout...');
            cart = [];
            updateCartDisplay();
        }
    });
});

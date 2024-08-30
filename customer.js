// Get HTML elements
const categorySelect = document.getElementById('category');
const productList = document.getElementById('product-list');
const cartSummary = document.getElementById('cart-summary');
const checkoutBtn = document.getElementById('checkout-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCounter = document.querySelector('.cart-counter');

// Add styles
categorySelect.style.background = 'linear-gradient(135deg, #34A853 0%, #1A73E8 100%)';
categorySelect.style.padding = '10px';
categorySelect.style.borderRadius = '5px';

productList.style.listStyle = 'none';
productList.style.padding = '0';
productList.style.margin = '0';

cartSummary.style.background = 'linear-gradient(135deg, #34A853 0%, #1A73E8 100%)';
cartSummary.style.padding = '20px';
cartSummary.style.borderRadius = '5px';

checkoutBtn.style.background = 'linear-gradient(135deg, #34A853 0%, #1A73E8 100%)';
checkoutBtn.style.color = '#fff';
checkoutBtn.style.padding = '10px 20px';
checkoutBtn.style.borderRadius = '5px';
checkoutBtn.style.cursor = 'pointer';

cartIcon.style.color = '#34A853';
cartIcon.style.fontSize = '24px';

cartCounter.style.background = '#FF9900';
cartCounter.style.color = '#fff';
cartCounter.style.padding = '5px 10px';
cartCounter.style.borderRadius = '50%';

// Load product data from JSON file
let products = [];
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    // Create HTML elements for each product
    products.forEach(product => {
      const productHTML = `
        <li>
          <h2>${product.name}</h2>
          <p>Price: ₦${product.price}</p>
          <button class="add-to-cart" data-product-id="${(product.id)}">Add to Cart</button>
        </li>
      `;
      productList.insertAdjacentHTML('beforeend', productHTML);
    });

    // Add styles to buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.style.background = 'linear-gradient(135deg, #34A853 0%, #2E865F 100%)';
      button.style.color = '#fff';
      button.style.border = 'none';
      button.style.padding = '10px 20px';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.onmouseover = function() {
        button.style.background = 'linear-gradient(135deg, #2E865F 0%, #34A853 100%)';
      }
      button.onmouseout = function() {
        button.style.background = 'linear-gradient(135deg, #34A853 0%, #2E865F 100%)';
      }
    });

    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
      button.style.background = 'linear-gradient(135deg, #8BC34A 0%, #5C9210 100%)';
      button.style.color = '#fff';
      button.style.border = 'none';
      button.style.padding = '10px 20px';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.onmouseover = function() {
        button.style.background = 'linear-gradient(135deg, #5C9210 0%, #8BC34A 100%)';
      }
      button.onmouseout = function() {
        button.style.background = 'linear-gradient(135deg, #8BC34A 0%, #5C9210 100%)';
      }
    });
  });

// Initialize cart
let cart = {};

// Function to add product to cart
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    e.preventDefault();
    const productId = e.target.dataset.productId;
    const product = products.find((p) => (p.id) === parseInt(productId));
    if (cart[productId]) {
      cart[productId].quantity++;
    } else {
      cart[productId] = { ...product, quantity: 1 };
    }
    updateCartSummary();
  }
});


// Function to update cart summary and counter
function updateCartSummary() {
  cartSummary.innerHTML = '';
  Object.values(cart).forEach((product, index) => {
    const productHTML = `
      <li style="background: linear-gradient(135deg, #137333 0%, #34A853 100%); padding: 20px; border-radius: 10px; margin-bottom: 10px;">
        <h2 style="color: #fff;">${product.name}</h2>
        <p style="color: #fff;">Quantity: ${product.quantity}</p>
        <p style="color: #fff;">Subtotal: ₦${(product.price * product.quantity).toFixed(2)}</p>
        <button class="remove-from-cart" data-product-index="${index}" style="background: linear-gradient(135deg, #FF3737 0%, #FF9900 100%); color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Remove</button>
      </li>
    `;
    cartSummary.insertAdjacentHTML('beforeend', productHTML);
  });
  const total = Object.values(cart).reduce((acc, product) => acc + product.price * product.quantity, 0);
  cartSummary.insertAdjacentHTML('beforeend', `<p style="background: linear-gradient(135deg, #137333 0%, #34A853 100%); padding: 20px; border-radius: 10px; color: #fff;">Total: ₦${total.toFixed(2)}</p>`);
  updateCartCounter();

  // Add event listener to remove buttons
  const removeButtons = cartSummary.querySelectorAll('.remove-from-cart');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productIndex = button.dataset.productIndex;
      const product = Object.values(cart)[productIndex];
      delete cart[((product.id))];
      updateCartSummary();
    });
  });
}

function updateCartCounter() {
  const cartItemsData = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCounter = document.querySelector('.cart-counter');
  if (cartCounter) {
    cartCounter.textContent = cartItemsData.length;
  } else {
    console.error('Cart counter element not found');
  }
}





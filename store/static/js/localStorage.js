// Function to save the cart items to localStorage
function saveCartToLocalStorage() {
  const cartItems = cartWrapper.querySelectorAll('.cart-item');
  const cartData = [];

  cartItems.forEach((cartItem) => {
    const productInfo = {
      id: cartItem.dataset.id,
      imgSrc: cartItem.querySelector('img').getAttribute('src'),
      title: cartItem.querySelector('.cart-item__title').innerText,
      price: cartItem.querySelector('.price__currency').innerText.split('грн/')[0],
      weight: cartItem.querySelector('.price__currency').innerText.split('грн/')[1],
      counter: cartItem.querySelector('[data-counter]').innerText,
    };
    cartData.push(productInfo);
  });

  localStorage.setItem('shoppingCart', JSON.stringify(cartData));
}

// Function to load cart items from localStorage
function loadCartFromLocalStorage() {
  cartWrapper.innerHTML = '';
  const cartData = localStorage.getItem('shoppingCart');
  if (cartData) {
    const cartItems = JSON.parse(cartData);
    cartItems.forEach((item) => {
      const cartItemHTML = `<div class="cart-item" data-id="${item.id}">
                              <div class="cart-item__top">
                                <div class="cart-item__img">
                                  <img src="${item.imgSrc}" alt="${item.title}">
                                </div>
                                <div class="cart-item__desc">
                                  <button class="remove-item" data-action="remove">&times;</button>
                                  <div class="cart-item__title">${item.title}</div>
                                  <div class="cart-item__details">
                                  
                                    <div class="price__currency">${item.price}грн/${item.weight}</div>
                                    
                                    <div class="counter">
                                      <button class="counter_control" data-action="minus">-</button>
                                      <div class="counter_amount" data-counter>${item.counter}</div>
                                      <button class="counter_control" data-action="plus">+</button>
                                    </div>
                                    <div class="price__currency" style="margin-top: 10px; background-color: 
                                    var(--second-color); color: var(--text-color); 
                                    border: 1px solid var(--main-color-border) ">
                                        <div class="product-total-price">
                                          Вартість: ${parseInt(item.counter) * parseInt(item.price)} грн
                                        </div>      
                                    </div> 
                                    
                                  </div>    
                                </div>
                              </div>
                            </div>`;
      cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
      updateCart();

    });

    updateFixedCartButtonVisibility();
    updateCartItemCount();
  }
}

// Load cart items from localStorage when the page is loaded
window.addEventListener('load', function () {
  loadCartFromLocalStorage();
});

// Save cart items to localStorage after updating the cart
function updateCart() {
    if (cartWrapper.children.length > 0) {
        saveCartToLocalStorage();
    }
    toggleCartStatus();
    calcCartPriceAndDelivery();
    updateCartItemCount();
    updateFixedCartButtonVisibility();
}

window.addEventListener('click', function (event) {
  updateCart();
});

window.addEventListener('beforeunload', function () {
    saveCartToLocalStorage();
});




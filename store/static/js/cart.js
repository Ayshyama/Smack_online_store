// Div внутри корзины, в который мы добавляем товары
const cartWrapper =  document.querySelector('.cart-wrapper');
const fixedCartButton = document.querySelector('.fixed-cart-button');

// Function to update the visibility of the fixed cart button
function updateFixedCartButtonVisibility() {
    if (cartWrapper.children.length > 0) {
        fixedCartButton.style.opacity = '1';
        fixedCartButton.style.visibility = 'visible';
    } else {
        fixedCartButton.style.opacity = '0';
        fixedCartButton.style.visibility = 'hidden';
    }
}

// Attach the same event listener to the new button as the original cart button
fixedCartButton.addEventListener('click', function() {
    const originalCartButton = document.getElementById('open-cart-modal');
    if (originalCartButton) {
        originalCartButton.click();
    }
});

function updateCartItemCount() {
    const cartItemsCount = cartWrapper.children.length;
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.innerText = cartItemsCount;
}


// отслеживаем клик на странице
window.addEventListener('click', function (event) {

    // Проверяем что клик был совершен по кнопке "добавить в корзину"
    if (event.target.hasAttribute('data-cart')) {

        const card = event.target.closest('.box');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.fish-image').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            price: card.querySelector('.price-weight').innerText.split('грн/')[0],
            weight: card.querySelector('.price-weight').innerText.split('грн/')[1],
            counter: card.querySelector('[data-counter]').innerText,
        };

        console.log(productInfo);
        updateCart();

		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
            // Update the total price for the item in the cart
            const totalPriceElement = itemInCart.querySelector('.product-total-price');
            const counter = parseInt(counterElement.innerText);
            const price = parseInt(productInfo.price);
            totalPriceElement.innerText = `Вартість: ${counter * price} грн`;
        } else {
            // Если товара нет в корзине
            // Собранные данные подставим в шаблон для товара в корзине

            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
                                    <div class="cart-item__top">
                                        <div class="cart-item__img">
                                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                                        </div>                                      
                                        <div class="cart-item__desc">
                                            <button class="remove-item" data-action="remove">&times;</button>
                                            <div class="cart-item__title">${productInfo.title}
                                            </div>
                                            <div class="cart-item__details">
                                                <div class="price__currency">${productInfo.price}грн/${productInfo.weight}</div>
                                                <div class="counter">
                                                    <button class="counter_control" data-action="minus">-</button>
                                                    <div class="counter_amount" data-counter>${productInfo.counter}</div>
                                                    <button class="counter_control" data-action="plus">+</button>
                                                </div>  
                                            <div class="price__currency" style="margin-top: 10px">
                                                <div class="product-total-price">
                                                    Вартість: ${parseInt(productInfo.counter) * parseInt(productInfo.price)} грн
                                                </div>  
                                            </div>  
                                            </div>
                                        </div>
                                    </div>
                                  </div>`;



            // Update cart after adding the product
            updateCart();

            // Отобразим товар в корзине
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

            updateCart();

        }


        // Сбрасываем счетчик добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';

		// Отображение статуса корзины Пустая / Полная
		toggleCartStatus();

		// Пересчет общей стоимости товаров в корзине
		calcCartPriceAndDelivery();

    }
})

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    updateFixedCartButtonVisibility();
});





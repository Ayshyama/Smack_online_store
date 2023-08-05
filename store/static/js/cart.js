// Div внутри корзины, в который мы добавляем товары
const cartWrapper =  document.querySelector('.cart-wrapper');

// отслеживаем клик на странице
window.addEventListener('click', function (event) {

    // Проверяем что клик был совершен по кнопке "добавить в корзину"
    if (event.target.hasAttribute('data-cart')) {

        // находим карточку с товаром, внутри которой был клик
        const card = event.target.closest('.box');
        // собираем данные с этого товара и записываем их в единый объект productInfo
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
        // Проверять если ли уже такой товар в корзине
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        // Если товар есть в корзине
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
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
                                            </div>
                                        </div>
                                    </div>
                                  </div>`;



            // Update cart after adding the product
            updateCart();

            // Отобразим товар в корзине
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        }


        // Сбрасываем счетчик добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';

		// Отображение статуса корзины Пустая / Полная
		toggleCartStatus();

		// Пересчет общей стоимости товаров в корзине
		calcCartPriceAndDelivery();
    }
})
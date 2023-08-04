function calcCartPriceAndDelivery() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost');
    const cartTotalEl = document.querySelector('.cart-total')
    let totalPrice = 0;

    cartItems.forEach(function (item) {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('.price__currency');
        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
        totalPrice += currentPrice;

    })

    console.log(totalPrice);



    let deliveryPrice = 50;
    if (totalPrice > 0) {
        cartTotalEl.classList.remove('none');
    } else {
        cartTotalEl.classList.add('none');
    }

    if (totalPrice >= 1000) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'Безкоштовно';
    } else {
        totalPrice += deliveryPrice;
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '50 ₴';
    }

    totalPriceEl.innerText = totalPrice;
}
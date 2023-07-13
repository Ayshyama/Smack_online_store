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

    }
})
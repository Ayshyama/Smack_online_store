// добавляем прослушку кликов и тачей на всем окне
window.addEventListener('click', handleCounterClick);

function handleCounterClick(event) {
    // объявляем переменную для счетчика чтоб не было ошибок и повторения кода
    let amount;

    // ищем клик или тач только по кнопкам Плюс либо Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим родительский класс
        const counter = event.target.closest('.counter');
        // Находим див с числом счетчика
        amount = counter.querySelector('[data-counter]')
    }

    // проверяем является ли элемент по которому кликнули кнопкой плюс
    if (event.target.dataset.action === 'plus') {
        amount.innerText = ++amount.innerText;
    }

    // проверяем является ли элемент по которому кликнули кнопкой минус
    if (event.target.dataset.action === 'minus') {
        // проверяем чтобы счетчик был больше 1
        if (parseInt(amount.innerText) > 1) {
            amount.innerText = --amount.innerText;
        } else if (event.target.closest('.cart-wrapper') && parseInt(amount.innerText) === 1) {
            // Удаляем товар из корзины
            event.target.closest('.cart-item').remove();

            toggleCartStatus();

            calcCartPriceAndDelivery();
        }
    }

    // проверяем клик на + или - внутри корзины
    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        // пересчет общей стоимости товаров в корзине
        calcCartPriceAndDelivery();
    }
}
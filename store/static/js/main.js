let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  search.classList.remove('active');

}


let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});



// JavaScript код для плавной прокрутки с учетом отступа
document.addEventListener('DOMContentLoaded', function() {
  var scrollLinks = document.querySelectorAll('.scroll-link');

  scrollLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      var headerHeight = document.querySelector('header').offsetHeight; // Получаем высоту заголовка
      var targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
});

// Получаем ссылку на иконку для открытия корзины
const openCartModalButton = document.getElementById('open-cart-modal');

// Получаем ссылку на модальное окно корзины
const cartModal = document.getElementById('cart-modal');

// Получаем ссылку на элемент для закрытия модального окна
const closeCartModalButton = document.getElementById('close-cart-modal');

// Добавляем обработчик события клика на иконку открытия корзины
openCartModalButton.addEventListener('click', function() {
    cartModal.style.display = 'block';
});

// Добавляем обработчик события клика на кнопку закрытия модального окна
closeCartModalButton.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

// Добавляем обработчик события клика на вне области модального окна для его закрытия
window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
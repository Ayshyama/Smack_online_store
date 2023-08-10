


// Animations
window.onload = () => {
  if ('ontouchstart' in document.documentElement) {
    document.body.classList.add('mobile-device');
  }
  const header = document.querySelector('header');
  const heading = document.querySelector('#products .heading');
  const productsContainer = document.querySelector('.products .products-container');
  const animationItems = document.querySelectorAll('.animation-item');
  const introContainers = document.querySelectorAll('.animation-item-second');

  initializeElements(header, heading, productsContainer, animationItems, introContainers);
  setupEventListeners();
  handleScrollEvents(header);
  handleScrollEventsForBoxes();
};

function initializeElements(header, heading, productsContainer, animationItems, introContainers) {
  if (introContainers) {
    introContainers.forEach((item) => {
      item.classList.add('animation-item-second');
      setTimeout(() => item.classList.add('show-item'), 50);
    });
  }

  if (header) {
    setTimeout(() => header.classList.add('show'), 50);
  }

  if (heading && productsContainer) {
    setTimeout(() => {
      heading.classList.add('show');
      productsContainer.classList.add('show');
    }, 50);
  }

  if (animationItems) {
    setTimeout(() => {
      animationItems.forEach(item => item.classList.add('show-item'));
    }, 50);
  }
}

function setupEventListeners() {
  const search = document.querySelector('.search-box');
  const navbar = document.querySelector('.navbar');
  const searchInput = document.querySelector('#search-input');

  document.querySelector('#search-icon').onclick = () => toggleSearchAndNavbar(search, navbar);
  document.querySelector('#menu-icon').onclick = () => toggleMenuAndSearch(navbar, search);

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      window.location.href = '/search?search=' + e.target.value;
    }
  });

  window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
  };
}

function toggleSearchAndNavbar(search, navbar) {
  search.classList.toggle('active');
  navbar.classList.remove('active');
}

function toggleMenuAndSearch(navbar, search) {
  navbar.classList.toggle('active');
  search.classList.remove('active');
}

function handleScrollEvents(header) {
  let lastScrollTop = 0;

  function scrollHandler() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.classList.add('hide', 'shadow');
    } else {
      header.classList.remove('hide', 'shadow');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    if (window.location.pathname === '/') {
      header.classList.toggle('shadow', window.scrollY > 0);
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(scrollHandler);
  });
}

function handleScrollEventsForBoxes() {
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    if (isElementInViewport(box)) {
      box.classList.add('show-item');
    }
  });

  window.addEventListener('scroll', () => {
    boxes.forEach(box => {
      if (isElementInViewport(box)) {
        box.classList.add('show-item');
      }
    });
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - rect.height/4 &&
      rect.bottom >= 0
  );
}

// Animations



// HOME LINK
// Get the scroll-link element
const scrollLink = document.querySelector('.scroll-link');

// Check if the scroll-link exists
if (scrollLink) {
  // Add a click event listener to the scroll-link
  scrollLink.addEventListener('click', (event) => {
    const href = scrollLink.getAttribute('href');
    if (href === '#home') {
      event.preventDefault();
      scrollToElement('home');
    } else {
      // Redirect to the link's href
      window.location.href = href;
    }
  });
}

// Function to scroll to an element
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('.scroll-link');

  scrollLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { // Проверьте, существует ли элемент
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// CATEGORIES_BUTTONS //
const categoryButtons = document.querySelectorAll('.category-button');

categoryButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const categorySlug = this.getAttribute('href').split('/').pop();

        // Отправляем AJAX-запрос на сервер
        fetch(`/ajax/get_products/?category_slug=${categorySlug}`)
            .then(response => response.json())
            .then(data => {
                updateProducts(data);
                updateCategoryName(categorySlug); // Добавляем эту строку
            })
            .catch(error => console.error('Error:', error));

        // Обновляем активную кнопку
        categoryButtons.forEach(btn => btn.classList.remove('chosen')); // Убираем класс chosen со всех кнопок
        button.classList.add('chosen'); // Добавляем класс chosen к нажатой кнопке
    });
});



function updateCategoryName(categorySlug) {
    const categoryNameElement = document.querySelector('#products h2');
    let categoryName = 'Всі категорії'; // Значение по умолчанию

    if (categorySlug !== 'all') {
        const selectedButton = document.querySelector(`.category-button[href$="${categorySlug}"]`);
        if (selectedButton) {
            categoryName = selectedButton.textContent.trim(); // Используем текст кнопки как имя категории
        }
    }

    if (categoryNameElement) {
        categoryNameElement.textContent = categoryName;
    }
}


function updateProducts(products) {
    const productsContainer = document.querySelector('.products .products-container');
    productsContainer.innerHTML = '';

    const heading = document.querySelector('.products .heading h2');
    if (products.length > 0) {
        heading.textContent = products[0].category;
    } else {
        heading.textContent = "Товарів не знайдено";
    }

    const productModal = document.createElement('div');
    productModal.className = 'product-modal image-modal';
    const productModalContent = document.createElement('div');
    productModalContent.className = 'product-modal-content';
    const closeSpan = document.createElement('span');
    closeSpan.id = 'close';
    closeSpan.className = 'close';
    closeSpan.textContent = '×';
    const modalCategory = document.createElement('h4');
    const modalTitle = document.createElement('h3');
    const modalDescription = document.createElement('p');
    modalDescription.className = 'product-modal-description';
    const modalImage = document.createElement('img');
    modalImage.id = 'product-modal-image';
    modalImage.className = 'product-modal-image';
    productModalContent.appendChild(closeSpan);
    productModalContent.appendChild(modalCategory);
    productModalContent.appendChild(modalTitle);
    productModalContent.appendChild(modalDescription);
    productModalContent.appendChild(modalImage);
    productModal.appendChild(productModalContent);


    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'box animation-item';
        productDiv.setAttribute('data-id', product.id);
        productModal.className = 'product-modal image-modal';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const productImage = document.createElement('img');
        productImage.className = 'fish-image';
        productImage.src = product.image_url ? product.image_url : '/static/img/ryb1.png';
        productImage.alt = product.alt;

        productImage.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
            modalImage.src = productImage.src;
            modalCategory.textContent = product.category;
            modalTitle.textContent = product.name;
            modalDescription.textContent = product.description;
            productModal.style.display = 'flex';
        });

        imageContainer.appendChild(productImage);

        const productCategory = document.createElement('h4');
        productCategory.textContent = product.category;
        const horizontalLine = document.createElement('hr');

        const productName = document.createElement('h3');
        productName.className = 'item-title';
        productName.textContent = product.name;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';

        const productPrice = document.createElement('span');
        productPrice.className = 'price-weight';
        productPrice.textContent = product.price + ' грн/' + product.measure;

        const counterDiv = document.createElement('div');
        counterDiv.className = 'counter';
        const minusButton = document.createElement('button');
        minusButton.className = 'counter_control';
        minusButton.setAttribute('data-action', 'minus');
        minusButton.textContent = '-';
        const counterAmount = document.createElement('div');
        counterAmount.className = 'counter_amount';
        counterAmount.setAttribute('data-counter', '1');
        counterAmount.textContent = '1';
        const plusButton = document.createElement('button');
        plusButton.className = 'counter_control';
        plusButton.setAttribute('data-action', 'plus');
        plusButton.textContent = '+';
        counterDiv.appendChild(minusButton);
        counterDiv.appendChild(counterAmount);
        counterDiv.appendChild(plusButton);

        const cartButtonContainer = document.createElement('div');
        cartButtonContainer.className = 'cart-button-container';
        const cartButtonDiv = document.createElement('div');
        cartButtonDiv.setAttribute('data-cart', '');
        const addCartButton = document.createElement('button');
        addCartButton.setAttribute('data-cart', '');
        addCartButton.className = 'add-cart-button';
        addCartButton.textContent = 'Додати в кошик';
        cartButtonDiv.appendChild(addCartButton);
        cartButtonContainer.appendChild(cartButtonDiv);

        contentDiv.appendChild(productPrice);
        contentDiv.appendChild(counterDiv);
        contentDiv.appendChild(cartButtonContainer);
        productDiv.appendChild(imageContainer);
        productDiv.appendChild(productCategory)
        productDiv.appendChild(horizontalLine);
        productDiv.appendChild(productName);
        productDiv.appendChild(contentDiv);
        productDiv.appendChild(productModal);

        productsContainer.appendChild(productDiv);
        productsContainer.appendChild(productModal);

        closeSpan.addEventListener('click', () => {
            productModal.style.display = 'none'; // Закрытие модального окна
            document.body.style.overflow = 'auto';
        });


        productModal.addEventListener('click', (event) => {
            if (event.target === productModal) {
                closeModal(productModal);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal(productModal);
            }
        });
    });
    handleScrollEventsForBoxes();
}




/// CART MODAL OPEN WINDOW SCRIPT
const openCartModalButton = document.getElementById('open-cart-modal');
const cartModal = document.getElementById('cart-modal');
const closeCartModalButton = document.getElementById('close-cart-modal');

openCartModalButton.addEventListener('click', () => {
  cartModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeCartModalButton.addEventListener('click', () => {
  cartModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});




// Обработчик для изменения категории
$(".category-button").click(function() {
    const categorySlug = $(this).data('category-slug'); // Предположим, что у нас есть data-атрибут для слага категории
    fetchProductsByCategory(categorySlug);
});

// Обработчики для элементов управления пагинацией могут быть добавлены аналогичным образом


// FULL_SIZE_IMAGE_MODAL
const fishImages = document.querySelectorAll('.fish-image');

fishImages.forEach((fishImage) => {
  fishImage.addEventListener('click', (e) => {
    const productDiv = e.target.closest('.box');
    const modalId = 'image-modal-' + productDiv.dataset.id;
    const modal = document.getElementById(modalId);
    const modalImage = modal.querySelector('.product-modal-image');
    const modalTitle = modal.querySelector('.product-modal-content h3');
    const modalCategory = modal.querySelector('.product-modal-content h4');

    modalImage.src = fishImage.src;
    modal.style.display = 'flex';

    const parentElement = fishImage.parentElement;
    if (parentElement) {
      const itemTitle = parentElement.querySelector('.item-title');
      if (itemTitle && modalTitle) {
        modalTitle.textContent = itemTitle.textContent;
      }
      const itemCategory = parentElement.querySelector('h4');
      if (itemCategory && modalCategory) {
        modalCategory.textContent = itemCategory.textContent;
      }
    }

    document.body.style.overflow = 'hidden';
  });
});

const closeProductModalButtons = document.querySelectorAll('.product-modal .close');

closeProductModalButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    const modal = closeButton.closest('.product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

window.addEventListener('click', (event) => {
  const productModals = document.querySelectorAll('.product-modal');
  productModals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const productModals = document.querySelectorAll('.product-modal');
    productModals.forEach((modal) => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
});








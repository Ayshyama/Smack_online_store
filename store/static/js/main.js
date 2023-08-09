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
       button.addEventListener('click', function() {
           // Удаляем класс "active" у всех кнопок
           categoryButtons.forEach(btn => {
               btn.classList.remove('active');
           });

           button.classList.add('active');
       });
   });



/// CART MODAL OPEN WINDOW SCRIPT
const openCartModalButton = document.getElementById('open-cart-modal');
const cartModal = document.getElementById('cart-modal');
const closeCartModalButton = document.getElementById('close-cart-modal');

openCartModalButton.addEventListener('click', () => {
  cartModal.style.display = 'block';
  // Disable the default scroll behavior when the cart modal is open
  document.body.style.overflow = 'hidden';
});

closeCartModalButton.addEventListener('click', () => {
  cartModal.style.display = 'none';
  // Restore the default scroll behavior when the cart modal is closed
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
    // Restore the default scroll behavior when the cart modal is closed
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    cartModal.style.display = 'none';
    // Restore the default scroll behavior when the cart modal is closed
    document.body.style.overflow = 'auto';
  }
});


// FULL_SIZE_IMAGE_MODAL
const fishImages = document.querySelectorAll('.fish-image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('product-modal-image');
const closeButton = document.getElementById('close');
const modalTitle = document.querySelector('.product-modal-content h3');
const modalCategory = document.querySelector('.product-modal-content h4');

fishImages.forEach((fishImage) => {
  fishImage.addEventListener('click', (e) => {
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

    const productModalDescription = document.querySelector('.product-modal-description');
    if (productModalDescription) {
      productModalDescription.textContent = e.target.getAttribute('data-description');
    }

    document.body.style.overflow = 'hidden';
  });
});

if (closeButton) {
  closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.id === 'close') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}
if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});








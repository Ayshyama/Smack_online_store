// Animations
window.onload = () => {
  const header = document.querySelector('header');
  const heading = document.querySelector('.products .heading');
  const productsContainer = document.querySelector('.products .products-container');
  const animationItems = document.querySelectorAll('.animation-item');
  const introContainers = document.querySelectorAll('.animation-item-second');

  initializeElements(header, heading, productsContainer, animationItems, introContainers);
  setupEventListeners();
  handleScrollEvents(header);
};

function initializeElements(header, heading, productsContainer, animationItems, introContainers) {
  introContainers.forEach((item) => {
    item.classList.add('animation-item-second');
    setTimeout(() => item.classList.add('show-item'), 10);
  });

  setTimeout(() => header.classList.add('show'), 10);
  setTimeout(() => {
    heading.classList.add('show');
    productsContainer.classList.add('show');
  }, 10);
  setTimeout(() => {
    animationItems.forEach(item => item.classList.add('show-item'));
  }, 10);
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
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}



// JavaScript код для плавной прокрутки с учетом отступа
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('.scroll-link');

  scrollLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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
    modalTitle.textContent = fishImage.parentElement.querySelector('.item-title').textContent;
    modalCategory.textContent = fishImage.parentElement.querySelector('h4').textContent;
    document.querySelector('.product-modal-description').textContent = e.target.getAttribute('data-description');
    // Disable the default scroll behavior when the modal is open
    document.body.style.overflow = 'hidden';
  });
});

closeButton.addEventListener('click', (event) => {
  event.stopPropagation();
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});







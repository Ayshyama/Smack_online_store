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

if (window.location.pathname === '/') {
  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
  });
} else {
  header.style.backgroundColor = '#1B1B1B';
}


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




// FULL_SIZE_IMAGE_MODAL
const fishImages = document.querySelectorAll('.fish-image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeButton = document.getElementById('close');

fishImages.forEach((fishImage) => {
  fishImage.addEventListener('click', () => {
    modalImage.src = fishImage.src;
    modal.style.display = 'block';
  });
});

closeButton.addEventListener('click', (event) => {
  event.stopPropagation();
  modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});


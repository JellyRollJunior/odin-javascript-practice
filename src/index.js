import './styles.css';

const toggleVisibility = function(element) {
  if (element.classList.contains('visible')) {
    element.classList.remove('visible');
  } else {
    element.classList.add('visible');
  }
}

const dropdownMenuButton = document.querySelector('.dropdown-menu-btn');
dropdownMenuButton.addEventListener('click', () => {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  toggleVisibility(dropdownMenu);
});
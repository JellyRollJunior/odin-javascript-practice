import './styles.css';

console.log('hello world');

const dropdownMenuButton = document.querySelector('.dropdown-menu-btn');
dropdownMenuButton.addEventListener('click', () => {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (dropdownMenu.classList.contains('visible')) {
    dropdownMenu.classList.remove('visible');
  } else {
    dropdownMenu.classList.add('visible');
  }
});

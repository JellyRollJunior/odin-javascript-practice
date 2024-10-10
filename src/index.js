import './styles.css';

const toggleVisibility = function (element) {
  if (element.classList.contains('visible')) {
    element.classList.remove('visible');
  } else {
    element.classList.add('visible');
  }
};

(function dropdownMenu() {
  const dropdownMenuButton = document.querySelector('.dropdown-menu-btn');
  dropdownMenuButton.addEventListener('click', () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    toggleVisibility(dropdownMenu);
  });

  class button {
    constructor(selector, action) {
      this.selector = selector;
      this.action = action;
    }

    bindEventListener() {
      const button = document.querySelector(this.selector);
      button.addEventListener('click', () => this.action());
    }
  }

  const edit = () => {
    console.log('You are editing!');
  };

  const copy = () => {
    console.log('You are copying!');
  };

  const deleteAction = () => {
    console.log('You are deleting!');
  };

  function bindDropdownMenuButtons(buttons) {
    buttons.forEach((button) => {
      button.bindEventListener();
    });
  }

  const dropdownMenuButtons = [
    new button('.dropdown-menu > .edit-btn', edit),
    new button('.dropdown-menu > .copy-btn', copy),
    new button('.dropdown-menu > .delete-btn', deleteAction),
  ];

  bindDropdownMenuButtons(dropdownMenuButtons);
})();

(function carousel() {
  
})();
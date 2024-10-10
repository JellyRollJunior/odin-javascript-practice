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
  const images = document.querySelector('.images');
  const numImages = images.children.length;
  const imageLength = images.clientWidth / numImages;
  let currentOffset = 0;

  function next() {
    currentOffset += imageLength;
    if (currentOffset >= images.clientWidth) {
      currentOffset = 0;
    }
    images.style.left = `-${currentOffset}px`;
  }

  const right = document.querySelector('.right');
  right.addEventListener('click', () => next());

  function previous() {
    currentOffset -= imageLength;
    // show last image if previous is clicked when showing first image
    if (currentOffset < 0) {
      currentOffset = imageLength * (numImages - 1);
    }
    images.style.left = `-${currentOffset}px`;
  }

  const left = document.querySelector('.left');
  left.addEventListener('click', () => previous());
})();

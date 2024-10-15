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
  const navButtonHolder = document.querySelector('.nav-btns');
  const numImages = images.children.length;
  const imageLength = images.clientWidth / numImages;
  let activeImageIndex = 0;

  function setCarouselImage(index) {
    const imageIndex = index % numImages;
    const imageOffset = imageLength * imageIndex;
    images.style.left = `-${imageOffset}px`;
  }

  function next() {
    activeImageIndex = (activeImageIndex + 1) % numImages;
    setCarouselImage(activeImageIndex);
  }

  const right = document.querySelector('.right');
  right.addEventListener('click', () => next());

  function previous() {
    // % is actually the remainder operator in javascript ... no modulo
    activeImageIndex = (((activeImageIndex - 1) % numImages) + numImages) % numImages;
    setCarouselImage(activeImageIndex);
  }

  const left = document.querySelector('.left');
  left.addEventListener('click', () => previous());

  function createNavButton(index) {
    const navButton = document.createElement('button');
    navButton.dataset.index = index;
    return navButton;
  }

  function createNavButtons() {
    for (let i = 0; i < numImages; i++) {
      const navButton = createNavButton(i);
      navButtonHolder.appendChild(navButton);
    }
  }

  function clearNavButtonsActiveStatus() {
    const navButtons = document.querySelectorAll(`.nav-btns > *`);
    navButtons.forEach((button) => {
      button.classList.remove('active');
    })
  }

  function handleClickNavButton(target) {
    clearNavButtonsActiveStatus();
    target.classList.add('active');
    const index = target.dataset.index;
    setCarouselImage(index);
  }

  function bindNavButtons() {
    const navButtons = document.querySelectorAll(`.nav-btns > *`);
    navButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target;
        handleClickNavButton(target);
      })
    })
  }

  createNavButtons();
  bindNavButtons();
  // Make first nav button active
  document.querySelector('.nav-btns > button:first-child').classList.add('active');
})();

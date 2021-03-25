// hamburger menu

const button = document.querySelector('#hamburger');
const popup = document.querySelector('#popup');
const body = document.querySelector('body');
const closeButton = document.querySelector('.popup__close');



const toggleMenu = () => {
  popup.classList.toggle('popup_show');
  body.classList.toggle('body_block-scroll');
}

button.addEventListener('click', toggleMenu);

const links = popup.querySelectorAll('.menu__link');

popup.addEventListener('click', (e) => {
  const target = e.target;
  const dataValue = target.dataset.scrollTo;
  if (target.classList.contains('menu__link')) {
    scrollToSection(dataValue);
    toggleMenu();
  } else if (target.classList.contains('popup__close')) {
    toggleMenu();
  }
})

const scrollToSection = (attr) => {
    const elem = document.querySelector(`[data-section-id=${attr}]`);
    window.scroll({
      left: 0,
      top: elem.offsetTop,
      behavior: "smooth"
    })
}
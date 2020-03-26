import $ from 'jquery';

export const toggleTitle = title => (title === 'Otwórz menu' ? 'Zamknij menu' : 'Otwórz menu');

export const toggleAriaExpanded = ariaExpanded => (ariaExpanded === 'true' ? 'false' : 'true');

export const updateHamburger = () => {
  const $hamburger = $('.hamburger-btn');
  const title = toggleTitle($hamburger.prop('title'));
  const ariaExpanded = toggleAriaExpanded($hamburger.attr('aria-expanded'));

  $hamburger.prop('title', title).attr('aria-expanded', ariaExpanded);

  return $hamburger;
};

export const toggleMenu = () => {
  const $navigation = $('#navbarSupportedContent');
  const time = 500;

  if (!$navigation.is(':animated')) {
    updateHamburger();
    $('.navbar').toggleClass('navbar--open');
    $navigation.slideToggle(time);
  }
};

const appReady = () => {
  const $hamburger = updateHamburger();
  $hamburger.on('click', toggleMenu);
};

$(appReady);

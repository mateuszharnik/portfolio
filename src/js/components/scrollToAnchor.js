import $ from 'jquery';

export const setFocusOnElement = (target) => {
  if (typeof target !== 'string') return false;

  const $target = $(target);
  $target.focus();

  if (!$target.is(':focus')) {
    $target.attr('tabindex', '-1').focus();
  }

  return true;
};

export const scrollTarget = (hash = 'body') => (typeof hash === 'string' && hash !== '#do-gory' ? $(hash).offset().top : 0);

export const getTarget = (hash, scrollTargetEl) => (scrollTargetEl(hash) === 0 ? '.navbar-brand' : hash);

const smoothScroll = (hash, time = 1000) => {
  if ($('html, body').is(':animated')) return;

  $('html, body').animate({
    scrollTop: scrollTarget(hash),
  }, time, () => {
    setFocusOnElement(getTarget(hash, scrollTarget));
  });
};

const scrollToAnchor = (event) => {
  const time = 1000;

  if (event.target.hash || $(event.target).hasClass('d-none')) {
    event.preventDefault();
    const target = event.target.hash ? event.target.hash : event.target.parentElement.hash;
    smoothScroll(target, time);
  }
};

const appReady = () => {
  $('.skip-link').on('click', event => setFocusOnElement(event.target.hash));

  $.each($('#navbarSupportedContent, .arrow-btn, .scroll-top-btn'), (_, element) => $(element).on('click', scrollToAnchor));
};

$(appReady);

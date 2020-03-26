import $ from 'jquery';
import {
  toggleTitle, toggleAriaExpanded, updateHamburger, toggleMenu,
} from '../src/js/components/navbar';

const hamburgerBtn = '<button class="hamburger-btn" title="Zamknij menu" aria-expanded="true" ></button>';
const navbar = '<nav class="navbar navbar-expand-lg navbar-light bg-white"></nav>';

describe('toggleMenu', () => {
  it('Should change class in navbar', () => {
    document.body.innerHTML = `${navbar}`;

    expect($('.navbar').hasClass('navbar--open')).toBe(false);
    toggleMenu();
    expect($('.navbar').hasClass('navbar--open')).toBe(true);
  });
});

describe('updateHamburger', () => {
  it('Should be defined', () => {
    expect(updateHamburger()).toBeDefined();
  });
  it('Should change aria-expanded attribute in hamburger button', () => {
    document.body.innerHTML = hamburgerBtn;

    expect($('.hamburger-btn').attr('aria-expanded')).toBe('true');
    updateHamburger();
    expect($('.hamburger-btn').attr('aria-expanded')).toBe('false');
  });
  it('Should change title in hamburger button', () => {
    document.body.innerHTML = hamburgerBtn;

    expect($('.hamburger-btn').prop('title')).toBe('Zamknij menu');
    updateHamburger();
    expect($('.hamburger-btn').prop('title')).toBe('Otwórz menu');
  });
  it('Should return hamburger element', () => {
    document.body.innerHTML = hamburgerBtn;

    expect(updateHamburger()[0].className).toBe('hamburger-btn');
  });
});

describe('toggleTitle', () => {
  it('Should be defined', () => {
    expect(toggleTitle()).toBeDefined();
  });
  it('Should return "Otwórz menu"', () => {
    expect(toggleTitle()).toBe('Otwórz menu');
    expect(toggleTitle(null)).toBe('Otwórz menu');
    expect(toggleTitle(undefined)).toBe('Otwórz menu');
    expect(toggleTitle(1)).toBe('Otwórz menu');
    expect(toggleTitle(0)).toBe('Otwórz menu');
    expect(toggleTitle('')).toBe('Otwórz menu');
    expect(toggleTitle(NaN)).toBe('Otwórz menu');
    expect(toggleTitle([])).toBe('Otwórz menu');
    expect(toggleTitle({})).toBe('Otwórz menu');
    expect(toggleTitle(false)).toBe('Otwórz menu');
    expect(toggleTitle('Zamknij menu')).toBe('Otwórz menu');
  });
  it('Should return "Zamknij menu"', () => {
    expect(toggleTitle('Otwórz menu')).toBe('Zamknij menu');
  });
  it('Should not return "Zamknij menu"', () => {
    expect(toggleTitle('Zamknij menu')).not.toBe('Zamknij menu');
  });
  it('Should not return "Otwórz menu"', () => {
    expect(toggleTitle('Otwórz menu')).not.toBe('Otwórz menu');
  });
});

describe('toggleAriaExpanded', () => {
  it('Should be defined', () => {
    expect(toggleAriaExpanded()).toBeDefined();
  });
  it('Should return "true"', () => {
    expect(toggleAriaExpanded()).toBe('true');
    expect(toggleAriaExpanded(null)).toBe('true');
    expect(toggleAriaExpanded(undefined)).toBe('true');
    expect(toggleAriaExpanded(1)).toBe('true');
    expect(toggleAriaExpanded(0)).toBe('true');
    expect(toggleAriaExpanded('')).toBe('true');
    expect(toggleAriaExpanded(NaN)).toBe('true');
    expect(toggleAriaExpanded([])).toBe('true');
    expect(toggleAriaExpanded({})).toBe('true');
    expect(toggleAriaExpanded(false)).toBe('true');
    expect(toggleAriaExpanded('false')).toBe('true');
  });
  it('Should return "false"', () => {
    expect(toggleAriaExpanded('true')).toBe('false');
  });
  it('Should not return "false"', () => {
    expect(toggleAriaExpanded('false')).not.toBe('false');
  });
  it('Should not return "true"', () => {
    expect(toggleAriaExpanded('true')).not.toBe('true');
  });
});

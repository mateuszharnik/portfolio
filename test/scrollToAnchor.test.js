import $ from 'jquery';
import { setFocusOnElement, scrollTarget, getTarget } from '../src/js/components/scrollToAnchor';

const h3 = '<h3 class="font-weight-bold" id="o-mnie">O mnie</h3>';
const link = '<a class="arrow-btn" href="#o-mnie"></a>';

const fakeScrollTarget = hash => (hash !== '#do-gory' ? 100 : 0);

describe('getTarget', () => {
  it('Should be definde', () => {
    expect(getTarget('#do-gory', scrollTarget)).toBeDefined();
  });
  it('Should return ".navbar-brand" if first argument is "#do-gory"', () => {
    expect(getTarget('#do-gory', fakeScrollTarget)).toBe('.navbar-brand');
  });
  it('Should return first argument if first argument is not "#do-gory"', () => {
    expect(getTarget('#o-mnie', fakeScrollTarget)).toBe('#o-mnie');
  });
});

describe('scrollTarget', () => {
  it('Should be definde', () => {
    expect(scrollTarget()).toBeDefined();
  });
  it('Should return 0 if argument is "#do-gory"', () => {
    expect(scrollTarget('#do-gory')).toBe(0);
  });
  it('Should return number if argument is type of string', () => {
    document.body.innerHTML = h3;
    expect(typeof scrollTarget('#o-mnie')).toBe('number');
  });
  it('Should return 0 if argument is not type of string', () => {
    expect(scrollTarget(false)).toBe(0);
    expect(scrollTarget(1)).toBe(0);
    expect(scrollTarget({})).toBe(0);
    expect(scrollTarget([])).toBe(0);
    expect(scrollTarget(NaN)).toBe(0);
    expect(scrollTarget(null)).toBe(0);
  });
});

describe('setFocusOnElement', () => {
  it('Should be definde', () => {
    expect(setFocusOnElement()).toBeDefined();
  });
  it('Should return false if target is not type of string', () => {
    expect(setFocusOnElement()).toBe(false);
    expect(setFocusOnElement(0)).toBe(false);
    expect(setFocusOnElement(1)).toBe(false);
    expect(setFocusOnElement(null)).toBe(false);
    expect(setFocusOnElement(NaN)).toBe(false);
    expect(setFocusOnElement([])).toBe(false);
    expect(setFocusOnElement({})).toBe(false);
    expect(setFocusOnElement(undefined)).toBe(false);
  });
  it('Should return true if target is type of string', () => {
    expect(setFocusOnElement('')).toBe(true);
  });
  it('Element should has focus or tabindex', () => {
    document.body.innerHTML = `${link}${h3}`;

    expect($('.arrow-btn').is(':focus')).toBe(false);
    expect(setFocusOnElement('.arrow-btn')).toBe(true);
    expect($('.arrow-btn').is(':focus')).toBe(true);

    expect($('#o-mnie').is(':focus')).toBe(false);
    expect(setFocusOnElement('#o-mnie')).toBe(true);
    expect($('#o-mnie').attr('tabindex')).toBe('-1');
  });
});

/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let start = performance.now();
const ul = document.querySelector("#navbar__list");
const data_nav = document.querySelectorAll("section[data-nav]");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const elementCreater = (element, text, classinfo) => {
  const elementContainer = document.createElement(element);
  if (text !== undefined || classinfo !== undefined) {
    element_with_attributes = attributesAutomation(
      element,
      elementContainer,
      text,
      classinfo
    );
    return element_with_attributes;
  } else {
    return elementContainer;
  }
};

const attributesAutomation = (elementTag, element, text, classInfo) => {
  if (elementTag == "a") {
    const href = document.createAttribute("href");
    href.value = `#${text.id}`;
    element.setAttributeNode(href);
  }
  element.textContent = text.dataset.nav;
  element.className = classInfo;
  return element;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const navElementsAdder = () => {
  for (let i = 0; i < data_nav.length; i++) {
    const liTag = elementCreater("li");
    const aTag = elementCreater("a", data_nav[i], "menu__link");
    liTag.appendChild(aTag);
    ul.appendChild(liTag);
  }
};
// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("DOMContentLoaded", navElementsAdder);

let end = performance.now();
console.log("performance Metric of code " + (end - start));
// Scroll to section on link click

// Set sections as active

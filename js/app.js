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

const Page_yCoord_IntervalSection = menuLink_index => {
  const interval_between_sections = 800;
  const yCoord_page_libary = [400];
  for (let i = 1; i < data_nav.length; i++) {
    let yCoordAdd = yCoord_page_libary[i - 1] + interval_between_sections;
    yCoord_page_libary.push(yCoordAdd);
  }
  return yCoord_page_libary[menuLink_index];
};

const add_class = element_target => {
  const section = document.querySelector(element_target.hash);
  section.classList.add("your-active-class");
};

const remove_class = () => {
  for (section of data_nav) {
    section.classList.remove("your-active-class");
  }
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
const scoller = event => {
  const menu_links = document.querySelectorAll(".menu__link");
  for (let indexOfLink = 0; indexOfLink < menu_links.length; indexOfLink++) {
    if (
      event.target.attributes.href.value ==
      menu_links[indexOfLink].attributes.href.value
    ) {
      event.preventDefault();
      const ycoord = Page_yCoord_IntervalSection(indexOfLink);
      window.scrollTo({ top: ycoord, behavior: "smooth" });
      remove_class();
      add_class(event.target);
    }
  }
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("DOMContentLoaded", navElementsAdder);

// Scroll to section on link click
document.addEventListener("click", scoller);
let end = performance.now();
console.log("performance Metric of code " + (end - start));
// Set sections as active

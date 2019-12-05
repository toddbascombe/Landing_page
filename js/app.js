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

const ul = document.querySelector("#navbar__list");
const data_nav = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//create elements and assign some elements with attributes
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

//help the elementcreater() by creating and setting attributes
const attributesAutomation = (elementTag, element, text, classInfo, isDataNav=false) => {
  if (elementTag == "a") {
    const href = document.createAttribute("href");
    href.value = `#${text.id}`;
    element.setAttributeNode(href);
  }
  // if(isDataNav){
  //   const data_nav_att = document.createAttribute("data-nav");
  //   data_nav_att.value = text;
  //   element.
  // }
  element.textContent = text.dataset.nav;
  element.className = classInfo;
  return element;
};

//targets area in a page to view the section selected
const Page_yCoord_IntervalSection = menuLink_index => {
  const interval_between_sections = 800;
  const yCoord_page_libary = [400];
  for (let i = 1; i < data_nav.length; i++) {
    let yCoordAdd = yCoord_page_libary[i - 1] + interval_between_sections;
    yCoord_page_libary.push(yCoordAdd);
  }
  return yCoord_page_libary[menuLink_index];
};

//add a class to a element
const add_class = (element_target, class_name) => {
  const section = document.querySelector(element_target.hash);
  section.classList.add(class_name);
};
//remove a class from a list of elements
const remove_class = class_name => {
  for (section of data_nav) {
    section.classList.remove(class_name);
  }
};

const elements_location = (scrollY) =>{
  for(ele of data_nav){
    if(ele.getBoundingClientRect().top <= window.scrollY && ele.getBoundingClientRect().bottom > window.scrollY){
        return ele;
    }
  }
}

// const add_section_info = (text)=>{
//   const section_count= data_nav.length;
//   const sectionElement = elementCreater("section", text, )
// }
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
      // Set sections as active
      remove_class("your-active-class");
      add_class(event.target, "your-active-class");
    }
  }
};



//active links when scrolling 
const scroll_active_links = () =>{
  const menu_links = document.querySelectorAll(".menu__link");
  const element_selected = elements_location(window.scroolY);
  for(let i = 0; i < menu_links.length; i++){
    if(menu_links[i].attributes.href.value === `#${element_selected.id}`){
      menu_links[i].style.cssText = "background-color: green";
    }
    if(menu_links[i].attributes.href.value !== `#${element_selected.id}`){
      menu_links[i].style.cssText = "background-color:#fff";
    }
  }
}

//add section dynamically
const section_content = ()=>{
  const main = document.querySelector("main");
  const section = document.createElement('section');
  const data = document.createAttribute("data-nav");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  data.value= "section 4";
  section.setAttributeNode(data);
  div.className = "landing__container";
  h2.textContent = "section 4";
  p.textContent = "todd is the best";
  
  div.appendChild(h2);
  div.appendChild(p);
  section.appendChild(div);
  main.appendChild(section);

}
/**
 * End Main Functions
 * Begin Events
 *
 */

// window.addEventListener("DOMContentLoaded",add_section);
// Build menu

window.addEventListener("DOMContentLoaded", navElementsAdder);
window.addEventListener("DOMContentLoaded", section_content, true);
// Scroll to section on link click
document.addEventListener("click", scoller);
//event handler for scrolling 
window.addEventListener("scroll",scroll_active_links);

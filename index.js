"use strict";
import pets from './pets.json' assert {type: 'json'};

  const petsLargeScreens = [...pets, pets[0]];

  // PAGINATION
  const screenArrays = {
    large: new Array(6).fill(0).map(() => pets.slice().sort(() => Math.random() - 0.5)),
    medium: new Array(8).fill(0).map(() => pets.slice().sort(() => Math.random() - 0.5)),
    small: new Array(16).fill(0).map(() => pets.slice().sort(() => Math.random() - 0.5)),
  };

  document.addEventListener("DOMContentLoaded", function() {
    const petsSlider = document.querySelector('.pets-slider-line');  
    const buttonNumber = document.querySelector('.button-number');
    const buttonRight = document.querySelector('.button-right');
    const buttonLeft = document.querySelector('.button-left');
    const buttonDoubleLeft = document.querySelector('.button-double-left');
    const buttonDoubleRight = document.querySelector('.button-double-right');
  
    if (petsSlider) {
      let page = 1;
      let selectedArray;
      let maxPages;
      
    function updateScreenArrays() {
      const screenWidth = document.documentElement.clientWidth; 
      if (screenWidth >= 1200) {
        selectedArray = screenArrays.large;
        maxPages = 6;
        page = 1;
        buttonNumber.innerHTML = page;
      } else if (screenWidth >= 768) {
        selectedArray = screenArrays.medium;
        maxPages = 8;
        page = 1;
        buttonNumber.innerHTML = page;
      } else {
        selectedArray = screenArrays.small;
        maxPages = 16;
        page = 1;
        buttonNumber.innerHTML = page;
      }
      workPopup();
    }

    updateScreenArrays();  
    addPetsToPage();
    window.addEventListener("resize", updateScreenArrays);

    function addPetsToPage(numberOfPages = 0) {
      let index = numberOfPages;
      
      while (petsSlider.firstChild) {
        petsSlider.removeChild(petsSlider.firstChild);
      }

      if (numberOfPages === maxPages) {
        index = 0;
      }

      if (numberOfPages >= maxPages + 1 ) {
        return;
      }

        for (const pet of selectedArray[index]) {
          const sliderItem = document.createElement('div');
          sliderItem.classList.add('pets-slider-item');
    
          const img = document.createElement('img');
          img.src = pet.img;
          img.alt = `${pet.name}`;
          img.width = 270;
          img.height = 270;
    
          const name = document.createElement('p');
          name.classList.add('pets-slider-item-name');
          name.textContent = pet.name;
    
          const button = document.createElement('button');
          button.classList.add('pets-slider-item-btn');
          button.textContent = 'Learn more';
    
          sliderItem.appendChild(img);
          sliderItem.appendChild(name);
          sliderItem.appendChild(button);
    
          petsSlider.appendChild(sliderItem);

          setTimeout(() => {
            sliderItem.style.opacity = 1;
          }, 10); 
          workPopup();
        }
  
    }

    buttonNumber.innerHTML = page;

    if (page >= maxPages) {
      buttonRight.classList.remove('button-disabled');
      buttonDoubleRight.classList.remove('button-disabled');
    }

    if (page === 1) {
      buttonLeft.contentEditable = "false";
      buttonLeft.classList.add('button-disabled');
      buttonDoubleLeft.classList.add('button-disabled');
    }
    
    buttonRight.addEventListener('click', () => {
      if (page === maxPages - 1 ) {
        buttonRight.classList.add('button-disabled');
        buttonDoubleRight.classList.add('button-disabled');
      };
      if (page === maxPages) {
        buttonRight.classList.add('button-disabled');
        return;
      };
      if (page >= 1) {
        buttonLeft.classList.remove('button-disabled');
        buttonDoubleLeft.classList.remove('button-disabled');
      }
      page += 1;
      buttonNumber.innerHTML = page;
      addPetsToPage(page);
    })
  
  
    buttonLeft.addEventListener('click', () => {
      if  (page === 1) return;
      if (page <= 2) {
        buttonLeft.contentEditable = "false";
        buttonLeft.classList.add('button-disabled');
        buttonDoubleLeft.classList.add('button-disabled');
        page = 1;
        buttonNumber.innerHTML = page;
        addPetsToPage(page);
        return;
      }
      buttonLeft.classList.remove('button-disabled');
      buttonRight.classList.remove('button-disabled');
      buttonDoubleRight.classList.remove('button-disabled');
      page -= 1;
      buttonNumber.innerHTML = page;
      addPetsToPage(page);
    })  

    buttonDoubleLeft.addEventListener('click', () => {
      if (page === 1) return;
      page = 1;
      buttonNumber.innerHTML = page;
      buttonLeft.classList.add('button-disabled');
      buttonDoubleLeft.classList.add('button-disabled');
      buttonRight.classList.remove('button-disabled');
      buttonDoubleRight.classList.remove('button-disabled');
      addPetsToPage(page);
    })
    buttonDoubleRight.addEventListener('click', () => {
      if (page === maxPages) return;
      page = maxPages;
      buttonNumber.innerHTML = page;
      buttonLeft.classList.remove('button-disabled');
      buttonDoubleLeft.classList.remove('button-disabled');
      buttonRight.classList.add('button-disabled');
      buttonDoubleRight.classList.add('button-disabled');
      addPetsToPage(page);
    })
  }

});
  /////////////////////// SLIDER /////////////////////////////////////////
  const sliderLine = document.querySelector(".slider-line");
  document.addEventListener('DOMContentLoaded', function () { 
    if (sliderLine) {
      function addPetsToSlider() {
      for (const pet of petsLargeScreens) {
      const sliderItem = document.createElement('div');
      sliderItem.classList.add('slider-item');
      
      const img = document.createElement('img');
      img.src = pet.img;
      img.alt = `${pet.name}`;
      img.width = 270;
      img.height = 270;
      
      const name = document.createElement('p');
      name.classList.add('slider-item-name');
      name.textContent = pet.name;
      
      const button = document.createElement('button');
      button.classList.add('slider-item-btn');
      button.textContent = 'Learn more';
      
      
      sliderItem.appendChild(img);
      sliderItem.appendChild(name);
      sliderItem.appendChild(button);
      
      sliderLine.appendChild(sliderItem);
      }
      }
      addPetsToSlider();
    }
    workPopup();
  });

let offSet = 0;

document.querySelector(".left-button")?.addEventListener("click", () => {
  event.preventDefault();


  if (offSet === 0) {
    offSet = -2218.5;
  }
  offSet += 369.75;
  sliderLine.style.left = offSet + "px";
});

document.querySelector(".right-button")?.addEventListener("click", () => {
  event.preventDefault();
  if (offSet === -1848.75) {
    sliderLine.style.left = 0 + "px";
    offSet = 0;
    return;
  }
  offSet -= 369.75;
  sliderLine.style.left = offSet + "px";
});

//////////////////////////BURGER //////////////////////////
const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuNavigation = document.querySelector(".burger-menu-navigation");
let burgerMenuIsOpen = false;


function handleBurgerMenu() {
  burgerMenuIsOpen = !burgerMenuIsOpen;
  burgerMenu.classList.toggle("active");
  burgerMenuNavigation.classList.toggle("active");
};

burgerMenu.addEventListener("click", () => {
  handleBurgerMenu();
  burgerMenuIsOpen ? document.body.classList.add('disable-scroll') : document.body.classList.remove('disable-scroll');

})

const menuItems = document.querySelectorAll(".nav-burger-menu-item");

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    handleBurgerMenu();
    document.body.classList.remove('disable-scroll')
    })
});

////////POP-UP//////////////////////////////////
  function workPopup() {
    const cardElements = document.querySelectorAll('.pets-slider-item');
    const sliderElements = document.querySelectorAll('.slider-item');
    console.log(sliderElements);
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.popup-close'); 
    const overlay = document.querySelector('.overlay');
    const popupTitle = document.querySelector('.popup-title');
    const popupSubtitle = document.querySelector('.popup-subtitle');
    const popupDescription = document.querySelector('.popup-description');
    const popupListAge = document.querySelector('.popup-list-age');
    const popuListInoculations = document.querySelector('.popup-list-inoculations');
    const popupListDiseases = document.querySelector('.popup-list-diseases');
    const popupListParasites = document.querySelector('.popup-list-parasites');
    const popupImageWrapper = document.querySelector('.popup-image-wrapper');
    const imgElement = popupImageWrapper.querySelector('img');
    
    cardElements.forEach((card) => {
      card.addEventListener('click', () => {
        const name = card.querySelector('.pets-slider-item-name').textContent;
        const fullInfo = pets.filter(el => el.name === name);
        popupTitle.innerHTML = fullInfo[0].name;
        popupSubtitle.innerHTML = `${fullInfo[0].type} - ${fullInfo[0].breed}`;
        popupDescription.innerHTML = fullInfo[0].description;
        popupListAge.innerHTML = fullInfo[0].age;
        popuListInoculations.innerHTML = fullInfo[0].inoculations;
        popupListDiseases.innerHTML = fullInfo[0].diseases;
        popupListParasites.innerHTML = fullInfo[0].parasites;
        imgElement.setAttribute('src', fullInfo[0].img);
        popup.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (sliderElements) {
      sliderElements.forEach((card) => {
        card.addEventListener('click', () => {
          const name = card.querySelector('.slider-item-name').textContent;
          const fullInfo = pets.filter(el => el.name === name);
          popupTitle.innerHTML = fullInfo[0].name;
          popupSubtitle.innerHTML = `${fullInfo[0].type} - ${fullInfo[0].breed}`;
          popupDescription.innerHTML = fullInfo[0].description;
          popupListAge.innerHTML = fullInfo[0].age;
          popuListInoculations.innerHTML = fullInfo[0].inoculations;
          popupListDiseases.innerHTML = fullInfo[0].diseases;
          popupListParasites.innerHTML = fullInfo[0].parasites;
          imgElement.setAttribute('src', fullInfo[0].img);
          popup.style.display = 'block';
          overlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
        });
      });
    }
    
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  workPopup();


const shelterRequirements1 = {
  mainPage_60: {
    "Layout check: +7": {
      "The page layout is valid": "+4",
      "The logo in the header consists of text elements": "+1",
      "The page contains exactly one element <h1>": "+1",
      "Added favicon": "+1",
    },
    "Layout corresponds to layout: +35": {
      "block <header>": "+5",
      "block Not only": "+5",
      "About block": "+5",
      "Our Friends block": "+5",
      "Help block": "+5",
      "block In addition": "+5",
      "block <footer>": "+5",
    },
    "CSS requirements: +6": {
      "Grid layout (flexbox or grid) was used to position Help block elements":
        "+2",
      "When the browser page scale is reduced or the page width is increased (>1280px), the layout is placed in the center, and is not shifted to the side or stretched across the entire width":
        "+2",
      "Background color spans the entire width of the page": "+2",
    },
    "Element interactivity: +12": {
      "The About the Shelter element in the navigation is highlighted and non-interactive, the rest of the navigation elements are interactive":
        "+2",
      "Each card with a pet in the Our Friends block is interactive when you hover over any area of this card":
        "+2",
      "Smooth scrolling on anchors": "+2",
      "All reference connections are executed according to the List of reference connections for the Main page":
        "+2",
      "Interactivity of links and buttons has been implemented. Interactivity is not only about changing the appearance of the cursor, for example, using the cursor: pointer property, but also about using other visual effects, for example, changing the background color or font color, according to the style guide in the layout. If styles are not specified in the layout, implement them at your own discretion, guided by the general layout style":
        "+2",
      "Mandatory requirement for interactivity: smooth change in the appearance of an element when hovering and clicking, without affecting neighboring elements":
        "+2",
    },
  },
  petsPage_40: {
    "Layout check: +7": {
      "The page layout is valid": "+4",
      "The logo in the header consists of text elements": "+1",
      "The page contains exactly one element <h1>": "+1",
      "Added favicon": "+1",
    },
    "Layout corresponds to layout: +15": {
      "block <header>": "+5",
      "Our Friends block": "+5",
      "block <footer>": "+5",
    },
    "CSS requirements: +4": {
      "When the browser page scale is reduced or the page width is increased (>1280px), the layout is placed in the center, and is not shifted to the side or stretched across the entire width":
        "+2",
      "Background color spans the entire width of the page": "+2",
      "Element interactivity": "+14",
      "The Our pets element in the navigation is highlighted and non-interactive, the rest of the navigation elements are interactive":
        "+2",
      "Available pagination buttons (right) are active, inaccessible (left) - inactive (disabled)":
        "+2",
      "Each card with a pet in the Our Friends block is interactive when you hover over any area of this card":
        "+2",
      "Smooth scrolling on anchors": "+2",
      "All link connections are carried out according to the List of link connections for the Pets page":
        "+2",
      "Interactivity of links and buttons has been implemented. Interactivity is not only about changing the appearance of the cursor, for example, using the cursor: pointer property, but also about using other visual effects, for example, changing the background color or font color, according to the style guide in the layout. If styles are not specified in the layout, implement them at your own discretion, guided by the general layout style":
        "+2",
      "Mandatory requirement for interactivity: smooth change in the appearance of an element when hovering and clicking, without affecting neighboring elements":
        "+2",
    },
  },
};

const shelterRequirements2 = {
  "The layout of the Main page corresponds to the layout with a screen width of 1280px: +14": {
    "block <header>": "+2",
    "Not only block": "+2",
    "About block": "+2",
    "Our Friends block": "+2",
    "Help block": "+2",
    "block In addition": "+2",
    "block <footer>": "+2",
  },
  "The layout of the Main page corresponds to the layout with a screen width of 768px: +14": {
    "block <header>": "+2",
    "Not only block": "+2",
    "About block": "+2",
    "Our Friends block": "+2",
    "Help block": "+2",
    "block In addition": "+2",
    "block <footer>": "+2",
  },
  "The layout of the Main page corresponds to the layout with a screen width of 320px: +14": {
    "block <header>": "+2",
    "Not only block": "+2",
    "About block": "+2",
    "Our Friends block": "+2",
    "Help block": "+2",
    "block In addition": "+2",
    "block <footer>": "+2",
  },
  "The layout of the Pets page corresponds to the layout with a screen width of 1280px: +6": {
    "block <header>": "+2",
    "Our Friends block": "+2",
    "block <footer>": "+2",
  },
  "The layout of the Pets page corresponds to the layout with a screen width of 768px: +6": {
    "block <header>": "+2",
    "Our Friends block": "+2",
    "block <footer>": "+2",
  },
  "The layout of the Pets page corresponds to the layout with a screen width of 320px: +6": {
    "block <header>": "+2",
    "Our Friends block": "+2",
    "block <footer>": "+2",
  },
  "At none of the resolutions up to 320px inclusive does a horizontal scroll bar appear, and white fields do not appear to the right of individual blocks. All page content is preserved: not cropped or deleted: +20": {
    "no scrollbar when Main page width is from 1280px to 768px": "+5",
    "no scrollbar when Main page width is from 768px to 320px": "+5",
    "no scrollbar when Pets page width is from 1280px to 768px": "+5",
    "no scrollbar when Pets page width is from 768px to 320px": "+5",
  },
  "The layout is rubber: when the screen size smoothly changes from 1280px to 320px, the layout adapts to this size, the layout elements change their size and location, do not run over each other, images can change size, but maintain the correct proportions: +8": {
    "on the Main page": "+4",
    "on the Pets page": "+4",
  },
  "When the screen width is less than 768px, the menu in the header is hidden on both pages, and the burger menu icon appears: +4": {
    "Opening a menu when clicking on the burger menu icon is not checked at the current stage":
      "",
  },

  "The layout of both pages is valid: to check the validity of the layout, use the service https://validator.w3.org/":
    "+8",
};

const shelterRequirements3 = {
  "Implementation of burger menu on both pages - My total point - 24": {
    "When the page width is less than 768px, the navigation bar is hidden, and a burger icon appears: +2": "+2",
    "When you click on the burger icon, a 320px wide adaptive menu smoothly appears on the right, the burger icon smoothly rotates 90 degrees: +4": "+4",
    "Responsive menu height takes up the entire screen height: +2": "+2",
    "When you click on the burger icon again or on a space free from the burger menu, the adaptive menu smoothly disappears, moving off the right side of the screen, the burger icon smoothly rotates 90 degrees back: +4": "+4",
    "Burger icon created using HTML+CSS, without using images: +2": "+2",
    "Links in the adaptive menu work, providing smooth scrolling along anchors, the requirements for interactivity of menu elements specified at the first stage of the task are saved: +2": "+2",
    "When you click on any link (interactive or non-interactive) in the menu, the adaptive menu smoothly disappears to the right, the burger icon rotates 90 degrees back: +2": "+2",
    "The location and size of the elements in the burger menu corresponds to the layout (vertical and horizontal centering of menu elements, icon placement). At the same time, on the Pets page, the color scheme can be either dark or light: +2": "+2",
    "The area free of the burger menu is darkened: +2": "+2",
    "The page under the burger menu does not scroll: +4": "+4",
  },
  "Implementation of a carousel slider on the Main page - My total point - 0": {
    "When you click on the arrows, you move to a new block of elements: +4": "+4",
    "Changing blocks occurs with the corresponding carousel animation (the method of performing the animation is not checked): +4": "+4",
    "The slider is endless, i.e., you can press left or right endlessly, and each time you will scroll in that direction with a new set of cards: +4": "+4",
    "When switching left or right, exactly as many cards are scrolled as are shown at the current screen width (3 for 1280px, 2 for 768px, 1 for 320px): +4": "+4",
    "Each new slide contains a pseudo-random set of animal cards, i.e., is formed from initial objects in random order with the following conditions": {
      "Cards with pets are not repeated in the current block of the slide: +4": "+4",
      "In the next block, there is no duplication of cards with the current block. For example, in a slider of 3 elements, the next slide out will contain 3 (out of 8 available) new pet cards, such as were not among the 3 cards on the previous slide out: +4": "+4",
      "Only one previous state is retained. Those. by sequentially moving twice to the left, and then twice to the right, we will get a set of cards different from the original one: +4": "+4",
      "Each time the page is reloaded, a new sequence of cards is formed: +2": "+2",
      "Sets of cards are generated based on 8 objects with animal data: +2": "+2",
      "When the screen width changes (from 1280px to 320px and back), the slider is rebuilt and works without reloading the page (the set of cards can either change or remain the same, hiding the extra one or adding the missing one, while maintaining the requirements described for the slider): +4": "+4",
    },
  },
  "Implementation of pagination on the Pets page - My total point - 16": {
    "When the page is reloaded, the first pagination page always opens: +2": "+2",
    "Pressing the > or < buttons opens the next or previous pagination page, respectively: +2": "+2",
    "When you press the >> or << buttons, the last or first pagination page opens, respectively: +2": "+2",
    "When opening the first page, the << and < buttons are inactive: +2": "+2",
    "When opening the last page, the > and >> buttons are inactive: +2": "+2",
    "The circle in the center indicates the current page number. When switching pages, the number changes to the current one: +2": "+2",
    "Each pagination page contains a pseudo-random set of pets, i.e. is formed from initial objects in random order with the following conditions": {
      "When the page loads, an array of 48 pet objects is formed. Each of the 8 pets must be encountered exactly 6 times: +4": "+4",
      "Every time the page is reloaded, a new array with a random sequence is formed: +4": "+4",
      "Pet cards should not be repeated on the same page: +4": "+4",
      "When switching pages, the data changes (for >1280px the order of cards changes, for the rest - the set and order of cards changes): +4": "+4",
      "With the same size of the pagination area, including the size of the browser window, and without reloading the page, returning to the page under a certain number, the content on it will always be the same. Those. pet cards will be in the same location as they were before moving to other pages: +2": "+2",
      "Total number of pages with a screen width of 1280px - 6, with 768px - 8, with 320px - 16 pages: +2": "+2",
      "When the screen width changes (from 1280px to 320px and back), the pagination is rebuilt and works without reloading the page (the page can remain the same or switch, while the generated array - the general sequence of cards - is not updated, all other requirements for pagination are preserved): +4": "+4",
    },
  },
  "Implementation of popups on both pages - My total point - 10": {
    "A pop-up appears when you click on any place on the card with a description of a specific animal: +2": "+2",
    "Part of the page outside the popup is darkened: +2": "+2",
    "When opening a popup, the vertical scroll of the page becomes inactive, when closing it becomes active again: +2": "+2",
    "When you click on the area around the popup or on the button with a cross, the popup closes, while when you click on the popup itself, nothing happens: +2": "+2",
    "Interactive cross button: +2": "+2",
    "The popup window (not counting the button with a cross) is centered on all axes, the sizes of the popup elements and their location coincide with the layout: +2": "+2",
  },
};

console.log(shelterRequirements1);
console.log(shelterRequirements2);
console.log(shelterRequirements3);

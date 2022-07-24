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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const dispatcherObj = {
    createNavLink: function (sections, i) {
        const navLink = document.createElement('a');
        navLink.innerHTML = sections[i].attributes[1].nodeValue;
        const sectionId = sections[i].attributes[0].textContent;
        navLink.setAttribute('href', `#${sectionId}`);
        navLink.classList.add("menu__link");
        
        return navLink;
    },
    isInViewPort: function (elem) { // get the bound accurately through comparison to the window height and width
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};



let i = 0;
const sections = document.querySelectorAll('section');
const landinContainer = document.querySelectorAll('.landing__container');
let sectionsLength = sections.length;
const label = document.createElement('label');
const navMenu = document.querySelector('.navbar__menu');
const navBar = document.querySelector('.navbar__list');
const burgerIcon = document.querySelector('.burger');




/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavLink(sections, index) {
    if (sectionsLength > 0) {
        for (let i = index; i < sectionsLength; i++) {
            const navItem = document.createElement('li');
            const navLink = dispatcherObj.createNavLink(sections, i);
            navItem.appendChild(navLink);
            navBar.appendChild(navItem);
        }
    }
}


// close side bar on small screens
const closeSideBar = function() {
    if (window.innerWidth <= 786) {
        const mainTag = document.querySelector('main');
        mainTag.addEventListener('click', function() {
            navBar.classList.remove('show-nav');
            // console.log('hi')
        });
        
            navBar.addEventListener('click', function(e){
                if (e.target.nodeName === 'A') {
                    navBar.classList.remove('show-nav');
                }
                
            })
        
    }
}


// add active section effect on scroll
const AddSectionActiveClass = function () {
    let currentSecWithActive = '';
    for(let currSec of sections) {
        if (currSec.classList.contains('your-active-class')) {
            currentSecWithActive = currSec;   
            
        }   
    }
for (let sec of sections) {
    // this.isInViewPort(sec) || Math.round(sec.getBoundingClientRect().top === 150)
    //scrollY >= section[n].offsetTOP was not so much accurate 
   
    if (dispatcherObj.isInViewPort(sec)) {
        if(!sec.classList.contains('your-active-class')) {
            
            currentSecWithActive.classList.remove('your-active-class');
            sec.classList.add('your-active-class');
            
        }    
    } // end-if
}
} 

// add active class on links when clicked
function AddActiveLinkClass() {
    let current = [];
    for (let currLink of links) {
        if (currLink.classList.contains('active')){
            current.push(currLink);
            
        }
    }
    
        navBar.addEventListener('click', function(e){
            if(e.target.nodeName === 'A') {
                const clickedLink = e.target;
                clickedLink.classList.add('active');
            }
                 
        });
}

const navShow = function() {
    burgerIcon.addEventListener('click', function(){
        navBar.classList.toggle('show-nav');
        // console.log('yess');
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

createNavLink(sections, i);

const links = navBar.querySelectorAll('.navbar__list li .menu__link');
links[0].classList.add('active');




// Add class 'active' to section when near top of viewport
// Add an active state to your navigation items when a section is in the viewport
window.document.addEventListener('scroll', AddSectionActiveClass);



// add active to link on click

AddActiveLinkClass();

// Scroll to anchor ID using scrollTO event
// document.addEventListener('scroll', dispatcherObj.scrollToAnchorId(sections, links));
document.addEventListener('scroll', function () {
    let current = "";
    // const secArr = Array.from(s);
    sections.forEach(function(sec){

        if (dispatcherObj.isInViewPort(sec)) {
            current = sec.getAttribute("id");
        }
    }); 
    links.forEach(function(a) {
        a.classList.remove("active");
        if(a.getAttribute('href').substring(1) === current){
            a.classList.add('active');
        }
    });
});
// dispatcherObj.scrollToAnchorId(sections, links);

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click



function scrollTOSection() {

    navBar.addEventListener("click", function (e) {
        if (e.target.nodeName === 'A') {
            e.preventDefault();
            for (let i = 0; i < sections.length; i++) {
                if (e.target.getAttribute("href").substring(1) === sections[i].id) {
                    // switch (sections[i].id) {
                    //     case `${sections[i].id}`: window.scrollTo({top:sections[i].getBoundingClientRect().top, behavior:"smooth"});
                    //     break;
                    // }
                    sections[i].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                }
            }

        }
    });
}


if (history.scrollRestoration) { // restoring page to top to ensure that the bounding rectangular value is right
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

scrollTOSection();
// Set sections as active

// creating a menu icons




// burgerIcon.addEventListener('click', navShow);
navShow();




// to close side navber


closeSideBar();
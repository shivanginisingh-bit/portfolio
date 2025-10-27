/* 
  SHIVANGINI SINGH PORTFOLIO - JAVASCRIPT
  
  This JavaScript file makes your portfolio interactive!
  I'll explain each section as we go through it.
*/

// ============================================
// MOBILE MENU TOGGLE
// ============================================

/*
  We need to get elements from the HTML so we can work with them.
  Think of this like selecting layers in design software.
*/

// document.querySelector() finds the first element matching the selector
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

/*
  VARIABLES IN JAVASCRIPT:
  - const = constant (can't be reassigned) - use for most things
  - let = can be reassigned - use when value needs to change
  - var = old way (don't use, has weird behavior)
*/

/*
  addEventListener() listens for events and runs code when they happen.
  Like setting up triggers in design prototyping tools!
*/

// When hamburger is clicked, toggle the mobile menu
if (hamburger) {
hamburger.addEventListener('click', () => {
    /*
      () => {} is an ARROW FUNCTION (modern JavaScript syntax).
      It's a shorthand way to write functions.
    */
    
    const isOpen = navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    
    /*
      classList is a property that contains all CSS classes on an element.
      .toggle('active') adds the class if it's not there, removes it if it is.
    */
});
}

// Close mobile menu when a link is clicked
if (navLinks) {
navLinks.forEach(link => {
    /*
      forEach() is a METHOD that loops through each item in a collection.
      It's like iterating through layers or components.
    */
    
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
}

// ============================================
// WORK PAGE - SIMPLIFIED (No interactive cards)
// ============================================

/*
  Work page now displays simple images with accessibility overlays.
  No interactive card states needed.
*/

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

/*
  Handle smooth scrolling when clicking navigation links
  that point to sections on the same page.
*/

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        /*
          function(e) - the 'e' is the EVENT OBJECT.
          It contains information about the event that just happened.
        */
        
        // Check if link is an anchor link (starts with #)
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            /*
              startsWith() checks if a string starts with certain characters.
              We only want to modify behavior for anchor links (internal links).
            */
            
            e.preventDefault();
            /*
              Stops the default jump behavior.
              We'll handle the scrolling ourselves!
            */
            
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                    /*
                      scrollTo() scrolls to a position.
                      top = where to scroll to (in pixels from top)
                      behavior: 'smooth' = smooth animation (not instant jump)
                    */
                });
            }
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

/*
  Add a subtle shadow to the navbar when scrolling down.
  This creates depth and shows the navbar is separate from content.
*/

window.addEventListener('scroll', () => {
    /*
      window = the browser window.
      'scroll' event fires every time the user scrolls.
    */
    
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 100) {
            /*
              window.scrollY = how far (in pixels) the page has been scrolled.
              If scrolled more than 100px, add shadow.
            */
            
            navbar.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.1)';
            /*
              .style lets you change CSS properties with JavaScript.
              This adds a subtle white shadow when scrolling.
            */
        } else {
            navbar.style.boxShadow = 'none';
            // Removes shadow at the top
        }
    }
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

/*
  Add subtle animations when the page loads.
  This creates a more engaging, professional feel.
*/

window.addEventListener('load', () => {
    /*
      'load' event fires when the entire page has loaded.
      This ensures all content is ready before animating.
    */
    
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroQuote = document.querySelector('.hero-quote');
    const heroSkills = document.querySelector('.hero-skills');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            heroTitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 100);
        }, 200);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            heroSubtitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 300);
        }, 400);
    }
    
    if (heroQuote) {
        setTimeout(() => {
            heroQuote.style.opacity = '0';
            heroQuote.style.transform = 'translateY(30px)';
            heroQuote.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroQuote.style.opacity = '1';
                heroQuote.style.transform = 'translateY(0)';
            }, 500);
        }, 600);
    }
    
    if (heroSkills) {
        setTimeout(() => {
            heroSkills.style.opacity = '0';
            heroSkills.style.transform = 'translateY(30px)';
            heroSkills.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroSkills.style.opacity = '1';
                heroSkills.style.transform = 'translateY(0)';
            }, 700);
        }, 800);
    }
    
    // Animate work images on work page (if present)
    const workImages = document.querySelectorAll('.work-image');
    workImages.forEach((image, index) => {
        setTimeout(() => {
            image.style.opacity = '0';
            image.style.transform = 'translateY(30px)';
            image.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                image.style.opacity = '1';
                image.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);  // Stagger the animations
    });
});

// ============================================
// SKILL PILL HOVER EFFECTS
// ============================================

/*
  Skill pills on home page are now static (no hover effects).
  Only skill-tags on other pages have hover effects.
*/

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        /*
          When hovering over a skill tag:
          1. Scale it up slightly
          2. Add a subtle glow effect
        */
        tag.style.transform = 'scale(1.05)';
        tag.style.boxShadow = '0 4px 12px rgba(255, 255, 0, 0.3)';
    });
    
    tag.addEventListener('mouseleave', () => {
        /*
          When leaving the skill tag:
          1. Scale it back to normal
          2. Remove the glow effect
        */
        tag.style.transform = 'scale(1)';
        tag.style.boxShadow = 'none';
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

/*
  Add interactive effects to buttons.
  This makes them feel more responsive and engaging.
*/

const buttons = document.querySelectorAll('.work-button, .about-button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        /*
          When hovering over a button:
          1. Scale it up slightly
          2. Add a subtle glow effect
        */
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 6px 20px rgba(255, 255, 0, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        /*
          When leaving the button:
          1. Scale it back to normal
          2. Remove the glow effect
        */
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
});

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

/*
  Add animations when elements come into view.
  This creates a more dynamic, engaging experience!
*/

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate elements on scroll
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.impact-card, .process-stage, .role-card, .interface-item, .detail-item, .audit-item, .process-card, .flow-card, .problem-item, .solution-item, .learning-item');
    
    animatedElements.forEach((element, index) => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            element.style.animationDelay = `${index * 0.1}s`;
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Also check on page load
window.addEventListener('load', animateOnScroll);

// ============================================
// PARALLAX EFFECTS
// ============================================

/*
  Add subtle parallax effects to background elements.
  This creates depth and visual interest!
*/

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.header-illustration, .mountain-range, .wind-turbines, .buildings, .clouds-bg, .stars-bg');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1); // Different speeds for different elements
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================

/*
  Add more sophisticated hover effects to various elements.
  This makes the website feel more responsive and polished!
*/

// Enhanced hover effects for cards
const interactiveCards = document.querySelectorAll('.impact-card, .process-stage, .role-card, .process-card, .flow-card');

interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 15px 40px rgba(233, 191, 78, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Enhanced hover effects for images
const interactiveImages = document.querySelectorAll('.interface-image, .detail-image, .audit-image, .testing-image, .screen-image, .visual-image');

interactiveImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05) rotate(1deg)';
        image.style.filter = 'brightness(1.1)';
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1) rotate(0deg)';
        image.style.filter = 'brightness(1)';
    });
});

// ============================================
// TYPING ANIMATION FOR PROJECT TITLES
// ============================================

/*
  Create a typewriter effect for project titles.
  This adds a nice touch of personality!
*/

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to project titles on project pages
window.addEventListener('load', () => {
    const projectTitle = document.querySelector('.project-title');
    if (projectTitle) {
        const originalText = projectTitle.textContent;
        setTimeout(() => {
            typeWriter(projectTitle, originalText, 80);
        }, 500);
    }
});


// ============================================
// INTERACTIVE PROJECT CARDS
// ============================================

/*
  Interactive project card functionality:
  - Default state: Clean project image
  - Hover state: Overlay with project info
  - Pressed state: Visual feedback before navigation
  - Click: Navigate to detailed case study
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find all interactive cards
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    interactiveCards.forEach(card => {
        const img = card.querySelector('img');
        const originalSrc = img.src;
        const hoverSrc = img.getAttribute('data-hover-src');
        const pressedSrc = img.getAttribute('data-pressed-src');
        const caseStudyUrl = img.getAttribute('data-case-study') || 'scaling-sustainability.html';
        
        let isPressed = false;
        let pressTimer;
        
        // Mouse events
        card.addEventListener('mouseenter', function() {
            if (!isPressed && hoverSrc) {
                img.src = hoverSrc;
                card.classList.remove('pressed');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            img.src = originalSrc;
            card.classList.remove('pressed');
            isPressed = false;
            if (pressTimer) {
                clearTimeout(pressTimer);
            }
        });
        
        // Mouse down - show pressed state
        card.addEventListener('mousedown', function(e) {
            e.preventDefault();
            isPressed = true;
            card.classList.add('pressed');
            if (pressedSrc) {
                img.src = pressedSrc;
            }
        });
        
        // Mouse up - remove pressed state and navigate
        card.addEventListener('mouseup', function(e) {
            e.preventDefault();
            if (isPressed) {
                card.classList.remove('pressed');
                isPressed = false;
                
                // Navigate to appropriate case study immediately
                window.location.href = caseStudyUrl;
            }
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            isPressed = true;
            card.classList.add('pressed');
            if (pressedSrc) {
                img.src = pressedSrc;
            }
        });
        
        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (isPressed) {
                card.classList.remove('pressed');
                isPressed = false;
                
                // Navigate to appropriate case study
                pressTimer = setTimeout(() => {
                    window.location.href = caseStudyUrl;
                }, 150);
            }
        });
        
        // Click event as fallback
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = caseStudyUrl;
        });
    });
});

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

/*
  Add smooth transitions between pages.
  This creates a more professional feel!
*/

// Project links removed - work page now uses simple image gallery without navigation

// Add transition effect for navigation links
const htmlNavLinks = document.querySelectorAll('.nav-link[href$=".html"]');

htmlNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const currentPage = window.location.pathname;
        const targetPage = link.getAttribute('href');
        
        // Define page order: Home -> About -> Work
        const pageOrder = {
            'index.html': 1,
            '/': 1,
            'about.html': 2,
            'work.html': 3
        };
        
        const currentOrder = pageOrder[currentPage.split('/').pop()] || 1;
        const targetOrder = pageOrder[targetPage];
        
        // Store navigation direction in sessionStorage for the target page to read
        if (currentOrder < targetOrder) {
            // Moving forward in the sequence (home->about, about->work)
            sessionStorage.setItem('navDirection', 'forward');
        } else {
            // Moving backward in the sequence (work->about, about->home)
            sessionStorage.setItem('navDirection', 'backward');
        }
        
        // Add transition effect
        document.body.classList.add('navigating');
        
        // Navigate after transition
        setTimeout(() => {
            window.location.href = targetPage;
        }, 800);
    });
});

// Fade in effect when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Check navigation direction and apply appropriate animation class
    const navDirection = sessionStorage.getItem('navDirection');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (navDirection === 'backward') {
        // Coming from a higher-numbered page
        if (currentPage === 'about.html') {
            document.querySelector('.about-page').classList.add('from-work');
        }
        // Add more cases as needed for other pages
    }
    
    // Clear the navigation direction
    sessionStorage.removeItem('navDirection');
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

/*
  A fun little message for developers who open the console.
  This is a common practice in modern web development!
*/

console.log(`
🎨 Welcome to Shivangini Singh's Portfolio! 🎨

This website was built with:
- HTML5 for structure
- CSS3 for styling (with CSS Grid & Flexbox)
- Vanilla JavaScript for interactions

Features implemented:
✨ Smooth animations and transitions
🎯 Interactive hover effects
📱 Responsive design
🎨 Custom color scheme (#E9BF4E)
🚀 Microanimations and polish

Ready for:
🔗 Interactive floating icons (PNG files needed)
🎴 Three-state project cards (PNG files needed)
📸 Project case study images

Feel free to explore the code and learn from it!
If you have any questions, don't hesitate to reach out.

Happy coding! 🚀
`);

/* 
  ============================================
  CONGRATULATIONS! You've learned:
  ============================================
  
  JAVASCRIPT FUNDAMENTALS:
  - Variables (const, let)
  - Functions (regular and arrow functions)
  - Event listeners (click, scroll, hover, load)
  - DOM manipulation (selecting elements, changing properties)
  - Conditionals (if/else, switch)
  - Loops (forEach)
  - Timing functions (setTimeout)
  
  PRACTICAL SKILLS:
  - Mobile menu toggle
  - Interactive project cards
  - Smooth scrolling
  - Scroll-triggered effects
  - Page load animations
  - Hover effects
  
  KEY CONCEPTS:
  - The DOM (Document Object Model) - HTML as objects JavaScript can manipulate
  - Event-driven programming - code runs in response to user actions
  - Asynchronous programming - things happening at different times
  
  DEBUGGING TIPS:
  1. Use console.log() EVERYWHERE to see what's happening
  2. Open Developer Tools (F12) to see errors and logs
  3. Check the Console tab for errors (they'll be red)
  4. Read error messages - they tell you what went wrong and where!
  
  NEXT STEPS TO CUSTOMIZE:
  1. Add more interactive features (image sliders, modals, etc.)
  2. Create the individual project pages
  3. Add more animations and micro-interactions
  4. Implement a dark/light mode toggle
  5. Add form validation
  6. Create a loading screen
  7. Add keyboard navigation support
  
  LEARNING RESOURCES:
  - MDN Web Docs (developer.mozilla.org) - THE best JavaScript reference
  - JavaScript.info - comprehensive tutorial
  - FreeCodeCamp - interactive coding lessons
  - YouTube tutorials - visual learning
  
  Remember: Everyone starts as a beginner!
  The best way to learn is by DOING.

// ============================================
// CONTENT HYDRATION
// ============================================

// Import process content and hydrate DOM
(async () => {
  try {
    const { processContent } = await import('./content.js');
    
    (function hydrateProcess(){
      const wrap = document.querySelector('#process .cards, #process .process-grid');
      if (!wrap) return;
      wrap.innerHTML = processContent.map(item => `
        <article class="process-card">
          <div class="process-icon"><img src="./assets/public/${item.icon}" alt=""></div>
          <h3>${item.title}</h3>
          <ul>${item.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>
        </article>
      `).join('');
    })();
  } catch (error) {
    console.log('Content.js not found, using fallback');
  }
})();

// ============================================
// CLOSE BUTTON & BACK TO TOP BEHAVIOR
// ============================================

const closeBtn = document.querySelector('.close-pill');
const backTop = document.querySelector('.back-to-top');
const showAt = 200;

function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  if (closeBtn) closeBtn.style.opacity = y > 40 ? '0.2' : '1';
  if (backTop) backTop.classList.toggle('is-visible', y > showAt);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================
// HAMBURGER MENU
// ============================================

const menuToggle = document.getElementById('menuToggle');
const menuClose  = document.getElementById('menuClose');
const mobileNav  = document.getElementById('mobileNav');

function openMenu(){ mobileNav.hidden = false; }
function closeMenu(){ mobileNav.hidden = true; }

menuToggle?.addEventListener('click', openMenu);
menuClose ?.addEventListener('click', closeMenu);
mobileNav ?.addEventListener('click', e=>{
  if(e.target.tagName === 'A') closeMenu();
});
  Break things, fix them, experiment, and have fun! 🚀
*/
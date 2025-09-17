console.log("JavaScript-fil laddad korrekt");


// =====================
// Hantera navbar scroll
// =====================
function handleNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.classList.add("hidden");
            navbar.classList.remove("scrolled-up");
        } else {
            navbar.classList.remove("hidden");
            navbar.classList.add("scrolled-up");
        }

        lastScrollTop = Math.max(scrollTop, 0);
    });
}

// =====================
// Kopiera eamil
// =====================
function copyEmail() {
    const email = "dennislantz@hotmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

// =====================
// Values Scroll Cards with Dots
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".value-card-custom");
  const container = document.querySelector(".work-values-container");
  let dotsContainer = document.querySelector(".dots-container");

  // Om dotsContainer inte finns, skapa den och lägg efter korten
  if (!dotsContainer) {
    dotsContainer = document.createElement("div");
    dotsContainer.classList.add("dots-container");
    container.parentNode.insertBefore(dotsContainer, container.nextSibling);
  }

  let currentCardIndex = 0;
  let autoScrollInterval;
  let isScrollInitialized = false;

  const isMobile = () => window.innerWidth <= 768;

  // Skapa prickar
  const createDots = () => {
    dotsContainer.innerHTML = ""; // Rensa tidigare prickar
    cards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => scrollToCard(index)); // Klick kopplat till kort
      dotsContainer.appendChild(dot);
    });
  };

  // Uppdatera prickarna
  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentCardIndex);
    });
  };

  // Scrolla till specifikt kort
  const scrollToCard = (index) => {
    if (index === currentCardIndex) return;

    const currentCard = cards[currentCardIndex];
    const nextCard = cards[index];

    // Göra nuvarande kort osynligt
    currentCard.style.opacity = "0";
    currentCard.style.zIndex = "0";

    // Visa nästa kort
    nextCard.style.opacity = "1";
    nextCard.style.zIndex = "1";
    currentCardIndex = index;

    updateDots();
  };

  // Scrolla till nästa kort
  const scrollToNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % cards.length;
    scrollToCard(nextIndex);
  };

  const initializeMobileScroll = () => {
    if (isScrollInitialized) return;

    isScrollInitialized = true;

    // Anpassa container för mobilversion
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.overflow = "hidden";
    container.style.height = "30vh";
    container.style.position = "relative";

    cards.forEach((card, index) => {
      card.style.position = "absolute";
      card.style.top = "0";
      card.style.width = "100%";
      const cardHeight = window.innerHeight * 0.35;
      card.style.height = `${cardHeight}px`;
      card.style.transition = "opacity 0.5s ease-out, z-index 0.5s ease-out";
      card.style.opacity = index === 0 ? "1" : "0";
      card.style.zIndex = index === 0 ? "1" : "0";
      card.style.boxSizing = "border-box";

      // Gör korten klickbara för att visa nästa kort
      card.addEventListener("click", () => {
        clearInterval(autoScrollInterval); // Pausa autoscroll vid klick
        scrollToNextCard(); // Scrolla till nästa kort
        autoScrollInterval = setInterval(scrollToNextCard, 7000); // Återuppta autoscroll
      });
    });

    createDots();

    // Starta auto-scroll
    autoScrollInterval = setInterval(scrollToNextCard, 7000);
  };

  const cleanUpMobileScroll = () => {
    if (!isScrollInitialized) return;

    isScrollInitialized = false;

    container.style.display = "";
    container.style.flexDirection = "";
    container.style.alignItems = "";
    container.style.justifyContent = "";
    container.style.overflow = "";
    container.style.height = "";
    container.style.position = "";

    cards.forEach((card) => {
      card.style.position = "";
      card.style.top = "";
      card.style.transition = "";
      card.style.width = "";
      card.style.height = "";
      card.style.opacity = "";
      card.style.zIndex = "";
      card.style.boxSizing = "";
      card.removeEventListener("click", scrollToNextCard);
    });

    dotsContainer.innerHTML = ""; // Ta bort prickarna
    clearInterval(autoScrollInterval);
  };

  const handleResize = () => {
    if (isMobile()) {
      initializeMobileScroll();
    } else {
      cleanUpMobileScroll();
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();
});


// =====================
// Hantera animation intro
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');

    if (!introAnimation || !mainContent) {
        console.error("Element saknas: intro-animation eller main-content!");
        return;
    }

    // Inaktivera scrollning medan introt är aktivt
    document.body.style.overflowY = 'hidden';
    mainContent.style.display = 'none';

    function endIntro() {
        introAnimation.style.zIndex = '0';  // Sänk z-index innan rullgardinsanimationen startar
        introAnimation.classList.add('roll-up');

        // Vänta tills rullgardinsanimationen är klar
        setTimeout(() => {
            introAnimation.style.display = 'none'; // Dölj intro-animationen
            mainContent.style.display = 'block'; // Visa huvudinnehållet
            mainContent.classList.add('show'); // Gör huvudinnehållet synligt
            document.body.style.overflowY = 'auto'; // Tillåt scrollning
        }, 2000); // Matchar tiden för rollUp-animationen (2s)
    }

    // Avsluta introt efter 2.5 sekunder
    setTimeout(endIntro, 2500);
});

// =====================
// Hantera animation intro
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not([loading]):not(.no-lazy)');
    images.forEach(img => {
        if (img.complete) {
            // Bilden är redan laddad
            console.log(`Bild redan laddad: ${img.src}`);
        } else {
            // Bilden laddas med lazy
            img.setAttribute('loading', 'lazy');
            console.log(`Lade till loading="lazy": ${img.src}`);
        }
    });
});

// =====================
// Hantera animation smooth scroll
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Förhindra standardbeteendet

        const targetId = this.getAttribute('href').substring(1); // Hämta ID från href

        // Hantera #top separat
        const targetElement = targetId === "top" ? document.body : document.getElementById(targetId);

        if (targetElement) {
            const targetPosition = targetId === "top" 
                ? 0 
                : targetElement.getBoundingClientRect().top + window.pageYOffset; // Målposition

            const startPosition = window.pageYOffset; // Nuvarande position
            const distance = targetPosition - startPosition; // Avstånd till målet
            const duration = 1000; // Tid för scrollen (i ms)
            let startTime = null;

            function animationScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animationScroll); // Fortsätt animationen
            }

            // Easing-funktion för mjukare effekt
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animationScroll); // Starta animationen
        }
    });
});


// =====================
// Förhindra högerklick och vissa kortkommandon
// =====================
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // Inaktivera Ctrl+S (Spara sida)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
    }
    // Inaktivera Ctrl+U (Visa sidkälla)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
    // Inaktivera Ctrl+Shift+I (Inspektör)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    // Inaktivera F12 (Utvecklarverktyg)
    if (e.key === 'F12') {
        e.preventDefault();
    }
});


// =====================
// Emoji Slideshow
// =====================
function startEmojiSlideshow() {
    const emojiImages = document.querySelectorAll('.emoji-icon');
    let currentIndex = 0;

    function showNextEmoji() {
        // Remove the bounce effect from all emojis
        emojiImages.forEach(img => {
            img.style.opacity = '0'; 
            img.classList.remove('bounce'); 
        });

        // Add bounce effect to the current emoji
        if (emojiImages.length > 0) {
            const currentEmoji = emojiImages[currentIndex];
            currentEmoji.style.opacity = '1';
            currentEmoji.classList.add('bounce'); 
        }

        // Move to the next emoji
        currentIndex = (currentIndex + 1) % emojiImages.length; 
        setTimeout(showNextEmoji, 6000);
    }

    showNextEmoji();
}


// =====================
// Profile Slideshow
// =====================
function startProfileSlideshow() {
    const profilePictures = document.querySelectorAll('.profile-picture');
    let currentProfileIndex = 0;

    function showNextProfile() {
        profilePictures.forEach(img => {
            img.style.opacity = '0';
        });

        profilePictures[currentProfileIndex].style.opacity = '1';
        currentProfileIndex = (currentProfileIndex + 1) % profilePictures.length; 
        setTimeout(showNextProfile, 6000);
    }

    showNextProfile();
}

// =====================
// Justera scroll-container
// =====================
function adjustScrollContainer() {
    const scrollContainers = document.querySelectorAll(".scroll-container"); // Hantera flera containers
    scrollContainers.forEach((scrollContainer) => {
        const scrollContent = scrollContainer.querySelector(".scroll-content");

        if (scrollContainer && scrollContent) {
            if (window.innerWidth < 768) {
                // För mobiler, gör scroll-container lite bredare
                scrollContainer.style.maxWidth = '90%'; // 90% av skärmbredden
            } else {
                // För desktop, öka maxWidth
                scrollContainer.style.maxWidth = '1100px';
            }
            scrollContainer.style.overflowX = 'auto';
            scrollContent.style.display = 'flex';
            scrollContent.style.gap = '20px';

            // Försäkra att scroll-position alltid börjar från början
            scrollContainer.scrollLeft = 0;
        }
    });
}

// Initialisera scrolljustering vid sidladdning och fönsterändring
function initializeScrollAdjustment() {
    window.addEventListener('load', adjustScrollContainer);
    window.addEventListener('resize', adjustScrollContainer);
}

// Kör justeringar
initializeScrollAdjustment();

// =====================
// Scrolla alltid till början vid DOMContentLoaded
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll(".scroll-container");
    scrollContainers.forEach(scrollContainer => {
        setTimeout(() => {
            scrollContainer.scrollLeft = 0; // Forcera scroll till början med liten fördröjning
        }, 100); // Säkerställ att layouten hinner laddas
    });
});

// =====================
// Justera scroll-content och säkra startposition
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll('.scroll-container');
    scrollContainers.forEach(scrollContainer => {
        const scrollContent = scrollContainer.querySelector('.scroll-content');

        // Kontrollera om båda elementen finns
        if (scrollContainer && scrollContent) {
            // Scrolla till början
            scrollContainer.scrollLeft = 0;

            // Säkerställ att transform är korrekt inställd
            scrollContent.style.transform = 'translateX(0)';
        }
    });
});



// =====================
// Klickbara kort
// =====================
document.querySelectorAll('.clickable-card').forEach(function(card) {
    card.addEventListener('click', function() {
        // Hämta popup-ID från data-popup-attributet
        var popupId = this.getAttribute('data-popup');
        // Trigga popup-funktionen baserat på popup-ID
        openPopup(popupId);
    });
});

// =====================
// Hantera popup-funktionalitet HELA KORT
// =====================
function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex'; // Visa popupen
        popup.style.overflow = 'hidden'; // Dölj innehåll som går utanför hörnen
        popup.style.borderRadius = '25px'; // Rundade hörn för popup-fönstret
    } else {
        console.error("Popup med ID " + popupId + " hittades inte.");
    }
}

// =====================
// Hantera popup-funktionalitet och stängning
// =====================
function setupPopupFunctionality() {
    // Handle generic popups, including video and image popups
    document.querySelectorAll('[data-popup]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            const iframe = popup.querySelector('iframe');

            if (popup) {
                popup.style.display = 'flex';
                popup.style.overflow = 'hidden';
                popup.style.borderRadius = '25px'; // Rounded corners

                // Handle iframe for videos
                if (iframe) {
                    iframe.src = iframe.getAttribute('data-src');
                }
            } else {
                console.error(`Popup with ID ${popupId} not found`);
            }
        });
    });

    // Close popup
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.project-popup');
            closePopup(popup);
        });
    });

    // Close popup on clicking outside of content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-popup')) {
            closePopup(e.target);
        }
    });

    // Close popup on ESC key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.project-popup').forEach(popup => {
                closePopup(popup);
            });
        }
    });
}

function closePopup(popup) {
    if (!popup) return;
    const iframe = popup.querySelector('iframe');
    if (iframe) {
        iframe.src = ''; // Stoppa videon
    }
    popup.style.display = 'none';
    popup.style.overflow = ''; // Återställ overflow
    popup.style.borderRadius = ''; // Återställ border-radius
}

// =====================
// Bildvisning i popup
// =====================
function setupImagePopup() {
    console.log("Setting up image popups...");
    const popupImages = document.querySelectorAll('.popup-image');

    // Kontrollera om vi hittar några bilder
    console.log(`Found ${popupImages.length} images with class 'popup-image'.`);
    
    popupImages.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            console.log("Image clicked!");

            // Skapa och visa popup-fönster
            const popupModal = document.createElement('div');
            popupModal.classList.add('modal');
            popupModal.style.display = 'flex';
            popupModal.style.justifyContent = 'center';
            popupModal.style.alignItems = 'center';
            popupModal.style.position = 'fixed';
            popupModal.style.top = '0';
            popupModal.style.left = '0';
            popupModal.style.width = '100%';
            popupModal.style.height = '100%';
            popupModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            popupModal.style.zIndex = '1000';

            const modalContent = document.createElement('img');
            modalContent.classList.add('modal-content');
            modalContent.src = item.src;
            popupModal.appendChild(modalContent);

            popupModal.addEventListener('click', () => {
                popupModal.remove();
                console.log("Popup closed.");
            });

            document.body.appendChild(popupModal);
            console.log("Popup added to the DOM.");
        });
    });
}


// =====================
// Videovisning i popup
// =====================
function setupVideoPopup() {
    const popupTriggers = document.querySelectorAll('[data-popup]');
    const videoCloseButtons = document.querySelectorAll('.video-popup .close-btn-video'); // Använd den nya klassen

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            const iframe = popup.querySelector('iframe');

            if (popup && iframe) {
                // Visa och centrera popupen
                popup.style.display = 'flex'; // Visa popupen och centrera innehållet med flexbox
                iframe.src = iframe.getAttribute('data-src'); // Ladda videon
            }
        });
    });

    // Stäng endast videopopups när man klickar på den nya stängningsknappen
    videoCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const popup = this.closest('.video-popup');
            closePopup(popup);
        });
    });

    // Stäng popup när man klickar utanför innehållet
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.video-popup').forEach(popup => {
            if (e.target === popup) {
                closePopup(popup);
            }
        });
    });

    // Stäng popup när man trycker på "Escape"
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.video-popup').forEach(popup => {
                closePopup(popup);
            });
        }
    });
}

function closePopup(popup) {
    if (popup) {
        const iframe = popup.querySelector('iframe');
        if (iframe) {
            iframe.src = ''; // Stoppa videon
        }
        popup.style.display = 'none'; // Dölj popupen
    }
}


// =====================
// Hantera media popup (bilder och PDF)
// =====================
function setupMediaPopup() {
    document.querySelectorAll('.popup-image, .pdf-link').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            if (item.classList.contains('popup-image')) {
                // Create and show image popup
                const fullImage = new Image();
                fullImage.src = item.src;
                fullImage.classList.add('full-image-popup');

                const popupModal = document.createElement('div');
                popupModal.classList.add('modal');
                popupModal.style.display = 'flex';
                popupModal.style.justifyContent = 'center';
                popupModal.style.alignItems = 'center';
                popupModal.style.position = 'fixed';
                popupModal.style.top = '0';
                popupModal.style.left = '0';
                popupModal.style.width = '100%';
                popupModal.style.height = '100%';
                popupModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                popupModal.style.zIndex = '1000';

                popupModal.appendChild(fullImage);

                // Remove popup on click
                popupModal.addEventListener('click', () => {
                    popupModal.remove();
                });

                document.body.appendChild(popupModal);
            } else if (item.classList.contains('pdf-link')) {
                // Open PDF in a new tab
                window.open(item.href, '_blank');
            }
        });
    });
}

// =====================
// Scroll Container Bilder
// =====================
function setupScrollContainer() {
    const scrollContainers = document.querySelectorAll('.scroll-container');
    scrollContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        });
    });

    const scrollButtons = document.querySelectorAll('.scroll-btn');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gallery = document.querySelector(`.${this.dataset.gallery}`);
            const scrollAmount = gallery.clientWidth;

            if (this.classList.contains('next-btn')) {
                gallery.scrollLeft += scrollAmount;
            } else {
                gallery.scrollLeft -= scrollAmount;
            }
        });
    });

    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function() {
            const fullscreenPopup = document.createElement('div');
            fullscreenPopup.classList.add('fullscreen-popup');
            const fullImage = new Image();
            fullImage.src = this.src;
            fullscreenPopup.appendChild(fullImage);

            fullscreenPopup.addEventListener('click', () => {
                fullscreenPopup.remove();
            });

            document.body.appendChild(fullscreenPopup);
        });
    });
}

/* ===== Language system (uses your JSON + persists choice) ===== */
(() => {
  const STORAGE_KEY = 'atmos.lang';
  const TRANSLATIONS_URL = new URL('dennis-translations.json', document.baseURI).href;

  const LANG_META = {
    en:{icon:'bilder/emoji9.webp',  name:'English'},
    sv:{icon:'bilder/emoji2.webp',  name:'Svenska'},
    de:{icon:'bilder/emoji10.webp', name:'Deutsch'},
    es:{icon:'bilder/emoji11.webp', name:'Español'},
    fi:{icon:'bilder/emoji12.webp', name:'Suomi'},
    fr:{icon:'bilder/emoji13.webp', name:'Français'},
    it:{icon:'bilder/emoji14.webp', name:'Italiano'},
    ja:{icon:'bilder/emoji15.webp', name:'日本語'},
    pl:{icon:'bilder/emoji16.webp', name:'Polski'},
    ru:{icon:'bilder/emoji17.webp', name:'Русский'}
  };
  const SUPPORTED = Object.keys(LANG_META);

  let dict = null;
  let current = null;

  const normalize = c => {
    if (!c) return 'en';
    const short = String(c).toLowerCase().split('-')[0];
    return SUPPORTED.includes(short) ? short : 'en';
  };

  const detect = () => normalize(navigator.language || navigator.userLanguage || 'en');

  async function loadDict(){
    if (dict) return dict;
    const res = await fetch(TRANSLATIONS_URL, { cache:'no-store' });
    if (!res.ok) throw new Error(`Translations load failed: ${res.status}`);
    dict = await res.json();
    return dict;
  }

  function applyIcon(lang){
    const meta = LANG_META[lang] || LANG_META.en;
    const el = document.getElementById('current-language-icon');
    if (el){
      el.src = meta.icon;
      el.title = meta.name;
      el.alt   = meta.name;
    }
  }

  function applyTexts(lang, d){
    document.querySelectorAll('[data-translate]').forEach(el=>{
      const key = el.getAttribute('data-translate');
      const val = d?.[lang]?.[key] ?? d?.en?.[key];
      if (val != null && el.id !== 'bubble-text'){ // keep your typing effect safe
        el.textContent = val;
      }
    });
  }

  async function setLanguage(lang){
    current = normalize(lang);
    localStorage.setItem(STORAGE_KEY, current);
    applyIcon(current);
    try{
      const d = await loadDict();
      applyTexts(current, d);
      // also update the popup text source for your typing effect
      const popupText = d?.[current]?.welcomeMessage ?? d?.en?.welcomeMessage ?? '';
      const bubble = document.getElementById('bubble-text');
      if (bubble && !bubble.textContent) bubble.textContent = ''; // leave typing logic as-is
    }catch(e){ console.error(e); }
    const dd = document.getElementById('language-dropdown');
    if (dd) dd.style.display = 'none';
  }

  function bindUI(){
    const toggle = document.getElementById('language-toggle') || document.querySelector('.language-selector');
    const dd = document.getElementById('language-dropdown');

    // force closed on init
    if (dd) dd.style.display = 'none';

    if (toggle && dd){
      toggle.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
        toggle.setAttribute?.('aria-expanded', dd.style.display === 'block' ? 'true' : 'false');
      });

      // Support both your old inline onclicks and new data-lang
      dd.querySelectorAll('[data-lang]').forEach(a=>{
        a.addEventListener('click', (e)=>{
          e.preventDefault(); e.stopPropagation();
          setLanguage(a.getAttribute('data-lang'));
        });
      });

      document.addEventListener('click', ()=>{
        dd.style.display = 'none';
        toggle.setAttribute?.('aria-expanded','false');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    bindUI();
    const initial = localStorage.getItem(STORAGE_KEY) || detect();
    setLanguage(initial);
  });

  // expose for backward compatibility with your HTML inline calls
  window.changeLanguage = setLanguage;
  window.loadTranslations = async (lang)=>{ await setLanguage(lang); };
})();

// =====================
// Company Animation Hover
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const logoItems = document.querySelectorAll(".logo-item");
    const hoverInfoText = document.querySelector(".hover-info-text");

    if (!hoverInfoText) {
        console.error("Elementet .hover-info-text hittades inte i DOM.");
        return;
    }

    logoItems.forEach((item) => {
        item.addEventListener("mouseenter", (event) => {
            const companyName = item.getAttribute("data-company-name");
            hoverInfoText.innerHTML = `<span class="animated-text">${companyName}</span>`;
            hoverInfoText.style.left = `${event.clientX + 30}px`; // Placera texten precis bredvid muspekaren
            hoverInfoText.style.top = `${event.clientY + window.scrollY - 160}px`; // Justera höjden så att den är i linje
            hoverInfoText.style.opacity = 1;
        });

        item.addEventListener("mousemove", (event) => {
            hoverInfoText.style.left = `${event.clientX + 30}px`; // Placera texten precis bredvid muspekaren
            hoverInfoText.style.top = `${event.clientY + window.scrollY - 160}px`; // Justera höjden
        });

        item.addEventListener("mouseleave", () => {
            hoverInfoText.style.opacity = 0;
            hoverInfoText.innerHTML = "";
        });
    });
});


// =====================
// Section Animation Observer
// =====================
function initSectionObserver() {
    const sections = document.querySelectorAll('.section-to-animate');

    if (sections.length === 0) {
        console.error('No sections with class "section-to-animate" found.');
        return;
    }

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the section is visible
        root: null,
        rootMargin: '0px' // Adjust as needed
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                console.log('Animating section:', entry.target);
                observer.unobserve(entry.target); // Stop observing once animation has started
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// =====================
// Init functions on page load
// =====================
document.addEventListener("DOMContentLoaded", () => {
    try {
        initSectionObserver(); // Initialize the observer here

        // Call other initialization functions
        const detectedLang = detectUserLanguage();
        setupLanguageDropdown();
        changeLanguage(detectedLang);
        handleNavbarScroll();
        startEmojiSlideshow();
        startProfileSlideshow();
        adjustScrollContainer();
        setupPopupFunctionality();
        setupImagePopup();
        setupVideoPopup(); // Video popup functionality
        setupMediaPopup();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// =====================
// Footer Rotating Text (cross-browser)
// =====================
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.footer-logo-svg');
  if (!svg) return;

  const path = svg.querySelector('#circlePath');
  const tp = svg.querySelector('textPath');
  const ring = svg.querySelector('.text-ring');
  if (!path || !tp || !ring) return;

  // Säkerställ båda attributen för maximal bakåtkompat
  tp.setAttribute('href', '#circlePath');
  tp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#circlePath');

  // Mät faktisk längd och normalisera
  const L = path.getTotalLength();
  path.setAttribute('pathLength', L.toFixed(2));

  // Rensa innan vi sätter nytt
  tp.removeAttribute('textLength');
  tp.removeAttribute('lengthAdjust');

  // Motorer
  const ua = navigator.userAgent;
  const isFirefox = /Firefox\//.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  // Fyll banan exakt
  // Lätt “fudge” för att undvika wrap vid kantfall
  if (isFirefox || isSafari) {
    tp.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    tp.setAttribute('textLength', (L * 0.997).toFixed(2));
  } else {
    tp.setAttribute('lengthAdjust', 'spacing');
    tp.setAttribute('textLength', L.toFixed(2));
  }

  // Säkerställ reflow i WebKit
  tp.setAttribute('startOffset', '0%');
  // Force layout tick
  void tp.getComputedTextLength();

  // Responstänk vid font byte och orientering
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      // Upprepa för säkerhets skull när fonten laddat
      const L2 = path.getTotalLength();
      path.setAttribute('pathLength', L2.toFixed(2));
      if (isFirefox || isSafari) {
        tp.setAttribute('lengthAdjust', 'spacingAndGlyphs');
        tp.setAttribute('textLength', (L2 * 0.997).toFixed(2));
      } else {
        tp.setAttribute('lengthAdjust', 'spacing');
        tp.setAttribute('textLength', L2.toFixed(2));
      }
      void tp.getComputedTextLength();
    });
  }

  // Reduced motion respekt för allt annat innehåll
  // SMIL snurren ligger kvar enligt din originaldesign
});




















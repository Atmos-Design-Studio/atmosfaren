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

// =====================
// Ladda och ändra språk
// =====================
async function loadTranslations(lang) {
    try {
        const response = await fetch('dennis-translations.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const translations = await response.json();

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function changeLanguage(lang) {
    const translations = {
        en: { icon: 'bilder/emoji9.webp', name: 'English' },
        sv: { icon: 'bilder/emoji2.webp', name: 'Svenska' },
        de: { icon: 'bilder/emoji10.webp', name: 'Deutsch' },
        es: { icon: 'bilder/emoji11.webp', name: 'Español' },
        fi: { icon: 'bilder/emoji12.webp', name: 'Suomi' },
        fr: { icon: 'bilder/emoji13.webp', name: 'Français' },
        it: { icon: 'bilder/emoji14.webp', name: 'Italiano' },
        ja: { icon: 'bilder/emoji15.webp', name: '日本語' },
        pl: { icon: 'bilder/emoji16.webp', name: 'Polski' },
        ru: { icon: 'bilder/emoji17.webp', name: 'Rosyjski' }
    };

    const currentIcon = document.getElementById('current-language-icon');

    if (!currentIcon) {
        console.error('Current language icon element not found!');
        return;
    }

    // Kontrollera om språket finns i translations-objektet
    if (translations[lang]) {
        currentIcon.src = translations[lang].icon;
        currentIcon.title = translations[lang].name;
        console.log(`Language changed to: ${translations[lang].name}`);
    } else {
        console.error(`Language '${lang}' not found in translations.`);
    }

    // Ladda översättningar
    loadTranslations(lang);
    document.getElementById('language-dropdown').style.display = 'none';
}

// =====================
// Automatisk språkdetektering
// =====================
function detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const availableLanguages = ['en', 'sv', 'de', 'es', 'fi', 'fr', 'it', 'ja', 'pl'];
    const langPrefix = userLang.split('-')[0];

    // Om språket inte stöds, använd engelska som standard
    return availableLanguages.includes(langPrefix) ? langPrefix : 'en';
}

// =====================
// Språk-dropdown
// =====================
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) {
        console.error('Language dropdown element not found!');
        return;
    }
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function setupLanguageDropdown() {
    document.addEventListener('click', event => {
        const dropdown = document.getElementById('language-dropdown');
        const selector = document.querySelector('.language-selector');

        if (!selector.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', event => {
            event.stopPropagation();
        });
    } else {
        console.error('Language dropdown element not found during setup!');
    }
}

// =====================
// Initiera funktion popup bubble
// =====================
class DataTranslate {
    constructor() {
        this.language = navigator.language || 'sv'; // Hämta användarens språkkod, standard 'sv'
        this.translations = {}; // För att lagra översättningar
    }

    async loadTranslations() {
        try {
            // Laddar översättningsfilen (JSON)
            const response = await fetch('dennis-translations.json'); // Ändra denna sökväg till din JSON-fil
            this.translations = await response.json();
        } catch (error) {
            console.error('Kunde inte ladda översättningar:', error);
        }
    }

    translate() {
        // Få språkkod, t.ex., 'sv' eller 'en'
        const lang = this.language.split('-')[0];

        // Hitta alla element med 'data-translate' attributet
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[lang] ? this.translations[lang][key] : null;

            // Uppdatera endast de element som inte är 'bubble-text'
            if (translation && element.id !== 'bubble-text') {
                element.textContent = translation; 
            }
        });
    }
}

// =====================
// Hantera översättning och popup-text
// =====================
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Skapa en instans av DataTranslate och ladda översättningarna
        const translator = new DataTranslate();
        await translator.loadTranslations();
        translator.translate(); // Översätt sidan

        const lang = translator.language.split('-')[0];
        const text = translator.translations[lang]?.welcomeMessage || '';

        if (!text) {
            console.error('Ingen text hittades för översättningen.');
            return;
        }

        const bubbleText = document.getElementById('bubble-text');
        const popup = document.getElementById('popup');

        if (!bubbleText || !popup) {
            console.error('Element saknas: bubble-text eller popup.');
            return;
        }

        let index = 0;

        // Funktion för att animera texten bokstav för bokstav
        function animateText() {
            if (index < text.length) {
                bubbleText.innerHTML += text.charAt(index);
                index++;
                setTimeout(animateText, 50);
            }
        }

        // Visa popupen efter 20 sekunder
        setTimeout(() => {
            console.log('Visar popupen...');
            bubbleText.textContent = ''; // Rensa bubble-text innan animationen
            popup.style.display = 'flex'; // Ändra display till flex
            popup.style.opacity = '1'; // Sätt opacity till 1 för att säkerställa att den är synlig
            animateText(); // Starta textanimationen
        }, 20000); // Justerade tiden till 20 sekunder

        // Eventlistener för stängningsknappen
        document.getElementById('close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Eventlistener för feedback-länken
        document.querySelector('.feedback-link').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    } catch (error) {
        console.error('Fel vid laddning av översättningar eller popup:', error);
    }
});

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
  const textPath = svg.querySelector('textPath');
  const ringGroup = svg.querySelector('.text-ring');
  if (!path || !textPath || !ringGroup) return;

  // Länka säkert
  textPath.setAttribute('href', '#circlePath');
  textPath.setAttribute('xlink:href', '#circlePath');

  // Basfras
  const basePhrase =
    textPath.getAttribute('data-base') ||
    (textPath.textContent || '').trim() ||
    'Atmosfären • Design Studio • Stockholm • Sweden • ';

  // Mätning via canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  function setCanvasFont(fromEl) {
    const cs = getComputedStyle(fromEl);
    const fontStyle = cs.fontStyle || 'normal';
    const fontVariant = cs.fontVariant || 'normal';
    const fontWeight = cs.fontWeight || '400';
    const fontSize = cs.fontSize || '12px';
    const fontFamily = cs.fontFamily || 'sans-serif';
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
  }

  // Anpassa texten till cirkelns omkrets
  function fitTextToCircle() {
    const L = path.getTotalLength();
    path.setAttribute('pathLength', L.toFixed(2));

    const textEl = svg.querySelector('.ring-text') || svg;
    setCanvasFont(textEl);

    let s = basePhrase.trim();
    let guard = 0;
    const target = L * 1.05; // liten buffert så cirkeln alltid täcks

    while (ctx.measureText(s).width < target && guard < 24) {
      s += ' ' + basePhrase;
      guard++;
    }
    textPath.textContent = s;

    // Motor-detektion
    const ua = navigator.userAgent;
    const isFirefox = /Firefox\//.test(ua);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    // Rensa först
    textPath.removeAttribute('textLength');
    textPath.removeAttribute('lengthAdjust');

    if (isFirefox) {
      textPath.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      textPath.setAttribute('textLength', (L * 0.997).toFixed(2));
    } else if (!isSafari) {
      textPath.setAttribute('lengthAdjust', 'spacing');
      textPath.setAttribute('textLength', L.toFixed(2));
    }
    // Safari lämnas utan textLength
  }

  // Styr rörelsen som tidigare via data-attribut
  function applyMotionPrefs() {
    const anim = ringGroup.querySelector('animateTransform');
    if (!anim) return;

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      try { svg.pauseAnimations && svg.pauseAnimations(); } catch (e) {}
      anim.setAttribute('dur', '0s');
      return;
    }

    // Hastighet i sekunder
    const speed = parseFloat(svg.dataset.speed || anim.getAttribute('dur') || '24');
    anim.setAttribute('dur', `${speed}s`);

    // Läge: loop eller pingpong
    const mode = (svg.dataset.mode || 'loop').toLowerCase();
    // Återställ först
    anim.removeAttribute('values');
    anim.removeAttribute('keyTimes');
    anim.removeAttribute('keySplines');
    anim.setAttribute('calcMode', 'linear');
    anim.setAttribute('attributeName', 'transform');
    anim.setAttribute('type', 'rotate');

    if (mode === 'pingpong') {
      // Fram och tillbaka
      anim.setAttribute('values', '0 100 100;360 100 100;0 100 100');
      anim.setAttribute('keyTimes', '0;0.5;1');
      anim.setAttribute('calcMode', 'paced');
      anim.removeAttribute('from');
      anim.removeAttribute('to');
    } else {
      // Normal loop
      anim.setAttribute('from', '0 100 100');
      anim.setAttribute('to', '360 100 100');
    }

    anim.setAttribute('repeatCount', 'indefinite');
  }

  // Init
  fitTextToCircle();
  applyMotionPrefs();

  // Reagera på resize och font-byten
  let pending = null;
  const ro = new ResizeObserver(() => {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => {
      fitTextToCircle();
      applyMotionPrefs();
    });
  });
  ro.observe(svg);
});













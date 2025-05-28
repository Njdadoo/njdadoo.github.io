// Animation pour les éléments au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    const elementsToAnimate = document.querySelectorAll('.contact-title, .contact-subtitle, .highlight-line, .contact-card, .contact-form');

    // Marquer les éléments comme déjà animés
    elementsToAnimate.forEach(element => {
        element.classList.add('animation-applied');
    });

    // Ajouter la classe 'loaded' au body pour déclencher les animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);

    // Vérifier s'il y a un thème enregistré en local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Vérifier s'il y a une langue enregistrée en local storage
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        document.getElementById('lang-toggle').textContent = savedLang;
        if (savedLang === 'EN') {
            changeLangToEnglish();
        } else {
            changeLangToFrench();
        }
    }

    // Observer les éléments à animer au défilement
    const animateElements = document.querySelectorAll('.skill-card, .portfolio-card, .competence');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Détection de défilement pour la barre de navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Configuration des boutons avec animation
    setupAnimationHandlers();
});

// Animation pour les formes de fond
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.01;
        shape.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
    });
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation pour les boutons du portfolio
document.querySelectorAll('.portfolio-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        // Effet de survol
        this.classList.add('hover');
    });

    button.addEventListener('mouseleave', function() {
        // Retirer l'effet
        this.classList.remove('hover');
    });

    button.addEventListener('mousedown', function() {
        // Effet de clic
        const timeout = setTimeout(function() {
            window.scrollBy(0, -1); // May need to be -1 to go down
        }, 0); // Play around with this number. May go too fast

        return false;
    });
});

function changeLangToEnglish() {
    // Préserver l'état d'animation avant de changer le texte
    document.querySelectorAll('[data-en]').forEach(element => {
        // Sauvegarder les classes actuelles pour préserver l'état d'animation
        const hasAnimation = element.classList.contains('animation-applied');

        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            const span = element.querySelector('span');
            if (span) {
                span.textContent = element.getAttribute('data-en');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        } else {
            element.textContent = element.getAttribute('data-en');
        }

        // S'assurer que l'état d'animation est préservé
        if (hasAnimation) {
            element.classList.add('animation-applied');
        }
    });
    // Changer la langue du HTML
    document.documentElement.setAttribute('lang', 'en');
}
Fa
// Fonction pour changer la langue en français
function changeLangToFrench() {
    document.querySelectorAll('[data-fr]').forEach(element => {
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            const span = element.querySelector('span');
            if (span) {
                span.textContent = element.getAttribute('data-fr');
            } else {
                element.textContent = element.getAttribute('data-fr');
            }
        } else {
            element.textContent = element.getAttribute('data-fr');
        }
    });
    // Changer le <html lang="en"> en <html lang="fr">
    document.documentElement.setAttribute('lang', 'fr');
}

// Configuration des gestionnaires d'événements pour les animations
function setupAnimationHandlers() {
    console.log("Setting up animation handlers");

    // Bouton de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log("Theme toggle button found");
        themeToggle.addEventListener('click', function(e) {
            console.log("Theme toggle clicked");
            e.preventDefault(); // Empêcher un comportement par défaut potentiel

            // Supprimer puis réajouter la classe pour relancer l'animation
            this.classList.remove('theme-animation');
            // Force le recalcul de style pour garantir que l'animation est réappliquée
            void this.offsetWidth;
            this.classList.add('theme-animation');

            document.body.classList.add('theme-transition');

            const html = document.documentElement;
            if (html.getAttribute('data-theme') === 'dark') {
                html.setAttribute('data-theme', 'light');
                this.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                this.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }

            // Retirer la classe d'animation après la fin
            setTimeout(() => {
                this.classList.remove('theme-animation');
                document.body.classList.remove('theme-transition');
            }, 700);
        });
    } else {
        console.warn("Theme toggle button not found");
    }

    // Bouton de langue
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        console.log("Language toggle button found");
        langToggle.addEventListener('click', function(e) {
            console.log("Language toggle clicked");
            e.preventDefault(); // Empêcher un comportement par défaut potentiel

            // Supprimer puis réajouter la classe pour relancer l'animation
            this.classList.remove('lang-animation');
            // Force le recalcul de style
            void this.offsetWidth;
            this.classList.add('lang-animation');

            // Animer tous les éléments qui vont changer
            document.querySelectorAll('[data-en], [data-fr]').forEach(el => {
                el.classList.remove('lang-animation');
                void el.offsetWidth; // Force le recalcul
                el.classList.add('lang-animation');
            });

            const currentLang = this.textContent;
            if (currentLang === 'FR') {
                this.textContent = 'EN';
                changeLangToEnglish();
                localStorage.setItem('lang', 'EN');
            } else {
                this.textContent = 'FR';
                changeLangToFrench();
                localStorage.setItem('lang', 'FR');
            }

            // Retirer les classes d'animation après la fin
            setTimeout(() => {
                this.classList.remove('lang-animation');
                document.querySelectorAll('[data-en], [data-fr]').forEach(el => {
                    el.classList.remove('lang-animation');
                });
            }, 500);
        });
    } else {
        console.warn("Language toggle button not found");
    }
}

// Code de débogage qui affiche des informations dans la console
console.log("Vérification des boutons d'animation:");
console.log("Theme toggle:", document.getElementById('theme-toggle'));
console.log("Lang toggle:", document.getElementById('lang-toggle'));
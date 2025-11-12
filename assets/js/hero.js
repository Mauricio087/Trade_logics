// ===== FUNCIONALIDAD DE LA SECCIÓN HERO =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FUNCIÓN DE SCROLL SUAVE A SECCIONES =====
    
    // Función global para hacer scroll a una sección específica
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const header = document.querySelector('.header');
        
        if (targetSection) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // ===== EFECTOS DE PARALLAX SUAVE EN EL HERO =====
    
    const hero = document.querySelector('.hero');
    const heroContainer = document.querySelector('.hero-container');
    const particles = document.querySelectorAll('.particle');
    
    // Función para el efecto parallax
    function handleParallax() {
        if (!hero) return;
        
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const scrollPercent = scrolled / heroHeight;
        
        // Solo aplicar parallax si estamos en la sección hero
        if (scrollPercent <= 1) {
            // Efecto parallax en el contenido principal
            if (heroContainer) {
                heroContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContainer.style.opacity = 1 - (scrollPercent * 0.8);
            }
            
            // Efecto parallax en las partículas
            particles.forEach((particle, index) => {
                const speed = 0.2 + (index * 0.1);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }
    
    // Throttle para optimizar el rendimiento del parallax
    let parallaxTimeout;
    function throttleParallax() {
        if (parallaxTimeout) return;
        
        parallaxTimeout = setTimeout(() => {
            handleParallax();
            parallaxTimeout = null;
        }, 16); // ~60fps
    }
    
    // Event listener para el parallax (solo en desktop)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', throttleParallax);
    }
    
    // ===== ANIMACIÓN DE ENTRADA DEL HERO =====
    
    // Función para animar la entrada del hero
    function animateHeroEntrance() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Resetear animaciones si es necesario
        [heroTitle, heroSubtitle, heroCta, scrollIndicator].forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });
        
        // Animar elementos secuencialmente
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.transition = 'all 1s ease-out';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 300);
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.transition = 'all 1s ease-out';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 600);
        
        setTimeout(() => {
            if (heroCta) {
                heroCta.style.transition = 'all 1s ease-out';
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }
        }, 900);
        
        setTimeout(() => {
            if (scrollIndicator) {
                scrollIndicator.style.transition = 'all 1s ease-out';
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        }, 1200);
    }
    
    // ===== EFECTOS ADICIONALES =====
    
    // Función para crear partículas adicionales dinámicamente
    function createDynamicParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
        // Crear partículas adicionales para pantallas grandes
        if (window.innerWidth > 1024) {
            for (let i = 0; i < 3; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = Math.random() * 8 + 4 + 'px';
                particle.style.height = particle.style.width;
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = Math.random() * 4 + 4 + 's';
                
                heroParticles.appendChild(particle);
            }
        }
    }
    
    // ===== MANEJO DE REDIMENSIONAMIENTO =====
    
    function handleResize() {
        // Desactivar parallax en móvil
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', throttleParallax);
            
            // Resetear transformaciones en móvil
            if (heroContainer) {
                heroContainer.style.transform = '';
                heroContainer.style.opacity = '';
            }
            
            particles.forEach(particle => {
                particle.style.transform = '';
            });
        } else {
            window.addEventListener('scroll', throttleParallax);
        }
    }
    
    // Event listener para redimensionamiento
    window.addEventListener('resize', handleResize);
    
    // ===== ACCESIBILIDAD =====
    
    // Función para manejar la navegación por teclado
    function handleKeyboardNavigation(e) {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (e.key === 'Enter' || e.key === ' ') {
            if (document.activeElement === scrollIndicator) {
                e.preventDefault();
                scrollToSection('about');
            }
        }
    }
    
    // Event listener para navegación por teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Hacer el indicador de scroll accesible por teclado
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.setAttribute('tabindex', '0');
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('aria-label', 'Desplazarse a la siguiente sección');
    }
    
    // ===== INICIALIZACIÓN =====
    
    // Ejecutar funciones iniciales
    animateHeroEntrance();
    createDynamicParticles();
    handleResize();
    
    // Intersection Observer para optimizar animaciones
    if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero está visible - activar animaciones
                    entry.target.classList.add('hero-visible');
                } else {
                    // Hero no está visible - pausar animaciones innecesarias
                    entry.target.classList.remove('hero-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        if (hero) {
            heroObserver.observe(hero);
        }
    }
    
    console.log('Hero JavaScript cargado correctamente');
});
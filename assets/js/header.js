// ===== FUNCIONALIDAD DEL HEADER =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Variables para el control del scroll
    let lastScrollTop = 0;
    let scrollTimeout;
    
    // ===== FUNCIONALIDAD DEL MENÚ HAMBURGUESA =====
    
    // Toggle del menú móvil
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Cerrar menú móvil
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners para el menú hamburguesa
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer click en el overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            
            // Scroll suave a la sección correspondiente
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== EFECTOS DE SCROLL DEL HEADER =====
    
    // Función para manejar el scroll del header
    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase 'scrolled' cuando se hace scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en scroll (solo en desktop)
        if (window.innerWidth > 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling hacia abajo - ocultar header
                header.classList.add('hidden');
            } else {
                // Scrolling hacia arriba - mostrar header
                header.classList.remove('hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    
    // Throttle para optimizar el rendimiento del scroll
    function throttleScroll() {
        if (scrollTimeout) {
            return;
        }
        
        scrollTimeout = setTimeout(() => {
            handleHeaderScroll();
            scrollTimeout = null;
        }, 10);
    }
    
    // Event listener para el scroll
    window.addEventListener('scroll', throttleScroll);
    
    // ===== NAVEGACIÓN ACTIVA =====
    
    // Función para actualizar el enlace activo basado en la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover clase active de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar clase active al enlace correspondiente
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Event listener para actualizar navegación activa
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== MANEJO DE REDIMENSIONAMIENTO DE VENTANA =====
    
    // Función para manejar el redimensionamiento de la ventana
    function handleWindowResize() {
        // Cerrar menú móvil si se redimensiona a desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Remover clase hidden si se redimensiona a móvil
        if (window.innerWidth <= 768) {
            header.classList.remove('hidden');
        }
    }
    
    // Event listener para redimensionamiento
    window.addEventListener('resize', handleWindowResize);
    
    // ===== ACCESIBILIDAD =====
    
    // Manejo de teclas para accesibilidad
    document.addEventListener('keydown', function(e) {
        // Cerrar menú con tecla Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Navegación con teclado en el menú
        if (navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('.nav-link');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab - ir hacia atrás
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab - ir hacia adelante
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }
    });
    
    // ===== INICIALIZACIÓN =====
    
    // Ejecutar funciones iniciales
    updateActiveNavLink();
    handleHeaderScroll();
    
    // Crear overlay si no existe
    if (!navOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        // Agregar event listener al nuevo overlay
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    console.log('Header JavaScript cargado correctamente');
});
// ===== FUNCIONALIDAD DE TESTIMONIOS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DATOS DE TESTIMONIOS =====
    const testimonials = [
        {
            id: 1,
            quote: "Importar siempre me pareció un proceso complicado y lleno de riesgos. Con TradeLogics no solo recibí mi carga a tiempo, sino que también me asesoraron en la pre-importación y financiamiento. Hoy mi negocio crece con seguridad.",
            author: "Carolina Martínez",
            position: "Gerente de TexGlobal SpA",
            company: "Pyme Textil",
            category: "textil"
        },
        {
            id: 2,
            quote: "Nuestro mayor miedo eran los trámites aduaneros y los costos ocultos. El equipo de TradeLogics nos dio total transparencia y acompañamiento. Ahora confiamos cada embarque a ellos, porque sabemos que llegará seguro.",
            author: "Rodrigo Herrera",
            position: "Director Comercial de AndesTech Ltda.",
            company: "Empresa Tecnológica",
            category: "tecnologia"
        },
        {
            id: 3,
            quote: "Gracias al financiamiento ofrecido por TradeLogics logramos traer nuestra primera importación de forma ordenada y sin descapitalizarnos. Hoy estamos listos para abrir nuevos mercados.",
            author: "María José Gómez",
            position: "Fundadora de Alimentos Andinos SpA",
            company: "Pyme Alimentaria",
            category: "alimentaria"
        },
        {
            id: 4,
            quote: "Lo que más valoro es la comunicación. Siempre sé dónde está mi carga y qué pasos siguen. TradeLogics se convirtió en un verdadero socio estratégico, no solo en un proveedor.",
            author: "Javier Paredes",
            position: "CEO de Distribuciones Sur Ltda.",
            company: "Distribuidora Retail",
            category: "retail"
        }
    ];
    
    // ===== FUNCIÓN PARA RENDERIZAR TESTIMONIOS =====
    function renderTestimonials() {
        const testimonialsGrid = document.getElementById('testimonials-grid');
        
        if (!testimonialsGrid) {
            console.warn('Contenedor de testimonios no encontrado');
            return;
        }
        
        // Limpiar contenido existente
        testimonialsGrid.innerHTML = '';
        
        // Crear elementos de testimonios
        testimonials.forEach((testimonial, index) => {
            const testimonialElement = createTestimonialElement(testimonial, index);
            testimonialsGrid.appendChild(testimonialElement);
        });
        
        // Aplicar animaciones de entrada
        animateTestimonials();
    }
    
    // ===== FUNCIÓN PARA CREAR ELEMENTO DE TESTIMONIO =====
    function createTestimonialElement(testimonial, index) {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.className = 'testimonial-item';
        // Hacer la card enfocables para accesibilidad y :focus-visible
        testimonialDiv.setAttribute('tabindex', '0');
        testimonialDiv.setAttribute('data-category', testimonial.category);
        testimonialDiv.style.animationDelay = `${index * 0.2}s`;
        
        testimonialDiv.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-quote">
                    <svg class="quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
                    </svg>
                    <p>"${testimonial.quote}"</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4 class="author-name">${testimonial.author}</h4>
                        <p class="author-position">${testimonial.position}</p>
                        <span class="testimonial-company">${testimonial.company}</span>
                    </div>
                </div>
            </div>
        `;
        
        return testimonialDiv;
    }
    
    // ===== ANIMACIONES DE TESTIMONIOS =====
    function animateTestimonials() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        // Intersection Observer para animaciones al hacer scroll
        if ('IntersectionObserver' in window) {
            const testimonialObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            testimonialItems.forEach(item => {
                testimonialObserver.observe(item);
            });
        } else {
            // Fallback para navegadores sin soporte
            testimonialItems.forEach(item => {
                item.classList.add('animate-in');
            });
        }
    }
    
    // ===== FUNCIONALIDAD DE FILTRADO (OPCIONAL) =====
    function filterTestimonials(category) {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        testimonialItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.classList.add('animate-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('animate-in');
            }
        });
    }
    
    // ===== FUNCIONALIDAD DE CARRUSEL (OPCIONAL PARA MÓVIL) =====
    function initTestimonialCarousel() {
        const testimonialsGrid = document.getElementById('testimonials-grid');
        
        if (window.innerWidth <= 768) {
            testimonialsGrid.classList.add('testimonials-carousel');
            
            let currentIndex = 0;
            const testimonialItems = document.querySelectorAll('.testimonial-item');
            
            // Crear controles de navegación
            const navControls = document.createElement('div');
            navControls.className = 'testimonial-nav';
            navControls.innerHTML = `
                <button class="nav-btn prev-btn" aria-label="Testimonio anterior">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                    </svg>
                </button>
                <div class="testimonial-dots"></div>
                <button class="nav-btn next-btn" aria-label="Siguiente testimonio">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                    </svg>
                </button>
            `;
            
            testimonialsGrid.parentNode.appendChild(navControls);
            
            // Crear dots de navegación
            const dotsContainer = navControls.querySelector('.testimonial-dots');
            testimonialItems.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('data-index', index);
                dot.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
                dotsContainer.appendChild(dot);
            });
            
            // Event listeners para navegación
            const prevBtn = navControls.querySelector('.prev-btn');
            const nextBtn = navControls.querySelector('.next-btn');
            const dots = navControls.querySelectorAll('.dot');
            
            prevBtn.addEventListener('click', () => showTestimonial(currentIndex - 1));
            nextBtn.addEventListener('click', () => showTestimonial(currentIndex + 1));
            
            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    showTestimonial(index);
                });
            });
            
            // Función para mostrar testimonio específico (control por clase)
            function showTestimonial(index) {
                if (index < 0) index = testimonialItems.length - 1;
                if (index >= testimonialItems.length) index = 0;
                
                currentIndex = index;
                
                testimonialItems.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
                
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            
            // Mostrar primer testimonio
            showTestimonial(0);
            
            // Auto-play opcional
            setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 5000);
        }
    }
    
    // ===== INICIALIZACIÓN =====
    
    // Renderizar testimonios al cargar la página
    renderTestimonials();
    
    // Exponer funciones globalmente si es necesario
    window.filterTestimonials = filterTestimonials;
    
    console.log('Testimonials JavaScript cargado correctamente');
});
const CONFIG = {
    animation: {
        cardHover: true,
        lazyLoad: true,
        scrollReveal: true
    },
    performance: {
        useIntersectionObserver: true,
        debounceScroll: true
    }
};

const SERVICOS = [
    { icone: "mdi:puzzle", titulo: "Supervisão ABA", cor: "lilas" },
    { icone: "material-symbols:psychology", titulo: "Psicologia", cor: "rosa" },
    { icone: "material-symbols:neurology", titulo: "Avaliação Neuropsicológica", cor: "amarelo" },
    { icone: "mdi:hand-heart", titulo: "Terapia Ocupacional (Integração Sensorial / AVD)", cor: "azul" },
    { icone: "mdi:silverware-fork-knife", titulo: "Terapia Alimentar (Nutrição / Cozinha Terapêutica)", cor: "rosa" },
    { icone: "mdi:account-voice", titulo: "Fonoaudiologia", cor: "azul" },
    { icone: "mdi:run-fast", titulo: "Psicomotricidade (Funcional e Relacional)", cor: "verde" },
    { icone: "mdi:book-open-variant", titulo: "Psicopedagogia (Clínica e Institucional)", cor: "lilas" },
    { icone: "mdi:arm-flex-outline", titulo: "Fisioterapia Motora", cor: "verde" },
    { icone: "mdi:music-note", titulo: "Musicoterapia", cor: "rosa" },
    { icone: "mdi:horse-variant", titulo: "Equoterapia", cor: "amarelo" },
    { icone: "mdi:pool", titulo: "Terapia Aquática", cor: "azul" },
    { icone: "mdi:account-group", titulo: "Treinamento Parental", cor: "lilas" },
    { icone: "mdi:home-heart", titulo: "Acompanhamento Terapêutico (AT) – Escolar / Domiciliar / Clínico", cor: "rosa" },
    { icone: "mdi:school-outline", titulo: "Treinamentos e Capacitações", cor: "verde" }
];

const DOM_CACHE = {
    cardsServicos: document.getElementById('cards-servicos'),
    footerCopy: document.querySelector('.copyright'),
    whatsappBtn: document.querySelector('.whatsapp-btn'),
    whatsappFloat: document.querySelector('.whatsapp-float'),
    mobileMenuBtn: document.querySelector('.menu-mobile-btn'),
    nav: document.querySelector('nav'),
    logo: document.querySelector('.logo')
};

const Utils = {
    debounce: (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    formatWhatsAppMessage: () => {
        const defaultMessage = `Olá, gostaria de agendar uma consulta na Casa do Autista. Por favor, podem me informar sobre horários disponíveis?`;
        return encodeURIComponent(defaultMessage);
    },

    generateWhatsAppLink: () => {
        const phoneNumber = '558179059047';
        const message = Utils.formatWhatsAppMessage();
        return `https://wa.me/${phoneNumber}?text=${message}`;
    },

    scrollToTop: () => {
        if (window.scrollY === 0) return;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,

    isMobile: () => window.innerWidth <= 768
};

function initAOS() {
    if (typeof AOS !== 'undefined' && window.innerWidth > 768) {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: () => window.innerWidth < 768
        });
    }
}

function setupCardAnimations() {
    if (Utils.isMobile()) return;
    
    const cards = document.querySelectorAll('#servicos .card, .convenio-card');
    
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        cards.forEach(card => observer.observe(card));
    }
}

function setupCardHoverEffects() {
    if (!CONFIG.animation.cardHover || Utils.isMobile() || Utils.isIOS()) return;
    
    document.querySelectorAll('#cards-servicos .card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            card.style.zIndex = '1';
        });
    });
}

function setupScrollAnimations() {
    if (!CONFIG.animation.scrollReveal || !window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                if (entry.target.classList.contains('card') || 
                    entry.target.classList.contains('whatsapp-agendamento-card')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    
    document.querySelectorAll('[data-aos], .card, .whatsapp-agendamento-card').forEach(el => {
        observer.observe(el);
    });
}

function setupSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.pushState(null, null, href);
                
                closeMobileMenu();
            }
        });
    });
}

function setupMobileMenu() {
    const menuBtn = DOM_CACHE.mobileMenuBtn;
    const nav = DOM_CACHE.nav;
    
    if (!menuBtn || !nav || !Utils.isMobile()) return;
    
    if (!menuBtn.querySelector('span')) {
        const span = document.createElement('span');
        menuBtn.appendChild(span);
    }
    
    function toggleMenu() {
        const isOpen = nav.classList.contains('active');
        
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        document.documentElement.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', (!isOpen).toString());
        
        let backdrop = document.querySelector('.menu-backdrop');
        
        if (!isOpen) {
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'menu-backdrop';
                backdrop.addEventListener('click', toggleMenu);
                document.body.appendChild(backdrop);
            }
            backdrop.classList.add('active');
        } else {
            if (backdrop) {
                backdrop.classList.remove('active');
                setTimeout(() => {
                    if (backdrop && backdrop.parentNode) {
                        backdrop.remove();
                    }
                }, 300);
            }
        }
    }
    
    function closeMobileMenu() {
        if (nav.classList.contains('active') && Utils.isMobile()) {
            toggleMenu();
        }
    }
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    const menuLinks = nav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                setTimeout(closeMobileMenu, 300);
            }
        });
    });
    
    window.addEventListener('resize', () => {
        if (!Utils.isMobile() && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    return { toggleMenu, closeMobileMenu };
}

function setupLogoInteraction() {
    const logo = DOM_CACHE.logo;
    if (!logo) return;
    
    function updateLogoBehavior() {
        if (!Utils.isMobile()) {
            logo.style.cursor = 'pointer';
            logo.setAttribute('role', 'button');
            logo.setAttribute('tabindex', '0');
            logo.setAttribute('aria-label', 'Voltar ao topo da página');
            
            const newLogo = logo.cloneNode(true);
            logo.parentNode.replaceChild(newLogo, logo);
            
            const currentLogo = document.querySelector('.logo');
            currentLogo.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.scrollY > 0) {
                    Utils.scrollToTop();
                }
            });
        } else {
            logo.style.cursor = 'default';
            logo.removeAttribute('role');
            logo.removeAttribute('tabindex');
            logo.removeAttribute('aria-label');
            
            const newLogo = logo.cloneNode(true);
            logo.parentNode.replaceChild(newLogo, logo);
        }
    }
    
    updateLogoBehavior();
    
    window.addEventListener('resize', Utils.debounce(updateLogoBehavior, 250));
}

function setupSimpleLogoInteraction() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    setTimeout(() => {
        if (!Utils.isMobile()) {
            logo.style.cursor = 'pointer';
            logo.setAttribute('aria-label', 'Voltar ao topo');
            
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.scrollY > 0) {
                    Utils.scrollToTop();
                }
            });
        }
    }, 500);
}

function setupUnidadesInteraction() {
    const unidadesCards = document.querySelectorAll('.unidade-card');
    const mapaIframe = document.getElementById('mapa-unidade');
    const enderecoElement = document.getElementById('endereco-unidade');
    const horarioElement = document.getElementById('horario-unidade');
    const footerHorario = document.getElementById('footer-horario');
    const mapsLink = document.getElementById('link-maps');
    
    if (!unidadesCards.length || !mapaIframe) return;
    
    function atualizarUnidade(unidadeCard) {
        if (unidadeCard.classList.contains('em-breve')) {
            alert('Unidade Paulista em breve! Fique atento às nossas redes sociais para a data de inauguração.');
            return;
        }
        
        unidadesCards.forEach(card => card.classList.remove('active'));
        unidadeCard.classList.add('active');
        
        const mapaSrc = unidadeCard.dataset.map;
        const endereco = unidadeCard.dataset.endereco;
        const mapsLinkUrl = unidadeCard.dataset.mapslink;
        const whatsapp = unidadeCard.dataset.whatsapp;
        const horario = unidadeCard.dataset.horario;
        
        if (mapaSrc && mapaIframe) {
            mapaIframe.src = mapaSrc;
        }
        
        if (endereco && enderecoElement) {
            const partesEndereco = endereco.split('-');
            enderecoElement.innerHTML = `
                <i class="fas fa-map-marker-alt"></i>
                <strong>${partesEndereco[0].trim()}</strong><br>
                ${partesEndereco.slice(1).join('-').trim()}
            `;
        }
        
        if (horario && horarioElement) {
            horarioElement.textContent = horario;
        }
        
        if (horario && footerHorario) {
            footerHorario.textContent = horario.replace(' | ', '\n');
        }
        
        if (mapsLinkUrl && mapsLink) {
            mapsLink.href = mapsLinkUrl;
        }
        
        if (whatsapp) {
            atualizarLinksWhatsApp(whatsapp);
        }
    }
    
    function atualizarLinksWhatsApp(numero) {
        const whatsappLinks = document.querySelectorAll('[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            const newHref = link.href.replace(/wa\.me\/\d+/, `wa.me/${numero}`);
            link.href = newHref;
        });
    }
    
    unidadesCards.forEach(card => {
        card.addEventListener('click', () => atualizarUnidade(card));
    });
    
    const unidadeAtiva = document.querySelector('.unidade-card.active');
    if (unidadeAtiva) {
        atualizarUnidade(unidadeAtiva);
    }
}

function setupWhatsAppButtons() {
    const whatsappLink = Utils.generateWhatsAppLink();
    
    if (DOM_CACHE.whatsappBtn) {
        DOM_CACHE.whatsappBtn.href = whatsappLink;
        DOM_CACHE.whatsappBtn.setAttribute('target', '_blank');
        DOM_CACHE.whatsappBtn.setAttribute('rel', 'noopener');
    }
    
    if (DOM_CACHE.whatsappFloat) {
        DOM_CACHE.whatsappFloat.href = whatsappLink;
        DOM_CACHE.whatsappFloat.setAttribute('target', '_blank');
        DOM_CACHE.whatsappFloat.setAttribute('rel', 'noopener');
    }
    
    const navWhatsappBtn = document.querySelector('nav a.btn-destaque');
    if (navWhatsappBtn) {
        navWhatsappBtn.href = whatsappLink;
        navWhatsappBtn.setAttribute('target', '_blank');
        navWhatsappBtn.setAttribute('rel', 'noopener');
        
        if (Utils.isMobile()) {
            navWhatsappBtn.addEventListener('click', function() {
                const nav = document.querySelector('nav');
                const menuBtn = document.querySelector('.menu-mobile-btn');
                
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuBtn.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.documentElement.classList.remove('menu-open');
                    
                    const backdrop = document.querySelector('.menu-backdrop');
                    if (backdrop) backdrop.remove();
                }
            });
        }
    }
}

function renderServicos() {
    if (!DOM_CACHE.cardsServicos) return;
    
    DOM_CACHE.cardsServicos.innerHTML = SERVICOS.map((servico, index) => `
        <div class="card card-${servico.cor}"
             data-aos="fade-up"
             data-aos-delay="${index * 50}">
            <div class="icone-wrapper">
                <iconify-icon 
                    icon="${servico.icone}" 
                    class="icone-servico" 
                    aria-hidden="true">
                </iconify-icon>
            </div>
            <h4>${servico.titulo}</h4>
        </div>
    `).join('');
    
    setupCardHoverEffects();
}

function updateFooterYear() {
    const year = new Date().getFullYear();
    if (DOM_CACHE.footerCopy) {
        DOM_CACHE.footerCopy.innerHTML = `&copy; ${year} Casa do Autista. Todos os direitos reservados.`;
    }
}

function applyBrowserFixes() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = Utils.isIOS();
    const isSamsungBrowser = /SamsungBrowser/i.test(userAgent);
    
    if (isIOS) {
        document.documentElement.classList.add('ios-device');
        CONFIG.animation.cardHover = false;
        
        const servicosSection = document.getElementById('servicos');
        if (servicosSection) {
            servicosSection.style.webkitTransform = 'translate3d(0,0,0)';
            servicosSection.style.transform = 'translate3d(0,0,0)';
        }
    }
    
    if (isSamsungBrowser) {
        document.documentElement.classList.add('samsung-browser');
    }
}

function initializeApp() {
    applyBrowserFixes();
    
    initAOS();
    
    renderServicos();
    updateFooterYear();
    
    setupCardAnimations();
    setupSmoothScroll();
    setupLogoInteraction();
    setupUnidadesInteraction();
    setupMobileMenu();
    setupScrollAnimations();
    setupWhatsAppButtons();
    
    window.addEventListener('resize', Utils.debounce(() => {
        const isMobileNow = Utils.isMobile();
        
        if (isMobileNow && CONFIG.animation.cardHover) {
            CONFIG.animation.cardHover = false;
        } else if (!isMobileNow && !CONFIG.animation.cardHover && !Utils.isIOS()) {
            CONFIG.animation.cardHover = true;
            setupCardHoverEffects();
            setupCardAnimations();
        }
        
        if (isMobileNow) {
            setupMobileMenu();
        }
        
        setupLogoInteraction();
    }, 250));

    document.body.classList.add('loaded');
}

window.addEventListener('load', function() {
    if (window.location.hash) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(function() {
            history.replaceState(null, null, ' ');
        }, 100);
    }
    
    if (Utils.isMobile()) {
        window.scrollTo(0, 0);
        setTimeout(() => window.scrollTo(0, 0), 50);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (Utils.isMobile()) {
        setTimeout(() => window.scrollTo(0, 0), 100);
    }
    
    setupSimpleLogoInteraction();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
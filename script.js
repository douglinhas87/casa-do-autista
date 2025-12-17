const config = {
    animation: {
        cardHover: false,
        lazyLoad: true,
        scrollReveal: true
    },
    performance: {
        useIntersectionObserver: true,
        debounceScroll: true
    }
};

function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: function() {
            return window.innerWidth < 768;
        }
    });
}

const servicos = [
    { icone: "mdi:brain", titulo: "Neuropediatria", descricao: "Avaliação e acompanhamento médico especializado em neurodesenvolvimento infantil" },
    { icone: "mdi:puzzle", titulo: "Supervisão ABA", descricao: "Supervisão técnica de programas de intervenção ABA para desenvolvimento infantil" },
    { icone: "mdi:head-cog", titulo: "Terapeuta Cognitivo Comportamental", descricao: "Intervenções baseadas na análise e modificação de pensamentos e comportamentos" },
    { icone: "mdi:hand-heart", titulo: "Terapeuta Ocupacional com Integração Sensorial", descricao: "Atividades para melhorar a integração sensorial e a autonomia da criança" },
    { icone: "mdi:music-note", titulo: "Musicoterapia", descricao: "Uso da música para desenvolver habilidades emocionais, cognitivas e sociais" },
    { icone: "mdi:horse-variant", titulo: "Equoterapia", descricao: "Terapia assistida por cavalos que estimula o desenvolvimento global" },
    { icone: "mdi:run-fast", titulo: "Psicomotricidade", descricao: "Trabalho corporal que une movimento, emoção e cognição" },
    { icone: "mdi:book-open-variant", titulo: "Psicopedagogia Clínica e Institucional", descricao: "Acompanhamento das dificuldades de aprendizagem no ambiente clínico e escolar" },
    { icone: "mdi:account-voice", titulo: "Fonoaudiologia", descricao: "Estimulação da comunicação, linguagem, fala e audição" },
    { icone: "mdi:brain", titulo: "Cognitivo Comportamental", descricao: "Terapia voltada à mudança de comportamentos e pensamentos disfuncionais" },
    { icone: "material-symbols:psychology", titulo: "Psicologia", descricao: "Apoio emocional e psicológico para o desenvolvimento infantil" },
    { icone: "material-symbols:neurology", titulo: "Avaliação Neuropsicológica", descricao: "Análise do funcionamento cerebral relacionado ao comportamento e cognição" },
    { icone: "mdi:account-heart-outline", titulo: "Médico da Família", descricao: "Acompanhamento integral da saúde da criança e sua família" },
    { icone: "mdi:human-child", titulo: "Pediasuit (Terapia Intensiva)", descricao: "Terapia intensiva para reabilitação neuromotora" },
    { icone: "mdi:account-group", titulo: "Suporte aos Pais e Treinamento Parental", descricao: "Orientações para desenvolvimento de práticas educativas em casa" },
    { icone: "mdi:home-heart", titulo: "Atendimento Terapêutico (AT) Escolar e Domiciliar", descricao: "Acompanhamento terapêutico individualizado no ambiente escolar e em casa" },
    { icone: "mdi:pool", titulo: "Terapia Aquática", descricao: "Terapia realizada na água para estimular o desenvolvimento físico e sensorial" },
    { icone: "mdi:arm-flex-outline", titulo: "Fisioterapia Motora (Método Bobath e outros)", descricao: "Técnicas terapêuticas para melhorar o movimento e a coordenação" },
    { icone: "mdi:whistle-outline", titulo: "Educador Físico", descricao: "Atividades físicas adaptadas para crianças com necessidades especiais" },
    { icone: "mdi:silverware-fork-knife", titulo: "Terapia Alimentar", descricao: "Estimulação das habilidades alimentares e comportamentos relacionados à alimentação" },
    { icone: "mdi:baby-face-outline", titulo: "Nutrição Infantil", descricao: "Orientações nutricionais para uma alimentação saudável desde a infância" }
];

/* 
CONVÊNIOS COMENTADOS - REATIVAR FUTURAMENTE
const convenios = [
    { nome: "Unimed", logo: "unimed.png" },
    { nome: "Amil", logo: "amil.png" },
    { nome: "Bradesco Saúde", logo: "bradesco.png" },
    { nome: "SulAmérica", logo: "sulamerica.png" }
];
*/

const DOM = {
    cardsServicos: document.getElementById('cards-servicos'),
    // cardsConvenios: document.getElementById('cards-convenios'), // COMENTADO: Elemento de convênios
    footerCopy: document.querySelector('.copyright'),
    whatsappBtn: document.querySelector('.whatsapp-btn'),
    whatsappFloat: document.querySelector('.whatsapp-float'),
    mobileMenuBtn: document.querySelector('.menu-mobile-btn'),
    nav: document.querySelector('nav')
};

const utils = {
    debounce: (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    lazyLoad: (element) => {
        if (config.animation.lazyLoad && element) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('fade-in');
                        observer.unobserve(img);
                    }
                });
            }, { threshold: 0.1 });

            element.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
            });
        }
    },

    animateOnScroll: (element) => {
        if (config.animation.scrollReveal && element) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(element);
        }
    },

    formatWhatsAppMessage: () => {
        const defaultMessage = `Olá, gostaria de agendar uma consulta na Casa do Autista. Por favor, podem me informar sobre horários disponíveis?`;
        return encodeURIComponent(defaultMessage);
    },

    initWhatsApp: () => {
        const phoneNumber = '558179059047';
        const message = utils.formatWhatsAppMessage();
        return `https://wa.me/${phoneNumber}?text=${message}`;
    },

    setupHoverEffects: () => {
        if (!config.animation.cardHover) return;

        document.querySelectorAll('#cards-servicos .card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                card.style.zIndex = '1';
            });
        });

        /* COMENTADO: Efeitos hover para convênios
        document.querySelectorAll('#cards-convenios .convenio-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
                card.style.zIndex = '10';
                const img = card.querySelector('img');
                if (img) img.style.filter = 'none';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                card.style.zIndex = '1';
                const img = card.querySelector('img');
                if (img) img.style.filter = 'grayscale(100%)';
            });
        });
        */
    }
};

function setupUnidades() {
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
    
    unidadesCards.forEach(card => {
        card.addEventListener('click', () => atualizarUnidade(card));
    });
    
    function atualizarLinksWhatsApp(numero) {
        const whatsappLinks = document.querySelectorAll('[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            const newHref = link.href.replace(/wa\.me\/\d+/, `wa.me/${numero}`);
            link.href = newHref;
        });
    }
    
    const unidadeAtiva = document.querySelector('.unidade-card.active');
    if (unidadeAtiva) {
        atualizarUnidade(unidadeAtiva);
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const offsetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, href);
                    
                    if (window.innerWidth <= 768 && DOM.nav.classList.contains('active')) {
                        DOM.mobileMenuBtn.innerHTML = '☰';
                        DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                        DOM.nav.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    });
}

const render = {
    servicos: () => {
        DOM.cardsServicos.innerHTML = servicos.map((servico, index) => `
            <div class="card" 
                 data-aos="fade-up" 
                 data-aos-delay="${index * 50}">
                <iconify-icon icon="${servico.icone}" class="icone-servico"></iconify-icon>
                <h4>${servico.titulo}</h4>
                <p>${servico.descricao}</p>
            </div>
        `).join('');

        utils.setupHoverEffects();

        if (config.animation.scrollReveal) {
            document.querySelectorAll('#cards-servicos .card').forEach(card => {
                utils.animateOnScroll(card);
            });
        }
    },

    /* COMENTADO: Função de renderização de convênios
    convenios: () => {
        DOM.cardsConvenios.innerHTML = convenios.map((convenio, index) => `
            <div class="card convenio-card" 
                 data-aos="fade-up" 
                 data-aos-delay="${index * 50}">
                <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 50'%3E%3C/svg%3E" 
                    data-src="images/convenios/${convenio.logo}" 
                    alt="${convenio.nome}" 
                    class="logo-convenio"
                    loading="lazy"
                    style="filter: grayscale(100%); transition: filter 0.3s ease"
                >
                <p>${convenio.nome}</p>
            </div>
        `).join('');

        utils.setupHoverEffects();

        if (config.animation.lazyLoad) {
            utils.lazyLoad(DOM.cardsConvenios);
        }
    },
    */

    footer: () => {
        const year = new Date().getFullYear();
        if (DOM.footerCopy) {
            DOM.footerCopy.innerHTML = `&copy; ${year} Casa do Autista. Todos os direitos reservados.`;
        }
    },

    setupWhatsAppButtons: () => {
        const whatsappLink = utils.initWhatsApp();
        
        if (DOM.whatsappBtn) {
            DOM.whatsappBtn.href = whatsappLink;
        }
        
        if (DOM.whatsappFloat) {
            DOM.whatsappFloat.href = whatsappLink;
        }
        
        const navWhatsappBtn = document.querySelector('nav a[href="#agendamento"]');
        if (navWhatsappBtn) {
            navWhatsappBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = whatsappLink;
            });
        }
    },

    setupMobileMenu: () => {
        if (DOM.mobileMenuBtn && DOM.nav) {
            let menuOpen = false;

            DOM.mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                menuOpen = !menuOpen;
                
                if (menuOpen) {
                    DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                    DOM.mobileMenuBtn.style.transform = 'rotate(90deg)';
                    DOM.mobileMenuBtn.style.color = 'var(--branco)';
                    
                    const btnRect = DOM.mobileMenuBtn.getBoundingClientRect();
                    DOM.nav.style.top = `${btnRect.bottom + window.scrollY}px`;
                    DOM.nav.style.right = `${window.innerWidth - btnRect.right}px`;
                    
                    DOM.nav.classList.add('active');
                    document.body.classList.add('menu-open');
                } else {
                    DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            document.addEventListener('click', (e) => {
                if (menuOpen && !DOM.nav.contains(e.target) && e.target !== DOM.mobileMenuBtn) {
                    DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuOpen = false;
                }
            });

            DOM.nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuOpen = false;
                });
            });

            window.addEventListener('resize', utils.debounce(() => {
                if (window.innerWidth > 768 && menuOpen) {
                    DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuOpen = false;
                }
            }, 100));
        }
    }
};

function preventZoomOnInput() {
    document.addEventListener('touchstart', function(event) {
        if (['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)) {
            event.preventDefault();
        }
    }, { passive: false });
}

const handlers = {
    handleAgendamentoSection: () => {
        const agendamentoSection = document.getElementById('agendamento');
        if (agendamentoSection) {
            if (config.animation.scrollReveal) {
                utils.animateOnScroll(agendamentoSection);
            }
            
            const agendamentoCard = document.querySelector('.whatsapp-agendamento-card');
            if (agendamentoCard && config.animation.cardHover) {
                agendamentoCard.addEventListener('mouseenter', () => {
                    agendamentoCard.style.transform = 'translateY(-5px)';
                });
                
                agendamentoCard.addEventListener('mouseleave', () => {
                    agendamentoCard.style.transform = 'translateY(0)';
                });
            }
        }
    },

    handleScroll: utils.debounce(() => {}, 50)
};

function otimizarMenuMobile() {
    const menuBtn = document.querySelector('.menu-mobile-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (!menuBtn || !nav) return;
    
    let menuOpen = false;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const toggleMenu = () => {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            menuBtn.style.transform = 'rotate(90deg)';
            nav.classList.add('active');
            body.style.overflow = 'hidden';
            
            const backdrop = document.createElement('div');
            backdrop.className = 'menu-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                height: calc(100% - 70px);
                background: rgba(0,0,0,0.5);
                z-index: 998;
                display: block;
            `;
            backdrop.addEventListener('click', closeMenu);
            document.body.appendChild(backdrop);
        } else {
            closeMenu();
        }
    };
    
    const closeMenu = () => {
        menuOpen = false;
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.style.transform = 'rotate(0)';
        nav.classList.remove('active');
        body.style.overflow = '';
        
        const backdrop = document.querySelector('.menu-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    };
    
    menuBtn.addEventListener('click', toggleMenu);
    
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    nav.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    nav.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        
        if (diff > 50) {
            closeMenu();
        }
    });
    
    window.addEventListener('orientationchange', closeMenu);
}

function otimizarTouchEvents() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    const touchElements = document.querySelectorAll('a, button, .card, .unidade-card');
    touchElements.forEach(el => {
        el.style.webkitTapHighlightColor = 'transparent';
        
        el.addEventListener('touchstart', () => {
            el.style.opacity = '0.8';
        });
        
        el.addEventListener('touchend', () => {
            el.style.opacity = '1';
        });
        
        el.addEventListener('touchcancel', () => {
            el.style.opacity = '1';
        });
    });
}

function ajustarHeightMobile() {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 768) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        hero.style.height = 'calc(var(--vh, 1vh) * 100)';
        
        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            hero.style.height = 'calc(var(--vh, 1vh) * 100)';
        });
    }
}

function lazyLoadMobile() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function scrollSuaveMobile() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#agendamento') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('active')) {
                    document.querySelector('.menu-mobile-btn').click();
                }
            }
        });
    });
}

function detectarDispositivo() {
    const isMobile = window.innerWidth <= 768;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile');
        
        if (isIOS) {
            document.body.classList.add('ios');
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.style.fontSize = '16px';
            });
        }
        
        if (isAndroid) {
            document.body.classList.add('android');
        }
        
        if (window.innerWidth < 768) {
            const style = document.createElement('style');
            style.textContent = `
                .hero::after { animation: none !important; }
                [data-aos] { transition: none !important; }
                .card:hover, .convenio-card:hover { transform: none !important; }
            `;
            document.head.appendChild(style);
        }
    }
}

function prevenirZoomInputs() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocapitalize', 'off');
        input.setAttribute('spellcheck', 'false');
        
        input.addEventListener('focus', () => {
            document.body.style.zoom = '1';
        });
        
        if ('visualViewport' in window) {
            input.addEventListener('focus', () => {
                window.visualViewport.addEventListener('resize', () => {
                    window.scrollTo(0, 0);
                });
            });
        }
    });
}

const init = () => {
    initAOS();
    
    render.servicos();
    // render.convenios(); // COMENTADO: Chamada para renderizar convênios
    render.footer();
    render.setupWhatsAppButtons();
    render.setupMobileMenu();
    
    setupSmoothScroll();
    
    setupUnidades();
    
    preventZoomOnInput();
    
    handlers.handleAgendamentoSection();

    if (config.performance.debounceScroll) {
        window.addEventListener('scroll', handlers.handleScroll);
    }

    document.body.classList.add('loaded');
    
    otimizarMenuMobile();
    otimizarTouchEvents();
    ajustarHeightMobile();
    lazyLoadMobile();
    scrollSuaveMobile();
    detectarDispositivo();
    prevenirZoomInputs();
    
    if (window.innerWidth <= 768) {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                disable: true
            });
        }
        
        const cards = document.querySelectorAll('.card, .convenio-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });
            card.addEventListener('touchcancel', () => {
                card.style.transform = 'scale(1)';
            });
        });
        
        const iframe = document.getElementById('mapa-unidade');
        if (iframe) {
            iframe.setAttribute('loading', 'lazy');
            iframe.style.minHeight = '300px';
        }
        
        document.body.style.webkitOverflowScrolling = 'touch';
    }
};

if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver não suportado, desativando animações');
    config.animation.lazyLoad = false;
    config.animation.scrollReveal = false;
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
            ajustarHeightMobile();
        }
    }, 250);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
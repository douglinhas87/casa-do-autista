const config = {
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

const DOM = {
    cardsServicos: document.getElementById('cards-servicos'),
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
                        DOM.nav.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        document.documentElement.classList.remove('menu-open');
                        if (DOM.mobileMenuBtn) {
                            DOM.mobileMenuBtn.classList.remove('active');
                        }
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

function isMobile() {
    return window.innerWidth <= 768;
}

function setupMobileHamburger() {
    const menuBtn = document.querySelector('.menu-mobile-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    const html = document.documentElement;
    
    if (!menuBtn || !nav || !isMobile()) return;
    
    let menuOpen = false;
    
    const icon = menuBtn.querySelector('i');
    if (icon) icon.remove();
    
    if (!menuBtn.querySelector('span')) {
        const span = document.createElement('span');
        menuBtn.appendChild(span);
    }
    
    function toggleMenu() {
        menuOpen = !menuOpen;
        
        menuBtn.classList.toggle('active', menuOpen);
        nav.classList.toggle('active', menuOpen);
        body.classList.toggle('menu-open', menuOpen);
        html.classList.toggle('menu-open', menuOpen);
        
        let backdrop = document.querySelector('.menu-backdrop');
        
        if (menuOpen) {
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'menu-backdrop';
                backdrop.addEventListener('click', toggleMenu);
                document.body.appendChild(backdrop);
            }
            backdrop.classList.add('active');
            
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            if (backdrop) {
                backdrop.classList.remove('active');
            }
            
            body.style.overflow = '';
            html.style.overflow = '';
        }
    }
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#agendamento' && href !== '#') {
                if (menuOpen) {
                    toggleMenu();
                }
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        const backdrop = document.querySelector('.menu-backdrop');
        if (menuOpen && backdrop && backdrop.contains(e.target)) {
            toggleMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (menuOpen && e.key === 'Escape') {
            toggleMenu();
        }
    });
}

function preventScrollIssues() {
    if (!isMobile()) return;
    
    let lastScrollTop = 0;
    let scrollTimeout;
    
    function handleMobileScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop < 0) {
            window.scrollTo(0, 0);
        }
        
        lastScrollTop = scrollTop;
    }
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleMobileScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'SELECT' || 
            e.target.tagName === 'TEXTAREA') {
            e.target.style.fontSize = '16px';
        }
    }, { passive: true });
}

function setupScrollAnimations() {
    if (!config.animation.scrollReveal || !window.IntersectionObserver) return;
    
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

const init = () => {
    initAOS();
    
    render.servicos();
    render.footer();
    render.setupWhatsAppButtons();
    
    if (isMobile()) {
        setupMobileHamburger();
        config.animation.cardHover = false;
        
        if (typeof AOS !== 'undefined') {
            AOS.init({
                disable: true
            });
        }
        
        preventScrollIssues();
    } else {
        config.animation.cardHover = true;
    }
    
    setupSmoothScroll();
    setupUnidades();
    
    handlers.handleAgendamentoSection();

    setupScrollAnimations();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth <= 768) {
                if (!isMobile()) {
                    location.reload();
                }
            }
        }, 250);
    });

    document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
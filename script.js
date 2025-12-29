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
    
    if (window.innerWidth <= 768) {
        window.scrollTo(0, 0);
        
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 50);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100);
    }
});

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
    if (typeof AOS !== 'undefined') {
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
        if (config.animation.lazyLoad && element && window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('fade-in');
                            observer.unobserve(img);
                        }
                    }
                });
            }, { threshold: 0.1 });

            element.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
            });
        }
    },

    animateOnScroll: (element) => {
        if (config.animation.scrollReveal && element && window.IntersectionObserver) {
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
        if (!config.animation.cardHover || window.innerWidth <= 768) return;
        
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) return;

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
};

function setupOptimizedCardAnimations() {
    if (window.innerWidth <= 768) return;
    
    const cards = document.querySelectorAll('#servicos .card, .convenio-card');
    let animationFrameId;
    let lastScrollY = window.scrollY;
    
    if ('IntersectionObserver' in window) {
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
    
    function debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        if (scrollDelta > 50) {
            cards.forEach(card => {
                card.style.transition = 'none';
                card.style.animationPlayState = 'paused';
            });
            
            setTimeout(() => {
                cards.forEach(card => {
                    card.style.transition = '';
                    card.style.animationPlayState = '';
                });
            }, 300);
        }
        
        lastScrollY = currentScrollY;
    }, 50);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
}

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
                
                if (window.innerWidth <= 768) {
                    const nav = document.querySelector('nav');
                    const menuBtn = document.querySelector('.menu-mobile-btn');
                    
                    if (nav && nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        menuBtn.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        document.documentElement.classList.remove('menu-open');
                        menuBtn.setAttribute('aria-expanded', 'false');
                        
                        const backdrop = document.querySelector('.menu-backdrop');
                        if (backdrop) {
                            backdrop.classList.remove('active');
                            backdrop.remove();
                        }
                    }
                }
            }
        });
    });
}

function setupMobileHamburger() {
    const menuBtn = document.querySelector('.menu-mobile-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    const html = document.documentElement;
    
    if (!menuBtn || !nav || window.innerWidth > 768) return;
    
    if (!menuBtn.querySelector('span')) {
        const span = document.createElement('span');
        menuBtn.appendChild(span);
    }
    
    function toggleMenu() {
        const isOpen = nav.classList.contains('active');
        
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
        body.classList.toggle('menu-open');
        html.classList.toggle('menu-open');
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
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    const menuLinks = nav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                setTimeout(() => {
                    if (nav.classList.contains('active')) {
                        toggleMenu();
                    }
                }, 300);
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
}

function detectBrowserAndApplyFixes() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isSamsungBrowser = /SamsungBrowser/i.test(userAgent);
    
    if (isIOS) {
        document.documentElement.classList.add('ios-device');
        
        applyIOSFixes();
        
        document.addEventListener('touchstart', function() {}, {passive: true});
    }
    
    if (isSamsungBrowser) {
        document.documentElement.classList.add('samsung-browser');
    }
}

function applyIOSFixes() {
    config.animation.cardHover = false;
    
    const servicosSection = document.getElementById('servicos');
    if (servicosSection) {
        servicosSection.style.webkitTransform = 'translate3d(0,0,0)';
        servicosSection.style.transform = 'translate3d(0,0,0)';
        
        setTimeout(() => {
            servicosSection.style.display = 'none';
            setTimeout(() => {
                servicosSection.style.display = 'block';
            }, 50);
        }, 100);
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                document.querySelectorAll('section').forEach(section => {
                    section.style.transform = 'translate3d(0,0,0)';
                });
                ticking = false;
            });
            ticking = true;
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

const render = {
    servicos: () => {
        if (!DOM.cardsServicos) return;
        
        DOM.cardsServicos.innerHTML = servicos.map((servico, index) => `
            <div class="card" 
                 data-aos="fade-up" 
                 data-aos-delay="${index * 50}">
                <iconify-icon icon="${servico.icone}" class="icone-servico" aria-hidden="true"></iconify-icon>
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
            DOM.whatsappBtn.setAttribute('target', '_blank');
            DOM.whatsappBtn.setAttribute('rel', 'noopener');
        }
        
        if (DOM.whatsappFloat) {
            DOM.whatsappFloat.href = whatsappLink;
            DOM.whatsappFloat.setAttribute('target', '_blank');
            DOM.whatsappFloat.setAttribute('rel', 'noopener');
        }
        
        const navWhatsappBtn = document.querySelector('nav a.btn-destaque');
        if (navWhatsappBtn) {
            navWhatsappBtn.href = whatsappLink;
            navWhatsappBtn.setAttribute('target', '_blank');
            navWhatsappBtn.setAttribute('rel', 'noopener');
            
            if (window.innerWidth <= 768) {
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
};

const init = () => {
    detectBrowserAndApplyFixes();
    
    if (typeof AOS !== 'undefined' && window.innerWidth > 768) {
        initAOS();
    }
    
    render.servicos();
    render.footer();
    render.setupWhatsAppButtons();
    
    if (window.innerWidth <= 768) {
        config.animation.cardHover = false;
        setupMobileHamburger();
    } else {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (!isIOS) {
            config.animation.cardHover = true;
            utils.setupHoverEffects();
            setupOptimizedCardAnimations();
        }
    }
    
    setupSmoothScroll();
    setupUnidades();
    setupScrollAnimations();
    
    window.addEventListener('resize', utils.debounce(function() {
        if (window.innerWidth <= 768 && config.animation.cardHover) {
            config.animation.cardHover = false;
        } else if (window.innerWidth > 768 && !config.animation.cardHover) {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (!isIOS) {
                config.animation.cardHover = true;
                utils.setupHoverEffects();
                setupOptimizedCardAnimations();
            }
        }
        
        if (window.innerWidth <= 768) {
            setupMobileHamburger();
        }
    }, 250));

    document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const testLinks = document.querySelectorAll('nav a[href^="#"]');
        testLinks.forEach(link => {
            if (!link.hasAttribute('data-smooth-bound')) {
                link.setAttribute('data-smooth-bound', 'true');
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.getElementById(href.substring(1));
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }
        });
    }, 1000);
});
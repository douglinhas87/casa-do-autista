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
    { icone: "mdi:account-supervisor", titulo: "Supervisão ABA", descricao: "Supervisão técnica de programas de intervenção ABA para desenvolvimento infantil" },
    { icone: "mdi:brain-cog", titulo: "Terapeuta Cognitivo Comportamental", descricao: "Intervenções baseadas na análise e modificação de pensamentos e comportamentos" },
    { icone: "mdi:leaf", titulo: "Terapeuta Ocupacional com Integração Sensorial", descricao: "Atividades para melhorar a integração sensorial e a autonomia da criança" },
    { icone: "mdi:music", titulo: "Musicoterapia", descricao: "Uso da música para desenvolver habilidades emocionais, cognitivas e sociais" },
    { icone: "mdi:horse", titulo: "Equoterapia", descricao: "Terapia assistida por cavalos que estimula o desenvolvimento global" },
    { icone: "mdi:run", titulo: "Psicomotricidade", descricao: "Trabalho corporal que une movimento, emoção e cognição" },
    { icone: "mdi:book-open-page-variant", titulo: "Psicopedagogia Clínica e Institucional", descricao: "Acompanhamento das dificuldades de aprendizagem no ambiente clínico e escolar" },
    { icone: "mdi:account-voice", titulo: "Fonoaudiologia", descricao: "Estimulação da comunicação, linguagem, fala e audição" },
    { icone: "mdi:brain", titulo: "Cognitivo Comportamental", descricao: "Terapia voltada à mudança de comportamentos e pensamentos disfuncionais" },
    { icone: "material-symbols:psychology", titulo: "Psicologia", descricao: "Apoio emocional e psicológico para o desenvolvimento infantil" },
    { icone: "material-symbols:neurology", titulo: "Avaliação Neuropsicológica", descricao: "Análise do funcionamento cerebral relacionado ao comportamento e cognição" },
    { icone: "mdi:account-heart", titulo: "Médico da Família", descricao: "Acompanhamento integral da saúde da criança e sua família" },
    { icone: "mdi:human-child", titulo: "Pediasuit (Terapia Intensiva)", descricao: "Terapia intensiva para reabilitação neuromotora com o uso do protocolo Pediasuit" },
    { icone: "mdi:account-child", titulo: "Suporte aos Pais e Treinamento Parental", descricao: "Orientações para desenvolvimento de práticas educativas em casa" },
    { icone: "mdi:home-heart", titulo: "Atendimento Terapêutico (AT) Escolar e Domiciliar", descricao: "Acompanhamento terapêutico individualizado no ambiente escolar e em casa" },
    { icone: "mdi:pool", titulo: "Terapia Aquática", descricao: "Terapia realizada na água para estimular o desenvolvimento físico e sensorial" },
    { icone: "mdi:arm-flex", titulo: "Fisioterapia Motora (Método Bobath e outros)", descricao: "Técnicas terapêuticas para melhorar o movimento e a coordenação" },
    { icone: "mdi:whistle", titulo: "Educador Físico", descricao: "Atividades físicas adaptadas para crianças com necessidades especiais" },
    { icone: "mdi:food-apple", titulo: "Terapia Alimentar", descricao: "Estimulação das habilidades alimentares e comportamentos relacionados à alimentação" },
    { icone: "mdi:baby-bottle-outline", titulo: "Nutrição Infantil / Terapia Alimentar", descricao: "Orientações nutricionais para uma alimentação saudável desde a infância" }
];

const convenios = [
    { nome: "Unimed", logo: "unimed.png" },
    { nome: "Amil", logo: "amil.png" },
    { nome: "Bradesco Saúde", logo: "bradesco.png" },
    { nome: "SulAmérica", logo: "sulamerica.png" }
];

const DOM = {
    cardsServicos: document.getElementById('cards-servicos'),
    cardsConvenios: document.getElementById('cards-convenios'),
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

    footer: () => {
        const year = new Date().getFullYear();
        DOM.footerCopy.innerHTML = `&copy; ${year} Casa do Autista. Todos os direitos reservados.`;
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
                    DOM.mobileMenuBtn.innerHTML = '✕';
                    DOM.mobileMenuBtn.style.transform = 'rotate(90deg)';
                    DOM.mobileMenuBtn.style.color = 'var(--branco)';
                    
                    const btnRect = DOM.mobileMenuBtn.getBoundingClientRect();
                    DOM.nav.style.top = `${btnRect.bottom + window.scrollY}px`;
                    DOM.nav.style.right = `${window.innerWidth - btnRect.right}px`;
                    
                    DOM.nav.classList.add('active');
                    document.body.classList.add('menu-open');
                } else {
                    DOM.mobileMenuBtn.innerHTML = '☰';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            document.addEventListener('click', (e) => {
                if (menuOpen && !DOM.nav.contains(e.target) && e.target !== DOM.mobileMenuBtn) {
                    DOM.mobileMenuBtn.innerHTML = '☰';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuOpen = false;
                }
            });

            DOM.nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    DOM.mobileMenuBtn.innerHTML = '☰';
                    DOM.mobileMenuBtn.style.transform = 'rotate(0)';
                    DOM.mobileMenuBtn.style.color = 'var(--destaque)';
                    DOM.nav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    menuOpen = false;
                });
            });

            window.addEventListener('resize', utils.debounce(() => {
                if (window.innerWidth > 768 && menuOpen) {
                    DOM.mobileMenuBtn.innerHTML = '☰';
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

const init = () => {
    initAOS();
    
    render.servicos();
    render.convenios();
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
};

if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver não suportado, desativando animações');
    config.animation.lazyLoad = false;
    config.animation.scrollReveal = false;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
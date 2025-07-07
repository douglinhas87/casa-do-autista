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
  { icone: "mdi:hand-heart", titulo: "Terapia Ocupacional", descricao: "Desenvolvimento de habilidades motoras e funcionais para a vida diária" },
  { icone: "mdi:account-voice", titulo: "Fonoaudiologia", descricao: "Estimulação da fala, linguagem, audição e comunicação" },
  { icone: "mdi:run", titulo: "Psicomotricista", descricao: "Trabalho corporal que integra movimento, emoção e cognição" },
  { icone: "material-symbols:psychology", titulo: "Psicóloga", descricao: "Apoio emocional, social e comportamental para crianças e famílias" },
  { icone: "mdi:music", titulo: "Musicoterapia", descricao: "Uso da música como recurso terapêutico para expressão e regulação emocional" },
  { icone: "mdi:book-open-page-variant", titulo: "Psicopedagoga", descricao: "Atendimento a dificuldades de aprendizagem no ambiente escolar" },
  { icone: "mdi:food-apple", titulo: "Nutricionista", descricao: "Orientação alimentar personalizada para promover saúde e bem-estar" },
  { icone: "healthicons:neurology", titulo: "Neuropedagoga", descricao: "Intervenções educacionais voltadas ao funcionamento neurológico do aprendizado" },
  { icone: "material-symbols:neurology-outline", titulo: "Neuropsicóloga", descricao: "Avaliação e intervenção dos processos cognitivos e comportamentais" },
  { icone: "map:physiotherapist", titulo: "Fisioterapia", descricao: "Tratamentos corporais que favorecem o equilíbrio, força e postura" },
  { icone: "mdi:account-group", titulo: "Aplicadores ABA e ATs", descricao: "Profissionais que acompanham e aplicam intervenções comportamentais no cotidiano" }
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
        const phoneNumber = '558179059047'; // Número corrigido aqui
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
            DOM.mobileMenuBtn.addEventListener('click', () => {
                DOM.nav.classList.toggle('active');
                DOM.mobileMenuBtn.innerHTML = DOM.nav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        DOM.nav.classList.remove('active');
                        DOM.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
        }
    }
};

const carrosselEquipe = {
    init: () => {
        const carrosselContainer = document.querySelector('.equipe-carrossel');
        const carrossel = document.querySelector('.equipe-container');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!carrosselContainer || !carrossel || !prevBtn || !nextBtn) return;

        const cards = document.querySelectorAll('.profissional-card');
        if (cards.length === 0) return;

        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 32;
        const containerWidth = carrosselContainer.offsetWidth;
        const totalScrollableWidth = carrossel.scrollWidth - containerWidth;

        function updateButtons() {
            prevBtn.style.display = carrossel.scrollLeft <= 0 ? 'none' : 'flex';
            nextBtn.style.display = carrossel.scrollLeft >= totalScrollableWidth ? 'none' : 'flex';
        }

        function moveToCard(index) {
            currentIndex = Math.max(0, Math.min(index, cards.length - 1));
            
            let scrollPosition;
            if (currentIndex === cards.length - 1) {
                scrollPosition = carrossel.scrollWidth - containerWidth;
            } else {
                scrollPosition = currentIndex * cardWidth;
            }

            carrossel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        prevBtn.addEventListener('click', () => moveToCard(currentIndex - 1));
        nextBtn.addEventListener('click', () => moveToCard(currentIndex + 1));

        carrossel.addEventListener('scroll', () => {
            currentIndex = Math.round(carrossel.scrollLeft / cardWidth);
            updateButtons();
        });

        let touchStartX = 0;
        carrossel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        carrossel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (diff > 50) {
                moveToCard(currentIndex + 1);
            } else if (diff < -50) {
                moveToCard(currentIndex - 1);
            }
        }, { passive: true });

        updateButtons();
    }
};

function setupTouchCarousel() {
    const carrossel = document.querySelector('.equipe-container');
    if (!carrossel) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    carrossel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carrossel.offsetLeft;
        scrollLeft = carrossel.scrollLeft;
    }, { passive: true });

    carrossel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carrossel.offsetLeft;
        const walk = (x - startX) * 2;
        carrossel.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    carrossel.addEventListener('touchend', () => {
        isDown = false;
    }, { passive: true });
}

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

    handleScroll: utils.debounce(() => {
    }, 50)
};

const init = () => {
    initAOS();
    
    render.servicos();
    render.convenios();
    render.footer();
    render.setupWhatsAppButtons();
    render.setupMobileMenu();
    
    carrosselEquipe.init();
    setupTouchCarousel();
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
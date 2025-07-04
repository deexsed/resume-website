// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие мобильного меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Активная навигация при прокрутке
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Наблюдение за элементами для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-reveal, .timeline-item, .portfolio-item, .contact-item, .skill-category');
    animateElements.forEach(el => observer.observe(el));
    
    // Инициализация фильтров портфолио
    initPortfolioFilters();
    
    // Инициализация модального окна
    initProjectModal();
    
    // Инициализация счетчиков в заголовке
    initHeaderCounters();
});

// Фильтрация проектов портфолио
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Фильтруем проекты
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Модальное окно для деталей проекта
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    const closeBtn = modal.querySelector('.close');
    if (!closeBtn) return;
    const detailButtons = document.querySelectorAll('.portfolio-details-btn');
    
    // Данные о проектах
    const projectData = {
        'server-controllers': {
            title: 'Сервер дорожных контроллеров',
            description: 'Разработка высоконагруженного сервера для управления дорожными контроллерами в реальном времени. Система обеспечивает надежную связь с множественными устройствами через TCP/IP протокол.',
            features: [
                'Многопоточная архитектура для обработки множественных соединений',
                'Протокол TCP/IP для надежной связи с контроллерами',
                'Система мониторинга состояния устройств в реальном времени',
                'Логирование всех операций и событий',
                'Веб-интерфейс для управления и мониторинга',
                'Автоматическое восстановление соединений'
            ],
            technologies: ['C++', 'Qt', 'TCP/IP', 'Boost.Asio', 'MySQL'],
            github: 'https://github.com/deexsed'
        },
        'web-debug': {
            title: 'Веб-приложение для отладки',
            description: 'Создание веб-приложения на Django для оперативной отладки тестируемой продукции. Система позволяет получать информацию со стендов и анализировать данные в реальном времени.',
            features: [
                'Веб-интерфейс для мониторинга стендов',
                'Получение данных в реальном времени',
                'Аналитика и визуализация результатов',
                'Система уведомлений о событиях',
                'Экспорт данных в различные форматы',
                'Управление пользователями и правами доступа'
            ],
            technologies: ['Python', 'Django', 'MySQL', 'JavaScript', 'Bootstrap'],
            github: 'https://github.com/deexsed'
        },
        'embedded-modules': {
            title: 'Встраиваемые модули',
            description: 'Разработка встраиваемых модулей для систем автоматизации с использованием современных микроконтроллеров и протоколов связи RS485.',
            features: [
                'Программирование микроконтроллеров',
                'Реализация протокола RS485',
                'Обработка аналоговых и цифровых сигналов',
                'Система диагностики и самоконтроля',
                'Энергоэффективные алгоритмы работы',
                'Защита от помех и сбоев'
            ],
            technologies: ['C++', 'RS485', 'Embedded', 'Microcontrollers'],
            github: 'https://github.com/deexsed'
        },
        'database-system': {
            title: 'Система управления базой данных',
            description: 'Создание системы управления и настройки базы данных для хранения информации о дорожных контроллерах и их состоянии.',
            features: [
                'Управление структурой базы данных',
                'Резервное копирование и восстановление',
                'Мониторинг производительности',
                'Система миграций и обновлений',
                'Интерфейс для администраторов',
                'Интеграция с внешними системами'
            ],
            technologies: ['C#', '.NET 8', 'SQL', 'Entity Framework'],
            github: 'https://github.com/deexsed'
        },
        'multithreaded-app': {
            title: 'Многопоточное приложение',
            description: 'Разработка многопоточного приложения с использованием Boost.Asio для эффективной обработки сетевых соединений.',
            features: [
                'Асинхронная обработка сетевых соединений',
                'Пул потоков для параллельной обработки',
                'Система очередей сообщений',
                'Мониторинг производительности потоков',
                'Обработка ошибок и исключений',
                'Масштабируемая архитектура'
            ],
            technologies: ['C++21', 'Boost.Asio', 'Multithreading', 'Network Programming'],
            github: 'https://github.com/deexsed'
        },
        'qt-gui': {
            title: 'GUI приложение на Qt',
            description: 'Создание графического интерфейса пользователя с использованием Qt5 для управления и мониторинга систем.',
            features: [
                'Современный пользовательский интерфейс',
                'Многоплатформенность (Windows, Linux)',
                'Интеграция с базами данных',
                'Система плагинов и расширений',
                'Локализация интерфейса',
                'Темы оформления и кастомизация'
            ],
            technologies: ['Qt5', 'C++', 'GUI', 'QML', 'SQLite'],
            github: 'https://github.com/deexsed'
        }
    };
    
    // Обработчики для кнопок "Подробнее"
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const portfolioItem = button.closest('.portfolio-item');
            const projectId = getProjectId(portfolioItem);
            const project = projectData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Получение ID проекта из элемента портфолио
function getProjectId(portfolioItem) {
    const title = portfolioItem.querySelector('h3').textContent;
    const idMap = {
        'Сервер дорожных контроллеров': 'server-controllers',
        'Веб-приложение для отладки': 'web-debug',
        'Встраиваемые модули': 'embedded-modules',
        'Система управления базой данных': 'database-system',
        'Многопоточное приложение': 'multithreaded-app',
        'GUI приложение на Qt': 'qt-gui'
    };
    return idMap[title] || 'server-controllers';
}

// Показ модального окна с данными проекта
function showProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTech = document.getElementById('modalTech');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const modalGitHub = document.getElementById('modalGitHub');
    
    // Заполняем данные
    modalTitle.textContent = project.title;
    modalDescription.innerHTML = `<p>${project.description}</p>`;
    modalGitHub.href = project.github;
    
    // Технологии
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const techSpan = document.createElement('span');
        techSpan.className = 'tech-tag interactive';
        techSpan.textContent = tech;
        modalTech.appendChild(techSpan);
    });
    
    // Функции
    modalFeaturesList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeaturesList.appendChild(li);
    });
    
    // Показываем модальное окно
    modal.style.display = 'block';
}

// Анимация счетчиков в заголовке
function initHeaderCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });
}

// Анимация счетчика
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Обработка формы контактов через EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        // Замените на свои service_id и template_id из EmailJS
        emailjs.sendForm('service_e01t0ow', 'template_aabu5cz', this)
            .then(function() {
                showNotification('Сообщение отправлено! Спасибо за обращение.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, function(error) {
                showNotification('Ошибка отправки: ' + error.text, 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Параллакс эффект для главной секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Интерактивные карточки портфолио
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Анимация временной шкалы
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 200);
        }, index * 300);
    });
}

// Запуск анимации временной шкалы при прокрутке
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTimeline();
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const experienceSection = document.querySelector('.experience');
if (experienceSection) {
    timelineObserver.observe(experienceSection);
}

// Копирование контактной информации в буфер обмена
document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Разрешаем переход по внешним ссылкам (например, GitHub)
        if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
            e.preventDefault();
            const text = this.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Скопировано в буфер обмена!', 'success');
                }).catch(() => {
                    showNotification('Не удалось скопировать', 'error');
                });
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Скопировано в буфер обмена!', 'success');
            }
        }
        // Для всех остальных ссылок (например, GitHub) — стандартное поведение (переход по ссылке)
    });
});

// Анимация загрузки страницы
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Ошибка на странице:', e.error);
});

// Оптимизация производительности
let ticking = false;

function updateOnScroll() {
    // Здесь можно добавить код, который должен выполняться при прокрутке
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Функция для плавной прокрутки к секциям
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Функция для анимации элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Функция для активного состояния навигации
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === 'home' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для плавной прокрутки
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
            
            // Закрываем мобильное меню после клика
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Добавляем обработчик для скролла
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        animateOnScroll();
    });
    
    // Запускаем анимацию при загрузке
    animateOnScroll();
});

// Функция для отправки формы контактов
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Показываем состояние загрузки
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    // Имитируем отправку (в реальном проекте здесь будет AJAX запрос)
    setTimeout(() => {
        // Показываем успешное сообщение
        submitButton.textContent = 'Отправлено!';
        submitButton.style.background = '#10b981';
        
        // Сбрасываем форму
        form.reset();
        
        // Возвращаем кнопку в исходное состояние
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 2000);
    }, 1500);
}

// Добавляем обработчики для форм контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('.contact-form form');
    contactForms.forEach(form => {
        form.addEventListener('submit', submitContactForm);
    });
});

// Функция для копирования контактов в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Показываем уведомление
        showNotification('Скопировано в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка копирования:', err);
        showNotification('Ошибка копирования', 'error');
    });
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    // Удаляем все существующие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Скрываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Убираем обработчики для копирования контактов
// document.addEventListener('DOMContentLoaded', function() {
//     const contactItems = document.querySelectorAll('.contact-item');
//     contactItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             // Не копируем, если клик был по ссылке
//             if (e.target.tagName === 'A' || e.target.closest('a')) {
//                 return;
//             }
//             
//             const text = this.querySelector('p')?.textContent || this.querySelector('a')?.textContent;
//             if (text) {
//                 copyToClipboard(text.trim());
//             }
//         });
//     });
// });

// Параллакс эффект для фона
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Анимация печатной машинки
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Анимация градиентного фона
function animateGradient() {
    const gradientElements = document.querySelectorAll('.gradient-bg');
    
    gradientElements.forEach(element => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 60%))`;
        }, 50);
    });
}

// Анимация для карточек с 3D эффектом
function init3DCards() {
    const cards = document.querySelectorAll('.enhanced-card');
    
    cards.forEach(card => {
        // Исключаем .profile-card из 3D-эффекта
        if (card.classList.contains('profile-card')) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Анимация для навыков с прогресс-барами
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.progress-fill');
        
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 500);
        }
    });
}

// Анимация для модальных окон
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модальных окон
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Анимация для галереи изображений
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            if (image) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${image.src}" alt="${image.alt}">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `;
                
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: scaleIn 0.3s ease-out;
                `;
                
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', () => {
                    lightbox.remove();
                });
            }
        });
    });
}

// Анимация для чартов
function initCharts() {
    const charts = document.querySelectorAll('.chart');
    
    charts.forEach(chart => {
        const canvas = chart.querySelector('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const data = JSON.parse(chart.getAttribute('data-chart'));
            
            // Здесь можно добавить логику для отрисовки чартов
            // Например, используя Chart.js или собственную реализацию
        }
    });
}

// Анимация для блога
function initBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Анимация для отзывов
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Автоматическое переключение отзывов
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Анимация для статистики
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-item');
    
    stats.forEach(stat => {
        const number = stat.querySelector('.stat-number');
        if (number) {
            const target = parseInt(number.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    number.textContent = target;
                }
            };
            
            updateStat();
        }
    });
}

// Анимация для навигации
function initNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

// Анимация для футера
function initFooterAnimations() {
    const footerLinks = document.querySelectorAll('.footer a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
}

// Анимация для форм
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Инициализация всех анимаций
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем все анимации
    initParallax();
    init3DCards();
    initModals();
    initGallery();
    initBlogAnimations();
    initTestimonials();
    initStatsAnimation();
    initNavigationAnimations();
    initFooterAnimations();
    initFormAnimations();
    
    // Создаем эффекты фона
    createParticles();
    animateGradient();
    
    // Анимация счетчиков при появлении в поле зрения
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Анимация навыков при появлении
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
});

// Дополнительные утилиты для анимаций
const AnimationUtils = {
    // Плавная прокрутка к элементу
    smoothScrollTo: (element, duration = 1000) => {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    },
    
    // Анимация появления элемента
    fadeIn: (element, duration = 500) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    // Анимация исчезновения элемента
    fadeOut: (element, duration = 500) => {
        let start = null;
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(initialOpacity - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// Экспортируем утилиты для использования в других скриптах
window.AnimationUtils = AnimationUtils;

// Анимация прогресс-баров навыков
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        }
    });
}

// Наблюдатель для анимации навыков
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillProgress();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Наблюдение за секцией навыков
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-detailed');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

// Анимация счетчиков в заголовке страницы "Обо мне"
function animateHeaderCounters() {
    const counters = document.querySelectorAll('.header-stats .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Наблюдатель для анимации счетчиков в заголовке
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateHeaderCounters();
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Наблюдение за заголовком страницы
document.addEventListener('DOMContentLoaded', () => {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        headerObserver.observe(pageHeader);
    }
});

document.addEventListener('click', function(event) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu || !hamburger) return;
    if (!navMenu.classList.contains('active')) return;
    if (hamburger.contains(event.target) || navMenu.contains(event.target)) {
        return;
    }
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// Создание частиц
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайное позиционирование
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Анимация градиентного фона
function animateGradientBackground() {
    const gradientElements = document.querySelectorAll('.animated-bg');
    
    gradientElements.forEach(element => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.background = `linear-gradient(-45deg, 
                hsl(${hue}, 70%, 60%), 
                hsl(${hue + 60}, 70%, 60%), 
                hsl(${hue + 120}, 70%, 60%), 
                hsl(${hue}, 70%, 60%))`;
            element.style.backgroundSize = '400% 400%';
        }, 50);
    });
}

// Анимация иконок
function animateIcons() {
    const icons = document.querySelectorAll('.animated-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Анимация градиентного текста
function animateGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            text.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 70%, 60%), 
                hsl(${hue + 60}, 70%, 60%), 
                hsl(${hue + 120}, 70%, 60%))`;
            text.style.webkitBackgroundClip = 'text';
            text.style.webkitTextFillColor = 'transparent';
            text.style.backgroundClip = 'text';
        }, 100);
    });
}

// Анимация кнопок с градиентом
function animateGradientButtons() {
    const gradientButtons = document.querySelectorAll('.btn-gradient');
    
    gradientButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.background = 'linear-gradient(135deg, #8b5cf6, #06b6d4, #3b82f6)';
            button.style.backgroundSize = '200% 200%';
            button.style.animation = 'gradientShift 1s ease infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            button.style.animation = 'none';
        });
    });
}

// Анимация прогресс-баров навыков
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            setTimeout(() => {
                bar.style.width = progress + '%';
                bar.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
            }, 500);
        }
    });
}

// Анимация счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                counter.style.color = '#3b82f6';
                counter.style.transform = 'scale(1.1)';
            }
        };
        
        updateCounter();
    });
}

// Данные о компаниях для модальных окон
const experienceData = {
    'sistema-center': {
        title: 'Инженер-программист',
        company: 'АО "СИСТЕМА-ЦЕНТР"',
        period: 'Сентябрь 2024 - настоящее время',
        description: 'АО "СИСТЕМА-ЦЕНТР" - ведущая компания в области разработки и внедрения интеллектуальных транспортных систем. Специализируется на создании высокотехнологичных решений для управления дорожным движением, включая разработку программного обеспечения для дорожных контроллеров и централизованных систем управления.',
        responsibilities: [
            'Разработка и доработка серверного приложения для управления дорожными контроллерами',
            'Создание встраиваемых модулей для микроконтроллеров',
            'Настройка и оптимизация баз данных для хранения информации о дорожном движении',
            'Интеграция различных протоколов связи (TCP/IP, RS485)',
            'Разработка пользовательского интерфейса для операторов системы',
            'Тестирование и отладка программного обеспечения',
            'Техническая поддержка и сопровождение внедренных решений'
        ],
        projects: [
            'Система управления дорожными контроллерами - разработка централизованного сервера для управления сетью из N контроллеров',
            'Встраиваемые модули связи - создание программного обеспечения для микроконтроллеров с поддержкой различных протоколов',
            'База данных дорожного движения - проектирование и реализация системы хранения и обработки данных о трафике'
        ],
        technologies: ['C++', 'Qt5', 'C#', '.NET 8', 'TCP/IP', 'RS485', 'SQLite', 'Git', 'Visual Studio'],
        logo: 'images/work_logo/sistemaCenter.png',
        website: 'https://scenter.ru/'
    },
    'bolid': {
        title: 'C++ инженер-разработчик',
        company: 'Болид, НВП, ЗАО',
        period: 'Август 2023 - Июль 2024',
        description: 'Болид, НВП, ЗАО - российская компания, специализирующаяся на разработке и производстве систем безопасности и автоматизации. Компания является одним из лидеров в области создания программно-аппаратных комплексов для систем безопасности, автоматизации зданий и промышленной автоматизации.',
        responsibilities: [
            'Разработка программного обеспечения для тестирования и отладки продукции',
            'Создание веб-приложений для оперативного мониторинга тестовых стендов',
            'Работа с базами данных для сбора и анализа информации со стендов',
            'Интеграция различных протоколов связи и интерфейсов',
            'Оптимизация производительности приложений',
            'Создание технической документации',
            'Участие в code review и улучшении качества кода'
        ],
        projects: [
            'Система мониторинга тестовых стендов - веб-приложение на Django для оперативного контроля тестирования продукции',
            'Программное обеспечение для сбора данных - C++ приложение для получения информации со стендов через различные интерфейсы',
            'База данных тестовых результатов - проектирование и реализация системы хранения результатов тестирования'
        ],
        technologies: ['C++21', 'Boost.Asio', 'MySQL', 'Qt5', 'Python', 'Django', 'Git', 'CMake', 'GCC'],
        logo: 'images/work_logo/Bolid.jpeg',
        website: 'https://bolid.ru/'
    }
};

// Функция для показа модального окна опыта работы
function showExperienceModal(companyId) {
    const modal = document.getElementById('experienceModal');
    const modalContent = modal.querySelector('.modal-content');
    const data = experienceData[companyId];
    
    if (!data) return;
    
    // Заполняем данные модального окна
    document.getElementById('modalCompanyTitle').textContent = data.title;
    document.getElementById('modalCompanyName').textContent = data.company;
    document.getElementById('modalCompanyPeriod').textContent = data.period;
    document.getElementById('modalCompanyDescription').textContent = data.description;
    
    // NEW: логотип и сайт
    const logoImg = document.getElementById('modalCompanyLogo');
    logoImg.src = data.logo;
    logoImg.alt = 'Логотип ' + data.company;
    logoImg.title = data.company;
    const siteLink = document.getElementById('modalCompanyWebsite');
    siteLink.href = data.website;
    siteLink.title = 'Перейти на сайт компании';
    
    // Заполняем обязанности
    const responsibilitiesList = document.getElementById('modalResponsibilitiesList');
    responsibilitiesList.innerHTML = '';
    data.responsibilities.forEach(responsibility => {
        const li = document.createElement('li');
        li.textContent = responsibility;
        responsibilitiesList.appendChild(li);
    });
    
    // Заполняем проекты
    const projectsList = document.getElementById('modalProjectsList');
    projectsList.innerHTML = '';
    data.projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project;
        projectsList.appendChild(li);
    });
    
    // Заполняем технологии
    const techStack = document.getElementById('modalTechStack');
    techStack.innerHTML = '';
    data.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech';
        span.textContent = tech;
        techStack.appendChild(span);
    });
    
    // Показываем модальное окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    
    // Добавляем анимацию появления
    setTimeout(() => {
        modalContent.style.transform = 'translateY(0)';
        modalContent.style.opacity = '1';
        modalContent.classList.add('show');
    }, 10);
}

// Функция для закрытия модального окна опыта работы
function closeExperienceModal() {
    const modal = document.getElementById('experienceModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Анимация закрытия
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';
    modalContent.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем скролл страницы
    }, 300);
}

// Закрытие модального окна при клике вне его
document.addEventListener('click', function(event) {
    const modal = document.getElementById('experienceModal');
    if (event.target === modal && modal.style.display === 'block') {
        closeExperienceModal();
    }
});

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('experienceModal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeExperienceModal();
    }
});

// Предотвращение закрытия при клике внутри модального окна
document.addEventListener('click', function(event) {
    const modal = document.getElementById('experienceModal');
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;
    if (event.target === modalContent || modalContent.contains(event.target)) {
        event.stopPropagation();
    }
});

// Инициализация всех анимаций
document.addEventListener('DOMContentLoaded', function() {
    // Создаем частицы
    createParticles();
    
    // Анимируем градиентные фоны
    animateGradientBackground();
    
    // Анимируем иконки
    animateIcons();
    
    // Инициализируем 3D карточки
    init3DCards();
    
    // Анимируем градиентный текст
    animateGradientText();
    
    // Анимируем градиентные кнопки
    animateGradientButtons();
    
    // Анимируем прогресс-бары навыков
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillProgress();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.querySelector('.skills-detailed');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Анимируем счетчики
    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                countersObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.header-stats');
    if (statsSection) {
        countersObserver.observe(statsSection);
    }
}); 
// Configuration des particules
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#64ffda' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            }
        }
    }
});

// Effet 3D sur les sections
const sections = document.querySelectorAll('section');

function handle3DEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const dx = (x - xc) / 20;
    const dy = (y - yc) / 20;

    element.style.transform = `rotateX(${-dy}deg) rotateY(${dx}deg)`;
}

sections.forEach(section => {
    section.addEventListener('mousemove', (e) => handle3DEffect(e, section));
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'rotateX(0) rotateY(0)';
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) rotateX(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-form').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px) rotateX(10deg)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

// Effet hover sur les cartes
const cards = document.querySelectorAll('.skill-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Rotation cubique sur clic
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const mainContainer = document.querySelector('body');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        mainContainer.classList.add('rotate-cube');

        setTimeout(() => {
            mainContainer.classList.remove('rotate-cube');
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
        }, 600);
    });
});

// Initialisation d'EmailJS
emailjs.init("MAEazr7HcLGRds47G"); // Remplacez par votre userID EmailJS

// Gestion de la soumission du formulaire
const form = document.querySelector('.contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    emailjs.send("service_sjuucbn", "template_9y2kftd", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    })
    .then(function(response) {
        alert('Formulaire envoyé avec succès !');
        form.reset();
    }, function(error) {
        alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
    });
});
/**
 * YUSUF DÖĞER - Portfolio Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // === NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Initial check
  
  // === MOBILE MENU TOGGLE ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === SCROLL ANIMATIONS (Intersection Observer) ===
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
  
  // === ACTIVE NAV LINK ON SCROLL ===
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // === FORM HANDLING ===
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gönderiliyor...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  // === TYPING EFFECT FOR HERO (Optional Enhancement) ===
  const heroTitle = document.querySelector('.hero h1');
  
  if (heroTitle && heroTitle.dataset.typeEffect) {
    const text = heroTitle.dataset.typeEffect;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    typeWriter();
  }
  
  // === ADD ANIMATION KEYFRAMES ===
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // === Console Easter Egg ===
  console.log('%c👋 Merhaba! Bu siteyi Yusuf Döğer için modern web teknolojileri ile geliştirdik.', 
    'color: #00d4ff; font-size: 14px; font-weight: bold;');
  
});

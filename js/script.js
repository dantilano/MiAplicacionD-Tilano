/*
   LISORAN - ANIME PINK THEME MASTER SCRIPT
   ==============================================================
   Brands: Lisoran (Matriz), Sor (Tech/Technology), Loran (Café & Ropa)
   ==============================================================*/

(function() {
  'use strict';

  // ============================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ============================================================
const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // ============================================================
  // 2. SCROLL REVEAL ANIMATIONS
  // ============================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .card-anime, .brand-section, .section').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ============================================================
  // 3. MUSIC PLAYER WIDGET
  // ============================================================
  const bgAudio = document.getElementById('bgAudio');
  const musicSelector = document.getElementById('musicSelector');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicPlaylist = document.getElementById('musicPlaylist');
  const currentTrackTitle = document.getElementById('currentTrackTitle');
  const currentTrackArtist = document.getElementById('currentTrackArtist');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeValue = document.querySelector('.volume-value');

  // Playlist data for Sor Tech / Loran vibes
  const playlist = [
    { src: 'mambo.mp3.mp3', title: 'Mambo Theme', artist: 'Sor Tech' },
    { src: 'mambo.mp3.mp3', title: 'Neon Nights', artist: 'Sor Synthwave' },
    { src: 'mambo.mp3.mp3', title: 'Café Dreams', artist: 'Loran Lo-Fi' },
    { src: 'mambo.mp3.mp3', title: 'Pink Circuit', artist: 'Sor Cyber' }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  // Initialize playlist
  if (musicPlaylist) {
    musicPlaylist.innerHTML = '';
    playlist.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = `track-item ${index === 0 ? 'active' : ''}`;
      li.dataset.src = track.src;
      li.dataset.title = track.title;
      li.dataset.artist = track.artist;
      li.innerHTML = `
        <svg class="track-play-icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>${track.title} (${track.artist})</span>
      `;
      li.addEventListener('click', () => playTrack(index));
      musicPlaylist.appendChild(li);
    });
  }

  // Toggle playlist visibility
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      musicSelector.classList.toggle('collapsed');
      musicToggleBtn.textContent = musicSelector.classList.contains('collapsed') ? '▼' : '▲';
      musicToggleBtn.setAttribute('aria-expanded', !musicSelector.classList.contains('collapsed'));
    });
  }

  // Volume control
  if (volumeSlider && bgAudio) {
    volumeSlider.addEventListener('input', () => {
      bgAudio.volume = volumeSlider.value;
      if (volumeValue) volumeValue.textContent = Math.round(volumeSlider.value * 100) + '%';
    });
    bgAudio.volume = 0.8;
  }

  function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentTrackIndex = index;
    const track = playlist[index];
    
    bgAudio.src = track.src;
    bgAudio.play().then(() => {
      isPlaying = true;
      updatePlayerUI(track);
    }).catch(err => console.log('Audio play failed:', err));
  }

  function updatePlayerUI(track) {
    if (currentTrackTitle) currentTrackTitle.textContent = track.title;
    if (currentTrackArtist) currentTrackArtist.textContent = track.artist;
    
    // Update active track in playlist
    musicPlaylist?.querySelectorAll('.track-item').forEach((item, i) => {
      item.classList.toggle('active', i === currentTrackIndex);
    });
  }

  // Play next track on end
  if (bgAudio) {
    bgAudio.addEventListener('ended', () => {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      playTrack(nextIndex);
    });
  }

  // ============================================================
  // 4. CONTACT FORM HANDLING
  // ============================================================
  const contactForm = document.getElementById('unifiedContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formStatus = document.getElementById('contactMessage');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Enviando... ⏳</span>';
      submitBtn.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      submitBtn.innerHTML = '<span>¡Mensaje Enviado a Loran Café! 🌸</span>';
      submitBtn.style.background = 'linear-gradient(to right, #9370DB, #FF69B4)';
      
      if (formStatus) {
        formStatus.textContent = 'Tu mensaje ha sido enviado. Te responderemos pronto en Loran Café ☕';
        formStatus.style.display = 'block';
        formStatus.style.color = '#9370DB';
        formStatus.style.background = 'rgba(147, 112, 219, 0.1)';
        formStatus.style.padding = '1rem';
        formStatus.style.borderRadius = '8px';
        formStatus.style.border = '1px solid rgba(147, 112, 219, 0.3)';
      }
      
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        if (formStatus) formStatus.style.display = 'none';
      }, 5000);
    });
  }

  // ============================================================
  // 5. TAB NAVIGATION FOR SUB-BRANDS (SOR & LORAN)
  // ============================================================
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabContainer = tab.closest('[data-tabs]');
      const targetId = tab.dataset.tab;
      
      // Update active tab
      tabContainer?.querySelectorAll('[data-tab]').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Show target panel
      tabContainer?.querySelectorAll('[data-panel]').forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
      });
      
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.hidden = false;
        
        // Add brand overlay based on active tab
        const brandType = targetId.includes('sor') ? 'sor' : 'loran';
        targetPanel.classList.add(`brand-overlay-${brandType}`);
      }
    });
  });

  // ============================================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 7. HOVER EFFECTS FOR BRAND CARDS
  // ============================================================
  const brandCards = document.querySelectorAll('.sor-card, .loran-card, .lisoran-card');
  brandCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ============================================================
  // 8. PARALLAX EFFECT ON HERO
  // ============================================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    }, { passive: true });
  }

  // ============================================================
  // 9. BRAND-SPECIFIC INTERACTIONS
  // ============================================================
  // Sor tech: Terminal-style typing effect
  const sorTerminal = document.querySelector('.sor-terminal');
  if (sorTerminal) {
    const text = 'Sor Tech: Innovation driven by passion...';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        sorTerminal.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    typeWriter();
  }

  // Loran: Coffee steam animation trigger
  document.querySelectorAll('.coffee-item, .menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.animation = 'float 2s ease-in-out infinite';
    });
    item.addEventListener('mouseleave', () => {
      item.style.animation = '';
    });
  });

  // ============================================================
  // 10. RESERVATION MODAL FOR LORAN
  // ============================================================
  document.querySelectorAll('[data-reserve]').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('🌸 ¡Gracias por tu interés en Loran Café! Tu reserva ha sido registrada. Te esperamos con el mejor café y estilo.');
    });
  });

})();
const header = document.querySelector('#siteHeader');
const progressBar = document.querySelector('#progressBar');
const audio = document.querySelector('#audio');
const musicToggle = document.querySelector('#musicToggle');
const musicLabel = document.querySelector('#musicLabel');
const songPath = 'music/HER_-_Best_Part_CeeNaija.com_.mp3';
let songAvailable = false;
audio.src = songPath;
audio.addEventListener('canplay', () => { songAvailable = true; });
audio.addEventListener('error', () => {
  songAvailable = false;
  musicLabel.textContent = 'add best part in /music';
});
const letterPanel = document.querySelector('#letterPanel');
const letterText = document.querySelector('#letterText');
const letterKicker = document.querySelector('#letterKicker');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');

const letters = {
  love: { kicker: 'Open when you need a reminder', text: 'I love you in the quiet moments and the loud ones. I love the person you are, the person you are becoming, and the way you make room for me in your life. You never have to earn my love by being perfect. You already have it, completely.' },
  difficult: { kicker: 'Open when today feels heavy', text: 'Take a breath, my love. You do not have to solve everything at once, and you do not have to carry every difficult thing alone. I am here, and I believe in you even on the days when believing in yourself feels hard.' },
  miss: { kicker: 'Open when you miss me', text: 'I am probably missing you too. Until we are together again, remember that distance cannot change what you are to me. You are part of my everyday thoughts, my plans, and my heart.' },
  smile: { kicker: 'Open when you need a reason to smile', text: 'Here is your reminder that you are deeply loved by someone who thinks you are one of the most interesting, funniest, kindest people in the world. Also, you are officially required to smile now. I do not make the rules.' },
  special: { kicker: 'Open when you forget your magic', text: 'You are special to me because of the way you make people feel, the way you keep going, and the way you show up as yourself. There is nobody else who could be you. That is more than enough. That is everything.' }
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / scrollable) * 100}%`;
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }));
});

document.querySelectorAll('.gallery-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.querySelector('img').alt;
    lightboxCaption.textContent = card.dataset.caption;
    lightbox.classList.add('open');
    document.body.classList.add('locked');
  });
});
const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.classList.remove('locked');
  lightboxImage.src = '';
};
document.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

document.querySelectorAll('.letter-card').forEach((card) => {
  card.addEventListener('click', () => {
    const letter = letters[card.dataset.letter];
    const wasOpen = card.classList.contains('active');
    document.querySelectorAll('.letter-card').forEach((item) => item.classList.remove('active'));
    if (wasOpen) {
      letterPanel.classList.remove('open');
      return;
    }
    card.classList.add('active');
    letterKicker.textContent = letter.kicker;
    letterText.textContent = letter.text;
    letterPanel.classList.add('open');
    letterPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
document.querySelector('#closeLetter').addEventListener('click', () => {
  letterPanel.classList.remove('open');
  document.querySelectorAll('.letter-card').forEach((item) => item.classList.remove('active'));
});

musicToggle.addEventListener('click', async () => {
  if (!songAvailable) {
    musicLabel.textContent = 'add song in /music';
    musicToggle.classList.add('attention');
    setTimeout(() => musicToggle.classList.remove('attention'), 1200);
    return;
  }
  if (audio.paused) {
    await audio.play();
    musicToggle.classList.add('playing');
    musicToggle.setAttribute('aria-pressed', 'true');
    musicLabel.textContent = 'pause song';
  } else {
    audio.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicLabel.textContent = 'best part';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    if (letterPanel.classList.contains('open')) letterPanel.classList.remove('open');
  }
});

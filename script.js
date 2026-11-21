const revealItems = document.querySelectorAll('.reveal');
const hero = document.querySelector('.hero');
let heroViewportWidth;

function lockMobileHeroHeight() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    hero.style.height = `${window.innerHeight}px`;
    heroViewportWidth = window.innerWidth;
  } else {
    hero.style.height = '';
    heroViewportWidth = undefined;
  }
}

window.addEventListener('resize', () => {
  // Mobile browser chrome changes height while scrolling; only react to width changes.
  if (heroViewportWidth !== undefined && window.innerWidth !== heroViewportWidth) {
    lockMobileHeroHeight();
  }
});

document.querySelectorAll('.cover-button').forEach((button) => {
  button.addEventListener('click', () => {
    lockMobileHeroHeight();
    document.querySelector('#invitation-cover').hidden = true;
    document.querySelector('#invitation').hidden = false;
    const backgroundMusic = document.querySelector('#background-music');
    if (backgroundMusic.paused && backgroundMusic.currentTime === 0) {
      backgroundMusic.play().catch(() => {});
    }
    window.scrollTo(0, 0);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('.copy-account').forEach((button) => {
  button.addEventListener('click', async () => {
    const number = button.parentElement.querySelector('.account-number').textContent.trim();
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(number);
      status.textContent = '계좌번호를 복사했습니다.';
    } catch {
      status.textContent = '복사하지 못했습니다. 계좌번호를 직접 선택해 복사해 주세요.';
    }
  });
});

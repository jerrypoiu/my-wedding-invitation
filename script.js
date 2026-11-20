const revealItems = document.querySelectorAll('.reveal');

document.querySelectorAll('.cover-button').forEach((button) => {
  button.addEventListener('click', () => {
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

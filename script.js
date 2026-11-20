const revealItems = document.querySelectorAll('.reveal');

document.querySelectorAll('.cover-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#invitation-cover').hidden = true;
    document.querySelector('#invitation').hidden = false;
    window.scrollTo(0, 0);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));

const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('night-voyage-theme');

if (savedTheme === 'dark') body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('night-voyage-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const filterButtons = document.querySelectorAll('.filter-chip');
const dispatchCards = document.querySelectorAll('.dispatch-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    dispatchCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const subscribeForm = document.querySelector('#subscribe-form');
const formMessage = document.querySelector('#form-message');
subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(subscribeForm).get('email');
  if (!email) return;
  formMessage.textContent = '收到。下一封夜航信，会在两周内抵达。';
  subscribeForm.reset();
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

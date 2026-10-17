const themeImages={rose:"assets/hero-rose.jpg",ocean:"assets/hero-ocean.jpg",lavender:"assets/hero-lavender.jpg",emerald:"assets/hero-emerald.jpg",sunset:"assets/hero-sunset.jpg",midnight:"assets/hero-midnight.jpg",gold:"assets/hero-gold.jpg"};
const root=document.documentElement;const choices=[...document.querySelectorAll('[data-theme-choice]')];const menu=document.getElementById('themeMenu');const menuToggle=document.getElementById('themeMenuToggle');let selectedTheme=root.dataset.theme||'rose';function paintTheme(theme){root.dataset.theme=theme;root.style.setProperty('--hero-image',`url(\"${themeImages[theme]||themeImages.rose}\")`);choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme)));}function setTheme(theme){selectedTheme=theme;paintTheme(theme);const hero=document.querySelector('.hero');hero.classList.remove('theme-changing');void hero.offsetWidth;hero.classList.add('theme-changing');menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}paintTheme(selectedTheme);menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});choices.forEach(b=>{b.addEventListener('pointerenter',()=>paintTheme(b.dataset.themeChoice));b.addEventListener('pointerleave',()=>paintTheme(selectedTheme));b.addEventListener('focus',()=>paintTheme(b.dataset.themeChoice));b.addEventListener('blur',()=>paintTheme(selectedTheme));b.addEventListener('click',()=>setTheme(b.dataset.themeChoice));});menu.addEventListener('pointerleave',()=>paintTheme(selectedTheme));document.addEventListener('click',e=>{if(!menu.contains(e.target)){menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');paintTheme(selectedTheme);}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');paintTheme(selectedTheme);}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');if(e.target.classList.contains('skill'))e.target.classList.add('in-view');observer.unobserve(e.target);}}),{threshold:.14});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const formMessage=document.getElementById('formMessage');if(new URLSearchParams(window.location.search).get('contact')==='sent'&&formMessage){formMessage.textContent='Thank you! Your enquiry has been submitted successfully.';formMessage.classList.add('form-success');}

const projectGrid = document.getElementById('projectGrid');
const projectDots = document.getElementById('projectDots');
const prevProject = document.getElementById('prevProject');
const nextProject = document.getElementById('nextProject');

function getStep() {
  const card = projectGrid.querySelector('.project');
  if (!card) return projectGrid.clientWidth;

  const gap = parseFloat(getComputedStyle(projectGrid).gap) || 0;
  return card.getBoundingClientRect().width + gap;
}

function getMaxIndex() {
  return Math.max(
    0,
    Math.ceil(
      (projectGrid.scrollWidth - projectGrid.clientWidth) / getStep()
    )
  );
}

function buildDots() {
  const count = getMaxIndex() + 1;
  projectDots.innerHTML = Array.from(
    { length: count },
    (_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}"
      aria-label="Go to project slide ${i + 1}"></button>`
  ).join('');

  [...projectDots.children].forEach((dot, i) => {
    dot.addEventListener('click', () => {
      projectGrid.scrollTo({
        left: i * getStep(),
        behavior: 'smooth'
      });
    });
  });
}

function updateDots() {
  const index = Math.min(
    getMaxIndex(),
    Math.round(projectGrid.scrollLeft / getStep())
  );

  [...projectDots.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

prevProject.addEventListener('click', () => {
  projectGrid.scrollBy({
    left: -getStep(),
    behavior: 'smooth'
  });
});

nextProject.addEventListener('click', () => {
  projectGrid.scrollBy({
    left: getStep(),
    behavior: 'smooth'
  });
});

projectGrid.addEventListener('scroll', updateDots);
window.addEventListener('resize', buildDots);

buildDots();

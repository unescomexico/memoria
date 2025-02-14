document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = document.querySelectorAll('.toc a');

  // Navegación suave al hacer click en el índice
  tocLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver para marcar la sección visible
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('h1, h2, h3, h4').forEach(section => {
    observer.observe(section);
  });

  // Funcionalidad para contraer/expandir el índice
  const toggleBtn = document.getElementById('toggle-toc');
  toggleBtn.addEventListener('click', function () {
    const toc = document.querySelector('.toc');
    toc.classList.toggle('collapsed');
    if (toc.classList.contains('collapsed')) {
      this.textContent = 'Expandir Índice';
    } else {
      this.textContent = 'Contraer Índice';
    }
  });
});



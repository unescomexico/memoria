document.addEventListener('DOMContentLoaded', function() {
  const tocLinks = document.querySelectorAll('.toc a');
  
  // Navegación suave al hacer click
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Opciones para el IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
  };

  // Observer para marcar la sección visible
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

  // Observa todas las secciones de títulos
  document.querySelectorAll('h1, h2, h3, h4').forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = document.querySelectorAll('.toc a');

  // Navegación suave en el índice
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

  // Funcionalidad para contraer/expandir el índice en móviles
  const toggleBtn = document.getElementById('toggle-toc');
  toggleBtn.addEventListener('click', function () {
    const tocElement = document.querySelector('.toc');
    tocElement.classList.toggle('expanded');
  });

  // Funcionalidad para secciones colapsables
  const collapsibleHeaders = document.querySelectorAll('.collapsible h1, .collapsible h2, .collapsible h3, .collapsible h4');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '20px';
        content.style.paddingBottom = '20px';
      }
    });
  });
});

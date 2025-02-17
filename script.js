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

  // Función que suma las alturas de los hijos visibles y asigna ese total como maxHeight
  function recalcContainerHeight(container) {
    let total = 0;
    Array.from(container.children).forEach(child => {
      total += child.offsetHeight;
    });
    container.style.maxHeight = total + 'px';
  }

  // Actualiza la altura de los contenedores padres, 
  // omitiendo el contenedor de la sección que se está toggling.
  function updateParentHeights(element) {
    // Obtén el contenedor actual (la sección que se está expandiendo o colapsando)
    let currentCollapsible = element.closest('.collapsible');
    // Ahora buscamos el contenedor padre de ese bloque (si existe)
    let parentCollapsible =
      currentCollapsible && currentCollapsible.parentElement
        ? currentCollapsible.parentElement.closest('.collapsible')
        : null;
    while (parentCollapsible) {
      const parentContent = parentCollapsible.querySelector('.section-content');
      if (parentContent) {
        recalcContainerHeight(parentContent);
      }
      parentCollapsible =
        parentCollapsible.parentElement
          ? parentCollapsible.parentElement.closest('.collapsible')
          : null;
    }
  }

  // Funcionalidad para secciones colapsables (para secciones principales y subtemas)
  const collapsibleHeaders = document.querySelectorAll(
    '.collapsible h1, .collapsible h2, .collapsible h3, .collapsible h4'
  );

  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function (e) {
      // Evita que el clic se propague al contenedor padre
      e.stopPropagation();
      const content = this.nextElementSibling;
      // Si la sección está expandida, colapsarla
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
      } else {
        // Si está colapsada, expandirla
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '20px';
        content.style.paddingBottom = '20px';
      }
      // Actualiza las alturas de los contenedores padres (sin afectar el contenedor actual)
      updateParentHeights(content);
    });
  });
});


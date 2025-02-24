document.addEventListener('DOMContentLoaded', function () {
  const tocLinks = document.querySelectorAll('.toc a');

  // Navegación suave en el índice
  tocLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Si la sección correspondiente está contraída, la expandimos
        const targetContent = target.nextElementSibling;
        if (targetContent && targetContent.classList.contains('section-content') &&
          (!targetContent.style.maxHeight || targetContent.style.maxHeight === '0px')) {
          targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
          targetContent.style.paddingTop = '20px';
          targetContent.style.paddingBottom = '20px';
          updateParentHeights(targetContent);
        }
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

  // Botón para togglear sidebar izquierdo
  const toggleBtn = document.getElementById('toggle-toc');
  toggleBtn.addEventListener('click', function () {
    const tocElement = document.querySelector('.toc');
    tocElement.classList.toggle('expanded');
  });

  // Botón para togglear sidebar derecho
  const toggleRightBtn = document.getElementById('toggle-right-sidebar');
  toggleRightBtn.addEventListener('click', function () {
    const rightSidebar = document.querySelector('.right-sidebar');
    rightSidebar.classList.toggle('expanded');
  });

  // Función que recalcula la altura total de un contenedor sumando la altura de sus hijos
  function recalcContainerHeight(container) {
    let total = 0;
    Array.from(container.children).forEach(child => {
      total += child.offsetHeight;
    });
    container.style.maxHeight = total + 'px';
  }

  // Actualiza la altura de los contenedores padres sin afectar el contenedor de la sección toggleada
  function updateParentHeights(element) {
    let currentCollapsible = element.closest('.collapsible');
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

  // Togglear secciones internas al hacer clic en sus encabezados
  const collapsibleHeaders = document.querySelectorAll(
    '.collapsible h1, .collapsible h2, .collapsible h3, .collapsible h4'
  );
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function (e) {
      e.stopPropagation();
      const content = this.nextElementSibling;
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // Colapsar
        content.style.maxHeight = '0px';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
      } else {
        // Expandir
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.paddingTop = '20px';
        content.style.paddingBottom = '20px';
      }
      updateParentHeights(content);
    });
  });
});

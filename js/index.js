
// ========== Footer dinámico ==========

// 1) Fecha de hoy y año actual (sin hardcodear)
const today = new Date();
const thisYear = today.getFullYear();

// 2) Crear <footer> por DOM Manipulation
const footerEl = document.createElement('footer');
document.body.appendChild(footerEl);

// 3) "DOM Selection": seleccionar el <footer> del DOM en la variable 'footer'
const footer = document.querySelector('footer');

// 4) Crear <p> de copyright
const copyright = document.createElement('p');
// STRETCH: símbolo © con Unicode
copyright.innerHTML = `\u00A9 Alaska Florez ${thisYear}`;

// 5) Insertar el <p> dentro del footer
footer.appendChild(copyright);




// ========== Skills dinámicos ==========

// 1) Lista de habilidades
const skills = [
  'JavaScript',
  'HTML',
  'CSS',
  'Git & GitHub',
  'Responsive Design',
  'VS Code',
  'UX Basics',
];

// 2) Seleccionar la sección por id (S mayúscula porque tu HTML usa #Skills)
const skillsSection = document.querySelector('#Skills');

// 3) Dentro de la sección, seleccionar el <ul>
const skillsList = skillsSection.querySelector('ul');

// 4) Recorrer el array y crear <li> (la tarea sugiere nombrar la variable como 'skill')
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li'); // crear <li>
  skill.innerText = skills[i];                // texto del li
  skillsList.appendChild(skill);              // agregar al <ul>
}
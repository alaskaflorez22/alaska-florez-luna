
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




// ========== GitHub Repositories (Fetch API) ==========


const GITHUB_USERNAME = 'alaskaflorez22'; 
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const projectSection = document.querySelector('#Projects');
const projectList    = projectSection.querySelector('#project-list');
const projectsError  = document.getElementById('projects-error');

function showError(message) {
  projectsError.textContent = message;
  projectsError.hidden = false;
}

function renderRepositories(repositories) {

  if (!Array.isArray(repositories) || repositories.length === 0) {
    showError('No repositories found to display.');
    return;
  }
projectList.innerHTML = '';

for (let i = 0; i < repositories.length; i++) {
    const repo = repositories[i];  

     const project = document.createElement('li');

     const a = document.createElement('a');
    a.href = repo.html_url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = repo.name; 

     const small = document.createElement('small');
    if (repo.description) {
      small.textContent = ` — ${repo.description}`;
    }

     project.appendChild(a);
    if (small.textContent) project.appendChild(small);
    projectList.appendChild(project);
  }
}



fetch(API_URL)

.then((response) => {
    if (!response.ok) {
      throw new Error(`GitHub API error (${response.status})`);
    }
    return response.json();
    })

    .then((repositories) => {
    console.log('Repositories:', repositories); // para revisar la respuesta
    renderRepositories(repositories);
     })

     .catch((error) => {
    console.error(error);
    showError('We were unable to load your projects at this time. Please try again later.');
  });
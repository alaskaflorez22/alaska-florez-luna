
// ========== Footer dinámico ==========

// 1) Date
const today = new Date();
const thisYear = today.getFullYear();

// 2) Create <footer> for DOM Manipulation
const footerEl = document.createElement('footer');
footerEl.className = 'site-footer';
document.body.appendChild(footerEl);

// 3) "DOM Selection"
const footer = document.querySelector('footer');

// 4) create <p> de copyright
const copyright = document.createElement('p');
// STRETCH
copyright.innerHTML = `\u00A9 Alaska Florez ${thisYear}`;

// 5) Add the <p> in footer
footer.appendChild(copyright);




// ========== Skills ==========

// 1) List of skills
const skills = [
  'JavaScript',
  'HTML',
  'CSS',
  'Git & GitHub',
  'Responsive Design',
  'VS Code',
  'UX Basics',
];

// 2) Select for id 
const skillsSection = document.querySelector('#Skills');

// 3) Within the section, select the <ul>
const skillsList = skillsSection.querySelector('ul');

// 4) Iterate through the array and create <li> 
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li'); 
  skill.innerText = skills[i];                
  skillsList.appendChild(skill);            
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
  projectsError.hidden = true;       
  projectsError.textContent = ''; 

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
    console.log('Repositories:', repositories); 
    renderRepositories(repositories);
     })

     .catch((error) => {
    console.error(error);
    showError('We were unable to load your projects at this time. Please try again later.');
  });


  // ========== Message Form: submit -> render list ==========

const messageForm = document.querySelector('form[name="leave_message"]');

if (messageForm) {
  messageForm.addEventListener('submit', function (event) {
    
    event.preventDefault();

    
    const name = event.target.usersName.value.trim();
    const email = event.target.usersEmail.value.trim();
    const message = event.target.usersMessage.value.trim();

    
    console.log({ name, email, message });

   
    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');

 
    messageSection.hidden = false;

    
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `
      <a href="mailto:${email}">${name}</a>
      <span> - ${message}</span>
    `;


    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function () {
      const span = newMessage.querySelector('span');
      const current = span?.innerText.replace(/^ - /, '') || '';
      const next = window.prompt('Edit the message:', current);
      if (next !== null) span.innerText = ` - ${next}`;
    });

    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'remove';
    removeButton.addEventListener('click', function () {
      const entry = this.parentNode; // li
      entry.remove();
      if (messageList.children.length === 0) {
        messageSection.hidden = true; 
      }
    });


    newMessage.append(' ');
    newMessage.appendChild(editButton);
    newMessage.append(' ');
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

  
    event.target.reset();
  });
}

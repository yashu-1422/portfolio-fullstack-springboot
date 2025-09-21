document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:8081';

    // --- ELEMENT SELECTORS ---
    const projectsContainer = document.getElementById('projects-container');
    const achievementsContainer = document.getElementById('achievements-container');
    const experienceContainer = document.getElementById('experience-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loader = document.getElementById('loader');


    // =================================================================
    //                  PROJECTS SECTION LOGIC
    // =================================================================
    let projectCurrentPage = 0;
    const projectPageSize = 4;
    let lastPage = false;

    function createProjectCard(project) {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        const demoButton = project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary btn-sm">Live Demo</a>` : '';
        col.innerHTML = `
            <div class="card project-card h-100">
                <img src="${API_BASE_URL}${project.imgLink || '/images/default-project.png'}" class="card-img-top" alt="${project.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text text-white-50">${project.description}</p>
                    <p class="card-text text-white-50 small"><strong>Technologies:</strong> ${project.technologies || 'N/A'}</p>
                    <div class="project-buttons mt-auto">
                        ${demoButton}
                        <a href="${project.githubLink}" target="_blank" class="btn btn-outline-light btn-sm">View on GitHub</a>
                    </div>
                </div>
            </div>`;
        return col;
    }

    async function fetchProjects(page) {
        loader.classList.remove('d-none');
        loadMoreBtn.classList.add('d-none');
        try {
            const response = await fetch(`${API_BASE_URL}/api/public/projects?page=${page}&size=${projectPageSize}`);
            const data = await response.json();
            const projects = data.content || [];
            projects.forEach(project => {
                const card = createProjectCard(project);
                projectsContainer.appendChild(card);
            });
            lastPage = data.last || projects.length < projectPageSize;
            if (lastPage) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.classList.remove('d-none');
            }
        } catch (error) {
            alert('Failed to load projects.');
        } finally {
            loader.classList.add('d-none');
        }
    }

    function createAchievementCard(achievement) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        col.innerHTML = `
            <div class="achievement-card text-center p-4 h-100">
                <div class="icon-circle mb-3"><i class="${achievement.iconClass}"></i></div>
                <h5 class="card-title">${achievement.title}</h5>
                <p class="card-text text-white-50">${achievement.subtitle}</p>
            </div>`;
        return col;
    }

    function createExperienceElement(exp) {
        const div = document.createElement('div');
        div.className = 'experience-item-wrapper';
        div.innerHTML = `
            <div class="experience-item text-center p-4">
                <div class="experience-icon mb-3"><i class="${exp.iconClass}"></i></div>
                <div>
                    <h5 class="mb-1">${exp.title}</h5>
                    <p class="text-primary mb-2"><strong>${exp.subtitle}</strong></p>
                    <p class="text-white-50">${exp.description}</p>
                </div>
            </div>`;
        return div;
    }

    async function fetchAchievements() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/public/achievements`);
            const data = await response.json();
            achievementsContainer.innerHTML = '';
            data.forEach(ach => {
                const card = createAchievementCard(ach);
                achievementsContainer.appendChild(card);
            });
        } catch (error) {
            alert('Failed to load achievements.');
        }
    }

    async function fetchExperience() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/public/experience`);
            const data = await response.json();
            experienceContainer.innerHTML = '';
            data.forEach(exp => {
                const card = createExperienceElement(exp);
                experienceContainer.appendChild(card);
            });
        } catch (error) {
            alert('Failed to load experience.');
        }
    }

    // --- INITIAL DATA FETCH ---
    fetchProjects(projectCurrentPage);
    fetchAchievements();
    fetchExperience();

    // On "Load More" click, show next 4 projects
    loadMoreBtn.addEventListener('click', () => {
        projectCurrentPage++;
        fetchProjects(projectCurrentPage);
    });
});


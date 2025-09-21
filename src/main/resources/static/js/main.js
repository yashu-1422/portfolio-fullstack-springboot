document.addEventListener('DOMContentLoaded', () => {

    const API_BASE_URL = 'https://yash-auti-portfolio-fullstack-springboot.onrender.com';

    const projectsContainer = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loader = document.getElementById('loader');
    const achievementsContainer = document.getElementById('achievements-container');
    const experienceContainer = document.getElementById('experience-container');

    // =================================================================
    //                  PROJECTS SECTION LOGIC
    // =================================================================
    let projectCurrentPage = 0;
    const projectPageSize = 4;

    function createProjectCard(project) {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        const demoButton = project.demoLink ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary btn-sm">Live Demo</a>` : '';
        const imageUrl = project.imgLink ? `${API_BASE_URL}${project.imgLink}` : `${API_BASE_URL}/images/default-project.png`;

        col.innerHTML = `
            <div class="card project-card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${project.title}">
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

    async function fetchProjects() {
        if (!projectsContainer || !loader || !loadMoreBtn) {
            console.error("Project-related HTML elements not found!");
            return;
        }
        
        loader.classList.remove('d-none');
        loadMoreBtn.classList.add('d-none');

        try {
            const response = await fetch(`${API_BASE_URL}/api/projects?page=${projectCurrentPage}&size=${projectPageSize}`);
            if (!response.ok) throw new Error('Network response failed for projects.');
            
            const pageData = await response.json();
            
            // THE FIX: We must loop over pageData.content, not pageData itself.
            if (pageData.content && pageData.content.length > 0) {
                pageData.content.forEach(project => projectsContainer.appendChild(createProjectCard(project)));
                projectCurrentPage++;
            }

            // THE FIX: Check the 'last' property to decide if the button should be shown.
            if (pageData.last) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.classList.remove('d-none');
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            projectsContainer.innerHTML = `<p class="text-center text-danger">Could not load projects.</p>`;
        } finally {
            loader.classList.add('d-none');
        }
    }

    if (loadMoreBtn) loadMoreBtn.addEventListener('click', fetchProjects);

    // =================================================================
    //                  ACHIEVEMENTS & EXPERIENCE LOGIC
    // =================================================================

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

    async function fetchData(endpoint, container, cardCreator) {
        if (!container) return;
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`Network response failed for ${endpoint}.`);
            const data = await response.json();
            container.innerHTML = '';
            data.forEach(item => container.appendChild(cardCreator(item)));
        } catch (error) {
            console.error(`Failed to fetch ${endpoint}:`, error);
            container.innerHTML = `<p class="text-center text-danger">Could not load this section.</p>`;
        }
    }

    // --- INITIAL DATA FETCH ---
    fetchProjects();
    fetchData('/api/achievements', achievementsContainer, createAchievementCard);
    fetchData('/api/experience', experienceContainer, createExperienceElement);
});




document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL CONFIG ---
    // THE FIX: Replace the old localhost URL with your live Render URL.
    const API_BASE_URL = 'https://portfolio-fullstack-springboot.onrender.com';

    // --- ELEMENT SELECTORS ---
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loader = document.getElementById('loader');
    const achievementsContainer = document.getElementById('achievements-container');
    const experienceContainer = document.getElementById('experience-container');


    // =================================================================
    //                  PROJECTS SECTION LOGIC
    // =================================================================
    let projectCurrentPage = 0;
    const projectsPerPage = 4; // Display 4 projects at a time

    /**
     * Creates an HTML card element for a single project.
     * @param {object} project - The project data from the API.
     * @returns {HTMLElement} The project card element.
     */
    function createProjectCard(project) {
        const col = document.createElement('div');
        // Sets the grid column class for Bootstrap (4 columns on large screens)
        col.className = 'col-lg-3 col-md-6 mb-4';

        // Conditionally create the "Live Demo" button only if a demoLink exists
        const demoButton = project.demoLink
            ? `<a href="${project.demoLink}" target="_blank" class="btn btn-primary btn-sm">Live Demo</a>`
            : '';
        
        // Correctly prepend the base URL for image links
        const imageUrl = project.imgLink ? `${API_BASE_URL}${project.imgLink}` : `${API_BASE_URL}/images/default-project.png`;

        col.innerHTML = `
            <div class="card project-card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text text-white-50">${project.description}</p>
                    <p class="card-text text-white-50 small"><strong>Technologies:</strong> ${project.technologies || 'Not specified'}</p>
                    <div class="project-buttons mt-auto">
                        ${demoButton}
                        <a href="${project.githubLink}" target="_blank" class="btn btn-outline-light btn-sm">View on GitHub</a>
                    </div>
                </div>
            </div>
        `;
        return col;
    }

    /**
     * Fetches a page of projects from the backend API and displays them.
     */
    async function fetchProjects() {
        if (!projectsContainer) return; // Stop if the container doesn't exist

        loader.classList.remove('d-none');
        loadMoreBtn.classList.add('d-none');

        try {
            const response = await fetch(`${API_BASE_URL}/api/projects?page=${projectCurrentPage}&size=${projectsPerPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const pageData = await response.json();

            if (pageData.content && pageData.content.length > 0) {
                pageData.content.forEach(project => {
                    const card = createProjectCard(project);
                    projectsContainer.appendChild(card);
                });
                projectCurrentPage++; // Increment for the next fetch
            }

            // Hide the "Load More" button if it's the last page
            if (pageData.last) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.classList.remove('d-none');
            }

        } catch (error) {
            console.error('Failed to fetch projects:', error);
            projectsContainer.innerHTML = `<p class="text-center text-danger">Could not load projects. Please ensure the backend is running.</p>`;
        } finally {
            loader.classList.add('d-none');
        }
    }

    // Add event listener for the "Load More" button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', fetchProjects);
    }


    // =================================================================
    //                  ACHIEVEMENTS SECTION LOGIC
    // =================================================================
    function createAchievementCard(achievement) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        col.innerHTML = `
            <div class="achievement-card text-center p-4 h-100">
                <div class="icon-circle mb-3">
                    <i class="${achievement.iconClass}"></i>
                </div>
                <h5 class="card-title">${achievement.title}</h5>
                <p class="card-text text-white-50">${achievement.subtitle}</p>
            </div>
        `;
        return col;
    }

    async function fetchAchievements() {
        if (!achievementsContainer) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/achievements`);
            const achievements = await response.json();
            achievements.forEach(ach => {
                const card = createAchievementCard(ach);
                achievementsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Failed to fetch achievements:', error);
        }
    }


    // =================================================================
    //                  EXPERIENCE SECTION LOGIC
    // =================================================================
    function createExperienceElement(exp) {
        const div = document.createElement('div');
        div.className = 'experience-item-wrapper';
        div.innerHTML = `
            <div class="experience-item text-center p-4">
                <div class="experience-icon mb-3">
                    <i class="${exp.iconClass}"></i>
                </div>
                <div>
                    <h5 class="mb-1">${exp.title}</h5>
                    <p class="text-primary mb-2"><strong>${exp.subtitle}</strong></p>
                    <p class="text-white-50">${exp.description}</p>
                </div>
            </div>
        `;
        return div;
    }

    async function fetchExperience() {
        if (!experienceContainer) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/experience`);
            const experiences = await response.json();
            experiences.forEach(exp => {
                const item = createExperienceElement(exp);
                experienceContainer.appendChild(item);
            });
        } catch (error) {
            console.error('Failed to fetch experience:', error);
        }
    }


    // --- INITIAL DATA FETCH ---
    // Fetch all necessary data when the page loads
    fetchProjects();
    fetchAchievements();
    fetchExperience();

});

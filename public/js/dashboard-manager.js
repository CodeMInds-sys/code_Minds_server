// Check authentication
const config = {
    API_URL: 'http://localhost:3000/api'
};
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || user.role !== 'manager') {
    window.location.href = 'login.html';
}

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        const response = await fetch(`${config.API_URL}/dashboard/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        document.querySelector('.total-students').textContent = data.totalStudents;
        document.querySelector('.total-courses').textContent = data.totalCourses;
        document.querySelector('.new-purchases').textContent = data.newPurchases;
        document.querySelector('.monthly-sales').textContent = data.monthlySales;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Handle sidebar navigation
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        if (link.classList.contains('logout')) return;
        
        e.preventDefault();
        const section = link.dataset.section;
        
        try {
            const response = await fetch(`${config.API_URL}/dashboard/${section}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            // Update content based on section
            const content = document.querySelector('.dashboard-content');
            content.innerHTML = `<h2 class="dashboard-header">${section}</h2>`;
            
            // Add section-specific content
            switch (section) {
                case 'courses':
                    // Display courses management UI
                    break;
                case 'instructors':
                    // Display instructors management UI
                    break;
                case 'students':
                    // Display students management UI
                    break;
                case 'purchases':
                    // Display purchases management UI
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${section}:`, error);
        }
    });
});

// Load initial dashboard stats
document.addEventListener('DOMContentLoaded', loadDashboardStats);
// Check authentication
// const token = localStorage.getItem('token');
// const user = <boltAction type="file" filePath="public/js/dashboard-instructor.js">// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || user.role !== 'instructor') {
    window.location.href = 'login.html';
}

// Load instructor dashboard statistics
async function loadInstructorStats() {
    try {
        const response = await fetch(`${config.API_URL}/instructor/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        document.querySelector('.total-courses').textContent = data.totalCourses;
        document.querySelector('.total-students').textContent = data.totalStudents;
        document.querySelector('.pending-assignments').textContent = data.pendingAssignments;
        document.querySelector('.today-lectures').textContent = data.todayLectures;
    } catch (error) {
        console.error('Error loading instructor stats:', error);
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
            const response = await fetch(`${config.API_URL}/instructor/${section}`, {
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
                case 'my-courses':
                    displayMyCourses(data.courses);
                    break;
                case 'schedule':
                    displaySchedule(data.schedule);
                    break;
                case 'assignments':
                    displayAssignments(data.assignments);
                    break;
                case 'students':
                    displayStudents(data.students);
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${section}:`, error);
        }
    });
});

// Display instructor's courses
function displayMyCourses(courses) {
    const content = document.querySelector('.dashboard-content');
    content.innerHTML += `
        <div class="courses-grid">
            ${courses.map(course => `
                <div class="course-card">
                    <img src="${course.image || 'images/default-course.jpg'}" alt="${course.title}" class="course-image">
                    <div class="course-content">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <p>عدد الطلاب: ${course.enrolledStudents.length}</p>
                        <a href="#" class="btn" onclick="editCourse('${course._id}')">تعديل الكورس</a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Load initial instructor stats
document.addEventListener('DOMContentLoaded', loadInstructorStats);
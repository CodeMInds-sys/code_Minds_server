// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
    window.location.href = 'login.html';
}

// Load user profile
async function loadProfile() {
    try {
        const response = await fetch(`${config.API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        // Update profile information
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-email').textContent = data.email;
        
        if (data.profilePicture) {
            document.getElementById('profile-image').src = data.profilePicture;
        }
        
        // Load enrolled courses
        loadEnrolledCourses();
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Load enrolled courses
async function loadEnrolledCourses() {
    try {
        const response = await fetch(`${config.API_URL}/student/courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        const coursesContainer = document.getElementById('enrolled-courses-container');
        coursesContainer.innerHTML = data.courses.map(course => `
            <div class="course-card">
                <img src="${course.image || 'images/default-course.jpg'}" alt="${course.title}" class="course-image">
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-progress">
                        <p>التقدم: ${course.progress}%</p>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                    <a href="course-view.html?id=${course._id}" class="btn">متابعة التعلم</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading enrolled courses:', error);
    }
}

// Load profile when page loads
document.addEventListener('DOMContentLoaded', loadProfile);
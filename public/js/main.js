// Fetch and display courses
async function loadCourses() {
    try {
        const response = await fetch(`${config.API_URL}/courses`);
        const data = await response.json();
        
        const coursesContainer = document.getElementById('courses-container');
        coursesContainer.innerHTML = data.courses.map(course => `
            <div class="course-card">
                <img src="${course.image || 'images/default-course.jpg'}" alt="${course.title}" class="course-image">
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <p class="course-price">${course.price} ريال</p>
                    <a href="course-details.html?id=${course._id}" class="btn">عرض التفاصيل</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Load courses when the page loads
document.addEventListener('DOMContentLoaded', loadCourses);
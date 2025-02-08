// Handle login

API_URL='http://localhost:3000/api'
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginForm.email.value,
                    password: loginForm.password.value
                })
            });

            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect based on user role
                switch (data.user.role) {
                    case 'manager':
                        window.location.href = 'dashboard-manager.html';
                        break;
                    case 'instructor':
                        window.location.href = 'dashboard-instructor.html';
                        break;
                    default:
                        window.location.href = 'profile.html';
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('حدث خطأ أثناء تسجيل الدخول');
        }
    });
}

// Handle registration
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: registerForm.name.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    phone: registerForm.phone.value,
                    childAge: parseInt(registerForm.childAge.value)
                })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('تم إنشاء الحساب بنجاح. يرجى تفعيل بريدك الإلكتروني');
                window.location.href = 'login.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('حدث خطأ أثناء إنشاء الحساب');
        }
    });
}

// Handle logout
const logoutButtons = document.querySelectorAll('.logout');
logoutButtons.forEach(button => {
    button.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    });
});
// Mock user database (hardcoded for Week 1)
const MOCK_USERS = [
    {
        email: 'teacher@quizmaker.com',
        password: 'password123'
    },
    {
        email: 'admin@quizmaker.com',
        password: 'admin123'
    }
];

// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginError = document.getElementById('loginError');

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password (minimum 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Clear all error messages
function clearErrors() {
    emailError.textContent = '';
    emailError.classList.remove('show');
    passwordError.textContent = '';
    passwordError.classList.remove('show');
    loginError.textContent = '';
    loginError.classList.remove('show');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
}

// Show field error
function showFieldError(field, message) {
    const errorElement = field === 'email' ? emailError : passwordError;
    errorElement.textContent = message;
    errorElement.classList.add('show');
    (field === 'email' ? emailInput : passwordInput).classList.add('error');
}

// Show login error
function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
}

// Authenticate user (mock authentication)
function authenticateUser(email, password) {
    return MOCK_USERS.find(
        user => user.email === email && user.password === password
    );
}

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validation flags
    let isValid = true;
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showFieldError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // If validation fails, stop here
    if (!isValid) {
        return;
    }
    
    // Attempt authentication
    const user = authenticateUser(email, password);
    
    if (user) {
        // Success: Redirect to dashboard
        // Store login state in sessionStorage (simple approach for Week 1)
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Failure: Show error message
        showLoginError('Invalid email or password. Please try again.');
        passwordInput.value = ''; // Clear password for security
    }
});

// Clear errors when user starts typing
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        emailError.classList.remove('show');
        emailInput.classList.remove('error');
    }
});

passwordInput.addEventListener('input', function() {
    if (passwordInput.classList.contains('error')) {
        passwordError.classList.remove('show');
        passwordInput.classList.remove('error');
    }
});

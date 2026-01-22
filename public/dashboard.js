// Check if user is logged in
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    // If not logged in, redirect to login page
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user email
    const emailElement = document.getElementById('userEmail');
    if (emailElement && userEmail) {
        emailElement.textContent = `Logged in as: ${userEmail}`;
    }
    
    // Handle logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Clear session storage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userEmail');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
});

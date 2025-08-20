// Quiz data storage
let quizData = {
    ageRange: '',
    dependents: '',
    income: '',
    insuranceType: '',
    health: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    state: '',
    email: '',
    phone: ''
};

let currentPage = 1;
const totalPages = 8;

// Initialize the quiz
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Form validation for contact page
    const formInputs = document.querySelectorAll('#page6 input');
    formInputs.forEach(input => {
        input.addEventListener('input', validateContactForm);
    });
    
    // Enter key navigation
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && currentPage < 6) {
            const currentButton = document.querySelector(`#btn-next-${currentPage}`);
            if (currentButton && !currentButton.disabled) {
                nextPage();
            }
        }
    });
}

// Navigation functions
function nextPage() {
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            showPage(currentPage);
            updateProgressBar();
        }
    }
}

function previousPage() {
    if (currentPage > 1) {
        hidePage(currentPage);
        currentPage--;
        showPage(currentPage);
        updateProgressBar();
    }
}

// Page visibility functions
function showPage(pageNumber) {
    const page = document.getElementById(`page${pageNumber}`);
    if (page) {
        page.classList.add('active');
    }
}

function hidePage(pageNumber) {
    const page = document.getElementById(`page${pageNumber}`);
    if (page) {
        page.classList.remove('active');
    }
}

// Progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = (currentPage / totalPages) * 100;
    progressBar.style.width = progress + '%';
}

// Option selection
function selectOption(field, value) {
    quizData[field] = value;
    
    // Remove selected class from all options in current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    const options = currentPageElement.querySelectorAll('.option-card, .option-simple');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    event.currentTarget.classList.add('selected');
    
    // Auto-advance to next page after a short delay (except for contact form page)
    if (currentPage < 7) { // Don't auto-advance from contact form page
        setTimeout(() => {
            // Direct navigation without validation since we know data is set
            if (currentPage < totalPages) {
                hidePage(currentPage);
                currentPage++;
                showPage(currentPage);
                updateProgressBar();
            }
        }, 300); // 300ms delay for visual feedback
    } else {
        // Enable continue button for contact form page
        const continueButton = document.getElementById(`btn-next-${currentPage}`);
        if (continueButton) {
            continueButton.disabled = false;
        }
    }
}

// Validation functions
function validateCurrentPage() {
    switch(currentPage) {
        case 2:
            return quizData.ageRange !== '';
        case 3:
            return quizData.dependents !== '';
        case 4:
            return quizData.income !== '';
        case 5:
            return quizData.insuranceType !== '';
        case 6:
            return quizData.health !== '';
        default:
            return true;
    }
}

function validateContactForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const consent = document.getElementById('consent').checked;
    
    const submitButton = document.getElementById('btn-submit');
    
    if (firstName && lastName && dateOfBirth && state && isValidEmail(email) && isValidPhone(phone) && consent) {
        submitButton.disabled = false;
        return true;
    } else {
        submitButton.disabled = true;
        return false;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

// Form submission
function submitForm() {
    if (!validateContactForm()) {
        return;
    }
    
    // Collect form data
    quizData.firstName = document.getElementById('firstName').value.trim();
    quizData.lastName = document.getElementById('lastName').value.trim();
    quizData.dateOfBirth = document.getElementById('dateOfBirth').value;
    quizData.state = document.getElementById('state').value;
    quizData.email = document.getElementById('email').value.trim();
    quizData.phone = document.getElementById('phone').value.trim();
    
    // Update hidden fields with quiz data
    document.getElementById('ageRange').value = quizData.ageRange;
    document.getElementById('dependents').value = quizData.dependents;
    document.getElementById('income').value = quizData.income;
    document.getElementById('insuranceType').value = quizData.insuranceType;
    document.getElementById('health').value = quizData.health;
    
    // Show loading state
    const submitButton = document.getElementById('btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> Processing...';
    submitButton.disabled = true;
    
    // Submit form to Formspree using AJAX
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/mpwlbpqj', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
        } else {
            console.log('Form submission failed');
        }
    })
    .catch(error => {
        console.log('Error submitting form:', error);
    })
    .finally(() => {
        // Store data locally
        localStorage.setItem('quizData', JSON.stringify(quizData));
        
        // Move to thank you page
        hidePage(currentPage);
        currentPage++;
        showPage(currentPage);
        updateProgressBar();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Track conversion
        trackConversion();
    });
}

// Analytics and tracking
function trackConversion() {
    // Google Analytics event (replace with your tracking code)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_completion', {
            'event_category': 'lead_generation',
            'event_label': 'life_insurance_quiz',
            'value': 1
        });
    }
    
    // Facebook Pixel event (replace with your pixel code)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Life Insurance Quiz',
            content_category: 'Insurance'
        });
    }
    
    console.log('Quiz completed:', quizData);
}

// Track embedded calendar view
function trackCalendarView() {
    // Track calendar view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calendar_view', {
            'event_category': 'lead_generation',
            'event_label': 'embedded_calendar',
            'value': 1
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'Embedded Calendar',
            content_category: 'Insurance Consultation'
        });
    }
}

// Utility functions
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    input.value = value;
}

// Add phone formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Track embedded calendar when it loads
    if (typeof Calendly !== 'undefined') {
        Calendly.onEventScheduled(function(e) {
            // Track when someone books an appointment
            if (typeof gtag !== 'undefined') {
                gtag('event', 'appointment_booked', {
                    'event_category': 'lead_generation',
                    'event_label': 'calendly_booking',
                    'value': 1
                });
            }
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Appointment Booked',
                    content_category: 'Insurance Consultation'
                });
            }
        });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Quiz error:', e.error);
    // In production, send error to analytics service
});

// Mobile optimization
function isMobile() {
    return window.innerWidth <= 768;
}

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScroll = debounce(function() {
    // Handle scroll events if needed
}, 16);

window.addEventListener('scroll', optimizedScroll, {passive: true}); 
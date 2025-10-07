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
let modalShown = false; // Track if modal has been shown
const totalPages = 8;

// Initialize the quiz
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modals are hidden on page load
    const callModal = document.getElementById('callConnorModal');
    const calendlyModal = document.getElementById('calendlyModal');
    
    if (callModal) {
        callModal.style.display = 'none';
        callModal.classList.remove('show');
    }
    
    if (calendlyModal) {
        calendlyModal.style.display = 'none';
        calendlyModal.classList.remove('show');
    }
    
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
    console.log("nextPage called, current page:", currentPage);
    
    // Show modal immediately when clicking "Get Instant Quote" on page 1 (only once)
    if (currentPage === 1 && !modalShown) {
        modalShown = true;
        showCallModal();
        return; // Don't proceed with navigation yet
    }
    
    // Close modal if it's open when navigating away from page 2
    if (currentPage === 2) {
        closeCallModal();
    }
    
    // Normal page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            console.log("New current page:", currentPage);
            showPage(currentPage);
            updateProgressBar();
        }
    }
}



function previousPage() {
    // Close modal if it's open when navigating away from page 2
    if (currentPage === 2) {
        closeCallModal();
    }
    
    // Scroll to top when navigating to previous page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                // Scroll to top when auto-advancing to next page
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // Ensure modals are hidden on page load
    const callModal = document.getElementById('callConnorModal');
    const calendlyModal = document.getElementById('calendlyModal');
    
    if (callModal) {
        callModal.style.display = 'none';
        callModal.classList.remove('show');
    }
    
    if (calendlyModal) {
        calendlyModal.style.display = 'none';
        calendlyModal.classList.remove('show');
    }
    
    updateProgressBar();
    setupEventListeners();
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

// Privacy Policy Modal Functions
function showPrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hidePrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('callConnorModal');
    if (event.target === modal) {
        closeCallModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCallModal();
    }
});
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Enhanced mobile touch handling
if (isTouchDevice()) {
    // Add touch feedback for option cards
    document.addEventListener('DOMContentLoaded', function() {
    // Ensure modal is hidden on page load
    const modal = document.getElementById('callConnorModal');
    if (modal) {
        modal.style.display = 'none';
    }
        const optionCards = document.querySelectorAll('.option-card, .option-simple');
        
        optionCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            card.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });
}

// Prevent double-tap zoom on buttons
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modals are hidden on page load
    const callModal = document.getElementById('callConnorModal');
    const calendlyModal = document.getElementById('calendlyModal');
    
    if (callModal) {
        callModal.style.display = 'none';
        callModal.classList.remove('show');
    }
    
    if (calendlyModal) {
        calendlyModal.style.display = 'none';
        calendlyModal.classList.remove('show');
    }
    
    updateProgressBar();
    setupEventListeners();
});
// Optimize scroll performance for mobile
let ticking = false;
function updateScrollPosition() {
    // Handle any scroll-based animations or effects here
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Improve form validation for mobile
function validateContactFormMobile() {
    const inputs = document.querySelectorAll('#page6 input, #page6 select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.type === 'email') {
            if (!isValidEmail(input.value)) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#27ae60';
            }
        } else if (input.required && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Enhanced mobile form validation
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modals are hidden on page load
    const callModal = document.getElementById('callConnorModal');
    const calendlyModal = document.getElementById('calendlyModal');
    
    if (callModal) {
        callModal.style.display = 'none';
        callModal.classList.remove('show');
    }
    
    if (calendlyModal) {
        calendlyModal.style.display = 'none';
        calendlyModal.classList.remove('show');
    }
    
    updateProgressBar();
    setupEventListeners();
});
// Improved mobile touch handling
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modals are hidden on page load
    const callModal = document.getElementById('callConnorModal');
    const calendlyModal = document.getElementById('calendlyModal');
    
    if (callModal) {
        callModal.style.display = 'none';
        callModal.classList.remove('show');
    }
    
    if (calendlyModal) {
        calendlyModal.style.display = 'none';
        calendlyModal.classList.remove('show');
    }
    
    updateProgressBar();
    setupEventListeners();
});
// Debug function to check if touch events are working
function debugTouchEvents() {
    console.log('Touch device detected:', isTouchDevice());
    console.log('Max touch points:', navigator.maxTouchPoints);
    console.log('Touch start support:', 'ontouchstart' in window);
}

// Call Connor Modal Functions
function showCallModal() {
    console.log("showCallModal called");
    const modal = document.getElementById('callConnorModal');
    if (modal) {
        console.log("Modal found, setting display to flex");
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
        modal.classList.add('show');
    } else {
        console.log("Modal not found!");
    }
}
function closeCallModal() {
    console.log("closeCallModal called");
    const modal = document.getElementById('callConnorModal');
    if (modal) {
        console.log("Modal found, setting display to none");
        modal.style.display = 'none';
        modal.classList.remove('show');
    } else {
        console.log("Modal not found!");
    }
}
function closeCallModal() {
    console.log("closeCallModal called");
    const modal = document.getElementById('callConnorModal');
    if (modal) {
        console.log("Modal found, setting display to none");
        modal.style.display = 'none';
        modal.classList.remove('show');
    } else {
        console.log("Modal not found!");
    }
}
function callConnor() {
    // Track the call action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
    }
    
    // Close modal and initiate call
    closeCallModal();
    
    // Proceed to next page
    
    // Create a phone link
    const phoneNumber = 'tel:+15419122048';
    window.location.href = phoneNumber;
}

function bookAppointment() {
    // Track the appointment booking action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Schedule');
    }
    
    // Close call modal first
    closeCallModal();
    
    // Show Calendly popup
    showCalendlyPopup();
}
function continueQuiz() {
    // Track the continue action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Continue');
    }
    
    // Close modal and continue with quiz
    closeCallModal();
    
    // Proceed to next page
    proceedToNextPage();
}
// Function to proceed to next page after modal
function proceedToNextPage() {
    console.log("Proceeding to next page from modal");
    
    // Close modal when proceeding to next page
    closeCallModal();
    
    // Scroll to top when navigating to next page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            console.log("New current page:", currentPage);
            showPage(currentPage);
            updateProgressBar();
        }
    }
}
// Calendly popup functions
function showCalendlyPopup() {
    const modal = document.getElementById('calendlyModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
        modal.classList.add('show');
        console.log('Calendly modal shown.');
        
        // Initialize Calendly widget if available
        if (typeof Calendly !== 'undefined') {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/connormorton-ffl/life-insurance',
                parentElement: modal.querySelector('.calendly-inline-widget')
            });
        }
    } else {
        console.error('Error: calendlyModal element not found.');
        // Fallback to opening Calendly in new tab
        window.open('https://calendly.com/connormorton-ffl/life-insurance', '_blank');
    }
}
function closeCalendlyPopup() {
    const modal = document.getElementById('calendlyModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        console.log('Calendly modal closed.');
    }
}
// Close Calendly modal when clicking outside
document.addEventListener('click', function(e) {
    const calendlyModal = document.getElementById('calendlyModal');
    if (calendlyModal && e.target === calendlyModal) {
        closeCalendlyPopup();
    }
});

// Close Calendly modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCalendlyPopup();
    }
});

// IUL Video Modal Functions
function showIULVideo() {
    const modal = document.getElementById('iulVideoModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
        modal.classList.add('show');
        
        // Start playing the video
        const video = document.getElementById('iulVideo');
        if (video) {
            video.play();
        }
        
        console.log('IUL video modal shown.');
    } else {
        console.error('Error: iulVideoModal element not found.');
    }
}

function closeIULVideo() {
    const modal = document.getElementById('iulVideoModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        
        // Pause the video
        const video = document.getElementById('iulVideo');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        }
        
        console.log('IUL video modal closed.');
    }
}

function selectIULAndContinue() {
    // Track the IUL selection
    if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'IUL Video Watched',
            content_category: 'Insurance Education'
        });
    }
    
    // Set IUL as selected insurance type
    quizData.insuranceType = 'iul';
    
    // Close the video modal
    closeIULVideo();
    
    // Proceed to next page
    proceedToNextPage();
}

// Close IUL video modal when clicking outside
document.addEventListener('click', function(e) {
    const iulVideoModal = document.getElementById('iulVideoModal');
    if (iulVideoModal && e.target === iulVideoModal) {
        closeIULVideo();
    }
});

// Close IUL video modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeIULVideo();
    }
});

// Wholelife Video Modal Functions
function showWholelifeVideo() {
    const modal = document.getElementById('wholelifeVideoModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
        modal.classList.add('show');
        
        // Start playing the video
        const video = document.getElementById('wholelifeVideo');
        if (video) {
            video.play();
        }
        
        console.log('Wholelife video modal shown.');
    } else {
        console.error('Error: wholelifeVideoModal element not found.');
    }
}

function closeWholelifeVideo() {
    const modal = document.getElementById('wholelifeVideoModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        
        // Pause the video
        const video = document.getElementById('wholelifeVideo');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset to beginning
        }
        
        console.log('Wholelife video modal closed.');
    }
}

function selectWholelifeAndContinue() {
    // Track the Wholelife selection
    if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'Wholelife Video Watched',
            content_category: 'Insurance Education'
        });
    }
    
    // Set a default insurance type (we'll let the user choose after watching)
    // For now, we'll set it to 'whole' as a default, but the user can change it
    quizData.insuranceType = 'whole';
    
    // Close the video modal
    closeWholelifeVideo();
    
    // Proceed to next page
    proceedToNextPage();
}

// Close Wholelife video modal when clicking outside
document.addEventListener('click', function(e) {
    const wholelifeVideoModal = document.getElementById('wholelifeVideoModal');
    if (wholelifeVideoModal && e.target === wholelifeVideoModal) {
        closeWholelifeVideo();
    }
});

// Close Wholelife video modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWholelifeVideo();
    }
});

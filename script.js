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
    
    
    // Show call modal when on page 1 (only once)
    if (currentPage === 1 && !modalShown) {
        
        modalShown = true;
        showCallModal();
        return; // Don't proceed with navigation yet
    }
    
    // Normal page navigation for other pages or if modal already shown
    scrollToTopMobile();
    if (currentPage < totalPages) {
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            
            showPage(currentPage);
            updateProgressBar();
        }
    }
}function nextPageOld3() {
    
    // Scroll to top when navigating to next page
    scrollToTopMobile();
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            // Show call modal when on page 1 (before going to page 2)
            if (currentPage === 1) {
                console.log("Page 1 - showing modal before going to page 2");
                setTimeout(() => {
                    console.log("Executing showCallModal from page 1");
                    showCallModal();
                }, 500);
            }
            hidePage(currentPage);
            currentPage++;
            
            showPage(currentPage);
            updateProgressBar();
        }
    }
}

function nextPageOld2() {
    
    // Scroll to top when navigating to next page
    scrollToTopMobile();
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            
            showPage(currentPage);
            updateProgressBar();
            
            // Show call modal when reaching page 2
            if (currentPage === 2) {
                console.log("Page 2 reached, showing modal");
                setTimeout(() => {
                    console.log("Executing showCallModal");
                    showCallModal();
                }, 1000);
            }
        }
    }
}

function nextPageOld() {
    // Scroll to top when navigating to next page
    scrollToTopMobile();
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            showPage(currentPage);
            updateProgressBar();
            
            // Show call modal when reaching page 2
            if (currentPage === 2) {
                setTimeout(() => {
                    showCallModal();
                }, 500); // Small delay to ensure page is fully loaded
            }
        }
    }
}

function nextPageOriginal() {
    // Scroll to top when navigating to next page
    scrollToTopMobile();
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
    // Scroll to top when navigating to previous page
    scrollToTopMobile();
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
        
        // Enhanced mobile scroll when showing new page
        if (isMobileDevice()) {
            setTimeout(() => {
                scrollToTopMobile();
            }, 50);
        }
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
                scrollToTopMobile();
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

// Privacy Policy Modal Functions
function showPrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        
        modal.style.display = 'block';
        modal.style.zIndex = '99999';
        // Allow scrolling - removed overflow hidden
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
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hidePrivacyPolicy();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePrivacyPolicy();
        }
    });
}); 

// Mobile-specific optimizations
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Enhanced mobile touch handling
if (isTouchDevice()) {
    // Add touch feedback for option cards
    document.addEventListener('DOMContentLoaded', function() {
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
    const buttons = document.querySelectorAll('button, .btn-primary');
    buttons.forEach(button => {
    });
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
    const formInputs = document.querySelectorAll('#page6 input, #page6 select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (isMobileDevice()) {
                validateContactFormMobile();
            }
        });
    });
});

// Improved mobile touch handling
document.addEventListener('DOMContentLoaded', function() {
    // Add proper touch handling for option cards
    const optionCards = document.querySelectorAll('.option-card, .option-simple');
    
    optionCards.forEach(card => {
        // Add touch feedback without interfering with clicks
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        card.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        // Ensure click events work on mobile
        card.addEventListener('click', function(e) {
            // Let the onclick handler in HTML work normally
            console.log('Option card clicked:', this);
        });
    });
    
    // Add touch handling for buttons without preventing clicks
    const buttons = document.querySelectorAll('button, .btn-primary');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        button.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        button.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
});

// Debug function to check if touch events are working
function debugTouchEvents() {
    console.log('Touch device detected:', isTouchDevice());
    console.log('Max touch points:', navigator.maxTouchPoints);
    console.log('Touch start support:', 'ontouchstart' in window);
}

// Call Connor Modal Functions
function showCallModal() {
    
    const modal = document.getElementById('callConnorModal');
    
    if (modal) {
        
        modal.style.display = 'block';
        modal.style.zIndex = '99999';
        // Allow scrolling - removed overflow hidden
    }
}

function closeCallModal() {
    const modal = document.getElementById('callConnorModal');
    
    if (modal) {
        modal.style.display = 'none';
        // Scrolling already enabled
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
    proceedToNextPage();
    
    // Create a phone link
    const phoneNumber = 'tel:+15419122048';
    window.location.href = phoneNumber;
}

function bookAppointment() {
    // Track the appointment booking action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Schedule');
    }
    
    // Close modal
    closeCallModal();
    
    // Show Calendly popup on current page
    showCalendlyPopup();
}function continueQuiz() {
    // Track the continue action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Continue');
    }
    
    // Close modal and continue with quiz
    closeCallModal();
    
    // Proceed to next page
    proceedToNextPage();
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('callConnorModal');
    
    if (event.target === modal) {
        closeCallModal();
    
    // Proceed to next page
    proceedToNextPage();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCallModal();
    
    // Proceed to next page
    proceedToNextPage();
    }
});



// Function to proceed to next page after modal
function proceedToNextPage() {
    console.log("Proceeding to next page from modal");
    // Scroll to top when navigating to next page
    scrollToTopMobile();
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


// Test if nextPage is being called
function testNextPage() {
    console.log("Testing nextPage function...");
    nextPage();
}
function bookAppointment() {
    // Track the appointment booking action
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Schedule');
    }
    
    // Close modal
    closeCallModal();
    
    // Show Calendly popup on current page
    showCalendlyPopup();
}

function showCalendlyPopup() {
    // Create Calendly popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'calendly-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        border-radius: 12px;
        width: 100%;
        max-width: 900px;
        height: 80vh;
        max-height: 700px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 30px;
        color: #666;
        cursor: pointer;
        z-index: 10001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#f0f0f0';
        closeBtn.style.color = '#333';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.color = '#666';
    });
    
    closeBtn.addEventListener('click', closeCalendlyPopup);
    
    // Create iframe for Calendly
    const iframe = document.createElement('iframe');
    iframe.src = 'https://calendly.com/connormorton-ffl/life-insurance?embed=true&embed_domain=localhost&embed_type=Inline';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 12px;
    `;
    
    // Assemble popup
    popup.appendChild(closeBtn);
    popup.appendChild(iframe);
    overlay.appendChild(popup);
    
    // Add to page
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeCalendlyPopup();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCalendlyPopup();
        }
    });
}

function closeCalendlyPopup() {
    const overlay = document.getElementById('calendly-overlay');
    if (overlay) {
        overlay.remove();
    }
}
// Enhanced mobile scroll functionality
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

function scrollToTopMobile() {
    if (isMobileDevice()) {
        // More aggressive scroll for mobile
        scrollToTopMobile();
        
        // Fallback for older mobile browsers
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        
        // Additional scroll for iOS Safari
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            setTimeout(() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }, 150);
        }
    } else {
        // Standard scroll for desktop
        scrollToTopMobile();
    }
}

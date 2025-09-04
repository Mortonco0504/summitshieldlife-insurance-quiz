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

function scrollToTopMobile() {
    // Detect mobile device and apply appropriate scroll behavior
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, use instant scroll to top
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        // For desktop, use smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
function proceedToNextPage() {
    scrollToTopMobile();
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (currentPage === 1 || validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            showPage(currentPage);
            updateProgressBar();
        }
    }
}

function scrollToTopMobile() {
    // Detect mobile device and apply appropriate scroll behavior
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, use instant scroll to top
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        // For desktop, use smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}// Navigation functions
function nextPage() {
    // Show call modal when on page 1 (only once)
    if (currentPage === 1 && !modalShown) {
        modalShown = true;
        showCallModal();
        return; // Don't proceed with navigation yet
    }
    // Normal page navigation for other pages or if modal already shown
    scrollToTopMobile();
    }
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

function scrollToTopMobile() {
    // Detect mobile device and apply appropriate scroll behavior
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, use instant scroll to top
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        // For desktop, use smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
function proceedToNextPage() {
    scrollToTopMobile();
    if (currentPage < totalPages) {
        // Validate current page before proceeding
        if (currentPage === 1 || validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            showPage(currentPage);
            updateProgressBar();
        }
    }
}

function scrollToTopMobile() {
    // Detect mobile device and apply appropriate scroll behavior
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile, use instant scroll to top
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        // For desktop, use smooth scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}function nextPageOld3() {

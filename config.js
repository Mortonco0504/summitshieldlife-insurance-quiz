// Configuration file for First Responder Life Insurance Quiz
// Modify these settings to customize the quiz for your needs

const QUIZ_CONFIG = {
    // Brand Colors
    colors: {
        primary: '#4CAF50',
        secondary: '#667eea',
        accent: '#ff6b6b',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        text: '#2c3e50',
        textLight: '#666'
    },

    // Contact Information
    contact: {
        phone: '1-800-FIRST-INS',
        email: 'info@firstresponderinsurance.com',
        website: 'www.firstresponderinsurance.com'
    },

    // Quiz Questions and Options
    questions: {
        role: {
            title: 'What type of first responder are you?',
            subtitle: 'This helps us provide the most relevant coverage options for your specific role.',
            options: [
                { value: 'firefighter', label: 'Firefighter', icon: 'fas fa-fire', description: 'Fire department personnel' },
                { value: 'emt', label: 'EMT/Paramedic', icon: 'fas fa-ambulance', description: 'Emergency medical services' },
                { value: 'police', label: 'Police Officer', icon: 'fas fa-shield-alt', description: 'Law enforcement personnel' },
                { value: 'other', label: 'Other', icon: 'fas fa-user-tie', description: 'Other first responder role' }
            ]
        },
        dependents: {
            title: 'Do you have dependents who rely on your income?',
            subtitle: 'This helps us understand your family\'s financial protection needs.',
            options: [
                { value: 'yes', label: 'Yes', icon: 'fas fa-users', description: 'I have a spouse, children, or other dependents' },
                { value: 'no', label: 'No', icon: 'fas fa-user', description: 'I don\'t have dependents currently' }
            ]
        },
        income: {
            title: 'What\'s your annual household income?',
            subtitle: 'This helps us calculate the right amount of coverage for your family.',
            options: [
                { value: 'under-50k', label: 'Under $50,000' },
                { value: '50k-75k', label: '$50,000 - $75,000' },
                { value: '75k-100k', label: '$75,000 - $100,000' },
                { value: '100k-150k', label: '$100,000 - $150,000' },
                { value: 'over-150k', label: 'Over $150,000' }
            ]
        },
        health: {
            title: 'How would you describe your health?',
            subtitle: 'This helps us find the best rates available for you.',
            options: [
                { value: 'excellent', label: 'Excellent', icon: 'fas fa-heart', description: 'No major health issues, non-smoker' },
                { value: 'good', label: 'Good', icon: 'fas fa-heart', description: 'Minor health conditions, well-controlled' },
                { value: 'fair', label: 'Fair', icon: 'fas fa-heart', description: 'Some health conditions, smoker' }
            ]
        }
    },

    // Welcome Page Content
    welcome: {
        badge: 'First Responder Protection',
        headline: 'Protect Your Family Like You Protect Others',
        subtitle: 'As a first responder, you put your life on the line every day. But what happens to your family if something happens to you?',
        benefits: [
            'Coverage up to $2M',
            'Whole Life, Term Life, Mortgage Protection and Indexed Universal Life (IUL)',
            'No medical exam required'
        ],
        cta: 'Get Instant Quote',
        disclaimer: 'Takes less than 2 minutes • No commitment required'
    },

    // Contact Form
    contactForm: {
        title: 'Get Your Personalized Quote',
        subtitle: 'We\'ll analyze your responses and provide you with customized life insurance options and rates.',
        privacyNote: 'Your information is secure and will only be used to provide you with life insurance quotes.',
        consentText: 'I agree to receive quotes and information about life insurance options. I understand I can opt out at any time.'
    },

    // Thank You Page
    thankYou: {
        title: 'Thank You!',
        subtitle: 'We\'ve received your information and are analyzing your needs.',
        nextSteps: [
            {
                title: 'Personalized Analysis',
                description: 'Our team will review your responses and calculate your coverage needs'
            },
            {
                title: 'Agent Contact',
                description: 'A licensed agent will reach out within 24 hours with your customized options'
            },
            {
                title: 'Free Consultation',
                description: 'Get your personalized quote and discuss the best coverage for your family'
            }
        ],
        bonusOffer: {
            title: 'Schedule Your Free Consultation',
            description: 'Book a 15-minute call to discuss your personalized life insurance options and get your custom quote',
            buttonText: 'Book Free Consultation',
            calendlyUrl: 'https://calendly.com/connormorton-ffl/life-insurance'
        },
        contactInfo: {
            phone: '1-800-FIRST-INS',
            availability: 'Available 24/7 for first responders'
        }
    },

    // Analytics Configuration
    analytics: {
        googleAnalytics: {
            enabled: false,
            trackingId: 'GA_TRACKING_ID'
        },
        facebookPixel: {
            enabled: false,
            pixelId: 'FB_PIXEL_ID'
        }
    },

    // Form Submission
    formSubmission: {
        endpoint: '/api/leads', // Replace with your actual endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    },

    // Performance Settings
    performance: {
        enableAnimations: true,
        enableProgressBar: true,
        enableFormValidation: true,
        enablePhoneFormatting: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUIZ_CONFIG;
} 
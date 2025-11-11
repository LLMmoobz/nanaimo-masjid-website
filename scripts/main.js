/**
 * Main JavaScript for Islamic Centre of Nanaimo Website
 * This file contains shared functionality across all pages
 */

// ===========================
// Navigation & Dropdown Menu
// ===========================

/**
 * Initialize navigation functionality including:
 * - Hamburger menu toggle for mobile
 * - Dropdown menu functionality for mobile devices
 */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Hamburger menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Dropdown menu functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (e.target === dropdown.querySelector('a') || e.target === dropdown) {
                    e.preventDefault();
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.toggle('active');
                    }
                }
            }
        });

        // Allow clicking on dropdown menu links
        const links = dropdown.querySelectorAll('.dropdown-menu a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('active');
                    }
                }
            });
        }
    });
}

// ===========================
// Prayer Times Utilities
// ===========================

/**
 * Configuration for prayer times API
 */
const PRAYER_CONFIG = {
    city: "Nanaimo",
    country: "Canada",
    method: 2, // ISNA method
    apiUrl: "https://api.aladhan.com/v1/timingsByCity"
};

/**
 * Format 24-hour time to 12-hour format
 * @param {string} time24h - Time in 24-hour format (HH:MM)
 * @returns {string} Time in 12-hour format with AM/PM
 */
function formatTime(time24h) {
    if (!time24h) return "N/A";

    const [hours, minutes] = time24h.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);

    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Fetch prayer times from Aladhan API
 * @returns {Promise<Object>} Prayer timings object
 */
async function fetchPrayerTimes() {
    const { city, country, method, apiUrl } = PRAYER_CONFIG;

    try {
        const response = await fetch(
            `${apiUrl}?city=${city}&country=${country}&method=${method}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.data || !data.data.timings) {
            throw new Error('Invalid data structure received from API');
        }

        return data.data.timings;
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        throw error;
    }
}

/**
 * Calculate time until next prayer
 * @param {Object} timings - Prayer timings object
 * @returns {Object} Next prayer info with name and time difference
 */
function getNextPrayer(timings) {
    const now = new Date();
    const prayers = [
        { name: "Fajr", time: timings.Fajr },
        { name: "Dhuhr", time: timings.Dhuhr },
        { name: "Asr", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isha", time: timings.Isha }
    ];

    // Convert prayer times to Date objects
    prayers.forEach(prayer => {
        const [hours, minutes] = prayer.time.split(':');
        prayer.timeObj = new Date(now);
        prayer.timeObj.setHours(hours, minutes, 0, 0);
    });

    // Find next prayer
    let nextPrayer = null;
    for (const prayer of prayers) {
        if (prayer.timeObj > now) {
            nextPrayer = prayer;
            break;
        }
    }

    // If no prayer found today, next prayer is Fajr tomorrow
    if (!nextPrayer) {
        nextPrayer = prayers[0];
        nextPrayer.timeObj.setDate(nextPrayer.timeObj.getDate() + 1);
    }

    return nextPrayer;
}

/**
 * Format countdown time
 * @param {number} timeDiff - Time difference in milliseconds
 * @returns {Object} Hours, minutes, seconds
 */
function formatCountdown(timeDiff) {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

/**
 * Display current date
 * @param {string} elementId - ID of element to display date in
 */
function displayCurrentDate(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    element.textContent = now.toLocaleDateString('en-US', options);
}

// ===========================
// Form Utilities
// ===========================

/**
 * Handle contact form submission
 * @param {Event} e - Form submit event
 */
function handleContactFormSubmit(e) {
    e.preventDefault();

    const inquiryType = document.getElementById('inquiry-type')?.value || 'general';
    const name = document.getElementById('name')?.value || '';

    // Format inquiry type for display
    const inquiryLabels = {
        'general': 'General Inquiry',
        'student-support': 'Student Support Services',
        'janaza': 'Janaza (Funeral Services)',
        'nikkah': 'Nikkah (Marriage Services)',
        'education': 'Educational Programs',
        'community-support': 'Community Support',
        'volunteering': 'Volunteering',
        'facility-rental': 'Facility Rental',
        'donation': 'Donation Information',
        'events': 'Events & Programs',
        'other': 'Other'
    };

    const inquiryLabel = inquiryLabels[inquiryType] || inquiryType;

    // TODO: Implement actual form submission to backend with inquiry type routing
    alert(`Thank you for your message, ${name}!\n\nYour inquiry regarding "${inquiryLabel}" has been received.\n\nWe will get back to you within 24-48 hours.`);
    e.target.reset();
}

// ===========================
// Initialization
// ===========================

/**
 * Initialize all common functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation on all pages
    initializeNavigation();

    // Initialize contact form if it exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

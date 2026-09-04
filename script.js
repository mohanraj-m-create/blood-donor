/**
 * ==========================================================================
 * BloodLink - Emergency Blood Donor Finder & Network
 * Pure Vanilla JavaScript (script.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. Initial State & Blood Compatibility Matrix
    // ----------------------------------------------------------------------
    const BLOOD_COMPATIBILITY = {
        // Recipient -> Compatible Donor Blood Groups (Who can give to them)
        'O-':  ['O-'],
        'O+':  ['O+', 'O-'],
        'A-':  ['A-', 'O-'],
        'A+':  ['A+', 'A-', 'O+', 'O-'],
        'B-':  ['B-', 'O-'],
        'B+':  ['B+', 'B-', 'O+', 'O-'],
        'AB-': ['AB-', 'A-', 'B-', 'O-'],
        'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-']
    };

    // Realistic default donor dataset
    const DEFAULT_DONORS = [
        {
            id: 'DONOR-101',
            name: 'Arun Kumar',
            bloodGroup: 'O+',
            age: 28,
            city: 'Chennai',
            area: 'Velachery',
            phone: '+91 98401-XXXXX',
            rawPhone: '9840123456',
            email: 'arun.k@example.com',
            available: true,
            donationsCount: 6,
            lastDonation: '4 months ago',
            registeredAt: '2025-11-10'
        },
        {
            id: 'DONOR-102',
            name: 'Priya Sharma',
            bloodGroup: 'A+',
            age: 25,
            city: 'Chennai',
            area: 'Tambaram',
            phone: '+91 97910-XXXXX',
            rawPhone: '9791034567',
            email: 'priya.s@example.com',
            available: true,
            donationsCount: 3,
            lastDonation: '6 months ago',
            registeredAt: '2026-01-15'
        },
        {
            id: 'DONOR-103',
            name: 'Rahul Varma',
            bloodGroup: 'B+',
            age: 32,
            city: 'Chennai',
            area: 'Anna Nagar',
            phone: '+91 94440-XXXXX',
            rawPhone: '9444087654',
            email: 'rahul.v@example.com',
            available: false,
            donationsCount: 8,
            lastDonation: '2 weeks ago (Resting)',
            registeredAt: '2025-08-20'
        },
        {
            id: 'DONOR-104',
            name: 'Sneha Patel',
            bloodGroup: 'O-',
            age: 27,
            city: 'Chennai',
            area: 'Adyar',
            phone: '+91 98842-XXXXX',
            rawPhone: '9884219876',
            email: 'sneha.p@example.com',
            available: true,
            donationsCount: 5,
            lastDonation: '5 months ago',
            registeredAt: '2025-12-01'
        },
        {
            id: 'DONOR-105',
            name: 'Karthik Raja',
            bloodGroup: 'AB+',
            age: 30,
            city: 'Chennai',
            area: 'T. Nagar',
            phone: '+91 99620-XXXXX',
            rawPhone: '9962054321',
            email: 'karthik.r@example.com',
            available: true,
            donationsCount: 4,
            lastDonation: '7 months ago',
            registeredAt: '2026-02-05'
        },
        {
            id: 'DONOR-106',
            name: 'Deepak Nair',
            bloodGroup: 'B-',
            age: 35,
            city: 'Chennai',
            area: 'Guindy',
            phone: '+91 98412-XXXXX',
            rawPhone: '9841298765',
            email: 'deepak.n@example.com',
            available: true,
            donationsCount: 7,
            lastDonation: '4 months ago',
            registeredAt: '2025-10-12'
        },
        {
            id: 'DONOR-107',
            name: 'Ananya Roy',
            bloodGroup: 'A-',
            age: 24,
            city: 'Bengaluru',
            area: 'Indiranagar',
            phone: '+91 98800-XXXXX',
            rawPhone: '9880011223',
            email: 'ananya.r@example.com',
            available: true,
            donationsCount: 2,
            lastDonation: '8 months ago',
            registeredAt: '2026-01-20'
        },
        {
            id: 'DONOR-108',
            name: 'Vikram Sundaram',
            bloodGroup: 'O+',
            age: 29,
            city: 'Bengaluru',
            area: 'Koramangala',
            phone: '+91 98450-XXXXX',
            rawPhone: '9845067890',
            email: 'vikram.s@example.com',
            available: true,
            donationsCount: 9,
            lastDonation: '3 months ago',
            registeredAt: '2025-09-18'
        },
        {
            id: 'DONOR-109',
            name: 'Meera Iyer',
            bloodGroup: 'AB-',
            age: 31,
            city: 'Bengaluru',
            area: 'Whitefield',
            phone: '+91 99001-XXXXX',
            rawPhone: '9900123490',
            email: 'meera.i@example.com',
            available: false,
            donationsCount: 3,
            lastDonation: '1 month ago (Resting)',
            registeredAt: '2026-02-01'
        },
        {
            id: 'DONOR-110',
            name: 'Rohan Deshmukh',
            bloodGroup: 'O-',
            age: 33,
            city: 'Mumbai',
            area: 'Bandra',
            phone: '+91 98200-XXXXX',
            rawPhone: '9820045678',
            email: 'rohan.d@example.com',
            available: true,
            donationsCount: 11,
            lastDonation: '5 months ago',
            registeredAt: '2025-07-14'
        },
        {
            id: 'DONOR-111',
            name: 'Pooja Hegde',
            bloodGroup: 'B+',
            age: 26,
            city: 'Mumbai',
            area: 'Andheri',
            phone: '+91 98330-XXXXX',
            rawPhone: '9833078912',
            email: 'pooja.h@example.com',
            available: true,
            donationsCount: 4,
            lastDonation: '6 months ago',
            registeredAt: '2025-11-28'
        },
        {
            id: 'DONOR-112',
            name: 'Amitabh Sen',
            bloodGroup: 'A+',
            age: 36,
            city: 'Delhi',
            area: 'Connaught Place',
            phone: '+91 98110-XXXXX',
            rawPhone: '9811023456',
            email: 'amitabh.s@example.com',
            available: true,
            donationsCount: 12,
            lastDonation: '4 months ago',
            registeredAt: '2025-06-30'
        },
        {
            id: 'DONOR-113',
            name: 'Suresh Reddy',
            bloodGroup: 'O+',
            age: 27,
            city: 'Hyderabad',
            area: 'Banjara Hills',
            phone: '+91 98480-XXXXX',
            rawPhone: '9848012345',
            email: 'suresh.r@example.com',
            available: true,
            donationsCount: 5,
            lastDonation: '3 months ago',
            registeredAt: '2025-12-14'
        },
        {
            id: 'DONOR-114',
            name: 'Lakshmi Narayanan',
            bloodGroup: 'O-',
            age: 29,
            city: 'Coimbatore',
            area: 'RS Puram',
            phone: '+91 94430-XXXXX',
            rawPhone: '9443076543',
            email: 'lakshmi.n@example.com',
            available: true,
            donationsCount: 6,
            lastDonation: '4 months ago',
            registeredAt: '2026-01-08'
        }
    ];

    // Initialize LocalStorage Data
    function getStoredDonors() {
        const stored = localStorage.getItem('bloodlink_donors');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored donors, falling back to default', e);
            }
        }
        localStorage.setItem('bloodlink_donors', JSON.stringify(DEFAULT_DONORS));
        return DEFAULT_DONORS;
    }

    function saveDonors(donors) {
        localStorage.setItem('bloodlink_donors', JSON.stringify(donors));
    }

    let donorsList = getStoredDonors();
    let isSoundEnabled = true;

    // ----------------------------------------------------------------------
    // 2. Web Audio API Alert Chime Generator (Pure Synthesizer)
    // ----------------------------------------------------------------------
    function playEmergencyAlertSound() {
        if (!isSoundEnabled) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            // First Tone
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
            gain1.gain.setValueAtTime(0.3, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.35);

            // Second Tone (Higher urgency pitch)
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.18); // D6
            gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.18);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(ctx.currentTime + 0.18);
            osc2.stop(ctx.currentTime + 0.6);
        } catch (err) {
            console.warn('Audio synthesis could not start automatically:', err);
        }
    }

    // Sound toggle listener
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    const soundLabel = soundToggleBtn ? soundToggleBtn.querySelector('.sound-label') : null;

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            isSoundEnabled = !isSoundEnabled;
            if (isSoundEnabled) {
                if (soundIcon) soundIcon.textContent = '🔔';
                if (soundLabel) soundLabel.textContent = 'Alert Sound: ON';
                showToast('Emergency sound alerts enabled', 'info');
                playEmergencyAlertSound();
            } else {
                if (soundIcon) soundIcon.textContent = '🔕';
                if (soundLabel) soundLabel.textContent = 'Alert Sound: MUTED';
                showToast('Sound alerts muted', 'info');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. Floating Blood Drop Particles Background
    // ----------------------------------------------------------------------
    function initParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        const icons = ['🩸', '💧', '❤️', '🩹'];
        const count = 15;

        for (let i = 0; i < count; i++) {
            const drop = document.createElement('div');
            drop.className = 'floating-drop';
            drop.textContent = icons[Math.floor(Math.random() * icons.length)];
            drop.style.left = `${Math.random() * 95}%`;
            drop.style.animationDuration = `${8 + Math.random() * 12}s`;
            drop.style.animationDelay = `${Math.random() * 6}s`;
            drop.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
            container.appendChild(drop);
        }
    }
    initParticles();

    // ----------------------------------------------------------------------
    // 4. Toast Notification Engine
    // ----------------------------------------------------------------------
    function showToast(message, type = 'info', title = '') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;

        let icon = 'ℹ️';
        let defaultTitle = 'Notification';
        if (type === 'success') {
            icon = '✅';
            defaultTitle = 'Success';
        } else if (type === 'emergency' || type === 'danger') {
            icon = '🚨';
            defaultTitle = 'Emergency Alert';
        }

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title || defaultTitle}</div>
                <div class="toast-text">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(60px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4500);
    }

    // ----------------------------------------------------------------------
    // 5. Donor Search & Filtering Logic
    // ----------------------------------------------------------------------
    const searchForm = document.getElementById('searchDonorForm');
    const heroQuickForm = document.getElementById('heroQuickSearchForm');
    const filterBloodGroup = document.getElementById('filterBloodGroup');
    const filterCity = document.getElementById('filterCity');
    const filterArea = document.getElementById('filterArea');
    const filterAvailability = document.getElementById('filterAvailability');
    const includeCompatible = document.getElementById('includeCompatible');
    const resetSearchBtn = document.getElementById('resetSearchBtn');
    const donorCardsGrid = document.getElementById('donorCardsGrid');
    const resultsCountBadge = document.getElementById('resultsCountBadge');
    const emptyStateCard = document.getElementById('emptyStateCard');
    const quickBloodPills = document.getElementById('quickBloodPills');

    function renderDonors(donorsToRender) {
        if (!donorCardsGrid) return;
        donorCardsGrid.innerHTML = '';

        if (!donorsToRender || donorsToRender.length === 0) {
            if (emptyStateCard) emptyStateCard.style.display = 'block';
            if (resultsCountBadge) resultsCountBadge.textContent = '0 Donors Found';
            return;
        }

        if (emptyStateCard) emptyStateCard.style.display = 'none';
        if (resultsCountBadge) {
            resultsCountBadge.textContent = `${donorsToRender.length} ${donorsToRender.length === 1 ? 'Donor' : 'Donors'} Found`;
        }

        donorsToRender.forEach(donor => {
            const card = document.createElement('div');
            card.className = 'donor-card';

            const initials = donor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const statusClass = donor.available ? 'available' : 'unavailable';
            const statusText = donor.available ? '🟢 Available' : '⚫ Not Available';
            
            // Random simulated distance tag for realistic local discovery
            const distance = (1.5 + (donor.name.length * 0.4) % 7).toFixed(1);

            card.innerHTML = `
                <div>
                    <div class="donor-card-top">
                        <div class="donor-main-info">
                            <div class="donor-avatar">${initials}</div>
                            <div class="donor-name-box">
                                <h4>${donor.name}</h4>
                                <span class="donor-city-tag">📍 ${donor.area}, ${donor.city}</span>
                            </div>
                        </div>
                        <div class="donor-blood-badge">${donor.bloodGroup}</div>
                    </div>

                    <div class="donor-details-body">
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Proximity:</span>
                            <span class="detail-val">~${distance} km away</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Donation History:</span>
                            <span class="detail-val">${donor.donationsCount} Times (${donor.lastDonation})</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Contact:</span>
                            <span class="privacy-phone">🔒 ${donor.phone}</span>
                        </div>
                    </div>
                </div>

                <div class="donor-card-footer">
                    <button class="btn btn-contact request-contact-btn" data-donor-id="${donor.id}">
                        📩 Request Contact
                    </button>
                </div>
            `;

            donorCardsGrid.appendChild(card);
        });

        // Attach event listeners to all newly rendered "Request Contact" buttons
        document.querySelectorAll('.request-contact-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const donorId = e.currentTarget.getAttribute('data-donor-id');
                openContactModal(donorId);
            });
        });
    }

    function filterDonorsList() {
        const bg = filterBloodGroup ? filterBloodGroup.value : 'ALL';
        const city = filterCity ? filterCity.value.trim().toLowerCase() : '';
        const area = filterArea ? filterArea.value.trim().toLowerCase() : '';
        const avail = filterAvailability ? filterAvailability.value : 'ALL';
        const allowCompatible = includeCompatible ? includeCompatible.checked : false;

        const filtered = donorsList.filter(donor => {
            // Blood Group Filter
            let matchesBlood = false;
            if (bg === 'ALL' || !bg) {
                matchesBlood = true;
            } else if (allowCompatible && BLOOD_COMPATIBILITY[bg]) {
                // If compatibility mode is ON: show all donors who CAN GIVE TO this blood group
                matchesBlood = BLOOD_COMPATIBILITY[bg].includes(donor.bloodGroup);
            } else {
                matchesBlood = donor.bloodGroup === bg;
            }

            // City Filter
            let matchesCity = true;
            if (city) {
                matchesCity = donor.city.toLowerCase().includes(city);
            }

            // Area Filter
            let matchesArea = true;
            if (area) {
                matchesArea = donor.area.toLowerCase().includes(area);
            }

            // Availability Filter
            let matchesAvail = true;
            if (avail === 'Available') {
                matchesAvail = donor.available === true;
            } else if (avail === 'Not Available') {
                matchesAvail = donor.available === false;
            }

            return matchesBlood && matchesCity && matchesArea && matchesAvail;
        });

        renderDonors(filtered);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterDonorsList();
            showToast('Donor search filters applied', 'info');
        });
    }

    // Quick Search from Hero Widget
    if (heroQuickForm) {
        heroQuickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const heroBg = document.getElementById('heroBloodGroup').value;
            const heroC = document.getElementById('heroCity').value;

            if (filterBloodGroup) filterBloodGroup.value = heroBg;
            if (filterCity) filterCity.value = heroC;
            if (filterAvailability) filterAvailability.value = 'Available';

            filterDonorsList();

            // Smooth scroll down to Find Donor Section
            const findSec = document.getElementById('find-donor');
            if (findSec) {
                findSec.scrollIntoView({ behavior: 'smooth' });
            }
            showToast(`Searching available ${heroBg} donors in ${heroC}`, 'info');
        });
    }

    // Reset Filters Button
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            if (filterBloodGroup) filterBloodGroup.value = 'ALL';
            if (filterCity) filterCity.value = '';
            if (filterArea) filterArea.value = '';
            if (filterAvailability) filterAvailability.value = 'Available';
            if (includeCompatible) includeCompatible.checked = true;

            // Reset pill buttons
            document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
            const allPill = document.querySelector('.pill-btn[data-group="ALL"]');
            if (allPill) allPill.classList.add('active');

            filterDonorsList();
            showToast('Search filters reset', 'info');
        });
    }

    // Quick Blood Filter Pills
    if (quickBloodPills) {
        quickBloodPills.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill-btn')) {
                document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const selectedGroup = e.target.getAttribute('data-group');
                if (filterBloodGroup) {
                    filterBloodGroup.value = selectedGroup;
                    filterDonorsList();
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. Donor Registration Form Handling & Validation
    // ----------------------------------------------------------------------
    const regForm = document.getElementById('donorRegistrationForm');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

            const fullName = document.getElementById('regFullName').value.trim();
            const bloodGroup = document.getElementById('regBloodGroup').value;
            const age = parseInt(document.getElementById('regAge').value, 10);
            const phone = document.getElementById('regPhone').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const city = document.getElementById('regCity').value.trim();
            const area = document.getElementById('regArea').value.trim();
            const availability = document.getElementById('regAvailability').value === 'Available';
            const consent = document.getElementById('regConsent').checked;

            let isValid = true;

            // Validation Checks
            if (fullName.length < 3) {
                document.getElementById('nameError').textContent = 'Please enter a valid full name (at least 3 characters).';
                isValid = false;
            }

            if (!bloodGroup) {
                document.getElementById('bloodGroupError').textContent = 'Please select your blood group.';
                isValid = false;
            }

            if (isNaN(age) || age < 18 || age > 65) {
                document.getElementById('ageError').textContent = 'Voluntary blood donors must be between 18 and 65 years of age.';
                isValid = false;
            }

            const phoneRegex = /^[0-9+\-\s]{8,15}$/;
            if (!phone || !phoneRegex.test(phone.replace(/\s+/g, ''))) {
                document.getElementById('phoneError').textContent = 'Please enter a valid contact phone number (10 digits).';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!city) {
                document.getElementById('cityError').textContent = 'Please specify your city.';
                isValid = false;
            }

            if (!area) {
                document.getElementById('areaError').textContent = 'Please specify your area/neighborhood.';
                isValid = false;
            }

            if (!consent) {
                document.getElementById('consentError').textContent = 'You must agree to genuine emergency contact requests.';
                isValid = false;
            }

            if (!isValid) {
                showToast('Please fix the errors in the registration form', 'danger');
                return;
            }

            // Mask phone number for privacy display: +91 98401-XXXXX
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            const maskedPhone = cleanPhone.length >= 5 
                ? `+91 ${cleanPhone.substring(0, 5)}-XXXXX`
                : `+91 98XXX-XXXXX`;

            // Create New Donor Object
            const newDonor = {
                id: 'DONOR-' + Date.now().toString().slice(-4),
                name: fullName,
                bloodGroup: bloodGroup,
                age: age,
                city: city,
                area: area,
                phone: maskedPhone,
                rawPhone: phone,
                email: email,
                available: availability,
                donationsCount: 0,
                lastDonation: 'Ready for first donation',
                registeredAt: new Date().toISOString().split('T')[0]
            };

            // Prepend new donor to database
            donorsList.unshift(newDonor);
            saveDonors(donorsList);

            // Re-render donors and refresh availability manager
            filterDonorsList();
            populateDonorManagerDropdown();

            // Reset form
            regForm.reset();

            // Display Celebration Toast & Notification
            showToast(`❤️ Welcome ${fullName}! You are now registered on BloodLink as an ${bloodGroup} donor.`, 'success', 'Donor Registered!');
            
            // Scroll to find donor section to see newly registered card
            setTimeout(() => {
                const findSec = document.getElementById('find-donor');
                if (findSec) {
                    findSec.scrollIntoView({ behavior: 'smooth' });
                }
            }, 800);
        });
    }

    // ----------------------------------------------------------------------
    // 7. Emergency Blood Request Dispatcher (Priority Hub)
    // ----------------------------------------------------------------------
    const emergencyForm = document.getElementById('emergencyRequestForm');
    const emergencyMatchesContainer = document.getElementById('emergencyMatchesContainer');
    const emergencyBroadcastSummary = document.getElementById('emergencyBroadcastSummary');
    const emergencyDonorsList = document.getElementById('emergencyDonorsList');

    if (emergencyForm) {
        emergencyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const bgNeeded = document.getElementById('emgBloodGroup').value;
            const hospital = document.getElementById('emgHospitalName').value.trim();
            const city = document.getElementById('emgCity').value.trim();
            const area = document.getElementById('emgArea').value.trim();
            const units = document.getElementById('emgUnits').value;
            const urgency = document.getElementById('emgUrgency').value;
            const contactPerson = document.getElementById('emgContactPerson').value.trim();

            if (!bgNeeded || !hospital || !city || !area) {
                showToast('Please fill out all mandatory emergency details', 'danger');
                return;
            }

            // Play emergency chime
            playEmergencyAlertSound();

            // Find matching available donors in that city
            const compatibleGroups = BLOOD_COMPATIBILITY[bgNeeded] || [bgNeeded];
            const matchingDonors = donorsList.filter(d => {
                const isCompat = compatibleGroups.includes(d.bloodGroup);
                const isCity = d.city.toLowerCase() === city.toLowerCase() || d.city.toLowerCase().includes(city.toLowerCase());
                return isCompat && d.available && isCity;
            });

            // Fallback: If no direct city match, find any available compatible donors
            const finalMatches = matchingDonors.length > 0 
                ? matchingDonors 
                : donorsList.filter(d => compatibleGroups.includes(d.bloodGroup) && d.available).slice(0, 4);

            // Render Emergency Broadcast Summary
            if (emergencyBroadcastSummary) {
                emergencyBroadcastSummary.innerHTML = `
                    <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <strong>🏥 Hospital: ${hospital} (${area}, ${city})</strong>
                        <span style="color: #F87171; font-weight: bold;">⚡ Urgency: ${urgency}</span>
                    </div>
                    <div>
                        🩸 <strong>Required:</strong> ${units} Unit(s) of <strong>${bgNeeded}</strong> | 
                        👨‍⚕️ <strong>Coordinator:</strong> ${contactPerson} | 
                        ⏱️ <strong>Broadcast Timestamp:</strong> ${new Date().toLocaleTimeString()}
                    </div>
                    <div style="margin-top: 0.5rem; color: #BBF7D0; font-size: 0.9rem;">
                        ✓ Alert successfully dispatched to <strong>${finalMatches.length} matching donors</strong> via instant emergency network.
                    </div>
                `;
            }

            // Render Emergency Donors List
            if (emergencyDonorsList) {
                emergencyDonorsList.innerHTML = '';
                if (finalMatches.length === 0) {
                    emergencyDonorsList.innerHTML = `<p style="color: #FECACA;">No donors currently available in this specific area. Emergency coordinator alerted.</p>`;
                } else {
                    finalMatches.forEach(d => {
                        const item = document.createElement('div');
                        item.className = 'emg-donor-item';
                        item.innerHTML = `
                            <div class="emg-donor-left">
                                <div class="donor-blood-badge" style="padding: 0.2rem 0.5rem; font-size: 0.9rem;">${d.bloodGroup}</div>
                                <div>
                                    <div class="emg-donor-name">${d.name}</div>
                                    <div class="emg-donor-loc">📍 ${d.area}, ${d.city} • 🟢 Available</div>
                                </div>
                            </div>
                            <button class="btn emg-alert-btn notify-single-btn" data-donor-name="${d.name}">
                                📲 Resend SMS Alert
                            </button>
                        `;
                        emergencyDonorsList.appendChild(item);
                    });

                    // Add listener for single resend buttons
                    document.querySelectorAll('.notify-single-btn').forEach(btn => {
                        btn.addEventListener('click', (ev) => {
                            const name = ev.currentTarget.getAttribute('data-donor-name');
                            showToast(`Priority emergency SMS alert sent to ${name}`, 'emergency', 'Alert Dispatched');
                            playEmergencyAlertSound();
                        });
                    });
                }
            }

            // Reveal results
            if (emergencyMatchesContainer) {
                emergencyMatchesContainer.style.display = 'block';
                emergencyMatchesContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            showToast(`🚨 Priority Broadcast Sent! Alerted ${finalMatches.length} compatible ${bgNeeded} donors in ${city}.`, 'emergency', 'EMERGENCY BROADCAST ACTIVE');
        });
    }

    // ----------------------------------------------------------------------
    // 8. Donor Hub & Availability Manager
    // ----------------------------------------------------------------------
    const donorSelectDropdown = document.getElementById('donorSelectDropdown');
    const quickDonorDetails = document.getElementById('quickDonorDetails');
    const statusDot = document.getElementById('statusDot');
    const statusHeading = document.getElementById('statusHeading');
    const statusDesc = document.getElementById('statusDesc');
    const toggleAvailabilityBtn = document.getElementById('toggleAvailabilityBtn');

    function populateDonorManagerDropdown() {
        if (!donorSelectDropdown) return;
        donorSelectDropdown.innerHTML = '';

        donorsList.forEach((d, idx) => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = `${d.name} (${d.bloodGroup} - ${d.city}, ${d.area})`;
            if (idx === 0) opt.selected = true;
            donorSelectDropdown.appendChild(opt);
        });

        updateDonorManagerUI();
    }

    function updateDonorManagerUI() {
        if (!donorSelectDropdown) return;
        const selectedId = donorSelectDropdown.value;
        const currentDonor = donorsList.find(d => d.id === selectedId);

        if (!currentDonor) return;

        // Quick Details
        if (quickDonorDetails) {
            quickDonorDetails.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span><strong>Blood Group:</strong> ${currentDonor.bloodGroup}</span>
                    <span><strong>City:</strong> ${currentDonor.city}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: var(--gray-600); font-size: 0.82rem;">
                    <span><strong>Neighborhood:</strong> ${currentDonor.area}</span>
                    <span><strong>Registered ID:</strong> ${currentDonor.id}</span>
                </div>
            `;
        }

        // Availability State
        if (currentDonor.available) {
            if (statusDot) {
                statusDot.className = 'status-dot-large available-dot';
            }
            if (statusHeading) {
                statusHeading.innerHTML = '🟢 Available to Donate';
                statusHeading.style.color = '#065F46';
            }
            if (statusDesc) {
                statusDesc.textContent = 'You are currently active. Hospitals and patients in your area can send emergency contact requests.';
            }
            if (toggleAvailabilityBtn) {
                toggleAvailabilityBtn.textContent = '⏸️ Switch to "Not Available" (Pause Requests)';
                toggleAvailabilityBtn.style.background = '#334155';
            }
        } else {
            if (statusDot) {
                statusDot.className = 'status-dot-large unavailable-dot';
            }
            if (statusHeading) {
                statusHeading.innerHTML = '⚫ Not Available (Resting / Paused)';
                statusHeading.style.color = '#475569';
            }
            if (statusDesc) {
                statusDesc.textContent = 'Your availability is paused. You will not receive emergency alerts until you toggle back to available.';
            }
            if (toggleAvailabilityBtn) {
                toggleAvailabilityBtn.textContent = '🟢 Switch to "Available" (Ready to Help)';
                toggleAvailabilityBtn.style.background = '#991B1B';
            }
        }
    }

    if (donorSelectDropdown) {
        donorSelectDropdown.addEventListener('change', updateDonorManagerUI);
    }

    if (toggleAvailabilityBtn) {
        toggleAvailabilityBtn.addEventListener('click', () => {
            const selectedId = donorSelectDropdown.value;
            const donorIndex = donorsList.findIndex(d => d.id === selectedId);

            if (donorIndex !== -1) {
                donorsList[donorIndex].available = !donorsList[donorIndex].available;
                saveDonors(donorsList);

                updateDonorManagerUI();
                filterDonorsList();

                const newStatus = donorsList[donorIndex].available ? 'Available (🟢)' : 'Not Available (⚫)';
                showToast(`Updated ${donorsList[donorIndex].name}'s status to ${newStatus}`, 'success', 'Status Updated');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 9. Contact Request Modal Management
    // ----------------------------------------------------------------------
    const contactModalBackdrop = document.getElementById('contactModalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalDonorPreview = document.getElementById('modalDonorPreview');
    const modalDonorIdInput = document.getElementById('modalDonorId');
    const contactRequestForm = document.getElementById('contactRequestForm');

    function openContactModal(donorId) {
        const targetDonor = donorsList.find(d => d.id === donorId);
        if (!targetDonor || !contactModalBackdrop) return;

        if (modalDonorIdInput) modalDonorIdInput.value = targetDonor.id;

        if (modalDonorPreview) {
            modalDonorPreview.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h4 style="font-size: 1.1rem; margin-bottom: 0.2rem;">${targetDonor.name}</h4>
                        <span style="font-size: 0.85rem; color: var(--gray-500);">📍 ${targetDonor.area}, ${targetDonor.city}</span>
                    </div>
                    <div class="donor-blood-badge" style="font-size: 1.1rem; padding: 0.3rem 0.7rem;">
                        ${targetDonor.bloodGroup}
                    </div>
                </div>
                <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--gray-600); border-top: 1px dashed var(--gray-300); padding-top: 0.5rem;">
                    🔒 <em>Donor phone number is masked for privacy. A mediated notification with your contact details will be dispatched upon submitting this form.</em>
                </div>
            `;
        }

        contactModalBackdrop.style.display = 'flex';
    }

    function closeContactModal() {
        if (contactModalBackdrop) {
            contactModalBackdrop.style.display = 'none';
        }
        if (contactRequestForm) {
            contactRequestForm.reset();
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeContactModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeContactModal);

    if (contactModalBackdrop) {
        contactModalBackdrop.addEventListener('click', (e) => {
            if (e.target === contactModalBackdrop) {
                closeContactModal();
            }
        });
    }

    // Escape Key listener to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModalBackdrop && contactModalBackdrop.style.display === 'flex') {
            closeContactModal();
        }
    });

    if (contactRequestForm) {
        contactRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const donorId = modalDonorIdInput.value;
            const targetDonor = donorsList.find(d => d.id === donorId);
            const reqName = document.getElementById('contactRequesterName').value;
            const reqHospital = document.getElementById('contactHospitalName').value;

            closeContactModal();
            showToast(`📨 Secure contact request dispatched to ${targetDonor ? targetDonor.name : 'Donor'} on behalf of ${reqName} (${reqHospital}).`, 'success', 'Request Sent');
            playEmergencyAlertSound();
        });
    }

    // ----------------------------------------------------------------------
    // 10. Animated Statistics Counters (Intersection Observer)
    // ----------------------------------------------------------------------
    function animateCounters() {
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    const counters = [
                        { id: 'counterDonors', target: 10000, duration: 2000 },
                        { id: 'counterHospitals', target: 250, duration: 1800 },
                        { id: 'counterCities', target: 50, duration: 1500 }
                    ];

                    counters.forEach(c => {
                        const el = document.getElementById(c.id);
                        if (!el) return;

                        let start = 0;
                        const stepTime = 20;
                        const totalSteps = c.duration / stepTime;
                        const increment = c.target / totalSteps;

                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= c.target) {
                                el.textContent = c.target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                el.textContent = Math.floor(start).toLocaleString();
                            }
                        }, stepTime);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
    animateCounters();

    // ----------------------------------------------------------------------
    // 11. Mobile Navigation & Scroll Spy
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu on nav item click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll Spy & Back to Top Toggle
    window.addEventListener('scroll', () => {
        // Back to top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active Navigation Link Highlighting
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // 12. Initial Render
    // ----------------------------------------------------------------------
    renderDonors(donorsList);
    populateDonorManagerDropdown();
});

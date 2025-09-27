
        // Sample event data
        const events = [
            {
                id: 1,
                title: "Jazz Night Under the Stars",
                date: "2024-10-15",
                dateFormatted: "October 15, 2024",
                time: "7:00 PM",
                category: "music",
                price: "$25",
                description: "An enchanting evening of smooth jazz featuring local and visiting artists under the beautiful night sky.",
                location: "Central Park Amphitheater",
                capacity: 200,
                organizer: "Nairobi Jazz Society",
                image: "🎷",
                featured: true
            },
            {
                id: 2,
                title: "Tech Innovation Conference",
                date: "2024-10-22",
                dateFormatted: "October 22, 2024",
                time: "9:00 AM",
                category: "conference",
                price: "$75",
                description: "Join industry leaders and innovators for a day of inspiring talks, networking, and workshops on the latest tech trends.",
                location: "Kenyatta International Convention Centre",
                capacity: 500,
                organizer: "Kenya Tech Hub",
                image: "💻",
                featured: true
            },
            {
                id: 3,
                title: "Community Art Workshop",
                date: "2024-10-18",
                dateFormatted: "October 18, 2024",
                time: "2:00 PM",
                category: "workshop",
                price: "$30",
                description: "Learn painting techniques from professional artists in this hands-on workshop for all skill levels.",
                location: "Community Arts Center",
                capacity: 25,
                organizer: "Local Artists Guild",
                image: "🎨",
                featured: true
            },
            {
                id: 4,
                title: "Football Championship Finals",
                date: "2024-10-25",
                dateFormatted: "October 25, 2024",
                time: "3:00 PM",
                category: "sports",
                price: "$20",
                description: "The most anticipated match of the season! Watch local teams compete for the championship title.",
                location: "City Stadium",
                capacity: 10000,
                organizer: "City Sports League",
                image: "⚽",
                featured: false
            },
            {
                id: 5,
                title: "Classical Music Evening",
                date: "2024-11-02",
                dateFormatted: "November 2, 2024",
                time: "7:30 PM",
                category: "music",
                price: "$40",
                description: "Experience the beauty of classical music performed by the renowned City Symphony Orchestra.",
                location: "National Theatre",
                capacity: 800,
                organizer: "City Symphony Orchestra",
                image: "🎼",
                featured: false
            },
            {
                id: 6,
                title: "Startup Pitch Competition",
                date: "2024-11-08",
                dateFormatted: "November 8, 2024",
                time: "10:00 AM",
                category: "conference",
                price: "$50",
                description: "Watch emerging entrepreneurs pitch their innovative ideas to a panel of experienced investors.",
                location: "Innovation Hub",
                capacity: 300,
                organizer: "Startup Accelerator",
                image: "🚀",
                featured: false
            },
            {
                id: 7,
                title: "Photography Masterclass",
                date: "2024-11-12",
                dateFormatted: "November 12, 2024",
                time: "11:00 AM",
                category: "workshop",
                price: "$60",
                description: "Master the art of photography with renowned photographer Sarah Johnson in this intensive workshop.",
                location: "Photography Studio",
                capacity: 15,
                organizer: "Vision Photography School",
                image: "📸",
                featured: false
            },
            {
                id: 8,
                title: "Basketball Tournament",
                date: "2024-11-15",
                dateFormatted: "November 15, 2024",
                time: "6:00 PM",
                category: "sports",
                price: "$15",
                description: "High-energy basketball tournament featuring teams from across the region competing for glory.",
                location: "Sports Complex",
                capacity: 2000,
                organizer: "Regional Basketball League",
                image: "🏀",
                featured: false
            }
        ];

        // Current active filter
        let currentFilter = 'all';

        // Initialize the website
        document.addEventListener('DOMContentLoaded', function() {
            populateFeaturedEvents();
            populateAllEvents();
            populateEventSelect();
            animateStats();
        });

        // Navigation functions
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);

            // Special actions for specific pages
            if (pageId === 'about') {
                setTimeout(animateStats, 500);
            }
        }

        function toggleMenu() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        }

        // Event display functions
        function populateFeaturedEvents() {
            const featuredEvents = events.filter(event => event.featured);
            const container = document.getElementById('featured-events-grid');
            container.innerHTML = '';

            featuredEvents.forEach(event => {
                const eventCard = createEventCard(event);
                container.appendChild(eventCard);
            });
        }

        function populateAllEvents() {
            const container = document.getElementById('all-events-grid');
            container.innerHTML = '';

            const filteredEvents = currentFilter === 'all' 
                ? events 
                : events.filter(event => event.category === currentFilter);

            filteredEvents.forEach(event => {
                const eventCard = createEventCard(event);
                container.appendChild(eventCard);
            });
        }

        function createEventCard(event) {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.onclick = () => showEventDetails(event);

            card.innerHTML = `
                <div class="event-image">${event.image}</div>
                <div class="event-content">
                    <div class="event-date">${event.dateFormatted}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-price">${event.price}</div>
                </div>
            `;

            return card;
        }

        function filterEvents(category) {
            currentFilter = category;
            
            // Update active filter tab
            const tabs = document.querySelectorAll('.filter-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
            
            // Repopulate events
            populateAllEvents();
        }

        function showEventDetails(event) {
            const modal = document.getElementById('event-modal');
            const modalBody = document.getElementById('modal-body');
            
            modalBody.innerHTML = `
                <div class="event-image" style="height: 150px; margin-bottom: 1rem;">${event.image}</div>
                <h2>${event.title}</h2>
                <div style="margin: 1rem 0;">
                    <strong>Date:</strong> ${event.dateFormatted}<br>
                    <strong>Time:</strong> ${event.time}<br>
                    <strong>Location:</strong> ${event.location}<br>
                    <strong>Organizer:</strong> ${event.organizer}<br>
                    <strong>Capacity:</strong> ${event.capacity} attendees<br>
                    <strong>Price:</strong> ${event.price}
                </div>
                <p>${event.description}</p>
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="bookEvent(${event.id})" style="margin-right: 1rem;">Book Now</button>
                    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                </div>
            `;
            
            modal.classList.add('active');
        }

        function closeModal() {
            document.getElementById('event-modal').classList.remove('active');
        }

        function bookEvent(eventId) {
            closeModal();
            showPage('booking');
            
            // Pre-select the event in the booking form
            const eventSelect = document.getElementById('event-select');
            eventSelect.value = eventId;
            
            // Update navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[2].classList.add('active'); // Booking is the 3rd nav item
        }

        // Populate event select dropdown
        function populateEventSelect() {
            const select = document.getElementById('event-select');
            select.innerHTML = '<option value="">Choose an event...</option>';
            
            events.forEach(event => {
                const option = document.createElement('option');
                option.value = event.id;
                option.textContent = `${event.title} - ${event.dateFormatted}`;
                select.appendChild(option);
            });
        }

        // Form validation and submission
        document.getElementById('booking-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBookingForm()) {
                submitBookingForm();
            }
        });

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                submitContactForm();
            }
        });

        function validateBookingForm() {
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.style.display = 'none';
            });
            
            // Event validation
            const eventSelect = document.getElementById('event-select');
            if (!eventSelect.value) {
                document.getElementById('event-error').style.display = 'block';
                isValid = false;
            }
            
            // Name validation
            const fullName = document.getElementById('full-name');
            if (!fullName.value.trim() || fullName.value.trim().length < 2) {
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value || !emailRegex.test(email.value)) {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Phone validation
            const phone = document.getElementById('phone');
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phone.value || !phoneRegex.test(phone.value)) {
                document.getElementById('phone-error').style.display = 'block';
                isValid = false;
            }
            
            // Tickets validation
            const tickets = document.getElementById('tickets');
            if (!tickets.value || tickets.value < 1 || tickets.value > 10) {
                document.getElementById('tickets-error').style.display = 'block';
                isValid = false;
            }
            
            return isValid;
        }

        function validateContactForm() {
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.style.display = 'none';
            });
            
            // Name validation
            const name = document.getElementById('contact-name');
            if (!name.value.trim()) {
                document.getElementById('contact-name-error').style.display = 'block';
                isValid = false;
            }
            
            // Email validation
            const email = document.getElementById('contact-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value || !emailRegex.test(email.value)) {
                document.getElementById('contact-email-error').style.display = 'block';
                isValid = false;
            }
            
            // Subject validation
            const subject = document.getElementById('contact-subject');
            if (!subject.value.trim()) {
                document.getElementById('contact-subject-error').style.display = 'block';
                isValid = false;
            }
            
            // Message validation
            const message = document.getElementById('contact-message');
            if (!message.value.trim() || message.value.trim().length < 10) {
                document.getElementById('contact-message-error').style.display = 'block';
                isValid = false;
            }
            
            return isValid;
        }

        function submitBookingForm() {
            const form = document.getElementById('booking-form');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                const formData = new FormData(form);
                const selectedEvent = events.find(event => event.id == formData.get('event'));
                
                alert(`🎉 Booking Confirmed!\n\nEvent: ${selectedEvent.title}\nName: ${formData.get('fullName')}\nTickets: ${formData.get('tickets')}\n\nA confirmation email will be sent to ${formData.get('email')}`);
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        function submitContactForm() {
            const form = document.getElementById('contact-form');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('✉️ Message Sent!\n\nThank you for contacting us. We\'ll get back to you within 24 hours.');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Statistics animation
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 20);
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close modal when clicking outside
        document.getElementById('event-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Add scroll effects
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95))';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                navbar.style.backdropFilter = 'none';
            }
        });

        // Add hover effects to event cards
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('.event-card')) {
                e.target.closest('.event-card').style.transform = 'translateY(-8px)';
            }
        });

        document.addEventListener('mouseout', function(e) {
            if (e.target.closest('.event-card')) {
                e.target.closest('.event-card').style.transform = 'translateY(0)';
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.querySelector('.nav-menu').classList.remove('active');
            }
        });

        // Auto-hide mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.remove('active');
            });
        });

        // Real-time form validation
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                const errorElement = document.getElementById(this.name + '-error') || 
                                   document.getElementById(this.id + '-error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });

        // Add loading animation to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.type !== 'submit') return;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255,255,255,0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.marginLeft = '-50px';
                ripple.style.marginTop = '-50px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
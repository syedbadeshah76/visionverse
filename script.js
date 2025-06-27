 // --- Parallax Effect for Hero Background ---
        document.addEventListener('DOMContentLoaded', () => {
            const parallaxBg = document.getElementById('parallaxBg');
            let lastScrollY = 0;
            let ticking = false;

            /**
             * Updates the background position for the parallax effect.
             */
            function updateParallax() {
                // Calculate how much the background should move based on scroll position
                // The `0.2` factor determines the strength of the parallax effect
                const translateY = window.scrollY * 0.2;
                parallaxBg.style.transform = `translateY(-${translateY}px)`;
                ticking = false;
            }

            /**
             * Handles the scroll event, debouncing it with requestAnimationFrame for performance.
             */
            window.addEventListener('scroll', () => {
                lastScrollY = window.scrollY;
                if (!ticking) {
                    window.requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });

            // Initial call to set correct position if page is scrolled on load
            updateParallax();
        });

        // --- Card Hover Effect (simplified as 3D is removed) ---
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.card-container');

            cards.forEach(card => {
                const cardInner = card.querySelector('.card-inner');

                /**
                 * Handles mouse movement over the card to apply a subtle scale effect.
                 * @param {MouseEvent} e - The mouse event object.
                 */
                card.addEventListener('mousemove', (e) => {
                    cardInner.style.transform = `scale(1.02)`;
                });

                /**
                 * Resets the card's scale when the mouse leaves.
                 */
                card.addEventListener('mouseleave', () => {
                    cardInner.style.transform = `scale(1)`;
                });
            });
        });

        // --- Responsive Navbar Toggle ---
        document.addEventListener('DOMContentLoaded', () => {
            const menuButton = document.getElementById('menuButton');
            const navLinks = document.getElementById('navLinks');

            // Toggle the 'active' class on the navLinks when the menu button is clicked
            menuButton.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close the mobile menu when a link is clicked (for smoother navigation)
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                });
            });

            // Handle window resize to ensure correct state of menu
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
                    navLinks.classList.remove('active'); // Ensure menu is hidden on desktop if it was open on mobile
                }
            });
        });

        // --- Scroll-based Fade-in Animation ---
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1 // 10% of the target element is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, observerOptions);

            // Apply to specific sections that should animate on scroll
            document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
                observer.observe(element);
            });
        });
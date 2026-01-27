const app = {
    init: () => {
        console.log('App initialized');
        app.showLoader();
        app.loadTheme();
        app.setupPageTransitions(); // Intercept links

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) { // Check if header exists (might not on all pages)
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });

        // Simulate app ready (shorter for smoother feel)
        setTimeout(() => {
            app.hideLoader();
        }, 800);
    },

    // Page Transitions
    setupPageTransitions: () => {
        // Find all links that navigate to local pages
        const links = document.querySelectorAll('a[href$=".html"], a[href="#"]'); // Simplified selector

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Ignore hash links or empty links or special JS links
                if (!href || href === '#' || href.startsWith('javascript:')) return;

                // Prevent default navigation
                e.preventDefault();

                // Show loader
                app.showLoader();

                // Wait for animation then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // 500ms transition
            });
        });
    },

    // Loader Logic
    showLoader: () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.remove('fade-out');
            // Inject Iconic Structure if not present
            if (!loader.querySelector('.iconic-spinner-wrapper')) {
                loader.innerHTML = `
                    <div class="loader-content">
                        <div class="iconic-spinner-wrapper">
                            <div class="iconic-ring"></div>
                            <ion-icon name="wallet" class="iconic-logo"></ion-icon>
                        </div>
                        <div class="iconic-text">LOADING</div>
                    </div>
                `;
            }
        }
    },

    hideLoader: () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    },

    // Auth Logic
    showAuth: (mode = 'login') => {
        const overlay = document.getElementById('auth-overlay');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        // Show overlay with animation
        overlay.classList.remove('box-hidden');
        // Force reflow
        void overlay.offsetWidth;
        overlay.classList.add('active');

        if (mode === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    },

    hideAuth: () => {
        const overlay = document.getElementById('auth-overlay');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.classList.add('box-hidden');
        }, 300);
    },

    toggleAuthMode: (mode) => {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        // Simple cross-fade could be added here
        if (mode === 'login') {
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    },

    handleLogin: () => {
        const email = document.querySelector('#login-form input[type="email"]').value;
        const password = document.querySelector('#login-form input[type="password"]').value;

        // Specific Credential Check
        if (email === 'jaysuthar7890@gmail.com' && password === '6376019471') {
            app.hideAuth();

            // Show Loader
            app.showLoader();

            // Simulate API delay
            setTimeout(() => {
                app.hideLoader();

                // Update UI State
                const loginBtn = document.getElementById('login-btn');
                const signupBtn = document.getElementById('signup-btn');

                if (loginBtn) {
                    loginBtn.textContent = 'Dashboard';
                    loginBtn.removeAttribute('onclick'); // Remove old handler
                    loginBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.location.href = 'dashboard.html';
                    });

                    // Highlight the button to show change
                    loginBtn.classList.remove('btn-secondary');
                    loginBtn.classList.add('btn-primary');
                }

                if (signupBtn) {
                    signupBtn.style.display = 'none'; // Hide "Get Started" to clean up nav
                }

                // Optional: Show a toast or small alert
                // alert('Login Successful! Click Dashboard to proceed.');

            }, 1500); // 1.5s loading animation

        } else {
            alert('Invalid Credentials. Please try again.');
        }
    },

    handleSignup: () => {
        const name = document.querySelector('#signup-form input[type="text"]').value;
        // Mock Signup
        app.hideAuth();
        window.location.href = 'dashboard.html';
    },

    loadTheme: () => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Default to 'light' if no theme is stored, ignoring system preference as per user request
        if (storedTheme === 'light' || !storedTheme) {
            document.body.classList.add('light-theme');
            app.updateThemeIcon('sunny-outline');
        } else {
            document.body.classList.remove('light-theme');
            app.updateThemeIcon('moon-outline');
        }
    },

    toggleTheme: () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        app.updateThemeIcon(isLight ? 'sunny-outline' : 'moon-outline');
    },

    updateThemeIcon: (iconName) => {
        const icon = document.querySelector('#theme-toggle ion-icon');
        if (icon) icon.setAttribute('name', iconName);
    },

    navTo: (page) => {
        console.log('Navigating to', page);
        // Placeholder for router
        alert('Module ' + page + ' coming soon!');
    },

    signup: (plan) => {
        console.log('User selected plan:', plan);
        alert('You selected the ' + plan.toUpperCase() + ' plan. Registration flow coming up next.');
    },

    // Tab Switching Logic (Main Page)
    switchTab: (tabName) => {
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        const target = document.getElementById(`tab-${tabName}`);
        if (target) target.style.display = 'block';

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.borderBottom = 'none';
            btn.style.color = 'var(--text-muted)';
        });

        const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.textContent.toLowerCase().includes(tabName.substring(0, 4)));
        if (activeBtn) {
            activeBtn.style.borderBottom = '2px solid var(--primary)';
            activeBtn.style.color = 'var(--primary)';
        }
    },

    // Modal Tab Switching Logic
    switchModalTab: (tabName) => {
        document.querySelectorAll('.modal-tab-content').forEach(el => el.style.display = 'none');
        const target = document.getElementById(`modal-tab-${tabName}`);
        if (target) target.style.display = 'block';

        document.querySelectorAll('.modal-tab-btn').forEach(btn => {
            btn.style.borderBottom = 'none';
            btn.style.color = 'var(--text-muted)';
        });

        // Find clicked button by onclick attribute content
        const activeBtn = document.querySelector(`.modal-tab-btn[onclick*="${tabName}"]`);
        if (activeBtn) {
            activeBtn.style.borderBottom = '2px solid var(--primary)';
            activeBtn.style.color = 'var(--primary)';
        }
    },

    // Mock Inventory Database
    inventoryDB: [
        { sku: 'MFYD4AZA/A', name: 'Apple iPhone 17 Pro Max', price: 489.900, desc: '512GB / Cosmic Orange' },
        { sku: 'LGT-023', name: 'Desk Lamp LED', price: 15.000, desc: '10W Adjustable' },
        { sku: 'FUR-001', name: 'Office Chair', price: 120.000, desc: 'Ergonomic Black' }
    ],

    // SKU Auto-Detection
    handleSkuInput: (input) => {
        const row = input.closest('tr');
        const sku = input.value.trim();
        const product = app.inventoryDB.find(p => p.sku.toLowerCase() === sku.toLowerCase() || p.name.toLowerCase().includes(sku.toLowerCase()));

        if (product) {
            // Auto fill
            const descInput = row.querySelector('.col-desc input');
            const priceInput = row.querySelector('.col-price');

            if (descInput) descInput.value = product.name + ' - ' + product.desc;
            if (priceInput) priceInput.textContent = product.price.toFixed(3);

            // Visual feedback
            input.style.borderColor = 'var(--success)';
        } else {
            input.style.borderColor = '#eee';
        }
    },

    // UI Init
    initUI: () => {
        // Menu Toggle
        const menuBtn = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        // Create and Inject Overlay if not exists
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        if (menuBtn && sidebar) {
            const toggleMenu = () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
            };

            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent immediate close
                toggleMenu();
            });

            // Close when clicking overlay
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });

            // Close sidebar when clicking outside on mobile (Legacy check, overlay handles mostly)
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024 &&
                    !sidebar.contains(e.target) &&
                    !menuBtn.contains(e.target) &&
                    sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                }
            });
        }

        // Force Modal Close (Fix for Auto-Open Bug)
        const modal = document.getElementById('product-modal');
        if (modal && modal.open) {
            modal.close();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    app.initUI();
});

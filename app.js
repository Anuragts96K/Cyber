// --- MAHIRAG CYBERSECURITY - APP LOGIC & INTERACTIONS ---

// Drop your Web3Forms access key here to enable direct form-to-email submissions without a backend.
// Register for a free key in 5 seconds at: https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "7571a1c6-7e0f-486e-96d4-697905aaa8fe";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Canvas Background
    new NetworkCanvas();

    // Initialize Cards Glow Tracking
    initCardGlows();

    // Initialize Methodology Timeline Tabs
    initTimelineTabs();

    // Initialize Verticals Tab Panel
    initVerticalsTabs();

    // Initialize Case Studies Tabs
    initCaseTabs();

    // Scroll Header behavior
    initHeaderScroll();

    // Mobile nav menu drawer
    initMobileNav();
});

/* --- DYNAMIC GLASS CARD GLOW --- */
function initCardGlows() {
    const cards = document.querySelectorAll('.capability-card, .booking-widget-container, .cases-grid, .v-feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* --- NETWORK CANVAS PARTICLES --- */
class NetworkCanvas {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 180 };
        this.maxParticles = 75;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const count = window.innerWidth < 768 ? 35 : this.maxParticles;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
            this.ctx.fill();

            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const alpha = (1 - dist / 130) * 0.12;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }

            if (this.mouse.x !== null) {
                const mdx = p.x - this.mouse.x;
                const mdy = p.y - this.mouse.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < this.mouse.radius) {
                    const force = (this.mouse.radius - mdist) / this.mouse.radius;
                    p.x -= mdx * force * 0.02;
                    p.y -= mdy * force * 0.02;

                    const lineAlpha = force * 0.08;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

/* --- HERO VAPT SCAN SIMULATOR --- */
function initScanSimulator() {
    const consoleBox = document.getElementById('console-logger');
    const visualizer = document.getElementById('scan-visualizer');
    if (!consoleBox || !visualizer) return;

    const targetPoints = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
        const pt = document.createElement('div');
        pt.className = 'target-point secure';
        const top = 15 + Math.random() * 70;
        const left = 15 + Math.random() * 70;
        pt.style.top = `${top}%`;
        pt.style.left = `${left}%`;
        visualizer.appendChild(pt);
        targetPoints.push(pt);
    }

    const logs = [
        { type: 'info', text: 'Initializing Mahirag offensive check...' },
        { type: 'info', text: 'Target network interface selected: 10.0.8.0/24' },
        { type: 'info', text: 'Running automated asset discovery...' },
        { type: 'success', text: 'Identified 8 active cloud infrastructure assets.' },
        { type: 'info', text: 'Sweeping ports (TCP/UDP handshake checks)...' },
        { type: 'warn', text: 'Host 10.0.8.44 has port 8080 open (HTTP DEV Node).' },
        { type: 'info', text: 'Injecting fuzzing payloads at route: /auth/login' },
        { type: 'alert', text: 'Bypassed authentication: SQLi vector confirmed (Host 2)' },
        { type: 'info', text: 'Inspecting SSL/TLS handshake cipher strengths...' },
        { type: 'success', text: 'Main API cluster (10.0.8.10) enforces TLS 1.3 only.' },
        { type: 'info', text: 'Running signature checks for Docker container escapes...' },
        { type: 'alert', text: 'Found stale kernel on node 10.0.8.12 (CVE-2023-38606)' },
        { type: 'info', text: 'Validating AWS IAM configuration & S3 bucket access...' },
        { type: 'success', text: 'All storage buckets properly configure private ACLs.' },
        { type: 'info', text: 'Correlating vulnerabilities with Mahirag audit protocols...' },
        { type: 'success', text: 'Completed scan iteration. Audit checklist prepared.' }
    ];

    let logIndex = 0;
    
    function addLogLine() {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const entry = logs[logIndex];
        
        const line = document.createElement('div');
        line.className = 'console-line';
        line.innerHTML = `
            <span class="timestamp">[${time}]</span>
            <span class="${entry.type}">${entry.type.toUpperCase()}:</span>
            <span>${entry.text}</span>
        `;
        
        consoleBox.appendChild(line);
        consoleBox.scrollTop = consoleBox.scrollHeight;

        const randomPt = targetPoints[Math.floor(Math.random() * targetPoints.length)];
        if (entry.type === 'alert') {
            randomPt.className = 'target-point vulnerable';
        } else if (entry.type === 'success') {
            randomPt.className = 'target-point secure';
        } else {
            randomPt.className = 'target-point scanning';
            setTimeout(() => {
                randomPt.className = Math.random() > 0.3 ? 'target-point secure' : 'target-point vulnerable';
            }, 800);
        }

        logIndex = (logIndex + 1) % logs.length;

        const delays = [800, 1200, 1500, 2000, 1000];
        const nextDelay = delays[Math.floor(Math.random() * delays.length)];
        setTimeout(addLogLine, nextDelay);
    }

    addLogLine();
}

/* --- PIPELINE / METHODOLOGY TIMELINE TABS --- */
function initTimelineTabs() {
    const tabs = document.querySelectorAll('.timeline-tab');
    const panes = document.querySelectorAll('.timeline-pane');
    const activeLine = document.querySelector('.timeline-nav-line-active');
    
    if (tabs.length === 0 || panes.length === 0) return;

    updateActiveLine(0);

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            
            const targetPane = document.getElementById(tab.dataset.target);
            if (targetPane) targetPane.classList.add('active');

            updateActiveLine(index);
        });
    });

    function updateActiveLine(index) {
        if (!activeLine) return;
        // Map 6 nodes (index 0 to 5) to percentages (0% to 100% of the 83.34% total span width)
        const percentages = [0, 20, 40, 60, 80, 100];
        activeLine.style.width = `${percentages[index]}%`;
    }
}

/* --- TARGET VERTICALS TAB PANEL --- */
function initVerticalsTabs() {
    const buttons = document.querySelectorAll('.vertical-tab-btn');
    const panes = document.querySelectorAll('.vertical-pane');

    if (buttons.length === 0 || panes.length === 0) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            
            const paneId = btn.dataset.pane;
            const targetPane = document.getElementById(paneId);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

/* --- CASE STUDIES TAB PANEL --- */
function initCaseTabs() {
    const buttons = document.querySelectorAll('.case-tab-btn');
    const panes = document.querySelectorAll('.case-pane');

    if (buttons.length === 0 || panes.length === 0) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            
            const paneId = btn.dataset.pane;
            const targetPane = document.getElementById(paneId);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

/* --- NAVIGATION SCROLL HEADER --- */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --- MOBILE NAVIGATION --- */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
            menu.style.position = 'absolute';
            menu.style.top = '100%';
            menu.style.left = '0';
            menu.style.width = '100%';
            menu.style.background = 'rgba(2, 4, 8, 0.95)';
            menu.style.padding = '2rem';
            menu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            menu.style.gap = '1.5rem';
        } else {
            menu.style.display = '';
        }
    });

    // Close mobile menu drawer when clicking a link
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.style.display = '';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.style.display = '';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* --- SCOPING FORM SUBMISSION HANDLER --- */
async function handleScopingSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('form-submit-btn');
    const submitBtnText = submitBtn ? submitBtn.querySelector('span') : null;
    const name = document.getElementById('scope-name').value;
    const email = document.getElementById('scope-email').value;
    const phone = document.getElementById('scope-phone').value || 'Not Provided';
    const company = document.getElementById('scope-company').value;
    const scopeType = document.getElementById('scope-type').value;
    const description = document.getElementById('scope-description').value;

    const subject = `Mahirag Cybersecurity Scoping Request: ${scopeType} (${company})`;
    const body = `Hello Mahirag Security Team,

I would like to request a security scoping proposal for our infrastructure.

--- CONTACT DETAILS ---
Name: ${name}
Business Email: ${email}
Contact Number: ${phone}
Company Name: ${company}

--- TARGET SCOPE ---
Audit Vector: ${scopeType}

--- INFRASTRUCTURE DESCRIPTION & SECURITY GOALS ---
${description}

Please contact us to establish an NDA and coordinate the testing window.

Regards,
${name}`;

    const modal = document.getElementById('scoping-success-modal');
    const successState = document.getElementById('modal-success-state');
    const fallbackState = document.getElementById('modal-fallback-state');
    const textarea = document.getElementById('ticket-text-copy');
    
    // 1. Check if direct API dispatcher is configured
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
        // Fallback to local mail client
        const mailtoUrl = `mailto:mahima@mahirag.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;

        // Show the fallback modal (copy/paste)
        if (modal && fallbackState && successState && textarea) {
            successState.style.display = 'none';
            fallbackState.style.display = 'flex';
            textarea.value = body;
            modal.showModal();
        }
        return;
    }

    // 2. Direct send via Web3Forms API
    try {
        if (submitBtn) submitBtn.disabled = true;
        if (submitBtnText) submitBtnText.innerText = 'Transmitting Scope...';

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: subject,
                from_name: "Mahirag Scoping Form",
                to_email: "mahima@mahirag.xyz",
                name: name,
                email: email,
                phone: phone,
                company: company,
                scope_type: scopeType,
                message: description
            })
        });

        const json = await response.json();

        if (response.status === 200) {
            // Show direct success modal
            if (modal && successState && fallbackState) {
                fallbackState.style.display = 'none';
                successState.style.display = 'flex';
                modal.showModal();
            }
            document.getElementById('cyber-scoping-form').reset();
        } else {
            throw new Error(json.message || 'API response error');
        }

    } catch (error) {
        console.error('Email API failed, falling back to mailto:', error);
        
        // Final fallback to mailto
        const mailtoUrl = `mailto:mahima@mahirag.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;

        if (modal && fallbackState && successState && textarea) {
            successState.style.display = 'none';
            fallbackState.style.display = 'flex';
            textarea.value = body;
            modal.showModal();
        }
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.innerText = 'Send';
    }
}

// Copy ticket data to clipboard
function copyTicketToClipboard() {
    const textarea = document.getElementById('ticket-text-copy');
    if (!textarea) return;
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.getElementById('btn-copy-ticket');
        if (!btn) return;
        const span = btn.querySelector('span');
        const originalText = span.innerText;
        span.innerText = 'Copied!';
        btn.style.borderColor = 'var(--accent-green)';
        setTimeout(() => {
            span.innerText = originalText;
            btn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Close scoping success modal
function closeScopingModal() {
    const modal = document.getElementById('scoping-success-modal');
    if (modal) {
        modal.close();
    }
}

// ============================================================================
// 1. GLOBAL & HEADER SCROLL BACKGROUND ACTION
// ============================================================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});


// ============================================================================
// 2. AUTO-HIGHLIGHT SCROLL SPY ACTIVE NAVBAR LINK
// ============================================================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                if (item.getAttribute('data-target') === id) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section) observer.observe(section);
});


// ============================================================================
// 3. HERO TEXT TYPING & PHRASES LOOP ANIMATION
// ============================================================================
const nameText = "Basit Ali";
const subtextPhrases = [
    "Professional Website Developer",
    "Custom Coding & WordPress Website Expert",
    "Deep Knowledge of Using Elementor & WooCommerce",
    "Expert in Integrating All Types of Premium Plugins",
    "Capable of Fitting Any Type of Custom Code in WordPress",
    "Advanced Knowledge of Responsive Bootstrap Designs",
    "Result-Oriented Responsive Website Builder",
    "Fast Loading Speed Optimization Expert",
    "Successfully Delivering Small & Large Scale Projects"
];

let heroNameIndex = 0;
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffects() {
    const nameElement = document.getElementById("typing-name");
    if (!nameElement) return;

    if (heroNameIndex < nameText.length) {
        nameElement.innerHTML += nameText.charAt(heroNameIndex);
        heroNameIndex++;
        setTimeout(typeEffects, 120);
        return;
    }

    const currentPhrase = subtextPhrases[phraseIndex];
    const subtextElement = document.getElementById("typing-subtext");
    if (!subtextElement) return;

    if (!isDeleting) {
        subtextElement.innerHTML = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
        if (characterIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2200); 
        }
    } else {
        subtextElement.innerHTML = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
        if (characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % subtextPhrases.length;
        }
    }

    const speed = isDeleting ? 30 : 60; 
    setTimeout(typeEffects, speed);
}
window.addEventListener('load', typeEffects);
// ============================================================================
// 4. HERO BACKGROUND CANVAS (INTENSE SHANDAAR DOT NETWORKS)
// ============================================================================
const canvas = document.getElementById('canvas-dots');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const particlesArray = [];
    const baseParticleCount = 180; 
    let mouse = { x: null, y: null, radius: 220 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    class Particle {
        constructor(x, y) {
            this.x = x !== undefined ? x : Math.random() * canvas.width;
            this.y = y !== undefined ? y : Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = (Math.random() * 0.4) - 0.2;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.angle += 0.005;
            this.x += this.speedX + Math.sin(this.angle) * 0.08;
            this.y += this.speedY + Math.cos(this.angle) * 0.08;
            
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
    }

    function initCanvas() {
        particlesArray.length = 0;
        for (let i = 0; i < baseParticleCount; i++) { 
            particlesArray.push(new Particle()); 
        }
    }
    initCanvas();
    window.addEventListener('resize', () => { initCanvas(); });

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeLocalDots = 0;

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (mouse.x && mouse.y) {
                let dx = particlesArray[i].x - mouse.x;
                let dy = particlesArray[i].y - mouse.y;
                if (Math.sqrt(dx*dx + dy*dy) < mouse.radius) { activeLocalDots++; }
            }
        }

        // Intense Dot injection effect (Shandaar Boost Quantity on Hover)
        if (mouse.x && mouse.y && activeLocalDots < 90) {
            let alpha = Math.random() * Math.PI * 2;
            let radiusOffset = Math.random() * mouse.radius;
            let spawnedX = mouse.x + Math.cos(alpha) * radiusOffset;
            let spawnedY = mouse.y + Math.sin(alpha) * radiusOffset;
            particlesArray.push(new Particle(spawnedX, spawnedY));
            if (particlesArray.length > 400) particlesArray.shift();
        }

        // Fast laser lines networks inside mouse circle radius
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (mouse.x != null && mouse.y != null) {
                    let mDx = particlesArray[a].x - mouse.x;
                    let mDy = particlesArray[a].y - mouse.y;
                    let mDist = Math.sqrt(mDx*mDx + mDy*mDy);

                    if (mDist < mouse.radius && dist < 90) {
                        let opacity = (1 - (mDist / mouse.radius)) * 0.5;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}


function startRoboticAboutSequence() {
    const line = document.querySelector('.robotic-connector-line');
    const dataBox = document.querySelector('.about-data-box');

    if (!line || !dataBox) return;

    // Line size reduced to keep information closely attached to the picture frame
    line.style.width = "45px"; 

    setTimeout(() => {
        dataBox.classList.add('active');
        typeWriterSingle("line-name", roboticProfileData.name, 60, () => {
            typeWriterSingle("line-role", roboticProfileData.role, 50, () => {
                typeWriterSingle("line-email", roboticProfileData.email, 40, () => {
                    typeWriterSingle("line-phone", roboticProfileData.phone, 40);
                });
            });
        });
    }, 1300); 
}

/* ABOUT AND RESUME MODULE CODE START FROM HERE - PART 1 */
document.addEventListener("DOMContentLoaded", () => {
    const aboutDataset = {
        name: "Basit Ali",
        title: "WordPress Developer",
        email: "webcomelite@gmail.com",
        whatsapp: "03077661331",
        paragraph: "I am a cyber-oriented WordPress Developer engineered to deliver ultra-performance, fully secure, and highly scalable digital ecosystems. Armed with expertise in core front-end languages like HTML/CSS alongside robust page-builders like Elementor and WooCommerce engines, I convert complex layout protocols into clean, seamless human interfaces."
    };

    function executeTyping(elementId, text, speed) {
        return new Promise((resolve) => {
            let idx = 0;
            const targetNode = document.getElementById(elementId);
            if(!targetNode) { resolve(); return; }
            targetNode.innerHTML = "";

            function runningTyper() {
                if (idx < text.length) {
                    targetNode.innerHTML += text.charAt(idx);
                    idx++;
                    setTimeout(runningTyper, speed);
                } else { resolve(); }
            }
            runningTyper();
        });
    }

    // --- CANVAS DYNAMIC ROBOTIC BACKGROUND SYSTEM ---
    const canvas = document.getElementById("robotic-bg-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let gridLines = [];

        function resizeCanvas() {
            const section = canvas.parentElement;
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle Class (Moving Laser Nodes/Dots)
        class LaserNode {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1.5;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.color = Math.random() > 0.5 ? "#00f0ff" : "#bd00ff";
                this.glow = Math.random() * 10 + 5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.save();
                ctx.shadowBlur = this.glow;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize Nodes Array
        for (let i = 0; i < 40; i++) { particles.push(new LaserNode()); }

        // Animation System Loop
        function renderRoboticScene() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw Dynamic Circuit Trailing Links
            ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Render Nodes
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(renderRoboticScene);
        }
        renderRoboticScene();
    }

    async function triggerModuleOneSequence() {
        await executeTyping("type-name", aboutDataset.name, 60);
        await executeTyping("type-title", aboutDataset.title, 40);
        await executeTyping("type-email", aboutDataset.email, 30);
        await executeTyping("type-whatsapp", aboutDataset.whatsapp, 30);
        await executeTyping("type-paragraph", aboutDataset.paragraph, 12);
        
        const cursor1 = document.querySelector(".cursor-1");
        if(cursor1) cursor1.style.display = "none";
        if(typeof triggerModuleTwoSequence === "function") { triggerModuleTwoSequence(); }
    }
    triggerModuleOneSequence();
});

/* ADDITIONAL SCROLL SPY ENFORCER CODE */
window.addEventListener("scroll", () => {
    const aboutSection = document.getElementById("about");
    // Aapke header link ki selector class ya attribute (agar simple link hai to 'a[href="#about"]')
    const aboutHeaderLink = document.querySelector('header a[href="#about"], nav a[href="#about"], .nav-menu a[href="#about"]');
    
    if (aboutSection && aboutHeaderLink) {
        const rect = aboutSection.getBoundingClientRect();
        // Agar section screen ke top area par 30% se zyada aa chuka ho
        if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
            // Aapki active menu class jo header element ko underline ya color krti hai (e.g., 'active')
            aboutHeaderLink.classList.add("active"); 
        } else {
            aboutHeaderLink.classList.remove("active");
        }
    }
});

/* ABOUT AND RESUME MODULE CODE END FROM HERE - PART 1 */
/* ABOUT AND RESUME MODULE CODE START FROM HERE - PART 2 */
// Global scoping bridge to let Part 1 module trigger this timeline flow sequentially
window.triggerModuleTwoSequence = async function() {
    const resumeDataset = {
        summary: "Detail-oriented web developer with a Bachelor's degree in Computer Science from Arid Agriculture University Barani Institute Sahiwal, specializing in front-end and WordPress development. Experienced in creating dynamic and responsive web applications using core structural logic scripts. Adept at collaborating with teams to deliver user-centric solutions that enhance engagement and functionality. Passionate about continuous learning and leveraging the latest web tech components."
    };

    // Helper secondary pipeline execution engine 
    function executeSecondaryTyping(elementId, text, speed) {
        return new Promise((resolve) => {
            let position = 0;
            const targetBox = document.getElementById(elementId);
            if(!targetBox) { resolve(); return; }
            targetBox.innerHTML = ""; // Active data stream buffer clear

            function activeTyper() {
                if (position < text.length) {
                    targetBox.innerHTML += text.charAt(position);
                    position++;
                    setTimeout(activeTyper, speed);
                } else {
                    resolve(); // Triggers final promise complete status
                }
            }
            activeTyper();
        });
    }

    // Triggering the Resume Summary string typeout 
    await executeSecondaryTyping("type-summary", resumeDataset.summary, 10);
    
    // Disables the layout blinking cursor loop on system summary card when finished
    const cursor2 = document.querySelector(".cursor-2");
    if(cursor2) {
        cursor2.style.animation = "none";
        cursor2.style.background = "transparent";
    }
};
/* ABOUT AND RESUME MODULE CODE END FROM HERE - PART 2 */

// SERVICES SECTION CODE START FROM HERE - JAVASCRIPT MODULE
document.addEventListener("DOMContentLoaded", () => {
    const servicesSection = document.querySelector(".cyber-sticky-services-engine");
    const deckCards = document.querySelectorAll(".service-deck-node");
    const circuitLines = document.querySelectorAll(".circuit-line");

    if (!servicesSection || deckCards.length === 0) return;

    let isTicking = false;

    // Zero mask initializing setup - guarantees blank canvas on arrival
    circuitLines.forEach(line => {
        line.style.strokeDashoffset = "2500";
    });

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            // requestAnimationFrame pushes computations onto raw hardware frames rendering pipeline smoothly
            window.requestAnimationFrame(() => {
                executeFluidScrollMatrices();
                isTicking = false;
            });
            isTicking = true;
        }
    });

    function executeFluidScrollMatrices() {
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        const totalScrollableTrack = sectionHeight - viewportHeight;
        const relativeScrollDelta = scrollTop - sectionTop;
        
        let scrollRatio = relativeScrollDelta / totalScrollableTrack;
        scrollRatio = Math.max(0, Math.min(1, scrollRatio));

        // 1. CHRONOLOGICAL MOTHERBOARD ENGINES: Pure scroll linked tracing displacement
        let traceProgress = Math.min(1, scrollRatio * 4.5); 
        if (relativeScrollDelta < 0) traceProgress = 0;

        circuitLines.forEach(line => {
            const calculatedOffset = 2500 - (traceProgress * 2500);
            line.style.strokeDashoffset = calculatedOffset;
        });

        // 2. CHRONOLOGICAL TASH KE PATTE PILE DECK STACK ENGINE
        const totalCards = deckCards.length;
        const trackStart = 0.22; // Sequential synchronization: Cards rise smoothly after tracing wraps up
        const trackEnd = 0.98;
        const activeTrackSpace = trackEnd - trackStart;
        const cardSectionWindow = activeTrackSpace / totalCards;

        deckCards.forEach((card, index) => {
            const cardStartRatio = trackStart + (index * cardSectionWindow);
            const cardEndRatio = cardStartRatio + cardSectionWindow;

            if (scrollRatio < cardStartRatio) {
                card.style.opacity = "0";
                card.style.transform = "translateY(100vh)";
                card.style.pointerEvents = "none";
                card.style.visibility = "hidden";
            } 
            else if (scrollRatio >= cardStartRatio && scrollRatio <= cardEndRatio) {
                const cardLifecycleProgress = (scrollRatio - cardStartRatio) / cardSectionWindow;

                card.style.pointerEvents = "auto";
                card.style.visibility = "visible";

                card.style.opacity = Math.min(1, cardLifecycleProgress * 2.5);
                
                const distanceY = Math.max(0, (1 - cardLifecycleProgress) * 100);
                card.style.transform = `translateY(${distanceY}vh)`;
            } 
            else if (scrollRatio > cardEndRatio) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0px)";
                card.style.pointerEvents = "auto";
                card.style.visibility = "visible";
            }
        });
    }
});
// SERVICES SECTION CODE END FROM HERE - JAVASCRIPT MODULE

// PROJECT SECTION START FROM HERE (JS PART 1)
// Initialize standard premium smooth scrolling engine configurations
const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // High-end momentum braking formula
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate GSAP with Lenis momentum scroll updates mapping rules
lenis.on('scroll', ScrollTrigger.update);

gsap.registerPlugin(ScrollTrigger);

// Hardware accelerated Premium Cinematic Entry (Split Content Reveal)
window.addEventListener('DOMContentLoaded', () => {
    const heroTitleWords = document.querySelectorAll("#hero-title-reveal span");
    const launchTimeline = gsap.timeline();
    
    // Smooth upward slide elastic scale entry for title word tags
    launchTimeline.from(heroTitleWords, {
        y: "100%",
        opacity: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: "power4.out"
    })
    // Subtle presentation tracking for sub headings text layer
    .to("#hero-sub-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.9");
});
// PROJECT SECTION ENDS FROM HERE (JS PART 1)


// PROJECT SECTION START FROM HERE (JS PART 2)
// 1. Ambient Background Neon Glow Orbs Parallax Motion tracking setup
gsap.to("#bg-orb-1", {
    scrollTrigger: {
        trigger: "#hero-trigger-scene",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    },
    x: "-10vw",
    y: "15vh"
});

gsap.to("#bg-orb-2", {
    scrollTrigger: {
        trigger: "#reveal-trigger-scene",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    },
    x: "15vw",
    y: "-20vh"
});

// 2. High-End Agency Standard Word-by-Word Text Reveal Execution
const revealWords = document.querySelectorAll(".reveal-word");

gsap.to(revealWords, {
    scrollTrigger: {
        trigger: "#reveal-trigger-scene",
        start: "top 65%",   // Animation kicks in when container enters active zone depth
        end: "bottom 40%",  // Completes fade profile shifts on exit lines
        scrub: 0.4,         // Tight responsive latch connection to custom scroll speed
    },
    color: "#ffffff",
    opacity: 1,
    stagger: 0.1,           // Delay gap offset configurations for individual active fragments arrays
});

// 3. Three Platform Glass Cards Elastic Sequence Entrance Pop Trigger
const structuralCards = document.querySelectorAll(".component-card");

gsap.from(structuralCards, {
    scrollTrigger: {
        trigger: "#interactive-cards-container",
        start: "top 82%",
        end: "top 45%",
        scrub: false,       // Play beautiful entrance bounce cleanly once on trigger crossing
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.18,          // Sequential spacing alignment parameters for layout cards pop
    ease: "power4.out"      // High velocity clean deceleration curve formula
});

// Smooth out mouse tracking fade effects for scroll instructions anchor
gsap.to("#scroll-mouse-indicator", {
    scrollTrigger: {
        trigger: "#hero-trigger-scene",
        start: "top top",
        end: "20% top",
        scrub: true
    },
    opacity: 0,
    scale: 0.9
});
// PROJECT SECTION ENDS FROM HERE (JS PART 2)


// CONTACT SECTION CODE START FROM HERE - JS PART 1
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c[SYSTEM_LOG] : Establishing Secure Communication Gateway Protocol...", "color: #bd00ff; font-weight: bold; font-family: monospace;");

    const contactForm = document.getElementById("cyberContactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".console-fire-btn");
            const originalBtnContent = submitBtn.innerHTML;
            
            // Triggering robotic compilation system text display shift
            submitBtn.disabled = true;
            submitBtn.style.borderColor = "#ffaa00";
            submitBtn.style.color = "#ffaa00";
            submitBtn.innerHTML = `<span>[ TRANSMISSION_COMPILING... ]</span> <i class="fas fa-sync fa-spin"></i>`;
            
            // Simulating satellite telemetry buffer delays cycle
            setTimeout(() => {
                submitBtn.style.borderColor = "#00f0ff";
                submitBtn.style.color = "#00f0ff";
                submitBtn.innerHTML = `<span>[ LINK_SECURED_SUCCESSFULLY ]</span> <i class="fas fa-check-circle"></i>`;
                
                // Tracing confirmation logs alert
                alert("SYSTEM STATUS: Data transmission vector deployed successfully into current engine loop parameter metrics!");
                
                // Flushing values input streams caches
                contactForm.reset();
                
                // Cooling down telemetry systems loops parameters buffers
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.borderColor = "";
                    submitBtn.style.color = "";
                    submitBtn.innerHTML = originalBtnContent;
                }, 2000);
            }, 1800);
        });
    }
});
// CONTACT SECTION CODE END FROM HERE - JS PART 1
// CONTACT SECTION CODE START FROM HERE - JS PART 1
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c[SYSTEM_LOG] : Establishing Secure Communication Gateway Protocol...", "color: #bd00ff; font-weight: bold; font-family: monospace;");

    const contactForm = document.getElementById("cyberContactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".console-fire-btn");
            const originalBtnContent = submitBtn.innerHTML;
            
            // Triggering robotic compilation system text display shift
            submitBtn.disabled = true;
            submitBtn.style.borderColor = "#ffaa00";
            submitBtn.style.color = "#ffaa00";
            submitBtn.innerHTML = `<span>[ TRANSMISSION_COMPILING... ]</span> <i class="fas fa-sync fa-spin"></i>`;
            
            // Simulating satellite telemetry buffer delays cycle
            setTimeout(() => {
                submitBtn.style.borderColor = "#00f0ff";
                submitBtn.style.color = "#00f0ff";
                submitBtn.innerHTML = `<span>[ LINK_SECURED_SUCCESSFULLY ]</span> <i class="fas fa-check-circle"></i>`;
                
                // Tracing confirmation logs alert
                alert("SYSTEM STATUS: Data transmission vector deployed successfully into current engine loop parameter metrics!");
                
                // Flushing values input streams caches
                contactForm.reset();
                
                // Cooling down telemetry systems loops parameters buffers
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.borderColor = "";
                    submitBtn.style.color = "";
                    submitBtn.innerHTML = originalBtnContent;
                }, 2000);
            }, 1800);
        });
    }
});
// CONTACT SECTION CODE END FROM HERE - JS PART 1










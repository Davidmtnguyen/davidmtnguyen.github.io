// valentines.js

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const content = document.getElementById('content');
const buttonContainer = document.getElementById('buttonContainer');
const dimOverlay = document.getElementById('dimOverlay');
const celebrationTextDisplay = document.getElementById('celebrationText');
const celebrateAgainContainer = document.getElementById('celebrateAgainContainer');
const celebrateAgainBtn = document.getElementById('celebrateAgainBtn');

let noClickCount = 0;
const noTexts = [
    "I misclick things too sometimes,",
    "Okay that must've been an accident.",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Come on!",
    "Please?",
    "Pretty please?",
    "Pretty pretty please?",
    "PLEASE? 🥺",
    "Don't break my heart!",
    "No"
];

const celebrationTexts = [
    "YES! 💕",
    "I Love You!",
    "Whoop Whoop! 😍",
    "Best Day Ever!",
    "You make me smile!",
    ":)",
    "I am so grateful for you!",
    "This is Perfect!"
];

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Show content after background fade
setTimeout(() => {
    content.classList.remove('hidden');
}, 1500);

// Heart particle for fireworks
class HeartParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12 - 5;
        this.gravity = 0.2;
        this.life = 255;
        this.decay = Math.random() * 2 + 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 20 + 10;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 255;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw heart shape
        const size = this.size;
        const x = 0;
        const y = 0;
        
        ctx.fillStyle = '#ff1493';
        
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(
            x - size / 2, y - size / 4,
            x - size / 2, y - size / 1.5,
            x, y - size / 2
        );
        ctx.bezierCurveTo(
            x + size / 2, y - size / 1.5,
            x + size / 2, y - size / 4,
            x, y + size / 4
        );
        ctx.fill();
        
        ctx.restore();
    }

    isAlive() {
        return this.life > 0;
    }
}

let particles = [];
let animationRunning = false;

function animateFireworks() {
    animationRunning = true;
    
    // Spawn particles continuously for a few seconds
    let spawnTime = 0;
    const spawnDuration = 3000;
    
    const spawnInterval = setInterval(() => {
        if (spawnTime >= spawnDuration) {
            clearInterval(spawnInterval);
            return;
        }
        
        // Spawn hearts from center and random positions
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 - 100;
        
        for (let i = 0; i < 10; i++) {
            particles.push(new HeartParticle(
                centerX + (Math.random() - 0.5) * 100,
                centerY + (Math.random() - 0.5) * 100
            ));
        }
        
        spawnTime += 50;
    }, 50);
    
    function animate() {
        // Clear canvas with semi-transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles = particles.filter(p => p.isAlive());
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        if (particles.length > 0 || spawnTime < spawnDuration) {
            requestAnimationFrame(animate);
        } else {
            animationRunning = false;
        }
    }
    
    animate();
}

// Yes button click handler
yesBtn.addEventListener('click', () => {
    const randomCelebrationText = celebrationTexts[Math.floor(Math.random() * celebrationTexts.length)];
    
    // Dim the background
    dimOverlay.classList.remove('hidden');
    setTimeout(() => {
        dimOverlay.classList.add('show');
    }, 50);
    
    // Hide content
    content.style.opacity = '0';
    setTimeout(() => {
        content.classList.add('hidden');
        
        // Show celebration text
        celebrationTextDisplay.classList.remove('hidden');
        celebrationTextDisplay.textContent = randomCelebrationText;
        setTimeout(() => {
            celebrationTextDisplay.classList.add('show');
        }, 50);
        
        // Start fireworks after text shows
        setTimeout(() => {
            animateFireworks();
            
            // Show celebrate button after fireworks finish
            setTimeout(() => {
                celebrateAgainContainer.classList.remove('hidden');
                setTimeout(() => {
                    celebrateAgainContainer.classList.add('show');
                }, 50);
            }, 4000);
        }, 1500);
    }, 500);
    
    yesBtn.disabled = true;
    noBtn.disabled = true;
});

// No button click handler - moves and changes text
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (noClickCount < noTexts.length) {
        // Update question text only (no shrink animation)
        question.textContent = noTexts[noClickCount];
        
        // Apply shrink class to button (cumulative - stays shrunk)
        noBtn.style.transform = `scale(${Math.max(0.5, 1 - (noClickCount * 0.08))})`;
        
        noClickCount++;
        
        // If all texts exhausted, hide no button and center yes button
        if (noClickCount >= noTexts.length) {
            setTimeout(() => {
                noBtn.style.visibility = 'hidden';
                noBtn.style.opacity = '0';
                buttonContainer.classList.add('centered');
            }, 300);
        }
    }
});

// Celebrate Again button click handler
celebrateAgainBtn.addEventListener('click', () => {
    const randomCelebrationText = celebrationTexts[Math.floor(Math.random() * celebrationTexts.length)];
    
    // Update celebration text
    celebrationTextDisplay.textContent = randomCelebrationText;
    celebrationTextDisplay.classList.remove('show');
    
    // Reset and re-trigger animation
    setTimeout(() => {
        celebrationTextDisplay.classList.add('show');
    }, 50);
    
    // Trigger fireworks again
    animateFireworks();
});
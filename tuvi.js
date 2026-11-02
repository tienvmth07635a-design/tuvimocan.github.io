// --- 1. Xử lý hiệu ứng Bầu trời sao (Canvas) ---
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.02;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0) {
            this.speed = -this.speed;
        }
    }
}

// Khởi tạo danh sách các hạt sao
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

animateStars();


// --- 2. Xử lý Trình phát nhạc (Audio Widget) ---
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const audio = document.getElementById('bgMusic');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }).catch(error => {
            console.log("Trình duyệt chặn tự động phát hoặc lỗi phát nhạc:", error);
        });
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
});
function openContactModal() {
    document.getElementById('contactModal').style.display = 'flex';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Đóng modal khi bấm ra ngoài khung nội dung
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
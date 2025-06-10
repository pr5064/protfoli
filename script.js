// === BG Circuit Animation ===
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for (let i = 0; i < 150; i++) {
  lines.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
    length: Math.random() * 30 + 10
  });
}

function drawLine(x, y, length, angle) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
  ctx.strokeStyle = "#00ffc3";
  ctx.lineWidth = 1;
  ctx.shadowColor = "#00ffc3";
  ctx.shadowBlur = 5;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach((line) => {
    drawLine(line.x, line.y, line.length, Math.atan2(line.dy, line.dx));
    line.x += line.dx;
    line.y += line.dy;

    if (line.x > canvas.width || line.x < 0) line.dx *= -1;
    if (line.y > canvas.height || line.y < 0) line.dy *= -1;
  });
  requestAnimationFrame(animate);
}

animate();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === Typing Animation ===
const texts = ["VLSI Enthusiast", "Digital Design Explorer", "Future Chip Architect"];
let textIndex = 0;
let charIndex = 0;
const typedText = document.querySelector(".typed-text");

function type() {
  if (charIndex < texts[textIndex].length) {
    typedText.textContent += texts[textIndex][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

// === Theme Toggle ===
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
